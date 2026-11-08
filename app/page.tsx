"use client";

import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calculator,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Flag,
  GraduationCap,
  Headphones,
  Highlighter,
  Layers,
  Lightbulb,
  Lock,
  Mic,
  Minus,
  Pause,
  PenTool,
  Play,
  Plus,
  RotateCcw,
  Search,
  Shield,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BandRing } from "@/components/ui";
import {
  CAMBRIDGE_BOOKS,
  calculateIELTSBand,
  calculateOverallBand,
  getCEFRLevel,
} from "@/lib/cambridge-library";

export default function Home() {
  // ---------------------------------------------------------------------------
  // 1. Hero Live Interactive Simulator State
  // ---------------------------------------------------------------------------
  const [heroHighlightColor, setHeroHighlightColor] = useState<"yellow" | "green" | "pink">("yellow");
  const [heroHighlighted, setHeroHighlighted] = useState<Record<number, string>>({
    1: "yellow",
  });
  const [heroAnswer, setHeroAnswer] = useState<string | null>("TRUE");
  const [heroTimerHidden, setHeroTimerHidden] = useState(false);
  const [heroVolume, setHeroVolume] = useState(85);
  const [heroFlagged, setHeroFlagged] = useState(false);

  const togglePhraseHighlight = (id: number) => {
    setHeroHighlighted((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: heroHighlightColor };
    });
  };

  // ---------------------------------------------------------------------------
  // 2. Interactive On-Page Calculator State
  // ---------------------------------------------------------------------------
  const [calcTrack, setCalcTrack] = useState<"ACADEMIC" | "GENERAL">("ACADEMIC");
  const [calcListening, setCalcListening] = useState(34);
  const [calcReading, setCalcReading] = useState(35);
  const [calcWriting, setCalcWriting] = useState(7.5);
  const [calcSpeaking, setCalcSpeaking] = useState(8.0);

  const lBand = calculateIELTSBand(calcListening, "LISTENING", calcTrack);
  const rBand = calculateIELTSBand(calcReading, "READING", calcTrack);
  const overall = calculateOverallBand([lBand, rBand, calcWriting, calcSpeaking]);
  const cefr = overall ? getCEFRLevel(overall) : null;

  // ---------------------------------------------------------------------------
  // 3. Bookshelf Filter State
  // ---------------------------------------------------------------------------
  const [bookFilter, setBookFilter] = useState<"all" | "latest" | "classic">("all");
  const filteredBooks = CAMBRIDGE_BOOKS.filter((b) => {
    if (bookFilter === "latest") return b.volume >= 17;
    if (bookFilter === "classic") return b.volume <= 16;
    return true;
  });

  // ---------------------------------------------------------------------------
  // 4. Studio Tour Tabbed Showcase State
  // ---------------------------------------------------------------------------
  const [activeStudioTab, setActiveStudioTab] = useState<"reading" | "listening" | "writing" | "speaking">("reading");

  const [cueCardTimer, setCueCardTimer] = useState(60);
  const [cueCardRunning, setCueCardRunning] = useState(false);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cueCardRunning && cueCardTimer > 0) {
      interval = setInterval(() => setCueCardTimer((t) => t - 1), 1000);
    } else if (cueCardTimer === 0) {
      setCueCardRunning(false);
    }
    return () => clearInterval(interval);
  }, [cueCardRunning, cueCardTimer]);

  const [essayCompareMode, setEssayCompareMode] = useState<"band9" | "band6">("band9");

  return (
    <div className="relative overflow-hidden bg-[#fcfcfd] text-zinc-900 selection:bg-indigo-500/15 selection:text-indigo-700">

      {/* =======================================================================
          1. HERO SECTION — High-contrast, clean SaaS architecture with interactive chamber
      ======================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden border-b border-zinc-200/80">
        {/* Subtle background ambient mesh */}
        <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-60" />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-indigo-50/70 via-indigo-50/20 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Eyebrow badge */}
          <div className="flex justify-center md:justify-start animate-fade-in">
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1 text-xs font-medium text-zinc-700 shadow-2xs hover:border-zinc-300 transition-colors"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot" />
              <span className="font-semibold text-zinc-900">Codestria Engine</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">Cambridge Books 19 → 12 Live</span>
              <ChevronRight className="h-3 w-3 text-zinc-400" />
            </Link>
          </div>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
            {/* Left hero copy */}
            <div className="lg:col-span-6 text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl xl:text-6xl leading-[1.08]">
                The{" "}
                <span className="gradient-brand">
                  Computer-Delivered
                </span>
                <br />
                IELTS Simulation Engine.
              </h1>

              <p className="mt-5 text-base sm:text-lg leading-relaxed text-zinc-600 max-w-xl">
                Practice official Cambridge examination papers (Volumes 19 → 12) under authentic{" "}
                <strong className="text-zinc-900 font-semibold">British Council &amp; IDP test room conditions</strong>.
                Dual-pane reader, 3-color highlighters, synchronized audio, and instant Band&nbsp;9 scoring.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                <Link
                  href="/tests?type=ACADEMIC"
                  className="btn btn-primary px-5 py-2.5 text-xs font-semibold shadow-sm hover:shadow group"
                >
                  <Zap className="h-4 w-4" />
                  <span>Start Free Practice</span>
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/tests"
                  className="btn btn-secondary px-4 py-2.5 text-xs font-semibold"
                >
                  <BookOpen className="h-4 w-4 text-zinc-600" />
                  <span>Explore Books</span>
                </Link>
                <Link
                  href="/model-answers"
                  className="btn btn-ghost px-4 py-2.5 text-xs font-medium"
                >
                  <PenTool className="h-4 w-4 text-zinc-500" />
                  <span>Band 9 Essays</span>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>40 Questions / Paper</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Official Text Highlighter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Zero Sign-up Required</span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="mt-9 grid grid-cols-3 gap-3">
                {[
                  { value: "8", suffix: " Vols", label: "Official Books" },
                  { value: "32", suffix: "+", label: "Full Tests" },
                  { value: "100", suffix: "%", label: "Free Forever" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-zinc-200/80 bg-white p-3 text-center shadow-2xs">
                    <div className="text-xl font-bold font-mono text-zinc-900 leading-none">
                      {stat.value}
                      <span className="text-sm font-normal text-zinc-500">{stat.suffix}</span>
                    </div>
                    <div className="mt-1 text-[11px] font-medium text-zinc-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CD-IELTS Interactive Simulator Chamber */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl border border-zinc-800 bg-[#0e121b] text-zinc-100 shadow-xl overflow-hidden">
                {/* Window Titlebar */}
                <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/90 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/90 inline-block" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90 inline-block" />
                    <span className="ml-2 font-mono text-[11px] font-semibold text-zinc-300 tracking-wide">
                      CAMBRIDGE 19 · ACADEMIC READING TEST 1
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5 rounded-md bg-zinc-950 px-2 py-0.5 font-mono text-xs font-semibold text-amber-400 border border-amber-500/20">
                      <Clock className="h-3 w-3 text-amber-400" />
                      <span>{heroTimerHidden ? "TIMER HIDDEN" : "58:42 REMAINING"}</span>
                    </div>
                    <button
                      onClick={() => setHeroTimerHidden(!heroTimerHidden)}
                      className="rounded p-1 text-zinc-400 hover:text-zinc-200 transition"
                      title={heroTimerHidden ? "Show timer" : "Hide timer"}
                    >
                      {heroTimerHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </button>
                  </div>
                </div>

                {/* Sub-header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/60 bg-zinc-900/40 px-4 py-2 text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.5 rounded">
                      ID #91820
                    </span>
                    <span className="text-zinc-300">Candidate: IELTS Aspirant</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-md">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 flex items-center gap-1">
                      <Highlighter className="h-3 w-3 text-zinc-400" /> Pen:
                    </span>
                    {(["yellow", "green", "pink"] as const).map((col) => (
                      <button
                        key={col}
                        onClick={() => setHeroHighlightColor(col)}
                        className={`h-3.5 w-3.5 rounded-full transition ${
                          col === "yellow" ? "bg-yellow-300" : col === "green" ? "bg-emerald-400" : "bg-pink-400"
                        } ${heroHighlightColor === col ? "ring-2 ring-white scale-110" : "opacity-40"}`}
                        title={`${col} highlighter`}
                      />
                    ))}
                  </div>
                </div>

                {/* Split body */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800/70 text-xs">
                  {/* Passage */}
                  <div className="p-4 space-y-3 bg-[#0d1017]">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-1 border-b border-zinc-800/60">
                      <span className="font-semibold text-indigo-400">PASSAGE 1: ARCHAEOLOGY</span>
                      <span className="text-[10px] text-zinc-500">Click text to highlight</span>
                    </div>
                    <h4 className="font-semibold text-zinc-100 text-sm">The Hydraulic Architecture of Ancient Petra</h4>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      &ldquo;Excavations at the Great Temple have revealed that Nabataean engineers constructed{" "}
                      <span
                        onClick={() => togglePhraseHighlight(1)}
                        className={`cursor-pointer transition px-1 py-0.5 rounded font-medium ${
                          heroHighlighted[1] === "yellow"
                            ? "bg-yellow-400 text-zinc-950 font-semibold"
                            : heroHighlighted[1] === "green"
                              ? "bg-emerald-400 text-zinc-950 font-semibold"
                              : heroHighlighted[1] === "pink"
                                ? "bg-pink-400 text-zinc-950 font-semibold"
                                : "hover:bg-zinc-800 text-zinc-200 underline decoration-dotted"
                        }`}
                        title="Click to toggle highlight"
                      >
                        a sophisticated network of subterranean terracotta pipelines
                      </span>{" "}
                      designed to redirect flash floods from the gorge. Analysis demonstrates that this gravity-fed system{" "}
                      <span
                        onClick={() => togglePhraseHighlight(2)}
                        className={`cursor-pointer transition px-1 py-0.5 rounded font-medium ${
                          heroHighlighted[2] === "yellow"
                            ? "bg-yellow-400 text-zinc-950 font-semibold"
                            : heroHighlighted[2] === "green"
                              ? "bg-emerald-400 text-zinc-950 font-semibold"
                              : heroHighlighted[2] === "pink"
                                ? "bg-pink-400 text-zinc-950 font-semibold"
                                : "hover:bg-zinc-800 text-zinc-200 underline decoration-dotted"
                        }`}
                        title="Click to toggle highlight"
                      >
                        prevented sandstone foundations from eroding for more than four centuries
                      </span>
                      ...&rdquo;
                    </p>
                    <div className="rounded-md bg-zinc-900/60 p-2 border border-zinc-800 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-400">Highlighted:</span>
                      <span className="text-amber-400 font-mono font-bold">
                        {Object.keys(heroHighlighted).length} Phrase(s)
                      </span>
                    </div>
                  </div>

                  {/* Question Column */}
                  <div className="p-4 space-y-3 bg-[#0a0d14]">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-1 border-b border-zinc-800/60">
                      <span className="font-semibold text-zinc-300">QUESTIONS 1–6: TRUE / FALSE / NOT GIVEN</span>
                      <button
                        onClick={() => setHeroFlagged(!heroFlagged)}
                        className={`flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition ${
                          heroFlagged ? "bg-rose-950 text-rose-300 border border-rose-800" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <Flag className="h-3 w-3" />
                        <span>Flag</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-[11.5px]">
                      <p className="font-medium text-zinc-200">
                        <strong className="text-zinc-100">Q1.</strong> The drainage pipeline network prevented Petra&apos;s stone foundations from deteriorating for over 400 years.
                      </p>

                      <div className="space-y-1.5 pt-1">
                        {(["TRUE", "FALSE", "NOT GIVEN"] as const).map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setHeroAnswer(opt)}
                            className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-xs font-semibold transition cursor-pointer ${
                              heroAnswer === opt
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-zinc-900/80 text-zinc-300 border border-zinc-800 hover:bg-zinc-800/80 hover:text-white"
                            }`}
                          >
                            <span>{opt}</span>
                            <span className="text-[10px] font-sans font-normal opacity-70">
                              {opt === "TRUE" ? "Agrees with text" : opt === "FALSE" ? "Contradicts text" : "No info"}
                            </span>
                          </button>
                        ))}
                      </div>

                      {heroAnswer === "TRUE" && (
                        <div className="mt-2 rounded-md border border-emerald-800/50 bg-emerald-950/40 p-2 text-[11px] text-emerald-300 flex items-start gap-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Correct!</strong> Matches &ldquo;prevented sandstone foundations from eroding for more than four centuries&rdquo;.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Question palette footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800 bg-zinc-950 px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin">
                    <span className="font-mono text-[10px] uppercase text-zinc-500 mr-1">Palette:</span>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((q) => (
                      <span
                        key={q}
                        className={`flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-bold ${
                          q === 1
                            ? "bg-indigo-600 text-white"
                            : q === 5
                            ? "bg-amber-400 text-zinc-950"
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                        }`}
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/tests/c19-academic-1"
                    className="btn btn-primary px-3 py-1 text-xs font-semibold"
                  >
                    <span>Launch Cambridge 19</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          2. STATS STRIP — Clean, tactile proof row
      ======================================================================= */}
      <section className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200/80">
            {[
              { num: "Books 19 → 12", label: "Official Cambridge Papers", icon: BookOpen },
              { num: "40 Qs / Test", label: "Full-Length Authentic Exams", icon: FileText },
              { num: "100% Free", label: "Open Access · No Paywall", icon: Sparkles },
              { num: "Instant AI", label: "Band 9 Rubric Scoring", icon: Zap },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3.5 px-6 py-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200/80">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-base font-bold tracking-tight text-zinc-900 font-sans">
                      {stat.num}
                    </div>
                    <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =======================================================================
          3. CAMBRIDGE BOOKSHELF — Light-mode architectural library
      ======================================================================= */}
      <section className="py-20 bg-zinc-50/70 border-b border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-zinc-200/80">
            <div>
              <div className="eyebrow flex items-center gap-1.5 text-indigo-600">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Cambridge University Press &amp; Assessment Papers</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                Authentic Cambridge Examination Shelf
              </h2>
              <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-zinc-600">
                Every volume contains 4 full examination papers for both Academic and General Training tracks.
                Equipped with native audio players, reading highlighters, and official scoring conversions.
              </p>
            </div>

            {/* Filter pills */}
            <div className="inline-flex rounded-lg bg-zinc-200/70 p-1 border border-zinc-200/80 self-start md:self-end">
              {[
                { id: "all", label: "All (19–12)" },
                { id: "latest", label: "Latest (19–17)" },
                { id: "classic", label: "Classic (16–12)" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setBookFilter(f.id as "all" | "latest" | "classic")}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                    bookFilter === f.id
                      ? "bg-white text-zinc-900 shadow-2xs"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Book cards grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredBooks.map((book) => (
              <div
                key={book.volume}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all duration-150"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-zinc-100 border border-zinc-200/70 px-2.5 py-0.5 text-[11px] font-bold text-zinc-800">
                      Volume {book.volume}
                    </span>
                    {book.volume >= 17 ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                        <Sparkles className="h-2.5 w-2.5" />
                        Latest
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-zinc-500">
                        {book.year} Ed.
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">
                    Cambridge IELTS {book.volume}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>

                  {/* Spec box */}
                  <div className="mt-4 rounded-lg bg-zinc-50 border border-zinc-200/60 p-2.5 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Track:</span>
                      <span className="font-semibold text-zinc-800">Academic &amp; General</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Full Tests:</span>
                      <span className="font-semibold text-zinc-800">4 Official Papers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Target:</span>
                      <span className="font-semibold text-indigo-600">Band 7.0 → 9.0</span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <Link
                    href={`/tests/c${book.volume}-academic-1`}
                    className="font-semibold text-indigo-600 hover:text-indigo-700 transition inline-flex items-center gap-1"
                  >
                    <span>Launch Test 1</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link
                    href="/tests?type=ACADEMIC"
                    className="font-medium text-zinc-500 hover:text-zinc-800 transition"
                  >
                    All 4 Tests →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================================
          4. 4-TAB STUDIO TOUR — Tabbed experience with clean modern surfaces
      ======================================================================= */}
      <section className="py-20 bg-white border-b border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow flex items-center justify-center gap-1.5 text-indigo-600">
              <Layers className="h-3.5 w-3.5" />
              <span>Complete Exam Ecosystem</span>
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Every Module Re-engineered for Band 8+ Mastery
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Explore four specialized practice studios designed to target distinct exam skills.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-xl bg-zinc-100 p-1 border border-zinc-200/80 gap-1">
              {[
                { id: "reading", label: "Reading", icon: BookOpen },
                { id: "listening", label: "Listening", icon: Headphones },
                { id: "writing", label: "Writing", icon: PenTool },
                { id: "speaking", label: "Speaking", icon: Mic },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeStudioTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveStudioTab(tab.id as "reading" | "listening" | "writing" | "speaking")}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                      isActive
                        ? "bg-white text-zinc-900 shadow-2xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 shadow-2xs">
            {/* Reading Tab */}
            {activeStudioTab === "reading" && (
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    <Highlighter className="h-3.5 w-3.5" /> 3-Color Highlighters &amp; Dual-Pane
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Dual-Pane Passage &amp; Question Architecture
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                    No scrolling back and forth across 2,500 words. Read the passage on the left while answering
                    matching headings, multiple choice, sentence completion, and True/False/Not Given questions on the right.
                  </p>
                  <ul className="space-y-2 text-xs text-zinc-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>3 highlighter colors with 1-click note-taking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Synchronized question-palette navigation</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link href="/tests?type=ACADEMIC" className="btn btn-primary text-xs px-4 py-2">
                      <span>Practice Reading Papers</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-100 pb-2 text-xs">
                      <span className="font-semibold text-zinc-800">Passage 1 · 13 Questions</span>
                      <span className="font-mono text-zinc-500">20 min target</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/60 space-y-2">
                        <div className="font-semibold text-zinc-900">The Secret Life of Urban Foxes</div>
                        <p className="text-zinc-500 text-[11px] leading-relaxed">
                          Recent telemetry studies indicate that urban red foxes have developed distinct behavioral patterns...
                        </p>
                      </div>
                      <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/60 space-y-2">
                        <div className="font-semibold text-zinc-900">Q1. Matching Headings</div>
                        <div className="space-y-1 text-[11px]">
                          <div className="p-1.5 rounded bg-white border border-zinc-200 text-zinc-700">i. Population density shifts</div>
                          <div className="p-1.5 rounded bg-white border border-zinc-200 text-zinc-700">ii. Nocturnal foraging adaptations</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listening Tab */}
            {activeStudioTab === "listening" && (
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    <Headphones className="h-3.5 w-3.5" /> High-Fidelity Cambridge Audio
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Synchronized Audio &amp; Real-Time Form Filling
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                    Experience all 4 sections with native British, Australian, and North American accents.
                    Includes play/pause toggle, scrub bar, volume control, and auto-marking.
                  </p>
                  <div className="pt-2">
                    <Link href="/tests" className="btn btn-primary text-xs px-4 py-2">
                      <span>Practice Listening Audio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                          <Play className="h-4 w-4 fill-white" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-zinc-900">Part 1: Accommodation Enquiry</div>
                          <div className="text-[11px] text-zinc-500 font-mono">03:42 / 07:15</div>
                        </div>
                      </div>
                      <Volume2 className="h-4 w-4 text-zinc-500" />
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-600 h-1.5 rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Writing Tab */}
            {activeStudioTab === "writing" && (
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    <PenTool className="h-3.5 w-3.5" /> Task 1 &amp; Task 2 AI Evaluator
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Official 4-Criteria AI Band Scoring
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                    Get scored on Task Achievement, Coherence &amp; Cohesion, Lexical Resource, and Grammatical Range &amp; Accuracy.
                  </p>
                  <div className="pt-2">
                    <Link href="/model-answers" className="btn btn-primary text-xs px-4 py-2">
                      <span>Explore Band 9 Models</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-900 border-b border-zinc-100 pb-2">
                      <span>Task 2 Rubric Evaluation</span>
                      <span className="text-indigo-600 font-bold">Band 8.5 Estimated</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-zinc-50 border border-zinc-200/60">
                        <div className="text-zinc-500 text-[10px]">Task Response</div>
                        <div className="font-bold text-zinc-800">Band 9.0</div>
                      </div>
                      <div className="p-2 rounded bg-zinc-50 border border-zinc-200/60">
                        <div className="text-zinc-500 text-[10px]">Coherence &amp; Cohesion</div>
                        <div className="font-bold text-zinc-800">Band 8.5</div>
                      </div>
                      <div className="p-2 rounded bg-zinc-50 border border-zinc-200/60">
                        <div className="text-zinc-500 text-[10px]">Lexical Resource</div>
                        <div className="font-bold text-zinc-800">Band 8.5</div>
                      </div>
                      <div className="p-2 rounded bg-zinc-50 border border-zinc-200/60">
                        <div className="text-zinc-500 text-[10px]">Grammar &amp; Accuracy</div>
                        <div className="font-bold text-zinc-800">Band 8.0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Speaking Tab */}
            {activeStudioTab === "speaking" && (
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                    <Mic className="h-3.5 w-3.5" /> Part 2 Cue Card Simulator
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">
                    Timed 1-Minute Prep &amp; Voice Recording
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                    Simulate real examiner conditions with an authentic 60-second cue card preparation timer followed by audio recording.
                  </p>
                  <div className="pt-2">
                    <Link href="/speaking-practice" className="btn btn-primary text-xs px-4 py-2">
                      <span>Launch Speaking Studio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-900">Part 2 Cue Card</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600">{cueCardTimer}s prep</span>
                        <button
                          onClick={() => {
                            if (cueCardTimer === 0) setCueCardTimer(60);
                            setCueCardRunning(!cueCardRunning);
                          }}
                          className="btn btn-secondary px-2.5 py-1 text-xs"
                        >
                          {cueCardRunning ? "Pause" : "Start 60s Prep"}
                        </button>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200/60 text-xs text-zinc-700">
                      <strong>Describe a memorable journey you took by public transport.</strong>
                      <ul className="mt-1.5 list-disc list-inside text-zinc-500 space-y-0.5 text-[11px]">
                        <li>Where you went and what form of transport you used</li>
                        <li>Who you traveled with</li>
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

      {/* =======================================================================
          5. BAND SCORE CALCULATOR — Clean Light Hardware Console
      ======================================================================= */}
      <section id="calculator" className="py-20 bg-zinc-50/70 border-b border-zinc-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Context */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                <Calculator className="h-3.5 w-3.5" /> Official IELTS Band Simulator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                Real-Time Band Score &amp; CEFR Console
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-600">
                Experiment with raw scores to see how official Cambridge and IDP band curves translate into your overall
                rounded score. Incorporates official quarter-band rounding rules (.25 → .5, .75 → whole band).
              </p>
              <div className="space-y-2 text-xs text-zinc-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Differentiates Academic vs General Training Reading thresholds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Calculates CEFR levels: C2 Mastery, C1 Proficiency, B2 Vantage</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/calculator"
                  className="font-semibold text-xs text-indigo-600 hover:text-indigo-700 transition inline-flex items-center gap-1"
                >
                  <span>Open Full Calculator Suite</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Right Interactive Console */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-5">
                {/* Track switcher */}
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Sliders className="h-4 w-4 text-zinc-500" />
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Target Track</div>
                      <div className="text-xs font-bold text-zinc-900">{calcTrack === "ACADEMIC" ? "Academic" : "General Training"}</div>
                    </div>
                  </div>
                  <div className="inline-flex rounded-lg bg-zinc-100 p-0.5 border border-zinc-200 gap-1">
                    {(["ACADEMIC", "GENERAL"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setCalcTrack(t)}
                        className={`rounded-md px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                          calcTrack === t ? "bg-white text-zinc-900 shadow-2xs" : "text-zinc-600 hover:text-zinc-900"
                        }`}
                      >
                        {t === "ACADEMIC" ? "Academic" : "General"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4 Sliders */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: "Listening Raw",
                      sub: "out of 40",
                      value: calcListening,
                      band: lBand,
                      min: 10, max: 40, step: 1,
                      onChange: setCalcListening,
                    },
                    {
                      label: "Reading Raw",
                      sub: "out of 40",
                      value: calcReading,
                      band: rBand,
                      min: 10, max: 40, step: 1,
                      onChange: setCalcReading,
                    },
                    {
                      label: "Writing Score",
                      sub: "band",
                      value: calcWriting,
                      band: calcWriting,
                      min: 4, max: 9, step: 0.5,
                      onChange: setCalcWriting,
                    },
                    {
                      label: "Speaking Score",
                      sub: "band",
                      value: calcSpeaking,
                      band: calcSpeaking,
                      min: 4, max: 9, step: 0.5,
                      onChange: setCalcSpeaking,
                    },
                  ].map((s) => (
                    <div key={s.label} className="space-y-1.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200/60">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-zinc-700">{s.label} <span className="text-zinc-500 font-normal">({s.sub})</span></span>
                        <span className="font-mono font-bold text-zinc-900">
                          {s.value} → Band {s.band.toFixed(1)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={s.value}
                        onChange={(e) => s.onChange(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                {/* Calculation Output Bar */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Overall Calculated Score</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-2xl font-black font-mono text-zinc-900">
                        {overall ? overall.toFixed(1) : "—"}
                      </span>
                      {cefr && (
                        <span className="rounded-md bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-xs font-bold text-emerald-700">
                          {cefr.level} Level
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href="/tests?type=ACADEMIC"
                    className="btn btn-primary px-4 py-2 text-xs font-semibold"
                  >
                    <span>Test This Band</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          6. FINAL CALL TO ACTION BANNER — High-end graphite card
      ======================================================================= */}
      <section className="py-20 bg-white border-b border-zinc-200/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-800 bg-[#12141a] p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/80 px-3.5 py-1 text-xs font-medium text-zinc-300 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              Start Your IELTS Preparation Today
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Your Band 8+ is Within Reach.
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Practice with the official Cambridge books used in real IELTS test centres worldwide.
              Zero paywall, zero sign-up friction — authentic exam simulation from day one.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/tests?type=ACADEMIC"
                className="btn btn-primary px-5 py-2.5 text-xs font-semibold bg-white text-zinc-900 hover:bg-zinc-100 shadow-sm"
              >
                <Zap className="h-4 w-4" />
                <span>Start Free Practice Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/calculator"
                className="btn btn-secondary px-4 py-2.5 text-xs font-semibold bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800"
              >
                <Calculator className="h-4 w-4 text-zinc-400" />
                <span>Calculate My Band</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> 100% Free Forever</span>
              <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-emerald-400" /> No Account Required</span>
              <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-emerald-400" /> Official Cambridge Papers</span>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          7. CODESTRIA STUDIO FOOTER BANNER
      ======================================================================= */}
      <section className="bg-zinc-50/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-2xs">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Image
                    src="/codestria-logo-black.png"
                    alt="Codestria Logo"
                    width={140}
                    height={40}
                    className="h-6 w-auto"
                  />
                  <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 border border-zinc-200/80 px-2 py-0.5 text-[11px] font-semibold text-zinc-700">
                    <Shield className="h-3 w-3" /> AI &amp; Software Engineering Studio
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                  Engineered &amp; Maintained by Codestria
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed max-w-2xl">
                  Codestria builds modern web products, high-throughput cloud architectures, and autonomous AI systems.
                  We created this platform to offer every candidate an uncompromising, realistic, and completely free computer-delivered IELTS simulator.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-wrap gap-2.5 justify-start lg:justify-end">
                <a
                  href="https://codestria.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Visit Codestria Studio</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <Link
                  href="/tests?type=ACADEMIC"
                  className="btn btn-primary px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <span>Launch Simulator</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
