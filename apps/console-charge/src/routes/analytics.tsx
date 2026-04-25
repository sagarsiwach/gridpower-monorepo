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
  StatCard,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  cn,
} from "@gridpower/ui";
import { Download, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "~/lib/theme";
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

// ─── Date range picker ────────────────────────────────────────────────────────

const PERIODS: Period[] = ["Today", "7D", "30D", "90D"];

interface PeriodPickerProps {
  value: Period;
  onChange: (p: Period) => void;
  isDark: boolean;
}

function PeriodPicker({ value, onChange, isDark }: PeriodPickerProps) {
  return (
    <div className="flex items-center gap-1.5">
      {PERIODS.map((p) => {
        const active = value === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cn(
              "px-3 py-1.5 rounded-btn font-mono text-label cursor-pointer transition-colors border",
              active
                ? "bg-grid-red text-white border-grid-red"
                : isDark
                  ? "bg-transparent text-dark-9 border-dark-6 hover:bg-dark-4"
                  : "bg-transparent text-sand-9 border-sand-6 hover:bg-sand-3",
            )}
          >
            {p}
          </button>
        );
      })}
      {/* Custom — stub */}
      <button
        type="button"
        className={cn(
          "px-3 py-1.5 rounded-btn font-mono text-label cursor-pointer transition-colors border",
          isDark
            ? "bg-transparent text-dark-9 border-dark-6 hover:bg-dark-4"
            : "bg-transparent text-sand-9 border-sand-6 hover:bg-sand-3",
        )}
        onClick={() => alert("Custom date range picker — coming soon")}
      >
        Custom
      </button>
    </div>
  );
}

// ─── Export dropdown ─────────────────────────────────────────────────────────

function ExportDropdown({ isDark }: { isDark: boolean }) {
  const handleExport = (format: "csv" | "pdf") => {
    // Stub — download a sample blob
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
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-btn font-mono text-label cursor-pointer transition-colors border",
            isDark
              ? "bg-transparent text-dark-9 border-dark-6 hover:bg-dark-4"
              : "bg-transparent text-sand-9 border-sand-6 hover:bg-sand-3",
          )}
        >
          <Download className="h-3 w-3" />
          Export
          <ChevronDown className="h-3 w-3" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Energy mix donut (pure SVG — avoids duplicate React from recharts) ──────

interface EnergyDonutProps {
  period: Period;
  isDark: boolean;
}

