import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT_EMAIL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Codestria IELTS collects, uses and protects your data, including cookies, Google Analytics, Google AdSense advertising, AI scoring and your privacy rights.",
  path: "/privacy-policy",
});

const UPDATED = "2026-11-12";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      updated={UPDATED}
      intro={
        <p>
          This policy explains what information Codestria IELTS (&ldquo;we&rdquo;, &ldquo;us&rdquo;), available at
          ielts.codestria.com and operated by Codestria, collects when you use the website, why we collect it, who we
          share it with and the choices you have. You can use most of the site, including every practice tool, without
          creating an account.
        </p>
      }
      sections={[
        {
          id: "information-we-collect",
          title: "1. Information we collect",
          body: (
            <>
              <p>
                <strong>Account information.</strong> If you register, we store your name, e-mail address and a securely
                hashed password (we never store your password in plain text). You may also save optional study details
                such as your test track, target band and exam date.
              </p>
              <p>
                <strong>Practice data.</strong> When you are signed in we store your test attempts, answers, scores,
                Writing responses, Speaking transcripts, study plan and vocabulary progress so you can see your history and
                progress.
              </p>
              <p>
                <strong>AI provider key (optional).</strong> If you add your own OpenAI, Groq or Anthropic API key to get
                AI feedback, it is stored encrypted and only the last few characters are shown back to you. You can remove
                it at any time from your profile.
              </p>
              <p>
                <strong>Usage data.</strong> We record how pages and features are used (for example pages viewed, buttons
                clicked, test modules started and errors), together with your browser&rsquo;s user-agent and a one-way
                hashed version of your IP address. We do not record what you type into text fields.
              </p>
              <p>
                <strong>Messages.</strong> If you e-mail us, we keep the message and your address to reply.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use",
          title: "2. How we use information",
          body: (
            <ul>
              <li>To provide the service: run tests, mark answers, show results, save progress and reset passwords.</li>
              <li>To generate AI feedback on Writing and Speaking when you request it.</li>
              <li>To understand how the site is used, fix problems and improve features.</li>
              <li>To keep the site secure and prevent abuse.</li>
              <li>To show advertising that keeps the site free (see section 4).</li>
            </ul>
          ),
        },
        {
          id: "cookies",
          title: "3. Cookies and similar technologies",
          body: (
            <>
              <p>We and our partners use cookies and similar technologies:</p>
              <ul>
                <li>
                  <strong>Essential:</strong> keeping you signed in and remembering security settings. These are required
                  for the site to work.
                </li>
                <li>
                  <strong>Analytics:</strong> Google Analytics 4 measures visits and feature usage in aggregate.
                </li>
                <li>
                  <strong>Advertising:</strong> Google AdSense and its partners use cookies to serve and measure ads.
                </li>
              </ul>
              <p>
                Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent before
                analytics and advertising cookies are used, through a consent message provided by Google. Until you choose,
                those cookies stay off. You can change your choice at any time using the &ldquo;Privacy and cookie
                settings&rdquo; link shown by the consent message, or by clearing cookies in your browser.
              </p>
            </>
          ),
        },
        {
          id: "advertising",
          title: "4. Advertising (Google AdSense)",
          body: (
            <>
              <p>
                We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on
                your prior visits to this website or other websites. Google&rsquo;s use of advertising cookies enables it
                and its partners to serve ads to you based on your visits to this and/or other sites on the Internet.
              </p>
              <p>
                You may opt out of personalised advertising by visiting{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                  Google Ads Settings
                </a>
                , or opt out of some third-party vendors&rsquo; use of cookies for personalised advertising at{" "}
                <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
                  www.aboutads.info
                </a>
                . Learn more in{" "}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                  how Google uses information from sites that use its services
                </a>
                .
              </p>
              <p>Ads are never shown inside the timed exam room.</p>
            </>
          ),
        },
        {
          id: "sharing",
          title: "5. Who we share information with",
          body: (
            <>
              <p>We do not sell your personal information. We share it only with:</p>
              <ul>
                <li>
                  <strong>Google</strong> for analytics (Google Analytics) and advertising (Google AdSense), as described
                  above.
                </li>
                <li>
                  <strong>The AI provider you choose</strong> (OpenAI, Groq or Anthropic). When you ask for AI feedback, the
                  relevant prompt and your answer are sent to that provider using your own key, under that provider&rsquo;s
                  terms.
                </li>
                <li>
                  <strong>Your browser&rsquo;s speech service.</strong> Speaking practice uses your browser&rsquo;s built-in
                  speech recognition. Some browsers (for example Chrome) process that audio on their own servers.
                </li>
                <li>
                  <strong>Service providers</strong> that host the site and send e-mail (such as password-reset messages)
                  on our behalf.
                </li>
                <li>Authorities, when the law requires it.</li>
              </ul>
            </>
          ),
        },
        {
          id: "retention",
          title: "6. How long we keep data",
          body: (
            <p>
              We keep account and practice data while your account exists. You can clear your practice history at any
              time from your profile. Password-reset links expire automatically. Usage records are kept in aggregate or
              with hashed identifiers and are deleted when they are no longer needed for improving the service.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "7. Your rights and choices",
          body: (
            <>
              <p>Depending on where you live, you may have the right to:</p>
              <ul>
                <li>access the personal data we hold about you (your profile includes a one-click data export);</li>
                <li>correct inaccurate data;</li>
                <li>delete your practice history (from your profile) or your whole account (e-mail us);</li>
                <li>object to or restrict certain processing, and withdraw consent at any time;</li>
                <li>complain to your local data-protection authority.</li>
              </ul>
              <p>
                To make a request, e-mail <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the address linked
                to your account. We aim to reply within 30 days.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "8. Security",
          body: (
            <p>
              Data is sent over HTTPS, passwords are hashed and AI keys are encrypted at rest. No online service is
              perfectly secure, so please use a unique password for your account.
            </p>
          ),
        },
        {
          id: "children",
          title: "9. Children",
          body: (
            <p>
              The site is intended for people aged 13 and over. If you are under the age required to consent to data
              processing in your country, please use the site with a parent or guardian&rsquo;s permission, or without
              an account.
            </p>
          ),
        },
        {
          id: "changes",
          title: "10. Changes and contact",
          body: (
            <p>
              We may update this policy; the &ldquo;last updated&rdquo; date above shows the latest version. Questions?
              E-mail <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or use our{" "}
              <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
      ]}
    />
  );
}
