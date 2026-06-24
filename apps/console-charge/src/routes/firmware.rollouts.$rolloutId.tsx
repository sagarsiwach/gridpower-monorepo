/**
 * FW.4: Rollout detail
 * Route: /firmware/rollouts/:rolloutId
 *
 * Sections:
 * - Header: name, version, status pill, start date
 * - Batch + ramp config (read-only)
 * - Success criteria + current metrics
 * - Target station table: station, current version, target, status, last attempt
 * - Failure log (if any)
 * - Sticky bottom controls: Pause / Abort / Accelerate (active), Resume (paused)
 */

import * as React from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Pause,
  Play,
  RefreshCw,
  XCircle,
  Zap,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  cn,
} from "@gridpower/ui";
import { ROLLOUTS, type StationUpdateStatus, type RolloutStatus } from "~/mocks/firmware";

// ─── Types ────────────────────────────────────────────────────────────────────

type NoticeKind = "success" | "error" | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ─── Status pills ─────────────────────────────────────────────────────────────

function RolloutStatusPill({ status }: { status: RolloutStatus }) {
  const map: Record<RolloutStatus, string> = {
    active: "bg-success/10 text-success",
    paused: "bg-warning/10 text-warning",
    completed: "bg-muted text-muted-foreground",
    failed: "bg-error/10 text-error",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em]",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

const STATION_STATUS_MAP: Record<
  StationUpdateStatus,
  { label: string; cls: string }
> = {
  pending: { label: "Pending", cls: "bg-muted text-muted-foreground" },
  pushed: { label: "Pushed", cls: "bg-info/10 text-info" },
  installed: { label: "Installed", cls: "bg-success/10 text-success" },
  failed: { label: "Failed", cls: "bg-error/10 text-error" },
  "rolled-back": { label: "Rolled back", cls: "bg-warning/10 text-warning" },
};

function StationStatusPill({ status }: { status: StationUpdateStatus }) {
  const { label, cls } = STATION_STATUS_MAP[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]",
        cls,
      )}
    >
      {label}
    </span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ pct, status }: { pct: number; status: RolloutStatus }) {
  const barColor =
    status === "completed"
      ? "bg-success"
      : status === "failed"
        ? "bg-error"
        : status === "paused"
          ? "bg-warning"
          : "bg-primary";

  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 flex-1 overflow-hidden rounded-pill bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Rollout ${pct} percent complete`}
      >
        <div
          className={cn("h-full rounded-pill transition-all", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="shrink-0 font-mono text-[13px] font-semibold text-foreground">
        {pct}%
      </span>
    </div>
  );
}

// ─── Metric cell ─────────────────────────────────────────────────────────────

function MetricCell({
  value,
  label,
  threshold,
  direction,
}: {
  value: number;
  label: string;
  threshold: number;
  direction: "above" | "below";
}) {
  const isGood =
    direction === "above" ? value >= threshold : value <= threshold;

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={cn(
          "font-mono text-[18px] font-semibold leading-none",
          isGood ? "text-success" : "text-error",
        )}
      >
        {value}%
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </span>
      <span className="font-body text-[11px] text-muted-foreground">
        Target: {direction === "above" ? ">=" : "<="}{threshold}%
      </span>
    </div>
  );
}

// ─── Inline notice ────────────────────────────────────────────────────────────

function InlineNotice({
  message,
  kind,
  onDismiss,
}: {
  message: string;
  kind: "success" | "error";
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
      className={cn(
        "fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-card border px-4 py-2.5 font-mono text-[12px] shadow-lg",
        kind === "success"
          ? "border-success/20 bg-success/10 text-success"
          : "border-error/20 bg-error/10 text-error",
      )}
    >
      {message}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function RolloutDetail() {
  const { rolloutId } = useParams<{ rolloutId: string }>();
  const navigate = useNavigate();

  const rollout = ROLLOUTS.find((r) => r.id === rolloutId);

  const [notice, setNotice] = React.useState<{
    message: string;
    kind: NoticeKind;
  } | null>(null);
  const dismissNotice = React.useCallback(() => setNotice(null), []);

  if (!rollout) {
    return (
      <section
        className="flex flex-col gap-4 items-start"
        aria-labelledby="ro-not-found"
      >
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-3"
        >
          <AlertTriangle size={14} className="shrink-0 text-error" aria-hidden="true" />
          <p
            id="ro-not-found"
            className="font-body text-[13px] text-foreground"
          >
            Rollout not found. It may have been deleted or the ID is incorrect.
          </p>
        </div>
        <Link
          to="/firmware/rollouts"
          className="inline-flex items-center gap-1.5 font-body text-[12px] text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to rollouts
        </Link>
      </section>
    );
  }

  const {
    name,
    version,
    status,
    startedAt,
    completedAt,
    progressPct,
    targetCount,
    batchSize,
    rampPct,
    successCriteria,
    currentMetrics,
    targets,
    failureLog,
  } = rollout;

  const installedCount = targets.filter((t) => t.status === "installed").length;
  const failedCount = targets.filter((t) => t.status === "failed").length;
  const pendingCount = targets.filter(
    (t) => t.status === "pending" || t.status === "pushed",
  ).length;

  const canPause = status === "active";
  const canResume = status === "paused";
  const canAccelerate = status === "active";
  const canAbort = status === "active" || status === "paused";

  function handleControl(action: "pause" | "resume" | "accelerate" | "abort") {
    const messages: Record<typeof action, string> = {
      pause: "Rollout paused.",
      resume: "Rollout resumed.",
      accelerate: "Ramp accelerated to 100%.",
      abort: "Rollout aborted.",
    };
    setNotice({ message: messages[action], kind: "success" });
  }

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
        <Link
          to="/firmware/rollouts"
          className="inline-flex items-center gap-1 font-body text-[12px] text-muted-foreground transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Rollouts
        </Link>
        <ChevronRight size={12} className="text-muted-foreground" aria-hidden="true" />
        <span className="font-body text-[12px] text-foreground">{name}</span>
      </nav>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="ro-header-heading">
        <div className="rounded-card border border-border bg-card p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  id="ro-header-heading"
                  className="font-body text-[18px] font-semibold text-foreground"
                >
                  {name}
                </h2>
                <RolloutStatusPill status={status} />
              </div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-muted-foreground">
                <span>v{version}</span>
                <span aria-hidden="true">·</span>
                <span>Started {formatDate(startedAt)}</span>
                {completedAt && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Completed {formatDate(completedAt)}</span>
                  </>
                )}
              </div>
            </div>
            {/* Summary counts */}
            <div className="flex gap-5 shrink-0">
              <div className="text-center">
                <p className="font-mono text-[16px] font-semibold text-success leading-none">
                  {installedCount}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground">
                  Installed
                </p>
              </div>
              <div className="text-center">
                <p className="font-mono text-[16px] font-semibold text-foreground leading-none">
                  {pendingCount}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground">
                  Pending
                </p>
              </div>
              {failedCount > 0 && (
                <div className="text-center">
                  <p className="font-mono text-[16px] font-semibold text-error leading-none">
                    {failedCount}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground">
                    Failed
                  </p>
                </div>
              )}
              <div className="text-center">
                <p className="font-mono text-[16px] font-semibold text-foreground leading-none">
                  {targetCount}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground">
                  Total
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <ProgressBar pct={progressPct} status={status} />
          </div>
        </div>
      </section>

      {/* ── Config + Metrics row ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Batch + ramp config */}
        <section aria-labelledby="ro-config-heading" className="rounded-card border border-border bg-card p-5">
          <h2
            id="ro-config-heading"
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Rollout config
          </h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                Batch size
              </dt>
              <dd className="mt-0.5 font-mono text-[15px] font-semibold text-foreground">
                {batchSize}
                <span className="ml-1 font-mono text-[11px] font-normal text-muted-foreground">
                  stations / wave
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                Ramp
              </dt>
              <dd className="mt-0.5 font-mono text-[15px] font-semibold text-foreground">
                {rampPct}%
                <span className="ml-1 font-mono text-[11px] font-normal text-muted-foreground">
                  of fleet
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                Observation window
              </dt>
              <dd className="mt-0.5 font-mono text-[15px] font-semibold text-foreground">
                {successCriteria.observationWindowHours}h
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                Avg install time
              </dt>
              <dd className="mt-0.5 font-mono text-[15px] font-semibold text-foreground">
                {currentMetrics.avgInstallDurationMin}
                <span className="ml-1 font-mono text-[11px] font-normal text-muted-foreground">
                  min
                </span>
              </dd>
            </div>
          </dl>
        </section>

        {/* Success criteria + current metrics */}
        <section aria-labelledby="ro-metrics-heading" className="rounded-card border border-border bg-card p-5">
          <h2
            id="ro-metrics-heading"
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Success criteria vs. current
          </h2>
          <div className="flex flex-wrap gap-8">
            <MetricCell
              value={currentMetrics.installRate}
              label="Install rate"
              threshold={successCriteria.minInstallRate}
              direction="above"
            />
            <MetricCell
              value={currentMetrics.failureRate}
              label="Failure rate"
              threshold={successCriteria.maxFailureRate}
              direction="below"
            />
          </div>
        </section>
      </div>

      {/* ── Target stations table ──────────────────────────────────────────── */}
      <section aria-labelledby="ro-targets-heading">
        <h2
          id="ro-targets-heading"
          className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          Target stations
        </h2>
        <div className="overflow-hidden rounded-card border border-border bg-card">
          <div className="overflow-x-auto">
            <Table className="min-w-[680px]">
              <caption className="sr-only">Target stations for {name}</caption>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Station</TableHead>
                  <TableHead scope="col">Model</TableHead>
                  <TableHead scope="col">Current version</TableHead>
                  <TableHead scope="col">Target version</TableHead>
                  <TableHead scope="col">Status</TableHead>
                  <TableHead scope="col">Last attempt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {targets.map((t) => (
                  <TableRow
                    key={t.stationId}
                    className="transition-colors duration-100 ease-out hover:bg-muted"
                  >
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[13px] font-medium text-foreground">
                          {t.stationName}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {t.stationId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-body text-[12px] text-muted-foreground">
                        {t.model}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-[12px] text-muted-foreground">
                        v{t.currentVersion}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-[12px] text-foreground">
                        v{t.targetVersion}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StationStatusPill status={t.status} />
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {t.lastAttemptAt
                          ? formatDateTime(t.lastAttemptAt)
                          : "Not started"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ── Failure log ────────────────────────────────────────────────────── */}
      {failureLog.length > 0 && (
        <section aria-labelledby="ro-failures-heading">
          <h2
            id="ro-failures-heading"
            className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Failure log
          </h2>
          <div className="overflow-hidden rounded-card border border-error bg-error/5">
            {failureLog.map((entry, i, arr) => (
              <div
                key={entry.stationId + entry.failedAt}
                className={cn(
                  "flex flex-col gap-1.5 px-5 py-4 sm:flex-row sm:gap-4",
                  i < arr.length - 1 && "border-b border-border",
                )}
              >
                <AlertTriangle
                  size={14}
                  className="mt-0.5 shrink-0 text-error"
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col gap-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-body text-[13px] font-medium text-foreground">
                      {entry.stationName}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {entry.stationId}
                    </span>
                    <span className="font-mono text-[10px] text-error">
                      {entry.errorCode}
                    </span>
                  </div>
                  <p className="font-body text-[12px] text-muted-foreground">
                    {entry.errorMessage}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {formatDateTime(entry.failedAt)}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {entry.retryCount} retries
                  </span>
                  {entry.nextRetryAt && (
                    <span className="font-mono text-[10px] text-warning">
                      Retry at {formatDateTime(entry.nextRetryAt)}
                    </span>
                  )}
                  {!entry.nextRetryAt && (
                    <button
                      type="button"
                      className="mt-0.5 inline-flex items-center gap-1 rounded-btn border border-border bg-transparent px-2 py-0.5 font-body text-[11px] text-foreground transition-colors duration-150 hover:bg-muted cursor-pointer"
                    >
                      <RefreshCw size={10} aria-hidden="true" />
                      Retry
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Sticky controls bar ─────────────────────────────────────────────── */}
      {(canPause || canResume || canAbort) && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card px-6 py-3"
          role="region"
          aria-label="Rollout controls"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-muted-foreground">
                {name}
              </span>
              <span aria-hidden="true" className="text-muted-foreground">·</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                v{version}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {canPause && (
                <button
                  type="button"
                  onClick={() => handleControl("pause")}
                  className="inline-flex items-center gap-1.5 rounded-btn border border-warning bg-warning/10 px-3 py-1.5 font-body text-[12px] text-warning transition-colors duration-150 ease-out hover:bg-warning/20 cursor-pointer"
                  aria-label="Pause rollout"
                >
                  <Pause size={12} aria-hidden="true" />
                  Pause
                </button>
              )}
              {canResume && (
                <button
                  type="button"
                  onClick={() => handleControl("resume")}
                  className="inline-flex items-center gap-1.5 rounded-btn border border-success bg-success/10 px-3 py-1.5 font-body text-[12px] text-success transition-colors duration-150 ease-out hover:bg-success/20 cursor-pointer"
                  aria-label="Resume rollout"
                >
                  <Play size={12} aria-hidden="true" />
                  Resume
                </button>
              )}
              {canAccelerate && (
                <button
                  type="button"
                  onClick={() => handleControl("accelerate")}
                  className="inline-flex items-center gap-1.5 rounded-btn border border-info bg-info/10 px-3 py-1.5 font-body text-[12px] text-info transition-colors duration-150 ease-out hover:bg-info/20 cursor-pointer"
                  aria-label="Accelerate ramp to full fleet"
                >
                  <Zap size={12} aria-hidden="true" />
                  Accelerate
                </button>
              )}
              {canAbort && (
                <button
                  type="button"
                  onClick={() => handleControl("abort")}
                  className="inline-flex items-center gap-1.5 rounded-btn border border-error bg-error/10 px-3 py-1.5 font-body text-[12px] text-error transition-colors duration-150 ease-out hover:bg-error/20 cursor-pointer"
                  aria-label="Abort rollout"
                >
                  <XCircle size={12} aria-hidden="true" />
                  Abort
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Inline notice ──────────────────────────────────────────────────── */}
      {notice && notice.kind && (
        <InlineNotice
          message={notice.message}
          kind={notice.kind}
          onDismiss={dismissNotice}
        />
      )}
    </div>
  );
}
