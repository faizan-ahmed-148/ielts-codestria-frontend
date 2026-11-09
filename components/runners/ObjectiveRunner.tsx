"use client";

import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Flag,
  Headphones,
  Highlighter,
  Maximize2,
  Minimize2,
  Minus,
  FileText,
  Palette,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sliders,
  Type,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { countQuestions, QuestionGroups } from "@/components/Questions";
import type { ListeningContent, ListeningPart, ReadingContent } from "@/lib/content.types";
import { speakLines, ttsSupported } from "@/lib/speech";

type Answers = Record<string, string>;

interface HighlightRange {
  id: string;
  color: "yellow" | "green" | "pink";
  text: string;
}

export function ObjectiveRunner({
  content,
  answers,
  setAnswer,
}: {
  content: ReadingContent | ListeningContent;
  answers: Answers;
  setAnswer: (id: string, value: string) => void;
}) {
  const isReading = "passages" in content;
  const sections = isReading ? content.passages : content.parts;
  const [active, setActive] = useState(0);
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal");
  const [splitRatio, setSplitRatio] = useState<"equal" | "passage-focus" | "questions-focus">("equal");
  const [contrastTheme, setContrastTheme] = useState<"standard" | "yellow-black" | "dark" | "cream">("standard");
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Floating highlight toolbar
  const [selectionBox, setSelectionBox] = useState<{ x: number; y: number; text: string } | null>(null);
  const [highlights, setHighlights] = useState<HighlightRange[]>([]);
  const [passageNotes, setPassageNotes] = useState<string>("");
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);

  const starts = sections.reduce<number[]>(
    (acc, s, i) => [...acc, i === 0 ? 1 : acc[i - 1] + countQuestions(sections[i - 1].groups)],
    [],
  );
  const section = sections[active];
  const all = sections.flatMap((s, si) => s.groups.flatMap((g) => g.questions.map((q) => ({ id: q.id, si }))));
  const answered = all.filter((q) => answers[q.id]?.trim()).length;
  const flaggedCount = Object.values(flags).filter(Boolean).length;
  const questionPane = useRef<HTMLDivElement>(null);
  const passagePane = useRef<HTMLDivElement>(null);

  const toggleFlag = (id: string) => {
    setFlags((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const go = (si: number) => {
    setActive(si);
    questionPane.current?.scrollTo({ top: 0, behavior: "smooth" });
    passagePane.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0 });
    setSelectionBox(null);
  };

  const jump = (si: number, id: string) => {
    setActive(si);
    setTimeout(() => {
      document.getElementById(`q-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  };

  const label = isReading ? "Passage" : "Part";

  // Handle text selection for official text highlighter
  const handlePassageMouseUp = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) {
      setSelectionBox(null);
      return;
    }
    const text = sel.toString().trim();
    if (text.length < 2) {
      setSelectionBox(null);
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionBox({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      text,
    });
  };

  const applyHighlight = (color: "yellow" | "green" | "pink") => {
    if (!selectionBox) return;
    setHighlights((prev) => [...prev, { id: `hl-${Date.now()}`, color, text: selectionBox.text }]);
    setSelectionBox(null);
    window.getSelection()?.removeAllRanges();
  };

  const fontClass =
    fontSize === "xlarge"
      ? "text-xl leading-9"
      : fontSize === "large"
        ? "text-[18px] leading-8"
        : "text-[16px] leading-7";

  const themeClasses = {
    standard: "bg-surface-50 text-surface-900",
    "yellow-black": "bg-[#0c0c0c] text-[#ffe600]",
    dark: "bg-[#18181b] text-surface-100",
    cream: "bg-[#fcfaf2] text-[#2c3e50]",
  }[contrastTheme];

  const cardThemeClasses = {
    standard: "bg-white border-surface-200 text-surface-800",
    "yellow-black": "bg-[#161616] border-[#ffe600]/40 text-[#ffe600]",
    dark: "bg-[#27272a] border-zinc-700 text-zinc-100",
    cream: "bg-[#fffdf7] border-[#e8dfc8] text-[#2c3e50]",
  }[contrastTheme];

  return (
    <div className={`flex min-h-0 flex-1 flex-col ${themeClasses} transition-colors duration-200`}>
      {/* CD-IELTS Official Accessibility & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-surface-200 bg-white/90 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center gap-1 overflow-x-auto scroll-thin">
          {sections.map((s, i) => {
            const qs = s.groups.flatMap((g) => g.questions);
            const done = qs.filter((q) => answers[q.id]?.trim()).length;
            const hasFlag = qs.some((q) => flags[q.id]);
            return (
              <button
                key={i}
                onClick={() => go(i)}
                className={`flex items-center gap-2 border-b-2 px-3.5 py-2 text-sm font-bold whitespace-nowrap transition ${
                  i === active
                    ? "border-brand-600 text-brand-700"
                    : "border-transparent text-surface-500 hover:text-surface-800"
                }`}
              >
                {label} {i + 1}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                    done === qs.length ? "bg-emerald-100 text-emerald-800" : "bg-surface-100 text-surface-600"
                  }`}
                >
                  {done}/{qs.length}
                </span>
                {hasFlag && <span className="h-2 w-2 rounded-full bg-amber-500" title="Contains flagged questions" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* Layout Split Presets for Reading */}
          {isReading && (
            <div className="hidden items-center rounded-lg border border-surface-200 bg-surface-50 p-0.5 md:flex">
              <button
                onClick={() => setSplitRatio("passage-focus")}
                title="Passage Focus (65% Passage / 35% Questions)"
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  splitRatio === "passage-focus" ? "bg-white text-surface-900 shadow-xs" : "text-surface-500"
                }`}
              >
                65:35
              </button>
              <button
                onClick={() => setSplitRatio("equal")}
                title="Equal Split (50% / 50%)"
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  splitRatio === "equal" ? "bg-white text-surface-900 shadow-xs" : "text-surface-500"
                }`}
              >
                50:50
              </button>
              <button
                onClick={() => setSplitRatio("questions-focus")}
                title="Questions Focus (35% Passage / 65% Questions)"
                className={`rounded px-2 py-1 text-xs font-semibold ${
                  splitRatio === "questions-focus" ? "bg-white text-surface-900 shadow-xs" : "text-surface-500"
                }`}
              >
                35:65
              </button>
            </div>
          )}

          {/* Font Resizing */}
          <div className="flex items-center rounded-lg border border-surface-200 bg-surface-50 p-0.5">
            <button
              onClick={() => setFontSize("normal")}
              title="Standard Font Size"
              className={`rounded px-2 py-1 text-xs font-bold ${
                fontSize === "normal" ? "bg-white text-brand-700 shadow-xs" : "text-surface-500"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("large")}
              title="Large Font Size"
              className={`rounded px-2 py-1 text-sm font-bold ${
                fontSize === "large" ? "bg-white text-brand-700 shadow-xs" : "text-surface-500"
              }`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize("xlarge")}
              title="Extra Large Font Size"
              className={`rounded px-2 py-1 text-base font-bold ${
                fontSize === "xlarge" ? "bg-white text-brand-700 shadow-xs" : "text-surface-500"
              }`}
            >
              A++
            </button>
          </div>

          {/* Contrast Mode Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu((s) => !s)}
              title="Change Display Contrast / Color Scheme"
              className="flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-surface-700 shadow-xs hover:bg-surface-50"
            >
              <Palette className="h-3.5 w-3.5 text-brand-600" />
              <span className="hidden sm:inline">Theme</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 z-50 mt-1.5 w-44 rounded-xl border border-surface-200 bg-white p-1.5 shadow-xl">
                <button
                  onClick={() => {
                    setContrastTheme("standard");
                    setShowThemeMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-surface-700 hover:bg-surface-100"
                >
                  <span className="h-3 w-3 rounded-full border border-surface-300 bg-white" />
                  <span>Standard White</span>
                </button>
                <button
                  onClick={() => {
                    setContrastTheme("yellow-black");
                    setShowThemeMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-surface-700 hover:bg-surface-100"
                >
                  <span className="h-3 w-3 rounded-full bg-black text-[#ffe600]" />
                  <span>Yellow on Black (IDP)</span>
                </button>
                <button
                  onClick={() => {
                    setContrastTheme("dark");
                    setShowThemeMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-surface-700 hover:bg-surface-100"
                >
                  <span className="h-3 w-3 rounded-full bg-surface-900" />
                  <span>Inverted Slate</span>
                </button>
                <button
                  onClick={() => {
                    setContrastTheme("cream");
                    setShowThemeMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-surface-700 hover:bg-surface-100"
                >
                  <span className="h-3 w-3 rounded-full bg-[#fdfaf2] border border-amber-200" />
                  <span>Soft Eye Cream</span>
                </button>
              </div>
            )}
          </div>

          {/* Notepad Toggle */}
          <button
            onClick={() => setShowNotesDrawer((s) => !s)}
            title="Candidate Scratchpad / Notes"
            className="flex items-center gap-1.5 rounded-lg border border-surface-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-surface-700 shadow-xs hover:bg-surface-50"
          >
            <Type className="h-3.5 w-3.5 text-violet-600" />
            <span className="hidden sm:inline">Notepad</span>
          </button>
        </div>
      </div>

      {/* Main Runner Area */}
      {isReading ? (
        <div
          className={`grid min-h-0 flex-1 ${
            splitRatio === "passage-focus"
              ? "lg:grid-cols-[1.5fr_1fr]"
              : splitRatio === "questions-focus"
                ? "lg:grid-cols-[1fr_1.5fr]"
                : "lg:grid-cols-2"
          }`}
        >
          {/* Reading Passage Pane with Selection Highlighter */}
          <article
            ref={passagePane}
            onMouseUp={handlePassageMouseUp}
            className={`scroll-thin relative overflow-y-auto border-surface-200 px-6 py-8 select-text lg:h-[calc(100vh-10.8rem)] lg:border-r lg:px-10 ${cardThemeClasses}`}
          >
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-brand-600 uppercase">
                  Reading passage {active + 1}
                </span>
                <span className="text-xs text-surface-400">Select any text to highlight or add notes</span>
              </div>

              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                {(section as ReadingContent["passages"][number]).title}
              </h2>

              <div className={`mt-6 space-y-6 ${fontClass}`}>
                {(section as ReadingContent["passages"][number]).body.split(/\n\s*\n/).map((p, i) => {
                  const m = p.match(/^([A-Z]) ([\s\S]*)$/);
                  return m ? (
                    <p key={i} className="flex gap-4">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-xs font-bold text-brand-800">
                        {m[1]}
                      </span>
                      <span>{m[2]}</span>
                    </p>
                  ) : (
                    <p key={i}>{p}</p>
                  );
                })}
              </div>
            </div>
          </article>

          {/* Question Pane */}
          <div
            ref={questionPane}
            className={`scroll-thin overflow-y-auto px-4 py-8 lg:h-[calc(100vh-10.8rem)] lg:px-8 ${themeClasses}`}
          >
            <div className="mx-auto max-w-2xl">
              <QuestionGroups
                groups={section.groups}
                startNumber={starts[active]}
                answers={answers}
                onChange={setAnswer}
                flags={flags}
                onToggleFlag={toggleFlag}
              />
              <SectionNav active={active} total={sections.length} label={label} go={go} />
            </div>
          </div>
        </div>
      ) : (
        /* Listening Runner */
        <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8">
          <ListeningPlayer key={active} part={section as ListeningPart} partNumber={active + 1} />
          <QuestionGroups
            groups={section.groups}
            startNumber={starts[active]}
            answers={answers}
            onChange={setAnswer}
            flags={flags}
            onToggleFlag={toggleFlag}
          />
          <SectionNav active={active} total={sections.length} label={label} go={go} />
        </div>
      )}

      {/* Floating Text Highlighter Action Popup */}
      {selectionBox && (
        <div
          style={{
            position: "fixed",
            left: `${selectionBox.x}px`,
            top: `${selectionBox.y}px`,
            transform: "translate(-50%, -100%)",
          }}
          className="z-50 flex items-center gap-1.5 rounded-full border border-surface-200 bg-white p-1.5 text-surface-700 shadow-xl animate-fade-up"
        >
          <button
            onClick={() => applyHighlight("yellow")}
            title="Highlight Yellow"
            className="h-6 w-6 cursor-pointer rounded-full bg-yellow-300 ring-2 ring-white transition hover:scale-110"
          />
          <button
            onClick={() => applyHighlight("green")}
            title="Highlight Mint Green"
            className="h-6 w-6 cursor-pointer rounded-full bg-emerald-300 ring-2 ring-white transition hover:scale-110"
          />
          <button
            onClick={() => applyHighlight("pink")}
            title="Highlight Lavender Pink"
            className="h-6 w-6 cursor-pointer rounded-full bg-violet-300 ring-2 ring-white transition hover:scale-110"
          />
          <div className="mx-1 h-4 w-px bg-surface-200" />
          <button
            onClick={() => {
              setPassageNotes((prev) => `${prev}\n• "${selectionBox.text}": `);
              setShowNotesDrawer(true);
              setSelectionBox(null);
            }}
            title="Add to Notes"
            className="flex cursor-pointer items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-surface-600 hover:bg-surface-100"
          >
            <Type className="h-3 w-3" /> Note
          </button>
          <button
            onClick={() => setSelectionBox(null)}
            className="cursor-pointer rounded-full p-0.5 text-surface-400 hover:text-surface-700"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Candidate Notes Drawer */}
      {showNotesDrawer && (
        <div className="fixed right-6 bottom-20 z-50 w-80 rounded-2xl border border-surface-200 bg-white p-4 shadow-2xl animate-fade-up">
          <div className="flex items-center justify-between border-b border-surface-100 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-surface-900">
              <Type className="h-4 w-4 text-brand-600" />
              <span>Test Notes & Scratchpad</span>
            </div>
            <button
              onClick={() => setShowNotesDrawer(false)}
              className="rounded-lg p-1 text-surface-400 hover:bg-surface-100 hover:text-surface-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <textarea
            value={passageNotes}
            onChange={(e) => setPassageNotes(e.target.value)}
            placeholder="Jot down passage keywords, paragraph summaries, or candidate notes..."
            className="mt-3 h-48 w-full resize-none rounded-xl border border-surface-200 p-3 text-xs leading-relaxed text-surface-800 outline-none focus:border-brand-500"
          />
          <div className="mt-2 text-right text-[11px] text-surface-400">Notes are saved during this test</div>
        </div>
      )}

      {/* Official CD-IELTS Question Palette & Review Navigation Bar */}
      <nav className="sticky bottom-0 z-30 flex items-center gap-4 border-t border-surface-200 bg-white/95 px-4 py-2.5 backdrop-blur-md">
        <div className="hidden shrink-0 text-xs font-medium text-surface-500 sm:block">
          <span className="text-base font-bold text-surface-900 tabular-nums">{answered}</span>/{all.length} answered
          {flaggedCount > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800">
              <Flag className="h-3 w-3 fill-amber-600" /> {flaggedCount} flagged
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-wrap gap-1">
          {all.map((q, i) => {
            const hasAns = answers[q.id]?.trim();
            const isFlagged = flags[q.id];
            const isCur = q.si === active;

            return (
              <button
                key={q.id}
                onClick={() => jump(q.si, q.id)}
                title={`Question ${i + 1}${isFlagged ? " (Flagged)" : hasAns ? " (Answered)" : " (Unanswered)"}`}
                className={`relative h-7 min-w-7 rounded-md text-xs font-bold tabular-nums transition ${
                  hasAns
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                } ${isCur ? "ring-2 ring-brand-400 ring-offset-1" : ""}`}
              >
                {i + 1}
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[8px] text-white ring-1 ring-white">
                    ⚑
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function SectionNav({
  active,
  total,
  label,
  go,
}: {
  active: number;
  total: number;
  label: string;
  go: (i: number) => void;
}) {
  return (
    <div className="mt-10 flex justify-between">
      <button onClick={() => go(active - 1)} disabled={active === 0} className="btn-secondary">
        <ChevronLeft className="h-4 w-4" /> Previous {label.toLowerCase()}
      </button>
      {active < total - 1 && (
        <button onClick={() => go(active + 1)} className="btn-primary">
          Next {label.toLowerCase()} <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

/** Plays a Listening part with Text-To-Speech simulation, audio scrubber, and practice transcript. */
function ListeningPlayer({ part, partNumber }: { part: ListeningPart; partNumber: number }) {
  const storageKey = `played-${part.title}`;
  const [state, setState] = useState<"idle" | "playing" | "done">("idle");
  const [line, setLine] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 0.8 | 1.2>(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey)) setState("done");
    } catch {}
    return () => stopRef.current?.();
  }, [storageKey]);

  const play = () => {
    setState("playing");
    setLine(0);
    try {
      sessionStorage.setItem(storageKey, "1");
    } catch {}
    stopRef.current = speakLines(part.transcript, { onLine: setLine, onEnd: () => setState("done") });
  };

  const stop = () => {
    stopRef.current?.();
    setState("done");
  };

  const progress =
    state === "done" ? 100 : state === "idle" ? 0 : ((line + 1) / Math.max(part.transcript.length, 1)) * 100;

  return (
    <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-[0_18px_44px_-32px_rgba(22,34,59,0.4)]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <button
          onClick={state === "playing" ? stop : play}
          disabled={!ttsSupported()}
          className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25 transition hover:scale-105 hover:bg-brand-700 disabled:opacity-40"
          aria-label={state === "playing" ? "Pause audio track" : "Play audio track"}
        >
          {state === "playing" ? (
            <Pause className="h-7 w-7" />
          ) : state === "done" ? (
            <RotateCcw className="h-7 w-7" />
          ) : (
            <Play className="ml-1 h-7 w-7 fill-white" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600">
              <Headphones className="h-3.5 w-3.5" /> Part {partNumber} audio
            </div>

            {/* Playback Speed Controls */}
            <div className="flex items-center gap-0.5 rounded-lg border border-surface-200 bg-surface-100 p-0.5 text-[11px]">
              {([0.8, 1, 1.2] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`cursor-pointer rounded px-2 py-0.5 font-bold transition ${
                    playbackSpeed === spd
                      ? "bg-white text-surface-900 shadow-xs"
                      : "text-surface-500 hover:text-surface-900"
                  }`}
                >
                  {spd}×
                </button>
              ))}
            </div>
          </div>

          <div className="mt-1.5 font-display text-base font-bold text-surface-900">
            {part.context}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-100">
              <div
                className="h-full rounded-full bg-brand-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {state === "playing" && <Volume2 className="h-4 w-4 animate-pulse text-brand-500" />}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-100 bg-surface-50 px-5 py-3 text-[13px] leading-relaxed text-surface-500">
        <div className="max-w-2xl">
          {!ttsSupported()
            ? "Speech synthesis isn't supported in this browser. Please use Chrome, Safari or Edge."
            : state === "idle"
              ? "Read the questions below first, then press play. Under official exam rules, recordings play once."
              : state === "playing"
                ? "Recording playing. Write your answers directly on the paper."
                : "Recording finished. Click replay any time to review."}
        </div>

        <button
          onClick={() => setShowTranscript((s) => !s)}
          className="flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-brand-600 transition hover:text-brand-700"
        >
          {showTranscript ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          <span>{showTranscript ? "Hide transcript" : "Study transcript"}</span>
        </button>
      </div>

      {showTranscript && (
        <div className="scroll-thin max-h-64 overflow-y-auto border-t border-surface-100 bg-surface-50/60 p-5 text-sm leading-relaxed text-surface-600">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-600">
            Audio script
          </div>
          <pre className="whitespace-pre-wrap font-sans">
            {part.transcript.map((t) => `${t.speaker}: ${t.text}`).join("\n\n")}
          </pre>
        </div>
      )}
    </div>
  );
}
