import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { DICTATION_ITEMS, DICTATION_PARTS, type DictationPart } from "@/lib/dictation-data";
import DictationClient from "./DictationClient";
import { DICTATION_FAQS } from "./faqs";

const TRAPS = [
  { title: "Teens and tens", text: "Fifteen and fifty, thirteen and thirty. In '-teen' numbers the stress falls on the end (fifTEEN); in tens it falls on the start (FIFty)." },
  { title: "Spelt names and codes", text: "Names are often spelt unusually, and postcodes mix letters and digits. 'Double L' means LL; 'oh' in a phone number means zero." },
  { title: "Self-corrections", text: "Speakers change their minds: 'Tuesday, sorry, Thursday'. The first answer you hear is often a distractor." },
  { title: "Small grammar words", text: "Plural -s, articles and negative contractions (hadn't, won't) change the meaning and the spelling of your answer." },
];

function DictationGuide() {
  const counts = ([1, 2, 3, 4] as DictationPart[]).map((p) => ({
    part: p,
    n: DICTATION_ITEMS.filter((i) => i.part === p).length,
  }));
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="dictation-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="dictation-guide" className="font-display text-lg font-bold text-surface-900">
          Why dictation works for IELTS Listening
        </h2>
        <p>
          Most IELTS Listening questions are completion tasks: you write a word or number you heard into a form, table or set of
          notes. To get the mark, you need to catch the exact word and spell it correctly. Listening for the general idea is not
          enough. Dictation trains precisely this skill, because you have to account for every word in the sentence, including
          the short, unstressed ones that are easy to miss.
        </p>
        <p>
          Each sentence in this tool is written in the style of one of the four parts of the test. Part 1 sentences focus on
          names, phone numbers, prices, dates and addresses. Part 2 covers tours and facilities. Part 3 uses the language of
          students discussing a project, and Part 4 uses academic lecture vocabulary.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {counts.map((c) => (
            <li key={c.part} className="card-muted p-3 text-[13px]">
              <span className="font-semibold text-surface-800">{DICTATION_PARTS[c.part].label}</span> ({c.n} sentences):{" "}
              {DICTATION_PARTS[c.part].description}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 className="font-display text-lg font-bold text-surface-900">How to practise</h2>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Play the sentence once at normal speed and type everything you can.</li>
          <li>Check your answer. Green words are correct, red words were misheard, amber words are missing.</li>
          <li>Replay at slow speed to hear the words you missed, then play at normal speed again.</li>
          <li>Read the trap note and remember the pattern. The same traps appear in every real test.</li>
        </ol>
        <p>
          Ten minutes a day is enough to make a difference. When you are scoring above 90% on Hard sentences, move on to a full{" "}
          <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
            IELTS Listening practice test
          </Link>{" "}
          and convert your score with the{" "}
          <Link href="/calculator" className="font-semibold text-brand-600 hover:underline">
            band score calculator
          </Link>
          .
        </p>
      </div>

      <AdBanner placement="display" />

      <div className="grid gap-4 md:grid-cols-2">
        {TRAPS.map((t) => (
          <article key={t.title} className="card p-5">
            <h3 className="text-[15px] font-bold text-surface-900">{t.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-surface-600">{t.text}</p>
          </article>
        ))}
      </div>

      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
        {DICTATION_FAQS.map((f) => (
          <div key={f.question}>
            <h3 className="text-[15px] font-semibold text-surface-900">{f.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-surface-600">{f.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DictationPage() {
  return (
    <>
      <DictationClient />
      <DictationGuide />
    </>
  );
}
