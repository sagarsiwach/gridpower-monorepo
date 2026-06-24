/**
 * CON.3: Stations list
 * Route: /stations (index)
 *
 * Features:
 * - Filter chips: All / Online / Offline / Maintenance / Charging
 * - Search (by name / city / ID)
 * - Sortable columns (toggle asc/desc)
 * - Bulk-select with action bar (Reboot / Update firmware / Export)
 * - Inline station detail panel (opens on row click)
 * - Loading skeleton, error retry banner, and empty state
 * - Uses shadcn Table primitives from @gridpower/ui
 * - Light + dark mode via semantic tokens (data-theme system)
 */

import * as React from "react";
import { useNavigate } from "react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  X,
  Download,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  StatusBadge,
  type StatusBadgeProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from "@gridpower/ui";

import { ALL_STATIONS, type Station, type StationStatus } from "~/mocks/stations";
import { StationDetailPanel } from "~/components/StationDetailPanel";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey =
  | "id"
  | "name"
  | "city"
  | "status"
  | "ports"
  | "util"
  | "today"
  | "lastSession"
  | "uptime";
type SortDir = "asc" | "desc";

interface SortState {
  key: SortKey;
  dir: SortDir;
}

// ─── Status map for StatusBadge ───────────────────────────────────────────────

const STATUS_MAP: Record<StationStatus, StatusBadgeProps["status"]> = {
  online: "online",
  offline: "offline",
  maintenance: "maintenance",
  charging: "online", // closest semantic variant
};

const STATUS_LABEL: Record<StationStatus, string> = {
  online: "Online",
  offline: "Offline",
  maintenance: "Maintenance",
  charging: "Charging",
};

// ─── Utilisation bar ─────────────────────────────────────────────────────────

