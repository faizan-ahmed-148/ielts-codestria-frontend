import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "IELTS Speaking Part 2 Cue Cards & Voice Examiner Studio",
  description:
    "Master the crucial 1-minute candidate note-taking window and deliver continuous 2-minute speech with live audio recording, authentic Cambridge cue card topics, and official 4-criterion calibration.",
  alternates: {
    canonical: "https://ielts.codestria.com/speaking-practice",
  },
  openGraph: {
    title: "IELTS Speaking Part 2 Cue Cards & Voice Studio | Codestria IELTS",
    description:
      "Interactive IELTS Speaking Part 2 cue card simulator with timed 1-min preparation, live audio recording, and Band 8.5 model transcripts.",
    url: "https://ielts.codestria.com/speaking-practice",
  },
};

export default function SpeakingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Speaking Practice Studio", url: "https://ielts.codestria.com/speaking-practice" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
