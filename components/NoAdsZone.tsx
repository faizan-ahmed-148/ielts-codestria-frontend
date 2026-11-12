"use client";

import { usePathname } from "next/navigation";

/**
 * Hides every AdSense element (including Auto ads, anchor and vignette ads)
 * while the timed exam room is open. Ads must never sit next to test
 * controls, where accidental clicks are likely and would break AdSense policy.
 */
export function NoAdsZone() {
  const pathname = usePathname();
  if (!pathname.startsWith("/attempt/") || pathname.endsWith("/result")) return null;
  return (
    <style>{`ins.adsbygoogle, .google-auto-placed, .adsbygoogle-noablate, iframe[id^="aswift_"], iframe[id^="google_ads_iframe"] { display: none !important; visibility: hidden !important; }`}</style>
  );
}
