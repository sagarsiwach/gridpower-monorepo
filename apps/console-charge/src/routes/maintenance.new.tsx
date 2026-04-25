/**
 * CON.10: New work order form
 * Route: /maintenance/new
 *
 * Fields:
 * - Station (select, from stations mock)
 * - Port (optional, dependent on station)
 * - Priority (P1/P2/P3 radio)
 * - Issue type (dropdown)
 * - Issue description (textarea)
 * - Scheduled date/time
 * - Assigned tech (dropdown)
 * - Photos upload (stub)
 *
 * Auto-prefills from ?alert_id=XYZ when launched from /alerts/:id
 */

import * as React from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Plus,
} from "lucide-react";
import { Input, cn } from "@gridpower/ui";

import { TECHNICIANS, type WOPriority, type IssueType } from "~/mocks/maintenance";
import { ALL_STATIONS, type Station } from "~/mocks/stations";

// ─── Shared primitives ────────────────────────────────────────────────────────

const FIELD_LABEL_CLS = "block font-body text-[11px] font-medium text-muted-foreground mb-1.5";

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={FIELD_LABEL_CLS}>
      {children}
      {required && (
        <span aria-hidden="true" className="text-error ml-0.5">
          *
        </span>
      )}
    </label>
  );
}

function FieldHint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 font-body text-[10px] text-muted-foreground">
      {children}
    </p>
  );
}

// ─── Priority radio group ─────────────────────────────────────────────────────

const PRIORITY_META: {
  value: WOPriority;
  label: string;
  sub: string;
  color: string;
}[] = [
  { value: "P1", label: "P1 Critical", sub: "4h SLA, same-day dispatch", color: "text-error" },
  { value: "P2", label: "P2 High", sub: "24h SLA", color: "text-warning" },
  { value: "P3", label: "P3 Normal", sub: "72h SLA", color: "text-info" },
];

