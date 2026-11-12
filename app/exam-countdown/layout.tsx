import type { Metadata } from "next";
import { BreadcrumbsJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS exam countdown",
  "IELTS study plan",
  "how long to prepare for IELTS",
  "IELTS preparation timetable",
  "IELTS exam date planner",
  "IELTS week by week plan",
  "IELTS final week checklist",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Exam Countdown & Week-by-Week Study Plan",
  description:
    "Free IELTS exam countdown. Enter your test date and target band to see the days left, get a week-by-week preparation plan scaled to your time, add the exam to your calendar and follow a final-week checklist.",
  path: "/exam-countdown",
  keywords: KEYWORDS,
});

export default function ExamCountdownLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/exam-countdown");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "IELTS Exam Countdown", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Exam Countdown"
        description="Countdown to your IELTS test date with a week-by-week study plan scaled to the time left, calendar export and final-week checklist."
        url={url}
        keywords={KEYWORDS}
      />
      {children}
    </>
  );
}
