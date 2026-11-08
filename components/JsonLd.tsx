export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://ielts.codestria.com/#website",
        "url": "https://ielts.codestria.com",
        "name": "Codestria IELTS",
        "alternateName": "Codestria IELTS Simulator",
        "description":
          "Official-Standard Computer-Delivered CD-IELTS Simulation Platform with Cambridge Books 19 down to 12. Instant Band 9 scoring and examiner rationales.",
        "publisher": {
          "@id": "https://ielts.codestria.com/#organization",
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://ielts.codestria.com/tests?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        "inLanguage": "en-GB",
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://ielts.codestria.com/#organization",
        "name": "Codestria IELTS",
        "url": "https://ielts.codestria.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ielts.codestria.com/codestria-logo.png",
          "contentUrl": "https://ielts.codestria.com/codestria-logo.png",
          "width": "1069",
          "height": "339",
        },
        "image": "https://ielts.codestria.com/codestria-logo-with-name-dark-1600x600.png",
        "description":
          "Leading Computer-Delivered CD-IELTS simulator and preparation lab. Engineered by Codestria software and AI studio.",
        "parentOrganization": {
          "@type": "Organization",
          "name": "Codestria",
          "url": "https://codestria.com",
          "sameAs": ["https://codestria.com/"],
        },
        "sameAs": ["https://codestria.com/"],
      },
      {
        "@type": "ItemList",
        "@id": "https://ielts.codestria.com/#sitelinks",
        "name": "Codestria IELTS Core Sitelinks",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Academic Mock Tests",
            "description": "Authentic Cambridge Academic IELTS full tests (Books 19 down to 12)",
            "url": "https://ielts.codestria.com/tests?type=ACADEMIC",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "General Training Tests",
            "description": "Cambridge General Training mock tests with workplace texts and letters",
            "url": "https://ielts.codestria.com/tests?type=GENERAL",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "IELTS Band Score Calculator",
            "description": "Official Cambridge rounding calculator (.25 and .75 boundaries) and raw mark converter",
            "url": "https://ielts.codestria.com/calculator",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Band 9 Model Essays",
            "description": "Cambridge examiner annotated model essays and Band 6 comparisons",
            "url": "https://ielts.codestria.com/model-answers",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Speaking Practice Studio",
            "description": "Part 2 cue card simulator with 1-min prep and live voice recording",
            "url": "https://ielts.codestria.com/speaking-practice",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": "Academic Vocabulary Lab",
            "description": "High-yield Academic Word List (AWL) collocations and native audio drills",
            "url": "https://ielts.codestria.com/vocabulary",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 7,
            "name": "Official Band Descriptors",
            "description": "Public examiner assessment rubrics for Writing Task 1, 2 and Speaking",
            "url": "https://ielts.codestria.com/band-descriptors",
          },
          {
            "@type": "SiteNavigationElement",
            "position": 8,
            "name": "Study Roadmap & Plan",
            "description": "Personalized IELTS milestone schedule and daily checklist",
            "url": "https://ielts.codestria.com/study-plan",
          },
        ],
      },
      {
        "@type": "LearningResource",
        "@id": "https://ielts.codestria.com/#learning-resource",
        "name": "Cambridge IELTS Computer-Delivered Simulation Course",
        "description":
          "Authentic Cambridge Academic and General Training examination practice (Books 19 down to 12) featuring 3-color text highlighters, candidate notes scratchpad, timed audio tracks, and automated Band 9 examiner assessment.",
        "educationalLevel": ["B2", "C1", "C2"],
        "inLanguage": "en-GB",
        "isAccessibleForFree": true,
        "provider": {
          "@id": "https://ielts.codestria.com/#organization",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://ielts.codestria.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the Codestria Computer-Delivered IELTS simulator work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "The Codestria IELTS platform replicates authentic British Council and IDP Computer-Delivered test conditions with 3-color text highlighters (Yellow, Mint, Lavender), candidate notes scratchpad, draggable split-pane passage viewer, official 10-minute and 5-minute alerts, and timed audio playback.",
            },
          },
          {
            "@type": "Question",
            "name": "Are Cambridge IELTS Books 12 to 19 free to practice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Yes. Codestria IELTS provides free, full-length Academic and General Training examination papers from Cambridge Books 19 down to 12, including 40-question Reading and Listening modules with instant marking.",
            },
          },
          {
            "@type": "Question",
            "name": "How is the IELTS overall band score calculated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "The overall band score is the average of Listening, Reading, Writing, and Speaking scores. If the average ends in .25, it rounds up to the next half band (e.g., 6.25 becomes 6.5); if it ends in .75, it rounds up to the next whole band (e.g., 6.75 becomes 7.0).",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
}
