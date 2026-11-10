/**
 * Dual-sink analytics.
 *
 * Every event goes to:
 *   1. Google Analytics 4 (gtag.js) — the existing marketing/behaviour reports.
 *   2. The NestJS backend (`POST /api/events/batch`) — durable per-user history
 *      in MySQL, so candidates can see their own activity and we can analyse it.
 *
 * Events are batched in memory and flushed on a short timer, when the batch is
 * full, and when the page is hidden/unloaded (keepalive). A failed flush is
 * retried once on the next tick; analytics never blocks the UI.
 *
 * Measurement ID: G-ZBNSRCJKPB (override with NEXT_PUBLIC_GA_ID).
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZBNSRCJKPB";

/** GA4 only runs in production by default, so local traffic never pollutes it. */
export const ANALYTICS_ENABLED =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_GA_DEBUG === "1";

/**
 * The database sink is separate from GA4: it is safe (and useful) in local dev,
 * where you want to inspect your own activity rows.
 */
const DB_SINK_ENABLED =
  process.env.NODE_ENV !== "test" || process.env.NEXT_PUBLIC_ANALYTICS_DB === "1";

export type AnalyticsParams = Record<string, unknown>;

export interface AnalyticsIdentity {
  id: string;
  track?: string;
  targetBand?: number;
}

export interface TrackContext {
  testId?: string;
  attemptId?: string;
  testType?: string;
  module?: string;
}

interface QueuedEvent {
  name: string;
  path?: string;
  sessionId?: string;
  testId?: string;
  attemptId?: string;
  module?: string;
  testType?: string;
  properties?: Record<string, unknown>;
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

// ---------------------------------------------------------------------------
// DB sink queue
// ---------------------------------------------------------------------------

const FLUSH_INTERVAL_MS = 4_000;
const MAX_BATCH = 50;
const MAX_QUEUE = 200;
const SESSION_KEY = "ielts_session_id";

let queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushing = false;
let listenersBound = false;

function sessionId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id.slice(0, 64);
  } catch {
    return undefined;
  }
}

function contextFromParams(params: AnalyticsParams): TrackContext {
  const pickString = (...keys: string[]) => {
    for (const key of keys) {
      const value = params[key];
      if (typeof value === "string" && value) return value.slice(0, 64);
    }
    return undefined;
  };
  return {
    testId: pickString("testId", "test_id", "testIdOrSlug"),
    attemptId: pickString("attemptId", "attempt_id"),
    testType: pickString("testType", "test_type", "type"),
    module: pickString("module"),
  };
}

function enqueue(event: QueuedEvent): void {
  if (typeof window === "undefined" || !DB_SINK_ENABLED) return;
  bindFlushListeners();
  if (queue.length >= MAX_QUEUE) queue.shift();
  queue.push(event);
  if (queue.length >= MAX_BATCH) {
    void flushEvents();
    return;
  }
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushEvents();
  }, FLUSH_INTERVAL_MS);
}

/** Sends queued events to the database sink. Safe to call at any time. */
export async function flushEvents(keepalive = false): Promise<void> {
  if (typeof window === "undefined" || !queue.length || flushing) return;
  flushing = true;
  const batch = queue.splice(0, MAX_BATCH);
  try {
    const res = await fetch("/api/events/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      keepalive,
      body: JSON.stringify({ events: batch }),
    });
    if (!res.ok) throw new Error(`Event ingest failed (${res.status})`);
  } catch {
    // Put the batch back (unless it would overflow) so a transient backend
    // hiccup does not lose the trail. The next flush retries it.
    queue = [...batch, ...queue].slice(-MAX_QUEUE);
  } finally {
    flushing = false;
  }
}

function bindFlushListeners(): void {
  if (listenersBound || typeof window === "undefined") return;
  listenersBound = true;
  window.addEventListener("pagehide", () => void flushEvents(true));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") void flushEvents(true);
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

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

/**
 * Records one event in GA4 and the database.
 *
 * Pass the test/attempt context as the third argument for precise attribution;
 * common snake_case keys in `params` are also recognised.
 */
export function track(event: string, params: AnalyticsParams = {}, context: TrackContext = {}): void {
  if (typeof window === "undefined") return;
  applyIdentity();

  // 1. GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  } else {
    (window.__gaQueue ||= []).push({ event, params });
  }

  // 2. MySQL
  const inferred = contextFromParams(params);
  enqueue({
    name: event.slice(0, 64),
    path: currentPagePath() || undefined,
    sessionId: sessionId(),
    testId: context.testId ?? inferred.testId,
    attemptId: context.attemptId ?? inferred.attemptId,
    testType: context.testType ?? inferred.testType,
    module: context.module ?? inferred.module,
    properties: params,
  });
}

/** Browser session id shared with the activity log; used to join events to attempts. */
export function analyticsSessionId(): string | undefined {
  return sessionId();
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

/** Flush GA events queued before the tag finished loading. */
export function flushQueue(): void {
  if (typeof window === "undefined") return;
  applyIdentity();
  const queued = window.__gaQueue;
  if (!queued?.length || typeof window.gtag !== "function") return;
  window.__gaQueue = [];
  for (const { event, params } of queued) window.gtag("event", event, params);
}
