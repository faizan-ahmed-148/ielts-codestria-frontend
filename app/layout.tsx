import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/AppShell";
import { AuthProvider } from "@/components/AuthProvider";
import { GoogleTag } from "@/components/GoogleTag";
import { JsonLd } from "@/components/JsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  PUBLISHER_URL,
  SITE_NAME,
  SITE_TWITTER,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f6f8fc",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Codestria", url: PUBLISHER_URL }],
  creator: "Codestria",
  publisher: `Codestria (${PUBLISHER_URL})`,
  generator: "Next.js",
  category: "Education",
  keywords: DEFAULT_KEYWORDS,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
        type: "image/png",
      },
    ],
    locale: "en_GB",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site: SITE_TWITTER,
    creator: SITE_TWITTER,
    images: [{ url: OG_IMAGE, alt: OG_IMAGE_ALT }],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/codestria-app-icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "apple-touch-icon-precomposed", url: "/apple-touch-icon.png" }],
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
  // Google Search Console HTML-tag verification (set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "msapplication-TileColor": "#4356e8",
    "msapplication-config": "none",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-friendly site summary" />
        <JsonLd />
      </head>
      <body className="min-h-full font-sans text-surface-900 bg-surface-50 selection:bg-brand-500/15 selection:text-brand-800">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
        <Suspense fallback={null}>
          <GoogleTag />
        </Suspense>
      </body>
    </html>
  );
}
