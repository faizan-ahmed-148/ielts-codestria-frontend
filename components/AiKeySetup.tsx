"use client";

import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorBox } from "@/components/ui";
import {
  AI_PROVIDERS,
  getAiKeyStatus,
  providerLabel,
  removeAiKey,
  saveAiKey,
  type AiKeyStatus,
  type AiProvider,
} from "@/lib/ai-key";

interface AiKeySettingsProps {
  onSaved?: (status: AiKeyStatus) => void;
  /** Compact mode is used inside the submit-test modal. */
  compact?: boolean;
}

/**
 * Connect one AI provider key. The key is encrypted in the backend and used
 * only to score this candidate's Writing and Speaking attempts.
 */
export function AiKeySettings({ onSaved, compact = false }: AiKeySettingsProps) {
  const [status, setStatus] = useState<AiKeyStatus | null>(null);
  const [provider, setProvider] = useState<AiProvider>("GROQ");
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const current = await getAiKeyStatus();
        if (cancelled) return;
        setStatus(current);
        if (current.provider) setProvider(current.provider);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load your AI key status.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = AI_PROVIDERS.find((p) => p.id === provider)!;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setError("Paste your API key first.");
      return;
    }
    if (selected.keyPrefix && !trimmed.startsWith(selected.keyPrefix)) {
      setError(`${selected.label} keys usually start with "${selected.keyPrefix}". Check the provider you selected.`);
      return;
    }
    setSaving(true);
    try {
      const updated = await saveAiKey(provider, trimmed);
      setStatus(updated);
      setApiKey("");
      setSuccess(`${selected.label} key saved. Writing and Speaking will now use it.`);
      onSaved?.(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your AI key.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    if (!window.confirm("Remove your AI key? Writing and Speaking scoring will stop working until you add a new one.")) {
      return;
    }
    setError("");
    setSuccess("");
    setRemoving(true);
    try {
      const updated = await removeAiKey();
      setStatus(updated);
      setSuccess("AI key removed.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove your AI key.");
    } finally {
      setRemoving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-sm text-surface-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Checking your AI key…
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {!compact && (
        <div className="border-b border-surface-100 pb-4">
          <h2 className="font-display text-lg font-bold text-surface-900">AI scoring key</h2>
          <p className="mt-1 text-sm leading-relaxed text-surface-500">
            Writing and Speaking bands are produced only by an AI model. Connect your own OpenAI, Groq or Anthropic key
            to enable them — only one provider can be active at a time.
          </p>
        </div>
      )}

      {status?.configured && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-bold text-emerald-900">
                {providerLabel(status.provider)} key connected{" "}
                <span className="font-mono font-semibold">{status.hint}</span>
              </p>
              <p className="mt-1 text-xs leading-relaxed text-emerald-800">
                Writing and Speaking attempts will be scored with your key. Replacing it below keeps only one provider
                enabled.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={removing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-60"
          >
            {removing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Remove
          </button>
        </div>
      )}

      {error && <ErrorBox message={error} />}

      {success && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          <Check className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="label">Provider</label>
          <div className={compact ? "grid gap-2" : "grid gap-3 sm:grid-cols-3"}>
            {AI_PROVIDERS.map((p) => {
              const active = provider === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setProvider(p.id);
                    setError("");
                  }}
                  className={`flex items-center justify-between gap-2 rounded-xl border p-3 text-left text-xs font-bold transition ${
                    active
                      ? "border-brand-300 bg-brand-50 text-brand-700 ring-1 ring-brand-200 shadow-xs"
                      : "border-surface-200 bg-white text-surface-700 hover:bg-surface-50"
                  }`}
                >
                  <span>
                    <span className="block">{p.label}</span>
                    <span className="mt-0.5 block text-[11px] font-medium text-surface-500">{p.model}</span>
                  </span>
                  {active && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label className="label mb-0" htmlFor="ai-api-key">
              {selected.label} API key
            </label>
            <a
              href={selected.consoleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
            >
              Get a {selected.label} key <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="relative">
            <input
              id="ai-api-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              placeholder={`${selected.keyPrefix}…`}
              className="input pr-11 font-mono text-[13px]"
            />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center text-surface-400 hover:text-surface-700"
              aria-label={showKey ? "Hide API key" : "Show API key"}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-surface-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Encrypted in the database. Never shown again or sent to the browser.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-100 pt-5">
          <p className="max-w-md text-xs leading-relaxed text-surface-500">
            Reading and Listening do not use AI — they are marked from your correct answers.
          </p>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary inline-flex cursor-pointer items-center gap-2 px-5 py-2.5"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
            {status?.configured ? "Replace key" : "Save key"}
          </button>
        </div>
      </form>

      {status?.configured && status.updatedAt && (
        <p className="text-xs text-surface-400">
          Last updated{" "}
          {new Date(status.updatedAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      )}

      {compact && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-900">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Without a key, Writing and Speaking cannot be scored. You will see an error instead of a band — no estimated
            band is ever created.
          </span>
        </div>
      )}
    </div>
  );
}

export function AiKeyModal({
  open,
  onClose,
  onSaved,
  title = "Connect your AI scoring key",
}: {
  open: boolean;
  onClose: () => void;
  onSaved?: (status: AiKeyStatus) => void;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-950/45 p-4 backdrop-blur-sm">
      <div className="card max-h-[92vh] w-full max-w-xl overflow-y-auto p-6 shadow-2xl animate-fade-up scroll-thin">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-surface-900">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-surface-500">
              Writing and Speaking are graded only by the AI provider you connect. Pick OpenAI, Groq or Anthropic and
              paste your key.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-1.5 text-surface-400 transition hover:bg-surface-100 hover:text-surface-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <AiKeySettings compact onSaved={onSaved} />
      </div>
    </div>
  );
}
