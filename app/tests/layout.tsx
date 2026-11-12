import type { Metadata } from "next";
import {
  BreadcrumbsJsonLd,
  CollectionPageJsonLd,
} from "@/components/JsonLd";
import { absoluteUrl, pageMetadata, testPath } from "@/lib/seo";

const FEATURED_BOOKS = [19, 18, 17, 16, 15, 14, 13, 12];
const FEATURED_TESTS = [1, 2, 3, 4];

const KEYWORDS = [
  "IELTS practice tests",
  "IELTS mock test",
  "IELTS Academic practice test",
  "IELTS General Training practice test",
  "IELTS mock test online",
  "free IELTS full test",
  "computer delivered IELTS practice",
  "IELTS reading and listening test",
];

export const metadata: Metadata = pageMetadata({
  title: "Free IELTS Mock Tests Library · Academic & General Training",
  description:
    "Practise full-length IELTS-style Academic and General Training mock tests. Complete 40-question Reading and Listening modules, Writing Task 1 and 2 prompts and Speaking cue cards with instant band scoring.",
  path: "/tests",
  keywords: KEYWORDS,
});

export default function TestsLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/tests");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "IELTS Tests Library", url },
  ];

  const items = FEATURED_BOOKS.flatMap((book) =>
    (["ACADEMIC", "GENERAL"] as const).flatMap((type) =>
      FEATURED_TESTS.map((testNumber) => ({
        name: `Book ${book} ${type === "ACADEMIC" ? "Academic" : "General Training"} Test ${testNumber}`,
        url: absoluteUrl(testPath({ book, type, testNumber })),
      })),
    ),
  );

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <CollectionPageJsonLd
        name="IELTS Mock Tests Library"
        description="Full-length IELTS-style Academic and General Training mock tests with computer-delivered tools and instant scoring."
        url={url}
        items={items}
      />
      {children}
    </>
  );
}
