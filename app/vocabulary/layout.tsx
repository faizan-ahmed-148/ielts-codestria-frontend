import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Band 8+ Academic Vocabulary Lab & Topic Collocations",
  description:
    "Master high-scoring IELTS Lexical Resource vocabulary items across frequent Cambridge topics (Environment, Technology, Education, Society) with native UK audio pronunciation, collocations, and CEFR indicators.",
  alternates: {
    canonical: "https://ielts.codestria.com/vocabulary",
  },
  openGraph: {
    title: "Band 8+ Academic Vocabulary Lab | Codestria IELTS",
    description:
      "Interactive IELTS vocabulary flashcard deck and practice quiz with audio pronunciation and high-yield collocations.",
    url: "https://ielts.codestria.com/vocabulary",
  },
};

export default function VocabularyLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Academic Vocabulary Lab", url: "https://ielts.codestria.com/vocabulary" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
