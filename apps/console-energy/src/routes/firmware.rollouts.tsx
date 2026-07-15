/**
 * Firmware rollouts list — /firmware/rollouts
 */
import { useNavigate } from "react-router";
import { ALL_ROLLOUTS } from "~/mocks/firmware";

export default function FirmwareRollouts() {
  const navigate = useNavigate();
  return (
    <section aria-labelledby="fw-rollouts-heading" className="flex flex-col gap-4">
      <h2 id="fw-rollouts-heading" className="font-body text-[16px] font-semibold text-foreground">Rollouts</h2>
      {/* Loading: skeleton. Empty: "No rollouts yet." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Firmware rollout list">
            <caption className="sr-only">Firmware deployment rollouts</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Name","Target version","From version","Sites","Progress","Status","Started"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {ALL_ROLLOUTS.map(ro => {
                const pct = ro.stacksTotal > 0 ? Math.round(ro.stacksDone / ro.stacksTotal * 100) : 0;
                return (
                  <tr key={ro.id} onClick={() => navigate(`/firmware/rollouts/${ro.id}`)}
                    className="cursor-pointer border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                    <td className="px-4 py-2.5">
                      <div className="font-body text-[13px] font-medium text-foreground">{ro.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{ro.id}</div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">v{ro.targetVersion}</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{ro.fromVersion}</td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{ro.sitesCount}</td>
                    <td className="px-4 py-2.5 min-w-[140px]">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                          <div className={`h-full rounded-full transition-all ${ro.status === "failed" ? "bg-error" : "bg-primary"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">{ro.stacksDone}/{ro.stacksTotal}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${ro.status === "active" ? "bg-primary/10 text-primary" : ro.status === "completed" ? "bg-success/10 text-success" : ro.status === "failed" ? "bg-error/10 text-error" : ro.status === "scheduled" ? "bg-info/10 text-info" : "bg-warning/10 text-warning"}`}>
                        {ro.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{ro.startedAt ?? ro.scheduledAt ?? "–"}</td>
                    <td className="px-4 py-2.5" onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => navigate(`/firmware/rollouts/${ro.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
