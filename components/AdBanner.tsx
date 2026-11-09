"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/seo";

interface AdBannerProps {
  /** Optional custom ad slot ID configured in Google AdSense console. */
  slot?: string;
  /** Responsive ad format. Defaults to "auto". */
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  /** Whether ad should take full container width. Defaults to true. */
  responsive?: boolean;
  /** Additional CSS classes for wrapper. */
  className?: string;
  /** Optional inline styles for the <ins> tag. */
  style?: React.CSSProperties;
  /** Shows a subtle compliant "ADVERTISEMENT" badge. Defaults to true. */
  showLabel?: boolean;
  /** Minimum container height to prevent Cumulative Layout Shift (CLS). Defaults to 90. */
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdBanner({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  style,
  showLabel = true,
  minHeight = 90,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // Avoid pushing multiple times to the same DOM element on re-renders
      if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
        pushed.current = true;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Gracefully handle adblocker or runtime network blocks
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 w-full overflow-hidden text-center transition-opacity duration-200 ${className}`}
      data-analytics-ignore="true"
    >
      {showLabel && (
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-surface-400">
          Advertisement
        </span>
      )}
      <div
        className="flex w-full items-center justify-center overflow-hidden rounded-xl border border-surface-200/60 bg-surface-100/40"
        style={{ minHeight: `${minHeight}px` }}
      >
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", ...style }}
          data-ad-client={ADSENSE_CLIENT_ID}
          {...(slot ? { "data-ad-slot": slot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </aside>
  );
}
