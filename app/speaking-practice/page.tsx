import type { Metadata } from "next";
import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { SAMPLE_CUE_CARDS, cueCardPath, type CueCardData } from "@/lib/speaking-cue-cards";
import {
  BreadcrumbsJsonLd,
  HowToJsonLd,
  LearningResourceJsonLd,
} from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import SpeakingPracticeClient from "./SpeakingPracticeClient";

const KEYWORDS = [
  "IELTS speaking practice",
  "IELTS speaking part 2",
  "IELTS cue card",
  "IELTS speaking topics",
  "IELTS speaking preparation time",
  "IELTS speaking band 8",
  "IELTS speaking simulator",
  "IELTS speaking recording practice",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Speaking Part 2 Cue Cards & Voice Examiner Studio",
  description:
    "Practise IELTS Speaking Part 2 with exam-style cue cards, a timed 1-minute preparation window, 2-minute recording and Band 8.5 model transcripts using the four IELTS Speaking criteria.",
  path: "/speaking-practice",
  keywords: KEYWORDS,
});

const STEPS = [
  {
    title: "1 minute to prepare",
    copy: "You get the cue card, a pencil and paper. Write keywords for each bullet point, not full sentences, and decide on one or two specific details or a short story you can expand on.",
  },
  {
    title: "Speak for up to 2 minutes",
    copy: "The examiner asks you to start talking and will stop you at two minutes. Cover every bullet, keep going without long pauses, and spend the most time on the final “explain why” point, which is where you show range.",
  },
  {
    title: "One or two rounding-off questions",
    copy: "The examiner may ask a short follow-up question. The topic then continues into Part 3, a 4–5 minute discussion of more abstract ideas linked to your cue card.",
  },
];

/** Server-rendered guide and cue card bank below the interactive studio. */
function SpeakingGuide() {
  const topics = Object.entries(
    SAMPLE_CUE_CARDS.reduce<Record<string, CueCardData[]>>((groups, card) => {
      (groups[card.topic] ??= []).push(card);
      return groups;
    }, {}),
  );

  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="speaking-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="speaking-guide" className="font-display text-lg font-bold text-surface-900">
          How IELTS Speaking Part 2 works
        </h2>
        <p>
          Part 2 is the long turn. You speak alone on one topic for one to two minutes, and it is marked on
          the same four criteria as the rest of the Speaking test: Fluency and Coherence, Lexical Resource,
          Grammatical Range and Accuracy, and Pronunciation. See what each band requires in the{" "}
          <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
            band descriptors
          </Link>
          .
        </p>
        <ol className="space-y-2">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span className="font-semibold text-surface-800">
                {i + 1}. {step.title}.
              </span>{" "}
              {step.copy}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-2">
        <h2 id="cue-card-index" className="font-display text-lg font-bold text-surface-900">
          {SAMPLE_CUE_CARDS.length} IELTS Speaking Part 2 cue cards with sample answers
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-surface-600">
          Each topic page has the full cue card, example one-minute notes, a Band 8–9 sample answer, useful
          phrases and Part 3 discussion questions. Practise any card above with the timer and recorder.
        </p>
      </div>
      {topics.map(([topic, cards]) => (
        <div key={topic} className="space-y-2.5">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.12em] text-surface-500">{topic}</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <li key={card.id}>
                <Link
                  href={cueCardPath(card)}
                  className="card flex h-full flex-col gap-1 p-4 transition hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span className="text-[14px] font-bold leading-snug text-surface-900">{card.title}</span>
                  <span className="line-clamp-2 text-[12px] leading-relaxed text-surface-500">{card.prompt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <AdBanner placement="display" />
    </section>
  );
}

export default function SpeakingPracticePage() {
  const url = absoluteUrl("/speaking-practice");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Speaking Practice Studio", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name="IELTS Speaking Part 2 Practice Studio"
        description="Interactive cue card simulator with timed preparation, live recording and model transcripts aligned to the four IELTS Speaking criteria."
        url={url}
        teaches={[
          "Fluency and Coherence",
          "Lexical Resource",
          "Grammatical Range and Accuracy",
          "Pronunciation",
        ]}
      />
      <HowToJsonLd
        name="How to practise IELTS Speaking Part 2"
        description="Use a cue card, prepare for one minute and speak for up to two minutes under exam conditions."
        url={url}
        steps={[
          {
            name: "Choose a cue card",
            text: "Pick an IELTS-style Speaking Part 2 cue card with its bullet-point prompts.",
          },
          {
            name: "Use the one-minute preparation",
            text: "Make brief notes during the one-minute preparation window without writing a full script.",
          },
          {
            name: "Record your two-minute answer",
            text: "Speak continuously for up to two minutes, covering every bullet point on the card.",
          },
          {
            name: "Review the feedback",
            text: "Compare your answer with the model transcript and review fluency, vocabulary, grammar and pronunciation.",
          },
        ]}
      />
      <SpeakingPracticeClient />
      <SpeakingGuide />
    </>
  );
}
