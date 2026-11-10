/**
 * IELTS band tables and CEFR mapping.
 *
 * These are presentation helpers (the score calculator and result badges).
 * Authoritative marking happens on the server; this file never marks a test.
 */

export type TestType = "ACADEMIC" | "GENERAL";

function normalizeObjectiveAnswer(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9£$%.:' ]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^(a|an|the) /, "")
    .replace(/\.$/, "")
    .trim();
}

const OBJECTIVE_ALIASES: Record<string, string> = {
  t: "true",
  f: "false",
  ng: "not given",
  y: "yes",
  n: "no",
};

/** True when a Reading/Listening answer matches any accepted answer. */
export function isObjectiveAnswerCorrect(given: string | undefined, accepted: string[]): boolean {
  if (!given || !given.trim()) return false;
  const normalized = normalizeObjectiveAnswer(given);
  const target = OBJECTIVE_ALIASES[normalized] ?? normalized;
  return accepted.some((a) => normalizeObjectiveAnswer(a) === target);
}

export function calculateIELTSBand(
  rawScore: number,
  module: "LISTENING" | "READING",
  track: TestType = "ACADEMIC",
): number {
  const score = Math.max(0, Math.min(40, Math.round(rawScore)));

  if (score === 0) return 0.0;

  if (module === "LISTENING") {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 32) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 26) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 18) return 5.5;
    if (score >= 16) return 5.0;
    if (score >= 13) return 4.5;
    if (score >= 10) return 4.0;
    if (score >= 8) return 3.5;
    if (score >= 6) return 3.0;
    if (score >= 4) return 2.5;
    if (score >= 3) return 2.0;
    if (score >= 2) return 1.5;
    return 1.0;
  }

  // Academic Reading
  if (track === "ACADEMIC") {
    if (score >= 39) return 9.0;
    if (score >= 37) return 8.5;
    if (score >= 35) return 8.0;
    if (score >= 33) return 7.5;
    if (score >= 30) return 7.0;
    if (score >= 27) return 6.5;
    if (score >= 23) return 6.0;
    if (score >= 19) return 5.5;
    if (score >= 15) return 5.0;
    if (score >= 13) return 4.5;
    if (score >= 10) return 4.0;
    if (score >= 8) return 3.5;
    if (score >= 6) return 3.0;
    if (score >= 4) return 2.5;
    if (score >= 3) return 2.0;
    if (score >= 2) return 1.5;
    return 1.0;
  }

  // General Training Reading (higher thresholds)
  if (score >= 40) return 9.0;
  if (score >= 39) return 8.5;
  if (score >= 37) return 8.0;
  if (score >= 36) return 7.5;
  if (score >= 34) return 7.0;
  if (score >= 32) return 6.5;
  if (score >= 30) return 6.0;
  if (score >= 27) return 5.5;
  if (score >= 23) return 5.0;
  if (score >= 19) return 4.5;
  if (score >= 15) return 4.0;
  if (score >= 12) return 3.5;
  if (score >= 9) return 3.0;
  if (score >= 6) return 2.5;
  if (score >= 4) return 2.0;
  if (score >= 2) return 1.5;
  return 1.0;
}

export function calculateOverallBand(bands: (number | null)[]): number | null {
  const valid = bands.filter((b): b is number => typeof b === "number" && !isNaN(b));
  if (valid.length < 4) return null;
  const avg = valid.reduce((acc, cur) => acc + cur, 0) / valid.length;
  // Official IELTS rounding: .0–.24 down, .25–.74 to .5, .75+ up.
  const integer = Math.floor(avg);
  const decimal = avg - integer;
  if (decimal < 0.25) return integer;
  if (decimal < 0.75) return integer + 0.5;
  return integer + 1.0;
}

export function getCEFRLevel(band: number | null | undefined): { level: string; description: string } {
  if (band === null || band === undefined) return { level: "–", description: "Pending AI Evaluation" };
  if (band >= 8.5) return { level: "C2", description: "Mastery / Proficient User" };
  if (band >= 7.0) return { level: "C1", description: "Effective Operational Proficiency" };
  if (band >= 5.5) return { level: "B2", description: "Vantage / Independent User" };
  if (band >= 4.0) return { level: "B1", description: "Threshold / Intermediate User" };
  return { level: "A2", description: "Waystage / Basic User" };
}
