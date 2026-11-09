"use client";

import { CheckCircle2, Circle, Clock, Eye, EyeOff, Loader2, Mail, Shield, Sparkles, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { api, ApiError, type User } from "@/lib/api";
import { isStrongPassword, passwordChecks, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "@/lib/password";
import { useAuth } from "./AuthProvider";
import { Logo } from "./Logo";
import { BandRing, ErrorBox } from "./ui";

const CONTACT_EMAIL = "mail.codestria@gmail.com";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const resetSuccess = searchParams.get("reset") === "success";
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isLogin = mode === "login";
  const passwordRequirements = passwordChecks(form.password);
  const passwordStrong = isStrongPassword(form.password);

  function enter(user: User, destination?: string | null) {
    try {
      localStorage.setItem("ielts_current_user", JSON.stringify(user));
    } catch {}
    setUser(user);
    router.push(destination?.startsWith("/") ? destination : "/dashboard");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const body = isLogin ? { email: form.email, password: form.password } : form;
      const user = await api<User>(`/auth/${mode}`, { method: "POST", body });
      enter(user, next);
    } catch (err) {
      // A real HTTP response (wrong password, 5xx, validation error) must be
      // surfaced. A network failure is reported to the candidate instead of
      // silently creating a local session.
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(
          "We couldn't reach the server. Check your connection and try again, or email mail.codestria@gmail.com if the problem continues.",
        );
      }
      setBusy(false);
    }
  }

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="grid min-h-screen bg-surface-50 lg:grid-cols-2">
      {/* ── Form panel ───────────────────────────────────────────── */}
      <div className="relative flex flex-col overflow-hidden bg-white px-5 py-7 sm:px-10 lg:px-14">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-100/50 blur-3xl" />

        <div className="relative z-10">
          <Logo />
        </div>

        <div className="relative z-10 flex flex-1 items-center justify-center py-10">
          <form onSubmit={submit} className="w-full max-w-[26rem] animate-fade-up">
            <div className="mb-8">
              <div className="eyebrow mb-3 text-brand-600">{isLogin ? "Welcome back" : "Start free"}</div>
              <h1 className="font-display text-[2rem] font-extrabold leading-tight tracking-tight text-surface-900">
                {isLogin ? "Sign in to your account" : "Create your free account"}
              </h1>
              <p className="mt-2.5 text-[15px] leading-relaxed text-surface-500">
                {isLogin
                  ? "Pick up where you left off — your progress and scores are saved."
                  : "Free forever. Every attempt is saved so you can watch your band improve."}
              </p>
            </div>

            <div className="space-y-5">
              {resetSuccess && (
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 animate-fade-up">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Password updated. You can now sign in with your new password.</span>
                </div>
              )}
              {error && <ErrorBox message={error} />}

              {!isLogin && (
                <div>
                  <label className="label" htmlFor="name">Full name</label>
                  <input
                    id="name"
                    required
                    className="input"
                    placeholder="Ayesha Khan"
                    value={form.name}
                    onChange={set("name")}
                    autoComplete="name"
                  />
                </div>
              )}

              <div>
                <label className="label" htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="label mb-0" htmlFor="password">Password</label>
                  {isLogin && (
                    <Link
                      href="/forgot-password"
                      className="text-[13px] font-semibold text-brand-600 transition hover:text-brand-700"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={isLogin ? undefined : PASSWORD_MIN_LENGTH}
                    maxLength={isLogin ? undefined : PASSWORD_MAX_LENGTH}
                    className="input pr-11"
                    placeholder={isLogin ? "Your password" : `At least ${PASSWORD_MIN_LENGTH} characters`}
                    value={form.password}
                    onChange={set("password")}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-surface-400 transition hover:text-surface-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="mt-3 rounded-xl border border-surface-200 bg-surface-50 p-3.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-surface-500">
                      Your password must include
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {passwordRequirements.map((requirement) => (
                        <li key={requirement.id} className="flex items-center gap-2 text-[13px]">
                          {requirement.ok ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          ) : (
                            <Circle className="h-4 w-4 shrink-0 text-surface-300" />
                          )}
                          <span className={requirement.ok ? "text-surface-700" : "text-surface-500"}>
                            {requirement.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                className="btn-primary w-full py-3.5 text-[15px]"
                disabled={busy || (!isLogin && !passwordStrong)}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLogin ? "Sign in" : "Create free account"}
              </button>
            </div>

            <p className="mt-7 text-center text-sm text-surface-500">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link
                href={isLogin ? "/register" : "/login"}
                className="font-semibold text-brand-600 transition hover:text-brand-700"
              >
                {isLogin ? "Sign up free" : "Sign in"}
              </Link>
            </p>

            <div className="mt-6 rounded-xl border border-surface-200 bg-surface-50 p-4 text-center">
              <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-surface-800">
                <Mail className="h-4 w-4 text-brand-600" />
                Need help or have a suggestion?
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-surface-500">
                If you face any issue or want to improve anything, contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-brand-600 underline-offset-2 transition hover:text-brand-700 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>

            <p className="mt-5 text-center text-xs text-surface-400">
              Powered by{" "}
              <a
                href="https://codestria.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-surface-500 underline-offset-2 transition hover:text-surface-800 hover:underline"
              >
                codestria.com
              </a>
            </p>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-surface-400">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Secure</span>
              <span className="h-3 w-px bg-surface-200" />
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> Instant access</span>
              <span className="h-3 w-px bg-surface-200" />
              <span className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5" /> Free forever</span>
            </div>
          </form>
        </div>
      </div>

      {/* ── Brand panel ──────────────────────────────────────────── */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-50 via-white to-surface-100 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div className="pointer-events-none absolute inset-0 bg-subtle-dots opacity-40" />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <div className="mb-10 inline-flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-[0_18px_40px_-24px_rgba(22,34,59,0.35)] backdrop-blur">
            <BandRing band={8} size={64} />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-600">Overall band</div>
              <div className="font-display text-lg font-bold text-surface-900">Band 8.0 achieved</div>
              <div className="text-xs text-surface-500">Cambridge Academic · Test 1</div>
            </div>
          </div>

          <h2 className="font-display text-[2.1rem] font-extrabold leading-tight tracking-tight text-surface-900">
            Practise like it&apos;s{" "}
            <span className="gradient-brand">test day.</span>
            <br />
            Improve with every attempt.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-surface-500">
            Cambridge Books 12–19 in a calm, computer-delivered test room, with instant objective marking and AI
            examiner feedback.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { icon: Trophy, text: "Full Cambridge papers for Academic and General Training" },
              { icon: Zap, text: "Instant Listening and Reading bands with answer review" },
              { icon: Sparkles, text: "Writing and Speaking feedback from your own AI examiner" },
              { icon: Clock, text: "Progress tracking across every module and attempt" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-surface-600">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
                  <Icon className="h-4 w-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { value: "32+", label: "Mock tests" },
              { value: "8", label: "Books" },
              { value: "9.0", label: "Target band" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white bg-white/70 p-3 text-center backdrop-blur">
                <div className="font-display text-lg font-bold text-surface-900">{stat.value}</div>
                <div className="text-[11px] text-surface-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
