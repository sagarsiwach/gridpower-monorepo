import * as React from "react";
import {
  Building2,
  Users,
  CreditCard,
  Key,
  Bell,
  Plus,
  Send,
  Eye,
  EyeOff,
  Download,
  MoreHorizontal,
  Upload,
  CheckCircle2,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Switch,
} from "@gridpower/ui";

// ─── Shared primitives ────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-body text-[11px] font-medium text-sand-9 dark:text-dark-9 mb-1.5">
      {children}
    </label>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-5 mt-1 border-t border-border dark:border-dark-6">
      <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12 mb-4">
        {label}
      </div>
    </div>
  );
}

function SaveBar({ saved = false }: { saved?: boolean }) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border dark:border-dark-6">
      {saved ? (
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-success">
          <CheckCircle2 size={12} />
          Saved automatically
        </span>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          className="px-4 py-2 rounded-btn border border-border dark:border-dark-6 font-body text-[13px] text-sand-9 dark:text-dark-9 hover:bg-sand-2 dark:hover:bg-dark-3 transition-colors cursor-pointer"
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[13px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => console.log("Save changes (stub)")}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

// ─── Toggle row ───────────────────────────────────────────────────────────────

function ToggleRow({
  label,
  sub,
  defaultChecked = false,
}: {
  label: string;
  sub?: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = React.useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b border-border dark:border-dark-6 last:border-0">
      <div className="flex-1 min-w-0 pr-6">
        <div className="font-body text-[13px] font-medium text-foreground dark:text-dark-12">
          {label}
        </div>
        {sub && (
          <div className="font-body text-[11px] text-sand-9 dark:text-dark-9 mt-0.5">
            {sub}
          </div>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={(val) => {
          setChecked(val);
          console.log(`Toggle "${label}":`, val);
        }}
      />
    </div>
  );
}

// ─── Tab: Company ─────────────────────────────────────────────────────────────

function CompanyTab() {
  return (
    <div className="max-w-2xl">
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <FieldLabel>Company name</FieldLabel>
          <Input defaultValue="DeltaEV Mobility Pvt Ltd" />
        </div>
        <div>
          <FieldLabel>Legal entity</FieldLabel>
          <Input defaultValue="DeltaEV Mobility Private Limited" />
        </div>
        <div className="col-span-2">
          <FieldLabel>Street address</FieldLabel>
          <Input defaultValue="Plot 14, Verna Industrial Estate" />
        </div>
        <div>
          <FieldLabel>City / State</FieldLabel>
          <Input defaultValue="Goa, Goa — 403 722" />
        </div>
        <div>
          <FieldLabel>GSTIN</FieldLabel>
          <Input defaultValue="30AABCD1234E1Z5" />
        </div>
        <div>
          <FieldLabel>Website</FieldLabel>
          <Input defaultValue="https://gridpower.co.in" type="url" />
        </div>
        <div>
          <FieldLabel>PAN</FieldLabel>
          <Input defaultValue="AABCD1234E" />
        </div>
      </div>

      <SectionDivider label="Primary contact" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <div>
          <FieldLabel>Name</FieldLabel>
          <Input defaultValue="Sagar Siwach" />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <Input defaultValue="Founder & CEO" />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <Input defaultValue="sagar@gridpower.co.in" type="email" />
        </div>
        <div>
          <FieldLabel>Phone</FieldLabel>
          <Input defaultValue="+91 98765 43210" type="tel" />
        </div>
      </div>

      <SectionDivider label="Logo" />
      <div
        className="w-40 h-20 rounded-card border border-dashed border-border dark:border-dark-6 bg-sand-2 dark:bg-dark-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-sand-3 dark:hover:bg-dark-4 transition-colors"
        onClick={() => console.log("Logo upload stub")}
      >
        <Upload size={16} className="text-sand-9 dark:text-dark-9" />
        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-sand-9 dark:text-dark-9">
          Upload logo
        </span>
      </div>

      <SaveBar />
    </div>
  );
}

// ─── Tab: Team ────────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    name: "Sagar Siwach",
    email: "sagar@gridpower.co.in",
    role: "Admin" as const,
    active: "Now",
    initials: "SS",
  },
  {
    name: "Priya Menon",
    email: "priya@gridpower.co.in",
    role: "Operator" as const,
    active: "2h ago",
    initials: "PM",
  },
  {
    name: "Amit Sharma",
    email: "amit@gridpower.co.in",
    role: "Operator" as const,
    active: "Yesterday",
    initials: "AS",
  },
  {
    name: "Neha Kulkarni",
    email: "neha@gridpower.co.in",
    role: "Viewer" as const,
    active: "3 days ago",
    initials: "NK",
  },
  {
    name: "Vikram Rao",
    email: "vikram@gridpower.co.in",
    role: "Viewer" as const,
    active: "Last week",
    initials: "VR",
  },
];

type MemberRole = "Admin" | "Operator" | "Viewer";

const ROLE_STYLES: Record<MemberRole, { bg: string; text: string }> = {
  Admin: { bg: "bg-error/10 dark:bg-error/20", text: "text-error" },
  Operator: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400" },
  Viewer: { bg: "bg-sand-3 dark:bg-dark-4", text: "text-sand-9 dark:text-dark-9" },
};

const ROLE_PERMISSIONS = [
  { label: "View data", admin: true, operator: true, viewer: true },
  { label: "Manage stations", admin: true, operator: true, viewer: false },
  { label: "Billing & API", admin: true, operator: false, viewer: false },
  { label: "Invite team", admin: true, operator: false, viewer: false },
];

function TeamTab() {
  const [inviteEmail, setInviteEmail] = React.useState("");

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-body text-[13px] font-semibold text-foreground dark:text-dark-12">
          {TEAM_MEMBERS.length} members
        </span>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer"
          onClick={() => console.log("Invite member (stub)")}
        >
          <Send size={12} />
          Invite member
        </button>
      </div>

      {/* Members table */}
      <div className="rounded-card border border-border dark:border-dark-6 overflow-hidden mb-4">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1fr_100px_110px_36px] px-4 py-2 bg-sand-2 dark:bg-dark-3 border-b border-border dark:border-dark-6">
          {["Member", "Email", "Role", "Last active", ""].map((h) => (
            <span
              key={h}
              className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {TEAM_MEMBERS.map((m, i) => {
          const roleStyle = ROLE_STYLES[m.role];
          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_100px_110px_36px] px-4 py-3 border-b border-border dark:border-dark-6 last:border-0 items-center"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-body text-[10px] font-semibold shrink-0 ${
                    i === 0 ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {m.initials}
                </div>
                <span className="font-body text-[13px] font-medium text-foreground dark:text-dark-12">
                  {m.name}
                </span>
              </div>

              <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9 truncate pr-2">
                {m.email}
              </span>

              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium w-fit ${roleStyle.bg} ${roleStyle.text}`}
              >
                {m.role}
              </span>

              <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
                {m.active}
              </span>

              <button
                type="button"
                className="flex items-center justify-center w-7 h-7 rounded-btn hover:bg-sand-3 dark:hover:bg-dark-4 text-sand-9 dark:text-dark-9 transition-colors cursor-pointer"
                onClick={() => console.log("Member actions:", m.name)}
              >
                <MoreHorizontal size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Invite by email */}
      <div className="rounded-card border border-border dark:border-dark-6 bg-sand-2 dark:bg-dark-3 p-4 mb-4">
        <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12 mb-3">
          Invite by email
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="colleague@company.com"
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1"
          />
          <button
            type="button"
            className="px-4 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap"
            onClick={() => {
              console.log("Send invite (stub):", inviteEmail);
              setInviteEmail("");
            }}
          >
            Send invite
          </button>
        </div>
      </div>

      {/* Role permissions matrix */}
      <div className="rounded-card border border-border dark:border-dark-6 bg-sand-2 dark:bg-dark-3 p-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9 mb-3">
          Role permissions
        </div>
        <div className="grid grid-cols-[120px_1fr_1fr_1fr] gap-y-1.5">
          {/* Header */}
          <span />
          {(["Admin", "Operator", "Viewer"] as MemberRole[]).map((role) => (
            <span
              key={role}
              className={`font-body text-[11px] font-semibold ${ROLE_STYLES[role].text}`}
            >
              {role}
            </span>
          ))}

          {/* Permission rows */}
          {ROLE_PERMISSIONS.map((perm) => (
            <React.Fragment key={perm.label}>
              <span className="font-body text-[12px] text-sand-9 dark:text-dark-9">
                {perm.label}
              </span>
              <span className="font-mono text-[12px] text-success">
                {perm.admin ? "✓" : "—"}
              </span>
              <span
                className={`font-mono text-[12px] ${perm.operator ? "text-success" : "text-sand-9 dark:text-dark-9"}`}
              >
                {perm.operator ? "✓" : "—"}
              </span>
              <span
                className={`font-mono text-[12px] ${perm.viewer ? "text-success" : "text-sand-9 dark:text-dark-9"}`}
              >
                {perm.viewer ? "✓" : "—"}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Billing ─────────────────────────────────────────────────────────────

const INVOICES = [
  { date: "Apr 2026", amount: "₹24,999", status: "Paid", id: "INV-2026-04" },
  { date: "Mar 2026", amount: "₹24,999", status: "Paid", id: "INV-2026-03" },
  { date: "Feb 2026", amount: "₹24,999", status: "Paid", id: "INV-2026-02" },
  { date: "Jan 2026", amount: "₹24,999", status: "Paid", id: "INV-2026-01" },
];

const USAGE_METRICS = [
  { label: "kWh delivered", used: 39800, limit: 50000, unit: "kWh" },
  { label: "API calls", used: 142800, limit: 500000, unit: "calls" },
  { label: "Storage", used: 2.4, limit: 10, unit: "GB" },
];

function BillingTab() {
  return (
    <div className="max-w-2xl">
      {/* Current plan */}
      <div className="rounded-card border border-primary/30 border-l-[3px] border-l-primary bg-card dark:bg-dark-2 p-5 mb-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9 mb-1.5">
              Current plan
            </div>
            <div className="font-display text-[22px] font-semibold text-foreground dark:text-dark-12 leading-none">
              GridCharge Pro
            </div>
            <div className="font-mono text-[13px] text-primary mt-1.5">
              ₹24,999 / month
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
              Renews
            </div>
            <div className="font-mono text-[12px] text-foreground dark:text-dark-12 mt-0.5">
              May 25, 2026
            </div>
            <button
              type="button"
              className="mt-2 px-3 py-1.5 rounded-btn border border-border dark:border-dark-6 font-body text-[11px] text-foreground dark:text-dark-12 hover:bg-sand-2 dark:hover:bg-dark-3 transition-colors cursor-pointer"
              onClick={() => console.log("Manage plan (stub)")}
            >
              Manage plan →
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-5">
        <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12 mb-3">
          Usage this month
        </div>
        <div className="flex flex-col gap-3">
          {USAGE_METRICS.map((m) => {
            const pct = (m.used / m.limit) * 100;
            const barColor = pct > 80 ? "bg-amber-500" : "bg-success";
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-[12px] text-foreground dark:text-dark-12">
                    {m.label}
                  </span>
                  <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
                    {m.used.toLocaleString()} / {m.limit.toLocaleString()}{" "}
                    {m.unit}
                  </span>
                </div>
                <div className="h-1.5 bg-sand-3 dark:bg-dark-4 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment method */}
      <div className="rounded-card border border-border dark:border-dark-6 bg-sand-2 dark:bg-dark-3 p-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12">
              Payment method
            </div>
            <div className="font-mono text-[11px] text-sand-9 dark:text-dark-9 mt-0.5">
              •••• •••• •••• 4242 · Visa · Exp 12/27
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-btn border border-border dark:border-dark-6 font-body text-[11px] text-foreground dark:text-dark-12 hover:bg-sand-2 dark:hover:bg-dark-3 transition-colors cursor-pointer"
            onClick={() => console.log("Update payment method (stub)")}
          >
            Update
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12 mb-3">
          Invoices
        </div>
        <div className="rounded-card border border-border dark:border-dark-6 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[100px_90px_90px_1fr_80px] px-4 py-2 bg-sand-2 dark:bg-dark-3 border-b border-border dark:border-dark-6">
            {["Date", "Amount", "Status", "Invoice ID", ""].map((h) => (
              <span
                key={h}
                className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9"
              >
                {h}
              </span>
            ))}
          </div>
          {/* Rows */}
          {INVOICES.map((inv, i) => (
            <div
              key={i}
              className="grid grid-cols-[100px_90px_90px_1fr_80px] px-4 py-3 border-b border-border dark:border-dark-6 last:border-0 items-center"
            >
              <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
                {inv.date}
              </span>
              <span className="font-mono text-[11px] font-medium text-foreground dark:text-dark-12">
                {inv.amount}
              </span>
              <span className="inline-flex w-fit items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium bg-success/10 dark:bg-success/20 text-success">
                {inv.status}
              </span>
              <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
                {inv.id}
              </span>
              <button
                type="button"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-btn border border-border dark:border-dark-6 font-body text-[11px] text-sand-9 dark:text-dark-9 hover:bg-sand-2 dark:hover:bg-dark-3 transition-colors cursor-pointer w-fit"
                onClick={() => console.log("Download invoice (stub):", inv.id)}
              >
                <Download size={10} />
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Tab: API Keys ────────────────────────────────────────────────────────────

const API_KEYS = [
  {
    name: "Production key",
    created: "Jan 12, 2026",
    lastUsed: "Today",
    scopes: "read, write",
    masked: "gp_live_••••••••••••••••••••••••3f8a",
  },
  {
    name: "Staging key",
    created: "Feb 3, 2026",
    lastUsed: "Yesterday",
    scopes: "read",
    masked: "gp_test_••••••••••••••••••••••••9c2d",
  },
  {
    name: "Analytics only",
    created: "Mar 18, 2026",
    lastUsed: "Apr 20",
    scopes: "read",
    masked: "gp_live_••••••••••••••••••••••••1b4e",
  },
];

function ApiKeysTab() {
  const [revealedIdx, setRevealedIdx] = React.useState<number | null>(null);

  return (
    <div className="max-w-2xl">
      {/* Info + create */}
      <div className="flex items-start gap-3 mb-5">
        <div className="flex-1 rounded-card border border-border dark:border-dark-6 bg-sand-2 dark:bg-dark-3 px-4 py-3 font-body text-[12px] text-sand-9 dark:text-dark-9 leading-relaxed">
          For open ecosystem integration. Full API docs at{" "}
          <span className="text-primary cursor-pointer hover:underline">
            docs.gridpower.co.in/api
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
          onClick={() => console.log("Create API key (stub)")}
        >
          <Plus size={12} />
          Create key
        </button>
      </div>

      {/* Keys table */}
      <div className="rounded-card border border-border dark:border-dark-6 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_100px_100px_80px_120px] px-4 py-2 bg-sand-2 dark:bg-dark-3 border-b border-border dark:border-dark-6">
          {["Key", "Created", "Last used", "Scopes", "Actions"].map((h) => (
            <span
              key={h}
              className="font-mono text-[9px] uppercase tracking-[0.08em] text-sand-9 dark:text-dark-9"
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {API_KEYS.map((k, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_100px_100px_80px_120px] px-4 py-3.5 border-b border-border dark:border-dark-6 last:border-0 items-center"
          >
            <div>
              <div className="font-body text-[13px] font-medium text-foreground dark:text-dark-12 mb-0.5">
                {k.name}
              </div>
              <div className="font-mono text-[10px] text-sand-9 dark:text-dark-9">
                {revealedIdx === i
                  ? k.masked.replace(/•/g, "x")
                  : k.masked}
              </div>
            </div>
            <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
              {k.created}
            </span>
            <span className="font-mono text-[11px] text-sand-9 dark:text-dark-9">
              {k.lastUsed}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] bg-sand-3 dark:bg-dark-4 text-sand-9 dark:text-dark-9 w-fit">
              {k.scopes}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center w-7 h-7 rounded-btn border border-border dark:border-dark-6 hover:bg-sand-2 dark:hover:bg-dark-3 text-sand-9 dark:text-dark-9 transition-colors cursor-pointer"
                onClick={() =>
                  setRevealedIdx(revealedIdx === i ? null : i)
                }
                title={revealedIdx === i ? "Hide key" : "Reveal key"}
              >
                {revealedIdx === i ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-btn border border-error/50 font-body text-[11px] text-error hover:bg-error/10 transition-colors cursor-pointer"
                onClick={() => console.log("Revoke key (stub):", k.name)}
              >
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: Notifications ───────────────────────────────────────────────────────

function NotificationsTab() {
  return (
    <div className="max-w-lg">
      {/* Channels */}
      <div className="mb-6">
        <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12 mb-1">
          Channels
        </div>
        <ToggleRow
          label="Email alerts"
          sub="Sent to sagar@gridpower.co.in"
          defaultChecked
        />
        <ToggleRow
          label="SMS alerts"
          sub="+91 98765 43210"
          defaultChecked
        />
        <ToggleRow
          label="Push notifications"
          sub="Browser + mobile app"
        />
      </div>

      {/* Alert types */}
      <div>
        <div className="font-body text-[12px] font-semibold text-foreground dark:text-dark-12 mb-1">
          Alert types
        </div>
        <ToggleRow
          label="Station goes offline"
          sub="Immediate alert"
          defaultChecked
        />
        <ToggleRow label="High temperature warning" defaultChecked />
        <ToggleRow label="Session completed" />
        <ToggleRow label="Revenue milestone reached" defaultChecked />
        <ToggleRow label="Firmware update available" defaultChecked />
        <ToggleRow
          label="Weekly digest"
          sub="Every Monday 08:00"
          defaultChecked
        />
        <ToggleRow
          label="Critical only mode"
          sub="Suppress all non-critical alerts"
        />
      </div>

      {/* Auto-save indicator */}
      <div className="flex items-center gap-2 mt-5">
        <div className="w-1.5 h-1.5 rounded-full bg-success" />
        <span className="font-mono text-[11px] text-success">
          Preferences saved automatically
        </span>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────

const TABS = [
  { value: "company", label: "Company", icon: Building2 },
  { value: "team", label: "Team & Roles", icon: Users },
  { value: "billing", label: "Billing", icon: CreditCard },
  { value: "api", label: "API Keys", icon: Key },
  { value: "notifications", label: "Notifications", icon: Bell },
] as const;

export default function Settings() {
  return (
    <div className="max-w-3xl">
      <Tabs defaultValue="company" variant="underline">
        <TabsList>
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value}>
              <Icon size={14} className="mr-1.5" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="company">
          <CompanyTab />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab />
        </TabsContent>

        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>

        <TabsContent value="api">
          <ApiKeysTab />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
