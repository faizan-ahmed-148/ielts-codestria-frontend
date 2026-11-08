"use client";

import { ArrowLeft, CheckCircle2, Mail, Loader2, Sparkles } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-[#f7f8fb] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xl shadow-slate-200/50">
          {!submitted ? (
            <div className="animate-fade-up">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-8 ring-brand-50/60">
                <Mail className="h-6 w-6" />
              </div>

              <div className="mt-5 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Forgot your password?</h1>
                <p className="mt-2 text-sm text-slate-500">
                  No worries! Enter your registered email and we&apos;ll send you a secure link to reset your password.
                </p>
              </div>

              {error && (
                <div className="mt-6">
                  <ErrorBox message={error} />
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  className="btn-primary w-full py-3 shadow-md shadow-brand-500/20"
                >
                  {busy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send Password Reset Link"
                  )}
                </button>
              </form>

              <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/70 p-3.5 text-xs text-indigo-900">
                <div className="flex items-center gap-1.5 font-semibold text-indigo-800">
                  <Sparkles className="h-3.5 w-3.5" /> Powered by Mailtrap
                </div>
                <p className="mt-1 text-indigo-950/80 leading-relaxed">
                  In local development, check your Mailtrap sandbox inbox or the backend terminal log for the verification link.
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fade-up text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/70">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">Check your inbox</h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We have sent password reset instructions to:
              </p>
              <p className="mt-1 font-semibold text-slate-900">{email}</p>

              <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 text-left space-y-2">
                <p>• The reset link is valid for <strong>1 hour</strong>.</p>
                <p>• If you don&apos;t see the email within a couple minutes, check your spam folder or Mailtrap inbox.</p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary w-full py-2.5 text-sm"
                >
                  Try another email
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
