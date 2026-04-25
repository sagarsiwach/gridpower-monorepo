import * as React from "react";
import {
  Car,
  MapPin,
  MoreHorizontal,
  Plus,
  Zap,
  BatteryLow,
  Route,
  Wrench,
  Bell,
} from "lucide-react";
import { StatCard } from "@gridpower/ui";
import { VEHICLES, DEPOTS, CHARGE_QUEUE, type Vehicle, type VehicleStatus } from "~/mocks/fleet";

// ─── SoC Bar ──────────────────────────────────────────────────────────────────

function SocBar({ soc }: { soc: number }) {
  const color =
    soc < 20
      ? "bg-error"
      : soc < 50
        ? "bg-amber-500"
        : "bg-success";
  return (
    <div className="flex items-center gap-2">
      <div className="w-14 h-1.5 bg-sand-3 dark:bg-dark-4 rounded-full overflow-hidden shrink-0">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${soc}%` }} />
      </div>
      <span
        className={`font-mono text-[11px] ${
          soc < 20
            ? "text-error"
            : soc < 50
              ? "text-amber-500"
              : "text-success"
        }`}
      >
        {soc}%
      </span>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<
  VehicleStatus,
  { bg: string; text: string; label: string }
> = {
  charging: {
    bg: "bg-error/10 dark:bg-error/20",
    text: "text-error",
    label: "Charging",
  },
  idle: {
    bg: "bg-sand-3 dark:bg-dark-4",
    text: "text-sand-9 dark:text-dark-9",
    label: "Idle",
  },
  "in-route": {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    label: "In route",
  },
  "low-battery": {
    bg: "bg-error/10 dark:bg-error/20",
    text: "text-error",
    label: "Low battery",
  },
  maintenance: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
    label: "Maintenance",
  },
  full: {
    bg: "bg-success/10 dark:bg-success/20",
    text: "text-success",
    label: "Full",
  },
};

function StatusPill({ status }: { status: VehicleStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${s.bg} ${s.text}`}
    >
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
  return (
    <div className="rounded-card border border-border bg-card dark:bg-dark-2 dark:border-dark-6 p-4 flex flex-col gap-3">
      <div>
        <div className="font-body text-[13px] font-semibold text-foreground dark:text-dark-12">
          {name}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-sand-9 dark:text-dark-9">
          {city}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="font-mono text-[20px] font-semibold text-foreground dark:text-dark-12 leading-none">
            {total}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-sand-9 dark:text-dark-9 mt-0.5">
            Vehicles
          </div>
        </div>
        <div>
          <div className="font-mono text-[20px] font-semibold text-error leading-none">
            {chargingNow}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-sand-9 dark:text-dark-9 mt-0.5">
            Charging
          </div>
        </div>
        <div>
          <div className="font-mono text-[20px] font-semibold text-sand-11 dark:text-dark-11 leading-none">
            {idle}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-sand-9 dark:text-dark-9 mt-0.5">
            Idle
          </div>
        </div>
        <div>
          <div className="font-mono text-[20px] font-semibold text-amber-600 leading-none">
            {lowBattery}
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-sand-9 dark:text-dark-9 mt-0.5">
            Low batt.
          </div>
        </div>
      </div>
      <div className="pt-2 border-t border-border dark:border-dark-6">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-sand-9 dark:text-dark-9">
            Avg SoC
          </span>
          <span className="font-mono text-[11px] text-foreground dark:text-dark-12">
            {avgSoc}%
          </span>
        </div>
        <div className="h-1.5 bg-sand-3 dark:bg-dark-4 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              avgSoc < 30 ? "bg-error" : avgSoc < 60 ? "bg-amber-500" : "bg-success"
            }`}
            style={{ width: `${avgSoc}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Charge Queue ─────────────────────────────────────────────────────────────

function ChargeQueueWidget({ queue }: { queue: Vehicle[] }) {
  return (
    <div className="rounded-card border border-border bg-card dark:bg-dark-2 dark:border-dark-6 overflow-hidden">
      <div className="px-4 py-3 border-b border-border dark:border-dark-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-error" />
          <span className="font-body text-[13px] font-semibold text-foreground dark:text-dark-12">
            Charge queue
          </span>
        </div>
        <span className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
          {queue.length} waiting
        </span>
      </div>
      {queue.length === 0 ? (
        <div className="px-4 py-6 text-center">
          <div className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
            No vehicles queued
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border dark:divide-dark-6">
          {queue.map((v, i) => (
            <div
              key={v.id}
              className="px-4 py-2.5 flex items-center gap-3"
            >
              <div className="font-mono text-[11px] text-sand-9 dark:text-dark-9 w-4 shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] text-foreground dark:text-dark-12">
                  {v.registration}
                </div>
                <div className="font-body text-[10px] text-sand-9 dark:text-dark-9 truncate">
                  {v.depot}
                </div>
              </div>
              <SocBar soc={v.soc} />
            </div>
          ))}
        </div>
      )}
      <div className="px-4 py-2.5 border-t border-border dark:border-dark-6">
        <p className="font-mono text-[9px] uppercase tracking-widest text-sand-9 dark:text-dark-9">
          Ordered by state of charge · lowest first
        </p>
      </div>
    </div>
  );
}

// ─── Route Planner Placeholder ────────────────────────────────────────────────

function RoutePlannerPlaceholder() {
  return (
    <div className="rounded-card border border-border bg-card dark:bg-dark-2 dark:border-dark-6 flex flex-col items-center justify-center p-8 text-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-sand-3 dark:bg-dark-3 flex items-center justify-center">
        <MapPin size={22} className="text-sand-9 dark:text-dark-9" />
      </div>
      <div>
        <div className="font-body text-[14px] font-semibold text-foreground dark:text-dark-12 mb-1">
          Route planner
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-amber-600 mb-2">
          Coming Q3 2026
        </div>
        <div className="font-body text-[12px] text-sand-9 dark:text-dark-9 leading-relaxed max-w-[200px]">
          Optimal depot-to-depot routing with charge stop planning.
        </div>
      </div>
      <button
        type="button"
        className="px-4 py-2 rounded-btn border border-border dark:border-dark-6 font-body text-[12px] text-foreground dark:text-dark-12 hover:bg-sand-2 dark:hover:bg-dark-3 transition-colors cursor-pointer"
        onClick={() => console.log("Route planner notification requested")}
      >
        Get notified
      </button>
    </div>
  );
}

// ─── Fleet Table ─────────────────────────────────────────────────────────────

function FleetTable({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div className="rounded-card border border-border bg-card dark:bg-dark-2 dark:border-dark-6 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border dark:border-dark-6 flex items-center justify-between">
        <span className="font-body text-[13px] font-semibold text-foreground dark:text-dark-12">
          Fleet vehicles
        </span>
        <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
          {vehicles.length} vehicles
        </span>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[80px_1fr_100px_110px_120px_1fr_80px_36px] px-5 py-2 bg-sand-2 dark:bg-dark-3 border-b border-border dark:border-dark-6">
        {["ID", "Registration", "Model", "SoC", "Status", "Location", "Cost/km", ""].map(
          (h) => (
            <span
              key={h}
              className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9"
            >
              {h}
            </span>
          )
        )}
      </div>

      {/* Rows */}
      {vehicles.map((v) => (
        <div
          key={v.id}
          className="grid grid-cols-[80px_1fr_100px_110px_120px_1fr_80px_36px] px-5 py-3 border-b border-border dark:border-dark-6 last:border-0 items-center hover:bg-sand-2 dark:hover:bg-dark-3 transition-colors"
        >
          <span className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
            {v.id}
          </span>
          <span className="font-mono text-[11px] text-foreground dark:text-dark-12 font-medium">
            {v.registration}
          </span>
          <span className="font-body text-[12px] text-sand-9 dark:text-dark-9 truncate pr-2">
            {v.model}
          </span>
          <SocBar soc={v.soc} />
          <StatusPill status={v.status} />
          <span className="font-body text-[11px] text-sand-9 dark:text-dark-9 truncate pr-2">
            {v.chargeStation ?? v.lastSeen}
          </span>
          <span className="font-mono text-[11px] text-foreground dark:text-dark-12">
            {v.costPerKm}
          </span>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-btn hover:bg-sand-3 dark:hover:bg-dark-4 text-sand-9 dark:text-dark-9 transition-colors cursor-pointer"
            onClick={() => console.log("Vehicle actions:", v.id)}
          >
            <MoreHorizontal size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Fleet Page ───────────────────────────────────────────────────────────────

export default function Fleet() {
  const [activeDepot, setActiveDepot] = React.useState<string>("all");

  const depotNames = ["all", ...DEPOTS.map((d) => d.name)];

  const filteredVehicles =
    activeDepot === "all"
      ? VEHICLES
      : VEHICLES.filter((v) => v.depot === activeDepot);

  const globalStats = React.useMemo(() => {
    const vehicles = filteredVehicles;
    return {
      total: vehicles.length,
      charging: vehicles.filter((v) => v.status === "charging").length,
      lowBattery: vehicles.filter((v) => v.status === "low-battery").length,
      avgSoc: Math.round(
        vehicles.reduce((a, v) => a + v.soc, 0) / vehicles.length
      ),
    };
  }, [filteredVehicles]);

  const chargeQueue = React.useMemo(() => {
    const base = activeDepot === "all" ? VEHICLES : filteredVehicles;
    return base
      .filter(
        (v) =>
          (v.status === "low-battery" ||
            (v.soc < 30 && v.status === "idle")) &&
          v.chargeStation === null
      )
      .sort((a, b) => a.soc - b.soc);
  }, [activeDepot, filteredVehicles]);

  return (
    <div className="flex flex-col gap-5">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          {depotNames.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDepot(d)}
              className={`px-3 py-1.5 rounded-btn font-body text-[12px] transition-colors cursor-pointer ${
                activeDepot === d
                  ? "bg-sand-3 dark:bg-dark-4 text-foreground dark:text-dark-12 border border-border dark:border-dark-6"
                  : "text-sand-9 dark:text-dark-9 border border-transparent hover:bg-sand-2 dark:hover:bg-dark-3"
              }`}
            >
              {d === "all" ? "All depots" : d}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => console.log("Add vehicle")}
        >
          <Plus size={13} />
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
              <span className="font-mono text-[28px] text-amber-600">
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
      <FleetTable vehicles={filteredVehicles} />

      {/* ── Charge queue + route planner ── */}
      <div className="grid grid-cols-[3fr_2fr] gap-4">
        <ChargeQueueWidget queue={chargeQueue} />
        <RoutePlannerPlaceholder />
      </div>
    </div>
  );
}
