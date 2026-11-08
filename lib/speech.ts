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
 */
export function startRecognition(onText: (text: string) => void, onError?: (msg: string) => void) {
  const Ctor = recognitionCtor();
  if (!Ctor) throw new Error("Speech recognition is not supported in this browser");
  let finalText = "";
  let interim = "";
  let active = true;
  let rec: Recognition;

  const begin = () => {
    rec = new Ctor();
    rec.lang = "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
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
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        active = false;
        onError?.("Microphone access was blocked. Allow microphone access, or type your answer instead.");
      }
    };
    // Browsers end recognition after a pause; keep listening until stopped.
    rec.onend = () => {
      if (active) begin();
    };
    rec.start();
  };
  begin();

  return () => {
    active = false;
    rec.stop();
    return (finalText + interim).trim();
  };
}
