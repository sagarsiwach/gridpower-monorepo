/**
 * Grid event detail — /grid-events/:eventId
 */
import * as React from "react";
import { useParams } from "react-router";
import { LineChart, type LineChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { ALL_GRID_EVENTS } from "~/mocks/grid-events";
import { ALL_SITES } from "~/mocks/sites";
import { ENERGY_SERIES_24H } from "~/mocks/dashboard";

function MetaField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

const CHART_DATA = ENERGY_SERIES_24H.map((d, i) => ({ hour: d.hour, mw: 48 + Math.sin(i * 0.8) * 2 }));
const CHART_SERIES: LineChartSeries[] = [{ dataKey: "mw", name: "Grid frequency proxy (MW)", color: "var(--grid-red)", strokeWidth: 1.5 }];

export default function GridEventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const ev = ALL_GRID_EVENTS.find(e => e.id === eventId);

  if (!ev) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Grid event "{eventId}" not found. <a href="/grid-events" className="text-primary hover:underline">Back to events</a>
      </div>
    );
  }

  const affectedSiteDetails = ALL_SITES.filter(s => ev.affectedSites.includes(s.id));
  const severityColor = ev.severity === "critical" ? "bg-error/10 text-error" : ev.severity === "high" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground capitalize">{ev.type.replace(/-/g," ")}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${severityColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{ev.severity}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium ${ev.resolved ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
              {ev.resolved ? "Resolved" : "Active"}
            </span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{ev.timestamp} · {ev.durationSec > 0 ? `${ev.durationSec}s` : "Ongoing"} · {ev.id}</p>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-4">
        <p className="font-body text-[13px] text-foreground leading-relaxed">{ev.description}</p>
      </div>

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {ev.freqHz && <MetaField label="Frequency"  value={`${ev.freqHz} Hz`} />}
        {ev.voltagePerUnit && <MetaField label="Voltage pu" value={`${ev.voltagePerUnit} pu`} />}
        <MetaField label="Duration"    value={ev.durationSec > 0 ? `${ev.durationSec}s` : "Ongoing"} />
        <MetaField label="Sites affected" value={ev.affectedSites.length} />
        <MetaField label="Resolved at" value={ev.resolvedAt ?? "–"} />
      </div>

      {/* Waveform proxy chart */}
      <LineChart data={CHART_DATA} series={CHART_SERIES} xAxisKey="hour" yUnit="MW"
        title="Frequency response profile (representative)" subtitle="System MW balance proxy"
        chartHeight={140} theme={isDark ? "dark" : "light"} />

      {/* Response action */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-2">BESS response action</h3>
        <p className="font-body text-[13px] text-muted-foreground leading-relaxed">{ev.responseAction}</p>
      </div>

      {/* Affected sites */}
      {affectedSiteDetails.length > 0 && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="font-body text-[13px] font-semibold text-foreground">Affected sites ({ev.affectedSites.length})</h3>
          </div>
          {affectedSiteDetails.map(site => (
            <div key={site.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
              <div>
                <div className="font-body text-[13px] font-medium text-foreground">{site.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{site.city}, {site.state} · {site.capacityMwh} MWh</div>
              </div>
              <a href={`/sites/${site.id}`} className="font-body text-[11px] text-primary hover:underline">View site</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
