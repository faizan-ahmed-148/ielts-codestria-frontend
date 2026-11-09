import type { Metadata } from "next";
import { BreadcrumbsJsonLd, LearningResourceJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS band descriptors",
  "IELTS writing band descriptors",
  "IELTS speaking band descriptors",
  "IELTS assessment criteria",
  "task achievement",
  "coherence and cohesion",
  "lexical resource",
  "grammatical range and accuracy",
  "IELTS band 9 descriptors",
];

export const metadata: Metadata = pageMetadata({
  title: "Official IELTS Band Descriptors · Writing & Speaking Rubrics",
  description:
    "Official IELTS Band Descriptors (Bands 5 to 9) for Writing Task 1, Task 2 and Speaking. See exactly how examiners mark Task Achievement, Coherence & Cohesion, Lexical Resource and Grammatical Range.",
  path: "/band-descriptors",
  keywords: KEYWORDS,
});

export default function BandDescriptorsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Band Descriptors Reference", url: absoluteUrl("/band-descriptors") },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name="Official IELTS Band Descriptors"
        description="Public examiner assessment rubrics for IELTS Writing Task 1, Writing Task 2 and Speaking across Bands 5 to 9."
        url={absoluteUrl("/band-descriptors")}
        teaches={[
          "Task Achievement and Task Response",
          "Coherence and Cohesion",
          "Lexical Resource",
          "Grammatical Range and Accuracy",
          "Fluency and Coherence",
          "Pronunciation",
        ]}
      />
      {children}
    </>
  );
}
