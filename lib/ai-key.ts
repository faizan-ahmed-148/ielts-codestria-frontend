import { api } from "./api";

export const AI_PROVIDERS = [
  {
    id: "OPENAI",
    label: "OpenAI",
    keyPrefix: "sk-",
    consoleUrl: "https://platform.openai.com/api-keys",
    model: "gpt-4o-mini",
  },
  {
    id: "GROQ",
    label: "Groq",
    keyPrefix: "gsk_",
    consoleUrl: "https://console.groq.com/keys",
    model: "openai/gpt-oss-120b",
  },
  {
    id: "ANTHROPIC",
    label: "Anthropic",
    keyPrefix: "sk-ant-",
    consoleUrl: "https://console.anthropic.com/settings/keys",
    model: "claude-3-5-sonnet",
  },
] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number]["id"];

import { track } from "@/lib/analytics";

export interface AiKeyStatus {
  configured: boolean;
  provider: AiProvider | null;
  hint: string | null;
  updatedAt: string | null;
}

export function providerLabel(provider: AiProvider | null | undefined): string {
  return AI_PROVIDERS.find((p) => p.id === provider)?.label ?? "AI provider";
}

/** Status only — the key itself is never returned by the API. */
export async function getAiKeyStatus(): Promise<AiKeyStatus> {
  return api<AiKeyStatus>("/auth/ai-key");
}

/** Saves one provider + key; replaces any previously stored key. */
export async function saveAiKey(provider: AiProvider, apiKey: string): Promise<AiKeyStatus> {
  const status = await api<AiKeyStatus>("/auth/ai-key", { method: "PUT", body: { provider, apiKey } });
  track("ai_key_saved", { provider });
  return status;
}

export async function removeAiKey(): Promise<AiKeyStatus> {
  const status = await api<AiKeyStatus>("/auth/ai-key", { method: "DELETE" });
  track("ai_key_removed");
  return status;
}
