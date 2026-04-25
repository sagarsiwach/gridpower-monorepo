/**
 * Alert Center — /alerts
 *
 * Full list of all alerts with filters, bulk actions, and row navigation.
 * Spec section 4.7.
 */

import * as React from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Bell,
  Check,
  ChevronDown,
  Clock,
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
  ALERTS,
  ALERT_STATIONS,
  type AlertSeverity,
  type AlertStatus,
  type AlertSource,
  type AlertWithStatus,
} from "~/mocks/alerts";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "severity" | "station" | "message" | "created_at" | "status";
type SortDir = "asc" | "desc";

type AgeBucket = "all" | "last-hour" | "last-4h" | "today" | "this-week";

interface FilterState {
  severity: AlertSeverity | "all";
  status: AlertStatus | "all";
  station: string;
  age: AgeBucket;
  source: AlertSource | "all";
}

// ─── Severity helpers ─────────────────────────────────────────────────────────

function severityDotClass(s: AlertSeverity): string {
  switch (s) {
    case "critical":
      return "bg-error";
    case "warning":
      return "bg-warning";
    case "info":
      return "bg-info";
  }
}

function severityTextClass(s: AlertSeverity): string {
  switch (s) {
    case "critical":
      return "text-error";
    case "warning":
      return "text-warning";
    case "info":
      return "text-info";
  }
}

function severityBgClass(s: AlertSeverity): string {
  switch (s) {
    case "critical":
      return "bg-error/10";
    case "warning":
      return "bg-warning/10";
    case "info":
      return "bg-info/10";
  }
}

const SEVERITY_LABEL: Record<AlertSeverity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

const SEVERITY_ORDER: Record<AlertSeverity, number> = {
  critical: 0,
  warning: 1,
  info: 2,
};

// ─── Status helpers ───────────────────────────────────────────────────────────

function statusPillClass(s: AlertStatus): string {
  switch (s) {
    case "open":
      return "bg-error/10 text-error";
    case "acked":
      return "bg-warning/10 text-warning";
    case "resolved":
      return "bg-success/10 text-success";
    case "snoozed":
      return "bg-muted text-muted-foreground";
  }
}

const STATUS_LABEL: Record<AlertStatus, string> = {
  open: "Open",
  acked: "Ack'd",
  resolved: "Resolved",
  snoozed: "Snoozed",
};

// ─── Time helpers ─────────────────────────────────────────────────────────────

const NOW = new Date("2026-04-25T09:00:00Z");

function relativeTime(iso: string): string {
  const diff = Math.floor((NOW.getTime() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function absoluteTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function matchesAgeBucket(iso: string, bucket: AgeBucket): boolean {
  if (bucket === "all") return true;
  const diffMs = NOW.getTime() - new Date(iso).getTime();
  if (bucket === "last-hour") return diffMs <= 3_600_000;
  if (bucket === "last-4h") return diffMs <= 14_400_000;
  if (bucket === "today") return diffMs <= 86_400_000;
  if (bucket === "this-week") return diffMs <= 7 * 86_400_000;
  return true;
}

// ─── Sort logic ───────────────────────────────────────────────────────────────

function sortAlerts(
  list: AlertWithStatus[],
  key: SortKey,
  dir: SortDir,
): AlertWithStatus[] {
  return [...list].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "severity":
        cmp = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
        break;
      case "station":
        cmp = a.station_name.localeCompare(b.station_name);
        break;
      case "message":
        cmp = a.message.localeCompare(b.message);
        break;
      case "created_at":
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case "status": {
        const sOrder: Record<AlertStatus, number> = {
          open: 0,
          acked: 1,
          snoozed: 2,
          resolved: 3,
        };
        cmp = sOrder[a.status] - sOrder[b.status];
        break;
      }
    }
    return dir === "asc" ? cmp : -cmp;
  });
}

// ─── Snooze duration options ──────────────────────────────────────────────────

const SNOOZE_OPTIONS = [
  { label: "1 hour", value: "1h" },
  { label: "4 hours", value: "4h" },
  { label: "Until tomorrow", value: "tomorrow" },
] as const;

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({
  active,
  dir,
}: {
  active: boolean;
  dir: SortDir;
}) {
  if (!active)
    return (
      <ArrowUpDown size={10} className="text-muted-foreground" aria-hidden />
    );
  return dir === "asc" ? (
    <ArrowUp size={10} className="text-primary" aria-hidden />
  ) : (
    <ArrowDown size={10} className="text-primary" aria-hidden />
  );
}

