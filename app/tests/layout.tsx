import type { Metadata } from "next";
import {
  BreadcrumbsJsonLd,
  CollectionPageJsonLd,
} from "@/components/JsonLd";
import { absoluteUrl, pageMetadata, testPath } from "@/lib/seo";

const FEATURED_BOOKS = [19, 18, 17, 16, 15, 14, 13, 12];
const FEATURED_TESTS = [1, 2, 3, 4];

const KEYWORDS = [
  "Cambridge IELTS tests",
  "IELTS mock test",
  "IELTS Academic practice test",
  "IELTS General Training practice test",
  "Cambridge IELTS 19",
  "Cambridge IELTS 18",
  "free IELTS full test",
  "computer delivered IELTS practice",
  "IELTS reading and listening test",
];

export const metadata: Metadata = pageMetadata({
  title: "Cambridge IELTS Mock Tests Library · Academic & General Training",
  description:
    "Practise full-length Cambridge IELTS Academic and General Training papers. Complete 40-question Reading and Listening modules, Writing Task 1 and 2 prompts and Speaking cue cards with instant band scoring.",
  path: "/tests",
  keywords: KEYWORDS,
});

export default function TestsLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/tests");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Cambridge Tests Library", url },
  ];

  const items = FEATURED_BOOKS.flatMap((book) =>
    (["ACADEMIC", "GENERAL"] as const).flatMap((type) =>
      FEATURED_TESTS.map((testNumber) => ({
        name: `Cambridge ${book} ${type === "ACADEMIC" ? "Academic" : "General Training"} Test ${testNumber}`,
        url: absoluteUrl(testPath({ book, type, testNumber })),
      })),
    ),
  );

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <CollectionPageJsonLd
        name="Cambridge IELTS Mock Tests Library"
        description="Full-length Cambridge IELTS Academic and General Training examination papers with computer-delivered tools and instant scoring."
        url={url}
        items={items}
      />
      {children}
    </>
  );
}
