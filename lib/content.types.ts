// Mirror of backend/src/content/content.types.ts (question papers sent by the API).
// Answers are never included here; they appear only in completed attempt results.

export type ModuleKind = 'LISTENING' | 'READING' | 'WRITING' | 'SPEAKING';

export type Question =
  | { id: string; type: 'mcq'; prompt: string; options: string[] } // answer: "A" | "B" ...
  | { id: string; type: 'tfng'; prompt: string } // answer: TRUE | FALSE | NOT GIVEN
  | { id: string; type: 'ynng'; prompt: string } // answer: YES | NO | NOT GIVEN
  | { id: string; type: 'gap'; prompt: string } // prompt contains "_____"; answer: accepted strings
  | { id: string; type: 'match'; prompt: string; options: string[] }; // answer: "A" | "B" ... (letter of option)

export interface QuestionGroup {
  instructions: string;
  questions: Question[];
}

export interface ReadingPassage {
  title: string;
  /** Paragraphs separated by a blank line. Labelled paragraphs start with "A ", "B " ... */
  body: string;
  groups: QuestionGroup[];
}

export interface ReadingContent {
  passages: ReadingPassage[];
}

export interface ListeningPart {
  title: string;
  context: string;
  transcript: { speaker: string; text: string }[];
  groups: QuestionGroup[];
}

export interface ListeningContent {
  parts: ListeningPart[];
}

export interface ChartSpec {
  kind: 'bar' | 'line' | 'pie' | 'table';
  title: string;
  unit?: string;
  labels: string[];
  series: { name: string; values: number[] }[];
}

export interface WritingContent {
  task1: { prompt: string; chart?: ChartSpec; minWords: number };
  task2: { prompt: string; minWords: number };
}

export interface SpeakingContent {
  part1: { topic: string; questions: string[] }[];
  part2: { cueCard: string; bullets: string[]; followUp?: string };
  part3: { topic: string; questions: string[] };
}

/** questionId -> accepted answers (first one is the canonical answer shown to users). */
export type AnswerKey = Record<string, string[]>;

/** Cambridge examiner explanation shown after a Reading/Listening answer. */
export interface QuestionExplanation {
  questionId: string;
  correctAnswer: string;
  explanation: string;
  paragraphRef?: string;
  keyVocabulary?: string[];
}

