/**
 * Grid events list — /grid-events
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { ALL_GRID_EVENTS, type GridEventSeverity, type GridEventType } from "~/mocks/grid-events";

function SeverityPill({ severity }: { severity: GridEventSeverity }) {
  const map: Record<GridEventSeverity, { bg: string; text: string }> = {
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

const TYPE_OPTIONS: (GridEventType | "all")[] = ["all","under-frequency","over-frequency","voltage-sag","voltage-swell","reactive-support","islanding-detected"];

export default function GridEventsIndex() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = React.useState<GridEventType | "all">("all");
  const [sevFilter, setSevFilter] = React.useState<GridEventSeverity | "all">("all");

  const filtered = React.useMemo(() => {
    let list = ALL_GRID_EVENTS;
    if (typeFilter !== "all") list = list.filter(e => e.type === typeFilter);
    if (sevFilter !== "all")  list = list.filter(e => e.severity === sevFilter);
    return list;
  }, [typeFilter, sevFilter]);

  const activeCount = ALL_GRID_EVENTS.filter(e => !e.resolved).length;

  return (
    <section className="flex flex-col gap-4" aria-labelledby="grid-events-heading">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="grid-events-heading" className="font-body text-[16px] font-semibold text-foreground">Grid events</h2>
          <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{ALL_GRID_EVENTS.length} total · {activeCount} active</p>
        </div>
        {activeCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-error bg-error/10 px-3 py-1.5 font-mono text-[10px] text-error">
            <span className="w-1.5 h-1.5 rounded-full bg-error" aria-hidden="true" />{activeCount} active event{activeCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <label htmlFor="type-filter" className="font-body text-[12px] text-muted-foreground shrink-0">Type:</label>
          <select id="type-filter" value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)}
            className="h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground outline-none cursor-pointer">
            {TYPE_OPTIONS.map(t => <option key={t} value={t} className="capitalize">{t === "all" ? "All types" : t.replace(/-/g," ")}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="sev-filter" className="font-body text-[12px] text-muted-foreground shrink-0">Severity:</label>
          <select id="sev-filter" value={sevFilter} onChange={e => setSevFilter(e.target.value as typeof sevFilter)}
            className="h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground outline-none cursor-pointer">
            <option value="all">All severities</option>
            {(["critical","high","medium","low","info"] as GridEventSeverity[]).map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
          </select>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground self-center ml-auto" aria-live="polite">{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Loading: skeleton. Empty: "No grid events match — try adjusting filters." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Grid frequency and voltage events">
            <caption className="sr-only">Grid disturbance events</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Time","Type","Severity","Description","Affected","Duration","Status"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(ev => (
                <tr key={ev.id} onClick={() => navigate(`/grid-events/${ev.id}`)}
                  className={`cursor-pointer border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ${!ev.resolved ? "bg-error/5" : ""}`}>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{ev.timestamp}</td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-foreground capitalize">{ev.type.replace(/-/g," ")}</td>
                  <td className="px-4 py-2.5"><SeverityPill severity={ev.severity} /></td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground max-w-[260px] truncate">{ev.description}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{ev.affectedSites.length}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{ev.durationSec > 0 ? `${ev.durationSec}s` : "Active"}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${ev.resolved ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                      {ev.resolved ? "Resolved" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5" onClick={e => e.stopPropagation()}>
                    <button type="button" onClick={() => navigate(`/grid-events/${ev.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
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
