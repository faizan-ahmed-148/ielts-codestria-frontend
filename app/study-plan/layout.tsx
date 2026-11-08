import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "IELTS Target Band Study Roadmap & Daily Preparation Blueprint",
  description:
    "Generate a reverse-engineered IELTS preparation study plan based on Cambridge assessment standards. Configure your target band, remaining weeks, daily routine, and daily task checklist.",
  alternates: {
    canonical: "https://ielts.codestria.com/study-plan",
  },
  openGraph: {
    title: "IELTS Target Band Study Roadmap | Codestria IELTS",
    description:
      "Strategic daily IELTS study schedule and milestone tracker tailored to your target band score.",
    url: "https://ielts.codestria.com/study-plan",
  },
};

export default function StudyPlanLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Target Band Study Roadmap", url: "https://ielts.codestria.com/study-plan" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