function PriorityRadio({
  value,
  selected,
  onChange,
}: {
  value: WOPriority;
  selected: WOPriority;
  onChange: (v: WOPriority) => void;
}) {
  const meta = PRIORITY_META.find((p) => p.value === value)!;
  const isSelected = selected === value;
  return (
    <label
      htmlFor={`priority-${value}`}
      className={cn(
        "flex flex-1 cursor-pointer items-start gap-2.5 rounded-card border p-3 transition-colors duration-150 ease-out",
        isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted",
      )}
    >
      <input
        id={`priority-${value}`}
        type="radio"
        name="priority"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        aria-required="true"
        className="mt-0.5 accent-primary cursor-pointer shrink-0"
      />
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className={cn("font-mono text-[11px] font-semibold", meta.color)}>
          {meta.label}
        </span>
        <span className="font-body text-[10px] text-muted-foreground">{meta.sub}</span>
      </div>
    </label>
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

const ISSUE_TYPE_OPTIONS: { value: IssueType; label: string }[] = [
  { value: "hardware-failure", label: "Hardware failure" },
  { value: "firmware-issue", label: "Firmware issue" },
  { value: "vandalism", label: "Vandalism" },
  { value: "scheduled-service", label: "Scheduled service" },
  { value: "other", label: "Other" },
];

export default function MaintenanceNew() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefillAlertId = searchParams.get("alert_id") ?? "";

  // ── Form state ────────────────────────────────────────────────────────────
  const [stationId, setStationId] = React.useState("");
  const [portId, setPortId] = React.useState("");
  const [priority, setPriority] = React.useState<WOPriority>("P3");
  const [issueType, setIssueType] = React.useState<IssueType>("hardware-failure");
  const [issueSummary, setIssueSummary] = React.useState("");
  const [issueDetail, setIssueDetail] = React.useState("");
  const [scheduledAt, setScheduledAt] = React.useState("");
  const [assignedTech, setAssignedTech] = React.useState("");
  const [alertId] = React.useState(prefillAlertId);

  // ── Submission state ──────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  // ── Selected station ports ────────────────────────────────────────────────
  const selectedStation: Station | undefined = React.useMemo(
    () => ALL_STATIONS.find((s) => s.id === stationId),
    [stationId],
  );

  const portOptions = React.useMemo(
    () => selectedStation?.portList ?? [],
    [selectedStation],
  );

  // Reset port when station changes
  React.useEffect(() => {
    setPortId("");
  }, [stationId]);

  // ── Validation ────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!stationId) e.stationId = "Station is required.";
    if (!issueSummary.trim()) e.issueSummary = "Issue summary is required.";
    if (!scheduledAt) e.scheduledAt = "Scheduled date is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Simulated async create; wire to API when ready.
    setTimeout(() => {
      setIsSubmitting(false);
      setNotice("Work order created successfully.");
      setTimeout(() => navigate("/maintenance"), 1200);
    }, 800);
  }

  function handleCancel() {
    navigate("/maintenance");
  }

  return (
    <section className="max-w-2xl" aria-labelledby="new-wo-heading">
      {/* Toast notice */}
      {notice && (
        <div className="fixed top-4 right-4 z-50">
          <InlineNotice message={notice} onDismiss={() => setNotice(null)} />
        </div>
      )}

      {/* Back */}
      <div className="mb-4">
        <Link
          to="/maintenance"
          className="inline-flex items-center gap-1 font-body text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Maintenance
        </Link>
      </div>

      {/* Heading */}
      <h2 id="new-wo-heading" className="font-display text-[22px] font-semibold text-foreground mb-1">
        Create work order
      </h2>
      <p className="font-body text-[13px] text-muted-foreground mb-6">
        Fill in the details below. Fields marked
        {" "}
        <span aria-hidden="true" className="text-error">*</span>
        {" "}
        are required.
      </p>

      {/* Prefill notice if launched from an alert */}
      {alertId && (
        <div className="mb-5 flex items-center gap-2 rounded-card border border-info/30 bg-info/5 px-4 py-2.5">
          <CheckCircle2 size={12} className="text-info shrink-0" aria-hidden="true" />
          <span className="font-body text-[12px] text-foreground">
            Pre-linked to alert{" "}
            <Link to={`/alerts/${alertId}`} className="text-primary hover:underline">
              {alertId}
            </Link>
            .
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Create work order"
        className="flex flex-col gap-5"
      >
        {/* Station */}
        <div>
          <FieldLabel htmlFor="new-wo-station" required>
            Station
          </FieldLabel>
          <div className="relative">
            <select
              id="new-wo-station"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              aria-required="true"
              aria-describedby={errors.stationId ? "new-wo-station-err" : undefined}
              className={cn(
                "w-full h-9 appearance-none rounded-input border bg-muted pl-3 pr-8 font-body text-[13px] text-foreground cursor-pointer outline-none",
                errors.stationId ? "border-error" : "border-border",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
                "transition-[box-shadow,border-color] duration-150 ease-out",
              )}
            >
              <option value="">Select a station...</option>
              {ALL_STATIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.city})
                </option>
              ))}
            </select>
          </div>
          {errors.stationId && (
            <p id="new-wo-station-err" role="alert" className="mt-1 font-body text-[11px] text-error">
              {errors.stationId}
            </p>
          )}
        </div>

        {/* Port (optional, depends on station) */}
        <div>
          <FieldLabel htmlFor="new-wo-port">
            Port (optional)
          </FieldLabel>
          <div className="relative">
            <select
              id="new-wo-port"
              value={portId}
              onChange={(e) => setPortId(e.target.value)}
              disabled={!selectedStation}
              aria-required="false"
              aria-describedby="new-wo-port-hint"
              className={cn(
                "w-full h-9 appearance-none rounded-input border border-border bg-muted pl-3 pr-8 font-body text-[13px] text-foreground cursor-pointer outline-none",
                !selectedStation && "opacity-50 cursor-not-allowed",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
                "transition-[box-shadow,border-color] duration-150 ease-out",
              )}
            >
              <option value="">All ports / station-wide</option>
              {portOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  Port {p.number} ({p.type})
                </option>
              ))}
            </select>
          </div>
          <FieldHint id="new-wo-port-hint">
            Leave blank if the issue affects the entire station.
          </FieldHint>
        </div>

        {/* Priority */}
        <fieldset>
          <legend className={FIELD_LABEL_CLS}>
            Priority
            <span aria-hidden="true" className="text-error ml-0.5">*</span>
          </legend>
          <div className="flex flex-col gap-2 sm:flex-row">
            {PRIORITY_META.map((p) => (
              <PriorityRadio
                key={p.value}
                value={p.value}
                selected={priority}
                onChange={setPriority}
              />
            ))}
          </div>
        </fieldset>

        {/* Issue type */}
        <div>
          <FieldLabel htmlFor="new-wo-issue-type" required>
            Issue type
          </FieldLabel>
          <div className="relative">
            <select
              id="new-wo-issue-type"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as IssueType)}
              aria-required="true"
              className={cn(
                "w-full h-9 appearance-none rounded-input border border-border bg-muted pl-3 pr-8 font-body text-[13px] text-foreground cursor-pointer outline-none",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
                "transition-[box-shadow,border-color] duration-150 ease-out",
              )}
            >
              {ISSUE_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Issue summary */}
        <div>
          <FieldLabel htmlFor="new-wo-summary" required>
            Issue summary
          </FieldLabel>
          <Input
            id="new-wo-summary"
            type="text"
            value={issueSummary}
            onChange={(e) => setIssueSummary(e.target.value)}
            placeholder="Short description, e.g. AC contactor failed on port 2"
            aria-required="true"
            aria-describedby={errors.issueSummary ? "new-wo-summary-err" : "new-wo-summary-hint"}
            className={errors.issueSummary ? "border-error" : undefined}
            maxLength={120}
          />
          {errors.issueSummary ? (
            <p id="new-wo-summary-err" role="alert" className="mt-1 font-body text-[11px] text-error">
              {errors.issueSummary}
            </p>
          ) : (
            <FieldHint id="new-wo-summary-hint">Keep it under 120 characters.</FieldHint>
          )}
        </div>

        {/* Issue detail */}
        <div>
          <FieldLabel htmlFor="new-wo-detail">
            Issue detail
          </FieldLabel>
          <label htmlFor="new-wo-detail" className="sr-only">
            Issue detail (optional)
          </label>
          <textarea
            id="new-wo-detail"
            rows={4}
            value={issueDetail}
            onChange={(e) => setIssueDetail(e.target.value)}
            placeholder="Full description including any error codes, driver reports, or OCPP faults observed."
            aria-required="false"
            aria-describedby="new-wo-detail-hint"
            className={cn(
              "w-full rounded-input border border-border bg-muted px-3 py-2 font-body text-[13px] text-foreground resize-y outline-none",
              "placeholder:text-muted-foreground",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-[box-shadow,border-color] duration-150 ease-out",
            )}
          />
          <FieldHint id="new-wo-detail-hint">
            Include OCPP error codes, driver feedback, or any related alert IDs.
          </FieldHint>
        </div>

        {/* Scheduled date/time */}
        <div>
          <FieldLabel htmlFor="new-wo-scheduled" required>
            Scheduled date / time
          </FieldLabel>
          <input
            id="new-wo-scheduled"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            aria-required="true"
            aria-describedby={errors.scheduledAt ? "new-wo-scheduled-err" : undefined}
            className={cn(
              "w-full h-9 rounded-input border bg-muted px-3 font-body text-[13px] text-foreground cursor-pointer outline-none",
              errors.scheduledAt ? "border-error" : "border-border",
              "focus:border-primary focus:ring-1 focus:ring-primary/20",
              "transition-[box-shadow,border-color] duration-150 ease-out",
            )}
          />
          {errors.scheduledAt && (
            <p id="new-wo-scheduled-err" role="alert" className="mt-1 font-body text-[11px] text-error">
              {errors.scheduledAt}
            </p>
          )}
        </div>

        {/* Assigned tech */}
        <div>
          <FieldLabel htmlFor="new-wo-tech">
            Assigned technician
          </FieldLabel>
          <div className="relative">
            <select
              id="new-wo-tech"
              value={assignedTech}
              onChange={(e) => setAssignedTech(e.target.value)}
              aria-required="false"
              aria-describedby="new-wo-tech-hint"
              className={cn(
                "w-full h-9 appearance-none rounded-input border border-border bg-muted pl-3 pr-8 font-body text-[13px] text-foreground cursor-pointer outline-none",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
                "transition-[box-shadow,border-color] duration-150 ease-out",
              )}
            >
              <option value="">Unassigned</option>
              {TECHNICIANS.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name} ({t.zone})
                </option>
              ))}
            </select>
          </div>
          <FieldHint id="new-wo-tech-hint">
            Leave unassigned to assign later.
          </FieldHint>
        </div>

        {/* Photos upload (stub) */}
        <div>
          <div className={FIELD_LABEL_CLS}>
            Photos / attachments (optional)
          </div>
          <div
            role="group"
            aria-label="Photo upload area"
            className="grid grid-cols-4 gap-2"
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-square rounded-img bg-muted flex flex-col items-center justify-center gap-1"
                aria-label={`Photo slot ${n} (empty)`}
              >
                <Camera size={14} className="text-muted-foreground" aria-hidden="true" />
              </div>
            ))}
            <button
              type="button"
              className="aspect-square rounded-img border border-dashed border-border bg-transparent flex flex-col items-center justify-center gap-1.5 hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
              aria-label="Add photos"
              onClick={() => console.log("Photo upload (stub)")}
            >
              <Plus size={13} className="text-muted-foreground" aria-hidden="true" />
              <span className="font-mono text-[9px] text-muted-foreground">Add photo</span>
            </button>
          </div>
        </div>

        {/* Submit / Cancel */}
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-btn bg-primary text-white px-5 py-2 font-body text-[13px] font-medium transition-colors duration-150 ease-out cursor-pointer",
              "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {isSubmitting ? (
              <>
                <span
                  className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin"
                  aria-hidden="true"
                />
                Creating...
              </>
            ) : (
              <>
                <Plus size={13} aria-hidden="true" />
                Create work order
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center rounded-btn border border-border bg-transparent px-5 py-2 font-body text-[13px] text-foreground hover:bg-muted transition-colors duration-150 ease-out cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
