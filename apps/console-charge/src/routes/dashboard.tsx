import * as React from "react";
import {
  BarChart,
  HeatmapChart,
  LineChart,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import {
  ALERTS,
  HEATMAP_COL_LABELS,
  HEATMAP_DATA,
  HEATMAP_ROW_LABELS,
  RECENT_SESSIONS,
  REVENUE_SERIES,
  STATIONS,
  STATS,
  type Alert,
  type AlertSeverity,
} from "~/mocks/dashboard";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function alertDotColor(severity: AlertSeverity): string {
  switch (severity) {
    case "error":
      return "var(--color-error)";
    case "warning":
      return "var(--color-warning)";
    case "success":
      return "var(--color-success)";
    case "info":
    default:
      return "var(--color-info)";
  }
}

// ─── Alerts panel ─────────────────────────────────────────────────────────────

function AlertsPanel({
  loading = false,
  error = false,
}: {
  loading?: boolean;
  error?: boolean;
}) {
  const unreadCount = ALERTS.filter((a) => !a.read).length;
  const isEmpty = !loading && !error && ALERTS.length === 0;

  return (
    <section
      aria-labelledby="alerts-heading"
      className="rounded-card border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <h2
            id="alerts-heading"
            className="font-body text-body-sm font-semibold text-foreground"
          >
            Alerts
          </h2>
          {unreadCount > 0 && (
            <span
              className="font-mono text-[10px] bg-primary text-white rounded-full px-1.5 py-0.5 leading-none"
              aria-label={`${unreadCount} unread`}
            >
              {unreadCount}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label="View all alerts"
          className="font-body text-[12px] text-grid-red bg-transparent border-none cursor-pointer p-0"
        >
          View all →
        </button>
      </div>

      {/* States */}
      {loading && (
        <div className="px-5 py-6 text-center text-[12px] text-muted-foreground">
          Loading alerts…
        </div>
      )}
      {error && !loading && (
        <div className="px-5 py-6 text-center text-[12px] text-error">
          Couldn’t load alerts. Try again.
        </div>
      )}
      {isEmpty && (
        <div className="px-5 py-6 text-center text-[12px] text-muted-foreground">
          All clear ✓
        </div>
      )}

      {/* Alert rows: severity dot + bold-on-unread carry meaning. */}
      {!loading &&
        !error &&
        !isEmpty &&
        ALERTS.slice(0, 5).map((alert: Alert, i, arr) => (
          <div
            key={alert.id}
            className={[
              "flex items-start gap-3 px-5 py-3",
              i < arr.length - 1 ? "border-b border-border" : "",
              !alert.read ? "bg-muted" : "",
            ].join(" ")}
          >
            {/* Color dot */}
            <div
              className="mt-1 shrink-0 w-2 h-2 rounded-full"
              style={{ background: alertDotColor(alert.severity) }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span
                  className={[
                    "text-[13px] text-foreground",
                    !alert.read ? "font-medium" : "font-normal",
                  ].join(" ")}
                >
                  {alert.station}
                </span>
                {!alert.read && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                    aria-label="unread"
                  />
                )}
              </div>
              <p className="text-[12px] leading-snug text-muted-foreground">
                {alert.message}
              </p>
            </div>

            {/* Time + ack */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="font-mono text-[10px] whitespace-nowrap text-muted-foreground">
                {alert.timeAgo} ago
              </span>
              <button
                type="button"
                aria-label={`Acknowledge alert from ${alert.station}`}
                className="font-body text-[11px] rounded-[4px] border border-border text-muted-foreground px-2 py-0.5 cursor-pointer bg-transparent transition-colors hover:bg-muted"
              >
                Ack
              </button>
            </div>
          </div>
        ))}
    </section>
  );
}

// ─── Recent sessions table ─────────────────────────────────────────────────────

function RecentSessionsPanel({
  loading = false,
  error = false,
}: {
  loading?: boolean;
  error?: boolean;
}) {
  const isEmpty = !loading && !error && RECENT_SESSIONS.length === 0;

  return (
    <section
      aria-labelledby="recent-sessions-heading"
      className="rounded-card border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <h2
          id="recent-sessions-heading"
          className="font-body text-body-sm font-semibold text-foreground"
        >
          Recent sessions
        </h2>
        <span
          className="font-mono text-[10px] tracking-[0.06em] text-success"
          aria-label="Live data"
        >
          LIVE
        </span>
      </div>

      {loading && (
        <div className="px-5 py-6 text-center text-[12px] text-muted-foreground">
          Loading sessions…
        </div>
      )}
      {error && !loading && (
        <div className="px-5 py-6 text-center text-[12px] text-error">
          Couldn’t load sessions. Try again.
        </div>
      )}
      {isEmpty && (
        <div className="px-5 py-6 text-center text-[12px] text-muted-foreground">
          No sessions today yet
        </div>
      )}

      {!loading && !error && !isEmpty && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted">
                {["Time", "ID", "Station", "User", "kWh", "Amount"].map((h) => (
                  <TableHead
                    key={h}
                    className="font-mono text-[9px] tracking-[0.08em] uppercase text-muted-foreground"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_SESSIONS.map((s) => (
                <TableRow
                  key={s.id}
                  className="border-border hover:bg-muted"
                >
                  <TableCell className="font-mono text-[11px] text-muted-foreground">
                    {s.time}
                  </TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">
                    {s.sessionId}
                  </TableCell>
                  <TableCell className="text-[12px] text-foreground">
                    {s.station}
                  </TableCell>
                  <TableCell className="text-[12px] text-muted-foreground">
                    {s.user}
                  </TableCell>
                  <TableCell className="font-mono text-[12px] text-foreground">
                    {s.kwh}
                  </TableCell>
                  <TableCell className="font-mono text-[12px] font-medium text-grid-red">
                    ₹{s.amount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
}

// ─── Top stations bar chart ────────────────────────────────────────────────────

function TopStationsPanel({ isDark }: { isDark: boolean }) {
  const top10 = STATIONS.slice(0, 10).map((s) => ({
    name: s.name.replace("GridPower-", ""),
    revenue: s.revenueToday,
  }));

  return (
    <BarChart
      data={top10}
      series={[
        {
          dataKey: "revenue",
          name: "Revenue today (₹)",
          color: "var(--grid-red)",
          highlightLast: false,
        },
      ]}
      xAxisKey="name"
      yUnit="₹"
      title="Revenue by station"
      subtitle="Top 10 · Today"
      chartHeight={200}
      theme={isDark ? "dark" : "light"}
    />
  );
}

// ─── Dashboard root ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Prepare revenue data for LineChart (map key to what the chart expects)
  const revenueChartData = REVENUE_SERIES.map((d) => ({
    date: d.date,
    revenue: d.revenue,
  }));

  return (
    <div className="flex flex-col gap-5">
      {/* ── Row 1: StatCards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          theme={isDark ? "dark" : "light"}
          label="Revenue today"
          value={
            <span className="font-mono text-grid-red">
              {STATS.revenueToday}
            </span>
          }
          trend={`▲ ${STATS.revenueTrend}`}
          trendDir="up"
        />
        <StatCard
          theme={isDark ? "dark" : "light"}
          label="Stations online"
          value={
            <span className="font-mono">
              {STATS.stationsOnline}
              <span className="font-mono text-h4 text-muted-foreground">
                /{STATS.stationsTotal}
              </span>
            </span>
          }
          trend={STATS.stationsTrend}
          trendDir="neutral"
        />
        <StatCard
          theme={isDark ? "dark" : "light"}
          label="Sessions today"
          value={
            <span className="font-mono">{STATS.sessionsToday}</span>
          }
          trend={`▲ ${STATS.sessionsTrend}`}
          trendDir="up"
        />
        <StatCard
          theme={isDark ? "dark" : "light"}
          label="Energy delivered"
          value={
            <span className="font-mono">{STATS.energyDelivered}</span>
          }
          trend={`▲ ${STATS.energyTrend}`}
          trendDir="up"
        />
      </div>

      {/* ── Row 2: Revenue chart ────────────────────────────────────────────── */}
      <LineChart
        data={revenueChartData}
        series={[
          {
            dataKey: "revenue",
            name: "Revenue (₹)",
            color: "var(--grid-red)",
            strokeWidth: 1.5,
          },
        ]}
        xAxisKey="date"
        yUnit="₹"
        title="Revenue, last 30 days"
        subtitle="₹9.8L total · 4,281 sessions"
        chartHeight={160}
        theme={isDark ? "dark" : "light"}
      />

      {/* ── Row 3: Alerts ──────────────────────────────────────────────────── */}
      <AlertsPanel />

      {/* ── Row 4: Heatmap + Top stations ──────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <HeatmapChart
          data={HEATMAP_DATA}
          rowLabels={HEATMAP_ROW_LABELS}
          colLabels={HEATMAP_COL_LABELS}
          title="Utilisation heatmap · this week"
          subtitle="% port activity by hour"
          theme={isDark ? "dark" : "light"}
          cellSize={14}
          cellGap={2}
        />
        <TopStationsPanel isDark={isDark} />
      </div>

      {/* ── Row 5: Recent sessions ──────────────────────────────────────────── */}
      <RecentSessionsPanel />
    </div>
  );
}
