/**
 * Refunds queue
 * Route: /payments/refunds
 *
 * Three sections: pending · completed · failed
 * Each row: session, driver, original amount, refund amount, reason, status,
 *           initiated by, initiated at; per-row actions (Approve / Cancel / Retry).
 */

import * as React from "react";
import { Link } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from "@gridpower/ui";
import {
  REFUNDS,
  formatDateTime,
  formatINR,
  type Refund,
  type RefundStatus,
} from "~/mocks/payments";

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  RefundStatus,
  { bg: string; text: string; label: string }
> = {
  pending: { bg: "bg-warning/10", text: "text-warning", label: "Pending" },
  completed: { bg: "bg-success/10", text: "text-success", label: "Completed" },
  failed: { bg: "bg-error/10", text: "text-error", label: "Failed" },
};

function StatusPill({ status }: { status: RefundStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
        s.bg,
        s.text,
      )}
      aria-label={`Status: ${s.label}`}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full", s.text.replace("text-", "bg-"))}
      />
      {s.label}
    </span>
  );
}

// ─── Action buttons ──────────────────────────────────────────────────────────

function ActionButtons({ refund }: { refund: Refund }) {
  const handle = (action: string) => {
    console.log(`${action} refund (stub):`, refund.id);
  };

  if (refund.status === "pending") {
    return (
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => handle("Approve")}
          className="rounded-btn border border-success/40 px-2.5 py-1 font-body text-[11px] text-success hover:bg-success/10 cursor-pointer"
          aria-label={`Approve refund ${refund.id}`}
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => handle("Cancel")}
          className="rounded-btn border border-border px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer"
          aria-label={`Cancel refund ${refund.id}`}
        >
          Cancel
        </button>
      </div>
    );
  }
  if (refund.status === "failed") {
    return (
      <button
        type="button"
        onClick={() => handle("Retry")}
        className="rounded-btn border border-warning/40 px-2.5 py-1 font-body text-[11px] text-warning hover:bg-warning/10 cursor-pointer"
        aria-label={`Retry refund ${refund.id}`}
      >
        Retry
      </button>
    );
  }
  return (
    <span
      className="font-mono text-[11px] text-muted-foreground"
      aria-label="No actions available"
    >
      —
    </span>
  );
}

// ─── Refund table ────────────────────────────────────────────────────────────

function RefundTable({
  refunds,
  emptyLabel,
}: {
  refunds: Refund[];
  emptyLabel: string;
}) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[920px]">
        <TableHeader>
          <TableRow>
            <TableHead scope="col" aria-sort="none" className="min-w-[110px]">
              Session
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[140px]">
              Driver
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[100px]">
              Original
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[100px]">
              Refund
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[200px]">
              Reason
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[110px]">
              Status
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[140px]">
              Initiated by
            </TableHead>
            <TableHead scope="col" aria-sort="none" className="min-w-[140px]">
              Initiated at
            </TableHead>
            <TableHead scope="col" className="min-w-[180px]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {refunds.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                <span className="font-body text-[12px] text-muted-foreground">
                  {emptyLabel}
                </span>
              </TableCell>
            </TableRow>
          ) : (
            refunds.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <Link
                    to={`/sessions/${r.sessionId}`}
                    className="font-mono text-[11px] text-primary hover:underline"
                  >
                    {r.sessionId}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/drivers/${r.driverId}`}
                    className="font-body text-[12px] text-foreground hover:underline"
                  >
                    {r.driverName}
                  </Link>
                </TableCell>
                <TableCell className="font-mono text-[12px] text-foreground">
                  {formatINR(r.originalPaise)}
                </TableCell>
                <TableCell className="font-mono text-[12px] font-medium text-foreground">
                  {formatINR(r.refundPaise)}
                  {r.refundPaise < r.originalPaise && (
                    <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                      partial
                    </span>
                  )}
                </TableCell>
                <TableCell className="font-body text-[12px] text-muted-foreground">
                  {r.reason}
                </TableCell>
                <TableCell>
                  <StatusPill status={r.status} />
                  {r.status === "failed" && r.failureReason && (
                    <div className="mt-1 font-body text-[10px] text-error/80">
                      {r.failureReason}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-body text-[12px] text-muted-foreground">
                  {r.initiatedBy}
                </TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                  {formatDateTime(r.initiatedAt)}
                </TableCell>
                <TableCell>
                  <ActionButtons refund={r} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function Section({
  id,
  title,
  count,
  children,
  tone,
}: {
  id: string;
  title: string;
  count: number;
  children: React.ReactNode;
  tone: "warn" | "success" | "error";
}) {
  const accentBg =
    tone === "warn"
      ? "bg-warning/10 text-warning"
      : tone === "success"
        ? "bg-success/10 text-success"
        : "bg-error/10 text-error";
  return (
    <section
      aria-labelledby={id}
      className="rounded-card border border-border bg-card overflow-hidden"
    >
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2.5">
        <h3
          id={id}
          className="font-body text-[13px] font-semibold text-foreground"
        >
          {title}
        </h3>
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-pill px-2 py-0.5 font-mono text-[10px] font-medium",
            accentBg,
          )}
        >
          {count}
        </span>
      </div>
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentsRefunds() {
  const pending = REFUNDS.filter((r) => r.status === "pending");
  const completed = REFUNDS.filter((r) => r.status === "completed");
  const failed = REFUNDS.filter((r) => r.status === "failed");

  return (
    <section className="flex flex-col gap-5" aria-labelledby="refunds-heading">
      <h2 id="refunds-heading" className="sr-only">
        Refunds
      </h2>

      <Section
        id="refunds-pending-heading"
        title="Pending refunds"
        count={pending.length}
        tone="warn"
      >
        <RefundTable
          refunds={pending}
          emptyLabel="No pending refunds. All caught up."
        />
      </Section>

      <Section
        id="refunds-completed-heading"
        title="Completed refunds"
        count={completed.length}
        tone="success"
      >
        <RefundTable
          refunds={completed}
          emptyLabel="No completed refunds yet."
        />
      </Section>

      <Section
        id="refunds-failed-heading"
        title="Failed refunds"
        count={failed.length}
        tone="error"
      >
        <RefundTable
          refunds={failed}
          emptyLabel="No failed refunds. Nothing to retry."
        />
      </Section>
    </section>
  );
}
