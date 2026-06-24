/**
 * DR events list — /demand-response/events
 */
import { useNavigate } from "react-router";
import { ALL_DR_EVENTS } from "~/mocks/demand-response";

export default function DemandResponseEvents() {
  const navigate = useNavigate();
  return (
    <section aria-labelledby="dr-events-heading" className="flex flex-col gap-4">
      <h2 id="dr-events-heading" className="font-body text-[16px] font-semibold text-foreground">Events</h2>
      {/* Loading: skeleton. Empty: "No DR events yet — events appear when a program dispatches." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Demand response events">
            <caption className="sr-only">DR dispatch events</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Time","Program","Duration","Dispatched","Requested","Revenue","Sites","Status"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {ALL_DR_EVENTS.map(ev => (
                <tr key={ev.id} onClick={() => navigate(`/demand-response/events/${ev.id}`)}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{ev.startTime}</td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-foreground">{ev.programName}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{ev.durationMin > 0 ? `${ev.durationMin} min` : "–"}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-primary">{ev.dispatchedMw > 0 ? `${ev.dispatchedMw} MW` : "–"}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">{ev.requestedMw} MW</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{ev.revenue > 0 ? `₹${ev.revenue.toLocaleString("en-IN")}` : "–"}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{ev.sitesParticipating}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${ev.status === "completed" ? "bg-success/10 text-success" : ev.status === "active" ? "bg-primary/10 text-primary" : ev.status === "upcoming" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>
                      {ev.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5" onClick={e => e.stopPropagation()}>
                    <button type="button" onClick={() => navigate(`/demand-response/events/${ev.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
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
