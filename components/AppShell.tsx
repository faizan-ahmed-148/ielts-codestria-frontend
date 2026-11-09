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
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/tests", label: "Mock Tests" },
    { href: "/model-answers", label: "Band 9 Models" },
    { href: "/speaking-practice", label: "Speaking Studio" },
    { href: "/vocabulary", label: "Vocab Lab" },
    { href: "/calculator", label: "Band Calculator" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      {!authPage && (
        <header
          className={`sticky top-0 z-40 transition-all duration-200 ${
            scrolled
              ? "border-b border-zinc-200/80 bg-white/95 backdrop-blur-md shadow-2xs"
              : "bg-white/80 backdrop-blur-xs border-b border-zinc-200/60"
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            {/* Left: Brand */}
            <div className="flex items-center gap-6 shrink-0">
              <Logo />
            </div>

            {/* Middle: Desktop Nav */}
            <nav className="hidden items-center gap-1.5 text-[13px] font-medium text-zinc-600 lg:flex">
              {navLinks.map(({ href, label }) => {
                const isActive = pathname === href.split("?")[0];
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-lg px-3 py-1.5 transition-colors duration-150 ${
                      isActive
                        ? "text-zinc-900 bg-zinc-100 font-semibold"
                        : "hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search + Auth CTA */}
            <div className="flex items-center gap-2.5 shrink-0">
              <CommandPalette />

              {user ? (
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/dashboard"
                    className="btn btn-primary px-3.5 py-1.5 text-xs font-semibold shadow-2xs inline-flex items-center gap-1.5"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/profile"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition shrink-0"
                    title="Settings"
                  >
                    <User className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="text-xs font-semibold text-zinc-500 hover:text-zinc-900 px-2 py-1.5 rounded-lg hover:bg-zinc-100 transition whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <Link href="/login" className="btn btn-ghost px-3 py-1.5 text-xs font-semibold hidden sm:inline-flex">
                    Sign in
                  </Link>
                  <Link href="/tests?type=ACADEMIC" className="btn btn-primary px-3.5 py-1.5 text-xs font-semibold shadow-2xs">
                    <span>Start Free</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 lg:hidden shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="border-b border-zinc-200 bg-white px-4 py-4 shadow-lg lg:hidden animate-fade-up">
              <nav className="flex flex-col space-y-1 text-xs font-medium">
                {[
                  { href: "/tests?type=ACADEMIC", label: "Academic Mock Tests", icon: GraduationCap },
                  { href: "/tests?type=GENERAL", label: "General Training Tests", icon: Briefcase },
                  { href: "/model-answers", label: "Band 9 Model Essays", icon: PenTool },
                  { href: "/speaking-practice", label: "Speaking Studio", icon: Mic },
                  { href: "/vocabulary", label: "Vocab Lab & AWL", icon: Sparkles },
                  { href: "/calculator", label: "Band Calculator", icon: Calculator },
                  { href: "/study-plan", label: "Study Roadmap", icon: Calendar },
                ].map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition"
                  >
                    <Icon className="h-4 w-4 text-zinc-500" />
                    <span>{label}</span>
                    <ChevronRight className="ml-auto h-3.5 w-3.5 text-zinc-400" />
                  </Link>
                ))}
              </nav>

              {!user && (
                <div className="mt-4 flex flex-col gap-2 border-t border-zinc-100 pt-3">
                  <Link href="/login" className="btn-secondary w-full justify-center">
                    Sign in
                  </Link>
                  <Link href="/tests?type=ACADEMIC" className="btn-primary w-full justify-center">
                    Start Free Practice
                  </Link>
                </div>
              )}
            </div>
          )}
        </header>
      )}

      <main className="flex flex-1 flex-col">{children}</main>

      {/* ─── Refined Footer ────────────────────────────────────────── */}
      {!authPage && (
        <footer className="border-t border-zinc-200/80 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
              <div className="col-span-2 space-y-3">
                <Logo showBadge={false} />
                <p className="max-w-sm text-xs text-zinc-500 leading-relaxed">
                  Official computer-delivered IELTS simulation platform. Authentic Cambridge exam papers with instant
                  objective marking and Band 9 evaluation criteria.
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <a
                    href="https://codestria.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-100 transition"
                  >
                    <span>codestria.com</span>
                    <ExternalLink className="h-3 w-3 text-zinc-400" />
                  </a>
                  <span className="text-[11px] font-mono text-zinc-400">ielts.codestria.com</span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Cambridge Books</h3>
                <ul className="mt-3 space-y-2 text-xs text-zinc-500">
                  {["19 Academic", "19 General", "18 Academic", "17 Academic", "16 & 15 Papers"].map((v) => (
                    <li key={v}>
                      <Link href="/tests?type=ACADEMIC" className="hover:text-zinc-900 transition">
                        IELTS {v}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Practice Studios</h3>
                <ul className="mt-3 space-y-2 text-xs text-zinc-500">
                  {[
                    { href: "/model-answers", label: "Band 9 Models" },
                    { href: "/speaking-practice", label: "Speaking Studio" },
                    { href: "/vocabulary", label: "Vocab Lab" },
                    { href: "/study-plan", label: "Study Roadmap" },
                    { href: "/calculator", label: "Score Calculator" },
                    { href: "/band-descriptors", label: "Band Descriptors" },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="hover:text-zinc-900 transition">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Studio &amp; Legal</h3>
                <ul className="mt-3 space-y-2 text-xs text-zinc-500">
                  <li>
                    <a
                      href="https://codestria.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-900 transition inline-flex items-center gap-1"
                    >
                      About Studio <ExternalLink className="h-3 w-3 text-zinc-400" />
                    </a>
                  </li>
                  <li>
                    <Link href="/band-descriptors" className="hover:text-zinc-900 transition">
                      Scoring Rubric
                    </Link>
                  </li>
                  <li>
                    <span className="text-zinc-400">v3.0 Production</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-6 text-[11px] text-zinc-400">
              <p>© {new Date().getFullYear()} Codestria Studio. All rights reserved.</p>
              <p className="text-center sm:text-right max-w-md">
                IELTS® is a registered trademark of Cambridge University Press & Assessment, British Council and IDP. This is an independent simulation product.
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
    <div className="min-h-screen lg:pl-60 bg-[#fcfcfd]">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-zinc-200/80 bg-white lg:flex">
        <Sidebar />
      </aside>

      {/* Mobile Top Header */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-zinc-200/80 bg-white/90 px-4 backdrop-blur-md lg:hidden">
        <Logo href="/dashboard" />
        <button
          onClick={() => setOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-68 flex-col bg-white shadow-xl animate-fade-up">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar />
          </aside>
        </div>
      )}

      <main className="flex min-h-[calc(100vh-3.5rem)] flex-col lg:min-h-screen">{children}</main>
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
      <div className="flex h-14 items-center px-4 border-b border-zinc-100">
        <Logo href="/dashboard" showBadge={false} />
      </div>

      {/* Command Palette Trigger */}
      <div className="px-3 pt-3 pb-1">
        <CommandPalette />
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto scroll-thin py-2">
        <Suspense>
          <SidebarNav />
        </Suspense>
      </div>

      {/* User Session Footer Bar */}
      <div className="border-t border-zinc-100 p-2.5">
        <div className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-zinc-50 transition">
          <Link href="/profile" className="flex items-center gap-2.5 min-w-0 flex-1 group">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-[11px] font-semibold text-white shadow-2xs">
              {initials}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-xs font-medium text-zinc-900 group-hover:text-brand-600 transition-colors">
                {user?.name || "Candidate"}
              </div>
              <div className="truncate text-[10px] text-zinc-400">{user?.email || "candidate@ielts"}</div>
            </div>
          </Link>
          <Link
            href="/profile"
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
            title="Profile & Settings"
          >
            <Settings className="h-3.5 w-3.5" />
          </Link>
          <button
            onClick={logout}
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
            title="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
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
      title: "Exam Practice",
      items: [
        { href: "/dashboard", label: "Dashboard", Icon: LayoutDashboard, active: pathname === "/dashboard" },
        {
          href: "/tests?type=ACADEMIC",
          label: "Academic Books 19–12",
          Icon: GraduationCap,
          active: pathname === "/tests" && type !== "GENERAL",
        },
        {
          href: "/tests?type=GENERAL",
          label: "General Training Books",
          Icon: Briefcase,
          active: pathname === "/tests" && type === "GENERAL",
        },
        { href: "/speaking-practice", label: "Speaking Studio", Icon: Mic, active: pathname === "/speaking-practice" },
      ],
    },
    {
      title: "Writing & Lexicon",
      items: [
        { href: "/model-answers", label: "Band 9 Model Essays", Icon: PenTool, active: pathname === "/model-answers" },
        { href: "/vocabulary", label: "Academic Vocab & AWL", Icon: Sparkles, active: pathname === "/vocabulary" },
      ],
    },
    {
      title: "Tools & Analytics",
      items: [
        { href: "/study-plan", label: "Study Roadmap", Icon: Calendar, active: pathname === "/study-plan" },
        { href: "/calculator", label: "Band Calculator", Icon: Calculator, active: pathname === "/calculator" },
        { href: "/band-descriptors", label: "Examiner Rubric", Icon: BookOpen, active: pathname === "/band-descriptors" },
        { href: "/profile", label: "Candidate Settings", Icon: User, active: pathname === "/profile" },
      ],
    },
  ];

  return (
    <nav className="space-y-4 px-2 py-1">
      {sections.map(({ title, items }) => (
        <div key={title}>
          <div className="px-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            {title}
          </div>
          <div className="space-y-0.5">
            {items.map(({ href, label, Icon, active }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                  active
                    ? "bg-zinc-100 text-zinc-950 font-semibold"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    active ? "text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600"
                  }`}
                />
                <span className="truncate">{label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-zinc-900" />
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
