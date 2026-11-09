import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only truly private or non-content routes are blocked. Pages that
        // should stay out of the index (login, dashboard, profile, attempt
        // results) are individually marked noindex so crawlers can read the
        // directive instead of being locked out.
        disallow: ["/api/", "/attempt/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/attempt/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/attempt/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: "ielts.codestria.com",
  };
}
