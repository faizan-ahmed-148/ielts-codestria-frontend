import type { Metadata } from "next";
import { privateMetadata } from "@/lib/seo";

export const metadata: Metadata = privateMetadata(
  "Log in",
  "Log in to your Codestria IELTS account to continue your IELTS mock tests and review your band scores.",
  "/login",
);

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
