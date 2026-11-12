import type { Guide, GuideCategory } from "./types";
import { READING_LISTENING_GUIDES } from "./reading-listening";
import { WRITING_SPEAKING_GUIDES } from "./writing-speaking";

export type { Guide, GuideBlock, GuideCategory, GuideFaq } from "./types";

/** Display order of categories on /guides. */
export const GUIDE_CATEGORIES: GuideCategory[] = ["Writing", "Speaking", "Reading", "Listening", "Exam Strategy"];

/** Every guide, de-duplicated by slug. */
export const GUIDES: Guide[] = (() => {
  const seen = new Set<string>();
  return [...WRITING_SPEAKING_GUIDES, ...READING_LISTENING_GUIDES].filter((guide) => {
    if (seen.has(guide.slug)) return false;
    seen.add(guide.slug);
    return true;
  });
})();

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

/** Non-empty categories in display order, each with its guides. */
export function guidesByCategory(): { category: GuideCategory; guides: Guide[] }[] {
  return GUIDE_CATEGORIES.map((category) => ({
    category,
    guides: GUIDES.filter((guide) => guide.category === category),
  })).filter((group) => group.guides.length > 0);
}

/** Same-category guides first, then others, excluding the guide itself. */
export function relatedGuides(guide: Guide, n = 3): Guide[] {
  const others = GUIDES.filter((g) => g.slug !== guide.slug);
  const same = others.filter((g) => g.category === guide.category);
  const rest = others.filter((g) => g.category !== guide.category);
  return [...same, ...rest].slice(0, n);
}

/** Converts heading text into a stable anchor id. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\*\*/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
