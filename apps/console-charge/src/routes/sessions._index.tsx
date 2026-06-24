/**
 * CON.4: Sessions list
 * Route: /sessions (index)
 *
 * Features:
 * - Filter chips: status / payment status / connector type / date range
 * - Search by session ID, station ID, driver name/phone
 * - Sortable columns: Started, Ended, Duration, Station, Connector, Driver, Energy (kWh), Cost, Payment status
 * - Default view: last 7 days, all stations
 * - Bulk select + Export CSV
 * - Each row navigates to /sessions/:sessionId
 * - Empty / loading / error states
 * - Pagination
 */

import * as React from "react";
import { Link, useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Download,
  RefreshCw,
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
  ALL_SESSIONS,
  type Session,
  type SessionStatus,
  type PaymentStatus,
  type ConnectorType,
  formatDuration,
  formatTs,
} from "~/mocks/sessions";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey =
  | "started"
  | "ended"
  | "duration"
  | "station"
  | "connector"
  | "driver"
  | "energy"
  | "cost"
  | "paymentStatus";

type SortDir = "asc" | "desc";

interface SortState {
  key: SortKey;
  dir: SortDir;
}

type DateRange = "today" | "7d" | "30d" | "all";

// ─── Status display maps ───────────────────────────────────────────────────────

const SESSION_STATUS_CLASS: Record<SessionStatus, string> = {
  "in-progress": "bg-info/10 text-info",
  completed: "bg-success/10 text-success",
  cancelled: "bg-muted text-muted-foreground",
  errored: "bg-error/10 text-error",
};

const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  errored: "Errored",
};

const PAYMENT_STATUS_CLASS: Record<PaymentStatus, string> = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  refunded: "bg-muted text-muted-foreground",
};

const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
};

// ─── Status pill ──────────────────────────────────────────────────────────────

function SessionStatusPill({ status }: { status: SessionStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 font-mono text-[10px]",
        SESSION_STATUS_CLASS[status],
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
      {SESSION_STATUS_LABEL[status]}
    </span>
  );
}

function PaymentStatusPill({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[10px]",
        PAYMENT_STATUS_CLASS[status],
      )}
    >
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ columnKey, sort }: { columnKey: SortKey; sort: SortState }) {
  if (sort.key !== columnKey)
    return <ArrowUpDown size={10} className="text-muted-foreground" aria-hidden="true" />;
  return sort.dir === "asc" ? (
    <ArrowUp size={10} className="text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown size={10} className="text-primary" aria-hidden="true" />
  );
}

// ─── Sortable column header ────────────────────────────────────────────────────

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
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const isActive = sort.key === columnKey;
  const ariaSort: React.AriaAttributes["aria-sort"] = isActive
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : "none";

  return (
    <TableHead scope="col" aria-sort={ariaSort} className={cn("select-none", className)}>
      <button
        type="button"
        onClick={() => onSort(columnKey)}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer"
        aria-label={`Sort by ${label}${
          isActive
            ? sort.dir === "asc"
              ? " (ascending, click for descending)"
              : " (descending, click for ascending)"
            : ""
        }`}
      >
        {label}
        <SortIcon columnKey={columnKey} sort={sort} />
      </button>
    </TableHead>
  );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────

function FilterChip({
  label,
  active,
  count,
  onClick,
}: {
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out",
        active
          ? "bg-muted border border-border text-foreground"
          : "bg-transparent border border-transparent text-muted-foreground hover:bg-muted",
      )}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "font-mono text-[10px]",
            active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ─── Checkbox cell ────────────────────────────────────────────────────────────

function CheckboxCell({
  checked,
  indeterminate,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  ariaLabel?: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={ariaLabel ?? "Select row"}
      className="h-3.5 w-3.5 cursor-pointer rounded-[3px] border border-border bg-transparent accent-primary"
      onClick={(e) => e.stopPropagation()}
    />
  );
}

// ─── Derived sorting ──────────────────────────────────────────────────────────

