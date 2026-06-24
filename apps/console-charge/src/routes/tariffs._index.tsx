/**
 * Tariffs list — /tariffs
 * Spec ref: PRODUCT.md section 4.5
 *
 * Columns: Name, Type, Time-of-use, Stations applied, Active drivers,
 *          Effective from, Status
 * Default sort: most-recently-modified first
 * Row actions: Duplicate, Activate/Deactivate, Edit
 * States: loading skeleton, error banner with retry, empty state
 */

import * as React from "react";
import { useNavigate } from "react-router";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Clock,
  Copy,
  MoreHorizontal,
  Plus,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Pencil,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from "@gridpower/ui";

import {
  ALL_TARIFFS,
  type Tariff,
  type TariffStatus,
  type TariffType,
} from "~/mocks/tariffs";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortKey =
  | "name"
  | "type"
  | "tou"
  | "stationsApplied"
  | "activeDrivers"
  | "effectiveFrom"
  | "status"
  | "modifiedAt";

type SortDir = "asc" | "desc";

interface SortState {
  key: SortKey;
  dir: SortDir;
}

// ─── Formatters ───────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Status pill ──────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<TariffStatus, { bg: string; text: string; dot: string; label: string }> = {
  active: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: "Active",
  },
  scheduled: {
    bg: "bg-info/10",
    text: "text-info",
    dot: "bg-info",
    label: "Scheduled",
  },
  expired: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Expired",
  },
};

function StatusPill({ status }: { status: TariffStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2 py-0.5 font-mono text-[11px] font-medium",
        cfg.bg,
        cfg.text,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 shrink-0 rounded-full", cfg.dot)}
        aria-hidden="true"
      />
      {cfg.label}
    </span>
  );
}

// ─── Type badge ───────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<TariffType, { label: string; bg: string; text: string }> = {
  "per-kwh": {
    label: "Per kWh",
    bg: "bg-muted",
    text: "text-foreground",
  },
  "per-min": {
    label: "Per min",
    bg: "bg-warning/10",
    text: "text-warning",
  },
  hybrid: {
    label: "Hybrid",
    bg: "bg-info/10",
    text: "text-info",
  },
};

function TypeBadge({ type }: { type: TariffType }) {
  const cfg = TYPE_CONFIG[type];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[11px] font-medium",
        cfg.bg,
        cfg.text,
      )}
    >
      {cfg.label}
    </span>
  );
}

// ─── TOU indicator ────────────────────────────────────────────────────────────

function TouIndicator({ hasTou }: { hasTou: boolean }) {
  return hasTou ? (
    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-success">
      <Clock size={11} aria-hidden="true" />
      Yes
    </span>
  ) : (
    <span className="font-mono text-[11px] text-muted-foreground">No</span>
  );
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
      className={cn("cursor-pointer select-none", className)}
      onClick={() => onSort(columnKey)}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onSort(columnKey); }}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer"
        aria-label={`Sort by ${label}${isActive ? (sort.dir === "asc" ? " (ascending)" : " (descending)") : ""}`}
      >
        {label}
        <SortIcon columnKey={columnKey} sort={sort} />
      </button>
    </TableHead>
  );
}

// ─── Sort comparison ──────────────────────────────────────────────────────────

function getVal(t: Tariff, key: SortKey): string | number {
  switch (key) {
    case "name":           return t.name;
    case "type":           return t.type;
    case "tou":            return t.pricing.touBands.length > 0 ? 1 : 0;
    case "stationsApplied": return t.stationsApplied;
    case "activeDrivers":  return t.activeDrivers;
    case "effectiveFrom":  return t.effectiveFrom;
    case "status":         return t.status;
    case "modifiedAt":     return t.modifiedAt;
    default:               return "";
  }
}

