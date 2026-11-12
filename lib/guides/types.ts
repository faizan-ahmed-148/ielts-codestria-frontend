/**
 * Shape of an IELTS guide article (served at /guides/[slug]).
 * Guide data is split across lib/guides/*.ts files and merged in lib/guides/index.ts.
 */

export type GuideCategory = "Writing" | "Speaking" | "Reading" | "Listening" | "Exam Strategy";

/** One block of article body. Paragraph text may contain **bold** markers only. */
export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "example"; title?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  /** URL slug, kebab-case, matching the main search phrase, e.g. "ielts-writing-task-2-opinion-essay". */
  slug: string;
  category: GuideCategory;
  /** H1 / <title> (under ~60 characters). */
  title: string;
  /** Meta description, 140–160 characters. */
  description: string;
  keywords: string[];
  /** ISO dates, e.g. "2026-11-12". */
  published: string;
  updated: string;
  /** Estimated reading time in minutes. */
  readMinutes: number;
  /** 2–3 sentence summary shown at the top of the article. */
  summary: string;
  body: GuideBlock[];
  faqs: GuideFaq[];
  /** Internal links to site pages, e.g. { href: "/tests", label: "Take a full mock test" }. */
  related: { href: string; label: string }[];
}
