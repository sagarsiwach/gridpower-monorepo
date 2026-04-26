/**
 * DR event detail — /demand-response/events/:eventId
 */
import * as React from "react";
import { useParams } from "react-router";
import { ALL_DR_EVENTS } from "~/mocks/demand-response";
import { ALL_SITES } from "~/mocks/sites";

function MetaField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export default function DREventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const ev = ALL_DR_EVENTS.find(e => e.id === eventId);

  if (!ev) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Event "{eventId}" not found. <a href="/demand-response/events" className="text-primary hover:underline">Back to events</a>
      </div>
    );
  }

  const participatingSites = ALL_SITES.slice(0, ev.sitesParticipating);
  const perSiteMw = ev.dispatchedMw > 0 ? (ev.dispatchedMw / ev.sitesParticipating).toFixed(1) : "–";
  const perSiteRevenue = ev.revenue > 0 ? Math.round(ev.revenue / ev.sitesParticipating) : 0;

  const statusColor = ev.status === "completed" ? "bg-success/10 text-success" : ev.status === "active" ? "bg-primary/10 text-primary" : ev.status === "upcoming" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{ev.programName}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${statusColor}`}>{ev.status}</span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{ev.startTime} – {ev.endTime} · {ev.durationMin} min · {ev.id}</p>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <MetaField label="Dispatched"    value={ev.dispatchedMw > 0 ? `${ev.dispatchedMw} MW` : "–"} />
        <MetaField label="Requested"     value={`${ev.requestedMw} MW`} />
        <MetaField label="Revenue"       value={ev.revenue > 0 ? `₹${ev.revenue.toLocaleString("en-IN")}` : "–"} />
        <MetaField label="Sites"         value={ev.sitesParticipating} />
        <MetaField label="Duration"      value={`${ev.durationMin} min`} />
        <MetaField label="Fulfillment"   value={ev.dispatchedMw > 0 ? `${Math.round(ev.dispatchedMw / ev.requestedMw * 100)}%` : "–"} />
        <MetaField label="Per site avg"  value={`${perSiteMw} MW`} />
        <MetaField label="Per site rev"  value={perSiteRevenue > 0 ? `₹${perSiteRevenue.toLocaleString("en-IN")}` : "–"} />
      </div>

      {/* Event timeline */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-4">Event timeline</h3>
        <ol className="flex flex-col gap-3">
          {[
            { time: ev.startTime,                        event: "Dispatch signal received from utility" },
            { time: `${ev.startTime.split(", ")[0]}, ${ev.startTime.split(", ")[1]?.split(":")[0] || ""}:01`, event: "BESS dispatch confirmed, charging suspended" },
            { time: ev.startTime,                        event: `${ev.dispatchedMw} MW discharge active across ${ev.sitesParticipating} sites` },
            { time: ev.endTime,                          event: "Dispatch window ended, BESS returning to standby" },
            { time: ev.endTime,                          event: `Settlement report: ₹${ev.revenue.toLocaleString("en-IN")}` },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap pt-0.5 w-28 shrink-0">{item.time}</span>
              <span className="font-body text-[12px] text-foreground">{item.event}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Per-site dispatch */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="font-body text-[13px] font-semibold text-foreground">Per-site dispatch</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Per-site dispatch for this event">
            <caption className="sr-only">Dispatch contribution by site</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Site","Dispatched MW","Requested MW","Revenue","Response time"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participatingSites.map((site, i) => (
                <tr key={site.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5">
                    <div className="font-body text-[13px] text-foreground">{site.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{site.city}, {site.state}</div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-primary">{perSiteMw} MW</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">{(ev.requestedMw / ev.sitesParticipating).toFixed(1)} MW</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{perSiteRevenue > 0 ? `₹${perSiteRevenue.toLocaleString("en-IN")}` : "–"}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-success">{(0.3 + i * 0.04).toFixed(2)}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
