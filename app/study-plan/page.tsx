"use client";

import {
  ArrowRight,
  Calculator,
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  Gauge,
  ListTodo,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  EmptyState,
  PageHeader,
  ProgressBar,
  StatCard,
} from "@/components/ui";

interface DailyTask {
  id: string;
  text: string;
  module: "Listening" | "Reading" | "Writing" | "Speaking" | "General";
  durationMinutes: number;
  completed: boolean;
}

const DEFAULT_TASKS: DailyTask[] = [
  {
    id: "task-1",
    text: "Complete 1 Cambridge Academic Reading Passage (13 questions) under strict 20-min timer",
    module: "Reading",
    durationMinutes: 20,
    completed: false,
  },
  {
    id: "task-2",
    text: "Review unfamiliar vocabulary and record 5 high-yield synonyms in your error log",
    module: "General",
    durationMinutes: 15,
    completed: false,
  },
  {
    id: "task-3",
    text: "Draft an IELTS Writing Task 2 introduction + 2 body paragraphs using PEEL structure",
    module: "Writing",
    durationMinutes: 30,
    completed: false,
  },
  {
    id: "task-4",
    text: "Practice IELTS Speaking Part 2 cue card with a 1-min prep and 2-min recorded response",
    module: "Speaking",
    durationMinutes: 15,
    completed: false,
  },
  {
    id: "task-5",
    text: "Complete Section 3 & 4 of an IELTS Listening test; check spelling and plurals",
    module: "Listening",
    durationMinutes: 25,
    completed: false,
  },
];

const MODULE_TONES: Record<DailyTask["module"], string> = {
  Listening: "bg-sky-50 text-sky-700 border-sky-200",
  Reading: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Writing: "bg-violet-50 text-violet-700 border-violet-200",
  Speaking: "bg-amber-50 text-amber-700 border-amber-200",
  General: "bg-surface-100 text-surface-700 border-surface-200",
};

const PHASES = [
  {
    range: "Days 1 – 7",
    title: "Phase 1: Foundation & Diagnostic Baseline",
    subtitle: "Question Format Familiarity & Strategy Mapping",
    points: [
      "Take full diagnostic mock under timed conditions to identify weak question types.",
      "Master True/False/Not Given vs Yes/No/Not Given reading logic.",
      "Learn the standard PEEL (Point, Explanation, Example, Link) paragraph model for Writing Task 2.",
    ],
  },
  {
    range: "Days 8 – 14",
    title: "Phase 2: Speed & Lexical Resource Expansion",
    subtitle: "Academic Word List & Skimming / Scanning Techniques",
    points: [
      "Study 100+ high-frequency Academic Collocations across Environment, Tech, and Education.",
      "Practice keyword transformation and map-diagram labelling for Listening Part 2 & 3.",
      "Draft 5 timed Task 1 overviews (Line, Bar, Process) ensuring no data points are missed.",
    ],
  },
  {
    range: "Days 15 – 21",
    title: "Phase 3: Examiner Criteria Calibration",
    subtitle: "Writing Cohesion, Complex Sentences & Part 2 Long Turn",
    points: [
      "Simulate Speaking Part 2 cue cards using 1-min notes strategy and uninterrupted 2-min delivery.",
      "Analyze Band 9 model essays and contrast against Band 6 cohesive device pitfalls.",
      "Eliminate recurring grammatical slips: subject-verb agreement, articles (a/an/the), and tense shifts.",
    ],
  },
  {
    range: "Final Week",
    title: "Phase 4: Full-Length Exam Conditioning",
    subtitle: "Simulated 2h 45m CD-IELTS Environment & Rest",
    points: [
      "Complete 2 complete mock tests non-stop without pausing to build cognitive stamina.",
      "Practice typing essays in the CD-IELTS simulation runner with word count tracking.",
      "Rest the final 24 hours before test day to optimize memory retrieval and focus.",
    ],
  },
];

