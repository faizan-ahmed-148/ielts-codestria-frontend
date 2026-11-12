import type { Metadata } from "next";
import { BreadcrumbsJsonLd, LearningResourceJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS vocabulary",
  "academic word list",
  "AWL IELTS",
  "IELTS collocations",
  "band 8 vocabulary",
  "IELTS lexical resource",
  "IELTS topic vocabulary",
  "English academic vocabulary",
];

export const metadata: Metadata = pageMetadata({
  title: "Band 8+ Academic Vocabulary Lab & Topic Collocations",
  description:
    "Master high-scoring IELTS vocabulary across frequent IELTS topics such as environment, technology, education and society, with pronunciation, collocations and CEFR indicators.",
  path: "/vocabulary",
  keywords: KEYWORDS,
});

export default function VocabularyLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/vocabulary");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Academic Vocabulary Lab", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name="IELTS Academic Vocabulary Lab"
        description="Interactive IELTS vocabulary flashcards with pronunciation, collocations and CEFR levels for high-scoring Lexical Resource."
        url={url}
        teaches={[
          "Academic Word List vocabulary",
          "Topic-specific collocations",
          "Pronunciation",
          "Lexical Resource for IELTS Writing and Speaking",
        ]}
      />
      {children}
    </>
  );
}
