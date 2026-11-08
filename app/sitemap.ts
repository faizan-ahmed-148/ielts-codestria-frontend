import type { MetadataRoute } from "next";

const BASE_URL = "https://ielts.codestria.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core Static Landing & Hub Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tests`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/model-answers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/speaking-practice`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/vocabulary`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/band-descriptors`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/study-plan`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Full Cambridge Books 19 down to 12 Mock Test Routes
  const cambridgeTestPages: MetadataRoute.Sitemap = [];
  const books = [19, 18, 17, 16, 15, 14, 13, 12];
  const tracks = ["academic", "general"];
  const testsPerBook = [1, 2, 3, 4];

  for (const book of books) {
    for (const track of tracks) {
      for (const testNum of testsPerBook) {
        cambridgeTestPages.push({
          url: `${BASE_URL}/tests/c${book}-${track}-${testNum}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: book === 19 ? 0.85 : 0.75,
        });
      }
    }
  }

  return [...staticPages, ...cambridgeTestPages];
}
