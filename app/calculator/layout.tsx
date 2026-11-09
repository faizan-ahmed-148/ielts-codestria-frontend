import type { Metadata } from "next";
import {
  BreadcrumbsJsonLd,
  HowToJsonLd,
  WebApplicationJsonLd,
} from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS band score calculator",
  "IELTS overall band calculator",
  "IELTS raw score to band",
  "IELTS reading band calculator",
  "IELTS listening band calculator",
  "IELTS rounding rule",
  "IELTS 6.5 7.0 calculator",
  "CEFR IELTS equivalence",
];

export const metadata: Metadata = pageMetadata({
  title: "Official IELTS Band Score Calculator · Overall & Raw Score Converter",
  description:
    "Free interactive IELTS band score calculator. Calculate your overall band with official British Council and IDP rounding rules (.25 and .75 boundaries) and convert raw Listening and Reading scores (0–40) into bands and CEFR levels.",
  path: "/calculator",
  keywords: KEYWORDS,
});

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/calculator");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Band Score Calculator", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <WebApplicationJsonLd
        name="IELTS Band Score Calculator"
        description="Interactive IELTS overall band calculator and raw Listening and Reading mark converter using official Cambridge rounding rules."
        url={url}
        keywords={KEYWORDS}
      />
      <HowToJsonLd
        name="How to calculate your IELTS band score"
        description="Convert raw Listening and Reading marks and combine all four module bands into an official overall IELTS band."
        url={url}
        steps={[
          {
            name: "Enter your module bands",
            text: "Enter your Listening, Reading, Writing and Speaking bands, or use the raw score converter to turn Listening and Reading marks out of 40 into bands.",
          },
          {
            name: "Average the four modules",
            text: "Add Listening, Reading, Writing and Speaking and divide by four to get the exact average.",
          },
          {
            name: "Apply the official rounding rule",
            text: "An average ending in .25 rounds up to the next half band and an average ending in .75 rounds up to the next whole band. Other averages round to the nearest half band.",
          },
          {
            name: "Read your CEFR level",
            text: "Compare the overall band with the CEFR equivalence shown by the calculator to understand your proficiency level.",
          },
        ]}
      />
      {children}
    </>
  );
}
