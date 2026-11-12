import type { Metadata } from "next";
import { Fragment } from "react";
import { AdBanner } from "@/components/AdBanner";
import { BreadcrumbsJsonLd, CollectionPageJsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/ui";
import { GUIDES, guidesByCategory } from "@/lib/guides";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { GuideCard } from "./GuideCard";

const TITLE = "IELTS Guides · Writing, Speaking, Reading & Listening Tips";
const DESCRIPTION =
  "Free, practical IELTS guides with worked examples: Writing Task 1 and Task 2 structures, Speaking strategies, Reading and Listening techniques, and exam-day advice.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/guides",
  keywords: [
    "IELTS guides",
    "IELTS tips",
    "IELTS writing guide",
    "IELTS speaking tips",
    "IELTS reading strategies",
    "IELTS listening tips",
    "IELTS test format",
  ],
});

function categoryId(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export default function GuidesIndexPage() {
  const url = absoluteUrl("/guides");
  const groups = guidesByCategory();

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Guides", url },
        ]}
      />
      <CollectionPageJsonLd
        name="IELTS Guides"
        description={DESCRIPTION}
        url={url}
        items={GUIDES.map((g) => ({ name: g.title, url: absoluteUrl(`/guides/${g.slug}`) }))}
      />

      <div className="page-container space-y-10 py-8 sm:py-10">
        <PageHeader
          eyebrow="Study guides"
          title="IELTS guides and strategies"
          description="Step-by-step guides to every part of the IELTS test. Each one explains what the examiner is looking for and shows it in action with structures, sample answers and useful language you can practise straight away."
        />

        {groups.length > 1 && (
          <nav aria-label="Guide categories" className="flex flex-wrap gap-2">
            {groups.map(({ category, guides }) => (
              <a key={category} href={`#${categoryId(category)}`} className="badge-neutral hover:border-brand-300 hover:text-brand-700">
                {category} <span className="text-surface-400">{guides.length}</span>
              </a>
            ))}
          </nav>
        )}

        {groups.map(({ category, guides }, index) => (
          <Fragment key={category}>
            <section id={categoryId(category)} aria-labelledby={`${categoryId(category)}-heading`} className="scroll-mt-24">
              <h2
                id={`${categoryId(category)}-heading`}
                className="font-display text-xl font-bold tracking-tight text-surface-900 sm:text-2xl"
              >
                {category}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </section>
            {index === 0 && groups.length > 1 && <AdBanner placement="display" />}
          </Fragment>
        ))}
      </div>
    </>
  );
}