function getSortVal(s: Session, key: SortKey): string | number {
  switch (key) {
    case "started":
      return s.plugInAt;
    case "ended":
      return s.plugOutAt ?? s.chargingStopAt ?? s.plugInAt;
    case "duration":
      return s.durationMinutes;
    case "station":
      return s.stationName;
    case "connector":
      return s.connectorType;
    case "driver":
      return s.driverName;
    case "energy":
      return s.energyKwh;
    case "cost":
      return s.total;
    case "paymentStatus":
      return s.paymentStatus;
    default:
      return "";
  }
}

function sortSessions(list: Session[], sort: SortState): Session[] {
  return [...list].sort((a, b) => {
    const va = getSortVal(a, sort.key);
    const vb = getSortVal(b, sort.key);
    let cmp = 0;
    if (typeof va === "number" && typeof vb === "number") {
      cmp = va - vb;
    } else {
      cmp = String(va).localeCompare(String(vb));
    }
    return sort.dir === "asc" ? cmp : -cmp;
  });
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_STATUSES: SessionStatus[] = [
  "in-progress",
  "completed",
  "cancelled",
  "errored",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["paid", "pending", "refunded"];
const CONNECTOR_TYPES: ConnectorType[] = ["DC-CCS2", "DC-CHAdeMO", "AC-Type2", "AC-GBT"];
const DATE_RANGES: { key: DateRange; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "all", label: "All" },
];
const PAGE_SIZE = 20;

function getDateCutoff(range: DateRange): Date | null {
  const now = new Date();
  if (range === "today") {
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    return d;
  }
  if (range === "7d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    return d;
  }
  if (range === "30d") {
    const d = new Date(now);
    d.setDate(d.getDate() - 30);
    return d;
  }
  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SessionsIndex() {
  const navigate = useNavigate();

  // ── Filter state ──────────────────────────────────────────────────────────
  const [statusFilter, setStatusFilter] = React.useState<SessionStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = React.useState<PaymentStatus | "all">("all");
  const [connectorFilter, setConnectorFilter] = React.useState<ConnectorType | "all">("all");
  const [dateRange, setDateRange] = React.useState<DateRange>("7d");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<SortState>({ key: "started", dir: "desc" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [bulkSelected, setBulkSelected] = React.useState<Set<string>>(new Set());

  // ── Mock async states ──────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRetry = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  // ── Derived filtered + sorted list ────────────────────────────────────────
  const filtered = React.useMemo(() => {
    const cutoff = getDateCutoff(dateRange);
    let list = ALL_SESSIONS;

    if (cutoff) {
      list = list.filter((s) => new Date(s.plugInAt) >= cutoff);
    }
    if (statusFilter !== "all") {
      list = list.filter((s) => s.status === statusFilter);
    }
    if (paymentFilter !== "all") {
      list = list.filter((s) => s.paymentStatus === paymentFilter);
    }
    if (connectorFilter !== "all") {
      list = list.filter((s) => s.connectorType === connectorFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.stationId.toLowerCase().includes(q) ||
          s.driverName.toLowerCase().includes(q) ||
          s.driverPhone.includes(q),
      );
    }
    return sortSessions(list, sort);
  }, [statusFilter, paymentFilter, connectorFilter, dateRange, search, sort]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, paymentFilter, connectorFilter, dateRange, search, sort]);

  // ── Counts for chips ──────────────────────────────────────────────────────
  const cutoff = getDateCutoff(dateRange);
  const baseList = cutoff
    ? ALL_SESSIONS.filter((s) => new Date(s.plugInAt) >= cutoff)
    : ALL_SESSIONS;

  const statusCounts = React.useMemo(
    () => ({
      "in-progress": baseList.filter((s) => s.status === "in-progress").length,
      completed: baseList.filter((s) => s.status === "completed").length,
      cancelled: baseList.filter((s) => s.status === "cancelled").length,
      errored: baseList.filter((s) => s.status === "errored").length,
    }),
    [baseList],
  );

  // ── Sort handler ───────────────────────────────────────────────────────────
  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
  }, []);

  // ── Bulk selection ─────────────────────────────────────────────────────────
  const toggleBulk = React.useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBulkSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = React.useCallback(() => {
    setBulkSelected((prev) => {
      if (prev.size === paginated.length) return new Set();
      return new Set(paginated.map((s) => s.id));
    });
  }, [paginated]);

  const clearBulk = React.useCallback(() => setBulkSelected(new Set()), []);

  const allChecked = paginated.length > 0 && bulkSelected.size === paginated.length;
  const someChecked = bulkSelected.size > 0 && !allChecked;

  // ── Filter reset ──────────────────────────────────────────────────────────
  const resetFilters = React.useCallback(() => {
    setStatusFilter("all");
    setPaymentFilter("all");
    setConnectorFilter("all");
    setDateRange("7d");
    setSearch("");
  }, []);

  const hasActiveFilters =
    statusFilter !== "all" ||
    paymentFilter !== "all" ||
    connectorFilter !== "all" ||
    dateRange !== "7d" ||
    search.trim().length > 0;

  // ── Export CSV (stub) ─────────────────────────────────────────────────────
  const handleExport = React.useCallback(() => {
    const ids = bulkSelected.size > 0 ? Array.from(bulkSelected) : filtered.map((s) => s.id);
    console.log("[Sessions] Export CSV for", ids.length, "sessions:", ids);
  }, [bulkSelected, filtered]);

  // ── Row click ──────────────────────────────────────────────────────────────
  const handleRowClick = React.useCallback(
    (id: string) => {
      navigate(`/sessions/${id}`);
    },
    [navigate],
  );

  // ── Pagination buttons ─────────────────────────────────────────────────────
  const pageNumbers = React.useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      for (
        let i = Math.max(2, safePage - 1);
        i <= Math.min(totalPages - 1, safePage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [safePage, totalPages]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="sessions-heading">
      <h2 id="sessions-heading" className="sr-only">
        Sessions
      </h2>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {/* Row 1: status chips + date range */}
        <div className="flex flex-wrap items-center gap-1.5">
          <div
            role="group"
            aria-label="Filter by session status"
            className="flex flex-wrap items-center gap-1"
          >
            <FilterChip
              label="All statuses"
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            />
            {SESSION_STATUSES.map((s) => (
              <FilterChip
                key={s}
                label={SESSION_STATUS_LABEL[s]}
                active={statusFilter === s}
                count={statusCounts[s]}
                onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
              />
            ))}
          </div>

          <span
            className="mx-1 h-4 w-px bg-border"
            aria-hidden="true"
          />

          <div
            role="group"
            aria-label="Filter by date range"
            className="flex items-center gap-1"
          >
            {DATE_RANGES.map(({ key, label }) => (
              <FilterChip
                key={key}
                label={label}
                active={dateRange === key}
                onClick={() => setDateRange(key)}
              />
            ))}
          </div>
        </div>

        {/* Row 2: connector + payment + search + export */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            role="group"
            aria-label="Filter by connector type"
            className="flex flex-wrap items-center gap-1"
          >
            <FilterChip
              label="All connectors"
              active={connectorFilter === "all"}
              onClick={() => setConnectorFilter("all")}
            />
            {CONNECTOR_TYPES.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={connectorFilter === c}
                onClick={() =>
                  setConnectorFilter(connectorFilter === c ? "all" : c)
                }
              />
            ))}
          </div>

          <span className="mx-1 h-4 w-px bg-border" aria-hidden="true" />

          <div
            role="group"
            aria-label="Filter by payment status"
            className="flex flex-wrap items-center gap-1"
          >
            {PAYMENT_STATUSES.map((p) => (
              <FilterChip
                key={p}
                label={PAYMENT_STATUS_LABEL[p]}
                active={paymentFilter === p}
                onClick={() =>
                  setPaymentFilter(paymentFilter === p ? "all" : p)
                }
              />
            ))}
          </div>

          {/* Spacer */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                size={12}
                aria-hidden="true"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <label htmlFor="sessions-search" className="sr-only">
                Search sessions by ID, station, or driver
              </label>
              <input
                id="sessions-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Session ID, station, driver..."
                className={cn(
                  "h-8 w-56 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none",
                  "bg-muted border border-border",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:border-primary focus:ring-1 focus:ring-primary/20",
                  "transition-[box-shadow,border-color] duration-150 ease-out",
                )}
              />
            </div>

            {/* Export */}
            <button
              type="button"
              onClick={handleExport}
              aria-label={
                bulkSelected.size > 0
                  ? `Export ${bulkSelected.size} selected sessions as CSV`
                  : "Export all filtered sessions as CSV"
              }
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            >
              <Download size={12} aria-hidden="true" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* ── Error banner ─────────────────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle size={14} aria-hidden="true" className="text-error shrink-0" />
          <span className="font-body text-[12px] text-foreground">{error}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Retry loading sessions"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* ── Bulk action bar ──────────────────────────────────────────────── */}
      {bulkSelected.size > 0 && (
        <div
          className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-muted px-4 py-2.5"
          role="region"
          aria-label="Bulk actions"
        >
          <span className="font-mono text-[12px] text-foreground">
            {bulkSelected.size} selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
              aria-label="Export selected sessions as CSV"
            >
              <Download size={11} aria-hidden="true" />
              Export selected
            </button>
            <button
              type="button"
              onClick={clearBulk}
              className="ml-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150 ease-out"
              aria-label="Clear selection"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* ── Table card ───────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-card border border-border bg-card">
        {/* Toolbar sub-row */}
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            {filtered.length} session{filtered.length !== 1 ? "s" : ""}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 font-body text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150 ease-out"
              aria-label="Reset all filters"
            >
              <X size={10} aria-hidden="true" />
              Reset filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table aria-label="Charging sessions" className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                {/* Select all */}
                <TableHead scope="col" className="w-10 pr-0">
                  <CheckboxCell
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={toggleAll}
                    ariaLabel={allChecked ? "Deselect all" : "Select all visible sessions"}
                  />
                </TableHead>
                <TableHead scope="col" className="min-w-[104px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    Session ID
                  </span>
                </TableHead>
                <SortableHead
                  label="Started"
                  columnKey="started"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <SortableHead
                  label="Ended"
                  columnKey="ended"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <SortableHead
                  label="Duration"
                  columnKey="duration"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[80px]"
                />
                <SortableHead
                  label="Station"
                  columnKey="station"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[140px]"
                />
                <SortableHead
                  label="Connector"
                  columnKey="connector"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Driver"
                  columnKey="driver"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[140px]"
                />
                <SortableHead
                  label="Energy (kWh)"
                  columnKey="energy"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Cost (₹)"
                  columnKey="cost"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[80px]"
                />
                <SortableHead
                  label="Payment"
                  columnKey="paymentStatus"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[90px]"
                />
                <TableHead scope="col" className="min-w-[100px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                    Status
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`} aria-hidden="true">
                    <TableCell className="pr-0">
                      <div className="h-3.5 w-3.5 rounded-[3px] bg-muted animate-pulse" />
                    </TableCell>
                    {Array.from({ length: 11 }).map((_, j) => (
                      <TableCell key={j}>
                        <div
                          className="h-3 rounded bg-muted animate-pulse"
                          style={{ width: `${50 + (j * 13) % 40}px` }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {/* Empty state */}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className="h-40">
                    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                      <p className="font-body text-[13px] text-foreground">
                        No sessions match. Clear filters?
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                        aria-label="Clear all session filters"
                      >
                        <X size={11} aria-hidden="true" />
                        Clear filters
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                paginated.map((session) => {
                  const isBulk = bulkSelected.has(session.id);
                  return (
                    <TableRow
                      key={session.id}
                      onClick={() => handleRowClick(session.id)}
                      className={cn(
                        "cursor-pointer transition-colors duration-150 ease-out hover:bg-muted/50",
                        isBulk && "bg-primary/5 hover:bg-primary/10",
                      )}
                      aria-label={`Session ${session.id}, ${session.driverName}, ${session.stationName}, ${session.energyKwh} kWh`}
                    >
                      {/* Checkbox */}
                      <TableCell
                        className="pr-0"
                        onClick={(e) => toggleBulk(session.id, e)}
                      >
                        <CheckboxCell
                          checked={isBulk}
                          onChange={() => {}}
                          ariaLabel={`Select session ${session.id}`}
                        />
                      </TableCell>

                      {/* Session ID */}
                      <TableCell>
                        <span className="font-mono text-[11px] text-foreground">
                          {session.id}
                        </span>
                      </TableCell>

                      {/* Started */}
                      <TableCell>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {formatTs(session.plugInAt)}
                        </span>
                      </TableCell>

                      {/* Ended */}
                      <TableCell>
                        {session.plugOutAt ? (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {formatTs(session.plugOutAt)}
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-muted-foreground italic">
                            {session.status === "in-progress" ? "Active" : "--"}
                          </span>
                        )}
                      </TableCell>

                      {/* Duration */}
                      <TableCell>
                        <span className="font-mono text-[12px] text-foreground">
                          {formatDuration(session.durationMinutes)}
                        </span>
                      </TableCell>

                      {/* Station */}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Link
                          to={`/stations/${session.stationId}`}
                          className="flex flex-col gap-0.5 group"
                          aria-label={`View station ${session.stationName}`}
                        >
                          <span className="font-body text-[12px] font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                            {session.stationName}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {session.stationId} · P{session.port}
                          </span>
                        </Link>
                      </TableCell>

                      {/* Connector */}
                      <TableCell>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {session.connectorType}
                        </span>
                      </TableCell>

                      {/* Driver */}
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-body text-[12px] font-medium text-foreground">
                            {session.driverName}
                          </span>
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {session.authMethod}
                          </span>
                        </div>
                      </TableCell>

                      {/* Energy */}
                      <TableCell>
                        <span className="font-mono text-[12px] text-foreground">
                          {session.energyKwh.toFixed(1)}
                        </span>
                      </TableCell>

                      {/* Cost */}
                      <TableCell>
                        <span
                          className={cn(
                            "font-mono text-[12px] font-medium",
                            session.total > 0 ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {session.total > 0
                            ? `₹${session.total.toLocaleString("en-IN")}`
                            : "--"}
                        </span>
                      </TableCell>

                      {/* Payment status */}
                      <TableCell>
                        <PaymentStatusPill status={session.paymentStatus} />
                      </TableCell>

                      {/* Session status */}
                      <TableCell>
                        <SessionStatusPill status={session.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <nav
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border bg-card px-4 py-2.5"
          aria-label="Session list pagination"
        >
          <span className="font-mono text-[11px] text-muted-foreground">
            Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length} sessions
          </span>
          <div className="flex items-center gap-1" role="list" aria-label="Page numbers">
            {pageNumbers.map((p, i) => {
              const isCurrent = p === safePage;
              const isEllipsis = p === "...";
              return (
                <button
                  key={i}
                  type="button"
                  role="listitem"
                  disabled={isEllipsis}
                  onClick={() => !isEllipsis && setCurrentPage(p as number)}
                  aria-label={isEllipsis ? "More pages" : `Go to page ${p}`}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 font-mono text-[11px] transition-colors duration-150",
                    isCurrent
                      ? "bg-primary text-white"
                      : isEllipsis
                        ? "border-transparent text-muted-foreground cursor-default"
                        : "border border-border text-muted-foreground hover:bg-muted cursor-pointer",
                  )}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
