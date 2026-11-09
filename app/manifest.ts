import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codestria IELTS · Official CD Simulator",
    short_name: "Codestria IELTS",
    description:
      "Official Computer-Delivered CD-IELTS Simulator with authentic Cambridge Books 19 down to 12. Engineered by Codestria.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#4356e8",
    icons: [
      {
        src: "/codestria-app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
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
  };
}
