"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Circle,
  Copy,
  Hourglass,
  Target,
} from "lucide-react";
import { PageHeader } from "@/components/ui";

/** Shared with the dashboard so it can show the saved exam date. */
export const EXAM_PLAN_STORAGE_KEY = "codestria:exam-countdown";

const TARGETS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];
const DEFAULT_TARGET = 7;

type PlanLink = { href: string; label: string };
type Phase = { id: string; title: string; focus: string[]; links: PlanLink[] };
type PlanBlock = Phase & { from: number; to: number };

const L = {
  tests: { href: "/tests", label: "Practice tests" },
  answers: { href: "/model-answers", label: "Model answers" },
  speaking: { href: "/speaking-practice", label: "Speaking practice" },
  vocab: { href: "/vocabulary", label: "Vocabulary" },
  grammar: { href: "/grammar", label: "Grammar" },
  dictation: { href: "/dictation", label: "Dictation" },
  reading: { href: "/reading-speed-test", label: "Reading speed test" },
  checker: { href: "/writing-checker", label: "Writing checker" },
  flashcards: { href: "/flashcards", label: "Flashcards" },
} satisfies Record<string, PlanLink>;

function phases(target: number): Record<string, Phase> {
  const high = target >= 7.5;
  return {
    diagnose: {
      id: "diagnose",
      title: "Diagnose your starting point",
      focus: [
        "Sit one full timed practice test to find your current band in each skill.",
        "Measure your reading speed and note which question types cost you most marks.",
        `List the gap between each skill and your ${target.toFixed(1)} target — that gap drives the rest of the plan.`,
      ],
      links: [L.tests, L.reading],
    },
    foundations: {
      id: "foundations",
      title: "Build grammar and vocabulary foundations",
      focus: [
        high
          ? "Work on less common collocations and precise topic vocabulary — range and accuracy separate Band 7 from Band 8."
          : "Learn high-frequency academic vocabulary and collocations for common IELTS topics.",
        "Fix your most frequent grammar errors (articles, tenses, agreement) and practise complex sentences.",
        "Daily dictation to train spelling and listening for detail.",
        "Review flashcards for 10–15 minutes every day.",
      ],
      links: [L.grammar, L.vocab, L.dictation, L.flashcards],
    },
    skills: {
      id: "skills",
      title: "Writing and Speaking technique",
      focus: [
        "Study model answers for Task 1 and Task 2 and copy their structure, not their sentences.",
        "Write at least two essays a week and check them against the band criteria.",
        "Record Part 2 cue-card answers and listen back for fluency, pronunciation and filler words.",
      ],
      links: [L.answers, L.checker, L.speaking],
    },
    timed: {
      id: "timed",
      title: "Timed section practice",
      focus: [
        "Do Reading and Listening sections under exam timing and review every wrong answer.",
        "Practise skimming and scanning to finish Reading with time to check.",
        "Write Task 2 in 40 minutes and Task 1 in 20 minutes.",
      ],
      links: [L.tests, L.reading, L.dictation, L.checker],
    },
    mocks: {
      id: "mocks",
      title: "Full mock tests and review",
      focus: [
        "Sit a full four-skill mock test each week in one sitting.",
        "Spend as long reviewing as testing: log every error type and drill it.",
        "Do a speaking mock with all three parts back to back.",
      ],
      links: [L.tests, L.checker, L.speaking],
    },
    final: {
      id: "final",
      title: "Final week: consolidate and rest",
      focus: [
        "One last full mock early in the week, then lighter practice only.",
        "Revise your error log and favourite vocabulary — no new material.",
        "Work through the final-week checklist below.",
      ],
      links: [L.flashcards, L.speaking],
    },
  };
}

