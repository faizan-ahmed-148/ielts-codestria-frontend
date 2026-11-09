import type { Metadata } from "next";
import { BreadcrumbsJsonLd, QuizJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata, parseTestSlug } from "@/lib/seo";

function identity(id: string) {
  const parsed = parseTestSlug(id);
  if (!parsed) return null;
  return {
    ...parsed,
    typeLabel: parsed.type === "GENERAL" ? "General Training" : "Academic",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const test = identity(id);

  if (!test) {
    return pageMetadata({
      title: "Cambridge IELTS Practice Test",
      description:
        "Practise a full Cambridge IELTS paper with computer-delivered Reading and Listening modules, Writing tasks and Speaking cue cards.",
      path: `/tests/${id}`,
      keywords: ["Cambridge IELTS practice test", "IELTS mock test"],
      noindex: true,
    });
  }

  return pageMetadata({
    title: `Cambridge ${test.book} · ${test.typeLabel} Test ${test.testNumber} (Full CD-IELTS Exam)`,
    description: `Sit full Cambridge ${test.book} ${test.typeLabel} Test ${test.testNumber} under official British Council and IDP computer-delivered conditions, with instant Reading and Listening band scoring and examiner answer rationales.`,
    path: `/tests/${id}`,
    keywords: [
      `Cambridge IELTS ${test.book}`,
      `Cambridge ${test.book} ${test.typeLabel}`,
      `IELTS ${test.typeLabel} Test ${test.testNumber}`,
      "full IELTS mock test",
      "computer delivered IELTS",
    ],
  });
}

export default async function TestDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const test = identity(id);
  const url = absoluteUrl(`/tests/${id}`);

  if (!test) {
    return (
      <>
        <BreadcrumbsJsonLd
          items={[
            { name: "Home", url: absoluteUrl("/") },
            { name: "Cambridge Tests Library", url: absoluteUrl("/tests") },
            { name: "Practice Test", url },
          ]}
        />
        {children}
      </>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: absoluteUrl("/") },
    {
      name: `${test.typeLabel} Tests`,
      url: absoluteUrl(`/tests?type=${test.type}`),
    },
    { name: `Cambridge ${test.book}`, url: absoluteUrl("/tests") },
    { name: `Test ${test.testNumber}`, url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <QuizJsonLd
        name={`Cambridge ${test.book} ${test.typeLabel} Test ${test.testNumber}`}
        description={`Full Cambridge IELTS ${test.typeLabel} paper with Reading, Listening, Writing and Speaking modules.`}
        url={url}
        about={[
          "IELTS Reading",
          "IELTS Listening",
          "IELTS Writing",
          "IELTS Speaking",
        ]}
      />
      {children}
    </>
  );
}
