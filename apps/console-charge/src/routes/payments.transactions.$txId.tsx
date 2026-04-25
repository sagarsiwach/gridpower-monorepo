/**
 * Transaction detail
 * Route: /payments/transactions/:txId
 */

import * as React from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  StickyNote,
  Undo2,
  User,
  Zap,
} from "lucide-react";
import { cn } from "@gridpower/ui";
import {
  findTransaction,
  formatDateTime,
  formatINR,
  formatINRDecimal,
  type TimelineEvent,
  type TxStatus,
} from "~/mocks/payments";

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<TxStatus, { bg: string; text: string; label: string }> = {
  success: { bg: "bg-success/10", text: "text-success", label: "Success" },
  failed: { bg: "bg-error/10", text: "text-error", label: "Failed" },
  pending: { bg: "bg-warning/10", text: "text-warning", label: "Pending" },
  refunded: { bg: "bg-info/10", text: "text-info", label: "Refunded" },
};

function StatusPill({ status, large }: { status: TxStatus; large?: boolean }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill font-body font-medium",
        s.bg,
        s.text,
        large ? "px-3 py-1 text-[13px]" : "px-2 py-0.5 text-[11px]",
      )}
      aria-label={`Status: ${s.label}`}
    >
      <span
        aria-hidden="true"
        className={cn("h-2 w-2 rounded-full", s.text.replace("text-", "bg-"))}
      />
      {s.label}
    </span>
  );
}

// ─── Link card ───────────────────────────────────────────────────────────────

