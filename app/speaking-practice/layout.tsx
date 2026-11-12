/**
 * Pass-through layout. Index metadata and JSON-LD live in page.tsx so the
 * nested [slug] pages don't inherit the index's breadcrumbs/structured data.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
