import Link from "next/link";
import { SAMPLE_CUE_CARDS } from "@/lib/speaking-cue-cards";
import SpeakingPracticeClient from "./SpeakingPracticeClient";

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

      <h2 className="font-display text-lg font-bold text-surface-900">Practice cue cards with model answers</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {SAMPLE_CUE_CARDS.map((card) => (
          <article key={card.id} className="card p-5 sm:p-6 text-[13px] leading-relaxed text-surface-600">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-400">{card.topic}</p>
            <h3 className="mt-1 text-[15px] font-bold text-surface-900">{card.title}</h3>
            <p className="mt-2 font-medium text-surface-800">{card.prompt}</p>
            <p className="mt-2">You should say:</p>
            <ul className="mt-1 list-disc pl-5">
              {card.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <h4 className="mt-3 font-semibold text-surface-800">Useful phrases</h4>
            <ul className="mt-1 space-y-0.5">
              {card.vocabTips.map((tip) => (
                <li key={tip.phrase}>
                  <span className="font-medium text-surface-700">{tip.phrase}</span>: {tip.meaning}
                </li>
              ))}
            </ul>
            <details className="mt-3">
              <summary className="cursor-pointer font-semibold text-brand-600">Band 8+ model answer</summary>
              {card.modelTranscript.split("\n\n").map((para, i) => (
                <p key={i} className="mt-2">
                  {para}
                </p>
              ))}
            </details>
            <p className="mt-3">
              <span className="font-semibold text-surface-800">Part 3 follow-up:</span> {card.followUp}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function SpeakingPracticePage() {
  return (
    <>
      <SpeakingPracticeClient />
      <SpeakingGuide />
    </>
  );
}
