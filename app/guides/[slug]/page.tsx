import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, ChevronRight, Clock, ListChecks } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { BreadcrumbsJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { GUIDES, getGuide, relatedGuides, type Guide } from "@/lib/guides";
import { LOGO_IMAGE, OG_IMAGE, SITE_NAME, absoluteUrl, pageMetadata } from "@/lib/seo";
import { GuideBlockView, headingIds, renderInline } from "../GuideBody";
import { GuideCard } from "../GuideCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    type: "article",
    publishedTime: guide.published,
    modifiedTime: guide.updated,
  });
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/** Article structured data for a guide. */
function ArticleJsonLd({ guide, url }: { guide: Guide; url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: guide.title,
    description: guide.description,
    url,
    mainEntityOfPage: url,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: "en-GB",
    articleSection: guide.category,
    keywords: guide.keywords.join(", "),
    image: absoluteUrl(OG_IMAGE),
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_IMAGE) },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const url = absoluteUrl(`/guides/${guide.slug}`);
  const ids = headingIds(guide.body);
  const toc = [...ids.entries()].map(([index, id]) => ({ id, text: (guide.body[index] as { text: string }).text }));
  // In-article ads sit between sections (never beside the TOC or link lists):
  // before the 2nd h2 and before the 5th h2, plus one before the FAQs.
  const h2Indexes = [...ids.keys()];
  const adBefore = new Set([h2Indexes[1], h2Indexes[4]].filter((i): i is number => i !== undefined));
  const related = relatedGuides(guide, 3);

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Guides", url: absoluteUrl("/guides") },
          { name: guide.title, url },
        ]}
      />
      <ArticleJsonLd guide={guide} url={url} />
      <FaqJsonLd faqs={guide.faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <div className="page-container py-8 sm:py-10">
        <article className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-surface-500">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-brand-600 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/guides" className="hover:text-brand-600 hover:underline">
                  Guides
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link
                  href={`/guides#${guide.category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="font-medium text-surface-700 hover:text-brand-600 hover:underline"
                >
                  {guide.category}
                </Link>
              </li>
            </ol>
          </nav>

          <header className="space-y-4 border-b border-surface-200 pb-6">
            <span className="badge-brand">{guide.category}</span>
            <h1 className="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-surface-900 sm:text-4xl">
              {guide.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-surface-500">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" aria-hidden />
                Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden />
                {guide.readMinutes} min read
              </span>
            </div>
          </header>

          <div className="card-muted mt-6 p-5 text-[15px] leading-relaxed text-surface-700">
            <p className="eyebrow mb-2">In short</p>
            <p>{renderInline(guide.summary)}</p>
          </div>

          {toc.length > 0 && (
            <nav aria-labelledby="toc-heading" className="card mt-6 p-5">
              <p id="toc-heading" className="mb-3 inline-flex items-center gap-2 text-[15px] font-bold text-surface-900">
                <ListChecks className="h-4 w-4 text-brand-600" aria-hidden />
                Contents
              </p>
              <ol className="list-decimal space-y-1.5 pl-5 text-[14px] marker:text-surface-400">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-surface-700 hover:text-brand-600 hover:underline">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="mt-8 space-y-5 text-[16px] leading-relaxed text-surface-700">
            {guide.body.map((block, index) => (
              <Fragment key={index}>
                {adBefore.has(index) && <AdBanner placement="in-article" className="!my-8" />}
                <GuideBlockView block={block} id={ids.get(index)} />
              </Fragment>
            ))}
          </div>

          <AdBanner placement="in-article" className="my-10" />

          {guide.faqs.length > 0 && (
            <section aria-labelledby="faq-heading" className="space-y-4">
              <h2 id="faq-heading" className="font-display text-xl font-bold tracking-tight text-surface-900 sm:text-2xl">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {guide.faqs.map((faq) => (
                  <div key={faq.q} className="card p-4 sm:p-5">
                    <h3 className="text-[15px] font-semibold text-surface-900">{faq.q}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-surface-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {guide.related.length > 0 && (
            <section aria-labelledby="practice-heading" className="mt-10">
              <h2 id="practice-heading" className="font-display text-lg font-bold text-surface-900">
                Practise what you have learned
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {guide.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="card-hover flex items-center justify-between gap-3 p-4 text-[14px] font-semibold text-surface-800"
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="card-dark mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <h2 className="font-display text-lg font-bold">Ready to test yourself?</h2>
              <p className="mt-1 text-[14px] text-surface-300">
                Sit a full-length, timed IELTS-style mock test with instant band scoring.
              </p>
            </div>
            <Link href="/tests" className="btn-primary shrink-0">
              Start a mock test
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="related-guides-heading" className="mt-10">
              <h2 id="related-guides-heading" className="font-display text-lg font-bold text-surface-900">
                Related guides
              </h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((g) => (
                  <GuideCard key={g.slug} guide={g} compact />
                ))}
              </div>
            </section>
          )}

          <AdBanner placement="multiplex" className="mt-10" />
        </article>
      </div>
    </>
  );
}
