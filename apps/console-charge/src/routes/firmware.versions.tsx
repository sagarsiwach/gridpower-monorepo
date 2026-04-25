/**
 * FW.2: Firmware versions
 * Route: /firmware/versions
 *
 * Features:
 * - Sortable table: version, released, channel pill, station count, changelog link
 * - Channel filter chips
 * - Row click expands inline detail: full changelog, known issues, supported models
 * - Default sort: most recent release first
 * - Loading, empty, and error states
 */

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  RefreshCw,
  X,
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
import { useSearchParams } from "react-router";
import { FIRMWARE_VERSIONS, type FirmwareChannel } from "~/mocks/firmware";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "version" | "releasedAt" | "channel" | "stationCount";
type SortDir = "asc" | "desc";
interface SortState {
  key: SortKey;
  dir: SortDir;
}

// ─── Channel pill ─────────────────────────────────────────────────────────────

const CHANNEL_PILL_MAP: Record<FirmwareChannel, string> = {
  stable: "bg-success/10 text-success",
  beta: "bg-info/10 text-info",
  canary: "bg-warning/10 text-warning",
  eol: "bg-muted text-muted-foreground",
};

function ChannelPill({ channel }: { channel: FirmwareChannel }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]",
        CHANNEL_PILL_MAP[channel],
      )}
    >
      {channel}
    </span>
  );
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({
  columnKey,
  sort,
}: {
  columnKey: SortKey;
  sort: SortState;
}) {
  if (sort.key !== columnKey)
    return (
      <ArrowUpDown size={11} className="text-muted-foreground" aria-hidden="true" />
    );
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
        aria-label={`Sort by ${label}${isActive ? (sort.dir === "asc" ? " ascending" : " descending") : ""}`}
      >
        {label}
        <SortIcon columnKey={columnKey} sort={sort} />
      </button>
    </TableHead>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CHANNEL_FILTERS = ["all", "stable", "beta", "canary", "eol"] as const;
type ChannelFilter = (typeof CHANNEL_FILTERS)[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ─── Expanded row detail ──────────────────────────────────────────────────────

function ExpandedDetail({
  version,
  changelogFull,
  knownIssues,
  supportedModels,
}: {
  version: string;
  changelogFull: string;
  knownIssues: string[];
  supportedModels: string[];
}) {
  const [showFull, setShowFull] = React.useState(false);
  const truncated = changelogFull.length > 220 && !showFull;
  const displayText = truncated
    ? changelogFull.slice(0, 220) + "..."
    : changelogFull;

  return (
    <TableRow
      aria-label={`Detail for firmware ${version}`}
      className="bg-muted hover:bg-muted"
    >
      <TableCell />
      <TableCell colSpan={5} className="py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          {/* Changelog */}
          <div className="flex-1 min-w-0">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Changelog
            </p>
            <p className="font-body text-[12px] leading-relaxed text-foreground">
              {displayText}
            </p>
            {changelogFull.length > 220 && (
              <button
                type="button"
                onClick={() => setShowFull((v) => !v)}
                className="mt-1 inline-flex items-center gap-0.5 font-body text-[11px] text-muted-foreground transition-colors duration-150 hover:text-foreground cursor-pointer"
              >
                {showFull ? "Show less" : "Read more"}
                {showFull ? (
                  <ChevronUp size={11} aria-hidden="true" />
                ) : (
                  <ChevronDown size={11} aria-hidden="true" />
                )}
              </button>
            )}
          </div>

          {/* Known issues */}
          <div className="sm:w-52 shrink-0">
            <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Known issues
            </p>
            {knownIssues.length === 0 ? (
              <p className="font-body text-[12px] text-success">None</p>
            ) : (
              <ul className="flex flex-col gap-1.5">
                {knownIssues.map((issue, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-1.5 font-body text-[12px] text-foreground"
                  >
                    <AlertTriangle
                      size={11}
                      className="mt-0.5 shrink-0 text-warning"
                      aria-hidden="true"
                    />
                    {issue}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Supported models */}
          <div className="sm:w-44 shrink-0">
            <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
              Supported models
            </p>
            <div className="flex flex-wrap gap-1">
              {supportedModels.map((m) => (
                <span
                  key={m}
                  className="inline-flex items-center rounded-pill border border-border bg-card px-2 py-0.5 font-mono text-[10px] text-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FirmwareVersions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initChannel = (searchParams.get("channel") as ChannelFilter) ?? "all";

  const [channelFilter, setChannelFilter] = React.useState<ChannelFilter>(
    CHANNEL_FILTERS.includes(initChannel) ? initChannel : "all",
  );
  const [sort, setSort] = React.useState<SortState>({
    key: "releasedAt",
    dir: "desc",
  });
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [isLoading] = React.useState(false);
  const [error] = React.useState<string | null>(null);

  const handleSort = React.useCallback((key: SortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" },
    );
  }, []);

  const handleChannelFilter = React.useCallback(
    (c: ChannelFilter) => {
      setChannelFilter(c);
      const next = new URLSearchParams(searchParams);
      if (c === "all") {
        next.delete("channel");
      } else {
        next.set("channel", c);
      }
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const filtered = React.useMemo(() => {
    let list = [...FIRMWARE_VERSIONS];
    if (channelFilter !== "all") {
      list = list.filter((v) => v.channel === channelFilter);
    }
    list.sort((a, b) => {
      let cmp = 0;
      if (sort.key === "releasedAt") {
        cmp = a.releasedAt.localeCompare(b.releasedAt);
      } else if (sort.key === "stationCount") {
        cmp = a.stationCount - b.stationCount;
      } else {
        cmp = a[sort.key].localeCompare(b[sort.key]);
      }
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [channelFilter, sort]);

  const counts: Record<ChannelFilter, number> = React.useMemo(
    () => ({
      all: FIRMWARE_VERSIONS.length,
      stable: FIRMWARE_VERSIONS.filter((v) => v.channel === "stable").length,
      beta: FIRMWARE_VERSIONS.filter((v) => v.channel === "beta").length,
      canary: FIRMWARE_VERSIONS.filter((v) => v.channel === "canary").length,
      eol: FIRMWARE_VERSIONS.filter((v) => v.channel === "eol").length,
    }),
    [],
  );

  const toggleExpand = React.useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="fw-versions-heading">
      <h2
        id="fw-versions-heading"
        className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
      >
        Versions
      </h2>

      {/* ── Filter chips ──────────────────────────────────────────────────── */}
      <div
        className="flex flex-wrap items-center gap-1.5"
        role="group"
        aria-label="Filter by channel"
      >
        {CHANNEL_FILTERS.map((ch) => {
          const active = channelFilter === ch;
          return (
            <button
              key={ch}
              type="button"
              onClick={() => handleChannelFilter(ch)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                active
                  ? "bg-muted border-border text-foreground"
                  : "bg-transparent border-transparent text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="capitalize">{ch}</span>
              <span
                className={cn(
                  "font-mono text-[10px]",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                {counts[ch]}
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
      <div className="overflow-hidden rounded-card border border-border bg-card">
        {/* Table toolbar */}
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
            aria-live="polite"
          >
            {filtered.length} version{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <caption className="sr-only">Firmware versions</caption>
            <TableHeader>
              <TableRow>
                {/* Expand toggle column */}
                <TableHead scope="col" className="w-8">
                  <span className="sr-only">Expand</span>
                </TableHead>
                <SortableHead
                  label="Version"
                  columnKey="version"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
                <SortableHead
                  label="Released"
                  columnKey="releasedAt"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[110px]"
                />
                <SortableHead
                  label="Channel"
                  columnKey="channel"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[96px]"
                />
                <SortableHead
                  label="Stations"
                  columnKey="stationCount"
                  sort={sort}
                  onSort={handleSort}
                  className="min-w-[80px] text-right"
                />
                <TableHead scope="col" className="min-w-[80px] text-right">
                  Changelog
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Loading skeleton */}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={`skel-${i}`} aria-hidden="true">
                    <TableCell>
                      <div className="h-4 w-4 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-3 w-24 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-5 w-16 rounded-pill bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="ml-auto h-3 w-8 rounded bg-muted animate-pulse" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="ml-auto h-3 w-10 rounded bg-muted animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))}

              {/* Empty state */}
              {!isLoading && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-36">
                    <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                      <p className="font-body text-[13px] text-foreground">
                        No versions match the selected channel.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleChannelFilter("all")}
                        className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
                      >
                        <X size={11} aria-hidden="true" />
                        Clear filter
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!isLoading &&
                filtered.map((v) => {
                  const isExpanded = expandedId === v.id;
                  return (
                    <React.Fragment key={v.id}>
                      <TableRow
                        onClick={() => toggleExpand(v.id)}
                        className={cn(
                          "cursor-pointer transition-colors duration-150 ease-out",
                          isExpanded && "bg-muted hover:bg-muted",
                        )}
                        aria-expanded={isExpanded}
                      >
                        {/* Expand icon */}
                        <TableCell>
                          <span
                            className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground"
                            aria-hidden="true"
                          >
                            {isExpanded ? (
                              <ChevronUp size={13} />
                            ) : (
                              <ChevronDown size={13} />
                            )}
                          </span>
                        </TableCell>

                        {/* Version */}
                        <TableCell>
                          <span className="font-mono text-[13px] font-medium text-foreground">
                            {v.version}
                          </span>
                        </TableCell>

                        {/* Released */}
                        <TableCell>
                          <span className="font-mono text-[12px] text-muted-foreground">
                            {formatDate(v.releasedAt)}
                          </span>
                        </TableCell>

                        {/* Channel */}
                        <TableCell>
                          <ChannelPill channel={v.channel} />
                        </TableCell>

                        {/* Station count */}
                        <TableCell className="text-right">
                          <span className="font-mono text-[12px] text-foreground">
                            {v.stationCount}
                          </span>
                        </TableCell>

                        {/* Changelog link */}
                        <TableCell
                          className="text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a
                            href={v.changelogUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Changelog for ${v.version} (opens in new tab)`}
                            className="inline-flex items-center gap-1 font-body text-[12px] text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Notes
                            <ExternalLink size={11} aria-hidden="true" />
                          </a>
                        </TableCell>
                      </TableRow>

                      {/* Expanded inline detail */}
                      {isExpanded && (
                        <ExpandedDetail
                          version={v.version}
                          changelogFull={v.changelogFull}
                          knownIssues={v.knownIssues}
                          supportedModels={v.supportedModels}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
