import * as React from "react";
import {
  MapPin,
  MoreHorizontal,
  Plus,
  Zap,
  Truck,
  AlertCircle,
} from "lucide-react";
import { StatCard, EmptyState } from "@gridpower/ui";
import { VEHICLES, DEPOTS, type Vehicle, type VehicleStatus } from "~/mocks/fleet";

// ─── Types ────────────────────────────────────────────────────────────────────

type LoadState = "idle" | "loading" | "error";
type SortKey = "id" | "registration" | "soc" | "status" | "costPerKm";
type SortDir = "asc" | "desc";

// ─── SoC Bar ──────────────────────────────────────────────────────────────────

function SocBar({ soc }: { soc: number }) {
  const color =
    soc < 20 ? "bg-error" : soc < 50 ? "bg-warning" : "bg-success";
  const textColor =
    soc < 20 ? "text-error" : soc < 50 ? "text-warning" : "text-success";
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-14 h-1.5 bg-muted rounded-full overflow-hidden shrink-0"
        role="progressbar"
        aria-valuenow={soc}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`State of charge ${soc} percent`}
      >
        <div className={`h-full rounded-full ${color}`} style={{ width: `${soc}%` }} />
      </div>
      <span className={`font-mono text-[11px] ${textColor}`}>{soc}%</span>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  VehicleStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  charging: {
    bg: "bg-error/10",
    text: "text-error",
    dot: "bg-error",
    label: "Charging",
  },
  idle: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Idle",
  },
  "in-route": {
    bg: "bg-info/10",
    text: "text-info",
    dot: "bg-info",
    label: "In route",
  },
  "low-battery": {
    bg: "bg-error/10",
    text: "text-error",
    dot: "bg-error",
    label: "Low battery",
  },
  maintenance: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
    label: "Maintenance",
  },
  full: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: "Full",
  },
};

