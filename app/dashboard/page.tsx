"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  ListChecks,
  Mic,
  PenTool,
  PlayCircle,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RequireAuth, useAuth } from "@/components/AuthProvider";
import {
  BandBadge,
  BandRing,
  EmptyState,
  ErrorBox,
  MODULE_INFO,
  MODULE_ORDER,
  ModuleIcon,
  PageHeader,
  ProgressBar,
  Skeleton,
  StatCard,
  StatusPill,
} from "@/components/ui";
import { type Dashboard } from "@/lib/api";
import { fetchDashboardData } from "@/lib/test-runner-service";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardView />
    </RequireAuth>
  );
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

const STUDIOS = [
  {
    href: "/study-plan",
    title: "Study roadmap",
    copy: "A daily checklist and target-band plan.",
    Icon: Calendar,
    tone: "bg-sky-50 text-sky-600",
  },
  {
    href: "/model-answers",
    title: "Band 9 essays",
    copy: "Annotated models and Band 6 critiques.",
    Icon: PenTool,
    tone: "bg-violet-50 text-violet-600",
  },
  {
    href: "/vocabulary",
    title: "Vocabulary lab",
    copy: "Academic flashcards with audio drill.",
    Icon: Sparkles,
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    href: "/speaking-practice",
    title: "Speaking studio",
    copy: "Cue-card timers and a voice recorder.",
    Icon: Mic,
    tone: "bg-amber-50 text-amber-600",
  },
] as const;

