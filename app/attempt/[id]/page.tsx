"use client";

import {
  AlertTriangle,
  Check,
  Clock,
  CloudOff,
  Eye,
  EyeOff,
  FileText,
  Flag,
  Loader2,
  Palette,
  ShieldAlert,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PageSpinner, useAuth } from "@/components/AuthProvider";
import { countQuestions } from "@/components/Questions";
import { ObjectiveRunner } from "@/components/runners/ObjectiveRunner";
import { type SpeakingAnswer, SpeakingRunner, speakingItems } from "@/components/runners/SpeakingRunner";
import { WritingRunner } from "@/components/runners/WritingRunner";
import { ErrorBox, MODULE_INFO, ModuleIcon, wordCount } from "@/components/ui";
import type { Attempt } from "@/lib/api";
import type { ListeningContent, ReadingContent, SpeakingContent, WritingContent } from "@/lib/content.types";
import { getAttemptDetails, patchAttemptAnswers, submitExamAttempt } from "@/lib/test-runner-service";

const AUTOSAVE_MS = 2000;

export default function AttemptPage() {
  return <ExamView />;
}

function ExamView() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");
  const [saveState, setSaveState] = useState<"saved" | "dirty" | "saving" | "error">("saved");
  const [submitting, setSubmitting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [hideTimer, setHideTimer] = useState(false);
  const [timeWarning, setTimeWarning] = useState<string | null>(null);

  const answersRef = useRef(answers);
  answersRef.current = answers;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNotes = localStorage.getItem(`ielts_notes_${id}`);
      if (savedNotes) setNotes(savedNotes);
    }
  }, [id]);

  const updateNotes = (val: string) => {
    setNotes(val);
    if (typeof window !== "undefined") {
      localStorage.setItem(`ielts_notes_${id}`, val);
    }
  };

  useEffect(() => {
    getAttemptDetails(id)
      .then((a) => {
        if (a.status !== "IN_PROGRESS") return router.replace(`/attempt/${id}/result`);
        setAttempt(a);
        setAnswers(a.answers ?? {});
      })
      .catch((e) => setError(e.message));
  }, [id, router]);

  const update = useCallback((key: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setSaveState("dirty");
  }, []);

  // Debounced autosave
  useEffect(() => {
    if (saveState !== "dirty") return;
    const t = setTimeout(async () => {
      setSaveState("saving");
      try {
        await patchAttemptAnswers(id, answersRef.current);
        setSaveState((s) => (s === "saving" ? "saved" : s));
      } catch {
        setSaveState("error");
      }
    }, AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [answers, saveState, id]);

  // Warn before leaving with unsaved work
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (saveState !== "saved" && !submitting) e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveState, submitting]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setConfirm(false);
    try {
      window.speechSynthesis?.cancel();
      await submitExamAttempt(id, answersRef.current);
      router.replace(`/attempt/${id}/result`);
    } catch (e) {
      setError((e as Error).message);
      setSubmitting(false);
    }
  }, [id, router]);

  if (error && !attempt) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <ErrorBox message={error} />
      </div>
    );
  }

  if (!attempt) return <PageSpinner />;

  const info = MODULE_INFO[attempt.module];
  const summary = progressSummary(attempt, answers);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] transition-colors duration-150">
      {/* Official CD-IELTS 10-min and 5-min Warning Banner */}
      {timeWarning && (
        <div className="flex items-center justify-between bg-amber-500 px-4 py-2 font-bold text-white shadow-md animate-fade-up">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4" />
            <span>{timeWarning}</span>
          </div>
          <button onClick={() => setTimeWarning(null)} className="rounded p-0.5 hover:bg-amber-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Official Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="flex h-16 items-center gap-2 px-3 sm:gap-4 sm:px-6">
          <Link
            href={`/tests/${attempt.test.id}`}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            title="Exit test (answers autosaved)"
            aria-label="Exit test"
          >
            <X className="h-5 w-5" />
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 pr-3 border-r border-slate-200 hover:opacity-80 transition"
            title="Codestria IELTS CD Simulator (Home)"
          >
            <span className="font-black text-xs tracking-tight text-slate-900">
              Codestria<span className="text-brand-600">.</span>
            </span>
            <span className="rounded bg-brand-50 px-1 py-0.5 text-[9px] font-extrabold text-brand-700 uppercase">
              IELTS
            </span>
          </Link>

          <ModuleIcon module={attempt.module} size="sm" />

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <span className="truncate">{attempt.test.title}</span>
              <span>·</span>
              <span className="font-semibold text-slate-700">{info.label}</span>
              <SaveIndicator state={saveState} />
            </div>
            <div className="text-xs font-medium text-slate-500 sm:text-sm sm:font-semibold sm:text-slate-900">
              {summary.short}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            {/* Timer Toggle */}
            <div className="flex items-center">
              {!hideTimer && (
                <Timer
                  deadline={attempt.deadline}
                  onExpire={submit}
                  onWarning={(msg) => setTimeWarning(msg)}
                />
              )}
              <button
                onClick={() => setHideTimer((h) => !h)}
                className="ml-1 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                title={hideTimer ? "Show exam timer" : "Hide exam timer"}
                aria-label={hideTimer ? "Show exam timer" : "Hide exam timer"}
              >
                {hideTimer ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>

            <button
              onClick={() => setConfirm(true)}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Finish test
            </button>
          </div>
        </div>
      </header>

      {/* Main Runner Container */}
      <main className="flex min-h-0 flex-1 flex-col">
        {attempt.module === "READING" || attempt.module === "LISTENING" ? (
          <ObjectiveRunner
            content={attempt.content as ReadingContent | ListeningContent}
            answers={answers as Record<string, string>}
            setAnswer={update}
          />
        ) : attempt.module === "WRITING" ? (
          <WritingRunner
            content={attempt.content as WritingContent}
            answers={answers as { task1?: string; task2?: string }}
            setAnswer={update}
          />
        ) : (
          <SpeakingRunner
            content={attempt.content as SpeakingContent}
            answers={answers as Record<string, SpeakingAnswer>}
            setAnswer={update}
          />
        )}
      </main>

      {/* Confirmation Modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="card w-full max-w-md p-6 shadow-2xl animate-fade-up">
            <h2 className="text-xl font-bold text-slate-900">Submit your {info.label} test?</h2>
            <p className="mt-2 text-sm text-slate-600">{summary.long}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setConfirm(false)} className="btn-secondary">
                Continue test
              </button>
              <button onClick={submit} className="btn-primary">
                Confirm & submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function progressSummary(attempt: Attempt, answers: Record<string, unknown>) {
  if (attempt.module === "WRITING") {
    const c = attempt.content as WritingContent;
    const a = answers as { task1?: string; task2?: string };
    const w1 = wordCount(a?.task1),
      w2 = wordCount(a?.task2);
    const complete = w1 >= c.task1.minWords && w2 >= c.task2.minWords;
    return {
      complete,
      short: `${w1 + w2} words written`,
      long: `Task 1: ${w1} words (minimum ${c.task1.minWords}). Task 2: ${w2} words (minimum ${c.task2.minWords}).${
        complete ? "" : " Note: Under-length answers will be penalised under Task Achievement / Task Response."
      }`,
    };
  }
  if (attempt.module === "SPEAKING") {
    const items = speakingItems(attempt.content as SpeakingContent);
    const done = items.filter((i) => (answers[i.key] as SpeakingAnswer | undefined)?.transcript?.trim()).length;
    return {
      complete: done === items.length,
      short: `${done}/${items.length} responses recorded`,
      long: `You have completed ${done} of ${items.length} speaking prompts.`,
    };
  }
  const c = attempt.content as ReadingContent | ListeningContent;
  const sections = "passages" in c ? c.passages : c.parts;
  const ids = sections.flatMap((s) => s.groups.flatMap((g) => g.questions.map((q) => q.id)));
  const total = sections.reduce((s, x) => s + countQuestions(x.groups), 0);
  const done = ids.filter((qid) => String(answers[qid] ?? "").trim()).length;
  return {
    complete: done === total,
    short: `${done}/${total} answered`,
    long:
      done === total
        ? `You have answered all ${total} questions.`
        : `You have answered ${done} of ${total} questions. Unanswered questions receive 0 marks.`,
  };
}

function SaveIndicator({ state }: { state: "saved" | "dirty" | "saving" | "error" }) {
  const map = {
    saved: { Icon: Check, text: "Autosaved", cls: "text-emerald-600" },
    dirty: { Icon: Loader2, text: "Saving…", cls: "text-slate-400" },
    saving: { Icon: Loader2, text: "Saving…", cls: "text-slate-400" },
    error: { Icon: CloudOff, text: "Offline / Stored locally", cls: "text-amber-600" },
  }[state];
  return (
    <span className={`ml-2 hidden items-center gap-1 text-xs font-medium sm:flex ${map.cls}`}>
      <map.Icon className={`h-3.5 w-3.5 ${state === "saving" || state === "dirty" ? "animate-spin" : ""}`} /> {map.text}
    </span>
  );
}

function Timer({
  deadline,
  onExpire,
  onWarning,
}: {
  deadline: string;
  onExpire: () => void;
  onWarning?: (msg: string) => void;
}) {
  const end = new Date(deadline).getTime();
  const [left, setLeft] = useState(() => end - Date.now());
  const fired = useRef(false);
  const warned10 = useRef(false);
  const warned5 = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setLeft(end - Date.now()), 1000);
    return () => clearInterval(t);
  }, [end]);

  useEffect(() => {
    const secs = Math.max(0, Math.floor(left / 1000));
    if (secs <= 600 && secs > 590 && !warned10.current) {
      warned10.current = true;
      onWarning?.("10 minutes remaining: Please review all flagged questions and answers.");
    }
    if (secs <= 300 && secs > 290 && !warned5.current) {
      warned5.current = true;
      onWarning?.("5 minutes remaining: Ensure all required fields and questions are completed.");
    }
    if (left <= 0 && !fired.current) {
      fired.current = true;
      onExpire();
    }
  }, [left, onExpire, onWarning]);

  const secs = Math.max(0, Math.floor(left / 1000));
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const urgent = secs < 300;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-sm font-bold tabular-nums transition ${
        urgent ? "animate-pulse bg-red-100 text-red-700 ring-2 ring-red-300" : "bg-slate-100 text-slate-800"
      }`}
      title="Official Exam Clock"
    >
      <Clock className="h-4 w-4" /> {mm}:{ss}
    </div>
  );
}
