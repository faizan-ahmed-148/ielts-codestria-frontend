"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, Check, Gauge, Headphones, Lightbulb, Play, RotateCcw, Shuffle, Square } from "lucide-react";
import { PageHeader, ProgressBar } from "@/components/ui";
import { speakLines, ttsSupported } from "@/lib/speech";
import {
  DICTATION_ITEMS,
  DICTATION_LEVELS,
  DICTATION_PARTS,
  type DictationItem,
  type DictationLevel,
  type DictationPart,
} from "@/lib/dictation-data";

/* ── Normalisation: make "fifteen" = "15", "S-M-Y-T-H" = "Smyth", "CB2 1TN" = "C B 2 1 T N" ── */

interface Tok {
  disp: string;
  norm: string;
}

const UNITS: Record<string, number> = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
  twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90,
};
const ORDINALS: Record<string, number> = {
  fourth: 4, fifth: 5, sixth: 6, seventh: 7, eighth: 8, ninth: 9, tenth: 10, eleventh: 11, twelfth: 12,
  thirteenth: 13, fourteenth: 14, fifteenth: 15, sixteenth: 16, seventeenth: 17, eighteenth: 18, nineteenth: 19,
  twentieth: 20, thirtieth: 30, fortieth: 40, fiftieth: 50, sixtieth: 60, seventieth: 70, eightieth: 80, ninetieth: 90,
};
/** Only count as numbers when they complete a compound (twenty-first). */
const SOFT_ORDINALS: Record<string, number> = { first: 1, second: 2, third: 3 };

function numberValue(word: string, prev: number | null): number | null {
  if (word in UNITS) return UNITS[word];
  if (word in ORDINALS) return ORDINALS[word];
  if (word in SOFT_ORDINALS && prev !== null && prev >= 20 && prev % 10 === 0) return SOFT_ORDINALS[word];
  return null;
}

