"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Award,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Info,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { BandRing, MODULE_INFO, PageHeader } from "@/components/ui";
import type { ModuleKind } from "@/lib/content.types";

// Official IELTS raw to band conversions matching backend/src/scoring/bands.ts
const LISTENING_TABLE = [
  { min: 39, band: 9.0 },
  { min: 37, band: 8.5 },
  { min: 35, band: 8.0 },
  { min: 32, band: 7.5 },
  { min: 30, band: 7.0 },
  { min: 26, band: 6.5 },
  { min: 23, band: 6.0 },
  { min: 18, band: 5.5 },
  { min: 16, band: 5.0 },
  { min: 13, band: 4.5 },
  { min: 10, band: 4.0 },
  { min: 8, band: 3.5 },
  { min: 6, band: 3.0 },
  { min: 4, band: 2.5 },
  { min: 3, band: 2.0 },
  { min: 2, band: 1.5 },
  { min: 1, band: 1.0 },
  { min: 0, band: 0.0 },
];

const READING_ACADEMIC_TABLE = [
  { min: 39, band: 9.0 },
  { min: 37, band: 8.5 },
  { min: 35, band: 8.0 },
  { min: 33, band: 7.5 },
  { min: 30, band: 7.0 },
  { min: 27, band: 6.5 },
  { min: 23, band: 6.0 },
  { min: 19, band: 5.5 },
  { min: 15, band: 5.0 },
  { min: 13, band: 4.5 },
  { min: 10, band: 4.0 },
  { min: 8, band: 3.5 },
  { min: 6, band: 3.0 },
  { min: 4, band: 2.5 },
  { min: 3, band: 2.0 },
  { min: 2, band: 1.5 },
  { min: 1, band: 1.0 },
  { min: 0, band: 0.0 },
];

const READING_GENERAL_TABLE = [
  { min: 40, band: 9.0 },
  { min: 39, band: 8.5 },
  { min: 37, band: 8.0 },
  { min: 36, band: 7.5 },
  { min: 34, band: 7.0 },
  { min: 32, band: 6.5 },
  { min: 30, band: 6.0 },
  { min: 27, band: 5.5 },
  { min: 23, band: 5.0 },
  { min: 19, band: 4.5 },
  { min: 15, band: 4.0 },
  { min: 12, band: 3.5 },
  { min: 9, band: 3.0 },
  { min: 6, band: 2.5 },
  { min: 4, band: 2.0 },
  { min: 2, band: 1.5 },
  { min: 1, band: 1.0 },
  { min: 0, band: 0.0 },
];

function rawToBand(score: number, table: { min: number; band: number }[]): number {
  const clamped = Math.max(0, Math.min(40, score));
  for (const entry of table) {
    if (clamped >= entry.min) return entry.band;
  }
  return 0.0;
}

/**
 * Official IELTS overall band rounding algorithm:
 * - If average ends in .25, rounds up to .5
 * - If average ends in .75, rounds up to next whole band
 * - Otherwise rounds to nearest whole or half band
 */
function calculateOverall(l: number, r: number, w: number, s: number): { average: number; overall: number } {
  const avg = (l + r + w + s) / 4;
  const overall = Math.min(9, Math.max(0, Math.round(avg * 2) / 2));
  return { average: Math.round(avg * 100) / 100, overall };
}

type TabId = "overall" | "raw" | "writing";

const TABS: { id: TabId; label: string; Icon: typeof Award }[] = [
  { id: "overall", label: "Overall band", Icon: Award },
  { id: "raw", label: "Raw to band", Icon: Calculator },
  { id: "writing", label: "Writing tasks", Icon: TrendingUp },
];

const LISTENING_ROWS = [
  { range: "39–40", b: 9.0 },
  { range: "37–38", b: 8.5 },
  { range: "35–36", b: 8.0 },
  { range: "32–34", b: 7.5 },
  { range: "30–31", b: 7.0 },
  { range: "26–29", b: 6.5 },
  { range: "23–25", b: 6.0 },
  { range: "18–22", b: 5.5 },
];