function DashboardView() {
  const { user } = useAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const completedBands = data
    ? MODULE_ORDER.map((m) => data.averages[m]).filter((b): b is number => b !== null)
    : [];
  const estimate =
    completedBands.length === 4
      ? Math.round((completedBands.reduce((a, b) => a + b, 0) / 4) * 2) / 2
      : null;

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow={new Date().toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
        title={
          <>
            {greeting()},{" "}
            <span className="text-brand-700">{(user?.name || "Candidate").split(" ")[0]}</span>
          </>
        }
        description="Your IELTS preparation at a glance — continue a paper, review your bands or start a focused skill session."
        actions={
          <Link href="/profile" className="btn-secondary">
            <Settings className="h-4 w-4 text-surface-500" />
            <span>Profile &amp; settings</span>
          </Link>
        }
      />

      {error && <ErrorBox message={error} />}

      {!data ? (
        <div className="space-y-6">
          <Skeleton className="h-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
          <Skeleton className="h-72" />
        </div>
      ) : (
        <>
          <ContinueCard data={data} />

          {/* Quick practice studios */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STUDIOS.map(({ href, title, copy, Icon, tone }) => (
              <Link key={href} href={href} className="card-hover group flex items-center gap-3.5 p-4.5">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[15px] font-bold text-surface-900">{title}</div>
                  <p className="mt-0.5 text-[13px] leading-snug text-surface-500">{copy}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-surface-300 transition group-hover:translate-x-0.5 group-hover:text-surface-700" />
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Tests started" value={data.totals.testsStarted} Icon={PlayCircle} />
            <StatCard label="Full tests completed" value={data.totals.testsCompleted} Icon={Award} />
            <StatCard label="Modules completed" value={data.totals.modulesCompleted} Icon={CheckCircle2} />
            <StatCard label="Modules in progress" value={data.totals.inProgress} Icon={Clock} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Band by module */}
            <section className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-surface-900">Your band by module</h2>
                  <p className="mt-0.5 text-sm text-surface-500">
                    Average of every completed attempt.
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50/70 px-3.5 py-2">
                  <Target className="h-4 w-4 text-brand-600" />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-700/80">
                      Estimated overall
                    </div>
                    <div className="font-display text-sm font-bold text-surface-900">
                      {estimate !== null ? estimate.toFixed(1) : "Complete all 4"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {MODULE_ORDER.map((m) => {
                  const count = data.trend.filter((t) => t.module === m).length;
                  const { Icon, label } = MODULE_INFO[m];
                  return (
                    <div
                      key={m}
                      className="flex items-center gap-4 rounded-xl border border-surface-200/80 bg-surface-50/60 p-4"
                    >
                      <BandRing band={data.averages[m]} size={54} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-sm font-semibold text-surface-900">
                          <Icon className="h-4 w-4 shrink-0 text-surface-500" />
                          <span>{label}</span>
                        </div>
                        <div className="mt-0.5 text-[13px] text-surface-500">
                          {count ? `${count} attempt${count > 1 ? "s" : ""} completed` : "Not attempted yet"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {data.trend.length > 1 && <Trend trend={data.trend} />}
            </section>

            {/* Recent activity */}
            <section className="card flex flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-surface-900">Recent activity</h2>
                <ListChecks className="h-4.5 w-4.5 text-surface-400" />
              </div>

              {data.recent.length === 0 ? (
                <div className="flex flex-1 items-center justify-center py-6">
                  <EmptyState
                    Icon={Clock}
                    title="No activity yet"
                    description="Sit a mock test and your attempts will appear here."
                    action={
                      <Link href="/tests?type=ACADEMIC" className="btn-primary btn-sm">
                        Start a test
                      </Link>
                    }
                  />
                </div>
              ) : (
                <ul className="-mx-2 mt-4 divide-y divide-surface-100">
                  {data.recent.slice(0, 7).map((a) => (
                    <li key={a.id}>
                      <Link
                        href={a.status === "IN_PROGRESS" ? `/attempt/${a.id}` : `/attempt/${a.id}/result`}
                        className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-surface-50"
                      >
                        <ModuleIcon module={a.module} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[13.5px] font-semibold text-surface-900">
                            {MODULE_INFO[a.module].label} ·{" "}
                            {a.test.type === "ACADEMIC" ? "Academic" : "General"} {a.test.book}, Test{" "}
                            {a.test.testNumber}
                          </div>
                          <div className="mt-0.5 text-xs text-surface-500">
                            {timeAgo(a.submittedAt ?? a.startedAt)}
                          </div>
                        </div>
                        {a.band !== null ? <BandBadge band={a.band} /> : <StatusPill status={a.status} />}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function ContinueCard({ data }: { data: Dashboard }) {
  const current = data.inProgress[0];

  if (!current) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-brand-200/70 bg-gradient-to-br from-white via-brand-50 to-white p-6 shadow-[0_24px_60px_-42px_rgba(67,86,232,0.5)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-subtle-dots opacity-25" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="badge-brand">
              <Sparkles className="h-3.5 w-3.5" />
              {data.totals.testsStarted ? "Keep the momentum" : "Get started"}
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-surface-900 sm:text-[1.75rem]">
              {data.totals.testsStarted ? "Start your next mock test" : "Take your first mock test"}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-surface-600">
              Choose your track and take the four modules in any order. Every attempt is saved
              automatically.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link href="/tests?type=ACADEMIC" className="btn-primary py-3">
              <GraduationCap className="h-4.5 w-4.5" />
              Academic
            </Link>
            <Link href="/tests?type=GENERAL" className="btn-secondary py-3">
              <Briefcase className="h-4.5 w-4.5 text-surface-500" />
              General Training
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const next =
    MODULE_ORDER.find((m) => current.modules[m].status === "IN_PROGRESS") ??
    MODULE_ORDER.find((m) => current.modules[m].band === null);
  const nextProgress = next ? current.modules[next] : null;
  const href =
    nextProgress?.status === "IN_PROGRESS"
      ? `/attempt/${nextProgress.attemptId}`
      : `/tests/${current.test.id}`;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-brand-200/70 bg-gradient-to-br from-white via-brand-50 to-white p-6 shadow-[0_24px_60px_-42px_rgba(67,86,232,0.5)] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-subtle-dots opacity-25" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span className="badge-brand">
            <PlayCircle className="h-3.5 w-3.5" />
            Continue where you left off
          </span>
          <h2 className="mt-3 font-display text-xl font-extrabold tracking-tight text-surface-900 sm:text-2xl">
            {current.test.title}
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {MODULE_ORDER.map((m) => {
              const p = current.modules[m];
              const { Icon } = MODULE_INFO[m];
              const done = p.band !== null;
              const inProg = p.status === "IN_PROGRESS";
              return (
                <div
                  key={m}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs ${
                    done
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : inProg
                        ? "border-amber-200 bg-amber-50 text-amber-800"
                        : "border-surface-200 bg-white text-surface-500"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <Icon
                      className={`h-4 w-4 shrink-0 ${
                        inProg ? "text-amber-600" : "text-surface-400"
                      }`}
                    />
                  )}
                  <span className="truncate font-semibold">{MODULE_INFO[m].label}</span>
                  {done && (
                    <span className="ml-auto font-mono font-bold text-emerald-700">
                      {p.band!.toFixed(1)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2.5 lg:items-end">
          <Link href={href} className="btn-primary px-5 py-3">
            <span>
              {nextProgress?.status === "IN_PROGRESS"
                ? `Resume ${MODULE_INFO[next!].label}`
                : next
                  ? `Start ${MODULE_INFO[next].label}`
                  : "View test"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-xs font-medium text-surface-500">
            {current.completedModules} of 4 modules complete
          </span>
        </div>
      </div>
    </section>
  );
}

function timeAgo(date: string) {
  const s = (Date.now() - new Date(date).getTime()) / 1000;
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)} d ago`;
  return new Date(date).toLocaleDateString();
}

const TREND_COLORS = {
  LISTENING: "#4356e8",
  READING: "#10b981",
  WRITING: "#f59e0b",
  SPEAKING: "#8b5cf6",
} as const;

function Trend({ trend }: { trend: Dashboard["trend"] }) {
  const W = 640,
    H = 170,
    L = 24,
    R = 12,
    T = 12,
    B = 24;
  const x = (i: number) => L + (i / Math.max(trend.length - 1, 1)) * (W - L - R);
  const y = (b: number) => T + (1 - b / 9) * (H - T - B);

  return (
    <div className="mt-7 border-t border-surface-100 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-surface-700">
          Band score progression
        </h3>
        <div className="flex flex-wrap gap-3 text-xs text-surface-500">
          {MODULE_ORDER.map((m) => (
            <span key={m} className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: TREND_COLORS[m] }} />
              {MODULE_INFO[m].label}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full">
        {[0, 3, 6, 9].map((b) => (
          <g key={b}>
            <line x1={L} x2={W - R} y1={y(b)} y2={y(b)} stroke="#eef2f8" />
            <text x={L - 6} y={y(b) + 3} fontSize="10" textAnchor="end" fill="#a3afc4">
              {b}
            </text>
          </g>
        ))}
        {MODULE_ORDER.map((m) => {
          const pts = trend.map((t, i) => ({ ...t, i })).filter((t) => t.module === m);
          return pts.length > 1 ? (
            <polyline
              key={m}
              fill="none"
              stroke={TREND_COLORS[m]}
              strokeOpacity="0.35"
              strokeWidth="2"
              points={pts.map((p) => `${x(p.i)},${y(p.band)}`).join(" ")}
            />
          ) : null;
        })}
        {trend.map((t, i) => (
          <circle
            key={i}
            cx={x(i)}
            cy={y(t.band)}
            r={4.5}
            fill="#fff"
            stroke={TREND_COLORS[t.module]}
            strokeWidth="2"
          >
            <title>{`${MODULE_INFO[t.module].label}: ${t.band} (${new Date(t.date).toLocaleDateString()})`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}
