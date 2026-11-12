import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { IELTS_READING_MINUTES, IELTS_READING_WORDS, SPEED_BANDS } from "@/lib/reading-speed-data";
import ReadingSpeedClient from "./ReadingSpeedClient";
import { READING_SPEED_FAQS } from "./faqs";

function ReadingSpeedGuide() {
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="speed-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="speed-guide" className="font-display text-lg font-bold text-surface-900">
          How fast do you need to read for IELTS?
        </h2>
        <p>
          The IELTS Academic Reading test has three long passages, about {IELTS_READING_WORDS.toLocaleString()} words in
          total, and 40 questions. You have {IELTS_READING_MINUTES} minutes for everything, with no extra time to transfer
          answers on paper. If you spend 20 minutes on each passage and use half of that time reading, you need to read at
          roughly 270 words per minute. Many candidates run out of time not because the questions are hard, but because they
          read too slowly or reread sentences they did not understand.
        </p>
        <p>
          Speed alone is not the goal, though. This test reports your <strong>effective reading speed</strong>: your words per
          minute multiplied by the percentage of comprehension questions you answered correctly. It rewards reading that is both
          fast and accurate, which is what IELTS demands.
        </p>
      </div>

      <div className="card overflow-x-auto p-5 sm:p-6">
        <h3 className="text-[15px] font-bold text-surface-900">Effective reading speed: guidance ranges</h3>
        <table className="mt-3 w-full min-w-[480px] text-left text-[13px] text-surface-600">
          <thead className="text-surface-800">
            <tr>
              <th className="py-1.5 pr-3 font-semibold">Effective WPM</th>
              <th className="py-1.5 pr-3 font-semibold">Level</th>
              <th className="py-1.5 font-semibold">What it means for IELTS</th>
            </tr>
          </thead>
          <tbody>
            {SPEED_BANDS.map((b) => (
              <tr key={b.label} className="border-t border-surface-100">
                <td className="py-1.5 pr-3">{b.max === Infinity ? `${b.min}+` : `${b.min}–${b.max - 1}`}</td>
                <td className="py-1.5 pr-3 font-semibold text-surface-900">{b.label}</td>
                <td className="py-1.5">{b.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-surface-400">These ranges are practical guidance, not official IELTS criteria.</p>
      </div>

      <AdBanner placement="display" />

      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 className="font-display text-lg font-bold text-surface-900">How to improve your reading speed</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Skim first.</strong> Spend two or three minutes reading the title, first sentences of each paragraph and
            the conclusion before looking at the questions.
          </li>
          <li>
            <strong>Scan for keywords.</strong> Names, dates, numbers and capitalised words are quick to find and anchor your
            careful reading.
          </li>
          <li>
            <strong>Stop rereading.</strong> Going back over a sentence feels safe but costs time. Read on; the meaning often
            becomes clear from context.
          </li>
          <li>
            <strong>Build vocabulary.</strong> Unknown words slow you down most. Review topic words with our{" "}
            <Link href="/flashcards" className="font-semibold text-brand-600 hover:underline">
              vocabulary flashcards
            </Link>
            .
          </li>
          <li>
            <strong>Practise under real timing.</strong> Take a full{" "}
            <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
              IELTS Reading practice test
            </Link>{" "}
            in 60 minutes and note which passage took the longest.
          </li>
        </ul>
      </div>

      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
        {READING_SPEED_FAQS.map((f) => (
          <div key={f.question}>
            <h3 className="text-[15px] font-semibold text-surface-900">{f.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-surface-600">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ReadingSpeedTestPage() {
  return (
    <>
      <ReadingSpeedClient />
      <ReadingSpeedGuide />
    </>
  );
}
