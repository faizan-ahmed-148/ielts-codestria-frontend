import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const parts = id.split("-");
  const book = parts[0]?.startsWith("c") ? parseInt(parts[0].slice(1), 10) || 19 : 19;
  const isGeneral = id.includes("general");
  const typeLabel = isGeneral ? "General Training" : "Academic";
  const testNumber = parseInt(parts[2] || "1", 10) || 1;

  const title = `Cambridge ${book} · ${typeLabel} Test ${testNumber} (Full CD-IELTS Exam)`;
  const description = `Practice full Cambridge ${book} ${typeLabel} Test ${testNumber} under official British Council and IDP Computer-Delivered examination conditions. Instant Band 9 scoring and complete answer rationales.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://ielts.codestria.com/tests/${id}`,
    },
    openGraph: {
      title: `${title} | Codestria IELTS`,
      description,
      url: `https://ielts.codestria.com/tests/${id}`,
      type: "website",
    },
  };
}

export default async function TestDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parts = id.split("-");
  const book = parts[0]?.startsWith("c") ? parseInt(parts[0].slice(1), 10) || 19 : 19;
  const isGeneral = id.includes("general");
  const typeLabel = isGeneral ? "General Training" : "Academic";
  const testNumber = parseInt(parts[2] || "1", 10) || 1;

  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    {
      name: `${typeLabel} Tests`,
      url: `https://ielts.codestria.com/tests?type=${isGeneral ? "GENERAL" : "ACADEMIC"}`,
    },
    { name: `Cambridge ${book}`, url: `https://ielts.codestria.com/tests` },
    { name: `Test ${testNumber}`, url: `https://ielts.codestria.com/tests/${id}` },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
