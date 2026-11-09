"use client";

import {
  ArrowDownWideNarrow,
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PageSpinner } from "@/components/AuthProvider";
import {
  BandBadge,
  EmptyState,
  ErrorBox,
  MODULE_INFO,
  MODULE_ORDER,
  PageHeader,
  ProgressBar,
  Skeleton,
} from "@/components/ui";
import { AdBanner } from "@/components/AdBanner";
import type { BookList, TestType } from "@/lib/api";
import { track } from "@/lib/analytics";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-library";
import { testPath } from "@/lib/seo";
import { fetchBooksList } from "@/lib/test-runner-service";

export default function TestsPage() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <TestsView />
    </Suspense>
  );
}

type Filter = "all" | "todo" | "progress" | "done";
type Test = BookList["tests"][number];

function TestsView() {
  const params = useSearchParams();
  const router = useRouter();
  const type: TestType = params.get("type") === "GENERAL" ? "GENERAL" : "ACADEMIC";
  const [books, setBooks] = useState<BookList[] | null>(null);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [book, setBook] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    setBooks(null);
    setBook(null);
    fetchBooksList(type)
      .then((data) => setBooks([...data].sort((a, b) => b.book - a.book)))
      .catch((e) => setError(e.message));
  }, [type]);

  // Debounced search tracking (typing is not covered by the global click listener).
  useEffect(() => {
    const term = searchQuery.trim();
    if (!term) return;
    const timer = window.setTimeout(() => {
      track("search_tests", { search_term: term.slice(0, 100), type });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [searchQuery, type]);

  const matches = (t: Test) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "todo" && t.status === "NOT_STARTED") ||
      (filter === "progress" && t.status === "IN_PROGRESS") ||
      (filter === "done" && t.status === "COMPLETED");

    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || t.title.toLowerCase().includes(q) || `test ${t.testNumber}`.includes(q);

    return matchesFilter && matchesSearch;
  };

  const all = books?.flatMap((b) => b.tests) ?? [];
  const count = (s: Test["status"]) => all.filter((t) => t.status === s).length;
  const completed = count("COMPLETED");
  const progressPct = (completed / Math.max(all.length, 1)) * 100;

  const shown = (books ?? [])
    .filter((b) => book === null || b.book === book)
    .sort((a, b) => (sortOrder === "desc" ? b.book - a.book : a.book - b.book))
    .map((b) => ({
      ...b,
      tests: b.tests
        .filter(matches)
        .sort((x, y) => (sortOrder === "desc" ? y.testNumber - x.testNumber : x.testNumber - y.testNumber)),
    }))
    .filter((b) => b.tests.length);

  const label = type === "ACADEMIC" ? "Academic" : "General Training";

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Cambridge exam library"
        title={`${label} full mock tests`}
        description="Authentic examination papers in the official computer-delivered format, with instant objective marking and AI examiner feedback."
        actions={
          <div className="inline-flex rounded-xl border border-surface-200 bg-surface-100/80 p-1">
            {(
              [
                ["ACADEMIC", "Academic", GraduationCap],
                ["GENERAL", "General Training", Briefcase],
              ] as const
            ).map(([t, l, Icon]) => (
              <button
                key={t}
                onClick={() => router.replace(`/tests?type=${t}`)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition ${
                  type === t
                    ? "bg-white text-surface-900 shadow-xs ring-1 ring-surface-200"
                    : "text-surface-500 hover:text-surface-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {l}
              </button>
            ))}
          </div>
        }
      />

      {error && <ErrorBox message={error} />}

      {!books ? (
        <div className="space-y-4">
          <Skeleton className="h-24" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Progress + filters */}
          <div className="card flex flex-wrap items-center justify-between gap-6 p-5 sm:p-6">
            <div className="min-w-60 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm font-bold text-surface-900">
                  Your {label} progress
                </span>
                <span className="text-[13px] text-surface-500">
                  {completed} of {all.length} tests completed
                </span>
              </div>
              <ProgressBar value={progressPct} className="mt-3 h-2.5" />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ["all", "All", all.length],
                  ["todo", "Not started", count("NOT_STARTED")],
                  ["progress", "In progress", count("IN_PROGRESS")],
                  ["done", "Completed", completed],
                ] as const
              ).map(([key, l, n]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`cursor-pointer rounded-xl px-3.5 py-2 text-[13px] font-semibold transition ${
                    filter === key
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-surface-100 text-surface-600 hover:bg-surface-200/80 hover:text-surface-900"
                  }`}
                >
                  {l}{" "}
                  <span className={filter === key ? "text-white/70" : "text-surface-400"}>({n})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Volume selector */}
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-surface-500">
                <BookOpen className="h-4 w-4 text-surface-600" />
                <span>Cambridge IELTS volumes</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-surface-200 bg-white px-3.5 py-2 text-[13px] font-medium text-surface-700 shadow-xs transition hover:bg-surface-50"
                  title="Toggle descending / ascending order"
                >
                  <ArrowDownWideNarrow
                    className={`h-4 w-4 text-surface-400 transition ${sortOrder === "asc" ? "rotate-180" : ""}`}
                  />
                  <span>{sortOrder === "desc" ? "Latest first" : "Oldest first"}</span>
                </button>

                <div className="relative w-52 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search tests…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input py-2 pl-9.5 text-[13px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scroll-thin">
              <button
                onClick={() => setBook(null)}
                className={`shrink-0 cursor-pointer rounded-xl px-4 py-2 text-[13px] font-semibold transition ${
                  book === null
                    ? "bg-brand-600 text-white shadow-sm"
                    : "border border-surface-200 bg-white text-surface-600 hover:bg-surface-50"
                }`}
              >
                All volumes ({books.length})
              </button>

              {[...books]
                .sort((a, b) => (sortOrder === "desc" ? b.book - a.book : a.book - b.book))
                .map((b) => {
                  const done = b.tests.filter((t) => t.status === "COMPLETED").length;
                  const isSelected = book === b.book;
                  return (
                    <button
                      key={b.book}
                      onClick={() => setBook(b.book)}
                      className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-[13px] font-semibold transition ${
                        isSelected
                          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                          : "border-surface-200 bg-white text-surface-600 hover:bg-surface-50"
                      }`}
                    >
                      <span>Book {b.book}</span>
                      <span
                        className={`rounded px-1.5 py-0.5 text-[11px] font-bold ${
                          isSelected ? "bg-white/20 text-white" : "bg-surface-100 text-surface-500"
                        }`}
                      >
                        {done}/{b.tests.length}
                      </span>
                      {done === b.tests.length && (
                        <CheckCircle2
                          className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-200" : "text-emerald-600"}`}
                        />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {shown.length === 0 && (
            <EmptyState
              Icon={Search}
              title="No tests match your filters"
              description="Try clearing the search field or choosing a different volume."
              action={
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchQuery("");
                    setBook(null);
                  }}
                  className="btn-secondary btn-sm"
                >
                  Reset filters
                </button>
              }
            />
          )}

          {/* Book sections */}
          <div className="space-y-9">
            {shown.map(({ book: n, tests }, index) => {
              const meta = CAMBRIDGE_BOOKS.find((m) => m.volume === n);
              const completedCount = tests.filter((t) => t.status === "COMPLETED").length;

              return (
                <div key={n} className="space-y-9">
                  <section className="space-y-3.5">
                    <div className="flex flex-col gap-3 rounded-2xl border border-surface-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:px-5">
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-12 w-10 shrink-0 flex-col items-center justify-center rounded-xl bg-surface-900 text-white shadow-sm">
                          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-surface-400">
                            VOL
                          </span>
                          <span className="text-lg font-extrabold leading-none">{n}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-display text-[15px] font-bold text-surface-900">
                              Cambridge IELTS {n} · {label}
                            </h2>
                            {meta?.badge && <span className="badge-brand">{meta.badge}</span>}
                          </div>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-surface-500">
                            {meta?.description ||
                              "Authentic examination papers matching official test standards."}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 sm:shrink-0">
                        <span className="text-[13px] font-semibold text-surface-500">
                          {completedCount}/{tests.length} complete
                        </span>
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${(completedCount / tests.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {tests.map((t) => (
                        <TestCard key={t.id} t={t} book={n} type={type} />
                      ))}
                    </div>
                  </section>

                  {/* High-traffic ad slot directly beneath the newest volume */}
                  {index === 0 && <AdBanner minHeight={100} className="my-6" />}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function TestCard({ t, book, type }: { t: Test; book: number; type: TestType }) {
  const cta =
    t.status === "COMPLETED"
      ? "Review results"
      : t.status === "IN_PROGRESS"
        ? "Resume exam"
        : "Start test";

  return (
    <Link href={testPath({ book, type, testNumber: t.testNumber })} className="card-hover group flex flex-col justify-between p-5">
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-surface-400">
              Practice paper {t.testNumber}
            </div>
            <div className="mt-1 text-[15px] font-bold leading-snug text-surface-900">{t.title}</div>
          </div>
          {t.overallBand !== null ? (
            <BandBadge band={t.overallBand} />
          ) : t.status === "IN_PROGRESS" ? (
            <span className="badge-warning shrink-0">In progress</span>
          ) : (
            <span className="badge-neutral shrink-0">Not started</span>
          )}
        </div>

        <div className="mt-4 space-y-2 rounded-xl border border-surface-100 bg-surface-50/70 p-3">
          {MODULE_ORDER.map((m) => {
            const p = t.modules[m];
            const { Icon, label } = MODULE_INFO[m];
            const isDone = p.band !== null || p.status === "COMPLETED";
            const inProg = p.status === "IN_PROGRESS";

            return (
              <div key={m} className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isDone ? "text-emerald-600" : inProg ? "text-amber-600" : "text-surface-400"
                    }`}
                  />
                  <span
                    className={
                      p.status === "NOT_STARTED"
                        ? "text-surface-400"
                        : "font-medium text-surface-700"
                    }
                  >
                    {label}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    isDone ? "text-emerald-700" : inProg ? "text-amber-700" : "text-surface-400"
                  }`}
                >
                  {p.band !== null ? p.band.toFixed(1) : inProg ? "…" : "–"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-surface-100 pt-3 text-[13px]">
        <span className="font-semibold text-surface-900 transition-colors group-hover:text-brand-700">
          {cta}
        </span>
        <ArrowRight className="h-4 w-4 text-surface-300 transition-all group-hover:translate-x-0.5 group-hover:text-brand-600" />
      </div>
    </Link>
  );
}
