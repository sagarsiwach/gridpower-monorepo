/**
 * CON.3: Station Detail (full-page view)
 * Route: /stations/:stationId
 *
 * In-page tabs via URL search param ?tab=
 * Tabs: Overview (existing StationDetailPanel) / Sessions / Maintenance / Firmware
 */

import * as React from "react";
import { useParams, Link, useSearchParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getStation } from "~/mocks/stations";
import { StationDetailPanel } from "~/components/StationDetailPanel";

// ─── Tab types ────────────────────────────────────────────────────────────────

type TabId = "overview" | "sessions" | "maintenance" | "firmware";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "sessions", label: "Sessions" },
  { id: "maintenance", label: "Maintenance" },
  { id: "firmware", label: "Firmware" },
];

// ─── Mock session rows for this station ───────────────────────────────────────

interface StationSession {
  id: string;
  time: string;
  driver: string;
  kwh: number;
  amount: string;
  status: "completed" | "ongoing" | "stopped";
}

function buildStationSessions(stationId: string): StationSession[] {
  const drivers = ["Rajesh K.", "Sunita P.", "Mohan D.", "Anil B.", "Priya M.", "Deepak S.", "Kavita N.", "Arjun S.", "Meena R.", "Vinod T.", "Girish N.", "Padma V.", "Anita G.", "Suresh L.", "Nisha C."];
  const statuses: StationSession["status"][] = ["completed", "completed", "completed", "completed", "ongoing", "completed", "stopped", "completed", "completed", "completed", "completed", "completed", "completed", "ongoing", "completed"];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `${stationId}-S${String(i + 1).padStart(3, "0")}`,
    time: `${String(7 + Math.floor(i * 1.2)).padStart(2, "0")}:${String((i * 17) % 60).padStart(2, "0")}`,
    driver: drivers[i]!,
    kwh: parseFloat((8.4 + i * 2.1).toFixed(1)),
    amount: `₹${(588 + i * 147).toLocaleString("en-IN")}`,
    status: statuses[i]!,
  }));
}

// ─── Mock work orders for this station ───────────────────────────────────────

type WOPriority = "high" | "medium" | "low";
type WOStatus = "open" | "in-progress" | "resolved";

interface WorkOrder {
  id: string;
  title: string;
  createdAt: string;
  priority: WOPriority;
  status: WOStatus;
  assignee: string;
}

function buildWorkOrders(stationId: string): WorkOrder[] {
  return [
    {
      id: `WO-${stationId}-001`,
      title: "Port P2 connector reported as stuck by 3 drivers",
      createdAt: "22 Apr 2025",
      priority: "high",
      status: "in-progress",
      assignee: "Ravi Technician",
    },
    {
      id: `WO-${stationId}-002`,
      title: "Display screen flickering on boot",
      createdAt: "18 Apr 2025",
      priority: "medium",
      status: "open",
      assignee: "Unassigned",
    },
    {
      id: `WO-${stationId}-003`,
      title: "AC supply voltage dip causing session drops",
      createdAt: "10 Apr 2025",
      priority: "high",
      status: "resolved",
      assignee: "Sita Engineer",
    },
    {
      id: `WO-${stationId}-004`,
      title: "Quarterly preventive maintenance inspection",
      createdAt: "01 Apr 2025",
      priority: "low",
      status: "resolved",
      assignee: "Field Team Goa",
    },
    {
      id: `WO-${stationId}-005`,
      title: "OCPP heartbeat interval reduced per NOC request",
      createdAt: "28 Mar 2025",
      priority: "low",
      status: "resolved",
      assignee: "Remote Support",
    },
  ];
}

// ─── Mock firmware info ───────────────────────────────────────────────────────

interface FirmwareRolloutRow {
  version: string;
  pushedAt: string;
  pushedBy: string;
  result: "success" | "failed" | "in-progress";
}

const CURRENT_FIRMWARE = "v4.1.2-lts";
const AVAILABLE_FIRMWARE = "v4.2.0";

