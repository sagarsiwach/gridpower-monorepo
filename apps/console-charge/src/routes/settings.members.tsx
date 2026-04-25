/**
 * Settings → Members
 * Route: /settings/members
 *
 * Team list with role assignments, invite-by-email form, deactivate
 * controls, and an audit trail of recent role changes. Roles cover
 * Owner / Admin / Operator / Viewer / Finance / Support.
 */

import * as React from "react";
import {
  Send,
  MoreHorizontal,
  UserPlus,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Input, EmptyState, cn } from "@gridpower/ui";

// ─── Tokens ──────────────────────────────────────────────────────────────────

const META_TEXT_CLS = "font-mono text-[11px] text-muted-foreground";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";
const TABLE_HEADER_BAR_CLS = "px-4 py-2 bg-muted border-b border-border";
const TABLE_ROW_CLS =
  "px-4 py-3 border-b border-border last:border-0 items-center";
const ICON_BUTTON_CLS =
  "flex items-center justify-center w-7 h-7 rounded-btn hover:bg-muted text-muted-foreground transition-colors cursor-pointer";

// ─── Roles ───────────────────────────────────────────────────────────────────

type MemberRole =
  | "Owner"
  | "Admin"
  | "Operator"
  | "Viewer"
  | "Finance"
  | "Support";

const ROLE_STYLES: Record<MemberRole, { bg: string; text: string }> = {
  Owner: { bg: "bg-primary/10", text: "text-primary" },
  Admin: { bg: "bg-error/10", text: "text-error" },
  Operator: { bg: "bg-info/10", text: "text-info" },
  Viewer: { bg: "bg-muted", text: "text-muted-foreground" },
  Finance: { bg: "bg-warning/10", text: "text-warning" },
  Support: { bg: "bg-success/10", text: "text-success" },
};

const ROLE_DESCRIPTIONS: Array<{ role: MemberRole; desc: string }> = [
  { role: "Owner", desc: "Full control including transfer of ownership." },
  { role: "Admin", desc: "Manage stations, members, billing and API keys." },
  { role: "Operator", desc: "Run stations, ack alerts, schedule maintenance." },
  { role: "Viewer", desc: "Read-only access to dashboards and reports." },
  { role: "Finance", desc: "Billing, invoices, payouts and refund flows." },
  { role: "Support", desc: "Driver lookup, session retries, refund requests." },
];

// ─── Mock team ───────────────────────────────────────────────────────────────

const TEAM_MEMBERS: Array<{
  name: string;
  email: string;
  role: MemberRole;
  active: string;
  initials: string;
  status: "active" | "invited";
}> = [
  {
    name: "Sagar Siwach",
    email: "sagar@gridpower.co.in",
    role: "Owner",
    active: "Now",
    initials: "SS",
    status: "active",
  },
  {
    name: "Naresh Kumar",
    email: "naresh@gridpower.co.in",
    role: "Admin",
    active: "12 min ago",
    initials: "NK",
    status: "active",
  },
  {
    name: "Priya Menon",
    email: "priya@gridpower.co.in",
    role: "Operator",
    active: "2h ago",
    initials: "PM",
    status: "active",
  },
  {
    name: "Vikas Bhatt",
    email: "vikas@gridpower.co.in",
    role: "Operator",
    active: "Yesterday",
    initials: "VB",
    status: "active",
  },
  {
    name: "Anita Joshi",
    email: "anita@gridpower.co.in",
    role: "Finance",
    active: "Yesterday",
    initials: "AJ",
    status: "active",
  },
  {
    name: "Rohit Pawar",
    email: "rohit@gridpower.co.in",
    role: "Support",
    active: "3 days ago",
    initials: "RP",
    status: "active",
  },
  {
    name: "Neha Kulkarni",
    email: "neha@gridpower.co.in",
    role: "Viewer",
    active: "Pending invite",
    initials: "NE",
    status: "invited",
  },
];

// ─── Mock role-change audit trail ────────────────────────────────────────────

