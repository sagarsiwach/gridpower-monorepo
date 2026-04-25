/**
 * Settings → Billing
 * Route: /settings/billing
 *
 * Per-station SaaS subscription, payment method, and invoice history.
 */

import * as React from "react";
import { Download, AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@gridpower/ui";

// ─── Tokens ──────────────────────────────────────────────────────────────────

const META_TEXT_CLS = "font-mono text-[11px] text-muted-foreground";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";
const SECTION_TITLE_CLS =
  "font-body text-[12px] font-semibold text-foreground mb-3";
const TABLE_HEADER_BAR_CLS = "px-4 py-2 bg-muted border-b border-border";
const TABLE_ROW_CLS =
  "px-4 py-3 border-b border-border last:border-0 items-center";

// ─── Mocks ───────────────────────────────────────────────────────────────────

const INVOICES = [
  { date: "Apr 2026", amount: "₹62,500", status: "Paid", id: "INV-2026-04" },
  { date: "Mar 2026", amount: "₹62,500", status: "Paid", id: "INV-2026-03" },
  { date: "Feb 2026", amount: "₹57,500", status: "Paid", id: "INV-2026-02" },
  { date: "Jan 2026", amount: "₹52,500", status: "Paid", id: "INV-2026-01" },
  { date: "Dec 2025", amount: "₹47,500", status: "Paid", id: "INV-2025-12" },
];

const USAGE_METRICS = [
  { label: "Stations on plan", used: 25, limit: 50, unit: "stations" },
  { label: "kWh delivered", used: 39800, limit: 50000, unit: "kWh" },
  { label: "API calls", used: 142800, limit: 500000, unit: "calls" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

type AsyncState = "idle" | "loading" | "error";

export default function BillingSettings() {
  const [state, setState] = React.useState<AsyncState>("idle");

  const handleRetry = React.useCallback(() => {
    setState("loading");
    setTimeout(() => setState("idle"), 350);
  }, []);

  if (state === "loading") {
    return (
      <section
        aria-labelledby="billing-heading"
        aria-busy="true"
        className="max-w-2xl"
      >
        <h2 id="billing-heading" className="sr-only">
          Billing
        </h2>
        <div role="status" className={META_TEXT_CLS}>
          Loading billing.
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section aria-labelledby="billing-heading" className="max-w-2xl">
        <h2 id="billing-heading" className="sr-only">
          Billing
        </h2>
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle
            size={14}
            aria-hidden="true"
            className="text-error shrink-0"
          />
          <span className="font-body text-[12px] text-foreground">
            Could not load billing data.
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="billing-heading" className="max-w-2xl">
      <h2 id="billing-heading" className="sr-only">
        Billing
      </h2>

      {/* Current plan */}
      <div
        aria-labelledby="current-plan-label"
        className="rounded-card border border-primary/30 border-l-[3px] border-l-primary bg-card p-5 mb-5"
      >
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div id="current-plan-label" className={`${META_CAPS_CLS} mb-1.5`}>
              Current plan
            </div>
            <div className="font-display text-[22px] font-semibold text-foreground leading-none">
              GridCharge Pro
            </div>
            <div className="font-mono text-[13px] text-primary mt-1.5">
              ₹2,500 per station per month
            </div>
            <div className="font-mono text-[11px] text-muted-foreground mt-1">
              25 stations active · ₹62,500 forecast
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] text-muted-foreground">
              Renews
            </div>
            <div className="font-mono text-[12px] text-foreground mt-0.5">
              May 25, 2026
            </div>
            <button
              type="button"
              className="mt-2 px-3 py-1.5 rounded-btn border border-border font-body text-[11px] text-foreground hover:bg-muted transition-colors cursor-pointer"
              onClick={() => console.log("Manage plan (stub)")}
            >
              Manage plan
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-5">
        <h3 className={SECTION_TITLE_CLS}>Usage this month</h3>
        <div className="flex flex-col gap-3">
          {USAGE_METRICS.map((m) => {
            const pct = (m.used / m.limit) * 100;
            const overLimit = pct > 80;
            const barColor = overLimit ? "bg-warning" : "bg-success";
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-[12px] text-foreground">
                    {m.label}
                  </span>
                  <span className={META_TEXT_CLS}>
                    {m.used.toLocaleString()} / {m.limit.toLocaleString()}{" "}
                    {m.unit}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`${m.label} usage`}
                  aria-valuenow={Math.round(pct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-1.5 bg-muted rounded-full overflow-hidden"
                >
                  <div
                    className={cn("h-full rounded-full", barColor)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <div className="rounded-card border border-border bg-muted p-4 mb-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-body text-[12px] font-semibold text-foreground">
              Payment method
            </h3>
            <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
              •••• •••• •••• 4242 · Visa · Exp 12/27
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-btn border border-border font-body text-[11px] text-foreground hover:bg-muted transition-colors cursor-pointer"
            onClick={() => console.log("Update payment method (stub)")}
          >
            Update
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h3 className={SECTION_TITLE_CLS}>Invoice history</h3>
        <div
          role="table"
          aria-label="Invoice history"
          className="rounded-card border border-border overflow-x-auto"
        >
          <div
            role="row"
            className={`grid grid-cols-[110px_100px_90px_1fr_80px] min-w-[540px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Date", "Amount", "Status", "Invoice ID"].map((h) => (
              <span
                key={h}
                role="columnheader"
                aria-sort="none"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
            <span role="columnheader" className="sr-only">
              Download
            </span>
          </div>
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              role="row"
              className={`grid grid-cols-[110px_100px_90px_1fr_80px] min-w-[540px] ${TABLE_ROW_CLS}`}
            >
              <span role="cell" className={META_TEXT_CLS}>
                {inv.date}
              </span>
              <span
                role="cell"
                className="font-mono text-[11px] font-medium text-foreground"
              >
                {inv.amount}
              </span>
              <span
                role="cell"
                className="inline-flex w-fit items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium bg-success/10 text-success"
              >
                {inv.status}
              </span>
              <span role="cell" className={META_TEXT_CLS}>
                {inv.id}
              </span>
              <button
                type="button"
                aria-label={`Download invoice ${inv.id} as PDF`}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-btn border border-border font-body text-[11px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer w-fit"
                onClick={() => console.log("Download invoice (stub):", inv.id)}
              >
                <Download size={10} aria-hidden="true" />
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
