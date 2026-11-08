"use client";

import { useState } from "react";
import { ArrowLeft, Award, Calculator, CheckCircle2, ChevronRight, HelpCircle, Info, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { BandRing } from "@/components/ui";

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

export default function BandCalculatorPage() {
  const [activeTab, setActiveTab] = useState<"overall" | "raw" | "writing">("overall");

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

  return (
    <div className="min-h-screen bg-[#f7f8fb] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/tests?type=ACADEMIC"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Explore Cambridge Books
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-200">
              <Sparkles className="h-3.5 w-3.5" /> Official IELTS Rounding Standard
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
              by Codestria
            </span>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center sm:text-left mb-8">
          <div className="eyebrow text-brand-600 mb-1">Interactive Diagnostic Tool</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            IELTS Band Score Calculator
          </h1>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">
            Calculate your overall IELTS band, convert Listening and Reading raw scores (0–40), and see how each module affects your target university or immigration requirement.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-2xl bg-slate-200/70 p-1.5 shadow-inner mb-8 max-w-xl">
          <button
            onClick={() => setActiveTab("overall")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
              activeTab === "overall" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Award className="h-4 w-4" /> Overall Band
          </button>
          <button
            onClick={() => setActiveTab("raw")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
              activeTab === "raw" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Calculator className="h-4 w-4" /> Raw to Band (0–40)
          </button>
          <button
            onClick={() => setActiveTab("writing")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
              activeTab === "writing" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <TrendingUp className="h-4 w-4" /> Writing (Task 1 & 2)
          </button>
        </div>

        {/* Tab 1: Overall Band Calculator */}
        {activeTab === "overall" && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="card p-6 lg:col-span-2 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Module Bands</span>
                <span className="text-xs font-normal text-slate-500">(Adjust sliders or click presets)</span>
              </h2>

              {/* Module Sliders */}
              {[
                { label: "Listening", val: listening, set: setListening, color: "text-sky-600", bg: "bg-sky-50" },
                { label: "Reading", val: reading, set: setReading, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Writing", val: writing, set: setWriting, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Speaking", val: speaking, set: setSpeaking, color: "text-violet-600", bg: "bg-violet-50" },
              ].map(({ label, val, set, color, bg }) => (
                <div key={label} className="rounded-xl border border-slate-100 p-4 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-800">{label}</span>
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-bold text-base ${bg} ${color}`}>
                      {val.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="9.0"
                    step="0.5"
                    value={val}
                    onChange={(e) => set(parseFloat(e.target.value))}
                    className="w-full accent-brand-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>3.0</span>
                    <span>4.0</span>
                    <span>5.0</span>
                    <span>6.0</span>
                    <span>7.0</span>
                    <span>8.0</span>
                    <span>9.0</span>
                  </div>
                </div>
              ))}

              {/* Quick Target Presets */}
              <div className="pt-2">
                <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Quick Target Profiles:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    { label: "Band 6.5 (Standard Uni Entry)", l: 6.5, r: 6.5, w: 6.0, s: 6.5 },
                    { label: "Band 7.0 (Top Uni / Canada CLB 9)", l: 7.5, r: 7.0, w: 6.5, s: 7.0 },
                    { label: "Band 7.5 (Medicine & Law)", l: 8.0, r: 7.5, w: 7.0, s: 7.5 },
                    { label: "Band 8.0 (Elite Master's)", l: 8.5, r: 8.5, w: 7.5, s: 8.0 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setListening(preset.l);
                        setReading(preset.r);
                        setWriting(preset.w);
                        setSpeaking(preset.s);
                      }}
                      className="text-xs font-medium bg-white border border-slate-200 hover:border-brand-400 px-3 py-1.5 rounded-lg text-slate-700 transition"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Sidebar */}
            <div className="space-y-6">
              <div className="card p-6 text-center border-brand-200 bg-gradient-to-b from-brand-50/50 to-white shadow-xl shadow-brand-500/5">
                <div className="eyebrow text-brand-600 mb-3">Overall IELTS Band Score</div>
                <div className="flex justify-center mb-4">
                  <BandRing band={overall} size={120} label="Overall" />
                </div>
                <div className="text-3xl font-black text-slate-900">{overall.toFixed(1)}</div>
                <div className="text-xs text-slate-500 mt-1">Exact Average: {average.toFixed(2)}</div>

                <div className="mt-4 pt-4 border-t border-slate-100 text-left text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-xl border">
                  <strong>IELTS Rounding rule applied:</strong>
                  <p className="mt-1">
                    An average of {average.toFixed(2)} {average === overall ? "is exact" : `rounds to ${overall.toFixed(1)}`} according to official British Council / IDP test specifications (.25 &amp; .75 rule).
                  </p>
                </div>
              </div>

              <div className="card p-5 text-sm space-y-3">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Info className="h-4 w-4 text-brand-600" /> CEFR Level &amp; Skill Level
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {bandDescriptions[overall] || "Demonstrates strong communicative competence across academic and professional contexts."}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 font-medium">
                  <span className="text-slate-500">CEFR Equivalent:</span>
                  <span className="font-bold text-brand-700">
                    {overall >= 8.5 ? "C2 (Mastery)" : overall >= 7.0 ? "C1 (Effective Operational)" : overall >= 5.5 ? "B2 (Vantage)" : "B1 (Threshold)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Raw Score to Band (0-40) */}
        {activeTab === "raw" && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Listening Section */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Listening Score (0–40)</h3>
                  <p className="text-xs text-slate-500">40 questions across 4 recorded sections</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-sky-600">Band {calculatedListeningBand.toFixed(1)}</div>
                  <div className="text-xs text-slate-400">{rawListening} of 40 correct</div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="40"
                value={rawListening}
                onChange={(e) => setRawListening(parseInt(e.target.value, 10))}
                className="w-full accent-sky-600"
              />

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2 px-3">Correct Answers</th>
                      <th className="py-2 px-3">Band Score</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {[
                      { range: "39–40", b: 9.0 },
                      { range: "37–38", b: 8.5 },
                      { range: "35–36", b: 8.0 },
                      { range: "32–34", b: 7.5 },
                      { range: "30–31", b: 7.0 },
                      { range: "26–29", b: 6.5 },
                      { range: "23–25", b: 6.0 },
                      { range: "18–22", b: 5.5 },
                    ].map((row) => (
                      <tr
                        key={row.range}
                        className={calculatedListeningBand === row.b ? "bg-sky-50 font-bold text-sky-900" : ""}
                      >
                        <td className="py-1.5 px-3">{row.range}</td>
                        <td className="py-1.5 px-3">Band {row.b.toFixed(1)}</td>
                        <td className="py-1.5 px-3 font-sans text-[11px]">
                          {calculatedListeningBand === row.b ? "★ Your Score" : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reading Section */}
            <div className="card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Reading Score (0–40)</h3>
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setReadingTrack("academic")}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                        readingTrack === "academic"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Academic
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingTrack("general")}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition ${
                        readingTrack === "general"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      General Training
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-600">Band {calculatedReadingBand.toFixed(1)}</div>
                  <div className="text-xs text-slate-400">{rawReading} of 40 correct</div>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="40"
                value={rawReading}
                onChange={(e) => setRawReading(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600"
              />

              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2 px-3">Correct ({readingTrack === "academic" ? "Academic" : "General"})</th>
                      <th className="py-2 px-3">Band Score</th>
                      <th className="py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {(readingTrack === "academic"
                      ? [
                          { range: "39–40", b: 9.0 },
                          { range: "37–38", b: 8.5 },
                          { range: "35–36", b: 8.0 },
                          { range: "33–34", b: 7.5 },
                          { range: "30–32", b: 7.0 },
                          { range: "27–29", b: 6.5 },
                          { range: "23–26", b: 6.0 },
                          { range: "19–22", b: 5.5 },
                        ]
                      : [
                          { range: "40", b: 9.0 },
                          { range: "39", b: 8.5 },
                          { range: "37–38", b: 8.0 },
                          { range: "36", b: 7.5 },
                          { range: "34–35", b: 7.0 },
                          { range: "32–33", b: 6.5 },
                          { range: "30–31", b: 6.0 },
                          { range: "27–29", b: 5.5 },
                        ]
                    ).map((row) => (
                      <tr
                        key={row.range}
                        className={calculatedReadingBand === row.b ? "bg-emerald-50 font-bold text-emerald-900" : ""}
                      >
                        <td className="py-1.5 px-3">{row.range}</td>
                        <td className="py-1.5 px-3">Band {row.b.toFixed(1)}</td>
                        <td className="py-1.5 px-3 font-sans text-[11px]">
                          {calculatedReadingBand === row.b ? "★ Your Score" : ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Writing (Task 1 & Task 2 Weighting) */}
        {activeTab === "writing" && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="card p-6 lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Official Writing Weighting Breakdown</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Task 2 carries <strong>twice the weight</strong> (66.7%) of Task 1 (33.3%). Both tasks are scored on 4 equal criteria (Task Response, Coherence &amp; Cohesion, Lexical Resource, Grammar).
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 p-5 bg-slate-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Task 1 Band (150 words - 33% weight)</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
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
                  className="w-full accent-amber-600"
                />
              </div>

              <div className="rounded-xl border border-slate-100 p-5 bg-slate-50 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800">Task 2 Band (250 words - 67% weight)</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-lg">
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
                  className="w-full accent-amber-600"
                />
              </div>

              <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
                <strong>Examiner Insight:</strong> If your Task 1 is Band 6.0 and your Task 2 is Band 7.0:
                <br />
                Calculation: (6.0 + 7.0 × 2) / 3 = 20 / 3 = 6.66 → <strong>Rounds to Band 6.5</strong>.
              </div>
            </div>

            <div className="card p-6 text-center border-amber-200 bg-gradient-to-b from-amber-50/40 to-white shadow-xl shadow-amber-500/5">
              <div className="eyebrow text-amber-700 mb-2">Overall Writing Module Band</div>
              <div className="text-4xl font-black text-slate-900 my-4">Band {writingWeighted.toFixed(1)}</div>
              <p className="text-xs text-slate-500 mb-6">
                Formula: (Task 1 + Task 2 × 2) ÷ 3
              </p>

              <Link href="/band-descriptors" className="btn-secondary w-full py-2.5 text-xs flex items-center justify-center gap-1.5">
                View Official Writing Rubrics <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