function UtilBar({ pct }: { pct: number }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-1 w-14 shrink-0 overflow-hidden rounded-pill bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Utilisation ${pct} percent`}
      >
        <div
          className="h-full rounded-pill bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({
  columnKey,
  sort,
}: {
  columnKey: SortKey;
  sort: SortState;
}) {
  if (sort.key !== columnKey)
    return (
      <ArrowUpDown
        size={11}
        className="text-muted-foreground"
        aria-hidden="true"
      />
    );
  return sort.dir === "asc" ? (
    <ArrowUp size={11} className="text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown size={11} className="text-primary" aria-hidden="true" />
  );
}

// ─── Sortable header cell ────────────────────────────────────────────────────

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
    <TableHead
      scope="col"
      aria-sort={ariaSort}
      className={cn("cursor-pointer select-none group", className)}
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
        <SortIcon columnKey={columnKey} sort={sort} />
      </button>
    </TableHead>
  );
}

// ─── Sort comparison ─────────────────────────────────────────────────────────

function getVal(s: Station, key: SortKey): string | number {
  switch (key) {
    case "id":
      return s.id;
    case "name":
      return s.name;
    case "city":
      return s.city;
    case "status":
      return s.status;
    case "ports":
      return s.ports;
    case "util":
      return s.util;
    case "today":
      return parseInt(s.today.replace(/[₹,]/g, "")) || 0;
    case "lastSession":
      return s.lastSession;
    case "uptime":
      return parseFloat(s.uptime) || 0;
    default:
      return "";
  }
}

function sortStations(list: Station[], sort: SortState): Station[] {
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

// ─── Filter chips ─────────────────────────────────────────────────────────────

const FILTER_KEYS = [
  "all",
  "online",
  "charging",
  "offline",
  "maintenance",
] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

// ─── Main component ──────────────────────────────────────────────────────────

export default function StationsIndex() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<SortState>({ key: "id", dir: "asc" });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [bulkSelected, setBulkSelected] = React.useState<Set<string>>(
    new Set(),
  );

  // ── Async UI states (mocked; wire to a loader/query when API lands) ───────
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRetry = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    // Simulated retry; replace with real fetch when API lands.
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  // ── Derived filtered + sorted list ─────────────────────────────────────────
  const filtered = React.useMemo(() => {
    let list = ALL_STATIONS;
    if (filter !== "all") {
      list = list.filter((s) => s.status === filter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q),
      );
    }
    return sortStations(list, sort);
  }, [filter, search, sort]);

  const counts = React.useMemo(
    () => ({
      all: ALL_STATIONS.length,
      online: ALL_STATIONS.filter((s) => s.status === "online").length,
      offline: ALL_STATIONS.filter((s) => s.status === "offline").length,
      maintenance: ALL_STATIONS.filter((s) => s.status === "maintenance")
        .length,
      charging: ALL_STATIONS.filter((s) => s.status === "charging").length,
    }),
    [],
  );

  // ── Detail station ──────────────────────────────────────────────────────────
  const detailStation = selectedId
    ? ALL_STATIONS.find((s) => s.id === selectedId) ?? null
    : null;

  // ── Sort handler ────────────────────────────────────────────────────────────
  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }, []);

  // ── Bulk selection ──────────────────────────────────────────────────────────
  const toggleBulk = React.useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setBulkSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },
    [],
  );

  const toggleAllBulk = React.useCallback(() => {
    setBulkSelected((prev) => {
      if (prev.size === filtered.length) return new Set();
      return new Set(filtered.map((s) => s.id));
    });
  }, [filtered]);

  const clearBulk = React.useCallback(() => setBulkSelected(new Set()), []);

  const allBulkChecked =
    filtered.length > 0 && bulkSelected.size === filtered.length;
  const someBulkChecked = bulkSelected.size > 0 && !allBulkChecked;

  // ── Filter reset (used by empty state) ──────────────────────────────────────
  const resetFilters = React.useCallback(() => {
    setFilter("all");
    setSearch("");
  }, []);

  const hasActiveFilters = filter !== "all" || search.trim().length > 0;

  // ── Row click ───────────────────────────────────────────────────────────────
  const handleRowClick = React.useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="stations-heading">
      <h2 id="stations-heading" className="sr-only">
        Stations
      </h2>

      {/* ── Top bar: filter chips + search + add ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        {/* Filter chips */}
        <div
          className="flex items-center gap-1.5 flex-wrap"
          role="group"
          aria-label="Filter stations by status"
        >
          {FILTER_KEYS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out",
                  active
                    ? "bg-muted border border-border text-foreground"
                    : "bg-transparent border border-transparent text-muted-foreground hover:bg-muted",
                )}
              >
                <span className="capitalize">{key}</span>
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {counts[key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search
              size={12}
              aria-hidden="true"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="stations-search" className="sr-only">
              Search stations
            </label>
            <input
              id="stations-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stations..."
              className={cn(
                "h-8 w-full sm:w-48 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none",
                "bg-muted border border-border",
                "text-foreground placeholder:text-muted-foreground",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
                "transition-[box-shadow,border-color] duration-150 ease-out",
              )}
            />
          </div>
          <Button
            size="sm"
            className="gap-1.5 h-8 rounded-btn font-body text-[12px]"
          >
            <Plus size={13} aria-hidden="true" />
            Add station
          </Button>
        </div>
      </div>

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
          <span className="font-body text-[12px] text-foreground">
            {error}
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            aria-label="Retry loading stations"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* ── Bulk action bar ───────────────────────────────────────────────── */}
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
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            >
              <RefreshCw size={11} aria-hidden="true" />
              Reboot
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            >
              <Settings size={11} aria-hidden="true" />
              Update firmware
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
            >
              <Download size={11} aria-hidden="true" />
              Export
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

      {/* ── Table + detail side panel ─────────────────────────────────────── */}
      <div
        className={cn(
          "grid gap-4 transition-all",
          detailStation ? "grid-cols-1 lg:grid-cols-[1fr_320px]" : "grid-cols-1",
        )}
      >
        {/* Table card */}
        <div className="overflow-hidden rounded-card border border-border bg-card">
          {/* Toolbar sub-row */}
          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
            <span
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              aria-live="polite"
            >
              {filtered.length} station{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Sort options"
                className="inline-flex items-center gap-1 rounded border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
              >
                Sort <ChevronDown size={10} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Export stations list"
                className="inline-flex items-center gap-1 rounded border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
              >
                <Download size={11} aria-hidden="true" /> Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
          <Table className="min-w-[760px]">
            <TableHeader>
              <TableRow>
                {/* Select all checkbox */}
                <TableHead scope="col" className="w-10 pr-0">
                  <CheckboxCell
                    checked={allBulkChecked}
                    indeterminate={someBulkChecked}
                    onChange={toggleAllBulk}
                    ariaLabel={
                      allBulkChecked
                        ? "Deselect all stations"
                        : "Select all stations"
                    }
                  />
                </TableHead>
                <SortableHead
                  label="ID"
                  columnKey="id"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <SortableHead
                  label="Station"
                  columnKey="name"
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableHead
                  label="Status"
                  columnKey="status"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <SortableHead
                  label="Ports"
                  columnKey="ports"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[64px]"
                />
                <SortableHead
                  label="Utilisation"
                  columnKey="util"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[112px]"
                />
                <SortableHead
                  label="Today"
                  columnKey="today"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[88px]"
                />
                <SortableHead
                  label="Last session"
                  columnKey="lastSession"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[96px]"
                />
                {/* Actions column */}
                <TableHead scope="col" className="w-10">
                  <span className="sr-only">Row actions</span>
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
                    <TableCell>
                      <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="h-3 w-32 rounded bg-muted animate-pulse" />
                        <div className="h-2.5 w-20 rounded bg-muted animate-pulse" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-16 rounded-pill bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-6 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-12 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-14 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-5 rounded bg-muted animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))}

              {/* Empty state */}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-40">
                    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center">
                      <p className="font-body text-[13px] text-foreground">
                        {hasActiveFilters
                          ? "No stations match. Clear filters?"
                          : "No stations yet. Add your first station to begin."}
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
                        >
                          <Plus size={13} aria-hidden="true" />
                          Add station
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                filtered.map((station) => {
                  const isDetailOpen = selectedId === station.id;
                  const isBulk = bulkSelected.has(station.id);
                  return (
                    <TableRow
                      key={station.id}
                      onClick={() => handleRowClick(station.id)}
                      className={cn(
                        "cursor-pointer transition-colors duration-150 ease-out",
                        isDetailOpen &&
                          "bg-muted hover:bg-muted",
                        isBulk &&
                          !isDetailOpen &&
                          "bg-primary/5 hover:bg-primary/10",
                      )}
                      data-state={isDetailOpen ? "selected" : undefined}
                      aria-selected={isDetailOpen}
                    >
                      {/* Checkbox */}
                      <TableCell
                        className="pr-0"
                        onClick={(e) => toggleBulk(station.id, e)}
                      >
                        <CheckboxCell
                          checked={isBulk}
                          onChange={() => {}}
                          ariaLabel={`Select ${station.name}`}
                        />
                      </TableCell>

                      {/* ID */}
                      <TableCell>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {station.id}
                        </span>
                      </TableCell>

                      {/* Station name + city */}
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-body text-[13px] font-medium text-foreground">
                            {station.name}
                          </span>
                          <span className="font-body text-[11px] text-muted-foreground">
                            {station.city}
                          </span>
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <StatusBadge
                          status={STATUS_MAP[station.status]}
                          label={STATUS_LABEL[station.status]}
                        />
                      </TableCell>

                      {/* Ports */}
                      <TableCell>
                        <span className="font-mono text-[12px] text-foreground">
                          {station.ports}
                        </span>
                      </TableCell>

                      {/* Utilisation bar */}
                      <TableCell>
                        <UtilBar pct={station.util} />
                      </TableCell>

                      {/* Today's revenue */}
                      <TableCell>
                        <span
                          className={cn(
                            "font-mono text-[12px] font-medium",
                            station.today === "₹0"
                              ? "text-muted-foreground"
                              : "text-primary",
                          )}
                        >
                          {station.today}
                        </span>
                      </TableCell>

                      {/* Last session */}
                      <TableCell>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {station.lastSession}
                        </span>
                      </TableCell>

                      {/* Row actions */}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted text-muted-foreground cursor-pointer transition-colors duration-150 ease-out"
                              aria-label={`Actions for ${station.name}`}
                            >
                              <MoreHorizontal size={14} aria-hidden="true" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/stations/${station.id}`)
                              }
                            >
                              View detail
                            </DropdownMenuItem>
                            <DropdownMenuItem>Reboot station</DropdownMenuItem>
                            <DropdownMenuItem>Update firmware</DropdownMenuItem>
                            <DropdownMenuItem>Export logs</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          </div>

          {/* Pagination footer */}
          <nav
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border bg-card px-4 py-2.5"
            aria-label="Pagination"
          >
            <span className="font-mono text-[11px] text-muted-foreground">
              Showing 1 to {filtered.length} of 127 stations
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, "...", 9].map((p, i) => {
                const isCurrent = p === 1;
                const isEllipsis = p === "...";
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isEllipsis}
                    aria-label={
                      isEllipsis ? "More pages" : `Go to page ${p}`
                    }
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded font-mono text-[11px] transition-colors",
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-muted-foreground hover:bg-muted cursor-pointer",
                      isEllipsis && "border-transparent cursor-default",
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Detail panel */}
        {detailStation && (
          <StationDetailPanel
            station={detailStation}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </section>
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
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
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
