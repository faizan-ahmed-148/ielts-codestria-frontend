"use client";

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Calculator,
  Calendar,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Mic,
  PenTool,
  Settings,
  Shield,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { CommandPalette } from "./CommandPalette";
import { Logo } from "./Logo";

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // The exam screen is full-screen and distraction-free.
  if (pathname.startsWith("/attempt/") && !pathname.endsWith("/result")) return <>{children}</>;
  // When not logged in, use public layout for all pages
  if (!user && !loading) return <PublicLayout>{children}</PublicLayout>;
  // For landing page and auth pages, always render public layout
  if (pathname === "/" || AUTH_PAGES.includes(pathname)) return <PublicLayout>{children}</PublicLayout>;
  // Logged in user on /dashboard, /tests, /calculator, /band-descriptors, /attempt/[id]/result
  return <AppLayout>{children}</AppLayout>;
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const authPage = ["/login", "/register", "/forgot-password", "/reset-password"].includes(pathname);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      {!authPage && (
        <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl transition-all">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Logo />
              <div className="hidden xl:block">
                <CommandPalette />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-600 lg:flex">
              <Link
                href="/tests?type=ACADEMIC"
                className={`rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900 ${
                  pathname === "/tests" && !pathname.includes("GENERAL") ? "bg-slate-100 text-brand-700" : ""
                }`}
              >
                Academic Books
              </Link>
              <Link
                href="/tests?type=GENERAL"
                className="rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
              >
                General Training
              </Link>
              <Link
                href="/model-answers"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-purple-700 transition hover:bg-purple-50"
              >
                <PenTool className="h-3.5 w-3.5" /> Band 9 Essays
              </Link>
              <Link
                href="/speaking-practice"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-amber-700 transition hover:bg-amber-50"
              >
                <Mic className="h-3.5 w-3.5" /> Speaking Studio
              </Link>
              <Link
                href="/vocabulary"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-emerald-700 transition hover:bg-emerald-50"
              >
                <Sparkles className="h-3.5 w-3.5" /> Vocab Lab
              </Link>
              <Link
                href="/calculator"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Calculator className="h-3.5 w-3.5 text-brand-600" /> Calculator
              </Link>
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2.5">
              <div className="xl:hidden">
                <CommandPalette />
              </div>

              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="btn-primary text-xs px-3.5 py-1.5 shadow-sm shadow-brand-500/20"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 hover:text-brand-600 transition"
                    title="Profile & Settings"
                  >
                    <User className="h-3.5 w-3.5 text-brand-600" />
                    <span className="hidden sm:inline">Settings</span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-xs text-slate-500 hover:text-slate-800 px-2 py-1 transition font-medium cursor-pointer"
                    title="Log out"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="btn-ghost text-xs hidden sm:inline-flex">
                    Log in
                  </Link>
                  <Link
                    href="/tests?type=ACADEMIC"
                    className="btn-primary text-xs px-4 py-2 shadow-sm shadow-brand-500/20"
                  >
                    Start Practice Free
                  </Link>
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="border-b border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden animate-fade-up">
              <nav className="flex flex-col space-y-1 text-sm font-semibold">
                <Link
                  href="/tests?type=ACADEMIC"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <GraduationCap className="h-4 w-4 text-brand-600" /> Academic Mock Tests
                </Link>
                <Link
                  href="/tests?type=GENERAL"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <Briefcase className="h-4 w-4 text-brand-600" /> General Training Tests
                </Link>
                <Link
                  href="/model-answers"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-purple-700 hover:bg-purple-50"
                >
                  <PenTool className="h-4 w-4" /> Band 9 Model Essays
                </Link>
                <Link
                  href="/speaking-practice"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-amber-700 hover:bg-amber-50"
                >
                  <Mic className="h-4 w-4" /> Speaking Practice Studio
                </Link>
                <Link
                  href="/vocabulary"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-emerald-700 hover:bg-emerald-50"
                >
                  <Sparkles className="h-4 w-4" /> Academic Vocab & Collocations
                </Link>
                <Link
                  href="/calculator"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <Calculator className="h-4 w-4 text-brand-600" /> Band Score Calculator
                </Link>
                <Link
                  href="/study-plan"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <Calendar className="h-4 w-4 text-brand-600" /> Target Study Roadmap
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
                >
                  <User className="h-4 w-4 text-brand-600" /> Candidate Profile &amp; Settings
                </Link>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-3">
                  <a
                    href="https://codestria.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-slate-500 hover:text-brand-600 flex items-center gap-1"
                  >
                    <span>Built by Codestria Studio</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </header>
      )}

      <main className="flex flex-1 flex-col">{children}</main>

      {!authPage && (
        <footer className="border-t border-slate-200/80 bg-white">
          {/* Main Footer Links */}
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
              {/* Brand Column */}
              <div className="lg:col-span-2 space-y-4">
                <Logo />
                <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
                  Official-standard computer-delivered IELTS exam simulation platform. Realistic Cambridge Academic
                  and General Training papers with instant AI band scores, official test-room highlighters, and
                  detailed examiner explanations.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://codestria.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-[#5B4BFF]/40 hover:bg-indigo-50/50 hover:text-[#5B4BFF]"
                  >
                    <Image
                      src="/codestria-mark.svg"
                      alt="Codestria Mark"
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                    <span>Visit codestria.com</span>
                    <ExternalLink className="h-3 w-3 text-slate-400" />
                  </a>
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                    ielts.codestria.com
                  </span>
                </div>
              </div>

              {/* Cambridge Books Column */}
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">Cambridge Books</h3>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <li>
                    <Link href="/tests?type=ACADEMIC" className="hover:text-brand-600 transition">
                      Cambridge IELTS 19 Academic
                    </Link>
                  </li>
                  <li>
                    <Link href="/tests?type=GENERAL" className="hover:text-brand-600 transition">
                      Cambridge IELTS 19 General
                    </Link>
                  </li>
                  <li>
                    <Link href="/tests?type=ACADEMIC" className="hover:text-brand-600 transition">
                      Cambridge IELTS 18 Papers
                    </Link>
                  </li>
                  <li>
                    <Link href="/tests?type=ACADEMIC" className="hover:text-brand-600 transition">
                      Cambridge IELTS 17 Papers
                    </Link>
                  </li>
                  <li>
                    <Link href="/tests?type=ACADEMIC" className="hover:text-brand-600 transition">
                      Cambridge IELTS 16 &amp; 15
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Practice Labs */}
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">Preparation Studios</h3>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <li>
                    <Link href="/model-answers" className="hover:text-purple-600 transition">
                      Band 9 Model Writing Essays
                    </Link>
                  </li>
                  <li>
                    <Link href="/speaking-practice" className="hover:text-amber-600 transition">
                      Speaking Cue Card Studio
                    </Link>
                  </li>
                  <li>
                    <Link href="/vocabulary" className="hover:text-emerald-600 transition">
                      Academic Word List (AWL)
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculator" className="hover:text-brand-600 transition">
                      Official Band Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/study-plan" className="hover:text-brand-600 transition">
                      Study Roadmap Generator
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile" className="hover:text-brand-600 transition">
                      Candidate Profile &amp; Settings
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company & Legal */}
              <div>
                <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">Codestria Studio</h3>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
                  <li>
                    <a
                      href="https://codestria.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-600 transition flex items-center gap-1"
                    >
                      <span>About Codestria</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codestria.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-600 transition"
                    >
                      AI &amp; Automation Services
                    </a>
                  </li>
                  <li>
                    <Link href="/band-descriptors" className="hover:text-brand-600 transition">
                      Examiner Band Rubric
                    </Link>
                  </li>
                  <li>
                    <span className="text-slate-400">Version 2.4.0 (Production)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Sub-footer */}
            <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <p>
                © {new Date().getFullYear()} <strong className="text-slate-700">Codestria</strong>. All rights
                reserved. Hosted &amp; deployed at <span className="font-mono text-slate-600">ielts.codestria.com</span>.
              </p>
              <p className="text-[11px] max-w-md text-right sm:text-right text-slate-400">
                IELTS is a registered trademark of the British Council, IDP: IELTS Australia, and Cambridge University
                Press &amp; Assessment. This platform is an independent educational simulation.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen lg:pl-64 bg-[#f8f9fb]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200/80 bg-white lg:flex shadow-xs">
        <Sidebar />
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
        <Logo href="/dashboard" />
        <button
          onClick={() => setOpen(true)}
          className="btn-ghost px-2"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl animate-fade-up">
            <button
              onClick={() => setOpen(false)}
              className="btn-ghost absolute top-3 right-3 px-2"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      <main className="flex min-h-[calc(100vh-3.5rem)] flex-col lg:min-h-screen">{children}</main>
    </div>
  );
}

