/** Free tools directory, used by /tools, the navigation and the sitemap. */
export interface ToolLink {
  href: string;
  title: string;
  description: string;
  group: "Practise" | "Writing & Speaking" | "Plan & Score";
}

export const TOOLS: ToolLink[] = [
  { href: "/tests", title: "Full IELTS Mock Tests", description: "Timed Academic and General Training tests in a computer-delivered exam room with instant marking.", group: "Practise" },
  { href: "/dictation", title: "Listening Dictation", description: "Hear IELTS-style sentences, type what you hear and see every missed word highlighted.", group: "Practise" },
  { href: "/reading-speed-test", title: "Reading Speed Test", description: "Measure your words per minute and comprehension on academic passages.", group: "Practise" },
  { href: "/grammar", title: "Grammar Exercises", description: "Fix the grammar mistakes that cost IELTS candidates the most marks, with explanations.", group: "Practise" },
  { href: "/flashcards", title: "Vocabulary Flashcards", description: "Learn academic words and collocations with spaced-repetition flashcards.", group: "Practise" },
  { href: "/vocabulary", title: "Vocabulary Lab", description: "Topic vocabulary with definitions, collocations, synonyms and pronunciation.", group: "Practise" },
  { href: "/writing-checker", title: "IELTS Writing Checker", description: "Check word count, linking words, repetition and style, then get an AI band estimate.", group: "Writing & Speaking" },
  { href: "/model-answers", title: "Band 9 Model Answers", description: "Annotated Task 1 and Task 2 answers compared with Band 6 versions.", group: "Writing & Speaking" },
  { href: "/speaking-practice", title: "Speaking Cue Cards", description: "Part 2 cue cards with timed preparation, recording and sample answers.", group: "Writing & Speaking" },
  { href: "/band-descriptors", title: "Band Descriptors", description: "What examiners look for at each band in Writing and Speaking, in plain English.", group: "Writing & Speaking" },
  { href: "/calculator", title: "Band Score Calculator", description: "Convert raw Listening and Reading scores and calculate your overall band.", group: "Plan & Score" },
  { href: "/score-converter", title: "IELTS Score Converter", description: "Compare IELTS with CEFR, TOEFL, PTE, Duolingo and the Cambridge English Scale.", group: "Plan & Score" },
  { href: "/exam-countdown", title: "Exam Countdown & Plan", description: "Set your exam date and target band for a week-by-week preparation plan.", group: "Plan & Score" },
  { href: "/study-plan", title: "Study Roadmap", description: "A personal study plan and daily checklist built around your target band.", group: "Plan & Score" },
];

export const TOOL_GROUPS = ["Practise", "Writing & Speaking", "Plan & Score"] as const;
