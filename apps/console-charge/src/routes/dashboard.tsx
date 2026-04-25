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

function AlertsPanel({ isDark }: { isDark: boolean }) {
  const unreadCount = ALERTS.filter((a) => !a.read).length;

  return (
    <div
      className={[
        "rounded-card border overflow-hidden",
        isDark ? "bg-dark-2 border-dark-6" : "bg-card border-border",
      ].join(" ")}
    >
      {/* Header */}
      <div
        className={[
          "flex items-center justify-between px-5 py-3.5 border-b",
          isDark ? "border-dark-6" : "border-border",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <span
            className={[
              "font-body text-body-sm font-semibold",
              isDark ? "text-dark-12" : "text-foreground",
            ].join(" ")}
          >
            Alerts
          </span>
          {unreadCount > 0 && (
            <span className="font-mono text-[10px] bg-primary text-white rounded-full px-1.5 py-0.5 leading-none">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          type="button"
          className="font-body text-[12px] text-grid-red bg-transparent border-none cursor-pointer p-0"
        >
          View all →
        </button>
      </div>

      {/* Alert rows: severity dot + bold-on-unread carry meaning. */}
      {/* No left-stripe (anti-pattern: side-tab accent border). */}
      {ALERTS.slice(0, 5).map((alert: Alert, i) => (
        <div
          key={alert.id}
          className={[
            "flex items-start gap-3 px-5 py-3",
            i < 4 ? "border-b border-border" : "",
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
            <span
              className={[
                "font-mono text-[10px] whitespace-nowrap",
                isDark ? "text-dark-9" : "text-sand-9",
              ].join(" ")}
            >
              {alert.timeAgo} ago
            </span>
            <button
              type="button"
              className={[
                "font-body text-[11px] rounded-[4px] border px-2 py-0.5 cursor-pointer bg-transparent transition-colors",
                isDark
                  ? "border-dark-6 text-dark-9 hover:bg-dark-3"
                  : "border-sand-6 text-sand-9 hover:bg-sand-3",
              ].join(" ")}
            >
              Ack
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Recent sessions table ─────────────────────────────────────────────────────

function RecentSessionsPanel({ isDark }: { isDark: boolean }) {
  return (
    <div
      className={[
        "rounded-card border overflow-hidden",
        isDark ? "bg-dark-2 border-dark-6" : "bg-card border-border",
      ].join(" ")}
    >
      {/* Header */}
      <div
        className={[
          "flex items-center justify-between px-5 py-3.5 border-b",
          isDark ? "border-dark-6" : "border-border",
        ].join(" ")}
      >
        <span
          className={[
            "font-body text-body-sm font-semibold",
            isDark ? "text-dark-12" : "text-foreground",
          ].join(" ")}
        >
          Recent sessions
        </span>
        <span className="font-mono text-[10px] tracking-[0.06em] text-success">
          LIVE
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow
              className={isDark ? "border-dark-6 bg-dark-3" : "border-border bg-sand-2"}
            >
              {["Time", "ID", "Station", "User", "kWh", "Amount"].map((h) => (
                <TableHead
                  key={h}
                  className={[
                    "font-mono text-[9px] tracking-[0.08em] uppercase",
                    isDark ? "text-dark-9" : "text-sand-9",
                  ].join(" ")}
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
                className={isDark ? "border-dark-6 hover:bg-dark-3" : "border-border hover:bg-sand-2"}
              >
                <TableCell
                  className={[
                    "font-mono text-[11px]",
                    isDark ? "text-dark-9" : "text-sand-9",
                  ].join(" ")}
                >
                  {s.time}
                </TableCell>
                <TableCell
                  className={[
                    "font-mono text-[11px]",
                    isDark ? "text-dark-9" : "text-sand-9",
                  ].join(" ")}
                >
                  {s.sessionId}
                </TableCell>
                <TableCell
                  className={[
                    "text-[12px]",
                    isDark ? "text-dark-12" : "text-foreground",
                  ].join(" ")}
                >
                  {s.station}
                </TableCell>
                <TableCell
                  className={[
                    "text-[12px]",
                    isDark ? "text-dark-9" : "text-sand-9",
                  ].join(" ")}
                >
                  {s.user}
                </TableCell>
                <TableCell
                  className={[
                    "font-mono text-[12px]",
                    isDark ? "text-dark-12" : "text-foreground",
                  ].join(" ")}
                >
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
    </div>
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
              <span
                className={[
                  "font-mono text-h4",
                  isDark ? "text-dark-9" : "text-sand-9",
                ].join(" ")}
              >
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
        title="Revenue — Last 30 days"
        subtitle="₹9.8L total · 4,281 sessions"
        chartHeight={160}
        theme={isDark ? "dark" : "light"}
      />

      {/* ── Row 3: Alerts ──────────────────────────────────────────────────── */}
      <AlertsPanel isDark={isDark} />

      {/* ── Row 4: Heatmap + Top stations ──────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <HeatmapChart
          data={HEATMAP_DATA}
          rowLabels={HEATMAP_ROW_LABELS}
          colLabels={HEATMAP_COL_LABELS}
          title="Utilisation heatmap — this week"
          subtitle="% port activity by hour"
          theme={isDark ? "dark" : "light"}
          cellSize={14}
          cellGap={2}
        />
        <TopStationsPanel isDark={isDark} />
      </div>

      {/* ── Row 5: Recent sessions ──────────────────────────────────────────── */}
      <RecentSessionsPanel isDark={isDark} />
    </div>
  );
}
