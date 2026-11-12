import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import type { TestOverview } from "@/lib/api";
import { fetchTestOverview } from "@/lib/test-runner-service";
import TestPageClient from "./TestPageClient";
import TestPreview, { fetchTestPreview } from "./TestPreview";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  let test: TestOverview | null = null;
  try {
    test = await fetchTestOverview(id);
  } catch {
    // Backend unavailable or test missing: fall back to generic metadata.
  }
  if (!test) notFound();

  const trackLabel = test.type === "ACADEMIC" ? "Academic" : "General Training";
  const title = `IELTS ${trackLabel} Practice Test · Book ${test.book} Test ${test.testNumber} | Codestria IELTS`;
  const description = `Practise Book ${test.book} Test ${test.testNumber} (${trackLabel}), a full IELTS-style mock exam in the computer-delivered format, with instant band scoring, highlighters and scratchpad. Free IELTS practice by Codestria.`;
  const url = `https://ielts.codestria.com/tests/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      siteName: "Codestria IELTS",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

const API_URL = (process.env.API_URL ?? "http://localhost:4000").replace(/\/+$/, "");

/**
 * Server-side overview so the hero, heading and module cards are in the HTML
 * crawlers receive. The visitor's cookie is forwarded so signed-in candidates
 * see their own progress on first paint; the client refetches after hydration.
 */
async function fetchInitialOverview(id: string): Promise<TestOverview | null> {
  try {
    const cookie = (await headers()).get("cookie");
    const res = await fetch(`${API_URL}/api/tests/${encodeURIComponent(id)}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { accept: "application/json", ...(cookie ? { cookie } : {}) },
    });
    return res.ok ? ((await res.json()) as TestOverview) : null;
  } catch {
    return null;
  }
}

export default async function TestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [initialTest, preview] = await Promise.all([fetchInitialOverview(id), fetchTestPreview(id)]);

  return (
    <>
      <TestPageClient initialTest={initialTest} />
      {preview && <TestPreview preview={preview} />}
    </>
  );
}
