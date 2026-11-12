import Link from "next/link";
import { CATALOGUE_BOOKS, CATALOGUE_TEST_NUMBERS, testPath } from "@/lib/seo";
import TestsClient from "./TestsClient";

const TRACKS = [
  {
    type: "ACADEMIC" as const,
    label: "Academic",
    blurb:
      "For university admission and professional registration. Reading passages come from books, journals and magazines; Writing Task 1 asks you to describe a chart, graph, table, map or process.",
  },
  {
    type: "GENERAL" as const,
    label: "General Training",
    blurb:
      "For migration, work and secondary education. Reading uses notices, advertisements, workplace documents and one longer text; Writing Task 1 is a formal, semi-formal or informal letter.",
  },
];

/**
 * Server-rendered library index. The interactive, per-user library above is a
 * client component; this list guarantees every test page is linked in the
 * HTML crawlers receive.
 */
function LibraryIndex() {
  return (
    <section className="page-container space-y-8 pb-12" aria-labelledby="library-index">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="library-index" className="font-display text-lg font-bold text-surface-900">
          All IELTS practice tests
        </h2>
        <p>
          Every paper is a complete IELTS mock exam in the computer-delivered format: a 30-minute
          Listening test with four recorded parts, a 60-minute Reading test with three passages and
          40 questions, a 60-minute Writing test with Task 1 and Task 2, and an 11–14 minute
          Speaking test covering the interview, the cue card and the discussion. Reading and
          Listening are marked instantly and converted to a band score using the standard raw-score
          tables; Writing and Speaking receive band feedback against the four official criteria.
        </p>
        <p>
          New to IELTS? Start with a{" "}
          <Link href="/study-plan" className="font-semibold text-brand-600 hover:underline">
            study plan
          </Link>
          , check how raw scores convert with the{" "}
          <Link href="/calculator" className="font-semibold text-brand-600 hover:underline">
            band score calculator
          </Link>
          , and read the{" "}
          <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
            band descriptors
          </Link>{" "}
          before your first Writing task.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {TRACKS.map((track) => (
          <div key={track.type} className="card p-5 sm:p-6">
            <h3 className="text-[15px] font-bold text-surface-900">{track.label} practice tests</h3>
            <p className="mt-1 text-[13px] leading-relaxed text-surface-600">{track.blurb}</p>
            <ul className="mt-4 space-y-2">
              {CATALOGUE_BOOKS.map((book) => (
                <li key={book} className="text-[13px] text-surface-700">
                  <span className="font-semibold">Book {book}:</span>{" "}
                  {[...CATALOGUE_TEST_NUMBERS]
                    .sort((a, b) => a - b)
                    .map((testNumber, i) => (
                      <span key={testNumber}>
                        {i > 0 && " · "}
                        <Link
                          href={testPath({ book, type: track.type, testNumber })}
                          className="text-brand-600 hover:underline"
                        >
                          {track.label} Test {testNumber}
                        </Link>
                      </span>
                    ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function TestsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  return (
    <>
      <TestsClient type={type === "GENERAL" ? "GENERAL" : "ACADEMIC"} />
      <LibraryIndex />
    </>
  );
}