const ROLE_CHANGES: Array<{
  ts: string;
  actor: string;
  subject: string;
  from: MemberRole | "—";
  to: MemberRole | "Removed";
}> = [
  {
    ts: "Apr 24, 14:32",
    actor: "Sagar Siwach",
    subject: "Naresh Kumar",
    from: "Operator",
    to: "Admin",
  },
  {
    ts: "Apr 22, 09:11",
    actor: "Sagar Siwach",
    subject: "Anita Joshi",
    from: "—",
    to: "Finance",
  },
  {
    ts: "Apr 19, 18:47",
    actor: "Naresh Kumar",
    subject: "Vikas Bhatt",
    from: "Viewer",
    to: "Operator",
  },
  {
    ts: "Apr 14, 11:02",
    actor: "Sagar Siwach",
    subject: "Anand Verma",
    from: "Operator",
    to: "Removed",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

type AsyncState = "idle" | "loading" | "error";

export default function MembersSettings() {
  const [state, setState] = React.useState<AsyncState>("idle");
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<MemberRole>("Operator");
  const members = TEAM_MEMBERS;

  const handleRetry = React.useCallback(() => {
    setState("loading");
    setTimeout(() => setState("idle"), 350);
  }, []);

  if (state === "loading") {
    return (
      <section
        aria-labelledby="members-heading"
        aria-busy="true"
        className="max-w-2xl"
      >
        <h2 id="members-heading" className="sr-only">
          Members
        </h2>
        <div role="status" className={META_TEXT_CLS}>
          Loading team.
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section aria-labelledby="members-heading" className="max-w-2xl">
        <h2 id="members-heading" className="sr-only">
          Members
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
            Could not load members.
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
    <section aria-labelledby="members-heading" className="max-w-2xl">
      <h2 id="members-heading" className="sr-only">
        Members
      </h2>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-body text-[13px] font-semibold text-foreground">
          {members.length} {members.length === 1 ? "member" : "members"}
        </span>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => console.log("Open invite drawer (stub)")}
        >
          <Send size={12} aria-hidden="true" />
          Invite member
        </button>
      </div>

      {/* Members table */}
      {members.length === 0 ? (
        <div className="rounded-card border border-border mb-5">
          <EmptyState
            icon={<UserPlus size={20} aria-hidden="true" />}
            title="No team members yet"
            description="Invite your first teammate to start collaborating."
          />
        </div>
      ) : (
        <div
          role="table"
          aria-label="Team members"
          className="rounded-card border border-border overflow-x-auto mb-5"
        >
          <div
            role="row"
            className={`grid grid-cols-[1fr_1fr_110px_120px_36px] min-w-[680px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Member", "Email", "Role", "Last active"].map((h) => (
              <span
                key={h}
                role="columnheader"
                aria-sort="none"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
            <span role="columnheader" className="sr-only">
              Actions
            </span>
          </div>

          {members.map((m, i) => {
            const roleStyle = ROLE_STYLES[m.role];
            const isInvited = m.status === "invited";
            return (
              <div
                key={m.email}
                role="row"
                className={`grid grid-cols-[1fr_1fr_110px_120px_36px] min-w-[680px] ${TABLE_ROW_CLS}`}
              >
                <div role="cell" className="flex items-center gap-2.5">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-body text-[10px] font-semibold shrink-0",
                      i === 0 ? "opacity-100" : "opacity-70",
                    )}
                  >
                    {m.initials}
                  </div>
                  <span className="font-body text-[13px] font-medium text-foreground">
                    {m.name}
                    {isInvited && (
                      <span
                        className={cn(
                          "ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider",
                          "bg-warning/10 text-warning",
                        )}
                      >
                        Invited
                      </span>
                    )}
                  </span>
                </div>

                <span role="cell" className={`${META_TEXT_CLS} truncate pr-2`}>
                  {m.email}
                </span>

                <span
                  role="cell"
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium w-fit",
                    roleStyle.bg,
                    roleStyle.text,
                  )}
                >
                  {m.role}
                </span>

                <span role="cell" className={META_TEXT_CLS}>
                  {m.active}
                </span>

                <button
                  type="button"
                  aria-label={`Actions for ${m.name}`}
                  className={ICON_BUTTON_CLS}
                  onClick={() => console.log("Member actions:", m.name)}
                >
                  <MoreHorizontal size={14} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Invite by email */}
      <div className="rounded-card border border-border bg-muted p-4 mb-5">
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
          Invite by email
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="invite-email" className="sr-only">
            Email address to invite
          </label>
          <Input
            id="invite-email"
            placeholder="colleague@company.com"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <label htmlFor="invite-role" className="sr-only">
            Role for invited member
          </label>
          <select
            id="invite-role"
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as MemberRole)}
            className="h-9 rounded-btn border border-border bg-background px-3 font-body text-[12px] text-foreground cursor-pointer"
          >
            {(
              ["Admin", "Operator", "Viewer", "Finance", "Support"] as MemberRole[]
            ).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap"
            onClick={() => {
              console.log("Send invite (stub):", inviteEmail, inviteRole);
              setInviteEmail("");
            }}
          >
            Send invite
          </button>
        </div>
      </div>

      {/* Role descriptions */}
      <div className="rounded-card border border-border bg-muted p-4 mb-5">
        <h3 className={`${META_CAPS_CLS} mb-3`}>Role permissions</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
          {ROLE_DESCRIPTIONS.map((row) => (
            <div key={row.role} className="flex flex-col gap-0.5">
              <dt
                className={cn(
                  "font-body text-[11px] font-semibold w-fit px-1.5 rounded",
                  ROLE_STYLES[row.role].bg,
                  ROLE_STYLES[row.role].text,
                )}
              >
                {row.role}
              </dt>
              <dd className="font-body text-[11px] text-muted-foreground leading-snug">
                {row.desc}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Role change audit trail */}
      <div>
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
          Recent role changes
        </h3>
        <div
          role="table"
          aria-label="Role change history"
          className="rounded-card border border-border overflow-x-auto"
        >
          <div
            role="row"
            className={`grid grid-cols-[120px_1fr_1fr_110px_110px] min-w-[600px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Timestamp", "Actor", "Subject", "From", "To"].map((h) => (
              <span
                key={h}
                role="columnheader"
                aria-sort="none"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
          </div>
          {ROLE_CHANGES.map((c, i) => (
            <div
              key={i}
              role="row"
              className={`grid grid-cols-[120px_1fr_1fr_110px_110px] min-w-[600px] ${TABLE_ROW_CLS}`}
            >
              <span role="cell" className={META_TEXT_CLS}>
                {c.ts}
              </span>
              <span
                role="cell"
                className="font-body text-[12px] text-foreground"
              >
                {c.actor}
              </span>
              <span
                role="cell"
                className="font-body text-[12px] text-foreground"
              >
                {c.subject}
              </span>
              <span role="cell" className={META_TEXT_CLS}>
                {c.from}
              </span>
              <span
                role="cell"
                className={cn(
                  "font-mono text-[11px]",
                  c.to === "Removed" ? "text-error" : "text-foreground",
                )}
              >
                {c.to}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
