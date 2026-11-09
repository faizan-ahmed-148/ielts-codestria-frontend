import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";

export const metadata: Metadata = privateMetadata(
  "Your dashboard",
  "Your Codestria IELTS dashboard: current test, recent attempts and band progress across Listening, Reading, Writing and Speaking.",
  "/dashboard",
);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
