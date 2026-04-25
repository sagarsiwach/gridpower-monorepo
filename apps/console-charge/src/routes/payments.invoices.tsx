/**
 * GST invoices
 * Route: /payments/invoices
 *
 * Filters: month · customer (driver/fleet) · status (draft/issued/paid)
 * Cols: number · issued · to · subtotal · GST (CGST/SGST/IGST) · total · status · PDF
 * "Generate by period" + "Download all as ZIP" actions.
 */

import * as React from "react";
import { Archive, Download, Plus } from "lucide-react";
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
  INVOICES,
  formatDate,
  formatINR,
  type CustomerType,
  type Invoice,
  type InvoiceStatus,
} from "~/mocks/payments";

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  InvoiceStatus,
  { bg: string; text: string; label: string }
> = {
  draft: { bg: "bg-muted", text: "text-muted-foreground", label: "Draft" },
  issued: { bg: "bg-info/10", text: "text-info", label: "Issued" },
  paid: { bg: "bg-success/10", text: "text-success", label: "Paid" },
};

function StatusPill({ status }: { status: InvoiceStatus }) {
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
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "draft" ? "bg-muted-foreground" : s.text.replace("text-", "bg-"),
        )}
      />
      {s.label}
    </span>
  );
}

// ─── Build month options from invoices ───────────────────────────────────────

function getMonthOptions(invoices: Invoice[]): { value: string; label: string }[] {
  const seen = new Set<string>();
  const opts: { value: string; label: string }[] = [];
  for (const inv of invoices) {
    const d = new Date(inv.issuedAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!seen.has(key)) {
      seen.add(key);
      opts.push({
        value: key,
        label: d.toLocaleDateString("en-IN", {
          month: "long",
          year: "numeric",
        }),
      });
    }
  }
  return opts;
}

