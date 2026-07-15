/**
 * Alert detail — /alerts/:alertId
 *
 * Full detail view for a single alert: header, technical detail JSON viewer,
 * action history, linked entities, comments, and sticky action bar.
 */

import * as React from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  MessageSquare,
  Send,
  Shield,
  Slack,
  Wrench,
} from "lucide-react";

import {
  getAlert,
  type AlertSeverity,
  type AlertStatus,
  type AlertWithStatus,
} from "~/mocks/alerts";

// ─── Time helpers ─────────────────────────────────────────────────────────────

const NOW = new Date("2026-04-25T09:00:00Z");

function relativeTime(iso: string): string {
  const diff = Math.floor((NOW.getTime() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function absoluteTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ─── Severity helpers ─────────────────────────────────────────────────────────

function severityBg(s: AlertSeverity): string {
  switch (s) {
    case "critical": return "bg-error/10";
    case "warning":  return "bg-warning/10";
    case "info":     return "bg-info/10";
  }
}

function severityText(s: AlertSeverity): string {
  switch (s) {
    case "critical": return "text-error";
    case "warning":  return "text-warning";
    case "info":     return "text-info";
  }
}

function severityDot(s: AlertSeverity): string {
  switch (s) {
    case "critical": return "bg-error";
    case "warning":  return "bg-warning";
    case "info":     return "bg-info";
  }
}

const SEVERITY_LABEL: Record<AlertSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusBg(s: AlertStatus): string {
  switch (s) {
    case "open":     return "bg-error/10 text-error";
    case "acked":    return "bg-warning/10 text-warning";
    case "resolved": return "bg-success/10 text-success";
    case "snoozed":  return "bg-muted text-muted-foreground";
  }
}

const STATUS_LABEL: Record<AlertStatus, string> = {
  open: "Open",
  acked: "Ack'd",
  resolved: "Resolved",
  snoozed: "Snoozed",
};

// ─── Source label ─────────────────────────────────────────────────────────────

const SOURCE_LABEL: Record<string, string> = {
  system: "System",
  manual: "Manual",
  integration: "Integration",
};

// ─── JSON viewer (collapsible) ────────────────────────────────────────────────

function JsonViewer({ data }: { data: Record<string, unknown> }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="rounded-card border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-4 py-2.5 bg-muted hover:bg-accent transition-colors duration-150 ease-out"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          Technical detail
        </span>
        <ChevronDown
          size={14}
          aria-hidden
          className={`text-muted-foreground transition-transform duration-200 ease-out ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="overflow-x-auto bg-card">
          <pre className="p-4 font-mono text-[11px] leading-relaxed text-foreground whitespace-pre-wrap break-words">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── Action history timeline ──────────────────────────────────────────────────

function ActionHistory({ alert }: { alert: AlertWithStatus }) {
  const events: { label: string; by: string; at: string }[] = [];

  events.push({
    label: "Alert created",
    by: SOURCE_LABEL[alert.source] ?? alert.source,
    at: alert.created_at,
  });

  if (alert.acked_by && alert.acked_at) {
    events.push({
      label: "Acknowledged",
      by: alert.acked_by,
      at: alert.acked_at,
    });
  }

  if (alert.snoozed_until) {
    events.push({
      label: "Snoozed",
      by: "Operator",
      at: alert.created_at, // approximate
    });
  }

  if (alert.resolved_by && alert.resolved_at) {
    events.push({
      label: "Resolved",
      by: alert.resolved_by,
      at: alert.resolved_at,
    });
  }

  return (
    <section aria-labelledby="action-history-heading" className="space-y-3">
      <h3
        id="action-history-heading"
        className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
      >
        Action history
      </h3>
      <ol className="relative border-l border-border ml-3 flex flex-col gap-0">
        {events.map((ev, i) => (
          <li key={i} className="relative pl-5 pb-4 last:pb-0">
            {/* Timeline dot */}
            <span
              className="absolute -left-[5px] top-[5px] h-2.5 w-2.5 rounded-full border-2 border-border bg-card"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-body text-[13px] font-medium text-foreground">
                {ev.label}
              </span>
              <span className="font-body text-[12px] text-muted-foreground">
                by {ev.by}
              </span>
              <span
                className="font-mono text-[11px] text-muted-foreground cursor-default"
                title={absoluteTime(ev.at)}
              >
                {relativeTime(ev.at)}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ─── Linked entities ──────────────────────────────────────────────────────────

function LinkedEntities({ alert }: { alert: AlertWithStatus }) {
  return (
    <section aria-labelledby="linked-entities-heading" className="space-y-3">
      <h3
        id="linked-entities-heading"
        className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
      >
        Linked entities
      </h3>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {/* Station card */}
        <Link
          to={`/stations/${alert.station_id}`}
          className="group flex items-center justify-between gap-3 rounded-card border border-border bg-card px-4 py-3 hover:bg-muted transition-colors duration-150 ease-out sm:w-64"
        >
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Station
            </span>
            <span className="font-body text-[13px] font-medium text-foreground truncate">
              {alert.station_name}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {alert.station_id}
            </span>
          </div>
          <ChevronRight
            size={14}
            aria-hidden
            className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-150 ease-out"
          />
        </Link>

        {/* Session card (if applicable) */}
        {alert.session_id && (
          <Link
            to={`/sessions/${alert.session_id}`}
            className="group flex items-center justify-between gap-3 rounded-card border border-border bg-card px-4 py-3 hover:bg-muted transition-colors duration-150 ease-out sm:w-64"
          >
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                Session
              </span>
              <span className="font-body text-[13px] font-medium text-foreground truncate">
                {alert.session_id}
              </span>
            </div>
            <ChevronRight
              size={14}
              aria-hidden
              className="shrink-0 text-muted-foreground group-hover:text-foreground transition-colors duration-150 ease-out"
            />
          </Link>
        )}
      </div>
    </section>
  );
}

// ─── Comments ─────────────────────────────────────────────────────────────────

function CommentsSection({ alert }: { alert: AlertWithStatus }) {
  const [draft, setDraft] = React.useState("");

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!draft.trim()) return;
      console.log("[alerts] new comment:", draft.trim(), "on alert:", alert.id);
      setDraft("");
    },
    [draft, alert.id],
  );

  return (
    <section aria-labelledby="comments-heading" className="space-y-3">
      <h3
        id="comments-heading"
        className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
      >
        Comments ({alert.comments.length})
      </h3>

      {/* Comment list */}
      {alert.comments.length > 0 ? (
        <ol className="flex flex-col gap-0 rounded-card border border-border overflow-hidden">
          {alert.comments.map((c, i) => (
            <li
              key={c.id}
              className={`flex items-start gap-3 px-4 py-3 ${i < alert.comments.length - 1 ? "border-b border-border" : ""}`}
            >
              {/* Avatar */}
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] text-foreground"
                aria-hidden="true"
              >
                {c.authorInitial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="font-body text-[13px] font-medium text-foreground">
                    {c.author}
                  </span>
                  <span
                    className="font-mono text-[10px] text-muted-foreground cursor-default"
                    title={absoluteTime(c.created_at)}
                  >
                    {relativeTime(c.created_at)}
                  </span>
                </div>
                <p className="font-body text-[13px] text-muted-foreground leading-snug">
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rounded-card border border-border bg-card px-4 py-6 text-center">
          <MessageSquare size={20} className="mx-auto mb-2 text-muted-foreground" aria-hidden />
          <p className="font-body text-[12px] text-muted-foreground">
            No comments yet. Add one below.
          </p>
        </div>
      )}

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="new-comment" className="sr-only">
          Add a comment
        </label>
        <textarea
          id="new-comment"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a comment..."
          rows={3}
          className="w-full resize-y rounded-card border border-border bg-card px-3 py-2.5 font-body text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim()}
            className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 font-body text-[12px] font-medium text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-primary/90 transition-colors duration-150 ease-out"
          >
            <Send size={11} aria-hidden />
            Comment
          </button>
        </div>
      </form>
    </section>
  );
}

// ─── Snooze duration picker ───────────────────────────────────────────────────

const SNOOZE_OPTIONS = [
  { label: "1 hour", value: "1h" },
  { label: "4 hours", value: "4h" },
  { label: "Until tomorrow", value: "tomorrow" },
] as const;

// ─── Sticky action bar ────────────────────────────────────────────────────────

function StickyActionBar({ alert }: { alert: AlertWithStatus }) {
  const [snoozeOpen, setSnoozeOpen] = React.useState(false);
  const snoozeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!snoozeOpen) return;
    function handler(e: MouseEvent) {
      if (snoozeRef.current && !snoozeRef.current.contains(e.target as Node)) {
        setSnoozeOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [snoozeOpen]);

  const handleAck = React.useCallback(() => {
    console.log("[alerts] ack:", alert.id);
  }, [alert.id]);

  const handleResolve = React.useCallback(() => {
    console.log("[alerts] resolve:", alert.id);
  }, [alert.id]);

  const handleSnooze = React.useCallback(
    (duration: string) => {
      console.log("[alerts] snooze:", duration, "alert:", alert.id);
      setSnoozeOpen(false);
    },
    [alert.id],
  );

  const handleEscalate = React.useCallback(() => {
    console.log("[alerts] escalate to PagerDuty:", alert.id);
  }, [alert.id]);

  const handleSlack = React.useCallback(() => {
    console.log("[alerts] share to Slack:", alert.id);
  }, [alert.id]);

  return (
    <div
      className="sticky bottom-6 z-20 flex justify-end"
      role="region"
      aria-label="Alert actions"
    >
      <div className="flex flex-wrap items-center gap-2 rounded-card border border-border bg-card px-4 py-3 shadow-lg">
        {/* Acknowledge */}
        {alert.status === "open" && (
          <button
            type="button"
            onClick={handleAck}
            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-2 font-body text-[12px] font-medium text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            <Check size={13} aria-hidden />
            Acknowledge
          </button>
        )}

        {/* Resolve */}
        {(alert.status === "open" || alert.status === "acked") && (
          <button
            type="button"
            onClick={handleResolve}
            className="inline-flex items-center gap-1.5 rounded-btn bg-success/10 border border-success/20 px-3 py-2 font-body text-[12px] font-medium text-success hover:bg-success/20 cursor-pointer transition-colors duration-150 ease-out"
          >
            <Check size={13} aria-hidden />
            Resolve
          </button>
        )}

        {/* Snooze */}
        <div className="relative" ref={snoozeRef}>
          <button
            type="button"
            onClick={() => setSnoozeOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={snoozeOpen}
            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-2 font-body text-[12px] font-medium text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            <Clock size={13} aria-hidden />
            Snooze
            <ChevronDown
              size={11}
              aria-hidden
              className={`transition-transform duration-200 ease-out ${snoozeOpen ? "rotate-180" : ""}`}
            />
          </button>
          {snoozeOpen && (
            <ul
              role="listbox"
              aria-label="Snooze duration"
              className="absolute bottom-full left-0 z-10 mb-1 w-44 rounded-card border border-border bg-card shadow-lg"
            >
              {SNOOZE_OPTIONS.map((opt) => (
                <li key={opt.value} role="option">
                  <button
                    type="button"
                    onClick={() => handleSnooze(opt.value)}
                    className="w-full px-3 py-2 text-left font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-100 cursor-pointer"
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Escalate to PagerDuty (stub) */}
        <button
          type="button"
          onClick={handleEscalate}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-2 font-body text-[12px] font-medium text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          aria-label="Escalate to PagerDuty"
        >
          <Shield size={13} aria-hidden />
          PagerDuty
        </button>

        {/* Share to Slack (stub) */}
        <button
          type="button"
          onClick={handleSlack}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-2 font-body text-[12px] font-medium text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          aria-label="Share to Slack"
        >
          <Slack size={13} aria-hidden />
          Slack
        </button>

        {/* Open work order */}
        <Link
          to={`/maintenance/new?alert_id=${alert.id}&station_id=${alert.station_id}&station=${encodeURIComponent(alert.station_name)}&message=${encodeURIComponent(alert.message)}`}
          className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-3 py-2 font-body text-[12px] font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-150 ease-out"
        >
          <Wrench size={13} aria-hidden />
          Open work order
        </Link>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AlertDetail() {
  const { alertId } = useParams<{ alertId: string }>();
  const alert = alertId ? getAlert(alertId) : undefined;

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!alert) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          to="/alerts"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out w-fit"
        >
          <ArrowLeft size={14} aria-hidden />
          Back to alerts
        </Link>
        <div
          role="alert"
          className="flex items-center justify-center rounded-card border border-border bg-card p-12"
        >
          <p className="font-body text-body text-muted-foreground">
            Alert{" "}
            <span className="font-mono text-foreground">{alertId}</span>{" "}
            not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      {/* ── Back nav ────────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          to="/alerts"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
        >
          <ArrowLeft size={14} aria-hidden />
          Alerts
        </Link>
        <span className="text-muted-foreground" aria-hidden>/</span>
        <span className="font-mono text-[12px] text-foreground">{alert.id}</span>
      </nav>

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Severity badge */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-body text-[12px] font-medium ${severityBg(alert.severity)} ${severityText(alert.severity)}`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${severityDot(alert.severity)}`}
              aria-hidden="true"
            />
            {SEVERITY_LABEL[alert.severity]}
          </span>

          {/* Status pill */}
          <span
            className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-body text-[12px] font-medium ${statusBg(alert.status)}`}
          >
            <span
              className={[
                "h-2 w-2 shrink-0 rounded-full",
                alert.status === "open" && "bg-error",
                alert.status === "acked" && "bg-warning",
                alert.status === "resolved" && "bg-success",
                alert.status === "snoozed" && "bg-muted-foreground",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            />
            {STATUS_LABEL[alert.status]}
          </span>

          {/* Age */}
          <span
            className="font-mono text-[12px] text-muted-foreground cursor-default"
            title={absoluteTime(alert.created_at)}
            aria-label={`Created ${absoluteTime(alert.created_at)}`}
          >
            Created {relativeTime(alert.created_at)}
          </span>

          {/* Source */}
          <span className="font-mono text-[11px] text-muted-foreground">
            Source: {SOURCE_LABEL[alert.source] ?? alert.source}
          </span>
        </div>

        {/* Station link */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Station
          </span>
          <Link
            to={`/stations/${alert.station_id}`}
            className="font-body text-[14px] font-medium text-primary hover:underline transition-colors duration-150 ease-out"
          >
            {alert.station_name}
          </Link>
          {alert.port_id && (
            <span className="font-mono text-[11px] text-muted-foreground">
              {alert.port_id}
            </span>
          )}
        </div>

        {/* Message heading */}
        <h2
          id="alert-message-heading"
          className="font-body text-h4 font-semibold text-foreground"
        >
          {alert.message}
        </h2>
      </div>

      {/* ── Two-column layout on wide screens ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* Technical detail */}
          <JsonViewer data={alert.technical_detail} />

          {/* Action history */}
          <ActionHistory alert={alert} />

          {/* Comments */}
          <CommentsSection alert={alert} />
        </div>

        {/* Sidebar — linked entities */}
        <div className="flex flex-col gap-6">
          <LinkedEntities alert={alert} />

          {/* Snoozed-until detail */}
          {alert.snoozed_until && (
            <section aria-labelledby="snooze-heading" className="space-y-2">
              <h3
                id="snooze-heading"
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
              >
                Snoozed until
              </h3>
              <div className="rounded-card border border-border bg-card px-4 py-3">
                <span
                  className="font-mono text-[13px] text-foreground"
                  title={absoluteTime(alert.snoozed_until)}
                >
                  {absoluteTime(alert.snoozed_until)}
                </span>
              </div>
            </section>
          )}

          {/* Ack details */}
          {alert.acked_by && alert.acked_at && (
            <section aria-labelledby="ack-heading" className="space-y-2">
              <h3
                id="ack-heading"
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
              >
                Acknowledged by
              </h3>
              <div className="rounded-card border border-border bg-card px-4 py-3 flex flex-col gap-0.5">
                <span className="font-body text-[13px] font-medium text-foreground">
                  {alert.acked_by}
                </span>
                <span
                  className="font-mono text-[11px] text-muted-foreground cursor-default"
                  title={absoluteTime(alert.acked_at)}
                >
                  {relativeTime(alert.acked_at)}
                </span>
              </div>
            </section>
          )}

          {/* Resolve details */}
          {alert.resolved_by && alert.resolved_at && (
            <section aria-labelledby="resolve-heading" className="space-y-2">
              <h3
                id="resolve-heading"
                className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
              >
                Resolved by
              </h3>
              <div className="rounded-card border border-border bg-card px-4 py-3 flex flex-col gap-0.5">
                <span className="font-body text-[13px] font-medium text-foreground">
                  {alert.resolved_by}
                </span>
                <span
                  className="font-mono text-[11px] text-muted-foreground cursor-default"
                  title={absoluteTime(alert.resolved_at)}
                >
                  {relativeTime(alert.resolved_at)}
                </span>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── Sticky action bar ─────────────────────────────────────────────────── */}
      <StickyActionBar alert={alert} />
    </div>
  );
}
