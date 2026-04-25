/**
 * CON.4 — Analytics view
 *
 * KPI row · revenue trend (line) · sessions heatmap · energy mix donut
 * top-10 stations bar · station performance table · customer insights panel
 * Date range picker · export stubs
 *
 * Visual rules:
 * - Numbers in font-mono (Geist Mono)
 * - All chart colors via tokens (var(--grid-red), var(--color-warning), etc.)
 * - Light + dark mode via @gridpower/tokens [data-theme="dark"] cascade
 * - Grid motif via DotGrid from @gridpower/ui
 */

import * as React from "react";
import {
  LineChart,
  BarChart,
  HeatmapChart,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  cn,
} from "@gridpower/ui";
import { Download, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import {
  type Period,
  KPI_BY_PERIOD,
  getRevenueSeries,
  SESSIONS_HEATMAP_ROWS,
  SESSIONS_HEATMAP_COLS,
  HEATMAP_PATTERN,
  ENERGY_MIX_BY_PERIOD,
  getTopStations,
  getStationPerformance,
  CUSTOMER_INSIGHTS_BY_PERIOD,
} from "~/mocks/analytics";

// ─── Loading state hook (simulates async fetch on period change) ──────────────

function useAnalyticsLoad(period: Period): {
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = React.useState(false);
  const [error] = React.useState<string | null>(null);
  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, [period]);
  return { loading, error };
}

// ─── Inline notice (toast-style replacement for alert()) ──────────────────────

function InlineNotice({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-label shadow-sm"
    >
      {message}
    </div>
  );
}

// ─── Date range picker ────────────────────────────────────────────────────────

const PERIODS: Period[] = ["Today", "7D", "30D", "90D"];

const PERIOD_ARIA: Record<Period, string> = {
  Today: "Show today's analytics",
  "7D": "Show last 7 days analytics",
  "30D": "Show last 30 days analytics",
  "90D": "Show last 90 days analytics",
};

interface PeriodPickerProps {
  value: Period;
  onChange: (p: Period) => void;
  onCustomClick: () => void;
}

function PeriodPicker({ value, onChange, onCustomClick }: PeriodPickerProps) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="group"
      aria-label="Date range"
    >
      {PERIODS.map((p) => {
        const active = value === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={PERIOD_ARIA[p]}
            aria-pressed={active}
            className={cn(
              "px-3 py-1.5 rounded-btn font-mono text-label cursor-pointer transition-colors border",
              active
                ? "bg-grid-red text-white border-grid-red"
                : "bg-transparent text-muted-foreground border-border hover:bg-muted",
            )}
          >
            {p}
          </button>
        );
      })}
      {/* Custom date range picker is a stub for now */}
      <button
        type="button"
        aria-label="Open custom date range picker"
        className="px-3 py-1.5 rounded-btn font-mono text-label cursor-pointer transition-colors border bg-transparent text-muted-foreground border-border hover:bg-muted"
        onClick={onCustomClick}
      >
        Custom
      </button>
    </div>
  );
}

// ─── Export dropdown ─────────────────────────────────────────────────────────

function ExportDropdown() {
  const handleExport = (format: "csv" | "pdf") => {
    // Stub: download a sample blob
    const blob = new Blob(
      [
        format === "csv"
          ? "station,sessions,revenue\nGPWR-Del-03,312,₹84200\n"
          : "%PDF-1.4 stub export",
      ],
      { type: format === "csv" ? "text/csv" : "application/pdf" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gridcharge-analytics.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Export analytics"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn font-mono text-label cursor-pointer transition-colors border bg-transparent text-muted-foreground border-border hover:bg-muted"
        >
          <Download className="h-3 w-3" aria-hidden="true" />
          Export
          <ChevronDown className="h-3 w-3" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleExport("csv")}
          aria-label="Export analytics as CSV"
        >
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("pdf")}
          aria-label="Export analytics as PDF"
        >
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Skeleton primitives ──────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className,
      )}
      aria-hidden="true"
    />
  );
}

