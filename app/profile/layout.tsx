import type { Metadata } from "next";
import { BreadcrumbsJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Candidate Profile & Examination Settings · Codestria IELTS",
  description:
    "Manage your Codestria IELTS candidate profile, update your credentials, set target band goals, configure CD-IELTS exam room accessibility themes, and manage security settings.",
  alternates: {
    canonical: "https://ielts.codestria.com/profile",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = [
    { name: "Home", url: "https://ielts.codestria.com" },
    { name: "Candidate Profile & Settings", url: "https://ielts.codestria.com/profile" },
  ];

  return (
    <>
      <BreadcrumbsJsonLd items={breadcrumbs} />
      {children}
    </>
  );
}
