/**
 * Firmware rollout detail — /firmware/rollouts/:rolloutId
 */
import * as React from "react";
import { useParams } from "react-router";
import { ALL_ROLLOUTS } from "~/mocks/firmware";

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 3500); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px] tracking-[0.06em]">
      {message}
    </div>
  );
}

export default function FirmwareRolloutDetail() {
  const { rolloutId } = useParams<{ rolloutId: string }>();
  const [notice, setNotice] = React.useState<string | null>(null);
  const rollout = ALL_ROLLOUTS.find(r => r.id === rolloutId);

  if (!rollout) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Rollout "{rolloutId}" not found. <a href="/firmware/rollouts" className="text-primary hover:underline">Back to rollouts</a>
      </div>
    );
  }

  const pct = rollout.stacksTotal > 0 ? Math.round(rollout.stacksDone / rollout.stacksTotal * 100) : 0;
  const statusColor = rollout.status === "active" ? "bg-primary/10 text-primary" : rollout.status === "completed" ? "bg-success/10 text-success" : rollout.status === "failed" ? "bg-error/10 text-error" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{rollout.name}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${statusColor}`}>{rollout.status}</span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">v{rollout.fromVersion} to v{rollout.targetVersion} · {rollout.sitesCount} sites · {rollout.stacksTotal} stacks</p>
        </div>
        {rollout.status === "active" && (
          <button type="button" onClick={() => setNotice("Rollout paused (mock).")}
            className="px-3 py-1.5 rounded-btn border border-border font-body text-[12px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors shrink-0">
            Pause rollout
          </button>
        )}
        {rollout.status === "paused" && (
          <button type="button" onClick={() => setNotice("Rollout resumed (mock).")}
            className="px-3 py-1.5 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 cursor-pointer transition-colors shrink-0">
            Resume rollout
          </button>
        )}
      </div>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      {/* Progress chart (simplified progress bar with cumulative count) */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-3">Rollout progress</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-[12px] text-muted-foreground">{rollout.stacksDone} of {rollout.stacksTotal} stacks updated</span>
          <span className="font-mono text-[14px] font-semibold text-primary">{pct}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className={`h-full rounded-full transition-all ${rollout.status === "failed" ? "bg-error" : "bg-primary"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Per-site status table */}
      {rollout.sites.length > 0 && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="font-body text-[13px] font-semibold text-foreground">Per-site status</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full" aria-label="Per-site rollout status">
              <caption className="sr-only">Firmware rollout status per site</caption>
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["Site","Stacks total","Done","Status"].map(h => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rollout.sites.map(site => (
                  <tr key={site.siteId} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                    <td className="px-4 py-2.5">
                      <div className="font-body text-[13px] text-foreground">{site.siteName}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{site.siteId}</div>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{site.stacksTotal}</td>
                    <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{site.stacksDone}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${site.status === "done" ? "bg-success/10 text-success" : site.status === "in-progress" ? "bg-primary/10 text-primary" : site.status === "failed" ? "bg-error/10 text-error" : "bg-muted text-muted-foreground"}`}>
                        {site.status.replace("-"," ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
