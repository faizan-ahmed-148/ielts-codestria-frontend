import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Official IELTS Band Descriptors · Public Writing & Speaking Assessment Rubrics",
  description:
    "Official Cambridge/IDP IELTS Band Descriptors (Bands 5 to 9) for Writing Task 1, Writing Task 2, and Speaking. Understand exactly how examiners mark Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range.",
  alternates: {
    canonical: "https://ielts.codestria.com/band-descriptors",
  },
  openGraph: {
    title: "Official IELTS Band Descriptors Reference | Codestria IELTS",
    description:
      "Comprehensive public rubrics for IELTS Writing and Speaking assessment across Bands 5 through 9.",
    url: "https://ielts.codestria.com/band-descriptors",
  },
};

export default function BandDescriptorsLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Band Descriptors Reference", url: "https://ielts.codestria.com/band-descriptors" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
