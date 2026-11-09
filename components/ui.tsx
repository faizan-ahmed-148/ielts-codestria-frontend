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
    tile: "bg-sky-50 text-sky-700 border-sky-200/70",
    bar: "bg-sky-600",
    scoring: "40 questions · instant marking",
    description: "Four audio recordings with academic and situational dialogues.",
  },
  READING: {
    label: "Reading",
    Icon: BookOpen,
    tile: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    bar: "bg-emerald-600",
    scoring: "40 questions · instant marking",
    description: "Three comprehensive passages with authentic academic texts.",
  },
  WRITING: {
    label: "Writing",
    Icon: PenLine,
    tile: "bg-amber-50 text-amber-700 border-amber-200/70",
    bar: "bg-amber-600",
    scoring: "2 tasks · AI examiner rubric",
    description: "Task 1 graphical report/letter and Task 2 argument essay.",
  },
  SPEAKING: {
    label: "Speaking",
    Icon: Mic,
    tile: "bg-indigo-50 text-indigo-700 border-indigo-200/70",
    bar: "bg-indigo-600",
    scoring: "3 parts · examiner criteria",
    description: "Personal interview, long-turn cue card and discussion.",
  },
};

export function ModuleIcon({ module, size = "md" }: { module: ModuleKind; size?: "sm" | "md" | "lg" }) {
  const { Icon, tile } = MODULE_INFO[module];
  const dims = {
    sm: "h-7 w-7 rounded-md [&>svg]:h-3.5 [&>svg]:w-3.5",
    md: "h-9 w-9 rounded-lg [&>svg]:h-4 [&>svg]:w-4",
    lg: "h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5",
  }[size];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center border ${tile} ${dims}`}>
      <Icon strokeWidth={2} />
    </span>
  );
}

const STATUS: Record<ModuleStatus, { label: string; cls: string; Icon: LucideIcon; spin?: boolean }> = {
  NOT_STARTED: { label: "Not started", cls: "bg-zinc-100 text-zinc-600 border-zinc-200", Icon: Circle },
  IN_PROGRESS: { label: "In progress", cls: "bg-amber-50 text-amber-700 border-amber-200/80", Icon: CircleDashed },
  SCORING: { label: "Scoring", cls: "bg-indigo-50 text-indigo-700 border-indigo-200/80", Icon: Loader2, spin: true },
  FAILED: { label: "Needs retry", cls: "bg-rose-50 text-rose-700 border-rose-200/80", Icon: AlertTriangle },
  COMPLETED: { label: "Completed", cls: "bg-emerald-50 text-emerald-700 border-emerald-200/80", Icon: CheckCircle2 },
};

export function StatusPill({ status }: { status: ModuleStatus }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium border ${s.cls}`}>
      <s.Icon className={`h-3 w-3 ${s.spin ? "animate-spin" : ""}`} />
      <span>{s.label}</span>
    </span>
  );
}

export function bandTone(band: number) {
  if (band >= 7.5) return { text: "text-emerald-700", stroke: "#059669", soft: "bg-emerald-50 text-emerald-800 border border-emerald-200/80" };
  if (band >= 6.5) return { text: "text-indigo-700", stroke: "#4351e8", soft: "bg-indigo-50 text-indigo-800 border border-indigo-200/80" };
  if (band >= 5.0) return { text: "text-amber-700", stroke: "#d97706", soft: "bg-amber-50 text-amber-800 border border-amber-200/80" };
  return { text: "text-rose-700", stroke: "#e11d48", soft: "bg-rose-50 text-rose-800 border border-rose-200/80" };
}

/** A clean circular gauge showing a band out of 9. */
export function BandRing({ band, size = 56, label }: { band: number | null | undefined; size?: number; label?: string }) {
  const stroke = Math.max(3, size / 14);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const has = band !== null && band !== undefined;
  const tone = has ? bandTone(band) : null;
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e9eaee" strokeWidth={stroke} />
        {has && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={tone!.stroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - band / 9)}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className={`font-semibold tabular-nums ${has ? tone!.text : "text-zinc-300"}`} style={{ fontSize: size * 0.32 }}>
          {has ? band.toFixed(1) : "–"}
        </span>
        {label && size >= 70 && (
          <span className="mt-1 text-[9px] font-medium uppercase tracking-wider text-zinc-400">{label}</span>
        )}
      </div>
    </div>
  );
}

/** Compact band chip */
export function BandBadge({ band }: { band: number | null | undefined }) {
  if (band === null || band === undefined) return <span className="text-xs text-zinc-400 font-mono">–</span>;
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold tabular-nums ${bandTone(band).soft}`}>
      Band {band.toFixed(1)}
    </span>
  );
}

export function ProgressBar({ value, className = "", color = "bg-zinc-900" }: { value: number; className?: string; color?: string }) {
  return (
    <div className={`h-1.5 overflow-hidden rounded-full bg-zinc-100 ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-zinc-200/80">
      <div className="min-w-0 space-y-1.5">
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">{title}</h1>
        {description && <p className="max-w-2xl text-sm text-zinc-600 leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5 shrink-0">{actions}</div>}
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-rose-200 bg-rose-50/70 px-3.5 py-2.5 text-xs text-rose-800">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-600" />
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

export function wordCount(text: string | undefined) {
  return (text ?? "").trim().split(/\s+/).filter(Boolean).length;
}
