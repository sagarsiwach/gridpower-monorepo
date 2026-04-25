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
 *
 * States: supports loading (skeleton port grid), error (inline retry),
 * and empty (no active sessions) variants in addition to the default render.
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

// ─── Status maps ───────────────────────────────────────────────────────────

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

// ─── Port status colors (semantic tokens only — no raw hex) ───────────────

const PORT_COLORS: Record<PortStatus, string> = {
  available: "border-success bg-success/10 dark:bg-success/20",
  charging: "border-primary bg-primary/10 dark:bg-primary/20",
  offline: "border-border bg-muted",
  error: "border-error bg-error/10 dark:bg-error/20",
};

const PORT_ICON_COLOR: Record<PortStatus, string> = {
  available: "text-success",
  charging: "text-primary",
  offline: "text-muted-foreground",
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
  const label = `Port ${port.number}, ${port.type}, ${PORT_STATUS_LABEL[port.status]}`;
  return (
    <button
      type="button"
      aria-label={label}
      title={`P${port.number} · ${port.type} · ${PORT_STATUS_LABEL[port.status]}`}
      className={cn(
        "relative flex flex-col items-center gap-1 rounded-[8px] border px-2 py-2.5 text-center cursor-pointer transition-colors",
        "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-card",
        PORT_COLORS[port.status],
      )}
    >
      {/* User initial overlay for charging */}
      {port.status === "charging" && port.userInitial && (
        <div
          aria-hidden="true"
          className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center"
        >
          <span className="font-mono text-[8px] font-bold text-white leading-none">
            {port.userInitial}
          </span>
        </div>
      )}
      <Zap size={14} aria-hidden="true" className={PORT_ICON_COLOR[port.status]} />
      <span className={cn("font-mono text-[9px]", PORT_ICON_COLOR[port.status])}>
        P{port.number}
      </span>
      <span className="font-mono text-[8px] text-muted-foreground">
        {port.type}
      </span>
    </button>
  );
}

function PortGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[58px] rounded-[8px] border border-border bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

// ─── Main panel ────────────────────────────────────────────────────────────

export function StationDetailPanel({
  station,
  onClose,
  loading = false,
  error,
  onRetry,
}: {
  station: Station;
  onClose?: () => void;
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
}) {
  const displayPorts = station.portList.slice(0, 6);
  const sessionCount = station.activeSessions.length;

  return (
    <section
      aria-labelledby="station-detail-name"
      className="flex flex-col overflow-hidden rounded-card border border-border bg-card"
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="flex items-start justify-between gap-2 border-b border-border px-4 py-3">
        <div className="flex flex-col gap-1 min-w-0">
          <h2
            id="station-detail-name"
            className="font-body text-[13px] font-semibold text-foreground truncate"
          >
            {station.name}
          </h2>
          <div className="flex items-center gap-1.5 flex-wrap">
            <MapPin size={10} aria-hidden="true" className="shrink-0 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">
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
            className="shrink-0 flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close detail panel"
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </header>

      {/* ── Error state ───────────────────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 border-b border-border bg-error/10 px-4 py-3"
        >
          <p className="font-body text-[12px] text-foreground">{error}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-2.5 py-1 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <RefreshCw size={11} aria-hidden="true" />
              Retry
            </button>
          )}
        </div>
      )}

      {/* ── Mini stats grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 divide-x divide-y divide-border border-b border-border">
        {[
          { label: "Revenue today", value: station.today, className: "text-primary" },
          { label: "Utilisation", value: `${station.util}%`, className: "text-success" },
          { label: "Total ports", value: String(station.ports), className: "text-foreground" },
          { label: "Uptime", value: station.uptime, className: "text-foreground" },
        ].map(({ label, value, className }) => (
          <div key={label} className="flex flex-col gap-1 px-4 py-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              {label}
            </span>
            <span className={cn("font-heading text-[18px] font-semibold leading-tight", className)}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Port grid ─────────────────────────────────────────────────────── */}
      <div className="border-b border-border px-4 py-3">
        <span className="mb-2.5 block font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
          Port status
        </span>
        {loading ? (
          <PortGridSkeleton />
        ) : (
          <div className="grid grid-cols-3 gap-1.5">
            {displayPorts.map((port) => (
              <PortCell key={port.id} port={port} />
            ))}
            {/* Show count if more than 6 ports */}
            {station.ports > 6 && (
              <div
                aria-label={`${station.ports - 6} more ports not shown`}
                className="flex flex-col items-center justify-center rounded-[8px] border border-border bg-muted px-2 py-2.5 text-center"
              >
                <span className="font-mono text-[10px] text-muted-foreground">
                  +{station.ports - 6}
                </span>
                <span className="font-mono text-[8px] text-muted-foreground">
                  more
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Active sessions ───────────────────────────────────────────────── */}
      <div className="border-b border-border px-4 py-3">
        <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
          Active sessions{sessionCount > 0 ? ` (${sessionCount})` : ""}
        </span>
        {sessionCount === 0 ? (
          <p className="font-body text-[11px] text-muted-foreground italic">
            No active sessions on this station
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {station.activeSessions.map((session) => (
              <li
                key={session.id}
                tabIndex={0}
                aria-label={`Session for ${session.userName}, port ${session.portNumber} ${session.portType}, started ${session.startTime}, revenue ${session.revenue}, energy ${session.energyKwh} kilowatt hours`}
                className="flex items-center gap-2 rounded-[6px] border border-border bg-muted px-3 py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* User avatar */}
                <div
                  aria-hidden="true"
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary"
                >
                  <span className="font-mono text-[9px] font-bold text-white leading-none">
                    {session.userInitial}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate font-body text-[11px] text-foreground">
                    {session.userName}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    P{session.portNumber} · {session.portType} · {session.startTime}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block font-mono text-[11px] font-medium text-primary">
                    {session.revenue}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {session.energyKwh} kWh
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Remote actions ────────────────────────────────────────────────── */}
      <div className="mt-auto flex flex-col gap-2 px-4 py-3">
        <button
          type="button"
          className="w-full rounded-btn bg-primary px-4 py-2 font-body text-[12px] font-medium text-white hover:bg-grid-red-hover active:bg-grid-red-active cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Manage station
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Reboot
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Download size={11} aria-hidden="true" />
            Export log
          </button>
        </div>

        {/* Remote actions dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Remote actions
              <ChevronDown size={11} aria-hidden="true" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem className="gap-2 text-[12px]">
              <RefreshCw size={12} aria-hidden="true" />
              Reboot port P1
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-[12px]">
              <StopCircle size={12} aria-hidden="true" />
              Stop session
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-[12px]">
              <Settings size={12} aria-hidden="true" />
              Update firmware
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-[12px]">
              <Download size={12} aria-hidden="true" />
              Download diagnostics
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </section>
  );
}
