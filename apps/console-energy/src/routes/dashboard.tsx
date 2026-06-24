/**
 * GridEnergy Console — Dashboard
 * Route: /dashboard
 *
 * KPI tiles (stored MWh, discharge MW, revenue, sites online),
 * 24h energy-flow line chart, top sites table, live grid-events feed.
 */

import * as React from "react";
import { LineChart, StatCard, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, type LineChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { STATS, ENERGY_SERIES_24H, TOP_SITES, LIVE_EVENTS, type LiveGridEvent, type GridEventSeverity } from "~/mocks/dashboard";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function eventDotColor(severity: GridEventSeverity): string {
  switch (severity) {
    case "critical": return "var(--color-error)";
    case "warning":  return "var(--color-warning)";
    case "resolved": return "var(--color-success)";
    case "info":
    default:         return "var(--color-info)";
  }
}

function SiteStatusPill({ status }: { status: "online" | "offline" | "maintenance" }) {
  const map = {
    online:      { bg: "bg-success/10",  text: "text-success",  label: "Online"      },
    offline:     { bg: "bg-error/10",    text: "text-error",    label: "Offline"     },
    maintenance: { bg: "bg-warning/10",  text: "text-warning",  label: "Maintenance" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.bg.replace("/10","")} bg-current`} aria-hidden="true" />
      {s.label}
    </span>
  );
}

// ─── Live grid-events panel ────────────────────────────────────────────────────

function GridEventsPanel() {
  const unread = LIVE_EVENTS.filter(e => !e.read).length;
  return (
    <section aria-labelledby="live-events-heading" className="rounded-card border border-border bg-card overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <h2 id="live-events-heading" className="font-body text-body-sm font-semibold text-foreground">Grid events</h2>
          {unread > 0 && (
            <span className="font-mono text-[10px] bg-primary text-white rounded-full px-1.5 py-0.5 leading-none" aria-label={`${unread} unread`}>
              {unread}
            </span>
          )}
        </div>
        <a href="/grid-events" className="group inline-flex items-center gap-0.5 font-body text-[12px] text-primary hover:opacity-80 transition-opacity duration-150">
          View all
          <span className="inline-block transition-transform duration-150 ease-out group-hover:translate-x-0.5">→</span>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {LIVE_EVENTS.map((event: LiveGridEvent) => (
          <div
            key={event.id}
            className={["flex items-start gap-3 px-5 py-3", !event.read ? "bg-muted" : ""].join(" ")}
          >
            <div
              className="mt-1 shrink-0 w-2 h-2 rounded-full"
              style={{ background: eventDotColor(event.severity) }}
              aria-hidden="true"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1.5 mb-0.5">
                <span className={["text-[12px] text-foreground", !event.read ? "font-semibold" : "font-normal"].join(" ")}>
                  {event.type}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{event.affectedSites} site{event.affectedSites !== 1 ? "s" : ""}</span>
              </div>
              <p className="text-[11px] leading-snug text-muted-foreground line-clamp-2">{event.description}</p>
            </div>
            <span className="font-mono text-[10px] whitespace-nowrap text-muted-foreground shrink-0">{event.timeAgo} ago</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Top sites table ───────────────────────────────────────────────────────────

function TopSitesPanel() {
  return (
    <section aria-labelledby="top-sites-heading" className="rounded-card border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <h2 id="top-sites-heading" className="font-body text-body-sm font-semibold text-foreground">Top sites by revenue</h2>
        <a href="/sites" className="group inline-flex items-center gap-0.5 font-body text-[12px] text-primary hover:opacity-80 transition-opacity duration-150">
          View all
          <span className="inline-block transition-transform duration-150 ease-out group-hover:translate-x-0.5">→</span>
        </a>
      </div>
      {/* Loading: replace this div with aria-busy skeleton rows */}
      {/* Empty: <EmptyState> with "Add your first BESS site to start" */}
      {/* Error: role="alert" block with retry */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted">
              {["Site", "Capacity", "SoC", "Discharge", "Revenue today", "Status"].map(h => (
                <TableHead key={h} className="font-mono text-[9px] tracking-[0.08em] uppercase text-muted-foreground">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {TOP_SITES.map(site => (
              <TableRow key={site.id} className="border-border hover:bg-muted transition-colors duration-100">
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-body text-[13px] font-medium text-foreground">{site.name}</span>
                    <span className="font-body text-[11px] text-muted-foreground">{site.location}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[12px] text-foreground">{site.capacityMwh} MWh</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-10 shrink-0 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={site.soc} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-full rounded-full bg-info transition-all" style={{ width: `${site.soc}%` }} />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">{site.soc}%</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-[12px] text-foreground">
                  {site.dischargeMw > 0 ? `${site.dischargeMw} MW` : <span className="text-muted-foreground">–</span>}
                </TableCell>
                <TableCell className="font-mono text-[12px] font-medium text-primary">
                  {site.revenueToday > 0 ? `₹${site.revenueToday.toLocaleString("en-IN")}` : <span className="text-muted-foreground">₹0</span>}
                </TableCell>
                <TableCell>
                  <SiteStatusPill status={site.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

// ─── Energy-flow chart ─────────────────────────────────────────────────────────

const CHART_DATA = ENERGY_SERIES_24H.map(d => ({ hour: d.hour, charged: d.charged, discharged: d.discharged }));
const CHART_SERIES: LineChartSeries[] = [
  { dataKey: "discharged", name: "Discharge (MWh)", color: "var(--grid-red)",     strokeWidth: 1.5 },
  { dataKey: "charged",    name: "Charge (MWh)",    color: "var(--color-info)",    strokeWidth: 1.5 },
];

// ─── Dashboard ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {/* Row 1: KPI tiles */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Total stored",      value: <span className="font-mono text-info">{STATS.storedMwh}</span>,    trend: STATS.storedTrend,  trendDir: "up" as const },
          { label: "Current discharge", value: <span className="font-mono text-primary">{STATS.dischargeMw}</span>, trend: STATS.dischargeTrend, trendDir: "neutral" as const },
          { label: "Revenue today",     value: <span className="font-mono text-primary">{STATS.revenueToday}</span>, trend: STATS.revenueTrend, trendDir: "up" as const },
          { label: "Sites online",      value: <span className="font-mono">{STATS.sitesOnline}<span className="text-h4 text-muted-foreground">/{STATS.sitesTotal}</span></span>, trend: STATS.sitesTrend, trendDir: "neutral" as const },
        ].map(card => (
          <div key={card.label} className="rounded-card transition-shadow duration-200 ease-out hover:shadow-md">
            <StatCard theme={isDark ? "dark" : "light"} label={card.label} value={card.value} trend={`▲ ${card.trend}`} trendDir={card.trendDir} />
          </div>
        ))}
      </div>

      {/* Row 2: Energy-flow chart */}
      <LineChart
        data={CHART_DATA}
        series={CHART_SERIES}
        xAxisKey="hour"
        yUnit="MWh"
        title="Energy flow, last 24 hours"
        subtitle="Charge vs discharge across all sites"
        chartHeight={160}
        theme={isDark ? "dark" : "light"}
      />

      {/* Row 3: Top sites + Grid events */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px] lg:gap-5">
        <TopSitesPanel />
        <GridEventsPanel />
      </div>
    </div>
  );
}
