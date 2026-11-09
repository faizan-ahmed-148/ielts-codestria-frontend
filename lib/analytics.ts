/**
 * Google Analytics 4 helper. Every tracked action is sent to gtag.js, which
 * forwards it to the GA4 property.
 *
 * Measurement ID: G-ZBNSRCJKPB (override with NEXT_PUBLIC_GA_ID).
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZBNSRCJKPB";

/** Production only by default, so local dev traffic never pollutes analytics. */
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_GA_DEBUG === "1";

export type AnalyticsParams = Record<string, unknown>;

export interface AnalyticsIdentity {
  id: string;
  track?: string;
  targetBand?: number;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __gaQueue?: { event: string; params: AnalyticsParams }[];
  }
}

let pendingIdentity: AnalyticsIdentity | null | undefined;
let identityApplied = false;

/** Collapse dynamic URL segments so every attempt is not a "new page". */
export function normalizePath(pathname: string): string {
  if (/^\/attempt\/[^/]+\/result$/.test(pathname)) return "/attempt/[id]/result";
  if (/^\/attempt\/[^/]+$/.test(pathname)) return "/attempt/[id]";
  if (/^\/tests\/[^/]+$/.test(pathname)) return "/tests/[slug]";
  return pathname;
}

/** Normalised path plus only the query keys that are safe to report. */
export function currentPagePath(): string {
  if (typeof window === "undefined") return "";
  const search = new URLSearchParams(window.location.search);
  const safe = new URLSearchParams();
  for (const key of ["type", "book"]) {
    const value = search.get(key);
    if (value) safe.set(key, value.slice(0, 30));
  }
  const qs = safe.toString();
  return normalizePath(window.location.pathname) + (qs ? `?${qs}` : "");
}

/** Push one event to GA4. Events fired before gtag loads are queued. */
export function track(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  applyIdentity();
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
    return;
  }
  (window.__gaQueue ||= []).push({ event, params });
}

/** Attach the signed-in candidate to subsequent events (no email/name sent). */
export function identify(user: AnalyticsIdentity | null): void {
  pendingIdentity = user;
  identityApplied = false;
  applyIdentity();
}

function applyIdentity(): void {
  if (pendingIdentity === undefined || identityApplied) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  identityApplied = true;
  const user = pendingIdentity;
  if (user) {
    window.gtag("set", "user_id", user.id);
    window.gtag("set", "user_properties", {
      user_track: user.track ?? null,
      target_band: user.targetBand ?? null,
    });
  } else {
    window.gtag("set", "user_id", null);
    window.gtag("set", "user_properties", { user_track: null, target_band: null });
  }
}

/** Flush events queued before the tag finished loading. */
export function flushQueue(): void {
  if (typeof window === "undefined") return;
  applyIdentity();
  const queued = window.__gaQueue;
  if (!queued?.length || typeof window.gtag !== "function") return;
  window.__gaQueue = [];
  for (const { event, params } of queued) window.gtag("event", event, params);
}
