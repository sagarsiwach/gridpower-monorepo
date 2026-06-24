/**
 * FW.3: Firmware rollouts list
 * Route: /firmware/rollouts
 *
 * Features:
 * - Segment tabs: Active / Paused / Completed / Failed
 * - Table: name, version, target count, started, progress bar, status
 * - "Create rollout" CTA top-right
 * - Row click navigates to /firmware/rollouts/:rolloutId
 * - Loading, empty, and error states
 */

import * as React from "react";
import { useNavigate } from "react-router";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Plus,
  AlertTriangle,
  RefreshCw,
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
import { ROLLOUTS, type RolloutStatus } from "~/mocks/firmware";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = RolloutStatus | "all";
type SortKey = "name" | "version" | "targetCount" | "startedAt" | "progressPct";
type SortDir = "asc" | "desc";
interface SortState {
  key: SortKey;
  dir: SortDir;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Status pill ──────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: RolloutStatus }) {
  const map: Record<RolloutStatus, string> = {
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
    <div className="flex items-center gap-2">
      <div
        className="h-1.5 w-20 shrink-0 overflow-hidden rounded-pill bg-muted"
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
      <span className="font-mono text-[11px] text-muted-foreground">{pct}%</span>
    </div>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ columnKey, sort }: { columnKey: SortKey; sort: SortState }) {
  if (sort.key !== columnKey)
    return <ArrowUpDown size={11} className="text-muted-foreground" aria-hidden="true" />;
  return sort.dir === "asc" ? (
    <ArrowUp size={11} className="text-primary" aria-hidden="true" />
  ) : (
    <ArrowDown size={11} className="text-primary" aria-hidden="true" />
  );
}

// ─── Sortable header ──────────────────────────────────────────────────────────

function SortableHead({
  label,
  columnKey,
  sort,
  onSort,
  className,
}: {
  label: string;
  columnKey: SortKey;
  sort: SortState;
  onSort: (k: SortKey) => void;
  className?: string;
}) {
  const isActive = sort.key === columnKey;
  const ariaSort: React.AriaAttributes["aria-sort"] = isActive
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : "none";

  return (
    <TableHead
      scope="col"
      aria-sort={ariaSort}
      className={cn("cursor-pointer select-none", className)}
      onClick={() => onSort(columnKey)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSort(columnKey);
        }}
        className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon columnKey={columnKey} sort={sort} />
      </button>
    </TableHead>
  );
}

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS: { key: Tab; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
  { key: "completed", label: "Completed" },
  { key: "failed", label: "Failed" },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function FirmwareRollouts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<Tab>("active");
  const [sort, setSort] = React.useState<SortState>({
    key: "startedAt",
    dir: "desc",
  });
  const [isLoading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
  }, []);

  const tabCounts = React.useMemo(
    () => ({
      active: ROLLOUTS.filter((r) => r.status === "active").length,
      paused: ROLLOUTS.filter((r) => r.status === "paused").length,
      completed: ROLLOUTS.filter((r) => r.status === "completed").length,
      failed: ROLLOUTS.filter((r) => r.status === "failed").length,
    }),
    [],
  );

  const filtered = React.useMemo(() => {
    let list = ROLLOUTS.filter((r) => r.status === activeTab);
    list = [...list].sort((a, b) => {
      let cmp = 0;
      switch (sort.key) {
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "version":
          cmp = a.version.localeCompare(b.version);
          break;
        case "targetCount":
          cmp = a.targetCount - b.targetCount;
          break;
        case "startedAt":
          cmp = a.startedAt.localeCompare(b.startedAt);
          break;
        case "progressPct":
          cmp = a.progressPct - b.progressPct;
          break;
      }
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [activeTab, sort]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="fw-rollouts-heading">
      {/* ── Page heading + CTA ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        <h2
          id="fw-rollouts-heading"
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
        >
          Rollouts
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-3 py-1.5 font-body text-[12px] font-medium text-white transition-opacity duration-150 ease-out hover:opacity-90 cursor-pointer"
          aria-label="Create a new rollout"
        >
          <Plus size={13} aria-hidden="true" />
          Create rollout
        </button>
      </div>

      {/* ── Segment tabs ──────────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3"
        role="tablist"
        aria-label="Filter rollouts by status"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tabCounts[tab.key as keyof typeof tabCounts];
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                isActive
                  ? "bg-muted border-border text-foreground"
                  : "bg-transparent border-transparent text-muted-foreground hover:bg-muted",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "font-mono text-[10px]",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Error banner ──────────────────────────────────────────────────── */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle size={14} className="shrink-0 text-error" aria-hidden="true" />
          <span className="font-body text-[12px] text-foreground">{error}</span>
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      )}

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div
        role="tabpanel"
        aria-label={`${activeTab} rollouts`}
        className="overflow-hidden rounded-card border border-border bg-card"
      >
        {/* Toolbar */}
        <div className="flex items-center border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
          >
            {filtered.length} rollout{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[720px]">
            <caption className="sr-only">
              {activeTab} firmware rollouts
            </caption>
            <TableHeader>
              <TableRow>
                <SortableHead
                  label="Rollout"
                  columnKey="name"
                  sort={sort}
                  onSort={handleSort}
                />
                <SortableHead
                  label="Version"
                  columnKey="version"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[100px]"
                />
                <SortableHead
                  label="Targets"
                  columnKey="targetCount"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[72px]"
                />
                <SortableHead
                  label="Started"
                  columnKey="startedAt"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
                <SortableHead
                  label="Progress"
                  columnKey="progressPct"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[160px]"
                />
                <TableHead scope="col" className="min-w-[96px]">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={`skel-${i}`} aria-hidden="true">
                    <TableCell>
                      <div className="h-3 w-40 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-8 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-28 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-16 rounded-pill bg-muted animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))}

              {/* Empty state */}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-36">
                    <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                      <p className="font-body text-[13px] text-foreground">
                        No{" "}
                        {activeTab !== "all" ? activeTab + " " : ""}
                        rollouts. Create one to push firmware to your fleet.
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                      >
                        <Plus size={11} aria-hidden="true" />
                        Create rollout
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                filtered.map((rollout) => (
                  <TableRow
                    key={rollout.id}
                    onClick={() => navigate(`/firmware/rollouts/${rollout.id}`)}
                    className="cursor-pointer transition-colors duration-150 ease-out hover:bg-muted"
                  >
                    {/* Name */}
                    <TableCell>
                      <span className="font-body text-[13px] font-medium text-foreground">
                        {rollout.name}
                      </span>
                    </TableCell>

                    {/* Version */}
                    <TableCell>
                      <span className="font-mono text-[12px] text-foreground">
                        v{rollout.version}
                      </span>
                    </TableCell>

                    {/* Target count */}
                    <TableCell>
                      <span className="font-mono text-[12px] text-foreground">
                        {rollout.targetCount}
                      </span>
                    </TableCell>

                    {/* Started */}
                    <TableCell>
                      <span className="font-mono text-[12px] text-muted-foreground">
                        {formatDate(rollout.startedAt)}
                      </span>
                    </TableCell>

                    {/* Progress */}
                    <TableCell>
                      <ProgressBar
                        pct={rollout.progressPct}
                        status={rollout.status}
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <StatusPill status={rollout.status} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
