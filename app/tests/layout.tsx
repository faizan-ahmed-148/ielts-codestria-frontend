import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cambridge IELTS Mock Tests Library · Academic & General (Books 19–12)",
  description:
    "Practice authentic Cambridge IELTS Academic and General Training examination papers (Books 19 down to 12). Full 40-question Reading & Listening papers, Task 1 & 2 Writing prompts, and Speaking cue cards.",
  alternates: {
    canonical: "https://ielts.codestria.com/tests",
  },
  openGraph: {
    title: "Cambridge IELTS Mock Tests Library (Books 19–12) | Codestria IELTS",
    description:
      "Practice authentic Cambridge examination papers in descending order with official British Council & IDP CD-IELTS computer-delivered tools and instant band scoring.",
    url: "https://ielts.codestria.com/tests",
  },
};

export default function TestsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Cambridge Tests Library", url: "https://ielts.codestria.com/tests" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
