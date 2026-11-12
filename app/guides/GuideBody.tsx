import { Fragment, type ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import { slugifyHeading, type GuideBlock } from "@/lib/guides";

/** Renders **bold** markers as <strong> without injecting HTML. */
export function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-semibold text-surface-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Splits text on blank lines into paragraphs, keeping single line breaks. */
function MultiLine({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i}>
          {para.split("\n").map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {renderInline(line)}
            </Fragment>
          ))}
        </p>
      ))}
    </>
  );
}

/** Assigns unique anchor ids to every h2 block, in order. */
export function headingIds(body: GuideBlock[]): Map<number, string> {
  const ids = new Map<number, string>();
  const used = new Map<string, number>();
  body.forEach((block, index) => {
    if (block.type !== "h2") return;
    const base = slugifyHeading(block.text) || `section-${index}`;
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    ids.set(index, count === 0 ? base : `${base}-${count + 1}`);
  });
  return ids;
}

export function GuideBlockView({ block, id }: { block: GuideBlock; id?: string }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={id}
          className="scroll-mt-24 pt-4 font-display text-xl font-bold tracking-tight text-surface-900 sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-lg font-bold text-surface-900">{block.text}</h3>;
    case "p":
      return <p>{renderInline(block.text)}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-brand-500">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-brand-600">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case "tip":
      return (
        <div className="flex gap-3 rounded-2xl border border-amber-200/80 bg-amber-50 p-4 text-amber-900">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
          <div>
            <span className="font-semibold">Tip: </span>
            {renderInline(block.text)}
          </div>
        </div>
      );
    case "example":
      return (
        <figure className="rounded-2xl border border-brand-200/70 bg-brand-50/60 p-4 sm:p-5">
          {block.title && (
            <figcaption className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-brand-700">
              {block.title}
            </figcaption>
          )}
          <div className="space-y-3 text-surface-800">
            <MultiLine text={block.text} />
          </div>
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-surface-200">
          <table className="w-full min-w-[480px] border-collapse text-left text-[14px]">
            <thead className="bg-surface-50 text-surface-900">
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col" className="px-3 py-2.5 font-semibold">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-surface-100 align-top">
                  {row.map((cell, c) => (
                    <td key={c} className={`px-3 py-2.5 ${c === 0 ? "font-medium text-surface-800" : ""}`}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