// ─── Sortable header cell ─────────────────────────────────────────────────────

function SortableHead({
  label,
  columnKey,
  sort,
  onSort,
  className,
}: {
  label: string;
  columnKey: SortKey;
  sort: { key: SortKey; dir: SortDir };
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const active = sort.key === columnKey;
  const ariaSort: React.AriaAttributes["aria-sort"] = active
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : "none";

  return (
    <TableHead
      scope="col"
      aria-sort={ariaSort}
      className={cn("select-none", className)}
    >
      <button
        type="button"
        onClick={() => onSort(columnKey)}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer transition-colors duration-150 ease-out hover:text-foreground"
        aria-label={`Sort by ${label}${active ? (sort.dir === "asc" ? " (ascending)" : " (descending)") : ""}`}
      >
        {label}
        <SortIcon active={active} dir={sort.dir} />
      </button>
    </TableHead>
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

// ─── Filter row ───────────────────────────────────────────────────────────────

function FilterRow({
  filters,
  onChange,
  onReset,
  hasActive,
}: {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
  hasActive: boolean;
}) {
  const [stationOpen, setStationOpen] = React.useState(false);
  const stationRef = React.useRef<HTMLDivElement>(null);

  // Close station dropdown on outside click
  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (stationRef.current && !stationRef.current.contains(e.target as Node)) {
        setStationOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectClass =
    "h-7 rounded-btn border border-border bg-muted px-2.5 font-body text-[12px] text-foreground appearance-none cursor-pointer focus:border-primary focus:outline-none transition-colors duration-150 ease-out";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Severity */}
      <div className="relative">
        <label htmlFor="filter-severity" className="sr-only">
          Filter by severity
        </label>
        <select
          id="filter-severity"
          value={filters.severity}
          onChange={(e) =>
            onChange({ severity: e.target.value as FilterState["severity"] })
          }
          className={selectClass}
        >
          <option value="all">All severities</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Status */}
      <div className="relative">
        <label htmlFor="filter-status" className="sr-only">
          Filter by status
        </label>
        <select
          id="filter-status"
          value={filters.status}
          onChange={(e) =>
            onChange({ status: e.target.value as FilterState["status"] })
          }
          className={selectClass}
        >
          <option value="all">All statuses</option>
          <option value="open">Open</option>
          <option value="acked">Ack'd</option>
          <option value="resolved">Resolved</option>
          <option value="snoozed">Snoozed</option>
        </select>
      </div>

      {/* Age bucket */}
      <div className="relative">
        <label htmlFor="filter-age" className="sr-only">
          Filter by age
        </label>
        <select
          id="filter-age"
          value={filters.age}
          onChange={(e) =>
            onChange({ age: e.target.value as AgeBucket })
          }
          className={selectClass}
        >
          <option value="all">Any time</option>
          <option value="last-hour">Last hour</option>
          <option value="last-4h">Last 4 hours</option>
          <option value="today">Today</option>
          <option value="this-week">This week</option>
        </select>
      </div>

      {/* Source */}
      <div className="relative">
        <label htmlFor="filter-source" className="sr-only">
          Filter by source
        </label>
        <select
          id="filter-source"
          value={filters.source}
          onChange={(e) =>
            onChange({ source: e.target.value as FilterState["source"] })
          }
          className={selectClass}
        >
          <option value="all">All sources</option>
          <option value="system">System</option>
          <option value="integration">Integration</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Station autocomplete */}
      <div className="relative" ref={stationRef}>
        <label htmlFor="filter-station" className="sr-only">
          Filter by station
        </label>
        <div className="relative">
          <Search
            size={11}
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="filter-station"
            type="text"
            value={filters.station}
            onChange={(e) => {
              onChange({ station: e.target.value });
              setStationOpen(true);
            }}
            onFocus={() => setStationOpen(true)}
            placeholder="Station..."
            autoComplete="off"
            className={cn(
              "h-7 w-40 rounded-btn border border-border bg-muted pl-7 pr-2.5 font-body text-[12px] text-foreground placeholder:text-muted-foreground",
              "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20",
              "transition-[box-shadow,border-color] duration-150 ease-out",
            )}
          />
        </div>
        {stationOpen && filters.station.trim().length > 0 && (
          <ul
            role="listbox"
            aria-label="Station suggestions"
            className="absolute left-0 top-full z-10 mt-1 max-h-48 w-56 overflow-y-auto rounded-card border border-border bg-card shadow-md"
          >
            {ALERT_STATIONS.filter((s) =>
              s.toLowerCase().includes(filters.station.toLowerCase()),
            ).map((s) => (
              <li key={s} role="option" aria-selected={filters.station === s}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange({ station: s });
                    setStationOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-100"
                >
                  {s}
                </button>
              </li>
            ))}
            {ALERT_STATIONS.filter((s) =>
              s.toLowerCase().includes(filters.station.toLowerCase()),
            ).length === 0 && (
              <li className="px-3 py-2 font-body text-[12px] text-muted-foreground">
                No stations match
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Clear filters */}
      {hasActive && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 rounded-btn border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors duration-150 ease-out"
          aria-label="Clear all filters"
        >
          <X size={10} aria-hidden />
          Clear
        </button>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AlertsIndex() {
  const navigate = useNavigate();

  const [filters, setFilters] = React.useState<FilterState>({
    severity: "all",
    status: "all",
    station: "",
    age: "all",
    source: "all",
  });

  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDir }>({
    key: "created_at",
    dir: "desc",
  });

  const [bulkSelected, setBulkSelected] = React.useState<Set<string>>(new Set());
  const [snoozeOpen, setSnoozeOpen] = React.useState(false);
  const [snoozeRef, setSnoozeRef] = React.useState<HTMLDivElement | null>(null);

  // ── Mocked UI states ────────────────────────────────────────────────────────
  const [isLoading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  // ── New-since-visit indicator (decorative) ──────────────────────────────────
  const newSinceVisit = React.useMemo(() => {
    return ALERTS.filter(
      (a) =>
        a.status === "open" &&
        NOW.getTime() - new Date(a.created_at).getTime() < 15 * 60_000,
    ).length;
  }, []);

  // ── Filter + sort ────────────────────────────────────────────────────────────
  const filtered = React.useMemo(() => {
    let list = ALERTS as AlertWithStatus[];
    if (filters.severity !== "all") {
      list = list.filter((a) => a.severity === filters.severity);
    }
    if (filters.status !== "all") {
      list = list.filter((a) => a.status === filters.status);
    }
    if (filters.station.trim()) {
      const q = filters.station.trim().toLowerCase();
      list = list.filter((a) => a.station_name.toLowerCase().includes(q));
    }
    if (filters.age !== "all") {
      list = list.filter((a) => matchesAgeBucket(a.created_at, filters.age));
    }
    if (filters.source !== "all") {
      list = list.filter((a) => a.source === filters.source);
    }
    return sortAlerts(list, sort.key, sort.dir);
  }, [filters, sort]);

  const hasActiveFilters =
    filters.severity !== "all" ||
    filters.status !== "all" ||
    filters.station.trim() !== "" ||
    filters.age !== "all" ||
    filters.source !== "all";

  // ── Bulk helpers ─────────────────────────────────────────────────────────────
  const allChecked =
    filtered.length > 0 && bulkSelected.size === filtered.length;
  const someChecked = bulkSelected.size > 0 && !allChecked;

  const toggleOne = React.useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBulkSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = React.useCallback(() => {
    setBulkSelected((prev) =>
      prev.size === filtered.length
        ? new Set()
        : new Set(filtered.map((a) => a.id)),
    );
  }, [filtered]);

  const clearBulk = React.useCallback(() => setBulkSelected(new Set()), []);

  // ── Sort handler ─────────────────────────────────────────────────────────────
  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }, []);

  // ── Snooze dropdown close on outside click ───────────────────────────────────
  React.useEffect(() => {
    if (!snoozeOpen) return;
    function handler(e: MouseEvent) {
      if (snoozeRef && !snoozeRef.contains(e.target as Node)) {
        setSnoozeOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [snoozeOpen, snoozeRef]);

  // ── Bulk action stubs ─────────────────────────────────────────────────────────
  const handleBulkAck = React.useCallback(() => {
    console.log("[alerts] bulk ack:", [...bulkSelected]);
    clearBulk();
  }, [bulkSelected, clearBulk]);

  const handleBulkSnooze = React.useCallback(
    (duration: string) => {
      console.log("[alerts] bulk snooze:", duration, [...bulkSelected]);
      setSnoozeOpen(false);
      clearBulk();
    },
    [bulkSelected, clearBulk],
  );

  const handleBulkReassign = React.useCallback(() => {
    console.log("[alerts] bulk reassign:", [...bulkSelected]);
    clearBulk();
  }, [bulkSelected, clearBulk]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="alerts-page-heading">
      {/* ── Page heading ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2
          id="alerts-page-heading"
          className="font-body text-h4 font-semibold text-foreground"
        >
          Alert center
        </h2>

        {/* New-since-visit indicator (decorative, no real-time) */}
        {newSinceVisit > 0 && (
          <div
            className="flex items-center gap-1.5 rounded-pill bg-error/10 px-3 py-1"
            role="status"
            aria-live="polite"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-error animate-pulse"
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] text-error">
              {newSinceVisit} new since last visit
            </span>
          </div>
        )}
      </div>

      {/* ── Filters ──────────────────────────────────────────────────────────── */}
      <FilterRow
        filters={filters}
        onChange={(patch) => setFilters((prev) => ({ ...prev, ...patch }))}
        onReset={() =>
          setFilters({
            severity: "all",
            status: "all",
            station: "",
            age: "all",
            source: "all",
          })
        }
        hasActive={hasActiveFilters}
      />

      {/* ── Error banner ──────────────────────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle size={14} className="shrink-0 text-error" aria-hidden />
          <span className="font-body text-[12px] text-foreground">{error}</span>
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            <RefreshCw size={11} aria-hidden />
            Retry
          </button>
        </div>
      )}

      {/* ── Bulk action bar ───────────────────────────────────────────────────── */}
      {bulkSelected.size > 0 && (
        <div
          className="flex flex-wrap items-center gap-3 rounded-card border border-border bg-muted px-4 py-2.5"
          role="region"
          aria-label="Bulk actions"
        >
          <span className="font-mono text-[12px] text-foreground">
            {bulkSelected.size} selected
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {/* Ack */}
            <button
              type="button"
              onClick={handleBulkAck}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            >
              <Check size={11} aria-hidden />
              Acknowledge
            </button>

            {/* Snooze dropdown */}
            <div
              className="relative"
              ref={setSnoozeRef}
            >
              <button
                type="button"
                onClick={() => setSnoozeOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={snoozeOpen}
                className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
              >
                <Clock size={11} aria-hidden />
                Snooze
                <ChevronDown size={10} aria-hidden />
              </button>
              {snoozeOpen && (
                <ul
                  role="listbox"
                  aria-label="Snooze duration"
                  className="absolute left-0 top-full z-10 mt-1 w-44 rounded-card border border-border bg-card shadow-md"
                >
                  {SNOOZE_OPTIONS.map((opt) => (
                    <li key={opt.value} role="option">
                      <button
                        type="button"
                        onClick={() => handleBulkSnooze(opt.value)}
                        className="w-full px-3 py-2 text-left font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-100 cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Reassign */}
            <button
              type="button"
              onClick={handleBulkReassign}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            >
              Reassign
            </button>

            {/* Clear */}
            <button
              type="button"
              onClick={clearBulk}
              className="ml-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150 ease-out"
              aria-label="Clear selection"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* ── Table card ────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-card border border-border bg-card">
        {/* Sub-toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            {filtered.length} alert{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[820px]" aria-label="Alerts">
            <caption className="sr-only">
              Alert center — {filtered.length} alert{filtered.length !== 1 ? "s" : ""}
            </caption>
            <TableHeader>
              <TableRow>
                {/* Select all */}
                <TableHead scope="col" className="w-10 pr-0">
                  <CheckboxCell
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={toggleAll}
                    ariaLabel={allChecked ? "Deselect all" : "Select all"}
                  />
                </TableHead>

                <SortableHead
                  label="Severity"
                  columnKey="severity"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Station"
                  columnKey="station"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[140px]"
                />
                <SortableHead
                  label="Message"
                  columnKey="message"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[240px]"
                />
                <SortableHead
                  label="Created"
                  columnKey="created_at"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <TableHead scope="col" className="min-w-[96px]">
                  Ack'd by
                </TableHead>
                <TableHead scope="col" className="min-w-[96px]">
                  Resolved at
                </TableHead>
                <SortableHead
                  label="Status"
                  columnKey="status"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[88px]"
                />
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={`sk-${i}`} aria-hidden>
                    {Array.from({ length: 8 }).map((__, j) => (
                      <TableCell key={j}>
                        <div className="h-3 w-full max-w-[120px] animate-pulse rounded bg-muted" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {/* Filtered empty */}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-44">
                    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
                      {hasActiveFilters ? (
                        <>
                          <Bell
                            size={28}
                            className="text-muted-foreground"
                            aria-hidden
                          />
                          <p className="font-body text-[13px] text-foreground">
                            No alerts match.
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setFilters({
                                severity: "all",
                                status: "all",
                                station: "",
                                age: "all",
                                source: "all",
                              })
                            }
                            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                          >
                            <X size={11} aria-hidden />
                            Clear filters
                          </button>
                        </>
                      ) : (
                        <>
                          <Check
                            size={28}
                            className="text-success"
                            aria-hidden
                          />
                          <p className="font-body text-[13px] text-foreground">
                            All clear — no open alerts
                          </p>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                filtered.map((alert) => {
                  const isBulk = bulkSelected.has(alert.id);
                  return (
                    <TableRow
                      key={alert.id}
                      onClick={() => navigate(`/alerts/${alert.id}`)}
                      className={cn(
                        "cursor-pointer transition-colors duration-150 ease-out",
                        isBulk && "bg-primary/5 hover:bg-primary/10",
                      )}
                    >
                      {/* Checkbox */}
                      <TableCell
                        className="pr-0"
                        onClick={(e) => toggleOne(alert.id, e)}
                      >
                        <CheckboxCell
                          checked={isBulk}
                          onChange={() => {}}
                          ariaLabel={`Select alert: ${alert.message}`}
                        />
                      </TableCell>

                      {/* Severity */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
                            severityBgClass(alert.severity),
                            severityTextClass(alert.severity),
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              severityDotClass(alert.severity),
                            )}
                            aria-hidden="true"
                          />
                          {SEVERITY_LABEL[alert.severity]}
                        </span>
                      </TableCell>

                      {/* Station */}
                      <TableCell>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/stations/${alert.station_id}`);
                          }}
                          className="font-body text-[12px] text-primary hover:underline cursor-pointer bg-transparent border-none transition-colors duration-150 ease-out"
                          aria-label={`View station ${alert.station_name}`}
                        >
                          {alert.station_name}
                        </button>
                        {alert.port_id && (
                          <span className="block font-mono text-[10px] text-muted-foreground">
                            {alert.port_id}
                          </span>
                        )}
                      </TableCell>

                      {/* Message */}
                      <TableCell>
                        <span className="font-body text-[13px] text-foreground line-clamp-2">
                          {alert.message}
                        </span>
                      </TableCell>

                      {/* Created — relative + absolute on hover */}
                      <TableCell>
                        <span
                          className="font-mono text-[11px] text-muted-foreground whitespace-nowrap cursor-default"
                          title={absoluteTime(alert.created_at)}
                          aria-label={`Created ${absoluteTime(alert.created_at)}`}
                        >
                          {relativeTime(alert.created_at)}
                        </span>
                      </TableCell>

                      {/* Ack'd by */}
                      <TableCell>
                        {alert.acked_by ? (
                          <div className="flex flex-col gap-0.5">
                            <span className="font-body text-[12px] text-foreground">
                              {alert.acked_by}
                            </span>
                            {alert.acked_at && (
                              <span
                                className="font-mono text-[10px] text-muted-foreground cursor-default"
                                title={absoluteTime(alert.acked_at)}
                              >
                                {relativeTime(alert.acked_at)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>

                      {/* Resolved at */}
                      <TableCell>
                        {alert.resolved_at ? (
                          <span
                            className="font-mono text-[11px] text-muted-foreground whitespace-nowrap cursor-default"
                            title={absoluteTime(alert.resolved_at)}
                          >
                            {relativeTime(alert.resolved_at)}
                          </span>
                        ) : alert.snoozed_until ? (
                          <span
                            className="font-mono text-[11px] text-muted-foreground whitespace-nowrap cursor-default"
                            title={`Snoozed until ${absoluteTime(alert.snoozed_until)}`}
                          >
                            Snoozed
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>

                      {/* Status pill */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
                            statusPillClass(alert.status),
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              alert.status === "open" && "bg-error",
                              alert.status === "acked" && "bg-warning",
                              alert.status === "resolved" && "bg-success",
                              alert.status === "snoozed" && "bg-muted-foreground",
                            )}
                            aria-hidden="true"
                          />
                          {STATUS_LABEL[alert.status]}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
