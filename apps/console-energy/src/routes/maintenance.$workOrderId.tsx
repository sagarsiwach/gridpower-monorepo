/**
 * Work order detail — /maintenance/:workOrderId
 */
import * as React from "react";
import { useParams, useNavigate } from "react-router";
import { ALL_WORK_ORDERS } from "~/mocks/maintenance";

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t); }, [onDismiss]);
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

export default function MaintenanceDetail() {
  const { workOrderId } = useParams<{ workOrderId: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = React.useState<string | null>(null);
  const wo = ALL_WORK_ORDERS.find(w => w.id === workOrderId);

  if (!wo) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Work order "{workOrderId}" not found. <a href="/maintenance" className="text-primary hover:underline">Back to maintenance</a>
      </div>
    );
  }

  const priorityColor = wo.priority === "critical" ? "bg-error/10 text-error" : wo.priority === "high" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground";
  const statusColor = wo.status === "completed" ? "bg-success/10 text-success" : wo.status === "in-progress" ? "bg-primary/10 text-primary" : wo.status === "open" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className="font-body text-[16px] font-semibold text-foreground">{wo.title}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${priorityColor}`}>{wo.priority}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium ${statusColor}`}>{wo.status.replace("-"," ")}</span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{wo.id} · {wo.siteName} · Opened {wo.openedAt}</p>
        </div>
        {wo.status !== "completed" && wo.status !== "cancelled" && (
          <button type="button" onClick={() => { setNotice("Work order closed (mock)."); }}
            className="px-3 py-1.5 rounded-btn bg-success text-white font-body text-[12px] font-medium hover:bg-success/90 transition-colors cursor-pointer shrink-0">
            Mark complete
          </button>
        )}
      </div>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <MetaField label="Site"       value={wo.siteName}              />
        <MetaField label="Type"       value={wo.type}                  />
        <MetaField label="Assignee"   value={wo.assignee}              />
        <MetaField label="Opened"     value={wo.openedAt}              />
        <MetaField label="Due"        value={wo.dueDate}               />
        <MetaField label="Est hours"  value={`${wo.estimatedHours}h`}  />
        {wo.completedAt && <MetaField label="Completed" value={wo.completedAt} />}
      </div>

      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-2">Description</h3>
        <p className="font-body text-[13px] text-muted-foreground leading-relaxed">{wo.description}</p>
      </div>

      {wo.parts.length > 0 && (
        <div className="rounded-card border border-border bg-card p-5">
          <h3 className="font-body text-[13px] font-semibold text-foreground mb-3">Parts required</h3>
          <ul className="flex flex-col gap-1.5">
            {wo.parts.map(p => (
              <li key={p} className="flex items-center gap-2 font-body text-[13px] text-foreground">
                <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" aria-hidden="true" />{p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {wo.timeline.length > 0 && (
        <div className="rounded-card border border-border bg-card p-5">
          <h3 className="font-body text-[13px] font-semibold text-foreground mb-4">Timeline</h3>
          <ol className="flex flex-col gap-3">
            {wo.timeline.map((event, i) => (
              <li key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" aria-hidden="true" />
                  {i < wo.timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" aria-hidden="true" />}
                </div>
                <div className="pb-3">
                  <div className="font-mono text-[10px] text-muted-foreground mb-0.5">{event.timestamp} · {event.actor}</div>
                  <div className="font-body text-[13px] text-foreground">{event.action}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
