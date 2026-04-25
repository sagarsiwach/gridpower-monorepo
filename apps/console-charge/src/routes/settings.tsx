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
  UserPlus,
  KeyRound,
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Switch,
  EmptyState,
} from "@gridpower/ui";

// ─── Shared primitives ────────────────────────────────────────────────────────

const FIELD_LABEL_CLS =
  "block font-body text-[11px] font-medium text-muted-foreground mb-1.5";
const META_TEXT_CLS = "font-mono text-[11px] text-muted-foreground";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";
const SECTION_TITLE_CLS =
  "font-body text-[12px] font-semibold text-foreground mb-3";
const TABLE_HEADER_BAR_CLS =
  "px-4 py-2 bg-muted border-b border-border";
const TABLE_ROW_CLS =
  "px-4 py-3 border-b border-border last:border-0 items-center";
const ICON_BUTTON_CLS =
  "flex items-center justify-center w-7 h-7 rounded-btn hover:bg-muted text-muted-foreground transition-colors cursor-pointer";

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

function Field({
  id,
  label,
  required,
  type = "text",
  defaultValue,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        aria-required={required ? "true" : undefined}
      />
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-5 mt-1 border-t border-border">
      <h3 className="font-body text-[12px] font-semibold text-foreground mb-4">
        {label}
      </h3>
    </div>
  );
}