/** Splits the available weeks into phases, scaled to the time left. */
function buildPlan(weeks: number, target: number): PlanBlock[] {
  const p = phases(target);
  if (weeks <= 1) return [{ ...p.final, from: 1, to: 1 }];
  if (weeks === 2) return [{ ...p.mocks, from: 1, to: 1 }, { ...p.final, from: 2, to: 2 }];

  const blocks: PlanBlock[] = [{ ...p.diagnose, from: 1, to: 1 }];
  const mockWeeks = Math.max(1, Math.round((weeks - 2) * 0.2));
  const middle = weeks - 2 - mockWeeks;

  // Largest-remainder split of the middle weeks across the three build phases.
  const weights = [
    { phase: p.foundations, w: 0.4 },
    { phase: p.skills, w: 0.35 },
    { phase: p.timed, w: 0.25 },
  ];
  const raw = weights.map((x) => x.w * middle);
  const counts = raw.map(Math.floor);
  let left = middle - counts.reduce((a, b) => a + b, 0);
  raw
    .map((r, i) => ({ i, rem: r - Math.floor(r) }))
    .sort((a, b) => b.rem - a.rem)
    .forEach(({ i }) => {
      if (left > 0) {
        counts[i] += 1;
        left -= 1;
      }
    });

  let week = 2;
  weights.forEach(({ phase }, i) => {
    if (counts[i] > 0) {
      blocks.push({ ...phase, from: week, to: week + counts[i] - 1 });
      week += counts[i];
    }
  });
  blocks.push({ ...p.mocks, from: week, to: week + mockWeeks - 1 });
  week += mockWeeks;
  blocks.push({ ...p.final, from: week, to: week });
  return blocks;
}

const FINAL_CHECKLIST = [
  "Check your booking confirmation: test centre address, start time and Speaking slot.",
  "Make sure your ID is valid and is the same document you used to book.",
  "Plan your route and arrival time — aim to arrive early.",
  "Do one last timed mock early in the week, then switch to light review.",
  "Re-read your error log and the Writing task structures you rely on.",
  "Practise a short Speaking warm-up each day so you start fluently.",
  "Sleep well for the last few nights; avoid cramming the evening before.",
  "On the day: eat, hydrate, and bring only what the centre allows.",
];

function parseDate(value: string | null): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}

function parseTarget(value: string | null): number {
  const n = Number(value);
  return TARGETS.includes(n) ? n : DEFAULT_TARGET;
}

function toIsoDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function downloadIcs(date: Date, target: number) {
  const ymd = toIsoDate(date).replace(/-/g, "");
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Codestria IELTS//Exam Countdown//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:ielts-exam-${ymd}@ielts.codestria.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${ymd}`,
    `DTEND;VALUE=DATE:${toIsoDate(next).replace(/-/g, "")}`,
    "SUMMARY:IELTS exam",
    `DESCRIPTION:Target band ${target.toFixed(1)}. Bring the ID you used to book. Plan: https://ielts.codestria.com/exam-countdown?date=${toIsoDate(date)}&target=${target}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:IELTS exam tomorrow",
    "TRIGGER:-P1D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `ielts-exam-${toIsoDate(date)}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ExamCountdownClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const dateParam = searchParams.get("date");
  const examDate = parseDate(dateParam);
  const target = parseTarget(searchParams.get("target"));
  const today = startOfToday();
  const days = examDate ? Math.round((examDate.getTime() - today.getTime()) / 86_400_000) : null;
  const weeks = days !== null && days > 0 ? Math.ceil(days / 7) : 0;
  const plan = useMemo(() => (weeks > 0 ? buildPlan(weeks, target) : []), [weeks, target]);

  const update = (next: { date?: string; target?: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (next.date !== undefined) {
      if (next.date) params.set("date", next.date);
      else params.delete("date");
    }
    if (next.target !== undefined) params.set("target", String(next.target));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Remember the plan locally so the dashboard can show the countdown.
  const hasValidDate = examDate !== null;
  useEffect(() => {
    if (!hasValidDate || !dateParam) return;
    try {
      localStorage.setItem(EXAM_PLAN_STORAGE_KEY, JSON.stringify({ date: dateParam, target }));
    } catch {
      /* storage unavailable */
    }
  }, [dateParam, hasValidDate, target]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Free tool"
        title="IELTS exam countdown"
        description="Enter your test date and target band to get a live countdown and a week-by-week preparation plan scaled to the time you have left. The link updates as you go, so you can bookmark or share it."
      />

      <section className="card grid gap-5 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-7" aria-label="Your exam">
        <div className="space-y-2">
          <label htmlFor="exam-date" className="label">
            Exam date
          </label>
          <input
            id="exam-date"
            type="date"
            className="input"
            min={toIsoDate(today)}
            value={examDate ? (dateParam ?? "") : ""}
            onChange={(e) => update({ date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="target-band" className="label">
            Target overall band
          </label>
          <select
            id="target-band"
            className="input"
            value={String(target)}
            onChange={(e) => update({ target: Number(e.target.value) })}
          >
            {TARGETS.map((t) => (
              <option key={t} value={String(t)}>
                Band {t.toFixed(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={copyLink} className="btn-secondary" disabled={!examDate}>
          <Copy className="h-4 w-4" />
          {copied ? "Link copied" : "Copy link"}
        </button>
      </section>

      {!examDate || days === null ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-300 bg-surface-50/60 px-6 py-14 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-surface-400 shadow-xs ring-1 ring-surface-200">
            <CalendarDays className="h-6 w-6" />
          </span>
          <p className="font-display text-base font-bold text-surface-900">Pick your exam date to start</p>
          <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-surface-500">
            Don&apos;t have a date yet? Choose a realistic one — a fixed deadline makes a study plan far easier
            to stick to.
          </p>
        </div>
      ) : days < 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          That date has passed. Pick your next exam date to build a new plan — or{" "}
          <Link href="/score-converter" className="font-semibold underline">
            compare your result with other tests
          </Link>
          .
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card border-brand-200/70 bg-gradient-to-b from-brand-50/80 via-white to-white p-6 text-center">
              <Hourglass className="mx-auto h-5 w-5 text-brand-600" />
              <div className="mt-3 font-display text-5xl font-extrabold leading-none tabular-nums tracking-tight text-surface-900">
                {days}
              </div>
              <div className="mt-1.5 text-[13px] font-semibold text-surface-600">
                {days === 0 ? "Exam day — good luck!" : days === 1 ? "day left" : "days left"}
              </div>
            </div>
            <div className="card p-6 text-center">
              <CalendarDays className="mx-auto h-5 w-5 text-brand-600" />
              <div className="mt-3 font-display text-3xl font-extrabold leading-none tabular-nums text-surface-900">
                {Math.floor(days / 7)}
                <span className="text-lg font-bold text-surface-500"> wk </span>
                {days % 7}
                <span className="text-lg font-bold text-surface-500"> d</span>
              </div>
              <div className="mt-2 text-[13px] text-surface-500">
                {examDate.toLocaleDateString(undefined, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
            <div className="card flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-surface-700">
                <Target className="h-4 w-4 text-brand-600" />
                Target band {target.toFixed(1)}
              </div>
              <button type="button" onClick={() => downloadIcs(examDate, target)} className="btn-primary">
                <CalendarPlus className="h-4 w-4" />
                Add to calendar
              </button>
              <span className="text-[12px] text-surface-500">.ics file for Google, Apple or Outlook</span>
            </div>
          </div>

          {plan.length > 0 && (
            <section className="space-y-4" aria-labelledby="plan-heading">
              <div>
                <h2 id="plan-heading" className="font-display text-lg font-bold text-surface-900">
                  Your {weeks}-week plan
                </h2>
                <p className="mt-0.5 text-sm text-surface-500">
                  Scaled to the time left before your exam. Adjust the focus to your weakest skill.
                </p>
              </div>
              <ol className="space-y-3">
                {plan.map((block) => (
                  <li key={block.id} className="card p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge-brand">
                        {block.from === block.to ? `Week ${block.from}` : `Weeks ${block.from}–${block.to}`}
                      </span>
                      <h3 className="text-[15px] font-bold text-surface-900">{block.title}</h3>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-surface-600">
                      {block.focus.map((f) => (
                        <li key={f} className="flex gap-2">
                          <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-500" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {block.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-xl border border-surface-200 bg-white px-3 py-1.5 text-[13px] font-medium text-surface-700 shadow-xs transition hover:border-brand-300 hover:bg-brand-50/60 hover:text-brand-800"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section className="card p-5 sm:p-7" aria-labelledby="checklist-heading">
            <h2 id="checklist-heading" className="font-display text-lg font-bold text-surface-900">
              Final-week checklist
            </h2>
            <ul className="mt-4 space-y-2">
              {FINAL_CHECKLIST.map((item, i) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-pressed={checked.has(i)}
                    className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-2 py-2 text-left text-[14px] leading-relaxed text-surface-700 transition hover:bg-surface-50"
                  >
                    {checked.has(i) ? (
                      <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />
                    ) : (
                      <Circle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-surface-300" />
                    )}
                    <span className={checked.has(i) ? "text-surface-400 line-through" : ""}>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