function LinkCard({
  to,
  icon,
  title,
  primary,
  secondary,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-card border border-border bg-card p-4 transition-colors duration-150 ease-out hover:bg-muted"
    >
      <div
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-muted text-muted-foreground"
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">
          {title}
        </div>
        <div className="font-body text-[13px] font-semibold text-foreground truncate">
          {primary}
        </div>
        <div className="font-mono text-[11px] text-muted-foreground truncate">
          {secondary}
        </div>
      </div>
      <ArrowRight
        size={14}
        aria-hidden="true"
        className="shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-0.5"
      />
    </Link>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

const TIMELINE_LABELS: Record<TimelineEvent["status"], string> = {
  created: "Created",
  authorized: "Authorised",
  captured: "Captured",
  settled: "Settled",
  failed: "Failed",
  refund_initiated: "Refund initiated",
  refunded: "Refunded",
};

const TIMELINE_TONE: Record<TimelineEvent["status"], string> = {
  created: "bg-muted text-muted-foreground",
  authorized: "bg-info/10 text-info",
  captured: "bg-success/10 text-success",
  settled: "bg-success/10 text-success",
  failed: "bg-error/10 text-error",
  refund_initiated: "bg-warning/10 text-warning",
  refunded: "bg-info/10 text-info",
};

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {events.map((event, idx) => (
        <li key={idx} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              aria-hidden="true"
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-semibold",
                TIMELINE_TONE[event.status],
              )}
            >
              {idx + 1}
            </span>
            {idx < events.length - 1 && (
              <span
                aria-hidden="true"
                className="mt-1 h-full w-px flex-1 bg-border"
              />
            )}
          </div>
          <div className="flex-1 pb-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-body text-[13px] font-semibold text-foreground">
                {TIMELINE_LABELS[event.status]}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                {formatDateTime(event.at)}
              </span>
            </div>
            {event.detail && (
              <div className="mt-0.5 font-body text-[12px] text-muted-foreground">
                {event.detail}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentsTransactionDetail() {
  const { txId } = useParams();
  const tx = txId ? findTransaction(txId) : null;
  const [showRaw, setShowRaw] = React.useState(false);
  const [noteDraft, setNoteDraft] = React.useState("");
  const [notes, setNotes] = React.useState(tx?.notes ?? []);

  React.useEffect(() => {
    setNotes(tx?.notes ?? []);
  }, [tx?.id]);

  if (!tx) {
    return (
      <section
        className="flex flex-col items-start gap-3 rounded-card border border-border bg-card p-6"
        aria-labelledby="tx-not-found"
      >
        <h2
          id="tx-not-found"
          className="font-body text-[14px] font-semibold text-foreground"
        >
          Transaction not found
        </h2>
        <p className="font-body text-[12px] text-muted-foreground">
          The transaction ID {txId ?? "(missing)"} does not exist or has been
          archived.
        </p>
        <Link
          to="/payments/transactions"
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted"
        >
          <ArrowLeft size={11} aria-hidden="true" />
          Back to transactions
        </Link>
      </section>
    );
  }

  const canRetry = tx.status === "failed";
  const canRefund = tx.status === "success";

  const addNote = () => {
    const text = noteDraft.trim();
    if (!text) return;
    setNotes((prev) => [
      ...prev,
      {
        id: `NOTE-${Date.now()}`,
        author: "You",
        at: new Date().toISOString(),
        text,
      },
    ]);
    setNoteDraft("");
  };

  return (
    <section
      className="flex flex-col gap-5"
      aria-labelledby="tx-detail-heading"
    >
      <h2 id="tx-detail-heading" className="sr-only">
        Transaction {tx.id}
      </h2>

      {/* Back link */}
      <Link
        to="/payments/transactions"
        className="inline-flex items-center gap-1.5 self-start font-body text-[12px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={12} aria-hidden="true" />
        All transactions
      </Link>

      {/* Header */}
      <header className="flex flex-col gap-3 rounded-card border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              Transaction
            </span>
            <StatusPill status={tx.status} />
          </div>
          <div className="font-mono text-[18px] font-semibold text-foreground">
            {tx.id}
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">
            Created {formatDateTime(tx.createdAt)}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Amount
          </span>
          <span className="font-display text-[28px] font-semibold text-foreground leading-none">
            {formatINRDecimal(tx.amountPaise)}
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            {tx.method} · {tx.gatewayRef}
          </span>
        </div>
      </header>

      {/* Cross-reference cards */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <LinkCard
          to={`/sessions/${tx.sessionId}`}
          icon={<Zap size={16} />}
          title="Session"
          primary={tx.sessionId}
          secondary={`${tx.stationName} · ${tx.stationId}`}
        />
        <LinkCard
          to={`/drivers/${tx.driverId}`}
          icon={<User size={16} />}
          title="Driver"
          primary={tx.driverName}
          secondary={tx.driverId}
        />
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        {/* Left: actions, raw payload, notes */}
        <div className="flex flex-col gap-4">
          {/* Actions */}
          <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-5">
            <h3 className="font-body text-[13px] font-semibold text-foreground">
              Actions
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={!canRetry}
                aria-label={
                  canRetry
                    ? "Retry this transaction"
                    : "Retry is unavailable; transaction is not failed"
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-btn border px-3 py-1.5 font-body text-[12px]",
                  canRetry
                    ? "border-border bg-transparent text-foreground hover:bg-muted cursor-pointer"
                    : "border-border bg-transparent text-muted-foreground/60 cursor-not-allowed",
                )}
                onClick={() => console.log("Retry transaction (stub):", tx.id)}
              >
                <RefreshCw size={12} aria-hidden="true" />
                Retry
              </button>
              <button
                type="button"
                disabled={!canRefund}
                aria-label={
                  canRefund
                    ? "Issue a refund for this transaction"
                    : "Refund is unavailable; transaction must be successful"
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-btn border px-3 py-1.5 font-body text-[12px]",
                  canRefund
                    ? "border-error/40 bg-transparent text-error hover:bg-error/10 cursor-pointer"
                    : "border-border bg-transparent text-muted-foreground/60 cursor-not-allowed",
                )}
                onClick={() => console.log("Issue refund (stub):", tx.id)}
              >
                <Undo2 size={12} aria-hidden="true" />
                Issue refund
              </button>
            </div>
            {!canRetry && !canRefund && (
              <p className="font-body text-[11px] text-muted-foreground">
                No actions available for {STATUS_STYLES[tx.status].label} transactions.
              </p>
            )}
          </div>

          {/* Gateway payload */}
          <div className="rounded-card border border-border bg-card overflow-hidden">
            <button
              type="button"
              onClick={() => setShowRaw((v) => !v)}
              aria-expanded={showRaw}
              aria-controls="raw-payload"
              className="flex w-full items-center justify-between px-5 py-3 cursor-pointer hover:bg-muted transition-colors duration-150"
            >
              <div className="flex flex-col items-start gap-0.5">
                <span className="font-body text-[13px] font-semibold text-foreground">
                  Gateway payload
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  Reference {tx.gatewayRef}
                </span>
              </div>
              {showRaw ? (
                <ChevronDown size={14} aria-hidden="true" />
              ) : (
                <ChevronRight size={14} aria-hidden="true" />
              )}
            </button>
            {showRaw && (
              <pre
                id="raw-payload"
                className="overflow-x-auto border-t border-border bg-muted px-5 py-4 font-mono text-[11px] text-foreground leading-relaxed"
              >
                {JSON.stringify(tx.rawPayload, null, 2)}
              </pre>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <StickyNote
                size={14}
                aria-hidden="true"
                className="text-muted-foreground"
              />
              <h3 className="font-body text-[13px] font-semibold text-foreground">
                Notes
              </h3>
            </div>

            {notes.length === 0 ? (
              <p className="font-body text-[12px] text-muted-foreground">
                No notes on this transaction yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="rounded-card border border-border bg-muted px-3 py-2"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-body text-[12px] font-semibold text-foreground">
                        {note.author}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {formatDateTime(note.at)}
                      </span>
                    </div>
                    <p className="mt-1 font-body text-[12px] text-foreground">
                      {note.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="tx-note-input" className="sr-only">
                Add a note
              </label>
              <input
                id="tx-note-input"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Add a note..."
                className="h-8 flex-1 rounded-btn bg-muted border border-border px-3 font-body text-[12px] text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={addNote}
                disabled={noteDraft.trim() === ""}
                className={cn(
                  "rounded-btn px-3 py-1.5 font-body text-[12px] font-medium",
                  noteDraft.trim() === ""
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer",
                )}
              >
                Add note
              </button>
            </div>
          </div>
        </div>

        {/* Right: timeline */}
        <aside
          aria-labelledby="tx-timeline-heading"
          className="rounded-card border border-border bg-card p-5"
        >
          <h3
            id="tx-timeline-heading"
            className="font-body text-[13px] font-semibold text-foreground mb-4"
          >
            Status timeline
          </h3>
          <Timeline events={tx.timeline} />

          <div className="mt-5 border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Total
              </span>
              <span className="font-mono text-[14px] font-semibold text-foreground">
                {formatINRDecimal(tx.amountPaise)}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Gateway fee
              </span>
              <span className="font-mono text-[12px] text-muted-foreground">
                {formatINR(Math.round(tx.amountPaise * 0.02))}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
