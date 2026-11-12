import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbsJsonLd, LearningResourceJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { ESSAY_TASK_LABELS, MODEL_ESSAYS, essayPath, type ModelEssay } from "@/lib/ielts-content-data";
import ModelAnswersClient from "./ModelAnswersClient";

const KEYWORDS = [
  "IELTS model answers",
  "IELTS band 9 essay",
  "IELTS writing task 2 sample",
  "IELTS writing task 1 sample",
  "IELTS examiner commentary",
  "band 9 essay example",
  "IELTS academic writing model",
  "IELTS general training letter sample",
];

export const metadata: Metadata = pageMetadata({
  title: "Band 9.0 Model Writing Essays & Examiner Annotations · Task 1 & Task 2",
  description:
    "Study Band 9 sample responses side-by-side with examiner-style commentary on Task Response, Coherence & Cohesion, Lexical Resource and Grammatical Range, plus common Band 6 pitfalls.",
  path: "/model-answers",
  keywords: KEYWORDS,
});

const GROUPS: { type: ModelEssay["taskType"]; heading: string; intro: string }[] = [
  {
    type: "TASK_2",
    heading: "Writing Task 2 model essays",
    intro:
      "Opinion, discussion, advantages and disadvantages, problem and solution, two-part and positive or negative development questions, each answered at Band 9 with a full criterion-by-criterion analysis.",
  },
  {
    type: "TASK_1_ACADEMIC",
    heading: "Academic Writing Task 1 model reports",
    intro: "Line graphs, pie charts and process diagrams described with a clear overview and accurate data selection.",
  },
  {
    type: "TASK_1_GENERAL",
    heading: "General Training Task 1 model letters",
    intro: "Formal and informal letters showing the right tone, purpose and coverage of every bullet point.",
  },
];

/** Server-rendered index of every model essay page, below the interactive explorer. */
function ModelAnswersIndex() {
  return (
    <section className="page-container space-y-8 pb-12" aria-labelledby="model-answers-index">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="model-answers-index" className="font-display text-lg font-bold text-surface-900">
          All Band 9 model answers
        </h2>
        <p>
          Every sample answer below has its own page with the full question, the annotated Band 9 response, an
          analysis against the four writing criteria, a Band 6 version of the same answer with its weaknesses
          explained, and the key techniques to copy. When you have studied a model, write your own answer and{" "}
          <Link href="/writing-checker" className="font-semibold text-brand-600 hover:underline">
            check your essay
          </Link>{" "}
          or sit a full{" "}
          <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
            practice test
          </Link>
          .
        </p>
      </div>

      {GROUPS.map((group) => {
        const essays = MODEL_ESSAYS.filter((essay) => essay.taskType === group.type);
        if (essays.length === 0) return null;
        return (
          <div key={group.type} className="space-y-3">
            <h3 className="font-display text-base font-bold text-surface-900">{group.heading}</h3>
            <p className="max-w-3xl text-[13px] leading-relaxed text-surface-600">{group.intro}</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {essays.map((essay) => (
                <li key={essay.id}>
                  <Link
                    href={essayPath(essay)}
                    className="card flex h-full flex-col gap-2 p-4 transition hover:border-brand-300 hover:bg-brand-50/40"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-surface-400">
                      {ESSAY_TASK_LABELS[essay.taskType]} · {essay.wordCount} words
                    </span>
                    <span className="text-[14px] font-bold leading-snug text-surface-900">{essay.title}</span>
                    <span className="line-clamp-2 text-[12px] leading-relaxed text-surface-500">{essay.prompt}</span>
                    <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-semibold text-brand-600">
                      Read the model answer
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <AdBanner placement="display" />
    </section>
  );
}

export default function ModelAnswersPage() {
  const url = absoluteUrl("/model-answers");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Band 9 Model Essays", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name="Band 9 IELTS Model Writing Essays"
        description="Annotated Band 9 Writing Task 1 and Task 2 responses with examiner-style commentary and Band 6 comparisons for Academic and General Training."
        url={url}
        teaches={[
          "Task Response and Task Achievement",
          "Coherence and Cohesion",
          "Lexical Resource",
          "Grammatical Range and Accuracy",
        ]}
      />
      <ModelAnswersClient />
      <ModelAnswersIndex />
    </>
  );
}
