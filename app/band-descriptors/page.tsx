"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronRight, FileText, Mic, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui";

type RubricTab = "task2" | "task1" | "speaking";

interface Criterion {
  name: string;
  bands: Record<number, string>;
}

const TASK2_CRITERIA: Criterion[] = [
  {
    name: "Task Response (25%)",
    bands: {
      9: "Fully addresses all parts of the task. Presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas.",
      8: "Sufficiently addresses all parts of the task. Presents a well-developed response with relevant, extended and supported ideas.",
      7: "Addresses all parts of the task. Presents a clear position throughout the response. Presents, extends and supports main ideas, but there may be a tendency to over-generalise.",
      6: "Addresses all parts of the task although some parts may be more fully covered than others. Presents a relevant position, although the conclusions may become unclear or repetitive.",
      5: "Addresses the task only partially; the format may be inappropriate in places. Expresses a position but the development is not always clear.",
    },
  },
  {
    name: "Coherence & Cohesion (25%)",
    bands: {
      9: "Uses cohesion in such a way that it attracts no attention. Skilfully manages paragraphing.",
      8: "Sequences information and ideas logically. Manages all aspects of cohesion well. Uses paragraphing sufficiently and appropriately.",
      7: "Logically organises information and ideas; there is clear progression throughout. Uses a range of cohesive devices appropriately although there may be some under-/over-use. Presents a clear central topic within each paragraph.",
      6: "Arranges information and ideas coherently and there is a clear overall progression. Uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical.",
      5: "Presents information with some organisation but there may be a lack of overall progression. Makes inadequate, inaccurate or over-use of cohesive devices.",
    },
  },
  {
    name: "Lexical Resource (25%)",
    bands: {
      9: "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'.",
      8: "Uses a wide range of vocabulary fluently and flexibly to convey precise meanings. Skilfully uses uncommon lexical items, with occasional inaccuracies in word choice and collocation.",
      7: "Uses a sufficient range of vocabulary to allow some flexibility and precision. Uses less common lexical items with some awareness of style and collocation.",
      6: "Uses an adequate range of vocabulary for the task. Attempts to use less common vocabulary but with some inaccuracy. Makes some errors in spelling and/or word formation.",
      5: "Uses a limited range of vocabulary, but this is minimally adequate for the task. May make noticeable errors in spelling and/or word formation that cause difficulty for the reader.",
    },
  },
  {
    name: "Grammatical Range & Accuracy (25%)",
    bands: {
      9: "Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'.",
      8: "Uses a wide range of structures. The majority of sentences are error-free. Makes only very occasional errors or non-systematic inaccuracies.",
      7: "Uses a variety of complex structures. Produces frequent error-free sentences. Has good control of grammar and punctuation but may make a few errors.",
      6: "Uses a mix of simple and complex sentence forms. Makes some errors in grammar and punctuation but they rarely reduce communication.",
      5: "Uses only a limited range of structures. Attempts complex sentences but these tend to be less accurate than simple sentences. May make frequent grammatical errors.",
    },
  },
];

const TASK1_CRITERIA: Criterion[] = [
  {
    name: "Task Achievement (25%)",
    bands: {
      9: "Fully satisfies all the requirements of the task. Clearly presents a fully developed response with key trends, differences or stages highlighted with complete accuracy.",
      8: "Covers all requirements of the task appropriately, relevantly and sufficiently. Presents a clear overview of main trends, differences or stages. Clearly highlights key features/bullet points.",
      7: "Covers the requirements of the task. Presents a clear overview of main trends, differences or stages. Clearly presents and highlights key features/bullet points but could be more fully extended.",
      6: "Addresses the requirements of the task. Presents an overview with information appropriately selected. Highlights key features/bullet points but details may be incomplete or inaccurate.",
      5: "Generally addresses the task; the format may be inappropriate in places. Recounts detail mechanically with no clear overview. Inadequately covers key features/bullet points.",
    },
  },
  TASK2_CRITERIA[1],
  TASK2_CRITERIA[2],
  TASK2_CRITERIA[3],
];

