"use client";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Loader2,
  Lock,
  RotateCcw,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BandRing,
  ErrorBox,
  MODULE_INFO,
  MODULE_ORDER,
  ModuleIcon,
  ProgressBar,
  Skeleton,
} from "@/components/ui";
import type { TestOverview } from "@/lib/api";
import { analyticsSessionId } from "@/lib/analytics";
import type { ModuleKind } from "@/lib/content.types";
import { createAttempt, fetchTestOverview } from "@/lib/test-runner-service";

export default function TestPageClient({ initialTest = null }: { initialTest?: TestOverview | null }) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [test, setTest] = useState<TestOverview | null>(initialTest);
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
      const { id: attemptId } = await createAttempt(id, module, {
        sessionId: analyticsSessionId(),
        clientMeta: {
          viewport:
            typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : undefined,
          locale: typeof navigator !== "undefined" ? navigator.language : undefined,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 250) : undefined,
        },
      });
      router.push(`/attempt/${attemptId}`);
    } catch (e) {
      setError((e as Error).message);
      setStarting(null);
    }
  }

  if (!test) {
    return (
      <div className="page-container space-y-6 py-8 sm:py-10">
        {error ? (
          <ErrorBox message={error} />
        ) : (
          <>
            <Skeleton className="h-6 w-60" />
            <Skeleton className="h-44" />
            <div className="grid gap-4 md:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-52" />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  const trackLabel = test.type === "ACADEMIC" ? "Academic" : "General Training";
  const next =
    MODULE_ORDER.find((m) => test.modules[m].status === "IN_PROGRESS") ??
    MODULE_ORDER.find((m) => test.modules[m].band === null);

  return (
    <div className="page-container space-y-8 pt-8 pb-8 sm:pt-10">
      <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-surface-500">
        <Link href={`/tests?type=${test.type}`} className="transition hover:text-surface-900">
          {trackLabel} library
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-surface-300" />
        <span>Book {test.book}</span>
        <ChevronRight className="h-3.5 w-3.5 text-surface-300" />
        <span className="font-semibold text-surface-900">Practice Test {test.testNumber}</span>
      </nav>

      {error && <ErrorBox message={error} />}

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-brand-200/60 bg-gradient-to-br from-white via-brand-50/60 to-white p-6 shadow-[0_24px_60px_-45px_rgba(67,86,232,0.45)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-subtle-dots opacity-20" />
        <div className="relative grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="relative justify-self-start">
            <BandRing band={test.overallBand} size={112} label="Overall" />
            {test.overallBand === null && (
              <span
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-surface-900 text-white shadow-sm"
                title="Overall band requires all 4 modules completed"
              >
                <Lock className="h-3.5 w-3.5" />
              </span>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-neutral">Book {test.book}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-500">
                {trackLabel}
              </span>
            </div>

            <h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-surface-900 sm:text-[1.75rem]">
              IELTS {trackLabel} Practice Test · Book {test.book} Test {test.testNumber}
            </h1>

            {test.overallBand !== null ? (
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                <Trophy className="h-4 w-4 text-amber-500" />
                All four modules complete — your overall band is unlocked.
              </p>
            ) : (
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-surface-600">
                Sit the paper in the computer-delivered exam format. Your overall score
                unlocks once Listening, Reading, Writing and Speaking are complete.
              </p>
            )}

            <div className="mt-4 flex max-w-md items-center gap-3">
              <ProgressBar
                value={(test.completedModules / 4) * 100}
                className="h-2 flex-1"
                color="bg-brand-500"
              />
              <span className="shrink-0 text-xs font-semibold text-surface-600">
                {test.completedModules}/4 modules
              </span>
            </div>
          </div>

          {next && (
            <div className="flex flex-col gap-2 md:items-end">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-400">
                Recommended next
              </span>
              {test.modules[next].status === "IN_PROGRESS" ? (
                <Link href={`/attempt/${test.modules[next].attemptId}`} className="btn-primary py-2.5">
                  <span>Resume {MODULE_INFO[next].label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={() => start(next)}
                  disabled={starting !== null}
                  className="btn-primary cursor-pointer py-2.5"
                >
                  {starting === next && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>Start {MODULE_INFO[next].label}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modules */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-bold text-surface-900">Examination modules</h2>
            <p className="text-sm text-surface-500">
              Take the modules in order, or practise any skill independently.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {MODULE_ORDER.map((m) => {
            const p = test.modules[m];
            const info = MODULE_INFO[m];
            const isDone = p.band !== null || p.status === "COMPLETED";
            const inProgress = p.status === "IN_PROGRESS";
            const duration = test.durations[m] || 60;

            return (
              <div key={m} className="card flex flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <ModuleIcon module={m} size="md" />
                      <div>
                        <h3 className="text-[15px] font-bold text-surface-900">{info.label}</h3>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-surface-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {duration} min
                          </span>
                          <span className="text-surface-300">·</span>
                          <span>
                            {m === "READING"
                              ? "3 passages · 40 questions"
                              : m === "LISTENING"
                                ? "4 parts · 40 questions"
                                : m === "WRITING"
                                  ? "Task 1 & Task 2"
                                  : "Parts 1, 2 & 3"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {p.band !== null ? (
                      <span className="badge-success shrink-0">
                        <CheckCircle2 className="h-3 w-3" />
                        Band {p.band.toFixed(1)}
                      </span>
                    ) : isDone ? (
                      <span className="badge-warning shrink-0">AI key required</span>
                    ) : inProgress ? (
                      <span className="badge-warning shrink-0">In progress</span>
                    ) : (
                      <span className="badge-neutral shrink-0">Ready</span>
                    )}
                  </div>

                  <p className="mt-3.5 text-[13.5px] leading-relaxed text-surface-600">
                    {m === "READING"
                      ? "Split-screen reader with three-colour highlighting, matching headings, summary gaps and True / False / Not Given."
                      : m === "LISTENING"
                        ? "Recorded audio with playback controls, speech-rate adjustment and automatic raw-to-band conversion."
                        : m === "WRITING"
                          ? "Exam-style essay pad with live word counters, data charts and an examiner criteria breakdown."
                          : "Interactive speaking room with speech recognition, a 60-second cue-card pad and follow-up questions."}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-surface-100 pt-4">
                  {p.completedAttemptId ? (
                    <Link
                      href={`/attempt/${p.completedAttemptId}/result`}
                      className="flex items-center gap-1 text-[13px] font-semibold text-surface-600 transition hover:text-surface-900"
                    >
                      <span>Review answers</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="text-[13px] text-surface-400">Not completed yet</span>
                  )}

                  {inProgress ? (
                    <Link href={`/attempt/${p.attemptId}`} className="btn-primary btn-sm">
                      <span>Resume</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : isDone ? (
                    <button
                      onClick={() => start(m)}
                      disabled={starting !== null}
                      className="btn-secondary btn-sm cursor-pointer"
                    >
                      {starting === m ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <RotateCcw className="h-3.5 w-3.5" />
                      )}
                      <span>Retake</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => start(m)}
                      disabled={starting !== null}
                      className="btn-primary btn-sm cursor-pointer"
                    >
                      {starting === m && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      <span>Start module</span>
                      <ArrowRight className="h-4 w-4" />
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
