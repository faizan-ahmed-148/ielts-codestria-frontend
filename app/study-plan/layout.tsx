import type { Metadata } from "next";
import { BreadcrumbsJsonLd, HowToJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS study plan",
  "IELTS preparation timetable",
  "IELTS 7 band study plan",
  "IELTS 8 band study schedule",
  "IELTS daily routine",
  "IELTS preparation roadmap",
  "how to prepare for IELTS",
  "IELTS study checklist",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Target Band Study Roadmap & Daily Preparation Blueprint",
  description:
    "Generate a reverse-engineered IELTS study plan from Cambridge assessment standards. Set your target band, remaining weeks and daily study time to get a week-by-week roadmap and daily checklist.",
  path: "/study-plan",
  keywords: KEYWORDS,
});

export default function StudyPlanLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/study-plan");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Target Band Study Roadmap", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <HowToJsonLd
        name="How to build an IELTS study plan"
        description="Create a week-by-week IELTS preparation roadmap from your target band, exam date and available study time."
        url={url}
        steps={[
          {
            name: "Set your target band and test date",
            text: "Choose the band you need and enter how many weeks remain before your IELTS test.",
          },
          {
            name: "Set your daily study time",
            text: "Enter the number of hours you can study each day so the plan fits your schedule.",
          },
          {
            name: "Follow the weekly roadmap",
            text: "Work through the generated weekly focus areas, alternating full mock tests with targeted skill practice.",
          },
          {
            name: "Track your progress",
            text: "Tick off the daily checklist and compare mock test bands over time to adjust the plan.",
          },
        ]}
      />
      {children}
    </>
  );
}
