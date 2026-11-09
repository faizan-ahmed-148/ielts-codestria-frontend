"use client";

// Browser speech helpers: text-to-speech plays Listening recordings and reads
// Speaking questions; speech recognition transcribes spoken Speaking answers.

/** Splits text into sentence-sized chunks (Chrome cuts off very long utterances). */
function chunks(text: string) {
  return text.match(/[^.!?]+[.!?]*\s*/g)?.map((s) => s.trim()).filter(Boolean) ?? [text];
}

function englishVoices() {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
  // Prefer British/Australian voices, as in the real test.
  return voices.sort((a, b) => Number(/GB|AU/.test(b.lang)) - Number(/GB|AU/.test(a.lang)));
}

export const ttsSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;

export interface SpeakLine {
  speaker: string;
  text: string;
}

/**
 * Speaks lines one after another, giving each distinct speaker a different voice.
 * Returns a function that stops playback.
 */
export function speakLines(lines: SpeakLine[], opts: { rate?: number; onLine?: (i: number) => void; onEnd?: () => void } = {}) {
  const synth = window.speechSynthesis;
  synth.cancel();
  const voices = englishVoices();
  const speakers = [...new Set(lines.map((l) => l.speaker))];
  let stopped = false;

  const queue: { line: number; text: string; voice?: SpeechSynthesisVoice; pitch: number }[] = [];
  lines.forEach((l, i) => {
    const s = speakers.indexOf(l.speaker);
    const voice = voices.length ? voices[s % voices.length] : undefined;
    // With few voices available, vary the pitch so speakers stay distinguishable.
    const pitch = voices.length > s ? 1 : [1, 0.8, 1.25][s % 3];
    chunks(l.text).forEach((text) => queue.push({ line: i, text, voice, pitch }));
  });

  let idx = 0;
  const next = () => {
    if (stopped) return;
    if (idx >= queue.length) return opts.onEnd?.();
    const item = queue[idx++];
    const u = new SpeechSynthesisUtterance(item.text);
    if (item.voice) u.voice = item.voice;
    u.lang = item.voice?.lang ?? "en-GB";
    u.pitch = item.pitch;
    u.rate = opts.rate ?? 0.95;
    u.onstart = () => opts.onLine?.(item.line);
    u.onend = next;
    u.onerror = next;
    synth.speak(u);
  };
  // Voices load asynchronously on first use.
  if (!synth.getVoices().length) setTimeout(next, 300);
  else next();

  return () => {
    stopped = true;
    synth.cancel();
  };
}

export function speak(text: string) {
  return speakLines([{ speaker: "Examiner", text }]);
}

// Minimal typings for the Web Speech recognition API (not in lib.dom for all browsers).
interface RecognitionResult {
  isFinal: boolean;
  0: { transcript: string };
}
interface RecognitionEvent {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
}
interface Recognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((e: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  start(): void;
  stop(): void;
}

function recognitionCtor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const recognitionSupported = () => recognitionCtor() !== null;

/**
 * Starts continuous speech recognition. `onText` receives the full transcript so far
 * (final + interim). Returns a stop function that resolves with the final transcript.
 *
 * Chrome ends recognition after every short pause, so we restart it automatically.
 * Benign pauses are retried silently; genuine failures (blocked microphone, no input
 * device, repeated network loss) stop the loop and report a message the user can act on.
 */
export function startRecognition(onText: (text: string) => void, onError?: (msg: string) => void) {
  const Ctor = recognitionCtor();
  if (!Ctor) throw new Error("Speech recognition is not supported in this browser");

  let finalText = "";
  let interim = "";
  let active = true;
  let rec: Recognition | null = null;
  let restartTimer: ReturnType<typeof setTimeout> | null = null;
  let failures = 0;

  const clearTimer = () => {
    if (restartTimer) {
      clearTimeout(restartTimer);
      restartTimer = null;
    }
  };

  const halt = (message: string) => {
    if (!active) return;
    active = false;
    clearTimer();
    try {
      rec?.stop();
    } catch {
      // Already stopped.
    }
    onError?.(message);
  };

  const scheduleRestart = (delay: number) => {
    if (!active || restartTimer) return;
    restartTimer = setTimeout(() => {
      restartTimer = null;
      if (active) begin();
    }, delay);
  };

  const begin = () => {
    if (!active) return;
    rec = new Ctor();
    rec.lang = "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onstart = () => {
      failures = 0;
    };
    rec.onresult = (e) => {
      interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += `${r[0].transcript.trim()} `;
        else interim += r[0].transcript;
      }
      onText((finalText + interim).trim());
    };
    rec.onerror = (e) => {
      if (!active) return;
      const code = e.error || "";
      // A pause in speech is normal: let onend restart the session quietly.
      if (code === "no-speech" || code === "aborted") return;
      if (code === "not-allowed" || code === "service-not-allowed") {
        halt(
          "Microphone access was blocked. Allow microphone access in your browser and try again — or type your answer instead.",
        );
        return;
      }
      if (code === "audio-capture") {
        halt("No microphone was found. Connect a microphone and try again — or type your answer instead.");
        return;
      }
      if (code === "network") {
        failures += 1;
        if (failures >= 3) {
          halt("Speech recognition lost its connection. Check your internet connection, or type your answer instead.");
        }
        return;
      }
      halt(`Speech recognition stopped (${code || "unknown error"}). You can type your answer instead.`);
    };
    // Browsers end recognition after a pause; keep listening until stopped.
    rec.onend = () => {
      if (active) scheduleRestart(300);
    };
    try {
      rec.start();
    } catch {
      failures += 1;
      if (failures >= 3) halt("Could not start the microphone. Check that no other app is using it, or type your answer instead.");
      else scheduleRestart(500);
    }
  };
  begin();

  return () => {
    active = false;
    clearTimer();
    try {
      rec?.stop();
    } catch {
      // Already stopped.
    }
    return (finalText + interim).trim();
  };
}

