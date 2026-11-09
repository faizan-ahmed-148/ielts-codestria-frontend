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
    tile: "bg-sky-50 text-sky-700 border-sky-200",
    bar: "bg-sky-500",
    scoring: "40 questions · instant marking",
    description: "Four audio recordings with academic and everyday dialogues.",
  },
  READING: {
    label: "Reading",
    Icon: BookOpen,
    tile: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-500",
    scoring: "40 questions · instant marking",
    description: "Three comprehensive passages with authentic academic texts.",
  },
  WRITING: {
    label: "Writing",
    Icon: PenLine,
    tile: "bg-amber-50 text-amber-700 border-amber-200",
    bar: "bg-amber-500",
    scoring: "2 tasks · AI examiner rubric",
    description: "Task 1 report or letter and Task 2 argument essay.",
  },
  SPEAKING: {
    label: "Speaking",
    Icon: Mic,
    tile: "bg-brand-50 text-brand-700 border-brand-200",
    bar: "bg-brand-500",
    scoring: "3 parts · examiner criteria",
    description: "Interview, long-turn cue card and discussion.",
  },
};

export function ModuleIcon({ module, size = "md" }: { module: ModuleKind; size?: "sm" | "md" | "lg" }) {
  const { Icon, tile } = MODULE_INFO[module];
  const dims = {
    sm: "h-8 w-8 rounded-lg [&>svg]:h-4 [&>svg]:w-4",
    md: "h-10 w-10 rounded-xl [&>svg]:h-5 [&>svg]:w-5",
    lg: "h-12 w-12 rounded-2xl [&>svg]:h-6 [&>svg]:w-6",
  }[size];
  return (
    <span className={`inline-flex shrink-0 items-center justify-center border ${tile} ${dims}`}>
      <Icon strokeWidth={2} />
    </span>
  );
}

const STATUS: Record<ModuleStatus, { label: string; cls: string; Icon: LucideIcon; spin?: boolean }> = {
  NOT_STARTED: { label: "Not started", cls: "bg-surface-100 text-surface-600 border-surface-200", Icon: Circle },
  IN_PROGRESS: { label: "In progress", cls: "bg-amber-50 text-amber-700 border-amber-200", Icon: CircleDashed },
  SCORING: { label: "Scoring", cls: "bg-brand-50 text-brand-700 border-brand-200", Icon: Loader2, spin: true },
  FAILED: { label: "Needs retry", cls: "bg-rose-50 text-rose-700 border-rose-200", Icon: AlertTriangle },
  COMPLETED: { label: "Completed", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: CheckCircle2 },
};

export function StatusPill({ status }: { status: ModuleStatus }) {
  const s = STATUS[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${s.cls}`}>
      <s.Icon className={`h-3.5 w-3.5 ${s.spin ? "animate-spin" : ""}`} />
      <span>{s.label}</span>
    </span>
  );
}

export function bandTone(band: number) {
  if (band >= 7.5)
    return {
      text: "text-emerald-700",
      stroke: "#059669",
      soft: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    };
  if (band >= 6.5)
    return {
      text: "text-brand-700",
      stroke: "#5a74f7",
      soft: "bg-brand-50 text-brand-800 border border-brand-200",
    };
  if (band >= 5.0)
    return {
      text: "text-amber-700",
      stroke: "#d97706",
      soft: "bg-amber-50 text-amber-800 border border-amber-200",
    };
  return { text: "text-rose-700", stroke: "#e11d48", soft: "bg-rose-50 text-rose-800 border border-rose-200" };
}

/** A clean circular gauge showing a band out of 9. */
export function BandRing({ band, size = 56, label }: { band: number | null | undefined; size?: number; label?: string }) {
  const stroke = Math.max(3, size / 14);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const has = band !== null && band !== undefined;
  const tone = has ? bandTone(band) : null;
  return (
    <div className="relative inline-flex shrink-0 select-none items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5ebf4" strokeWidth={stroke} />
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
        <span className={`font-display font-bold tabular-nums ${has ? tone!.text : "text-surface-300"}`} style={{ fontSize: size * 0.32 }}>
          {has ? band.toFixed(1) : "–"}
        </span>
        {label && size >= 70 && (
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-surface-400">{label}</span>
        )}
      </div>
    </div>
  );
}

/** Compact band chip */
export function BandBadge({ band }: { band: number | null | undefined }) {
  if (band === null || band === undefined) return <span className="font-mono text-sm text-surface-400">–</span>;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold tabular-nums ${bandTone(band).soft}`}>
      Band {band.toFixed(1)}
    </span>
  );
}

export function ProgressBar({ value, className = "", color = "bg-brand-500" }: { value: number; className?: string; color?: string }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-surface-200/80 ${className}`}>
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
    <div className="flex flex-col gap-5 border-b border-surface-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 space-y-2">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-brand-600">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-surface-900 sm:text-4xl">
          {title}
        </h1>
        {description && <p className="max-w-2xl text-[15px] leading-relaxed text-surface-600">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm text-rose-800">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
      <span className="leading-relaxed">{message}</span>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`shimmer rounded-xl ${className}`} />;
}

export function wordCount(text: string | undefined) {
  return (text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

/** Reusable section heading for marketing and content pages. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        centered ? "mx-auto max-w-2xl text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={centered ? "" : "max-w-2xl"}>
        {eyebrow && (
          <div className={`eyebrow flex items-center gap-2 text-brand-600 ${centered ? "justify-center" : ""}`}>
            {eyebrow}
          </div>
        )}
        <h2 className="section-heading mt-2">{title}</h2>
        {description && <p className={`section-copy ${centered ? "mx-auto" : ""}`}>{description}</p>}
      </div>
      {actions && <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>{actions}</div>}
    </div>
  );
}

/** Simple labelled stat block used on dashboards and marketing strips. */
export function StatCard({
  label,
  value,
  hint,
  Icon,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  Icon?: LucideIcon;
}) {
  return (
    <div className="card flex items-center gap-4 p-5">
      {Icon && (
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <div className="min-w-0">
        <div className="font-display text-2xl font-bold leading-none tabular-nums text-surface-900">{value}</div>
        <div className="mt-1.5 text-[13px] font-semibold text-surface-700">{label}</div>
        {hint && <div className="text-xs text-surface-500">{hint}</div>}
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  Icon,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  Icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-300 bg-surface-50/60 px-6 py-14 text-center">
      {Icon && (
        <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-surface-400 shadow-xs ring-1 ring-surface-200">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <p className="font-display text-base font-bold text-surface-900">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-surface-500">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
