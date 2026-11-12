"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT_ID, ADSENSE_SLOTS, type AdPlacement } from "@/lib/seo";

interface AdBannerProps {
  /**
   * Which AdSense unit to show. Each placement maps to an ad unit ID set in
   * the environment (NEXT_PUBLIC_ADSENSE_SLOT_DISPLAY / _IN_ARTICLE / _MULTIPLEX).
   * Defaults to "display".
   */
  placement?: AdPlacement;
  /** Explicit ad slot ID; overrides the placement's configured slot. */
  slot?: string;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Shows a small "Advertisement" label (AdSense-compliant). Defaults to true. */
  showLabel?: boolean;
  /** Reserved height to prevent layout shift (CLS). Defaults per placement. */
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const DEFAULT_HEIGHT: Record<AdPlacement, number> = {
  display: 100,
  "in-article": 120,
  multiplex: 280,
};

/**
 * A single AdSense unit. Renders nothing when the unit's slot ID is not
 * configured, so pages never show empty ad boxes (Auto ads, enabled in the
 * AdSense console, still work through the global script in app/layout.tsx).
 */
export function AdBanner({
  placement = "display",
  slot,
  className = "",
  showLabel = true,
  minHeight,
}: AdBannerProps) {
  const adSlot = slot || ADSENSE_SLOTS[placement];
  const pathname = usePathname();
  const adRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const el = adRef.current;
    if (!el || el.getAttribute("data-adsbygoogle-status")) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers or network failures: fail silently.
    }
  }, [adSlot, pathname]);

  if (!adSlot) return null;

  const formatProps =
    placement === "in-article"
      ? { "data-ad-format": "fluid", "data-ad-layout": "in-article", style: { display: "block", textAlign: "center" as const } }
      : placement === "multiplex"
        ? { "data-ad-format": "autorelaxed", style: { display: "block" } }
        : { "data-ad-format": "auto", "data-full-width-responsive": "true", style: { display: "block", width: "100%" } };

  return (
    <aside
      aria-label="Advertisement"
      className={`my-8 w-full overflow-hidden text-center ${className}`}
      data-analytics-ignore="true"
    >
      {showLabel && (
        <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-surface-400">
          Advertisement
        </span>
      )}
      <div className="w-full overflow-hidden" style={{ minHeight: `${minHeight ?? DEFAULT_HEIGHT[placement]}px` }}>
        {/* key forces a fresh <ins> per route so AdSense can fill it again after client navigation */}
        <ins
          key={`${pathname}-${adSlot}`}
          ref={adRef}
          className="adsbygoogle"
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={adSlot}
          {...formatProps}
        />
      </div>
    </aside>
  );
}
