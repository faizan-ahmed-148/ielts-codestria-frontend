import type { Metadata } from "next";
import { BreadcrumbsJsonLd, FaqJsonLd, HowToJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { DICTATION_FAQS } from "./faqs";

const KEYWORDS = [
  "IELTS dictation",
  "IELTS listening dictation practice",
  "IELTS listening practice online",
  "IELTS spelling practice",
  "IELTS listening numbers and dates",
  "IELTS listening traps",
  "free IELTS listening exercises",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Dictation Practice · Free Listening Exercises with Instant Feedback",
  description:
    "Free IELTS Listening dictation practice. Hear 40+ exam-style sentences (bookings, tours, seminars, lectures), type what you hear, and get word-by-word marking plus the listening trap behind each sentence.",
  path: "/dictation",
  keywords: KEYWORDS,
});

export default function DictationLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/dictation");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Dictation Practice", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Listening Dictation Practice"
        description="Interactive IELTS Listening dictation trainer with slow playback, word-by-word marking and notes on common listening traps."
        url={url}
        keywords={KEYWORDS}
      />
      <HowToJsonLd
        name="How to practise IELTS Listening with dictation"
        description="Use short dictations to improve spelling, number recognition and accuracy in IELTS Listening."
        url={url}
        steps={[
          { name: "Choose a test part and level", text: "Filter sentences by IELTS Listening part (1–4) and difficulty." },
          { name: "Listen", text: "Play the sentence at normal speed. Use the slow option only after a first attempt." },
          { name: "Type what you hear", text: "Write the full sentence, including names, numbers and small words." },
          { name: "Check and review", text: "Compare your answer word by word and read the note on the listening trap." },
        ]}
      />
      <FaqJsonLd faqs={DICTATION_FAQS} />
      {children}
    </>
  );
}