/**
 * Build SVG arc path for a donut segment.
 * cx, cy = center; r = radius; startAngle/endAngle in degrees (0 = top, clockwise).
 */
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
  strokeWidth: number,
): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  // Return a stroke-based arc (circle approach via stroke-dasharray is simpler)
  void strokeWidth;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function EnergyMixDonut({ period, isDark }: EnergyDonutProps) {
  const [tooltip, setTooltip] = React.useState<{ idx: number; x: number; y: number } | null>(null);
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
    // offset: start from top (quarter circle back)
    const offset = circ * 0.25 - cumPct * circ * 0.01;
    cumPct += item.pct;
    return { ...item, dash, gap, offset: -(circ * 0.25) + (cumPct - item.pct) / 100 * circ };
  });

  const trackColor = isDark ? "var(--dark-4)" : "var(--sand-3)";

  return (
    <div
      className={cn(
        "rounded-card border p-5 flex flex-col",
        isDark ? "bg-dark-2 border-dark-6" : "bg-card border-border",
      )}
    >
      <div className="mb-1">
        <span
          className={cn(
            "font-body text-body-sm font-semibold",
            isDark ? "text-dark-12" : "text-foreground",
          )}
        >
          Energy mix
        </span>
      </div>
      <div
        className={cn(
          "font-mono text-label mb-4",
          isDark ? "text-dark-9" : "text-sand-9",
        )}
      >
        Charging source split · {period}
      </div>

      <div className="flex items-center gap-6 flex-1">
        {/* SVG donut */}
        <div className="relative flex-shrink-0" style={{ width: 120, height: 120 }}>
          <svg
            width={120}
            height={120}
            viewBox="0 0 120 120"
            onMouseLeave={() => setTooltip(null)}
          >
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
                style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px`, cursor: "pointer" }}
                onMouseEnter={(e) => {
                  const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
                  setTooltip({ idx, x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
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
                    fill: isDark ? "var(--dark-12)" : "var(--sand-12)",
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
                    fill: isDark ? "var(--dark-9)" : "var(--sand-9)",
                  }}
                >
                  {primaryItem.label}
                </text>
              </>
            )}
            {/* Tooltip */}
            {tooltip !== null && items[tooltip.idx] && (
              <foreignObject x={tooltip.x - 40} y={tooltip.y - 52} width={90} height={52}>
                <div
                  className={cn(
                    "rounded-tooltip border px-2 py-1.5 font-mono text-[10px] shadow-md pointer-events-none",
                    isDark
                      ? "bg-dark-3 border-dark-6 text-dark-12"
                      : "bg-sand-12 border-sand-7 text-sand-1",
                  )}
                >
                  <div className="font-semibold">{items[tooltip.idx]!.label}</div>
                  <div>{items[tooltip.idx]!.pct}%</div>
                  <div className={isDark ? "text-dark-9" : "opacity-60"}>{items[tooltip.idx]!.kwh}</div>
                </div>
              </foreignObject>
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="rounded-sm flex-shrink-0"
                style={{ width: 10, height: 10, backgroundColor: item.color }}
              />
              <div>
                <div
                  className={cn(
                    "font-body text-body-sm",
                    isDark ? "text-dark-12" : "text-foreground",
                  )}
                >
                  {item.label}
                </div>
                <div
                  className={cn(
                    "font-mono text-label",
                    isDark ? "text-dark-9" : "text-sand-9",
                  )}
                >
                  {item.pct}% · {item.kwh}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Station performance table ────────────────────────────────────────────────

type SortKey = "sessions" | "revenue" | "utilization" | "avgDuration";

function StationTable({ period, isDark }: { period: Period; isDark: boolean }) {
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

  const ColHeader = ({
    label,
    k,
    className,
  }: {
    label: string;
    k?: SortKey;
    className?: string;
  }) => (
    <button
      type="button"
      onClick={k ? () => handleSort(k) : undefined}
      className={cn(
        "font-mono text-[9px] uppercase tracking-widest text-left",
        isDark ? "text-dark-9" : "text-sand-9",
        k ? "cursor-pointer hover:opacity-70" : "cursor-default",
        className,
      )}
    >
      {label}
      {k && sortKey === k && (
        <span className="ml-1">{sortAsc ? "↑" : "↓"}</span>
      )}
    </button>
  );

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
        style={{ width: 6, height: 6, backgroundColor: color, display: "inline-block" }}
        title={status}
      />
    );
  };

  return (
    <div
      className={cn(
        "rounded-card border overflow-hidden",
        isDark ? "bg-dark-2 border-dark-6" : "bg-card border-border",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-5 py-3.5 border-b",
          isDark ? "border-dark-6" : "border-border",
        )}
      >
        <span
          className={cn(
            "font-body text-body-sm font-semibold",
            isDark ? "text-dark-12" : "text-foreground",
          )}
        >
          Station performance
        </span>
        <button
          type="button"
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
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-btn font-mono text-label cursor-pointer transition-colors border",
            isDark
              ? "bg-transparent text-dark-9 border-dark-6 hover:bg-dark-4"
              : "bg-transparent text-sand-9 border-sand-6 hover:bg-sand-3",
          )}
        >
          <Download className="h-3 w-3" />
          Export CSV
        </button>
      </div>

      {/* Column headers */}
      <div
        className={cn(
          "grid px-5 py-2 border-b",
          isDark ? "bg-dark-3 border-dark-6" : "bg-sand-2 border-border",
        )}
        style={{ gridTemplateColumns: "110px 1fr 80px 80px 100px 90px 80px" }}
      >
        <ColHeader label="ID" />
        <ColHeader label="Station" />
        <ColHeader label="Sessions" k="sessions" />
        <ColHeader label="Avg dur" k="avgDuration" />
        <ColHeader label="Revenue" k="revenue" />
        <ColHeader label="kWh" />
        <ColHeader label="Util %" k="utilization" />
      </div>

      {/* Rows */}
      {sorted.map((row, i) => (
        <div
          key={row.id}
          className={cn(
            "grid px-5 py-2.5 border-b last:border-b-0 text-body-sm items-center",
            isDark
              ? "border-dark-6 " + (i % 2 === 1 ? "bg-dark-3" : "")
              : "border-border " + (i % 2 === 1 ? "bg-sand-2" : ""),
          )}
          style={{ gridTemplateColumns: "110px 1fr 80px 80px 100px 90px 80px" }}
        >
          <span
            className={cn(
              "font-mono text-label truncate",
              isDark ? "text-dark-9" : "text-sand-9",
            )}
          >
            {row.id}
          </span>
          <span
            className={cn(
              "font-body text-body-sm flex items-center truncate",
              isDark ? "text-dark-12" : "text-foreground",
            )}
          >
            {statusDot(row.status)}
            {row.name}
          </span>
          <span className={cn("font-mono text-label", isDark ? "text-dark-11" : "text-sand-11")}>
            {row.sessions.toLocaleString("en-IN")}
          </span>
          <span className={cn("font-mono text-label", isDark ? "text-dark-9" : "text-sand-9")}>
            {row.avgDuration}
          </span>
          <span className="font-mono text-label text-grid-red font-semibold">
            {row.revenue}
          </span>
          <span className={cn("font-mono text-label", isDark ? "text-dark-11" : "text-sand-11")}>
            {row.kwh}
          </span>
          <span
            className={cn(
              "font-mono text-label font-semibold",
              row.utilization > 75
                ? "text-success"
                : row.utilization > 50
                  ? "text-warning"
                  : "text-error",
            )}
          >
            {row.utilization}%
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Customer insights ────────────────────────────────────────────────────────

function CustomerInsightsPanel({ period, isDark }: { period: Period; isDark: boolean }) {
  const insights = CUSTOMER_INSIGHTS_BY_PERIOD[period];

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
    <div
      className={cn(
        "rounded-card border p-5",
        isDark ? "bg-dark-2 border-dark-6" : "bg-card border-border",
      )}
    >
      <div
        className={cn(
          "font-body text-body-sm font-semibold mb-4",
          isDark ? "text-dark-12" : "text-foreground",
        )}
      >
        Customer insights
      </div>
      <div
        className={cn(
          "grid grid-cols-4 divide-x",
          isDark ? "divide-dark-6" : "divide-border",
        )}
      >
        {items.map((item, i) => (
          <div key={i} className={cn("px-5 first:pl-0")}>
            <div
              className={cn(
                "font-mono text-[9px] uppercase tracking-widest mb-1.5",
                isDark ? "text-dark-9" : "text-sand-9",
              )}
            >
              {item.label}
            </div>
            <div
              className={cn(
                "font-display font-semibold leading-none mb-1",
                isDark ? "text-dark-12" : "text-foreground",
              )}
              style={{ fontSize: 28 }}
            >
              {item.value}
            </div>
            <div
              className={cn(
                "font-mono text-label",
                isDark ? "text-dark-9" : "text-sand-9",
              )}
            >
              {item.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KPI sub-label ────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  trend,
  trendDir,
  isDark,
}: {
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendDir: "up" | "down" | "neutral";
  isDark: boolean;
}) {
  const TrendIcon =
    trendDir === "up" ? TrendingUp : trendDir === "down" ? TrendingDown : null;
  const trendColor =
    trendDir === "up"
      ? "text-success"
      : trendDir === "down"
        ? "text-error"
        : isDark
          ? "text-dark-9"
          : "text-sand-9";

  return (
    <div
      className={cn(
        "rounded-card border p-5 flex flex-col gap-2",
        isDark ? "bg-dark-2 border-dark-6" : "bg-card border-border",
      )}
    >
      <span
        className={cn(
          "font-mono text-label uppercase tracking-widest",
          isDark ? "text-dark-9" : "text-sand-9",
        )}
      >
        {label}
      </span>
      <div
        className={cn(
          "font-display font-semibold leading-none",
          isDark ? "text-dark-12" : "text-foreground",
        )}
        style={{ fontSize: 36, letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      <div className={cn("font-mono text-label", isDark ? "text-dark-9" : "text-sand-9")}>
        {sub}
      </div>
      {trend && (
        <div className={cn("flex items-center gap-1 font-mono text-label", trendColor)}>
          {TrendIcon && <TrendIcon className="h-3 w-3" />}
          {trend}
        </div>
      )}
    </div>
  );
}

// ─── Analytics page ───────────────────────────────────────────────────────────

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [period, setPeriod] = React.useState<Period>("30D");

  const kpi = KPI_BY_PERIOD[period];
  const revenueSeries = getRevenueSeries(period);
  const topStations = getTopStations(period);

  // Build data for @gridpower/ui LineChart
  const lineData = revenueSeries.map((pt) => ({
    label: pt.label,
    revenue: pt.revenue,
  }));

  // Build data for @gridpower/ui BarChart (top 10 stations, horizontal via layout)
  const barData = topStations.map((s) => ({
    label: s.id,
    revenue: Math.round(
      (s.revenue *
        { Today: 0.033, "7D": 0.23, "30D": 1, "90D": 2.95 }[period]) as number,
    ),
  }));

  return (
    <div className="flex flex-col gap-5">
      {/* Controls row */}
      <div className="flex items-center justify-between">
        <PeriodPicker value={period} onChange={setPeriod} isDark={isDark} />
        <ExportDropdown isDark={isDark} />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3">
        <KpiCard
          label="Total revenue"
          value={kpi.revenue}
          sub={`${period} period`}
          trend={kpi.revenueTrend}
          trendDir={kpi.revenueTrendDir}
          isDark={isDark}
        />
        <KpiCard
          label="Energy delivered"
          value={kpi.energy}
          sub="across all stations"
          trend={kpi.energyTrend}
          trendDir={kpi.energyTrendDir}
          isDark={isDark}
        />
        <KpiCard
          label="Total sessions"
          value={kpi.sessions}
          sub="charging sessions"
          trend={kpi.sessionsTrend}
          trendDir={kpi.sessionsTrendDir}
          isDark={isDark}
        />
        <KpiCard
          label="Avg session"
          value={kpi.avgDuration}
          sub="duration"
          trend={kpi.durationTrend}
          trendDir={kpi.durationTrendDir}
          isDark={isDark}
        />
      </div>

      {/* 2×2 chart grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* 1. Revenue trend */}
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
          subtitle={`${period} · INR`}
          chartHeight={180}
          theme={isDark ? "dark" : "light"}
        />

        {/* 2. Sessions by hour heatmap */}
        <HeatmapChart
          data={HEATMAP_PATTERN}
          rowLabels={SESSIONS_HEATMAP_ROWS}
          colLabels={SESSIONS_HEATMAP_COLS}
          title="Sessions by hour"
          subtitle="7×24 · session density"
          theme={isDark ? "dark" : "light"}
          cellSize={14}
          cellGap={2}
        />

        {/* 3. Energy mix donut */}
        <EnergyMixDonut period={period} isDark={isDark} />

        {/* 4. Top 10 stations bar */}
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
          subtitle={`Period revenue · ${period}`}
          chartHeight={180}
          theme={isDark ? "dark" : "light"}
        />
      </div>

      {/* Station performance table */}
      <StationTable period={period} isDark={isDark} />

      {/* Customer insights panel */}
      <CustomerInsightsPanel period={period} isDark={isDark} />
    </div>
  );
}
