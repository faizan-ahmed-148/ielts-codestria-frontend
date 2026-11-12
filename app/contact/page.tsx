import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact the Codestria IELTS team to report a mistake in a test, suggest a feature, ask about your account or request your data.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact Us"
      path="/contact"
      intro={
        <>
          <p>We read every message. The fastest way to reach us is by e-mail:</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="btn-primary mt-4 inline-flex items-center gap-2 px-5 py-3 text-sm !text-white no-underline"
          >
            <Mail className="h-4 w-4" />
            {CONTACT_EMAIL}
          </a>
          <p className="mt-4">We usually reply within two working days.</p>
        </>
      }
      sections={[
        {
          id: "what-to-include",
          title: "Help us help you",
          body: (
            <ul>
              <li>
                <strong>Mistake in a test or answer key:</strong> include the test name (for example &ldquo;Academic Book 19
                Test 1&rdquo;), the module and the question number.
              </li>
              <li>
                <strong>Technical problem:</strong> tell us your browser and device and what you were doing when it
                happened.
              </li>
              <li>
                <strong>Account or data request:</strong> e-mail us from the address linked to your account. See the{" "}
                <Link href="/privacy-policy">Privacy Policy</Link> for your rights.
              </li>
              <li>
                <strong>Feature ideas:</strong> we would love to hear what would help your preparation most.
              </li>
            </ul>
          ),
        },
        {
          id: "note",
          title: "Please note",
          body: (
            <p>
              We are an independent practice website, so we cannot book IELTS tests, change official results or answer
              questions about a specific test centre. Please contact your test provider for those.
            </p>
          ),
        },
      ]}
    />
  );
}
