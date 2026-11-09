"use client";

import { ArrowLeft, CheckCircle2, Circle, Eye, EyeOff, KeyRound, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { isStrongPassword, passwordChecks, PASSWORD_MIN_LENGTH } from "@/lib/password";
import { Logo } from "@/components/Logo";
import { ErrorBox } from "@/components/ui";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [targetEmail, setTargetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setVerifying(false);
      setTokenValid(false);
      setError("No reset token provided. Please use the link sent to your email.");
      return;
    }

    async function checkToken() {
      try {
        const res = await api<{ valid: boolean; email: string }>(
          `/auth/verify-reset-token?token=${encodeURIComponent(token)}`,
        );
        setTokenValid(res.valid);
        setTargetEmail(res.email);
      } catch (err) {
        setTokenValid(false);
        setError((err as Error).message || "This password reset link is invalid or has expired.");
      } finally {
        setVerifying(false);
      }
    }

    checkToken();
  }, [token]);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isStrongPassword(password)) {
      setError("Your new password does not meet all the requirements listed below.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify and re-enter.");
      return;
    }

    setBusy(true);

    try {
      await api<{ ok: boolean; message: string }>("/auth/reset-password", {
        method: "POST",
        body: { token, password },
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login?reset=success");
      }, 2500);
    } catch (err) {
      setError((err as Error).message || "Failed to reset password. The link may have expired.");
    } finally {
      setBusy(false);
    }
  }

  // Password requirements calculation
  const requirements = passwordChecks(password);
  const passwordStrong = isStrongPassword(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <p className="mt-4 text-[15px] font-medium text-surface-600">Verifying your secure reset link…</p>
      </div>
    );
  }

  if (!tokenValid && !success) {
    return (
      <div className="animate-fade-up text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
          <XCircle className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-surface-900">
          Invalid or expired link
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-surface-500">
          {error || "The reset link you followed has expired or has already been used."}
        </p>

        <div className="mt-8 flex flex-col gap-2.5">
          <Link href="/forgot-password" className="btn-primary w-full py-3">
            Request a new reset link
          </Link>
          <Link href="/login" className="btn-secondary w-full py-3">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="animate-fade-up text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-surface-900">
          Password reset complete
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-surface-500">
          Your password has been securely updated. Redirecting you to sign in…
        </p>
        <Link href="/login" className="btn-primary mt-7 w-full py-3">
          Go to sign in now
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <KeyRound className="h-6 w-6" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-surface-900">
          Create a new password
        </h1>
        {targetEmail ? (
          <p className="mt-2 text-[15px] leading-relaxed text-surface-500">
            For <span className="break-all font-semibold text-surface-700">{targetEmail}</span>
          </p>
        ) : (
          <p className="mt-2 text-[15px] leading-relaxed text-surface-500">
            Choose a strong password you haven&apos;t used before.
          </p>
        )}
      </div>

      {error && (
        <div className="mt-6">
          <ErrorBox message={error} />
        </div>
      )}

      <form onSubmit={handleReset} className="mt-6 space-y-5">
        <div>
          <label className="label" htmlFor="password">
            New password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={PASSWORD_MIN_LENGTH}
              className="input pr-11"
              placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-surface-400 transition hover:text-surface-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="confirmPassword">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
            className="input"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        {/* Password strength checklist */}
        <div className="rounded-xl border border-surface-200/80 bg-surface-50 p-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-surface-500">Password requirements</p>
          <ul className="mt-2.5 space-y-2">
            {requirements.map((req) => (
              <li key={req.label} className="flex items-center gap-2 text-[13px]">
                {req.ok ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-surface-300" />
                )}
                <span className={req.ok ? "text-surface-700" : "text-surface-500"}>{req.label}</span>
              </li>
            ))}
          </ul>

          {confirmPassword && (
            <div className="mt-3 flex items-center gap-2 border-t border-surface-200/70 pt-3 text-[13px] font-semibold">
              {passwordsMatch ? (
                <>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-emerald-700">Passwords match</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 shrink-0 text-rose-500" />
                  <span className="text-rose-600">Passwords do not match</span>
                </>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={busy || !passwordStrong || Boolean(confirmPassword && !passwordsMatch)}
          className="btn-primary w-full py-3"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Resetting password…
            </>
          ) : (
            "Update password"
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
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
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-14">
                <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
                <p className="mt-4 text-[15px] text-surface-500">Loading reset session…</p>
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>

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
        <p className="mt-2 text-center text-[13px] text-surface-400">
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
        <p className="mt-1 text-center text-xs text-surface-400">
          If you face any issue, contact{" "}
          <a href="mailto:mail.codestria@gmail.com" className="font-semibold hover:text-surface-700">
            mail.codestria@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
