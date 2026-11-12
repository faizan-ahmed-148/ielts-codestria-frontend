import Link from "next/link";
import { IELTS_VOCABULARY, type IELTSVocabularyItem } from "@/lib/ielts-content-data";
import VocabularyClient from "./VocabularyClient";

/**
 * Server-rendered word list. The flashcards and quiz above are interactive;
 * this directory puts every entry in the HTML so it can be read and indexed.
 */
function WordDirectory() {
  const topics = new Map<string, IELTSVocabularyItem[]>();
  for (const item of IELTS_VOCABULARY) {
    if (!topics.has(item.topic)) topics.set(item.topic, []);
    topics.get(item.topic)!.push(item);
  }

  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="word-list">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="word-list" className="font-display text-lg font-bold text-surface-900">
          IELTS vocabulary list by topic
        </h2>
        <p>
          Lexical Resource is a quarter of your Writing and Speaking band. Examiners reward less common
          words used precisely and in natural collocations, not long words dropped into a sentence. Learn
          each item below with its collocations and use it in a sentence of your own, then test yourself
          with the flashcards and quiz above.
        </p>
        <p>
          Put the words to work in a full{" "}
          <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
            IELTS practice test
          </Link>{" "}
          or compare how they are used in our{" "}
          <Link href="/model-answers" className="font-semibold text-brand-600 hover:underline">
            band 9 model answers
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {[...topics.entries()].map(([topic, items]) => (
          <article key={topic} className="card p-5 sm:p-6">
            <h3 className="text-[15px] font-bold text-surface-900">{topic} vocabulary</h3>
            <dl className="mt-3 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="text-[13px] leading-relaxed text-surface-600">
                  <dt className="font-semibold text-surface-800">
                    {item.word}{" "}
                    <span className="font-normal text-surface-500">
                      {item.phonetic} · {item.partOfSpeech} · {item.cefr}
                    </span>
                  </dt>
                  <dd className="mt-0.5">{item.definition}</dd>
                  {item.collocations.length > 0 && (
                    <dd className="mt-0.5">
                      <span className="font-medium text-surface-700">Collocations:</span> {item.collocations.join("; ")}
                    </dd>
                  )}
                  <dd className="mt-0.5 italic">&ldquo;{item.sampleSentence}&rdquo;</dd>
                  {item.synonyms.length > 0 && (
                    <dd className="mt-0.5">
                      <span className="font-medium text-surface-700">Synonyms:</span> {item.synonyms.join(", ")}
                      {item.antonyms.length > 0 && (
                        <>
                          {" · "}
                          <span className="font-medium text-surface-700">Opposites:</span> {item.antonyms.join(", ")}
                        </>
                      )}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function VocabularyPage() {
  return (
    <>
      <VocabularyClient />
      <WordDirectory />
    </>
  );
}
