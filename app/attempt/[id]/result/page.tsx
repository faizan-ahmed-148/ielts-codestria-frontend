"use client";

import { AlertTriangle, ArrowLeft, Brain, Calculator, Check, ChevronRight, Eye, EyeOff, KeyRound, Loader2, Lock, Printer, RotateCcw, Sparkles, ThumbsUp, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageSpinner } from "@/components/AuthProvider";
import { ChartView } from "@/components/ChartView";
import { Logo } from "@/components/Logo";
import { countQuestions, QuestionGroups } from "@/components/Questions";
import { type SpeakingAnswer, speakingItems } from "@/components/runners/SpeakingRunner";
import { BandRing, bandTone, ErrorBox, MODULE_INFO, MODULE_ORDER, ModuleIcon } from "@/components/ui";
import {
  api,
  type Attempt,
  type Criterion,
  type QuestionResult,
  type SpeakingFeedback,
  type TestOverview,
  type WritingFeedback,
} from "@/lib/api";
import { getAttemptDetails, fetchTestOverview } from "@/lib/test-runner-service";
import { getCEFRLevel } from "@/lib/cambridge-library";
import type { ListeningContent, ReadingContent, SpeakingContent, WritingContent } from "@/lib/content.types";

export default function ResultPage() {
  return <ResultView />;
}

