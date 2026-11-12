"use client";

import { Check, Link2, Loader2, Share2 } from "lucide-react";
import { useState } from "react";
import { track as trackEvent } from "@/lib/analytics";
import type { ModuleKind } from "@/lib/content.types";

const W = 1200;
const H = 630;
const BRAND = "#4356e8";
const BRAND_DARK = "#2b3582";
const TESTS_URL = "https://ielts.codestria.com/tests";
const MODULES: { key: ModuleKind; label: string; colour: string }[] = [
  { key: "LISTENING", label: "Listening", colour: "#0284c7" },
  { key: "READING", label: "Reading", colour: "#059669" },
  { key: "WRITING", label: "Writing", colour: "#d97706" },
  { key: "SPEAKING", label: "Speaking", colour: BRAND },
];

export interface ShareScoreCardProps {
  track: "ACADEMIC" | "GENERAL";
  overallBand: number | null;
  bands: Partial<Record<ModuleKind, number | null>>;
  testTitle?: string;
}

/** True when there is at least one band worth sharing. */
export function hasShareableScore({ overallBand, bands }: Pick<ShareScoreCardProps, "overallBand" | "bands">) {
  return overallBand !== null || Object.values(bands).some((b) => typeof b === "number");
}

function fontStack(weight: number, size: number) {
  return `${weight} ${size}px "Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Draws the 1200×630 share image and resolves to a PNG blob. */
export async function renderScoreCard({ track, overallBand, bands, testTitle }: ShareScoreCardProps): Promise<Blob> {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {}
  }
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");

  // Background: brand gradient with soft decorative circles.
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, BRAND);
  bg.addColorStop(1, BRAND_DARK);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.beginPath();
  ctx.arc(W - 60, 40, 260, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(80, H + 40, 220, 0, Math.PI * 2);
  ctx.fill();

  // Header: site name + track badge.
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 64, 56, 48, 48, 12);
  ctx.fill();
  ctx.fillStyle = BRAND;
  ctx.font = fontStack(800, 26);
  ctx.textAlign = "center";
  ctx.fillText("C", 88, 90);
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = fontStack(800, 30);
  ctx.fillText("Codestria IELTS", 128, 91);

  const trackLabel = track === "GENERAL" ? "General Training" : "Academic";
  ctx.font = fontStack(700, 20);
  const badgeW = ctx.measureText(trackLabel.toUpperCase()).width + 40;
  ctx.fillStyle = "rgba(255,255,255,0.16)";
  roundRect(ctx, W - 64 - badgeW, 58, badgeW, 44, 22);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(trackLabel.toUpperCase(), W - 64 - badgeW / 2, 87);

  // White content panel.
  const px = 64;
  const py = 136;
  const pw = W - 128;
  const ph = 400;
  ctx.save();
  ctx.shadowColor = "rgba(15, 23, 42, 0.25)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, px, py, pw, ph, 28);
  ctx.fill();
  ctx.restore();

  // Overall band (left).
  const leftCx = px + 210;
  ctx.textAlign = "center";
  ctx.fillStyle = "#64748b";
  ctx.font = fontStack(700, 20);
  ctx.fillText(overallBand !== null ? "OVERALL BAND" : "MY IELTS PRACTICE", leftCx, py + 70);

  const ringCy = py + 220;
  const ringR = 112;
  ctx.lineWidth = 18;
  ctx.strokeStyle = "#e4eaff";
  ctx.beginPath();
  ctx.arc(leftCx, ringCy, ringR, 0, Math.PI * 2);
  ctx.stroke();
  const ringBand =
    overallBand ??
    (() => {
      const vals = Object.values(bands).filter((b): b is number => typeof b === "number");
      return vals.length ? Math.max(...vals) : 0;
    })();
  ctx.strokeStyle = BRAND;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(leftCx, ringCy, ringR, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * Math.max(0, Math.min(9, ringBand))) / 9);
  ctx.stroke();
  ctx.lineCap = "butt";

  ctx.fillStyle = "#0f172a";
  ctx.textBaseline = "middle";
  if (overallBand !== null) {
    ctx.font = fontStack(800, 96);
    ctx.fillText(overallBand.toFixed(1), leftCx, ringCy + 4);
  } else {
    ctx.font = fontStack(800, 30);
    ctx.fillText("In progress", leftCx, ringCy);
  }
  ctx.textBaseline = "alphabetic";

  // Divider.
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px + 420, py + 48);
  ctx.lineTo(px + 420, py + ph - 48);
  ctx.stroke();

  // Module bands (right, 2×2 grid).
  const gx = px + 470;
  const gy = py + 48;
  const cellW = 300;
  const cellH = 140;
  const gap = 24;
  MODULES.forEach((m, i) => {
    const x = gx + (i % 2) * (cellW + gap);
    const y = gy + Math.floor(i / 2) * (cellH + gap);
    ctx.fillStyle = "#f8fafc";
    roundRect(ctx, x, y, cellW, cellH, 20);
    ctx.fill();
    ctx.fillStyle = m.colour;
    roundRect(ctx, x, y + 24, 6, cellH - 48, 3);
    ctx.fill();

    ctx.textAlign = "left";
    ctx.fillStyle = "#475569";
    ctx.font = fontStack(700, 22);
    ctx.fillText(m.label, x + 32, y + 50);

    const band = bands[m.key];
    ctx.font = fontStack(800, 60);
    ctx.fillStyle = typeof band === "number" ? "#0f172a" : "#cbd5e1";
    ctx.fillText(typeof band === "number" ? band.toFixed(1) : "–", x + 32, y + 115);
  });

  // Footer.
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = fontStack(600, 22);
  const sub = testTitle ? `${testTitle} · Free computer-delivered IELTS practice` : "Free computer-delivered IELTS practice";
  ctx.fillText(sub.length > 70 ? `${sub.slice(0, 67)}…` : sub, 64, H - 40);
  ctx.textAlign = "right";
  ctx.fillStyle = "#ffffff";
  ctx.font = fontStack(800, 26);
  ctx.fillText("ielts.codestria.com", W - 64, H - 40);

  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not create the image."))), "image/png"),
  );
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/** "Share my score" + "Copy link to free tests" buttons. Renders nothing without a band. */
export function ShareScoreCard(props: ShareScoreCardProps & { className?: string }) {
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  if (!hasShareableScore(props)) return null;

  async function share() {
    if (busy) return;
    setBusy(true);
    setMessage("");
    try {
      const blob = await renderScoreCard(props);
      const filename = `ielts-score-${props.overallBand !== null ? props.overallBand.toFixed(1) : "practice"}.png`;
      const file = new File([blob], filename, { type: "image/png" });
      const text =
        props.overallBand !== null
          ? `I scored band ${props.overallBand.toFixed(1)} on a free IELTS practice test. Try one: ${TESTS_URL}`
          : `My IELTS practice scores so far. Try a free test: ${TESTS_URL}`;
      const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };
      if (nav.share && nav.canShare?.({ files: [file] })) {
        try {
          await nav.share({ files: [file], title: "My IELTS score", text });
          trackEvent("score_shared", { method: "native" });
        } catch (err) {
          if ((err as Error)?.name !== "AbortError") throw err;
        }
      } else {
        download(blob, filename);
        trackEvent("score_shared", { method: "download" });
        setMessage("Image downloaded. Share it anywhere!");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not create the share image.");
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(TESTS_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setMessage(`Copy this link: ${TESTS_URL}`);
    }
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${props.className ?? ""}`}>
      <button
        type="button"
        onClick={share}
        disabled={busy}
        className="btn-primary text-xs px-3 py-2 inline-flex items-center gap-1.5"
        title="Create a shareable image of your score"
      >
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Share2 className="h-3.5 w-3.5" />}
        <span>{busy ? "Creating…" : "Share my score"}</span>
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="btn-secondary text-xs px-3 py-2 inline-flex items-center gap-1.5"
        title={TESTS_URL}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Link2 className="h-3.5 w-3.5 text-surface-500" />}
        <span>{copied ? "Link copied" : "Copy link to free tests"}</span>
      </button>
      {message && <span className="text-xs text-surface-500" role="status">{message}</span>}
    </div>
  );
}
