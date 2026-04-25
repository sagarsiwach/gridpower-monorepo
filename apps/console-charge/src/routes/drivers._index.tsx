/**
 * CON.5: Drivers list
 * Route: /drivers (index)
 *
 * Spec section 4.4 — driver account management.
 *
 * Features:
 * - Filters: account type, registration date range (quick buckets), total spend bucket
 * - Search: by name, phone, email, RFID UID, app user ID
 * - Sortable columns with aria-sort
 * - Loading skeleton / empty / error states
 * - Pagination (20 per page)
 * - Row click → /drivers/:driverId
 * - Account type and status badges
 *
 * PII NOTE: Phone and email are visible to all roles in this mock.
 * Real implementation must gate visibility by role (support/admin only).
 */

import * as React from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from "@gridpower/ui";

import {
  ALL_DRIVERS,
  type Driver,
  type AccountType,
  type DriverStatus,
} from "~/mocks/drivers";

// ─── Types ─────────────────────────────────────────────────────────────────────

type SortKey =
  | "name"
  | "accountType"
  | "status"
  | "lifetimeSessions"
  | "lifetimeSpend"
  | "lastSession"
  | "memberSince";
type SortDir = "asc" | "desc";

interface SortState {
  key: SortKey;
  dir: SortDir;
}

type AccountTypeFilter = "all" | AccountType;
type SpendBucket =
  | "all"
  | "under_5k"
  | "5k_25k"
  | "25k_75k"
  | "over_75k";
type RegFilter = "all" | "last_30d" | "last_90d" | "last_year";

// ─── Label maps ────────────────────────────────────────────────────────────────

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  rfid_only: "RFID only",
  app_only: "App only",
  both: "RFID + App",
};

const ACCOUNT_TYPE_STYLES: Record<
  AccountType,
  { bg: string; text: string }
> = {
  rfid_only: { bg: "bg-info/10", text: "text-info" },
  app_only: { bg: "bg-warning/10", text: "text-warning" },
  both: { bg: "bg-success/10", text: "text-success" },
};

const STATUS_STYLES: Record<DriverStatus, { bg: string; text: string; dot: string }> = {
  active: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
  },
  blocked: {
    bg: "bg-error/10",
    text: "text-error",
    dot: "bg-error",
  },
  disputed: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
  },
};

const STATUS_LABELS: Record<DriverStatus, string> = {
  active: "Active",
  blocked: "Blocked",
  disputed: "Disputed",
};

const PAGE_SIZE = 20;

// ─── Spend bucket helper ───────────────────────────────────────────────────────

function matchesSpendBucket(spend: number, bucket: SpendBucket): boolean {
  switch (bucket) {
    case "all":
      return true;
    case "under_5k":
      return spend < 5000;
    case "5k_25k":
      return spend >= 5000 && spend < 25000;
    case "25k_75k":
      return spend >= 25000 && spend < 75000;
    case "over_75k":
      return spend >= 75000;
  }
}

function matchesRegFilter(registeredAt: string, f: RegFilter): boolean {
  if (f === "all") return true;
  const reg = new Date(registeredAt).getTime();
  const now = Date.now();
  const day = 86400000;
  if (f === "last_30d") return reg >= now - 30 * day;
  if (f === "last_90d") return reg >= now - 90 * day;
  if (f === "last_year") return reg >= now - 365 * day;
  return true;
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

function sortDrivers(list: Driver[], sort: SortState): Driver[] {
  return [...list].sort((a, b) => {
    let va: string | number = "";
    let vb: string | number = "";
    switch (sort.key) {
      case "name":
        va = a.name;
        vb = b.name;
        break;
      case "accountType":
        va = a.accountType;
        vb = b.accountType;
        break;
      case "status":
        va = a.status;
        vb = b.status;
        break;
      case "lifetimeSessions":
        va = a.lifetimeSessions;
        vb = b.lifetimeSessions;
        break;
      case "lifetimeSpend":
        va = a.lifetimeSpendRupees;
        vb = b.lifetimeSpendRupees;
        break;
      case "lastSession":
        va = a.lastSessionAt;
        vb = b.lastSessionAt;
        break;
      case "memberSince":
        va = a.registeredAt;
        vb = b.registeredAt;
        break;
    }
    let cmp =
      typeof va === "number" && typeof vb === "number"
        ? va - vb
        : String(va).localeCompare(String(vb));
    return sort.dir === "asc" ? cmp : -cmp;
  });
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SortIcon({ col, sort }: { col: SortKey; sort: SortState }) {
  if (sort.key !== col)
    return (
      <ArrowUpDown size={11} className="text-muted-foreground" aria-hidden="true" />
    );
  return sort.dir === "asc" ? (
    <ArrowUp size={11} className="text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown size={11} className="text-primary" aria-hidden="true" />
  );
}

function SortableTh({
  label,
  col,
  sort,
  onSort,
  className,
}: {
  label: string;
  col: SortKey;
  sort: SortState;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const isActive = sort.key === col;
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
    >
      <button
        type="button"
        onClick={() => onSort(col)}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer"
        aria-label={`Sort by ${label}${
          isActive
            ? sort.dir === "asc"
              ? " (ascending)"
              : " (descending)"
            : ""
        }`}
      >
        {label}
        <SortIcon col={col} sort={sort} />
      </button>
    </TableHead>
  );
}

function AccountTypePill({ type }: { type: AccountType }) {
  const s = ACCOUNT_TYPE_STYLES[type];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
        s.bg,
        s.text,
      )}
    >
      {ACCOUNT_TYPE_LABELS[type]}
    </span>
  );
}

