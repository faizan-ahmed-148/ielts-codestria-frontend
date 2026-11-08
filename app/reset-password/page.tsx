"use client";

import { ArrowLeft, CheckCircle2, Eye, EyeOff, KeyRound, Loader2, ShieldCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { api } from "@/lib/api";
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

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
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
  const hasMinLen = password.length >= 8;
  const hasNum = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <p className="mt-4 text-sm font-medium text-slate-600">Verifying your secure reset link...</p>
      </div>
    );
  }

  if (!tokenValid && !success) {
    return (
      <div className="text-center animate-fade-up">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-8 ring-red-50/70">
          <XCircle className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">Invalid or Expired Link</h1>
        <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
          {error || "The reset link you followed has expired or has already been used."}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/forgot-password" className="btn-primary py-3">
            Request a New Reset Link
          </Link>
          <Link href="/login" className="btn-secondary py-2.5">
            Back to Log in
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center animate-fade-up">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/70">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">Password Reset Complete!</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your password has been securely updated. Redirecting you to login...
        </p>
        <div className="mt-6">
          <Link href="/login" className="btn-primary w-full py-3">
            Go to Log in now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-8 ring-brand-50/60">
        <KeyRound className="h-6 w-6" />
      </div>

      <div className="mt-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Create New Password</h1>
        {targetEmail && (
          <p className="mt-1 text-sm text-slate-500">
            For account <span className="font-semibold text-slate-700">{targetEmail}</span>
          </p>
        )}
      </div>

      {error && (
        <div className="mt-6">
          <ErrorBox message={error} />
        </div>
      )}

      <form onSubmit={handleReset} className="mt-6 space-y-4">
        <div>
          <label className="label" htmlFor="password">
            New Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              className="input pr-11"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="label" htmlFor="confirmPassword">
            Confirm New Password
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

        {/* Password Strength Checklist */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-600 space-y-1.5">
          <div className="font-semibold text-slate-700 mb-1">Password Requirements:</div>
          <div className="flex items-center gap-2">
            <span className={hasMinLen ? "text-emerald-600" : "text-slate-400"}>
              {hasMinLen ? "✓" : "○"}
            </span>
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={hasNum ? "text-emerald-600" : "text-slate-400"}>
              {hasNum ? "✓" : "○"}
            </span>
            <span>Contains a number (recommended)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={hasUpper ? "text-emerald-600" : "text-slate-400"}>
              {hasUpper ? "✓" : "○"}
            </span>
            <span>Contains an uppercase letter</span>
          </div>
          {confirmPassword && (
            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60">
              <span className={passwordsMatch ? "text-emerald-600" : "text-rose-500 font-bold"}>
                {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={busy || !hasMinLen || Boolean(confirmPassword && !passwordsMatch)}
          className="btn-primary w-full py-3 shadow-md shadow-brand-500/20"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fb] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xl shadow-slate-200/50">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
                <p className="mt-3 text-sm text-slate-500">Loading reset session...</p>
              </div>
            }
          >
            <ResetPasswordForm />
          </Suspense>

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
