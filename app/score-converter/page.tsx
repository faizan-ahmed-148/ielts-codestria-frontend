import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import {
  EQUIVALENCE_TABLE,
  SCORE_CONVERTER_FAQ,
  TYPICAL_REQUIREMENTS,
  formatRange,
} from "@/lib/score-equivalence";
import ScoreConverterClient from "./ScoreConverterClient";

/** Server-rendered equivalence tables, explanation and FAQ. */
function ScoreConverterGuide() {
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="converter-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="converter-guide" className="font-display text-lg font-bold text-surface-900">
          IELTS score equivalence table
        </h2>
        <p>
          The table below lines up IELTS overall bands with approximate scores on other major English tests. It
          draws on widely published concordance work: the ETS comparison of TOEFL iBT and IELTS scores, the
          Pearson concordance for PTE Academic, the Duolingo English Test concordance published by Duolingo, and
          Cambridge English&apos;s alignment of IELTS with the Cambridge English Scale. CEFR levels follow the
          common alignment of IELTS 4.0–5.0 with B1, 5.5–6.5 with B2, 7.0–8.0 with C1 and 8.5–9.0 with C2.
        </p>
      </div>

      <div className="card overflow-x-auto p-5 sm:p-6">
        <table className="w-full min-w-[640px] text-left text-[13px] text-surface-600">
          <thead className="text-surface-800">
            <tr>
              <th className="py-1.5 pr-3 font-semibold">IELTS</th>
              <th className="py-1.5 pr-3 font-semibold">CEFR</th>
              <th className="py-1.5 pr-3 font-semibold">TOEFL iBT</th>
              <th className="py-1.5 pr-3 font-semibold">PTE Academic</th>
              <th className="py-1.5 pr-3 font-semibold">Duolingo</th>
              <th className="py-1.5 font-semibold">Cambridge English Scale</th>
            </tr>
          </thead>
          <tbody>
            {EQUIVALENCE_TABLE.map((row) => (
              <tr key={row.ielts} className="border-t border-surface-100">
                <td className="py-1.5 pr-3 font-semibold text-surface-900">{row.ielts.toFixed(1)}</td>
                <td className="py-1.5 pr-3">{row.cefr}</td>
                <td className="py-1.5 pr-3 tabular-nums">{formatRange(row.toefl)}</td>
                <td className="py-1.5 pr-3 tabular-nums">{formatRange(row.pte)}</td>
                <td className="py-1.5 pr-3 tabular-nums">{formatRange(row.det)}</td>
                <td className="py-1.5 tabular-nums">{formatRange(row.ces)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-[12.5px] text-surface-500">
          Approximate values only. Concordance tables are revised from time to time and are not an official
          conversion between tests.
        </p>
      </div>

      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 className="font-display text-lg font-bold text-surface-900">How to use these equivalences</h2>
        <p>
          Each test measures English in a different way — task types, timing, delivery and marking all differ — so
          no two scores are exactly interchangeable. Concordance studies compare how the same groups of candidates
          perform on both tests and report the scores that line up most closely. That makes them useful for
          planning, but the organisation you apply to always has the final word: many publish their own minimum
          for each test, sometimes with separate minimums for each skill.
        </p>
        <p>
          If you already have an IELTS target, use the{" "}
          <Link href="/calculator" className="font-semibold text-brand-600 hover:underline">
            band score calculator
          </Link>{" "}
          to see how module bands combine, then measure where you stand with a full{" "}
          <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
            IELTS practice test
          </Link>
          .
        </p>
      </div>

      <AdBanner placement="display" />

      <h2 className="font-display text-lg font-bold text-surface-900">Typical IELTS requirements</h2>
      <div className="card overflow-x-auto p-5 sm:p-6">
        <table className="w-full min-w-[560px] text-left text-[13px] text-surface-600">
          <thead className="text-surface-800">
            <tr>
              <th className="py-1.5 pr-3 font-semibold">Purpose</th>
              <th className="py-1.5 pr-3 font-semibold">Typical overall band</th>
              <th className="py-1.5 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {TYPICAL_REQUIREMENTS.map((req) => (
              <tr key={req.purpose} className="border-t border-surface-100">
                <td className="py-1.5 pr-3 font-medium text-surface-800">{req.purpose}</td>
                <td className="py-1.5 pr-3 font-semibold text-surface-900">{req.overall}</td>
                <td className="py-1.5">{req.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-[12.5px] text-surface-500">
          General patterns only. Requirements differ by institution, course, country and year — always check the
          current requirement published by the organisation itself.
        </p>
      </div>

      <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
      <div className="space-y-3">
        {SCORE_CONVERTER_FAQ.map((item) => (
          <details key={item.question} className="card group p-5 transition hover:border-brand-200 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-bold text-surface-900">
              <span>{item.question}</span>
              <ChevronDown className="h-4.5 w-4.5 shrink-0 text-surface-400 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-surface-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ScoreConverterPage() {
  return (
    <>
      <ScoreConverterClient />
      <ScoreConverterGuide />
    </>
  );
}
