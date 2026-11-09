import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";

export const metadata: Metadata = privateMetadata(
  "Create your account",
  "Create a free Codestria IELTS account to save attempts, track progress and unlock AI examiner feedback.",
  "/register",
);

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