function KpiSkeleton() {
  return (
    <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-9 w-32" />
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

function ChartSkeleton({ title }: { title: string }) {
  return (
    <div
      className="rounded-card border border-border bg-card p-5 flex flex-col"
      role="status"
      aria-label={`Loading ${title}`}
    >
      <Skeleton className="h-3 w-32 mb-3" />
      <Skeleton className="h-[180px] w-full" />
    </div>
  );
}

// ─── Per-section error / empty states ─────────────────────────────────────────

function PanelMessage({
  title,
  body,
  tone = "muted",
}: {
  title: string;
  body: string;
  tone?: "muted" | "error";
}) {
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-card border p-5 flex flex-col items-center justify-center text-center min-h-[180px]",
        tone === "error"
          ? "border-error/40 bg-error/5"
          : "border-border bg-card",
      )}
    >
      <div
        className={cn(
          "font-body text-body-sm font-semibold mb-1",
          tone === "error" ? "text-error" : "text-foreground",
        )}
      >
        {title}
      </div>
      <div className="font-mono text-label text-muted-foreground">{body}</div>
    </div>
  );
}

// ─── Energy mix donut (pure SVG, avoids duplicate React from recharts) ────────

interface EnergyDonutProps {
  period: Period;
}

function EnergyMixDonut({ period }: EnergyDonutProps) {
  const [tooltip, setTooltip] = React.useState<{
    idx: number;
    x: number;
    y: number;
  } | null>(null);
  const items = ENERGY_MIX_BY_PERIOD[period];
  const primaryItem = items[0];

  // Use stroke-dasharray approach on a circle for clean donut arcs
  const cx = 60;
  const cy = 60;
  const r = 42;
  const strokeW = 16;
  const circ = 2 * Math.PI * r;

  // Build segments
  let cumPct = 0;
  const segments = items.map((item) => {
    const dash = (item.pct / 100) * circ;
    const gap = circ - dash;
    cumPct += item.pct;
    return {
      ...item,
      dash,
      gap,
      offset: -(circ * 0.25) + ((cumPct - item.pct) / 100) * circ,
    };
  });

  const trackColor = "var(--color-muted)";

  // Accessible chart description
  const chartDesc = `Energy mix donut for ${period}: ${items
    .map((i) => `${i.label} ${i.pct}% (${i.kwh})`)
    .join(", ")}.`;

  if (!items.length) {
    return (
      <PanelMessage
        title="Energy mix"
        body="No analytics data for this period yet."
      />
    );
  }

  return (
    <section
      className="rounded-card border border-border bg-card p-5 flex flex-col"
      aria-labelledby="energy-mix-title"
    >
      <h3
        id="energy-mix-title"
        className="font-body text-body-sm font-semibold text-foreground mb-4"
      >
        Energy mix
      </h3>

      <div className="flex items-center gap-6 flex-1">
        {/* SVG donut */}
        <div
          className="relative flex-shrink-0"
          style={{ width: 120, height: 120 }}
        >
          <svg
            width={120}
            height={120}
            viewBox="0 0 120 120"
            role="img"
            aria-label={chartDesc}
            onMouseLeave={() => setTooltip(null)}
          >
            <title>{chartDesc}</title>
            {/* Track */}
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={trackColor}
              strokeWidth={strokeW}
            />
            {/* Segments */}
            {segments.map((seg, idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeW}
                strokeDasharray={`${seg.dash} ${seg.gap}`}
                strokeDashoffset={seg.offset}
                strokeLinecap="butt"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: `${cx}px ${cy}px`,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const rect = (e.target as SVGElement)
                    .closest("svg")
                    ?.getBoundingClientRect();
                  setTooltip({
                    idx,
                    x: e.clientX - (rect?.left ?? 0),
                    y: e.clientY - (rect?.top ?? 0),
                  });
                }}
              />
            ))}
            {/* Center label */}
            {primaryItem && (
              <>
                <text
                  x={cx}
                  y={cy - 4}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 600,
                    fill: "var(--color-foreground)",
                  }}
                >
                  {primaryItem.pct}%
                </text>
                <text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 8,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fill: "var(--color-muted-foreground)",
                  }}
                >
                  {primaryItem.label}
                </text>
              </>
            )}
            {/* Tooltip */}
            {tooltip !== null && items[tooltip.idx] && (
              <foreignObject
                x={tooltip.x - 40}
                y={tooltip.y - 52}
                width={90}
                height={52}
              >
                <div className="rounded-tooltip border border-border bg-foreground text-background px-2 py-1.5 font-mono text-[10px] shadow-md pointer-events-none">
                  <div className="font-semibold">
                    {items[tooltip.idx]!.label}
                  </div>
                  <div>{items[tooltip.idx]!.pct}%</div>
                  <div className="opacity-70">{items[tooltip.idx]!.kwh}</div>
                </div>
              </foreignObject>
            )}
          </svg>
        </div>

        {/* Legend — color, label, and pattern marker so color isn't sole signal */}
        <ul className="flex flex-col gap-3" aria-label="Energy mix legend">
          {items.map((item, idx) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                className="rounded-sm flex-shrink-0 border border-border"
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                }}
                aria-hidden="true"
              />
              <span
                className="font-mono text-label text-muted-foreground w-4"
                aria-hidden="true"
              >
                {idx + 1}.
              </span>
              <div>
                <div className="font-body text-body-sm text-foreground">
                  {item.label}
                </div>
                <div className="font-mono text-label text-muted-foreground">
                  {item.pct}% · {item.kwh}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Station performance table ────────────────────────────────────────────────

