"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, Calculator, Info, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui";
import {
  CEFR_LEVELS,
  IELTS_BANDS,
  SCORE_TESTS,
  convertScore,
  summariseRows,
  type ScoreTestId,
} from "@/lib/score-equivalence";

const DEFAULT_VALUES: Record<ScoreTestId, string> = {
  IELTS: "7",
  CEFR: "C1",
  TOEFL: "95",
  PTE: "65",
  DET: "120",
  CES: "185",
};

export default function ScoreConverterClient() {
  const [test, setTest] = useState<ScoreTestId>("IELTS");
  const [values, setValues] = useState<Record<ScoreTestId, string>>(DEFAULT_VALUES);

  const value = values[test];
  const info = SCORE_TESTS.find((t) => t.id === test)!;
  const result = convertScore(test, value);
  const summary = result.kind === "rows" ? summariseRows(result.rows) : null;

  const setValue = (next: string) => setValues((prev) => ({ ...prev, [test]: next }));

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Free tool"
        title="IELTS score converter"
        description="Convert an IELTS band to its approximate CEFR level, TOEFL iBT, PTE Academic, Duolingo English Test and Cambridge English Scale score — or convert any of those back to IELTS."
        actions={
          <>
            <span className="badge-brand">
              <Sparkles className="h-3.5 w-3.5" />
              Approximate concordance
            </span>
            <Link href="/calculator" className="btn-secondary">
              <Calculator className="h-4 w-4" />
              Band calculator
            </Link>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Input */}
        <section className="card space-y-5 p-5 sm:p-7" aria-labelledby="converter-input">
          <h2 id="converter-input" className="font-display text-lg font-bold tracking-tight text-surface-900">
            Your score
          </h2>

          <div className="space-y-2">
            <span className="eyebrow">Test</span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a test">
              {SCORE_TESTS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTest(t.id)}
                  aria-pressed={test === t.id}
                  className={`cursor-pointer rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition ${
                    test === t.id
                      ? "border-brand-300 bg-brand-50 text-brand-800 ring-1 ring-brand-200"
                      : "border-surface-200 bg-white text-surface-600 hover:border-brand-200 hover:text-surface-900"
                  }`}
                >
                  {t.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="score-input" className="label">
              {info.name} <span className="font-normal text-surface-500">({info.scale})</span>
            </label>
            {test === "IELTS" ? (
              <select id="score-input" className="input" value={value} onChange={(e) => setValue(e.target.value)}>
                {IELTS_BANDS.map((band) => (
                  <option key={band} value={String(band)}>
                    Band {band.toFixed(1)}
                  </option>
                ))}
              </select>
            ) : test === "CEFR" ? (
              <select id="score-input" className="input" value={value} onChange={(e) => setValue(e.target.value)}>
                {CEFR_LEVELS.map((c) => (
                  <option key={c.level} value={c.level}>
                    {c.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="score-input"
                type="number"
                inputMode="numeric"
                className="input"
                min={info.inputMin}
                max={info.inputMax}
                step={info.step}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
          </div>

          <div className="flex gap-3 rounded-xl border border-surface-200/80 bg-surface-50/60 p-4 text-[13px] leading-relaxed text-surface-600">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <p>
              Based on the {info.source}. Equivalences are approximate — universities, employers and
              governments set their own minimum scores for each test.
            </p>
          </div>
        </section>

        {/* Output */}
        <section className="card space-y-5 p-5 sm:p-7" aria-live="polite" aria-labelledby="converter-output">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600">
              <ArrowLeftRight className="h-4 w-4" />
            </span>
            <h2 id="converter-output" className="font-display text-lg font-bold tracking-tight text-surface-900">
              Approximate equivalents
            </h2>
          </div>

          {result.kind === "invalid" && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Enter a {info.shortName} score between {info.inputMin} and {info.inputMax}.
            </p>
          )}

          {result.kind === "below" && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              This score sits below the range covered here (roughly IELTS {result.floor.ielts.toFixed(1)} / CEFR{" "}
              {result.floor.cefr}). Equivalences at lower levels are less reliable, so consider sitting a
              diagnostic test.
            </p>
          )}

          {summary && (
            <div className="grid gap-3 sm:grid-cols-2">
              {SCORE_TESTS.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-2xl border p-4 ${
                    t.id === test ? "border-brand-200 bg-brand-50/70" : "border-surface-200/80 bg-surface-50/60"
                  }`}
                >
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-surface-500">
                    {t.shortName}
                    {t.id === test && <span className="ml-1.5 text-brand-600">· your input</span>}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold tabular-nums tracking-tight text-surface-900">
                    {summary[t.id]}
                  </div>
                  <div className="mt-0.5 text-[12px] text-surface-500">{t.scale}</div>
                </div>
              ))}
            </div>
          )}

          <p className="text-[12.5px] leading-relaxed text-surface-500">
            Ranges show the scores that map to the same IELTS band. Always confirm the exact requirement with the
            organisation you are applying to.
          </p>
        </section>
      </div>
    </div>
  );
}