const MONTH_OPTIONS = [
  { value: "all", label: "All months" },
  ...getMonthOptions(INVOICES),
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentsInvoices() {
  const [monthFilter, setMonthFilter] = React.useState<string>("all");
  const [customerFilter, setCustomerFilter] = React.useState<"all" | CustomerType>(
    "all",
  );
  const [statusFilter, setStatusFilter] = React.useState<"all" | InvoiceStatus>(
    "all",
  );

  const filtered = React.useMemo(
    () =>
      INVOICES.filter((inv) => {
        if (statusFilter !== "all" && inv.status !== statusFilter) return false;
        if (customerFilter !== "all" && inv.customerType !== customerFilter)
          return false;
        if (monthFilter !== "all") {
          const d = new Date(inv.issuedAt);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          if (key !== monthFilter) return false;
        }
        return true;
      }),
    [monthFilter, customerFilter, statusFilter],
  );

  const totals = React.useMemo(
    () =>
      filtered.reduce(
        (acc, inv) => ({
          subtotal: acc.subtotal + inv.subtotalPaise,
          tax:
            acc.tax + inv.cgstPaise + inv.sgstPaise + inv.igstPaise,
          total: acc.total + inv.totalPaise,
        }),
        { subtotal: 0, tax: 0, total: 0 },
      ),
    [filtered],
  );

  const handleGenerate = () => {
    console.log("Generate invoices for period (stub):", monthFilter);
  };
  const handleDownloadAll = () => {
    console.log(
      "Download invoices ZIP (stub):",
      filtered.map((i) => i.number),
    );
  };
  const handleDownloadOne = (inv: Invoice) => {
    console.log("Download invoice PDF (stub):", inv.number, inv.pdfUrl);
  };

  return (
    <section className="flex flex-col gap-4" aria-labelledby="invoices-heading">
      <h2 id="invoices-heading" className="sr-only">
        Invoices
      </h2>

      {/* Filters + actions */}
      <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label
              htmlFor="inv-month"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Month
            </label>
            <select
              id="inv-month"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-body text-[12px] text-foreground outline-none focus:border-primary"
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="inv-customer"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Customer
            </label>
            <select
              id="inv-customer"
              value={customerFilter}
              onChange={(e) =>
                setCustomerFilter(e.target.value as "all" | CustomerType)
              }
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-body text-[12px] text-foreground outline-none focus:border-primary"
            >
              <option value="all">All customers</option>
              <option value="fleet">Fleet (B2B)</option>
              <option value="individual">Individual driver</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="inv-status"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Status
            </label>
            <select
              id="inv-status"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | InvoiceStatus)
              }
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-body text-[12px] text-foreground outline-none focus:border-primary"
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="issued">Issued</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 rounded-btn bg-primary text-primary-foreground px-3 py-1.5 font-body text-[12px] font-medium hover:bg-primary/90 cursor-pointer"
          >
            <Plus size={12} aria-hidden="true" />
            Generate by period
          </button>
          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={filtered.length === 0}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-btn border border-border px-3 py-1.5 font-body text-[12px]",
              filtered.length === 0
                ? "bg-transparent text-muted-foreground/60 cursor-not-allowed"
                : "bg-transparent text-foreground hover:bg-muted cursor-pointer",
            )}
            aria-label={`Download all ${filtered.length} invoices as ZIP`}
          >
            <Archive size={12} aria-hidden="true" />
            Download all as ZIP
          </button>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-card p-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Subtotal
          </div>
          <div className="font-mono text-[16px] font-semibold text-foreground mt-1">
            {formatINR(totals.subtotal)}
          </div>
        </div>
        <div className="rounded-card border border-border bg-card p-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            GST
          </div>
          <div className="font-mono text-[16px] font-semibold text-foreground mt-1">
            {formatINR(totals.tax)}
          </div>
        </div>
        <div className="rounded-card border border-border bg-card p-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Total
          </div>
          <div className="font-mono text-[16px] font-semibold text-primary mt-1">
            {formatINR(totals.total)}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-card border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
          >
            {filtered.length} invoice{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[1000px]">
            <TableHeader>
              <TableRow>
                <TableHead scope="col" className="min-w-[140px]">
                  Invoice #
                </TableHead>
                <TableHead scope="col" className="min-w-[110px]">
                  Issued
                </TableHead>
                <TableHead scope="col" className="min-w-[200px]">
                  To
                </TableHead>
                <TableHead scope="col" className="min-w-[100px]">
                  Subtotal
                </TableHead>
                <TableHead scope="col" className="min-w-[160px]">
                  GST
                </TableHead>
                <TableHead scope="col" className="min-w-[110px]">
                  Total
                </TableHead>
                <TableHead scope="col" className="min-w-[100px]">
                  Status
                </TableHead>
                <TableHead scope="col" className="min-w-[100px]">
                  PDF
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <span className="font-body text-[12px] text-muted-foreground">
                      No invoices match the current filters.
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-[11px] text-foreground">
                      {inv.number}
                    </TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      {formatDate(inv.issuedAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[12px] font-medium text-foreground">
                          {inv.customerName}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {inv.customerType === "fleet" ? "Fleet" : "Driver"}
                          {inv.customerGstin ? ` · GSTIN ${inv.customerGstin}` : ""}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[12px] text-foreground">
                      {formatINR(inv.subtotalPaise)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-0.5 font-mono text-[11px] text-muted-foreground">
                        {inv.igstPaise > 0 ? (
                          <span>IGST {formatINR(inv.igstPaise)}</span>
                        ) : (
                          <>
                            <span>CGST {formatINR(inv.cgstPaise)}</span>
                            <span>SGST {formatINR(inv.sgstPaise)}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[12px] font-medium text-foreground">
                      {formatINR(inv.totalPaise)}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={inv.status} />
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => handleDownloadOne(inv)}
                        aria-label={`Download invoice ${inv.number} as PDF`}
                        className="inline-flex items-center gap-1 rounded-btn border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer"
                      >
                        <Download size={11} aria-hidden="true" />
                        PDF
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
