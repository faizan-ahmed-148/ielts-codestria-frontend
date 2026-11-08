import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Circle,
  CircleDashed,
  Headphones,
  Loader2,
  type LucideIcon,
  Mic,
  PenLine,
} from "lucide-react";
import type { ModuleStatus } from "@/lib/api";
import type { ModuleKind } from "@/lib/content.types";

export const MODULE_ORDER: ModuleKind[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];

export const MODULE_INFO: Record<
  ModuleKind,
  { label: string; Icon: LucideIcon; tile: string; bar: string; scoring: string; description: string }
> = {
  LISTENING: {
    label: "Listening",
    Icon: Headphones,
    tile: "bg-sky-50 text-sky-600 ring-sky-100",
    bar: "bg-sky-500",
    scoring: "40 questions · instant marking",
    description: "Four recordings: conversations, a talk and a lecture.",
  },
  READING: {
    label: "Reading",
    Icon: BookOpen,
    tile: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    bar: "bg-emerald-500",
    scoring: "40 questions · instant marking",
    description: "Passages with True/False, multiple choice and gap-fill questions.",
  },
  WRITING: {
    label: "Writing",
    Icon: PenLine,
    tile: "bg-amber-50 text-amber-600 ring-amber-100",
    bar: "bg-amber-500",
    scoring: "2 tasks · AI examiner",
    description: "Task 1 report or letter, plus a Task 2 essay.",
  },
  SPEAKING: {
    label: "Speaking",
    Icon: Mic,
    tile: "bg-violet-50 text-violet-600 ring-violet-100",
    bar: "bg-violet-500",
    scoring: "3 parts · AI examiner",
    description: "Interview, a 2-minute talk and a discussion.",
  },
};

export function ModuleIcon({ module, size = "md" }: { module: ModuleKind; size?: "sm" | "md" | "lg" }) {
  const { Icon, tile } = MODULE_INFO[module];
  const dims = { sm: "h-8 w-8 rounded-lg [&>svg]:h-4 [&>svg]:w-4", md: "h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5", lg: "h-14 w-14 rounded-2xl [&>svg]:h-6 [&>svg]:w-6" }[size];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ring-1 ring-inset ${tile} ${dims}`}>
      <Icon strokeWidth={2} />
    </span>
  );
}

const STATUS: Record<ModuleStatus, { label: string; cls: string; Icon: LucideIcon; spin?: boolean }> = {
  NOT_STARTED: { label: "Not started", cls: "bg-slate-100 text-slate-600", Icon: Circle },
  IN_PROGRESS: { label: "In progress", cls: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200", Icon: CircleDashed },
  SCORING: { label: "Scoring", cls: "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200", Icon: Loader2, spin: true },
  FAILED: { label: "Needs retry", cls: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200", Icon: AlertTriangle },
  COMPLETED: { label: "Completed", cls: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200", Icon: CheckCircle2 },
};

export function StatusPill({ status }: { status: ModuleStatus }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${s.cls}`}>
      <s.Icon className={`h-3.5 w-3.5 ${s.spin ? "animate-spin" : ""}`} />
      {s.label}
    </span>
  );
}

export function bandTone(band: number) {
  if (band >= 7) return { text: "text-emerald-600", stroke: "#10b981", soft: "bg-emerald-50 text-emerald-700" };
  if (band >= 5.5) return { text: "text-brand-600", stroke: "#4f46e5", soft: "bg-brand-50 text-brand-700" };
  if (band >= 4) return { text: "text-amber-600", stroke: "#f59e0b", soft: "bg-amber-50 text-amber-700" };
  return { text: "text-red-600", stroke: "#ef4444", soft: "bg-red-50 text-red-700" };
}

/** A circular gauge showing a band out of 9. */
export function BandRing({ band, size = 64, label }: { band: number | null | undefined; size?: number; label?: string }) {
  const stroke = Math.max(4, size / 12);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const has = band !== null && band !== undefined;
  const tone = has ? bandTone(band) : null;
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef0f4" strokeWidth={stroke} />
        {has && (
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={tone!.stroke} strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - band / 9)} className="transition-[stroke-dashoffset] duration-700" />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className={`font-bold tabular-nums ${has ? tone!.text : "text-slate-300"}`} style={{ fontSize: size * 0.3 }}>
          {has ? band.toFixed(1) : "–"}
        </span>
        {label && size >= 80 && <span className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">{label}</span>}
      </div>
    </div>
  );
}

/** Compact band chip, e.g. in lists. */
export function BandBadge({ band }: { band: number | null | undefined }) {
  if (band === null || band === undefined) return <span className="text-sm text-slate-300">–</span>;
  return <span className={`rounded-lg px-2 py-0.5 text-sm font-bold tabular-nums ${bandTone(band).soft}`}>{band.toFixed(1)}</span>;
}

export function ProgressBar({ value, className = "", color = "bg-brand-600" }: { value: number; className?: string; color?: string }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-all duration-700`}
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          boxShadow: color.includes("emerald") ? "0 0 8px rgba(16,185,129,0.4)" : undefined,
        }}
      />
    </div>
  );
}

export function PageHeader({ eyebrow, title, description, actions }: {
  eyebrow?: string; title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-brand-200/60 bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-slate-500 leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700"
         style={{ borderLeft: "3px solid #ef4444" }}>
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
      <span>{message}</span>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-2xl ${className}`} />;
}

export function wordCount(text: string | undefined) {
  return (text ?? "").trim().split(/\s+/).filter(Boolean).length;
}
