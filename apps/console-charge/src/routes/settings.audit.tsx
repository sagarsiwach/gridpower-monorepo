/**
 * Settings → Audit log
 * Route: /settings/audit
 *
 * Who did what when. Filterable by actor, action type, and entity.
 * Mocked with ~40 entries spanning the last 7 days. Cells: Timestamp,
 * Actor, Action, Entity, IP, Details (expandable).
 */

import * as React from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  AlertTriangle,
  RefreshCw,
  ClipboardList,
} from "lucide-react";
import { EmptyState, cn } from "@gridpower/ui";

// ─── Tokens ──────────────────────────────────────────────────────────────────

const META_TEXT_CLS = "font-mono text-[11px] text-muted-foreground";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";

// ─── Mock data ───────────────────────────────────────────────────────────────

type ActionType =
  | "alert.ack"
  | "alert.raised"
  | "tariff.update"
  | "tariff.create"
  | "station.reboot"
  | "station.firmware"
  | "member.invite"
  | "member.role_change"
  | "key.rotate"
  | "key.create"
  | "webhook.add"
  | "webhook.disable"
  | "session.refund"
  | "payout.export";

interface AuditEntry {
  id: string;
  ts: string; // ISO date string
  actor: string;
  actorType: "user" | "system";
  action: ActionType;
  entity: string;
  ip: string;
  details: string;
}

// IPs from common Indian cellular and corporate ranges (Jio / Airtel / VI / static).
const IPS = [
  "49.36.182.114",
  "49.205.71.40",
  "27.34.62.12",
  "103.27.84.220",
  "157.32.18.91",
  "182.71.150.18",
  "115.244.61.7",
  "117.96.45.231",
];

const ACTORS = [
  { name: "Sagar Siwach", type: "user" as const },
  { name: "Naresh Kumar", type: "user" as const },
  { name: "Vikas Bhatt", type: "user" as const },
  { name: "Anita Joshi", type: "user" as const },
  { name: "system", type: "system" as const },
];

// Build ~40 entries within the last 7 days, deterministic so SSR/CSR match.
const NOW = new Date("2026-04-25T18:30:00+05:30").getTime();
const HOUR = 60 * 60 * 1000;

function isoMinus(hoursAgo: number): string {
  return new Date(NOW - hoursAgo * HOUR).toISOString();
}

function pick<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]!;
}

