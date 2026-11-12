"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Flag, RotateCcw, Timer, XCircle } from "lucide-react";
import { PageHeader, ProgressBar } from "@/components/ui";
import {
  IELTS_READING_MINUTES,
  IELTS_READING_WORDS,
  SPEED_BANDS,
  SPEED_PASSAGES,
  passageWordCount,
} from "@/lib/reading-speed-data";

type Stage = "pick" | "reading" | "questions" | "result";

function fmt(ms: number) {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function ReadingSpeedClient() {
  const [passageIdx, setPassageIdx] = useState(0);
  const [stage, setStage] = useState<Stage>("pick");
  const [startedAt, setStartedAt] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const passage = SPEED_PASSAGES[passageIdx];
  const words = passageWordCount(passage);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const start = () => {
    const now = Date.now();
    setStartedAt(now);
    setElapsed(0);
    setAnswers(passage.questions.map(() => null));
    setStage("reading");
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setElapsed(Date.now() - now), 250);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finish = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setElapsed(Date.now() - startedAt);
    setStage("questions");
  };

  const reset = (idx = passageIdx) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPassageIdx(idx);
    setStage("pick");
    setElapsed(0);
  };

  const minutes = Math.max(elapsed, 1000) / 60000;
  const wpm = Math.round(words / minutes);
  const correct = answers.filter((a, i) => a === passage.questions[i]?.answer).length;
  const comprehension = passage.questions.length ? Math.round((correct / passage.questions.length) * 100) : 0;
  const effective = Math.round((wpm * comprehension) / 100);
  const band = SPEED_BANDS.find((b) => effective >= b.min && effective < b.max) ?? SPEED_BANDS[0];
  // Time to read all IELTS passages once at the effective speed.
  const ieltsReadMinutes = effective > 0 ? Math.round(IELTS_READING_WORDS / effective) : null;

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Free reading tool"
        title="IELTS reading speed test"
        description="Time yourself on an academic passage, answer four comprehension questions, and find out your words per minute and effective reading speed compared with the pace IELTS Reading demands."
        actions={
          <span className="badge-brand">
            <BookOpen className="h-3.5 w-3.5" /> {SPEED_PASSAGES.length} passages
          </span>
        }
      />

      {stage === "pick" && (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {SPEED_PASSAGES.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPassageIdx(i)}
                className={`card p-5 text-left transition ${i === passageIdx ? "ring-2 ring-brand-400" : "hover:border-surface-300"}`}
              >
                <p className="eyebrow">{p.topic}</p>
                <p className="mt-1 text-[16px] font-bold text-surface-900">{p.title}</p>
                <p className="mt-1 text-[13px] text-surface-500">
                  {passageWordCount(p)} words · {p.questions.length} questions
                </p>
              </button>
            ))}
          </div>
          <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-surface-600">
              Read at your normal exam pace, for understanding. Do not skim. The timer starts when you press the button and stops
              when you press <span className="font-semibold">Finished</span>. You cannot look back at the text while answering.
            </p>
            <button type="button" className="btn-primary shrink-0" onClick={start}>
              <Timer className="h-4 w-4" /> Start reading
            </button>
          </div>
        </div>
      )}

      {stage === "reading" && (
        <div className="space-y-4">
          <div className="sticky top-16 z-10 flex items-center justify-between gap-3 rounded-xl border border-surface-200 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur">
            <span className="inline-flex items-center gap-2 font-mono text-lg font-bold text-surface-900">
              <Clock className="h-4 w-4 text-brand-600" /> {fmt(elapsed)}
            </span>
            <button type="button" className="btn-primary btn-sm" onClick={finish}>
              <Flag className="h-4 w-4" /> Finished
            </button>
          </div>
          <article className="card mx-auto max-w-3xl space-y-4 p-5 text-[15.5px] leading-[1.8] text-surface-800 sm:p-8">
            <h2 className="font-display text-xl font-bold text-surface-900">{passage.title}</h2>
            {passage.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="pt-2">
              <button type="button" className="btn-primary" onClick={finish}>
                <Flag className="h-4 w-4" /> Finished reading
              </button>
            </div>
          </article>
        </div>
      )}

      {stage === "questions" && (
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="card flex flex-wrap items-center gap-4 p-5">
            <span className="badge-success">Reading time {fmt(elapsed)}</span>
            <span className="text-sm text-surface-600">Now answer from memory. The text is hidden, as your speed has been recorded.</span>
          </div>
          {passage.questions.map((q, qi) => (
            <fieldset key={qi} className="card p-5">
              <legend className="sr-only">Question {qi + 1}</legend>
              <p className="text-[15px] font-semibold text-surface-900">
                {qi + 1}. {q.question}
              </p>
              <div className="mt-3 grid gap-2">
                {q.options.map((opt, oi) => (
                  <label
                    key={oi}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                      answers[qi] === oi ? "border-brand-300 bg-brand-50 text-brand-900" : "border-surface-200 hover:border-surface-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${qi}`}
                      className="mt-0.5 accent-brand-600"
                      checked={answers[qi] === oi}
                      onChange={() => setAnswers((a) => a.map((v, k) => (k === qi ? oi : v)))}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button type="button" className="btn-primary" disabled={answers.some((a) => a === null)} onClick={() => setStage("result")}>
            See my result <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {stage === "result" && (
        <div className="mx-auto max-w-3xl space-y-5 animate-fade-up">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="card p-5">
              <p className="eyebrow">Reading speed</p>
              <p className="mt-1 text-3xl font-extrabold text-surface-900">{wpm}</p>
              <p className="text-xs text-surface-500">words per minute ({words} words in {fmt(elapsed)})</p>
            </div>
            <div className="card p-5">
              <p className="eyebrow">Comprehension</p>
              <p className="mt-1 text-3xl font-extrabold text-surface-900">{comprehension}%</p>
              <p className="text-xs text-surface-500">
                {correct} of {passage.questions.length} correct
              </p>
            </div>
            <div className="card p-5 ring-2 ring-brand-300">
              <p className="eyebrow">Effective speed</p>
              <p className="mt-1 text-3xl font-extrabold text-brand-700">{effective}</p>
              <p className="text-xs text-surface-500">WPM × comprehension</p>
            </div>
          </div>

          <div className="card space-y-3 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-brand">{band.label}</span>
              <span className="text-sm font-semibold text-surface-800">How this compares with IELTS Reading</span>
            </div>
            <ProgressBar value={Math.min(100, (effective / 350) * 100)} />
            <div className="flex justify-between text-[11px] text-surface-400">
              <span>0</span>
              <span>150</span>
              <span>220</span>
              <span>300+</span>
            </div>
            <p className="text-sm leading-relaxed text-surface-600">{band.note}</p>
            <p className="text-sm leading-relaxed text-surface-600">
              IELTS Academic Reading has about {IELTS_READING_WORDS.toLocaleString()} words across three passages, and you have{" "}
              {IELTS_READING_MINUTES} minutes for reading and answering 40 questions.
              {ieltsReadMinutes !== null && (
                <>
                  {" "}
                  At your effective speed, reading every word once would take about{" "}
                  <span className="font-semibold text-surface-900">{ieltsReadMinutes} minutes</span>
                  {ieltsReadMinutes <= 20
                    ? ", leaving plenty of time for the questions."
                    : ieltsReadMinutes <= 35
                      ? ", so you will need to skim and scan rather than read everything in detail."
                      : ", which is more than half the test. Practise skimming for gist and scanning for keywords."}
                </>
              )}
            </p>
            <p className="text-xs text-surface-400">Guidance only. These ranges are not official IELTS criteria.</p>
          </div>

          <div className="card p-5">
            <p className="mb-3 text-sm font-semibold text-surface-800">Answers</p>
            <ul className="space-y-2">
              {passage.questions.map((q, qi) => {
                const ok = answers[qi] === q.answer;
                return (
                  <li key={qi} className="flex items-start gap-2 text-sm">
                    {ok ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                    )}
                    <span className="text-surface-700">
                      {q.question} <span className="font-semibold text-surface-900">{q.options[q.answer]}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={() => reset((passageIdx + 1) % SPEED_PASSAGES.length)}>
              Try the next passage <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" className="btn-secondary" onClick={() => reset()}>
              <RotateCcw className="h-4 w-4" /> Choose another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
