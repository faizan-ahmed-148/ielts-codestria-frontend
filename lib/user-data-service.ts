import { api, type TestType } from "./api";

/**
 * Candidate-owned data stored in MySQL (study plan, vocabulary mastery,
 * account export and practice-history reset). No localStorage.
 */

export interface StudyTask {
  id: string;
  text: string;
  module: "Listening" | "Reading" | "Writing" | "Speaking" | "General";
  durationMinutes: number;
  completed: boolean;
}

export interface StudyPlan {
  currentBand: number;
  targetBand: number;
  weeksRemaining: number;
  dailyHours: number;
  weakestModule: string;
  examType: TestType;
  tasks: StudyTask[];
  updatedAt: string;
}

export async function fetchStudyPlan(): Promise<StudyPlan | null> {
  const res = await api<{ plan: StudyPlan | null }>("/me/study-plan");
  return res.plan;
}

export function saveStudyPlan(
  patch: Partial<Omit<StudyPlan, "updatedAt">>,
): Promise<{ plan: StudyPlan | null }> {
  return api<{ plan: StudyPlan | null }>("/me/study-plan", { method: "PUT", body: patch });
}

export async function fetchMasteredVocabulary(): Promise<string[]> {
  const res = await api<{ masteredIds: string[] }>("/me/vocabulary");
  return res.masteredIds;
}

export function saveMasteredVocabulary(masteredIds: string[]): Promise<{ masteredIds: string[] }> {
  return api<{ masteredIds: string[] }>("/me/vocabulary", { method: "PUT", body: { masteredIds } });
}

export interface DataExport {
  platform: string;
  version: number;
  exportedAt: string;
  user: Record<string, unknown>;
  counts: {
    attempts: number;
    responses: number;
    testScores: number;
    scoringRuns: number;
    activity: number;
  };
  [key: string]: unknown;
}

export function exportMyData(): Promise<DataExport> {
  return api<DataExport>("/me/export");
}

export interface ClearHistoryResult {
  ok: boolean;
  deleted: {
    attempts: number;
    attemptIds: string[];
    responses: number;
    testScores: number;
    scoringRuns: number;
    activityEvents: number;
  };
}

export function clearPracticeHistory(): Promise<ClearHistoryResult> {
  return api<ClearHistoryResult>("/me/practice-history", { method: "DELETE" });
}
