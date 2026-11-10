import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { TestOverview } from "@/lib/api";
import { fetchTestOverview } from "@/lib/test-runner-service";
import TestPageClient from "./TestPageClient";

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
  const title = `Cambridge ${test.book} · Practice Test ${test.testNumber} · ${trackLabel} | Codestria IELTS`;
  const description = `Practise Cambridge ${test.book} Practice Test ${test.testNumber} (${trackLabel}) — authentic computer-delivered IELTS paper with instant band scoring, highlighters and scratchpad. Free CD-IELTS simulator by Codestria.`;
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

export default function TestPage() {
  return <TestPageClient />;
}
