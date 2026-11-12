"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Flag,
  Headphones,
  Highlighter,
  Layers,
  Mic,
  Pause,
  PenTool,
  Play,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Volume2,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BandRing, SectionHeading } from "@/components/ui";
import { FaqJsonLd } from "@/components/JsonLd";
import {
  calculateIELTSBand,
  calculateOverallBand,
  getCEFRLevel,
} from "@/lib/ielts-bands";
import { fetchBookCatalogue, type CambridgeBook } from "@/lib/catalog";

const HIGHLIGHTS: Record<string, string> = {
  yellow: "bg-amber-200/80 text-amber-950",
  green: "bg-emerald-200/80 text-emerald-950",
  pink: "bg-pink-200/80 text-pink-950",
};

const HOME_FAQ = [
  {
    question: "How does the Codestria IELTS simulator work?",
    answer:
      "Codestria IELTS recreates the computer-delivered IELTS test room with dual-pane Reading, synchronised Listening audio, three-colour highlighters, a notes scratchpad, official time alerts and question navigation. Reading and Listening are marked instantly from your correct answers; Writing and Speaking are scored by the AI examiner using your own provider key.",
  },
  {
    question: "Are the IELTS practice tests free?",
    answer:
      "Yes. Every full-length Academic and General Training paper in the library is free to sit, including the 40-question Reading and Listening modules with instant band scores. AI feedback for Writing and Speaking uses your own OpenAI, Groq or Anthropic API key, so you control the cost.",
  },
  {
    question: "How is the overall IELTS band score calculated?",
    answer:
      "The overall band is the average of Listening, Reading, Writing and Speaking. An average ending in .25 rounds up to the next half band (6.25 becomes 6.5), and an average ending in .75 rounds up to the next whole band (6.75 becomes 7.0).",
  },
  {
    question: "Do I need an AI key for Writing and Speaking?",
    answer:
      "Reading and Listening never need a key. For Writing and Speaking, add your own OpenAI, Groq or Anthropic key under Profile → AI Scoring. Bands come only from the model's assessment, and if the model returns an error you see the error instead of a made-up band.",
  },
];