export default function StudyPlanPage() {
  // Goal Settings
  const [currentBand, setCurrentBand] = useState<number>(6.0);
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [weeksRemaining, setWeeksRemaining] = useState<number>(4);
  const [dailyHours, setDailyHours] = useState<number>(2);
  const [weakestModule, setWeakestModule] = useState<string>("Writing");
  const [examType, setExamType] = useState<"ACADEMIC" | "GENERAL">("ACADEMIC");

  // Checklist State
  const [tasks, setTasks] = useState<DailyTask[]>(DEFAULT_TASKS);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskModule, setNewTaskModule] = useState<DailyTask["module"]>("Writing");
  const [isClient, setIsClient] = useState(false);

  // Load from local storage
  useEffect(() => {
    setIsClient(true);
    const savedTasks = localStorage.getItem("ielts_study_tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        // ignore fallback
      }
    }

    const savedPlan = localStorage.getItem("ielts_study_plan_meta");
    if (savedPlan) {
      try {
        const meta = JSON.parse(savedPlan);
        if (meta.currentBand) setCurrentBand(meta.currentBand);
        if (meta.targetBand) setTargetBand(meta.targetBand);
        if (meta.weeksRemaining) setWeeksRemaining(meta.weeksRemaining);
        if (meta.dailyHours) setDailyHours(meta.dailyHours);
        if (meta.weakestModule) setWeakestModule(meta.weakestModule);
        if (meta.examType) setExamType(meta.examType);
      } catch (e) {
        // ignore fallback
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("ielts_study_tasks", JSON.stringify(tasks));
  }, [tasks, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem(
      "ielts_study_plan_meta",
      JSON.stringify({
        currentBand,
        targetBand,
        weeksRemaining,
        dailyHours,
        weakestModule,
        examType,
      })
    );
  }, [currentBand, targetBand, weeksRemaining, dailyHours, weakestModule, examType, isClient]);

  const bandGap = useMemo(() => {
    const diff = Number((targetBand - currentBand).toFixed(1));
    return diff > 0 ? diff : 0;
  }, [currentBand, targetBand]);

  const totalStudyHours = useMemo(() => {
    return weeksRemaining * 7 * dailyHours;
  }, [weeksRemaining, dailyHours]);

  const completedCount = useMemo(() => tasks.filter((t) => t.completed).length, [tasks]);
  const progressPercent = useMemo(
    () => (tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100)),
    [completedCount, tasks.length]
  );

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addTask() {
    if (!newTaskText.trim()) return;
    const newTask: DailyTask = {
      id: `task-${Date.now()}`,
      text: newTaskText.trim(),
      module: newTaskModule,
      durationMinutes: 20,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setNewTaskText("");
  }

  function resetDefaultTasks() {
    setTasks(DEFAULT_TASKS);
  }

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Strategic preparation blueprint"
        title="IELTS target band study roadmap"
        description="Reverse-engineered preparation strategy based on Cambridge assessment standards. Configure your target band, timeline, and daily routine, then work through the checklist below."
        actions={
          <>
            <Link href="/calculator" className="btn-secondary">
              <Calculator className="h-4 w-4 text-surface-500" />
              <span>Score calculator</span>
            </Link>
            <Link href="/tests?type=ACADEMIC" className="btn-primary">
              <span>Browse mocks</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        }
      />

      {/* Snapshot */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Current band" value={currentBand.toFixed(1)} hint="Latest estimate" Icon={Gauge} />
        <StatCard label="Target band" value={targetBand.toFixed(1)} hint={`${bandGap.toFixed(1)} band to gain`} Icon={Target} />
        <StatCard label="Study window" value={`${weeksRemaining} wk`} hint="Until test day" Icon={CalendarDays} />
        <StatCard label="Daily commitment" value={`${dailyHours} h`} hint={`${totalStudyHours} hrs total`} Icon={Clock} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left column: configurator, strategy, weighting */}
        <div className="space-y-6 lg:col-span-5">
          <section className="card p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Compass className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight text-surface-900">
                  Your exam profile &amp; goals
                </h2>
                <p className="mt-0.5 text-[13px] leading-relaxed text-surface-500">
                  Adjust your target and routine — everything saves automatically.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* Exam format */}
              <div>
                <span className="label">Exam version</span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setExamType("ACADEMIC")}
                    className={`cursor-pointer rounded-xl border px-3.5 py-3 text-left text-[13px] font-semibold transition ${
                      examType === "ACADEMIC"
                        ? "border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/10"
                        : "border-surface-200 bg-white text-surface-600 hover:border-surface-300 hover:bg-surface-50"
                    }`}
                  >
                    Academic (University/Reg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExamType("GENERAL")}
                    className={`cursor-pointer rounded-xl border px-3.5 py-3 text-left text-[13px] font-semibold transition ${
                      examType === "GENERAL"
                        ? "border-brand-500 bg-brand-50 text-brand-700 ring-2 ring-brand-500/10"
                        : "border-surface-200 bg-white text-surface-600 hover:border-surface-300 hover:bg-surface-50"
                    }`}
                  >
                    General Training (PR/Work)
                  </button>
                </div>
              </div>

              {/* Band jump sliders */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SliderField
                  label="Current band"
                  value={currentBand.toFixed(1)}
                  min={4.5}
                  max={8.5}
                  step={0.5}
                  raw={currentBand}
                  onChange={(v) => setCurrentBand(v)}
                />
                <SliderField
                  label="Target band"
                  value={targetBand.toFixed(1)}
                  min={5.5}
                  max={9}
                  step={0.5}
                  raw={targetBand}
                  onChange={(v) => setTargetBand(v)}
                />
              </div>

              {/* Timeline & daily commitment */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SliderField
                  label="Weeks until test"
                  value={`${weeksRemaining} wks`}
                  min={1}
                  max={16}
                  step={1}
                  raw={weeksRemaining}
                  onChange={(v) => setWeeksRemaining(v)}
                />
                <SliderField
                  label="Daily study time"
                  value={`${dailyHours} hrs/day`}
                  min={1}
                  max={6}
                  step={0.5}
                  raw={dailyHours}
                  onChange={(v) => setDailyHours(v)}
                />
              </div>

              {/* Priority weakness focus */}
              <div>
                <span className="label">Primary priority module</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {["Writing", "Reading", "Listening", "Speaking"].map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setWeakestModule(mod)}
                      className={`cursor-pointer rounded-xl border px-2 py-2 text-[13px] font-semibold transition ${
                        weakestModule === mod
                          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                          : "border-surface-200 bg-surface-50 text-surface-600 hover:border-surface-300 hover:bg-surface-100 hover:text-surface-900"
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Feasibility & strategy summary */}
          <section className="relative overflow-hidden rounded-2xl border border-brand-200/70 bg-gradient-to-br from-white via-brand-50/70 to-white p-6">
            <div className="pointer-events-none absolute inset-0 bg-subtle-dots opacity-20" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow text-brand-700">Band gap strategy</span>
                <span className="badge-brand">+{bandGap.toFixed(1)} band required</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl border border-brand-100 bg-white p-4">
                  <div className="font-display text-2xl font-extrabold tabular-nums text-brand-700">
                    {totalStudyHours} hrs
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-surface-500">Total study time</div>
                </div>
                <div className="rounded-xl border border-brand-100 bg-white p-4">
                  <div className="font-display text-2xl font-extrabold tabular-nums text-brand-700">
                    {Math.round(totalStudyHours / (weeksRemaining || 1))} hrs
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-surface-500">Weekly target</div>
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-surface-600">
                💡 <strong className="font-semibold text-surface-800">Cambridge research rule:</strong> Each
                0.5 band increase typically requires ~60 to 80 hours of guided practice and active review.
              </p>

              {bandGap > 1.0 && weeksRemaining < 3 && (
                <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[13px] font-medium leading-relaxed text-amber-800">
                  ⚠️ Ambitious timeline: consider increasing daily hours or extending your target exam
                  date for maximum score security.
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800 hover:underline"
                >
                  Score calculator <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-surface-300">·</span>
                <Link
                  href="/band-descriptors"
                  className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800 hover:underline"
                >
                  Band descriptors <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* Module weighting recommendation */}
          <section className="card p-6">
            <h3 className="eyebrow">Recommended weekly time split</h3>
            <div className="mt-4 space-y-4">
              <WeightRow label={`${weakestModule} (target weakness)`} pct={40} color="bg-brand-500" strong />
              <WeightRow label="Reading & academic lexicon" pct={25} color="bg-emerald-500" />
              <WeightRow label="Listening accent acclimatization" pct={20} color="bg-sky-500" />
              <WeightRow label="Speaking Part 2 & fluency" pct={15} color="bg-amber-500" />
            </div>
          </section>
        </div>

        {/* Right column: checklist, curriculum, CTA */}
        <div className="space-y-6 lg:col-span-7">
          <section className="card p-6 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-surface-100 pb-5">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ListTodo className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold tracking-tight text-surface-900">
                    Today&apos;s preparation checklist
                  </h2>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-surface-500">
                    Check off items as you complete them. Progress is saved automatically.
                  </p>
                </div>
              </div>
              <button
                onClick={resetDefaultTasks}
                className="btn-ghost btn-sm"
                title="Reset to recommended tasks"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-baseline justify-between gap-2 text-[13px]">
                <span className="font-semibold text-surface-700">
                  {completedCount} of {tasks.length} tasks completed
                </span>
                <span className="font-display text-sm font-bold tabular-nums text-brand-600">
                  {progressPercent}%
                </span>
              </div>
              <ProgressBar value={progressPercent} className="mt-2 h-2.5" />
            </div>

            {tasks.length === 0 ? (
              <div className="mt-6">
                <EmptyState
                  Icon={ListTodo}
                  title="Your checklist is empty"
                  description="Add a custom task below or restore the recommended daily routine to get started."
                  action={
                    <button onClick={resetDefaultTasks} className="btn-secondary btn-sm">
                      <RefreshCw className="h-3.5 w-3.5" />
                      Restore recommended tasks
                    </button>
                  }
                />
              </div>
            ) : (
              <div className="mt-5 space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`group flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-4 transition ${
                      task.completed
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-surface-200/90 bg-white hover:border-surface-300 hover:bg-surface-50/60"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <div className="h-5 w-5 rounded-md border-2 border-surface-300 transition group-hover:border-brand-500" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-[15px] leading-relaxed ${
                            task.completed
                              ? "text-surface-500 line-through"
                              : "font-medium text-surface-800"
                          }`}
                        >
                          {task.text}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className={`badge border ${MODULE_TONES[task.module]}`}>
                            {task.module}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-surface-500">
                            <Clock className="h-3.5 w-3.5" />
                            {task.durationMinutes} mins
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      className="shrink-0 rounded-lg p-1.5 text-surface-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add custom task */}
            <div className="mt-5 rounded-xl border border-surface-200 bg-surface-50/70 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="text"
                  placeholder="Add custom task (e.g., 'Review Cambridge 18 Reading 2 error log')..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                  className="input flex-1 text-[13px]"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={newTaskModule}
                    onChange={(e) => setNewTaskModule(e.target.value as DailyTask["module"])}
                    className="input w-full py-2.5 text-[13px] sm:w-32"
                  >
                    <option value="Reading">Reading</option>
                    <option value="Writing">Writing</option>
                    <option value="Listening">Listening</option>
                    <option value="Speaking">Speaking</option>
                    <option value="General">General</option>
                  </select>
                  <button
                    type="button"
                    onClick={addTask}
                    className="btn-primary shrink-0 px-4 py-2.5 text-[13px]"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Four-phase curriculum */}
          <section className="card p-6 sm:p-7">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight text-surface-900">
                  Four-phase IELTS mastery curriculum
                </h2>
                <p className="mt-0.5 text-[13px] leading-relaxed text-surface-500">
                  A structured four-week pathway from diagnostic baseline to exam-day conditioning.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {PHASES.map((phase, i) => (
                <div key={phase.title} className="surface-panel p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-200 bg-white font-display text-[13px] font-bold text-brand-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="text-[13px] font-bold uppercase tracking-wide text-brand-700">
                          {phase.title}
                        </div>
                        <h3 className="mt-1 font-display text-[15px] font-bold leading-snug text-surface-900">
                          {phase.subtitle}
                        </h3>
                      </div>
                    </div>
                    <span className="badge-neutral shrink-0">{phase.range}</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 pl-11 text-[13px] leading-relaxed text-surface-600">
                    {phase.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Quick launch */}
          <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-200/70 bg-gradient-to-br from-white to-brand-50 p-6 sm:flex-row sm:items-center">
            <div>
              <div className="font-display text-[15px] font-bold text-surface-900">
                Ready to put your roadmap into action?
              </div>
              <p className="mt-0.5 text-[13px] leading-relaxed text-surface-500">
                Jump right into authentic Cambridge mock tests with instant AI scoring.
              </p>
            </div>
            <Link href="/tests?type=ACADEMIC" className="btn-primary shrink-0">
              Browse Cambridge mocks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step,
  raw,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  raw: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-surface-50/70 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold text-surface-600">{label}</span>
        <span className="rounded-md bg-white px-2 py-0.5 font-display text-[13px] font-bold tabular-nums text-brand-700 ring-1 ring-surface-200">
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={raw}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2.5 w-full cursor-pointer accent-brand-600"
      />
    </div>
  );
}

function WeightRow({
  label,
  pct,
  color,
  strong,
}: {
  label: string;
  pct: number;
  color: string;
  strong?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-[13px]">
        <span className={strong ? "font-semibold text-surface-800" : "font-medium text-surface-600"}>
          {label}
        </span>
        <span className="font-display text-[13px] font-bold tabular-nums text-surface-500">{pct}%</span>
      </div>
      <ProgressBar value={pct} color={color} className="mt-1.5" />
    </div>
  );
}
