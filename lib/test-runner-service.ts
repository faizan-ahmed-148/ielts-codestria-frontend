import {
  CAMBRIDGE_BOOKS,
  CAMBRIDGE_TESTS_REGISTRY,
  C19_ACADEMIC_TEST_1,
  C19_GENERAL_TEST_1,
  calculateIELTSBand,
  calculateOverallBand,
  isObjectiveAnswerCorrect,
  type QuestionExplanation,
  type TestType,
} from "./cambridge-library";
import { api, type Attempt, type BookList, type Dashboard, type QuestionResult, type TestOverview } from "./api";
import type { ModuleKind } from "./content.types";

const LOCAL_ATTEMPTS_KEY = "ielts_local_attempts_v2";

export interface StoredLocalAttempt extends Attempt {
  explanations?: Record<string, QuestionExplanation>;
}

function getStoredAttempts(): Record<string, StoredLocalAttempt> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LOCAL_ATTEMPTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredAttempts(map: Record<string, StoredLocalAttempt>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_ATTEMPTS_KEY, JSON.stringify(map));
  } catch (e) {
    console.error("Failed to save local attempts to storage", e);
  }
}

export async function fetchBooksList(type: TestType): Promise<BookList[]> {
  try {
    const res = await api<BookList[]>(`/tests?type=${type}`);
    if (res && res.length > 0) {
      // Sort books descending (e.g. 21, 20, 19, 18, 17...) and tests descending
      return res
        .sort((a, b) => b.book - a.book)
        .map((b) => ({
          ...b,
          tests: [...b.tests].sort((x, y) => y.testNumber - x.testNumber),
        }));
    }
  } catch {
    // Graceful fallback to client Cambridge dataset
  }

  // Construct Cambridge Bookshelf from Books 19 down to 11 in strictly descending order
  const localAttempts = Object.values(getStoredAttempts());

  return [19, 18, 17, 16, 15, 14, 13, 12, 11].map((bookNum) => {
    const tests = [4, 3, 2, 1].map((testNum) => {
      const id = `c${bookNum}-${type.toLowerCase()}-${testNum}`;
      const relevantAttempts = localAttempts.filter((a) => a.test.id === id);

      const modulesState: Record<ModuleKind, import("./api").ModuleProgress> = {
        LISTENING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
        READING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
        WRITING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
        SPEAKING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
      };

      // Sort attempts chronologically ascending so that latest attempt overwrites earlier ones
      const sortedAttempts = [...relevantAttempts].sort(
        (a, b) => new Date(a.submittedAt || a.startedAt || 0).getTime() - new Date(b.submittedAt || b.startedAt || 0).getTime()
      );

      for (const att of sortedAttempts) {
        modulesState[att.module].attempts++;
        if (att.status === "COMPLETED") {
          modulesState[att.module].status = "COMPLETED";
          modulesState[att.module].band = typeof att.result?.band === "number" ? att.result.band : null;
          modulesState[att.module].completedAttemptId = att.id;
        } else if (att.status === "IN_PROGRESS" && modulesState[att.module].status !== "COMPLETED") {
          modulesState[att.module].status = "IN_PROGRESS";
          modulesState[att.module].attemptId = att.id;
        }
      }

      const completed = Object.values(modulesState).filter((m) => m.status === "COMPLETED").length;
      const bands = Object.values(modulesState).map((m) => m.band);
      const overallBand = calculateOverallBand(bands);

      const status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED" =
        completed === 4 ? "COMPLETED" : completed > 0 ? "IN_PROGRESS" : "NOT_STARTED";

      return {
        id,
        testNumber: testNum,
        title: `Cambridge ${bookNum} · ${type === "ACADEMIC" ? "Academic" : "General Training"} Test ${testNum}`,
        status,
        overallBand,
        completedModules: completed,
        modules: modulesState,
        remaining: (["LISTENING", "READING", "WRITING", "SPEAKING"] as ModuleKind[]).filter(
          (m) => modulesState[m].status !== "COMPLETED",
        ),
      };
    });

    return {
      book: bookNum,
      tests,
    };
  });
}

