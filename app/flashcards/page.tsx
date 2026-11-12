import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { IELTS_VOCABULARY } from "@/lib/ielts-content-data";
import FlashcardsClient from "./FlashcardsClient";
import { FLASHCARD_FAQS } from "./faqs";

// The word of the day is computed from the date at render time; refresh hourly.
export const revalidate = 3600;

/** Deterministic: the same word for everyone on a given UTC day. */
function wordOfTheDay(now = new Date()) {
  const day = Math.floor(now.getTime() / 86_400_000);
  return IELTS_VOCABULARY[day % IELTS_VOCABULARY.length];
}

function WordOfTheDay() {
  const word = wordOfTheDay();
  const date = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return (
    <section className="page-container pb-8" aria-labelledby="word-of-the-day">
      <div className="card mx-auto max-w-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="word-of-the-day" className="inline-flex items-center gap-2 text-[15px] font-bold text-surface-900">
            <Sparkles className="h-4 w-4 text-brand-500" /> IELTS word of the day
          </h2>
          <time className="text-xs text-surface-400">{date}</time>
        </div>
        <p className="mt-3 font-display text-2xl font-extrabold text-surface-900">
          {word.word}{" "}
          <span className="text-sm font-normal text-surface-500">
            {word.phonetic} · {word.partOfSpeech} · {word.cefr}
          </span>
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-surface-700">{word.definition}</p>
        <p className="mt-1.5 text-[13px] text-surface-600">
          <span className="font-semibold text-surface-700">Collocations:</span> {word.collocations.join("; ")}
        </p>
        <p className="mt-1.5 text-[13px] italic text-surface-600">&ldquo;{word.sampleSentence}&rdquo;</p>
      </div>
    </section>
  );
}

function FlashcardsGuide() {
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="flashcards-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="flashcards-guide" className="font-display text-lg font-bold text-surface-900">
          How spaced repetition helps you learn IELTS vocabulary
        </h2>
        <p>
          Lexical Resource is worth a quarter of your Writing and Speaking score, and examiners reward less common words used
          accurately and in natural collocations. The challenge is remembering them. Research on memory shows that we forget
          new words quickly unless we review them, and that reviews are most effective when they are spaced out just before
          we are likely to forget.
        </p>
        <p>
          These flashcards use the Leitner system, a simple form of spaced repetition. Every word starts in box 1. When you
          rate a card <strong>Good</strong> it moves up a box and comes back later; <strong>Easy</strong> moves it up two
          boxes. <strong>Hard</strong> keeps it where it is, and <strong>Again</strong> returns it to box 1 so you see it
          again within a couple of cards. Once a word reaches box 5 it is mastered for this session.
        </p>
        <h3 className="pt-2 text-[15px] font-bold text-surface-900">Tips for using flashcards well</h3>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Say the meaning aloud before you flip the card. Active recall is what builds memory.</li>
          <li>Learn the collocations, not just the word: &ldquo;mitigate the impact of&rdquo; is more useful than &ldquo;mitigate&rdquo;.</li>
          <li>Write your own sentence for each mastered word, ideally on an IELTS Task 2 topic.</li>
          <li>Be honest with your ratings. Pressing Easy on a word you half know only slows you down later.</li>
        </ul>
        <p>
          Browse every word with its synonyms in the{" "}
          <Link href="/vocabulary" className="font-semibold text-brand-600 hover:underline">
            academic vocabulary lab
          </Link>
          , and see them used in{" "}
          <Link href="/model-answers" className="font-semibold text-brand-600 hover:underline">
            band 9 model answers
          </Link>
          .
        </p>
      </div>

      <AdBanner placement="display" />

      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
        {FLASHCARD_FAQS.map((f) => (
          <div key={f.question}>
            <h3 className="text-[15px] font-semibold text-surface-900">{f.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-surface-600">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function FlashcardsPage() {
  return (
    <>
      <FlashcardsClient />
      <WordOfTheDay />
      <FlashcardsGuide />
    </>
  );
}
