/**
 * CON.4: Session detail
 * Route: /sessions/:sessionId
 *
 * Sections:
 * - Header: session ID, status badge, station link, driver link
 * - Timeline: plug-in, auth, charging start, charging stop, plug-out
 * - Power profile: LineChart of kW over elapsed time
 * - Energy breakdown card
 * - Financial breakdown card
 * - Driver context card
 * - Station context card
 * - Actions menu: Refund full / Refund partial / Add note / Issue invoice / Mark disputed
 */

import * as React from "react";
import { Link, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Clock,
  FileText,
  Flag,
  ReceiptText,
  RefreshCw,
  RotateCcw,
  Zap,
} from "lucide-react";
import { LineChart, type LineChartSeries, cn } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";

import {
  getSession,
  formatDuration,
  formatTs,
  formatTime,
  type Session,
  type SessionStatus,
  type PaymentStatus,
} from "~/mocks/sessions";

// ─── Status display ───────────────────────────────────────────────────────────

const SESSION_STATUS_CLASS: Record<SessionStatus, string> = {
  "in-progress": "bg-info/10 text-info",
  completed: "bg-success/10 text-success",
  cancelled: "bg-muted text-muted-foreground",
  errored: "bg-error/10 text-error",
};

const SESSION_STATUS_LABEL: Record<SessionStatus, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  errored: "Errored",
};

const PAYMENT_STATUS_CLASS: Record<PaymentStatus, string> = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  refunded: "bg-muted text-muted-foreground",
};

const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  refunded: "Refunded",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({
  status,
  className,
}: {
  status: SessionStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill px-2.5 py-1 font-mono text-[11px]",
        SESSION_STATUS_CLASS[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {SESSION_STATUS_LABEL[status]}
    </span>
  );
}

function PaymentPill({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 font-mono text-[11px]",
        PAYMENT_STATUS_CLASS[status],
      )}
    >
      {PAYMENT_STATUS_LABEL[status]}
    </span>
  );
}

