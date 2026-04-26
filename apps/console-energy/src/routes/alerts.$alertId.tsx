/**
 * Alert detail — /alerts/:alertId
 */
import * as React from "react";
import { useParams } from "react-router";
import { ALL_ALERTS } from "~/mocks/alerts";

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 4000); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px] tracking-[0.06em]">
      {message}
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export default function AlertDetail() {
  const { alertId } = useParams<{ alertId: string }>();
  const [notice, setNotice] = React.useState<string | null>(null);
  const [acknowledged, setAcknowledged] = React.useState(false);

  const alert = ALL_ALERTS.find(a => a.id === alertId);

  if (!alert) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Alert "{alertId}" not found. <a href="/alerts" className="text-primary hover:underline">Back to alerts</a>
      </div>
    );
  }

  const isAcked = acknowledged || alert.acknowledged;
  const severityColor = alert.severity === "critical" ? "bg-error/10 text-error" : alert.severity === "high" ? "bg-warning/10 text-warning" : alert.severity === "info" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{alert.entityName}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${severityColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{alert.severity}
            </span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{alert.timestamp} · {alert.id}</p>
        </div>
        {!isAcked && (
          <button type="button"
            onClick={() => { setAcknowledged(true); setNotice("Alert acknowledged."); }}
            className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer shrink-0">
            Acknowledge
          </button>
        )}
      </div>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      <div className="rounded-card border border-border bg-card p-4">
        <p className="font-body text-[13px] text-foreground leading-relaxed">{alert.message}</p>
        <p className="mt-2 font-body text-[12px] text-muted-foreground leading-relaxed">{alert.detail}</p>
      </div>

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <MetaField label="Source"     value={alert.source}     />
        <MetaField label="Entity"     value={alert.entityName} />
        <MetaField label="Entity ID"  value={alert.entityId}   />
        <MetaField label="Timestamp"  value={alert.timestamp}  />
        <MetaField label="Acked by"   value={isAcked ? (acknowledged ? "You (just now)" : (alert.acknowledgedBy ?? "–")) : "Not yet"} />
        <MetaField label="Acked at"   value={isAcked ? (acknowledged ? "Just now" : (alert.acknowledgedAt ?? "–")) : "–"} />
      </div>

      {/* Related links */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-3">Related resources</h3>
        <div className="flex flex-col gap-2">
          <a href={`/sites/${alert.entityId.startsWith("site_") ? alert.entityId : "site_001"}`}
            className="font-body text-[13px] text-primary hover:underline">View site detail</a>
          <a href="/grid-events" className="font-body text-[13px] text-primary hover:underline">View grid events</a>
          <a href="/maintenance" className="font-body text-[13px] text-primary hover:underline">Open maintenance work order</a>
        </div>
      </div>
    </div>
  );
}
