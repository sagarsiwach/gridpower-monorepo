/**
 * Site detail — /sites/:siteId
 * Tabs: Overview / Stacks / Schedules / Maintenance
 */
import * as React from "react";
import { useParams, NavLink } from "react-router";
import { cn, LineChart, type LineChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import { ALL_SITES } from "~/mocks/sites";
import { ALL_STACKS } from "~/mocks/stacks";
import { ALL_SCHEDULES } from "~/mocks/schedules";
import { ALL_WORK_ORDERS } from "~/mocks/maintenance";
import { ENERGY_SERIES_24H } from "~/mocks/dashboard";

const CHART_DATA = ENERGY_SERIES_24H.map(d => ({ hour: d.hour, discharged: d.discharged, charged: d.charged }));
const CHART_SERIES: LineChartSeries[] = [
  { dataKey: "discharged", name: "Discharge (MWh)", color: "var(--grid-red)", strokeWidth: 1.5 },
  { dataKey: "charged",    name: "Charge (MWh)",    color: "var(--color-info)", strokeWidth: 1.5 },
];

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string }> = {
    online:        { bg: "bg-success/10", text: "text-success" },
    offline:       { bg: "bg-error/10",   text: "text-error"   },
    maintenance:   { bg: "bg-warning/10", text: "text-warning" },
    commissioning: { bg: "bg-info/10",    text: "text-info"    },
  };
  const s = map[status] ?? { bg: "bg-muted", text: "text-muted-foreground" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{status}
    </span>
  );
}

