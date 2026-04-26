/**
 * Alert center — /alerts
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { ALL_ALERTS, type AlertSeverity, type AlertSource } from "~/mocks/alerts";

function SeverityPill({ severity }: { severity: AlertSeverity }) {
  const map: Record<AlertSeverity, { bg: string; text: string }> = {
    critical: { bg: "bg-error/10",   text: "text-error"   },
    high:     { bg: "bg-warning/10", text: "text-warning" },
    medium:   { bg: "bg-warning/10", text: "text-warning" },
    low:      { bg: "bg-muted",      text: "text-muted-foreground" },
    info:     { bg: "bg-info/10",    text: "text-info"    },
  };
  const s = map[severity];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{severity}
    </span>
  );
}

const SOURCE_OPTS: (AlertSource | "all")[] = ["all","bess","stack","grid","schedule","firmware","system"];
const SEV_OPTS: (AlertSeverity | "all")[] = ["all","critical","high","medium","low","info"];

export default function AlertsIndex() {
  const navigate = useNavigate();
  const [sevFilter, setSevFilter] = React.useState<AlertSeverity | "all">("all");
  const [srcFilter, setSrcFilter] = React.useState<AlertSource | "all">("all");
  const [ackedFilter, setAckedFilter] = React.useState<"all" | "unacked" | "acked">("all");

  const filtered = React.useMemo(() => {
    let list = ALL_ALERTS;
    if (sevFilter !== "all")   list = list.filter(a => a.severity === sevFilter);
    if (srcFilter !== "all")   list = list.filter(a => a.source === srcFilter);
    if (ackedFilter === "unacked") list = list.filter(a => !a.acknowledged);
    if (ackedFilter === "acked")   list = list.filter(a => a.acknowledged);
    return list;
  }, [sevFilter, srcFilter, ackedFilter]);

  const unackedCount = ALL_ALERTS.filter(a => !a.acknowledged).length;

  return (
    <section className="flex flex-col gap-4" aria-labelledby="alerts-heading">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 id="alerts-heading" className="font-body text-[16px] font-semibold text-foreground">Alerts</h2>
          {unackedCount > 0 && (
            <span className="font-mono text-[10px] bg-primary text-white rounded-full px-2 py-0.5 leading-none" aria-label={`${unackedCount} unacknowledged`}>
              {unackedCount}
            </span>
          )}
        </div>
        <span className="font-mono text-[11px] text-muted-foreground" aria-live="polite">{filtered.length} alert{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label htmlFor="sev-filter" className="font-body text-[12px] text-muted-foreground shrink-0">Severity:</label>
          <select id="sev-filter" value={sevFilter} onChange={e => setSevFilter(e.target.value as typeof sevFilter)}
            className="h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground outline-none cursor-pointer">
            {SEV_OPTS.map(s => <option key={s} value={s} className="capitalize">{s === "all" ? "All" : s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="src-filter" className="font-body text-[12px] text-muted-foreground shrink-0">Source:</label>
          <select id="src-filter" value={srcFilter} onChange={e => setSrcFilter(e.target.value as typeof srcFilter)}
            className="h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground outline-none cursor-pointer">
            {SOURCE_OPTS.map(s => <option key={s} value={s} className="capitalize">{s === "all" ? "All sources" : s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Acknowledgement filter">
          {(["all","unacked","acked"] as const).map(k => (
            <button key={k} type="button" onClick={() => setAckedFilter(k)} aria-pressed={ackedFilter === k}
              className={`inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border capitalize ${ackedFilter === k ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted"}`}>
              {k === "unacked" ? "Unacknowledged" : k === "acked" ? "Acknowledged" : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Loading: skeleton. Empty: "No alerts match — all clear." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Alert center">
            <caption className="sr-only">System alerts and events</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Time","Severity","Source","Entity","Message","Acked"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(alert => (
                <tr key={alert.id} onClick={() => navigate(`/alerts/${alert.id}`)}
                  className={`cursor-pointer border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ${!alert.acknowledged ? "bg-muted/50" : ""}`}>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{alert.timestamp}</td>
                  <td className="px-4 py-2.5"><SeverityPill severity={alert.severity} /></td>
                  <td className="px-4 py-2.5">
                    <span className="inline-flex rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground capitalize">{alert.source}</span>
                  </td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-foreground max-w-[120px] truncate">{alert.entityName}</td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground max-w-[260px] truncate">{alert.message}</td>
                  <td className="px-4 py-2.5">
                    {alert.acknowledged ? (
                      <span className="font-mono text-[10px] text-success">Acked</span>
                    ) : (
                      <span className="font-mono text-[10px] text-error font-medium">Pending</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5" onClick={e => e.stopPropagation()}>
                    <button type="button" onClick={() => navigate(`/alerts/${alert.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
