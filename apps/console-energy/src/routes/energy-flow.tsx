/**
 * Energy Flow — portfolio-level live energy visualization.
 * Route: /energy-flow
 */

import * as React from "react";
import { LineChart, type LineChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { ENERGY_SERIES_24H } from "~/mocks/dashboard";
import { ALL_SITES } from "~/mocks/sites";

const CHART_DATA = ENERGY_SERIES_24H.map(d => ({
  hour: d.hour,
  charged: d.charged,
  discharged: d.discharged,
  soc: d.soc,
}));

const ENERGY_SERIES: LineChartSeries[] = [
  { dataKey: "discharged", name: "Discharge (MWh)", color: "var(--grid-red)",    strokeWidth: 1.5 },
  { dataKey: "charged",    name: "Charge (MWh)",    color: "var(--color-info)",   strokeWidth: 1.5 },
];

const SOC_SERIES: LineChartSeries[] = [
  { dataKey: "soc",        name: "Fleet avg SoC%",  color: "var(--color-success)", strokeWidth: 1.5 },
];

const FLEET_FLOW = {
  pvToGrid:   { label: "Solar PV production",    value: "28.4 MW", sub: "aggregate across 12 solar-coupled sites" },
  pvToBess:   { label: "PV to BESS charging",    value: "18.6 MW", sub: "76% of generation captured in BESS" },
  bessToGrid: { label: "BESS discharge to grid", value: "18.4 MW", sub: "current active discharge" },
  bessToLoad: { label: "BESS to C&I load",       value: "4.2 MW",  sub: "direct load supply from BESS" },
  gridToLoad: { label: "Grid to C&I load",       value: "9.8 MW",  sub: "grid covering residual demand" },
};

const ONLINE_SITES = ALL_SITES.filter(s => s.status === "online");
const TOTAL_STORED_MWH = ONLINE_SITES.reduce((a, s) => a + (s.capacityMwh * s.soc / 100), 0).toFixed(1);
const TOTAL_CAPACITY_MWH = ALL_SITES.reduce((a, s) => a + s.capacityMwh, 0).toFixed(1);
const FLEET_SOC = Math.round(Number(TOTAL_STORED_MWH) / Number(TOTAL_CAPACITY_MWH) * 100);

function FlowLeg({ label, value, sub, dir }: { label: string; value: string; sub: string; dir?: "in" | "out" | "neutral" }) {
  const accent = dir === "in" ? "text-info" : dir === "out" ? "text-primary" : "text-foreground";
  return (
    <div className="flex flex-col gap-1 rounded-card border border-border bg-card p-4">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className={`font-mono text-[22px] font-semibold leading-none ${accent}`}>{value}</span>
      <span className="font-body text-[11px] text-muted-foreground">{sub}</span>
    </div>
  );
}

export default function EnergyFlow() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex flex-col gap-6">
      {/* Fleet SoC summary */}
      <section aria-labelledby="fleet-soc-heading" className="rounded-card border border-border bg-card p-5">
        <h2 id="fleet-soc-heading" className="sr-only">Fleet energy summary</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-1">Fleet state of charge</div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-[36px] font-semibold leading-none text-info">{FLEET_SOC}%</span>
              <span className="font-body text-[13px] text-muted-foreground">{TOTAL_STORED_MWH} / {TOTAL_CAPACITY_MWH} MWh stored</span>
            </div>
            <div className="mt-2 h-2 w-full max-w-xs rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={FLEET_SOC} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-info transition-all" style={{ width: `${FLEET_SOC}%` }} />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">Sites online</span>
            <span className="font-mono text-[24px] font-semibold text-foreground">
              {ONLINE_SITES.length}
              <span className="text-[16px] text-muted-foreground">/{ALL_SITES.length}</span>
            </span>
            <span className="font-mono text-[11px] text-success">{(ONLINE_SITES.length / ALL_SITES.length * 100).toFixed(0)}% availability</span>
          </div>
        </div>
      </section>

      {/* Real-time flow legs */}
      <section aria-labelledby="energy-legs-heading">
        <h2 id="energy-legs-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">Live energy flows</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <FlowLeg {...FLEET_FLOW.pvToGrid}   dir="in"      />
          <FlowLeg {...FLEET_FLOW.pvToBess}   dir="in"      />
          <FlowLeg {...FLEET_FLOW.bessToGrid} dir="out"     />
          <FlowLeg {...FLEET_FLOW.bessToLoad} dir="out"     />
          <FlowLeg {...FLEET_FLOW.gridToLoad} dir="neutral" />
        </div>
      </section>

      {/* 24h charge/discharge chart */}
      <LineChart
        data={CHART_DATA}
        series={ENERGY_SERIES}
        xAxisKey="hour"
        yUnit="MWh"
        title="Fleet energy throughput, last 24h"
        subtitle="Charge and discharge across all sites"
        chartHeight={180}
        theme={isDark ? "dark" : "light"}
      />

      {/* 24h SoC trend */}
      <LineChart
        data={CHART_DATA}
        series={SOC_SERIES}
        xAxisKey="hour"
        yUnit="%"
        title="Fleet average state of charge, last 24h"
        subtitle="Percentage of total rated capacity"
        chartHeight={140}
        theme={isDark ? "dark" : "light"}
      />

      {/* Per-site flow table */}
      <section aria-labelledby="per-site-table-heading">
        <h2 id="per-site-table-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">Per-site current flow</h2>
        {/* Loading: replace with aria-busy skeleton rows. Empty: <EmptyState action="Add a BESS site to see energy flow." />. Error: role="alert" with retry. */}
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full" aria-label="Per-site energy flow">
              <caption className="sr-only">Real-time energy flow by site</caption>
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["Site", "SoC", "Charge", "Discharge", "Mode"].map(h => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_SITES.filter(s => s.status !== "commissioning").map(site => {
                  const isCharging = site.dischargeMw <= 0 && site.soc < 95 && site.status === "online";
                  const mode = site.status === "offline" ? "Offline" : site.status === "maintenance" ? "Maintenance" : isCharging ? "Charging" : site.dischargeMw > 0 ? "Discharging" : "Standby";
                  const modeColor = mode === "Discharging" ? "text-primary" : mode === "Charging" ? "text-info" : mode === "Standby" ? "text-muted-foreground" : "text-warning";
                  return (
                    <tr key={site.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                      <td className="px-4 py-2.5">
                        <div className="font-body text-[13px] font-medium text-foreground">{site.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{site.city}, {site.state}</div>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-10 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={site.soc} aria-valuemin={0} aria-valuemax={100}>
                            <div className="h-full rounded-full bg-info transition-all" style={{ width: `${site.soc}%` }} />
                          </div>
                          <span className="font-mono text-[11px] text-muted-foreground">{site.soc}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-info">
                        {isCharging ? `${(site.powerMw * 600).toFixed(0)} kW` : <span className="text-muted-foreground">–</span>}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-primary">
                        {site.dischargeMw > 0 ? `${(site.dischargeMw * 1000).toFixed(0)} kW` : <span className="text-muted-foreground">–</span>}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`font-mono text-[11px] font-medium ${modeColor}`}>{mode}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
