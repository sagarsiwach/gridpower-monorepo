/**
 * Analytics ROI — /analytics/roi
 */
import * as React from "react";
import { LineChart, type LineChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { SITE_ROI, CUMULATIVE_CASHFLOW } from "~/mocks/analytics";

const CASHFLOW_DATA = CUMULATIVE_CASHFLOW.slice(0, 48).map(d => ({ month: `M${d.month}`, cashflow: d.cumulative }));
const CASHFLOW_SERIES: LineChartSeries[] = [
  { dataKey: "cashflow", name: "Cumulative cashflow (₹Cr)", color: "var(--color-success)", strokeWidth: 1.5 },
];

export default function AnalyticsRoi() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-body text-[16px] font-semibold text-foreground">ROI breakdown</h2>

      {/* Cashflow chart */}
      <LineChart data={CASHFLOW_DATA} series={CASHFLOW_SERIES} xAxisKey="month" yUnit="₹Cr"
        title="Cumulative cashflow — portfolio average (₹ crore)"
        subtitle="Representative Pune Hinjewadi BESS (20 MWh, ₹12.4Cr CapEx)"
        chartHeight={160} theme={isDark ? "dark" : "light"} />

      {/* Per-site IRR table */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="font-body text-[13px] font-semibold text-foreground">Per-site ROI</h3>
        </div>
        {/* Loading: skeleton. Empty: "Add sites to see ROI." Error: role="alert". */}
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Site ROI analysis">
            <caption className="sr-only">ROI breakdown by site</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Site","Capacity","CapEx","Revenue YTD","OpEx/yr","IRR","Payback"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SITE_ROI.map(roi => (
                <tr key={roi.siteId} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5">
                    <div className="font-body text-[13px] font-medium text-foreground">{roi.siteName.replace(" BESS","")}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">Since {roi.commissionDate}</div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{roi.capacityMwh} MWh</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">₹{roi.capexCr}Cr</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-primary">₹{roi.revenueYtdCr}Cr</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">₹{roi.opexPerYearCr}Cr</td>
                  <td className="px-4 py-2.5 font-mono text-[13px] font-semibold text-success">{roi.irrPercent}%</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{roi.paybackYears} yr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