function StatusPill({ status }: { status: DriverStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
        s.bg,
        s.text,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full shrink-0", s.dot)}
        aria-hidden="true"
      />
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DriversIndex() {
  const navigate = useNavigate();

  // Filters
  const [accountFilter, setAccountFilter] =
    React.useState<AccountTypeFilter>("all");
  const [spendFilter, setSpendFilter] = React.useState<SpendBucket>("all");
  const [regFilter, setRegFilter] = React.useState<RegFilter>("all");
  const [search, setSearch] = React.useState("");

  // Sort
  const [sort, setSort] = React.useState<SortState>({
    key: "name",
    dir: "asc",
  });

  // Pagination
  const [page, setPage] = React.useState(1);

  // Mock async states
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Filter panel visibility
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const handleRetry = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  // Derived filtered list
  const filtered = React.useMemo(() => {
    let list = ALL_DRIVERS;

    if (accountFilter !== "all") {
      list = list.filter((d) => d.accountType === accountFilter);
    }
    if (spendFilter !== "all") {
      list = list.filter((d) =>
        matchesSpendBucket(d.lifetimeSpendRupees, spendFilter),
      );
    }
    if (regFilter !== "all") {
      list = list.filter((d) => matchesRegFilter(d.registeredAt, regFilter));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.phone.replace(/\s/g, "").includes(q.replace(/\s/g, "")) ||
          d.email.toLowerCase().includes(q) ||
          d.cards.some((c) => c.uid.toLowerCase().includes(q)) ||
          (d.appUserId?.toLowerCase() ?? "").includes(q),
      );
    }

    return sortDrivers(list, sort);
  }, [accountFilter, spendFilter, regFilter, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // Reset to page 1 on filter change
  React.useEffect(() => {
    setPage(1);
  }, [accountFilter, spendFilter, regFilter, search, sort]);

  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }, []);

  const resetFilters = React.useCallback(() => {
    setAccountFilter("all");
    setSpendFilter("all");
    setRegFilter("all");
    setSearch("");
  }, []);

  const hasActiveFilters =
    accountFilter !== "all" ||
    spendFilter !== "all" ||
    regFilter !== "all" ||
    search.trim().length > 0;

  // Status counts
  const counts = React.useMemo(
    () => ({
      active: ALL_DRIVERS.filter((d) => d.status === "active").length,
      disputed: ALL_DRIVERS.filter((d) => d.status === "disputed").length,
      blocked: ALL_DRIVERS.filter((d) => d.status === "blocked").length,
    }),
    [],
  );

  return (
    <section className="flex flex-col gap-4" aria-labelledby="drivers-heading">
      <h2 id="drivers-heading" className="sr-only">
        Drivers
      </h2>

      {/* ── Status summary strip ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] text-muted-foreground">
          {ALL_DRIVERS.length} total drivers
        </span>
        <span className="text-border" aria-hidden="true">|</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          {counts.active} active
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-warning">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
          {counts.disputed} disputed
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-error">
          <span className="h-1.5 w-1.5 rounded-full bg-error" aria-hidden="true" />
          {counts.blocked} blocked
        </span>
      </div>

      {/* ── Toolbar: search + filters toggle ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            size={12}
            aria-hidden="true"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <label htmlFor="drivers-search" className="sr-only">
            Search drivers by name, phone, email, RFID UID, or App ID
          </label>
          <input
            id="drivers-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, email, RFID UID..."
            className={cn(
              "h-8 w-full rounded-pill pl-7 pr-8 font-body text-[12px] outline-none",
              "bg-muted border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-[box-shadow,border-color] duration-150 ease-out",
            )}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              <X size={11} aria-hidden="true" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          aria-expanded={filtersOpen}
          aria-controls="drivers-filter-panel"
          className={cn(
            "inline-flex items-center gap-1.5 h-8 rounded-btn border px-3 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out",
            filtersOpen || hasActiveFilters
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-transparent text-muted-foreground hover:bg-muted",
          )}
        >
          <SlidersHorizontal size={12} aria-hidden="true" />
          Filters
          {hasActiveFilters && (
            <span className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-white font-mono">
              {[accountFilter !== "all", spendFilter !== "all", regFilter !== "all"].filter(Boolean).length + (search.trim() ? 1 : 0)}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1 font-body text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150 ease-out"
          >
            <X size={11} aria-hidden="true" />
            Clear all
          </button>
        )}
      </div>

      {/* ── Filter panel ─────────────────────────────────────────────────── */}
      {filtersOpen && (
        <div
          id="drivers-filter-panel"
          className="rounded-card border border-border bg-muted px-4 py-3 flex flex-wrap gap-6"
        >
          {/* Account type */}
          <fieldset>
            <legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Account type
            </legend>
            <div className="flex flex-wrap gap-1.5" role="group">
              {(
                [
                  ["all", "All types"],
                  ["rfid_only", "RFID only"],
                  ["app_only", "App only"],
                  ["both", "RFID + App"],
                ] as [AccountTypeFilter, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={accountFilter === val}
                  onClick={() => setAccountFilter(val)}
                  className={cn(
                    "rounded-btn px-2.5 py-1 font-body text-[11px] border cursor-pointer transition-colors duration-150 ease-out",
                    accountFilter === val
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-transparent text-muted-foreground hover:bg-card",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Registered */}
          <fieldset>
            <legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Registered
            </legend>
            <div className="flex flex-wrap gap-1.5" role="group">
              {(
                [
                  ["all", "Any time"],
                  ["last_30d", "Last 30 days"],
                  ["last_90d", "Last 90 days"],
                  ["last_year", "Last year"],
                ] as [RegFilter, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={regFilter === val}
                  onClick={() => setRegFilter(val)}
                  className={cn(
                    "rounded-btn px-2.5 py-1 font-body text-[11px] border cursor-pointer transition-colors duration-150 ease-out",
                    regFilter === val
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-transparent text-muted-foreground hover:bg-card",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Spend bucket */}
          <fieldset>
            <legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Total spend
            </legend>
            <div className="flex flex-wrap gap-1.5" role="group">
              {(
                [
                  ["all", "Any"],
                  ["under_5k", "Under 5k"],
                  ["5k_25k", "5k to 25k"],
                  ["25k_75k", "25k to 75k"],
                  ["over_75k", "Over 75k"],
                ] as [SpendBucket, string][]
              ).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  aria-pressed={spendFilter === val}
                  onClick={() => setSpendFilter(val)}
                  className={cn(
                    "rounded-btn px-2.5 py-1 font-body text-[11px] border cursor-pointer transition-colors duration-150 ease-out",
                    spendFilter === val
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-transparent text-muted-foreground hover:bg-card",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {/* ── Error banner ──────────────────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle
            size={14}
            aria-hidden="true"
            className="text-error shrink-0"
          />
          <span className="font-body text-[12px] text-foreground">{error}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Retry loading drivers"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-card border border-border bg-card">
        {/* Toolbar row */}
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
          >
            {filtered.length} driver{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <caption className="sr-only">Drivers list</caption>
            <TableHeader>
              <TableRow>
                <SortableTh
                  label="Name"
                  col="name"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[160px]"
                />
                <TableHead scope="col" className="min-w-[130px]">
                  Phone
                </TableHead>
                <TableHead scope="col" className="min-w-[180px]">
                  Email
                </TableHead>
                <SortableTh
                  label="Account type"
                  col="accountType"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[130px]"
                />
                <TableHead scope="col" className="min-w-[60px]">
                  Cards
                </TableHead>
                <SortableTh
                  label="Sessions"
                  col="lifetimeSessions"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[80px]"
                />
                <SortableTh
                  label="Total spent"
                  col="lifetimeSpend"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
                <SortableTh
                  label="Last session"
                  col="lastSession"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <SortableTh
                  label="Status"
                  col="status"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <TableHead scope="col" className="w-10">
                  <span className="sr-only">Row actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={`sk-${i}`} aria-hidden="true">
                    {Array.from({ length: 10 }).map((__, j) => (
                      <TableCell key={j}>
                        <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {/* Empty state */}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="h-44">
                    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                      <p className="font-body text-[13px] text-foreground">
                        {hasActiveFilters
                          ? "No drivers match the current filters."
                          : "No drivers registered yet."}
                      </p>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                        >
                          <X size={11} aria-hidden="true" />
                          Clear filters
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                paginated.map((driver) => (
                  <TableRow
                    key={driver.id}
                    onClick={() => navigate(`/drivers/${driver.id}`)}
                    className="cursor-pointer transition-colors duration-150 ease-out"
                  >
                    {/* Name */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[13px] font-medium text-foreground">
                          {driver.name}
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {driver.id}
                        </span>
                      </div>
                    </TableCell>

                    {/* Phone — PII: visible to all roles in mock */}
                    <TableCell>
                      <span className="font-mono text-[11px] text-foreground">
                        {driver.phone}
                      </span>
                    </TableCell>

                    {/* Email — PII: visible to all roles in mock */}
                    <TableCell>
                      <span className="font-body text-[11px] text-muted-foreground truncate max-w-[180px] block">
                        {driver.email}
                      </span>
                    </TableCell>

                    {/* Account type */}
                    <TableCell>
                      <AccountTypePill type={driver.accountType} />
                    </TableCell>

                    {/* Cards count */}
                    <TableCell>
                      <span className="font-mono text-[12px] text-foreground">
                        {driver.cards.length}
                      </span>
                    </TableCell>

                    {/* Sessions */}
                    <TableCell>
                      <span className="font-mono text-[12px] text-foreground">
                        {driver.lifetimeSessions.toLocaleString("en-IN")}
                      </span>
                    </TableCell>

                    {/* Total spent */}
                    <TableCell>
                      <span className="font-mono text-[12px] font-medium text-primary">
                        {`₹${driver.lifetimeSpendRupees.toLocaleString("en-IN")}`}
                      </span>
                    </TableCell>

                    {/* Last session */}
                    <TableCell>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {driver.lastSessionAt}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusPill status={driver.status} />
                    </TableCell>

                    {/* Row actions */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted text-muted-foreground cursor-pointer transition-colors duration-150 ease-out"
                            aria-label={`Actions for ${driver.name}`}
                          >
                            <MoreHorizontal size={14} aria-hidden="true" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/drivers/${driver.id}`)}
                          >
                            View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/sessions?driver_id=${driver.id}`,
                              )
                            }
                          >
                            View sessions
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send message</DropdownMenuItem>
                          {driver.status === "active" && (
                            <DropdownMenuItem className="text-error focus:text-error">
                              Block account
                            </DropdownMenuItem>
                          )}
                          {driver.status === "blocked" && (
                            <DropdownMenuItem className="text-success focus:text-success">
                              Unblock account
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination footer */}
        <nav
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border bg-card px-4 py-2.5"
          aria-label="Drivers pagination"
        >
          <span className="font-mono text-[11px] text-muted-foreground">
            Showing{" "}
            {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length} drivers
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              aria-label="Previous page"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded border font-mono text-[11px] transition-colors duration-150 ease-out",
                safePage <= 1
                  ? "border-border text-muted-foreground/40 cursor-not-allowed"
                  : "border-border text-muted-foreground hover:bg-muted cursor-pointer",
              )}
            >
              <ChevronLeft size={12} aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
              )
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && typeof arr[i - 1] === "number" && (p as number) - (arr[i - 1] as number) > 1) {
                  acc.push("...");
                }
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="flex h-7 w-7 items-center justify-center font-mono text-[11px] text-muted-foreground"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p as number)}
                    aria-label={`Go to page ${p}`}
                    aria-current={p === safePage ? "page" : undefined}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded font-mono text-[11px] transition-colors duration-150 ease-out",
                      p === safePage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:bg-muted cursor-pointer",
                    )}
                  >
                    {p}
                  </button>
                ),
              )}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              aria-label="Next page"
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded border font-mono text-[11px] transition-colors duration-150 ease-out",
                safePage >= totalPages
                  ? "border-border text-muted-foreground/40 cursor-not-allowed"
                  : "border-border text-muted-foreground hover:bg-muted cursor-pointer",
              )}
            >
              <ChevronRight size={12} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
}
