import Link from "next/link";
import { SPEAKING_CRITERIA, TASK1_CRITERIA, TASK2_CRITERIA, type Criterion } from "@/lib/band-descriptors-data";
import BandDescriptorsClient from "./BandDescriptorsClient";

const RUBRICS: { title: string; intro: string; criteria: Criterion[] }[] = [
  {
    title: "Writing Task 2 band descriptors",
    intro: "The essay is marked on Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy, each worth a quarter of the Task 2 score.",
    criteria: TASK2_CRITERIA,
  },
  {
    title: "Writing Task 1 band descriptors",
    intro: "Task 1 (the Academic report or the General Training letter) replaces Task Response with Task Achievement; the other three criteria are shared with Task 2.",
    criteria: TASK1_CRITERIA,
  },
  {
    title: "Speaking band descriptors",
    intro: "All three parts of the Speaking test are marked together on Fluency and Coherence, Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.",
    criteria: SPEAKING_CRITERIA,
  },
];

const BANDS = [9, 8, 7, 6, 5];

/** Server-rendered copy of every rubric, so the full text is in the page HTML. */
function RubricText() {
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="rubric-text">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="rubric-text" className="font-display text-lg font-bold text-surface-900">
          Full IELTS band descriptors, band 5 to band 9
        </h2>
        <p>
          Examiners give a band for each criterion and your module score is the average of the four. To move
          up a band you need to meet the higher description on every criterion, so look for the one where you
          are weakest. Then check your writing against our{" "}
          <Link href="/model-answers" className="font-semibold text-brand-600 hover:underline">
            band 9 model answers
          </Link>{" "}
          or work out your overall score with the{" "}
          <Link href="/calculator" className="font-semibold text-brand-600 hover:underline">
            band score calculator
          </Link>
          .
        </p>
      </div>

      {RUBRICS.map((rubric) => (
        <article key={rubric.title} className="card p-5 sm:p-6">
          <h3 className="text-[15px] font-bold text-surface-900">{rubric.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-surface-600">{rubric.intro}</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {rubric.criteria.map((criterion) => (
              <div key={criterion.name}>
                <h4 className="text-sm font-semibold text-surface-800">{criterion.name}</h4>
                <dl className="mt-1 space-y-1 text-[13px] leading-relaxed text-surface-600">
                  {BANDS.filter((band) => criterion.bands[band]).map((band) => (
                    <div key={band}>
                      <dt className="inline font-semibold text-surface-700">Band {band}: </dt>
                      <dd className="inline">{criterion.bands[band]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

export default function BandDescriptorsPage() {
  return (
    <>
      <BandDescriptorsClient />
      <RubricText />
    </>
  );
}