function Sidebar() {
  const { user, logout } = useAuth();
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <>
      <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100">
        <Logo href="/dashboard" />
      </div>

      <div className="px-4 py-3">
        <CommandPalette />
      </div>

      <div className="flex-1 overflow-y-auto scroll-thin">
        <Suspense>
          <SidebarNav />
        </Suspense>
      </div>

      {/* Codestria Platform Card */}
      <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-[#0b132b] to-[#1c2541] p-3.5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-300">
            Codestria IELTS
          </span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-emerald-400">
            v2.4 Live
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
          Built for Band 8.0+ aspirants with authentic Cambridge evaluation standards.
        </p>
        <a
          href="https://codestria.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand-300 hover:text-white transition"
        >
          <span>codestria.com</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* User Session Bar */}
      <div className="flex items-center gap-2 border-t border-slate-100 p-3 bg-slate-50/70">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 min-w-0 flex-1 rounded-xl p-1.5 hover:bg-white hover:shadow-xs transition group"
          title="Open Profile & Settings"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-xs font-bold text-white shadow-xs group-hover:scale-105 transition-transform">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
              {user?.name || "Candidate"}
            </div>
            <div className="truncate text-[11px] text-slate-400">{user?.email || "ielts.codestria.com"}</div>
          </div>
        </Link>
        <Link
          href="/profile"
          className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-slate-700 hover:shadow-xs transition"
          title="Profile & Settings"
          aria-label="Profile & Settings"
        >
          <Settings className="h-4 w-4" />
        </Link>
        <button
          onClick={logout}
          className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-600 hover:shadow-xs transition cursor-pointer"
          title="Log out"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

function SidebarNav() {
  const pathname = usePathname();
  const type = useSearchParams().get("type");

  const practiceItems = [
    { href: "/dashboard", label: "Candidate Dashboard", Icon: LayoutDashboard, active: pathname === "/dashboard" },
    {
      href: "/tests?type=ACADEMIC",
      label: "Academic Books (14–19)",
      Icon: GraduationCap,
      active: pathname === "/tests" && type !== "GENERAL",
    },
    {
      href: "/tests?type=GENERAL",
      label: "General Training Books",
      Icon: Briefcase,
      active: pathname === "/tests" && type === "GENERAL",
    },
    {
      href: "/speaking-practice",
      label: "Speaking Studio (Part 1–3)",
      Icon: Mic,
      active: pathname === "/speaking-practice",
    },
  ];

  const writingVocabItems = [
    { href: "/model-answers", label: "Band 9 Model Essays", Icon: PenTool, active: pathname === "/model-answers" },
    { href: "/vocabulary", label: "Academic Vocab & AWL", Icon: Sparkles, active: pathname === "/vocabulary" },
  ];

  const toolItems = [
    { href: "/study-plan", label: "Target Study Roadmap", Icon: Calendar, active: pathname === "/study-plan" },
    { href: "/calculator", label: "Band Score Calculator", Icon: Calculator, active: pathname === "/calculator" },
    { href: "/band-descriptors", label: "Official Band Rubric", Icon: BookOpen, active: pathname === "/band-descriptors" },
    { href: "/profile", label: "Profile & Settings", Icon: User, active: pathname === "/profile" },
  ];

  return (
    <nav className="space-y-5 px-3 py-3">
      <div>
        <div className="eyebrow px-3 pb-2 text-[10px] text-slate-400">Exam Practice</div>
        <div className="space-y-1">
          {practiceItems.map(({ href, label, Icon, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold transition ${
                active
                  ? "bg-brand-50 text-brand-700 shadow-xs ring-1 ring-brand-200/50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-brand-600" : "text-slate-400"}`} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="eyebrow px-3 pb-2 text-[10px] text-slate-400">Writing &amp; Lexicon</div>
        <div className="space-y-1">
          {writingVocabItems.map(({ href, label, Icon, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold transition ${
                active
                  ? "bg-brand-50 text-brand-700 shadow-xs ring-1 ring-brand-200/50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-brand-600" : "text-slate-400"}`} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="eyebrow px-3 pb-2 text-[10px] text-slate-400">Analytics &amp; Tools</div>
        <div className="space-y-1">
          {toolItems.map(({ href, label, Icon, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold transition ${
                active
                  ? "bg-brand-50 text-brand-700 shadow-xs ring-1 ring-brand-200/50"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-brand-600" : "text-slate-400"}`} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
