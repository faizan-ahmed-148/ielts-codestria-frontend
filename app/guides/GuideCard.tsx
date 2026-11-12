import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Guide } from "@/lib/guides";

export function GuideCard({ guide, compact = false }: { guide: Guide; compact?: boolean }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="card-hover group flex h-full flex-col p-5">
      <span className="eyebrow text-brand-600">{guide.category}</span>
      <h3 className="mt-2 font-display text-[16px] font-bold leading-snug text-surface-900 group-hover:text-brand-700">
        {guide.title}
      </h3>
      {!compact && <p className="mt-2 text-[14px] leading-relaxed text-surface-600">{guide.description}</p>}
      <div className="mt-auto flex items-center justify-between pt-4 text-[13px] text-surface-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {guide.readMinutes} min read
        </span>
        <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  );
}
