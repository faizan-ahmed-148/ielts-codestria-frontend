/**
 * Google Tag Manager helper. Every tracked action is pushed onto the GTM
 * dataLayer, so triggers/tags can be configured inside the GTM container.
 *
 * Container: GTM-MVCWRQWX (override with NEXT_PUBLIC_GTM_ID).
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MVCWRQWX";

/** Production only by default, so local dev traffic never pollutes analytics. */
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_GA_DEBUG === "1";

export type AnalyticsParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Push one event onto the dataLayer. No-op during server rendering. */
export function track(event: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
