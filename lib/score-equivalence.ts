/* ------------------------------------------------------------------ */
/*  Approximate English test score equivalences                       */
/*                                                                    */
/*  Values follow widely published concordance tables (ETS for TOEFL  */
/*  iBT, Pearson for PTE Academic, Duolingo for the Duolingo English  */
/*  Test, Cambridge English for the Cambridge English Scale and the   */
/*  common CEFR alignment of IELTS bands). They are approximate and   */
/*  are not an official conversion: institutions set their own        */
/*  requirements for each test.                                       */
/* ------------------------------------------------------------------ */

export type ScoreTestId = "IELTS" | "CEFR" | "TOEFL" | "PTE" | "DET" | "CES";

export type CefrLevel = "A2" | "B1" | "B2" | "C1" | "C2";

export interface ScoreRange {
  min: number;
  max: number;
}

export interface EquivalenceRow {
  ielts: number;
  cefr: CefrLevel;
  toefl: ScoreRange;
  pte: ScoreRange;
  det: ScoreRange;
  ces: ScoreRange;
}

export interface ScoreTestInfo {
  id: ScoreTestId;
  name: string;
  shortName: string;
  scale: string;
  source: string;
  /** Range accepted by the numeric input (not used for IELTS / CEFR). */
  inputMin?: number;
  inputMax?: number;
  step?: number;
}

export const SCORE_TESTS: ScoreTestInfo[] = [
  {
    id: "IELTS",
    name: "IELTS (Academic / General Training)",
    shortName: "IELTS",
    scale: "Band 0–9 in half bands",
    source: "IELTS partners (British Council, IDP, Cambridge English)",
  },
  {
    id: "CEFR",
    name: "CEFR level",
    shortName: "CEFR",
    scale: "A1–C2",
    source: "Council of Europe framework, IELTS alignment published by the IELTS partners",
  },
  {
    id: "TOEFL",
    name: "TOEFL iBT",
    shortName: "TOEFL iBT",
    scale: "0–120",
    source: "ETS comparison of TOEFL iBT and IELTS scores",
    inputMin: 0,
    inputMax: 120,
    step: 1,
  },
  {
    id: "PTE",
    name: "PTE Academic",
    shortName: "PTE",
    scale: "10–90",
    source: "Pearson concordance of PTE Academic and IELTS",
    inputMin: 10,
    inputMax: 90,
    step: 1,
  },
  {
    id: "DET",
    name: "Duolingo English Test",
    shortName: "Duolingo",
    scale: "10–160",
    source: "Duolingo English Test published concordance with IELTS",
    inputMin: 10,
    inputMax: 160,
    step: 5,
  },
  {
    id: "CES",
    name: "Cambridge English Scale",
    shortName: "Cambridge Scale",
    scale: "80–230",
    source: "Cambridge English Scale alignment with IELTS",
    inputMin: 80,
    inputMax: 230,
    step: 1,
  },
];

