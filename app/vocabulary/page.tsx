"use client";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Filter,
  GraduationCap,
  Layers,
  Lightbulb,
  RotateCw,
  Search,
  Sparkles,
  Trophy,
  Volume2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { IELTS_VOCABULARY, IELTSVocabularyItem } from "@/lib/ielts-content-data";

export default function VocabularyPage() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "quiz" | "directory">("flashcards");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [selectedCefr, setSelectedCefr] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load mastered words from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("ielts_mastered_vocab");
    if (saved) {
      try {
        setMasteredIds(JSON.parse(saved));
      } catch (e) {
        // ignore fallback
      }
    }
  }, []);

  // Save mastered words
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("ielts_mastered_vocab", JSON.stringify(masteredIds));
  }, [masteredIds, isClient]);

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

  return (
    <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>IELTS Academic Word List &amp; Collocations</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-500">
              by Codestria
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Band 8+ Academic Vocabulary Lab
          </h1>
          <p className="mt-2 text-base text-slate-600 max-w-2xl">
            Master high-scoring lexical resource items curated across the most frequent Cambridge exam topics, complete with native audio pronunciation, collocations, and CEFR indicators.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === "flashcards"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Flashcards Deck
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === "quiz"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Knowledge Quiz
          </button>
          <button
            onClick={() => setActiveTab("directory")}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
              activeTab === "directory"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Full Directory
          </button>
        </div>
      </div>

      {/* Topic Filter Pills & Search */}
      <div className="mb-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Topic:
            </span>
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  selectedTopic === t
                    ? "bg-brand-600 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* CEFR Level & Search */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCefr}
              onChange={(e) => setSelectedCefr(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none"
            >
              {cefrLevels.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Levels" : `CEFR ${c}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words, collocations, or synonyms (e.g., 'mitigate', 'disparity', 'climate')..."
            className="input pl-10 text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: FLASHCARDS DECK */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          {filteredVocab.length === 0 ? (
            <div className="card p-12 text-center text-sm text-slate-500">
              No vocabulary items match your active filters.
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              {/* Deck Progress Bar */}
              <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>
                  Card {currentIndex + 1} of {filteredVocab.length}
                </span>
                <span className="text-emerald-600 font-bold">
                  {masteredIds.length} Mastered
                </span>
              </div>

              {/* The Interactive Flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="group relative min-h-[380px] cursor-pointer rounded-3xl border border-slate-200/90 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-brand-200 select-none flex flex-col justify-between"
              >
                {/* Top Bar of Card */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-50 border border-brand-100 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">
                      CEFR {currentItem.cefr}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                      {currentItem.topic}
                    </span>
                    <span className="text-xs text-slate-400 italic">
                      {currentItem.partOfSpeech}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePronounce(currentItem.word);
                      }}
                      className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 transition"
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
                          : "text-slate-300 hover:bg-slate-100 hover:text-slate-500"
                      }`}
                      title={masteredIds.includes(currentItem.id) ? "Marked as Mastered" : "Mark as Mastered"}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Card Center Content */}
                <div className="my-auto py-6">
                  {!isFlipped ? (
                    // Front Face
                    <div className="text-center animate-fade-up">
                      <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        {currentItem.word}
                      </h2>
                      <div className="mt-2 text-base text-slate-400 font-mono">
                        {currentItem.phonetic}
                      </div>
                      <div className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-700 group-hover:border-brand-200 transition">
                        <RotateCw className="h-3.5 w-3.5" />
                        Click anywhere to reveal definition &amp; collocations
                      </div>
                    </div>
                  ) : (
                    // Back Face
                    <div className="space-y-4 animate-fade-up text-left">
                      <div>
                        <div className="eyebrow text-slate-400 mb-1">Definition</div>
                        <p className="text-lg font-semibold text-slate-800 leading-snug">
                          {currentItem.definition}
                        </p>
                      </div>

                      {/* Collocations */}
                      <div>
                        <div className="eyebrow text-brand-600 mb-1">Band 9 Collocations</div>
                        <div className="flex flex-wrap gap-1.5">
                          {currentItem.collocations.map((c, i) => (
                            <span
                              key={i}
                              className="rounded-lg bg-brand-50 border border-brand-100 px-2.5 py-1 text-xs font-medium text-brand-800"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Sample Sentence */}
                      <div>
                        <div className="eyebrow text-emerald-600 mb-1">Sample Academic Sentence</div>
                        <p className="text-xs italic text-slate-600 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                          "{currentItem.sampleSentence}"
                        </p>
                      </div>

                      {/* Synonyms & Antonyms */}
                      <div className="flex flex-wrap justify-between gap-2 text-xs pt-1 border-t border-slate-100">
                        <div>
                          <span className="font-semibold text-slate-500">Synonyms: </span>
                          <span className="text-slate-700">{currentItem.synonyms.join(", ")}</span>
                        </div>
                        {currentItem.antonyms.length > 0 && (
                          <div>
                            <span className="font-semibold text-slate-500">Antonyms: </span>
                            <span className="text-slate-700">{currentItem.antonyms.join(", ")}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Help */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                  <span>Topic: {currentItem.topic}</span>
                  <span>{isFlipped ? "Showing Back (Answer)" : "Showing Front (Term)"}</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredVocab.length - 1));
                  }}
                  className="btn-secondary px-5 py-2.5 text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </button>

                <div className="text-xs text-slate-400">
                  Use arrow keys or buttons to navigate
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentIndex((prev) => (prev + 1 < filteredVocab.length ? prev + 1 : 0));
                  }}
                  className="btn-primary px-5 py-2.5 text-xs flex items-center gap-1.5"
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
        <div className="mx-auto max-w-2xl">
          {!quizFinished ? (
            <div className="card p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Question {quizIndex + 1} of {quizItems.length}
                  </span>
                  <div className="text-xs font-bold text-brand-600 mt-0.5">
                    Score: {quizScore} / {quizItems.length}
                  </div>
                </div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-100">
                  Topic: {currentQuizItem.topic}
                </span>
              </div>

              <div className="text-center my-6">
                <div className="text-xs text-slate-400 mb-1">What is the exact definition of:</div>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  "{currentQuizItem.word}"
                </h3>
                <div className="text-xs text-slate-400 mt-1 italic">
                  Part of Speech: {currentQuizItem.partOfSpeech} · CEFR {currentQuizItem.cefr}
                </div>
              </div>

              {/* 4 Choices */}
              <div className="space-y-3 mt-8">
                {quizOptions.map((opt, i) => {
                  const isSelected = selectedQuizOption === opt;
                  const isCorrect = opt === currentQuizItem.definition;
                  let btnStyle = "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50";

                  if (selectedQuizOption !== null) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                    } else if (isSelected) {
                      btnStyle = "border-rose-500 bg-rose-50 text-rose-900 line-through";
                    } else {
                      btnStyle = "border-slate-100 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={selectedQuizOption !== null}
                      onClick={() => handleAnswerQuiz(opt)}
                      className={`w-full rounded-2xl border p-4 text-left text-sm transition flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="min-w-0 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Next Question Button */}
              {selectedQuizOption !== null && (
                <div className="mt-8 flex justify-end animate-fade-up">
                  <button
                    onClick={nextQuizQuestion}
                    className="btn-primary px-6 py-2.5 text-xs flex items-center gap-1.5"
                  >
                    {quizIndex + 1 < quizItems.length ? "Next Question" : "See Final Score"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-10 text-center shadow-sm animate-fade-up">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 border border-brand-200">
                <Trophy className="h-10 w-10" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-slate-900">Quiz Completed!</h2>
              <p className="mt-2 text-base text-slate-600">
                You scored <strong className="text-brand-600">{quizScore}</strong> out of{" "}
                <strong>{quizItems.length}</strong> (
                {Math.round((quizScore / quizItems.length) * 100)}%)
              </p>

              <div className="mt-8 flex justify-center gap-3">
                <button onClick={restartQuiz} className="btn-primary text-xs">
                  Try Again
                </button>
                <button
                  onClick={() => setActiveTab("flashcards")}
                  className="btn-secondary text-xs"
                >
                  Review Flashcards
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: FULL DIRECTORY */}
      {activeTab === "directory" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Showing {filteredVocab.length} vocabulary entries</span>
            <span>Click any term to copy or pronounce</span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                className="card p-5 hover:border-brand-200 transition shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">{item.word}</span>
                      <span className="text-xs text-slate-400 font-mono">{item.phonetic}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                        {item.cefr}
                      </span>
                      <button
                        onClick={() => handlePronounce(item.word)}
                        className="p-1 text-slate-400 hover:text-brand-600"
                        title="Pronounce"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                    {item.definition}
                  </p>

                  <div className="mt-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      High-Scoring Collocations:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.collocations.map((c, i) => (
                        <span
                          key={i}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Topic: {item.topic}</span>
                  <span>Synonyms: {item.synonyms.slice(0, 3).join(", ")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
