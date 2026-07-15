/**
 * Demand Response overview — /demand-response (index)
 */
import { useNavigate } from "react-router";
import { DR_SUMMARY, ALL_DR_EVENTS } from "~/mocks/demand-response";

export default function DemandResponseIndex() {
  const navigate = useNavigate();
  const upcoming = ALL_DR_EVENTS.filter(e => e.status === "upcoming");
  const active   = ALL_DR_EVENTS.filter(e => e.status === "active");

  return (
    <div className="flex flex-col gap-5">
      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Active programs", value: String(DR_SUMMARY.activeProgramsCount) },
          { label: "MW dispatched MTD", value: `${DR_SUMMARY.mwDispatchedMtd} MW` },
          { label: "Revenue MTD",      value: `₹${(DR_SUMMARY.revenueMtd / 100000).toFixed(1)}L` },
          { label: "Upcoming events",  value: String(DR_SUMMARY.upcomingEventsCount) },
        ].map(kpi => (
          <div key={kpi.label} className="rounded-card border border-border bg-card p-4 flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{kpi.label}</span>
            <span className="font-mono text-[26px] font-semibold leading-none text-foreground">{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Active events */}
      {active.length > 0 && (
        <div className="rounded-card border border-primary bg-primary/5 p-4">
          <h3 className="font-body text-[12px] font-semibold text-primary mb-2">Active dispatch right now</h3>
          {active.map(ev => (
            <div key={ev.id} className="flex items-center justify-between gap-3">
              <div>
                <div className="font-body text-[13px] font-medium text-foreground">{ev.programName}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{ev.dispatchedMw} MW dispatched · {ev.sitesParticipating} sites</div>
              </div>
              <button type="button" onClick={() => navigate(`/demand-response/events/${ev.id}`)}
                className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View event</button>
            </div>
          ))}
        </div>
      )}

      {/* Upcoming events */}
      {upcoming.length > 0 && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="font-body text-[13px] font-semibold text-foreground">Upcoming events</h3>
          </div>
          {upcoming.map(ev => (
            <div key={ev.id} className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border last:border-0">
              <div>
                <div className="font-body text-[13px] font-medium text-foreground">{ev.programName}</div>
                <div className="font-mono text-[11px] text-muted-foreground">{ev.startTime} · {ev.requestedMw} MW requested · {ev.sitesParticipating} sites</div>
              </div>
              <button type="button" onClick={() => navigate(`/demand-response/events/${ev.id}`)}
                className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