/** IELTS overall band 4.0–9.0 with approximate equivalents, highest first. */
export const EQUIVALENCE_TABLE: EquivalenceRow[] = [
  { ielts: 9.0, cefr: "C2", toefl: { min: 118, max: 120 }, pte: { min: 90, max: 90 }, det: { min: 155, max: 160 }, ces: { min: 209, max: 230 } },
  { ielts: 8.5, cefr: "C2", toefl: { min: 115, max: 117 }, pte: { min: 88, max: 89 }, det: { min: 150, max: 154 }, ces: { min: 204, max: 208 } },
  { ielts: 8.0, cefr: "C1", toefl: { min: 110, max: 114 }, pte: { min: 84, max: 87 }, det: { min: 140, max: 149 }, ces: { min: 199, max: 203 } },
  { ielts: 7.5, cefr: "C1", toefl: { min: 102, max: 109 }, pte: { min: 76, max: 83 }, det: { min: 130, max: 139 }, ces: { min: 191, max: 198 } },
  { ielts: 7.0, cefr: "C1", toefl: { min: 94, max: 101 }, pte: { min: 66, max: 75 }, det: { min: 120, max: 129 }, ces: { min: 185, max: 190 } },
  { ielts: 6.5, cefr: "B2", toefl: { min: 79, max: 93 }, pte: { min: 56, max: 65 }, det: { min: 110, max: 119 }, ces: { min: 176, max: 184 } },
  { ielts: 6.0, cefr: "B2", toefl: { min: 60, max: 78 }, pte: { min: 46, max: 55 }, det: { min: 100, max: 109 }, ces: { min: 169, max: 175 } },
  { ielts: 5.5, cefr: "B2", toefl: { min: 46, max: 59 }, pte: { min: 36, max: 45 }, det: { min: 90, max: 99 }, ces: { min: 162, max: 168 } },
  { ielts: 5.0, cefr: "B1", toefl: { min: 35, max: 45 }, pte: { min: 29, max: 35 }, det: { min: 80, max: 89 }, ces: { min: 154, max: 161 } },
  { ielts: 4.5, cefr: "B1", toefl: { min: 32, max: 34 }, pte: { min: 23, max: 28 }, det: { min: 70, max: 79 }, ces: { min: 147, max: 153 } },
  { ielts: 4.0, cefr: "B1", toefl: { min: 0, max: 31 }, pte: { min: 10, max: 22 }, det: { min: 60, max: 69 }, ces: { min: 140, max: 146 } },
];

export const IELTS_BANDS = EQUIVALENCE_TABLE.map((row) => row.ielts);

export const CEFR_LEVELS: { level: CefrLevel; label: string; ielts: string }[] = [
  { level: "C2", label: "C2 · Mastery", ielts: "8.5–9.0" },
  { level: "C1", label: "C1 · Effective operational proficiency", ielts: "7.0–8.0" },
  { level: "B2", label: "B2 · Vantage (upper intermediate)", ielts: "5.5–6.5" },
  { level: "B1", label: "B1 · Threshold (intermediate)", ielts: "4.0–5.0" },
];

const RANGE_KEY: Record<"TOEFL" | "PTE" | "DET" | "CES", keyof Pick<EquivalenceRow, "toefl" | "pte" | "det" | "ces">> = {
  TOEFL: "toefl",
  PTE: "pte",
  DET: "det",
  CES: "ces",
};

export function formatRange(range: ScoreRange): string {
  return range.min === range.max ? `${range.min}` : `${range.min}–${range.max}`;
}

export function ieltsRow(band: number): EquivalenceRow | undefined {
  return EQUIVALENCE_TABLE.find((row) => row.ielts === band);
}

export type ConversionResult =
  | { kind: "rows"; rows: EquivalenceRow[] }
  | { kind: "below"; floor: EquivalenceRow }
  | { kind: "invalid" };

/** Finds the IELTS row(s) that correspond to a score on any supported test. */
export function convertScore(test: ScoreTestId, value: string): ConversionResult {
  if (test === "IELTS") {
    const row = ieltsRow(Number(value));
    return row ? { kind: "rows", rows: [row] } : { kind: "invalid" };
  }
  if (test === "CEFR") {
    const rows = EQUIVALENCE_TABLE.filter((row) => row.cefr === value);
    return rows.length ? { kind: "rows", rows } : { kind: "invalid" };
  }

  const score = Number(value);
  const info = SCORE_TESTS.find((t) => t.id === test);
  if (!Number.isFinite(score) || value.trim() === "" || !info) return { kind: "invalid" };
  if (score < (info.inputMin ?? 0) || score > (info.inputMax ?? Infinity)) return { kind: "invalid" };

  const key = RANGE_KEY[test];
  const floor = EQUIVALENCE_TABLE[EQUIVALENCE_TABLE.length - 1];
  if (score < floor[key].min) return { kind: "below", floor };
  // Ranges are contiguous, so the first row whose minimum is met is the match.
  const row = EQUIVALENCE_TABLE.find((r) => score >= r[key].min);
  return row ? { kind: "rows", rows: [row] } : { kind: "below", floor };
}