function ResultView() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [overview, setOverview] = useState<TestOverview | null>(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const load = async () => {
      try {
        const a = await getAttemptDetails(id);
        if (a.status === "IN_PROGRESS") return router.replace(`/attempt/${id}`);
        setAttempt(a);
        if (a.status === "SCORING") timer = setTimeout(load, 3000);
        else setOverview(await fetchTestOverview(a.test.id));
      } catch (e) {
        setError((e as Error).message);
      }
    };
    load();
    return () => clearTimeout(timer);
  }, [id, router, reloadKey]);

  async function retry() {
    setError("");
    try {
      await api(`/attempts/${id}/retry-scoring`, { method: "POST" });
      setReloadKey((k) => k + 1);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  if (error && !attempt) return <div className="mx-auto max-w-3xl p-6"><ErrorBox message={error} /></div>;
  if (!attempt) return <PageSpinner />;
  const info = MODULE_INFO[attempt.module];

  return (
    <div className="page-container space-y-7 py-8 sm:py-10">
      <Link href={`/tests/${attempt.test.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 hover:text-surface-900">
        <ArrowLeft className="h-4 w-4" /> Back to {attempt.test.title}
      </Link>

      {attempt.status === "SCORING" && (
        <div className="card flex flex-col items-center gap-4 px-6 py-16 text-center">
          <div className="relative">
            <ModuleIcon module={attempt.module} size="lg" />
            <Loader2 className="absolute -right-2 -bottom-2 h-6 w-6 animate-spin rounded-full bg-white text-brand-600" />
          </div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-surface-900">The AI examiner is scoring your {info.label}</h1>
          <p className="max-w-md text-sm text-surface-500">This usually takes under a minute. You can leave this page; your result is saved and will be waiting for you.</p>
        </div>
      )}

      {attempt.status === "FAILED" && (
        <div className="card space-y-4 p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><AlertTriangle className="h-5 w-5" /></span>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight text-surface-900">We couldn't score this {info.label} test</h1>
              <p className="text-sm text-surface-500">Your answers are saved. No band was produced — Writing and Speaking bands come only from the AI provider you connect.</p>
            </div>
          </div>
          <ErrorBox message={attempt.error ?? "Unknown error"} />
          {error && <ErrorBox message={error} />}
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/profile#ai" className="btn-primary inline-flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Configure AI key
            </Link>
            {!id.startsWith("local-att-") && (
              <button onClick={retry} className="btn-secondary inline-flex items-center gap-2">
                <RotateCcw className="h-4 w-4" /> Retry AI scoring
              </button>
            )}
          </div>
          <p className="text-xs text-surface-500">
            Add your OpenAI, Groq or Anthropic key under <strong>Profile → AI Scoring</strong>, then submit the test again.
            Reading and Listening never need a key — they are marked from your correct answers.
          </p>
        </div>
      )}

      {attempt.status === "COMPLETED" && attempt.result && (
        <>
          <section className="card overflow-hidden">
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
              <BandRing band={attempt.result.band} size={132} label={info.label} />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ModuleIcon module={attempt.module} size="sm" />
                    <span className="eyebrow">{info.label} result</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2.5">
                    <h1 className="font-display text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">{bandHeadline(attempt.result.band)}</h1>
                    <span className="rounded-full bg-brand-50 px-3 py-1 font-mono text-xs font-bold text-brand-700 ring-1 ring-brand-200">
                      CEFR {getCEFRLevel(attempt.result.band).level} ({getCEFRLevel(attempt.result.band).description})
                    </span>
                  </div>
                  <p className="mt-1 text-surface-500">
                    {attempt.test.title}
                    {attempt.result.rawScore !== null && <> · <strong className="text-surface-700">{attempt.result.rawScore}/{attempt.result.totalQuestions}</strong> correct</>}
                    {" · "}{new Date(attempt.submittedAt!).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="btn-secondary text-xs px-3 py-2 inline-flex items-center gap-1.5"
                    title="Print or Save PDF report"
                  >
                    <Printer className="h-3.5 w-3.5 text-surface-500" />
                    <span>Print Report</span>
                  </button>
                  <Link
                    href="/calculator"
                    className="btn-secondary text-xs px-3 py-2 inline-flex items-center gap-1.5"
                  >
                    <Calculator className="h-3.5 w-3.5 text-brand-600" />
                    <span>Calculator</span>
                  </Link>
                </div>
              </div>
            </div>
            {overview && (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-surface-100 bg-surface-50/70 px-6 py-4 sm:px-8">
                {MODULE_ORDER.map((m) => (
                  <div key={m} className="flex items-center gap-2 text-sm">
                    <span className="text-surface-500">{MODULE_INFO[m].label}</span>
                    {overview.modules[m].band !== null
                      ? <span className={`font-bold tabular-nums ${bandTone(overview.modules[m].band!).text}`}>{overview.modules[m].band!.toFixed(1)}</span>
                      : <span className="text-surface-300">–</span>}
                  </div>
                ))}
                <div className="ml-auto flex items-center gap-2 text-sm">
                  {overview.overallBand !== null ? (
                    <><Trophy className="h-4 w-4 text-amber-500" /> <span className="text-surface-500">Overall</span> <span className="text-lg font-bold">{overview.overallBand.toFixed(1)}</span></>
                  ) : (
                    <Link href={`/tests/${attempt.test.id}`} className="flex items-center gap-1.5 font-medium text-surface-600 hover:text-brand-700">
                      <Lock className="h-4 w-4" /> Overall band unlocks after {overview.remaining.map((m) => MODULE_INFO[m].label).join(", ")} <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Official Test Report Form (TRF) Simulation */}
          <section className="card overflow-hidden border border-surface-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-surface-200 gap-3">
              <div className="flex items-center gap-3">
                <Logo size="sm" showBadge={false} showSubtitle={false} />
                <div className="border-l border-surface-200 pl-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-surface-400 block">
                    Official Simulation Report
                  </span>
                  <h2 className="font-display text-base font-extrabold tracking-tight text-surface-900">
                    Test Report Form (TRF) Summary
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-surface-100 px-2.5 py-1 font-mono text-xs font-bold text-surface-700">
                  {attempt.test.type} TRACK
                </span>
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                  CEFR {getCEFRLevel(attempt.result.band).level}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="rounded-2xl border border-surface-100 bg-surface-50/70 p-3.5">
                <div className="text-[11px] font-bold uppercase text-surface-500">Listening</div>
                <div className="mt-1 font-mono text-xl font-black text-surface-900">
                  {overview?.modules.LISTENING.band !== null && overview?.modules.LISTENING.band !== undefined
                    ? overview.modules.LISTENING.band.toFixed(1)
                    : (attempt.module === "LISTENING" && attempt.result.band !== null && attempt.result.band !== undefined ? attempt.result.band.toFixed(1) : "–")}
                </div>
              </div>

              <div className="rounded-2xl border border-surface-100 bg-surface-50/70 p-3.5">
                <div className="text-[11px] font-bold uppercase text-surface-500">Reading</div>
                <div className="mt-1 font-mono text-xl font-black text-surface-900">
                  {overview?.modules.READING.band !== null && overview?.modules.READING.band !== undefined
                    ? overview.modules.READING.band.toFixed(1)
                    : (attempt.module === "READING" && attempt.result.band !== null && attempt.result.band !== undefined ? attempt.result.band.toFixed(1) : "–")}
                </div>
              </div>

              <div className="rounded-2xl border border-surface-100 bg-surface-50/70 p-3.5">
                <div className="text-[11px] font-bold uppercase text-surface-500">Writing</div>
                <div className="mt-1 font-mono text-xl font-black text-surface-900">
                  {overview?.modules.WRITING.band !== null && overview?.modules.WRITING.band !== undefined
                    ? overview.modules.WRITING.band.toFixed(1)
                    : (attempt.module === "WRITING" && attempt.result.band !== null && attempt.result.band !== undefined ? attempt.result.band.toFixed(1) : "–")}
                </div>
              </div>

              <div className="rounded-2xl border border-surface-100 bg-surface-50/70 p-3.5">
                <div className="text-[11px] font-bold uppercase text-surface-500">Speaking</div>
                <div className="mt-1 font-mono text-xl font-black text-surface-900">
                  {overview?.modules.SPEAKING.band !== null && overview?.modules.SPEAKING.band !== undefined
                    ? overview.modules.SPEAKING.band.toFixed(1)
                    : (attempt.module === "SPEAKING" && attempt.result.band !== null && attempt.result.band !== undefined ? attempt.result.band.toFixed(1) : "–")}
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 rounded-2xl border border-brand-200 bg-brand-50/60 p-3.5">
                <div className="text-[11px] font-bold uppercase text-brand-700">Overall Band</div>
                <div className="mt-1 font-mono text-xl font-black text-brand-700">
                  {overview?.overallBand !== null && overview?.overallBand !== undefined
                    ? overview.overallBand.toFixed(1)
                    : "–"}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-surface-400 pt-3 border-t border-surface-100">
              <span className="font-mono">Reference: {attempt.id.slice(0, 16).toUpperCase()}</span>
              <span>Scoring Engine: Codestria IELTS v2.4 (ielts.codestria.com)</span>
            </div>
          </section>

          {(attempt.module === "READING" || attempt.module === "LISTENING") && <ObjectiveReview attempt={attempt} />}
          {attempt.module === "WRITING" && <WritingReview attempt={attempt} />}
          {attempt.module === "SPEAKING" && <SpeakingReview attempt={attempt} />}
        </>
      )}
    </div>
  );
}

function bandHeadline(band: number | null | undefined) {
  if (band === null || band === undefined) return "AI Key Required — Band Pending";
  if (band >= 8) return "Outstanding, expert level";
  if (band >= 7) return "Very good, a strong result";
  if (band >= 6) return "Competent, close to the next level";
  if (band >= 5) return "Modest, keep practising";
  return "Keep going, every attempt helps";
}

function ObjectiveReview({ attempt }: { attempt: Attempt }) {
  const content = attempt.content as ReadingContent | ListeningContent;
  const isReading = "passages" in content;
  const sections = isReading ? content.passages : content.parts;
  const results = (attempt.result!.feedback as { results: QuestionResult[] }).results;
  const byId = Object.fromEntries(results.map((r) => [r.questionId, r]));
  const [active, setActive] = useState(0);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [showSource, setShowSource] = useState(true);
  const starts = sections.reduce<number[]>((acc, s, i) => [...acc, i === 0 ? 1 : acc[i - 1] + countQuestions(sections[i - 1].groups)], []);
  const section = sections[active];
  const groups = (onlyWrong
    ? section.groups.map((g) => ({ ...g, questions: g.questions.filter((q) => !byId[q.id]?.correct) }))
    : section.groups).filter((g) => g.questions.length);
  const wrong = results.filter((r) => !r.correct).length;

  return (
    <section className="card overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-surface-100 px-6 py-4">
        <div className="mr-auto">
          <h2 className="font-display text-lg font-bold text-surface-900">Answers & review</h2>
          <p className="text-sm text-surface-500">{results.length - wrong} correct · {wrong} to review. Use <span className="font-medium text-violet-700">Explain</span> on any mistake for an AI explanation.</p>
        </div>
        <div className="inline-flex rounded-xl border border-surface-200 bg-surface-50 p-1 text-sm">
          <button onClick={() => setOnlyWrong(false)} className={`rounded-lg px-3 py-1.5 font-medium ${!onlyWrong ? "bg-white shadow-sm" : "text-surface-500"}`}>All</button>
          <button onClick={() => setOnlyWrong(true)} className={`rounded-lg px-3 py-1.5 font-medium ${onlyWrong ? "bg-white shadow-sm" : "text-surface-500"}`}>Mistakes only</button>
        </div>
        <button onClick={() => setShowSource((s) => !s)} className="btn-secondary">
          {showSource ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} {isReading ? "Passage" : "Transcript"}
        </button>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-surface-100 px-4 scroll-thin">
        {sections.map((s, i) => {
          const qs = s.groups.flatMap((g) => g.questions);
          const right = qs.filter((q) => byId[q.id]?.correct).length;
          return (
            <button key={i} onClick={() => setActive(i)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap ${i === active ? "border-brand-600 text-brand-700" : "border-transparent text-surface-500 hover:text-surface-800"}`}>
              {isReading ? "Passage" : "Part"} {i + 1}
              <span className={`rounded-full px-1.5 py-0.5 text-[11px] ${right === qs.length ? "bg-emerald-100 text-emerald-700" : "bg-surface-100 text-surface-500"}`}>{right}/{qs.length}</span>
            </button>
          );
        })}
      </div>
      <div className={`grid ${showSource ? "lg:grid-cols-2" : ""}`}>
        {showSource && (
          <div className="scroll-thin max-h-[78vh] overflow-y-auto border-surface-100 bg-surface-50/60 px-6 py-6 text-[15px] leading-7 text-surface-700 lg:border-r">
            {isReading ? (
              <>
                <h3 className="text-xl font-bold text-surface-900">{(section as ReadingContent["passages"][number]).title}</h3>
                {(section as ReadingContent["passages"][number]).body.split(/\n\s*\n/).map((p, i) => <p key={i} className="mt-4">{p}</p>)}
              </>
            ) : (
              <div className="space-y-3">
                {(section as ListeningContent["parts"][number]).transcript.map((t, i) => (
                  <p key={i}><span className="mr-1 font-semibold text-surface-900">{t.speaker}:</span>{t.text}</p>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="scroll-thin max-h-[78vh] overflow-y-auto p-6">
          {groups.length ? (
            <QuestionGroups
              groups={groups}
              startNumber={starts[active]}
              answers={Object.fromEntries(results.map((r) => [r.questionId, r.yourAnswer]))}
              results={byId}
              explanations={(attempt as any).explanations}
              renderExtra={(q, r) => (r && !r.correct ? <Explain attemptId={attempt.id} questionId={q.id} /> : null)}
            />
          ) : (
            <div className="flex flex-col items-center py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Check className="h-6 w-6" /></span>
              <p className="mt-3 font-semibold">No mistakes in this section</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Explain({ attemptId, questionId }: { attemptId: string; questionId: string }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const ask = async () => {
    setBusy(true);
    setError("");
    try {
      const { explanation } = await api<{ explanation: string }>(`/attempts/${attemptId}/explain`, { method: "POST", body: { questionId } });
      setText(explanation);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mt-3 ml-10">
      {text ? (
        <div className="rounded-xl border border-violet-200 bg-violet-50 p-4 text-sm leading-relaxed text-violet-950">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-violet-700 uppercase"><Sparkles className="h-3.5 w-3.5" /> AI tutor</div>
          <p className="whitespace-pre-line">{text}</p>
        </div>
      ) : (
        <button onClick={ask} disabled={busy} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:opacity-60">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {busy ? "Explaining…" : "Explain this answer"}
        </button>
      )}
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

const CRITERIA_LABELS: Record<string, string> = {
  taskAchievement: "Task Achievement",
  taskResponse: "Task Response",
  coherenceCohesion: "Coherence & Cohesion",
  coherenceAndCohesion: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range & Accuracy",
  grammaticalRangeAndAccuracy: "Grammatical Range & Accuracy",
  fluencyCoherence: "Fluency & Coherence",
  fluencyAndCoherence: "Fluency & Coherence",
  pronunciation: "Pronunciation",
};

function CriteriaGrid({ criteria }: { criteria: Record<string, Criterion> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(criteria).map(([key, c]) => {
        const hasBand = typeof c?.band === "number";
        return (
          <div key={key} className="rounded-2xl border border-surface-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold">{CRITERIA_LABELS[key] ?? key}</div>
              <span className={`text-xl font-bold tabular-nums ${hasBand ? bandTone(c.band).text : "text-surface-400"}`}>
                {hasBand ? c.band.toFixed(1) : "–"}
              </span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-surface-100">
              {hasBand && (
                <div className="h-full rounded-full" style={{ width: `${(c.band / 9) * 100}%`, background: bandTone(c.band).stroke }} />
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-surface-600">{c.comment}</p>
          </div>
        );
      })}
    </div>
  );
}

function Lists({ strengths, improvements }: { strengths: string[]; improvements: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
        <h4 className="flex items-center gap-2 font-semibold text-emerald-800"><ThumbsUp className="h-4 w-4" /> What you did well</h4>
        <ul className="mt-3 space-y-2 text-sm text-emerald-950/80">{strengths.map((s, i) => <li key={i} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />{s}</li>)}</ul>
      </div>
      <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5">
        <h4 className="flex items-center gap-2 font-semibold text-amber-800"><TrendingUp className="h-4 w-4" /> How to improve</h4>
        <ul className="mt-3 space-y-2 text-sm text-amber-950/80">{improvements.map((s, i) => <li key={i} className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />{s}</li>)}</ul>
      </div>
    </div>
  );
}

function Summary({ text }: { text: string }) {
  return (
    <section className="card flex gap-4 p-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Brain className="h-5 w-5" /></span>
      <div>
        <h2 className="font-semibold">Examiner's summary</h2>
        <p className="mt-1 leading-relaxed text-surface-600">{text}</p>
      </div>
    </section>
  );
}

function WritingReview({ attempt }: { attempt: Attempt }) {
  const fb = attempt.result!.feedback as WritingFeedback;
  const content = attempt.content as WritingContent;
  const answers = attempt.answers as { task1?: string; task2?: string };
  const [tab, setTab] = useState<"task1" | "task2">("task1");
  const t = tab;
  return (
    <div className="space-y-6">
      <Summary text={fb.summary} />
      <section className="card overflow-hidden">
        <div className="flex gap-1 border-b border-surface-100 px-4">
          {(["task1", "task2"] as const).map((k) => {
            const b = k === "task1" ? fb.task1Band : fb.task2Band;
            const has = typeof b === "number";
            return (
              <button key={k} onClick={() => setTab(k)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold ${tab === k ? "border-brand-600 text-brand-700" : "border-transparent text-surface-500"}`}>
                {k === "task1" ? "Task 1" : "Task 2"}
                <span className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${has ? bandTone(b).soft : "bg-surface-100 text-surface-500"}`}>
                  {has ? b.toFixed(1) : "–"}
                </span>
              </button>
            );
          })}
          <span className="ml-auto hidden self-center text-xs text-surface-400 sm:block">Task 2 counts twice as much as Task 1</span>
        </div>
        <div className="space-y-6 p-6">
          <p className="text-sm text-surface-500">{fb.words[t]} words written (minimum {content[t].minWords})</p>
          <CriteriaGrid criteria={fb[t].criteria} />
          <Lists strengths={fb[t].strengths} improvements={fb[t].improvements} />
          {fb[t].correctedExamples.length > 0 && (
            <div>
              <h4 className="font-semibold">Sentence corrections</h4>
              <ul className="mt-3 space-y-3">
                {fb[t].correctedExamples.map((c, i) => (
                  <li key={i} className="rounded-2xl border border-surface-200 p-4 text-sm">
                    <div className="text-rose-600 line-through decoration-rose-300">{c.original}</div>
                    <div className="mt-1.5 font-medium text-emerald-700">{c.improved}</div>
                    <div className="mt-1.5 text-xs text-surface-500">{c.why}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <details className="group rounded-2xl border border-surface-200 bg-surface-50/60 p-5">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold">
              <ChevronRight className="h-4 w-4 transition group-open:rotate-90" /> Question & your answer
            </summary>
            <p className="mt-4 text-sm font-medium whitespace-pre-line">{content[t].prompt}</p>
            {t === "task1" && content.task1.chart && <div className="mt-4"><ChartView chart={content.task1.chart} /></div>}
            <p className="mt-4 rounded-xl bg-white p-4 text-sm leading-7 whitespace-pre-line">{answers[t] || "(no answer)"}</p>
          </details>
        </div>
      </section>
    </div>
  );
}

function SpeakingReview({ attempt }: { attempt: Attempt }) {
  const fb = attempt.result!.feedback as SpeakingFeedback;
  const answers = attempt.answers as Record<string, SpeakingAnswer>;
  const items = speakingItems(attempt.content as SpeakingContent);
  return (
    <div className="space-y-6">
      <Summary text={fb.summary} />
      <section className="card space-y-6 p-6">
        <CriteriaGrid criteria={fb.criteria} />
        <Lists strengths={fb.strengths} improvements={fb.improvements} />
        <p className="text-xs text-surface-500">Scored from a transcript of your speech, so the Pronunciation band is an estimate.</p>
      </section>
      {fb.betterAnswers.length > 0 && (
        <section className="card p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-surface-900"><Sparkles className="h-5 w-5 text-violet-600" /> Band 8 sample answers</h2>
          <ul className="mt-4 space-y-3">
            {fb.betterAnswers.map((b, i) => (
              <li key={i} className="rounded-2xl border border-violet-100 bg-violet-50/60 p-5 text-sm">
                <div className="font-semibold text-surface-900">{b.question}</div>
                <p className="mt-2 leading-relaxed text-surface-700">{b.suggestion}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <details className="card group p-6">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold"><ChevronRight className="h-4 w-4 transition group-open:rotate-90" /> Your transcripts</summary>
        <ol className="mt-4 space-y-4 text-sm">
          {items.map((it) => (
            <li key={it.key} className="rounded-xl bg-surface-50 p-4">
              <div className="text-xs font-semibold tracking-wide text-surface-400 uppercase">Part {it.part}</div>
              <div className="mt-1 font-medium">{it.question}</div>
              <p className="mt-1.5 text-surface-600">{answers[it.key]?.transcript || "(no answer)"}</p>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