export default function Home() {
  /* Hero simulator */
  const [highlightColor, setHighlightColor] = useState<"yellow" | "green" | "pink">("yellow");
  const [highlighted, setHighlighted] = useState<Record<number, string>>({ 1: "yellow" });
  const [answer, setAnswer] = useState<string | null>("TRUE");
  const [flagged, setFlagged] = useState(false);

  const togglePhrase = (id: number) =>
    setHighlighted((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: highlightColor };
    });

  /* Calculator */
  const [calcTrack, setCalcTrack] = useState<"ACADEMIC" | "GENERAL">("ACADEMIC");
  const [calcListening, setCalcListening] = useState(34);
  const [calcReading, setCalcReading] = useState(35);
  const [calcWriting, setCalcWriting] = useState(7.5);
  const [calcSpeaking, setCalcSpeaking] = useState(8.0);

  const listeningBand = calculateIELTSBand(calcListening, "LISTENING", calcTrack);
  const readingBand = calculateIELTSBand(calcReading, "READING", calcTrack);
  const overall = calculateOverallBand([listeningBand, readingBand, calcWriting, calcSpeaking]);
  const cefr = overall ? getCEFRLevel(overall) : null;

  /* Bookshelf */
  const [bookFilter, setBookFilter] = useState<"all" | "latest" | "classic">("all");
  const [books, setBooks] = useState<CambridgeBook[]>([]);
  useEffect(() => {
    let active = true;
    fetchBookCatalogue()
      .then((data) => active && setBooks(data))
      .catch(() => active && setBooks([]));
    return () => {
      active = false;
    };
  }, []);
  const filteredBooks = books.filter((book) => {
    if (bookFilter === "latest") return book.volume >= 17;
    if (bookFilter === "classic") return book.volume <= 16;
    return true;
  });

  /* Studio tour */
  const [studioTab, setStudioTab] = useState<"reading" | "listening" | "writing" | "speaking">("reading");
  const [cueTimer, setCueTimer] = useState(60);
  const [cueRunning, setCueRunning] = useState(false);

  useEffect(() => {
    if (!cueRunning || cueTimer <= 0) {
      if (cueTimer === 0) setCueRunning(false);
      return;
    }
    const interval = setInterval(() => setCueTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [cueRunning, cueTimer]);

  return (
    <div className="overflow-hidden bg-surface-50">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-surface-200 bg-aurora">
        <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-40" />
        <div className="page-container relative py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Copy */}
            <div className="text-center lg:col-span-6 lg:text-left">
              <Link
                href="/tests"
                className="inline-flex items-center gap-2 rounded-full border border-surface-200 bg-white/90 px-4 py-1.5 text-[13px] font-medium text-surface-600 shadow-xs transition hover:border-brand-200 hover:text-surface-900"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot" />
                <span className="font-semibold text-surface-900">Practice Books 19 → 12</span>
                <span className="text-surface-300">·</span>
                <span>100% free</span>
                <ChevronRight className="h-3.5 w-3.5 text-surface-400" />
              </Link>

              <h1 className="mt-7 font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-surface-900 sm:text-5xl lg:text-[3.4rem]">
                Practise for the real IELTS.
                <br />
                <span className="gradient-brand">Know your band.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-surface-600 sm:text-[17px] lg:mx-0">
                Full IELTS-style mock tests in a calm, computer-delivered test room. Dual-pane reading,
                synchronised audio, instant objective marking and AI examiner feedback for Writing and Speaking.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link href="/tests?type=ACADEMIC" className="btn-primary group px-5 py-3">
                  <Zap className="h-4.5 w-4.5" />
                  <span>Start free practice</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link href="/tests" className="btn-secondary px-5 py-3">
                  <BookOpen className="h-4.5 w-4.5 text-surface-500" />
                  <span>Browse all tests</span>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-surface-500 lg:justify-start">
                {["40 questions per paper", "3-colour highlighter", "No account to browse"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: "8", suffix: " books", label: "Practice books" },
                  { value: "32", suffix: "+", label: "Full mock tests" },
                  { value: "9.0", suffix: "", label: "Band scale" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-surface-200 bg-white/80 px-3 py-3.5 text-center shadow-xs backdrop-blur-sm">
                    <div className="font-display text-xl font-extrabold leading-none text-surface-900">
                      {stat.value}
                      <span className="text-sm font-semibold text-surface-400">{stat.suffix}</span>
                    </div>
                    <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-surface-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive exam preview */}
            <div className="lg:col-span-6">
              <div className="card overflow-hidden shadow-[0_24px_60px_-30px_rgba(22,34,59,0.4)]">
                <div className="flex items-center justify-between gap-3 border-b border-surface-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    </span>
                    <span className="ml-1 text-xs font-bold uppercase tracking-wide text-surface-500">
                      Book 19 · Academic Reading
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-100 px-2 py-1 font-mono text-[11px] font-bold text-surface-600">
                    <Clock className="h-3 w-3" /> 58:42
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-100 bg-surface-50/60 px-4 py-2.5 text-xs text-surface-500">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                      ID #91820
                    </span>
                    <span>Candidate: IELTS Aspirant</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Highlighter className="h-3.5 w-3.5 text-surface-400" />
                    {(["yellow", "green", "pink"] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setHighlightColor(color)}
                        aria-label={`${color} highlighter`}
                        className={`h-4 w-4 rounded-full transition ${
                          color === "yellow" ? "bg-amber-300" : color === "green" ? "bg-emerald-300" : "bg-pink-300"
                        } ${highlightColor === color ? "ring-2 ring-surface-900/20 ring-offset-1" : "opacity-50 hover:opacity-100"}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid divide-y divide-surface-100 md:grid-cols-2 md:divide-x md:divide-y-0">
                  {/* Passage */}
                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="flex items-center justify-between border-b border-surface-100 pb-2 text-[11px]">
                      <span className="font-bold uppercase tracking-wide text-brand-600">Passage 1 · Archaeology</span>
                      <span className="text-surface-400">Click to highlight</span>
                    </div>
                    <h3 className="font-display text-[15px] font-bold leading-snug text-surface-900">
                      The Hydraulic Architecture of Ancient Petra
                    </h3>
                    <p className="text-[13px] leading-relaxed text-surface-600">
                      Excavations at the Great Temple have revealed that Nabataean engineers constructed{" "}
                      <button
                        onClick={() => togglePhrase(1)}
                        className={`cursor-pointer rounded px-0.5 font-medium transition ${
                          highlighted[1] ? HIGHLIGHTS[highlighted[1]] : "underline decoration-dotted underline-offset-2 hover:bg-surface-100"
                        }`}
                      >
                        a sophisticated network of subterranean terracotta pipelines
                      </button>{" "}
                      designed to redirect flash floods. Analysis shows that this gravity-fed system{" "}
                      <button
                        onClick={() => togglePhrase(2)}
                        className={`cursor-pointer rounded px-0.5 font-medium transition ${
                          highlighted[2] ? HIGHLIGHTS[highlighted[2]] : "underline decoration-dotted underline-offset-2 hover:bg-surface-100"
                        }`}
                      >
                        prevented sandstone foundations from eroding for more than four centuries
                      </button>
                      .
                    </p>
                    <div className="flex items-center justify-between rounded-xl bg-surface-50 px-3 py-2 text-xs ring-1 ring-surface-200/70">
                      <span className="text-surface-500">Highlighted phrases</span>
                      <span className="font-mono font-bold text-brand-600">{Object.keys(highlighted).length}</span>
                    </div>
                  </div>

                  {/* Question */}
                  <div className="space-y-3 bg-surface-50/40 p-4 sm:p-5">
                    <div className="flex items-center justify-between border-b border-surface-100 pb-2 text-[11px]">
                      <span className="font-bold uppercase tracking-wide text-surface-600">Questions 1–6 · T / F / NG</span>
                      <button
                        onClick={() => setFlagged((f) => !f)}
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold transition ${
                          flagged ? "bg-rose-50 text-rose-600 ring-1 ring-rose-200" : "text-surface-400 hover:text-surface-700"
                        }`}
                      >
                        <Flag className="h-3 w-3" /> Flag
                      </button>
                    </div>
                    <p className="text-[13px] leading-relaxed text-surface-700">
                      <strong className="font-bold text-surface-900">Q1.</strong> The drainage network prevented Petra&apos;s
                      stone foundations from deteriorating for over 400 years.
                    </p>
                    <div className="space-y-1.5">
                      {(["TRUE", "FALSE", "NOT GIVEN"] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => setAnswer(option)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                            answer === option
                              ? "bg-brand-600 text-white shadow-sm"
                              : "border border-surface-200 bg-white text-surface-600 hover:border-surface-300 hover:text-surface-900"
                          }`}
                        >
                          <span className="font-mono">{option}</span>
                          <span className={`text-[10px] font-normal ${answer === option ? "text-white/80" : "text-surface-400"}`}>
                            {option === "TRUE" ? "Agrees with text" : option === "FALSE" ? "Contradicts text" : "Not stated"}
                          </span>
                        </button>
                      ))}
                    </div>
                    {answer === "TRUE" && (
                      <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] leading-relaxed text-emerald-800">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>
                          <strong>Correct.</strong> Matches &ldquo;prevented sandstone foundations from eroding for more
                          than four centuries&rdquo;.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-100 bg-white px-4 py-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                      <span
                        key={q}
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold ${
                          q === 1
                            ? "bg-brand-600 text-white"
                            : q === 5
                              ? "bg-amber-100 text-amber-700 ring-1 ring-amber-200"
                              : "bg-surface-100 text-surface-500"
                        }`}
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                  <Link href="/tests/c19-academic-1" className="btn-primary btn-sm">
                    <span>Open this test</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK FEATURES ───────────────────────────────────────────────── */}
      <section className="border-b border-surface-200 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 divide-y divide-surface-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {[
              { num: "Books 19 → 12", label: "Original IELTS-style papers", icon: BookOpen },
              { num: "40 questions", label: "Full-length mock exams", icon: FileText },
              { num: "Instant marking", label: "Reading & Listening bands", icon: Zap },
              { num: "AI examiner", label: "Writing & Speaking feedback", icon: Sparkles },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 px-2 py-6 sm:px-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-base font-bold text-surface-900">{item.num}</div>
                    <p className="text-[13px] text-surface-500">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOOKSHELF ────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-surface-200 bg-surface-50">
        <div className="page-container">
          <SectionHeading
            eyebrow={
              <>
                <BookOpen className="h-4 w-4" />
                IELTS practice library
              </>
            }
            title="Choose a paper and start today"
            description="Every volume includes four complete examination papers for Academic and General Training, with native audio players, reading highlighters and standard band score conversion."
            actions={
              <div className="inline-flex rounded-xl border border-surface-200 bg-white p-1">
                {[
                  { id: "all", label: "All books" },
                  { id: "latest", label: "Latest" },
                  { id: "classic", label: "Classic" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setBookFilter(filter.id as "all" | "latest" | "classic")}
                    className={`cursor-pointer rounded-lg px-3.5 py-2 text-[13px] font-semibold transition ${
                      bookFilter === filter.id ? "bg-brand-50 text-brand-700" : "text-surface-500 hover:text-surface-900"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            }
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <div key={book.volume} className="card-hover group flex flex-col overflow-hidden p-5">
                <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: book.coverAccent || "#5a74f7" }} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wide text-surface-700">Volume {book.volume}</span>
                  </div>
                  {book.volume >= 17 ? (
                    <span className="badge-brand">
                      <Sparkles className="h-3 w-3" /> Latest
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-surface-400">{book.year}</span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-surface-900 transition-colors group-hover:text-brand-700">
                  Practice Book {book.volume}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-surface-500">{book.description}</p>

                <div className="mt-4 space-y-1.5 rounded-xl bg-surface-50 p-3 text-xs ring-1 ring-surface-100">
                  <div className="flex justify-between gap-2">
                    <span className="text-surface-500">Track</span>
                    <span className="font-semibold text-surface-700">Academic &amp; General</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-surface-500">Papers</span>
                    <span className="font-semibold text-surface-700">4 full tests</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-surface-500">Target</span>
                    <span className="font-semibold text-brand-600">Band 7.0 → 9.0</span>
                  </div>
                </div>

                <div className="mt-5 flex-1" />
                <Link href={`/tests/c${book.volume}-academic-1`} className="btn-primary w-full py-2.5 text-[13px]">
                  <span>Start Test 1</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/tests?type=ACADEMIC"
                  className="mt-1 py-1 text-center text-xs font-semibold text-surface-500 transition hover:text-surface-900"
                >
                  All 4 tests in volume {book.volume}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO TOUR ──────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-surface-200 bg-white">
        <div className="page-container">
          <SectionHeading
            align="center"
            eyebrow={
              <>
                <Layers className="h-4 w-4" />
                One studio, four skills
              </>
            }
            title="Designed like the real test room"
            description="Every module has its own focused workspace — so you practise the exact skill the examiner measures."
          />

          <div className="mt-9 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-surface-200 bg-surface-50 p-1.5">
              {[
                { id: "reading", label: "Reading", icon: BookOpen },
                { id: "listening", label: "Listening", icon: Headphones },
                { id: "writing", label: "Writing", icon: PenTool },
                { id: "speaking", label: "Speaking", icon: Mic },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = studioTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setStudioTab(tab.id as typeof studioTab)}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      active ? "bg-white text-surface-900 shadow-xs ring-1 ring-surface-200" : "text-surface-500 hover:text-surface-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-brand-600" : "text-surface-400"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-surface-200 bg-surface-50/70 p-5 sm:p-8">
            {studioTab === "reading" && (
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <span className="badge-brand">
                    <Highlighter className="h-3.5 w-3.5" /> Dual-pane &amp; 3-colour highlighter
                  </span>
                  <h3 className="font-display text-2xl font-bold text-surface-900">Read and answer side by side</h3>
                  <p className="text-[15px] leading-relaxed text-surface-600">
                    No scrolling back and forth across 2,500 words. Keep the passage on the left and every question type
                    on the right — matching headings, multiple choice, sentence completion and True / False / Not Given.
                  </p>
                  <ul className="space-y-2.5 text-sm text-surface-600">
                    {["Three highlighter colours with one-click clearing", "Question palette with flagged review"].map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link href="/tests?type=ACADEMIC" className="btn-primary mt-2">
                    Practise reading <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="lg:col-span-7">
                  <div className="card space-y-4 p-5">
                    <div className="flex items-center justify-between border-b border-surface-100 pb-3 text-sm">
                      <span className="font-semibold text-surface-800">Passage 1 · 13 questions</span>
                      <span className="font-mono text-xs text-surface-400">20 min target</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-surface-50 p-4 ring-1 ring-surface-100">
                        <div className="text-sm font-bold text-surface-900">The Secret Life of Urban Foxes</div>
                        <p className="mt-1.5 text-xs leading-relaxed text-surface-500">
                          Recent telemetry studies indicate that urban red foxes have developed distinct behavioural
                          patterns…
                        </p>
                      </div>
                      <div className="rounded-xl bg-surface-50 p-4 ring-1 ring-surface-100">
                        <div className="text-sm font-bold text-surface-900">Q1 · Matching headings</div>
                        <div className="mt-2 space-y-1.5 text-xs">
                          <div className="rounded-lg border border-surface-200 bg-white px-2.5 py-1.5 text-surface-600">i. Population density shifts</div>
                          <div className="rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1.5 font-medium text-brand-700">ii. Nocturnal foraging</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {studioTab === "listening" && (
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <span className="badge-brand">
                    <Headphones className="h-3.5 w-3.5" /> Listening audio, built in
                  </span>
                  <h3 className="font-display text-2xl font-bold text-surface-900">Listen once, answer as you go</h3>
                  <p className="text-[15px] leading-relaxed text-surface-600">
                    All four sections with British, Australian and North American accents. Play, pause, scrub and set the
                    volume — exactly like the CD-IELTS player.
                  </p>
                  <Link href="/tests" className="btn-primary mt-2">
                    Practise listening <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="lg:col-span-7">
                  <div className="card space-y-5 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                          <Play className="h-5 w-5 fill-white" />
                        </span>
                        <div>
                          <div className="text-sm font-bold text-surface-900">Part 1 · Accommodation enquiry</div>
                          <div className="font-mono text-xs text-surface-400">03:42 / 07:15</div>
                        </div>
                      </div>
                      <Volume2 className="h-5 w-5 text-surface-400" />
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-100">
                      <div className="h-full w-1/2 rounded-full bg-brand-500" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {["Section 1", "Section 2", "Section 3"].map((section, index) => (
                        <div
                          key={section}
                          className={`rounded-lg px-2 py-2 font-semibold ${
                            index === 0 ? "bg-emerald-50 text-emerald-700" : "bg-surface-50 text-surface-400"
                          }`}
                        >
                          {section}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {studioTab === "writing" && (
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <span className="badge-brand">
                    <PenTool className="h-3.5 w-3.5" /> Official four criteria
                  </span>
                  <h3 className="font-display text-2xl font-bold text-surface-900">Feedback that reads like an examiner</h3>
                  <p className="text-[15px] leading-relaxed text-surface-600">
                    Connect your own AI key and receive a band for each criterion, corrected sentences and a clear list of
                    what to improve next.
                  </p>
                  <Link href="/model-answers" className="btn-primary mt-2">
                    Explore model answers <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="lg:col-span-7">
                  <div className="card space-y-4 p-5">
                    <div className="flex items-center justify-between border-b border-surface-100 pb-3">
                      <span className="text-sm font-bold text-surface-900">Task 2 · Rubric evaluation</span>
                      <span className="badge-success">Band 8.5</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        ["Task response", "9.0"],
                        ["Coherence & cohesion", "8.5"],
                        ["Lexical resource", "8.5"],
                        ["Grammar & accuracy", "8.0"],
                      ].map(([criterion, band]) => (
                        <div key={criterion} className="rounded-xl bg-surface-50 px-3 py-2.5 ring-1 ring-surface-100">
                          <div className="text-[11px] font-medium text-surface-500">{criterion}</div>
                          <div className="mt-0.5 font-display text-lg font-bold text-surface-900">{band}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {studioTab === "speaking" && (
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <span className="badge-brand">
                    <Mic className="h-3.5 w-3.5" /> Part 2 cue card simulator
                  </span>
                  <h3 className="font-display text-2xl font-bold text-surface-900">One minute to prepare. Then speak.</h3>
                  <p className="text-[15px] leading-relaxed text-surface-600">
                    Practise with the real cue-card flow: a timed preparation minute, a long turn and a follow-up
                    discussion — then get examiner feedback on your transcript.
                  </p>
                  <Link href="/speaking-practice" className="btn-primary mt-2">
                    Launch speaking studio <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="lg:col-span-7">
                  <div className="card space-y-4 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-surface-900">Part 2 · Cue card</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-sm font-bold ${cueTimer <= 10 ? "text-rose-600" : "text-brand-600"}`}>
                          {cueTimer}s
                        </span>
                        <button
                          onClick={() => {
                            if (cueTimer === 0) setCueTimer(60);
                            setCueRunning((running) => !running);
                          }}
                          className="btn-secondary btn-sm"
                        >
                          {cueRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                          {cueRunning ? "Pause" : "Start prep"}
                        </button>
                      </div>
                    </div>
                    <div className="rounded-xl bg-surface-50 p-4 ring-1 ring-surface-100">
                      <p className="text-sm font-semibold text-surface-800">Describe a memorable journey you took by public transport.</p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-surface-500">
                        <li>Where you went and what transport you used</li>
                        <li>Who you travelled with</li>
                        <li>What happened during the journey</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ───────────────────────────────────────────────────── */}
      <section id="calculator" className="section-pad border-b border-surface-200 bg-surface-50">
        <div className="page-container">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-5 lg:col-span-5">
              <span className="badge-brand">
                <Calculator className="h-3.5 w-3.5" /> Band score simulator
              </span>
              <h2 className="section-heading">See exactly how raw scores become a band</h2>
              <p className="text-[15px] leading-relaxed text-surface-600 sm:text-base">
                Move the sliders to explore the published IELTS raw-score conversion curves, including quarter-band
                rounding (.25 → .5, .75 → whole band) and CEFR levels.
              </p>
              <ul className="space-y-2.5 text-sm text-surface-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  Separate Academic and General Training reading thresholds
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  CEFR mapping from A2 to C2 mastery
                </li>
              </ul>
              <Link href="/calculator" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                Open the full calculator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="card space-y-5 p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Calculator className="h-4.5 w-4.5 text-surface-400" />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wide text-surface-400">Test track</div>
                      <div className="text-sm font-bold text-surface-900">{calcTrack === "ACADEMIC" ? "Academic" : "General Training"}</div>
                    </div>
                  </div>
                  <div className="inline-flex rounded-xl bg-surface-100 p-1">
                    {(["ACADEMIC", "GENERAL"] as const).map((track) => (
                      <button
                        key={track}
                        onClick={() => setCalcTrack(track)}
                        className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                          calcTrack === track ? "bg-white text-surface-900 shadow-xs" : "text-surface-500 hover:text-surface-900"
                        }`}
                      >
                        {track === "ACADEMIC" ? "Academic" : "General"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Listening", sub: "raw / 40", value: calcListening, band: listeningBand, min: 10, max: 40, step: 1, set: setCalcListening },
                    { label: "Reading", sub: "raw / 40", value: calcReading, band: readingBand, min: 10, max: 40, step: 1, set: setCalcReading },
                    { label: "Writing", sub: "band", value: calcWriting, band: calcWriting, min: 4, max: 9, step: 0.5, set: setCalcWriting },
                    { label: "Speaking", sub: "band", value: calcSpeaking, band: calcSpeaking, min: 4, max: 9, step: 0.5, set: setCalcSpeaking },
                  ].map((slider) => (
                    <div key={slider.label} className="space-y-2 rounded-xl bg-surface-50 p-3.5 ring-1 ring-surface-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-surface-600">
                          {slider.label} <span className="font-normal text-surface-400">({slider.sub})</span>
                        </span>
                        <span className="font-mono font-bold text-surface-900">
                          {slider.value} → {slider.band.toFixed(1)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={slider.value}
                        onChange={(event) => slider.set(Number(event.target.value))}
                        className="w-full cursor-pointer accent-brand-600"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-surface-100 pt-5">
                  <div className="flex items-center gap-4">
                    <BandRing band={overall} size={64} />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wide text-surface-400">Overall band</div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="font-display text-2xl font-extrabold text-surface-900">{overall ? overall.toFixed(1) : "—"}</span>
                        {cefr && <span className="badge-success">{cefr.level}</span>}
                      </div>
                    </div>
                  </div>
                  <Link href="/tests?type=ACADEMIC" className="btn-primary">
                    Test this band <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY SECTION ──────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-surface-200 bg-white">
        <div className="page-container">
          <SectionHeading
            align="center"
            eyebrow={
              <>
                <Sparkles className="h-4 w-4" />
                Built for serious candidates
              </>
            }
            title="Everything you need, nothing you don't"
            description="A calm, focused workspace that mirrors the computer-delivered exam — with the practice tools that actually move your score."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Real exam conditions",
                copy: "Timers, question palettes, flag-for-review and a distraction-free test room, exactly like test day.",
                tone: "bg-brand-50 text-brand-600",
              },
              {
                icon: Zap,
                title: "Instant objective marking",
                copy: "Your Reading and Listening band appears the moment you submit — no waiting, no guesswork.",
                tone: "bg-amber-50 text-amber-600",
              },
              {
                icon: PenTool,
                title: "AI examiner for Writing",
                copy: "Task-by-task bands against the four official criteria, with corrected sentences and next steps.",
                tone: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: Mic,
                title: "Speaking studio",
                copy: "Cue-card timers, recording and transcript-based feedback on fluency, lexis, grammar and pronunciation.",
                tone: "bg-sky-50 text-sky-600",
              },
              {
                icon: TrendingUp,
                title: "Progress you can see",
                copy: "Track every module over time, compare attempts and focus on the skills that need the most work.",
                tone: "bg-violet-50 text-violet-600",
              },
              {
                icon: Calendar,
                title: "A plan for exam day",
                copy: "A weekly roadmap from diagnostic test to exam week, so you always know what to practise next.",
                tone: "bg-rose-50 text-rose-500",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card-hover p-6">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-surface-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-surface-500">{feature.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section-pad border-b border-surface-200 bg-surface-50">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-white via-brand-50 to-white p-8 text-center shadow-[0_30px_70px_-45px_rgba(67,86,232,0.5)] sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-subtle-dots opacity-30" />
            <div className="relative">
              <span className="badge-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Start today · No paywall
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-surface-900 sm:text-4xl">
                Your next band starts with one honest mock test.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-surface-600 sm:text-base">
                Pick a practice paper, sit it under real conditions and find out exactly where you stand.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/tests?type=ACADEMIC" className="btn-primary btn-lg">
                  <Zap className="h-5 w-5" />
                  Start free practice
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/calculator" className="btn-secondary btn-lg">
                  <Calculator className="h-5 w-5 text-surface-400" />
                  Calculate my band
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-surface-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% free
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No account to browse
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-brand-500" /> Full-length mock tests
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faq" className="section-pad border-b border-surface-200 bg-white">
        <div className="page-container max-w-3xl">
          <SectionHeading
            align="center"
            eyebrow={
              <>
                <BookOpen className="h-4 w-4" />
                Answers before you start
              </>
            }
            title="Frequently asked questions"
            description="What Codestria IELTS is, what it costs, and how your band score is produced."
          />

          <div className="mt-10 space-y-3">
            {HOME_FAQ.map((item) => (
              <details
                key={item.question}
                className="card group p-5 transition hover:border-brand-200 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-bold text-surface-900 sm:text-base">
                  <span>{item.question}</span>
                  <ChevronDown className="h-4.5 w-4.5 shrink-0 text-surface-400 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-surface-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <FaqJsonLd faqs={HOME_FAQ} />
      </section>

      {/* ── CODESTRIA ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14">
        <div className="page-container">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-surface-200 bg-surface-50/60 p-6 sm:p-8 lg:flex-row lg:items-center">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <Image
                  src="/codestria-logo.png"
                  alt="Codestria — software and AI studio logo"
                  width={130}
                  height={38}
                  className="h-7 w-auto object-contain"
                />
                <span className="badge-neutral">
                  <Shield className="h-3 w-3" /> AI &amp; software studio
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-surface-900">Engineered and maintained by Codestria</h3>
              <p className="max-w-2xl text-sm leading-relaxed text-surface-500">
                Codestria builds modern web products, high-throughput cloud architecture and autonomous AI systems. This
                simulator exists to give every candidate a realistic, uncompromising and completely free practice room.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="https://codestria.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Visit studio <ExternalLink className="h-4 w-4" />
              </a>
              <Link href="/tests?type=ACADEMIC" className="btn-primary">
                Launch simulator <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