const RAW: Array<Omit<AuditEntry, "id" | "ip"> & { ipIdx: number }> = [
  { ts: isoMinus(0.4), actor: "Sagar Siwach", actorType: "user", action: "tariff.update", entity: "TAR-23", details: "Off-peak rate raised to ₹14.50 per kWh, effective immediately.", ipIdx: 0 },
  { ts: isoMinus(1.2), actor: "Naresh Kumar", actorType: "user", action: "alert.ack", entity: "ALT-44", details: "Acknowledged after on-site engineer dispatched to GPWR-Blr-04.", ipIdx: 1 },
  { ts: isoMinus(2.1), actor: "system", actorType: "system", action: "key.rotate", entity: "API-7", details: "Auto-rotated production key after 90-day TTL.", ipIdx: 2 },
  { ts: isoMinus(3.8), actor: "Vikas Bhatt", actorType: "user", action: "station.reboot", entity: "GPWR-Blr-01", details: "Soft reboot issued from console after firmware update stalled.", ipIdx: 3 },
  { ts: isoMinus(4.5), actor: "Anita Joshi", actorType: "user", action: "payout.export", entity: "PAY-2026-04", details: "Exported settlement CSV for April 2026 to billing@gridpower.co.in.", ipIdx: 4 },
  { ts: isoMinus(6.2), actor: "Sagar Siwach", actorType: "user", action: "member.invite", entity: "rohit@gridpower.co.in", details: "Invited as Support, expires in 7 days.", ipIdx: 0 },
  { ts: isoMinus(8.0), actor: "Naresh Kumar", actorType: "user", action: "tariff.create", entity: "TAR-31", details: "Created new tariff Goa Mall DC for 60 kW DC ports.", ipIdx: 1 },
  { ts: isoMinus(10.5), actor: "system", actorType: "system", action: "alert.raised", entity: "ALT-51", details: "Station offline for 92 seconds at GPWR-Pun-02.", ipIdx: 5 },
  { ts: isoMinus(12.1), actor: "Vikas Bhatt", actorType: "user", action: "alert.ack", entity: "ALT-51", details: "Acknowledged, network outage with ISP confirmed.", ipIdx: 3 },
  { ts: isoMinus(14.7), actor: "Sagar Siwach", actorType: "user", action: "webhook.add", entity: "WHK-09", details: "Subscribed ops endpoint to session.start and session.end events.", ipIdx: 0 },
  { ts: isoMinus(18.0), actor: "Anita Joshi", actorType: "user", action: "session.refund", entity: "SES-8821", details: "Refunded ₹420 for failed handshake on driver DRV-411.", ipIdx: 4 },
  { ts: isoMinus(22.3), actor: "Naresh Kumar", actorType: "user", action: "station.firmware", entity: "GPWR-Goa-03", details: "Pushed firmware 2.4.1 to 8 ports, all reported success.", ipIdx: 1 },
  { ts: isoMinus(26.8), actor: "system", actorType: "system", action: "alert.raised", entity: "ALT-52", details: "High-temp warning on port 3 of GPWR-Mum-07, 67 degrees C.", ipIdx: 6 },
  { ts: isoMinus(29.0), actor: "Vikas Bhatt", actorType: "user", action: "alert.ack", entity: "ALT-52", details: "Acknowledged after port derated to 22 kW.", ipIdx: 3 },
  { ts: isoMinus(33.4), actor: "Sagar Siwach", actorType: "user", action: "member.role_change", entity: "Naresh Kumar", details: "Promoted from Operator to Admin.", ipIdx: 0 },
  { ts: isoMinus(38.1), actor: "system", actorType: "system", action: "key.rotate", entity: "API-3", details: "Auto-rotated staging key after 90-day TTL.", ipIdx: 2 },
  { ts: isoMinus(42.0), actor: "Anita Joshi", actorType: "user", action: "payout.export", entity: "PAY-2026-W17", details: "Exported weekly partner payout breakdown.", ipIdx: 4 },
  { ts: isoMinus(46.5), actor: "Naresh Kumar", actorType: "user", action: "tariff.update", entity: "TAR-12", details: "Idle fee bumped to ₹3 per minute after 10 minute grace.", ipIdx: 1 },
  { ts: isoMinus(50.7), actor: "Vikas Bhatt", actorType: "user", action: "station.reboot", entity: "GPWR-Hyd-05", details: "Rebooted to clear stuck OCPP session.", ipIdx: 3 },
  { ts: isoMinus(55.9), actor: "Sagar Siwach", actorType: "user", action: "key.create", entity: "API-9", details: "Created Analytics-only key, scope read.", ipIdx: 0 },
  { ts: isoMinus(60.3), actor: "system", actorType: "system", action: "alert.raised", entity: "ALT-55", details: "Station offline for 105 seconds at GPWR-Del-02.", ipIdx: 7 },
  { ts: isoMinus(63.0), actor: "Naresh Kumar", actorType: "user", action: "alert.ack", entity: "ALT-55", details: "Acknowledged, scheduled site visit for tomorrow.", ipIdx: 1 },
  { ts: isoMinus(68.2), actor: "Anita Joshi", actorType: "user", action: "session.refund", entity: "SES-8755", details: "Refunded ₹85 for over-billing on RFID DRV-203.", ipIdx: 4 },
  { ts: isoMinus(72.5), actor: "Sagar Siwach", actorType: "user", action: "webhook.disable", entity: "WHK-04", details: "Disabled failing endpoint after 12 consecutive 5xx responses.", ipIdx: 0 },
  { ts: isoMinus(78.0), actor: "Vikas Bhatt", actorType: "user", action: "station.firmware", entity: "GPWR-Blr-02", details: "Pushed firmware 2.4.0 to 4 ports.", ipIdx: 3 },
  { ts: isoMinus(82.1), actor: "Naresh Kumar", actorType: "user", action: "tariff.create", entity: "TAR-30", details: "Created tariff Mumbai Airport for 180 kW DC.", ipIdx: 1 },
  { ts: isoMinus(85.6), actor: "system", actorType: "system", action: "alert.raised", entity: "ALT-58", details: "RFID reader heartbeat lost on GPWR-Pun-01 port 2.", ipIdx: 5 },
  { ts: isoMinus(88.0), actor: "Vikas Bhatt", actorType: "user", action: "alert.ack", entity: "ALT-58", details: "Acknowledged, reader replaced on site.", ipIdx: 3 },
  { ts: isoMinus(94.3), actor: "Sagar Siwach", actorType: "user", action: "member.invite", entity: "anita@gridpower.co.in", details: "Invited as Finance.", ipIdx: 0 },
  { ts: isoMinus(98.5), actor: "Anita Joshi", actorType: "user", action: "payout.export", entity: "PAY-2026-W16", details: "Exported partner payout for week 16.", ipIdx: 4 },
  { ts: isoMinus(105.0), actor: "system", actorType: "system", action: "key.rotate", entity: "API-1", details: "Auto-rotated production key after 90-day TTL.", ipIdx: 2 },
  { ts: isoMinus(110.2), actor: "Naresh Kumar", actorType: "user", action: "tariff.update", entity: "TAR-18", details: "Peak window adjusted to 18:00 to 22:00 IST.", ipIdx: 1 },
  { ts: isoMinus(116.4), actor: "Vikas Bhatt", actorType: "user", action: "station.reboot", entity: "GPWR-Goa-01", details: "Soft reboot issued after CT-clamp drift detected.", ipIdx: 3 },
  { ts: isoMinus(122.0), actor: "Sagar Siwach", actorType: "user", action: "webhook.add", entity: "WHK-11", details: "Subscribed billing endpoint to invoice.paid events.", ipIdx: 0 },
  { ts: isoMinus(128.7), actor: "system", actorType: "system", action: "alert.raised", entity: "ALT-61", details: "Power module overheat at GPWR-Chn-04, derated automatically.", ipIdx: 6 },
  { ts: isoMinus(132.0), actor: "Naresh Kumar", actorType: "user", action: "alert.ack", entity: "ALT-61", details: "Acknowledged, ticket WO-1188 raised.", ipIdx: 1 },
  { ts: isoMinus(140.5), actor: "Anita Joshi", actorType: "user", action: "session.refund", entity: "SES-8602", details: "Refunded ₹620 for stuck session on driver DRV-378.", ipIdx: 4 },
  { ts: isoMinus(148.0), actor: "Sagar Siwach", actorType: "user", action: "member.role_change", entity: "Vikas Bhatt", details: "Promoted from Viewer to Operator.", ipIdx: 0 },
  { ts: isoMinus(156.4), actor: "Vikas Bhatt", actorType: "user", action: "station.firmware", entity: "GPWR-Mum-03", details: "Pushed firmware 2.3.9 to 6 ports.", ipIdx: 3 },
  { ts: isoMinus(164.0), actor: "system", actorType: "system", action: "alert.raised", entity: "ALT-64", details: "Station offline for 88 seconds at GPWR-Hyd-02.", ipIdx: 7 },
];