function tokenize(text: string): Tok[] {
  const raw = text
    .split(/[\s\-–—/]+/)
    .map((w) => ({ disp: w, norm: w.toLowerCase().replace(/[^a-z0-9]/g, "") }))
    .filter((t) => t.norm);

  // 1) Number words -> digits ("eight hundred and fifty" -> 850, "sixteen forty" -> 1640).
  const nums: Tok[] = [];
  for (let i = 0; i < raw.length; ) {
    let total = 0;
    let current: number | null = null;
    let j = i;
    const disp: string[] = [];
    while (j < raw.length) {
      const w = raw[j].norm;
      if ((w === "hundred" || w === "thousand") && (current !== null || total > 0)) {
        if (w === "hundred") current = (current ?? 1) * 100;
        else {
          total += (current ?? 1) * 1000;
          current = 0;
        }
      } else if (w === "and" && current !== null && j + 1 < raw.length && numberValue(raw[j + 1].norm, null) !== null && (current % 100 === 0 || total > 0)) {
        // "two thousand and nine", "eight hundred and fifty"
      } else {
        const v = numberValue(w, current);
        if (v === null) break;
        if (current === null || current === 0) current = v;
        else if (current >= 100 && current % 100 === 0) current += v;
        else if (current >= 20 && current % 10 === 0 && current < 100 && v < 10) current += v;
        else if (current < 100 && v >= 10) current = current * 100 + v; // year style
        else break;
      }
      disp.push(raw[j].disp);
      j++;
    }
    if (j > i && (current !== null || total > 0)) {
      nums.push({ disp: disp.join(" "), norm: String(total + (current ?? 0)) });
      i = j;
    } else {
      const t = raw[i];
      // "14th" -> "14", "oh" next to digits -> "0"
      const ord = t.norm.match(/^(\d+)(st|nd|rd|th)$/);
      nums.push(ord ? { disp: t.disp, norm: ord[1] } : t);
      i++;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i].norm === "oh" && (/^\d+$/.test(nums[i - 1]?.norm ?? "") || /^\d+$/.test(nums[i + 1]?.norm ?? ""))) {
      nums[i] = { disp: nums[i].disp, norm: "0" };
    }
  }

  // 2) "double L" -> "l l", "double five" -> "5 5".
  const doubled: Tok[] = [];
  for (let i = 0; i < nums.length; i++) {
    const t = nums[i];
    const next = nums[i + 1];
    if ((t.norm === "double" || t.norm === "triple") && next && next.norm.length === 1) {
      const n = t.norm === "double" ? 2 : 3;
      for (let k = 0; k < n; k++) doubled.push({ disp: k === 0 ? `${t.disp} ${next.disp}` : "", norm: next.norm });
      i++;
    } else doubled.push(t);
  }

  // 3) Merge spelt-out codes: runs of single letters / digit groups / letter+digit codes.
  const isCode = (n: string) => n.length === 1 || /^\d+$/.test(n) || (/\d/.test(n) && /[a-z]/.test(n) && n.length <= 5);
  const out: Tok[] = [];
  for (let i = 0; i < doubled.length; ) {
    let j = i;
    while (j < doubled.length && isCode(doubled[j].norm)) j++;
    const run = doubled.slice(i, j);
    const letters = run.filter((t) => t.norm.length === 1 && /[a-z]/.test(t.norm)).length;
    // Merge if the run is a code (≥2 tokens and either a digit run, or ≥3 single letters, or mixed alphanumerics).
    const mergeable =
      run.length >= 2 &&
      (run.every((t) => /^\d+$/.test(t.norm)) || letters >= 3 || run.some((t) => /\d/.test(t.norm) && /[a-z]/.test(t.norm)) ||
        (letters >= 1 && run.some((t) => /\d/.test(t.norm))));
    if (mergeable) {
      out.push({ disp: run.map((t) => t.disp).filter(Boolean).join(" "), norm: run.map((t) => t.norm).join("") });
      i = j;
    } else if (j > i) {
      out.push(...run.map((t) => ({ disp: t.disp || t.norm, norm: t.norm })));
      i = j;
    } else {
      out.push(doubled[i]);
      i++;
    }
  }
  // British/American spelling: accept -ize/-ise.
  return out.map((t) => ({ ...t, norm: t.norm.replace(/iz(e|ed|es|ing|ation|ations)$/, "is$1") }));
}

type Mark = "correct" | "wrong" | "missing" | "extra";
interface DiffPart {
  mark: Mark;
  expected?: string;
  typed?: string;
}

function diffWords(expectedText: string, typedText: string) {
  const a = tokenize(expectedText);
  const b = tokenize(typedText);
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i].norm === b[j].norm ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const parts: DiffPart[] = [];
  let i = 0;
  let j = 0;
  const pendA: Tok[] = [];
  const pendB: Tok[] = [];
  const flush = () => {
    const k = Math.min(pendA.length, pendB.length);
    for (let x = 0; x < k; x++) parts.push({ mark: "wrong", expected: pendA[x].disp, typed: pendB[x].disp });
    for (let x = k; x < pendA.length; x++) parts.push({ mark: "missing", expected: pendA[x].disp });
    for (let x = k; x < pendB.length; x++) parts.push({ mark: "extra", typed: pendB[x].disp });
    pendA.length = 0;
    pendB.length = 0;
  };
  while (i < n || j < m) {
    if (i < n && j < m && a[i].norm === b[j].norm) {
      flush();
      parts.push({ mark: "correct", expected: a[i].disp, typed: b[j].disp });
      i++;
      j++;
    } else if (j < m && (i >= n || dp[i][j + 1] >= dp[i + 1][j])) {
      pendB.push(b[j++]);
    } else {
      pendA.push(a[i++]);
    }
  }
  flush();
  const correct = parts.filter((p) => p.mark === "correct").length;
  return { parts, correct, total: n, score: n ? Math.round((correct / n) * 100) : 0 };
}

