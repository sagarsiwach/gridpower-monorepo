/**
 * CON.10: Maintenance list
 * Route: /maintenance (index)
 *
 * Features:
 * - Filters: status, priority, assigned tech, station, scheduled date range
 * - Sortable columns with aria-sort
 * - View toggle: List (table) / Calendar (CSS grid week view)
 * - "Create work order" CTA -> /maintenance/new
 * - Row click -> /maintenance/:workOrderId
 * - Loading, empty, and error states
 */

import * as React from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  List,
  Plus,
  RefreshCw,
  Search,
  AlertTriangle,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  cn,
} from "@gridpower/ui";

import {
  ALL_WORK_ORDERS,
  TECHNICIANS,
  STATUS_COUNTS,
  type WOStatus,
  type WOPriority,
  type WorkOrder,
} from "~/mocks/maintenance";

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { value: WOStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "assigned", label: "Assigned" },
  { value: "in-progress", label: "In progress" },
  { value: "awaiting-parts", label: "Awaiting parts" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const PRIORITY_OPTIONS: { value: WOPriority | "all"; label: string }[] = [
  { value: "all", label: "All priorities" },
  { value: "P1", label: "P1 Critical" },
  { value: "P2", label: "P2 High" },
  { value: "P3", label: "P3 Normal" },
];

const ISSUE_TYPE_LABELS: Record<string, string> = {
  "hardware-failure": "Hardware failure",
  "firmware-issue": "Firmware issue",
  vandalism: "Vandalism",
  "scheduled-service": "Scheduled service",
  other: "Other",
};

// ─── Pill components ──────────────────────────────────────────────────────────

function PriorityPill({ priority }: { priority: WOPriority }) {
  const styles: Record<WOPriority, string> = {
    P1: "bg-error/10 text-error",
    P2: "bg-warning/10 text-warning",
    P3: "bg-info/10 text-info",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[10px] font-medium",
        styles[priority],
      )}
    >
      {priority}
    </span>
  );
}

function StatusPill({ status }: { status: WOStatus }) {
  const styles: Record<WOStatus, string> = {
    open: "bg-info/10 text-info",
    assigned: "bg-info/10 text-info",
    "in-progress": "bg-warning/10 text-warning",
    "awaiting-parts": "bg-warning/10 text-warning",
    completed: "bg-success/10 text-success",
    cancelled: "bg-muted text-muted-foreground",
  };
  const labels: Record<WOStatus, string> = {
    open: "Open",
    assigned: "Assigned",
    "in-progress": "In progress",
    "awaiting-parts": "Awaiting parts",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}

// ─── Sort ─────────────────────────────────────────────────────────────────────

type SortKey = "number" | "station" | "priority" | "status" | "assigned" | "createdAt" | "scheduledAt";
type SortDir = "asc" | "desc";

interface SortState {
  key: SortKey;
  dir: SortDir;
}

const PRIORITY_ORDER: Record<WOPriority, number> = { P1: 0, P2: 1, P3: 2 };
const STATUS_ORDER: Record<WOStatus, number> = {
  open: 0,
  assigned: 1,
  "in-progress": 2,
  "awaiting-parts": 3,
  completed: 4,
  cancelled: 5,
};

function getVal(w: WorkOrder, key: SortKey): string | number {
  switch (key) {
    case "number": return w.number;
    case "station": return w.stationName;
    case "priority": return PRIORITY_ORDER[w.priority];
    case "status": return STATUS_ORDER[w.status];
    case "assigned": return w.assignedTech ?? "";
    case "createdAt": return w.createdAt;
    case "scheduledAt": return w.scheduledAt;
    default: return "";
  }
}

function sortOrders(list: WorkOrder[], sort: SortState): WorkOrder[] {
  return [...list].sort((a, b) => {
    const va = getVal(a, sort.key);
    const vb = getVal(b, sort.key);
    let cmp = 0;
    if (typeof va === "number" && typeof vb === "number") {
      cmp = va - vb;
    } else {
      cmp = String(va).localeCompare(String(vb));
    }
    return sort.dir === "asc" ? cmp : -cmp;
  });
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ columnKey, sort }: { columnKey: SortKey; sort: SortState }) {
  if (sort.key !== columnKey)
    return <ArrowUpDown size={11} className="text-muted-foreground" aria-hidden="true" />;
  return sort.dir === "asc" ? (
    <ArrowUp size={11} className="text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown size={11} className="text-primary" aria-hidden="true" />
  );
}