function StatusPill({ status }: { status: VehicleStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${s.bg} ${s.text}`}
    >
      <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── Depot Overview Card ──────────────────────────────────────────────────────

function DepotOverviewCard({
  name,
  city,
  total,
  chargingNow,
  idle,
  lowBattery,
  avgSoc,
}: {
  name: string;
  city: string;
  total: number;
  chargingNow: number;
  idle: number;
  lowBattery: number;
  avgSoc: number;
}) {
  const avgColor =
    avgSoc < 30 ? "bg-error" : avgSoc < 60 ? "bg-warning" : "bg-success";
  return (
    <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-3">
      <div>
        <div className="font-body text-[13px] font-semibold text-foreground">
          {name}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {city}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Metric value={total} label="Vehicles" />
        <Metric value={chargingNow} label="Charging" tone="text-error" />
        <Metric value={idle} label="Idle" tone="text-muted-foreground" />
        <Metric value={lowBattery} label="Low batt." tone="text-warning" />
      </div>
      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            Avg SoC
          </span>
          <span className="font-mono text-[11px] text-foreground">
            {avgSoc}%
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${avgColor}`}
            style={{ width: `${avgSoc}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function Metric({
  value,
  label,
  tone = "text-foreground",
}: {
  value: number;
  label: string;
  tone?: string;
}) {
  return (
    <div>
      <div className={`font-mono text-[20px] font-semibold leading-none ${tone}`}>
        {value}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-0.5">
        {label}
      </div>
    </div>
  );
}

// ─── Charge Queue ─────────────────────────────────────────────────────────────

function ChargeQueueWidget({ queue }: { queue: Vehicle[] }) {
  return (
    <section
      aria-labelledby="charge-queue-heading"
      className="rounded-card border border-border bg-card overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-error" aria-hidden="true" />
          <h2
            id="charge-queue-heading"
            className="font-body text-[13px] font-semibold text-foreground"
          >
            Charge queue
          </h2>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {queue.length} waiting
        </span>
      </div>
      {queue.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            No vehicles queued
          </p>
        </div>
      ) : (
        <ol className="divide-y divide-border">
          {queue.map((v, i) => (
            <li key={v.id} className="px-4 py-2.5 flex items-center gap-3">
              <span className="font-mono text-[11px] text-muted-foreground w-4 shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] text-foreground">
                  {v.registration}
                </div>
                <div className="font-body text-[10px] text-muted-foreground truncate">
                  {v.depot}
                </div>
              </div>
              <SocBar soc={v.soc} />
            </li>
          ))}
        </ol>
      )}
      <div className="px-4 py-2.5 border-t border-border">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
          Ordered by state of charge, lowest first
        </p>
      </div>
    </section>
  );
}

// ─── Route Planner Placeholder ────────────────────────────────────────────────

function RoutePlannerPlaceholder() {
  return (
    <section
      aria-labelledby="route-planner-heading"
      className="rounded-card border border-border bg-card flex flex-col items-center justify-center p-8 text-center gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
        <MapPin size={22} className="text-muted-foreground" aria-hidden="true" />
      </div>
      <div>
        <h2
          id="route-planner-heading"
          className="font-body text-[14px] font-semibold text-foreground mb-1"
        >
          Route planner
        </h2>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-warning mb-2">
          Coming Q3 2026
        </div>
        <p className="font-body text-[12px] text-muted-foreground leading-relaxed max-w-xs">
          Optimal depot to depot routing with charge stop planning.
        </p>
      </div>
      <button
        type="button"
        className="px-4 py-2 rounded-btn border border-border font-body text-[12px] text-foreground hover:bg-muted transition-colors cursor-pointer"
        onClick={() => console.log("Route planner notification requested")}
      >
        Get notified
      </button>
    </section>
  );
}

// ─── Fleet Table ─────────────────────────────────────────────────────────────

const COLUMNS: Array<{
  key: SortKey | null;
  label: string;
  sortable: boolean;
}> = [
  { key: "id", label: "ID", sortable: true },
  { key: "registration", label: "Registration", sortable: true },
  { key: null, label: "Model", sortable: false },
  { key: "soc", label: "SoC", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: null, label: "Location", sortable: false },
  { key: "costPerKm", label: "Cost/km", sortable: true },
  { key: null, label: "", sortable: false },
];

const GRID_COLS =
  "grid grid-cols-[80px_1fr_100px_110px_120px_1fr_80px_36px]";

function FleetTable({
  vehicles,
  state,
  sortKey,
  sortDir,
  onSort,
  onRetry,
}: {
  vehicles: Vehicle[];
  state: LoadState;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  onRetry: () => void;
}) {
  return (
    <section
      aria-labelledby="fleet-vehicles-heading"
      className="rounded-card border border-border bg-card overflow-hidden"
    >
      <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
        <h2
          id="fleet-vehicles-heading"
          className="font-body text-[13px] font-semibold text-foreground"
        >
          Fleet vehicles
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {state === "idle" ? `${vehicles.length} vehicles` : ""}
        </span>
      </div>

      {state === "error" ? (
        <div className="px-5 py-10 flex flex-col items-center text-center gap-3">
          <AlertCircle size={20} className="text-error" aria-hidden="true" />
          <p className="font-body text-[13px] text-foreground">
            Could not load fleet vehicles.
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="px-3 py-1.5 rounded-btn border border-border font-body text-[12px] text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : state === "loading" ? (
        <TableSkeleton />
      ) : vehicles.length === 0 ? (
        <EmptyState
          icon={<Truck size={20} aria-hidden="true" />}
          title="No fleet customers yet"
          description="Add your first fleet to start tracking corporate accounts."
        />
      ) : (
        <table
          className="w-full"
          role="table"
          aria-label="Fleet vehicles"
        >
          <thead>
            <tr className={`${GRID_COLS} px-5 py-2 bg-muted border-b border-border`}>
              {COLUMNS.map((col) => {
                const isActive = col.sortable && col.key === sortKey;
                const ariaSort = isActive
                  ? sortDir === "asc"
                    ? "ascending"
                    : "descending"
                  : col.sortable
                    ? "none"
                    : undefined;
                const content = col.sortable && col.key ? (
                  <button
                    type="button"
                    onClick={() => onSort(col.key as SortKey)}
                    className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-left"
                  >
                    {col.label}
                    {isActive ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                  </button>
                ) : (
                  <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                    {col.label}
                  </span>
                );
                return (
                  <th
                    key={col.label || "actions"}
                    scope="col"
                    aria-sort={ariaSort}
                    className="text-left font-normal"
                  >
                    {content}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr
                key={v.id}
                className={`${GRID_COLS} px-5 py-3 border-b border-border last:border-0 items-center hover:bg-muted transition-colors`}
              >
                <td className="font-mono text-[10px] text-muted-foreground">
                  {v.id}
                </td>
                <td className="font-mono text-[11px] text-foreground font-medium">
                  {v.registration}
                </td>
                <td className="font-body text-[12px] text-muted-foreground truncate pr-2">
                  {v.model}
                </td>
                <td>
                  <SocBar soc={v.soc} />
                </td>
                <td>
                  <StatusPill status={v.status} />
                </td>
                <td className="font-body text-[11px] text-muted-foreground truncate pr-2">
                  {v.chargeStation ?? v.lastSeen}
                </td>
                <td className="font-mono text-[11px] text-foreground">
                  {v.costPerKm}
                </td>
                <td>
                  <button
                    type="button"
                    aria-label={`Actions for vehicle ${v.registration}`}
                    className="flex items-center justify-center w-7 h-7 rounded-btn hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                    onClick={() => console.log("Vehicle actions:", v.id)}
                  >
                    <MoreHorizontal size={14} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function TableSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <div className={`${GRID_COLS} px-5 py-2 bg-muted border-b border-border`}>
        {COLUMNS.map((col) => (
          <span
            key={col.label || "skeleton-head"}
            className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground"
          >
            {col.label}
          </span>
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`${GRID_COLS} px-5 py-3 border-b border-border last:border-0 items-center`}
        >
          {COLUMNS.map((_, j) => (
            <div
              key={j}
              className="h-3 bg-muted rounded animate-pulse mr-3"
            />
          ))}
        </div>
      ))}
      <span className="sr-only">Loading fleet vehicles</span>
    </div>
  );
}

// ─── Sorting helper ───────────────────────────────────────────────────────────

function sortVehicles(
  vehicles: Vehicle[],
  key: SortKey,
  dir: SortDir
): Vehicle[] {
  const multiplier = dir === "asc" ? 1 : -1;
  return [...vehicles].sort((a, b) => {
    const av = a[key as keyof Vehicle];
    const bv = b[key as keyof Vehicle];
    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * multiplier;
    }
    return String(av).localeCompare(String(bv)) * multiplier;
  });
}

// ─── Fleet Page ───────────────────────────────────────────────────────────────

export default function Fleet() {
  const [activeDepot, setActiveDepot] = React.useState<string>("all");
  const [loadState, setLoadState] = React.useState<LoadState>("idle");
  const [sortKey, setSortKey] = React.useState<SortKey>("id");
  const [sortDir, setSortDir] = React.useState<SortDir>("asc");

  const depotNames = React.useMemo(
    () => ["all", ...DEPOTS.map((d) => d.name)],
    []
  );

  const filteredVehicles = React.useMemo(
    () =>
      activeDepot === "all"
        ? VEHICLES
        : VEHICLES.filter((v) => v.depot === activeDepot),
    [activeDepot]
  );

  const sortedVehicles = React.useMemo(
    () => sortVehicles(filteredVehicles, sortKey, sortDir),
    [filteredVehicles, sortKey, sortDir]
  );

  const globalStats = React.useMemo(() => {
    const v = filteredVehicles;
    return {
      total: v.length,
      charging: v.filter((x) => x.status === "charging").length,
      lowBattery: v.filter((x) => x.status === "low-battery").length,
      avgSoc: v.length
        ? Math.round(v.reduce((a, x) => a + x.soc, 0) / v.length)
        : 0,
    };
  }, [filteredVehicles]);

  const chargeQueue = React.useMemo(() => {
    return filteredVehicles
      .filter(
        (v) =>
          (v.status === "low-battery" ||
            (v.soc < 30 && v.status === "idle")) &&
          v.chargeStation === null
      )
      .sort((a, b) => a.soc - b.soc);
  }, [filteredVehicles]);

  const handleSort = React.useCallback(
    (key: SortKey) => {
      if (key === sortKey) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
    },
    [sortKey]
  );

  const handleRetry = React.useCallback(() => {
    setLoadState("loading");
    setTimeout(() => setLoadState("idle"), 600);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Filter by depot">
          {depotNames.map((d) => {
            const active = activeDepot === d;
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveDepot(d)}
                className={`px-3 py-1.5 rounded-btn font-body text-[12px] transition-colors cursor-pointer ${
                  active
                    ? "bg-muted text-foreground border border-border"
                    : "text-muted-foreground border border-transparent hover:bg-muted"
                }`}
              >
                {d === "all" ? "All depots" : d}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-primary-foreground font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => console.log("Add vehicle")}
        >
          <Plus size={13} aria-hidden="true" />
          Add vehicle
        </button>
      </div>

      {/* ── Depot overview strip ── */}
      {activeDepot === "all" ? (
        <div className="grid grid-cols-4 gap-3">
          {DEPOTS.map((depot) => (
            <DepotOverviewCard key={depot.id} {...depot} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            label="Vehicles in fleet"
            value={
              <span className="font-mono text-[28px]">{globalStats.total}</span>
            }
          />
          <StatCard
            label="Charging now"
            value={
              <span className="font-mono text-[28px] text-error">
                {globalStats.charging}
              </span>
            }
          />
          <StatCard
            label="Low battery"
            value={
              <span className="font-mono text-[28px] text-warning">
                {globalStats.lowBattery}
              </span>
            }
          />
          <StatCard
            label="Avg. SoC"
            value={
              <span className="font-mono text-[28px]">
                {globalStats.avgSoc}%
              </span>
            }
            trend="+5% vs yesterday"
            trendDir="up"
          />
        </div>
      )}

      {/* ── Fleet table ── */}
      <FleetTable
        vehicles={sortedVehicles}
        state={loadState}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        onRetry={handleRetry}
      />

      {/* ── Charge queue + route planner ── */}
      <div className="grid grid-cols-[3fr_2fr] gap-4">
        <ChargeQueueWidget queue={chargeQueue} />
        <RoutePlannerPlaceholder />
      </div>
    </div>
  );
}
