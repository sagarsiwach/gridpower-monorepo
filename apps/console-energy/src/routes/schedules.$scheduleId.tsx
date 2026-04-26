/**
 * Schedule detail — /schedules/:scheduleId
 */
import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { ALL_SCHEDULES } from "~/mocks/schedules";

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 3500); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px] tracking-[0.06em]">
      {message}
    </div>
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

// Simulated last 10 executions
function makeExecHistory(sch: ReturnType<typeof ALL_SCHEDULES[number]["type"]>, id: string) {
  const rows = [];
  for (let i = 0; i < 10; i++) {
    rows.push({
      date: `Apr ${27 - i}, ${i % 3 === 0 ? "18:00" : "17:00"}`,
      duration: i === 4 ? "Incomplete" : `${3}h 00m`,
      mwh: i === 4 ? 0 : 12.0 + (i % 3) * 1.2,
      status: i === 4 ? "failed" : "completed",
    });
  }
  return rows;
}

export default function ScheduleDetail() {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = React.useState<string | null>(null);
  const sch = ALL_SCHEDULES.find(s => s.id === scheduleId);

  if (!sch) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Schedule "{scheduleId}" not found. <a href="/schedules" className="text-primary hover:underline">Back to schedules</a>
      </div>
    );
  }

  const execHistory = makeExecHistory(sch.type, sch.id);
  const statusColor = sch.status === "active" ? "bg-success/10 text-success" : sch.status === "paused" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{sch.name}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${statusColor}`}>{sch.status}</span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{sch.siteName} · {sch.type.replace("-"," ")} · {sch.windowStart}–{sch.windowEnd}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" onClick={() => setNotice("Schedule paused (mock).")}
            className="px-3 py-1.5 rounded-btn border border-border font-body text-[12px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
            {sch.status === "paused" ? "Resume" : "Pause"}
          </button>
          <button type="button" onClick={() => { if (confirm("Delete this schedule?")) { setNotice("Schedule deleted (mock)."); setTimeout(() => navigate("/schedules"), 2000); } }}
            className="px-3 py-1.5 rounded-btn border border-error bg-transparent font-body text-[12px] text-error hover:bg-error/10 cursor-pointer transition-colors">
            Delete
          </button>
        </div>
      </div>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <MetaField label="Site"         value={sch.siteName}        />
        <MetaField label="Type"         value={sch.type.replace("-"," ")} />
        <MetaField label="Target MW"    value={`${sch.targetMw} MW`} />
        <MetaField label="Window"       value={`${sch.windowStart}–${sch.windowEnd}`} />
        <MetaField label="Days"         value={sch.daysOfWeek.join(", ")} />
        <MetaField label="Executions"   value={sch.executionCount}  />
        <MetaField label="Next run"     value={sch.nextRun}         />
        <MetaField label="Last run"     value={sch.lastRun ?? "Never"} />
      </div>

      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="font-body text-[13px] font-semibold text-foreground">Last 10 executions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Schedule execution history">
            <caption className="sr-only">Last 10 execution records</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Date","Duration","Energy MWh","Status"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {execHistory.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{row.date}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{row.duration}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{row.mwh > 0 ? `${row.mwh.toFixed(1)}` : "–"}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${row.status === "completed" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
