"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Layers, RotateCcw, RotateCw, Trophy, Volume2 } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { PageHeader, ProgressBar } from "@/components/ui";
import { IELTS_VOCABULARY, type IELTSVocabularyItem } from "@/lib/ielts-content-data";
import { speak, ttsSupported } from "@/lib/speech";
import { fetchMasteredVocabulary, saveMasteredVocabulary } from "@/lib/user-data-service";

/** Leitner boxes 1–5. Box 5 = mastered (leaves the session queue). */
const MAX_BOX = 5;
/** How many reviews later a card in each box comes back. */
const INTERVAL: Record<number, number> = { 1: 2, 2: 4, 3: 7, 4: 11 };

type Rating = "again" | "hard" | "good" | "easy";
const RATINGS: { id: Rating; label: string; hint: string; cls: string }[] = [
  { id: "again", label: "Again", hint: "Back to box 1", cls: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100" },
  { id: "hard", label: "Hard", hint: "Stay in box", cls: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100" },
  { id: "good", label: "Good", hint: "Up one box", cls: "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100" },
  { id: "easy", label: "Easy", hint: "Up two boxes", cls: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" },
];

interface CardState {
  box: number;
  due: number;
}

const TOPICS = ["All", ...Array.from(new Set(IELTS_VOCABULARY.map((v) => v.topic)))];
const LEVELS = ["All", "B2", "C1", "C2"];

export default function FlashcardsClient() {
  const { user } = useAuth();
  const [topic, setTopic] = useState("All");
  const [cefr, setCefr] = useState("All");
  const [states, setStates] = useState<Record<string, CardState>>({});
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const [mastered, setMastered] = useState<string[]>([]);
  const [syncNote, setSyncNote] = useState<string | null>(null);
  const masteredRef = useRef<string[]>([]);

  useEffect(() => setCanSpeak(ttsSupported()), []);

  // Signed-in users: load their mastered list from the backend. Guests: in memory only.
  useEffect(() => {
    let active = true;
    if (!user) {
      masteredRef.current = [];
      setMastered([]);
      return;
    }
    fetchMasteredVocabulary()
      .then((ids) => {
        if (!active) return;
        masteredRef.current = ids;
        setMastered(ids);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user]);

  const deck = useMemo(
    () => IELTS_VOCABULARY.filter((v) => (topic === "All" || v.topic === topic) && (cefr === "All" || v.cefr === cefr)),
    [topic, cefr],
  );

  const stateOf = (id: string): CardState => states[id] ?? { box: 1, due: 0 };
  const queue = deck.filter((v) => stateOf(v.id).box < MAX_BOX);
  // Next card: the one that is most overdue; ties keep deck order.
  const card: IELTSVocabularyItem | undefined = queue.reduce<IELTSVocabularyItem | undefined>(
    (best, v) => (!best || stateOf(v.id).due < stateOf(best.id).due ? v : best),
    undefined,
  );

  const progress = deck.length ? (deck.reduce((s, v) => s + (stateOf(v.id).box - 1), 0) / (deck.length * (MAX_BOX - 1))) * 100 : 0;
  const boxCounts = [1, 2, 3, 4, 5].map((b) => deck.filter((v) => stateOf(v.id).box === b).length);

  const persistMastered = (id: string) => {
    if (!user || masteredRef.current.includes(id)) return;
    const nextIds = [...masteredRef.current, id];
    masteredRef.current = nextIds;
    setMastered(nextIds);
    saveMasteredVocabulary(nextIds)
      .then(() => setSyncNote("Saved to your mastered words."))
      .catch(() => setSyncNote("Could not save to your account. Your session progress is kept."));
  };

  const rate = (r: Rating) => {
    if (!card) return;
    const cur = stateOf(card.id);
    const box = r === "again" ? 1 : r === "hard" ? cur.box : Math.min(MAX_BOX, cur.box + (r === "good" ? 1 : 2));
    const nextStep = step + 1;
    // "Hard" comes back sooner than the box interval.
    const gap = box >= MAX_BOX ? 0 : r === "hard" ? Math.max(2, Math.floor(INTERVAL[box] / 2)) : INTERVAL[box];
    setStates((s) => ({ ...s, [card.id]: { box, due: nextStep + gap } }));
    setStep(nextStep);
    setFlipped(false);
    if (box === MAX_BOX) persistMastered(card.id);
  };

  const resetSession = () => {
    setStates({});
    setStep(0);
    setFlipped(false);
  };

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
      active ? "border-brand-300 bg-brand-50 text-brand-700" : "border-surface-200 text-surface-600 hover:border-surface-300"
    }`;

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Spaced repetition"
        title="IELTS vocabulary flashcards"
        description="Learn band 7+ vocabulary with a five-box Leitner system. Flip each card, rate how well you knew it, and the words you find hard come back sooner."
        actions={
          <>
            <span className="badge-brand">
              <Layers className="h-3.5 w-3.5" /> {IELTS_VOCABULARY.length} words
            </span>
            {user ? (
              <span className="badge-success">{mastered.length} mastered in your account</span>
            ) : (
              <span className="badge-neutral">
                <Link href="/login?next=/flashcards" className="hover:underline">
                  Sign in to save mastered words
                </Link>
              </span>
            )}
          </>
        }
      />

      <div className="card space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Topic</span>
          {TOPICS.map((t) => (
            <button key={t} type="button" className={chip(topic === t)} onClick={() => { setTopic(t); setFlipped(false); }}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">CEFR</span>
          {LEVELS.map((l) => (
            <button key={l} type="button" className={chip(cefr === l)} onClick={() => { setCefr(l); setFlipped(false); }}>
              {l}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-surface-500">
            <span>Session progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} />
          <div className="grid grid-cols-5 gap-1.5 text-center">
            {boxCounts.map((n, i) => (
              <div key={i} className={`rounded-lg border px-1 py-1.5 ${i === 4 ? "border-emerald-200 bg-emerald-50" : "border-surface-200 bg-surface-50"}`}>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-surface-400">Box {i + 1}</p>
                <p className="text-sm font-bold text-surface-800">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="card p-8 text-center text-sm text-surface-500">No words match these filters.</div>
      ) : !card ? (
        <div className="card mx-auto max-w-xl space-y-4 p-8 text-center animate-fade-up">
          <Trophy className="mx-auto h-10 w-10 text-emerald-500" />
          <p className="text-lg font-bold text-surface-900">All {deck.length} cards reached box 5</p>
          <p className="text-sm text-surface-600">
            {user ? "They have been added to your mastered words." : "Sign in to keep a record of mastered words across sessions."}
          </p>
          <button type="button" className="btn-primary mx-auto" onClick={resetSession}>
            <RotateCcw className="h-4 w-4" /> Start again
          </button>
        </div>
      ) : (
        <div className="mx-auto max-w-2xl space-y-4">
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="card block min-h-[300px] w-full p-6 text-left transition hover:border-surface-300 sm:p-8"
            aria-label={flipped ? "Show word" : "Show definition"}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-neutral">{card.topic}</span>
              <span className="badge-brand">{card.cefr}</span>
              <span className="badge-neutral">Box {stateOf(card.id).box}</span>
              {mastered.includes(card.id) && (
                <span className="badge-success">
                  <CheckCircle2 className="h-3 w-3" /> Mastered before
                </span>
              )}
            </div>
            {!flipped ? (
              <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                <p className="font-display text-4xl font-extrabold tracking-tight text-surface-900">{card.word}</p>
                <p className="mt-2 text-sm text-surface-500">
                  {card.phonetic} · {card.partOfSpeech}
                </p>
                <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-surface-400">
                  <RotateCw className="h-3.5 w-3.5" /> Tap to reveal the meaning
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3 text-[14px] leading-relaxed text-surface-700 animate-fade-in">
                <p className="text-xl font-bold text-surface-900">{card.word}</p>
                <p>{card.definition}</p>
                {card.collocations.length > 0 && (
                  <div>
                    <p className="eyebrow mb-1">Collocations</p>
                    <div className="flex flex-wrap gap-1.5">
                      {card.collocations.map((c) => (
                        <span key={c} className="rounded-md bg-surface-100 px-2 py-0.5 text-[13px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="italic text-surface-600">&ldquo;{card.sampleSentence}&rdquo;</p>
                {card.synonyms.length > 0 && (
                  <p className="text-[13px] text-surface-500">Synonyms: {card.synonyms.join(", ")}</p>
                )}
              </div>
            )}
          </button>

          <div className="flex flex-wrap items-center justify-between gap-2">
            {canSpeak && (
              <button type="button" className="btn-ghost btn-sm" onClick={() => speak(card.word)}>
                <Volume2 className="h-4 w-4" /> Pronounce
              </button>
            )}
            <span className="ml-auto text-xs text-surface-400">{queue.length} cards left to master</span>
          </div>

          {flipped ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {RATINGS.map((r) => (
                <button key={r.id} type="button" onClick={() => rate(r.id)} className={`rounded-xl border px-3 py-2.5 text-center transition ${r.cls}`}>
                  <span className="block text-sm font-bold">{r.label}</span>
                  <span className="block text-[11px] opacity-80">{r.hint}</span>
                </button>
              ))}
            </div>
          ) : (
            <button type="button" className="btn-primary w-full" onClick={() => setFlipped(true)}>
              Show answer
            </button>
          )}
          {syncNote && <p className="text-center text-xs text-surface-500">{syncNote}</p>}
        </div>
      )}
    </div>
  );
}
