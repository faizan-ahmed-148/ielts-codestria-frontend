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
    <div className="relative overflow-hidden selection:bg-[#5B4BFF]/20 selection:text-[#5B4BFF]">

      {/* =======================================================================
          1. HERO SECTION — Full-viewport immersive dark starfield
      ======================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-center bg-navy overflow-hidden">
        {/* Dotted starfield background */}
        <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-60" />

        {/* Large ambient glow blobs */}
        <div
          className="pointer-events-none absolute -top-40 left-1/3 h-[700px] w-[700px] rounded-full blur-[140px] animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(91,75,255,0.22) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full blur-[120px] animate-float"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)" }}
        />

        {/* Morphing orb — top right decorative */}
        <div
          className="pointer-events-none absolute top-24 right-16 h-28 w-28 blur-2xl opacity-60 animate-morph"
          style={{ background: "linear-gradient(135deg,#5b4bff,#8b5cf6)" }}
        />
        <div
          className="pointer-events-none absolute bottom-32 left-24 h-20 w-20 blur-xl opacity-40 animate-morph"
          style={{ background: "linear-gradient(135deg,#3b82f6,#5b4bff)", animationDelay: "2s" }}
        />

        {/* Spinning ring decoration */}
        <div
          className="pointer-events-none absolute top-1/4 right-1/4 h-64 w-64 rounded-full border border-brand-500/10 animate-spin-slow"
          style={{ animationDuration: "20s" }}
        />
        <div
          className="pointer-events-none absolute top-1/4 right-1/4 h-48 w-48 m-8 rounded-full border border-brand-500/10 animate-spin-slow"
          style={{ animationDuration: "14s", animationDirection: "reverse" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          {/* Eyebrow badge */}
          <div className="flex justify-center md:justify-start animate-fade-in">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-300 uppercase backdrop-blur-sm">
              <span className="pulse-dot flex h-2 w-2 rounded-full bg-emerald-400 inline-block" />
              Codestria Engine
              <span className="text-brand-500/60">·</span>
              <span className="text-slate-400 font-medium normal-case tracking-normal">Cambridge Books 19 → 12 Live</span>
              <ChevronRight className="h-3.5 w-3.5 text-brand-400" />
            </div>
          </div>

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-12">
            {/* Left hero content */}
            <div className="lg:col-span-6 text-center md:text-left stagger">
              <h1 className="animate-fade-up text-5xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl leading-[1.08] font-sans">
                The{" "}
                <span className="gradient-text text-glow">
                  Computer-Delivered
                </span>
                <br />
                IELTS Simulation{" "}
                <span className="gradient-text text-glow">Engine.</span>
              </h1>

              <p className="animate-fade-up-slow mt-6 text-base sm:text-lg leading-relaxed text-slate-400 max-w-xl">
                Practice official Cambridge examination papers (Volumes 19 → 12) under identical{" "}
                <strong className="text-slate-200 font-semibold">British Council &amp; IDP test room conditions</strong>.
                Dual-pane reader, multi-color highlighters, synchronized audio, instant Band&nbsp;9 scoring.
              </p>

              {/* CTA Buttons */}
              <div className="animate-fade-up mt-8 flex flex-wrap justify-center md:justify-start gap-4">
                <Link
                  href="/tests?type=ACADEMIC"
                  className="btn-primary btn-lg glow-brand-sm group"
                >
                  <Zap className="h-5 w-5" />
                  <span>Start Free Practice</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/tests"
                  className="btn-secondary btn-lg border-brand-500/30 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-brand-400"
                >
                  <BookOpen className="h-4 w-4 text-brand-400" />
                  <span>Explore Books</span>
                </Link>
                <Link
                  href="/model-answers"
                  className="btn-ghost btn-lg text-slate-400 hover:text-white hover:bg-white/5"
                >
                  <PenTool className="h-4 w-4" />
                  <span>Band 9 Essays</span>
                </Link>
              </div>

              {/* Trust row */}
              <div className="animate-fade-up mt-8 flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-slate-400">40 Questions / Paper</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-slate-400">Official Text Highlighter</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-slate-400">Zero Sign-up Required</span>
                </div>
              </div>

              {/* Animated stats row */}
              <div className="animate-fade-up mt-10 grid grid-cols-3 gap-4">
                {[
                  { value: "8", suffix: " Vols", label: "Official Books", accent: "#5b4bff" },
                  { value: "32", suffix: "+", label: "Full-Length Tests", accent: "#8b5cf6" },
                  { value: "100", suffix: "%", label: "Free Forever", accent: "#3b82f6" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 p-4 backdrop-blur-sm text-center hover-lift">
                    <div
                      className="text-2xl font-black font-mono leading-none"
                      style={{ color: stat.accent }}
                    >
                      {stat.value}
                      <span className="text-lg">{stat.suffix}</span>
                    </div>
                    <div className="mt-1 text-[10px] font-bold tracking-wider uppercase text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CD-IELTS Interactive Test Chamber */}
            <div className="lg:col-span-6 relative animate-scale-in">
              {/* Glow behind the card */}
              <div
                className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-50"
                style={{ background: "radial-gradient(ellipse at center, rgba(91,75,255,0.35) 0%, transparent 70%)" }}
              />

              <div className="border-gradient card-glass glow-brand rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] border border-brand-500/25 backdrop-blur-2xl"
                style={{ background: "rgba(10,16,32,0.85)" }}>
                {/* Window Titlebar */}
                <div className="flex items-center justify-between border-b border-brand-500/15 bg-black/40 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono text-[11px] font-bold text-slate-300 tracking-wider">
                      CAMBRIDGE 19 · ACADEMIC READING TEST 1
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 font-mono text-xs font-bold text-amber-300 border border-amber-500/20">
                      <Clock className="h-3.5 w-3.5 text-amber-400" />
                      <span>{heroTimerHidden ? "TIMER HIDDEN" : "58:42 REMAINING"}</span>
                    </div>
                    <button
                      onClick={() => setHeroTimerHidden(!heroTimerHidden)}
                      className="rounded p-1 text-slate-400 hover:text-white transition"
                      title={heroTimerHidden ? "Show timer" : "Hide timer"}
                    >
                      {heroTimerHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Sub-header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 bg-black/20 px-4 py-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                      ID #91820
                    </span>
                    <span className="font-medium text-slate-300">Candidate: IELTS Aspirant</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/40 border border-brand-500/15 px-2 py-1 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                      <Highlighter className="h-3 w-3" /> Pen:
                    </span>
                    {(["yellow", "green", "pink"] as const).map((col) => (
                      <button
                        key={col}
                        onClick={() => setHeroHighlightColor(col)}
                        className={`h-4 w-4 rounded-full transition ${
                          col === "yellow" ? "bg-yellow-300" : col === "green" ? "bg-emerald-400" : "bg-pink-400"
                        } ${heroHighlightColor === col ? "ring-2 ring-white scale-110" : "opacity-50"}`}
                        title={`${col} highlighter`}
                      />
                    ))}
                  </div>
                </div>

                {/* Split body */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 text-xs">
                  {/* Passage */}
                  <div className="p-4 space-y-3" style={{ background: "rgba(12,18,30,0.9)" }}>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/5">
                      <span className="font-bold text-brand-300">PASSAGE 1: ARCHAEOLOGY</span>
                      <span className="text-[10px] text-slate-500">Click text to highlight</span>
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm">The Hydraulic Architecture of Ancient Petra</h4>
                    <p className="text-slate-300 leading-relaxed text-[11.5px]">
                      &ldquo;Excavations at the Great Temple have revealed that Nabataean engineers constructed{" "}
                      <span
                        onClick={() => togglePhraseHighlight(1)}
                        className={`cursor-pointer transition px-1 py-0.5 rounded font-medium ${
                          heroHighlighted[1] === "yellow"
                            ? "bg-yellow-400 text-slate-950 font-semibold"
                            : heroHighlighted[1] === "green"
                              ? "bg-emerald-400 text-slate-950 font-semibold"
                              : heroHighlighted[1] === "pink"
                                ? "bg-pink-400 text-slate-950 font-semibold"
                                : "hover:bg-white/5 text-slate-200 underline decoration-dotted"
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
                            ? "bg-yellow-400 text-slate-950 font-semibold"
                            : heroHighlighted[2] === "green"
                              ? "bg-emerald-400 text-slate-950 font-semibold"
                              : heroHighlighted[2] === "pink"
                                ? "bg-pink-400 text-slate-950 font-semibold"
                                : "hover:bg-white/5 text-slate-200 underline decoration-dotted"
                        }`}
                        title="Click to toggle highlight"
                      >
                        prevented sandstone foundations from eroding for more than four centuries
                      </span>
                      ...&rdquo;
                    </p>
                    <div className="rounded-lg bg-white/5 p-2 border border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Highlighted:</span>
                      <span className="text-amber-300 font-mono font-bold">
                        {Object.keys(heroHighlighted).length} Phrase(s)
                      </span>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="p-4 space-y-3" style={{ background: "rgba(10,15,25,0.95)" }}>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-white/5">
                      <span className="font-bold text-slate-200">QUESTIONS 1–6: TRUE / FALSE / NOT GIVEN</span>
                      <button
                        onClick={() => setHeroFlagged(!heroFlagged)}
                        className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded transition ${
                          heroFlagged ? "bg-amber-400 text-black" : "text-slate-400 hover:text-amber-300"
                        }`}
                      >
                        <Flag className="h-3 w-3" />
                        <span>{heroFlagged ? "Flagged" : "Flag ⚑"}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="font-semibold text-slate-200 text-xs">
                        <span className="text-brand-400 font-mono font-bold">Q1. </span>
                        The drainage pipeline network prevented Petra&apos;s stone foundations from deteriorating for over 400 years.
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {[
                          { val: "TRUE", label: "TRUE", sub: "Statement agrees with the text" },
                          { val: "FALSE", label: "FALSE", sub: "Statement contradicts the text" },
                          { val: "NOT GIVEN", label: "NOT GIVEN", sub: "No information on this" },
                        ].map((opt) => (
                          <label
                            key={opt.val}
                            onClick={() => setHeroAnswer(opt.val)}
                            className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition ${
                              heroAnswer === opt.val
                                ? "border-brand-500 bg-brand-500/20 text-white"
                                : "border-white/8 bg-white/3 text-slate-300 hover:bg-white/8"
                            }`}
                          >
                            <span className="font-bold text-[11px]">{opt.label}</span>
                            <span className="text-[10px] text-slate-400">{opt.sub}</span>
                          </label>
                        ))}
                      </div>

                      {heroAnswer === "TRUE" ? (
                        <div className="rounded-lg bg-emerald-950/70 border border-emerald-800/80 p-2 text-[11px] text-emerald-300 flex items-start gap-1.5 animate-fade-up">
                          <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-400" />
                          <span>
                            <strong>Correct!</strong> Matches Paragraph C (&ldquo;prevented sandstone foundations from eroding for more than four centuries&rdquo;).
                          </span>
                        </div>
                      ) : (
                        <div className="rounded-lg bg-white/5 border border-white/5 p-2 text-[11px] text-slate-300 flex items-start gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0 text-amber-400" />
                          <span>Select TRUE to verify the official examiner rationale.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Question palette ribbon */}
                <div className="flex items-center justify-between border-t border-white/5 bg-black/50 px-4 py-2.5">
                  <div className="flex items-center gap-1.5 overflow-x-auto scroll-thin">
                    <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Palette:</span>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((num) => {
                      const isCurrent = num === 1;
                      const isAnswered = num === 1 && heroAnswer !== null;
                      const isFlaggedQ = num === 5 || (num === 1 && heroFlagged);
                      return (
                        <span
                          key={num}
                          className={`flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold font-mono transition ${
                            isCurrent
                              ? "bg-brand-500 text-white ring-2 ring-brand-400/40 shadow-[0_0_8px_rgba(91,75,255,0.6)]"
                              : isAnswered
                                ? "bg-slate-700 text-slate-200"
                                : isFlaggedQ
                                  ? "bg-amber-400 text-black font-extrabold"
                                  : "bg-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          {num}
                        </span>
                      );
                    })}
                  </div>
                  <Link
                    href="/tests/c19-academic-1"
                    className="shrink-0 ml-3 inline-flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-brand-400 transition glow-brand-sm"
                  >
                    <span>Launch Cambridge 19</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade to next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #f9fafc)" }} />
      </section>

      {/* =======================================================================
          2. ANIMATED STATS STRIP — Dark ticker with proof of quality
      ======================================================================= */}
      <section className="relative border-y border-slate-200/80 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {[
              { num: "Books 19→12", label: "Official Cambridge Papers", icon: BookOpen, color: "#5b4bff" },
              { num: "40 Qs/Test", label: "Full-Length Authentic Exams", icon: FileText, color: "#5b4bff" },
              { num: "100% Free", label: "Open Access · No Paywall", icon: Sparkles, color: "#5b4bff" },
              { num: "Instant AI", label: "Band 9 Rubric Rationales", icon: Zap, color: "#5b4bff" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="group flex items-center gap-4 px-6 py-7 hover:bg-brand-50/50 transition">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${stat.color}22, ${stat.color}11)`, border: `1px solid ${stat.color}30` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold tracking-tight text-slate-950 font-sans group-hover:text-brand-600 transition">
                      {stat.num}
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =======================================================================
          3. CAMBRIDGE BOOKSHELF — Premium dark-gradient library aesthetic
      ======================================================================= */}
      <section className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #f9fafc 0%, #0a1020 15%, #0a1020 85%, #f9fafc 100%)" }}>
        {/* Background dot texture */}
        <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40" />
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(91,75,255,0.4) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <div className="eyebrow flex items-center gap-2 text-brand-400">
                <BookOpen className="h-4 w-4" />
                <span>Cambridge University Press &amp; Assessment Papers</span>
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl font-sans">
                Authentic{" "}
                <span className="gradient-text">Cambridge</span>{" "}
                Bookshelf
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                Every volume contains 4 full examination papers for both Academic and General Training tracks.
                Equipped with native audio players, reading highlighters, and official scoring conversions.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-white/10 self-start md:self-end"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
              {[
                { id: "all", label: "All (19–12)" },
                { id: "latest", label: "Latest (19–17)" },
                { id: "classic", label: "Classic (16–12)" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setBookFilter(f.id as "all" | "latest" | "classic")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    bookFilter === f.id
                      ? "text-white shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                  style={bookFilter === f.id ? { background: "linear-gradient(135deg, #5b4bff, #4a3ae0)" } : {}}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Book cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger">
            {filteredBooks.map((book) => (
              <div
                key={book.volume}
                className="group hover-lift flex flex-col justify-between overflow-hidden rounded-2xl border border-white/8 cursor-pointer"
                style={{ background: "linear-gradient(145deg, rgba(15,23,42,0.97) 0%, rgba(8,12,24,0.99) 100%)" }}
              >
                {/* Spine accent strip */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${book.coverAccent}, transparent)` }} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Top badges */}
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase text-white shadow-xs"
                      style={{ backgroundColor: book.coverAccent, boxShadow: `0 0 12px ${book.coverAccent}60` }}
                    >
                      Volume {book.volume}
                    </span>
                    {book.volume >= 17 ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/40 bg-brand-500/15 px-2 py-0.5 text-[9px] font-black uppercase text-brand-300 animate-fade-in">
                        <Sparkles className="h-2.5 w-2.5" />
                        Latest
                      </span>
                    ) : (
                      <span className="rounded-md bg-white/8 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                        {book.year} Ed.
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-slate-100 group-hover:text-brand-300 transition-colors">
                    Cambridge IELTS {book.volume}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] text-slate-500 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>

                  {/* Spec grid */}
                  <div className="mt-4 rounded-xl bg-white/5 p-3 space-y-1.5 text-[11px] border border-white/6 flex-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Track:</span>
                      <span className="font-bold text-slate-300">Academic &amp; General</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Full Tests:</span>
                      <span className="font-bold text-slate-300">4 Official Papers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target:</span>
                      <span className="font-bold text-brand-400">Band 7.0 → 9.0</span>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
                    <Link
                      href={`/tests/c${book.volume}-academic-1`}
                      className="text-xs font-bold text-brand-400 group-hover:text-brand-300 transition inline-flex items-center gap-1"
                    >
                      <span>Launch Test 1</span>
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </Link>
                    <Link
                      href="/tests?type=ACADEMIC"
                      className="text-xs font-medium text-slate-500 hover:text-slate-300 transition"
                    >
                      All 4 Tests →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================================
          4. SOCIAL PROOF STRIP — Testimonials + logos ticker
      ======================================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/80 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="eyebrow flex items-center justify-center gap-2 text-brand-600">
              <Trophy className="h-4 w-4" />
              <span>Trusted by IELTS Aspirants Worldwide</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Real scores from{" "}
              <span className="gradient-text">real students</span>
            </h2>
          </div>

          {/* Stats ticker */}
          <div className="mb-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "Band 8.5", label: "Average achieved by consistent users", icon: "🎯" },
              { value: "32 Tests", label: "Full exams available right now", icon: "📚" },
              { value: "Zero ₹", label: "No subscription, no paywall ever", icon: "🔓" },
              { value: "4 Skills", label: "Reading, Listening, Writing, Speaking", icon: "⚡" },
            ].map((s) => (
              <div
                key={s.label}
                className="card card-hover p-5 text-center"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xl font-extrabold text-slate-950">{s.value}</div>
                <p className="mt-1 text-[11px] text-slate-500 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="grid gap-5 md:grid-cols-3 stagger">
            {[
              {
                quote: "The dual-pane reader is identical to the actual British Council test interface. I felt completely prepared on exam day.",
                name: "Priya Sharma",
                band: "Band 8.0",
                track: "Academic",
                stars: 5,
              },
              {
                quote: "I went from 6.5 to 7.5 in Reading after two weeks of practice. The Cambridge books here are the real deal.",
                name: "Hamza Al-Rashid",
                band: "Band 7.5",
                track: "Academic",
                stars: 5,
              },
              {
                quote: "Band 9 model essays helped me understand exactly what examiners want. My Writing went up a full band.",
                name: "Chen Li",
                band: "Band 7.5 → 8.5",
                track: "Academic",
                stars: 5,
              },
            ].map((t) => (
              <div key={t.name} className="card card-hover p-6 space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.track}</div>
                  </div>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-black text-white"
                    style={{ background: "linear-gradient(135deg, #5b4bff, #4a3ae0)" }}
                  >
                    {t.band}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =======================================================================
          5. 4-TAB STUDIO TOUR — Tabbed experience with gradient active state
      ======================================================================= */}
      <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f9fafc 0%, #ffffff 100%)" }}>
        <div
          className="pointer-events-none absolute top-0 right-0 h-96 w-96 blur-3xl opacity-20"
          style={{ background: "radial-gradient(circle, rgba(91,75,255,0.5) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow flex items-center justify-center gap-2 text-brand-600">
              <Layers className="h-4 w-4" />
              <span>Complete Exam Ecosystem</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl font-sans">
              Every Module Re-engineered for{" "}
              <span className="gradient-text">Band 8+ Mastery</span>
            </h2>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Explore our four specialized practice studios designed to target distinct exam skills.
            </p>
          </div>

          {/* Tab switcher — pill with gradient active */}
          <div className="mt-14 flex justify-center">
            <div className="inline-flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200/80 shadow-sm gap-1">
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
                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                      isActive ? "text-white shadow-lg" : "text-slate-500 hover:text-slate-800"
                    }`}
                    style={isActive ? { background: "linear-gradient(135deg, #5b4bff 0%, #4a3ae0 100%)", boxShadow: "0 4px 16px rgba(91,75,255,0.35)" } : {}}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab content — dual column */}
          <div className="mt-10 card p-6 sm:p-10 shadow-xl border-slate-200/60"
            style={{ background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)" }}>

            {/* Reading Tab */}
            {activeStudioTab === "reading" && (
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center animate-fade-up">
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-1 text-xs font-bold text-brand-700">
                    <Highlighter className="h-3.5 w-3.5" /> 3-Color Highlighters &amp; Dual-Pane
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Dual-Pane Passage &amp; Question Architecture
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    No scrolling back and forth across 2,500 words. Read the passage on the left while answering
                    matching headings, multiple choice, sentence completion, and True/False/Not Given questions on the right.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {[
                      "Yellow, Green, and Pink text highlighting with right-click note pinning",
                      "Resizable split-divider (Passage Focus vs Questions Focus)",
                      "IDP & British Council Yellow-on-Black accessibility theme",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/tests?type=ACADEMIC" className="btn-primary text-sm inline-flex">
                    Practice Academic Reading <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                    <span className="font-bold text-slate-900">Split View Demo</span>
                    <span className="font-mono text-emerald-600 font-bold">Passage 1 of 3</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                      <span className="font-bold text-slate-800 block mb-1">Passage Column</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        &ldquo;...cohesive sediment cores confirmed that{" "}
                        <mark className="bg-yellow-200 px-1 rounded font-medium">
                          ancient riverbeds supported agricultural terracing
                        </mark>{" "}
                        over 3,000 years prior to urban industrialization...&rdquo;
                      </p>
                    </div>
                    <div className="rounded-xl bg-brand-50/50 p-3 border border-brand-100">
                      <span className="font-bold text-brand-700 block mb-1">Question Column</span>
                      <p className="text-slate-700 text-[11px] font-semibold mb-2">
                        Q1: Did agriculture precede urban settlements?
                      </p>
                      <div className="p-1.5 rounded bg-white border border-brand-200 text-[10px] font-bold text-brand-900">
                        ✓ TRUE (Supported by sediment core dates)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Listening Tab */}
            {activeStudioTab === "listening" && (
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center animate-fade-up">
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-700">
                    <Headphones className="h-3.5 w-3.5" /> Synchronized Multi-Accent Audio
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Sections 1 → 4 with British, Aussie &amp; American Accents
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    IELTS Listening includes diverse international accents. Our audio engine reproduces authentic
                    monologues and dialogues with synchronized transcripts and pause controls.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {[
                      "Authentic 30-minute exam audio tracks with 10-minute answer transfer time",
                      "Speed training: 0.9x for diagnostics, 1.25x for challenge drills",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/tests?type=ACADEMIC" className="btn-primary text-sm inline-flex">
                    Start Listening Test <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                    <span className="font-bold text-slate-900">Listening Player Simulation</span>
                    <span className="font-mono text-brand-600 font-bold">Section 2 · Campus Tour</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-sm">
                        <Play className="h-4 w-4 ml-0.5" />
                      </button>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-slate-600">
                          <span>04:12</span>
                          <span>14:30</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div className="h-full w-[28%]" style={{ background: "linear-gradient(90deg, #5b4bff, #8b5cf6)" }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Volume2 className="h-3.5 w-3.5" />
                        <span className="font-mono">{heroVolume}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic">
                      &ldquo;You will hear a guide introducing new international students to the university library facilities...&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Writing Tab */}
            {activeStudioTab === "writing" && (
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center animate-fade-up">
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 border border-purple-200 px-3 py-1 text-xs font-bold text-purple-700">
                    <PenTool className="h-3.5 w-3.5" /> Task 1 &amp; Task 2 Examiner Matrix
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Real-time Word Counters &amp; Band 9 Model Answers
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Master the four official IELTS writing criteria: Task Achievement, Coherence &amp; Cohesion,
                    Lexical Resource, and Grammatical Range &amp; Accuracy.
                  </p>
                  <Link href="/model-answers" className="btn-primary text-sm inline-flex">
                    Explore Band 9 Essays <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
                    <span className="font-bold text-slate-900">Task 2 Essay Inspector</span>
                    <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => setEssayCompareMode("band9")}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          essayCompareMode === "band9" ? "bg-purple-600 text-white" : "text-slate-600"
                        }`}
                      >
                        Band 9 Model
                      </button>
                      <button
                        onClick={() => setEssayCompareMode("band6")}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          essayCompareMode === "band6" ? "bg-amber-600 text-white" : "text-slate-600"
                        }`}
                      >
                        Band 6 Pitfalls
                      </button>
                    </div>
                  </div>
                  {essayCompareMode === "band9" ? (
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-purple-950 leading-relaxed text-[11.5px]">
                        &ldquo;<span className="font-bold underline decoration-purple-400">Notwithstanding the undeniable economic advantages</span>{" "}
                        of unchecked tourism, environmental degradation poses an existential dilemma...&rdquo;
                      </div>
                      <div className="text-[11px] text-purple-700 font-semibold">
                        &bull; Advanced concession clause + topic-specific lexis (&apos;existential dilemma&apos;)
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-amber-950 leading-relaxed text-[11.5px]">
                        &ldquo;Tourism has many good things for money, but nature is getting destroyed very badly and people should stop it...&rdquo;
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold">
                        &bull; Repetitive phrasing, basic syntax, and informal modal usage (&apos;very badly&apos;).
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Speaking Tab */}
            {activeStudioTab === "speaking" && (
              <div className="grid gap-10 lg:grid-cols-12 lg:items-center animate-fade-up">
                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-700">
                    <Mic className="h-3.5 w-3.5" /> Part 2 Cue Card &amp; Timer Lab
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    1-Min Preparation &amp; 2-Min Response Simulator
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    Overcome the anxiety of the 2-minute long turn. Practice with authentic Part 2 topic cards,
                    timed prep countdowns, and browser audio speech recording.
                  </p>
                  <Link href="/speaking-practice" className="btn-primary text-sm inline-flex">
                    Open Speaking Studio <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                    <span className="font-bold text-slate-900">Part 2 Cue Card Interactive Demo</span>
                    <span className="font-mono text-amber-600 font-bold">
                      {Math.floor(cueCardTimer / 60)}:{(cueCardTimer % 60).toString().padStart(2, "0")} Prep Timer
                    </span>
                  </div>

                  <div className="rounded-xl bg-amber-50/70 p-4 border border-amber-200 text-xs space-y-2">
                    <h5 className="font-bold text-slate-900">
                      Describe an ambitious environmental project you learned about.
                    </h5>
                    <ul className="list-disc list-inside text-slate-700 space-y-1 text-[11px]">
                      <li>Where this initiative took place</li>
                      <li>What technologies or methods were utilized</li>
                      <li>Why you found this project particularly compelling</li>
                    </ul>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setCueCardRunning(!cueCardRunning);
                        if (cueCardTimer === 0) setCueCardTimer(60);
                      }}
                      className="btn-primary text-xs px-4 py-2"
                    >
                      {cueCardRunning ? (
                        <><Pause className="h-3.5 w-3.5" /> Pause Timer</>
                      ) : (
                        <><Play className="h-3.5 w-3.5" /> Start 1-Min Prep</>
                      )}
                    </button>
                    <button
                      onClick={() => { setCueCardRunning(false); setCueCardTimer(60); }}
                      className="btn-secondary text-xs px-3 py-2"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =======================================================================
          6. BAND SCORE CALCULATOR — Hardware/console aesthetic
      ======================================================================= */}
      <section id="calculator" className="relative py-28 overflow-hidden bg-navy">
        <div className="pointer-events-none absolute inset-0 bg-dots-dark opacity-50" />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(91,75,255,0.25) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Context */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-300">
                <Calculator className="h-3.5 w-3.5" /> Official IELTS Band Simulator
              </span>
              <h2 className="text-3xl font-extrabold sm:text-5xl text-white font-sans leading-tight">
                Real-Time Band Score{" "}
                <span className="gradient-text">&amp; CEFR Console</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-400">
                Experiment with raw scores to see how official Cambridge and IDP band curves translate into your overall
                rounded score. Incorporates official quarter-band rounding rules (.25 → .5, .75 → whole band).
              </p>
              <div className="space-y-2.5 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Differentiates Academic vs General Training Reading thresholds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Calculates CEFR levels: C2 Mastery, C1 Proficiency, B2 Vantage</span>
                </div>
              </div>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-400 hover:text-white transition"
              >
                <span>Open Advanced Band Calculator</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: Interactive console */}
            <div className="lg:col-span-7">
              <div className="card-dark rounded-3xl border border-brand-500/15 p-6 sm:p-8 glow-brand">
                {/* Gradient header bar */}
                <div
                  className="rounded-2xl p-4 mb-6 flex items-center justify-between"
                  style={{ background: "linear-gradient(135deg, rgba(91,75,255,0.2) 0%, rgba(59,130,246,0.1) 100%)", border: "1px solid rgba(91,75,255,0.2)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: "linear-gradient(135deg, #5b4bff, #4a3ae0)" }}
                    >
                      <Sliders className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Track</div>
                      <div className="text-sm font-bold text-white">{calcTrack === "ACADEMIC" ? "Academic" : "General Training"}</div>
                    </div>
                  </div>
                  <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/8 gap-1">
                    {(["ACADEMIC", "GENERAL"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setCalcTrack(t)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                          calcTrack === t ? "text-white shadow-sm" : "text-slate-400 hover:text-white"
                        }`}
                        style={calcTrack === t ? { background: "linear-gradient(135deg, #5b4bff, #4a3ae0)" } : {}}
                      >
                        {t === "ACADEMIC" ? "Academic" : "General"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {[
                    {
                      label: "Listening Raw",
                      sub: "out of 40",
                      value: calcListening,
                      band: lBand,
                      min: 10, max: 40, step: 1,
                      onChange: setCalcListening,
                      color: "#5b4bff",
                      bandColor: "text-brand-300",
                    },
                    {
                      label: "Reading Raw",
                      sub: "out of 40",
                      value: calcReading,
                      band: rBand,
                      min: 10, max: 40, step: 1,
                      onChange: setCalcReading,
                      color: "#5b4bff",
                      bandColor: "text-brand-300",
                    },
                    {
                      label: "Writing Score",
                      sub: "band",
                      value: calcWriting,
                      band: calcWriting,
                      min: 4, max: 9, step: 0.5,
                      onChange: setCalcWriting,
                      color: "#8b5cf6",
                      bandColor: "text-purple-300",
                    },
                    {
                      label: "Speaking Score",
                      sub: "band",
                      value: calcSpeaking,
                      band: calcSpeaking,
                      min: 4, max: 9, step: 0.5,
                      onChange: setCalcSpeaking,
                      color: "#f59e0b",
                      bandColor: "text-amber-300",
                    },
                  ].map((s) => (
                    <div key={s.label} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">{s.label} <span className="text-slate-500 font-normal">({s.sub})</span></span>
                        <span className={`font-mono font-bold ${s.bandColor}`}>
                          {s.value} → Band {s.band.toFixed(1)}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min={s.min}
                          max={s.max}
                          step={s.step}
                          value={s.value}
                          onChange={(e) => s.onChange(Number(e.target.value))}
                          className="w-full h-2 rounded-lg cursor-pointer appearance-none bg-white/10"
                          style={{ accentColor: s.color }}
                        />
                        <div
                          className="pointer-events-none absolute top-1/2 left-0 h-2 rounded-l-lg -translate-y-1/2"
                          style={{
                            width: `${((s.value - s.min) / (s.max - s.min)) * 100}%`,
                            background: `linear-gradient(90deg, ${s.color}, ${s.color}aa)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall band result */}
                <div
                  className="mt-8 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
                  style={{ background: "linear-gradient(135deg, rgba(91,75,255,0.15) 0%, rgba(59,130,246,0.08) 100%)", border: "1px solid rgba(91,75,255,0.25)" }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-black text-white shadow-xl font-mono glow-brand-sm"
                      style={{ background: "linear-gradient(135deg, #5b4bff, #4a3ae0)" }}
                    >
                      {overall?.toFixed(1) ?? "–"}
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Overall IELTS Band</div>
                      <div className="text-base font-bold text-white mt-0.5">
                        {overall && overall >= 8.0
                          ? "Very Good / Expert User"
                          : overall && overall >= 7.0
                            ? "Good / Competent User"
                            : "Moderate User"}
                      </div>
                    </div>
                  </div>

                  {cefr && (
                    <div
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 border glow-brand-sm"
                      style={{ background: "rgba(0,0,0,0.4)", borderColor: "rgba(91,75,255,0.3)" }}
                    >
                      <div>
                        <div className="font-mono text-lg font-black text-brand-300">{cefr.level}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{cefr.description}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =======================================================================
          7. FULL-WIDTH CTA BANNER — Gradient mesh with animated glow
      ======================================================================= */}
      <section className="relative overflow-hidden py-28">
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0a1020 0%, #1a0a3e 30%, #0a1020 60%, #0d1a35 100%)",
          }}
        />
        <div className="absolute inset-0 bg-dots-dark opacity-50" />

        {/* Animated glow orbs */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full blur-3xl animate-morph"
          style={{ background: "radial-gradient(ellipse, rgba(91,75,255,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full blur-2xl animate-float"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-2xl animate-float-slow"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)" }}
        />

        {/* Spinning ring decorations */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-brand-500/8 animate-spin-slow" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-brand-500/5 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "18s" }} />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-brand-300 uppercase backdrop-blur-sm mb-8">
            <span className="pulse-dot flex h-2 w-2 rounded-full bg-emerald-400 inline-block" />
            Start Your Journey Today
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Your <span className="gradient-text text-glow">Band 8+</span>
            <br />
            is Within Reach.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Practice with the same Cambridge books used in real IELTS test centres.
            Zero cost, zero sign-up, zero compromise — just authentic exam preparation.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/tests?type=ACADEMIC"
              className="btn-primary btn-lg glow-brand group"
            >
              <Zap className="h-5 w-5" />
              <span>Start Free Practice Now</span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/calculator"
              className="btn-secondary btn-lg border-brand-500/30 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-brand-400"
            >
              <Calculator className="h-4 w-4 text-brand-400" />
              <span>Calculate My Band</span>
            </Link>
          </div>

          {/* Mini trust row */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> 100% Free Forever</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-emerald-500" /> No Account Required</span>
            <span className="flex items-center gap-1.5"><Award className="h-4 w-4 text-emerald-500" /> Official Cambridge Papers</span>
          </div>
        </div>
      </section>

      {/* =======================================================================
          8. CODESTRIA STUDIO FOOTER BANNER
      ======================================================================= */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl border border-slate-800 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
            style={{ background: "linear-gradient(145deg, #0c1220 0%, #0a0f1d 50%, #111929 100%)" }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute -right-16 -bottom-16 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(91,75,255,0.25) 0%, transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }}
            />

            <div className="grid gap-8 lg:grid-cols-12 lg:items-center relative">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Image
                    src="/codestria-logo-white.png"
                    alt="Codestria Logo"
                    width={180}
                    height={55}
                    className="h-8 w-auto"
                  />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-300">
                    <Shield className="h-3.5 w-3.5" /> AI &amp; Software Engineering Studio
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Engineered &amp; Maintained by{" "}
                  <span className="gradient-text">Codestria</span>
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                  Codestria is a modern software engineering and AI studio creating high-performance web applications,
                  autonomous AI workflows, and cloud infrastructure. We built this platform to provide test-takers
                  with an uncompromising, realistic, and completely free computer-delivered IELTS simulation.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <a
                  href="https://codestria.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-3 px-5 inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Visit Codestria Studio</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href="/tests?type=ACADEMIC"
                  className="btn-secondary text-sm py-3 px-5 text-slate-900 bg-white inline-flex items-center justify-center gap-2 hover:bg-slate-100"
                >
                  <span>Launch IELTS Simulator</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
