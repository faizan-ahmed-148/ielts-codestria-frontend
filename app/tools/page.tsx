import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { BreadcrumbsJsonLd, CollectionPageJsonLd } from "@/components/JsonLd";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { TOOLS, TOOL_GROUPS } from "@/lib/tools";

const TITLE = "Free IELTS Practice Tools";
const DESCRIPTION =
  "Every free IELTS tool in one place: mock tests, writing checker, listening dictation, reading speed test, grammar exercises, flashcards, band calculator and score converter.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/tools",
  keywords: ["free IELTS tools", "IELTS practice online free", "IELTS writing checker", "IELTS score converter", "IELTS dictation"],
});

export default function ToolsPage() {
  const url = absoluteUrl("/tools");
  return (
    <div className="page-container py-10 sm:py-14">
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: TITLE, url },
        ]}
      />
      <CollectionPageJsonLd
        name={TITLE}
        description={DESCRIPTION}
        url={url}
        items={TOOLS.map((tool) => ({ name: tool.title, url: absoluteUrl(tool.href) }))}
      />
      <p className="eyebrow">100% free</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-surface-900 sm:text-4xl">{TITLE}</h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-surface-600">
        Practise every part of the IELTS test with tools that work in your browser. Most need no account; sign in free
        to save your progress and get AI feedback on Writing and Speaking.
      </p>

      {TOOL_GROUPS.map((group, i) => (
        <section key={group} className="mt-10" aria-labelledby={`group-${i}`}>
          <h2 id={`group-${i}`} className="font-display text-lg font-bold text-surface-900">
            {group}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.filter((tool) => tool.group === group).map((tool) => (
              <Link key={tool.href} href={tool.href} className="card card-hover group flex flex-col p-5">
                <h3 className="text-[15px] font-bold text-surface-900">{tool.title}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-surface-600">{tool.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
          {i === 0 && <AdBanner placement="display" />}
        </section>
      ))}

      <AdBanner placement="multiplex" />

      <section className="card mt-4 p-6">
        <h2 className="font-display text-lg font-bold text-surface-900">Not sure where to start?</h2>
        <p className="mt-2 text-sm leading-relaxed text-surface-600">
          Take one full <Link href="/tests" className="font-semibold text-brand-600 hover:underline">mock test</Link> to
          find your weakest module, then read the matching{" "}
          <Link href="/guides" className="font-semibold text-brand-600 hover:underline">IELTS guide</Link> and drill it
          with the tools above.
        </p>
      </section>
    </div>
  );
}
