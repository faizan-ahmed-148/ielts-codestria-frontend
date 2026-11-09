import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${SITE_NAME} · Official CD Simulator`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "en-GB",
    dir: "ltr",
    background_color: "#f7f9fc",
    theme_color: "#4356e8",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/codestria-app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/codestria-icon-rounded-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/codestria-icon-1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
    shortcuts: [
      {
        name: "Practice tests",
        short_name: "Tests",
        description: "Browse Cambridge Academic and General Training mock tests",
        url: "/tests",
        icons: [{ src: "/codestria-icon-512.png", sizes: "512x512", type: "image/png" }],
      },
      {
        name: "Band calculator",
        short_name: "Calculator",
        description: "Convert raw marks into an official IELTS band score",
        url: "/calculator",
        icons: [{ src: "/codestria-icon-512.png", sizes: "512x512", type: "image/png" }],
      },
      {
        name: "Speaking practice",
        short_name: "Speaking",
        description: "Practise IELTS Speaking Part 2 cue cards",
        url: "/speaking-practice",
        icons: [{ src: "/codestria-icon-512.png", sizes: "512x512", type: "image/png" }],
      },
      {
        name: "Vocabulary lab",
        short_name: "Vocabulary",
        description: "Build high-scoring academic vocabulary",
        url: "/vocabulary",
        icons: [{ src: "/codestria-icon-512.png", sizes: "512x512", type: "image/png" }],
      },
    ],
  };
}
