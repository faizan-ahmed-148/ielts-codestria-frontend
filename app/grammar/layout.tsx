import type { Metadata } from "next";
import { BreadcrumbsJsonLd, FaqJsonLd, QuizJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { GRAMMAR_TOPICS } from "@/lib/grammar-data";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { GRAMMAR_FAQS } from "./faqs";

const KEYWORDS = [
  "IELTS grammar",
  "IELTS grammar exercises",
  "IELTS grammar mistakes",
  "grammar for IELTS writing",
  "IELTS Task 1 tenses",
  "articles exercises",
  "subject verb agreement exercises",
  "conditionals exercises",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Grammar Exercises · Fix the Most Common Mistakes",
  description:
    "Free IELTS grammar practice: 100 questions on articles, subject–verb agreement, Task 1 tenses, uncountable nouns, data prepositions, relative clauses, conditionals, linking words, passives and comparatives, with instant explanations.",
  path: "/grammar",
  keywords: KEYWORDS,
});

export default function GrammarLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/grammar");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Grammar Exercises", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Grammar Exercises"
        description="Interactive grammar exercises targeting common IELTS Writing and Speaking mistakes, with instant feedback and explanations."
        url={url}
        keywords={KEYWORDS}
      />
      <QuizJsonLd
        name="IELTS Grammar Quiz"
        description="Ten-question grammar quizzes on the topics that matter most for IELTS Grammatical Range and Accuracy."
        url={url}
        about={GRAMMAR_TOPICS.map((t) => t.title)}
      />
      <FaqJsonLd faqs={GRAMMAR_FAQS} />
      {children}
    </>
  );
}