const READING_ACADEMIC_ROWS = [
  { range: "39–40", b: 9.0 },
  { range: "37–38", b: 8.5 },
  { range: "35–36", b: 8.0 },
  { range: "33–34", b: 7.5 },
  { range: "30–32", b: 7.0 },
  { range: "27–29", b: 6.5 },
  { range: "23–26", b: 6.0 },
  { range: "19–22", b: 5.5 },
];

const READING_GENERAL_ROWS = [
  { range: "40", b: 9.0 },
  { range: "39", b: 8.5 },
  { range: "37–38", b: 8.0 },
  { range: "36", b: 7.5 },
  { range: "34–35", b: 7.0 },
  { range: "32–33", b: 6.5 },
  { range: "30–31", b: 6.0 },
  { range: "27–29", b: 5.5 },
];

const BAND_SCALE = [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0];

export default function BandCalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overall");

  // Overall calculator state
  const [listening, setListening] = useState(7.5);
  const [reading, setReading] = useState(7.0);
  const [writing, setWriting] = useState(6.5);
  const [speaking, setSpeaking] = useState(7.0);

  // Raw score state
  const [rawListening, setRawListening] = useState(32);
  const [rawReading, setRawReading] = useState(30);
  const [readingTrack, setReadingTrack] = useState<"academic" | "general">("academic");

  // Writing detailed criteria state
  const [task1, setTask1] = useState(7.0);
  const [task2, setTask2] = useState(7.0);

  const { average, overall } = calculateOverall(listening, reading, writing, speaking);
  const calculatedListeningBand = rawToBand(rawListening, LISTENING_TABLE);
  const calculatedReadingBand = rawToBand(
    rawReading,
    readingTrack === "academic" ? READING_ACADEMIC_TABLE : READING_GENERAL_TABLE,
  );

  // Writing task 2 counts for 2/3 (66.6%) and task 1 for 1/3 (33.3%)
  const writingWeighted = Math.round(((task1 + task2 * 2) / 3) * 2) / 2;

  const bandDescriptions: Record<number, string> = {
    9.0: "Expert User: Has fully operational command of the language with complete accuracy and fluency.",
    8.5: "Very Good User+: Operational command with only occasional unsystematic inaccuracies.",
    8.0: "Very Good User: Fully operational command with only occasional unsystematic inaccuracies and misunderstandings.",
    7.5: "Good User+: Operational command with occasional inaccuracies in complex situations.",
    7.0: "Good User: Has operational command of the language, though with occasional inaccuracies and misunderstandings.",
    6.5: "Competent User+: Generally effective command with a good grasp of complex language.",
    6.0: "Competent User: Has generally effective command despite some inaccuracies and misunderstandings.",
    5.5: "Modest User+: Partial command with frequent mistakes, but can handle basic communication.",
    5.0: "Modest User: Has partial command of language, coping with overall meaning in most situations.",
  };

  const moduleSliders: {
    module: ModuleKind;
    value: number;
    setValue: (value: number) => void;
    accent: string;
  }[] = [
    { module: "LISTENING", value: listening, setValue: setListening, accent: "accent-sky-600" },
    { module: "READING", value: reading, setValue: setReading, accent: "accent-emerald-600" },
    { module: "WRITING", value: writing, setValue: setWriting, accent: "accent-amber-600" },
    { module: "SPEAKING", value: speaking, setValue: setSpeaking, accent: "accent-brand-600" },
  ];

  const presets = [
    { label: "Band 6.5 · Standard uni entry", l: 6.5, r: 6.5, w: 6.0, s: 6.5 },
    { label: "Band 7.0 · Top uni / CLB 9", l: 7.5, r: 7.0, w: 6.5, s: 7.0 },
    { label: "Band 7.5 · Medicine & law", l: 8.0, r: 7.5, w: 7.0, s: 7.5 },
    { label: "Band 8.0 · Elite master's", l: 8.5, r: 8.5, w: 7.5, s: 8.0 },
  ];

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Interactive diagnostics"
        title="IELTS band score calculator"
        description="Work out your overall band, convert Listening and Reading raw scores (0–40), and see how each module shapes your target university or immigration requirement."
        actions={
          <>
            <span className="badge-brand">
              <Sparkles className="h-3.5 w-3.5" />
              Official rounding standard
            </span>
            <Link href="/tests?type=ACADEMIC" className="btn-secondary">
              <ArrowLeft className="h-4 w-4" />
              Cambridge books
            </Link>
          </>
        }
      />

      {/* Mode switcher */}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-surface-200 bg-surface-100/80 p-1.5 sm:inline-flex">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            aria-pressed={activeTab === id}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition sm:flex-none ${
              activeTab === id
                ? "bg-white text-surface-900 shadow-xs ring-1 ring-surface-200"
                : "text-surface-500 hover:bg-white/60 hover:text-surface-900"
            }`}
          >
            <Icon className={`h-4 w-4 ${activeTab === id ? "text-brand-600" : "text-surface-400"}`} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overall Band Calculator */}
      {activeTab === "overall" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card space-y-6 p-5 sm:p-7 lg:col-span-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-lg font-bold tracking-tight text-surface-900">Module bands</h2>
              <span className="text-[13px] text-surface-500">Adjust the sliders or pick a preset</span>
            </div>

            {/* Module sliders */}
            <div className="space-y-3">
              {moduleSliders.map(({ module, value, setValue, accent }) => {
                const { Icon, label, tile } = MODULE_INFO[module];
                return (
                  <div key={module} className="rounded-2xl border border-surface-200/80 bg-surface-50/60 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${tile}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[15px] font-semibold text-surface-800">{label}</span>
                      </div>
                      <span
                        className={`inline-flex min-w-14 items-center justify-center rounded-lg border px-2.5 py-1 font-display text-base font-bold tabular-nums ${tile}`}
                      >
                        {value.toFixed(1)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="3.0"
                      max="9.0"
                      step="0.5"
                      value={value}
                      onChange={(e) => setValue(parseFloat(e.target.value))}
                      aria-label={`${label} band`}
                      className={`h-2 w-full cursor-pointer ${accent}`}
                    />
                    <div className="mt-1.5 flex justify-between font-mono text-[11px] tabular-nums text-surface-400">
                      {BAND_SCALE.map((n) => (
                        <span key={n}>{n.toFixed(1)}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick target presets */}
            <div className="space-y-3 border-t border-surface-100 pt-5">
              <span className="eyebrow">Quick target profiles</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setListening(preset.l);
                      setReading(preset.r);
                      setWriting(preset.w);
                      setSpeaking(preset.s);
                    }}
                    className="cursor-pointer rounded-xl border border-surface-200 bg-white px-3.5 py-2 text-[13px] font-medium text-surface-700 shadow-xs transition hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-800"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results sidebar */}
          <div className="space-y-6">
            <div className="card border-brand-200/70 bg-gradient-to-b from-brand-50/80 via-white to-white p-6 text-center sm:p-7">
              <div className="eyebrow text-brand-600">Overall IELTS band</div>
              <div className="mt-5 flex justify-center">
                <BandRing band={overall} size={132} label="Overall" />
              </div>
              <div className="mt-4 font-display text-4xl font-extrabold leading-none tabular-nums tracking-tight text-surface-900">
                {overall.toFixed(1)}
              </div>
              <div className="mt-1.5 text-[13px] text-surface-500">Exact average: {average.toFixed(2)}</div>

              <div className="mt-5 rounded-xl border border-surface-200/80 bg-white/80 p-4 text-left text-[13px] leading-relaxed text-surface-600">
                <strong className="font-semibold text-surface-800">Rounding rule applied</strong>
                <p className="mt-1">
                  An average of {average.toFixed(2)}{" "}
                  {average === overall ? "is exact" : `rounds to ${overall.toFixed(1)}`} under the official British
                  Council / IDP specifications (.25 &amp; .75 rule).
                </p>
              </div>
            </div>

            <div className="card space-y-4 p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600">
                  <Info className="h-4 w-4" />
                </span>
                <span className="font-display text-[15px] font-bold text-surface-900">CEFR level &amp; skill profile</span>
              </div>
              <p className="text-[14px] leading-relaxed text-surface-600">
                {bandDescriptions[overall] ||
                  "Demonstrates strong communicative competence across academic and professional contexts."}
              </p>
              <div className="flex items-center justify-between gap-3 border-t border-surface-100 pt-3 text-[13px]">
                <span className="font-medium text-surface-500">CEFR equivalent</span>
                <span className="font-bold text-brand-700">
                  {overall >= 8.5
                    ? "C2 (Mastery)"
                    : overall >= 7.0
                      ? "C1 (Effective Operational)"
                      : overall >= 5.5
                        ? "B2 (Vantage)"
                        : "B1 (Threshold)"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Raw Score to Band (0-40) */}
      {activeTab === "raw" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Listening section */}
          <div className="card space-y-5 p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-surface-900">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700">
                    <MODULE_INFO.LISTENING.Icon className="h-4 w-4" />
                  </span>
                  Listening score
                </h3>
                <p className="mt-2 text-[13px] text-surface-500">40 questions across 4 recorded sections</p>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-extrabold leading-none tabular-nums text-sky-700">
                  {calculatedListeningBand.toFixed(1)}
                </div>
                <div className="mt-1 text-[12px] text-surface-500">{rawListening} of 40 correct</div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="40"
              value={rawListening}
              onChange={(e) => setRawListening(parseInt(e.target.value, 10))}
              aria-label="Raw Listening score"
              className="h-2 w-full cursor-pointer accent-sky-600"
            />

            <BandTable rows={LISTENING_ROWS} activeBand={calculatedListeningBand} tone="sky" firstColumn="Correct answers" />
          </div>

          {/* Reading section */}
          <div className="card space-y-5 p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-surface-900">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700">
                    <MODULE_INFO.READING.Icon className="h-4 w-4" />
                  </span>
                  Reading score
                </h3>
                <div className="mt-2 inline-flex rounded-lg border border-surface-200 bg-surface-100/80 p-0.5">
                  {(
                    [
                      ["academic", "Academic"],
                      ["general", "General Training"],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setReadingTrack(key)}
                      aria-pressed={readingTrack === key}
                      className={`cursor-pointer rounded-md px-2.5 py-1 text-[12px] font-semibold transition ${
                        readingTrack === key
                          ? "bg-white text-emerald-700 shadow-xs ring-1 ring-emerald-200"
                          : "text-surface-500 hover:text-surface-900"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-extrabold leading-none tabular-nums text-emerald-700">
                  {calculatedReadingBand.toFixed(1)}
                </div>
                <div className="mt-1 text-[12px] text-surface-500">{rawReading} of 40 correct</div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="40"
              value={rawReading}
              onChange={(e) => setRawReading(parseInt(e.target.value, 10))}
              aria-label="Raw Reading score"
              className="h-2 w-full cursor-pointer accent-emerald-600"
            />

            <BandTable
              rows={readingTrack === "academic" ? READING_ACADEMIC_ROWS : READING_GENERAL_ROWS}
              activeBand={calculatedReadingBand}
              tone="emerald"
              firstColumn={`Correct (${readingTrack === "academic" ? "Academic" : "General"})`}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Writing (Task 1 & Task 2 Weighting) */}
      {activeTab === "writing" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card space-y-6 p-5 sm:p-7 lg:col-span-2">
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-surface-900">
                Official writing weighting breakdown
              </h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-surface-600">
                Task 2 carries <strong className="font-semibold text-surface-800">twice the weight</strong> (66.7%) of
                Task 1 (33.3%). Both tasks are scored on four equal criteria: Task Response, Coherence &amp; Cohesion,
                Lexical Resource and Grammatical Range.
              </p>
            </div>

            <div className="rounded-2xl border border-surface-200/80 bg-surface-50/60 p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[15px] font-semibold text-surface-800">
                  Task 1 band <span className="font-normal text-surface-500">· 150 words · 33% weight</span>
                </span>
                <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 font-display text-sm font-bold tabular-nums text-amber-700">
                  Band {task1.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.5"
                value={task1}
                onChange={(e) => setTask1(parseFloat(e.target.value))}
                aria-label="Task 1 band"
                className="h-2 w-full cursor-pointer accent-amber-600"
              />
            </div>

            <div className="rounded-2xl border border-surface-200/80 bg-surface-50/60 p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[15px] font-semibold text-surface-800">
                  Task 2 band <span className="font-normal text-surface-500">· 250 words · 67% weight</span>
                </span>
                <span className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 font-display text-sm font-bold tabular-nums text-amber-700">
                  Band {task2.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.5"
                value={task2}
                onChange={(e) => setTask2(parseFloat(e.target.value))}
                aria-label="Task 2 band"
                className="h-2 w-full cursor-pointer accent-amber-600"
              />
            </div>

            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-4 text-[13px] leading-relaxed text-amber-900">
              <strong className="font-semibold">Examiner insight:</strong> if your Task 1 is Band 6.0 and your Task 2 is
              Band 7.0, the calculation is (6.0 + 7.0 × 2) / 3 = 20 / 3 = 6.66 →{" "}
              <strong className="font-semibold">rounds to Band 6.5</strong>.
            </div>
          </div>

          <div className="card border-amber-200/70 bg-gradient-to-b from-amber-50/70 via-white to-white p-6 text-center">
            <div className="eyebrow text-amber-700">Overall writing module</div>
            <div className="my-5 font-display text-5xl font-extrabold leading-none tabular-nums tracking-tight text-surface-900">
              {writingWeighted.toFixed(1)}
            </div>
            <p className="text-[13px] text-surface-500">Formula: (Task 1 + Task 2 × 2) ÷ 3</p>

            <Link
              href="/band-descriptors"
              className="btn-secondary mt-6 w-full justify-center text-[13px]"
            >
              View official writing rubrics
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function BandTable({
  rows,
  activeBand,
  tone,
  firstColumn,
}: {
  rows: { range: string; b: number }[];
  activeBand: number;
  tone: "sky" | "emerald";
  firstColumn: string;
}) {
  const activeRow = {
    sky: "bg-sky-50/80",
    emerald: "bg-emerald-50/80",
  }[tone];
  const pill = {
    sky: "bg-sky-100 text-sky-800",
    emerald: "bg-emerald-100 text-emerald-800",
  }[tone];

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-200/80">
      <table className="w-full min-w-[320px] text-left">
        <thead className="border-b border-surface-200 bg-surface-50 text-[12px] font-semibold uppercase tracking-wide text-surface-500">
          <tr>
            <th className="px-3.5 py-2.5 font-semibold">{firstColumn}</th>
            <th className="px-3.5 py-2.5 font-semibold">Band score</th>
            <th className="px-3.5 py-2.5 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100">
          {rows.map((row) => {
            const isActive = activeBand === row.b;
            return (
              <tr key={row.range} className={`text-[13px] ${isActive ? activeRow : ""}`}>
                <td className={`px-3.5 py-2.5 tabular-nums ${isActive ? "font-semibold text-surface-900" : "text-surface-600"}`}>
                  {row.range}
                </td>
                <td className={`px-3.5 py-2.5 tabular-nums ${isActive ? "font-bold text-surface-900" : "font-medium text-surface-700"}`}>
                  Band {row.b.toFixed(1)}
                </td>
                <td className="px-3.5 py-2.5">
                  {isActive ? (
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${pill}`}>
                      <CheckCircle2 className="h-3 w-3" />
                      Your score
                    </span>
                  ) : (
                    <span className="text-surface-300">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
