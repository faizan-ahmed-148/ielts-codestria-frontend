import type { Metadata } from "next";
import { BreadcrumbsJsonLd, FaqJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { SCORE_CONVERTER_FAQ } from "@/lib/score-equivalence";

const KEYWORDS = [
  "IELTS score converter",
  "IELTS to TOEFL",
  "IELTS to PTE",
  "IELTS to Duolingo",
  "IELTS to CEFR",
  "TOEFL to IELTS conversion",
  "PTE to IELTS conversion",
  "Duolingo to IELTS",
  "Cambridge English Scale IELTS",
  "English test score comparison",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Score Converter · IELTS to TOEFL, PTE, Duolingo & CEFR",
  description:
    "Free IELTS score converter. Convert an IELTS band to its approximate CEFR level, TOEFL iBT, PTE Academic, Duolingo English Test and Cambridge English Scale score, or convert those scores back to IELTS.",
  path: "/score-converter",
  keywords: KEYWORDS,
});

export default function ScoreConverterLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/score-converter");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "IELTS Score Converter", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Score Converter"
        description="Convert IELTS bands to approximate CEFR, TOEFL iBT, PTE Academic, Duolingo English Test and Cambridge English Scale equivalents, and back."
        url={url}
        keywords={KEYWORDS}
      />
      <FaqJsonLd faqs={SCORE_CONVERTER_FAQ} />
      {children}
    </>
  );
}
