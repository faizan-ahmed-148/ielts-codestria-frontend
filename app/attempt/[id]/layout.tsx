import type { Metadata } from "next";
import { NoAdsZone } from "@/components/NoAdsZone";
import { privateMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return privateMetadata(
    "Test attempt",
    "Your private Codestria IELTS attempt. Answers and results are visible only to you.",
    `/attempt/${id}`,
  );
}

export default function AttemptLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoAdsZone />
      {children}
    </>
  );
}
