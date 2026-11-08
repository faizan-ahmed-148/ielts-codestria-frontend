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
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-40" />
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
  const bookMeta = CAMBRIDGE_BOOKS.find((b) => b.volume === test.book);
  const next =
    MODULE_ORDER.find((m) => test.modules[m].status === "IN_PROGRESS") ??
    MODULE_ORDER.find((m) => test.modules[m].band === null);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href={`/tests?type=${test.type}`} className="hover:text-slate-900 transition">
          {trackLabel} Library
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-600">Cambridge Book {test.book}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-slate-900">Practice Test {test.testNumber}</span>
      </nav>

      {error && <ErrorBox message={error} />}

      {/* Test Hero Banner */}
      <section className="card overflow-hidden shadow-xs">
        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="relative">
            <BandRing band={test.overallBand} size={128} label="Overall" />
            {test.overallBand === null && (
              <span
                className="absolute -right-1 -bottom-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-white shadow-sm"
                title="Overall band requires all 4 modules completed"
              >
                <Lock className="h-4 w-4" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: bookMeta?.coverAccent || "#4338ca" }}
              >
                Book {test.book}
              </span>
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">{trackLabel}</span>
            </div>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Cambridge {test.book} · Practice Test {test.testNumber}
            </h1>

            {test.overallBand !== null ? (
              <p className="mt-2 flex items-center gap-2 font-medium text-emerald-700">
                <Trophy className="h-4 w-4 text-amber-500" /> All 4 exam modules completed. Overall score is unlocked.
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-600">
                Authentic CD-IELTS computer-delivered examination conditions. Your overall score unlocks after completing
                Listening, Reading, Writing, and Speaking.
              </p>
            )}

            <div className="mt-4 flex max-w-md items-center gap-3">
              <ProgressBar
                value={(test.completedModules / 4) * 100}
                className="flex-1 h-2.5"
                color="bg-emerald-500"
              />
              <span className="text-xs font-bold text-slate-700">{test.completedModules}/4 Modules</span>
            </div>
          </div>

          {next && (
            <div className="flex flex-col gap-2 md:items-end">
              <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">Recommended Next</span>
              {test.modules[next].status === "IN_PROGRESS" ? (
                <Link
                  href={`/attempt/${test.modules[next].attemptId}`}
                  className="btn-primary btn-lg shadow-sm"
                >
                  Resume {MODULE_INFO[next].label} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <button
                  onClick={() => start(next)}
                  disabled={starting !== null}
                  className="btn-primary btn-lg shadow-sm"
                >
                  {starting === next ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Start {MODULE_INFO[next].label} <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 4 Modules Interactive Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Test Modules & Candidate Papers</h2>
          <span className="text-xs text-slate-500">Pick any module to practice independently or sequentially</span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {MODULE_ORDER.map((m) => {
            const p = test.modules[m];
            const info = MODULE_INFO[m];
            const isDone = p.band !== null || p.status === "COMPLETED";
            const inProgress = p.status === "IN_PROGRESS";
            const duration = test.durations[m] || 60;

            return (
              <div
                key={m}
                className="card flex flex-col justify-between p-6 transition-all duration-200 hover:border-brand-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ModuleIcon module={m} size="md" />
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{info.label} Module</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {duration} minutes
                          </span>
                          <span>·</span>
                          <span>
                            {m === "READING"
                              ? "3 Passages · 40 Questions"
                              : m === "LISTENING"
                                ? "4 Parts · 40 Questions"
                                : m === "WRITING"
                                  ? "Task 1 & Task 2"
                                  : "Parts 1, 2 & 3"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isDone ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Band {p.band?.toFixed(1) ?? "–"}
                      </span>
                    ) : inProgress ? (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                        In progress
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                        Ready
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-600">
                    {m === "READING"
                      ? "Official split-screen reader with highlightable text, matching headings, summary gaps, and True/False/Not Given questions."
                      : m === "LISTENING"
                        ? "Audio simulation with audio controls, speech-rate adjustment, live transcripts, and automatic raw-to-band conversion."
                        : m === "WRITING"
                          ? "Official IELTS essay pad with live word-counter requirements, dynamic data charts, and Band 9 examiner criteria breakdown."
                          : "Interactive speaking room with real-time speech recognition, 60s Part 2 cue-card prep notepad, and examiner follow-up questions."}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  {p.completedAttemptId ? (
                    <Link
                      href={`/attempt/${p.completedAttemptId}/result`}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 transition flex items-center gap-1"
                    >
                      <span>Review Score & Answers</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : inProgress ? (
                    <span className="text-xs font-semibold text-amber-600">Autosaved session waiting</span>
                  ) : (
                    <span className="text-xs text-slate-400">Not attempted yet</span>
                  )}

                  {inProgress ? (
                    <Link
                      href={`/attempt/${p.attemptId}`}
                      className="btn-primary text-xs px-4 py-2"
                    >
                      Resume Now <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => start(m)}
                      disabled={starting !== null}
                      className="btn-secondary text-xs px-4 py-2 hover:border-brand-400"
                    >
                      {starting === m ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                      {isDone ? "Retake Module" : `Start ${info.label}`}
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
