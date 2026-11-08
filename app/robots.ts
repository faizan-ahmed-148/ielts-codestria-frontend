import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/attempt/",
          "/api/",
          "/forgot-password",
          "/reset-password",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/attempt/", "/api/"],
      },
    ],
    sitemap: "https://ielts.codestria.com/sitemap.xml",
    host: "https://ielts.codestria.com",
  };
}
