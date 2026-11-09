"use client";

import {
  Briefcase,
  CheckCircle2,
  Database,
  Download,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Loader2,
  Lock,
  LogOut,
  Save,
  Shield,
  Sliders,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RequireAuth, useAuth } from "@/components/AuthProvider";
import { AiKeySettings } from "@/components/AiKeySetup";
import { ErrorBox, PageHeader } from "@/components/ui";
import { api, type TestType, type User } from "@/lib/api";
import { track as trackEvent } from "@/lib/analytics";
import { isStrongPassword, passwordChecks, PASSWORD_MIN_LENGTH } from "@/lib/password";

type Tab = "profile" | "security" | "ai" | "preferences" | "data";

const TABS: { id: Tab; label: string; short: string; icon: typeof UserIcon }[] = [
  { id: "profile", label: "Candidate profile", short: "Profile", icon: UserIcon },
  { id: "security", label: "Password & security", short: "Security", icon: Lock },
  { id: "ai", label: "AI scoring", short: "AI scoring", icon: KeyRound },
  { id: "preferences", label: "Exam room preferences", short: "Exam room", icon: Sliders },
  { id: "data", label: "Data & storage", short: "Data", icon: Database },
];

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileView />
    </RequireAuth>
  );
}

function SectionHead({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b border-surface-100 pb-4">
      <h2 className="font-display text-lg font-bold text-surface-900">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-surface-500">{description}</p>
    </div>
  );
}

function SuccessBox({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 animate-fade-up">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
      <span>{message}</span>
    </div>
  );
}