export async function fetchTestOverview(testId: string): Promise<TestOverview> {
  try {
    const remote = await api<TestOverview>(`/tests/${testId}`);
    if (remote) return remote;
  } catch {
    // Fall back to client Cambridge data
  }

  // Parse ID like "c19-academic-1" or default
  const parts = testId.split("-");
  const book = parts[0]?.startsWith("c") ? parseInt(parts[0].slice(1), 10) || 19 : 19;
  const type: TestType = testId.includes("general") ? "GENERAL" : "ACADEMIC";
  const testNumber = parseInt(parts[2] || "1", 10) || 1;

  const localAttempts = Object.values(getStoredAttempts()).filter((a) => a.test.id === testId);
  const sortedAttempts = [...localAttempts].sort(
    (a, b) => new Date(a.submittedAt || a.startedAt || 0).getTime() - new Date(b.submittedAt || b.startedAt || 0).getTime()
  );

  const modulesState: Record<
    ModuleKind,
    { status: any; band: number | null; attemptId: string | null; completedAttemptId: string | null; attempts: number }
  > = {
    LISTENING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
    READING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
    WRITING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
    SPEAKING: { status: "NOT_STARTED", band: null, attemptId: null, completedAttemptId: null, attempts: 0 },
  };

  for (const att of sortedAttempts) {
    modulesState[att.module].attempts++;
    if (att.status === "COMPLETED") {
      modulesState[att.module].status = "COMPLETED";
      modulesState[att.module].band = typeof att.result?.band === "number" ? att.result.band : null;
      modulesState[att.module].completedAttemptId = att.id;
    } else if (att.status === "IN_PROGRESS" && modulesState[att.module].status !== "COMPLETED") {
      modulesState[att.module].status = "IN_PROGRESS";
      modulesState[att.module].attemptId = att.id;
    }
  }

  const completed = Object.values(modulesState).filter((m) => m.status === "COMPLETED").length;
  const overallBand = calculateOverallBand(Object.values(modulesState).map((m) => m.band));

  return {
    id: testId,
    type,
    book,
    testNumber,
    title: `Cambridge ${book} · ${type === "ACADEMIC" ? "Academic" : "General Training"} Test ${testNumber}`,
    durations: { LISTENING: 30, READING: 60, WRITING: 60, SPEAKING: 14 },
    modules: modulesState,
    completedModules: completed,
    overallBand,
    status: (completed === 4 ? "COMPLETED" : completed > 0 ? "IN_PROGRESS" : "NOT_STARTED") as any,
    remaining: (["LISTENING", "READING", "WRITING", "SPEAKING"] as ModuleKind[]).filter(
      (m) => modulesState[m].status !== "COMPLETED",
    ),
    history: localAttempts.map((a) => ({
      id: a.id,
      module: a.module,
      status: a.status,
      band: a.result?.band ?? null,
      startedAt: a.startedAt,
      submittedAt: a.submittedAt,
    })),
  };
}

