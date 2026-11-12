/* ------------------------------------------------------------------ */
/*  JSON-LD structured data (schema.org)                              */
/*  One small, reusable component per schema type.                    */
/* ------------------------------------------------------------------ */

const SITE = "https://ielts.codestria.com";
const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

/** Serialises JSON-LD safely inside a <script> tag. */
function safeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Site-wide graph                                                   */
/* ------------------------------------------------------------------ */

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE,
        name: "Codestria IELTS",
        alternateName: "Codestria IELTS Simulator",
        description:
          "Free computer-delivered IELTS practice platform with full-length Academic and General Training mock tests, instant objective marking and AI examiner feedback.",
        publisher: { "@id": ORG_ID },
        inLanguage: "en-GB",
      },
      {
        "@type": "EducationalOrganization",
        "@id": ORG_ID,
        name: "Codestria IELTS",
        url: SITE,
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/codestria-logo.png`,
          contentUrl: `${SITE}/codestria-logo.png`,
          width: 1069,
          height: 339,
        },
        image: `${SITE}/codestria-logo-with-name-dark-1600x600.png`,
        description:
          "Computer-Delivered CD-IELTS simulator and preparation lab engineered by the Codestria software and AI studio.",
        parentOrganization: {
          "@type": "Organization",
          name: "Codestria",
          url: "https://codestria.com",
        },
        email: "mail.codestria@gmail.com",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "mail.codestria@gmail.com",
          availableLanguage: ["English"],
        },
        sameAs: ["https://codestria.com/"],
      },
      {
        "@type": "WebApplication",
        "@id": `${SITE}/#application`,
        name: "Codestria IELTS Simulator",
        url: SITE,
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "IELTS exam simulation",
        operatingSystem: "Web browser",
        browserRequirements: "Requires JavaScript and a modern browser",
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        provider: { "@id": ORG_ID },
        featureList: [
          "IELTS Academic and General Training mock tests",
          "Computer-delivered Reading and Listening interface",
          "Three-colour text highlighters and scratchpad",
          "Instant Reading and Listening band scoring",
          "AI examiner feedback for Writing and Speaking",
          "Band score calculator and study roadmap",
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE}/#sitelinks`,
        name: "Codestria IELTS Core Sitelinks",
        itemListElement: [
          {
            "@type": "SiteNavigationElement",
            position: 1,
            name: "Academic Mock Tests",
            description: "Full-length IELTS Academic mock tests",
            url: `${SITE}/tests?type=ACADEMIC`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 2,
            name: "General Training Tests",
            description: "IELTS General Training mock tests with workplace texts and letters",
            url: `${SITE}/tests?type=GENERAL`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 3,
            name: "IELTS Band Score Calculator",
            description: "IELTS band rounding calculator and raw mark converter",
            url: `${SITE}/calculator`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 4,
            name: "Band 9 Model Essays",
            description: "Examiner-style annotated model essays and Band 6 comparisons",
            url: `${SITE}/model-answers`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 5,
            name: "Speaking Practice Studio",
            description: "Part 2 cue card simulator with preparation timer and recording",
            url: `${SITE}/speaking-practice`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 6,
            name: "Academic Vocabulary Lab",
            description: "High-yield Academic Word List collocations and pronunciation drills",
            url: `${SITE}/vocabulary`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 7,
            name: "Official Band Descriptors",
            description: "Public examiner assessment rubrics for Writing and Speaking",
            url: `${SITE}/band-descriptors`,
          },
          {
            "@type": "SiteNavigationElement",
            position: 8,
            name: "Study Roadmap & Plan",
            description: "Personalised IELTS milestone schedule and daily checklist",
            url: `${SITE}/study-plan`,
          },
        ],
      },
      {
        "@type": "LearningResource",
        "@id": `${SITE}/#learning-resource`,
        name: "IELTS Computer-Delivered Practice Course",
        description:
          "IELTS Academic and General Training exam practice featuring three-colour text highlighters, candidate notes scratchpad, timed audio tracks and automated examiner assessment.",
        educationalLevel: ["B2", "C1", "C2"],
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        provider: { "@id": ORG_ID },
      },
    ],
  };

  return <JsonLdScript data={structuredData} />;
}

/* ------------------------------------------------------------------ */
/*  Breadcrumbs                                                       */
/* ------------------------------------------------------------------ */

export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript data={breadcrumbData} />;
}

/* ------------------------------------------------------------------ */
/*  Page-level schemas                                                */
/* ------------------------------------------------------------------ */

export function WebApplicationJsonLd({
  name,
  description,
  url,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "@id": `${url}#application`,
        name,
        description,
        url,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web browser",
        browserRequirements: "Requires JavaScript and a modern browser",
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        provider: { "@type": "Organization", name: "Codestria", url: "https://codestria.com" },
        ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
      }}
    />
  );
}

export function LearningResourceJsonLd({
  name,
  description,
  url,
  educationalLevel = ["B2", "C1", "C2"],
  teaches,
}: {
  name: string;
  description: string;
  url: string;
  educationalLevel?: string[];
  teaches?: string[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "@id": `${url}#learning-resource`,
        name,
        description,
        url,
        educationalLevel,
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        learningResourceType: "Exam preparation",
        ...(teaches?.length ? { teaches } : {}),
        provider: { "@type": "Organization", name: "Codestria", url: "https://codestria.com" },
      }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  url,
  steps,
}: {
  name: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${url}#how-to`,
        name,
        description,
        url,
        inLanguage: "en-GB",
        totalTime: "PT5M",
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
          url: `${url}#step-${index + 1}`,
        })),
      }}
    />
  );
}

export function QuizJsonLd({
  name,
  description,
  url,
  educationalLevel = ["B2", "C1", "C2"],
  about,
}: {
  name: string;
  description: string;
  url: string;
  educationalLevel?: string[];
  about?: string[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Quiz",
        "@id": `${url}#quiz`,
        name,
        description,
        url,
        educationalLevel,
        inLanguage: "en-GB",
        isAccessibleForFree: true,
        ...(about?.length ? { about: about.map((item) => ({ "@type": "Thing", name: item })) } : {}),
        provider: { "@type": "Organization", name: "Codestria", url: "https://codestria.com" },
      }}
    />
  );
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name,
        description,
        url,
        inLanguage: "en-GB",
        isPartOf: { "@type": "WebSite", name: "Codestria IELTS", url: SITE },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            url: item.url,
          })),
        },
      }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}
