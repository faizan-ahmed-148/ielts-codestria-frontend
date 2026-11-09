"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ANALYTICS_ENABLED, GTM_ID, track } from "@/lib/analytics";

const SCROLL_STEPS = [25, 50, 75, 90];
const MAX_ERRORS_PER_PAGE = 10;

/** Human-readable, PII-free description of the element that was clicked. */
function describeElement(node: HTMLElement) {
  const text = (node.innerText || node.getAttribute("aria-label") || node.getAttribute("title") || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
  const input = node instanceof HTMLInputElement ? node : null;
  const anchor = node.closest("a") as HTMLAnchorElement | null;

  return {
    element: node.tagName.toLowerCase(),
    element_id: node.id || undefined,
    element_text: text || undefined,
    element_role: node.getAttribute("role") || undefined,
    element_name: input?.name || node.getAttribute("name") || undefined,
    element_type: input?.type || undefined,
    href: anchor?.href || undefined,
    action: node.getAttribute("data-analytics") || undefined,
    page_path: window.location.pathname + window.location.search,
  };
}

/**
 * Google Tag Manager + behavioural tracking.
 *
 * Sends: page_view (initial + every client-side navigation), ui_click on every
 * click, form_submit, outbound_click, file_download, scroll_depth, page_hide
 * (time on page) and js_error.
 */
export function GoogleTag() {
  const pathname = usePathname();
  const scrollMarks = useRef<Set<number>>(new Set());
  const errorCount = useRef(0);
  const pageStartedAt = useRef<number>(Date.now());

  // Virtual page_view on load and on every route change.
  useEffect(() => {
    scrollMarks.current = new Set();
    errorCount.current = 0;
    pageStartedAt.current = Date.now();

    const timer = window.setTimeout(() => {
      track("page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
        referrer: document.referrer || undefined,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Global behavioural listeners.
  useEffect(() => {
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
        page_path: window.location.pathname + window.location.search,
      });
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
              page_path: window.location.pathname,
            });
          }
        }
      });
    };

    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      track("page_hide", {
        page_path: window.location.pathname + window.location.search,
        seconds_on_page: Math.round((Date.now() - pageStartedAt.current) / 1000),
      });
    };

    const onError = (ev: ErrorEvent) => {
      if (errorCount.current++ >= MAX_ERRORS_PER_PAGE) return;
      track("js_error", {
        message: String(ev.message || "Unknown error").slice(0, 250),
        source: ev.filename || undefined,
        line: ev.lineno || undefined,
        page_path: window.location.pathname,
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
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (!ANALYTICS_ENABLED) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}