const ENTRIES: AuditEntry[] = RAW.map((r, i) => ({
  ...r,
  id: `AUD-${String(8000 + i).padStart(5, "0")}`,
  ip: pick(IPS, r.ipIdx),
}));

// ─── Action label + tone ─────────────────────────────────────────────────────

const ACTION_TONE: Record<ActionType, { bg: string; text: string }> = {
  "alert.ack": { bg: "bg-info/10", text: "text-info" },
  "alert.raised": { bg: "bg-error/10", text: "text-error" },
  "tariff.update": { bg: "bg-warning/10", text: "text-warning" },
  "tariff.create": { bg: "bg-warning/10", text: "text-warning" },
  "station.reboot": { bg: "bg-info/10", text: "text-info" },
  "station.firmware": { bg: "bg-info/10", text: "text-info" },
  "member.invite": { bg: "bg-success/10", text: "text-success" },
  "member.role_change": { bg: "bg-success/10", text: "text-success" },
  "key.rotate": { bg: "bg-muted", text: "text-muted-foreground" },
  "key.create": { bg: "bg-muted", text: "text-muted-foreground" },
  "webhook.add": { bg: "bg-muted", text: "text-muted-foreground" },
  "webhook.disable": { bg: "bg-error/10", text: "text-error" },
  "session.refund": { bg: "bg-warning/10", text: "text-warning" },
  "payout.export": { bg: "bg-muted", text: "text-muted-foreground" },
};

