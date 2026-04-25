/**
 * Payments transactions list
 * Route: /payments/transactions
 *
 * Filters: date range · status · gateway · amount range
 * Sortable columns, paginated, click row to /payments/transactions/:txId
 */

import * as React from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Search,
  X,
} from "lucide-react";
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
  TRANSACTIONS,
  formatDateTime,
  formatINR,
  type Gateway,
  type Transaction,
  type TxStatus,
} from "~/mocks/payments";

// ─── Status pill ──────────────────────────────────────────────────────────────

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

// ─── Filter chip helpers ─────────────────────────────────────────────────────

const STATUS_FILTERS: { value: "all" | TxStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
];

const GATEWAY_FILTERS: { value: "all" | Gateway; label: string }[] = [
  { value: "all", label: "All gateways" },
  { value: "razorpay_upi", label: "UPI" },
  { value: "razorpay_card", label: "Razorpay card" },
  { value: "wallet", label: "Wallet" },
  { value: "rfid_postpaid", label: "RFID postpaid" },
];

const DATE_RANGES: {
  value: "all" | "7" | "30" | "60";
  label: string;
}[] = [
  { value: "all", label: "All time" },
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "60", label: "Last 60 days" },
];

// ─── Sort ────────────────────────────────────────────────────────────────────

type SortKey = "createdAt" | "amountPaise" | "status";
type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active)
    return (
      <ArrowUpDown size={11} className="text-muted-foreground" aria-hidden="true" />
    );
  return dir === "asc" ? (
    <ArrowUp size={11} className="text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown size={11} className="text-primary" aria-hidden="true" />
  );
}

interface SortState {
  key: SortKey;
  dir: SortDir;
}

