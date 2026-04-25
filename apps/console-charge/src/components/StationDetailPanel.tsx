/**
 * StationDetailPanel — inline side panel for station detail.
 * Used by both /stations (index) and /stations/:stationId.
 *
 * Shows:
 * - Header: name, city, status
 * - Mini stats grid: revenue, utilisation, total ports, uptime
 * - Port grid: up to 6 ports with 4 status states (available/charging/offline/error)
 * - Active sessions list
 * - Remote actions (all stubs)
 */

import {
  ChevronDown,
  Download,
  MapPin,
  RefreshCw,
  Settings,
  StopCircle,
  X,
  Zap,
} from "lucide-react";
import {
  StatusBadge,
  type StatusBadgeProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  cn,
} from "@gridpower/ui";

import type { Station, Port, PortStatus } from "~/mocks/stations";

// ─── Types ─────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, StatusBadgeProps["status"]> = {
  online: "online",
  offline: "offline",
  maintenance: "maintenance",
  charging: "online",
};

const STATUS_LABEL: Record<string, string> = {
  online: "Online",
  offline: "Offline",
  maintenance: "Maintenance",
  charging: "Charging",
};

// ─── Port status colors ───────────────────────────────────────────────────

const PORT_COLORS: Record<PortStatus, string> = {
  available: "border-[color:var(--color-success)] bg-[var(--color-success-bg)] dark:bg-[#1a3d2a]",
  charging: "border-primary bg-[var(--grid-red-light-bg)] dark:bg-[#3a1010]",
  offline: "border-sand-6 dark:border-dark-6 bg-sand-3 dark:bg-dark-3",
  error: "border-error bg-error-bg dark:bg-[#3a1010]",
};

const PORT_ICON_COLOR: Record<PortStatus, string> = {
  available: "text-success",
  charging: "text-primary",
  offline: "text-sand-8 dark:text-dark-8",
  error: "text-error",
};

const PORT_STATUS_LABEL: Record<PortStatus, string> = {
  available: "Available",
  charging: "Charging",
  offline: "Offline",
  error: "Error",
};

// ─── Sub-components ────────────────────────────────────────────────────────

function PortCell({ port }: { port: Port }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-[8px] border px-2 py-2.5 text-center cursor-pointer transition-colors",
        PORT_COLORS[port.status],
        "hover:opacity-90",
      )}
      title={`P${port.number} — ${port.type} — ${PORT_STATUS_LABEL[port.status]}`}
    >
      {/* User initial overlay for charging */}
      {port.status === "charging" && port.userInitial && (
        <div className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
          <span className="font-mono text-[8px] font-bold text-white leading-none">
            {port.userInitial}
          </span>
        </div>
      )}
      <Zap size={14} className={PORT_ICON_COLOR[port.status]} />
      <span className={cn("font-mono text-[9px]", PORT_ICON_COLOR[port.status])}>
        P{port.number}
      </span>
      <span className="font-mono text-[8px] text-sand-9 dark:text-dark-9">
        {port.type}
      </span>
    </div>
  );
}

// ─── Main panel ────────────────────────────────────────────────────────────

