"use client";

import { Check, Flag, HelpCircle, Lightbulb, X } from "lucide-react";
import type { Question, QuestionGroup } from "@/lib/content.types";
import type { QuestionResult } from "@/lib/api";
import type { QuestionExplanation } from "@/lib/cambridge-library";

const letter = (i: number) => String.fromCharCode(65 + i);
const CHOICES = { tfng: ["TRUE", "FALSE", "NOT GIVEN"], ynng: ["YES", "NO", "NOT GIVEN"] } as const;

interface Props {
  groups: QuestionGroup[];
  startNumber: number;
  answers: Record<string, string>;
  onChange?: (id: string, value: string) => void;
  flags?: Record<string, boolean>;
  onToggleFlag?: (id: string) => void;
  /** Review mode: show correct answers and marks. */
  results?: Record<string, QuestionResult>;
  explanations?: Record<string, QuestionExplanation>;
  renderExtra?: (q: Question, result?: QuestionResult) => React.ReactNode;
}

/** Shared options shown once above a group whose questions all use the same list (e.g. headings). */
function sharedOptions(group: QuestionGroup): string[] | null {
  const lists = group.questions.map((q) => ("options" in q ? q.options.join("|") : null));
  return group.questions[0]?.type === "match" && lists.every((l) => l && l === lists[0])
    ? (group.questions[0] as { options: string[] }).options
    : null;
}