const FIRMWARE_ROLLOUT_HISTORY: FirmwareRolloutRow[] = [
  {
    version: "v4.1.2-lts",
    pushedAt: "1 March 2025",
    pushedBy: "Auto-update",
    result: "success",
  },
  {
    version: "v4.1.0",
    pushedAt: "10 January 2025",
    pushedBy: "Ravi Technician",
    result: "success",
  },
  {
    version: "v4.0.9",
    pushedAt: "3 November 2024",
    pushedBy: "Remote Support",
    result: "failed",
  },
];

// ─── Status pills (shared) ────────────────────────────────────────────────────

function SessionStatusPill({ status }: { status: StationSession["status"] }) {
  const styles = {
    completed: "bg-success/10 text-success",
    ongoing: "bg-info/10 text-info",
    stopped: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${styles[status]}`}>
      {status === "completed" ? "Completed" : status === "ongoing" ? "Ongoing" : "Stopped"}
    </span>
  );
}

function WOPriorityPill({ priority }: { priority: WOPriority }) {
  const styles: Record<WOPriority, string> = {
    high: "bg-error/10 text-error",
    medium: "bg-warning/10 text-warning",
    low: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${styles[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

function WOStatusPill({ status }: { status: WOStatus }) {
  const styles: Record<WOStatus, string> = {
    open: "bg-info/10 text-info",
    "in-progress": "bg-warning/10 text-warning",
    resolved: "bg-success/10 text-success",
  };
  const labels: Record<WOStatus, string> = {
    open: "Open",
    "in-progress": "In progress",
    resolved: "Resolved",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function FirmwareResultPill({ result }: { result: FirmwareRolloutRow["result"] }) {
  const styles: Record<FirmwareRolloutRow["result"], string> = {
    success: "bg-success/10 text-success",
    failed: "bg-error/10 text-error",
    "in-progress": "bg-warning/10 text-warning",
  };
  const labels: Record<FirmwareRolloutRow["result"], string> = {
    success: "Success",
    failed: "Failed",
    "in-progress": "In progress",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${styles[result]}`}>
      {labels[result]}
    </span>
  );
}

// ─── Sessions tab ─────────────────────────────────────────────────────────────

