"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Keyboard,
  Mic,
  RotateCcw,
  Square,
  Timer as TimerIcon,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { wordCount } from "@/components/ui";
import type { SpeakingContent } from "@/lib/content.types";
import { recognitionSupported, speak, startRecognition } from "@/lib/speech";

export type SpeakingAnswer = { transcript: string; seconds: number };
type Answers = Record<string, SpeakingAnswer>;

/** Same item keys as speakingItems() in the backend. */
export function speakingItems(content: SpeakingContent) {
  const items: {
    key: string;
    part: 1 | 2 | 3;
    topic: string;
    question: string;
    bullets?: string[];
  }[] = [];
  content.part1.forEach((t, ti) =>
    t.questions.forEach((q, qi) =>
      items.push({ key: `p1-${ti}-${qi}`, part: 1, topic: t.topic, question: q }),
    ),
  );
  items.push({
    key: "p2",
    part: 2,
    topic: "Long turn",
    question: content.part2.cueCard,
    bullets: content.part2.bullets,
  });
  content.part3.questions.forEach((q, qi) =>
    items.push({ key: `p3-${qi}`, part: 3, topic: content.part3.topic, question: q }),
  );
  return items;
}

const PART2_PREP = 60;
const PART2_MAX = 120;
const PART_LABELS = {
  1: "Part 1 · Interview",
  2: "Part 2 · Long turn",
  3: "Part 3 · Discussion",
} as const;

