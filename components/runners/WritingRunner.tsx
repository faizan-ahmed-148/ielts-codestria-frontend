"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { ChartView } from "@/components/ChartView";
import { ProgressBar, wordCount } from "@/components/ui";
import type { WritingContent } from "@/lib/content.types";

type Answers = { task1?: string; task2?: string };

export function WritingRunner({ content, answers, setAnswer }: {
  content: WritingContent;
  answers: Answers;
  setAnswer: (key: "task1" | "task2", value: string) => void;
}) {
  const [tab, setTab] = useState<"task1" | "task2">("task1");
  const task = content[tab];
  const words = wordCount(answers[tab]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex gap-1 border-b border-slate-200 bg-white px-4">
        {(["task1", "task2"] as const).map((t) => {
          const w = wordCount(answers[t]);
          const ok = w >= content[t].minWords;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition ${tab === t ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
              {ok && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              {t === "task1" ? "Task 1" : "Task 2"}
              <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-500">{w} words</span>
            </button>
          );
        })}
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <div className="scroll-thin space-y-5 overflow-y-auto border-slate-200 bg-white px-6 py-8 lg:h-[calc(100vh-7.5rem)] lg:border-r lg:px-10">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            {tab === "task1" ? "Spend about 20 minutes on this task." : "Spend about 40 minutes on this task. Task 2 counts double."}
          </div>
          <p className="rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 font-medium whitespace-pre-line text-slate-800">{task.prompt}</p>
          {tab === "task1" && content.task1.chart && <ChartView chart={content.task1.chart} />}
          <p className="text-sm text-slate-500">Write at least {task.minWords} words.</p>
        </div>
        <div className="flex flex-col bg-slate-50/60 p-4 lg:h-[calc(100vh-7.5rem)] lg:p-8">
          <div className="card flex flex-1 flex-col overflow-hidden focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-50">
            <textarea
              value={answers[tab] ?? ""}
              onChange={(e) => setAnswer(tab, e.target.value)}
              spellCheck={false}
              placeholder={tab === "task1" ? "Write your Task 1 answer here…" : "Write your Task 2 essay here…"}
              className="min-h-[50vh] flex-1 resize-none bg-transparent p-6 text-[16px] leading-8 text-slate-800 outline-none placeholder:text-slate-400"
            />
            <div className="flex items-center gap-4 border-t border-slate-100 px-6 py-3">
              <ProgressBar value={(words / task.minWords) * 100} className="flex-1" color={words >= task.minWords ? "bg-emerald-500" : "bg-brand-500"} />
              <span className={`text-sm font-semibold tabular-nums ${words >= task.minWords ? "text-emerald-600" : "text-slate-500"}`}>
                {words} / {task.minWords} words
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
