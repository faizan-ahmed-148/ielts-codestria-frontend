"use client";

import {
  BookOpen,
  Briefcase,
  Calculator,
  Calendar,
  ChevronRight,
  GraduationCap,
  Headphones,
  Mic,
  PenTool,
  Search,
  Settings,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

interface SearchItem {
  id: string;
  title: string;
  category: "Tests" | "Tools" | "Writing" | "Speaking" | "Vocabulary" | "Planning";
  description: string;
  href: string;
  icon: any;
  badge?: string;
}

const SEARCH_CATALOG: SearchItem[] = [
  // Core Tools
  {
    id: "calc",
    title: "IELTS Band Score Calculator",
    category: "Tools",
    description: "Convert raw Listening/Reading scores (0-40) and calculate overall rounded band.",
    href: "/calculator",
    icon: Calculator,
    badge: "Tool",
  },
  {
    id: "descriptors",
    title: "Band Descriptors Matrix",
    category: "Tools",
    description: "Examiner rubrics for Writing Task 1, Task 2, and Speaking across Bands 5-9.",
    href: "/band-descriptors",
    icon: BookOpen,
  },
  {
    id: "study-plan",
    title: "Target Band Study Roadmap",
    category: "Planning",
    description: "Personalized week-by-week and daily preparation checklist for your target band.",
    href: "/study-plan",
    icon: Calendar,
    badge: "New",
  },
  {
    id: "profile-settings",
    title: "Candidate Profile & Exam Settings",
    category: "Tools",
    description: "Update display name, target band, password, CD-IELTS contrast, and storage.",
    href: "/profile",
    icon: Settings,
    badge: "Account",
  },
  // Vocabulary & Writing & Speaking
  {
    id: "vocab",
    title: "Academic Vocabulary & Collocations Lab",
    category: "Vocabulary",
    description: "Master Band 8+ academic lexical resources with interactive flashcards and audio.",
    href: "/vocabulary",
    icon: Sparkles,
    badge: "Interactive",
  },
  {
    id: "model-answers",
    title: "Band 9 Model Essays & Examiner Critiques",
    category: "Writing",
    description: "Annotated Band 9.0 answers with cohesive device and grammar breakdowns.",
    href: "/model-answers",
    icon: PenTool,
    badge: "Band 9",
  },
  {
    id: "speaking-studio",
    title: "Speaking Cue Card Simulator & Voice Recorder",
    category: "Speaking",
    description: "Part 2 cue cards with 1-min prep timer, 2-min response timer, and audio recorder.",
    href: "/speaking-practice",
    icon: Mic,
    badge: "Simulator",
  },
  // Tests
  {
    id: "academic-moks",
    title: "Academic Practice Tests (Books 16-19)",
    category: "Tests",
    description: "Full Academic Listening, Reading, Writing, and Speaking test papers.",
    href: "/tests?type=ACADEMIC",
    icon: GraduationCap,
  },
  {
    id: "general-mocks",
    title: "General Training Practice Tests (Books 16-19)",
    category: "Tests",
    description: "General Training modules tailored for work and immigration visas.",
    href: "/tests?type=GENERAL",
    icon: Briefcase,
  },
  {
    id: "listening-all",
    title: "IELTS Listening Practice (Audio & Audio-Sync)",
    category: "Tests",
    description: "Sections 1 through 4 with native British, Australian, and North American accents.",
    href: "/tests?type=ACADEMIC",
    icon: Headphones,
  },
];

export function CommandPalette({
  fullWidth = false,
  placeholder = "Search...",
  className = "",
}: {
  fullWidth?: boolean;
  placeholder?: string;
  className?: string;
} = {}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Global keydown listener for Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [open]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return SEARCH_CATALOG;
    const q = query.toLowerCase();
    return SEARCH_CATALOG.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Handle arrow keys and enter
  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      const target = filteredItems[selectedIndex].href;
      setOpen(false);
      router.push(target);
    }
  }

  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      {/* Trigger Button - placed anywhere */}
      <button
        onClick={() => setOpen(true)}
        className={
          fullWidth
            ? `group flex w-full items-center justify-between rounded-xl border border-surface-200 bg-surface-50 px-3 py-2 text-[13px] text-surface-500 transition hover:border-surface-300 hover:bg-white hover:text-surface-800 cursor-pointer shadow-2xs ${className}`
            : `group flex items-center gap-2 rounded-lg border border-surface-200 bg-surface-50 px-2.5 py-1.5 text-[13px] text-surface-500 transition hover:border-surface-300 hover:bg-white hover:text-surface-800 cursor-pointer shadow-2xs ${className}`
        }
        title="Quick search (Ctrl+K or Cmd+K)"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-surface-400 transition group-hover:text-surface-700" />
          <span className={fullWidth ? "inline text-[13px] font-medium" : "hidden xl:inline"}>{placeholder}</span>
        </div>
        <kbd className="rounded border border-surface-200 bg-white px-1.5 py-0.5 font-mono text-[11px] text-surface-400">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop & Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
          <div
            className="fixed inset-0 bg-surface-950/40 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />

          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-2xl animate-fade-up">
            {/* Search Input */}
            <div className="flex items-center border-b border-surface-100 px-4 py-3.5">
              <Search className="h-5 w-5 text-surface-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search practice tests, vocab, band 9 essays, tools..."
                className="w-full bg-transparent px-3 text-[15px] text-surface-800 outline-none placeholder:text-surface-400"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="cursor-pointer rounded p-1 text-surface-400 transition hover:text-surface-700"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                <kbd className="rounded bg-surface-100 px-2 py-0.5 text-[11px] font-semibold text-surface-500">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2 scroll-thin">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-sm text-surface-400">
                  No matching IELTS resources found for "{query}".
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredItems.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition ${
                          isSelected ? "bg-brand-50 text-brand-900" : "text-surface-700 hover:bg-surface-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              isSelected ? "bg-brand-600 text-white" : "bg-surface-100 text-surface-600"
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-sm font-semibold">{item.title}</span>
                              {item.badge && (
                                <span className="rounded bg-brand-100 px-1.5 py-0.2 text-[10px] font-semibold text-brand-700">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="truncate text-xs text-surface-500">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-surface-400">
                          <span className="hidden rounded bg-surface-100 px-1.5 py-0.5 text-[10px] font-medium text-surface-500 sm:inline">
                            {item.category}
                          </span>
                          <ChevronRight className="h-4 w-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer shortcuts */}
            <div className="flex items-center justify-between border-t border-surface-100 bg-surface-50 px-4 py-2.5 text-[11px] text-surface-500">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="font-semibold">↑</kbd> <kbd className="font-semibold">↓</kbd></span>
                <span>Select: <kbd className="font-semibold">↵</kbd></span>
                <span>Close: <kbd className="font-semibold">esc</kbd></span>
              </div>
              <span className="font-medium text-brand-600">Practice Books 16-19</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
