import type { Metadata } from "next";
import { BreadcrumbsJsonLd, FaqJsonLd, QuizJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { READING_SPEED_FAQS } from "./faqs";

const KEYWORDS = [
  "IELTS reading speed test",
  "reading speed test WPM",
  "words per minute test",
  "IELTS reading time management",
  "academic reading speed",
  "reading comprehension test",
  "how fast should I read for IELTS",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Reading Speed Test · Words per Minute & Comprehension",
  description:
    "Free IELTS reading speed test. Time yourself on an academic passage, answer comprehension questions, and see your words per minute, effective reading speed and how it compares with IELTS Reading.",
  path: "/reading-speed-test",
  keywords: KEYWORDS,
});

export default function ReadingSpeedLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/reading-speed-test");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Reading Speed Test", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Reading Speed Test"
        description="Timed academic reading test that measures words per minute, comprehension and effective reading speed against IELTS Reading demands."
        url={url}
        keywords={KEYWORDS}
      />
      <QuizJsonLd
        name="IELTS Reading Speed and Comprehension Test"
        description="Four academic passages with comprehension questions to measure reading speed for IELTS."
        url={url}
        about={["Reading speed", "Reading comprehension", "IELTS Academic Reading"]}
      />
      <FaqJsonLd faqs={READING_SPEED_FAQS} />
      {children}
    </>
  );
}
