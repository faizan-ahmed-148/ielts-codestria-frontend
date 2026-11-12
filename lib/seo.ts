import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Site-wide SEO constants                                           */
/* ------------------------------------------------------------------ */

export const SITE_URL = "https://ielts.codestria.com";
export const SITE_NAME = "Codestria IELTS";
export const SITE_LOCALE = "en_GB";
export const SITE_TWITTER = "@codestria";
export const PUBLISHER_URL = "https://codestria.com";
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "ca-pub-1275878727832310";

export const DEFAULT_TITLE =
  "Codestria IELTS · Free Computer-Delivered IELTS Practice Tests";
export const DEFAULT_DESCRIPTION =
  "Free computer-delivered IELTS practice tests. Sit full-length IELTS-style Academic and General Training mock exams with exam-style highlighters, scratchpad, timed audio, instant band scoring and detailed examiner rationales. Free and engineered by Codestria.";

export const OG_IMAGE = "/og-image.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = "Codestria IELTS — Free Computer-Delivered IELTS Practice Tests";
export const LOGO_IMAGE = "/codestria-logo.png";

/** Cambridge books and tests served by the API. */
export const CAMBRIDGE_BOOK_NUMBERS = Array.from({ length: 21 }, (_, i) => i + 1);
export const CAMBRIDGE_TESTS_PER_BOOK = [1, 2, 3, 4, 5];
export const CAMBRIDGE_TRACKS = ["academic", "general"] as const;

export type CambridgeTrack = (typeof CAMBRIDGE_TRACKS)[number];

export const DEFAULT_KEYWORDS = [
  "IELTS",
  "IELTS Academic",
  "IELTS General Training",
  "IELTS practice test",
  "IELTS mock test",
  "IELTS full test online",
  "CD-IELTS simulation",
  "Computer Delivered IELTS",
  "computer-delivered IELTS practice",
  "IELTS reading practice",
  "IELTS listening practice",
  "IELTS writing task 1",
  "IELTS writing task 2",
  "IELTS speaking cue cards",
  "IELTS band score calculator",
  "IELTS band descriptors",
  "IELTS model answers",
  "IELTS vocabulary",
  "IELTS study plan",
  "free IELTS practice",
  "CEFR C1 C2 English",
  "Codestria IELTS",
];

/* ------------------------------------------------------------------ */
/*  URL helpers                                                       */
/* ------------------------------------------------------------------ */

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export interface TestIdentity {
  book: number;
  type: "ACADEMIC" | "GENERAL";
  testNumber: number;
}

/** Stable, human-readable test slug used in URLs, canonicals and the sitemap. */
export function testSlug(test: TestIdentity): string {
  return `c${test.book}-${test.type.toLowerCase()}-${test.testNumber}`;
}

/** Canonical path for a Cambridge test. */
export function testPath(test: TestIdentity): string {
  return `/tests/${testSlug(test)}`;
}

/** Parses an SEO slug such as "c19-academic-1". */
export function parseTestSlug(value: string): TestIdentity | null {
  const match = value.match(/^c(\d+)-(academic|general)-(\d+)$/i);
  if (!match) return null;
  return {
    book: Number(match[1]),
    type: match[2].toUpperCase() as "ACADEMIC" | "GENERAL",
    testNumber: Number(match[3]),
  };
}

/* ------------------------------------------------------------------ */
/*  Test catalogue                                                    */
/* ------------------------------------------------------------------ */

/**
 * The finite set of Cambridge papers the site actually offers. Cambridge
 * publishes four papers per book, and the library currently lists books
 * 11-19. Anything outside this set must never be indexed or put in the
 * sitemap — otherwise /tests/c19-academic-99 (or c999-...) becomes an
 * infinite, crawlable URL space of empty pages.
 *
 * Update both lists when a new book is added to the library.
 */
export const CATALOGUE_BOOKS = [19, 18, 17, 16, 15, 14, 13, 12, 11] as const;
export const CATALOGUE_TEST_NUMBERS = [4, 3, 2, 1] as const;

export function isCataloguedTest(test: TestIdentity): boolean {
  return (
    (CATALOGUE_BOOKS as readonly number[]).includes(test.book) &&
    (CATALOGUE_TEST_NUMBERS as readonly number[]).includes(test.testNumber)
  );
}

/** Every sitemap-eligible Cambridge paper, Academic then General. */
export function catalogueTests(): TestIdentity[] {
  const tests: TestIdentity[] = [];
  for (const book of CATALOGUE_BOOKS) {
    for (const type of ["ACADEMIC", "GENERAL"] as const) {
      for (const testNumber of CATALOGUE_TEST_NUMBERS) {
        tests.push({ book, type, testNumber });
      }
    }
  }
  return tests;
}

/* ------------------------------------------------------------------ */
/*  Metadata factory                                                  */
/* ------------------------------------------------------------------ */

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
  /** Set true for private / authenticated pages. */
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Builds a complete, self-consistent metadata object for a page:
 * canonical URL, Open Graph (with image), Twitter card and robots.
 */
export function pageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    keywords,
    type = "website",
    image = OG_IMAGE,
    imageAlt = OG_IMAGE_ALT,
    noindex = false,
    publishedTime,
    modifiedTime,
  } = options;

  const url = absoluteUrl(path);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    ...(noindex
      ? {
          robots: {
            index: false,
            follow: true,
            nocache: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      images: [
        {
          url: image,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: imageAlt,
          type: "image/png",
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: SITE_TWITTER,
      creator: SITE_TWITTER,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

/** Minimal metadata for pages that must never appear in search results. */
export function privateMetadata(title: string, description?: string, path?: string): Metadata {
  return {
    title,
    ...(description ? { description } : {}),
    ...(path ? { alternates: { canonical: absoluteUrl(path) } } : {}),
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
  };
}
