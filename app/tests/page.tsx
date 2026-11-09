"use client";

import {
  ArrowDownWideNarrow,
  ArrowRight,
  ArrowUpDown,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Headphones,
  Mic,
  PenTool,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PageSpinner } from "@/components/AuthProvider";
import { BandBadge, ErrorBox, MODULE_INFO, MODULE_ORDER, PageHeader, ProgressBar, Skeleton } from "@/components/ui";
import type { BookList, TestType } from "@/lib/api";
import { CAMBRIDGE_BOOKS } from "@/lib/cambridge-library";
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
      .then((data) => {
        const sorted = [...data].sort((a, b) => b.book - a.book);
        setBooks(sorted);
      })
      .catch((e) => setError(e.message));
  }, [type]);

  const matches = (t: Test) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "todo" && t.status === "NOT_STARTED") ||
      (filter === "progress" && t.status === "IN_PROGRESS") ||
      (filter === "done" && t.status === "COMPLETED");

    const matchesSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `test ${t.testNumber}`.includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  };

  const all = books?.flatMap((b) => b.tests) ?? [];
  const count = (s: Test["status"]) => all.filter((t) => t.status === s).length;
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
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-8">
      {/* Page Header */}
      <PageHeader
        eyebrow="Official Cambridge Exam Library"
        title={`${label} Full Mock Tests`}
        description="Authentic examination papers matching the official computer-delivered IELTS exam format by Cambridge University Press & Assessment, British Council and IDP."
        actions={
          <div className="inline-flex rounded-xl border border-zinc-200/80 bg-zinc-100 p-1">
            {(
              [
                ["ACADEMIC", "Academic Track", GraduationCap],
                ["GENERAL", "General Training", Briefcase],
              ] as const
            ).map(([t, l, Icon]) => (
              <button
                key={t}
                onClick={() => router.replace(`/tests?type=${t}`)}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  type === t
                    ? "bg-white text-zinc-900 shadow-2xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <Icon className="h-3.5 w-3.5" /> {l}
              </button>
            ))}
          </div>
        }
      />

      {error && <ErrorBox message={error} />}

      {!books ? (
        <div className="space-y-4">
          <Skeleton className="h-20" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-64" />)}</div>
        </div>
      ) : (
        <>
          {/* Progress Banner & Filter Bar */}
          <div className="card flex flex-wrap items-center justify-between gap-6 p-5 rounded-xl border border-zinc-200/80 bg-white shadow-2xs">
            <div className="min-w-60 flex-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-zinc-900">Your {label} Progress</span>
                <span className="font-medium text-zinc-500">
                  {count("COMPLETED")} of {all.length} tests completed
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all duration-500 ease-out"
                  style={{
                    width: `${(count("COMPLETED") / Math.max(all.length, 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  ["all", "All Tests", all.length],
                  ["todo", "Not Started", count("NOT_STARTED")],
                  ["progress", "In Progress", count("IN_PROGRESS")],
                  ["done", "Completed", count("COMPLETED")],
                ] as const
              ).map(([key, l, n]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    filter === key
                      ? "bg-zinc-900 text-white shadow-2xs"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900"
                  }`}
                >
                  {l}{" "}
                  <span className={filter === key ? "text-zinc-300" : "text-zinc-400"}>({n})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cambridge Bookshelf Series Selector */}
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                <BookOpen className="h-4 w-4 text-zinc-700" />
                <span>Cambridge IELTS Volumes</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition shadow-2xs cursor-pointer"
                  title="Toggle descending / ascending order"
                >
                  <ArrowDownWideNarrow
                    className={`h-3.5 w-3.5 text-zinc-500 transition ${sortOrder === "asc" ? "rotate-180" : ""}`}
                  />
                  <span>{sortOrder === "desc" ? "Latest First" : "Oldest First"}</span>
                </button>

                <div className="relative w-44 sm:w-56">
                  <Search className="absolute top-2.5 left-2.5 h-3.5 w-3.5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200/80 bg-white py-1.5 pr-3 pl-8 text-xs text-zinc-900 outline-none focus:border-zinc-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scroll-thin">
              {/* All Volumes pill */}
              <button
                onClick={() => setBook(null)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                  book === null
                    ? "bg-zinc-900 text-white shadow-2xs"
                    : "border border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                All Volumes ({books.length})
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
                      className={`flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                        isSelected
                          ? "border-zinc-900 bg-zinc-900 text-white shadow-2xs"
                          : "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      <span>Book {b.book}</span>
                      <span className={`rounded px-1.5 py-0.2 text-[10px] ${isSelected ? "bg-zinc-800 text-zinc-300" : "bg-zinc-100 text-zinc-500"}`}>
                        {done}/{b.tests.length}
                      </span>
                      {done === b.tests.length && (
                        <CheckCircle2 className={`h-3 w-3 ${isSelected ? "text-emerald-400" : "text-emerald-600"}`} />
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {shown.length === 0 && (
            <div className="card p-12 text-center text-xs text-zinc-500 rounded-xl border border-zinc-200 bg-white">
              No Cambridge tests match your current search or filter criteria.
            </div>
          )}

          {/* Book Sections */}
          <div className="space-y-8">
            {shown.map(({ book: n, tests }) => {
              const meta = CAMBRIDGE_BOOKS.find((m) => m.volume === n);
              const completedCount = tests.filter((t) => t.status === "COMPLETED").length;

              return (
                <section key={n} className="space-y-3">
                  {/* Cambridge Book Header Banner */}
                  <div className="flex flex-col gap-2 rounded-xl border border-zinc-200/80 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-9 shrink-0 flex-col items-center justify-center rounded-md bg-zinc-900 text-white shadow-xs">
                        <span className="text-[8px] font-bold tracking-widest uppercase text-zinc-400">VOL</span>
                        <span className="text-base font-extrabold leading-none">{n}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-sm font-bold text-zinc-900">
                            Cambridge IELTS {n} · {label}
                          </h2>
                          {meta?.badge && (
                            <span className="rounded-md bg-zinc-100 border border-zinc-200/60 px-2 py-0.5 text-[10px] font-semibold text-zinc-700">
                              {meta.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500">
                          {meta?.description || "Authentic examination papers matching official test standards."}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-zinc-600">
                      {completedCount}/{tests.length} Complete
                    </div>
                  </div>

                  {/* Test Cards Grid */}
                  <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                    {tests.map((t) => (
                      <TestCard key={t.id} t={t} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function TestCard({ t }: { t: Test }) {
  const cta =
    t.status === "COMPLETED" ? "Review Results" : t.status === "IN_PROGRESS" ? "Resume Exam" : "Start Test";

  return (
    <Link
      href={`/tests/${t.id}`}
      className="card card-hover group flex flex-col justify-between rounded-xl border border-zinc-200/80 bg-white p-4 shadow-2xs transition-all hover:border-zinc-300 hover:shadow-xs"
    >
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-zinc-500">
              Practice Paper {t.testNumber}
            </div>
            <div className="mt-1 text-sm font-bold text-zinc-900">{t.title}</div>
          </div>
          {/* Status badge */}
          {t.overallBand !== null ? (
            <BandBadge band={t.overallBand} />
          ) : t.status === "IN_PROGRESS" ? (
            <span className="shrink-0 rounded-md bg-amber-50 border border-amber-200/60 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
              In progress
            </span>
          ) : (
            <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500">
              Not started
            </span>
          )}
        </div>

        {/* 4 Modules Status Grid */}
        <div className="mt-3 space-y-1.5 rounded-lg bg-zinc-50/80 p-2.5 border border-zinc-200/60">
          {MODULE_ORDER.map((m) => {
            const p = t.modules[m];
            const { Icon, label } = MODULE_INFO[m];
            const isDone = p.band !== null || p.status === "COMPLETED";
            const inProg = p.status === "IN_PROGRESS";

            return (
              <div key={m} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <Icon
                    className={`h-3 w-3 ${
                      isDone
                        ? "text-emerald-600"
                        : inProg
                        ? "text-amber-600"
                        : "text-zinc-400"
                    }`}
                  />
                  <span className={p.status === "NOT_STARTED" ? "text-zinc-400" : "font-medium text-zinc-700"}>
                    {label}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    isDone ? "text-emerald-700" : inProg ? "text-amber-700" : "text-zinc-400"
                  }`}
                >
                  {p.band !== null ? `Band ${p.band.toFixed(1)}` : inProg ? "..." : "–"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA row */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-2.5 text-xs">
        <span className="font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors">
          {cta}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
