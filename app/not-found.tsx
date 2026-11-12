import { ArrowLeft, BookOpen, Calculator, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-container flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <span className="badge-neutral">
        <Search className="h-3.5 w-3.5" />
        Error 404
      </span>
      <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-surface-900 sm:text-5xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-base leading-relaxed text-surface-500">
        The link may be out of date. Your saved attempts are safe — head back to the test library or
        use one of the shortcuts below.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary px-5 py-3">
          <Home className="h-4 w-4" />
          Go to homepage
        </Link>
        <Link href="/tests" className="btn-secondary px-5 py-3">
          <BookOpen className="h-4 w-4 text-surface-500" />
          Browse practice tests
        </Link>
        <Link href="/calculator" className="btn-secondary px-5 py-3">
          <Calculator className="h-4 w-4 text-surface-500" />
          Band calculator
        </Link>
      </div>

      <Link
        href="/tests"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-surface-500 transition hover:text-surface-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the test library
      </Link>
    </main>
  );
}
