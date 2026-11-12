"use client";

import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  Check,
  Clock,
  FileText,
  KeyRound,
  Link2,
  Loader2,
  LogIn,
  Repeat,
  Sparkles,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdBanner } from "@/components/AdBanner";
import { AiKeySettings } from "@/components/AiKeySetup";
import { useAuth } from "@/components/AuthProvider";
import { BandRing, bandTone, ErrorBox, PageHeader, ProgressBar } from "@/components/ui";
import { getAiKeyStatus } from "@/lib/ai-key";
import { ApiError, api, type Criterion, type WritingFeedback, type WritingTaskFeedback } from "@/lib/api";
import { track } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/*  Task definitions                                                   */
/* ------------------------------------------------------------------ */

type TaskId = "task1-academic" | "task1-general" | "task2";

const TASKS: { id: TaskId; label: string; short: string; minWords: number; minutes: number; placeholder: string }[] = [
  {
    id: "task1-academic",
    label: "Task 1 Academic",
    short: "Report on a chart, table, map or process",
    minWords: 150,
    minutes: 20,
    placeholder: "The bar chart compares the number of visitors to three museums in London between 2010 and 2020…",
  },
  {
    id: "task1-general",
    label: "Task 1 General (letter)",
    short: "Formal, semi-formal or informal letter",
    minWords: 150,
    minutes: 20,
    placeholder: "Dear Mr Thompson,\n\nI am writing to complain about…",
  },
  {
    id: "task2",
    label: "Task 2 Essay",
    short: "Opinion, discussion or problem–solution essay",
    minWords: 250,
    minutes: 40,
    placeholder: "In recent years, many people have argued that…",
  },
];

const LONG_SENTENCE_WORDS = 35;
/** Realistic exam pace including planning and checking (words per minute). */
const EXAM_WPM = 13;

/* ------------------------------------------------------------------ */
/*  Word lists                                                         */
/* ------------------------------------------------------------------ */

const STOPWORDS = new Set(
  (
    "a an the and or but if of to in on at by for with from as is are was were be been being am it its this that these those " +
    "there their they them he she his her we our us you your i me my not no so than then also which who whom what when where " +
    "while can could will would should may might must do does did have has had more most such into about over very only just " +
    "some any each other many much both all one two three"
  ).split(" "),
);

const LINKING: { category: string; words: string[] }[] = [
  { category: "Addition", words: ["furthermore", "moreover", "in addition", "additionally", "besides", "what is more"] },
  { category: "Contrast", words: ["however", "nevertheless", "on the other hand", "whereas", "although", "despite", "in contrast", "conversely"] },
  { category: "Cause & effect", words: ["therefore", "consequently", "as a result", "thus", "hence", "due to", "owing to"] },
  { category: "Example", words: ["for example", "for instance", "such as", "in particular", "to illustrate"] },
  { category: "Sequence", words: ["firstly", "secondly", "finally", "subsequently", "meanwhile", "initially"] },
  { category: "Conclusion", words: ["in conclusion", "to sum up", "overall", "in summary", "all things considered"] },
];

const INFORMAL: { pattern: RegExp; label: string; tip: string }[] = [
  { pattern: /\ba lot of\b/gi, label: "a lot of", tip: "Use “a large number of”, “a great deal of” or “considerable”." },
  { pattern: /\blots of\b/gi, label: "lots of", tip: "Use “numerous” or “a significant amount of”." },
  { pattern: /\bstuff\b/gi, label: "stuff", tip: "Name the thing precisely (e.g. “materials”, “equipment”)." },
  { pattern: /\bthings?\b/gi, label: "thing / things", tip: "Vague. Use a precise noun (“factors”, “issues”, “items”)." },
  { pattern: /\b(?:kids?)\b/gi, label: "kid / kids", tip: "Use “children” or “young people”." },
  { pattern: /\b(?:gonna|wanna|gotta)\b/gi, label: "gonna / wanna", tip: "Too informal for any IELTS task." },
  { pattern: /\b(?:ok|okay)\b/gi, label: "OK / okay", tip: "Use “acceptable” or “satisfactory”." },
  { pattern: /\bget(?:s|ting)?\b|\bgot\b/gi, label: "get / got", tip: "Often vague. Try “obtain”, “become”, “receive”." },
  { pattern: /\bbig\b/gi, label: "big", tip: "Try “significant”, “substantial” or “major”." },
  { pattern: /\bvery\b/gi, label: "very", tip: "Overused intensifier. Try “extremely”, “highly” or a stronger adjective." },
  { pattern: /\betc\.?/gi, label: "etc.", tip: "List the key examples instead of ending with “etc.”." },
  { pattern: /!/g, label: "exclamation mark", tip: "Avoid exclamation marks in academic writing." },
];

