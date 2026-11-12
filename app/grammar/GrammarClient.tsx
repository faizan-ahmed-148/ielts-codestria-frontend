"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, PenLine, RotateCcw, Trophy, XCircle } from "lucide-react";
import { PageHeader, ProgressBar } from "@/components/ui";
import { GRAMMAR_TOPICS, type GrammarQuestion } from "@/lib/grammar-data";

type Answer = { value: string | number; correct: boolean };

const norm = (s: string) => s.trim().toLowerCase().replace(/[.!?,]+$/g, "").replace(/\s+/g, " ");

function isCorrect(q: GrammarQuestion, value: string | number) {
  return q.kind === "mcq" ? value === q.answer : q.accept.some((a) => norm(a) === norm(String(value)));
}

function Prompt({ text }: { text: string }) {
  const parts = text.split("___");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <span className="mx-0.5 inline-block w-14 border-b-2 border-surface-400 align-baseline" />}
        </span>
      ))}
    </>
  );
}

export default function GrammarClient() {
  const [topicId, setTopicId] = useState(GRAMMAR_TOPICS[0].id);
  const [answers, setAnswers] = useState<Record<string, (Answer | undefined)[]>>({});
  const [qIndex, setQIndex] = useState(0);
  const [draft, setDraft] = useState("");

  const topic = GRAMMAR_TOPICS.find((t) => t.id === topicId) ?? GRAMMAR_TOPICS[0];
  const topicAnswers = answers[topic.id] ?? [];
  const q = topic.questions[qIndex];
  const current = topicAnswers[qIndex];
  const done = topicAnswers.filter(Boolean).length;
  const score = topicAnswers.filter((a) => a?.correct).length;
  const finished = done === topic.questions.length;

  const scores = useMemo(
    () =>
      Object.fromEntries(
        GRAMMAR_TOPICS.map((t) => {
          const a = answers[t.id] ?? [];
          return [t.id, { done: a.filter(Boolean).length, correct: a.filter((x) => x?.correct).length }];
        }),
      ),
    [answers],
  );

  const answer = (value: string | number) => {
    if (current || (typeof value === "string" && !value.trim())) return;
    setAnswers((prev) => {
      const list = [...(prev[topic.id] ?? [])];
      list[qIndex] = { value, correct: isCorrect(q, value) };
      return { ...prev, [topic.id]: list };
    });
  };

  const selectTopic = (id: string) => {
    setTopicId(id);
    const a = answers[id] ?? [];
    const firstOpen = GRAMMAR_TOPICS.find((t) => t.id === id)!.questions.findIndex((_, i) => !a[i]);
    setQIndex(firstOpen === -1 ? 0 : firstOpen);
    setDraft("");
  };

  const next = () => {
    setDraft("");
    const firstOpen = topic.questions.findIndex((_, i) => i > qIndex && !topicAnswers[i]);
    if (firstOpen !== -1) setQIndex(firstOpen);
    else {
      const anyOpen = topic.questions.findIndex((_, i) => !topicAnswers[i]);
      setQIndex(anyOpen === -1 ? qIndex : anyOpen);
    }
  };

  const resetTopic = () => {
    setAnswers((prev) => ({ ...prev, [topic.id]: [] }));
    setQIndex(0);
    setDraft("");
  };

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Free grammar practice"
        title="IELTS grammar exercises"
        description="Fix the grammar mistakes that cost the most marks in IELTS Writing and Speaking. Choose a topic, answer ten questions, and get an explanation after every answer."
        actions={
          <span className="badge-brand">
            <PenLine className="h-3.5 w-3.5" /> {GRAMMAR_TOPICS.length} topics · {GRAMMAR_TOPICS.reduce((n, t) => n + t.questions.length, 0)} questions
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <nav aria-label="Grammar topics" className="card h-fit p-3">
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {GRAMMAR_TOPICS.map((t) => {
              const s = scores[t.id];
              const active = t.id === topic.id;
              return (
                <li key={t.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => selectTopic(t.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition ${
                      active ? "bg-brand-50 text-brand-700" : "text-surface-600 hover:bg-surface-50"
                    }`}
                  >
                    <span className="whitespace-nowrap lg:whitespace-normal">{t.title}</span>
                    {s.done > 0 && (
                      <span className={`text-[11px] ${s.done === t.questions.length ? "text-emerald-600" : "text-surface-400"}`}>
                        {s.correct}/{t.questions.length}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="card space-y-5 p-5 sm:p-7" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[17px] font-bold text-surface-900">{topic.title}</h2>
            <span className="badge-neutral">
              Score {score}/{topic.questions.length}
            </span>
          </div>
          <ProgressBar value={(done / topic.questions.length) * 100} />
          <div className="flex flex-wrap gap-1.5">
            {topic.questions.map((_, i) => {
              const a = topicAnswers[i];
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Question ${i + 1}`}
                  onClick={() => {
                    setQIndex(i);
                    setDraft("");
                  }}
                  className={`h-8 w-8 rounded-lg border text-xs font-bold transition ${
                    i === qIndex ? "ring-2 ring-brand-400" : ""
                  } ${
                    a ? (a.correct ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700") : "border-surface-200 text-surface-500"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {finished && (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <Trophy className="h-5 w-5 text-emerald-600" />
              <span className="font-semibold">
                Topic complete: {score}/{topic.questions.length} ({Math.round((score / topic.questions.length) * 100)}%)
              </span>
              <button type="button" className="btn-secondary btn-sm ml-auto" onClick={resetTopic}>
                <RotateCcw className="h-3.5 w-3.5" /> Retry topic
              </button>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-[16px] leading-relaxed text-surface-900">
              <span className="mr-1 font-bold text-surface-400">{qIndex + 1}.</span>
              <Prompt text={q.prompt} />
            </p>

            {q.kind === "mcq" ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const chosen = current?.value === oi;
                  const right = current && oi === q.answer;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={!!current}
                      onClick={() => answer(oi)}
                      className={`rounded-lg border px-3.5 py-2.5 text-left text-sm transition ${
                        right
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                          : chosen
                            ? "border-rose-300 bg-rose-50 text-rose-900"
                            : "border-surface-200 hover:border-brand-300 hover:bg-brand-50/40 disabled:hover:border-surface-200 disabled:hover:bg-transparent"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <form
                className="flex flex-col gap-2 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  answer(draft);
                }}
              >
                <input
                  className="input sm:max-w-xs"
                  value={current ? String(current.value) : draft}
                  disabled={!!current}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type your answer"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Your answer"
                />
                {!current && (
                  <button type="submit" className="btn-primary" disabled={!draft.trim()}>
                    Check
                  </button>
                )}
              </form>
            )}

            {current && (
              <div
                className={`flex items-start gap-3 rounded-xl border p-4 text-sm animate-fade-up ${
                  current.correct ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"
                }`}
              >
                {current.correct ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold">
                    {current.correct ? "Correct." : "Not quite."}{" "}
                    {!current.correct && (
                      <>Answer: {q.kind === "mcq" ? q.options[q.answer] : q.accept[0]}</>
                    )}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              </div>
            )}

            {current && !finished && (
              <button type="button" className="btn-primary" onClick={next}>
                Next question <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
