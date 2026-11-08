import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Band 9.0 Model Writing Essays & Annotations · Task 1 & Task 2",
  description:
    "Examine authentic Band 9 sample responses side-by-side with official Cambridge examiner commentary across Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range. Compare against common Band 6 pitfalls.",
  alternates: {
    canonical: "https://ielts.codestria.com/model-answers",
  },
  openGraph: {
    title: "Band 9.0 Model Writing Essays & Annotations | Codestria IELTS",
    description:
      "Study official Band 9 essay benchmarks and line-by-line examiner annotations for Academic and General Training Writing.",
    url: "https://ielts.codestria.com/model-answers",
  },
};

export default function ModelAnswersLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Band 9 Model Essays", url: "https://ielts.codestria.com/model-answers" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
