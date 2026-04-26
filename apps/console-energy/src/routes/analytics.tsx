/**
 * Analytics overview — /analytics
 */
import * as React from "react";
import { NavLink } from "react-router";
import { LineChart, type LineChartSeries } from "@gridpower/ui";
import { cn } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { ANALYTICS_KPI, REVENUE_30D } from "~/mocks/analytics";

const CHART_DATA = REVENUE_30D.map(d => ({ date: d.date, revenue: d.revenue / 100000 }));
const CHART_SERIES: LineChartSeries[] = [
  { dataKey: "revenue", name: "Revenue (₹L)", color: "var(--grid-red)", strokeWidth: 1.5 },
];

const SUB_LINKS = [
  { to: "/analytics/roi",     label: "ROI"    },
  { to: "/analytics/energy",  label: "Energy" },
  { to: "/analytics/exports", label: "Exports" },
];

export default function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-5">
      {/* Sub-nav */}
      <nav aria-label="Analytics sections" className="flex items-center gap-1 border-b border-border pb-3">
        {SUB_LINKS.map(link => (
          <NavLink key={link.to} to={link.to}
            className={({ isActive }) => cn(
              "inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
              isActive ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "MWh this year",     value: `${ANALYTICS_KPI.totalMwhThisYear.toLocaleString("en-IN")}` },
          { label: "Revenue this year", value: `₹${(ANALYTICS_KPI.revenueThisYear / 10000000).toFixed(1)}Cr` },
          { label: "Avg RTE",           value: `${ANALYTICS_KPI.avgRtePercent}%` },
          { label: "DR events",         value: String(ANALYTICS_KPI.drEventCount) },
          { label: "Avg payback",       value: `${ANALYTICS_KPI.avgPaybackYears} yr` },
          { label: "Fleet IRR",         value: `${ANALYTICS_KPI.fleetIrrPercent}%` },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-card border border-border bg-card p-4 flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{kpi.label}</span>
            <span className="font-mono text-[20px] font-semibold leading-none text-foreground">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Revenue 30d chart */}
      <LineChart data={CHART_DATA} series={CHART_SERIES} xAxisKey="date" yUnit="₹L"
        title="Revenue, last 30 days (₹ lakhs)" subtitle="All sites combined"
        chartHeight={180} theme={isDark ? "dark" : "light"} />
    </div>
  );
}
