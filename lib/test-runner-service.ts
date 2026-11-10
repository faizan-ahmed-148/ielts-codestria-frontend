import { api, type Attempt, type BookList, type Dashboard, type TestOverview, type TestType } from "./api";
import { track } from "./analytics";
import type { ModuleKind } from "./content.types";

/** Extra candidate-side data that is persisted with an attempt. */
export interface AttemptPatch {
  answers?: Record<string, unknown>;
  notes?: string;
  timeSpentSeconds?: number;
  questionMeta?: Record<string, { answeredAt?: string; timeSpentSeconds?: number }>;
}

/**
 * Thin API client for the exam room. All content, marking, scoring and
 * persistence live in the backend; there is no local fallback.
 */

export async function fetchBooksList(type: TestType): Promise<BookList[]> {
  const res = await api<BookList[]>(`/tests?type=${type}`);
  return [...res]
    .sort((a, b) => b.book - a.book)
    .map((book) => ({
      ...book,
      tests: [...book.tests].sort((x, y) => y.testNumber - x.testNumber),
    }));
}

export function fetchTestOverview(testId: string): Promise<TestOverview> {
  return api<TestOverview>(`/tests/${testId}`);
}

export async function createAttempt(
  testId: string,
  module: ModuleKind,
  context: { sessionId?: string; clientMeta?: Record<string, unknown> } = {},
): Promise<{ id: string; resumed: boolean }> {
  track("attempt_start", { test_id: testId, module }, { testId, module });
  return api<{ id: string; resumed: boolean }>("/attempts", {
    method: "POST",
    body: { testId, module, ...context },
  });
}

export function getAttemptDetails(attemptId: string): Promise<Attempt> {
  return api<Attempt>(`/attempts/${attemptId}`);
}

/** Autosaves answers (and optionally scratchpad notes / active time). */
export function saveAttempt(attemptId: string, patch: AttemptPatch): Promise<{ ok: true; savedAt: string }> {
  return api<{ ok: true; savedAt: string }>(`/attempts/${attemptId}`, { method: "PATCH", body: patch });
}

/** Backwards-compatible helper used by the attempt page for answers only. */
export function patchAttemptAnswers(attemptId: string, answers: Record<string, unknown>): Promise<{ ok: true; savedAt: string }> {
  return saveAttempt(attemptId, { answers });
}

export async function submitExamAttempt(
  attemptId: string,
  currentAnswers?: Record<string, unknown>,
  extra: Omit<AttemptPatch, "answers"> = {},
): Promise<Attempt> {
  track("attempt_submit", { attempt_id: attemptId }, { attemptId });
  const body: AttemptPatch = { ...extra };
  if (currentAnswers !== undefined) body.answers = currentAnswers;
  return api<Attempt>(`/attempts/${attemptId}/submit`, { method: "POST", body });
}

export function fetchDashboardData(): Promise<Dashboard> {
  return api<Dashboard>("/dashboard");
}

export interface ScoringRunSummary {
  id: string;
  module: ModuleKind;
  provider: string | null;
  model: string | null;
  status: "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED";
  band: number | null;
  latencyMs: number | null;
  error: string | null;
  createdAt: string;
}

export interface PersonalAnalytics {
  user: {
    id: string;
    name: string;
    email: string;
    track: TestType | null;
    targetBand: number | null;
    createdAt: string;
    lastActiveAt: string | null;
  } | null;
  totals: {
    attempts: number;
    completedAttempts: number;
    inProgress: number;
    failed: number;
    testsTracked: number;
    testsCompleted: number;
    timeSpentSeconds: number;
    eventsLast30Days: number;
    studyDays: number;
    scoringRuns: number;
    scoringFailures: number;
  };
  modules: Record<
    ModuleKind,
    { attempts: number; completed: number; averageBand: number | null; bestBand: number | null; lastBand: number | null }
  >;
  questionTypes: { name: string; answered: number; correct: number; marks: number; accuracy: number }[];
  questionModules: { name: string; answered: number; correct: number; marks: number; accuracy: number }[];
  bands: { latestOverall: number | null; bestOverall: number | null; target: number | null; gap: number | null };
  events: {
    last30Days: { name: string; count: number }[];
    recent: {
      id: string;
      name: string;
      path: string | null;
      module: ModuleKind | null;
      testType: TestType | null;
      testId: string | null;
      attemptId: string | null;
      createdAt: string;
    }[];
  };
  tests: {
    id: string;
    testId: string;
    test: { id: string; type: TestType; book: number; testNumber: number; title: string };
    listeningBand: number | null;
    readingBand: number | null;
    writingBand: number | null;
    speakingBand: number | null;
    overallBand: number | null;
    completedModules: number;
    computedAt: string;
  }[];
  trend: { date: string; module: ModuleKind; band: number }[];
  scoring: {
    latest: ScoringRunSummary | null;
    providers: string[];
    recent: ScoringRunSummary[];
  };
}

/** Full personal analytics summary, computed by the backend from MySQL. */
export function fetchMyAnalytics(): Promise<PersonalAnalytics> {
  return api<PersonalAnalytics>("/analytics/me");
}