// ─── Info row (label + value) ─────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  mono = false,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-border last:border-0">
      <span className="font-mono text-[11px] text-muted-foreground shrink-0">{label}</span>
      <span
        className={cn(
          "text-right",
          mono ? "font-mono text-[12px]" : "font-body text-[12px]",
          accent ? "text-primary font-medium" : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Timeline step ────────────────────────────────────────────────────────────

type TimelineStepStatus = "done" | "active" | "skipped" | "pending";

function TimelineStep({
  label,
  ts,
  status,
  isLast,
}: {
  label: string;
  ts: string | null;
  status: TimelineStepStatus;
  isLast?: boolean;
}) {
  const dotClass: Record<TimelineStepStatus, string> = {
    done: "bg-success border-success",
    active: "bg-primary border-primary animate-pulse",
    skipped: "bg-error border-error",
    pending: "bg-muted border-border",
  };

  const lineClass: Record<TimelineStepStatus, string> = {
    done: "bg-success/40",
    active: "bg-primary/30",
    skipped: "bg-error/30",
    pending: "bg-border",
  };

  return (
    <li className="flex gap-3">
      {/* Dot + connector line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "h-2.5 w-2.5 shrink-0 rounded-full border-2 mt-0.5",
            dotClass[status],
          )}
          aria-hidden="true"
        />
        {!isLast && (
          <div className={cn("mt-1 w-px flex-1 min-h-[20px]", lineClass[status])} />
        )}
      </div>

      {/* Label + time */}
      <div className="pb-4 flex flex-col gap-0.5">
        <span className="font-body text-[12px] font-medium text-foreground">{label}</span>
        {ts ? (
          <span className="font-mono text-[11px] text-muted-foreground">{formatTs(ts)}</span>
        ) : (
          <span className="font-mono text-[11px] text-muted-foreground italic">
            {status === "skipped" ? "Not reached" : "Pending"}
          </span>
        )}
      </div>
    </li>
  );
}

// ─── Action button ────────────────────────────────────────────────────────────

function ActionButton({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-2 rounded-btn border px-3 py-2 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        danger
          ? "border-error/40 bg-error/10 text-error hover:bg-error/20"
          : "border-border bg-transparent text-foreground hover:bg-muted",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Not found ────────────────────────────────────────────────────────────────

function NotFound({ id }: { id: string }) {
  return (
    <section
      className="flex flex-col items-center gap-4 py-16 text-center"
      aria-labelledby="session-not-found-heading"
    >
      <AlertTriangle size={32} className="text-warning" aria-hidden="true" />
      <h2 id="session-not-found-heading" className="font-body text-[16px] font-semibold text-foreground">
        Session not found
      </h2>
      <p className="font-mono text-[12px] text-muted-foreground">
        No session with ID <span className="text-foreground">{id}</span> exists in this dataset.
      </p>
      <Link
        to="/sessions"
        className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-4 py-2 font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-150 ease-out"
        aria-label="Back to sessions list"
      >
        <ArrowLeft size={13} aria-hidden="true" />
        Back to sessions
      </Link>
    </section>
  );
}

// ─── Main route ───────────────────────────────────────────────────────────────

export default function SessionDetail() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const session: Session | undefined = sessionId ? getSession(sessionId) : undefined;

  if (!session) {
    return <NotFound id={sessionId ?? "(unknown)"} />;
  }

  // ── Power profile chart data ───────────────────────────────────────────────
  const chartData = session.powerProfile.map((pt) => ({
    elapsed: pt.t,
    kw: pt.kw,
  }));

  const chartSeries: LineChartSeries[] = [
    {
      dataKey: "kw",
      name: "Power (kW)",
      color: "var(--grid-red)",
      strokeWidth: 1.5,
    },
  ];

  // ── Timeline step statuses ─────────────────────────────────────────────────
  function stepStatus(ts: string | null, isActive?: boolean): TimelineStepStatus {
    if (ts) return "done";
    if (isActive) return "active";
    if (session!.status === "cancelled" || session!.status === "errored") return "skipped";
    return "pending";
  }

  // ── Action handlers (stubs) ────────────────────────────────────────────────
  const handleRefundFull = () =>
    console.log("[Sessions] Refund full:", session.id);
  const handleRefundPartial = () =>
    console.log("[Sessions] Refund partial:", session.id);
  const handleAddNote = () =>
    console.log("[Sessions] Add note:", session.id);
  const handleIssueInvoice = () =>
    console.log("[Sessions] Issue invoice:", session.id);
  const handleMarkDisputed = () =>
    console.log("[Sessions] Mark disputed:", session.id);

  const isActive = session.status === "in-progress";

  return (
    <article className="flex flex-col gap-5" aria-labelledby="session-detail-heading">
      {/* ── Back nav ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb">
        <Link
          to="/sessions"
          className="inline-flex items-center gap-1.5 font-body text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
          aria-label="Back to sessions list"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Sessions
        </Link>
      </nav>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="session-detail-heading">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2
                id="session-detail-heading"
                className="font-mono text-[16px] font-semibold text-foreground"
              >
                {session.id}
              </h2>
              <StatusPill status={session.status} />
              <PaymentPill status={session.paymentStatus} />
            </div>
            {/* Station + driver links */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to={`/stations/${session.stationId}`}
                className="inline-flex items-center gap-1 font-body text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
                aria-label={`View station ${session.stationName}`}
              >
                <span>{session.stationName}</span>
                <ChevronRight size={11} aria-hidden="true" />
              </Link>
              <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
              <Link
                to={`/drivers?search=${encodeURIComponent(session.driverName)}`}
                className="inline-flex items-center gap-1 font-body text-[12px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out"
                aria-label={`View driver ${session.driverName}`}
              >
                <span>{session.driverName}</span>
                <ChevronRight size={11} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main grid: left (timeline + chart + energy) / right (financial + cards + actions) ── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        {/* ── LEFT COLUMN ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Timeline */}
          <section
            aria-labelledby="timeline-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h3
              id="timeline-heading"
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              Session timeline
            </h3>
            <ol className="flex flex-col" aria-label="Charging session timeline">
              <TimelineStep
                label="Plug-in"
                ts={session.plugInAt}
                status={stepStatus(session.plugInAt)}
              />
              <TimelineStep
                label="Authentication"
                ts={session.authAt}
                status={stepStatus(session.authAt)}
              />
              <TimelineStep
                label="Charging start"
                ts={session.chargingStartAt}
                status={stepStatus(session.chargingStartAt, isActive)}
              />
              <TimelineStep
                label="Charging stop"
                ts={session.chargingStopAt}
                status={stepStatus(session.chargingStopAt, isActive)}
              />
              <TimelineStep
                label="Plug-out"
                ts={session.plugOutAt}
                status={stepStatus(session.plugOutAt)}
                isLast
              />
            </ol>
          </section>

          {/* Power profile chart */}
          <section aria-labelledby="power-profile-heading">
            <LineChart
              data={chartData}
              series={chartSeries}
              xAxisKey="elapsed"
              yUnit="kW"
              title="Power profile"
              subtitle={`${formatDuration(session.durationMinutes)} total · peak ${session.peakKw} kW · avg ${session.avgKw} kW`}
              chartHeight={160}
              theme={isDark ? "dark" : "light"}
              aria-labelledby="power-profile-heading"
            />
            {/* Hidden accessible data table for screen readers */}
            <table className="sr-only" aria-label="Power profile data">
              <caption>kW readings over session duration</caption>
              <thead>
                <tr>
                  <th scope="col">Elapsed (min)</th>
                  <th scope="col">Power (kW)</th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((pt) => (
                  <tr key={pt.elapsed}>
                    <td>{pt.elapsed}</td>
                    <td>{pt.kw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Energy breakdown */}
          <section
            aria-labelledby="energy-breakdown-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h3
              id="energy-breakdown-heading"
              className="mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              Energy breakdown
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  label: "Energy delivered",
                  value: `${session.energyKwh.toFixed(1)} kWh`,
                  icon: <Zap size={14} className="text-primary" aria-hidden="true" />,
                },
                {
                  label: "Peak power",
                  value: `${session.peakKw} kW`,
                  icon: <Zap size={14} className="text-warning" aria-hidden="true" />,
                },
                {
                  label: "Avg power",
                  value: `${session.avgKw} kW`,
                  icon: <Zap size={14} className="text-muted-foreground" aria-hidden="true" />,
                },
                {
                  label: "Idle time",
                  value: `${session.idleMinutes}m`,
                  icon: <Clock size={14} className="text-muted-foreground" aria-hidden="true" />,
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 rounded-[8px] border border-border bg-muted p-3"
                >
                  <div className="flex items-center gap-1.5">
                    {icon}
                    <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <span className="font-heading text-[20px] font-semibold text-foreground leading-tight">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── RIGHT COLUMN ───────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {/* Financial breakdown */}
          <section
            aria-labelledby="financial-breakdown-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h3
              id="financial-breakdown-heading"
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              Financial breakdown
            </h3>
            <div className="flex flex-col">
              <InfoRow label="Tariff" value={session.tariff} />
              <InfoRow
                label="Energy cost"
                value={`₹${session.energyCost.toLocaleString("en-IN")}`}
                mono
              />
              <InfoRow
                label="Idle fee"
                value={
                  session.idleFee > 0
                    ? `₹${session.idleFee.toLocaleString("en-IN")}`
                    : "--"
                }
                mono
              />
              <InfoRow
                label="GST (18%)"
                value={`₹${session.tax.toLocaleString("en-IN")}`}
                mono
              />
              <InfoRow
                label="Total"
                value={`₹${session.total.toLocaleString("en-IN")}`}
                mono
                accent
              />
              <InfoRow label="Payment method" value={session.paymentMethod} mono />
              <InfoRow label="Transaction ID" value={session.transactionId} mono />
              <InfoRow
                label="Payout status"
                value={
                  <span
                    className={cn(
                      "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[10px]",
                      session.payoutStatus === "settled"
                        ? "bg-success/10 text-success"
                        : session.payoutStatus === "disputed"
                          ? "bg-error/10 text-error"
                          : "bg-warning/10 text-warning",
                    )}
                  >
                    {session.payoutStatus.charAt(0).toUpperCase() +
                      session.payoutStatus.slice(1)}
                  </span>
                }
              />
            </div>
          </section>

          {/* Driver context */}
          <section
            aria-labelledby="driver-context-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h3
              id="driver-context-heading"
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              Driver
            </h3>
            <div className="flex flex-col">
              <InfoRow label="Name" value={session.driverName} />
              <InfoRow label="Phone" value={session.driverPhone} mono />
              <InfoRow label="Auth method" value={session.authMethod} />
              {session.driverRfid && (
                <InfoRow label="RFID tag" value={session.driverRfid} mono />
              )}
            </div>
            <Link
              to={`/drivers?search=${encodeURIComponent(session.driverName)}`}
              className="mt-3 inline-flex items-center gap-1 font-body text-[12px] text-primary hover:opacity-80 transition-opacity duration-150"
              aria-label={`View driver profile for ${session.driverName}`}
            >
              View driver
              <ChevronRight size={12} aria-hidden="true" />
            </Link>
          </section>

          {/* Station context */}
          <section
            aria-labelledby="station-context-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h3
              id="station-context-heading"
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              Station
            </h3>
            <div className="flex flex-col">
              <InfoRow label="Station" value={session.stationName} />
              <InfoRow label="Station ID" value={session.stationId} mono />
              <InfoRow label="Port" value={`P${session.port}`} mono />
              <InfoRow label="Connector" value={session.connectorType} mono />
            </div>
            <Link
              to={`/stations/${session.stationId}`}
              className="mt-3 inline-flex items-center gap-1 font-body text-[12px] text-primary hover:opacity-80 transition-opacity duration-150"
              aria-label={`View station ${session.stationName}`}
            >
              View station
              <ChevronRight size={12} aria-hidden="true" />
            </Link>
          </section>

          {/* Actions */}
          <section
            aria-labelledby="session-actions-heading"
            className="rounded-card border border-border bg-card p-5"
          >
            <h3
              id="session-actions-heading"
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              Actions
            </h3>
            <div className="flex flex-col gap-2">
              <ActionButton
                icon={<RefreshCw size={13} aria-hidden="true" />}
                label="Refund full"
                onClick={handleRefundFull}
                danger
              />
              <ActionButton
                icon={<RotateCcw size={13} aria-hidden="true" />}
                label="Refund partial"
                onClick={handleRefundPartial}
              />
              <ActionButton
                icon={<FileText size={13} aria-hidden="true" />}
                label="Add note"
                onClick={handleAddNote}
              />
              <ActionButton
                icon={<ReceiptText size={13} aria-hidden="true" />}
                label="Issue invoice"
                onClick={handleIssueInvoice}
              />
              <ActionButton
                icon={<Flag size={13} aria-hidden="true" />}
                label="Mark disputed"
                onClick={handleMarkDisputed}
                danger
              />
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
