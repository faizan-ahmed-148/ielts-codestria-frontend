"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { ChartView } from "@/components/ChartView";
import { ProgressBar, wordCount } from "@/components/ui";
import type { WritingContent } from "@/lib/content.types";

type Answers = { task1?: string; task2?: string };

export function WritingRunner({
  content,
  answers,
  setAnswer,
}: {
  content: WritingContent;
  answers: Answers;
  setAnswer: (key: "task1" | "task2", value: string) => void;
}) {
  const [tab, setTab] = useState<"task1" | "task2">("task1");
  const task = content[tab];
  const words = wordCount(answers[tab]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface-50">
      {/* Task switcher */}
      <div className="border-b border-surface-200 bg-white px-3 sm:px-6">
        <div className="mx-auto flex w-full max-w-8xl gap-1">
          {(["task1", "task2"] as const).map((t) => {
            const w = wordCount(answers[t]);
            const ok = w >= content[t].minWords;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex cursor-pointer items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition ${
                  tab === t
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-surface-500 hover:text-surface-900"
                }`}
              >
                {ok && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                {t === "task1" ? "Task 1" : "Task 2"}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    ok
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-surface-100 text-surface-500"
                  }`}
                >
                  {w} words
                </span>
              </button>
            );
          })}
          <span className="ml-auto hidden self-center text-xs text-surface-400 sm:block">
            Task 2 counts twice as much as Task 1
          </span>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-8xl min-h-0 flex-1 lg:grid-cols-2">
        {/* Prompt */}
        <div className="scroll-thin space-y-5 overflow-y-auto border-surface-200 bg-white px-5 py-7 sm:px-8 sm:py-9 lg:h-[calc(100vh-8.25rem)] lg:border-r lg:px-10">
          <div className="flex items-center gap-2 text-sm font-medium text-surface-500">
            <Clock className="h-4 w-4" />
            {tab === "task1"
              ? "Spend about 20 minutes on this task."
              : "Spend about 40 minutes on this task."}
          </div>

          <div>
            <div className="eyebrow mb-2 text-brand-600">
              {tab === "task1" ? "Task 1 · Report or letter" : "Task 2 · Argument essay"}
            </div>
            <p className="whitespace-pre-line rounded-2xl border border-surface-200 bg-surface-50 p-5 text-[15px] font-medium leading-7 text-surface-800">
              {task.prompt}
            </p>
          </div>

          {tab === "task1" && content.task1.chart && (
            <div className="rounded-2xl border border-surface-200 bg-white p-2">
              <ChartView chart={content.task1.chart} />
            </div>
          )}

          <div className="rounded-xl border border-brand-100 bg-brand-50/70 px-4 py-3 text-sm text-brand-800">
            <strong className="font-semibold">Minimum length:</strong> write at least {task.minWords} words.
            Under-length answers lose marks.
          </div>
        </div>

        {/* Editor */}
        <div className="flex flex-col bg-surface-50 p-4 sm:p-6 lg:h-[calc(100vh-8.25rem)]">
          <div className="card flex flex-1 flex-col overflow-hidden transition focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-100">
            <div className="flex items-center justify-between border-b border-surface-100 bg-white px-5 py-2.5">
              <span className="text-[13px] font-semibold text-surface-700">
                {tab === "task1" ? "Task 1 response" : "Task 2 response"}
              </span>
              <span className="text-xs text-surface-400">Autosaved</span>
            </div>
            <textarea
              value={answers[tab] ?? ""}
              onChange={(e) => setAnswer(tab, e.target.value)}
              spellCheck={false}
              placeholder={
                tab === "task1"
                  ? "Write your Task 1 answer here…"
                  : "Write your Task 2 essay here…"
              }
              className="min-h-[50vh] flex-1 resize-none bg-white p-5 text-[16px] leading-8 text-surface-800 outline-none placeholder:text-surface-400 sm:p-6"
            />
            <div className="flex items-center gap-4 border-t border-surface-100 bg-white px-5 py-3">
              <ProgressBar
                value={(words / task.minWords) * 100}
                className="flex-1"
                color={words >= task.minWords ? "bg-emerald-500" : "bg-brand-500"}
              />
              <span
                className={`shrink-0 text-[13px] font-semibold tabular-nums ${
                  words >= task.minWords ? "text-emerald-600" : "text-surface-500"
                }`}
              >
                {words} / {task.minWords} words
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
