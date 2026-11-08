"use client";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  GraduationCap,
  HelpCircle,
  Loader2,
  Lock,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BandBadge, BandRing, ErrorBox, MODULE_INFO, MODULE_ORDER, ModuleIcon, ProgressBar, Skeleton, StatusPill } from "@/components/ui";
import type { TestOverview } from "@/lib/api";
import type { ModuleKind } from "@/lib/content.types";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-library";
import { createAttempt, fetchTestOverview } from "@/lib/test-runner-service";

export default function TestPage() {
  return <TestView />;
}

function TestView() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [test, setTest] = useState<TestOverview | null>(null);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState<ModuleKind | null>(null);

  useEffect(() => {
    fetchTestOverview(id)
      .then(setTest)
      .catch((e) => setError(e.message));
  }, [id]);

  async function start(module: ModuleKind) {
    setStarting(module);
    try {
      const { id: attemptId } = await createAttempt(id, module);
      router.push(`/attempt/${attemptId}`);
    } catch (e) {
      setError((e as Error).message);
      setStarting(null);
    }
  }

  if (!test) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-8">
        {error ? (
          <ErrorBox message={error} />
        ) : (
          <>
            <Skeleton className="h-8 w-60" />
            <Skeleton className="h-40" />
            <div className="grid gap-4 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  const trackLabel = test.type === "ACADEMIC" ? "Academic" : "General Training";
  const bookMeta = CAMBRIDGE_BOOKS.find((b) => b.volume === test.book);
  const next =
    MODULE_ORDER.find((m) => test.modules[m].status === "IN_PROGRESS") ??
    MODULE_ORDER.find((m) => test.modules[m].band === null);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
        <Link href={`/tests?type=${test.type}`} className="hover:text-zinc-900 transition">
          {trackLabel} Library
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-zinc-600">Cambridge Book {test.book}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-zinc-900">Practice Test {test.testNumber}</span>
      </nav>

      {error && <ErrorBox message={error} />}

      {/* Test Hero Banner */}
      <section className="card rounded-xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-2xs overflow-hidden">
        <div className="grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="relative">
            <BandRing band={test.overallBand} size={110} label="Overall" />
            {test.overallBand === null && (
              <span
                className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-white shadow-xs"
                title="Overall band requires all 4 modules completed"
              >
                <Lock className="h-3.5 w-3.5" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-zinc-100 border border-zinc-200/70 px-2.5 py-0.5 text-[11px] font-bold text-zinc-800">
                Book {test.book}
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">{trackLabel}</span>
            </div>

            <h1 className="mt-1.5 text-xl sm:text-2xl font-bold text-zinc-900">
              Cambridge {test.book} · Practice Test {test.testNumber}
            </h1>

            {test.overallBand !== null ? (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <Trophy className="h-3.5 w-3.5 text-amber-500" /> All 4 exam modules completed. Overall score is unlocked.
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-zinc-500 max-w-xl leading-relaxed">
                Authentic CD-IELTS computer-delivered examination conditions. Your overall score unlocks after completing
                Listening, Reading, Writing, and Speaking.
              </p>
            )}

            <div className="mt-3.5 flex max-w-md items-center gap-3">
              <ProgressBar
                value={(test.completedModules / 4) * 100}
                className="flex-1 h-2"
                color="bg-zinc-900"
              />
              <span className="text-xs font-semibold text-zinc-700">{test.completedModules}/4 Modules</span>
            </div>
          </div>

          {next && (
            <div className="flex flex-col gap-1.5 md:items-end">
              <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Recommended Next</span>
              {test.modules[next].status === "IN_PROGRESS" ? (
                <Link
                  href={`/attempt/${test.modules[next].attemptId}`}
                  className="btn btn-primary px-4 py-2 text-xs font-semibold shadow-xs"
                >
                  <span>Resume {MODULE_INFO[next].label}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <button
                  onClick={() => start(next)}
                  disabled={starting !== null}
                  className="btn btn-primary px-4 py-2 text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {starting === next ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                  <span>Start {MODULE_INFO[next].label}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4 Modules Interactive Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wide">Examination Modules</h2>
          <span className="text-xs text-zinc-500">Pick any module to practice independently or sequentially</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {MODULE_ORDER.map((m) => {
            const p = test.modules[m];
            const info = MODULE_INFO[m];
            const isDone = p.band !== null || p.status === "COMPLETED";
            const inProgress = p.status === "IN_PROGRESS";
            const duration = test.durations[m] || 60;

            return (
              <div
                key={m}
                className="card flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-5 shadow-2xs hover:border-zinc-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ModuleIcon module={m} size="md" />
                      <div>
                        <h3 className="text-sm font-bold text-zinc-900">{info.label} Module</h3>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {duration} min
                          </span>
                          <span>·</span>
                          <span>
                            {m === "READING"
                              ? "3 Passages · 40 Qs"
                              : m === "LISTENING"
                                ? "4 Parts · 40 Qs"
                                : m === "WRITING"
                                  ? "Task 1 & Task 2"
                                  : "Parts 1, 2 & 3"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isDone ? (
                      <span className="flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Band {p.band?.toFixed(1) ?? "–"}
                      </span>
                    ) : inProgress ? (
                      <span className="rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        In progress
                      </span>
                    ) : (
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500">
                        Ready
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-zinc-600">
                    {m === "READING"
                      ? "Official split-screen reader with highlightable text, matching headings, summary gaps, and True/False/Not Given questions."
                      : m === "LISTENING"
                        ? "Audio simulation with audio controls, speech-rate adjustment, live transcripts, and automatic raw-to-band conversion."
                        : m === "WRITING"
                          ? "Official IELTS essay pad with live word-counter requirements, dynamic data charts, and Band 9 examiner criteria breakdown."
                          : "Interactive speaking room with real-time speech recognition, 60s Part 2 cue-card prep notepad, and examiner follow-up questions."}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3.5">
                  {p.completedAttemptId ? (
                    <Link
                      href={`/attempt/${p.completedAttemptId}/result`}
                      className="text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition flex items-center gap-1"
                    >
                      <span>Review Score & Answers</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="text-xs text-zinc-400">Not completed yet</span>
                  )}

                  {inProgress ? (
                    <Link
                      href={`/attempt/${p.attemptId}`}
                      className="btn btn-primary px-3 py-1.5 text-xs font-semibold"
                    >
                      <span>Resume</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : isDone ? (
                    <button
                      onClick={() => start(m)}
                      disabled={starting !== null}
                      className="btn btn-secondary px-3 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      {starting === m ? <Loader2 className="h-3 w-3 animate-spin" /> : <RotateCcw className="h-3 w-3" />}
                      <span>Retake</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => start(m)}
                      disabled={starting !== null}
                      className="btn btn-primary px-3 py-1.5 text-xs font-semibold cursor-pointer"
                    >
                      {starting === m ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                      <span>Start Module</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
