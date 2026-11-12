import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { FaqJsonLd } from "@/components/JsonLd";
import WritingCheckerClient from "./WritingCheckerClient";

const CRITERIA = [
  {
    name: "Task Achievement / Task Response",
    text: "Task 1 is marked on Task Achievement: covering every part of the task, giving a clear overview (Academic) or a clear purpose (letters), and selecting key features accurately. Task 2 is marked on Task Response: answering every part of the question, presenting a clear position throughout and supporting ideas with relevant, extended examples.",
  },
  {
    name: "Coherence & Cohesion",
    text: "How logically your ideas are organised. Examiners look for clear paragraphing with one central idea per paragraph, a logical progression of information, and a range of cohesive devices (linking words, referencing, substitution) used naturally rather than mechanically.",
  },
  {
    name: "Lexical Resource",
    text: "The range and accuracy of your vocabulary: less common and topic-specific words, natural collocations, paraphrasing instead of repetition, and correct spelling and word formation.",
  },
  {
    name: "Grammatical Range & Accuracy",
    text: "A mix of simple and complex sentence structures (relative clauses, conditionals, passives) and how many of your sentences are error-free. Band 7 needs frequent error-free sentences; Band 8 needs the majority to be error-free.",
  },
];

const MISTAKES = [
  "Writing under the minimum word count (150 for Task 1, 250 for Task 2) — this directly lowers your Task Achievement or Task Response band.",
  "Missing the overview in Academic Task 1, or describing every number instead of selecting key trends and comparisons.",
  "Copying whole phrases from the question instead of paraphrasing them; copied words do not count towards your word total.",
  "Overusing the same linking words (“Firstly… Secondly… Moreover…”) at the start of every sentence.",
  "Using informal language such as contractions, “a lot of”, “stuff” or “things” in essays and formal letters.",
  "Writing one huge paragraph, or very long sentences that hide grammar mistakes.",
  "Not giving a clear opinion in Task 2 when the question asks “To what extent do you agree?”.",
];

const FAQS = [
  {
    question: "Is this IELTS writing checker free?",
    answer:
      "Yes. The word counter and the instant analysis of paragraphs, sentences, vocabulary range, repeated words, linking words and informal language are completely free and need no account. The AI band score needs a free account and your own AI provider key (Groq offers a free one).",
  },
  {
    question: "How accurate is the AI band score?",
    answer:
      "The AI examiner marks your response against the public IELTS Writing band descriptors for the four criteria and is a useful practice estimate, usually within half a band to one band of a human examiner. It is not an official IELTS result.",
  },
  {
    question: "How many words do I need for IELTS Writing?",
    answer:
      "Task 1 (Academic report or General Training letter) needs at least 150 words, and Task 2 needs at least 250 words. There is no maximum, but writing far more than 200 words for Task 1 or 320 words for Task 2 usually leaves less time for checking and increases errors.",
  },
  {
    question: "Does IELTS count contractions and numbers as words?",
    answer:
      "In the paper test a contraction like “don't” counts as one word, and numbers written as digits count as one word. Contractions are best avoided in Task 2 essays and formal letters, though they are acceptable in an informal letter to a friend.",
  },
  {
    question: "Which IELTS Writing task is more important?",
    answer:
      "Task 2 counts twice as much as Task 1 towards your Writing band, so you should spend about 40 minutes on Task 2 and about 20 minutes on Task 1.",
  },
];

/** Server-rendered guide below the interactive checker. */
function WritingGuide() {
  return (
    <section className="page-container space-y-8 pb-12" aria-labelledby="writing-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="writing-guide" className="font-display text-lg font-bold text-surface-900">
          How IELTS Writing is assessed
        </h2>
        <p>
          Both Writing tasks are marked by trained examiners against four equally weighted criteria. Each criterion
          gets a band from 0 to 9, the four are averaged to give the task band, and Task 2 counts twice as much as
          Task 1 in your final Writing score. The full wording is in the{" "}
          <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
            IELTS band descriptors
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CRITERIA.map((c) => (
          <div key={c.name} className="card p-5">
            <h3 className="text-[15px] font-bold text-surface-900">{c.name}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-surface-600">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-surface-900">Word-count rules</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-surface-600">
            <li>
              <strong className="text-surface-800">Task 1:</strong> at least 150 words in about 20 minutes (Academic
              report or General Training letter).
            </li>
            <li>
              <strong className="text-surface-800">Task 2:</strong> at least 250 words in about 40 minutes.
            </li>
            <li>Answers under the minimum are penalised under Task Achievement or Task Response.</li>
            <li>Titles, copied question text and memorised phrases unrelated to the topic are not credited.</li>
            <li>On computer-delivered IELTS the word count is shown on screen; on paper you must estimate it yourself.</li>
          </ul>
        </div>
        <div className="card p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-surface-900">Common mistakes that cost bands</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-surface-600">
            {MISTAKES.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>

      <AdBanner placement="display" />

      <div className="max-w-3xl">
        <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((f) => (
            <div key={f.question} className="card p-5">
              <h3 className="text-[15px] font-bold text-surface-900">{f.question}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-surface-600">{f.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[13px] text-surface-500">
          Ready for the real thing? Try a timed Writing paper in our{" "}
          <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
            free IELTS practice tests
          </Link>{" "}
          or convert your scores with the{" "}
          <Link href="/calculator" className="font-semibold text-brand-600 hover:underline">
            band score calculator
          </Link>
          .
        </p>
      </div>
      <FaqJsonLd faqs={FAQS} />
    </section>
  );
}

export default function WritingCheckerPage() {
  return (
    <>
      <WritingCheckerClient />
      <WritingGuide />
    </>
  );
}
