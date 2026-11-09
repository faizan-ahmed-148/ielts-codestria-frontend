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
  LayoutDashboard,
  LogOut,
  Menu,
  Mic,
  PenTool,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { CommandPalette } from "./CommandPalette";
import { Logo } from "./Logo";

const AUTH_PAGES = ["/login", "/register", "/forgot-password", "/reset-password"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  // Distraction-free full screen in active exam room
  if (pathname.startsWith("/attempt/") && !pathname.endsWith("/result")) return <>{children}</>;
  // Public layout for guests or auth pages or landing page
  if (!user && !loading) return <PublicLayout>{children}</PublicLayout>;
  if (pathname === "/" || AUTH_PAGES.includes(pathname)) return <PublicLayout>{children}</PublicLayout>;
  // Authenticated workspace
  return <AppLayout>{children}</AppLayout>;
}

/* ─── PUBLIC LAYOUT ──────────────────────────────────────────────────────── */
function PublicLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authPage = AUTH_PAGES.includes(pathname);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/tests", label: "Mock Tests" },
    { href: "/model-answers", label: "Model Answers" },
    { href: "/speaking-practice", label: "Speaking" },
    { href: "/vocabulary", label: "Vocabulary" },
    { href: "/calculator", label: "Band Calculator" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-surface-50">
      {!authPage && (
        <header
          className={`sticky top-0 z-40 transition-all duration-200 ${
            scrolled
              ? "border-b border-surface-200/90 bg-white/95 shadow-[0_6px_24px_-20px_rgba(22,34,59,0.35)] backdrop-blur-xl"
              : "border-b border-transparent bg-surface-50/85 backdrop-blur-xl"
          }`}
        >
          <div className="page-container flex h-[4.5rem] items-center justify-between gap-4">
            {/* Left: Brand */}
            <div className="flex shrink-0 items-center gap-6">
              <Logo />
            </div>

            {/* Middle: Desktop Nav */}
            <nav className="hidden items-center gap-1 text-sm font-medium text-surface-600 lg:flex">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href.split("?")[0];
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-xl px-3.5 py-2 transition-colors duration-150 ${
                      isActive
                        ? "bg-white font-semibold text-surface-900 shadow-xs ring-1 ring-surface-200"
                        : "hover:bg-white/80 hover:text-surface-900"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search + Auth CTA */}
            <div className="flex shrink-0 items-center gap-2.5">
              <CommandPalette />

              {user ? (
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href="/dashboard"
                    className="btn btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-surface-200 bg-white text-surface-600 transition hover:border-surface-300 hover:text-surface-900"
                    title="Settings"
                  >
                    <User className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="cursor-pointer whitespace-nowrap rounded-xl px-2.5 py-2 text-sm font-semibold text-surface-500 transition hover:bg-white hover:text-surface-900"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex shrink-0 items-center gap-2">
                  <Link href="/login" className="btn btn-ghost hidden px-3.5 py-2 text-sm font-semibold sm:inline-flex">
                    Sign in
                  </Link>
                  <Link href="/tests?type=ACADEMIC" className="btn btn-primary px-4 py-2 text-sm font-semibold">
                    <span>Start free</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-surface-200 bg-white text-surface-600 transition hover:bg-surface-100 lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="animate-fade-up border-b border-surface-200 bg-white px-4 pb-5 pt-2 shadow-lg lg:hidden">
              <nav className="flex flex-col gap-1 text-sm font-medium">
                {[
                  { href: "/tests?type=ACADEMIC", label: "Academic Mock Tests", icon: GraduationCap },
                  { href: "/tests?type=GENERAL", label: "General Training Tests", icon: Briefcase },
                  { href: "/model-answers", label: "Band 9 Model Answers", icon: PenTool },
                  { href: "/speaking-practice", label: "Speaking Studio", icon: Mic },
                  { href: "/vocabulary", label: "Vocabulary Lab", icon: Sparkles },
                  { href: "/calculator", label: "Band Calculator", icon: Calculator },
                  { href: "/study-plan", label: "Study Roadmap", icon: Calendar },
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-surface-700 transition hover:bg-surface-50 hover:text-surface-900"
                  >
                    <Icon className="h-5 w-5 text-surface-400" />
                    <span>{label}</span>
                    <ChevronRight className="ml-auto h-4 w-4 text-surface-300" />
                  </Link>
                ))}
              </nav>

              {!user && (
                <div className="mt-4 flex flex-col gap-2 border-t border-surface-100 pt-4">
                  <Link href="/login" className="btn-secondary w-full justify-center">
                    Sign in
                  </Link>
                  <Link href="/tests?type=ACADEMIC" className="btn-primary w-full justify-center">
                    Start free practice
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>
      )}

      <main className="flex flex-1 flex-col">{children}</main>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      {!authPage && (
        <footer className="border-t border-surface-200 bg-white">
          <div className="page-container py-14">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
              <div className="col-span-2 space-y-4">
                <Logo showBadge={false} />
                <p className="max-w-sm text-sm leading-relaxed text-surface-500">
                  A complete, free IELTS preparation studio: authentic Cambridge papers, instant objective marking,
                  AI examiner feedback and a library of Band 9 model answers.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href="https://codestria.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-200 bg-surface-50 px-2.5 py-1.5 text-xs font-semibold text-surface-600 transition hover:bg-surface-100"
                  >
                    <span>codestria.com</span>
                    <ExternalLink className="h-3 w-3 text-surface-400" />
                  </a>
                  <span className="font-mono text-xs text-surface-400">ielts.codestria.com</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-surface-900">Cambridge Books</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-surface-500">
                  {["19 Academic", "19 General", "18 Academic", "17 Academic", "16 & 15 Papers"].map((v) => (
                    <li key={v}>
                      <Link href="/tests?type=ACADEMIC" className="transition hover:text-surface-900">
                        IELTS {v}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-surface-900">Practice Studios</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-surface-500">
                  {[
                    { href: "/model-answers", label: "Model Answers" },
                    { href: "/speaking-practice", label: "Speaking Studio" },
                    { href: "/vocabulary", label: "Vocabulary Lab" },
                    { href: "/study-plan", label: "Study Roadmap" },
                    { href: "/calculator", label: "Score Calculator" },
                    { href: "/band-descriptors", label: "Band Descriptors" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="transition hover:text-surface-900">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-surface-900">Studio &amp; Legal</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-surface-500">
                  <li>
                    <a
                      href="https://codestria.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition hover:text-surface-900"
                    >
                      About studio <ExternalLink className="h-3 w-3 text-surface-400" />
                    </a>
                  </li>
                  <li>
                    <Link href="/band-descriptors" className="transition hover:text-surface-900">
                      Scoring rubric
                    </Link>
                  </li>
                  <li>
                    <span className="text-surface-400">v3.0</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-100 pt-7 text-xs text-surface-400 sm:flex-row">
              <p>© {new Date().getFullYear()} Codestria Studio. All rights reserved.</p>
              <p className="max-w-md text-center sm:text-right">
                IELTS® is a registered trademark of Cambridge University Press &amp; Assessment, British Council and
                IDP. This is an independent simulation product.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

/* ─── APP LAYOUT (Authenticated Workspace) ────────────────────────────────── */
function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="min-h-screen bg-surface-50 lg:pl-72">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-surface-200/90 bg-white lg:flex">
        <Sidebar />
      </aside>

      {/* Mobile Top Header */}
      <div className="sticky top-0 z-30 flex h-[4.5rem] items-center justify-between border-b border-surface-200/90 bg-white/95 px-4 backdrop-blur-lg lg:hidden">
        <Logo href="/dashboard" />
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-surface-200 text-surface-600 transition hover:bg-surface-50"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-surface-950/30 backdrop-blur-xs" onClick={() => setOpen(false)} />
          <aside className="animate-fade-up absolute inset-y-0 left-0 flex w-80 flex-col bg-white shadow-2xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-surface-500 transition hover:bg-surface-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      <main className="flex min-h-[calc(100vh-4.5rem)] flex-col lg:min-h-screen">{children}</main>
    </div>
  );
}

/* ─── SIDEBAR COMPONENT ──────────────────────────────────────────────────── */
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
    <div className="flex h-full flex-col">
      {/* Brand Header */}
      <div className="flex h-[4.5rem] items-center border-b border-surface-100 px-5">
        <Logo href="/dashboard" />
      </div>

      {/* Command Palette Trigger */}
      <div className="px-4 pb-1 pt-4">
        <CommandPalette fullWidth placeholder="Search tests & tools…" />
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto scroll-thin py-3">
        <Suspense>
          <SidebarNav />
        </Suspense>
      </div>

      {/* User Session Footer Bar */}
      <div className="border-t border-surface-100 p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-transparent p-2 transition hover:border-surface-200 hover:bg-surface-50">
          <Link href="/profile" className="group flex min-w-0 flex-1 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm">
              {initials}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-semibold text-surface-900 transition-colors group-hover:text-brand-700">
                {user?.name || "Candidate"}
              </div>
              <div className="mt-0.5 truncate text-xs text-surface-500">{user?.email || "candidate@ielts"}</div>
            </div>
          </Link>
          <Link
            href="/profile"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 transition hover:bg-white hover:text-surface-800"
            title="Profile & settings"
          >
            <Settings className="h-4 w-4" />
          </Link>
          <button
            onClick={logout}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-surface-400 transition hover:bg-rose-50 hover:text-rose-600"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── SIDEBAR NAV ────────────────────────────────────────────────────────── */
function SidebarNav() {
  const pathname = usePathname();
  const type = useSearchParams().get("type");

  const sections = [
    {
      title: "Practice",
      items: [
        { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard, active: pathname === "/dashboard" },
        {
          href: "/tests?type=ACADEMIC",
          label: "Academic tests",
          Icon: GraduationCap,
          active: pathname === "/tests" && type !== "GENERAL",
        },
        {
          href: "/tests?type=GENERAL",
          label: "General training",
          Icon: Briefcase,
          active: pathname === "/tests" && type === "GENERAL",
        },
        { href: "/speaking-practice", label: "Speaking studio", Icon: Mic, active: pathname === "/speaking-practice" },
      ],
    },
    {
      title: "Skills & language",
      items: [
        { href: "/model-answers", label: "Model answers", Icon: PenTool, active: pathname === "/model-answers" },
        { href: "/vocabulary", label: "Vocabulary lab", Icon: Sparkles, active: pathname === "/vocabulary" },
      ],
    },
    {
      title: "Insights & tools",
      items: [
        { href: "/study-plan", label: "Study roadmap", Icon: Calendar, active: pathname === "/study-plan" },
        { href: "/calculator", label: "Band calculator", Icon: Calculator, active: pathname === "/calculator" },
        { href: "/band-descriptors", label: "Band descriptors", Icon: BookOpen, active: pathname === "/band-descriptors" },
        { href: "/profile", label: "Settings", Icon: User, active: pathname === "/profile" },
      ],
    },
  ];

  return (
    <nav className="space-y-6 px-3 py-1">
      {sections.map(({ title, items }) => (
        <div key={title}>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-surface-400">{title}</div>
          <div className="space-y-1">
            {items.map(({ href, label, Icon, active }) => (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-brand-50 font-semibold text-brand-700"
                    : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
                }`}
              >
                {active && <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-500" />}
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                    active ? "text-brand-600" : "text-surface-400 group-hover:text-surface-600"
                  }`}
                />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
