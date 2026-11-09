import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";

export const metadata: Metadata = privateMetadata(
  "Candidate Profile & Examination Settings",
  "Manage your Codestria IELTS candidate profile, target band, accessibility settings and AI scoring key.",
  "/profile",
);

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
