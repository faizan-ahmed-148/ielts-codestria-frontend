import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Clock, Lightbulb, MessageCircle, Mic, NotebookPen } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { BreadcrumbsJsonLd, LearningResourceJsonLd } from "@/components/JsonLd";
import {
  SAMPLE_CUE_CARDS,
  cueCardPath,
  cueCardSlug,
  findCueCardBySlug,
  type CueCardData,
} from "@/lib/speaking-cue-cards";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SAMPLE_CUE_CARDS.map((card) => ({ slug: cueCardSlug(card) }));
}

type Props = { params: Promise<{ slug: string }> };

const NOTE_TIPS = [
  "Write one keyword line per bullet point, not sentences; you only have 60 seconds.",
  "Decide on one specific example or short story early. Concrete details (names, places, times) are what keep you talking for two minutes.",
  "Add two or three topic phrases you want to use, so you show range without memorising a script.",
  "Note a reason or a feeling for the final “explain” bullet. It is where you can show the most complex language, so leave time for it.",
];

function describe(card: CueCardData): string {
  return `IELTS Speaking Part 2 cue card: ${card.prompt} Band 8–9 sample answer, one-minute notes, useful phrases and Part 3 questions.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const card = findCueCardBySlug(slug);
  if (!card) return {};
  return pageMetadata({
    title: `${card.title} · IELTS Speaking Cue Card & Sample Answer`,
    description: describe(card),
    path: cueCardPath(card),
    type: "article",
    keywords: [
      `${card.title} cue card`,
      "IELTS speaking part 2 sample answer",
      "IELTS cue card",
      "IELTS speaking part 3 questions",
      card.topic,
    ],
  });
}

export default async function CueCardPage({ params }: Props) {
  const { slug } = await params;
  const card = findCueCardBySlug(slug);
  if (!card) notFound();

  const path = cueCardPath(card);
  const url = absoluteUrl(path);
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Speaking Practice Studio", url: absoluteUrl("/speaking-practice") },
    { name: card.title, url },
  ];
  const practiseHref = `/speaking-practice?card=${encodeURIComponent(cueCardSlug(card))}`;
  const sameTopic = SAMPLE_CUE_CARDS.filter((c) => c.id !== card.id && c.topic === card.topic);
  const otherTopics = SAMPLE_CUE_CARDS.filter((c) => c.id !== card.id && c.topic !== card.topic);

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name={`${card.title} — IELTS Speaking Part 2 cue card`}
        description={describe(card)}
        url={url}
        teaches={["Fluency and Coherence", "Lexical Resource", "Grammatical Range and Accuracy", "Pronunciation"]}
      />

      <nav aria-label="Breadcrumb" className="text-[13px] text-surface-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-brand-600 hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link href="/speaking-practice" className="hover:text-brand-600 hover:underline">
              Speaking practice
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li aria-current="page" className="font-medium text-surface-700">
            {card.title}
          </li>
        </ol>
      </nav>

      <header className="space-y-3 border-b border-surface-200 pb-7">
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-600">
          Speaking Part 2 · {card.topic}
        </span>
        <h1 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-surface-900 sm:text-4xl">
          {card.title}: cue card and sample answer
        </h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-surface-600">
          An IELTS-style Part 2 topic with example preparation notes, a Band 8–9 sample answer, useful phrases and
          the Part 3 questions that often follow.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <article className="min-w-0 space-y-6 lg:col-span-8">
          <section className="card overflow-hidden" aria-labelledby="cue-card">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-100 bg-amber-50/60 px-5 py-3.5 sm:px-6">
              <h2
                id="cue-card"
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-800"
              >
                <Mic className="h-3.5 w-3.5" />
                Cue card
              </h2>
              <span className="badge-warning">1 min prep · 2 min speak</span>
            </div>
            <div className="p-5 sm:p-6">
              <p className="font-display text-xl font-extrabold leading-snug text-surface-900">{card.prompt}</p>
              <p className="mt-4 text-[13px] font-semibold text-surface-500">You should say:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-surface-700">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link href={practiseHref} className="btn-primary mt-5">
                <Clock className="h-4 w-4" />
                Practise this card with the timer and recorder
              </Link>
            </div>
          </section>

          <section className="card p-5 sm:p-6" aria-labelledby="notes">
            <h2 id="notes" className="flex items-center gap-2 font-display text-[15px] font-bold text-surface-900">
              <NotebookPen className="h-4 w-4 text-brand-600" />
              Using your one minute of preparation
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-surface-600">
              {NOTE_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            {card.prepNotes && card.prepNotes.length > 0 && (
              <>
                <h3 className="mt-5 text-[12px] font-bold uppercase tracking-[0.1em] text-surface-500">
                  Example notes for this card
                </h3>
                <ul className="mt-2 rounded-xl border border-dashed border-surface-300 bg-surface-50/60 p-4 font-mono text-[13px] leading-relaxed text-surface-700">
                  {card.prepNotes.map((note) => (
                    <li key={note}>– {note}</li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="card p-5 sm:p-7" aria-labelledby="sample-answer">
            <h2 id="sample-answer" className="font-display text-lg font-extrabold text-surface-900">
              Band 8–9 sample answer
            </h2>
            <div className="mt-4 max-w-prose space-y-4 text-[16px] leading-[1.8] text-surface-700">
              {card.modelTranscript.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <AdBanner placement="in-article" />

          <section className="card p-5 sm:p-6" aria-labelledby="phrases">
            <h2 id="phrases" className="flex items-center gap-2 font-display text-[15px] font-bold text-surface-900">
              <Lightbulb className="h-4 w-4 text-amber-600" />
              Useful phrases for this topic
            </h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2">
              {card.vocabTips.map((tip) => (
                <div key={tip.phrase} className="rounded-xl border border-surface-200/80 bg-surface-50/60 p-3.5">
                  <dt className="text-[14px] font-semibold text-surface-900">{tip.phrase}</dt>
                  <dd className="mt-0.5 text-[13px] leading-relaxed text-surface-600">{tip.meaning}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="card p-5 sm:p-6" aria-labelledby="part-3">
            <h2 id="part-3" className="flex items-center gap-2 font-display text-[15px] font-bold text-surface-900">
              <MessageCircle className="h-4 w-4 text-brand-600" />
              Rounding-off and Part 3 discussion questions
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-surface-600">
              <span className="font-semibold text-surface-800">Rounding-off question:</span> {card.followUp}
            </p>
            {card.part3Questions && card.part3Questions.length > 0 && (
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[14px] leading-relaxed text-surface-700">
                {card.part3Questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            )}
            <p className="mt-3 text-[13px] leading-relaxed text-surface-500">
              In Part 3, give a direct answer, support it with a reason and an example, and consider other points of
              view. See what each band requires in the{" "}
              <Link href="/band-descriptors" className="font-semibold text-brand-600 hover:underline">
                band descriptors
              </Link>
              .
            </p>
          </section>

          <section className="card flex flex-col gap-4 bg-brand-50/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="font-display text-[15px] font-bold text-surface-900">Your turn</h2>
              <p className="mt-1 text-[14px] leading-relaxed text-surface-600">
                Take one minute to make notes, then record yourself speaking for two minutes on this card.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <Link href={practiseHref} className="btn-primary">
                <Mic className="h-4 w-4" />
                Practise this card
              </Link>
              <Link href="/tests" className="btn-secondary">
                Practice tests
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </article>

        <aside className="space-y-5 lg:col-span-4" aria-labelledby="more-cards">
          <h2 id="more-cards" className="eyebrow block">
            More cue cards
          </h2>
          {sameTopic.length > 0 && (
            <div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-surface-500">{card.topic}</h3>
              <CardLinks cards={sameTopic} />
            </div>
          )}
          <div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.08em] text-surface-500">Other topics</h3>
            <CardLinks cards={otherTopics} />
          </div>
          <Link href="/speaking-practice" className="btn-ghost btn-sm">
            All cue cards and the speaking studio
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </aside>
      </div>

      <AdBanner placement="multiplex" />
    </div>
  );
}

function CardLinks({ cards }: { cards: CueCardData[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {cards.map((other) => (
        <li key={other.id}>
          <Link
            href={cueCardPath(other)}
            className="block rounded-xl border border-surface-200/80 bg-white px-3.5 py-2.5 text-[13px] font-semibold leading-snug text-surface-800 shadow-xs transition hover:border-brand-300 hover:bg-brand-50/40"
          >
            {other.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