// ─── Date format ─────────────────────────────────────────────────────────────

function fmtTs(iso: string): string {
  const d = new Date(iso);
  // Stable, locale-free format: Apr 24, 14:32 IST
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[d.getUTCMonth()]!;
  const day = d.getUTCDate();
  // Display in IST (UTC+5:30) for consistency with other operator copy.
  const istMs = d.getTime() + 5.5 * HOUR;
  const ist = new Date(istMs);
  const hh = String(ist.getUTCHours()).padStart(2, "0");
  const mm = String(ist.getUTCMinutes()).padStart(2, "0");
  return `${month} ${day}, ${hh}:${mm}`;
}

// ─── Filter values ───────────────────────────────────────────────────────────

const ACTOR_FILTERS = ["all", ...ACTORS.map((a) => a.name)] as const;
const ACTION_FILTERS = [
  "all",
  "alert",
  "tariff",
  "station",
  "member",
  "key",
  "webhook",
  "session",
  "payout",
] as const;

type ActorFilter = (typeof ACTOR_FILTERS)[number];
type ActionFilter = (typeof ACTION_FILTERS)[number];

// ─── Page ────────────────────────────────────────────────────────────────────

type AsyncState = "idle" | "loading" | "error";

export default function AuditSettings() {
  const [state, setState] = React.useState<AsyncState>("idle");
  const [actor, setActor] = React.useState<ActorFilter>("all");
  const [action, setAction] = React.useState<ActionFilter>("all");
  const [search, setSearch] = React.useState("");
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set());

  const handleRetry = React.useCallback(() => {
    setState("loading");
    setTimeout(() => setState("idle"), 350);
  }, []);

  const filtered = React.useMemo(() => {
    return ENTRIES.filter((e) => {
      if (actor !== "all" && e.actor !== actor) return false;
      if (action !== "all" && !e.action.startsWith(action)) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        if (
          !e.entity.toLowerCase().includes(q) &&
          !e.action.toLowerCase().includes(q) &&
          !e.details.toLowerCase().includes(q) &&
          !e.actor.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [actor, action, search]);

  const toggle = React.useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (state === "loading") {
    return (
      <section
        aria-labelledby="audit-heading"
        aria-busy="true"
        className="max-w-4xl"
      >
        <h2 id="audit-heading" className="sr-only">
          Audit log
        </h2>
        <div role="status" className={META_TEXT_CLS}>
          Loading audit log.
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section aria-labelledby="audit-heading" className="max-w-4xl">
        <h2 id="audit-heading" className="sr-only">
          Audit log
        </h2>
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle
            size={14}
            aria-hidden="true"
            className="text-error shrink-0"
          />
          <span className="font-body text-[12px] text-foreground">
            Could not load audit log.
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="audit-heading" className="max-w-4xl">
      <h2 id="audit-heading" className="sr-only">
        Audit log
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-4 flex-wrap">
        <div className="flex flex-col">
          <label
            htmlFor="audit-actor"
            className={`${META_CAPS_CLS} mb-1`}
          >
            Actor
          </label>
          <select
            id="audit-actor"
            value={actor}
            onChange={(e) => setActor(e.target.value as ActorFilter)}
            className="h-9 rounded-btn border border-border bg-background px-3 font-body text-[12px] text-foreground cursor-pointer min-w-[160px]"
          >
            {ACTOR_FILTERS.map((a) => (
              <option key={a} value={a}>
                {a === "all" ? "All actors" : a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="audit-action"
            className={`${META_CAPS_CLS} mb-1`}
          >
            Action type
          </label>
          <select
            id="audit-action"
            value={action}
            onChange={(e) => setAction(e.target.value as ActionFilter)}
            className="h-9 rounded-btn border border-border bg-background px-3 font-body text-[12px] text-foreground cursor-pointer min-w-[140px]"
          >
            {ACTION_FILTERS.map((a) => (
              <option key={a} value={a}>
                {a === "all" ? "All actions" : a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col flex-1 min-w-[200px]">
          <label htmlFor="audit-search" className={`${META_CAPS_CLS} mb-1`}>
            Search entity or details
          </label>
          <div className="relative">
            <Search
              size={12}
              aria-hidden="true"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              id="audit-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="e.g. TAR-23 or station.reboot"
              className={cn(
                "h-9 w-full rounded-btn pl-7 pr-3 font-body text-[12px] outline-none",
                "bg-background border border-border",
                "text-foreground placeholder:text-muted-foreground",
                "focus:border-primary focus:ring-1 focus:ring-primary/20",
              )}
            />
          </div>
        </div>

        <span
          className={`${META_TEXT_CLS} pb-2`}
          aria-live="polite"
        >
          {filtered.length} of {ENTRIES.length} entries
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-card border border-border">
          <EmptyState
            icon={<ClipboardList size={20} aria-hidden="true" />}
            title="No audit entries match"
            description="Try clearing filters or widening the search."
          />
        </div>
      ) : (
        <div
          className="rounded-card border border-border overflow-x-auto"
          role="region"
          aria-label="Audit entries"
        >
          <table className="w-full border-collapse min-w-[820px]">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th
                  scope="col"
                  className={cn(META_CAPS_CLS, "text-left px-3 py-2 font-normal w-8")}
                  aria-label="Expand row"
                >
                  <span className="sr-only">Expand</span>
                </th>
                <th
                  scope="col"
                  aria-sort="descending"
                  className={cn(META_CAPS_CLS, "text-left px-3 py-2 font-normal w-[140px]")}
                >
                  Timestamp
                </th>
                <th
                  scope="col"
                  aria-sort="none"
                  className={cn(META_CAPS_CLS, "text-left px-3 py-2 font-normal w-[150px]")}
                >
                  Actor
                </th>
                <th
                  scope="col"
                  aria-sort="none"
                  className={cn(META_CAPS_CLS, "text-left px-3 py-2 font-normal w-[170px]")}
                >
                  Action
                </th>
                <th
                  scope="col"
                  aria-sort="none"
                  className={cn(META_CAPS_CLS, "text-left px-3 py-2 font-normal")}
                >
                  Entity
                </th>
                <th
                  scope="col"
                  aria-sort="none"
                  className={cn(META_CAPS_CLS, "text-left px-3 py-2 font-normal w-[140px]")}
                >
                  IP
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => {
                const isOpen = expanded.has(e.id);
                const tone = ACTION_TONE[e.action];
                return (
                  <React.Fragment key={e.id}>
                    <tr
                      className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors cursor-pointer"
                      onClick={() => toggle(e.id)}
                    >
                      <td className="px-3 py-2.5 align-top">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`audit-details-${e.id}`}
                          aria-label={
                            isOpen
                              ? `Collapse ${e.id}`
                              : `Expand ${e.id} for details`
                          }
                          onClick={(ev) => {
                            ev.stopPropagation();
                            toggle(e.id);
                          }}
                          className="flex items-center justify-center w-5 h-5 rounded text-muted-foreground hover:bg-muted cursor-pointer"
                        >
                          {isOpen ? (
                            <ChevronDown size={12} aria-hidden="true" />
                          ) : (
                            <ChevronRight size={12} aria-hidden="true" />
                          )}
                        </button>
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <span className={META_TEXT_CLS}>{fmtTs(e.ts)}</span>
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <span
                          className={cn(
                            "font-body text-[12px]",
                            e.actorType === "system"
                              ? "text-muted-foreground italic"
                              : "text-foreground",
                          )}
                        >
                          {e.actor}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px]",
                            tone.bg,
                            tone.text,
                          )}
                        >
                          {e.action}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <span className="font-mono text-[11px] text-foreground">
                          {e.entity}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <span className={META_TEXT_CLS}>{e.ip}</span>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr
                        id={`audit-details-${e.id}`}
                        className="bg-muted/40 border-b border-border"
                      >
                        <td className="px-3 py-3" />
                        <td colSpan={5} className="px-3 py-3">
                          <dl className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-1.5 gap-x-4">
                            <dt className={META_CAPS_CLS}>Audit ID</dt>
                            <dd className="font-mono text-[11px] text-foreground">
                              {e.id}
                            </dd>
                            <dt className={META_CAPS_CLS}>Details</dt>
                            <dd className="font-body text-[12px] text-foreground leading-relaxed">
                              {e.details}
                            </dd>
                          </dl>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