function SortableHead({
  label,
  columnKey,
  sort,
  onSort,
  className,
}: {
  label: string;
  columnKey: SortKey;
  sort: SortState;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const isActive = sort.key === columnKey;
  const ariaSort: React.AriaAttributes["aria-sort"] = isActive
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : "none";
  return (
    <TableHead
      scope="col"
      aria-sort={ariaSort}
      className={cn("cursor-pointer select-none", className)}
      onClick={() => onSort(columnKey)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSort(columnKey);
        }}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer"
        aria-label={`Sort by ${label} ${
          isActive
            ? sort.dir === "asc"
              ? "(ascending, click for descending)"
              : "(descending, click for ascending)"
            : ""
        }`}
      >
        {label}
        <SortIcon active={isActive} dir={sort.dir} />
      </button>
    </TableHead>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

export default function PaymentsTransactions() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<"all" | TxStatus>("all");
  const [gatewayFilter, setGatewayFilter] = React.useState<"all" | Gateway>("all");
  const [dateRange, setDateRange] = React.useState<"all" | "7" | "30" | "60">("all");
  const [minAmount, setMinAmount] = React.useState("");
  const [maxAmount, setMaxAmount] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<SortState>({ key: "createdAt", dir: "desc" });
  const [page, setPage] = React.useState(1);

  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
  }, []);

  const filtered = React.useMemo<Transaction[]>(() => {
    const NOW = new Date("2026-04-25T10:00:00+05:30").getTime();
    const minPaise = minAmount ? Math.round(Number(minAmount) * 100) : null;
    const maxPaise = maxAmount ? Math.round(Number(maxAmount) * 100) : null;
    const days = dateRange === "all" ? null : Number(dateRange);
    const cutoff = days ? NOW - days * 24 * 60 * 60 * 1000 : null;
    const q = search.trim().toLowerCase();

    let list = TRANSACTIONS.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (gatewayFilter !== "all" && t.gateway !== gatewayFilter) return false;
      if (cutoff !== null && new Date(t.createdAt).getTime() < cutoff) return false;
      if (minPaise !== null && t.amountPaise < minPaise) return false;
      if (maxPaise !== null && t.amountPaise > maxPaise) return false;
      if (q) {
        return (
          t.id.toLowerCase().includes(q) ||
          t.sessionId.toLowerCase().includes(q) ||
          t.driverName.toLowerCase().includes(q) ||
          t.driverId.toLowerCase().includes(q)
        );
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sort.key === "createdAt") {
        cmp = a.createdAt.localeCompare(b.createdAt);
      } else if (sort.key === "amountPaise") {
        cmp = a.amountPaise - b.amountPaise;
      } else {
        cmp = a.status.localeCompare(b.status);
      }
      return sort.dir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [statusFilter, gatewayFilter, dateRange, minAmount, maxAmount, search, sort]);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [statusFilter, gatewayFilter, dateRange, minAmount, maxAmount, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasActiveFilters =
    statusFilter !== "all" ||
    gatewayFilter !== "all" ||
    dateRange !== "all" ||
    minAmount !== "" ||
    maxAmount !== "" ||
    search !== "";

  const resetFilters = () => {
    setStatusFilter("all");
    setGatewayFilter("all");
    setDateRange("all");
    setMinAmount("");
    setMaxAmount("");
    setSearch("");
  };

  return (
    <section className="flex flex-col gap-4" aria-labelledby="tx-heading">
      <h2 id="tx-heading" className="sr-only">
        Transactions
      </h2>

      {/* ── Filters ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-4">
        {/* Status chips */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Filter by status"
        >
          {STATUS_FILTERS.map((s) => {
            const active = statusFilter === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatusFilter(s.value)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                  active
                    ? "bg-muted border-border text-foreground"
                    : "bg-transparent border-transparent text-muted-foreground hover:bg-muted",
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Row of selectors */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="tx-date-range"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Date range
            </label>
            <select
              id="tx-date-range"
              value={dateRange}
              onChange={(e) =>
                setDateRange(e.target.value as "all" | "7" | "30" | "60")
              }
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-body text-[12px] text-foreground outline-none focus:border-primary"
            >
              {DATE_RANGES.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="tx-gateway"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Gateway
            </label>
            <select
              id="tx-gateway"
              value={gatewayFilter}
              onChange={(e) => setGatewayFilter(e.target.value as "all" | Gateway)}
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-body text-[12px] text-foreground outline-none focus:border-primary"
            >
              {GATEWAY_FILTERS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="tx-min"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Min amount (INR)
            </label>
            <input
              id="tx-min"
              type="number"
              inputMode="numeric"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="0"
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-mono text-[12px] text-foreground outline-none focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="tx-max"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Max amount (INR)
            </label>
            <input
              id="tx-max"
              type="number"
              inputMode="numeric"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              placeholder="2000"
              className="h-8 w-full rounded-btn bg-muted border border-border px-2 font-mono text-[12px] text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Search + reset */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={12}
              aria-hidden="true"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="tx-search" className="sr-only">
              Search transactions
            </label>
            <input
              id="tx-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by transaction, session, or driver..."
              className="h-8 w-full rounded-pill pl-7 pr-3 bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body text-[12px] outline-none focus:border-primary"
            />
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer"
              aria-label="Clear all filters"
            >
              <X size={11} aria-hidden="true" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-card border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
          >
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[840px]">
            <TableHeader>
              <TableRow>
                <SortableHead
                  label="Time"
                  columnKey="createdAt"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[140px]"
                />
                <TableHead scope="col" className="min-w-[120px]">
                  Session
                </TableHead>
                <TableHead scope="col" className="min-w-[140px]">
                  Driver
                </TableHead>
                <TableHead scope="col" className="min-w-[80px]">
                  Method
                </TableHead>
                <SortableHead
                  label="Amount"
                  columnKey="amountPaise"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <TableHead scope="col" className="min-w-[120px]">
                  Gateway
                </TableHead>
                <SortableHead
                  label="Status"
                  columnKey="status"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32">
                    <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
                      <p className="font-body text-[13px] text-foreground">
                        {hasActiveFilters
                          ? "No transactions match the current filters."
                          : "No transactions yet."}
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer"
                        >
                          <X size={11} aria-hidden="true" />
                          Clear filters
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                visible.map((tx) => (
                  <TableRow
                    key={tx.id}
                    onClick={() => navigate(`/payments/transactions/${tx.id}`)}
                    className="cursor-pointer transition-colors duration-150 ease-out"
                  >
                    <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      {formatDateTime(tx.createdAt)}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Link
                        to={`/sessions/${tx.sessionId}`}
                        className="font-mono text-[11px] text-primary hover:underline"
                      >
                        {tx.sessionId}
                      </Link>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
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
                    <TableCell className="font-mono text-[11px] text-muted-foreground">
                      {tx.gatewayRef.slice(0, 14)}…
                    </TableCell>
                    <TableCell>
                      <StatusPill status={tx.status} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <nav
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border bg-card px-4 py-2.5"
          aria-label="Pagination"
        >
          <span className="font-mono text-[11px] text-muted-foreground">
            Page {page} of {pageCount} · Showing{" "}
            {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
              className={cn(
                "h-7 px-2 rounded font-body text-[11px] border border-border",
                page === 1
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : "text-foreground hover:bg-muted cursor-pointer",
              )}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              aria-label="Next page"
              className={cn(
                "h-7 px-2 rounded font-body text-[11px] border border-border",
                page === pageCount
                  ? "text-muted-foreground/50 cursor-not-allowed"
                  : "text-foreground hover:bg-muted cursor-pointer",
              )}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
}
