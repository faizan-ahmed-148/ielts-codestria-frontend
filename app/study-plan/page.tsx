"use client";

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  GraduationCap,
  Headphones,
  ListTodo,
  Mic,
  PenTool,
  Plus,
  RefreshCw,
  Sparkles,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

  const moduleColors: Record<DailyTask["module"], string> = {
    Listening: "bg-blue-50 text-blue-700 border-blue-200",
    Reading: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Writing: "bg-purple-50 text-purple-700 border-purple-200",
    Speaking: "bg-amber-50 text-amber-700 border-amber-200",
    General: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
            <Target className="h-3.5 w-3.5 text-blue-600" />
            <span>Strategic Preparation Blueprint</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
            by Codestria
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          IELTS Target Band Study Roadmap
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Reverse-engineered preparation strategy based on Cambridge assessment standards. Configure your target band, timeline, and daily routine.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Configurator & Diagnostic Analytics */}
        <div className="space-y-6 lg:col-span-5">
          {/* Diagnostic Setup Card */}
          <div className="card p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="h-4 w-4 text-brand-600" />
              Your Exam Profile & Goals
            </h2>

            <div className="mt-5 space-y-4">
              {/* Exam Format */}
              <div>
                <label className="text-xs font-semibold text-slate-600">Exam Version</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExamType("ACADEMIC")}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      examType === "ACADEMIC"
                        ? "border-brand-600 bg-brand-50 text-brand-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    Academic (University/Reg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExamType("GENERAL")}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      examType === "GENERAL"
                        ? "border-brand-600 bg-brand-50 text-brand-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    General Training (PR/Work)
                  </button>
                </div>
              </div>

              {/* Band Jump Sliders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Current Band</span>
                    <span className="font-bold text-brand-600">{currentBand.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="4.5"
                    max="8.5"
                    step="0.5"
                    value={currentBand}
                    onChange={(e) => setCurrentBand(parseFloat(e.target.value))}
                    className="mt-2 w-full accent-brand-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Target Band</span>
                    <span className="font-bold text-brand-600">{targetBand.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="5.5"
                    max="9.0"
                    step="0.5"
                    value={targetBand}
                    onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                    className="mt-2 w-full accent-brand-600"
                  />
                </div>
              </div>

              {/* Timeline & Daily Commitment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Weeks Until Test</span>
                    <span className="font-bold text-slate-900">{weeksRemaining} wks</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    step="1"
                    value={weeksRemaining}
                    onChange={(e) => setWeeksRemaining(parseInt(e.target.value))}
                    className="mt-2 w-full accent-brand-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>Daily Study Time</span>
                    <span className="font-bold text-slate-900">{dailyHours} hrs/day</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(parseFloat(e.target.value))}
                    className="mt-2 w-full accent-brand-600"
                  />
                </div>
              </div>

              {/* Priority Weakness Focus */}
              <div>
                <label className="text-xs font-semibold text-slate-600">Primary Priority Module</label>
                <div className="mt-1.5 grid grid-cols-4 gap-1.5 text-xs">
                  {["Writing", "Reading", "Listening", "Speaking"].map((mod) => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => setWeakestModule(mod)}
                      className={`rounded-lg border px-2 py-1.5 font-medium transition ${
                        weakestModule === mod
                          ? "border-brand-600 bg-brand-600 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {mod}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feasibility & Strategy Blueprint Summary */}
          <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/70 to-indigo-50/40 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-brand-700 uppercase">
                Band Gap Strategy
              </span>
              <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                +{bandGap} Band Required
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl bg-white p-3 shadow-xs border border-brand-100">
                <div className="text-xl font-extrabold text-brand-700">{totalStudyHours} hrs</div>
                <div className="text-[11px] text-slate-500">Total Study Time</div>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-xs border border-brand-100">
                <div className="text-xl font-extrabold text-brand-700">
                  {Math.round(totalStudyHours / (weeksRemaining || 1))} hrs
                </div>
                <div className="text-[11px] text-slate-500">Weekly Target</div>
              </div>
            </div>

            {/* Assessment rule of thumb */}
            <p className="mt-4 text-xs leading-relaxed text-slate-600">
              💡 <strong>Cambridge Research Rule:</strong> Each 0.5 band increase typically requires ~60 to 80 hours of guided practice and active review.
              {bandGap > 1.0 && weeksRemaining < 3 && (
                <span className="mt-1 block font-semibold text-amber-700">
                  ⚠️ Ambitious timeline: Consider increasing daily hours or extending your target exam date for maximum score security.
                </span>
              )}
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Link href="/calculator" className="text-brand-700 hover:underline font-semibold flex items-center gap-1">
                Score Calculator <ArrowRight className="h-3 w-3" />
              </Link>
              <span className="text-slate-300">·</span>
              <Link href="/band-descriptors" className="text-brand-700 hover:underline font-semibold flex items-center gap-1">
                Band Descriptors <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Module Weighting Recommendation */}
          <div className="card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recommended Weekly Time Split
            </h3>
            <div className="mt-3 space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{weakestModule} (Target Weakness)</span>
                  <span>40%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-brand-600 rounded-full" style={{ width: "40%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Reading & Academic Lexicon</span>
                  <span>25%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Listening Accent Acclimatization</span>
                  <span>20%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-medium text-slate-600">
                  <span>Speaking Part 2 & Fluency</span>
                  <span>15%</span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "15%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Daily Checklist & Milestone Curriculum */}
        <div className="space-y-6 lg:col-span-7">
          {/* Daily Active Checklist */}
          <div className="card p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ListTodo className="h-5 w-5 text-brand-600" />
                  Today's Preparation Checklist
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check off items as you complete them. Progress is saved automatically.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetDefaultTasks}
                  className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-50"
                  title="Reset to recommended tasks"
                >
                  <RefreshCw className="h-3 w-3 inline mr-1" />
                  Reset
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>
                  {completedCount} of {tasks.length} tasks completed
                </span>
                <span className="text-brand-600 font-bold">{progressPercent}%</span>
              </div>
              <div className="mt-1.5 h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Task list */}
            <div className="mt-5 space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`group flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 transition ${
                    task.completed
                      ? "border-emerald-200 bg-emerald-50/50"
                      : "border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <div className="h-5 w-5 rounded-md border-2 border-slate-300 group-hover:border-brand-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-sm ${
                          task.completed
                            ? "text-slate-500 line-through"
                            : "font-medium text-slate-800"
                        }`}
                      >
                        {task.text}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                            moduleColors[task.module]
                          }`}
                        >
                          {task.module}
                        </span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
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
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition"
                    title="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Task */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Add custom task (e.g., 'Review Cambridge 18 Reading 2 error log')..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="input text-xs"
              />
              <select
                value={newTaskModule}
                onChange={(e) => setNewTaskModule(e.target.value as any)}
                className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-700 outline-none"
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
                className="btn-primary w-full sm:w-auto px-4 py-2 text-xs flex items-center justify-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
            </div>
          </div>

          {/* 4-Phase Curriculum Roadmap */}
          <div className="card p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-600" />
              Four-Phase IELTS Mastery Curriculum
            </h2>
            <div className="mt-4 space-y-4">
              {/* Phase 1 */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                    Phase 1: Foundation & Diagnostic Baseline
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Days 1 - 7</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-slate-900">
                  Question Format Familiarity & Strategy Mapping
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                  <li>Take full diagnostic mock under timed conditions to identify weak question types.</li>
                  <li>Master True/False/Not Given vs Yes/No/Not Given reading logic.</li>
                  <li>Learn the standard PEEL (Point, Explanation, Example, Link) paragraph model for Writing Task 2.</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                    Phase 2: Speed & Lexical Resource Expansion
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Days 8 - 14</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-slate-900">
                  Academic Word List & Skimming / Scanning Techniques
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                  <li>Study 100+ high-frequency Academic Collocations across Environment, Tech, and Education.</li>
                  <li>Practice keyword transformation and map-diagram labelling for Listening Part 2 & 3.</li>
                  <li>Draft 5 timed Task 1 overviews (Line, Bar, Process) ensuring no data points are missed.</li>
                </ul>
              </div>

              {/* Phase 3 */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                    Phase 3: Examiner Criteria Calibration
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Days 15 - 21</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-slate-900">
                  Writing Cohesion, Complex Sentences & Part 2 Long Turn
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                  <li>Simulate Speaking Part 2 cue cards using 1-min notes strategy and uninterrupted 2-min delivery.</li>
                  <li>Analyze Band 9 model essays and contrast against Band 6 cohesive device pitfalls.</li>
                  <li>Eliminate recurring grammatical slips: subject-verb agreement, articles (a/an/the), and tense shifts.</li>
                </ul>
              </div>

              {/* Phase 4 */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                    Phase 4: Full-Length Exam Conditioning
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Final Week</span>
                </div>
                <h4 className="mt-1 text-sm font-semibold text-slate-900">
                  Simulated 2h 45m CD-IELTS Environment & Rest
                </h4>
                <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc list-inside">
                  <li>Complete 2 complete mock tests non-stop without pausing to build cognitive stamina.</li>
                  <li>Practice typing essays in the CD-IELTS simulation runner with word count tracking.</li>
                  <li>Rest the final 24 hours before test day to optimize memory retrieval and focus.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Launch Practice CTA */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="font-bold text-slate-900 text-sm">Ready to put your roadmap into action?</div>
              <p className="text-xs text-slate-500">Jump right into authentic Cambridge mock tests with instant AI scoring.</p>
            </div>
            <Link href="/tests?type=ACADEMIC" className="btn-primary text-xs shrink-0 flex items-center gap-2">
              Browse Cambridge Mocks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
