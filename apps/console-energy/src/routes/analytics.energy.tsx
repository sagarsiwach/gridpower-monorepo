/**
 * Analytics energy — /analytics/energy
 */
import * as React from "react";
import { BarChart, type BarChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { MONTHLY_ENERGY, UTILISATION_DATA, UTILISATION_ROW_LABELS, UTILISATION_COL_LABELS } from "~/mocks/analytics";

const BAR_DATA = MONTHLY_ENERGY.map(d => ({ month: d.month.replace(" 20","'"), charged: d.chargedMwh, discharged: d.dischargedMwh }));
const BAR_SERIES: BarChartSeries[] = [
  { dataKey: "charged",    name: "Charged (MWh)",    color: "var(--color-info)",     highlightLast: false },
  { dataKey: "discharged", name: "Discharged (MWh)", color: "var(--grid-red)", highlightLast: false },
];

export default function AnalyticsEnergy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-5">
      <h2 className="font-body text-[16px] font-semibold text-foreground">Energy throughput</h2>

      <BarChart data={BAR_DATA} series={BAR_SERIES} xAxisKey="month" yUnit="MWh"
        title="Monthly charge and discharge (MWh)" subtitle="All sites combined · last 12 months"
        chartHeight={200} theme={isDark ? "dark" : "light"} />

      {/* RTE table */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="font-body text-[13px] font-semibold text-foreground">Round-trip efficiency by month</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Monthly round-trip efficiency">
            <caption className="sr-only">Round-trip efficiency table</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Month","Charged MWh","Discharged MWh","RTE %"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHLY_ENERGY.map(row => (
                <tr key={row.month} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5 font-body text-[13px] text-foreground">{row.month}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-info">{row.chargedMwh.toLocaleString()}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-primary">{row.dischargedMwh.toLocaleString()}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] font-semibold text-success">{row.rtePercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Utilisation heatmap (simplified grid) */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-4">Capacity utilisation heatmap (site × month)</h3>
        <div className="overflow-x-auto">
          <table aria-label="Utilisation heatmap">
            <caption className="sr-only">Site utilisation by month (0-5 scale)</caption>
            <thead>
              <tr>
                <th scope="col" className="w-28" />
                {UTILISATION_COL_LABELS.map(c => (
                  <th key={c} scope="col" className="px-1 py-1 font-mono text-[9px] text-muted-foreground font-normal text-center">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {UTILISATION_ROW_LABELS.map((row, ri) => (
                <tr key={row}>
                  <th scope="row" className="pr-3 font-mono text-[9px] text-muted-foreground font-normal text-right">{row}</th>
                  {UTILISATION_DATA[ri]!.map((val, ci) => {
                    const opacity = val / 5;
                    return (
                      <td key={ci} className="p-0.5">
                        <div
                          className="w-8 h-5 rounded-sm bg-primary transition-opacity"
                          style={{ opacity: 0.1 + opacity * 0.9 }}
                          title={`${row}, ${UTILISATION_COL_LABELS[ci]}: ${val}/5`}
                          aria-label={`${row} ${UTILISATION_COL_LABELS[ci]}: ${val} out of 5`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
