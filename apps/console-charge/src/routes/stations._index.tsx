/**
 * CON.3 — Stations list
 * Route: /stations (index)
 *
 * Features:
 * - Filter chips: All / Online / Offline / Maintenance / Charging
 * - Search (by name / city / ID)
 * - Sortable columns (toggle asc/desc)
 * - Bulk-select with action bar (Reboot / Update firmware / Export)
 * - Inline station detail panel (opens on row click)
 * - Uses shadcn Table primitives from @gridpower/ui
 * - Light + dark mode via data-theme token system
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

type SortKey = "id" | "name" | "city" | "status" | "ports" | "util" | "today" | "lastSession" | "uptime";
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
      <div className="h-1 w-14 shrink-0 overflow-hidden rounded-pill bg-sand-3 dark:bg-dark-4">
        <div
          className="h-full rounded-pill bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-sand-11 dark:text-dark-11">
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
    return <ArrowUpDown size={11} className="text-sand-8 dark:text-dark-8" />;
  return sort.dir === "asc" ? (
    <ArrowUp size={11} className="text-primary" />
  ) : (
    <ArrowDown size={11} className="text-primary" />
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
  return (
    <TableHead
      className={cn("cursor-pointer select-none group", className)}
      onClick={() => onSort(columnKey)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <SortIcon columnKey={columnKey} sort={sort} />
      </span>
    </TableHead>
  );
}

// ─── Sort comparison ─────────────────────────────────────────────────────────

function getVal(s: Station, key: SortKey): string | number {
  switch (key) {
    case "id": return s.id;
    case "name": return s.name;
    case "city": return s.city;
    case "status": return s.status;
    case "ports": return s.ports;
    case "util": return s.util;
    case "today": return parseInt(s.today.replace(/[₹,]/g, "")) || 0;
    case "lastSession": return s.lastSession;
    case "uptime": return parseFloat(s.uptime) || 0;
    default: return "";
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

const FILTER_KEYS = ["all", "online", "charging", "offline", "maintenance"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

// ─── Main component ──────────────────────────────────────────────────────────

export default function StationsIndex() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<SortState>({ key: "id", dir: "asc" });
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [bulkSelected, setBulkSelected] = React.useState<Set<string>>(new Set());

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
      maintenance: ALL_STATIONS.filter((s) => s.status === "maintenance").length,
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
  const toggleBulk = React.useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBulkSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

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

  // ── Row click ───────────────────────────────────────────────────────────────
  const handleRowClick = React.useCallback(
    (id: string) => {
      setSelectedId((prev) => (prev === id ? null : id));
    },
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* ── Top bar: filter chips + search + add ─────────────────────────── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTER_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors",
                filter === key
                  ? "bg-sand-3 dark:bg-dark-4 border border-sand-6 dark:border-dark-6 text-sand-12 dark:text-dark-12"
                  : "bg-transparent border border-transparent text-sand-9 dark:text-dark-9 hover:bg-sand-2 dark:hover:bg-dark-3",
              )}
            >
              <span className="capitalize">{key}</span>
              <span className={cn(
                "font-mono text-[10px]",
                filter === key ? "text-primary" : "text-sand-8 dark:text-dark-8",
              )}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sand-9 dark:text-dark-9"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stations…"
              className={cn(
                "h-8 w-48 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none",
                "bg-sand-3 dark:bg-dark-3 border border-sand-6 dark:border-dark-6",
                "text-sand-12 dark:text-dark-12 placeholder:text-sand-8 dark:placeholder:text-dark-8",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
              )}
            />
          </div>
          <Button
            size="sm"
            className="gap-1.5 h-8 rounded-btn font-body text-[12px]"
          >
            <Plus size={13} />
            Add station
          </Button>
        </div>
      </div>

      {/* ── Bulk action bar ───────────────────────────────────────────────── */}
      {bulkSelected.size > 0 && (
        <div className="flex items-center gap-3 rounded-card border border-sand-6 dark:border-dark-6 bg-sand-3 dark:bg-dark-3 px-4 py-2.5">
          <span className="font-mono text-[12px] text-sand-12 dark:text-dark-12">
            {bulkSelected.size} selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-btn border border-sand-6 dark:border-dark-6 bg-transparent px-3 py-1.5 font-body text-[11px] text-sand-11 dark:text-dark-11 hover:bg-sand-4 dark:hover:bg-dark-4 cursor-pointer transition-colors"
            >
              <RefreshCw size={11} />
              Reboot
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-btn border border-sand-6 dark:border-dark-6 bg-transparent px-3 py-1.5 font-body text-[11px] text-sand-11 dark:text-dark-11 hover:bg-sand-4 dark:hover:bg-dark-4 cursor-pointer transition-colors"
            >
              <Settings size={11} />
              Update firmware
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-btn border border-sand-6 dark:border-dark-6 bg-transparent px-3 py-1.5 font-body text-[11px] text-sand-11 dark:text-dark-11 hover:bg-sand-4 dark:hover:bg-dark-4 cursor-pointer transition-colors"
            >
              <Download size={11} />
              Export
            </button>
            <button
              type="button"
              onClick={clearBulk}
              className="ml-1 text-sand-9 dark:text-dark-9 hover:text-sand-12 dark:hover:text-dark-12 cursor-pointer transition-colors"
              aria-label="Clear selection"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Table + detail side panel ─────────────────────────────────────── */}
      <div
        className={cn(
          "grid gap-4 transition-all",
          detailStation ? "grid-cols-[1fr_320px]" : "grid-cols-1",
        )}
      >
        {/* Table card */}
        <div className="overflow-hidden rounded-card border border-sand-6 dark:border-dark-6 bg-sand-1 dark:bg-dark-2">
          {/* Toolbar sub-row */}
          <div className="flex items-center justify-between border-b border-sand-6 dark:border-dark-6 bg-sand-2 dark:bg-dark-3 px-4 py-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-sand-9 dark:text-dark-9">
              {filtered.length} station{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded border border-sand-6 dark:border-dark-6 bg-transparent px-2.5 py-1 font-body text-[11px] text-sand-9 dark:text-dark-9 hover:bg-sand-3 dark:hover:bg-dark-4 cursor-pointer transition-colors"
              >
                Sort <ChevronDown size={10} />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded border border-sand-6 dark:border-dark-6 bg-transparent px-2.5 py-1 font-body text-[11px] text-sand-9 dark:text-dark-9 hover:bg-sand-3 dark:hover:bg-dark-4 cursor-pointer transition-colors"
              >
                <Download size={11} /> Export
              </button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {/* Select all checkbox */}
                <TableHead className="w-10 pr-0">
                  <CheckboxCell
                    checked={allBulkChecked}
                    indeterminate={someBulkChecked}
                    onChange={toggleAllBulk}
                  />
                </TableHead>
                <SortableHead label="ID" columnKey="id" sort={sort} onSort={handleSort} className="w-[130px]" />
                <SortableHead label="Station" columnKey="name" sort={sort} onSort={handleSort} />
                <SortableHead label="Status" columnKey="status" sort={sort} onSort={handleSort} className="w-[130px]" />
                <SortableHead label="Ports" columnKey="ports" sort={sort} onSort={handleSort} className="w-[70px]" />
                <SortableHead label="Utilisation" columnKey="util" sort={sort} onSort={handleSort} className="w-[120px]" />
                <SortableHead label="Today" columnKey="today" sort={sort} onSort={handleSort} className="w-[100px]" />
                <SortableHead label="Last session" columnKey="lastSession" sort={sort} onSort={handleSort} className="w-[100px]" />
                {/* Actions column */}
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="h-24 text-center font-body text-body-sm text-sand-9 dark:text-dark-9"
                  >
                    No stations match your search.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((station) => {
                const isDetailOpen = selectedId === station.id;
                const isBulk = bulkSelected.has(station.id);
                return (
                  <TableRow
                    key={station.id}
                    onClick={() => handleRowClick(station.id)}
                    className={cn(
                      "cursor-pointer transition-colors",
                      isDetailOpen && "bg-sand-3 dark:bg-dark-4 hover:bg-sand-3 dark:hover:bg-dark-4",
                      isBulk && !isDetailOpen && "bg-grid-red/5 hover:bg-grid-red/8",
                    )}
                    data-state={isDetailOpen ? "selected" : undefined}
                  >
                    {/* Checkbox */}
                    <TableCell className="pr-0" onClick={(e) => toggleBulk(station.id, e)}>
                      <CheckboxCell
                        checked={isBulk}
                        onChange={() => {}}
                      />
                    </TableCell>

                    {/* ID */}
                    <TableCell>
                      <span className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
                        {station.id}
                      </span>
                    </TableCell>

                    {/* Station name + city */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[13px] font-medium text-sand-12 dark:text-dark-12">
                          {station.name}
                        </span>
                        <span className="font-body text-[11px] text-sand-9 dark:text-dark-9">
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
                      <span className="font-mono text-[12px] text-sand-12 dark:text-dark-12">
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
                            ? "text-sand-9 dark:text-dark-9"
                            : "text-primary",
                        )}
                      >
                        {station.today}
                      </span>
                    </TableCell>

                    {/* Last session */}
                    <TableCell>
                      <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
                        {station.lastSession}
                      </span>
                    </TableCell>

                    {/* Row actions */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-sand-3 dark:hover:bg-dark-4 text-sand-9 dark:text-dark-9 cursor-pointer transition-colors"
                            aria-label={`Actions for ${station.name}`}
                          >
                            <MoreHorizontal size={14} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/stations/${station.id}`)}>
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

          {/* Pagination footer */}
          <div className="flex items-center justify-between border-t border-sand-6 dark:border-dark-6 bg-sand-1 dark:bg-dark-2 px-4 py-2.5">
            <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
              Showing 1–{filtered.length} of 127 stations
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, "…", 9].map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded font-mono text-[11px] cursor-pointer transition-colors",
                    p === 1
                      ? "bg-primary text-white"
                      : "border border-sand-6 dark:border-dark-6 text-sand-9 dark:text-dark-9 hover:bg-sand-3 dark:hover:bg-dark-4",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {detailStation && (
          <StationDetailPanel
            station={detailStation}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Checkbox cell ────────────────────────────────────────────────────────────

function CheckboxCell({
  checked,
  indeterminate,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
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
      className="h-3.5 w-3.5 cursor-pointer rounded-[3px] border border-sand-6 dark:border-dark-6 bg-transparent accent-primary"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
