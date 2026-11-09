import type { ChartSpec } from "@/lib/content.types";

const COLORS = ["#2754e0", "#f59e0b", "#10b981", "#e11d48", "#8b5cf6", "#0ea5e9", "#64748b", "#d946ef", "#84cc16"];

/** Renders the Writing Task 1 chart from its data. */
export function ChartView({ chart }: { chart: ChartSpec }) {
  return (
    <figure className="rounded-xl border border-surface-200 bg-white p-4">
      <figcaption className="mb-3 text-center text-sm font-semibold">
        {chart.title}{chart.unit ? ` (${chart.unit})` : ""}
      </figcaption>
      {chart.kind === "table" ? <Table chart={chart} /> : chart.kind === "pie" ? <Pie chart={chart} /> : <Axes chart={chart} />}
      {chart.kind !== "table" && chart.series.length > 1 && (
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs">
          {chart.series.map((s, i) => (
            <span key={s.name} className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} /> {s.name}
            </span>
          ))}
        </div>
      )}
    </figure>
  );
}

function Table({ chart }: { chart: ChartSpec }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-300">
            <th className="p-2 text-left" />
            {chart.labels.map((l) => <th key={l} className="p-2 text-right font-semibold">{l}</th>)}
          </tr>
        </thead>
        <tbody>
          {chart.series.map((s) => (
            <tr key={s.name} className="border-b border-surface-100">
              <td className="p-2 font-medium">{s.name}</td>
              {s.values.map((v, i) => <td key={i} className="p-2 text-right tabular-nums">{v.toLocaleString()}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pie({ chart }: { chart: ChartSpec }) {
  const values = chart.series[0]?.values ?? [];
  const total = values.reduce((a, b) => a + b, 0) || 1;
  let angle = -Math.PI / 2;
  const slices = values.map((v, i) => {
    const start = angle;
    angle += (v / total) * 2 * Math.PI;
    const large = angle - start > Math.PI ? 1 : 0;
    const p = (a: number) => `${100 + 90 * Math.cos(a)} ${100 + 90 * Math.sin(a)}`;
    return <path key={i} d={`M100 100 L${p(start)} A90 90 0 ${large} 1 ${p(angle)} Z`} fill={COLORS[i % COLORS.length]} stroke="#fff" strokeWidth="1.5" />;
  });
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <svg viewBox="0 0 200 200" className="h-48 w-48">{slices}</svg>
      <ul className="space-y-1 text-sm">
        {chart.labels.map((l, i) => (
          <li key={l} className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm" style={{ background: COLORS[i % COLORS.length] }} /> {l}: <strong>{values[i]}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Axes({ chart }: { chart: ChartSpec }) {
  const W = 560, H = 280, L = 48, B = 40, T = 10, R = 10;
  const max = Math.max(...chart.series.flatMap((s) => s.values), 1);
  const step = niceStep(max / 5);
  const top = Math.ceil(max / step) * step;
  const y = (v: number) => T + (1 - v / top) * (H - T - B);
  const band = (W - L - R) / chart.labels.length;
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#e2e8f0" />
          <text x={L - 6} y={y(t) + 4} fontSize="11" textAnchor="end" fill="#64748b">{+t.toFixed(2)}</text>
        </g>
      ))}
      {chart.labels.map((l, i) => (
        <text key={l} x={L + band * (i + 0.5)} y={H - B + 18} fontSize="11" textAnchor="middle" fill="#334155">{l}</text>
      ))}
      {chart.kind === "bar"
        ? chart.series.map((s, si) => {
            const w = (band * 0.75) / chart.series.length;
            return s.values.map((v, i) => (
              <rect key={`${si}-${i}`} x={L + band * i + band * 0.125 + w * si} y={y(v)} width={w - 2} height={y(0) - y(v)} fill={COLORS[si % COLORS.length]} rx="2">
                <title>{`${s.name}, ${chart.labels[i]}: ${v}`}</title>
              </rect>
            ));
          })
        : chart.series.map((s, si) => (
            <g key={s.name}>
              <polyline fill="none" stroke={COLORS[si % COLORS.length]} strokeWidth="2.5"
                points={s.values.map((v, i) => `${L + band * (i + 0.5)},${y(v)}`).join(" ")} />
              {s.values.map((v, i) => (
                <circle key={i} cx={L + band * (i + 0.5)} cy={y(v)} r="3.5" fill={COLORS[si % COLORS.length]}>
                  <title>{`${s.name}, ${chart.labels[i]}: ${v}`}</title>
                </circle>
              ))}
            </g>
          ))}
      <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="#94a3b8" />
    </svg>
  );
}

function niceStep(raw: number) {
  const pow = 10 ** Math.floor(Math.log10(raw || 1));
  const n = raw / pow;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * pow;
}