// ─── Sortable header ──────────────────────────────────────────────────────────

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
    <TableHead scope="col" aria-sort={ariaSort} className={cn("cursor-pointer select-none", className)}>
      <button
        type="button"
        onClick={() => onSort(columnKey)}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer"
        aria-label={`Sort by ${label}${isActive ? ` (${sort.dir === "asc" ? "ascending" : "descending"}, click to reverse)` : ""}`}
      >
        {label}
        <SortIcon columnKey={columnKey} sort={sort} />
      </button>
    </TableHead>
  );
}

// ─── Calendar week view ───────────────────────────────────────────────────────

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Return the start of the ISO week (Monday) for a given Date.
 */
function getWeekStart(d: Date): Date {
  const day = d.getDay(); // 0=Sun
  const diff = (day === 0 ? -6 : 1 - day);
  const start = new Date(d);
  start.setDate(d.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatDayLabel(d: Date): string {
  return d.getDate().toString();
}

function CalendarView({
  orders,
  onClickOrder,
}: {
  orders: WorkOrder[];
  onClickOrder: (id: string) => void;
}) {
  const [weekStart, setWeekStart] = React.useState<Date>(() => getWeekStart(new Date()));

  const days = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  // Build a map: isoDate -> WO[]
  const byDay = React.useMemo(() => {
    const map: Record<string, WorkOrder[]> = {};
    for (const day of days) {
      map[isoDate(day)] = [];
    }
    for (const wo of orders) {
      const d = wo.scheduledAt.slice(0, 10);
      if (map[d]) {
        map[d].push(wo);
      }
    }
    return map;
  }, [orders, days]);

  const weekLabel = days.length === 7
    ? `${days[0]!.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} – ${days[6]!.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
    : "";

  return (
    <section aria-labelledby="cal-heading" className="rounded-card border border-border bg-card overflow-hidden">
      {/* Calendar toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setWeekStart((p) => addDays(p, -7))}
            className="flex h-7 w-7 items-center justify-center rounded border border-border bg-transparent hover:bg-muted text-muted-foreground cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Previous week"
          >
            <ChevronLeft size={13} aria-hidden="true" />
          </button>
          <span
            id="cal-heading"
            className="font-mono text-[11px] text-foreground min-w-[160px] text-center"
          >
            {weekLabel}
          </span>
          <button
            type="button"
            onClick={() => setWeekStart((p) => addDays(p, 7))}
            className="flex h-7 w-7 items-center justify-center rounded border border-border bg-transparent hover:bg-muted text-muted-foreground cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Next week"
          >
            <ChevronRight size={13} aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setWeekStart(getWeekStart(new Date()))}
          className="px-2.5 py-1 rounded border border-border font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
        >
          Today
        </button>
      </div>

      {/* Day headers */}
      <div
        className="grid border-b border-border"
        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
        role="row"
        aria-label="Week days"
      >
        {days.map((d, i) => {
          const isToday = isoDate(d) === isoDate(new Date());
          return (
            <div
              key={i}
              role="columnheader"
              className={cn(
                "border-r border-border last:border-r-0 px-2 py-2 text-center",
                isToday && "bg-primary/5",
              )}
            >
              <div className={cn("font-mono text-[10px] uppercase tracking-widest", isToday ? "text-primary" : "text-muted-foreground")}>
                {DAY_LABELS[i]}
              </div>
              <div className={cn("font-mono text-[13px] font-medium mt-0.5", isToday ? "text-primary" : "text-foreground")}>
                {formatDayLabel(d)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Day cells */}
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
        role="grid"
        aria-label="Work order calendar"
      >
        {days.map((d, i) => {
          const key = isoDate(d);
          const dayOrders = byDay[key] ?? [];
          const isToday = key === isoDate(new Date());
          return (
            <div
              key={i}
              role="gridcell"
              className={cn(
                "border-r border-border last:border-r-0 min-h-[140px] p-1.5 flex flex-col gap-1",
                isToday && "bg-primary/5",
              )}
              aria-label={`${DAY_LABELS[i]} ${formatDayLabel(d)}, ${dayOrders.length} work order${dayOrders.length !== 1 ? "s" : ""}`}
            >
              {dayOrders.length === 0 && (
                <span className="mt-2 block text-center font-body text-[10px] text-muted-foreground/50">
                  No WOs
                </span>
              )}
              {dayOrders.map((wo) => (
                <button
                  key={wo.id}
                  type="button"
                  onClick={() => onClickOrder(wo.id)}
                  className={cn(
                    "w-full text-left rounded px-1.5 py-1 font-body text-[10px] leading-tight cursor-pointer transition-colors duration-150 ease-out",
                    wo.priority === "P1" && "bg-error/10 text-error hover:bg-error/20",
                    wo.priority === "P2" && "bg-warning/10 text-warning hover:bg-warning/20",
                    wo.priority === "P3" && "bg-info/10 text-info hover:bg-info/20",
                  )}
                  aria-label={`${wo.number}: ${wo.issueSummary}`}
                >
                  <div className="font-mono text-[9px] opacity-70">{wo.number}</div>
                  <div className="truncate">{wo.issueSummary}</div>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type ViewMode = "list" | "calendar";

export default function MaintenanceIndex() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ── Filters ──────────────────────────────────────────────────────────────
  const [statusFilter, setStatusFilter] = React.useState<WOStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = React.useState<WOPriority | "all">("all");
  const [techFilter, setTechFilter] = React.useState<string>("all");
  const [stationFilter, setStationFilter] = React.useState<string>("all");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");
  const [search, setSearch] = React.useState("");

  // ── View mode ─────────────────────────────────────────────────────────────
  const [viewMode, setViewMode] = React.useState<ViewMode>("list");

  // ── Sort ─────────────────────────────────────────────────────────────────
  const [sort, setSort] = React.useState<SortState>({ key: "scheduledAt", dir: "asc" });

  // ── Async UI states ───────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRetry = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  // ── Derived data ──────────────────────────────────────────────────────────
  const allStations = React.useMemo(
    () => Array.from(new Set(ALL_WORK_ORDERS.map((w) => w.stationName))).sort(),
    [],
  );

  const filtered = React.useMemo(() => {
    let list = ALL_WORK_ORDERS;
    if (statusFilter !== "all") list = list.filter((w) => w.status === statusFilter);
    if (priorityFilter !== "all") list = list.filter((w) => w.priority === priorityFilter);
    if (techFilter !== "all") list = list.filter((w) => w.assignedTech === techFilter);
    if (stationFilter !== "all") list = list.filter((w) => w.stationName === stationFilter);
    if (dateFrom) list = list.filter((w) => w.scheduledAt >= dateFrom);
    if (dateTo) list = list.filter((w) => w.scheduledAt.slice(0, 10) <= dateTo);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (w) =>
          w.number.toLowerCase().includes(q) ||
          w.stationName.toLowerCase().includes(q) ||
          w.issueSummary.toLowerCase().includes(q) ||
          (w.assignedTech ?? "").toLowerCase().includes(q),
      );
    }
    return sortOrders(list, sort);
  }, [statusFilter, priorityFilter, techFilter, stationFilter, dateFrom, dateTo, search, sort]);

  const hasActiveFilters =
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    techFilter !== "all" ||
    stationFilter !== "all" ||
    !!dateFrom ||
    !!dateTo ||
    !!search.trim();

  const resetFilters = React.useCallback(() => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setTechFilter("all");
    setStationFilter("all");
    setDateFrom("");
    setDateTo("");
    setSearch("");
  }, []);

  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" },
    );
  }, []);

  const handleRowClick = React.useCallback(
    (id: string) => navigate(`/maintenance/${id}`),
    [navigate],
  );

  // Prefill status filter from query param (e.g. from topbar alert)
  React.useEffect(() => {
    const s = searchParams.get("status") as WOStatus | null;
    if (s) setStatusFilter(s);
  }, [searchParams]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="maintenance-heading">
      <h2 id="maintenance-heading" className="sr-only">
        Maintenance
      </h2>

      {/* ── Page header bar ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Maintenance
          </span>
          <div className="flex items-center gap-3">
            {(["open", "in-progress", "awaiting-parts"] as WOStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                aria-pressed={statusFilter === s}
                className={cn(
                  "inline-flex items-center gap-1.5 font-body text-[12px] transition-colors duration-150 ease-out cursor-pointer",
                  statusFilter === s ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[11px] font-semibold",
                    s === "open" && "text-info",
                    s === "in-progress" && "text-warning",
                    s === "awaiting-parts" && "text-warning",
                  )}
                >
                  {STATUS_COUNTS[s]}
                </span>
                <span className="capitalize">{s === "in-progress" ? "In progress" : s === "awaiting-parts" ? "Awaiting parts" : s}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div
            className="flex items-center rounded-btn border border-border bg-muted p-0.5"
            role="group"
            aria-label="View mode"
          >
            {(["list", "calendar"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                aria-pressed={viewMode === mode}
                className={cn(
                  "flex h-6 w-7 items-center justify-center rounded-[5px] transition-colors duration-150 ease-out cursor-pointer",
                  viewMode === mode
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={mode === "list" ? "List view" : "Calendar view"}
              >
                {mode === "list" ? (
                  <List size={12} aria-hidden="true" />
                ) : (
                  <Calendar size={12} aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            className="gap-1.5 h-8 rounded-btn font-body text-[12px]"
            onClick={() => navigate("/maintenance/new")}
          >
            <Plus size={13} aria-hidden="true" />
            Create work order
          </Button>
        </div>
      </div>

      {/* ── Filters row ───────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative">
          <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="wo-search" className="sr-only">Search work orders</label>
          <input
            id="wo-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search WOs..."
            className={cn(
              "h-8 w-44 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none",
              "bg-muted border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-[box-shadow,border-color] duration-150 ease-out",
            )}
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <label htmlFor="filter-status" className="sr-only">Filter by status</label>
          <select
            id="filter-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as WOStatus | "all")}
            className={cn(
              "h-8 appearance-none rounded-btn border border-border bg-muted pl-3 pr-7 font-body text-[12px] text-foreground cursor-pointer outline-none",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-colors duration-150 ease-out",
            )}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Filter size={10} aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Priority filter */}
        <div className="relative">
          <label htmlFor="filter-priority" className="sr-only">Filter by priority</label>
          <select
            id="filter-priority"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as WOPriority | "all")}
            className={cn(
              "h-8 appearance-none rounded-btn border border-border bg-muted pl-3 pr-7 font-body text-[12px] text-foreground cursor-pointer outline-none",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-colors duration-150 ease-out",
            )}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Filter size={10} aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Tech filter */}
        <div className="relative">
          <label htmlFor="filter-tech" className="sr-only">Filter by technician</label>
          <select
            id="filter-tech"
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            className={cn(
              "h-8 appearance-none rounded-btn border border-border bg-muted pl-3 pr-7 font-body text-[12px] text-foreground cursor-pointer outline-none",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-colors duration-150 ease-out",
            )}
          >
            <option value="all">All technicians</option>
            {TECHNICIANS.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <Filter size={10} aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Station filter */}
        <div className="relative">
          <label htmlFor="filter-station" className="sr-only">Filter by station</label>
          <select
            id="filter-station"
            value={stationFilter}
            onChange={(e) => setStationFilter(e.target.value)}
            className={cn(
              "h-8 appearance-none rounded-btn border border-border bg-muted pl-3 pr-7 font-body text-[12px] text-foreground cursor-pointer outline-none",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-colors duration-150 ease-out",
            )}
          >
            <option value="all">All stations</option>
            {allStations.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <Filter size={10} aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-1">
          <label htmlFor="filter-date-from" className="sr-only">Scheduled from</label>
          <input
            id="filter-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className={cn(
              "h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground cursor-pointer outline-none",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-colors duration-150 ease-out",
            )}
            aria-label="Scheduled date from"
          />
          <span className="font-mono text-[10px] text-muted-foreground">to</span>
          <label htmlFor="filter-date-to" className="sr-only">Scheduled to</label>
          <input
            id="filter-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className={cn(
              "h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground cursor-pointer outline-none",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-colors duration-150 ease-out",
            )}
            aria-label="Scheduled date to"
          />
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1 h-8 px-2.5 rounded-btn border border-border bg-transparent font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Clear all filters"
          >
            <X size={11} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* ── Error banner ──────────────────────────────────────────────────── */}
      {error && (
        <div role="alert" className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5">
          <AlertTriangle size={14} aria-hidden="true" className="text-error shrink-0" />
          <span className="font-body text-[12px] text-foreground">{error}</span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Retry loading work orders"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* ── Calendar view ─────────────────────────────────────────────────── */}
      {viewMode === "calendar" && (
        <CalendarView orders={filtered} onClickOrder={handleRowClick} />
      )}

      {/* ── List view ─────────────────────────────────────────────────────── */}
      {viewMode === "list" && (
        <div className="overflow-hidden rounded-card border border-border bg-card">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
            <span
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              aria-live="polite"
            >
              {filtered.length} work order{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table aria-label="Work orders" className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <SortableHead label="WO#" columnKey="number" sort={sort} onSort={handleSort} className="min-w-[100px]" />
                  <SortableHead label="Station" columnKey="station" sort={sort} onSort={handleSort} className="min-w-[140px]" />
                  <TableHead scope="col" className="min-w-[200px]">Issue</TableHead>
                  <SortableHead label="Priority" columnKey="priority" sort={sort} onSort={handleSort} className="min-w-[80px]" />
                  <SortableHead label="Status" columnKey="status" sort={sort} onSort={handleSort} className="min-w-[120px]" />
                  <SortableHead label="Assigned" columnKey="assigned" sort={sort} onSort={handleSort} className="min-w-[120px]" />
                  <SortableHead label="Created" columnKey="createdAt" sort={sort} onSort={handleSort} className="min-w-[100px]" />
                  <SortableHead label="Scheduled" columnKey="scheduledAt" sort={sort} onSort={handleSort} className="min-w-[100px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Loading skeleton */}
                {isLoading &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={`sk-${i}`} aria-hidden="true">
                      {Array.from({ length: 8 }).map((__, j) => (
                        <TableCell key={j}>
                          <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

                {/* Empty state */}
                {!isLoading && filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-40">
                      <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                        <p className="font-body text-[13px] text-foreground">
                          {hasActiveFilters
                            ? "No work orders match. Try clearing filters."
                            : "No work orders yet. Create one to start tracking maintenance."}
                        </p>
                        {hasActiveFilters ? (
                          <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                          >
                            <X size={11} aria-hidden="true" />
                            Clear filters
                          </button>
                        ) : (
                          <Button
                            size="sm"
                            className="gap-1.5 h-8 rounded-btn font-body text-[12px]"
                            onClick={() => navigate("/maintenance/new")}
                          >
                            <Plus size={13} aria-hidden="true" />
                            Create work order
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {/* Data rows */}
                {!isLoading &&
                  filtered.map((wo) => (
                    <TableRow
                      key={wo.id}
                      onClick={() => handleRowClick(wo.id)}
                      className="cursor-pointer transition-colors duration-150 ease-out"
                    >
                      {/* WO# */}
                      <TableCell>
                        <span className="font-mono text-[11px] font-medium text-foreground">
                          {wo.number}
                        </span>
                        {wo.alertId && (
                          <div className="font-mono text-[9px] text-muted-foreground">
                            {wo.alertId}
                          </div>
                        )}
                      </TableCell>

                      {/* Station */}
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-body text-[12px] font-medium text-foreground">
                            {wo.stationName}
                          </span>
                          <span className="font-body text-[10px] text-muted-foreground">
                            {wo.stationCity}
                          </span>
                        </div>
                      </TableCell>

                      {/* Issue */}
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-body text-[12px] text-foreground line-clamp-1">
                            {wo.issueSummary}
                          </span>
                          <span className="font-body text-[10px] text-muted-foreground">
                            {ISSUE_TYPE_LABELS[wo.issueType] ?? wo.issueType}
                          </span>
                        </div>
                      </TableCell>

                      {/* Priority */}
                      <TableCell>
                        <PriorityPill priority={wo.priority} />
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusPill status={wo.status} />
                      </TableCell>

                      {/* Assigned */}
                      <TableCell>
                        {wo.assignedTech ? (
                          <span className="font-body text-[12px] text-foreground">
                            {wo.assignedTech}
                          </span>
                        ) : (
                          <span className="font-body text-[11px] text-muted-foreground">
                            Unassigned
                          </span>
                        )}
                      </TableCell>

                      {/* Created */}
                      <TableCell>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {wo.createdAt.slice(0, 10)}
                        </span>
                      </TableCell>

                      {/* Scheduled */}
                      <TableCell>
                        <span className="font-mono text-[11px] text-foreground">
                          {wo.scheduledAt.slice(0, 10)}
                        </span>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {wo.scheduledAt.slice(11)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </section>
  );
}
