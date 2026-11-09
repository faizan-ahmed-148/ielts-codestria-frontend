"use client";

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Eye,
  Filter,
  GraduationCap,
  Layers,
  Lightbulb,
  PenTool,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MODEL_ESSAYS, ModelEssay } from "@/lib/ielts-content-data";

export default function ModelAnswersPage() {
  const [selectedEssay, setSelectedEssay] = useState<ModelEssay>(MODEL_ESSAYS[0]);
  const [filterType, setFilterType] = useState<"ALL" | "TASK_2" | "TASK_1_ACADEMIC" | "TASK_1_GENERAL">("ALL");
  const [highlightCohesion, setHighlightCohesion] = useState(true);
  const [highlightLexis, setHighlightLexis] = useState(true);
  const [highlightGrammar, setHighlightGrammar] = useState(true);
  const [viewMode, setViewMode] = useState<"model" | "comparison">("model");

  const filteredEssays = MODEL_ESSAYS.filter(
    (e) => filterType === "ALL" || e.taskType === filterType
  );

  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-800">
            <PenTool className="h-3.5 w-3.5 text-purple-600" />
            <span>Cambridge Examiner Benchmarks</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
            by Codestria
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Band 9.0 Model Writing Essays &amp; Annotations
        </h1>
        <p className="mt-2 text-base text-slate-600 max-w-3xl">
          Examine authentic Band 9 sample responses side-by-side with official examiner commentary across Task Response, Coherence &amp; Cohesion, Lexical Resource, and Grammatical Range. Compare against common Band 6 pitfalls.
        </p>
      </div>

      {/* Task Filters */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filter:
          </span>
          {[
            { id: "ALL", label: "All Tasks" },
            { id: "TASK_2", label: "Task 2 Essays" },
            { id: "TASK_1_ACADEMIC", label: "Task 1 Academic" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filterType === tab.id
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          <button
            onClick={() => setViewMode("model")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "model"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Band 9 Annotated Model
          </button>
          <button
            onClick={() => setViewMode("comparison")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "comparison"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Band 9 vs Band 6 Contrast
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Task Selector */}
        <div className="space-y-3 lg:col-span-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Select Exam Task
          </label>
          {filteredEssays.map((essay) => (
            <div
              key={essay.id}
              onClick={() => setSelectedEssay(essay)}
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                selectedEssay.id === essay.id
                  ? "border-purple-600 bg-purple-50/50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                  {essay.taskType.replace(/_/g, " ")}
                </span>
                <span className="text-xs font-extrabold text-purple-700">
                  Band {essay.band.toFixed(1)}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-slate-900 leading-snug">
                {essay.title}
              </h3>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>{essay.wordCount} words</span>
                <span className="text-purple-600 font-semibold flex items-center gap-1">
                  Inspect <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}

          {/* Interactive Feature Highlighter Legend & Toggles */}
          {viewMode === "model" && (
            <div className="card p-5 mt-6 border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-purple-600" />
                Linguistic Element Highlighters
              </h4>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={highlightCohesion}
                    onChange={(e) => setHighlightCohesion(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="inline-block h-3 w-3 rounded bg-blue-100 border border-blue-300" />
                  <span className="text-slate-700 font-medium">Cohesion &amp; Transitional Markers</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={highlightLexis}
                    onChange={(e) => setHighlightLexis(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="inline-block h-3 w-3 rounded bg-emerald-100 border border-emerald-300" />
                  <span className="text-slate-700 font-medium">Band 9 Academic Collocations</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={highlightGrammar}
                    onChange={(e) => setHighlightGrammar(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="inline-block h-3 w-3 rounded bg-purple-100 border border-purple-300" />
                  <span className="text-slate-700 font-medium">Complex Grammatical Structures</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Model Essay Display & Examiner Notes */}
        <div className="space-y-6 lg:col-span-8">
          {/* Prompt Banner */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Official IELTS Exam Prompt
            </span>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              "{selectedEssay.prompt}"
            </p>
          </div>

          {/* VIEW MODE: BAND 9 ANNOTATED MODEL */}
          {viewMode === "model" && (
            <>
              {/* Essay Paper Container */}
              <div className="card p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Band 9.0 Model Response
                    </span>
                    <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {selectedEssay.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                      {selectedEssay.wordCount} Words
                    </span>
                  </div>
                </div>

                {/* Essay text formatted with semantic spans */}
                <div
                  className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-800 space-y-4"
                  dangerouslySetInnerHTML={{ __html: selectedEssay.essayHtml }}
                />
              </div>

              {/* Examiner 4-Criteria Assessment Breakdown */}
              <div className="card p-6 shadow-sm border-purple-100 bg-gradient-to-br from-white to-purple-50/20">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  Official Examiner Criteria Annotations (Band 9.0)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="font-bold text-purple-800 uppercase tracking-wider text-[11px]">
                      Task Achievement / Response
                    </div>
                    <p className="mt-1 text-slate-600 leading-relaxed">
                      {selectedEssay.analysis.taskAchievementOrResponse}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="font-bold text-blue-800 uppercase tracking-wider text-[11px]">
                      Coherence &amp; Cohesion
                    </div>
                    <p className="mt-1 text-slate-600 leading-relaxed">
                      {selectedEssay.analysis.coherenceAndCohesion}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="font-bold text-emerald-800 uppercase tracking-wider text-[11px]">
                      Lexical Resource
                    </div>
                    <p className="mt-1 text-slate-600 leading-relaxed">
                      {selectedEssay.analysis.lexicalResource}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <div className="font-bold text-indigo-800 uppercase tracking-wider text-[11px]">
                      Grammatical Range &amp; Accuracy
                    </div>
                    <p className="mt-1 text-slate-600 leading-relaxed">
                      {selectedEssay.analysis.grammaticalRangeAndAccuracy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Takeaways */}
              <div className="card p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                  Key Writing Band 9 Strategies
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedEssay.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* VIEW MODE: COMPARISON CONTRAST (BAND 9 VS BAND 6) */}
          {viewMode === "comparison" && (
            <div className="space-y-6 animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Band 6 Sample */}
                <div className="card p-6 border-amber-200 bg-amber-50/20">
                  <div className="flex items-center justify-between border-b border-amber-200/80 pb-3 mb-4">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      Band 6.0 Sample Attempt
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
                      Band 6.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-4 rounded-xl border border-amber-100">
                    "{selectedEssay.comparisonBand6.essayText}"
                  </p>

                  <div className="mt-4">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1">
                      <XCircle className="h-3.5 w-3.5" />
                      Examiner Identified Flaws:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {selectedEssay.comparisonBand6.flaws.map((flaw, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{flaw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Band 9 Summary */}
                <div className="card p-6 border-emerald-200 bg-emerald-50/20">
                  <div className="flex items-center justify-between border-b border-emerald-200/80 pb-3 mb-4">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Band 9.0 Solution
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      Band 9.0
                    </span>
                  </div>
                  <div
                    className="text-xs text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-emerald-100 line-clamp-10"
                    dangerouslySetInnerHTML={{ __html: selectedEssay.essayHtml }}
                  />

                  <div className="mt-4">
                    <h5 className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Why it achieved Band 9:
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Zero mechanical templates; ideas dictate transitions.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Precise academic collocations without pretentious word stuffing.</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Nuanced, balanced thesis that addresses subtle prompt nuances.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
