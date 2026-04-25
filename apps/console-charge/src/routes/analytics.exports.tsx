/**
 * CON.ANALYTICS.EXPORTS: Scheduled exports management
 * Route: /analytics/exports
 *
 * - Table of 8 scheduled exports
 * - Per-row actions: Pause / Run now / Edit / Delete
 * - "Schedule a recurring export" CTA top-right
 */

import * as React from "react";
import {
  Play,
  Pause,
  Pencil,
  Trash2,
  Plus,
  AlertCircle,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ExportFrequency = "daily" | "weekly" | "monthly";
type ExportFormat = "CSV" | "Excel" | "JSON";
type ExportStatus = "active" | "paused" | "error";

interface ScheduledExport {
  id: string;
  name: string;
  frequency: ExportFrequency;
  format: ExportFormat;
  filtersSummary: string;
  recipients: string[];
  lastRun: string | null;
  nextRun: string;
  status: ExportStatus;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const SCHEDULED_EXPORTS: ScheduledExport[] = [
  {
    id: "EXP-001",
    name: "Daily session report",
    frequency: "daily",
    format: "CSV",
    filtersSummary: "All stations, completed sessions",
    recipients: ["ops@example.com", "finance@example.com"],
    lastRun: "Today, 06:00",
    nextRun: "Tomorrow, 06:00",
    status: "active",
  },
  {
    id: "EXP-002",
    name: "Weekly revenue summary",
    frequency: "weekly",
    format: "Excel",
    filtersSummary: "Revenue by station, Mon-Sun",
    recipients: ["cfo@example.com"],
    lastRun: "Monday, 08:00",
    nextRun: "Next Monday, 08:00",
    status: "active",
  },
  {
    id: "EXP-003",
    name: "Fleet billing extract",
    frequency: "monthly",
    format: "CSV",
    filtersSummary: "Fleet accounts only, with GST",
    recipients: ["billing@example.com", "accounts@example.com"],
    lastRun: "1 April 2025",
    nextRun: "1 May 2025",
    status: "active",
  },
  {
    id: "EXP-004",
    name: "Driver activity log",
    frequency: "weekly",
    format: "JSON",
    filtersSummary: "All drivers, sessions + RFID events",
    recipients: ["security@example.com"],
    lastRun: "Sunday, 23:59",
    nextRun: "Next Sunday, 23:59",
    status: "paused",
  },
  {
    id: "EXP-005",
    name: "Uptime compliance report",
    frequency: "monthly",
    format: "Excel",
    filtersSummary: "Station uptime, SLA threshold 98%",
    recipients: ["noc@example.com", "ops@example.com"],
    lastRun: "1 April 2025",
    nextRun: "1 May 2025",
    status: "active",
  },
  {
    id: "EXP-006",
    name: "Energy throughput dump",
    frequency: "daily",
    format: "CSV",
    filtersSummary: "All ports, kWh per session",
    recipients: ["data@example.com"],
    lastRun: null,
    nextRun: "Tomorrow, 00:00",
    status: "error",
  },
  {
    id: "EXP-007",
    name: "OCPI roaming sessions",
    frequency: "weekly",
    format: "JSON",
    filtersSummary: "Roaming CDRs from partner networks",
    recipients: ["partnerships@example.com"],
    lastRun: "Last Friday, 09:00",
    nextRun: "This Friday, 09:00",
    status: "active",
  },
  {
    id: "EXP-008",
    name: "MoP quarterly data",
    frequency: "monthly",
    format: "CSV",
    filtersSummary: "Ministry of Power format, all stations",
    recipients: ["compliance@example.com"],
    lastRun: "1 April 2025",
    nextRun: "1 July 2025",
    status: "active",
  },
];

// ─── Inline notice (replaces alert()) ─────────────────────────────────────────

function InlineNotice({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-label shadow-sm"
    >
      {message}
    </div>
  );
}

// ─── Status pill ──────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ExportStatus }) {
  const styles: Record<ExportStatus, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
    active: {
      bg: "bg-success/10",
      text: "text-success",
      icon: <CheckCircle2 size={11} aria-hidden="true" />,
      label: "Active",
    },
    paused: {
      bg: "bg-warning/10",
      text: "text-warning",
      icon: <Clock size={11} aria-hidden="true" />,
      label: "Paused",
    },
    error: {
      bg: "bg-error/10",
      text: "text-error",
      icon: <XCircle size={11} aria-hidden="true" />,
      label: "Error",
    },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${s.bg} ${s.text}`}>
      {s.icon}
      {s.label}
    </span>
  );
}

// ─── Frequency badge ──────────────────────────────────────────────────────────

function FrequencyBadge({ freq }: { freq: ExportFrequency }) {
  const labels: Record<ExportFrequency, string> = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
  };
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
      <Calendar size={10} aria-hidden="true" />
      {labels[freq]}
    </span>
  );
}

// ─── Exports page ─────────────────────────────────────────────────────────────

export default function AnalyticsExports() {
  const [exports, setExports] = React.useState<ScheduledExport[]>(SCHEDULED_EXPORTS);
  const [notice, setNotice] = React.useState<string | null>(null);

  const dismiss = React.useCallback(() => setNotice(null), []);

  const handlePause = (id: string) => {
    setExports((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "paused" ? "active" : "paused" }
          : e
      )
    );
    const ex = exports.find((e) => e.id === id);
    if (ex) {
      setNotice(ex.status === "paused" ? `${ex.name} resumed.` : `${ex.name} paused.`);
    }
  };

  const handleRunNow = (id: string) => {
    const ex = exports.find((e) => e.id === id);
    if (ex) {
      setNotice(`${ex.name} queued to run now.`);
    }
  };

  const handleDelete = (id: string) => {
    const ex = exports.find((e) => e.id === id);
    setExports((prev) => prev.filter((e) => e.id !== id));
    if (ex) setNotice(`${ex.name} deleted.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className="sr-only">Scheduled exports</h2>

      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="font-body text-[16px] font-semibold text-foreground">
            Scheduled exports
          </h2>
          <p className="font-mono text-[11px] text-muted-foreground mt-0.5">
            {exports.filter((e) => e.status === "active").length} active · {exports.length} total
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-btn bg-primary px-3.5 py-2 font-body text-[12px] font-medium text-white hover:bg-primary/90 transition-colors duration-150 ease-out cursor-pointer self-start sm:self-auto"
          onClick={() => setNotice("Schedule export dialog coming soon.")}
        >
          <Plus size={13} aria-hidden="true" />
          Schedule recurring export
        </button>
      </div>

      {notice && <InlineNotice message={notice} onDismiss={dismiss} />}

      {/* Exports table */}
      <section aria-labelledby="exports-table-heading">
        <h3 id="exports-table-heading" className="sr-only">Scheduled export list</h3>

        {exports.length === 0 ? (
          <div className="rounded-card border border-border bg-card px-6 py-14 flex flex-col items-center text-center gap-2">
            <p className="font-body text-[14px] font-semibold text-foreground">
              No scheduled exports
            </p>
            <p className="font-body text-[13px] text-muted-foreground">
              Schedule a recurring export to automatically receive data by email.
            </p>
          </div>
        ) : (
          <div className="rounded-card border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full" aria-label="Scheduled exports">
                <caption className="sr-only">Scheduled data exports and their status</caption>
                <thead>
                  <tr className="border-b border-border bg-muted">
                    {["Name", "Frequency", "Format", "Filters", "Recipients", "Last run", "Next run", "Status", ""].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        aria-sort={undefined}
                        className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {exports.map((ex) => (
                    <tr
                      key={ex.id}
                      className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                    >
                      {/* Name */}
                      <td className="px-4 py-3 min-w-[160px]">
                        <div className="font-body text-[13px] font-medium text-foreground">
                          {ex.name}
                        </div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {ex.id}
                        </div>
                      </td>

                      {/* Frequency */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <FrequencyBadge freq={ex.frequency} />
                      </td>

                      {/* Format */}
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground">
                          {ex.format}
                        </span>
                      </td>

                      {/* Filters */}
                      <td className="px-4 py-3 max-w-[180px]">
                        <span className="font-body text-[12px] text-muted-foreground">
                          {ex.filtersSummary}
                        </span>
                      </td>

                      {/* Recipients */}
                      <td className="px-4 py-3 min-w-[140px]">
                        <div className="flex flex-col gap-0.5">
                          {ex.recipients.slice(0, 2).map((r) => (
                            <span key={r} className="font-mono text-[10px] text-muted-foreground truncate max-w-[160px]">
                              {r}
                            </span>
                          ))}
                          {ex.recipients.length > 2 && (
                            <span className="font-mono text-[10px] text-muted-foreground">
                              +{ex.recipients.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Last run */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {ex.lastRun ? (
                          <span className="font-mono text-[11px] text-muted-foreground">
                            {ex.lastRun}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] text-error">
                            <AlertCircle size={10} aria-hidden="true" />
                            Never ran
                          </span>
                        )}
                      </td>

                      {/* Next run */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`font-mono text-[11px] ${ex.status === "paused" ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {ex.nextRun}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusPill status={ex.status} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            aria-label={ex.status === "paused" ? `Resume ${ex.name}` : `Pause ${ex.name}`}
                            title={ex.status === "paused" ? "Resume" : "Pause"}
                            className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => handlePause(ex.id)}
                          >
                            {ex.status === "paused" ? (
                              <Play size={12} aria-hidden="true" />
                            ) : (
                              <Pause size={12} aria-hidden="true" />
                            )}
                          </button>
                          <button
                            type="button"
                            aria-label={`Run ${ex.name} now`}
                            title="Run now"
                            className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => handleRunNow(ex.id)}
                          >
                            <Play size={12} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Edit ${ex.name}`}
                            title="Edit"
                            className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => setNotice(`Edit dialog for ${ex.name} coming soon.`)}
                          >
                            <Pencil size={12} aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${ex.name}`}
                            title="Delete"
                            className="flex h-7 w-7 items-center justify-center rounded-btn border border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-error transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            onClick={() => handleDelete(ex.id)}
                          >
                            <Trash2 size={12} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