function MetaField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export default function SiteDetail() {
  const { siteId } = useParams<{ siteId: string }>();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [tab, setTab] = React.useState<"overview" | "stacks" | "schedules" | "maintenance">("overview");

  const site = ALL_SITES.find(s => s.id === siteId);
  const siteStacks = ALL_STACKS.filter(s => s.siteId === siteId);
  const siteSchedules = ALL_SCHEDULES.filter(s => s.siteId === siteId);
  const siteWOs = ALL_WORK_ORDERS.filter(w => w.siteId === siteId);

  if (!site) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Site "{siteId}" not found. <a href="/sites" className="text-primary hover:underline">Back to sites</a>
      </div>
    );
  }

  const TABS = [
    { key: "overview",    label: "Overview"    },
    { key: "stacks",      label: `Stacks (${siteStacks.length})` },
    { key: "schedules",   label: `Schedules (${siteSchedules.length})` },
    { key: "maintenance", label: `Maintenance (${siteWOs.length})` },
  ] as const;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{site.name}</h2>
            <StatusPill status={site.status} />
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{site.city}, {site.state} · Commissioned {site.commissionDate} · Customer: {site.customer}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] text-muted-foreground">{site.id}</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Capacity",  value: `${site.capacityMwh} MWh` },
          { label: "Power",     value: `${site.powerMw} MW` },
          { label: "State of charge", value: `${site.soc}%` },
          { label: "Uptime",    value: site.uptime > 0 ? `${site.uptime}%` : "–" },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-card border border-border bg-card p-4 flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{kpi.label}</span>
            <span className="font-mono text-[22px] font-semibold leading-none text-foreground">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Tab strip */}
      <nav aria-label="Site sections" className="flex flex-wrap items-center gap-1 border-b border-border pb-0">
        {TABS.map(t => (
          <button key={t.key} type="button" onClick={() => setTab(t.key as typeof tab)}
            aria-selected={tab === t.key}
            className={cn("inline-flex items-center px-3 py-2 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border-b-2 -mb-px",
              tab === t.key ? "border-primary text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Tab: Overview */}
      {tab === "overview" && (
        <div className="flex flex-col gap-4">
          <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 md:grid-cols-4">
            <MetaField label="Stack count"     value={site.stackCount}      />
            <MetaField label="Last seen"       value={site.lastSeen}        />
            <MetaField label="Revenue today"   value={`₹${site.revenueToday.toLocaleString("en-IN")}`} />
            <MetaField label="Discharge MW"    value={site.dischargeMw > 0 ? `${site.dischargeMw} MW` : "–"} />
          </div>
          <LineChart data={CHART_DATA} series={CHART_SERIES} xAxisKey="hour" yUnit="MWh"
            title="Energy flow, last 24h" subtitle="Representative fleet data" chartHeight={160} theme={isDark ? "dark" : "light"} />
        </div>
      )}

      {/* Tab: Stacks */}
      {tab === "stacks" && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          {siteStacks.length === 0 ? (
            <div className="px-6 py-14 text-center font-body text-[14px] text-foreground">No stacks registered for this site. Add a stack to start tracking.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full" aria-label="Site stacks">
                <caption className="sr-only">Battery stacks at this site</caption>
                <thead>
                  <tr className="border-b border-border bg-muted">
                    {["Stack ID","Manufacturer","Model","Capacity","SoH","SoC","Cycles","Status","Firmware"].map(h => (
                      <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteStacks.map(stk => (
                    <tr key={stk.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{stk.id}</td>
                      <td className="px-4 py-2.5 font-body text-[12px] text-foreground">{stk.manufacturer}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{stk.model}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{stk.capacityKwh} kWh</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{stk.soh}%</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-8 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={stk.soc} aria-valuemin={0} aria-valuemax={100}>
                            <div className="h-full rounded-full bg-info" style={{ width: `${stk.soc}%` }} />
                          </div>
                          <span className="font-mono text-[11px] text-muted-foreground">{stk.soc}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{stk.cycles}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${stk.status === "online" ? "bg-success/10 text-success" : stk.status === "fault" ? "bg-error/10 text-error" : "bg-warning/10 text-warning"}`}>
                          {stk.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">v{stk.firmwareVersion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab: Schedules */}
      {tab === "schedules" && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          {siteSchedules.length === 0 ? (
            <div className="px-6 py-14 text-center font-body text-[14px] text-foreground">No schedules for this site. Create a discharge schedule to start.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full" aria-label="Site schedules">
                <caption className="sr-only">Discharge schedules at this site</caption>
                <thead>
                  <tr className="border-b border-border bg-muted">
                    {["Name","Type","Window","Target MW","Days","Status","Next run","Executions"].map(h => (
                      <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteSchedules.map(sch => (
                    <tr key={sch.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                      <td className="px-4 py-2.5">
                        <div className="font-body text-[13px] font-medium text-foreground">{sch.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{sch.id}</div>
                      </td>
                      <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground capitalize">{sch.type.replace("-"," ")}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-foreground">{sch.windowStart}–{sch.windowEnd}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-primary">{sch.targetMw} MW</td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-muted-foreground">{sch.daysOfWeek.join(", ")}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${sch.status === "active" ? "bg-success/10 text-success" : sch.status === "paused" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                          {sch.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{sch.nextRun}</td>
                      <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{sch.executionCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab: Maintenance */}
      {tab === "maintenance" && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          {siteWOs.length === 0 ? (
            <div className="px-6 py-14 text-center font-body text-[14px] text-foreground">No work orders for this site. Create one when maintenance is needed.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full" aria-label="Site work orders">
                <caption className="sr-only">Maintenance work orders for this site</caption>
                <thead>
                  <tr className="border-b border-border bg-muted">
                    {["WO#","Title","Type","Priority","Status","Assignee","Opened","Due"].map(h => (
                      <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {siteWOs.map(wo => (
                    <tr key={wo.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{wo.id}</td>
                      <td className="px-4 py-2.5 font-body text-[13px] text-foreground max-w-[200px] truncate">{wo.title}</td>
                      <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground capitalize">{wo.type}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${wo.priority === "critical" ? "bg-error/10 text-error" : wo.priority === "high" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                          {wo.priority}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${wo.status === "completed" ? "bg-success/10 text-success" : wo.status === "in-progress" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>
                          {wo.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground">{wo.assignee}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{wo.openedAt}</td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{wo.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
