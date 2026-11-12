import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, FileText, Lightbulb, PenTool, Sparkles, XCircle } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { BreadcrumbsJsonLd, LearningResourceJsonLd } from "@/components/JsonLd";
import { BandBadge } from "@/components/ui";
import {
  ESSAY_TASK_LABELS,
  MODEL_ESSAYS,
  essayPath,
  essaySlug,
  findEssayBySlug,
  type ModelEssay,
} from "@/lib/ielts-content-data";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return MODEL_ESSAYS.map((essay) => ({ slug: essaySlug(essay) }));
}

type Props = { params: Promise<{ slug: string }> };

const KEYWORDS_BY_TYPE: Record<ModelEssay["taskType"], string[]> = {
  TASK_2: ["IELTS writing task 2 band 9 essay", "IELTS task 2 model answer", "IELTS essay sample"],
  TASK_1_ACADEMIC: ["IELTS academic writing task 1 band 9", "IELTS task 1 model answer", "IELTS report sample"],
  TASK_1_GENERAL: ["IELTS general training letter band 9", "IELTS task 1 letter sample", "IELTS GT letter model answer"],
};

function describe(essay: ModelEssay): string {
  const prompt = essay.prompt.length > 110 ? `${essay.prompt.slice(0, 107).trimEnd()}…` : essay.prompt;
  return `Band 9 ${ESSAY_TASK_LABELS[essay.taskType]} with examiner-style analysis and a Band 6 comparison. Question: ${prompt}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const essay = findEssayBySlug(slug);
  if (!essay) return {};
  return pageMetadata({
    title: `${essay.title} · Band 9 IELTS Model Answer`,
    description: describe(essay),
    path: essayPath(essay),
    type: "article",
    keywords: [...KEYWORDS_BY_TYPE[essay.taskType], "IELTS model answers", essay.title],
  });
}

/** Maps the stored annotation palette to the site's accent colours (same as the explorer). */
function normaliseHtml(html: string) {
  return html
    .replaceAll("bg-blue-100", "bg-sky-100")
    .replaceAll("text-blue-900", "text-sky-900")
    .replaceAll("bg-purple-100", "bg-violet-100")
    .replaceAll("text-purple-900", "text-violet-900");
}

const CRITERIA = [
  ["Task achievement / response", "text-brand-700", "taskAchievementOrResponse"],
  ["Coherence & cohesion", "text-sky-700", "coherenceAndCohesion"],
  ["Lexical resource", "text-emerald-700", "lexicalResource"],
  ["Grammatical range & accuracy", "text-violet-700", "grammaticalRangeAndAccuracy"],
] as const;

export default async function ModelEssayPage({ params }: Props) {
  const { slug } = await params;
  const essay = findEssayBySlug(slug);
  if (!essay) notFound();

  const url = absoluteUrl(essayPath(essay));
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Band 9 Model Essays", url: absoluteUrl("/model-answers") },
    { name: essay.title, url },
  ];
  const sameType = MODEL_ESSAYS.filter((e) => e.id !== essay.id && e.taskType === essay.taskType);
  const otherType = MODEL_ESSAYS.filter((e) => e.id !== essay.id && e.taskType !== essay.taskType);
  const related = [...sameType, ...otherType];

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name={`${essay.title} — Band 9 IELTS model answer`}
        description={describe(essay)}
        url={url}
        teaches={[
          essay.taskType === "TASK_2" ? "Task Response" : "Task Achievement",
          "Coherence and Cohesion",
          "Lexical Resource",
          "Grammatical Range and Accuracy",
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-[13px] text-surface-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-brand-600 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href="/model-answers" className="hover:text-brand-600 hover:underline">
              Model answers
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-surface-700">
            {essay.title}
          </li>
        </ol>
      </nav>

      <header className="space-y-3 border-b border-surface-200 pb-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-neutral">{ESSAY_TASK_LABELS[essay.taskType]}</span>
          <span className="badge-neutral">{essay.wordCount} words</span>
          <BandBadge band={essay.band} />
        </div>
        <h1 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-surface-900 sm:text-4xl">
          {essay.title}
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-surface-600">
          A Band 9 sample answer with examiner-style commentary on each marking criterion, compared with a typical
          Band 6 response to the same question.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <article className="min-w-0 space-y-6 lg:col-span-8">
          <section className="card-muted p-5 sm:p-6" aria-labelledby="question">
            <h2
              id="question"
              className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-surface-500"
            >
              <FileText className="h-3.5 w-3.5 text-brand-500" />
              IELTS-style question
            </h2>
            <p className="mt-2.5 text-[15px] font-medium leading-relaxed text-surface-800">{essay.prompt}</p>
          </section>

          <section className="card p-5 sm:p-7" aria-labelledby="model-answer">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-100 pb-4">
              <h2 id="model-answer" className="font-display text-lg font-extrabold text-surface-900">
                Band 9 model answer
              </h2>
              <span className="text-[12px] text-surface-500">{essay.wordCount} words</span>
            </div>
            <div
              className="max-w-prose pt-5 text-[16px] leading-[1.85] text-surface-700 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_span]:rounded [&_span]:px-1 [&_span]:font-medium"
              dangerouslySetInnerHTML={{ __html: normaliseHtml(essay.essayHtml) }}
            />
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-surface-100 pt-4 text-[12px] text-surface-600">
              <li className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded border border-sky-300 bg-sky-100" />
                Cohesion &amp; linking
              </li>
              <li className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded border border-emerald-300 bg-emerald-100" />
                Band 9 vocabulary
              </li>
              <li className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded border border-violet-300 bg-violet-100" />
                Complex grammar
              </li>
            </ul>
          </section>

          <AdBanner placement="in-article" />

          <section className="card p-5 sm:p-6" aria-labelledby="analysis">
            <h2 id="analysis" className="flex items-center gap-2 font-display text-[15px] font-bold text-surface-900">
              <Sparkles className="h-4 w-4 text-brand-600" />
              Why this answer scores Band 9
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CRITERIA.map(([label, tone, key]) => (
                <div key={key} className="rounded-xl border border-surface-200/80 bg-surface-50/60 p-4">
                  <h3 className={`text-[12px] font-bold uppercase tracking-[0.08em] ${tone}`}>{label}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-surface-600">{essay.analysis[key]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card border-amber-200/80 bg-amber-50/30 p-5 sm:p-6" aria-labelledby="band-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/70 pb-3">
              <h2 id="band-6" className="font-display text-[15px] font-bold text-amber-900">
                Compare: a Band 6 answer to the same question
              </h2>
              <span className="badge-warning">Band 6.0</span>
            </div>
            <p className="mt-4 rounded-xl border border-amber-100 bg-white p-4 text-[14px] italic leading-relaxed text-surface-700">
              {essay.comparisonBand6.essayText}
            </p>
            <h3 className="mt-5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-rose-700">
              <XCircle className="h-3.5 w-3.5" />
              What holds it back
            </h3>
            <ul className="mt-2.5 space-y-2">
              {essay.comparisonBand6.flaws.map((flaw) => (
                <li key={flaw} className="flex items-start gap-2 text-[14px] leading-relaxed text-surface-600">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                  <span>{flaw}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card p-5 sm:p-6" aria-labelledby="takeaways">
            <h2
              id="takeaways"
              className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-surface-500"
            >
              <Lightbulb className="h-4 w-4 text-amber-600" />
              Key takeaways
            </h2>
            <ul className="mt-4 space-y-3">
              {essay.keyTakeaways.map((takeaway) => (
                <li key={takeaway} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-surface-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="card flex flex-col gap-4 bg-brand-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="font-display text-[15px] font-bold text-surface-900">Now write your own answer</h2>
              <p className="mt-1 text-[14px] leading-relaxed text-surface-600">
                Try this question yourself, then get instant band feedback on your essay, or practise under timed
                conditions in a full test.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link href="/writing-checker" className="btn-primary">
                <PenTool className="h-4 w-4" />
                Check your own essay
              </Link>
              <Link href="/tests" className="btn-secondary">
                Practice tests
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </article>

        <aside className="space-y-3 lg:col-span-4" aria-labelledby="more-essays">
          <h2 id="more-essays" className="eyebrow block">
            More Band 9 model answers
          </h2>
          <ul className="space-y-2.5">
            {related.map((other) => (
              <li key={other.id}>
                <Link
                  href={essayPath(other)}
                  className="block rounded-2xl border border-surface-200/80 bg-white p-4 shadow-xs transition hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-surface-400">
                    {ESSAY_TASK_LABELS[other.taskType]}
                  </span>
                  <span className="mt-1 block text-[14px] font-semibold leading-snug text-surface-900">
                    {other.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/model-answers" className="btn-ghost btn-sm">
            Open the interactive explorer
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </aside>
      </div>

      <AdBanner placement="multiplex" />
    </div>
  );
}