export function QuestionGroups({
  groups,
  startNumber,
  answers,
  onChange,
  flags,
  onToggleFlag,
  results,
  explanations,
  renderExtra,
}: Props) {
  let n = startNumber;
  return (
    <div className="space-y-10">
      {groups.map((group, gi) => {
        const first = n;
        const last = n + group.questions.length - 1;
        const shared = sharedOptions(group);
        return (
          <section key={gi}>
            <div className="rounded-xl border border-surface-200 bg-surface-50 px-4 py-3">
              <h3 className="text-sm font-bold text-surface-900">
                Questions {first}
                {last > first ? `–${last}` : ""}
              </h3>
              <p className="mt-1 text-sm whitespace-pre-line text-surface-600">{group.instructions}</p>
            </div>
            {shared && !shared.every((o, i) => o.trim() === letter(i)) && (
              <ul className="mt-3 grid gap-x-6 gap-y-1.5 rounded-xl border border-surface-200 bg-white p-4 text-sm sm:grid-cols-2">
                {shared.map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-5 shrink-0 font-bold text-brand-600">{letter(i)}</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            )}
            <ol className="mt-4 space-y-3">
              {group.questions.map((q) => {
                const number = n++;
                const result = results?.[q.id];
                const isFlagged = flags?.[q.id];
                const explanation = explanations?.[q.id];

                return (
                  <li
                    key={q.id}
                    id={`q-${q.id}`}
                    className={`scroll-mt-24 rounded-xl border p-4 transition ${
                      result
                        ? result.correct
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-red-200 bg-red-50/40"
                        : isFlagged
                          ? "border-amber-300 bg-amber-50/40 ring-2 ring-amber-200/60"
                          : answers[q.id]?.trim()
                            ? "border-brand-100 bg-white"
                            : "border-transparent bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <QuestionItem
                          number={number}
                          q={q}
                          value={answers[q.id] ?? ""}
                          onChange={onChange}
                          hideOptions={!!shared}
                          disabled={!onChange}
                          result={result}
                        />
                      </div>
                      {onToggleFlag && !result && (
                        <button
                          type="button"
                          onClick={() => onToggleFlag(q.id)}
                          title={isFlagged ? "Remove review flag" : "Flag for review"}
                          className={`mt-0.5 flex h-7 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold transition ${
                            isFlagged
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                              : "text-surface-400 hover:bg-surface-100 hover:text-surface-600"
                          }`}
                        >
                          <Flag className={`h-3.5 w-3.5 ${isFlagged ? "fill-amber-600 text-amber-600" : ""}`} />
                          <span className="hidden sm:inline">{isFlagged ? "Flagged" : "Flag"}</span>
                        </button>
                      )}
                    </div>

                    {result && (
                      <div className="mt-3 ml-10 flex flex-wrap items-center gap-2 text-sm">
                        {result.correct ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700">
                            <Check className="h-3.5 w-3.5" /> Correct
                          </span>
                        ) : (
                          <>
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 font-semibold text-red-700">
                              <X className="h-3.5 w-3.5" /> {result.yourAnswer ? `You: ${result.yourAnswer}` : "Not answered"}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-semibold text-emerald-700">
                              <Check className="h-3.5 w-3.5" /> Answer: {result.correctAnswers[0]}
                            </span>
                            {result.correctAnswers.length > 1 && (
                              <span className="text-xs text-surface-500">
                                Also accepted: {result.correctAnswers.slice(1).join(", ")}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* In-depth Answer Key & Examiner Explanation */}
                    {result && explanation && (
                      <div className="mt-3.5 ml-10 rounded-xl border border-surface-200 bg-white/90 p-3.5 text-xs text-surface-700 shadow-xs">
                        <div className="flex items-center gap-1.5 font-bold text-surface-900">
                          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                          <span>Examiner Explanation:</span>
                          {explanation.paragraphRef && (
                            <span className="rounded bg-surface-100 px-1.5 py-0.5 font-mono text-[10px] text-surface-600">
                              {explanation.paragraphRef}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 leading-relaxed text-surface-600">{explanation.explanation}</p>
                        {explanation.keyVocabulary && explanation.keyVocabulary.length > 0 && (
                          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                            <span className="font-semibold text-surface-500">Key Keywords & Paraphrases:</span>
                            {explanation.keyVocabulary.map((word, wi) => (
                              <span key={wi} className="rounded-md bg-brand-50 px-1.5 py-0.5 font-medium text-brand-700">
                                {word}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {renderExtra?.(q, result)}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

function cleanPrompt(text: string): string {
  if (!text) return "";
  return text.replace(/\s*\[c\d+_[^\]]+\]\s*/g, " ").trim();
}

function QuestionItem({
  number,
  q,
  value,
  onChange,
  hideOptions,
  disabled,
  result,
}: {
  number: number;
  q: Question;
  value: string;
  onChange?: (id: string, v: string) => void;
  hideOptions: boolean;
  disabled: boolean;
  result?: QuestionResult;
}) {
  const set = (v: string) => onChange?.(q.id, v);
  const correct = result?.correctAnswers[0];
  const num = (
    <span
      className={`mt-0.5 inline-flex h-7 min-w-7 shrink-0 items-center justify-center rounded-lg px-1.5 text-xs font-bold ${
        value.trim() ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600"
      }`}
    >
      {number}
    </span>
  );

  if (q.type === "gap") {
    const sanitizedPrompt = cleanPrompt(q.prompt);
    const [before, after] = sanitizedPrompt.split("_____");
    return (
      <div className="flex items-start gap-3">
        {num}
        <div className="flex-1 text-sm leading-7 text-surface-800">
          <span>{before}</span>
          <input
            type="text"
            value={value}
            disabled={disabled}
            onChange={(e) => set(e.target.value)}
            placeholder={result ? correct : "your answer"}
            className="mx-1 inline-block h-8 w-44 rounded-lg border border-surface-300 bg-white px-2.5 text-sm font-semibold text-surface-900 shadow-xs outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-surface-50"
          />
          <span>{after}</span>
        </div>
      </div>
    );
  }

  if (q.type === "tfng" || q.type === "ynng") {
    const choices = CHOICES[q.type];
    return (
      <div className="flex items-start gap-3">
        {num}
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-surface-800">{cleanPrompt((q as any).prompt)}</p>
          <div className="flex flex-wrap gap-2">
            {choices.map((c) => {
              const active = value.toUpperCase() === c;
              return (
                <button
                  key={c}
                  type="button"
                  disabled={disabled}
                  onClick={() => set(active ? "" : c)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                    active
                      ? "border-brand-600 bg-brand-600 text-white shadow-xs"
                      : "border-surface-200 bg-white text-surface-700 hover:border-surface-300 hover:bg-surface-50"
                  } disabled:cursor-default`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (q.type === "mcq") {
    return (
      <div className="flex items-start gap-3">
        {num}
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-surface-800">{cleanPrompt((q as any).prompt)}</p>
          <div className="space-y-1.5">
            {q.options.map((opt, i) => {
              const optLetter = letter(i);
              const active = value.toUpperCase() === optLetter || value === opt;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => set(active ? "" : optLetter)}
                  className={`flex w-full items-start gap-2.5 rounded-lg border p-2.5 text-left text-xs transition ${
                    active
                      ? "border-brand-500 bg-brand-50/70 font-semibold text-brand-900 ring-1 ring-brand-500"
                      : "border-surface-200 bg-white text-surface-700 hover:bg-surface-50"
                  } disabled:cursor-default`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      active ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600"
                    }`}
                  >
                    {optLetter}
                  </span>
                  <span className="flex-1 leading-5">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (q.type === "match") {
    return (
      <div className="flex items-start gap-3">
        {num}
        <div className="flex-1 space-y-2">
          <p className="text-sm font-medium text-surface-800">{cleanPrompt((q as any).prompt)}</p>
          {!hideOptions ? (
            <div className="grid gap-1.5 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const optLetter = letter(i);
                const active = value.toUpperCase() === optLetter || value === opt;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={disabled}
                    onClick={() => set(active ? "" : optLetter)}
                    className={`flex items-center gap-2 rounded-lg border p-2 text-left text-xs transition ${
                      active
                        ? "border-brand-500 bg-brand-50 font-semibold text-brand-900"
                        : "border-surface-200 bg-white text-surface-700 hover:bg-surface-50"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        active ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600"
                      }`}
                    >
                      {optLetter}
                    </span>
                    <span className="truncate">{opt}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-surface-500">Select heading letter:</span>
              <select
                value={value}
                disabled={disabled}
                onChange={(e) => set(e.target.value)}
                className="h-8 rounded-lg border border-surface-300 bg-white px-3 text-xs font-bold text-surface-800 shadow-xs outline-none focus:border-brand-500"
              >
                <option value="">Choose...</option>
                {q.options.map((_, i) => (
                  <option key={i} value={letter(i)}>
                    {letter(i)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fallback text input
  return (
    <div className="flex items-start gap-3">
      {num}
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium text-surface-800">{cleanPrompt((q as any).prompt)}</p>
        <input
          type="text"
          value={value}
          disabled={disabled}
          onChange={(e) => set(e.target.value)}
          placeholder={result ? correct : "Type answer..."}
          className="h-9 w-full max-w-sm rounded-lg border border-surface-300 bg-white px-3 text-sm font-medium text-surface-800 shadow-xs outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:bg-surface-50"
        />
      </div>
    </div>
  );
}

export function countQuestions(groups: QuestionGroup[]): number {
  return groups.reduce((acc, g) => acc + g.questions.length, 0);
}
