"use client";

import { useState } from "react";
import { ArrowLeft, Award, BookOpen, CheckCircle2, ChevronRight, FileText, Mic, Sparkles } from "lucide-react";
import Link from "next/link";

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

export default function BandDescriptorsPage() {
  const [activeTab, setActiveTab] = useState<RubricTab>("task2");
  const [selectedBand, setSelectedBand] = useState<number>(7);

  const criteria =
    activeTab === "speaking" ? SPEAKING_CRITERIA : activeTab === "task1" ? TASK1_CRITERIA : TASK2_CRITERIA;

  return (
    <div className="min-h-screen bg-[#f7f8fb] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/tests?type=ACADEMIC"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Explore Cambridge Books
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 border border-violet-200">
              <Sparkles className="h-3.5 w-3.5" /> Official IELTS Public Rubrics
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
              by Codestria
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center sm:text-left mb-8">
          <div className="eyebrow text-brand-600 mb-1">Examiner Assessment Criteria</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            IELTS Band Descriptors Reference
          </h1>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">
            Understand exactly how certified IELTS examiners and our AI scoring engine evaluate your essays and spoken responses across the 4 official criteria.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex rounded-2xl bg-slate-200/70 p-1.5 shadow-inner">
            <button
              onClick={() => setActiveTab("task2")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "task2" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="h-4 w-4" /> Writing Task 2 (Essay)
            </button>
            <button
              onClick={() => setActiveTab("task1")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "task1" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="h-4 w-4" /> Writing Task 1 (Report/Letter)
            </button>
            <button
              onClick={() => setActiveTab("speaking")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === "speaking" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Mic className="h-4 w-4" /> Speaking Interview
            </button>
          </div>

          {/* Band Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <span className="text-xs font-bold text-slate-400 px-2 uppercase tracking-wider">Band:</span>
            {[5, 6, 7, 8, 9].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBand(b)}
                className={`w-9 h-8 rounded-lg text-sm font-bold transition ${
                  selectedBand === b
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Criteria Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {criteria.map((c) => (
            <div key={c.name} className="card p-6 border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900 text-base">{c.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                    Band {selectedBand}.0 Standard
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[96px]">
                  {c.bands[selectedBand] || c.bands[7]}
                </p>
              </div>

              {/* Band comparison preview */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Next level ({selectedBand < 9 ? `Band ${selectedBand + 1}` : "Peak"}):</span>
                <span className="font-medium text-brand-600">
                  {selectedBand < 9
                    ? `Requires greater flexibility & error-free accuracy`
                    : "Native-like precision throughout"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-700 p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-brand-200">Ready to test yourself?</span>
            <h2 className="text-2xl font-bold mt-1">Get AI examiner feedback on your next test</h2>
            <p className="text-sm text-brand-100 mt-2 max-w-xl">
              Write an essay or take a speaking module to receive an instant, itemized breakdown across all 4 criteria just like this.
            </p>
          </div>
          <Link href="/tests" className="btn-dark bg-white text-slate-900 hover:bg-slate-100 shadow-lg px-6 py-3 whitespace-nowrap">
            Choose a Mock Test <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