function SessionsTab({ stationId }: { stationId: string }) {
  const sessions = buildStationSessions(stationId);

  return (
    <section aria-labelledby="station-sessions-tab-heading">
      <h3
        id="station-sessions-tab-heading"
        className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
      >
        Last 15 sessions
      </h3>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Station sessions">
            <caption className="sr-only">Last 15 charging sessions on this station</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Session", "Time", "Driver", "kWh", "Amount", "Status"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    aria-sort={undefined}
                    className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                >
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">
                    {s.id}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {s.time}
                  </td>
                  <td className="px-4 py-3 font-body text-[13px] text-foreground">
                    {s.driver}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-foreground">
                    {s.kwh} kWh
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] font-semibold text-primary">
                    {s.amount}
                  </td>
                  <td className="px-4 py-3">
                    <SessionStatusPill status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Maintenance tab ──────────────────────────────────────────────────────────

function MaintenanceTab({ stationId }: { stationId: string }) {
  const workOrders = buildWorkOrders(stationId);

  return (
    <section aria-labelledby="station-maintenance-tab-heading">
      <h3
        id="station-maintenance-tab-heading"
        className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
      >
        Work orders
      </h3>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Station work orders">
            <caption className="sr-only">Work orders for this station</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["ID", "Title", "Created", "Priority", "Assignee", "Status"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    aria-sort={undefined}
                    className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr
                  key={wo.id}
                  className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                >
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    {wo.id}
                  </td>
                  <td className="px-4 py-3 font-body text-[13px] text-foreground max-w-[280px]">
                    {wo.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {wo.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <WOPriorityPill priority={wo.priority} />
                  </td>
                  <td className="px-4 py-3 font-body text-[12px] text-muted-foreground whitespace-nowrap">
                    {wo.assignee}
                  </td>
                  <td className="px-4 py-3">
                    <WOStatusPill status={wo.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Firmware tab ─────────────────────────────────────────────────────────────

function FirmwareTab({ stationId }: { stationId: string }) {
  const [pushState, setPushState] = React.useState<"idle" | "pushing" | "done">("idle");

  const handlePush = () => {
    setPushState("pushing");
    setTimeout(() => setPushState("done"), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Current version */}
      <section aria-labelledby="firmware-current-heading">
        <h3
          id="firmware-current-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Current firmware
        </h3>
        <div className="rounded-card border border-border bg-card px-5 py-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-1">
              Installed version
            </div>
            <div className="font-mono text-[22px] font-semibold text-foreground">
              {CURRENT_FIRMWARE}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 font-mono text-[10px] text-success">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success" />
            Up to date
          </span>
        </div>
      </section>

      {/* Update available */}
      <section aria-labelledby="firmware-update-heading">
        <h3
          id="firmware-update-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Available update
        </h3>
        <div className="rounded-card border border-border bg-card px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              New version
            </div>
            <div className="font-mono text-[18px] font-semibold text-foreground">
              {AVAILABLE_FIRMWARE}
            </div>
            <p className="font-body text-[12px] text-muted-foreground leading-relaxed max-w-sm">
              Adds OCPP 2.0.1 support, improves boot time by 40%, and fixes a rare session hang on DC ports. Recommended for all stations running v4.1.x.
            </p>
          </div>
          {pushState === "done" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1.5 font-mono text-[11px] text-success shrink-0">
              Update queued
            </span>
          ) : (
            <button
              type="button"
              aria-busy={pushState === "pushing"}
              disabled={pushState === "pushing"}
              onClick={handlePush}
              className="flex items-center gap-1.5 rounded-btn bg-primary px-3.5 py-2 font-body text-[12px] font-medium text-white hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 ease-out cursor-pointer shrink-0"
            >
              {pushState === "pushing" ? "Pushing..." : "Push update"}
            </button>
          )}
        </div>
      </section>

      {/* Rollout history */}
      <section aria-labelledby="firmware-history-heading">
        <h3
          id="firmware-history-heading"
          className="font-body text-[13px] font-semibold text-foreground mb-3"
        >
          Rollout history
        </h3>
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full" aria-label={`Firmware rollout history for station ${stationId}`}>
              <caption className="sr-only">History of firmware updates for this station</caption>
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["Version", "Pushed on", "Pushed by", "Result"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      aria-sort={undefined}
                      className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FIRMWARE_ROLLOUT_HISTORY.map((row) => (
                  <tr
                    key={row.version}
                    className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                  >
                    <td className="px-4 py-3 font-mono text-[12px] text-foreground font-medium">
                      {row.version}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                      {row.pushedAt}
                    </td>
                    <td className="px-4 py-3 font-body text-[12px] text-muted-foreground">
                      {row.pushedBy}
                    </td>
                    <td className="px-4 py-3">
                      <FirmwareResultPill result={row.result} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Station detail page ──────────────────────────────────────────────────────

export default function StationDetail() {
  const { stationId } = useParams<{ stationId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get("tab") as TabId | null) ?? "overview";

  const station = stationId ? getStation(stationId) : undefined;

  const setTab = (tab: TabId) => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", tab);
    setSearchParams(next, { replace: true });
  };

  if (!station) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          to="/stations"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Stations
        </Link>
        <div
          role="alert"
          className="flex items-center justify-center rounded-card border border-border bg-card p-12"
        >
          <p className="font-body text-body text-muted-foreground">
            Station{" "}
            <span className="font-mono text-foreground">{stationId}</span>{" "}
            not found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          to="/stations"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Stations
        </Link>
        <span aria-hidden="true" className="font-mono text-[10px] text-muted-foreground">
          /
        </span>
        <span className="font-mono text-[11px] text-foreground">
          {station.id}
        </span>
      </nav>

      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Station sections"
        className="flex items-center gap-0 border-b border-border"
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`station-tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`station-tabpanel-${tab.id}`}
              onClick={() => setTab(tab.id)}
              className={`px-4 py-2.5 font-body text-[13px] border-b-2 transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                active
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={`station-tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`station-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {activeTab === tab.id && (
            <>
              {tab.id === "overview" && (
                <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
                  <StationDetailPanel station={station} />
                </div>
              )}
              {tab.id === "sessions" && stationId && (
                <SessionsTab stationId={stationId} />
              )}
              {tab.id === "maintenance" && stationId && (
                <MaintenanceTab stationId={stationId} />
              )}
              {tab.id === "firmware" && stationId && (
                <FirmwareTab stationId={stationId} />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