const SPEAKING_CRITERIA: Criterion[] = [
  {
    name: "Fluency & Coherence (25%)",
    bands: {
      9: "Speaks fluently with only rare repetition or self-correction; any hesitation is content-related rather than to find words or grammar. Speaks coherently with fully appropriate cohesive features.",
      8: "Speaks fluently with only occasional repetition or self-correction; hesitation is usually content-based. Develops topics coherently and appropriately.",
      7: "Speaks at length without noticeable effort or loss of coherence. May demonstrate language-related hesitation at times, or some repetition and/or self-correction.",
      6: "Is willing to speak at length, though may lose coherence at times through repetition, self-correction or hesitation. Uses a range of connectives and discourse markers.",
      5: "Usually maintains flow of speech but uses repetition, self-correction and/or slow speech to keep going. Over-uses certain connectives and discourse markers.",
    },
  },
  {
    name: "Lexical Resource (25%)",
    bands: {
      9: "Uses vocabulary with full flexibility and precision in all topics. Uses idiomatic language naturally and accurately.",
      8: "Uses a wide vocabulary resource readily and flexibly to convey precise meaning. Uses less common and idiomatic vocabulary skilfully, with occasional inaccuracies.",
      7: "Uses vocabulary resource flexibly to discuss a variety of topics. Uses some less common and idiomatic vocabulary and shows some awareness of style and collocation.",
      6: "Has a wide enough vocabulary to discuss topics at length and make meaning clear in spite of inaccuracies. Generally succeeds in paraphrasing.",
      5: "Manages to talk about familiar and unfamiliar topics but uses vocabulary with limited flexibility. Attempts paraphrase with mixed success.",
    },
  },
  {
    name: "Grammatical Range & Accuracy (25%)",
    bands: {
      9: "Uses a full range of structures naturally and appropriately. Produces consistently accurate structures apart from 'slips' characteristic of native speaker speech.",
      8: "Uses a wide range of structures flexibly. Produces a majority of error-free sentences with only very occasional inaccuracies or non-systematic errors.",
      7: "Uses a range of complex structures with some flexibility. Frequently produces error-free sentences, though some grammatical mistakes persist.",
      6: "Uses a mix of simple and complex structures, but with limited flexibility. May make frequent mistakes with complex structures, though these rarely cause comprehension problems.",
      5: "Produces basic sentence forms with reasonable accuracy. Uses a limited range of more complex structures, but these usually contain errors.",
    },
  },
  {
    name: "Pronunciation (25%)",
    bands: {
      9: "Uses a full range of pronunciation features with precision and subtlety. Sustains flexible use of features throughout. Is effortless to understand.",
      8: "Uses a wide range of pronunciation features. Sustains flexible use of features, with only occasional lapses. Is easy to understand throughout.",
      7: "Shows all the positive features of Band 6 and some, but not all, of the positive features of Band 8. Is generally easy to understand.",
      6: "Uses a range of pronunciation features with mixed control. Shows some effective use of features but this is not sustained. Can generally be understood throughout.",
      5: "Shows all the positive features of Band 4 and some of the positive features of Band 6. Pronunciation causes occasional difficulty for the listener.",
    },
  },
];

const TABS: { id: RubricTab; label: string; short: string; Icon: typeof FileText }[] = [
  { id: "task2", label: "Writing Task 2 (Essay)", short: "Task 2", Icon: FileText },
  { id: "task1", label: "Writing Task 1 (Report/Letter)", short: "Task 1", Icon: BookOpen },
  { id: "speaking", label: "Speaking Interview", short: "Speaking", Icon: Mic },
];

const BANDS = [5, 6, 7, 8, 9];

const TAB_COPY: Record<RubricTab, string> = {
  task2: "Four equally weighted criteria for the discursive essay, marked from 0 to 9.",
  task1: "Task Achievement plus the three shared writing criteria, each worth 25%.",
  speaking: "Four equally weighted criteria used across all three speaking parts.",
};

