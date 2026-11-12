import type { Metadata } from "next";
import { BreadcrumbsJsonLd, HowToJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS writing checker",
  "IELTS essay checker free",
  "IELTS word counter",
  "IELTS writing band score checker",
  "IELTS Task 2 essay checker",
  "IELTS Task 1 checker",
  "IELTS letter checker",
];

export const metadata: Metadata = pageMetadata({
  title: "Free IELTS Writing Checker · Essay Checker, Word Counter & Band Score",
  description:
    "Free IELTS Writing checker for Task 1 (Academic and General letters) and Task 2 essays. Instant word count, paragraph and sentence analysis, lexical diversity, linking words and informal language flags, plus an AI band score against the four official criteria.",
  path: "/writing-checker",
  keywords: KEYWORDS,
});

export default function WritingCheckerLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/writing-checker");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Writing Checker", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Writing Checker"
        description="Free IELTS essay checker and word counter with instant vocabulary, cohesion and register analysis and an AI band score estimate for Task 1 and Task 2."
        url={url}
        keywords={KEYWORDS}
      />
      <HowToJsonLd
        name="How to check your IELTS Writing answer"
        description="Analyse an IELTS Task 1 report, letter or Task 2 essay and get a band estimate."
        url={url}
        steps={[
          { name: "Choose the task", text: "Select Task 1 Academic, Task 1 General (letter) or Task 2 so the checker uses the right minimum word count." },
          { name: "Paste the question and your answer", text: "Optionally paste the question, then paste or type your response into the editor." },
          { name: "Review the instant analysis", text: "Check word count, paragraphs, sentence length, lexical diversity, repeated words, linking words and informal language." },
          { name: "Get an AI band score", text: "Sign in free and connect an AI key to get a band for each of the four IELTS Writing criteria with feedback." },
        ]}
      />
      {children}
    </>
  );
}
