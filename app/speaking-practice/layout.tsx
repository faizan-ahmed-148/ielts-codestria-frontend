import type { Metadata } from "next";
import {
  BreadcrumbsJsonLd,
  HowToJsonLd,
  LearningResourceJsonLd,
} from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

const KEYWORDS = [
  "IELTS speaking practice",
  "IELTS speaking part 2",
  "IELTS cue card",
  "IELTS speaking topics",
  "IELTS speaking preparation time",
  "IELTS speaking band 8",
  "IELTS speaking simulator",
  "IELTS speaking recording practice",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Speaking Part 2 Cue Cards & Voice Examiner Studio",
  description:
    "Practise IELTS Speaking Part 2 with authentic Cambridge cue cards, a timed 1-minute preparation window, 2-minute recording and Band 8.5 model transcripts using the four official criteria.",
  path: "/speaking-practice",
  keywords: KEYWORDS,
});

export default function SpeakingLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/speaking-practice");
  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    { name: "Speaking Practice Studio", url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <LearningResourceJsonLd
        name="IELTS Speaking Part 2 Practice Studio"
        description="Interactive cue card simulator with timed preparation, live recording and model transcripts aligned to the official IELTS Speaking criteria."
        url={url}
        teaches={[
          "Fluency and Coherence",
          "Lexical Resource",
          "Grammatical Range and Accuracy",
          "Pronunciation",
        ]}
      />
      <HowToJsonLd
        name="How to practise IELTS Speaking Part 2"
        description="Use a cue card, prepare for one minute and speak for up to two minutes under exam conditions."
        url={url}
        steps={[
          {
            name: "Choose a cue card",
            text: "Pick an authentic Cambridge Speaking Part 2 cue card with its bullet-point prompts.",
          },
          {
            name: "Use the one-minute preparation",
            text: "Make brief notes during the official one-minute preparation window without writing a full script.",
          },
          {
            name: "Record your two-minute answer",
            text: "Speak continuously for up to two minutes, covering every bullet point on the card.",
          },
          {
            name: "Review the feedback",
            text: "Compare your answer with the model transcript and review fluency, vocabulary, grammar and pronunciation.",
          },
        ]}
      />
      {children}
    </>
  );
}
