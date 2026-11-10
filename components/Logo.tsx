"use client";

import Link from "next/link";

interface LogoProps {
  href?: string;
  dark?: boolean;
  showBadge?: boolean;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  href = "/",
  dark = false,
  showBadge = true,
  showSubtitle = false,
  size = "md",
}: LogoProps) {
  const iconSizes = { sm: "h-6 w-6", md: "h-8 w-8", lg: "h-10 w-10" };
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-lg" };

  return (
    <div className="flex items-center gap-2.5">
      <Link
        href={href}
        className="group flex items-center gap-2.5 select-none transition-opacity hover:opacity-90"
      >
        {/* Mark */}
        <div
          className={`relative flex shrink-0 items-center justify-center rounded-xl bg-surface-950 text-white shadow-sm transition-transform duration-200 group-hover:rotate-12 ${iconSizes[size]}`}
          style={{
            border: dark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <svg viewBox="0 0 32 32" fill="none" className="h-5 w-5">
            <path
              d="M16 3C9.373 3 4 8.373 4 15s5.373 12 12 12 12-5.373 12-12S22.627 3 16 3zM16 21c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"
              fill="#ffffff"
            />
            <rect x="19" y="17" width="5" height="5" rx="1" fill="#4356e8" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-start gap-0.5">
          <span
            className={`font-display font-bold tracking-tight ${textSizes[size]} ${
              dark ? "text-white" : "text-surface-900"
            }`}
          >
            Codestria
          </span>
          {showBadge && (
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                dark ? "border border-white/10 bg-white/10 text-white/80" : "border border-brand-200 bg-brand-50 text-brand-700"
              }`}
            >
              IELTS
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
