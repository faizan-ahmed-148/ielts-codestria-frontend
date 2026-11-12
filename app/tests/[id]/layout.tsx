import type { Metadata } from "next";
import { BreadcrumbsJsonLd, QuizJsonLd } from "@/components/JsonLd";
import { absoluteUrl, isCataloguedTest, pageMetadata, parseTestSlug } from "@/lib/seo";

function identity(id: string) {
  const parsed = parseTestSlug(id);
  // Slugs outside the finite catalogue (e.g. c19-academic-99) are not real
  // papers: serve them but keep them out of the index.
  if (!parsed || !isCataloguedTest(parsed)) return null;
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
      title: "IELTS Practice Test",
      description:
        "Practise a full IELTS-style mock test with computer-delivered Reading and Listening modules, Writing tasks and Speaking cue cards.",
      path: `/tests/${id}`,
      keywords: ["IELTS practice test", "IELTS mock test"],
      noindex: true,
    });
  }

  return pageMetadata({
    title: `IELTS ${test.typeLabel} Practice Test · Book ${test.book} Test ${test.testNumber}`,
    description: `Sit Book ${test.book} ${test.typeLabel} Test ${test.testNumber}, a full IELTS-style mock exam in the computer-delivered format, with instant Reading and Listening band scoring and examiner answer rationales.`,
    path: `/tests/${id}`,
    keywords: [
      `IELTS ${test.typeLabel} practice test`,
      `IELTS ${test.typeLabel} mock test`,
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
            { name: "IELTS Tests Library", url: absoluteUrl("/tests") },
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
    { name: `Book ${test.book}`, url: absoluteUrl("/tests") },
    { name: `Test ${test.testNumber}`, url },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      <QuizJsonLd
        name={`IELTS ${test.typeLabel} Practice Test · Book ${test.book} Test ${test.testNumber}`}
        description={`Full IELTS-style ${test.typeLabel} mock test with Reading, Listening, Writing and Speaking modules.`}
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