function SaveBar({ saved = false }: { saved?: boolean }) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
      {saved ? (
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-success">
          <CheckCircle2 size={12} aria-hidden="true" />
          Saved automatically
        </span>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2 ml-auto">
        <button
          type="button"
          className="px-4 py-2 rounded-btn border border-border font-body text-[13px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
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
  id,
  label,
  sub,
  defaultChecked = false,
}: {
  id: string;
  label: string;
  sub?: string;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = React.useState(defaultChecked);
  const subId = sub ? `${id}-desc` : undefined;
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0 pr-6">
        <label
          htmlFor={id}
          className="font-body text-[13px] font-medium text-foreground cursor-pointer"
        >
          {label}
        </label>
        {sub && (
          <div
            id={subId}
            className="font-body text-[11px] text-muted-foreground mt-0.5"
          >
            {sub}
          </div>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        aria-describedby={subId}
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
    <section aria-labelledby="company-heading" className="max-w-2xl">
      <h2 id="company-heading" className="sr-only">
        Organization
      </h2>

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <Field
          id="company-name"
          label="Company name"
          required
          defaultValue="DeltaEV Mobility Pvt Ltd"
        />
        <Field
          id="company-legal"
          label="Legal entity"
          required
          defaultValue="DeltaEV Mobility Private Limited"
        />
        <Field
          id="company-street"
          label="Street address"
          defaultValue="Plot 14, Verna Industrial Estate"
          className="md:col-span-2"
        />
        <Field
          id="company-city"
          label="City / State"
          defaultValue="Panaji, Goa 403 722"
        />
        <Field
          id="company-gstin"
          label="GSTIN"
          defaultValue="30AABCD1234E1Z5"
        />
        <Field
          id="company-website"
          label="Website"
          type="url"
          defaultValue="https://gridpower.co.in"
        />
        <Field id="company-pan" label="PAN" defaultValue="AABCD1234E" />
      </div>

      <SectionDivider label="Primary contact" />
      <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          required
          defaultValue="Sagar Siwach"
        />
        <Field id="contact-title" label="Title" defaultValue="Founder & CEO" />
        <Field
          id="contact-email"
          label="Email"
          required
          type="email"
          defaultValue="sagar@gridpower.co.in"
        />
        <Field
          id="contact-phone"
          label="Phone"
          type="tel"
          defaultValue="+91 98765 43210"
        />
      </div>

      <SectionDivider label="Logo" />
      <button
        type="button"
        aria-label="Upload company logo"
        className="w-40 h-20 rounded-card border border-dashed border-border bg-muted flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-muted/70 transition-colors"
        onClick={() => console.log("Logo upload stub")}
      >
        <Upload
          size={16}
          aria-hidden="true"
          className="text-muted-foreground"
        />
        <span className={META_CAPS_CLS}>Upload logo</span>
      </button>

      <SaveBar />
    </section>
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
  Admin: { bg: "bg-error/10", text: "text-error" },
  Operator: { bg: "bg-info/10", text: "text-info" },
  Viewer: { bg: "bg-muted", text: "text-muted-foreground" },
};

const ROLE_PERMISSIONS = [
  { label: "View data", admin: true, operator: true, viewer: true },
  { label: "Manage stations", admin: true, operator: true, viewer: false },
  { label: "Billing & API", admin: true, operator: false, viewer: false },
  { label: "Invite team", admin: true, operator: false, viewer: false },
];

function TeamTab() {
  const [inviteEmail, setInviteEmail] = React.useState("");
  const members = TEAM_MEMBERS;

  return (
    <section aria-labelledby="team-heading" className="max-w-2xl">
      <h2 id="team-heading" className="sr-only">
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
          onClick={() => console.log("Invite member (stub)")}
        >
          <Send size={12} aria-hidden="true" />
          Invite member
        </button>
      </div>

      {/* Members table */}
      {members.length === 0 ? (
        <div className="rounded-card border border-border mb-4">
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
          className="rounded-card border border-border overflow-x-auto mb-4"
        >
          {/* Table header */}
          <div
            role="row"
            className={`grid grid-cols-[1fr_1fr_100px_110px_36px] min-w-[640px] ${TABLE_HEADER_BAR_CLS}`}
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

          {/* Rows */}
          {members.map((m, i) => {
            const roleStyle = ROLE_STYLES[m.role];
            return (
              <div
                key={m.email}
                role="row"
                className={`grid grid-cols-[1fr_1fr_100px_110px_36px] min-w-[640px] ${TABLE_ROW_CLS}`}
              >
                {/* Avatar + name */}
                <div role="cell" className="flex items-center gap-2.5">
                  <div
                    aria-hidden="true"
                    className={`w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-body text-[10px] font-semibold shrink-0 ${
                      i === 0 ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    {m.initials}
                  </div>
                  <span className="font-body text-[13px] font-medium text-foreground">
                    {m.name}
                  </span>
                </div>

                <span
                  role="cell"
                  className={`${META_TEXT_CLS} truncate pr-2`}
                >
                  {m.email}
                </span>

                <span
                  role="cell"
                  className={`inline-flex items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium w-fit ${roleStyle.bg} ${roleStyle.text}`}
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
      <div className="rounded-card border border-border bg-muted p-4 mb-4">
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
          Invite by email
        </h3>
        <div className="flex gap-2">
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
      <div className="rounded-card border border-border bg-muted p-4">
        <h3 className={`${META_CAPS_CLS} mb-3`}>Role permissions</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="grid grid-cols-[120px_1fr_1fr_1fr] gap-y-1.5">
              <th scope="col" className="sr-only">
                Permission
              </th>
              {(["Admin", "Operator", "Viewer"] as MemberRole[]).map((role) => (
                <th
                  key={role}
                  scope="col"
                  className={`text-left font-body text-[11px] font-semibold ${ROLE_STYLES[role].text}`}
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="contents">
            {ROLE_PERMISSIONS.map((perm) => (
              <tr
                key={perm.label}
                className="grid grid-cols-[120px_1fr_1fr_1fr] gap-y-1.5"
              >
                <th
                  scope="row"
                  className="text-left font-body text-[12px] font-normal text-muted-foreground"
                >
                  {perm.label}
                </th>
                <td
                  className={`font-mono text-[12px] ${perm.admin ? "text-success" : "text-muted-foreground"}`}
                >
                  <span
                    aria-label={perm.admin ? "Allowed" : "Not allowed"}
                  >
                    {perm.admin ? "✓" : "–"}
                  </span>
                </td>
                <td
                  className={`font-mono text-[12px] ${perm.operator ? "text-success" : "text-muted-foreground"}`}
                >
                  <span
                    aria-label={perm.operator ? "Allowed" : "Not allowed"}
                  >
                    {perm.operator ? "✓" : "–"}
                  </span>
                </td>
                <td
                  className={`font-mono text-[12px] ${perm.viewer ? "text-success" : "text-muted-foreground"}`}
                >
                  <span
                    aria-label={perm.viewer ? "Allowed" : "Not allowed"}
                  >
                    {perm.viewer ? "✓" : "–"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
    <section aria-labelledby="billing-heading" className="max-w-2xl">
      <h2 id="billing-heading" className="sr-only">
        Billing
      </h2>

      {/* Current plan */}
      <div
        aria-labelledby="current-plan-label"
        className="rounded-card border border-primary/30 border-l-[3px] border-l-primary bg-card p-5 mb-5"
      >
        <div className="flex items-start justify-between">
          <div>
            <div id="current-plan-label" className={`${META_CAPS_CLS} mb-1.5`}>
              Current plan
            </div>
            <div className="font-display text-[22px] font-semibold text-foreground leading-none">
              GridCharge Pro
            </div>
            <div className="font-mono text-[13px] text-primary mt-1.5">
              ₹24,999 / month
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] text-muted-foreground">
              Renews
            </div>
            <div className="font-mono text-[12px] text-foreground mt-0.5">
              May 25, 2026
            </div>
            <button
              type="button"
              className="mt-2 px-3 py-1.5 rounded-btn border border-border font-body text-[11px] text-foreground hover:bg-muted transition-colors cursor-pointer"
              onClick={() => console.log("Manage plan (stub)")}
            >
              Manage plan
            </button>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="mb-5">
        <h3 className={SECTION_TITLE_CLS}>Usage this month</h3>
        <div className="flex flex-col gap-3">
          {USAGE_METRICS.map((m) => {
            const pct = (m.used / m.limit) * 100;
            const overLimit = pct > 80;
            const barColor = overLimit ? "bg-warning" : "bg-success";
            return (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-body text-[12px] text-foreground">
                    {m.label}
                  </span>
                  <span className={META_TEXT_CLS}>
                    {m.used.toLocaleString()} / {m.limit.toLocaleString()}{" "}
                    {m.unit}
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`${m.label} usage`}
                  aria-valuenow={Math.round(pct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-1.5 bg-muted rounded-full overflow-hidden"
                >
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
      <div className="rounded-card border border-border bg-muted p-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-body text-[12px] font-semibold text-foreground">
              Payment method
            </h3>
            <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
              •••• •••• •••• 4242 · Visa · Exp 12/27
            </div>
          </div>
          <button
            type="button"
            className="px-3 py-1.5 rounded-btn border border-border font-body text-[11px] text-foreground hover:bg-muted transition-colors cursor-pointer"
            onClick={() => console.log("Update payment method (stub)")}
          >
            Update
          </button>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h3 className={SECTION_TITLE_CLS}>Invoices</h3>
        <div
          role="table"
          aria-label="Invoices"
          className="rounded-card border border-border overflow-x-auto"
        >
          {/* Header */}
          <div
            role="row"
            className={`grid grid-cols-[100px_90px_90px_1fr_80px] min-w-[520px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Date", "Amount", "Status", "Invoice ID"].map((h) => (
              <span
                key={h}
                role="columnheader"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
            <span role="columnheader" className="sr-only">
              Download
            </span>
          </div>
          {/* Rows */}
          {INVOICES.map((inv) => (
            <div
              key={inv.id}
              role="row"
              className={`grid grid-cols-[100px_90px_90px_1fr_80px] min-w-[520px] ${TABLE_ROW_CLS}`}
            >
              <span role="cell" className={META_TEXT_CLS}>
                {inv.date}
              </span>
              <span
                role="cell"
                className="font-mono text-[11px] font-medium text-foreground"
              >
                {inv.amount}
              </span>
              <span
                role="cell"
                className="inline-flex w-fit items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium bg-success/10 text-success"
              >
                {inv.status}
              </span>
              <span role="cell" className={META_TEXT_CLS}>
                {inv.id}
              </span>
              <button
                type="button"
                aria-label={`Download invoice ${inv.id} as PDF`}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-btn border border-border font-body text-[11px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer w-fit"
                onClick={() => console.log("Download invoice (stub):", inv.id)}
              >
                <Download size={10} aria-hidden="true" />
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
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
  const keys = API_KEYS;

  return (
    <section aria-labelledby="api-heading" className="max-w-2xl">
      <h2 id="api-heading" className="sr-only">
        API keys
      </h2>

      {/* Info + create */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-5">
        <div className="flex-1 rounded-card border border-border bg-muted px-4 py-3 font-body text-[12px] text-muted-foreground leading-relaxed">
          For open ecosystem integration. Full API docs at{" "}
          <a
            href="https://docs.gridpower.co.in/api"
            className="text-primary hover:underline"
          >
            docs.gridpower.co.in/api
          </a>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
          onClick={() => console.log("Create API key (stub)")}
        >
          <Plus size={12} aria-hidden="true" />
          Create key
        </button>
      </div>

      {/* Keys table */}
      {keys.length === 0 ? (
        <div className="rounded-card border border-border">
          <EmptyState
            icon={<KeyRound size={20} aria-hidden="true" />}
            title="No API keys generated yet"
            description="Create a key to authenticate requests against the GridCharge API."
          />
        </div>
      ) : (
        <div
          role="table"
          aria-label="API keys"
          className="rounded-card border border-border overflow-x-auto"
        >
          {/* Header */}
          <div
            role="row"
            className={`grid grid-cols-[1fr_100px_100px_80px_120px] min-w-[640px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Key", "Created", "Last used", "Scopes", "Actions"].map((h) => (
              <span
                key={h}
                role="columnheader"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {keys.map((k, i) => {
            const isRevealed = revealedIdx === i;
            return (
              <div
                key={k.name}
                role="row"
                className={`grid grid-cols-[1fr_100px_100px_80px_120px] min-w-[640px] px-4 py-3.5 border-b border-border last:border-0 items-center`}
              >
                <div role="cell">
                  <div className="font-body text-[13px] font-medium text-foreground mb-0.5">
                    {k.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {isRevealed ? k.masked.replace(/•/g, "x") : k.masked}
                  </div>
                </div>
                <span role="cell" className={META_TEXT_CLS}>
                  {k.created}
                </span>
                <span role="cell" className={META_TEXT_CLS}>
                  {k.lastUsed}
                </span>
                <span
                  role="cell"
                  className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] bg-muted text-muted-foreground w-fit"
                >
                  {k.scopes}
                </span>
                <div role="cell" className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={
                      isRevealed
                        ? `Hide ${k.name} value`
                        : `Reveal ${k.name} value`
                    }
                    aria-pressed={isRevealed}
                    className="flex items-center justify-center w-7 h-7 rounded-btn border border-border hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                    onClick={() =>
                      setRevealedIdx(isRevealed ? null : i)
                    }
                  >
                    {isRevealed ? (
                      <EyeOff size={12} aria-hidden="true" />
                    ) : (
                      <Eye size={12} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label={`Revoke ${k.name}`}
                    className="px-2.5 py-1.5 rounded-btn border border-error/50 font-body text-[11px] text-error hover:bg-error/10 transition-colors cursor-pointer"
                    onClick={() => console.log("Revoke key (stub):", k.name)}
                  >
                    Revoke
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ─── Tab: Notifications ───────────────────────────────────────────────────────

function NotificationsTab() {
  return (
    <section aria-labelledby="notifications-heading" className="max-w-lg">
      <h2 id="notifications-heading" className="sr-only">
        Notifications
      </h2>

      {/* Channels */}
      <div className="mb-6">
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-1">
          Channels
        </h3>
        <ToggleRow
          id="notif-email"
          label="Email alerts"
          sub="Sent to sagar@gridpower.co.in"
          defaultChecked
        />
        <ToggleRow
          id="notif-sms"
          label="SMS alerts"
          sub="+91 98765 43210"
          defaultChecked
        />
        <ToggleRow
          id="notif-push"
          label="Push notifications"
          sub="Browser + mobile app"
        />
      </div>

      {/* Alert types */}
      <div>
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-1">
          Alert types
        </h3>
        <ToggleRow
          id="alert-offline"
          label="Station goes offline"
          sub="Immediate alert"
          defaultChecked
        />
        <ToggleRow
          id="alert-temp"
          label="High temperature warning"
          defaultChecked
        />
        <ToggleRow id="alert-session" label="Session completed" />
        <ToggleRow
          id="alert-revenue"
          label="Revenue milestone reached"
          defaultChecked
        />
        <ToggleRow
          id="alert-firmware"
          label="Firmware update available"
          defaultChecked
        />
        <ToggleRow
          id="alert-digest"
          label="Weekly digest"
          sub="Every Monday 08:00"
          defaultChecked
        />
        <ToggleRow
          id="alert-critical"
          label="Critical only mode"
          sub="Suppress all non-critical alerts"
        />
      </div>

      {/* Auto-save indicator */}
      <div className="flex items-center gap-2 mt-5" role="status">
        <div
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-success"
        />
        <span className="font-mono text-[11px] text-success">
          Preferences saved automatically
        </span>
      </div>
    </section>
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
      <h1 className="sr-only">Settings</h1>
      <Tabs defaultValue="company" variant="underline">
        <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <TabsList className="min-w-max">
            {TABS.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value}>
                <Icon size={14} aria-hidden="true" className="mr-1.5" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

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
