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
        description="Authentic examination papers matching the official computer-delivered IELTS exam by Cambridge University Press & Assessment, British Council and IDP."
        actions={
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
            {(
              [
                ["ACADEMIC", "Academic Track", GraduationCap],
                ["GENERAL", "General Training Track", Briefcase],
              ] as const
            ).map(([t, l, Icon]) => (
              <button
                key={t}
                onClick={() => router.replace(`/tests?type=${t}`)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  type === t
                    ? "text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                style={
                  type === t
                    ? {
                        background: "linear-gradient(135deg, #5b4bff 0%, #8b5cf6 60%, #3b82f6 100%)",
                      }
                    : undefined
                }
              >
                <Icon className="h-4 w-4" /> {l}
              </button>
            ))}
          </div>
        }
      />

      {error && <ErrorBox message={error} />}

      {!books ? (
        <div className="space-y-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : (
        <>
          {/* Progress Banner & Filter Bar */}
          <div className="card flex flex-wrap items-center justify-between gap-6 p-6 shadow-xs">
            <div className="min-w-60 flex-1">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-900">Your {label} Progress</span>
                <span className="font-medium text-slate-500">
                  {count("COMPLETED")} of {all.length} tests completed
                </span>
              </div>
              {/* Animated progress bar */}
              <div className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${(count("COMPLETED") / Math.max(all.length, 1)) * 100}%`,
                    background: "linear-gradient(90deg, #5b4bff 0%, #10b981 100%)",
                  }}
                />
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
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
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                    filter === key
                      ? "text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  style={
                    filter === key
                      ? {
                          background: "linear-gradient(135deg, #5b4bff 0%, #8b5cf6 100%)",
                          boxShadow: "0 2px 8px rgba(91,75,255,0.35)",
                        }
                      : undefined
                  }
                >
                  {l}{" "}
                  <span className={filter === key ? "text-brand-200" : "text-slate-400"}>{n}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cambridge Bookshelf Series Selector */}
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <BookOpen className="h-4 w-4 text-brand-600" />
                <span>Cambridge IELTS Book Volumes</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
                  title="Toggle descending / ascending order"
                >
                  <ArrowDownWideNarrow
                    className={`h-3.5 w-3.5 text-brand-600 transition ${sortOrder === "asc" ? "rotate-180" : ""}`}
                  />
                  <span>{sortOrder === "desc" ? "Order: Descending (Latest First)" : "Order: Ascending (Oldest First)"}</span>
                </button>

                <div className="relative w-44 sm:w-56">
                  <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-xs outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2 scroll-thin">
              {/* All Volumes pill */}
              <button
                onClick={() => setBook(null)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  book === null
                    ? "text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
                style={
                  book === null
                    ? {
                        background: "linear-gradient(135deg, #5b4bff 0%, #8b5cf6 100%)",
                        boxShadow: "0 2px 8px rgba(91,75,255,0.35)",
                      }
                    : undefined
                }
              >
                All Volumes ({books.length})
              </button>

              {[...books]
                .sort((a, b) => (sortOrder === "desc" ? b.book - a.book : a.book - b.book))
                .map((b) => {
                const bookMeta = CAMBRIDGE_BOOKS.find((meta) => meta.volume === b.book);
                const done = b.tests.filter((t) => t.status === "COMPLETED").length;
                const isSelected = book === b.book;

                return (
                  <button
                    key={b.book}
                    onClick={() => setBook(b.book)}
                    className={`relative flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition ${
                      isSelected
                        ? "border-brand-400 text-brand-800 ring-2"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                    style={
                      isSelected
                        ? {
                            background: "linear-gradient(135deg, #eeebff 0%, #dcd6ff 100%)",
                            ringColor: "rgba(91,75,255,0.4)",
                            boxShadow: "0 0 0 2px rgba(91,75,255,0.3)",
                          }
                        : undefined
                    }
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0 shadow-sm"
                      style={{
                        backgroundColor: bookMeta?.coverAccent || "#4f46e5",
                        boxShadow: `0 0 6px ${bookMeta?.coverAccent || "#4f46e5"}80`,
                      }}
                    />
                    <span>Book {b.book}</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                      {done}/{b.tests.length}
                    </span>
                    {done === b.tests.length && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {shown.length === 0 && (
            <div className="card p-12 text-center text-slate-500">
              No Cambridge tests match your current search or filter criteria.
            </div>
          )}

          {/* Book Sections */}
          <div className="space-y-10">
            {shown.map(({ book: n, tests }) => {
              const meta = CAMBRIDGE_BOOKS.find((m) => m.volume === n);
              const completedCount = tests.filter((t) => t.status === "COMPLETED").length;

              return (
                <section key={n} className="space-y-4">
                  {/* Cambridge Book Header Banner */}
                  <div className="relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:justify-between">
                    {/* Gradient left accent */}
                    <div
                      className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                      style={{
                        background: `linear-gradient(to bottom, ${meta?.coverAccent || "#4338ca"}, ${meta?.coverAccent || "#4338ca"}80)`,
                      }}
                    />
                    <div className="flex items-center gap-4 pl-3">
                      {/* More vivid book spine cover */}
                      <div
                        className="flex h-14 w-11 shrink-0 flex-col items-center justify-center rounded-lg shadow-md"
                        style={{
                          background: `linear-gradient(145deg, ${meta?.coverAccent || "#4338ca"}, ${meta?.coverAccent || "#4338ca"}cc)`,
                          color: "#ffffff",
                          boxShadow: `0 4px 12px ${meta?.coverAccent || "#4338ca"}60`,
                        }}
                      >
                        <span className="text-[9px] font-bold tracking-widest uppercase">IELTS</span>
                        <span className="text-lg font-extrabold leading-none">{n}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-900">
                            Cambridge IELTS {n} · {label}
                          </h2>
                          {meta?.badge && (
                            <span
                              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                              style={{
                                background: "linear-gradient(135deg, #5b4bff 0%, #8b5cf6 100%)",
                              }}
                            >
                              {meta.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {meta?.description || "Authentic examination papers with realistic examination standards."}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pl-3 sm:pl-0">
                      <span className="text-xs font-semibold text-slate-600">
                        {completedCount}/{tests.length} Complete
                      </span>
                    </div>
                  </div>

                  {/* Test Cards Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
    t.status === "COMPLETED" ? "Review Results" : t.status === "IN_PROGRESS" ? "Resume Exam" : "Start Full Test";

  const accentColor =
    t.status === "COMPLETED"
      ? "#10b981"
      : t.status === "IN_PROGRESS"
      ? "#f59e0b"
      : "#5b4bff";

  return (
    <Link
      href={`/tests/${t.id}`}
      className="card card-hover group relative flex flex-col justify-between overflow-hidden p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      style={{ "--hover-shadow": `0 20px 40px ${accentColor}20` } as React.CSSProperties}
    >
      {/* Colored left accent line */}
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl transition-all duration-300 group-hover:w-1"
        style={{ backgroundColor: accentColor }}
      />

      <div className="pl-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: accentColor }}
            >
              Practice Paper {t.testNumber}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">{t.title}</div>
          </div>
          {/* Status badge */}
          {t.overallBand !== null ? (
            <BandBadge band={t.overallBand} />
          ) : t.status === "IN_PROGRESS" ? (
            <span
              className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #d97706)",
                boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
              }}
            >
              In progress
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-500">
              Not started
            </span>
          )}
        </div>

        {/* 4 Modules Status Grid */}
        <div className="mt-4 space-y-2 rounded-xl bg-slate-50/80 p-3">
          {MODULE_ORDER.map((m) => {
            const p = t.modules[m];
            const { Icon, label } = MODULE_INFO[m];
            const isDone = p.band !== null || p.status === "COMPLETED";
            const inProg = p.status === "IN_PROGRESS";

            return (
              <div key={m} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      isDone
                        ? "text-emerald-500"
                        : inProg
                        ? "text-amber-500"
                        : "text-slate-300"
                    }`}
                  />
                  <span className={p.status === "NOT_STARTED" ? "text-slate-400" : "font-medium text-slate-700"}>
                    {label}
                  </span>
                </div>
                <span
                  className={`font-bold tabular-nums ${
                    isDone ? "text-emerald-600" : inProg ? "text-amber-600" : "text-slate-400"
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
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 pl-1">
        <span
          className="text-xs font-bold transition-colors group-hover:opacity-80"
          style={{ color: accentColor }}
        >
          {cta}
        </span>
        <ArrowRight
          className="h-4 w-4 transition-all duration-200 group-hover:translate-x-1.5"
          style={{ color: accentColor }}
        />
      </div>
    </Link>
  );
}
