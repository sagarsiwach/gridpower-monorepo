/**
 * Payouts
 * Route: /payments/payouts
 *
 * Razorpay payouts to operator's bank.
 * Click row to expand inline list of included transactions, with grand-total verification.
 */

import * as React from "react";
import { Link } from "react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
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
  PAYOUTS,
  TRANSACTIONS,
  formatDate,
  formatDateTime,
  formatINR,
  formatINRDecimal,
  maskAccount,
  type PayoutStatus,
} from "~/mocks/payments";

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  PayoutStatus,
  { bg: string; text: string; label: string }
> = {
  settled: { bg: "bg-success/10", text: "text-success", label: "Settled" },
  in_transit: { bg: "bg-warning/10", text: "text-warning", label: "In transit" },
  failed: { bg: "bg-error/10", text: "text-error", label: "Failed" },
};

function StatusPill({ status }: { status: PayoutStatus }) {
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentsPayouts() {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const totalSettled = PAYOUTS.filter((p) => p.status === "settled").reduce(
    (s, p) => s + p.amountPaise,
    0,
  );

  return (
    <section className="flex flex-col gap-4" aria-labelledby="payouts-heading">
      <h2 id="payouts-heading" className="sr-only">
        Payouts
      </h2>

      {/* Summary banner */}
      <div className="rounded-card border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Settled to date
          </div>
          <div className="font-display text-[22px] font-semibold text-foreground leading-none mt-1">
            {formatINR(totalSettled)}
          </div>
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          {PAYOUTS.length} payouts · weekly cadence to {maskAccount("8421")}
        </div>
      </div>

      <div className="overflow-hidden rounded-card border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {PAYOUTS.length} payouts
          </span>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[840px]">
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="w-10">
                  <span className="sr-only">Expand row</span>
                </TableHead>
                <TableHead scope="col" aria-sort="none" className="min-w-[120px]">
                  Date
                </TableHead>
                <TableHead scope="col" aria-sort="none" className="min-w-[120px]">
                  Amount
                </TableHead>
                <TableHead scope="col" aria-sort="none" className="min-w-[160px]">
                  Bank account
                </TableHead>
                <TableHead scope="col" aria-sort="none" className="min-w-[180px]">
                  Reference
                </TableHead>
                <TableHead scope="col" aria-sort="none" className="min-w-[120px]">
                  Status
                </TableHead>
                <TableHead scope="col" aria-sort="none" className="min-w-[140px]">
                  Settled at
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYOUTS.map((payout) => {
                const isOpen = openId === payout.id;
                const includedTx = TRANSACTIONS.filter((t) =>
                  payout.txIds.includes(t.id),
                );
                const sum = includedTx.reduce((s, t) => s + t.amountPaise, 0);
                const matches = sum === payout.amountPaise;
                return (
                  <React.Fragment key={payout.id}>
                    <TableRow
                      onClick={() => toggle(payout.id)}
                      aria-expanded={isOpen}
                      className="cursor-pointer transition-colors duration-150 ease-out"
                      data-state={isOpen ? "selected" : undefined}
                    >
                      <TableCell>
                        <span
                          aria-hidden="true"
                          className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground"
                        >
                          {isOpen ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-[12px] text-foreground">
                        {formatDate(payout.initiatedAt)}
                      </TableCell>
                      <TableCell className="font-mono text-[12px] font-medium text-foreground">
                        {formatINR(payout.amountPaise)}
                      </TableCell>
                      <TableCell className="font-mono text-[11px] text-muted-foreground">
                        {payout.bankName} · {maskAccount(payout.bankLast4)}
                      </TableCell>
                      <TableCell className="font-mono text-[10px] text-muted-foreground">
                        {payout.reference}
                      </TableCell>
                      <TableCell>
                        <StatusPill status={payout.status} />
                      </TableCell>
                      <TableCell className="font-mono text-[11px] text-muted-foreground">
                        {payout.settledAt ? formatDateTime(payout.settledAt) : "—"}
                      </TableCell>
                    </TableRow>

                    {isOpen && (
                      <TableRow className="bg-muted/40">
                        <TableCell colSpan={7} className="p-0">
                          <div className="border-t border-border p-4 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <h3 className="font-body text-[12px] font-semibold text-foreground">
                                Included transactions ({includedTx.length})
                              </h3>
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
                                  matches
                                    ? "bg-success/10 text-success"
                                    : "bg-error/10 text-error",
                                )}
                                aria-label={
                                  matches
                                    ? "Tie-out: sum matches payout amount"
                                    : "Tie-out: sum does not match payout amount"
                                }
                              >
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    matches ? "bg-success" : "bg-error",
                                  )}
                                />
                                {matches ? "Tie-out verified" : "Mismatch"}
                              </span>
                            </div>

                            <div className="overflow-x-auto rounded-card border border-border bg-card">
                              <Table className="min-w-[640px]">
                                <TableHeader>
                                  <TableRow>
                                    <TableHead
                                      scope="col"
                                      className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                                    >
                                      Transaction
                                    </TableHead>
                                    <TableHead
                                      scope="col"
                                      className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                                    >
                                      Time
                                    </TableHead>
                                    <TableHead
                                      scope="col"
                                      className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                                    >
                                      Driver
                                    </TableHead>
                                    <TableHead
                                      scope="col"
                                      className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                                    >
                                      Amount
                                    </TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {includedTx.length === 0 ? (
                                    <TableRow>
                                      <TableCell
                                        colSpan={4}
                                        className="text-center text-[12px] text-muted-foreground py-4"
                                      >
                                        No transactions on this payout.
                                      </TableCell>
                                    </TableRow>
                                  ) : (
                                    includedTx.map((tx) => (
                                      <TableRow key={tx.id}>
                                        <TableCell>
                                          <Link
                                            to={`/payments/transactions/${tx.id}`}
                                            className="font-mono text-[11px] text-primary hover:underline"
                                          >
                                            {tx.id}
                                          </Link>
                                        </TableCell>
                                        <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                                          {formatDateTime(tx.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                          <Link
                                            to={`/drivers/${tx.driverId}`}
                                            className="font-body text-[12px] text-foreground hover:underline"
                                          >
                                            {tx.driverName}
                                          </Link>
                                        </TableCell>
                                        <TableCell className="font-mono text-[12px] font-medium text-foreground">
                                          {formatINR(tx.amountPaise)}
                                        </TableCell>
                                      </TableRow>
                                    ))
                                  )}
                                </TableBody>
                              </Table>
                            </div>

                            <div className="flex items-center justify-between rounded-card border border-border bg-card px-4 py-2.5">
                              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                                Grand total
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[12px] text-muted-foreground">
                                  Sum: {formatINRDecimal(sum)}
                                </span>
                                <span className="font-mono text-[12px] text-muted-foreground">
                                  · Payout: {formatINRDecimal(payout.amountPaise)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