export function StationDetailPanel({
  station,
  onClose,
}: {
  station: Station;
  onClose?: () => void;
}) {
  const displayPorts = station.portList.slice(0, 6);

  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-sand-6 dark:border-dark-6 bg-sand-1 dark:bg-dark-2">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-2 border-b border-sand-6 dark:border-dark-6 px-4 py-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="font-body text-[13px] font-semibold text-sand-12 dark:text-dark-12 truncate">
            {station.name}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <MapPin size={10} className="shrink-0 text-sand-9 dark:text-dark-9" />
            <span className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
              {station.city}
            </span>
            <StatusBadge
              status={STATUS_MAP[station.status]}
              label={STATUS_LABEL[station.status]}
            />
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex h-6 w-6 items-center justify-center rounded text-sand-9 dark:text-dark-9 hover:text-sand-12 dark:hover:text-dark-12 hover:bg-sand-3 dark:hover:bg-dark-4 cursor-pointer transition-colors"
            aria-label="Close detail panel"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ── Mini stats grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 divide-x divide-y divide-sand-6 dark:divide-dark-6 border-b border-sand-6 dark:border-dark-6">
        {[
          { label: "Revenue today", value: station.today, className: "text-primary" },
          { label: "Utilisation", value: `${station.util}%`, className: "text-success" },
          { label: "Total ports", value: String(station.ports), className: "text-sand-12 dark:text-dark-12" },
          { label: "Uptime", value: station.uptime, className: "text-sand-12 dark:text-dark-12" },
        ].map(({ label, value, className }) => (
          <div key={label} className="flex flex-col gap-1 px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9">
              {label}
            </span>
            <span className={cn("font-heading text-[18px] font-semibold leading-tight", className)}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Port grid ─────────────────────────────────────────────────────── */}
      <div className="border-b border-sand-6 dark:border-dark-6 px-4 py-3">
        <span className="mb-2.5 block font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9">
          Port status
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {displayPorts.map((port) => (
            <PortCell key={port.id} port={port} />
          ))}
          {/* Show count if more than 6 ports */}
          {station.ports > 6 && (
            <div className="flex flex-col items-center justify-center rounded-[8px] border border-sand-6 dark:border-dark-6 bg-sand-3 dark:bg-dark-3 px-2 py-2.5 text-center">
              <span className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
                +{station.ports - 6}
              </span>
              <span className="font-mono text-[8px] text-sand-8 dark:text-dark-8">
                more
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Active sessions ───────────────────────────────────────────────── */}
      {station.activeSessions.length > 0 && (
        <div className="border-b border-sand-6 dark:border-dark-6 px-4 py-3">
          <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9">
            Active sessions ({station.activeSessions.length})
          </span>
          <div className="flex flex-col gap-1.5">
            {station.activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-2 rounded-[6px] border border-sand-6 dark:border-dark-6 bg-sand-2 dark:bg-dark-3 px-3 py-2"
              >
                {/* User avatar */}
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="font-mono text-[9px] font-bold text-white leading-none">
                    {session.userInitial}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate font-body text-[11px] text-sand-12 dark:text-dark-12">
                    {session.userName}
                  </span>
                  <span className="font-mono text-[9px] text-sand-9 dark:text-dark-9">
                    P{session.portNumber} · {session.portType} · {session.startTime}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block font-mono text-[11px] font-medium text-primary">
                    {session.revenue}
                  </span>
                  <span className="font-mono text-[9px] text-sand-9 dark:text-dark-9">
                    {session.energyKwh} kWh
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {station.activeSessions.length === 0 && (
        <div className="border-b border-sand-6 dark:border-dark-6 px-4 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9">
            Active sessions
          </span>
          <p className="mt-1.5 font-body text-[11px] text-sand-9 dark:text-dark-9 italic">
            No active sessions
          </p>
        </div>
      )}

      {/* ── Remote actions ────────────────────────────────────────────────── */}
      <div className="mt-auto flex flex-col gap-2 px-4 py-3">
        <button
          type="button"
          className="w-full rounded-btn bg-primary px-4 py-2 font-body text-[12px] font-medium text-white hover:bg-grid-red-hover active:bg-grid-red-active cursor-pointer transition-colors"
        >
          Manage station →
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-btn border border-sand-6 dark:border-dark-6 bg-transparent px-3 py-1.5 font-body text-[11px] text-sand-11 dark:text-dark-11 hover:bg-sand-3 dark:hover:bg-dark-4 cursor-pointer transition-colors"
          >
            <RefreshCw size={11} />
            Reboot
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-btn border border-sand-6 dark:border-dark-6 bg-transparent px-3 py-1.5 font-body text-[11px] text-sand-11 dark:text-dark-11 hover:bg-sand-3 dark:hover:bg-dark-4 cursor-pointer transition-colors"
          >
            <Download size={11} />
            Export log
          </button>
        </div>

        {/* Remote actions dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-btn border border-sand-6 dark:border-dark-6 bg-transparent px-3 py-1.5 font-body text-[11px] text-sand-9 dark:text-dark-9 hover:bg-sand-3 dark:hover:bg-dark-4 cursor-pointer transition-colors"
            >
              Remote actions
              <ChevronDown size={11} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem className="gap-2 text-[12px]">
              <RefreshCw size={12} />
              Reboot port P1
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-[12px]">
              <StopCircle size={12} />
              Stop session
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-[12px]">
              <Settings size={12} />
              Update firmware
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-[12px]">
              <Download size={12} />
              Download diagnostics
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