export default function BandDescriptorsPage() {
  const [activeTab, setActiveTab] = useState<RubricTab>("task2");
  const [selectedBand, setSelectedBand] = useState<number>(7);

  const criteria =
    activeTab === "speaking" ? SPEAKING_CRITERIA : activeTab === "task1" ? TASK1_CRITERIA : TASK2_CRITERIA;
  const activeTabMeta = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Examiner assessment criteria"
        title="IELTS band descriptors"
        description="See exactly how certified IELTS examiners and our AI scoring engine evaluate essays and spoken responses across the four official criteria."
        actions={
          <>
            <span className="badge bg-violet-50 text-violet-700 border border-violet-200/70">
              <Sparkles className="h-3.5 w-3.5" />
              Public rubrics
            </span>
            <Link href="/tests?type=ACADEMIC" className="btn-secondary">
              <ArrowLeft className="h-4 w-4" />
              Cambridge books
            </Link>
          </>
        }
      />

      {/* Sticky controls */}
      <div className="card sticky top-[4.5rem] z-20 flex flex-col gap-4 p-3 lg:top-4 lg:flex-row lg:items-center lg:justify-between lg:p-4">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 scroll-thin lg:pb-0">
          {TABS.map(({ id, label, short, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-pressed={activeTab === id}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition ${
                activeTab === id
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200/80 hover:text-surface-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${activeTab === id ? "text-white/80" : "text-surface-400"}`} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-surface-200 bg-white p-1">
          <span className="px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-surface-400">Band</span>
          {BANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBand(b)}
              aria-pressed={selectedBand === b}
              className={`h-8 w-9 cursor-pointer rounded-lg font-display text-sm font-bold tabular-nums transition ${
                selectedBand === b
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-surface-600 hover:bg-surface-100 hover:text-surface-900"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <div className="eyebrow text-brand-600">Band {selectedBand}.0</div>
          <h2 className="mt-1.5 font-display text-xl font-extrabold tracking-tight text-surface-900 sm:text-2xl">
            {activeTabMeta.label}
          </h2>
          <p className="mt-1.5 text-[14px] leading-relaxed text-surface-500">{TAB_COPY[activeTab]}</p>
        </div>
        <span className="badge-neutral">{criteria.length} criteria · 25% each</span>
      </div>

      {/* Criteria cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {criteria.map((c, index) => (
          <article key={c.name} className="card flex flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand-200/70 bg-brand-50 font-display text-[13px] font-bold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-[15px] font-bold leading-snug tracking-tight text-surface-900 sm:text-base">
                  {c.name}
                </h2>
              </div>
              <span className="shrink-0 rounded-full border border-brand-200/70 bg-brand-50 px-2.5 py-1 text-[11px] font-bold tabular-nums text-brand-700">
                Band {selectedBand}.0
              </span>
            </div>

            <p className="mt-4 flex-1 rounded-xl border border-surface-200/80 bg-surface-50/70 p-4 text-[15px] leading-relaxed text-surface-700">
              {c.bands[selectedBand] || c.bands[7]}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-surface-100 pt-3.5 text-[13px]">
              <span className="text-surface-500">
                Next level ({selectedBand < 9 ? `Band ${selectedBand + 1}` : "Peak"})
              </span>
              <span className="font-semibold text-brand-700">
                {selectedBand < 9
                  ? "Greater flexibility & error-free accuracy"
                  : "Native-like precision throughout"}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-200/70 bg-brand-50/60 p-6 sm:p-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow text-brand-700">Ready to test yourself?</span>
          <h2 className="mt-2 font-display text-xl font-extrabold tracking-tight text-surface-900 sm:text-2xl">
            Get AI examiner feedback on your next test
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-surface-600">
            Write an essay or take a speaking module to receive an instant, itemised breakdown across all four criteria
            just like this.
          </p>
        </div>
        <Link href="/tests" className="btn-primary shrink-0">
          Choose a mock test
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
