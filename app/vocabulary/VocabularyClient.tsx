"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Filter,
  Layers,
  RotateCw,
  Search,
  Sparkles,
  Trophy,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  EmptyState,
  PageHeader,
  ProgressBar,
  StatCard,
} from "@/components/ui";
import { IELTS_VOCABULARY } from "@/lib/ielts-content-data";
import { fetchMasteredVocabulary, saveMasteredVocabulary } from "@/lib/user-data-service";

export default function VocabularyClient() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "quiz" | "directory">("flashcards");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedCefr, setSelectedCefr] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const { user } = useAuth();
  const [hydrated, setHydrated] = useState(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load mastered words from the backend (MySQL).
  useEffect(() => {
    let active = true;
    if (!user) {
      setHydrated(true);
      return;
    }
    fetchMasteredVocabulary()
      .then((ids) => active && setMasteredIds(ids))
      .catch(() => {})
      .finally(() => active && setHydrated(true));
    return () => {
      active = false;
    };
  }, [user]);

  // Persist mastered words (debounced).
  useEffect(() => {
    if (!hydrated || !user) return;
    const t = setTimeout(() => {
      saveMasteredVocabulary(masteredIds).catch(() => {});
    }, 500);
    return () => clearTimeout(t);
  }, [masteredIds, hydrated, user]);

  // Filtered Vocabulary items
  const filteredVocab = useMemo(() => {
    return IELTS_VOCABULARY.filter((item) => {
      const matchTopic = selectedTopic === "All" || item.topic === selectedTopic;
      const matchCefr = selectedCefr === "All" || item.cefr === selectedCefr;
      const matchQuery =
        !searchQuery.trim() ||
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.collocations.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.synonyms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTopic && matchCefr && matchQuery;
    });
  }, [selectedTopic, selectedCefr, searchQuery]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, selectedCefr, searchQuery]);

  const currentItem = filteredVocab[currentIndex] || filteredVocab[0];

  function toggleMastered(id: string) {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function handlePronounce(word: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-GB";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  }

  // Quiz items (up to 10 questions)
  const quizItems = useMemo(() => {
    return [...IELTS_VOCABULARY].sort(() => 0.5 - Math.random()).slice(0, 8);
  }, []);

  const currentQuizItem = quizItems[quizIndex];

  const quizOptions = useMemo(() => {
    if (!currentQuizItem) return [];
    // 1 correct definition + 3 distractor definitions
    const distractors = IELTS_VOCABULARY.filter((v) => v.id !== currentQuizItem.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((v) => v.definition);
    return [currentQuizItem.definition, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentQuizItem]);

  function handleAnswerQuiz(option: string) {
    if (selectedQuizOption !== null) return;
    setSelectedQuizOption(option);
    if (option === currentQuizItem.definition) {
      setQuizScore((prev) => prev + 1);
    }
  }

  function nextQuizQuestion() {
    setSelectedQuizOption(null);
    if (quizIndex + 1 < quizItems.length) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  }

  function restartQuiz() {
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  }

  const topics = ["All", "Environment", "Technology", "Education", "Society", "Health", "Economy"];
  const cefrLevels = ["All", "B2", "C1", "C2"];

  const masteredPct = Math.min(
    100,
    Math.round((masteredIds.length / Math.max(IELTS_VOCABULARY.length, 1)) * 100)
  );

  const TABS: { key: typeof activeTab; label: string }[] = [
    { key: "flashcards", label: "Flashcards deck" },
    { key: "quiz", label: "Knowledge quiz" },
    { key: "directory", label: "Full directory" },
  ];

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="IELTS academic word list"
        title="Band 8+ academic vocabulary lab"
        description="Master high-scoring lexical resource items curated across the most frequent IELTS exam topics, complete with native audio pronunciation, collocations, and CEFR indicators."
        actions={
          <div className="inline-flex flex-wrap rounded-xl border border-surface-200 bg-surface-100/80 p-1">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`cursor-pointer rounded-lg px-3.5 py-2 text-[13px] font-semibold transition ${
                  activeTab === key
                    ? "bg-white text-surface-900 shadow-xs ring-1 ring-surface-200"
                    : "text-surface-500 hover:text-surface-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />

      {/* Snapshot */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Words in library" value={IELTS_VOCABULARY.length} hint="Curated Band 8+ lexicon" Icon={BookOpen} />
        <StatCard
          label="Mastered"
          value={masteredIds.length}
          hint={`${masteredPct}% of the library`}
          Icon={CheckCircle2}
        />
        <StatCard label="Topic areas" value={topics.length - 1} hint="Exam-relevant themes" Icon={Layers} />
        <StatCard label="Quiz round" value={`${quizItems.length} Q`} hint="Randomised each attempt" Icon={Sparkles} />
      </div>

      {/* Filters */}
      <section className="card space-y-4 p-5 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-surface-500">
              <Filter className="h-3.5 w-3.5" /> Topic
            </span>
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                  selectedTopic === t
                    ? "bg-brand-600 text-white shadow-sm"
                    : "border border-surface-200 bg-white text-surface-600 hover:border-surface-300 hover:bg-surface-50 hover:text-surface-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="cefr-level" className="text-[13px] font-semibold text-surface-500">
              Level
            </label>
            <select
              id="cefr-level"
              value={selectedCefr}
              onChange={(e) => setSelectedCefr(e.target.value)}
              className="input w-auto py-2 text-[13px]"
            >
              {cefrLevels.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All levels" : `CEFR ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, collocations, or synonyms (e.g., 'mitigate', 'disparity', 'climate')..."
            className="input pl-10"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-surface-400 transition hover:bg-surface-100 hover:text-surface-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* TAB 1: FLASHCARDS DECK */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          {filteredVocab.length === 0 ? (
            <EmptyState
              Icon={Search}
              title="No vocabulary items match your filters"
              description="Try clearing the search field or choosing a different topic or CEFR level."
              action={
                <button
                  onClick={() => {
                    setSelectedTopic("All");
                    setSelectedCefr("All");
                    setSearchQuery("");
                  }}
                  className="btn-secondary btn-sm"
                >
                  Reset filters
                </button>
              }
            />
          ) : (
            <div className="mx-auto max-w-3xl">
              {/* Deck progress */}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[13px] font-semibold">
                <span className="text-surface-600">
                  Card {currentIndex + 1} of {filteredVocab.length}
                </span>
                <span className="badge-success">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {masteredIds.length} mastered
                </span>
              </div>

              {/* The interactive flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="group relative flex min-h-[420px] cursor-pointer select-none flex-col justify-between overflow-hidden rounded-3xl border border-surface-200/80 bg-gradient-to-b from-white to-brand-50/30 p-6 shadow-[0_1px_2px_rgba(22,34,59,0.04),0_28px_60px_-40px_rgba(22,34,59,0.4)] transition-all duration-300 hover:border-brand-200 hover:shadow-[0_2px_4px_rgba(22,34,59,0.05),0_32px_70px_-36px_rgba(67,86,232,0.4)] sm:p-8"
              >
                {/* Card top bar */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-brand">CEFR {currentItem.cefr}</span>
                    <span className="badge-neutral">{currentItem.topic}</span>
                    <span className="text-[13px] italic text-surface-400">{currentItem.partOfSpeech}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePronounce(currentItem.word);
                      }}
                      className="rounded-full p-2 text-surface-400 transition hover:bg-white hover:text-brand-600 hover:shadow-xs"
                      title="Listen to British pronunciation"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMastered(currentItem.id);
                      }}
                      className={`rounded-full p-2 transition ${
                        masteredIds.includes(currentItem.id)
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-surface-300 hover:bg-white hover:text-surface-600 hover:shadow-xs"
                      }`}
                      title={masteredIds.includes(currentItem.id) ? "Marked as mastered" : "Mark as mastered"}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Card center content */}
                <div className="my-auto py-6">
                  {!isFlipped ? (
                    // Front face
                    <div className="animate-fade-up text-center">
                      <h2 className="font-display text-4xl font-extrabold tracking-tight text-surface-900 sm:text-5xl">
                        {currentItem.word}
                      </h2>
                      <div className="mt-3 font-mono text-base text-surface-400">
                        {currentItem.phonetic}
                      </div>
                      <div className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-surface-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-surface-500 transition group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-700">
                        <RotateCw className="h-3.5 w-3.5" />
                        Click anywhere to reveal definition &amp; collocations
                      </div>
                    </div>
                  ) : (
                    // Back face
                    <div className="animate-fade-up space-y-4 text-left">
                      <div>
                        <div className="eyebrow mb-1 text-surface-500">Definition</div>
                        <p className="text-lg font-semibold leading-snug text-surface-800">
                          {currentItem.definition}
                        </p>
                      </div>

                      {/* Collocations */}
                      <div>
                        <div className="eyebrow mb-1.5 text-brand-600">Band 9 collocations</div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentItem.collocations.map((c, i) => (
                            <span key={i} className="badge-brand">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sample sentence */}
                      <div>
                        <div className="eyebrow mb-1.5 text-emerald-700">Sample academic sentence</div>
                        <p className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 text-[13px] italic leading-relaxed text-surface-700">
                          &ldquo;{currentItem.sampleSentence}&rdquo;
                        </p>
                      </div>

                      {/* Synonyms & antonyms */}
                      <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 border-t border-surface-100 pt-3 text-[13px]">
                        <div>
                          <span className="font-semibold text-surface-500">Synonyms: </span>
                          <span className="text-surface-700">{currentItem.synonyms.join(", ")}</span>
                        </div>
                        {currentItem.antonyms.length > 0 && (
                          <div>
                            <span className="font-semibold text-surface-500">Antonyms: </span>
                            <span className="text-surface-700">{currentItem.antonyms.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card bottom help */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-surface-100 pt-3 text-xs text-surface-400">
                  <span>Topic: {currentItem.topic}</span>
                  <span>{isFlipped ? "Showing back (answer)" : "Showing front (term)"}</span>
                </div>
              </div>

              {/* Navigation controls */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
                  }}
                  className="btn-secondary"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </button>

                <div className="hidden text-[13px] text-surface-400 sm:block">
                  Click the card to flip between term and definition.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex((prev) => (prev + 1 < filteredVocab.length ? prev + 1 : 0));
                  }}
                  className="btn-primary"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: KNOWLEDGE QUIZ */}
      {activeTab === "quiz" && (
        <div className="mx-auto max-w-3xl">
          {!quizFinished ? (
            <div className="card p-6 sm:p-8">
              <div className="mb-6 border-b border-surface-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="eyebrow">Question {quizIndex + 1} of {quizItems.length}</span>
                    <div className="mt-1 text-[13px] font-semibold text-surface-600">
                      Score: <span className="font-display font-bold text-brand-700">{quizScore}</span> /{" "}
                      {quizItems.length}
                    </div>
                  </div>
                  <span className="badge-brand">Topic: {currentQuizItem.topic}</span>
                </div>
                <ProgressBar value={(quizIndex / quizItems.length) * 100} className="mt-4" />
              </div>

              <div className="my-6 text-center">
                <div className="text-[13px] text-surface-500">What is the exact definition of:</div>
                <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-surface-900">
                  &ldquo;{currentQuizItem.word}&rdquo;
                </h3>
                <div className="mt-1.5 text-xs italic text-surface-400">
                  Part of speech: {currentQuizItem.partOfSpeech} · CEFR {currentQuizItem.cefr}
                </div>
              </div>

              {/* Four choices */}
              <div className="mt-8 space-y-3">
                {quizOptions.map((opt, i) => {
                  const isSelected = selectedQuizOption === opt;
                  const isCorrect = opt === currentQuizItem.definition;
                  let btnStyle =
                    "border-surface-200 bg-white text-surface-700 hover:border-brand-300 hover:bg-brand-50/40";

                  if (selectedQuizOption !== null) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold";
                    } else if (isSelected) {
                      btnStyle = "border-rose-300 bg-rose-50 text-rose-900 line-through";
                    } else {
                      btnStyle = "border-surface-100 text-surface-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedQuizOption !== null}
                      onClick={() => handleAnswerQuiz(opt)}
                      className={`flex w-full cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left text-[15px] transition ${btnStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-100 text-xs font-bold text-surface-600">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="min-w-0 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Next question */}
              {selectedQuizOption !== null && (
                <div className="mt-8 flex animate-fade-up justify-end">
                  <button onClick={nextQuizQuestion} className="btn-primary">
                    {quizIndex + 1 < quizItems.length ? "Next question" : "See final score"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card animate-fade-up p-8 text-center sm:p-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-600">
                <Trophy className="h-10 w-10" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-surface-900">
                Quiz completed
              </h2>
              <p className="mt-2 text-base leading-relaxed text-surface-600">
                You scored <strong className="font-display font-bold text-brand-700">{quizScore}</strong> out of{" "}
                <strong>{quizItems.length}</strong> (
                {Math.round((quizScore / quizItems.length) * 100)}%)
              </p>

              <div className="mx-auto mt-6 max-w-sm">
                <ProgressBar
                  value={(quizScore / Math.max(quizItems.length, 1)) * 100}
                  className="h-2.5"
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button onClick={restartQuiz} className="btn-primary">
                  Try again
                </button>
                <button onClick={() => setActiveTab("flashcards")} className="btn-secondary">
                  Review flashcards
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FULL DIRECTORY */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-surface-500">
            <span>
              Showing <strong className="font-semibold text-surface-700">{filteredVocab.length}</strong>{" "}
              vocabulary entries
            </span>
            <span>Use the speaker icon to hear any term</span>
          </div>

          {filteredVocab.length === 0 ? (
            <EmptyState
              Icon={Search}
              title="No vocabulary entries found"
              description="Try a different topic, CEFR level, or search term."
              action={
                <button
                  onClick={() => {
                    setSelectedTopic("All");
                    setSelectedCefr("All");
                    setSearchQuery("");
                  }}
                  className="btn-secondary btn-sm"
                >
                  Reset filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredVocab.map((item) => (
                <div key={item.id} className="card-hover flex flex-col justify-between p-5">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-display text-lg font-bold tracking-tight text-surface-900">
                          {item.word}
                        </div>
                        <div className="mt-0.5 font-mono text-xs text-surface-400">{item.phonetic}</div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <span className="badge-brand">{item.cefr}</span>
                        <button
                          onClick={() => handlePronounce(item.word)}
                          className="rounded-lg p-1.5 text-surface-400 transition hover:bg-brand-50 hover:text-brand-600"
                          title="Pronounce"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-sm font-medium leading-relaxed text-surface-600">
                      {item.definition}
                    </p>

                    <div className="mt-3">
                      <div className="eyebrow mb-1.5 text-surface-400">High-scoring collocations</div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.collocations.map((c, i) => (
                          <span
                            key={i}
                            className="rounded-lg border border-surface-200/70 bg-surface-100 px-2 py-0.5 text-xs text-surface-700"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-surface-100 pt-3 text-xs text-surface-400">
                    <span>Topic: {item.topic}</span>
                    <span>Synonyms: {item.synonyms.slice(0, 3).join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