export function SpeakingRunner({
  content,
  answers,
  setAnswer,
}: {
  content: SpeakingContent;
  answers: Answers;
  setAnswer: (key: string, value: SpeakingAnswer) => void;
}) {
  const items = useMemo(() => speakingItems(content), [content]);
  const [index, setIndex] = useState(() =>
    Math.max(0, items.findIndex((i) => !answers[i.key]?.transcript)),
  );
  const item = items[index];
  const answer = answers[item.key] ?? { transcript: "", seconds: 0 };

  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [prep, setPrep] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [micError, setMicError] = useState("");
  // Detection must happen after mount: the server render has no `window`, and
  // rendering the microphone UI on the server would break hydration.
  const [canRecord, setCanRecord] = useState(false);
  const stopRef = useRef<(() => string) | null>(null);
  const baseRef = useRef({ transcript: "", seconds: 0 });

  useEffect(() => {
    setCanRecord(recognitionSupported());
  }, []);

  // Stop everything when moving to another question or leaving the page.
  useEffect(
    () => () => {
      stopRef.current?.();
      window.speechSynthesis?.cancel();
    },
    [index],
  );

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  // Part 2 is a timed long turn: stop automatically at two minutes.
  useEffect(() => {
    if (recording && item.part === 2 && elapsed >= PART2_MAX) stop();
  });

  useEffect(() => {
    if (prep === null) return;
    const t = setTimeout(() => {
      if (prep <= 1) {
        setPrep(null);
        start();
      } else {
        setPrep(prep - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  });

  function start(fresh = false) {
    if (recording) return;
    setMicError("");
    setPrep(null);
    window.speechSynthesis?.cancel();
    baseRef.current = fresh ? { transcript: "", seconds: 0 } : { ...answer };
    setElapsed(0);
    try {
      stopRef.current = startRecognition(
        (text) =>
          setAnswer(item.key, {
            transcript: `${baseRef.current.transcript} ${text}`.trim(),
            seconds: baseRef.current.seconds,
          }),
        (msg) => {
          setMicError(msg);
          setRecording(false);
        },
      );
      setRecording(true);
    } catch (e) {
      setMicError((e as Error).message);
      setRecording(false);
    }
  }

  function stop() {
    const text = stopRef.current?.() ?? "";
    stopRef.current = null;
    setRecording(false);
    setAnswer(item.key, {
      transcript: `${baseRef.current.transcript} ${text}`.trim(),
      seconds: baseRef.current.seconds + elapsed,
    });
  }

  /** Throw away the current answer and record it again from scratch. */
  function restart() {
    if (recording) stop();
    setAnswer(item.key, { transcript: "", seconds: 0 });
    baseRef.current = { transcript: "", seconds: 0 };
    setElapsed(0);
    setMicError("");
    window.setTimeout(() => start(true), 0);
  }

  const go = (i: number) => {
    if (i < 0 || i >= items.length) return;
    if (recording) stop();
    setPrep(null);
    setMicError("");
    setIndex(i);
  };

  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const answeredCount = items.filter((i) => answers[i.key]?.transcript?.trim()).length;
  const setNote = (value: string) => setNotes((n) => ({ ...n, [item.key]: value }));
  const note = notes[item.key] ?? "";
  const words = wordCount(answer.transcript);

  return (
    <div className="page-container grid w-full flex-1 items-start gap-6 py-7 sm:py-9 lg:grid-cols-[1fr_320px]">
      <div className="min-w-0 space-y-4">
        {!canRecord && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-800">
            <Keyboard className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              <strong className="font-semibold">Typed answer mode.</strong> Speech-to-text is not
              available in this browser. Use Chrome or Edge to answer by speaking, or type each
              answer in the box below — your transcript is what gets scored.
            </span>
          </div>
        )}

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between gap-3 border-b border-surface-100 bg-surface-50/70 px-5 py-3 sm:px-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600">
              {PART_LABELS[item.part]}
            </span>
            <span className="flex items-center gap-2 text-xs font-medium text-surface-500">
              {recording && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 font-semibold text-rose-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-500" />
                  Recording
                </span>
              )}
              Question {index + 1} of {items.length}
            </span>
          </div>

          <div className="p-5 sm:p-8">
            <div className="text-[13px] font-semibold uppercase tracking-wide text-surface-400">
              {item.topic}
            </div>
            <div className="mt-2 flex items-start gap-4">
              <p className="flex-1 font-display text-[1.4rem] font-bold leading-snug tracking-tight text-surface-900 sm:text-2xl">
                {item.question}
              </p>
              <button
                onClick={() =>
                  speak(
                    item.question +
                      (item.bullets ? ". You should say: " + item.bullets.join(". ") : ""),
                  )
                }
                disabled={recording}
                className="btn-secondary btn-sm shrink-0"
                title={recording ? "Stop recording to replay the question" : "Hear the examiner ask the question"}
              >
                <Volume2 className="h-4 w-4" />
                <span className="hidden sm:inline">Listen</span>
              </button>
            </div>

            {item.bullets && (
              <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <p className="text-sm font-bold text-brand-800">You should say:</p>
                <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-surface-700">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-3.5 text-[13px] text-surface-500">
                  You have 1 minute to prepare and can make notes. Then speak for 1–2 minutes.
                </p>
              </div>
            )}

            {item.part === 2 && (
              <div className="mt-5">
                <label className="label" htmlFor={`notes-${item.key}`}>
                  Your notes <span className="font-normal text-surface-400">(not marked)</span>
                </label>
                <textarea
                  id={`notes-${item.key}`}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Jot down a few keywords to organise your long turn…"
                  className="input h-24 leading-relaxed"
                />
              </div>
            )}

            {/* Recorder */}
            <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-surface-100 bg-surface-50/60 px-4 py-7">
              {recording ? (
                <>
                  <button
                    onClick={stop}
                    className="relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-700"
                    aria-label="Stop recording"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-rose-500 opacity-30" />
                    <Square className="relative h-7 w-7 fill-current" />
                  </button>
                  <div className="font-mono text-lg font-bold tabular-nums text-rose-600">
                    {mmss(elapsed)}
                    {item.part === 2 ? ` / ${mmss(PART2_MAX)}` : ""}
                  </div>
                  <div className="text-sm text-surface-500" aria-live="polite">
                    Listening… speak at a natural pace, then press stop when you finish.
                  </div>
                  {words > 0 && (
                    <div className="text-xs font-medium text-surface-400">
                      {words} {words === 1 ? "word" : "words"} captured
                    </div>
                  )}
                </>
              ) : canRecord && prep !== null ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-base font-bold text-amber-700">
                    <TimerIcon className="h-5 w-5" /> Preparation time: {prep}s
                  </div>
                  <p className="max-w-sm text-center text-sm text-surface-500">
                    Make notes above. Recording starts automatically when the minute is up.
                  </p>
                  <button onClick={() => start()} className="btn-secondary">
                    Skip &amp; speak now
                  </button>
                </div>
              ) : canRecord ? (
                item.part === 2 && !answer.transcript ? (
                  <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={() => setPrep(PART2_PREP)} className="btn-primary btn-lg">
                      <TimerIcon className="h-5 w-5" /> Start 1-minute preparation
                    </button>
                    <button onClick={() => start()} className="btn-secondary btn-lg">
                      Skip &amp; speak now
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => start()}
                      className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition hover:scale-105 hover:bg-brand-700"
                      aria-label="Start speaking"
                    >
                      <Mic className="h-8 w-8" />
                    </button>
                    <div className="text-sm font-medium text-surface-600">
                      {answer.transcript ? "Tap to add to your answer" : "Tap to start speaking"}
                    </div>
                    {answer.transcript && (
                      <button
                        onClick={restart}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-surface-500 hover:text-surface-800"
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Clear and record again
                      </button>
                    )}
                  </>
                )
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                    <Keyboard className="h-6 w-6" />
                  </span>
                  <div className="text-sm font-semibold text-surface-700">Type your answer below</div>
                  <p className="max-w-sm text-xs leading-relaxed text-surface-500">
                    Write what you would say out loud. Aim for the same length — around 2–3
                    sentences for Part 1 and 3, and a full 1–2 minutes for Part 2.
                  </p>
                </div>
              )}

              {micError && (
                <div
                  role="alert"
                  className="flex max-w-md items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm leading-relaxed text-rose-700"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {micError}{" "}
                    <span className="text-rose-600/80">You can still type your answer below.</span>
                  </span>
                </div>
              )}
            </div>

            <div className="mt-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="label mb-0" htmlFor="speaking-answer">
                  Your answer
                </label>
                <span className="text-xs text-surface-500">
                  {words} {words === 1 ? "word" : "words"} · {answer.seconds}s spoken
                </span>
              </div>
              <textarea
                id="speaking-answer"
                value={answer.transcript}
                readOnly={recording}
                onChange={(e) =>
                  setAnswer(item.key, {
                    transcript: e.target.value,
                    seconds: answer.seconds || Math.round(wordCount(e.target.value) / 2.2),
                  })
                }
                placeholder={
                  canRecord
                    ? "Your words appear here as you speak. You can correct any recognition mistakes."
                    : "Type what you would say…"
                }
                className="input mt-1.5 h-36 leading-relaxed"
              />
              <p className="mt-2 text-xs text-surface-400">
                {recording
                  ? "The text updates live. Press stop before editing your answer."
                  : "You can edit this transcript before submitting — fixing recognition mistakes helps the examiner score you fairly."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button onClick={() => go(index - 1)} disabled={index === 0} className="btn-secondary">
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <button
            onClick={() => go(index + 1)}
            disabled={index === items.length - 1}
            className="btn-primary"
          >
            Next question <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <aside className="card h-fit overflow-hidden lg:sticky lg:top-24">
        <div className="border-b border-surface-100 px-5 py-3.5">
          <div className="text-sm font-bold text-surface-900">Question navigator</div>
          <div className="text-xs text-surface-500">
            {answeredCount} of {items.length} answered
          </div>
        </div>
        <div className="scroll-thin max-h-[60vh] overflow-y-auto p-2.5">
          {([1, 2, 3] as const).map((part) => (
            <div key={part} className="mb-2">
              <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-surface-400">
                {PART_LABELS[part]}
              </div>
              {items.map((it, i) =>
                it.part !== part ? null : (
                  <button
                    key={it.key}
                    onClick={() => go(i)}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition ${
                      i === index
                        ? "bg-brand-50 font-semibold text-brand-700"
                        : "text-surface-600 hover:bg-surface-50"
                    }`}
                  >
                    {answers[it.key]?.transcript ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    ) : (
                      <span className="mx-[3px] h-2 w-2 shrink-0 rounded-full bg-surface-300" />
                    )}
                    <span className="truncate">{it.question}</span>
                  </button>
                ),
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
