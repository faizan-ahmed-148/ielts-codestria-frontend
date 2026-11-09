import type { ModuleKind } from "./content.types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function api<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    method: options.method ?? "GET",
    headers: options.body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    credentials: "include",
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message.join(", ") : data.message;
    if (
      res.status === 401 &&
      typeof window !== "undefined" &&
      !path.startsWith("/auth/") &&
      // Scoring calls surface their own error to the runner.
      !path.startsWith("/scoring/")
    ) {
      window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
    }
    const code = typeof data.code === "string" ? data.code : undefined;
    throw new ApiError(msg ?? `Request failed (${res.status})`, res.status, code);
  }
  return data as T;
}

export type TestType = "ACADEMIC" | "GENERAL";
export type ModuleStatus = "NOT_STARTED" | "IN_PROGRESS" | "SCORING" | "FAILED" | "COMPLETED";
export type AttemptStatus = "IN_PROGRESS" | "SCORING" | "COMPLETED" | "FAILED";

export interface User {
  id: string;
  email: string;
  name: string;
  targetBand?: number;
  track?: TestType;
}

export interface ModuleProgress {
  status: ModuleStatus;
  band: number | null;
  attemptId: string | null;
  completedAttemptId: string | null;
  attempts: number;
}

export interface TestProgress {
  modules: Record<ModuleKind, ModuleProgress>;
  completedModules: number;
  overallBand: number | null;
  remaining: ModuleKind[];
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

export interface TestMeta {
  id: string;
  type: TestType;
  book: number;
  testNumber: number;
  title: string;
}

export interface BookList {
  book: number;
  tests: (TestProgress & { id: string; testNumber: number; title: string })[];
}

export interface TestOverview extends TestProgress, TestMeta {
  durations: Record<ModuleKind, number>;
  history: { id: string; module: ModuleKind; status: AttemptStatus; band: number | null; startedAt: string; submittedAt: string | null }[];
}

export interface QuestionResult {
  number: number;
  questionId: string;
  yourAnswer: string;
  correctAnswers: string[];
  correct: boolean;
}

export interface Criterion {
  band: number;
  comment: string;
}

export interface WritingTaskFeedback {
  criteria: Record<string, Criterion>;
  strengths: string[];
  improvements: string[];
  correctedExamples: { original: string; improved: string; why: string }[];
}

export interface WritingFeedback {
  task1: WritingTaskFeedback;
  task2: WritingTaskFeedback;
  task1Band: number;
  task2Band: number;
  summary: string;
  words: { task1: number; task2: number };
}

export interface SpeakingFeedback {
  criteria: Record<string, Criterion>;
  strengths: string[];
  improvements: string[];
  betterAnswers: { question: string; suggestion: string }[];
  summary: string;
}

export interface Attempt {
  id: string;
  module: ModuleKind;
  status: AttemptStatus;
  answers: Record<string, unknown>;
  startedAt: string;
  submittedAt: string | null;
  deadline: string;
  durationMinutes: number;
  error: string | null;
  test: TestMeta;
  content: unknown;
  /** Only present once the module is completed. */
  result: {
    band: number | null;
    rawScore: number | null;
    totalQuestions: number | null;
    feedback: unknown;
  } | null;
}

export interface Dashboard {
  totals: { testsStarted: number; testsCompleted: number; modulesCompleted: number; inProgress: number };
  averages: Record<ModuleKind, number | null>;
  inProgress: (TestProgress & { test: TestMeta })[];
  recent: { id: string; module: ModuleKind; status: AttemptStatus; band: number | null; startedAt: string; submittedAt: string | null; test: TestMeta }[];
  trend: { module: ModuleKind; band: number; date: string }[];
}
