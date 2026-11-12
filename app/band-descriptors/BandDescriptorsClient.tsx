"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, FileText, Mic, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { AdBanner } from "@/components/AdBanner";
import { SPEAKING_CRITERIA, TASK1_CRITERIA, TASK2_CRITERIA } from "@/lib/band-descriptors-data";

type RubricTab = "task2" | "task1" | "speaking";

const TABS: { id: RubricTab; label: string; short: string; Icon: typeof FileText }[] = [
  { id: "task2", label: "Writing Task 2 (Essay)", short: "Task 2", Icon: FileText },
  { id: "task1", label: "Writing Task 1 (Report/Letter)", short: "Task 1", Icon: BookOpen },
  { id: "speaking", label: "Speaking Interview", short: "Speaking", Icon: Mic },
];

const BANDS = [5, 6, 7, 8, 9];

const TAB_COPY: Record<RubricTab, string> = {
  task2: "Four equally weighted criteria for the discursive essay, marked from 0 to 9.",
  task1: "Task Achievement plus the three shared writing criteria, each worth 25%.",
  speaking: "Four equally weighted criteria used across all three speaking parts.",
};

export default function BandDescriptorsClient() {
  const [activeTab, setActiveTab] = useState<RubricTab>("task2");
  const [selectedBand, setSelectedBand] = useState<number>(7);

  const criteria =
    activeTab === "speaking" ? SPEAKING_CRITERIA : activeTab === "task1" ? TASK1_CRITERIA : TASK2_CRITERIA;
  const activeTabMeta = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Examiner assessment criteria"
        title="IELTS band descriptors"
        description="See exactly how IELTS examiners and our AI scoring engine evaluate essays and spoken responses across the four official criteria."
        actions={
          <>
            <span className="badge bg-violet-50 text-violet-700 border border-violet-200/70">
              <Sparkles className="h-3.5 w-3.5" />
              Public rubrics
            </span>
            <Link href="/tests?type=ACADEMIC" className="btn-secondary">
              <ArrowLeft className="h-4 w-4" />
              Practice books
            </Link>
          </>
        }
      />

      {/* Sticky controls */}
      <div className="card sticky top-[4.5rem] z-20 flex flex-col gap-4 p-3 lg:top-4 lg:flex-row lg:items-center lg:justify-between lg:p-4">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scroll-thin lg:pb-0">
          {TABS.map(({ id, label, short, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-pressed={activeTab === id}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition ${
                activeTab === id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200/80 hover:text-surface-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${activeTab === id ? "text-white/80" : "text-surface-400"}`} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-surface-200 bg-white p-1">
          <span className="px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-surface-400">Band</span>
          {BANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBand(b)}
              aria-pressed={selectedBand === b}
              className={`h-8 w-9 cursor-pointer rounded-lg font-display text-sm font-bold tabular-nums transition ${
                selectedBand === b
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <div className="eyebrow text-brand-600">Band {selectedBand}.0</div>
          <h2 className="mt-1.5 font-display text-xl font-extrabold tracking-tight text-surface-900 sm:text-2xl">
            {activeTabMeta.label}
          </h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-surface-500">{TAB_COPY[activeTab]}</p>
        </div>
        <span className="badge-neutral">{criteria.length} criteria · 25% each</span>
      </div>

      {/* Criteria cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {criteria.map((c, index) => (
          <article key={c.name} className="card flex flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-200/70 bg-brand-50 font-display text-[13px] font-bold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[15px] font-bold leading-snug tracking-tight text-surface-900 sm:text-base">
                  {c.name}
                </h2>
              </div>
              <span className="shrink-0 rounded-full border border-brand-200/70 bg-brand-50 px-2.5 py-1 text-[11px] font-bold tabular-nums text-brand-700">
                Band {selectedBand}.0
              </span>
            </div>

            <p className="mt-4 flex-1 rounded-xl border border-surface-200/80 bg-surface-50/70 p-4 text-[15px] leading-relaxed text-surface-700">
              {c.bands[selectedBand] || c.bands[7]}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-surface-100 pt-3.5 text-[13px]">
              <span className="text-surface-500">
                Next level ({selectedBand < 9 ? `Band ${selectedBand + 1}` : "Peak"})
              </span>
              <span className="font-semibold text-brand-700">
                {selectedBand < 9
                  ? "Greater flexibility & error-free accuracy"
                  : "Native-like precision throughout"}
              </span>
            </div>
          </article>
        ))}
      </div>

      <AdBanner minHeight={100} />

      {/* CTA */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-200/70 bg-brand-50/60 p-6 sm:p-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow text-brand-700">Ready to test yourself?</span>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-surface-900 sm:text-2xl">
            Get AI examiner feedback on your next test
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-surface-600">
            Write an essay or take a speaking module to receive an instant, itemised breakdown across all four criteria
            just like this.
          </p>
        </div>
        <Link href="/tests" className="btn-primary shrink-0">
          Choose a mock test
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
