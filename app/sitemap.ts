import type { MetadataRoute } from "next";
import { SITE_URL, testSlug, type TestIdentity } from "@/lib/seo";

export const dynamic = "force-dynamic";

const STATIC_PAGES: {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
}[] = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/tests", priority: 0.95, changeFrequency: "daily" },
  { path: "/calculator", priority: 0.9, changeFrequency: "weekly" },
  { path: "/model-answers", priority: 0.9, changeFrequency: "weekly" },
  { path: "/speaking-practice", priority: 0.85, changeFrequency: "weekly" },
  { path: "/vocabulary", priority: 0.85, changeFrequency: "weekly" },
  { path: "/band-descriptors", priority: 0.85, changeFrequency: "monthly" },
  { path: "/study-plan", priority: 0.8, changeFrequency: "monthly" },
];

/**
 * Tests that always exist as client-side Cambridge data even when the API is
 * unavailable. Used only when the backend cannot be reached.
 */
const STATIC_TEST_FALLBACK: TestIdentity[] = [
  { book: 19, type: "ACADEMIC", testNumber: 1 },
  { book: 19, type: "GENERAL", testNumber: 1 },
];

const API_URL = (process.env.API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

async function fetchPublishedTests(): Promise<TestIdentity[]> {
  try {
    const response = await fetch(`${API_URL}/api/seo/tests`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { accept: "application/json" },
    });
    if (!response.ok) return STATIC_TEST_FALLBACK;

    const data = (await response.json()) as {
      tests?: { type?: string; book?: number; testNumber?: number }[];
    };

    const tests: TestIdentity[] = [];
    for (const item of data.tests ?? []) {
      if (item.type !== "ACADEMIC" && item.type !== "GENERAL") continue;
      if (!Number.isInteger(item.book) || !Number.isInteger(item.testNumber)) continue;
      if ((item.book as number) < 1 || (item.testNumber as number) < 1) continue;
      tests.push({
        book: item.book as number,
        type: item.type,
        testNumber: item.testNumber as number,
      });
    }

    return tests.length ? tests : STATIC_TEST_FALLBACK;
  } catch {
    // Backend cold start, timeout or misconfiguration: never emit URLs that
    // do not exist. The two bundled Cambridge papers are always available.
    return STATIC_TEST_FALLBACK;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const tests = await fetchPublishedTests();
  const seen = new Set<string>();
  const testEntries: MetadataRoute.Sitemap = [];

  for (const test of tests) {
    const slug = testSlug(test);
    if (seen.has(slug)) continue;
    seen.add(slug);
    testEntries.push({
      url: `${SITE_URL}/tests/${slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: test.book >= 17 ? 0.85 : 0.75,
    });
  }

  return [...staticEntries, ...testEntries];
}
