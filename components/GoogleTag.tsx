"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ANALYTICS_ENABLED,
  GA_ID,
  currentPagePath,
  flushQueue,
  track,
} from "@/lib/analytics";

const SCROLL_STEPS = [25, 50, 75, 90];
const MAX_ERRORS_PER_PAGE = 10;

/** Text content of a node, trimmed and capped. Never includes input values. */
function readableText(node: HTMLElement): string | undefined {
  const text = (node.innerText || node.getAttribute("aria-label") || node.getAttribute("title") || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
  return text || undefined;
}

/** Human-readable, PII-free description of the element that was clicked. */
function describeElement(node: HTMLElement) {
  const input = node instanceof HTMLInputElement ? node : null;
  const anchor = node.closest("a") as HTMLAnchorElement | null;

  return {
    element: node.tagName.toLowerCase(),
    element_id: node.id || undefined,
    element_text: readableText(node),
    element_role: node.getAttribute("role") || undefined,
    element_name: input?.name || node.getAttribute("name") || undefined,
    element_type: input?.type || undefined,
    href: anchor?.href || undefined,
    action: node.getAttribute("data-analytics") || undefined,
    page_path: currentPagePath(),
  };
}

/** Field description for change/focus events: name and size only, no values. */
function describeField(node: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const isText =
    node instanceof HTMLTextAreaElement ||
    (node instanceof HTMLInputElement && !["password", "hidden", "checkbox", "radio", "file"].includes(node.type));

  return {
    field_name: node.name || node.id || undefined,
    field_type: node instanceof HTMLInputElement ? node.type : node.tagName.toLowerCase(),
    // Length only — the typed value is never sent.
    field_length: isText ? node.value.length : undefined,
    field_filled: isText ? node.value.trim().length > 0 : undefined,
    form_id: node.form?.id || undefined,
    page_path: currentPagePath(),
  };
}

function mediaSource(node: HTMLMediaElement): string | undefined {
  const raw = node.currentSrc || node.getAttribute("src") || "";
  if (!raw) return undefined;
  return raw.split("?")[0].split("/").pop()?.slice(0, 100) || undefined;
}

/**
 * Google Analytics 4 (gtag.js) + behavioural tracking.
 *
 * Sends: page_view (initial + every client-side navigation), ui_click on every
 * click, form_start/form_field/form_submit, keyboard_shortcut, outbound_click,
 * file_download, scroll_depth, media_play/media_pause/media_complete, page_hide
 * (time on page) and js_error.
 */
export function GoogleTag() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [ready, setReady] = useState(false);
  const scrollMarks = useRef<Set<number>>(new Set());
  const errorCount = useRef(0);
  const pageStartedAt = useRef<number>(Date.now());
  const lastPageView = useRef<string | null>(null);
  const startedForms = useRef<Set<string>>(new Set());
  const touchedFields = useRef<Set<string>>(new Set());
  const lastShortcut = useRef<{ combo: string; at: number }>({ combo: "", at: 0 });

  // Virtual page_view on load and on every route/query change. gtag's own
  // automatic page_view is disabled (send_page_view: false) so this is the
  // only source.
  useEffect(() => {
    if (!ready) return;

    const key = `${pathname}?${searchParams.toString()}`;
    if (lastPageView.current === key) return;
    lastPageView.current = key;

    scrollMarks.current = new Set();
    errorCount.current = 0;
    startedForms.current = new Set();
    touchedFields.current = new Set();
    pageStartedAt.current = Date.now();

    const path = currentPagePath();
    track("page_view", {
      // page_location is what GA4's Pages report uses. Sending the normalised
      // path keeps /attempt/<uuid> from creating one row per attempt.
      page_location: `${window.location.origin}${path}`,
      page_path: path,
      page_title: document.title,
      page_referrer: document.referrer || undefined,
    });
  }, [ready, pathname, searchParams]);

  // Global behavioural listeners.
  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;

    const onClick = (ev: MouseEvent) => {
      const target = ev.target as Element | null;
      if (!target || target.closest("[data-analytics-ignore]")) return;

      const node =
        (target.closest(
          "a,button,[role='button'],input,select,textarea,label,summary,[data-analytics]",
        ) as HTMLElement | null) ?? (target as HTMLElement);

      // Never describe password fields.
      if (node instanceof HTMLInputElement && node.type === "password") return;

      const params = describeElement(node);
      track("ui_click", params);

      const anchor = node.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      try {
        const url = new URL(anchor.href);
        if (url.hostname !== window.location.hostname) {
          track("outbound_click", {
            link_url: anchor.href,
            link_domain: url.hostname,
            ...params,
          });
        }
        if (/\.(pdf|docx?|xlsx?|pptx?|zip|csv|txt)$/i.test(url.pathname)) {
          track("file_download", {
            file_name: url.pathname.split("/").pop(),
            link_url: anchor.href,
            ...params,
          });
        }
      } catch {
        // Ignore malformed hrefs (mailto:, tel:, javascript:).
      }
    };

    const onFormStart = (ev: Event) => {
      const field = ev.target as HTMLElement | null;
      if (!field) return;
      const form = field.closest("form");
      if (!form) return;
      const id = form.id || form.getAttribute("name") || currentPagePath();
      if (startedForms.current.has(id)) return;
      startedForms.current.add(id);
      track("form_start", {
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        page_path: currentPagePath(),
      });
    };

    const onChange = (ev: Event) => {
      const node = ev.target as HTMLElement | null;
      if (
        !node ||
        !(
          node instanceof HTMLInputElement ||
          node instanceof HTMLTextAreaElement ||
          node instanceof HTMLSelectElement
        )
      ) {
        return;
      }
      // Password and file inputs are never described.
      if (node instanceof HTMLInputElement && (node.type === "password" || node.type === "file")) return;

      const key = `${node.name || node.id}:${node.value.length}`;
      if (touchedFields.current.has(key)) return;
      touchedFields.current.add(key);

      track("form_field", describeField(node));
    };

    const onSubmit = (ev: Event) => {
      const form = ev.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;
      track("form_submit", {
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        // Field names only — never values.
        form_fields: Array.from(form.elements)
          .map((el) => (el as HTMLInputElement).name)
          .filter(Boolean)
          .slice(0, 25),
        page_path: currentPagePath(),
      });
    };

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.repeat) return;
      if (!ev.ctrlKey && !ev.metaKey && !ev.altKey) return;
      const key = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
      const parts = [
        ev.ctrlKey ? "Ctrl" : "",
        ev.metaKey ? "Meta" : "",
        ev.altKey ? "Alt" : "",
        ev.shiftKey ? "Shift" : "",
        key,
      ].filter(Boolean);
      const combo = parts.join("+");
      const now = Date.now();
      if (lastShortcut.current.combo === combo && now - lastShortcut.current.at < 250) return;
      lastShortcut.current = { combo, at: now };
      track("keyboard_shortcut", { shortcut: combo, page_path: currentPagePath() });
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        const percent = max <= 0 ? 100 : Math.round((window.scrollY / max) * 100);
        for (const step of SCROLL_STEPS) {
          if (percent >= step && !scrollMarks.current.has(step)) {
            scrollMarks.current.add(step);
            track("scroll_depth", {
              percent_scrolled: step,
              page_path: currentPagePath(),
            });
          }
        }
      });
    };

    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      track("page_hide", {
        page_path: currentPagePath(),
        seconds_on_page: Math.round((Date.now() - pageStartedAt.current) / 1000),
      });
    };

    const onMediaPlay = (ev: Event) => {
      const node = ev.target as HTMLMediaElement | null;
      if (!node?.tagName?.match(/^(AUDIO|VIDEO)$/)) return;
      track("media_play", {
        media_type: node.tagName.toLowerCase(),
        media_source: mediaSource(node),
        page_path: currentPagePath(),
      });
    };

    const onMediaPause = (ev: Event) => {
      const node = ev.target as HTMLMediaElement | null;
      if (!node?.tagName?.match(/^(AUDIO|VIDEO)$/)) return;
      // A pause fired at the very end is reported as media_complete instead.
      if (node.ended) return;
      track("media_pause", {
        media_type: node.tagName.toLowerCase(),
        media_source: mediaSource(node),
        seconds_played: Math.round(node.currentTime),
        page_path: currentPagePath(),
      });
    };

    const onMediaEnded = (ev: Event) => {
      const node = ev.target as HTMLMediaElement | null;
      if (!node?.tagName?.match(/^(AUDIO|VIDEO)$/)) return;
      track("media_complete", {
        media_type: node.tagName.toLowerCase(),
        media_source: mediaSource(node),
        seconds_played: Math.round(node.currentTime),
        page_path: currentPagePath(),
      });
    };

    const onError = (ev: ErrorEvent) => {
      if (errorCount.current++ >= MAX_ERRORS_PER_PAGE) return;
      track("js_error", {
        message: String(ev.message || "Unknown error").slice(0, 250),
        source: ev.filename || undefined,
        line: ev.lineno || undefined,
        page_path: currentPagePath(),
      });
    };

    const onRejection = (ev: PromiseRejectionEvent) => {
      if (errorCount.current++ >= MAX_ERRORS_PER_PAGE) return;
      const reason = ev.reason as { message?: string } | string | undefined;
      const message =
        typeof reason === "string" ? reason : reason?.message || "Unhandled promise rejection";
      track("js_error", {
        message: String(message).slice(0, 250),
        kind: "unhandledrejection",
        page_path: currentPagePath(),
      });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFormStart, true);
    document.addEventListener("change", onChange, true);
    document.addEventListener("focusout", onChange, true);
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("keydown", onKeyDown, true);
    // Media events do not bubble, so they are captured at the document level.
    document.addEventListener("play", onMediaPlay, true);
    document.addEventListener("pause", onMediaPause, true);
    document.addEventListener("ended", onMediaEnded, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFormStart, true);
      document.removeEventListener("change", onChange, true);
      document.removeEventListener("focusout", onChange, true);
      document.removeEventListener("submit", onSubmit, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("play", onMediaPlay, true);
      document.removeEventListener("pause", onMediaPause, true);
      document.removeEventListener("ended", onMediaEnded, true);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!ANALYTICS_ENABLED) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        onReady={() => {
          flushQueue();
          setReady(true);
        }}
      >
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
      </Script>
    </>
  );
}