type SortKey = "sessions" | "revenue" | "utilization" | "avgDuration";

function StationTable({ period }: { period: Period }) {
  const [sortKey, setSortKey] = React.useState<SortKey>("utilization");
  const [sortAsc, setSortAsc] = React.useState(false);
  const rows = getStationPerformance(period);

  const sorted = [...rows].sort((a, b) => {
    let av: number;
    let bv: number;
    if (sortKey === "sessions") {
      av = a.sessions;
      bv = b.sessions;
    } else if (sortKey === "utilization") {
      av = a.utilization;
      bv = b.utilization;
    } else if (sortKey === "revenue") {
      av = parseInt(a.revenue.replace(/[^\d]/g, ""), 10);
      bv = parseInt(b.revenue.replace(/[^\d]/g, ""), 10);
    } else {
      av = parseInt(a.avgDuration, 10);
      bv = parseInt(b.avgDuration, 10);
    }
    return sortAsc ? av - bv : bv - av;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const ariaSortFor = (k?: SortKey): "ascending" | "descending" | "none" => {
    if (!k) return "none";
    if (sortKey !== k) return "none";
    return sortAsc ? "ascending" : "descending";
  };

  const ColHeader = ({
    label,
    k,
    className,
  }: {
    label: string;
    k?: SortKey;
    className?: string;
  }) => {
    const sort = ariaSortFor(k);
    return (
      <th
        scope="col"
        aria-sort={sort}
        className={cn("text-left p-0", className)}
      >
        <button
          type="button"
          onClick={k ? () => handleSort(k) : undefined}
          aria-label={
            k
              ? `Sort by ${label} ${sort === "ascending" ? "descending" : "ascending"}`
              : label
          }
          disabled={!k}
          className={cn(
            "font-mono text-[9px] uppercase tracking-widest text-left text-muted-foreground",
            k ? "cursor-pointer hover:opacity-70" : "cursor-default",
          )}
        >
          {label}
          {k && sortKey === k && (
            <span className="ml-1" aria-hidden="true">
              {sortAsc ? "↑" : "↓"}
            </span>
          )}
        </button>
      </th>
    );
  };

  const statusDot = (status: "online" | "degraded" | "offline") => {
    const color =
      status === "online"
        ? "var(--color-success)"
        : status === "degraded"
          ? "var(--color-warning)"
          : "var(--color-error)";
    return (
      <span
        className="inline-block rounded-full mr-1.5 flex-shrink-0"
        style={{
          width: 6,
          height: 6,
          backgroundColor: color,
          display: "inline-block",
        }}
        title={status}
        aria-label={`Status: ${status}`}
        role="img"
      />
    );
  };

  if (!sorted.length) {
    return (
      <PanelMessage
        title="Station performance"
        body="No analytics data for this period yet."
      />
    );
  }

  return (
    <section
      className="rounded-card border border-border bg-card overflow-hidden"
      aria-labelledby="station-performance-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <h3
          id="station-performance-title"
          className="font-body text-body-sm font-semibold text-foreground"
        >
          Station performance
        </h3>
        <button
          type="button"
          aria-label="Export station performance as CSV"
          onClick={() => {
            const blob = new Blob(
              [
                "id,name,sessions,avg_duration,revenue,kwh,utilization\n" +
                  sorted
                    .map(
                      (r) =>
                        `${r.id},${r.name},${r.sessions},${r.avgDuration},${r.revenue},${r.kwh},${r.utilization}%`,
                    )
                    .join("\n"),
              ],
              { type: "text/csv" },
            );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "station-performance.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-btn font-mono text-label cursor-pointer transition-colors border bg-transparent text-muted-foreground border-border hover:bg-muted"
        >
          <Download className="h-3 w-3" aria-hidden="true" />
          Export CSV
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr
            className="bg-muted border-b border-border grid"
            style={{
              gridTemplateColumns: "110px 1fr 80px 80px 100px 90px 80px",
            }}
          >
            <ColHeader label="ID" />
            <ColHeader label="Station" />
            <ColHeader label="Sessions" k="sessions" />
            <ColHeader label="Avg dur" k="avgDuration" />
            <ColHeader label="Revenue" k="revenue" />
            <ColHeader label="kWh" />
            <ColHeader label="Util %" k="utilization" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id}
              className={cn(
                "grid px-5 py-2.5 border-b border-border last:border-b-0 text-body-sm items-center",
                i % 2 === 1 ? "bg-muted/40" : "",
              )}
              style={{
                gridTemplateColumns: "110px 1fr 80px 80px 100px 90px 80px",
              }}
            >
              <td className="font-mono text-label truncate text-muted-foreground p-0">
                {row.id}
              </td>
              <td className="font-body text-body-sm flex items-center truncate text-foreground p-0">
                {statusDot(row.status)}
                {row.name}
              </td>
              <td className="font-mono text-label text-foreground p-0">
                {row.sessions.toLocaleString("en-IN")}
              </td>
              <td className="font-mono text-label text-muted-foreground p-0">
                {row.avgDuration}
              </td>
              <td className="font-mono text-label text-grid-red font-semibold p-0">
                {row.revenue}
              </td>
              <td className="font-mono text-label text-foreground p-0">
                {row.kwh}
              </td>
              <td
                className={cn(
                  "font-mono text-label font-semibold p-0",
                  row.utilization > 75
                    ? "text-success"
                    : row.utilization > 50
                      ? "text-warning"
                      : "text-error",
                )}
              >
                {row.utilization}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

// ─── Customer insights ────────────────────────────────────────────────────────

function CustomerInsightsPanel({ period }: { period: Period }) {
  const insights = CUSTOMER_INSIGHTS_BY_PERIOD[period];

  if (!insights) {
    return (
      <PanelMessage
        title="Customer insights"
        body="No analytics data for this period yet."
      />
    );
  }

  const items = [
    {
      label: "Returning users",
      value: insights.returningPct,
      sub: "of all sessions",
    },
    {
      label: "New users",
      value: insights.newUsers,
      sub: `${period} period`,
    },
    {
      label: "Avg sessions/user",
      value: insights.avgSessionsPerUser,
      sub: "per month",
    },
    {
      label: "Peak hour",
      value: insights.peakHour,
      sub: insights.peakDays,
    },
  ];

  return (
    <section
      className="rounded-card border border-border bg-card p-5"
      aria-labelledby="customer-insights-title"
    >
      <h3
        id="customer-insights-title"
        className="font-body text-body-sm font-semibold text-foreground mb-4"
      >
        Customer insights
      </h3>
      <div className="grid grid-cols-4 divide-x divide-border">
        {items.map((item, i) => (
          <div key={i} className="px-5 first:pl-0">
            <div className="font-mono text-[9px] uppercase tracking-widest mb-1.5 text-muted-foreground">
              {item.label}
            </div>
            <div
              className="font-display font-semibold leading-none mb-1 text-foreground"
              style={{ fontSize: 28 }}
            >
              {item.value}
            </div>
            <div className="font-mono text-label text-muted-foreground">
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  trend,
  trendDir,
}: {
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendDir: "up" | "down" | "neutral";
}) {
  const TrendIcon =
    trendDir === "up" ? TrendingUp : trendDir === "down" ? TrendingDown : null;
  const trendColor =
    trendDir === "up"
      ? "text-success"
      : trendDir === "down"
        ? "text-error"
        : "text-muted-foreground";

  return (
    <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-2">
      <span className="font-mono text-label uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div
        className="font-display font-semibold leading-none text-foreground"
        style={{ fontSize: 36, letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      <div className="font-mono text-label text-muted-foreground">{sub}</div>
      {trend && (
        <div
          className={cn("flex items-center gap-1 font-mono text-label", trendColor)}
        >
          {TrendIcon && <TrendIcon className="h-3 w-3" aria-hidden="true" />}
          {trend}
        </div>
      )}
    </div>
  );
}

// ─── Analytics page ───────────────────────────────────────────────────────────

export default function Analytics() {
  const [period, setPeriod] = React.useState<Period>("30D");
  const [notice, setNotice] = React.useState<string | null>(null);
  const { loading, error } = useAnalyticsLoad(period);

  const kpi = KPI_BY_PERIOD[period];
  const revenueSeries = getRevenueSeries(period);
  const topStations = getTopStations(period);

  // Build data for @gridpower/ui LineChart
  const lineData = revenueSeries.map((pt) => ({
    label: pt.label,
    revenue: pt.revenue,
  }));

  // Build data for @gridpower/ui BarChart (top 10 stations)
  const barData = topStations.map((s) => ({
    label: s.id,
    revenue: Math.round(
      (s.revenue *
        { Today: 0.033, "7D": 0.23, "30D": 1, "90D": 2.95 }[period]) as number,
    ),
  }));

  const hasRevenue = lineData.length > 0;
  const hasStations = barData.length > 0;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="sr-only">Analytics</h2>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        <PeriodPicker
          value={period}
          onChange={setPeriod}
          onCustomClick={() => {
            setNotice("Custom date range picker is coming soon.");
            console.warn("Custom date range picker is not yet implemented");
          }}
        />
        <ExportDropdown />
      </div>

      {notice && (
        <InlineNotice message={notice} onDismiss={() => setNotice(null)} />
      )}

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        {loading ? (
          <>
            <KpiSkeleton />
            <KpiSkeleton />
            <KpiSkeleton />
            <KpiSkeleton />
          </>
        ) : !kpi ? (
          <div className="col-span-4">
            <PanelMessage
              title="KPIs"
              body="No analytics data for this period yet."
            />
          </div>
        ) : (
          <>
            <KpiCard
              label="Total revenue"
              value={kpi.revenue}
              sub={`${period} period`}
              trend={kpi.revenueTrend}
              trendDir={kpi.revenueTrendDir}
            />
            <KpiCard
              label="Energy delivered"
              value={kpi.energy}
              sub="across all stations"
              trend={kpi.energyTrend}
              trendDir={kpi.energyTrendDir}
            />
            <KpiCard
              label="Total sessions"
              value={kpi.sessions}
              sub="charging sessions"
              trend={kpi.sessionsTrend}
              trendDir={kpi.sessionsTrendDir}
            />
            <KpiCard
              label="Avg session"
              value={kpi.avgDuration}
              sub="duration"
              trend={kpi.durationTrend}
              trendDir={kpi.durationTrendDir}
            />
          </>
        )}
      </div>

      {/* 2x2 chart grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* 1. Revenue trend */}
        {loading ? (
          <ChartSkeleton title="Revenue trend" />
        ) : error ? (
          <PanelMessage
            title="Revenue trend"
            body="Could not load chart data. Try again."
            tone="error"
          />
        ) : !hasRevenue ? (
          <PanelMessage
            title="Revenue trend"
            body="No analytics data for this period yet."
          />
        ) : (
          <div
            role="img"
            aria-label={`Revenue trend for ${period}, peak ${Math.max(
              ...lineData.map((d) => d.revenue),
            ).toLocaleString("en-IN")} INR`}
          >
            <LineChart
              data={lineData}
              series={[
                {
                  dataKey: "revenue",
                  name: "Revenue (INR)",
                  color: "var(--grid-red)",
                  strokeWidth: 2,
                },
              ]}
              xAxisKey="label"
              yUnit="INR"
              title="Revenue trend"
              chartHeight={180}
            />
          </div>
        )}

        {/* 2. Sessions by hour heatmap */}
        {loading ? (
          <ChartSkeleton title="Sessions by hour" />
        ) : error ? (
          <PanelMessage
            title="Sessions by hour"
            body="Could not load heatmap data. Try again."
            tone="error"
          />
        ) : (
          <div
            role="img"
            aria-label="Sessions by hour heatmap, 7 days by 24 hours, denser cells indicate more sessions"
          >
            <HeatmapChart
              data={HEATMAP_PATTERN}
              rowLabels={SESSIONS_HEATMAP_ROWS}
              colLabels={SESSIONS_HEATMAP_COLS}
              title="Sessions by hour"
              cellSize={14}
              cellGap={2}
            />
          </div>
        )}

        {/* 3. Energy mix donut */}
        {loading ? (
          <ChartSkeleton title="Energy mix" />
        ) : error ? (
          <PanelMessage
            title="Energy mix"
            body="Could not load energy mix. Try again."
            tone="error"
          />
        ) : (
          <EnergyMixDonut period={period} />
        )}

        {/* 4. Top 10 stations bar */}
        {loading ? (
          <ChartSkeleton title="Top 10 stations" />
        ) : error ? (
          <PanelMessage
            title="Top 10 stations"
            body="Could not load station data. Try again."
            tone="error"
          />
        ) : !hasStations ? (
          <PanelMessage
            title="Top 10 stations"
            body="No analytics data for this period yet."
          />
        ) : (
          <div
            role="img"
            aria-label={`Top 10 stations by revenue for ${period}, leader ${
              barData[0]?.label
            } at ${(barData[0]?.revenue ?? 0).toLocaleString("en-IN")} INR`}
          >
            <BarChart
              data={barData}
              series={[
                {
                  dataKey: "revenue",
                  name: "Revenue (INR)",
                  color: "var(--grid-red)",
                  dimOpacity: 0.5,
                  highlightLast: false,
                },
              ]}
              xAxisKey="label"
              yUnit="INR"
              title="Top 10 stations"
              chartHeight={180}
            />
          </div>
        )}
      </div>

      {/* Station performance table */}
      {loading ? (
        <ChartSkeleton title="Station performance" />
      ) : error ? (
        <PanelMessage
          title="Station performance"
          body="Could not load station performance data. Try again."
          tone="error"
        />
      ) : (
        <StationTable period={period} />
      )}

      {/* Customer insights panel */}
      {loading ? (
        <ChartSkeleton title="Customer insights" />
      ) : error ? (
        <PanelMessage
          title="Customer insights"
          body="Could not load customer insights. Try again."
          tone="error"
        />
      ) : (
        <CustomerInsightsPanel period={period} />
      )}
    </div>
  );
}