const CONTRACTION = /\b[a-z]+(?:n't|'re|'ve|'ll|'d|'m)\b|\b(?:it|that|there|he|she|what|who|let)'s\b/gi;

const CRITERIA_LABELS: Record<string, string> = {
  taskAchievement: "Task Achievement",
  taskResponse: "Task Response",
  coherenceCohesion: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range & Accuracy",
};

/* ------------------------------------------------------------------ */
/*  Analysis                                                           */
/* ------------------------------------------------------------------ */

function countMatches(text: string, pattern: RegExp) {
  return (text.match(pattern) ?? []).length;
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function analyse(raw: string, task: TaskId) {
  const text = raw.replace(/[‘’]/g, "'");
  const tokens = text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) ?? [];
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const lower = tokens.map((t) => t.toLowerCase());
  const unique = new Set(lower);

  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean).length;

  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/)
    .map((s) => s.trim())
    .filter((s) => /[A-Za-z]/.test(s));
  const sentenceLengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const avgSentence = sentences.length ? words / sentences.length : 0;
  const longSentences = sentences
    .map((s, i) => ({ text: s, words: sentenceLengths[i] }))
    .filter((s) => s.words > LONG_SENTENCE_WORDS);

  const freq = new Map<string, number>();
  for (const w of lower) {
    if (w.length < 3 || STOPWORDS.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const repeatThreshold = Math.max(3, Math.round(words / 80));
  const repeated = [...freq.entries()]
    .filter(([, n]) => n >= repeatThreshold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const lowerText = text.toLowerCase();
  const linking = LINKING.map(({ category, words: list }) => {
    const used: { word: string; count: number }[] = [];
    const unused: string[] = [];
    for (const w of list) {
      const n = countMatches(lowerText, new RegExp(`\\b${escapeRegex(w)}\\b`, "g"));
      if (n) used.push({ word: w, count: n });
      else unused.push(w);
    }
    return { category, used, unused };
  });

  const informal = INFORMAL.map((f) => ({ ...f, count: countMatches(text, f.pattern) })).filter((f) => f.count > 0);
  const contractions = [...new Set((text.match(CONTRACTION) ?? []).map((c) => c.toLowerCase()))];
  // Informal letters (General Task 1) may legitimately use contractions.
  const contractionsOk = task === "task1-general";

  return {
    words,
    tokens: tokens.length,
    paragraphs,
    sentences: sentences.length,
    avgSentence,
    longSentences,
    diversity: tokens.length ? unique.size / tokens.length : 0,
    uniqueWords: unique.size,
    repeated,
    linking,
    informal,
    contractions,
    contractionsOk,
    minutes: words / EXAM_WPM,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type AiResult = { band: number; feedback: WritingFeedback };

export default function WritingCheckerClient() {
  const { user, loading: authLoading } = useAuth();
  const [taskId, setTaskId] = useState<TaskId>("task2");
  const [prompt, setPrompt] = useState("");
  const [text, setText] = useState("");
  const [aiKeyConfigured, setAiKeyConfigured] = useState<boolean | null>(null);
  const [needsKey, setNeedsKey] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiResult, setAiResult] = useState<{ task: TaskId; data: WritingTaskFeedback; band: number; summary: string } | null>(null);

  const task = TASKS.find((t) => t.id === taskId)!;
  const stats = useMemo(() => analyse(text, taskId), [text, taskId]);
  const isTask1 = taskId !== "task2";

  useEffect(() => {
    if (!user) {
      setAiKeyConfigured(null);
      return;
    }
    let cancelled = false;
    getAiKeyStatus()
      .then((s) => !cancelled && setAiKeyConfigured(s.configured))
      .catch(() => !cancelled && setAiKeyConfigured(null));
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function scoreWithAi() {
    if (scoring || !stats.words) return;
    setScoring(true);
    setAiError("");
    setNeedsKey(false);
    try {
      const fallbackPrompt = `(No question was supplied. Infer the most likely IELTS ${task.label} question from the response and assess it on its own merits.)`;
      const body = {
        testType: taskId === "task1-general" ? "GENERAL" : "ACADEMIC",
        content: {
          task1: { prompt: isTask1 ? prompt.trim() || fallbackPrompt : "(not attempted)", minWords: 150 },
          task2: { prompt: !isTask1 ? prompt.trim() || fallbackPrompt : "(not attempted)", minWords: 250 },
        },
        answers: isTask1 ? { task1: text } : { task2: text },
      };
      const res = await api<AiResult>("/scoring/evaluate-writing", { method: "POST", body });
      const fb = res.feedback;
      setAiResult({
        task: taskId,
        data: isTask1 ? fb.task1 : fb.task2,
        band: isTask1 ? fb.task1Band : fb.task2Band,
        summary: fb.summary,
      });
      track("writing_checker_ai_scored", { task: taskId, words: stats.words });
    } catch (e) {
      if (e instanceof ApiError && e.code === "AI_KEY_REQUIRED") {
        setNeedsKey(true);
        setAiKeyConfigured(false);
      } else if (e instanceof ApiError && e.status === 401) {
        setAiError("Your session has expired. Please sign in again to get an AI band score.");
      } else {
        setAiError((e as Error).message || "The AI examiner could not score this response.");
      }
    } finally {
      setScoring(false);
    }
  }

  const wordPct = (stats.words / task.minWords) * 100;
  const underLength = stats.words > 0 && stats.words < task.minWords;
  const showKeySetup = !!user && (needsKey || aiKeyConfigured === false);

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Free writing tool"
        title="IELTS Writing checker"
        description="Paste your Task 1 report, letter or Task 2 essay for an instant word count, vocabulary and cohesion check — then get an AI band score against the four official criteria."
        actions={
          <>
            <span className="badge-brand">
              <Sparkles className="h-3.5 w-3.5" />
              Instant &amp; private
            </span>
            <Link href="/tests" className="btn-secondary">
              <BookOpenCheck className="h-4 w-4" />
              Full practice tests
            </Link>
          </>
        }
      />

      {/* Task selector */}
      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-surface-200 bg-surface-100/80 p-1.5 sm:inline-flex">
        {TASKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTaskId(t.id);
              setAiResult(null);
            }}
            aria-pressed={taskId === t.id}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition sm:flex-none ${
              taskId === t.id
                ? "bg-white text-surface-900 shadow-xs ring-1 ring-surface-200"
                : "text-surface-500 hover:bg-white/60 hover:text-surface-900"
            }`}
          >
            <FileText className={`h-4 w-4 ${taskId === t.id ? "text-brand-600" : "text-surface-400"}`} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor */}
        <div className="space-y-4 lg:col-span-2">
          <div className="card space-y-2 p-5">
            <label htmlFor="wc-prompt" className="label">
              Question <span className="font-normal text-surface-400">(optional, improves the AI score)</span>
            </label>
            <textarea
              id="wc-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder={`Paste the ${task.label} question here…`}
              className="input min-h-[84px] resize-y py-2.5 leading-relaxed"
            />
          </div>

          <div className="card flex flex-col overflow-hidden transition focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-100">
            <div className="flex items-center justify-between border-b border-surface-100 bg-white px-5 py-2.5">
              <span className="text-[13px] font-semibold text-surface-700">Your {task.label} response</span>
              <span className="text-xs text-surface-400">{task.short}</span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck={false}
              aria-label="Your answer"
              placeholder={task.placeholder}
              className="min-h-[380px] flex-1 resize-y bg-white p-5 text-[16px] leading-8 text-surface-800 outline-none placeholder:text-surface-400 sm:p-6"
            />
            <div className="flex items-center gap-4 border-t border-surface-100 bg-white px-5 py-3">
              <ProgressBar
                value={wordPct}
                className="flex-1"
                color={stats.words >= task.minWords ? "bg-emerald-500" : "bg-brand-500"}
              />
              <span
                className={`shrink-0 text-[13px] font-semibold tabular-nums ${
                  stats.words >= task.minWords ? "text-emerald-600" : "text-surface-500"
                }`}
              >
                {stats.words} / {task.minWords} words
              </span>
            </div>
          </div>
        </div>

        {/* Instant stats */}
        <div className="space-y-4">
          <div className="card p-5 sm:p-6">
            <div className="eyebrow text-brand-600">Instant analysis</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Words" value={stats.words} hint={`min ${task.minWords}`} warn={underLength} />
              <Stat label="Paragraphs" value={stats.paragraphs} hint={isTask1 ? "aim 3–4" : "aim 4–5"} warn={stats.words > 50 && stats.paragraphs < 3} />
              <Stat label="Sentences" value={stats.sentences} hint={`avg ${stats.avgSentence.toFixed(1)} words`} warn={stats.avgSentence > 28} />
              <Stat
                label="Lexical diversity"
                value={`${Math.round(stats.diversity * 100)}%`}
                hint={`${stats.uniqueWords} unique words`}
                warn={stats.words > 80 && stats.diversity < 0.4}
              />
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-surface-200/80 bg-surface-50/70 p-3.5 text-[13px] leading-relaxed text-surface-600">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>
                Estimated writing time: <strong className="text-surface-800">{Math.max(0, Math.round(stats.minutes))} min</strong> at
                exam pace. You have about <strong className="text-surface-800">{task.minutes} min</strong> for this task.
              </span>
            </div>
            {underLength && (
              <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {task.minWords - stats.words} words short. Under-length answers are penalised under Task{" "}
                  {isTask1 ? "Achievement" : "Response"}.
                </span>
              </div>
            )}
          </div>

          {/* AI score panel */}
          <div className="card border-brand-200/70 bg-gradient-to-b from-brand-50/80 via-white to-white p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-600">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-display text-[15px] font-bold text-surface-900">AI band estimate</span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-surface-600">
              An AI examiner marks your {task.label} against Task {isTask1 ? "Achievement" : "Response"}, Coherence &amp;
              Cohesion, Lexical Resource and Grammatical Range &amp; Accuracy.
            </p>
            <div className="mt-4">
              {authLoading ? (
                <div className="flex justify-center py-2">
                  <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
                </div>
              ) : !user ? (
                <Link href="/login?next=%2Fwriting-checker" className="btn-primary w-full justify-center">
                  <LogIn className="h-4 w-4" />
                  Sign in free to get an AI band score
                </Link>
              ) : showKeySetup ? (
                <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900">
                  <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>Connect a free AI key below to unlock band scoring.</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={scoreWithAi}
                  disabled={scoring || stats.words < 20}
                  className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {scoring ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {scoring ? "Scoring… (up to a minute)" : "Get AI band score"}
                </button>
              )}
              {user && !showKeySetup && stats.words < 20 && (
                <p className="mt-2 text-center text-xs text-surface-400">Write at least 20 words to enable AI scoring.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showKeySetup && (
        <div className="card p-5 sm:p-6">
          <AiKeySettings
            compact
            onSaved={(s) => {
              setAiKeyConfigured(s.configured);
              setNeedsKey(!s.configured);
            }}
          />
        </div>
      )}

      {aiError && <ErrorBox message={aiError} />}

      {aiResult && aiResult.task === taskId && <AiResultPanel result={aiResult} isTask1={isTask1} />}

      {/* Detailed checks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel Icon={Link2} title="Linking words">
          {stats.words === 0 ? (
            <Muted>Start writing to see which cohesive devices you use.</Muted>
          ) : (
            <div className="space-y-3">
              {stats.linking.map((c) => (
                <div key={c.category} className="text-[13px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-surface-800">{c.category}</span>
                    <span className={c.used.length ? "badge-success" : "badge-neutral"}>{c.used.length ? `${c.used.length} used` : "none"}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {c.used.map((u) => (
                      <span key={u.word} className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-0.5 text-emerald-800 ring-1 ring-emerald-200">
                        <Check className="h-3 w-3" /> {u.word}
                        {u.count > 1 && <span className="text-emerald-600">×{u.count}</span>}
                      </span>
                    ))}
                    {c.unused.slice(0, 4).map((w) => (
                      <span key={w} className="rounded-lg bg-surface-50 px-2 py-0.5 text-surface-500 ring-1 ring-surface-200" title="Suggestion">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-xs text-surface-400">Grey words are suggestions you have not used yet. Do not overuse linkers — examiners penalise mechanical cohesion.</p>
            </div>
          )}
        </Panel>

        <Panel Icon={Repeat} title="Repeated words">
          {stats.repeated.length === 0 ? (
            <Muted>{stats.words ? "No heavily repeated content words. Good range!" : "Start writing to check for repetition."}</Muted>
          ) : (
            <>
              <div className="flex flex-wrap gap-1.5">
                {stats.repeated.map(([w, n]) => (
                  <span key={w} className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-[13px] text-amber-900 ring-1 ring-amber-200">
                    {w} <span className="font-semibold text-amber-700">×{n}</span>
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-surface-400">Use synonyms or pronouns to vary these and improve your Lexical Resource score.</p>
            </>
          )}
        </Panel>

        <Panel Icon={AlertTriangle} title="Informal language">
          {stats.informal.length === 0 && stats.contractions.length === 0 ? (
            <Muted>{stats.words ? "No informal words or contractions found." : "Start writing to check your register."}</Muted>
          ) : (
            <ul className="space-y-2 text-[13px]">
              {stats.contractions.length > 0 && (
                <li className={`rounded-xl p-3 ring-1 ${stats.contractionsOk ? "bg-surface-50 ring-surface-200" : "bg-rose-50/70 ring-rose-200"}`}>
                  <span className="font-semibold text-surface-800">Contractions:</span>{" "}
                  <span className="text-surface-700">{stats.contractions.join(", ")}</span>
                  <p className="mt-1 text-surface-500">
                    {stats.contractionsOk
                      ? "Fine in an informal letter to a friend; write the full forms in formal letters."
                      : "Write full forms (do not, it is) in academic writing."}
                  </p>
                </li>
              )}
              {stats.informal.map((f) => (
                <li key={f.label} className="rounded-xl bg-surface-50 p-3 ring-1 ring-surface-200">
                  <span className="font-semibold text-surface-800">“{f.label}”</span>{" "}
                  <span className="text-surface-500">×{f.count}</span>
                  <p className="mt-1 text-surface-500">{f.tip}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel Icon={FileText} title="Overly long sentences">
          {stats.longSentences.length === 0 ? (
            <Muted>{stats.words ? `No sentences over ${LONG_SENTENCE_WORDS} words.` : "Start writing to check sentence length."}</Muted>
          ) : (
            <ul className="space-y-2 text-[13px]">
              {stats.longSentences.slice(0, 5).map((s, i) => (
                <li key={i} className="rounded-xl bg-surface-50 p-3 ring-1 ring-surface-200">
                  <span className="badge-warning mb-1.5">{s.words} words</span>
                  <p className="text-surface-600">{s.text.length > 220 ? `${s.text.slice(0, 220)}…` : s.text}</p>
                </li>
              ))}
              <li className="text-xs text-surface-400">Split these into two sentences or tighten them — long sentences often hide grammar errors.</li>
            </ul>
          )}
        </Panel>
      </div>

      <AdBanner placement="display" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

function Stat({ label, value, hint, warn }: { label: string; value: React.ReactNode; hint?: string; warn?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${warn ? "border-amber-200 bg-amber-50/70" : "border-surface-200/80 bg-surface-50/60"}`}>
      <div className="text-[11px] font-bold uppercase tracking-wide text-surface-500">{label}</div>
      <div className={`mt-1 font-display text-2xl font-extrabold tabular-nums ${warn ? "text-amber-700" : "text-surface-900"}`}>{value}</div>
      {hint && <div className="text-[11px] text-surface-500">{hint}</div>}
    </div>
  );
}

function Panel({ Icon, title, children }: { Icon: typeof Check; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2.5 font-display text-[15px] font-bold text-surface-900">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-200 bg-brand-50 text-brand-600">
          <Icon className="h-4 w-4" />
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Muted({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] text-surface-500">{children}</p>;
}

function AiResultPanel({
  result,
  isTask1,
}: {
  result: { data: WritingTaskFeedback; band: number; summary: string };
  isTask1: boolean;
}) {
  const criteria = Object.entries(result.data?.criteria ?? {}) as [string, Criterion][];
  return (
    <section className="card space-y-5 p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <BandRing band={result.band} size={112} label={isTask1 ? "Task 1" : "Task 2"} />
        <div>
          <div className="eyebrow text-brand-600">AI band estimate · {isTask1 ? "Task 1" : "Task 2"}</div>
          <div className="mt-1 font-display text-3xl font-extrabold tracking-tight text-surface-900">Band {result.band.toFixed(1)}</div>
          {result.summary && <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-surface-600">{result.summary}</p>}
        </div>
      </div>

      {criteria.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {criteria.map(([key, c]) => {
            const hasBand = typeof c?.band === "number";
            return (
              <div key={key} className="rounded-2xl border border-surface-200 bg-white p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-surface-900">{CRITERIA_LABELS[key] ?? key}</div>
                  <span className={`text-xl font-bold tabular-nums ${hasBand ? bandTone(c.band).text : "text-surface-400"}`}>
                    {hasBand ? c.band.toFixed(1) : "–"}
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-surface-100">
                  {hasBand && <div className="h-full rounded-full" style={{ width: `${(c.band / 9) * 100}%`, background: bandTone(c.band).stroke }} />}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-surface-600">{c?.comment ?? "—"}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-emerald-800">
            <ThumbsUp className="h-4 w-4" /> What you did well
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-emerald-950/80">
            {(result.data?.strengths ?? []).map((s, i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800">
            <TrendingUp className="h-4 w-4" /> How to improve
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-amber-950/80">
            {(result.data?.improvements ?? []).map((s, i) => (
              <li key={i} className="flex gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {(result.data?.correctedExamples ?? []).length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-surface-900">Corrected examples</h3>
          {result.data.correctedExamples.map((ex, i) => (
            <div key={i} className="rounded-2xl border border-surface-200 bg-surface-50/60 p-4 text-sm">
              <p className="text-rose-700 line-through decoration-rose-300">{ex.original}</p>
              <p className="mt-1.5 font-medium text-emerald-800">{ex.improved}</p>
              <p className="mt-1.5 text-surface-500">{ex.why}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-surface-400">
        AI estimates are a practice guide, not an official IELTS result. Want the full exam experience?{" "}
        <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
          Take a free timed Writing test
        </Link>
        .
      </p>
    </section>
  );
}
