import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Official IELTS Band Score Calculator · Overall & Raw Score Converter",
  description:
    "Free interactive IELTS band score calculator. Calculate your overall band using official British Council / IDP rounding rules (.25 and .75 boundaries) and convert raw Listening & Reading scores (0–40) into CEFR proficiency bands.",
  alternates: {
    canonical: "https://ielts.codestria.com/calculator",
  },
  openGraph: {
    title: "Official IELTS Band Score Calculator | Codestria IELTS",
    description:
      "Interactive overall band score calculator and raw mark converter with official Cambridge rounding algorithm.",
    url: "https://ielts.codestria.com/calculator",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Band Score Calculator", url: "https://ielts.codestria.com/calculator" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