/* ── Component ─────────────────────────────────────────────────────────── */

const MARK_STYLE: Record<Mark, string> = {
  correct: "bg-emerald-50 text-emerald-800 border-emerald-200",
  wrong: "bg-rose-50 text-rose-800 border-rose-200",
  missing: "bg-amber-50 text-amber-800 border-amber-200 border-dashed",
  extra: "bg-surface-100 text-surface-500 border-surface-200 line-through",
};

type PartFilter = "all" | DictationPart;
type LevelFilter = "all" | DictationLevel;

export default function DictationClient() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [part, setPart] = useState<PartFilter>("all");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [checked, setChecked] = useState(false);
  const [playing, setPlaying] = useState<"normal" | "slow" | null>(null);
  const [plays, setPlays] = useState(0);
  const [history, setHistory] = useState<Record<string, number>>({});
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setSupported(ttsSupported());
    return () => stopRef.current?.();
  }, []);

  const items = useMemo(
    () => DICTATION_ITEMS.filter((it) => (part === "all" || it.part === part) && (level === "all" || it.level === level)),
    [part, level],
  );
  const item: DictationItem | undefined = items[index % Math.max(items.length, 1)];
  const result = useMemo(() => (checked && item ? diffWords(item.text, typed) : null), [checked, item, typed]);

  const stop = () => {
    stopRef.current?.();
    stopRef.current = null;
    setPlaying(null);
  };

  const play = (mode: "normal" | "slow") => {
    if (!item || !supported) return;
    stop();
    setPlaying(mode);
    setPlays((p) => p + 1);
    stopRef.current = speakLines([{ speaker: "Speaker", text: item.audio ?? item.text }], {
      rate: mode === "slow" ? 0.75 : 0.95,
      onEnd: () => setPlaying(null),
    });
  };

  const goTo = (next: number) => {
    stop();
    setIndex(next);
    setTyped("");
    setChecked(false);
    setPlays(0);
  };

  const check = () => {
    if (!item || !typed.trim()) return;
    stop();
    setChecked(true);
    const r = diffWords(item.text, typed);
    setHistory((h) => ({ ...h, [item.id]: r.score }));
  };

  const attempted = Object.keys(history).length;
  const average = attempted ? Math.round(Object.values(history).reduce((s, v) => s + v, 0) / attempted) : 0;

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Free listening tool"
        title="IELTS dictation practice"
        description="Listen to IELTS-style sentences, type exactly what you hear, and see every word marked as correct, wrong or missing. Train your ear for names, numbers, dates and academic vocabulary."
        actions={
          <>
            <span className="badge-brand">
              <Headphones className="h-3.5 w-3.5" /> {DICTATION_ITEMS.length} sentences
            </span>
            {attempted > 0 && <span className="badge-success">Average {average}% · {attempted} done</span>}
          </>
        }
      />

      {supported === false && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Your browser does not support speech synthesis, so the sentences cannot be read aloud. Try the latest Chrome, Edge or
            Safari. You can still reveal each sentence and study the listening trap below it.
          </span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="card h-fit space-y-5 p-5">
          <div>
            <p className="eyebrow mb-2">Test part</p>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {(["all", 1, 2, 3, 4] as PartFilter[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setPart(p);
                    goTo(0);
                  }}
                  className={`rounded-lg border px-3 py-2 text-left text-[13px] font-semibold transition ${
                    part === p ? "border-brand-300 bg-brand-50 text-brand-700" : "border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {p === "all" ? "All parts" : DICTATION_PARTS[p].label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-2">Difficulty</p>
            <div className="flex flex-wrap gap-2">
              {(["all", ...DICTATION_LEVELS] as LevelFilter[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLevel(l);
                    goTo(0);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    level === l ? "border-brand-300 bg-brand-50 text-brand-700" : "border-surface-200 text-surface-600 hover:border-surface-300"
                  }`}
                >
                  {l === "all" ? "Any" : l}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Exercise */}
        {!item ? (
          <div className="card p-8 text-center text-sm text-surface-500">No sentences match these filters.</div>
        ) : (
          <section className="card space-y-5 p-5 sm:p-7" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-neutral">
                  Sentence {(index % items.length) + 1} of {items.length}
                </span>
                <span className="badge-brand">Part {item.part}</span>
                <span className={item.level === "Hard" ? "badge-error" : item.level === "Medium" ? "badge-warning" : "badge-success"}>
                  {item.level}
                </span>
              </div>
              <p className="text-[13px] font-medium text-surface-500">{item.context}</p>
            </div>
            <ProgressBar value={((index % items.length) / items.length) * 100} />

            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" disabled={!supported} onClick={() => (playing ? stop() : play("normal"))}>
                {playing === "normal" ? <Square className="h-4 w-4" /> : plays ? <RotateCcw className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {playing === "normal" ? "Stop" : plays ? "Replay" : "Play"}
              </button>
              <button type="button" className="btn-secondary" disabled={!supported} onClick={() => (playing === "slow" ? stop() : play("slow"))}>
                {playing === "slow" ? <Square className="h-4 w-4" /> : <Gauge className="h-4 w-4" />}
                {playing === "slow" ? "Stop" : "Slow (0.75×)"}
              </button>
              {plays > 0 && <span className="self-center text-xs text-surface-500">Played {plays}×. In the real test you hear it once.</span>}
            </div>

            <div>
              <label htmlFor="dictation-answer" className="label">
                Type what you heard
              </label>
              <textarea
                id="dictation-answer"
                className="input min-h-[96px] resize-y"
                value={typed}
                disabled={checked}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    check();
                  }
                }}
                placeholder="Type the full sentence, then press Enter to check"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>

            {!checked ? (
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-primary" onClick={check} disabled={!typed.trim()}>
                  <Check className="h-4 w-4" /> Check answer
                </button>
                <button type="button" className="btn-ghost" onClick={() => setChecked(true)}>
                  Reveal sentence
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-up">
                {result && typed.trim() && (
                  <>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`text-3xl font-extrabold ${result.score >= 90 ? "text-emerald-600" : result.score >= 60 ? "text-amber-600" : "text-rose-600"}`}>
                        {result.score}%
                      </span>
                      <span className="text-sm text-surface-600">
                        {result.correct} of {result.total} words correct
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {result.parts.map((p, k) => (
                        <span key={k} className={`rounded-md border px-1.5 py-0.5 text-[14px] ${MARK_STYLE[p.mark]}`} title={p.mark}>
                          {p.mark === "wrong" ? (
                            <>
                              <span className="line-through opacity-70">{p.typed}</span> <span className="font-semibold">{p.expected}</span>
                            </>
                          ) : p.mark === "extra" ? (
                            p.typed
                          ) : (
                            p.expected
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 text-[11px] text-surface-500">
                      <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-emerald-200" /> correct</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-rose-200" /> wrong (yours → correct)</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-amber-200" /> missing</span>
                      <span className="inline-flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-surface-200" /> extra</span>
                    </div>
                  </>
                )}
                <div className="rounded-xl border border-surface-200 bg-surface-50 p-4 text-sm">
                  <p className="eyebrow mb-1">Transcript</p>
                  <p className="text-surface-800">{item.text}</p>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50/60 p-4 text-sm text-brand-900">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <p>
                    <span className="font-semibold">Common trap: </span>
                    {item.trap}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn-primary" onClick={() => goTo((index + 1) % items.length)}>
                    Next sentence <ArrowRight className="h-4 w-4" />
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => goTo(index)}>
                    <RotateCcw className="h-4 w-4" /> Try again
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => goTo(Math.floor(Math.random() * items.length))}
                  >
                    <Shuffle className="h-4 w-4" /> Random
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
