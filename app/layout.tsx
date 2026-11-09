import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/AppShell";
import { AuthProvider } from "@/components/AuthProvider";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0b132b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ielts.codestria.com"),
  title: {
    default: "Codestria IELTS · Official Computer-Delivered CD-IELTS Simulator",
    template: "%s | Codestria IELTS",
  },
  description:
    "Official-standard Computer-Delivered IELTS simulator. Practice authentic Cambridge IELTS Books 19 down to 12 (Academic & General Training) with 3-color text highlighters, scratchpad, audio player, instant Band 9 scoring, and detailed examiner answer rationales. Engineered by Codestria.",
  applicationName: "Codestria IELTS",
  authors: [{ name: "Codestria", url: "https://codestria.com" }],
  generator: "Next.js",
  keywords: [
    "IELTS",
    "IELTS Academic",
    "IELTS General Training",
    "Cambridge IELTS 19",
    "Cambridge IELTS 18",
    "Cambridge IELTS Books",
    "CD-IELTS Simulation",
    "Computer Delivered IELTS",
    "British Council IELTS Mock Test",
    "IDP IELTS Practice Test",
    "IELTS Reading Highlighters",
    "IELTS Band 9 Essays",
    "IELTS Speaking Cue Cards",
    "IELTS Band Score Calculator",
    "IELTS Test Report Form TRF",
    "CEFR C1 C2 English",
    "Codestria",
    "Codestria IELTS",
    "Online IELTS Practice Free",
    "IELTS Academic Reading Passages",
    "IELTS Listening Transcripts",
  ],
  creator: "Codestria",
  publisher: "Codestria (https://codestria.com)",
  category: "Education",
  alternates: {
    canonical: "https://ielts.codestria.com",
    languages: {
      "en-GB": "https://ielts.codestria.com",
      "en-US": "https://ielts.codestria.com",
    },
  },
  openGraph: {
    title: "Codestria IELTS · Official Computer-Delivered CD-IELTS Simulator",
    description:
      "Practice authentic Cambridge IELTS Academic & General Training mock tests (Books 19 down to 12) with real exam highlighters, timed audio, instant Band 9 marking, and examiner rationales. Engineered by Codestria.",
    url: "https://ielts.codestria.com",
    siteName: "Codestria IELTS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codestria IELTS Official CD-Simulator",
        type: "image/png",
      },
      {
        url: "/codestria-logo-with-name-dark-1600x600.png",
        width: 1600,
        height: 600,
        alt: "Codestria Software & AI Studio",
        type: "image/png",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codestria IELTS · Official Computer-Delivered CD-IELTS Simulator",
    description:
      "Full Cambridge IELTS examination papers (Books 19 down to 12) under genuine British Council & IDP CD-IELTS test conditions. Instant Band 9 scoring.",
    site: "@codestria",
    creator: "@codestria",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/codestria-app-icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full font-sans text-zinc-900 bg-[#fcfcfd] selection:bg-indigo-500/15 selection:text-indigo-700">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
