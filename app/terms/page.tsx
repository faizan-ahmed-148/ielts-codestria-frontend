import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for Codestria IELTS: free IELTS practice tests and tools, accounts, acceptable use, AI feedback, estimated band scores, intellectual property and disclaimers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      updated="2026-11-12"
      intro={
        <p>
          These terms apply to your use of Codestria IELTS at ielts.codestria.com, operated by Codestria. By using the
          site you agree to them. If you do not agree, please do not use the site.
        </p>
      }
      sections={[
        {
          id: "service",
          title: "1. The service",
          body: (
            <p>
              Codestria IELTS provides free IELTS-style practice tests, practice tools, guides and model answers. The
              service is provided free of charge and is supported by advertising. We may add, change or remove features at
              any time.
            </p>
          ),
        },
        {
          id: "not-official",
          title: "2. Independent practice, not the official test",
          body: (
            <>
              <p>
                IELTS® is a registered trademark of Cambridge University Press &amp; Assessment, the British Council and
                IDP Education. Codestria IELTS is an independent practice product. It is not affiliated with, endorsed by
                or connected to those organisations. All practice tests are original material written in the style of the
                exam.
              </p>
              <p>
                Band scores shown on this site, including AI-generated Writing and Speaking bands, are{" "}
                <strong>estimates for practice only</strong>. They are not official results and cannot be used for
                applications. Your real result may differ.
              </p>
            </>
          ),
        },
        {
          id: "accounts",
          title: "3. Accounts",
          body: (
            <ul>
              <li>Give accurate information and keep your password private.</li>
              <li>You are responsible for activity on your account.</li>
              <li>We may suspend accounts that break these terms or harm the service.</li>
            </ul>
          ),
        },
        {
          id: "acceptable-use",
          title: "4. Acceptable use",
          body: (
            <>
              <p>You agree not to:</p>
              <ul>
                <li>copy, scrape or republish our tests, guides or model answers in bulk;</li>
                <li>attempt to break, overload or gain unauthorised access to the service;</li>
                <li>use automated tools to click ads or generate fake traffic;</li>
                <li>submit unlawful, abusive or infringing content.</li>
              </ul>
            </>
          ),
        },
        {
          id: "ai",
          title: "5. AI feedback and your API key",
          body: (
            <p>
              AI feedback uses an API key that you supply from a third-party provider (OpenAI, Groq or Anthropic). Use of
              that provider is governed by its own terms and pricing, and any charges are between you and the provider. AI
              feedback may contain mistakes; use it as guidance, not as a definitive assessment.
            </p>
          ),
        },
        {
          id: "content",
          title: "6. Intellectual property",
          body: (
            <p>
              The site&rsquo;s design, code, tests, guides and model answers belong to Codestria. You may use them for your
              own personal study. Writing and Speaking responses you submit remain yours; you allow us to store and process
              them to provide the service.
            </p>
          ),
        },
        {
          id: "disclaimer",
          title: "7. Disclaimer and limitation of liability",
          body: (
            <p>
              The service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that the site
              will be uninterrupted or error-free, or that using it will lead to any particular exam result. To the extent
              permitted by law, Codestria is not liable for indirect or consequential losses arising from use of the site.
              Nothing in these terms limits liability that cannot be limited by law.
            </p>
          ),
        },
        {
          id: "links",
          title: "8. Third-party links and ads",
          body: (
            <p>
              The site shows ads and may link to other websites. We are not responsible for the content, products or
              policies of third parties.
            </p>
          ),
        },
        {
          id: "changes",
          title: "9. Changes and contact",
          body: (
            <p>
              We may update these terms; continued use after an update means you accept the new version. See also our{" "}
              <Link href="/privacy-policy">Privacy Policy</Link>. Questions:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
