import { Suspense } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { FaqJsonLd } from "@/components/JsonLd";
import { Skeleton } from "@/components/ui";
import ExamCountdownClient from "./ExamCountdownClient";

const PREP_TIME = [
  { gap: "0.5 band", time: "About 4–8 weeks", note: "Usually one weak skill to fix — often Writing or Speaking technique." },
  { gap: "1.0 band", time: "About 2–3 months", note: "Steady daily practice plus regular timed tests and feedback." },
  { gap: "1.5 bands", time: "About 3–5 months", note: "Needs real growth in vocabulary and grammar, not just exam technique." },
  { gap: "2.0 bands or more", time: "6 months or longer", note: "Consider a general English course alongside IELTS practice." },
];

const FAQ = [
  {
    question: "How long does it take to prepare for IELTS?",
    answer:
      "It depends on the gap between your current level and your target. As a rough guide, raising your overall score by half a band takes around 4–8 weeks of focused study, and a full band often takes 2–3 months. Taking a timed practice test first is the best way to measure the gap.",
  },
  {
    question: "Is one month enough to prepare for IELTS?",
    answer:
      "One month is usually enough to learn the test format, practise timing and fix a single weak area, which can be worth up to half a band. It is rarely enough to raise your underlying English level by a full band.",
  },
  {
    question: "How many hours a day should I study for IELTS?",
    answer:
      "One to two hours of focused practice most days is sustainable for most candidates. Consistency matters more than long sessions: daily vocabulary review, regular writing with feedback and weekly timed tests work better than occasional cramming.",
  },
  {
    question: "What should I do in the last week before IELTS?",
    answer:
      "Sit one final mock early in the week, then switch to light review of your error log and key vocabulary. Confirm your test centre, time and ID, plan your journey, and prioritise sleep in the last few nights.",
  },
  {
    question: "Does the countdown save my exam date?",
    answer:
      "Your exam date and target band are stored in the page link, so you can bookmark or share it. The page also remembers them in your browser so your dashboard can show the countdown.",
  },
];

/** Server-rendered guidance and FAQ below the interactive countdown. */
function CountdownGuide() {
  return (
    <section className="page-container space-y-6 pb-12" aria-labelledby="prep-guide">
      <FaqJsonLd faqs={FAQ} />
      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <h2 id="prep-guide" className="font-display text-lg font-bold text-surface-900">
          How long should you prepare for IELTS?
        </h2>
        <p>
          The time you need depends mostly on the gap between your current band and your target. Exam technique
          can be learned in a few weeks, but moving up a full band normally needs real improvement in vocabulary,
          grammar and fluency, which takes longer. The figures below are rough guides for someone studying one to
          two hours most days — start with a{" "}
          <Link href="/tests" className="font-semibold text-brand-600 hover:underline">
            full practice test
          </Link>{" "}
          to measure your own gap.
        </p>
      </div>

      <div className="card overflow-x-auto p-5 sm:p-6">
        <table className="w-full min-w-[520px] text-left text-[13px] text-surface-600">
          <thead className="text-surface-800">
            <tr>
              <th className="py-1.5 pr-3 font-semibold">Band gap to target</th>
              <th className="py-1.5 pr-3 font-semibold">Typical preparation time</th>
              <th className="py-1.5 font-semibold">What it usually involves</th>
            </tr>
          </thead>
          <tbody>
            {PREP_TIME.map((row) => (
              <tr key={row.gap} className="border-t border-surface-100">
                <td className="py-1.5 pr-3 font-semibold text-surface-900">{row.gap}</td>
                <td className="py-1.5 pr-3">{row.time}</td>
                <td className="py-1.5">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-[12.5px] text-surface-500">
          Estimates only — progress varies widely between learners and skills.
        </p>
      </div>

      <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-surface-600">
        <p>
          Whatever your timeline, a good plan follows the same order: diagnose, build foundations, practise each
          skill, then rehearse under full test conditions. Use the{" "}
          <Link href="/calculator" className="font-semibold text-brand-600 hover:underline">
            band score calculator
          </Link>{" "}
          to see which module scores reach your target overall band, and the{" "}
          <Link href="/study-plan" className="font-semibold text-brand-600 hover:underline">
            study roadmap
          </Link>{" "}
          for a daily checklist.
        </p>
      </div>

      <AdBanner placement="display" />

      <h2 className="font-display text-lg font-bold text-surface-900">Frequently asked questions</h2>
      <div className="space-y-3">
        {FAQ.map((item) => (
          <details key={item.question} className="card group p-5 transition hover:border-brand-200 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[15px] font-bold text-surface-900">
              <span>{item.question}</span>
              <ChevronDown className="h-4.5 w-4.5 shrink-0 text-surface-400 transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-surface-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function ExamCountdownPage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="page-container space-y-6 py-8 sm:py-10">
            <Skeleton className="h-28" />
            <Skeleton className="h-40" />
          </div>
        }
      >
        <ExamCountdownClient />
      </Suspense>
      <CountdownGuide />
    </>
  );
}
