import Link from "next/link";
import { ModuleIcon } from "@/components/ui";

/** Shape returned by GET /api/seo/tests/:slug/preview (never contains answers). */
export interface TestPreviewData {
  type: "ACADEMIC" | "GENERAL";
  book: number;
  testNumber: number;
  title: string;
  description: string | null;
  durations: Partial<Record<"LISTENING" | "READING" | "WRITING" | "SPEAKING", number>>;
  reading: { title: string; excerpt: string; questions: number; questionTypes: string[] }[];
  listening: { title: string; context: string; questions: number; questionTypes: string[] }[];
  writing: {
    task1: { prompt?: string; chartTitle: string | null; minWords?: number };
    task2: { prompt?: string; minWords?: number };
  } | null;
  speaking: {
    part1Topics: string[];
    part2: { cueCard?: string; bullets: string[] };
    part3Topic: string | null;
  } | null;
}

const API_URL = (process.env.API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

export async function fetchTestPreview(slug: string): Promise<TestPreviewData | null> {
  try {
    const res = await fetch(`${API_URL}/api/seo/tests/${encodeURIComponent(slug)}/preview`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
      headers: { accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as TestPreviewData;
  } catch {
    return null;
  }
}

function TypeList({ types }: { types: string[] }) {
  if (!types.length) return null;
  return <p className="mt-1 text-xs text-surface-500">Question types: {types.join(", ")}</p>;
}

/**
 * Server-rendered outline of the paper. This is the unique, crawlable content
 * of each test page; the interactive module cards are rendered by the client.
 */
export default function TestPreview({ preview }: { preview: TestPreviewData }) {
  const track = preview.type === "ACADEMIC" ? "Academic" : "General Training";
  const name = `Book ${preview.book} ${track} Practice Test ${preview.testNumber}`;
  const d = preview.durations;

  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="paper-outline">
      <div>
        <h2 id="paper-outline" className="font-display text-lg font-bold text-surface-900">
          What&apos;s in this test
        </h2>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-surface-600">
          {preview.description ??
            `${name} is a full IELTS ${track} mock exam in the computer-delivered format: Listening (${d.LISTENING ?? 30} minutes), Reading (${d.READING ?? 60} minutes), Writing (${d.WRITING ?? 60} minutes) and Speaking (${d.SPEAKING ?? 14} minutes). Reading and Listening are marked instantly and converted to a band score; Writing and Speaking receive criteria-based band feedback.`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {preview.reading.length > 0 && (
          <article className="card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-surface-900">
              <ModuleIcon module="READING" size="sm" /> Reading passages
            </h3>
            <ol className="mt-3 space-y-3">
              {preview.reading.map((p, i) => (
                <li key={i}>
                  <h4 className="text-sm font-semibold text-surface-800">
                    Passage {i + 1}: {p.title}
                    {p.questions > 0 && <span className="font-normal text-surface-500"> · {p.questions} questions</span>}
                  </h4>
                  {p.excerpt && <p className="mt-1 text-[13px] leading-relaxed text-surface-600">{p.excerpt}</p>}
                  <TypeList types={p.questionTypes} />
                </li>
              ))}
            </ol>
          </article>
        )}

        {preview.listening.length > 0 && (
          <article className="card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-surface-900">
              <ModuleIcon module="LISTENING" size="sm" /> Listening sections
            </h3>
            <ol className="mt-3 space-y-3">
              {preview.listening.map((p, i) => (
                <li key={i}>
                  <h4 className="text-sm font-semibold text-surface-800">
                    Part {i + 1}: {p.title}
                    {p.questions > 0 && <span className="font-normal text-surface-500"> · {p.questions} questions</span>}
                  </h4>
                  {p.context && <p className="mt-1 text-[13px] leading-relaxed text-surface-600">{p.context}</p>}
                  <TypeList types={p.questionTypes} />
                </li>
              ))}
            </ol>
          </article>
        )}

        {preview.writing && (
          <article className="card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-surface-900">
              <ModuleIcon module="WRITING" size="sm" /> Writing tasks
            </h3>
            <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-surface-600">
              {preview.writing.task1.prompt && (
                <div>
                  <h4 className="text-sm font-semibold text-surface-800">
                    Task 1{preview.writing.task1.minWords ? ` (at least ${preview.writing.task1.minWords} words)` : ""}
                  </h4>
                  {preview.writing.task1.chartTitle && (
                    <p className="mt-1 italic">{preview.writing.task1.chartTitle}</p>
                  )}
                  <p className="mt-1 whitespace-pre-line">{preview.writing.task1.prompt}</p>
                </div>
              )}
              {preview.writing.task2.prompt && (
                <div>
                  <h4 className="text-sm font-semibold text-surface-800">
                    Task 2{preview.writing.task2.minWords ? ` (at least ${preview.writing.task2.minWords} words)` : ""}
                  </h4>
                  <p className="mt-1 whitespace-pre-line">{preview.writing.task2.prompt}</p>
                </div>
              )}
              <p>
                Compare your essay with our{" "}
                <Link href="/model-answers" className="font-semibold text-brand-600 hover:underline">
                  band 9 model answers
                </Link>{" "}
                and the official{" "}
                <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
                  band descriptors
                </Link>
                .
              </p>
            </div>
          </article>
        )}

        {preview.speaking && (
          <article className="card p-5 sm:p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-bold text-surface-900">
              <ModuleIcon module="SPEAKING" size="sm" /> Speaking test
            </h3>
            <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-surface-600">
              {preview.speaking.part1Topics.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-surface-800">Part 1: Interview</h4>
                  <p className="mt-1">Topics: {preview.speaking.part1Topics.join(", ")}</p>
                </div>
              )}
              {preview.speaking.part2.cueCard && (
                <div>
                  <h4 className="text-sm font-semibold text-surface-800">Part 2: Cue card</h4>
                  <p className="mt-1">{preview.speaking.part2.cueCard}</p>
                  {preview.speaking.part2.bullets.length > 0 && (
                    <ul className="mt-1 list-disc pl-5">
                      {preview.speaking.part2.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {preview.speaking.part3Topic && (
                <div>
                  <h4 className="text-sm font-semibold text-surface-800">Part 3: Discussion</h4>
                  <p className="mt-1">Topic: {preview.speaking.part3Topic}</p>
                </div>
              )}
              <p>
                Practise more topics in the{" "}
                <Link href="/speaking-practice" className="font-semibold text-brand-600 hover:underline">
                  speaking cue card studio
                </Link>
                .
              </p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
