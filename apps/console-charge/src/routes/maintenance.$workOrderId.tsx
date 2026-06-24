/**
 * CON.10: Work order detail
 * Route: /maintenance/:workOrderId
 *
 * Sections:
 * - Header: WO# + station link + priority + status pills
 * - Issue description + alert link
 * - Station / port + SLA clock
 * - Assigned technician + arrival time
 * - Tasks checklist
 * - Photos / attachments (stub)
 * - Time spent + parts used table
 * - Cost rollup
 * - Resolution notes textarea
 * - Status transition sticky footer
 */

import * as React from "react";
import { useParams, Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Plus,
  Wrench,
} from "lucide-react";
import { cn } from "@gridpower/ui";

import {
  getWorkOrder,
  type WOStatus,
  type WorkOrder,
  type PartUsed,
  type WOTask,
} from "~/mocks/maintenance";

// ─── Status / Priority pill helpers ──────────────────────────────────────────

function PriorityPill({ priority }: { priority: WorkOrder["priority"] }) {
  const styles = {
    P1: "bg-error/10 text-error",
    P2: "bg-warning/10 text-warning",
    P3: "bg-info/10 text-info",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-pill px-2.5 py-1 font-mono text-[11px] font-medium", styles[priority])}>
      {priority}
    </span>
  );
}

