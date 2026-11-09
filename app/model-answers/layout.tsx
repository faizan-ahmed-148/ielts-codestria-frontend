import type { Metadata } from "next";
import { BreadcrumbsJsonLd, LearningResourceJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS model answers",
  "IELTS band 9 essay",
  "IELTS writing task 2 sample",
  "IELTS writing task 1 sample",
  "IELTS examiner commentary",
  "band 9 essay example",
  "IELTS academic writing model",
  "IELTS general training letter sample",
];

export const metadata: Metadata = pageMetadata({
  title: "Band 9.0 Model Writing Essays & Examiner Annotations · Task 1 & Task 2",
  description:
    "Study authentic Band 9 sample responses side-by-side with Cambridge examiner commentary on Task Response, Coherence & Cohesion, Lexical Resource and Grammatical Range, plus common Band 6 pitfalls.",
  path: "/model-answers",
  keywords: KEYWORDS,
});

export default function ModelAnswersLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/model-answers");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Band 9 Model Essays", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name="Band 9 IELTS Model Writing Essays"
        description="Annotated Band 9 Writing Task 1 and Task 2 responses with examiner commentary and Band 6 comparisons for Academic and General Training."
        url={url}
        teaches={[
          "Task Response and Task Achievement",
          "Coherence and Cohesion",
          "Lexical Resource",
          "Grammatical Range and Accuracy",
        ]}
      />
      {children}
    </>
  );
}
