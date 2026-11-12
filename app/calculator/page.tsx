import Link from "next/link";
import { LISTENING_TABLE, READING_ACADEMIC_TABLE, READING_GENERAL_TABLE } from "@/lib/band-tables";
import CalculatorClient from "./CalculatorClient";

type Row = { min: number; band: number };

/** Turns a descending {min, band} table into "raw range → band" rows (bands 4.0 and above). */
function rows(table: Row[]) {
  const sorted = [...table].sort((a, b) => b.min - a.min);
  return sorted
    .map((row, i) => {
      const max = i === 0 ? 40 : sorted[i - 1].min - 1;
      return { range: row.min === max ? `${max}` : `${row.min}–${max}`, band: row.band };
    })
    .filter((row) => row.band >= 4);
}

const TABLES = [
  { title: "Listening (Academic and General Training)", data: rows(LISTENING_TABLE) },
  { title: "Academic Reading", data: rows(READING_ACADEMIC_TABLE) },
  { title: "General Training Reading", data: rows(READING_GENERAL_TABLE) },
];

const EXAMPLES = [
  { scores: [6.5, 6.5, 5.5, 7.0], average: 6.375, overall: 6.5, note: "6.375 is above .25, so it rounds up to the half band." },
  { scores: [6.5, 6.5, 6.0, 6.0], average: 6.25, overall: 6.5, note: "An average ending in exactly .25 rounds up to the next half band." },
  { scores: [7.0, 7.5, 6.5, 7.0], average: 7.0, overall: 7.0, note: "A whole-number average stays as it is." },
  { scores: [7.5, 7.5, 7.0, 7.0], average: 7.25, overall: 7.5, note: "7.25 rounds up to 7.5." },
  { scores: [8.0, 8.0, 7.5, 7.5], average: 7.75, overall: 8.0, note: "An average ending in .75 rounds up to the next whole band." },
  { scores: [6.0, 6.0, 6.0, 6.5], average: 6.125, overall: 6.0, note: "Anything below .25 rounds down to the whole band." },
];

/** Server-rendered explanation and full conversion tables below the interactive calculator. */
function CalculatorGuide() {
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="calculator-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="calculator-guide" className="font-display text-lg font-bold text-surface-900">
          How the IELTS overall band score is calculated
        </h2>
        <p>
          Your overall band is the average of your four module bands (Listening, Reading, Writing and
          Speaking), rounded to the nearest half band. If the average ends in .25 it rounds up to the next
          half band, and if it ends in .75 it rounds up to the next whole band. Anything lower rounds down.
        </p>
        <p>
          Listening and Reading are each marked out of 40, and your raw score is converted to a band using
          the tables below. Academic and General Training use the same Listening table, but General Training
          Reading needs more correct answers for the same band because its texts are less demanding.
          Writing and Speaking are marked against four criteria described in the{" "}
          <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
            band descriptors
          </Link>
          ; in Writing, Task 2 counts for twice as much as Task 1.
        </p>
      </div>

      <div className="card overflow-x-auto p-5 sm:p-6">
        <h3 className="text-[15px] font-bold text-surface-900">Worked rounding examples</h3>
        <table className="mt-3 w-full min-w-[520px] text-left text-[13px] text-surface-600">
          <thead className="text-surface-800">
            <tr>
              <th className="py-1.5 pr-3 font-semibold">L / R / W / S</th>
              <th className="py-1.5 pr-3 font-semibold">Average</th>
              <th className="py-1.5 pr-3 font-semibold">Overall</th>
              <th className="py-1.5 font-semibold">Why</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map((ex) => (
              <tr key={ex.scores.join("-")} className="border-t border-surface-100">
                <td className="py-1.5 pr-3">{ex.scores.map((b) => b.toFixed(1)).join(" / ")}</td>
                <td className="py-1.5 pr-3">{ex.average}</td>
                <td className="py-1.5 pr-3 font-semibold text-surface-900">{ex.overall.toFixed(1)}</td>
                <td className="py-1.5">{ex.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-lg font-bold text-surface-900">Raw score to band conversion tables</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {TABLES.map((table) => (
          <div key={table.title} className="card p-5">
            <h3 className="text-[14px] font-bold text-surface-900">{table.title}</h3>
            <table className="mt-3 w-full text-left text-[13px] text-surface-600">
              <thead className="text-surface-800">
                <tr>
                  <th className="py-1 font-semibold">Correct answers (of 40)</th>
                  <th className="py-1 font-semibold">Band</th>
                </tr>
              </thead>
              <tbody>
                {table.data.map((row) => (
                  <tr key={row.range} className="border-t border-surface-100">
                    <td className="py-1">{row.range}</td>
                    <td className="py-1 font-semibold text-surface-900">{row.band.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <p className="max-w-3xl text-[13px] text-surface-500">
        Conversion tables vary slightly between test versions, so treat these as close estimates. Try them
        on a real paper in the{" "}
        <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
          IELTS practice tests library
        </Link>
        .
      </p>
    </section>
  );
}

export default function CalculatorPage() {
  return (
    <>
      <CalculatorClient />
      <CalculatorGuide />
    </>
  );
}
