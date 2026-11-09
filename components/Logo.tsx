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
  const iconSizes = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-8 w-8 rounded-lg",
    lg: "h-9 w-9 rounded-xl",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="flex items-center gap-2.5">
      <Link
        href={href}
        className="group flex items-center gap-2.5 select-none transition-opacity hover:opacity-90"
      >
        {/* Official Codestria Mark with Sapphire Accent */}
        <div
          className={`relative flex shrink-0 items-center justify-center bg-zinc-950 text-white shadow-xs transition-transform duration-150 group-hover:scale-[1.03] ${iconSizes[size]}`}
          style={{
            border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none">
            <path
              d="M25.37 6.63A13.25 13.25 0 1 0 25.37 25.37L21.48 21.48A7.75 7.75 0 1 1 21.48 10.52Z"
              fill="#ffffff"
            />
            <rect x="22" y="13" width="5.5" height="5.5" rx="1" fill="#4351e8" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex items-center gap-2">
          <span
            className={`font-bold tracking-tight text-zinc-900 ${textSizes[size]} ${
              dark ? "text-white" : "text-zinc-900"
            }`}
          >
            Codestria
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
              dark
                ? "bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200/80"
            }`}
          >
            IELTS
          </span>
        </div>
      </Link>
    </div>
  );
}