function ProfileView() {
  const { user, setUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Allow /profile#ai to land directly on the AI Scoring tab.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#ai") {
      setActiveTab("ai");
    }
  }, []);

  // Profile form
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [targetBand, setTargetBand] = useState<number>(user?.targetBand || 7.5);
  const [track, setTrack] = useState<TestType>(user?.track || "ACADEMIC");
  const [examDate, setExamDate] = useState<string>("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const newPasswordChecks = passwordChecks(newPassword);
  const newPasswordStrong = isStrongPassword(newPassword);

  // Exam room preferences (localStorage)
  const [contrastTheme, setContrastTheme] = useState<"standard" | "yellow" | "inverted" | "cream">("standard");
  const [fontScale, setFontScale] = useState<"standard" | "medium" | "large">("standard");
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [timeAlerts, setTimeAlerts] = useState<boolean>(true);
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Data / storage
  const [localAttemptsCount, setLocalAttemptsCount] = useState<number>(0);
  const [clearSuccess, setClearSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.targetBand) setTargetBand(user.targetBand);
      if (user.track) setTrack(user.track);
    }
  }, [user]);

  useEffect(() => {
    try {
      const rawPrefs = localStorage.getItem("ielts_user_preferences");
      if (rawPrefs) {
        const p = JSON.parse(rawPrefs);
        if (p.contrastTheme) setContrastTheme(p.contrastTheme);
        if (p.fontScale) setFontScale(p.fontScale);
        if (p.audioSpeed) setAudioSpeed(p.audioSpeed);
        if (p.timeAlerts !== undefined) setTimeAlerts(p.timeAlerts);
        if (p.examDate) setExamDate(p.examDate);
      }

      const rawAttempts = localStorage.getItem("ielts_local_attempts_v2");
      if (rawAttempts) {
        const map = JSON.parse(rawAttempts);
        setLocalAttemptsCount(Object.keys(map).length);
      }
    } catch {}
  }, []);

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess("");
    setProfileError("");

    try {
      let updatedUser: User = {
        id: user?.id || "user",
        name: name.trim(),
        email: email.trim().toLowerCase(),
        targetBand,
        track,
      };

      try {
        const remote = await api<User>("/auth/profile", {
          method: "PATCH",
          body: { name: name.trim(), email: email.trim().toLowerCase() },
        });
        if (remote) {
          updatedUser = { ...remote, targetBand, track };
        }
      } catch {
        // Offline / client fallback
      }

      setUser(updatedUser);
      localStorage.setItem("ielts_current_user", JSON.stringify(updatedUser));

      const existingPrefs = JSON.parse(localStorage.getItem("ielts_user_preferences") || "{}");
      localStorage.setItem(
        "ielts_user_preferences",
        JSON.stringify({ ...existingPrefs, examDate, targetBand, track }),
      );

      setProfileSuccess("Candidate profile updated successfully!");
      trackEvent("profile_update", { target_band: targetBand, track });
      setTimeout(() => setProfileSuccess(""), 4000);
    } catch (err: any) {
      setProfileError(err?.message || "Failed to update profile");
    } finally {
      setProfileSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordSuccess("");
    setPasswordError("");

    if (!isStrongPassword(newPassword)) {
      setPasswordError("Your new password does not meet all the requirements listed below.");
      setPasswordSaving(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match. Please verify.");
      setPasswordSaving(false);
      return;
    }

    try {
      await api("/auth/change-password", {
        method: "POST",
        body: { currentPassword, newPassword },
      });

      setPasswordSuccess("Your account password has been changed successfully!");
      trackEvent("password_change");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch (err: any) {
      setPasswordError(err?.message || "Failed to update password");
    } finally {
      setPasswordSaving(false);
    }
  }

  function handleSavePreferences() {
    try {
      const existing = JSON.parse(localStorage.getItem("ielts_user_preferences") || "{}");
      localStorage.setItem(
        "ielts_user_preferences",
        JSON.stringify({ ...existing, contrastTheme, fontScale, audioSpeed, timeAlerts, examDate }),
      );
      setPrefsSaved(true);
      trackEvent("preferences_saved", { exam_date: examDate || undefined, target_band: targetBand, track });
      setTimeout(() => setPrefsSaved(false), 3000);
    } catch {}
  }

  function handleClearData() {
    if (confirm("Are you sure you want to clear your local test practice history? This action cannot be undone.")) {
      try {
        localStorage.removeItem("ielts_local_attempts_v2");
        setLocalAttemptsCount(0);
        setClearSuccess("Local test attempts have been reset.");
        trackEvent("local_data_cleared");
        setTimeout(() => setClearSuccess(""), 4000);
      } catch {}
    }
  }

  function handleExportData() {
    try {
      const attempts = localStorage.getItem("ielts_local_attempts_v2") || "{}";
      const userMeta = localStorage.getItem("ielts_current_user") || "{}";
      const blob = new Blob(
        [
          JSON.stringify(
            {
              platform: "Codestria IELTS",
              exportedAt: new Date().toISOString(),
              user: JSON.parse(userMeta),
              attempts: JSON.parse(attempts),
            },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `codestria-ielts-transcript-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      trackEvent("data_exported");
    } catch {}
  }

  const memberName = user?.name || name || "Candidate";
  const initials = memberName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="page-container space-y-8 py-8 sm:py-10">
      <PageHeader
        eyebrow="Candidate account"
        title="Profile & examination settings"
        description="Manage your credentials, target band, CD-IELTS room preferences, AI scoring key and stored practice data."
        actions={
          <>
            <Link href="/dashboard" className="btn-secondary">
              Back to dashboard
            </Link>
            <button onClick={() => logout()} className="btn-destructive cursor-pointer">
              <LogOut className="h-4 w-4" />
              <span>Log out</span>
            </button>
          </>
        }
      />

      {/* Identity strip */}
      <div className="card flex flex-wrap items-center gap-4 p-5 sm:p-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white shadow-sm">
          {initials || "ST"}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-display text-lg font-bold text-surface-900">{memberName}</div>
          <div className="truncate text-sm text-surface-500">{user?.email || email || "candidate@ielts"}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="badge-brand">
            <GraduationCap className="h-3.5 w-3.5" />
            {track === "ACADEMIC" ? "Academic" : "General Training"}
          </span>
          <span className="badge-success">Target band {targetBand.toFixed(1)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto scroll-thin">
        <div className="inline-flex min-w-full gap-1 rounded-2xl border border-surface-200 bg-white p-1.5 sm:min-w-0">
          {TABS.map(({ id, label, short, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition ${
                  isActive
                    ? "bg-brand-600 text-white shadow-sm"
                    : "text-surface-500 hover:bg-surface-50 hover:text-surface-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidate profile */}
      {activeTab === "profile" && (
        <div className="max-w-3xl space-y-5 animate-fade-up">
          {profileSuccess && <SuccessBox message={profileSuccess} />}
          {profileError && <ErrorBox message={profileError} />}

          <form onSubmit={handleSaveProfile} className="card space-y-6 p-6 sm:p-8">
            <SectionHead
              title="Personal & target information"
              description="Update your display name, registration email and the IELTS track you are preparing for."
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="fullName">
                  Full candidate name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="e.g. Ayesha Khan"
                />
              </div>

              <div>
                <label className="label" htmlFor="emailAddress">
                  Email address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="label">Target examination track</label>
              <div className="grid max-w-md grid-cols-2 gap-3">
                {(
                  [
                    ["ACADEMIC", "Academic", GraduationCap],
                    ["GENERAL", "General Training", Briefcase],
                  ] as const
                ).map(([value, label, Icon]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTrack(value)}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3.5 text-sm font-semibold transition ${
                      track === value
                        ? "border-brand-300 bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                        : "border-surface-200 bg-white text-surface-600 hover:bg-surface-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label className="label mb-0">Target overall band</label>
                <span className="badge-brand">Band {targetBand.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scroll-thin">
                {[5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setTargetBand(b)}
                    className={`min-w-[54px] flex-1 cursor-pointer rounded-xl border py-2.5 font-mono text-sm font-bold transition ${
                      targetBand === b
                        ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                        : "border-surface-200 bg-white text-surface-600 hover:border-surface-300"
                    }`}
                  >
                    {b.toFixed(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-md">
              <label className="label" htmlFor="examDate">
                Planned examination date <span className="font-normal text-surface-400">(optional)</span>
              </label>
              <input
                id="examDate"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="input"
              />
            </div>

            <div className="flex items-center justify-end border-t border-surface-100 pt-5">
              <button type="submit" disabled={profileSaving} className="btn-primary cursor-pointer px-6 py-3">
                {profileSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Save profile changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* AI scoring */}
      {activeTab === "ai" && (
        <div className="max-w-3xl animate-fade-up">
          <div className="card p-6 sm:p-8">
            <AiKeySettings />
          </div>
        </div>
      )}

      {/* Security */}
      {activeTab === "security" && (
        <div className="max-w-2xl space-y-5 animate-fade-up">
          {passwordSuccess && <SuccessBox message={passwordSuccess} />}
          {passwordError && <ErrorBox message={passwordError} />}

          <form onSubmit={handleChangePassword} className="card space-y-6 p-6 sm:p-8">
            <SectionHead
              title="Update account password"
              description={`Protect your account with a strong password: ${PASSWORD_MIN_LENGTH}+ characters, including uppercase, lowercase, number and special character.`}
            />

            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="currentPassword">
                  Current password
                </label>
                <div className="relative">
                  <input
                    id="currentPassword"
                    type={showCurrent ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input pr-11"
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent((s) => !s)}
                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-surface-400 transition hover:text-surface-700"
                    aria-label={showCurrent ? "Hide password" : "Show password"}
                  >
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="label" htmlFor="newPassword">
                  New password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNew ? "text" : "password"}
                    required
                    minLength={PASSWORD_MIN_LENGTH}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input pr-11"
                    placeholder={`At least ${PASSWORD_MIN_LENGTH} characters`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((s) => !s)}
                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-surface-400 transition hover:text-surface-700"
                    aria-label={showNew ? "Hide password" : "Show password"}
                  >
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="mt-3 rounded-xl border border-surface-200 bg-surface-50 p-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-surface-500">
                    Your new password must include
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {newPasswordChecks.map((requirement) => (
                      <li key={requirement.id} className="flex items-center gap-2 text-[13px]">
                        {requirement.ok ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        ) : (
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-surface-300" />
                        )}
                        <span className={requirement.ok ? "text-surface-700" : "text-surface-500"}>
                          {requirement.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <label className="label" htmlFor="confirmPassword">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  minLength={PASSWORD_MIN_LENGTH}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                  placeholder="Repeat your new password"
                />
              </div>
            </div>

            <div className="space-y-1.5 rounded-xl border border-surface-200 bg-surface-50 p-4 text-[13px] leading-relaxed text-surface-600">
              <div className="flex items-center gap-1.5 font-bold text-surface-800">
                <Shield className="h-4 w-4 text-brand-600" />
                <span>Security guidelines</span>
              </div>
              <p>• Avoid reusing passwords from other examination portals or personal email.</p>
              <p>• Your session token is stored in a secure same-site cookie.</p>
            </div>

            <div className="flex items-center justify-end border-t border-surface-100 pt-5">
              <button
                type="submit"
                disabled={passwordSaving || !newPasswordStrong}
                className="btn-primary cursor-pointer px-6 py-3"
              >
                {passwordSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                <span>Update password</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Preferences */}
      {activeTab === "preferences" && (
        <div className="max-w-3xl space-y-5 animate-fade-up">
          {prefsSaved && <SuccessBox message="Exam room preferences saved. They apply to all future mock tests." />}

          <div className="card space-y-8 p-6 sm:p-8">
            <SectionHead
              title="CD-IELTS interface presets"
              description="Calibrate your default contrast theme, reading font scale and audio speed to match your test-centre setup."
            />

            <div className="space-y-3">
              <label className="block text-[13px] font-bold uppercase tracking-wide text-surface-700">
                Default colour contrast theme
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { id: "standard", label: "Standard", desc: "Black on white", bg: "bg-white text-surface-900 border-surface-300" },
                  { id: "yellow", label: "High contrast", desc: "Yellow on black", bg: "bg-[#0d0f12] text-[#f7df1e] border-[#2c2f36]" },
                  { id: "inverted", label: "Inverted dark", desc: "White on black", bg: "bg-surface-900 text-white border-surface-700" },
                  { id: "cream", label: "Soft cream", desc: "Brown on cream", bg: "bg-[#fffdf5] text-[#3d2b1f] border-amber-200" },
                ].map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setContrastTheme(th.id as typeof contrastTheme)}
                    className={`cursor-pointer rounded-xl border p-3.5 text-left transition ${th.bg} ${
                      contrastTheme === th.id
                        ? "ring-2 ring-brand-500 ring-offset-2 ring-offset-white"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="text-[13px] font-bold">{th.label}</div>
                    <div className="mt-0.5 text-[11px] opacity-75">{th.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[13px] font-bold uppercase tracking-wide text-surface-700">
                Default reading font size
              </label>
              <div className="grid max-w-md grid-cols-3 gap-3">
                {[
                  { id: "standard", label: "Standard", size: "A" },
                  { id: "medium", label: "Medium", size: "A+" },
                  { id: "large", label: "Large", size: "A++" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFontScale(f.id as typeof fontScale)}
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3.5 text-[13px] font-semibold transition ${
                      fontScale === f.id
                        ? "border-brand-300 bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                        : "border-surface-200 bg-white text-surface-600 hover:bg-surface-50"
                    }`}
                  >
                    <span className="font-mono font-bold">{f.size}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[13px] font-bold uppercase tracking-wide text-surface-700">
                Listening default audio speed
              </label>
              <div className="grid max-w-md grid-cols-3 gap-3">
                {[
                  { val: 0.8, label: "0.8× practice" },
                  { val: 1.0, label: "1.0× exam" },
                  { val: 1.2, label: "1.2× fast drill" },
                ].map((spd) => (
                  <button
                    key={spd.val}
                    type="button"
                    onClick={() => setAudioSpeed(spd.val)}
                    className={`cursor-pointer rounded-xl border p-3.5 text-center text-[13px] font-semibold transition ${
                      audioSpeed === spd.val
                        ? "border-brand-300 bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                        : "border-surface-200 bg-white text-surface-600 hover:bg-surface-50"
                    }`}
                  >
                    {spd.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-surface-100 pt-5">
              <div>
                <div className="text-sm font-bold text-surface-900">10 &amp; 5-minute warning banners</div>
                <p className="mt-0.5 text-[13px] leading-relaxed text-surface-500">
                  Shows official CD-IELTS warning banners as the deadline approaches.
                </p>
              </div>
              <input
                type="checkbox"
                checked={timeAlerts}
                onChange={(e) => setTimeAlerts(e.target.checked)}
                className="h-5 w-5 shrink-0 cursor-pointer accent-brand-600"
              />
            </div>

            <div className="flex items-center justify-end border-t border-surface-100 pt-5">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="btn-primary cursor-pointer px-6 py-3"
              >
                <Save className="h-4 w-4" />
                <span>Save interface presets</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data */}
      {activeTab === "data" && (
        <div className="max-w-3xl space-y-5 animate-fade-up">
          {clearSuccess && <SuccessBox message={clearSuccess} />}

          <div className="card space-y-6 p-6 sm:p-8">
            <SectionHead
              title="Practice history & diagnostics"
              description="Review cached attempts and export a complete record of your practice history."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-500">
                  Local stored attempts
                </div>
                <div className="mt-1.5 font-display text-3xl font-extrabold text-surface-900">
                  {localAttemptsCount} <span className="text-base font-semibold text-surface-400">tests</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-surface-500">
                  Cached in your browser for instant offline access and fast result retrieval.
                </p>
              </div>

              <div className="rounded-2xl border border-surface-200 bg-surface-50 p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-surface-500">
                  Exportable summary
                </div>
                <div className="mt-1.5 font-display text-3xl font-extrabold text-surface-900">JSON</div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-surface-500">
                  Download every submitted answer, band score and test date in one archive.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button type="button" onClick={handleExportData} className="btn-secondary cursor-pointer">
                <Download className="h-4 w-4 text-surface-500" />
                <span>Export diagnostic record</span>
              </button>

              <button type="button" onClick={handleClearData} className="btn-destructive cursor-pointer">
                <Trash2 className="h-4 w-4" />
                <span>Clear local practice cache</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
