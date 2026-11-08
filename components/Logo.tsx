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
    sm: "h-7 w-7 rounded-md",
    md: "h-8 w-8 rounded-lg",
    lg: "h-9 w-9 rounded-lg",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-[15px]",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-2.5">
      <Link href={href} className="group flex items-center gap-2.5 select-none transition-opacity hover:opacity-90">
        {/* Architectural Codestria Glyph */}
        <div
          className={`relative flex shrink-0 items-center justify-center bg-zinc-950 text-white shadow-xs transition-transform duration-150 group-hover:scale-[1.02] ${iconSizes[size]}`}
          style={{
            border: dark ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(0,0,0,0.12)",
          }}
        >
          <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none">
            <path
              d="M24 7A12 12 0 1 0 24 25L20.5 21.5A7 7 0 1 1 20.5 10.5Z"
              fill="#ffffff"
            />
            <rect x="21" y="13" width="5" height="5" rx="1" fill="#4351e8" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex items-center gap-1.5">
          <span
            className={`font-semibold tracking-tight ${textSizes[size]} ${
              dark ? "text-white" : "text-zinc-900"
            }`}
          >
            Codestria
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
              dark
                ? "bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                : "bg-zinc-100 text-zinc-700 border border-zinc-200/80"
            }`}
          >
            IELTS
          </span>
        </div>
      </Link>

      {/* Subtle Studio Origin Link */}
      {showBadge && (
        <a
          href="https://codestria.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Codestria Studio"
          className={`hidden xl:inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium transition ${
            dark
              ? "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200"
              : "border border-zinc-200/70 bg-zinc-50/70 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/70"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>codestria.com</span>
        </a>
      )}
    </div>
  );
}
