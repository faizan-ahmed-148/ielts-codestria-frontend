import type { Metadata } from "next";
import { BreadcrumbsJsonLd, FaqJsonLd, HowToJsonLd, WebApplicationJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { FLASHCARD_FAQS } from "./faqs";

const KEYWORDS = [
  "IELTS vocabulary flashcards",
  "IELTS flashcards",
  "spaced repetition vocabulary",
  "Leitner system flashcards",
  "IELTS word of the day",
  "band 7 vocabulary",
  "IELTS collocations",
];

export const metadata: Metadata = pageMetadata({
  title: "IELTS Vocabulary Flashcards · Spaced Repetition & Word of the Day",
  description:
    "Free IELTS vocabulary flashcards with a five-box Leitner spaced-repetition system. Filter by topic and CEFR level, flip cards for definitions, collocations and example sentences, and learn a new word every day.",
  path: "/flashcards",
  keywords: KEYWORDS,
});

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteUrl("/flashcards");
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Vocabulary Flashcards", url },
        ]}
      />
      <WebApplicationJsonLd
        name="IELTS Vocabulary Flashcards"
        description="Spaced-repetition flashcards for IELTS vocabulary, with collocations, CEFR levels and sample sentences."
        url={url}
        keywords={KEYWORDS}
      />
      <HowToJsonLd
        name="How to learn IELTS vocabulary with spaced repetition"
        description="Use a five-box Leitner system to move IELTS words into long-term memory."
        url={url}
        steps={[
          { name: "Choose a topic and level", text: "Filter the deck by IELTS topic and CEFR level (B2, C1, C2)." },
          { name: "Recall, then flip", text: "Try to say the meaning before flipping the card to check the definition and collocations." },
          { name: "Rate yourself honestly", text: "Choose Again, Hard, Good or Easy. Cards you struggle with come back sooner." },
          { name: "Reach box 5", text: "Keep reviewing until every card reaches box 5, then use each word in a sentence." },
        ]}
      />
      <FaqJsonLd faqs={FLASHCARD_FAQS} />
      {children}
    </>
  );
}
