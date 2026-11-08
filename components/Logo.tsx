"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  dark?: boolean;
  showBadge?: boolean;
  showSubtitle?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "wordmark";
}

export function Logo({
  href = "/",
  dark = false,
  showBadge = true,
  showSubtitle = true,
  size = "md",
  variant = "mark",
}: LogoProps) {
  const iconSizes = {
    sm: "h-8 w-8 rounded-lg",
    md: "h-9 w-9 rounded-xl",
    lg: "h-11 w-11 rounded-2xl",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className="flex items-center gap-3">
      <Link href={href} className="group flex items-center gap-2.5 transition">
        {/* Official Codestria App Icon Mark */}
        <div
          className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-[#0a0a0a] shadow-sm transition-transform duration-200 group-hover:scale-105 ${iconSizes[size]}`}
          style={{ border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.1)" }}
        >
          <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
            <g transform="translate(4 4) scale(0.75)">
              <path
                d="M25.37 6.63A13.25 13.25 0 1 0 25.37 25.37L21.48 21.48A7.75 7.75 0 1 1 21.48 10.52Z"
                fill="#ffffff"
              />
              <path d="M22.5 13h5.5v6h-5.5z" fill="#5B4BFF" />
            </g>
          </svg>

          {/* Live CD-IELTS Simulator Pulse Indicator */}
          <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
        </div>

        {/* Brand Text Typography */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${textSizes[size]} ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              Codestria<span className="text-[#5B4BFF]">.</span>
            </span>
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] font-black tracking-wider uppercase shadow-xs ${
                dark
                  ? "bg-[#5B4BFF]/25 text-indigo-200 ring-1 ring-[#5B4BFF]/50"
                  : "bg-gradient-to-r from-[#5B4BFF] to-indigo-600 text-white shadow-sm shadow-[#5B4BFF]/30"
              }`}
            >
              IELTS
            </span>
          </div>

          {showSubtitle && (
            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-[9px] font-bold tracking-widest uppercase ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Cambridge CD Simulator
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Codestria Parent Studio Badge */}
      {showBadge && (
        <a
          href="https://codestria.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Codestria Studio (codestria.com)"
          className={`hidden xl:inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
            dark
              ? "border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"
              : "border border-slate-200 bg-slate-50/80 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-900"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B4BFF]" />
          <span>by Codestria</span>
        </a>
      )}
    </div>
  );
}
