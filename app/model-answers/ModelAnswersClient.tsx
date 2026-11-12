"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Lightbulb,
  PenTool,
  Sparkles,
  XCircle,
} from "lucide-react";
import { BandBadge, PageHeader } from "@/components/ui";
import { MODEL_ESSAYS, essayPath, type ModelEssay } from "@/lib/ielts-content-data";

type FilterType = "ALL" | "TASK_2" | "TASK_1_ACADEMIC" | "TASK_1_GENERAL";

const FILTERS: { id: FilterType; label: string }[] = [
  { id: "ALL", label: "All tasks" },
  { id: "TASK_2", label: "Task 2 essays" },
  { id: "TASK_1_ACADEMIC", label: "Task 1 academic" },
  { id: "TASK_1_GENERAL", label: "Task 1 general letters" },
];

const TASK_LABELS: Record<ModelEssay["taskType"], string> = {
  TASK_2: "Task 2 · Essay",
  TASK_1_ACADEMIC: "Task 1 · Academic",
  TASK_1_GENERAL: "Task 1 · General",
};

export default function ModelAnswersClient() {
  const [selectedEssay, setSelectedEssay] = useState<ModelEssay>(MODEL_ESSAYS[0]);
  const [filterType, setFilterType] = useState<FilterType>("ALL");
  const [highlightCohesion, setHighlightCohesion] = useState(true);
  const [highlightLexis, setHighlightLexis] = useState(true);
  const [highlightGrammar, setHighlightGrammar] = useState(true);
  const [viewMode, setViewMode] = useState<"model" | "comparison">("model");
  const [essayExpanded, setEssayExpanded] = useState(true);

  const filteredEssays = MODEL_ESSAYS.filter((e) => filterType === "ALL" || e.taskType === filterType);

  // Normalise the annotation palette in the stored HTML to the Calm Horizon accents.
  const essayHtml = useMemo(
    () =>
      selectedEssay.essayHtml
        .replaceAll("bg-blue-100", "bg-sky-100")
        .replaceAll("text-blue-900", "text-sky-900")
        .replaceAll("bg-purple-100", "bg-violet-100")
        .replaceAll("text-purple-900", "text-violet-900"),
    [selectedEssay],
  );

  const highlightClasses = [
    !highlightCohesion && "[&_.bg-sky-100]:bg-transparent [&_.bg-sky-100]:text-surface-700",
    !highlightLexis && "[&_.bg-emerald-100]:bg-transparent [&_.bg-emerald-100]:text-surface-700",
    !highlightGrammar && "[&_.bg-violet-100]:bg-transparent [&_.bg-violet-100]:text-surface-700",
  ]
    .filter(Boolean)
    .join(" ");

  const selectEssay = (essay: ModelEssay) => {
    setSelectedEssay(essay);
    setEssayExpanded(true);
  };

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Examiner-style benchmarks"
        title="Band 9 model answers"
        description="Study Band 9 responses with examiner-style commentary across Task Response, Coherence & Cohesion, Lexical Resource and Grammatical Range — then compare against common Band 6 pitfalls."
        actions={
          <Link href="/tests?type=ACADEMIC" className="btn-secondary">
            <PenTool className="h-4 w-4" />
            Start a writing test
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      {/* Filters + view toggle */}
      <div className="card flex flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 pr-1 text-[13px] font-semibold text-surface-500">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </span>
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterType(tab.id)}
              aria-pressed={filterType === tab.id}
              className={`cursor-pointer rounded-xl px-3.5 py-2 text-[13px] font-semibold transition ${
                filterType === tab.id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200/80 hover:text-surface-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="inline-flex shrink-0 rounded-xl border border-surface-200 bg-surface-100/80 p-1">
          {(
            [
              ["model", "Band 9 annotated"],
              ["comparison", "Band 9 vs Band 6"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setViewMode(id)}
              aria-pressed={viewMode === id}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-[12px] font-semibold transition sm:text-[13px] ${
                viewMode === id
                  ? "bg-white text-surface-900 shadow-xs ring-1 ring-surface-200"
                  : "text-surface-500 hover:text-surface-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left column: task selector */}
        <div className="space-y-4 lg:col-span-4">
          <div className="space-y-3">
            <span className="eyebrow block">Select exam task</span>
            {filteredEssays.map((essay) => {
              const isSelected = selectedEssay.id === essay.id;
              return (
                <button
                  key={essay.id}
                  type="button"
                  onClick={() => selectEssay(essay)}
                  aria-pressed={isSelected}
                  className={`w-full cursor-pointer rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? "border-brand-300 bg-brand-50/60 shadow-xs ring-1 ring-brand-200"
                      : "border-surface-200/80 bg-white shadow-xs hover:border-surface-300 hover:bg-surface-50/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                        isSelected
                          ? "border-brand-200 bg-white text-brand-700"
                          : "border-surface-200 bg-surface-50 text-surface-500"
                      }`}
                    >
                      {TASK_LABELS[essay.taskType]}
                    </span>
                    <BandBadge band={essay.band} />
                  </div>
                  <h3 className="mt-2.5 text-[15px] font-bold leading-snug text-surface-900">{essay.title}</h3>
                  <div className="mt-2.5 flex items-center justify-between text-[12px] text-surface-500">
                    <span>{essay.wordCount} words</span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isSelected ? "text-brand-700" : "text-surface-400"
                      }`}
                    >
                      Inspect
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Highlighter legend + toggles */}
          {viewMode === "model" && (
            <div className="card p-5">
              <h4 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-surface-500">
                <Eye className="h-4 w-4 text-brand-500" />
                Linguistic highlighters
              </h4>
              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={highlightCohesion}
                    onChange={(e) => setHighlightCohesion(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-brand-600"
                  />
                  <span className="inline-block h-3 w-3 shrink-0 rounded border border-sky-300 bg-sky-100" />
                  <span className="text-[13px] font-medium leading-snug text-surface-700">
                    Cohesion &amp; transitional markers
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={highlightLexis}
                    onChange={(e) => setHighlightLexis(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-brand-600"
                  />
                  <span className="inline-block h-3 w-3 shrink-0 rounded border border-emerald-300 bg-emerald-100" />
                  <span className="text-[13px] font-medium leading-snug text-surface-700">
                    Band 9 academic collocations
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={highlightGrammar}
                    onChange={(e) => setHighlightGrammar(e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-brand-600"
                  />
                  <span className="inline-block h-3 w-3 shrink-0 rounded border border-violet-300 bg-violet-100" />
                  <span className="text-[13px] font-medium leading-snug text-surface-700">
                    Complex grammatical structures
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Right column: essay + examiner notes */}
        <div className="space-y-6 lg:col-span-8">
          {/* Prompt */}
          <div className="card-muted p-5 sm:p-6">
            <span className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-surface-500">
              <FileText className="h-3.5 w-3.5 text-brand-500" />
              IELTS-style exam prompt
            </span>
            <p className="mt-2.5 text-[15px] font-medium leading-relaxed text-surface-800">
              &ldquo;{selectedEssay.prompt}&rdquo;
            </p>
          </div>

          {/* Model mode */}
          {viewMode === "model" && (
            <>
              <article className="card p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-surface-100 pb-4">
                  <div className="min-w-0">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-brand-700">
                      Band 9.0 model response
                    </span>
                    <h2 className="mt-1 font-display text-lg font-extrabold leading-snug tracking-tight text-surface-900 sm:text-xl">
                      {selectedEssay.title}
                    </h2>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <span className="badge-neutral">{selectedEssay.wordCount} words</span>
                    <BandBadge band={selectedEssay.band} />
                  </div>
                </div>

                <div className={`relative ${essayExpanded ? "" : "max-h-64 overflow-hidden"}`}>
                  <div
                    className={`max-w-prose pt-5 text-[16px] leading-[1.85] text-surface-700 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_span]:rounded [&_span]:px-1 [&_span]:font-medium ${highlightClasses}`}
                    dangerouslySetInnerHTML={{ __html: essayHtml }}
                  />
                  {!essayExpanded && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-surface-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setEssayExpanded((value) => !value)}
                    className="btn-ghost btn-sm"
                  >
                    {essayExpanded ? (
                      <>
                        Show less
                        <ChevronUp className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        Read full answer
                        <ChevronDown className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                  <Link href={essayPath(selectedEssay)} className="btn-ghost btn-sm text-brand-700">
                    Open full page
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>

              {/* Examiner criteria */}
              <section className="card p-5 sm:p-6">
                <h3 className="flex items-center gap-2 font-display text-[15px] font-bold text-surface-900">
                  <Sparkles className="h-4 w-4 text-brand-600" />
                  Examiner criteria annotations
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["Task achievement / response", "text-brand-700", selectedEssay.analysis.taskAchievementOrResponse],
                      ["Coherence & cohesion", "text-sky-700", selectedEssay.analysis.coherenceAndCohesion],
                      ["Lexical resource", "text-emerald-700", selectedEssay.analysis.lexicalResource],
                      ["Grammatical range & accuracy", "text-violet-700", selectedEssay.analysis.grammaticalRangeAndAccuracy],
                    ] as const
                  ).map(([label, tone, body]) => (
                    <div key={label} className="rounded-xl border border-surface-200/80 bg-surface-50/60 p-4">
                      <div className={`text-[12px] font-bold uppercase tracking-[0.08em] ${tone}`}>{label}</div>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-surface-600">{body}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Takeaways */}
              <section className="card p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-surface-500">
                  <Lightbulb className="h-4 w-4 text-amber-600" />
                  Key Band 9 writing strategies
                </h3>
                <ul className="mt-4 space-y-3">
                  {selectedEssay.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-surface-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {/* Comparison mode */}
          {viewMode === "comparison" && (
            <div className="animate-fade-up space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Band 6 */}
                <article className="card border-amber-200/80 bg-amber-50/30 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70 pb-3">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-amber-800">
                      Band 6.0 sample attempt
                    </span>
                    <span className="badge-warning">Band 6.0</span>
                  </div>
                  <p className="mt-4 rounded-xl border border-amber-100 bg-white p-4 text-[14px] italic leading-relaxed text-surface-700">
                    &ldquo;{selectedEssay.comparisonBand6.essayText}&rdquo;
                  </p>

                  <div className="mt-5">
                    <h5 className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-rose-700">
                      <XCircle className="h-3.5 w-3.5" />
                      Examiner-identified flaws
                    </h5>
                    <ul className="mt-2.5 space-y-2">
                      {selectedEssay.comparisonBand6.flaws.map((flaw, i) => (
                        <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-surface-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                          <span>{flaw}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>

                {/* Band 9 */}
                <article className="card border-emerald-200/80 bg-emerald-50/30 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/70 pb-3">
                    <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-emerald-800">
                      Band 9.0 solution
                    </span>
                    <span className="badge-success">Band 9.0</span>
                  </div>
                  <div
                    className="mt-4 line-clamp-10 rounded-xl border border-emerald-100 bg-white p-4 text-[14px] leading-relaxed text-surface-700 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_span]:rounded [&_span]:px-1 [&_span]:font-medium"
                    dangerouslySetInnerHTML={{ __html: essayHtml }}
                  />

                  <div className="mt-5">
                    <h5 className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Why it achieved Band 9
                    </h5>
                    <ul className="mt-2.5 space-y-2">
                      {[
                        "Zero mechanical templates; ideas dictate transitions.",
                        "Precise academic collocations without pretentious word stuffing.",
                        "Nuanced, balanced thesis that addresses subtle prompt nuances.",
                      ].map((point) => (
                        <li key={point} className="flex items-start gap-2 text-[13px] leading-relaxed text-surface-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
