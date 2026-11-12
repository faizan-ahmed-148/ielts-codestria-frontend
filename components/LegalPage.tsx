import Link from "next/link";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export interface LegalSection {
  id: string;
  title: string;
  body: React.ReactNode;
}

/** Shared server-rendered layout for policy and information pages. */
export function LegalPage({
  title,
  path,
  intro,
  updated,
  sections,
}: {
  title: string;
  path: string;
  intro: React.ReactNode;
  /** ISO date, e.g. "2026-11-12". */
  updated?: string;
  sections: LegalSection[];
}) {
  return (
    <div className="page-container py-10 sm:py-14">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: title, url: absoluteUrl(path) },
        ]}
      />
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-surface-500">
        <Link href="/" className="hover:text-surface-800">
          Home
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-surface-700">{title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
        <article className="min-w-0 max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">{title}</h1>
          {updated && (
            <p className="mt-2 text-sm text-surface-500">
              Last updated:{" "}
              <time dateTime={updated}>
                {new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </p>
          )}
          <div className="legal-prose mt-6 text-[15px] leading-relaxed text-surface-600">{intro}</div>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-10 scroll-mt-24">
              <h2 className="font-display text-xl font-bold text-surface-900">{section.title}</h2>
              <div className="legal-prose mt-3 space-y-3 text-[15px] leading-relaxed text-surface-600">
                {section.body}
              </div>
            </section>
          ))}
        </article>

        {sections.length > 3 && (
          <aside className="hidden lg:block">
            <div className="card sticky top-24 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-surface-500">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-surface-600 hover:text-brand-600">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