/** Combines several rows into one display value per test (e.g. CEFR → IELTS 7.0–8.0). */
export function summariseRows(rows: EquivalenceRow[]) {
  const sorted = [...rows].sort((a, b) => a.ielts - b.ielts);
  const low = sorted[0];
  const high = sorted[sorted.length - 1];
  const span = (key: "toefl" | "pte" | "det" | "ces") =>
    formatRange({ min: low[key].min, max: high[key].max });
  return {
    IELTS: low.ielts === high.ielts ? low.ielts.toFixed(1) : `${low.ielts.toFixed(1)}–${high.ielts.toFixed(1)}`,
    CEFR: [...new Set(sorted.map((r) => r.cefr))].join(" / "),
    TOEFL: span("toefl"),
    PTE: span("pte"),
    DET: span("det"),
    CES: span("ces"),
  } satisfies Record<ScoreTestId, string>;
}

/** General guidance only: real requirements vary by institution, course and year. */
export const TYPICAL_REQUIREMENTS: { purpose: string; overall: string; note: string }[] = [
  {
    purpose: "Foundation and pathway programmes",
    overall: "5.0–5.5",
    note: "Often paired with a minimum of around 4.5–5.0 in each skill.",
  },
  {
    purpose: "Many UK undergraduate courses",
    overall: "6.0–6.5",
    note: "Commonly with no skill below 5.5–6.0; competitive courses may ask for more.",
  },
  {
    purpose: "Many postgraduate taught (master's) courses",
    overall: "6.5–7.0",
    note: "Writing minimums of 6.0–6.5 are common.",
  },
  {
    purpose: "Language-heavy subjects (law, medicine, journalism, teaching)",
    overall: "7.0–7.5",
    note: "Often with a high minimum in every skill.",
  },
  {
    purpose: "Professional registration (e.g. healthcare)",
    overall: "Often 7.0+",
    note: "Regulators typically set per-skill minimums; check the regulator directly.",
  },
  {
    purpose: "Skilled migration",
    overall: "Varies widely",
    note: "Thresholds range from basic to very high per skill, and higher scores can earn extra points in some systems.",
  },
];

export const SCORE_CONVERTER_FAQ: { question: string; answer: string }[] = [
  {
    question: "What TOEFL iBT score is equivalent to IELTS 7.0?",
    answer:
      "Based on the ETS comparison of TOEFL iBT and IELTS scores, an IELTS overall band of 7.0 corresponds roughly to a TOEFL iBT score of 94–101. Institutions that accept both tests often set their own pairs of minimums, so check the exact figures they publish.",
  },
  {
    question: "What PTE Academic score equals IELTS 6.5?",
    answer:
      "Pearson's concordance places IELTS 6.5 at roughly 56–65 on PTE Academic. Pearson has revised its concordance over time, so a university or visa authority may use slightly different figures.",
  },
  {
    question: "What CEFR level is IELTS 6.5?",
    answer:
      "IELTS 6.5 is generally aligned with CEFR B2 (upper intermediate). The common alignment is IELTS 4.0–5.0 for B1, 5.5–6.5 for B2, 7.0–8.0 for C1 and 8.5–9.0 for C2.",
  },
  {
    question: "Is the Duolingo English Test accepted instead of IELTS?",
    answer:
      "Many institutions accept the Duolingo English Test, and Duolingo publishes a concordance that places a score of about 120–125 near IELTS 7.0. Acceptance and minimum scores are set by each institution, and some visa routes do not accept it, so confirm before you book.",
  },
  {
    question: "Are these score conversions official?",
    answer:
      "No. The table uses widely published approximate concordance values from ETS, Pearson, Duolingo and Cambridge English. Each test measures English differently, so equivalences are estimates, and the organisation you apply to decides which scores it accepts.",
  },
];