function sortTariffs(list: Tariff[], sort: SortState): Tariff[] {
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

const FILTER_KEYS = ["all", "active", "scheduled", "expired"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

// ─── Main component ──────────────────────────────────────────────────────────

export default function TariffsIndex() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [sort, setSort] = React.useState<SortState>({
    key: "modifiedAt",
    dir: "desc",
  });
  const [tariffs, setTariffs] = React.useState<Tariff[]>(ALL_TARIFFS);

  // ── Async UI states ────────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRetry = React.useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  // ── Derived list ─────────────────────────────────────────────────────────
  const filtered = React.useMemo(() => {
    let list = tariffs;
    if (filter !== "all") {
      list = list.filter((t) => t.status === filter);
    }
    return sortTariffs(list, sort);
  }, [tariffs, filter, sort]);

  const counts = React.useMemo(
    () => ({
      all: tariffs.length,
      active: tariffs.filter((t) => t.status === "active").length,
      scheduled: tariffs.filter((t) => t.status === "scheduled").length,
      expired: tariffs.filter((t) => t.status === "expired").length,
    }),
    [tariffs],
  );

  // ── Sort handler ────────────────────────────────────────────────────────────
  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }, []);

  // ── Row actions ─────────────────────────────────────────────────────────────
  const handleDuplicate = React.useCallback((tariff: Tariff) => {
    const dupe: Tariff = {
      ...tariff,
      id: `TAR-${Date.now()}`,
      name: `${tariff.name} (copy)`,
      status: "scheduled",
      stationsApplied: 0,
      activeDrivers: 0,
      modifiedAt: new Date().toISOString(),
    };
    setTariffs((prev) => [dupe, ...prev]);
  }, []);

  const handleToggleActive = React.useCallback((tariff: Tariff) => {
    setTariffs((prev) =>
      prev.map((t) =>
        t.id === tariff.id
          ? {
              ...t,
              status: t.status === "active" ? "scheduled" : "active",
              modifiedAt: new Date().toISOString(),
            }
          : t,
      ),
    );
  }, []);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="tariffs-heading">
      <h2 id="tariffs-heading" className="sr-only">
        Tariffs
      </h2>

      {/* ── Top bar: filter chips + Create ──────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        {/* Filter chips */}
        <div
          className="flex items-center gap-1.5 flex-wrap"
          role="group"
          aria-label="Filter tariffs by status"
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

        {/* Create new */}
        <Button
          size="sm"
          className="gap-1.5 h-8 rounded-btn font-body text-[12px]"
          onClick={() => navigate("/tariffs/new")}
        >
          <Plus size={13} aria-hidden="true" />
          Create new
        </Button>
      </div>

      {/* ── Error banner ───────────────────────────────────────────────────── */}
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
            aria-label="Retry loading tariffs"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-card border border-border bg-card">
        {/* Toolbar sub-row */}
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
          >
            {filtered.length} tariff{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[860px]">
            <caption className="sr-only">Tariffs list</caption>
            <TableHeader>
              <TableRow>
                <SortableHead
                  label="Name"
                  columnKey="name"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[180px]"
                />
                <SortableHead
                  label="Type"
                  columnKey="type"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Time-of-use"
                  columnKey="tou"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Stations"
                  columnKey="stationsApplied"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[80px]"
                />
                <SortableHead
                  label="Active drivers"
                  columnKey="activeDrivers"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Effective from"
                  columnKey="effectiveFrom"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[120px]"
                />
                <SortableHead
                  label="Status"
                  columnKey="status"
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
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={`skel-${i}`} aria-hidden="true">
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
                        {filter !== "all"
                          ? "No tariffs match this filter."
                          : "No tariffs yet. Create your first pricing rule to get started."}
                      </p>
                      {filter !== "all" ? (
                        <button
                          type="button"
                          onClick={() => setFilter("all")}
                          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                        >
                          Show all tariffs
                        </button>
                      ) : (
                        <Button
                          size="sm"
                          className="gap-1.5 h-8 rounded-btn font-body text-[12px]"
                          onClick={() => navigate("/tariffs/new")}
                        >
                          <Plus size={13} aria-hidden="true" />
                          Create new
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                filtered.map((tariff) => (
                  <TableRow
                    key={tariff.id}
                    className="cursor-pointer transition-colors duration-150 ease-out"
                    onClick={() => navigate(`/tariffs/${tariff.id}`)}
                  >
                    {/* Name + description */}
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[13px] font-medium text-foreground">
                          {tariff.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {tariff.id}
                        </span>
                      </div>
                    </TableCell>

                    {/* Type */}
                    <TableCell>
                      <TypeBadge type={tariff.type} />
                    </TableCell>

                    {/* Time-of-use */}
                    <TableCell>
                      <TouIndicator hasTou={tariff.pricing.touBands.length > 0} />
                    </TableCell>

                    {/* Stations applied */}
                    <TableCell>
                      <span className="font-mono text-[12px] text-foreground">
                        {tariff.stationsApplied}
                      </span>
                    </TableCell>

                    {/* Active drivers */}
                    <TableCell>
                      <span
                        className={cn(
                          "font-mono text-[12px]",
                          tariff.activeDrivers > 0 ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {tariff.activeDrivers}
                      </span>
                    </TableCell>

                    {/* Effective from */}
                    <TableCell>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {fmtDate(tariff.effectiveFrom)}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusPill status={tariff.status} />
                    </TableCell>

                    {/* Row actions */}
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted text-muted-foreground cursor-pointer transition-colors duration-150 ease-out"
                            aria-label={`Actions for ${tariff.name}`}
                          >
                            <MoreHorizontal size={14} aria-hidden="true" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/tariffs/${tariff.id}`)}
                          >
                            <Pencil size={12} aria-hidden="true" className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(tariff)}>
                            <Copy size={12} aria-hidden="true" className="mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          {tariff.status !== "expired" && (
                            <DropdownMenuItem
                              onClick={() => handleToggleActive(tariff)}
                            >
                              {tariff.status === "active" ? (
                                <>
                                  <ToggleLeft size={12} aria-hidden="true" className="mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <ToggleRight size={12} aria-hidden="true" className="mr-2" />
                                  Activate
                                </>
                              )}
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
      </div>
    </section>
  );
}
