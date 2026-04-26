/**
 * Firmware overview — /firmware (index)
 */
import { useNavigate } from "react-router";
import { ALL_FIRMWARE_VERSIONS, ALL_ROLLOUTS } from "~/mocks/firmware";
import { ALL_STACKS } from "~/mocks/stacks";

export default function FirmwareIndexRoute() {
  const navigate = useNavigate();
  const latestStable = ALL_FIRMWARE_VERSIONS.find(v => v.status === "stable");
  const activeRollouts = ALL_ROLLOUTS.filter(r => r.status === "active");
  const stacksNeedingUpdate = ALL_STACKS.filter(s => s.firmwareVersion !== "2.4.1");

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">Latest stable</span>
          <span className="font-mono text-[26px] font-semibold leading-none text-foreground">v{latestStable?.version}</span>
          <span className="font-body text-[11px] text-muted-foreground">Released {latestStable?.releaseDate}</span>
        </div>
        <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">Active rollouts</span>
          <span className="font-mono text-[26px] font-semibold leading-none text-foreground">{activeRollouts.length}</span>
          <span className="font-body text-[11px] text-muted-foreground">Rollouts in progress</span>
        </div>
        <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">Stacks needing update</span>
          <span className="font-mono text-[26px] font-semibold leading-none text-foreground">{stacksNeedingUpdate.length}</span>
          <span className="font-body text-[11px] text-muted-foreground">Not on latest stable</span>
        </div>
      </div>

      {activeRollouts.length > 0 && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
            <h3 className="font-body text-[13px] font-semibold text-foreground">Active rollouts</h3>
            <button type="button" onClick={() => navigate("/firmware/rollouts")} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View all</button>
          </div>
          {activeRollouts.map(rollout => {
            const pct = rollout.stacksTotal > 0 ? Math.round(rollout.stacksDone / rollout.stacksTotal * 100) : 0;
            return (
              <div key={rollout.id} className="px-5 py-4 border-b border-border last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-body text-[13px] font-medium text-foreground">{rollout.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">v{rollout.targetVersion} · {rollout.stacksDone}/{rollout.stacksTotal} stacks</div>
                  </div>
                  <span className="font-mono text-[13px] font-semibold text-primary">{pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {latestStable && (
        <div className="rounded-card border border-border bg-card p-5">
          <h3 className="font-body text-[13px] font-semibold text-foreground mb-2">Latest release notes</h3>
          <div className="font-mono text-[10px] text-muted-foreground mb-1.5">v{latestStable.version} · {latestStable.releaseDate} · Compatible: {latestStable.compatibility.join(", ")}</div>
          <p className="font-body text-[13px] text-muted-foreground leading-relaxed">{latestStable.changelogExcerpt}</p>
        </div>
      )}
    </div>
  );
}
