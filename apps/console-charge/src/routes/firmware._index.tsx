/**
 * FW.1: Firmware overview
 * Route: /firmware (index)
 *
 * Sections:
 * - Fleet version distribution (vertical bar chart)
 * - Drift alert card (EOL stations)
 * - Active rollouts summary list
 * - Quick stats: latest stable / beta channel / EOL
 * - Quick action: Start a rollout
 */

import * as React from "react";
import { Link } from "react-router";
import { AlertTriangle, ArrowRight, ChevronRight, RefreshCw } from "lucide-react";
import { BarChart, cn, type BarChartSeries } from "@gridpower/ui";
import { useTheme } from "~/lib/theme";
import {
  ROLLOUTS,
  VERSION_DISTRIBUTION,
  TOTAL_STATIONS,
  EOL_STATION_COUNT,
  LATEST_STABLE_VERSION,
  LATEST_STABLE_COUNT,
  BETA_STATION_COUNT,
} from "~/mocks/firmware";

// ─── Channel color tokens ─────────────────────────────────────────────────────

function channelColor(channel: string): string {
  switch (channel) {
    case "stable":
      return "var(--color-success)";
    case "beta":
      return "var(--color-info)";
    case "canary":
      return "var(--color-warning)";
    case "eol":
    default:
      return "var(--color-error)";
  }
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({
  pct,
  status,
  className,
}: {
  pct: number;
  status: "active" | "paused" | "completed" | "failed";
  className?: string;
}) {
  const barColor =
    status === "completed"
      ? "bg-success"
      : status === "failed"
        ? "bg-error"
        : status === "paused"
          ? "bg-warning"
          : "bg-primary";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="h-1.5 w-24 shrink-0 overflow-hidden rounded-pill bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${pct} percent complete`}
      >
        <div
          className={cn("h-full rounded-pill transition-all", barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

// ─── Rollout status pill ──────────────────────────────────────────────────────

function RolloutStatusPill({
  status,
}: {
  status: "active" | "paused" | "completed" | "failed";
}) {
  const map = {
    active: "bg-success/10 text-success",
    paused: "bg-warning/10 text-warning",
    completed: "bg-muted text-muted-foreground",
    failed: "bg-error/10 text-error",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]",
        map[status],
      )}
    >
      {status}
    </span>
  );
}

// ─── Quick stat cell ──────────────────────────────────────────────────────────

function QuickStat({
  value,
  label,
  valueClassName,
}: {
  value: string | number;
  label: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={cn("font-mono text-[20px] font-semibold leading-none text-foreground", valueClassName)}>
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ─── Distribution chart series ────────────────────────────────────────────────

// Each version bar gets its channel color, no last-bar highlight.
const DIST_SERIES: BarChartSeries[] = [
  {
    dataKey: "stationCount",
    name: "Stations",
    color: "var(--color-success)", // fallback — overridden per Cell via channel data
    highlightLast: false,
  },
];

// ─── Active rollouts (limited to 3 for overview) ─────────────────────────────

const ACTIVE_ROLLOUTS = ROLLOUTS.filter(
  (r) => r.status === "active" || r.status === "paused",
).slice(0, 3);

// ─── Component ───────────────────────────────────────────────────────────────

export default function FirmwareOverview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Chart data: each bar is a version, colored by channel
  // We can't pass per-bar colors directly to BarChart so we use a single
  // neutral color for the chart and show version/channel in a legend below.
  const chartData = VERSION_DISTRIBUTION.map((v) => ({
    version: v.version,
    stationCount: v.stationCount,
    channel: v.channel,
  }));

  const driftPct = TOTAL_STATIONS > 0
    ? Math.round((EOL_STATION_COUNT / TOTAL_STATIONS) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-5">
      <h2 className="sr-only">Firmware overview</h2>

      {/* ── Row 1: Quick stats + EOL drift alert ───────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        {/* Quick stats card */}
        <section
          aria-labelledby="fw-stats-heading"
          className="rounded-card border border-border bg-card p-5"
        >
          <h2
            id="fw-stats-heading"
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Fleet summary
          </h2>
          <div className="flex flex-wrap gap-8">
            <QuickStat
              value={TOTAL_STATIONS}
              label="Total stations"
            />
            <QuickStat
              value={LATEST_STABLE_COUNT}
              label={`On ${LATEST_STABLE_VERSION} (latest stable)`}
              valueClassName="text-success"
            />
            <QuickStat
              value={BETA_STATION_COUNT}
              label="Beta channel"
              valueClassName="text-info"
            />
            <QuickStat
              value={EOL_STATION_COUNT}
              label="EOL versions"
              valueClassName={EOL_STATION_COUNT > 0 ? "text-error" : "text-foreground"}
            />
          </div>
        </section>

        {/* EOL drift alert */}
        {EOL_STATION_COUNT > 0 && (
          <section
            aria-labelledby="fw-drift-heading"
            className="rounded-card border border-error bg-error/10 p-5 lg:min-w-[280px]"
            role="region"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={16}
                className="mt-0.5 shrink-0 text-error"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2">
                <h2
                  id="fw-drift-heading"
                  className="font-body text-[13px] font-semibold text-foreground"
                >
                  {EOL_STATION_COUNT} station{EOL_STATION_COUNT !== 1 ? "s" : ""} on EOL versions
                </h2>
                <p className="font-body text-[12px] text-muted-foreground">
                  {driftPct}% of fleet is running firmware past end-of-life. No security patches will be issued for these versions.
                </p>
                <Link
                  to="/firmware/versions?channel=eol"
                  className="inline-flex items-center gap-1 font-body text-[12px] text-error transition-opacity duration-150 hover:opacity-80"
                >
                  View EOL stations
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ── Row 2: Distribution chart ──────────────────────────────────────── */}
      <section aria-labelledby="fw-dist-heading">
        <h2
          id="fw-dist-heading"
          className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          Version distribution
        </h2>
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <BarChart
            data={chartData}
            series={DIST_SERIES}
            xAxisKey="version"
            yUnit=""
            title="Stations per firmware version"
            subtitle={`${TOTAL_STATIONS} total stations`}
            chartHeight={180}
            theme={isDark ? "dark" : "light"}
          />
          {/* Channel legend */}
          <div className="flex flex-wrap items-center gap-4 border-t border-border px-5 py-3">
            {(
              [
                ["stable", "Stable"],
                ["beta", "Beta"],
                ["canary", "Canary"],
                ["eol", "EOL"],
              ] as [string, string][]
            ).map(([channel, label]) => (
              <div key={channel} className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: channelColor(channel) }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Row 3: Active rollouts ─────────────────────────────────────────── */}
      <section aria-labelledby="fw-rollouts-heading">
        <div className="mb-3 flex items-center justify-between">
          <h2
            id="fw-rollouts-heading"
            className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
          >
            Active rollouts
          </h2>
          <Link
            to="/firmware/rollouts"
            className="inline-flex items-center gap-0.5 font-body text-[12px] text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
          >
            View all
            <ChevronRight size={13} aria-hidden="true" />
          </Link>
        </div>

        {ACTIVE_ROLLOUTS.length === 0 ? (
          <div className="rounded-card border border-border bg-card px-5 py-10 text-center">
            <p className="font-body text-[13px] text-muted-foreground">
              No active rollouts. Start one to push firmware to your fleet.
            </p>
            <Link
              to="/firmware/rollouts"
              className="mt-3 inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground transition-colors duration-150 ease-out hover:bg-muted"
            >
              Start a rollout
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-card border border-border bg-card">
            {ACTIVE_ROLLOUTS.map((rollout, i, arr) => (
              <Link
                key={rollout.id}
                to={`/firmware/rollouts/${rollout.id}`}
                className={cn(
                  "flex flex-col gap-2 px-5 py-4 transition-colors duration-150 ease-out hover:bg-muted sm:flex-row sm:items-center sm:gap-4",
                  i < arr.length - 1 && "border-b border-border",
                )}
                aria-label={`View rollout ${rollout.name}`}
              >
                {/* Name + version */}
                <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                  <span className="font-body text-[13px] font-medium text-foreground truncate">
                    {rollout.name}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    v{rollout.version} · {rollout.targetCount} stations
                  </span>
                </div>

                {/* Progress */}
                <ProgressBar pct={rollout.progressPct} status={rollout.status} />

                {/* Status pill */}
                <RolloutStatusPill status={rollout.status} />

                <ChevronRight
                  size={14}
                  className="hidden shrink-0 text-muted-foreground sm:block"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Row 4: Quick action ────────────────────────────────────────────── */}
      <section aria-labelledby="fw-action-heading">
        <h2 id="fw-action-heading" className="sr-only">
          Quick actions
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/firmware/rollouts"
            className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-4 py-2 font-body text-[12px] font-medium text-white transition-opacity duration-150 ease-out hover:opacity-90"
          >
            <RefreshCw size={13} aria-hidden="true" />
            Start a rollout
          </Link>
          <Link
            to="/firmware/versions"
            className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-4 py-2 font-body text-[12px] text-foreground transition-colors duration-150 ease-out hover:bg-muted"
          >
            Browse versions
          </Link>
        </div>
      </section>
    </div>
  );
}
