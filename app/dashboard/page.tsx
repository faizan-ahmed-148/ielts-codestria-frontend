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
            <span className="gradient-text">{(user?.name || "Candidate").split(" ")[0]}</span>
          </>
        }
        description="Here's an overview of your IELTS preparation."
        actions={
          <Link
            href="/profile"
            className="btn-secondary text-xs flex items-center gap-1.5 shadow-2xs hover:border-slate-300"
          >
            <Settings className="h-3.5 w-3.5 text-slate-500" />
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

          {/* Quick Practice Tools & Diagnostic Suite */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Study Roadmap – blue */}
            <Link
              href="/study-plan"
              className="card card-hover p-4 flex items-center justify-between group hover:border-blue-300"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md shadow-blue-200 group-hover:scale-110 transition-transform">
                  <Calendar className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">Study Roadmap</div>
                  <p className="text-[11px] text-slate-500">Daily checklist &amp; target band plan</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Band 9 Essays – purple */}
            <Link
              href="/model-answers"
              className="card card-hover p-4 flex items-center justify-between group hover:border-purple-300"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-md shadow-purple-200 group-hover:scale-110 transition-transform">
                  <PenTool className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">Band 9 Essays</div>
                  <p className="text-[11px] text-slate-500">Annotated models &amp; Band 6 critiques</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Vocab Lab – emerald */}
            <Link
              href="/vocabulary"
              className="card card-hover p-4 flex items-center justify-between group hover:border-emerald-300"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">Vocab Lab</div>
                  <p className="text-[11px] text-slate-500">Academic flashcards &amp; audio drill</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </Link>

            {/* Speaking Studio – amber */}
            <Link
              href="/speaking-practice"
              className="card card-hover p-4 flex items-center justify-between group hover:border-amber-300"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-200 group-hover:scale-110 transition-transform">
                  <Mic className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">Speaking Studio</div>
                  <p className="text-[11px] text-slate-500">Part 2 cue card &amp; audio recorder</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 stagger">
            {[
              {
                label: "Tests started",
                value: data.totals.testsStarted,
                Icon: PlayCircle,
                gradient: "from-brand-400 to-brand-600",
                shadow: "shadow-brand-200",
                border: "border-t-brand-500",
              },
              {
                label: "Full tests completed",
                value: data.totals.testsCompleted,
                Icon: Award,
                gradient: "from-emerald-400 to-emerald-600",
                shadow: "shadow-emerald-200",
                border: "border-t-emerald-500",
              },
              {
                label: "Modules completed",
                value: data.totals.modulesCompleted,
                Icon: CheckCircle2,
                gradient: "from-sky-400 to-sky-600",
                shadow: "shadow-sky-200",
                border: "border-t-sky-500",
              },
              {
                label: "Modules in progress",
                value: data.totals.inProgress,
                Icon: Clock,
                gradient: "from-amber-400 to-amber-600",
                shadow: "shadow-amber-200",
                border: "border-t-amber-500",
              },
            ].map(({ label, value, Icon, gradient, shadow, border }) => (
              <div key={label} className={`card p-4 sm:p-5 border-t-2 ${border} animate-fade-up`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 sm:text-sm">{label}</span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md ${shadow}`}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                </div>
                <div className="mt-3 text-3xl font-bold tracking-tight tabular-nums animate-scale-in">{value}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Band by Module */}
            <section className="card p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Your band by module</h2>
                  <p className="text-sm text-slate-500">Average of all your completed attempts</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-purple-50 px-4 py-2 border border-brand-100">
                  <Target className="h-4 w-4 text-brand-600" />
                  <div className="text-sm">
                    <div className="text-xs text-slate-500">Estimated overall</div>
                    <div className="font-bold">{estimate !== null ? estimate.toFixed(1) : "Complete all 4"}</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 stagger">
                {MODULE_ORDER.map((m) => {
                  const count = data.trend.filter((t) => t.module === m).length;
                  const { Icon, label, color } = MODULE_INFO[m] as { Icon: React.ElementType; label: string; color?: string };
                  return (
                    <div
                      key={m}
                      className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50/60 p-4 hover-lift animate-fade-up"
                    >
                      <BandRing band={data.averages[m]} size={60} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-semibold">
                          <Icon className="h-4 w-4 text-brand-500 shrink-0" />
                          <span>{label}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
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
            <section className="card flex flex-col p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent activity</h2>
                <ListChecks className="h-5 w-5 text-slate-300" />
              </div>
              {data.recent.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><Clock className="h-6 w-6" /></span>
                  <p className="mt-3 text-sm font-medium">No activity yet</p>
                  <p className="text-sm text-slate-500">Your attempts will show up here.</p>
                </div>
              ) : (
                <ul className="-mx-2 mt-3 divide-y divide-slate-100">
                  {data.recent.slice(0, 7).map((a) => (
                    <li key={a.id}>
                      <Link href={a.status === "IN_PROGRESS" ? `/attempt/${a.id}` : `/attempt/${a.id}/result`}
                        className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50">
                        <ModuleIcon module={a.module} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{MODULE_INFO[a.module].label} · {a.test.type === "ACADEMIC" ? "Academic" : "General"} {a.test.book}, Test {a.test.testNumber}</div>
                          <div className="text-xs text-slate-500">{timeAgo(a.submittedAt ?? a.startedAt)}</div>
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
      <section className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white">
        {/* Gradient mesh overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(99,102,241,0.55),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(139,92,246,0.3),transparent_50%)]" />
        {/* Animated orb decorations */}
        <div className="pointer-events-none absolute -top-10 right-16 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl animate-float" />
        <div className="pointer-events-none absolute bottom-0 right-4 h-28 w-28 rounded-full bg-purple-500/15 blur-2xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="pointer-events-none absolute top-8 right-1/3 h-16 w-16 rounded-full bg-indigo-400/20 blur-xl animate-float" style={{ animationDelay: "0.8s" }} />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="eyebrow text-brand-300">
              {data.totals.testsStarted ? "Keep the momentum" : "Get started"}
            </div>
            <h2 className="mt-2 text-2xl font-bold">
              {data.totals.testsStarted ? "Start your next mock test" : "Take your first mock test"}
            </h2>
            <p className="mt-2 text-slate-300">Choose your track. You can take the four modules in any order.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/tests?type=ACADEMIC" className="btn bg-white text-slate-900 hover:bg-slate-100 glow-brand-sm">
              <GraduationCap className="h-4 w-4" /> Academic
            </Link>
            <Link href="/tests?type=GENERAL" className="btn bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20">
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
    <section className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white sm:p-8">
      {/* Gradient mesh overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(99,102,241,0.55),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_5%_90%,rgba(139,92,246,0.25),transparent_50%)]" />
      {/* Animated orb decorations */}
      <div className="pointer-events-none absolute -top-12 right-20 h-48 w-48 rounded-full bg-brand-500/25 blur-3xl animate-float" />
      <div className="pointer-events-none absolute bottom-2 right-8 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute top-10 right-1/2 h-20 w-20 rounded-full bg-indigo-400/15 blur-xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="pointer-events-none absolute -bottom-4 left-1/4 h-24 w-24 rounded-full bg-brand-600/15 blur-2xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="eyebrow text-brand-300">Continue where you left off</div>
          <h2 className="mt-2 text-2xl font-bold">{current.test.title}</h2>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {MODULE_ORDER.map((m) => {
              const p = current.modules[m];
              const { Icon } = MODULE_INFO[m];
              const done = p.band !== null;
              const inProg = p.status === "IN_PROGRESS";
              return (
                <div
                  key={m}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm ring-1 ${
                    done
                      ? "bg-emerald-400/15 ring-emerald-300/40 shadow-sm shadow-emerald-500/10"
                      : inProg
                      ? "bg-amber-400/15 ring-amber-300/50 shadow-sm shadow-amber-500/10"
                      : "bg-white/5 ring-white/10"
                  }`}
                >
                  {done
                    ? <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                    : <Icon className={`h-4 w-4 shrink-0 ${inProg ? "text-amber-300" : "text-slate-400"}`} />
                  }
                  <span className="font-medium truncate">{MODULE_INFO[m].label}</span>
                  {done && <span className="ml-auto font-bold tabular-nums text-emerald-200">{p.band!.toFixed(1)}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <Link href={href} className="btn-primary px-6 py-3 text-base glow-brand-sm">
            {nextProgress?.status === "IN_PROGRESS"
              ? `Resume ${MODULE_INFO[next!].label}`
              : next
              ? `Start ${MODULE_INFO[next].label}`
              : "View test"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-slate-400">{current.completedModules} of 4 modules done</span>
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

const TREND_COLORS = { LISTENING: "#0ea5e9", READING: "#10b981", WRITING: "#f59e0b", SPEAKING: "#8b5cf6" } as const;

function Trend({ trend }: { trend: Dashboard["trend"] }) {
  const W = 640, H = 180, L = 28, R = 12, T = 12, B = 20;
  const x = (i: number) => L + (i / Math.max(trend.length - 1, 1)) * (W - L - R);
  const y = (b: number) => T + (1 - b / 9) * (H - T - B);
  return (
    <div className="mt-8 border-t border-slate-100 pt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold">Band over time</h3>
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          {MODULE_ORDER.map((m) => (
            <span key={m} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: TREND_COLORS[m] }} />{MODULE_INFO[m].label}</span>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full">
        {[0, 3, 6, 9].map((b) => (
          <g key={b}>
            <line x1={L} x2={W - R} y1={y(b)} y2={y(b)} stroke="#f1f5f9" />
            <text x={L - 8} y={y(b) + 4} fontSize="11" textAnchor="end" fill="#94a3b8">{b}</text>
          </g>
        ))}
        {MODULE_ORDER.map((m) => {
          const pts = trend.map((t, i) => ({ ...t, i })).filter((t) => t.module === m);
          return pts.length > 1 ? (
            <polyline key={m} fill="none" stroke={TREND_COLORS[m]} strokeOpacity="0.35" strokeWidth="2" points={pts.map((p) => `${x(p.i)},${y(p.band)}`).join(" ")} />
          ) : null;
        })}
        {trend.map((t, i) => (
          <circle key={i} cx={x(i)} cy={y(t.band)} r={5} fill="#fff" stroke={TREND_COLORS[t.module]} strokeWidth="2.5">
            <title>{`${MODULE_INFO[t.module].label}: ${t.band} (${new Date(t.date).toLocaleDateString()})`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}
