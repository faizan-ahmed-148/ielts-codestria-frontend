"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Calculator,
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
import { BandBadge, BandRing, ErrorBox, MODULE_INFO, MODULE_ORDER, ModuleIcon, PageHeader, Skeleton, StatusPill } from "@/components/ui";
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

function DashboardView() {
  const { user } = useAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData().then(setData).catch((e) => setError(e.message));
  }, []);

  const completedBands = data ? MODULE_ORDER.map((m) => data.averages[m]).filter((b): b is number => b !== null) : [];
  const estimate = completedBands.length === 4 ? Math.round((completedBands.reduce((a, b) => a + b, 0) / 4) * 2) / 2 : null;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-8">
      <PageHeader
        eyebrow={new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
        title={
          <>
            <span>{greeting()}, </span>
            <span className="text-zinc-900 font-bold">{(user?.name || "Candidate").split(" ")[0]}</span>
          </>
        }
        description="Here's an overview of your IELTS exam preparation and recent attempts."
        actions={
          <Link
            href="/profile"
            className="btn btn-secondary text-xs flex items-center gap-1.5 shadow-2xs"
          >
            <Settings className="h-3.5 w-3.5 text-zinc-500" />
            <span>Profile &amp; Settings</span>
          </Link>
        }
      />

      {error && <ErrorBox message={error} />}

      {!data ? (
        <div className="space-y-6">
          <Skeleton className="h-44" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-28" />)}</div>
          <Skeleton className="h-72" />
        </div>
      ) : (
        <>
          <ContinueCard data={data} />

          {/* Quick Practice Studios */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Study Roadmap */}
            <Link
              href="/study-plan"
              className="card card-hover p-4 sm:p-5 flex items-center justify-between group rounded-2xl border border-zinc-200/90 bg-white shadow-2xs"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 border border-blue-200/70 group-hover:scale-105 transition-transform shrink-0">
                  <Calendar className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-zinc-900 text-sm sm:text-base">Study Roadmap</div>
                  <p className="text-xs text-zinc-500 mt-0.5">Daily checklist &amp; target band plan</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* Band 9 Essays */}
            <Link
              href="/model-answers"
              className="card card-hover p-4 sm:p-5 flex items-center justify-between group rounded-2xl border border-zinc-200/90 bg-white shadow-2xs"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-200/70 group-hover:scale-105 transition-transform shrink-0">
                  <PenTool className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-zinc-900 text-sm sm:text-base">Band 9 Essays</div>
                  <p className="text-xs text-zinc-500 mt-0.5">Annotated models &amp; Band 6 critiques</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* Vocab Lab */}
            <Link
              href="/vocabulary"
              className="card card-hover p-4 sm:p-5 flex items-center justify-between group rounded-2xl border border-zinc-200/90 bg-white shadow-2xs"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/70 group-hover:scale-105 transition-transform shrink-0">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-zinc-900 text-sm sm:text-base">Vocab Lab</div>
                  <p className="text-xs text-zinc-500 mt-0.5">Academic flashcards &amp; audio drill</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>

            {/* Speaking Studio */}
            <Link
              href="/speaking-practice"
              className="card card-hover p-4 sm:p-5 flex items-center justify-between group rounded-2xl border border-zinc-200/90 bg-white shadow-2xs"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/70 group-hover:scale-105 transition-transform shrink-0">
                  <Mic className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-bold text-zinc-900 text-sm sm:text-base">Speaking Studio</div>
                  <p className="text-xs text-zinc-500 mt-0.5">Part 2 cue card &amp; audio recorder</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                label: "Tests started",
                value: data.totals.testsStarted,
                Icon: PlayCircle,
              },
              {
                label: "Full tests completed",
                value: data.totals.testsCompleted,
                Icon: Award,
              },
              {
                label: "Modules completed",
                value: data.totals.modulesCompleted,
                Icon: CheckCircle2,
              },
              {
                label: "Modules in progress",
                value: data.totals.inProgress,
                Icon: Clock,
              },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="card p-5 rounded-2xl border border-zinc-200/90 bg-white shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-zinc-500">{label}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200/60">
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold font-mono tracking-tight text-zinc-900 tabular-nums">{value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Band by Module */}
            <section className="card p-6 rounded-xl border border-zinc-200/80 bg-white shadow-2xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-zinc-900">Your band by module</h2>
                  <p className="text-xs text-zinc-500">Average of all your completed attempts</p>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-zinc-50 px-3 py-1.5 border border-zinc-200/70">
                  <Target className="h-4 w-4 text-indigo-600" />
                  <div className="text-xs">
                    <div className="text-[10px] text-zinc-500 font-medium">Estimated overall</div>
                    <div className="font-bold text-zinc-900">{estimate !== null ? estimate.toFixed(1) : "Complete all 4"}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {MODULE_ORDER.map((m) => {
                  const count = data.trend.filter((t) => t.module === m).length;
                  const { Icon, label } = MODULE_INFO[m] as { Icon: React.ElementType; label: string };
                  return (
                    <div
                      key={m}
                      className="flex items-center gap-3.5 rounded-xl border border-zinc-200/70 bg-zinc-50/50 p-3.5 hover:border-zinc-300 transition-colors"
                    >
                      <BandRing band={data.averages[m]} size={52} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-semibold text-xs text-zinc-900">
                          <Icon className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                          <span>{label}</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {count ? `${count} attempt${count > 1 ? "s" : ""} completed` : "Not attempted yet"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {data.trend.length > 1 && <Trend trend={data.trend} />}
            </section>

            {/* Recent Activity */}
            <section className="card flex flex-col p-6 rounded-xl border border-zinc-200/80 bg-white shadow-2xs">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-zinc-900">Recent activity</h2>
                <ListChecks className="h-4 w-4 text-zinc-400" />
              </div>
              {data.recent.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
                    <Clock className="h-5 w-5" />
                  </span>
                  <p className="mt-2.5 text-xs font-semibold text-zinc-800">No activity yet</p>
                  <p className="text-xs text-zinc-500">Your attempts will show up here.</p>
                </div>
              ) : (
                <ul className="-mx-2 mt-3 divide-y divide-zinc-100 text-xs">
                  {data.recent.slice(0, 7).map((a) => (
                    <li key={a.id}>
                      <Link
                        href={a.status === "IN_PROGRESS" ? `/attempt/${a.id}` : `/attempt/${a.id}/result`}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-zinc-50"
                      >
                        <ModuleIcon module={a.module} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold text-zinc-900">
                            {MODULE_INFO[a.module].label} · {a.test.type === "ACADEMIC" ? "Academic" : "General"} {a.test.book}, Test {a.test.testNumber}
                          </div>
                          <div className="text-[11px] text-zinc-500">{timeAgo(a.submittedAt ?? a.startedAt)}</div>
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
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#12141a] p-6 sm:p-8 text-white shadow-md">
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              {data.totals.testsStarted ? "Keep the momentum" : "Get started"}
            </div>
            <h2 className="mt-2 text-2xl font-bold text-white">
              {data.totals.testsStarted ? "Start your next mock test" : "Take your first mock test"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300">Choose your track. You can take the four modules in any order.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/tests?type=ACADEMIC"
              className="btn btn-primary bg-white text-zinc-900 hover:bg-zinc-100 font-semibold px-4 py-2 text-xs shadow-xs"
            >
              <GraduationCap className="h-4 w-4" /> Academic
            </Link>
            <Link
              href="/tests?type=GENERAL"
              className="btn btn-secondary bg-zinc-900/80 border-zinc-700 text-zinc-200 hover:bg-zinc-800 font-semibold px-4 py-2 text-xs"
            >
              <Briefcase className="h-4 w-4" /> General Training
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const next = MODULE_ORDER.find((m) => current.modules[m].status === "IN_PROGRESS") ?? MODULE_ORDER.find((m) => current.modules[m].band === null);
  const nextProgress = next ? current.modules[next] : null;
  const href = nextProgress?.status === "IN_PROGRESS" ? `/attempt/${nextProgress.attemptId}` : `/tests/${current.test.id}`;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#12141a] p-6 sm:p-8 text-white shadow-md">
      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">Continue where you left off</div>
          <h2 className="mt-1.5 text-2xl font-bold text-white">{current.test.title}</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MODULE_ORDER.map((m) => {
              const p = current.modules[m];
              const { Icon } = MODULE_INFO[m];
              const done = p.band !== null;
              const inProg = p.status === "IN_PROGRESS";
              return (
                <div
                  key={m}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs border ${
                    done
                      ? "bg-emerald-950/40 border-emerald-700/60 text-emerald-300"
                      : inProg
                      ? "bg-amber-950/40 border-amber-700/60 text-amber-300"
                      : "bg-zinc-900/80 border-zinc-800 text-zinc-400"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${inProg ? "text-amber-400" : "text-zinc-500"}`} />
                  )}
                  <span className="font-semibold truncate">{MODULE_INFO[m].label}</span>
                  {done && <span className="ml-auto font-mono font-bold text-emerald-300">{p.band!.toFixed(1)}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <Link
            href={href}
            className="btn btn-primary bg-white text-zinc-900 hover:bg-zinc-100 font-semibold px-5 py-2.5 text-xs shadow-sm inline-flex items-center gap-1.5"
          >
            <span>
              {nextProgress?.status === "IN_PROGRESS"
                ? `Resume ${MODULE_INFO[next!].label}`
                : next
                ? `Start ${MODULE_INFO[next].label}`
                : "View test"}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <span className="text-xs text-zinc-400">{current.completedModules} of 4 modules done</span>
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

const TREND_COLORS = { LISTENING: "#4351e8", READING: "#10b981", WRITING: "#f59e0b", SPEAKING: "#8b5cf6" } as const;

function Trend({ trend }: { trend: Dashboard["trend"] }) {
  const W = 640, H = 160, L = 24, R = 12, T = 12, B = 20;
  const x = (i: number) => L + (i / Math.max(trend.length - 1, 1)) * (W - L - R);
  const y = (b: number) => T + (1 - b / 9) * (H - T - B);
  return (
    <div className="mt-6 border-t border-zinc-100 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wide">Band score progression</h3>
        <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
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
            <line x1={L} x2={W - R} y1={y(b)} y2={y(b)} stroke="#f4f4f5" />
            <text x={L - 6} y={y(b) + 3} fontSize="10" textAnchor="end" fill="#a1a1aa">{b}</text>
          </g>
        ))}
        {MODULE_ORDER.map((m) => {
          const pts = trend.map((t, i) => ({ ...t, i })).filter((t) => t.module === m);
          return pts.length > 1 ? (
            <polyline key={m} fill="none" stroke={TREND_COLORS[m]} strokeOpacity="0.4" strokeWidth="2" points={pts.map((p) => `${x(p.i)},${y(p.band)}`).join(" ")} />
          ) : null;
        })}
        {trend.map((t, i) => (
          <circle key={i} cx={x(i)} cy={y(t.band)} r={4.5} fill="#fff" stroke={TREND_COLORS[t.module]} strokeWidth="2">
            <title>{`${MODULE_INFO[t.module].label}: ${t.band} (${new Date(t.date).toLocaleDateString()})`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}