function StatusPill({ status }: { status: WOStatus }) {
  const styles: Record<WOStatus, string> = {
    open: "bg-info/10 text-info",
    assigned: "bg-info/10 text-info",
    "in-progress": "bg-warning/10 text-warning",
    "awaiting-parts": "bg-warning/10 text-warning",
    completed: "bg-success/10 text-success",
    cancelled: "bg-muted text-muted-foreground",
  };
  const labels: Record<WOStatus, string> = {
    open: "Open",
    assigned: "Assigned",
    "in-progress": "In progress",
    "awaiting-parts": "Awaiting parts",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return (
    <span className={cn("inline-flex items-center rounded-pill px-2.5 py-1 font-body text-[11px] font-medium", styles[status])}>
      {labels[status]}
    </span>
  );
}

// ─── SLA clock ────────────────────────────────────────────────────────────────

/**
 * Show time remaining (or overdue) relative to scheduled date/time.
 * SLA thresholds: P1 = 4h, P2 = 24h, P3 = 72h.
 */
function SLAClock({ wo }: { wo: WorkOrder }) {
  const slaHours = wo.priority === "P1" ? 4 : wo.priority === "P2" ? 24 : 72;
  const scheduledMs = new Date(wo.scheduledAt).getTime();
  const slaDeadlineMs = new Date(wo.createdAt).getTime() + slaHours * 60 * 60 * 1000;
  const now = Date.now();
  const remainingMs = slaDeadlineMs - now;

  if (wo.status === "completed" || wo.status === "cancelled") {
    return (
      <div className="flex items-center gap-1.5 font-mono text-[11px] text-success">
        <CheckCircle2 size={12} aria-hidden="true" />
        SLA closed
      </div>
    );
  }

  const overdue = remainingMs < 0;
  const absMs = Math.abs(remainingMs);
  const hours = Math.floor(absMs / (1000 * 60 * 60));
  const minutes = Math.floor((absMs % (1000 * 60 * 60)) / (1000 * 60));
  const label = overdue
    ? `Overdue by ${hours}h ${minutes}m`
    : `${hours}h ${minutes}m until SLA`;

  const color = overdue
    ? "text-error"
    : remainingMs < 2 * 60 * 60 * 1000
      ? "text-warning"
      : "text-success";

  return (
    <div className={cn("flex items-center gap-1.5 font-mono text-[11px]", color)}>
      <Clock size={12} aria-hidden="true" />
      {label}
      <span className="text-muted-foreground text-[10px]">
        (SLA: {slaHours}h for {wo.priority})
      </span>
    </div>
  );
}

// ─── Tasks checklist ──────────────────────────────────────────────────────────

function TaskChecklist({
  tasks,
  onToggle,
}: {
  tasks: WOTask[];
  onToggle: (id: string, done: boolean) => void;
}) {
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-body text-[11px] text-muted-foreground">
          {doneCount} of {tasks.length} completed
        </span>
        <div
          role="progressbar"
          aria-valuenow={Math.round((doneCount / tasks.length) * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Task completion"
          className="h-1 w-24 overflow-hidden rounded-pill bg-muted"
        >
          <div
            className="h-full rounded-pill bg-success transition-all"
            style={{ width: `${(doneCount / tasks.length) * 100}%` }}
          />
        </div>
      </div>
      <ul className="flex flex-col gap-1.5" role="list">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.done}
              onChange={(e) => onToggle(task.id, e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 shrink-0 cursor-pointer rounded-[3px] border border-border bg-transparent accent-primary"
            />
            <label
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-body text-[12px] cursor-pointer select-none",
                task.done ? "line-through text-muted-foreground" : "text-foreground",
              )}
            >
              {task.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Parts table ──────────────────────────────────────────────────────────────

function PartsTable({ parts }: { parts: PartUsed[] }) {
  if (parts.length === 0) {
    return (
      <p className="font-body text-[12px] text-muted-foreground">No parts recorded yet.</p>
    );
  }

  const total = parts.reduce((sum, p) => sum + p.qty * p.unitCost, 0);

  return (
    <div className="overflow-x-auto rounded-card border border-border">
      <table className="min-w-full" aria-label="Parts used">
        <caption className="sr-only">Parts used on this work order</caption>
        <thead>
          <tr className="border-b border-border bg-muted">
            <th scope="col" className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Part
            </th>
            <th scope="col" className="px-3 py-2 text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-12">
              Qty
            </th>
            <th scope="col" className="px-3 py-2 text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-24">
              Unit cost
            </th>
            <th scope="col" className="px-3 py-2 text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground w-24">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          {parts.map((p, i) => (
            <tr key={i} className="border-b border-border last:border-0">
              <td className="px-3 py-2 font-body text-[12px] text-foreground">{p.name}</td>
              <td className="px-3 py-2 text-right font-mono text-[11px] text-foreground">{p.qty}</td>
              <td className="px-3 py-2 text-right font-mono text-[11px] text-muted-foreground">
                {"₹"}{p.unitCost.toLocaleString("en-IN")}
              </td>
              <td className="px-3 py-2 text-right font-mono text-[11px] font-medium text-foreground">
                {"₹"}{(p.qty * p.unitCost).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-border bg-muted">
            <td colSpan={3} className="px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-right">
              Parts total
            </td>
            <td className="px-3 py-2 text-right font-mono text-[12px] font-semibold text-foreground">
              {"₹"}{total.toLocaleString("en-IN")}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Status transition ────────────────────────────────────────────────────────

const STATUS_TRANSITIONS: Record<WOStatus, WOStatus[]> = {
  open: ["assigned"],
  assigned: ["in-progress"],
  "in-progress": ["awaiting-parts", "completed"],
  "awaiting-parts": ["in-progress", "completed"],
  completed: [],
  cancelled: [],
};

const TRANSITION_LABELS: Record<WOStatus, string> = {
  open: "Open",
  assigned: "Mark assigned",
  "in-progress": "Start work",
  "awaiting-parts": "Awaiting parts",
  completed: "Mark completed",
  cancelled: "Cancel",
};

function StatusTransitionBar({
  currentStatus,
  onTransition,
  isSaving,
}: {
  currentStatus: WOStatus;
  onTransition: (next: WOStatus) => void;
  isSaving: boolean;
}) {
  const next = STATUS_TRANSITIONS[currentStatus];

  if (next.length === 0) {
    return (
      <div className="sticky bottom-0 z-10 flex items-center gap-3 border-t border-border bg-card px-6 py-3">
        <CheckCircle2 size={14} className="text-success" aria-hidden="true" />
        <span className="font-body text-[13px] text-muted-foreground">
          This work order is {currentStatus}. No further actions available.
        </span>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 border-t border-border bg-card px-6 py-3">
      <span className="font-mono text-[11px] text-muted-foreground">Transition:</span>
      {next.map((status) => {
        const isPrimary = status === "completed" || status === "in-progress";
        return (
          <button
            key={status}
            type="button"
            onClick={() => onTransition(status)}
            disabled={isSaving}
            aria-busy={isSaving}
            aria-label={TRANSITION_LABELS[status]}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-btn px-4 py-2 font-body text-[12px] font-medium transition-colors duration-150 ease-out cursor-pointer disabled:opacity-50",
              isPrimary
                ? "bg-primary text-white hover:bg-primary/90"
                : "border border-border bg-transparent text-foreground hover:bg-muted",
            )}
          >
            {isSaving ? (
              <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" aria-hidden="true" />
            ) : null}
            {TRANSITION_LABELS[status]}
          </button>
        );
      })}
      {currentStatus !== "cancelled" && (
        <button
          type="button"
          onClick={() => onTransition("cancelled")}
          disabled={isSaving}
          className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-error/50 bg-transparent px-3 py-1.5 font-body text-[12px] text-error hover:bg-error/10 transition-colors duration-150 ease-out cursor-pointer disabled:opacity-50"
        >
          Cancel WO
        </button>
      )}
    </div>
  );
}

// ─── InlineNotice ─────────────────────────────────────────────────────────────

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
      className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px] shadow-sm"
    >
      {message}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WorkOrderDetail() {
  const { workOrderId } = useParams<{ workOrderId: string }>();
  const workOrder = workOrderId ? getWorkOrder(workOrderId) : undefined;

  // Mutable local state (in a real app these would be server mutations)
  const [status, setStatus] = React.useState<WOStatus>(workOrder?.status ?? "open");
  const [tasks, setTasks] = React.useState<WOTask[]>(workOrder?.tasks ?? []);
  const [timeSpent, setTimeSpent] = React.useState(
    workOrder?.timeSpentMinutes?.toString() ?? "",
  );
  const [resolutionNotes, setResolutionNotes] = React.useState(
    workOrder?.resolutionNotes ?? "",
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);

  const handleTaskToggle = React.useCallback((id: string, done: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done } : t)),
    );
  }, []);

  const handleTransition = React.useCallback((next: WOStatus) => {
    setIsSaving(true);
    // Simulated async save; wire to API mutation when ready.
    setTimeout(() => {
      setStatus(next);
      setIsSaving(false);
      setNotice(`Status updated to "${next}".`);
    }, 600);
  }, []);

  // 404 state
  if (!workOrder) {
    return (
      <section className="flex flex-col gap-4 p-6" aria-labelledby="wo-not-found">
        <h2 id="wo-not-found" className="font-display text-[22px] font-semibold text-foreground">
          Work order not found
        </h2>
        <p className="font-body text-[13px] text-muted-foreground">
          No work order with ID "{workOrderId}" exists. It may have been deleted or the link is incorrect.
        </p>
        <Link
          to="/maintenance"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-primary hover:underline"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to maintenance
        </Link>
      </section>
    );
  }

  const wo = workOrder;
  const partsCost = wo.partsUsed.reduce((s, p) => s + p.qty * p.unitCost, 0);
  const totalCost = partsCost + (wo.labourCost ?? 0);

  return (
    <div className="flex flex-col gap-0 pb-16">
      {/* ── Toast notice ──────────────────────────────────────────────────── */}
      {notice && (
        <div className="fixed top-4 right-4 z-50">
          <InlineNotice message={notice} onDismiss={() => setNotice(null)} />
        </div>
      )}

      {/* ── Back link ─────────────────────────────────────────────────────── */}
      <div className="px-6 pt-2 pb-1">
        <Link
          to="/maintenance"
          className="inline-flex items-center gap-1 font-body text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Maintenance
        </Link>
      </div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="border-b border-border px-6 pb-4 pt-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-[22px] font-semibold text-foreground">
                {wo.number}
              </h2>
              <PriorityPill priority={wo.priority} />
              <StatusPill status={status} />
            </div>
            <p className="font-body text-[14px] text-foreground">
              {wo.issueSummary}
            </p>
            <div className="flex flex-wrap items-center gap-3 font-body text-[12px] text-muted-foreground">
              <Link
                to={`/stations/${wo.stationId}`}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                {wo.stationName}
                <ExternalLink size={10} aria-hidden="true" />
              </Link>
              {wo.portLabel && (
                <span>{wo.portLabel}</span>
              )}
              {wo.alertId && (
                <Link
                  to={`/alerts/${wo.alertId}`}
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  Alert {wo.alertId}
                  <ExternalLink size={10} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 text-right shrink-0">
            <SLAClock wo={{ ...wo, status }} />
            <span className="font-mono text-[11px] text-muted-foreground">
              Created {wo.createdAt}
            </span>
            <span className="font-mono text-[11px] text-foreground">
              Scheduled {wo.scheduledAt}
            </span>
          </div>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="grid gap-6 px-6 pt-6 lg:grid-cols-[1fr_280px]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Issue description */}
          <section aria-labelledby="issue-desc-heading">
            <h3 id="issue-desc-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Issue description
            </h3>
            <div className="rounded-card border border-border bg-card p-4">
              <p className="font-body text-[13px] text-foreground leading-relaxed">
                {wo.issueDetail}
              </p>
              {wo.alertId && (
                <div className="mt-3 flex items-center gap-2 rounded border border-warning/30 bg-warning/5 px-3 py-2">
                  <AlertTriangle size={12} className="text-warning shrink-0" aria-hidden="true" />
                  <span className="font-body text-[11px] text-foreground">
                    Related alert:{" "}
                    <Link to={`/alerts/${wo.alertId}`} className="text-primary hover:underline">
                      {wo.alertId}
                    </Link>
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Tasks checklist */}
          <section aria-labelledby="tasks-heading">
            <h3 id="tasks-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Tasks
            </h3>
            <div className="rounded-card border border-border bg-card p-4">
              <TaskChecklist tasks={tasks} onToggle={handleTaskToggle} />
            </div>
          </section>

          {/* Photos / attachments */}
          <section aria-labelledby="photos-heading">
            <h3 id="photos-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Photos / attachments
            </h3>
            <div className="rounded-card border border-border bg-card p-4">
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {/* Photo stubs */}
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="aspect-square rounded-img bg-muted flex flex-col items-center justify-center gap-1"
                    aria-label={`Photo placeholder ${n}`}
                  >
                    <Camera size={16} className="text-muted-foreground" aria-hidden="true" />
                    <span className="font-mono text-[9px] text-muted-foreground">IMG_{n.toString().padStart(3, "0")}</span>
                  </div>
                ))}
                {/* Upload stub */}
                <button
                  type="button"
                  className="aspect-square rounded-img border border-dashed border-border bg-transparent flex flex-col items-center justify-center gap-1.5 hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                  aria-label="Upload photo"
                  onClick={() => console.log("Upload photo (stub)")}
                >
                  <Plus size={14} className="text-muted-foreground" aria-hidden="true" />
                  <span className="font-mono text-[9px] text-muted-foreground">Upload</span>
                </button>
              </div>
            </div>
          </section>

          {/* Time spent */}
          <section aria-labelledby="time-heading">
            <h3 id="time-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Time spent
            </h3>
            <div className="rounded-card border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <label htmlFor="time-spent" className="font-body text-[12px] text-muted-foreground whitespace-nowrap">
                  Minutes on-site
                </label>
                <input
                  id="time-spent"
                  type="number"
                  min={0}
                  step={15}
                  value={timeSpent}
                  onChange={(e) => setTimeSpent(e.target.value)}
                  placeholder="0"
                  aria-required="false"
                  className={cn(
                    "w-24 h-8 rounded-input border border-border bg-muted px-3 font-mono text-[12px] text-foreground outline-none",
                    "focus:border-primary focus:ring-1 focus:ring-primary/20",
                    "transition-[box-shadow,border-color] duration-150 ease-out",
                  )}
                />
                {timeSpent && (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    = {Math.floor(parseInt(timeSpent, 10) / 60)}h {parseInt(timeSpent, 10) % 60}m
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Parts used */}
          <section aria-labelledby="parts-heading">
            <h3 id="parts-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Parts used
            </h3>
            <PartsTable parts={wo.partsUsed} />
          </section>

          {/* Resolution notes */}
          <section aria-labelledby="notes-heading">
            <h3 id="notes-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Resolution notes
            </h3>
            <div className="rounded-card border border-border bg-card p-4">
              <label htmlFor="resolution-notes" className="sr-only">
                Resolution notes
              </label>
              <textarea
                id="resolution-notes"
                rows={4}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Describe what was done, root cause identified, and any follow-up actions required."
                aria-required="false"
                className={cn(
                  "w-full rounded-input border border-border bg-muted px-3 py-2 font-body text-[12px] text-foreground resize-y outline-none",
                  "placeholder:text-muted-foreground",
                  "focus:border-primary focus:ring-1 focus:ring-primary/20",
                  "transition-[box-shadow,border-color] duration-150 ease-out",
                )}
              />
            </div>
          </section>
        </div>

        {/* Right column: summary sidebar */}
        <aside className="flex flex-col gap-4">
          {/* Station info */}
          <section aria-labelledby="station-info-heading">
            <h3 id="station-info-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Station
            </h3>
            <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-2">
              <Link
                to={`/stations/${wo.stationId}`}
                className="font-body text-[13px] font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                {wo.stationName}
                <ExternalLink size={10} aria-hidden="true" />
              </Link>
              <span className="font-body text-[12px] text-muted-foreground">{wo.stationCity}</span>
              {wo.portLabel && (
                <div className="flex items-center gap-1.5 font-body text-[11px] text-foreground">
                  <Wrench size={11} className="text-muted-foreground" aria-hidden="true" />
                  {wo.portLabel}
                </div>
              )}
            </div>
          </section>

          {/* Technician */}
          <section aria-labelledby="tech-heading">
            <h3 id="tech-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Technician
            </h3>
            <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-2">
              {wo.assignedTech ? (
                <>
                  <div className="flex items-center gap-2">
                    <div
                      aria-hidden="true"
                      className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white font-body text-[10px] font-semibold shrink-0"
                    >
                      {wo.assignedTech.charAt(0)}
                    </div>
                    <span className="font-body text-[13px] font-medium text-foreground">
                      {wo.assignedTech}
                    </span>
                  </div>
                  {wo.techPhone && (
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                      <Phone size={10} aria-hidden="true" />
                      {wo.techPhone}
                    </div>
                  )}
                  {wo.arrivedAt && (
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-foreground">
                      <MapPin size={10} className="text-success" aria-hidden="true" />
                      Arrived {wo.arrivedAt.slice(11)}
                    </div>
                  )}
                </>
              ) : (
                <span className="font-body text-[12px] text-muted-foreground">
                  Unassigned. Create a work order to assign a technician.
                </span>
              )}
            </div>
          </section>

          {/* Cost rollup */}
          <section aria-labelledby="cost-heading">
            <h3 id="cost-heading" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Cost summary
            </h3>
            <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between font-body text-[12px]">
                <span className="text-muted-foreground">Parts</span>
                <span className="font-mono text-foreground">
                  {"₹"}{partsCost.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between font-body text-[12px]">
                <span className="text-muted-foreground">Labour</span>
                <span className="font-mono text-foreground">
                  {"₹"}{(wo.labourCost ?? 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between border-t border-border pt-2">
                <span className="font-body text-[12px] font-semibold text-foreground">Total</span>
                <span className="font-mono text-[13px] font-semibold text-foreground">
                  {"₹"}{totalCost.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </section>
        </aside>
      </div>

      {/* ── Status transition bar (sticky footer) ─────────────────────────── */}
      <StatusTransitionBar
        currentStatus={status}
        onTransition={handleTransition}
        isSaving={isSaving}
      />
    </div>
  );
}
