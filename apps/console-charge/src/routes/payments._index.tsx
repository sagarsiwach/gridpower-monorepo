/**
 * Payments overview
 * Route: /payments (index)
 *
 * Landing page for the payments section.
 *  · 4 KPI cards (month revenue · pending refunds · next payout · failed today)
 *  · Revenue trend, last 30 days (LineChart)
 *  · Recent transactions table (10 rows)
 *  · Quick links to subsections
 */

import { Link } from "react-router";
import {
  ArrowRight,
  AlertTriangle,
  CalendarClock,
  Receipt,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
  type LineChartSeries,
} from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import {
  TRANSACTIONS,
  failedToday,
  formatDate,
  formatDateTime,
  formatINR,
  monthRevenuePaise,
  nextPayout,
  pendingRefunds,
  revenueSeries30d,
  type TxStatus,
} from "~/mocks/payments";

// ─── Status pill (color + text) ───────────────────────────────────────────────

const STATUS_STYLES: Record<TxStatus, { bg: string; text: string; label: string }> = {
  success: { bg: "bg-success/10", text: "text-success", label: "Success" },
  failed: { bg: "bg-error/10", text: "text-error", label: "Failed" },
  pending: { bg: "bg-warning/10", text: "text-warning", label: "Pending" },
  refunded: { bg: "bg-info/10", text: "text-info", label: "Refunded" },
};

function StatusPill({ status }: { status: TxStatus }) {
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

// ─── KPI card ────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  icon,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
  tone?: "neutral" | "warn" | "error" | "success";
}) {
  const accent =
    tone === "warn"
      ? "text-warning"
      : tone === "error"
        ? "text-error"
        : tone === "success"
          ? "text-success"
          : "text-foreground";
  return (
    <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-2 transition-shadow duration-200 ease-out hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="text-muted-foreground" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div
        className={cn(
          "font-display font-semibold leading-none",
          accent,
        )}
        style={{ fontSize: 28, letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      {sub && (
        <span className="font-mono text-[11px] text-muted-foreground">{sub}</span>
      )}
    </div>
  );
}

// ─── Revenue chart config ─────────────────────────────────────────────────────

const REVENUE_LINE_SERIES: LineChartSeries[] = [
  {
    dataKey: "revenue",
    name: "Revenue (INR)",
    color: "var(--grid-red)",
    strokeWidth: 1.5,
  },
];

// ─── Quick link tile ─────────────────────────────────────────────────────────

function QuickLink({
  to,
  label,
  description,
}: {
  to: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-start justify-between gap-3 rounded-card border border-border bg-card p-4 transition-colors duration-150 ease-out hover:bg-muted"
    >
      <div className="flex flex-col gap-1">
        <span className="font-body text-[13px] font-semibold text-foreground">
          {label}
        </span>
        <span className="font-body text-[11px] text-muted-foreground">
          {description}
        </span>
      </div>
      <ArrowRight
        size={14}
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-150 ease-out group-hover:translate-x-0.5"
      />
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaymentsOverview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const monthRevenue = monthRevenuePaise();
  const pending = pendingRefunds();
  const next = nextPayout();
  const failed = failedToday();
  const recent = TRANSACTIONS.slice(0, 10);
  const series = revenueSeries30d();

  return (
    <section
      className="flex flex-col gap-5"
      aria-labelledby="payments-overview-heading"
    >
      <h2 id="payments-overview-heading" className="sr-only">
        Payments overview
      </h2>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Revenue, this month"
          value={formatINR(monthRevenue)}
          sub="Apr 2026 to date"
          icon={<TrendingUp size={14} />}
          tone="neutral"
        />
        <KpiCard
          label="Pending refunds"
          value={`${pending.count}`}
          sub={`${formatINR(pending.totalPaise)} awaiting`}
          icon={<Receipt size={14} />}
          tone={pending.count > 0 ? "warn" : "neutral"}
        />
        <KpiCard
          label="Next payout"
          value={formatINR(next.amountPaise)}
          sub={`Settles ${formatDate(next.date)}`}
          icon={<CalendarClock size={14} />}
          tone="neutral"
        />
        <KpiCard
          label="Failed, today"
          value={`${failed}`}
          sub={failed === 0 ? "All clear" : "Review and retry"}
          icon={<AlertTriangle size={14} />}
          tone={failed > 0 ? "error" : "success"}
        />
      </div>

      {/* Revenue chart */}
      <LineChart
        data={series}
        series={REVENUE_LINE_SERIES}
        xAxisKey="date"
        yUnit="INR"
        title="Revenue, last 30 days"
        subtitle={`${formatINR(monthRevenue)} this month`}
        chartHeight={180}
        theme={isDark ? "dark" : "light"}
      />

      {/* Recent transactions */}
      <section
        aria-labelledby="recent-tx-heading"
        className="rounded-card border border-border bg-card overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h3
            id="recent-tx-heading"
            className="font-body text-[13px] font-semibold text-foreground"
          >
            Recent transactions
          </h3>
          <Link
            to="/payments/transactions"
            className="inline-flex items-center gap-1 font-body text-[12px] text-primary hover:underline"
          >
            View all
            <ArrowRight size={11} aria-hidden="true" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="bg-muted">
                {["Time", "Transaction", "Driver", "Method", "Amount", "Status"].map(
                  (h) => (
                    <TableHead
                      key={h}
                      scope="col"
                      className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                    >
                      {h}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {formatDateTime(tx.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/payments/transactions/${tx.id}`}
                      className="font-mono text-[11px] text-primary hover:underline"
                    >
                      {tx.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/drivers/${tx.driverId}`}
                      className="font-body text-[12px] text-foreground hover:underline"
                    >
                      {tx.driverName}
                    </Link>
                  </TableCell>
                  <TableCell className="font-body text-[12px] text-muted-foreground">
                    {tx.method}
                  </TableCell>
                  <TableCell className="font-mono text-[12px] font-medium text-foreground">
                    {formatINR(tx.amountPaise)}
                  </TableCell>
                  <TableCell>
                    <StatusPill status={tx.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Quick links */}
      <section aria-labelledby="quick-links-heading">
        <h3
          id="quick-links-heading"
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2"
        >
          Jump to
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickLink
            to="/payments/transactions"
            label="Transactions"
            description="Search and filter every payment"
          />
          <QuickLink
            to="/payments/payouts"
            label="Payouts"
            description="Bank settlements from Razorpay"
          />
          <QuickLink
            to="/payments/refunds"
            label="Refunds"
            description="Pending and completed refunds"
          />
          <QuickLink
            to="/payments/invoices"
            label="Invoices"
            description="GST invoices for fleets and drivers"
          />
        </div>
      </section>
    </section>
  );
}
