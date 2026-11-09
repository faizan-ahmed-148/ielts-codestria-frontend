"use client";

import { ArrowLeft, CheckCircle2, Loader2, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/api";
import { Logo } from "@/components/Logo";
import { ErrorBox } from "@/components/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      await api<{ ok: boolean; message: string }>("/auth/forgot-password", {
        method: "POST",
        body: { email },
      });
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message || "Unable to send reset email. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-surface-50 bg-aurora px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-subtle-grid opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-up">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>

        <div className="card mt-8 p-6 sm:p-8">
          {!submitted ? (
            <>
              <div className="flex flex-col items-center text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Mail className="h-6 w-6" />
                </span>
                <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-surface-900">
                  Forgot your password?
                </h1>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-surface-500">
                  Enter the email linked to your account and we&apos;ll send a secure link to choose a new password.
                </p>
              </div>

              {error && (
                <div className="mt-6">
                  <ErrorBox message={error} />
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="email" className="label">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={busy || !email.trim()}
                  className="btn-primary w-full py-3"
                >
                  {busy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending reset link…
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-xl border border-surface-200/80 bg-surface-50 p-4">
                <div className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.1em] text-surface-500">
                  <Sparkles className="h-3.5 w-3.5 text-brand-500" /> Powered by Mailtrap
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-surface-500">
                  Local development? Check your Mailtrap sandbox inbox or the backend terminal log for the verification
                  link.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <CheckCircle2 className="h-7 w-7" />
              </span>

              <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-surface-900">
                Check your inbox
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-surface-500">
                We&apos;ve sent password reset instructions to
              </p>
              <p className="mt-1 break-all text-[15px] font-semibold text-surface-900">{email}</p>

              <div className="mt-6 space-y-2 rounded-xl border border-surface-200/80 bg-surface-50 p-4 text-left text-[13px] leading-relaxed text-surface-600">
                <p>
                  The reset link is valid for <strong className="font-semibold text-surface-900">1 hour</strong>.
                </p>
                <p>If it doesn&apos;t arrive within a couple of minutes, check your spam folder or Mailtrap inbox.</p>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-6 w-full py-3"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="mt-8 border-t border-surface-100 pt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition hover:text-brand-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-[13px] text-surface-400">
          Secure account recovery · Codestria IELTS
        </p>
      </div>
    </div>
  );
}