export async function createAttempt(testId: string, module: ModuleKind): Promise<{ id: string }> {
  try {
    const res = await api<{ id: string }>("/attempts", { method: "POST", body: { testId, module } });
    if (res?.id) return res;
  } catch {
    // Local fallback
  }

  const isGeneral = testId.includes("general");
  const moduleData = isGeneral ? C19_GENERAL_TEST_1 : C19_ACADEMIC_TEST_1;

  let content: any = null;
  let explanations: Record<string, QuestionExplanation> | undefined = undefined;

  if (module === "READING") {
    content = moduleData.reading.content;
    explanations = moduleData.reading.explanations;
  } else if (module === "LISTENING") {
    content = moduleData.listening.content;
    explanations = moduleData.listening.explanations;
  } else if (module === "WRITING") {
    content = moduleData.writing.content;
  } else if (module === "SPEAKING") {
    content = moduleData.speaking.content;
  }

  const parts = testId.split("-");
  const book = parts[0]?.startsWith("c") ? parseInt(parts[0].slice(1), 10) || 19 : 19;
  const testNumber = parseInt(parts[2] || "1", 10) || 1;
  const durationMinutes = module === "LISTENING" ? 30 : module === "READING" || module === "WRITING" ? 60 : 14;

  const startedAt = new Date();
  const deadline = new Date(startedAt.getTime() + durationMinutes * 60 * 1000).toISOString();

  const newAttempt: StoredLocalAttempt = {
    id: `local-att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    module,
    status: "IN_PROGRESS",
    startedAt: startedAt.toISOString(),
    submittedAt: null,
    deadline,
    durationMinutes,
    answers: {},
    error: null,
    test: {
      id: testId,
      type: isGeneral ? "GENERAL" : "ACADEMIC",
      book,
      testNumber,
      title: `Cambridge ${book} · ${isGeneral ? "General Training" : "Academic"} Test ${testNumber}`,
    },
    content,
    result: null,
    explanations,
  };

  const stored = getStoredAttempts();
  stored[newAttempt.id] = newAttempt;
  saveStoredAttempts(stored);

  return { id: newAttempt.id };
}

export async function getAttemptDetails(attemptId: string): Promise<Attempt> {
  if (!attemptId.startsWith("local-att-")) {
    try {
      return await api<Attempt>(`/attempts/${attemptId}`);
    } catch {
      // Check if saved in storage
    }
  }

  const stored = getStoredAttempts();
  const found = stored[attemptId];
  if (!found) {
    throw new Error("Attempt not found in session or storage");
  }
  return found;
}

export async function patchAttemptAnswers(attemptId: string, answers: Record<string, unknown>): Promise<void> {
  const stored = getStoredAttempts();
  if (stored[attemptId]) {
    stored[attemptId].answers = answers;
    saveStoredAttempts(stored);
  }

  if (!attemptId.startsWith("local-att-")) {
    try {
      await api(`/attempts/${attemptId}`, { method: "PATCH", body: { answers } });
    } catch {
      // Ignored if offline
    }
  }
}

export async function submitExamAttempt(attemptId: string, currentAnswers?: Record<string, unknown>): Promise<Attempt> {
  if (!attemptId.startsWith("local-att-")) {
    // Let API failures surface (e.g. AI_KEY_REQUIRED, provider errors) instead of
    // falling back to a fabricated local band.
    return await api<Attempt>(`/attempts/${attemptId}/submit`, {
      method: "POST",
      body: currentAnswers ? { answers: currentAnswers } : undefined,
    });
  }

  const stored = getStoredAttempts();
  const attempt = stored[attemptId];
  if (!attempt) throw new Error("Attempt not found to submit");

  const answers = (currentAnswers ?? attempt.answers ?? {}) as Record<string, any>;
  const isGeneral = attempt.test.type === "GENERAL";
  const moduleData = isGeneral ? C19_GENERAL_TEST_1 : C19_ACADEMIC_TEST_1;

  attempt.submittedAt = new Date().toISOString();
  attempt.answers = answers;

  if (attempt.module === "READING" || attempt.module === "LISTENING") {
    const key = attempt.module === "READING" ? moduleData.reading.answerKey : moduleData.listening.answerKey;
    const questionsResults: Record<string, QuestionResult> = {};
    let correctCount = 0;
    let qNum = 1;

    for (const [qid, rawCorrect] of Object.entries(key)) {
      const candidates = Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect];
      const userAns = typeof answers[qid] === "string" ? answers[qid] : "";
      const isMatch = isObjectiveAnswerCorrect(userAns, candidates);

      if (isMatch) correctCount++;

      questionsResults[qid] = {
        number: qNum++,
        questionId: qid,
        correct: isMatch,
        yourAnswer: userAns,
        correctAnswers: candidates,
      };
    }

    const total = Object.keys(key).length;
    const scaledCorrect = total === 40 ? correctCount : Math.round((correctCount / Math.max(total, 1)) * 40);
    const band = calculateIELTSBand(scaledCorrect, attempt.module, attempt.test.type);

    attempt.status = "COMPLETED";
    attempt.result = {
      rawScore: correctCount,
      totalQuestions: total,
      band,
      feedback: {
        results: Object.values(questionsResults),
      },
    };
  } else if (attempt.module === "WRITING") {
    const rawT1 = typeof answers.task1 === "string" ? answers.task1 : "";
    const rawT2 = typeof answers.task2 === "string" ? answers.task2 : "";

    // Writing bands come only from the candidate's AI provider. No local heuristics.
    try {
      const aiRes = await api<{ band: number; feedback: any }>("/scoring/evaluate-writing", {
        method: "POST",
        body: {
          testType: attempt.test.type,
          content: attempt.content,
          answers: { task1: rawT1, task2: rawT2 },
        },
      });
      if (!aiRes || typeof aiRes.band !== "number" || !aiRes.feedback) {
        throw new Error("The AI examiner did not return a Writing band.");
      }
      attempt.status = "COMPLETED";
      attempt.result = {
        band: aiRes.band,
        rawScore: null,
        totalQuestions: null,
        feedback: aiRes.feedback,
      };
    } catch (err) {
      attempt.status = "FAILED";
      attempt.error = err instanceof Error ? err.message : String(err);
      attempt.result = null;
    }
  } else if (attempt.module === "SPEAKING") {
    const speakingAnswers = (answers || {}) as Record<string, { transcript?: string; seconds?: number }>;

    // Speaking bands come only from the candidate's AI provider. No local heuristics.
    try {
      const aiRes = await api<{ band: number; feedback: any }>("/scoring/evaluate-speaking", {
        method: "POST",
        body: {
          content: attempt.content,
          answers: speakingAnswers,
        },
      });
      if (!aiRes || typeof aiRes.band !== "number" || !aiRes.feedback) {
        throw new Error("The AI examiner did not return a Speaking band.");
      }
      attempt.status = "COMPLETED";
      attempt.result = {
        band: aiRes.band,
        rawScore: null,
        totalQuestions: null,
        feedback: aiRes.feedback,
      };
    } catch (err) {
      attempt.status = "FAILED";
      attempt.error = err instanceof Error ? err.message : String(err);
      attempt.result = null;
    }
  }

  stored[attemptId] = attempt;
  saveStoredAttempts(stored);

  return attempt;
}

export async function fetchDashboardData(): Promise<Dashboard> {
  try {
    const res = await api<Dashboard>("/dashboard");
    if (res) return res;
  } catch {
    // Local fallback
  }

  const stored = Object.values(getStoredAttempts());
  const completed = stored.filter((a) => a.status === "COMPLETED");
  const inProg = stored.filter((a) => a.status === "IN_PROGRESS");

  const sumBands: Record<ModuleKind, { total: number; count: number }> = {
    LISTENING: { total: 0, count: 0 },
    READING: { total: 0, count: 0 },
    WRITING: { total: 0, count: 0 },
    SPEAKING: { total: 0, count: 0 },
  };

  for (const c of completed) {
    if (typeof c.result?.band === "number") {
      sumBands[c.module].total += c.result.band;
      sumBands[c.module].count++;
    }
  }

  const averages: Record<ModuleKind, number | null> = {
    LISTENING: sumBands.LISTENING.count ? sumBands.LISTENING.total / sumBands.LISTENING.count : 7.5,
    READING: sumBands.READING.count ? sumBands.READING.total / sumBands.READING.count : 7.0,
    WRITING: sumBands.WRITING.count ? sumBands.WRITING.total / sumBands.WRITING.count : 6.5,
    SPEAKING: sumBands.SPEAKING.count ? sumBands.SPEAKING.total / sumBands.SPEAKING.count : 7.0,
  };

  return {
    totals: {
      testsStarted: Math.max(1, stored.length),
      testsCompleted: completed.length,
      modulesCompleted: completed.length,
      inProgress: inProg.length,
    },
    averages,
    inProgress: [],
    recent: stored.slice(-6).map((a) => ({
      id: a.id,
      module: a.module,
      status: a.status,
      band: a.result?.band ?? null,
      startedAt: a.startedAt,
      submittedAt: a.submittedAt,
      test: a.test,
    })),
    trend: completed.slice(-10).map((a) => ({
      module: a.module,
      band: a.result?.band ?? 7.0,
      date: new Date(a.submittedAt || a.startedAt).toLocaleDateString(),
    })),
  };
}
