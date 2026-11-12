import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { GRAMMAR_TOPICS } from "@/lib/grammar-data";
import GrammarClient from "./GrammarClient";
import { GRAMMAR_FAQS } from "./faqs";

function GrammarGuide() {
  const half = Math.ceil(GRAMMAR_TOPICS.length / 2);
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="grammar-guide">
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="grammar-guide" className="font-display text-lg font-bold text-surface-900">
          IELTS grammar rules you need to know
        </h2>
        <p>
          Grammatical Range and Accuracy is a quarter of your Writing and Speaking band. Examiners count how often your
          sentences are error-free and how varied your structures are. The rules below cover the errors that appear most often
          in candidate essays. Each rule is followed by a typical mistake and its correction. Practise each one with the
          exercises above, then check your writing against the{" "}
          <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
            band descriptors
          </Link>
          .
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {GRAMMAR_TOPICS.slice(0, half).map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>

      <AdBanner placement="display" />

      <div className="grid gap-4 lg:grid-cols-2">
        {GRAMMAR_TOPICS.slice(half).map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>

      <div className="max-w-3xl space-y-4">
        <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
        {GRAMMAR_FAQS.map((f) => (
          <div key={f.question}>
            <h3 className="text-[15px] font-semibold text-surface-900">{f.question}</h3>
            <p className="mt-1 text-sm leading-relaxed text-surface-600">{f.answer}</p>
          </div>
        ))}
        <p className="text-sm text-surface-600">
          See the rules in context in our{" "}
          <Link href="/model-answers" className="font-semibold text-brand-600 hover:underline">
            band 9 model answers
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function TopicCard({ topic }: { topic: (typeof GRAMMAR_TOPICS)[number] }) {
  return (
    <article id={`rule-${topic.id}`} className="card p-5 sm:p-6">
      <h3 className="text-[15px] font-bold text-surface-900">{topic.title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-surface-600">{topic.rule}</p>
      <div className="mt-3 space-y-1 text-[13px]">
        <p className="text-rose-700">
          <span className="font-semibold">✗</span> <span className="line-through decoration-rose-300">{topic.example.wrong}</span>
        </p>
        <p className="text-emerald-700">
          <span className="font-semibold">✓</span> {topic.example.right}
        </p>
      </div>
    </article>
  );
}

export default function GrammarPage() {
  return (
    <>
      <GrammarClient />
      <GrammarGuide />
    </>
  );
}
