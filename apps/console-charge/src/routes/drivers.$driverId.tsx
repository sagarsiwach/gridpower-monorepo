/**
 * CON.5: Driver profile
 * Route: /drivers/:driverId
 *
 * Spec section 4.4 — individual driver account view.
 *
 * In-page anchor tabs (no route change):
 *   Overview | Cards | Sessions | Payment methods | Notes
 *
 * Sticky action bar bottom-right:
 *   Block account / Refund last session / Comp next session / Open ticket
 *
 * PII NOTE: Phone and email are visible to all roles in this mock.
 * Real implementation must gate visibility by role (support/admin only).
 */

import * as React from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CreditCard,
  ExternalLink,
  FileText,
  Flag,
  MoreHorizontal,
  Plus,
  ReceiptText,
  ShieldOff,
  Ticket,
  User,
  Wallet,
  Zap,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  cn,
} from "@gridpower/ui";

import {
  getDriver,
  type Driver,
  type DriverStatus,
  type AccountType,
  type CardStatus,
  type NoteFlag,
  type RfidCard,
  type PaymentMethod,
  type ActivityEvent,
  type SupportNote,
} from "~/mocks/drivers";

// ─── Label maps ────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<DriverStatus, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  blocked: { bg: "bg-error/10", text: "text-error", dot: "bg-error" },
  disputed: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
};

const STATUS_LABELS: Record<DriverStatus, string> = {
  active: "Active",
  blocked: "Blocked",
  disputed: "Disputed",
};

const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  rfid_only: "RFID only",
  app_only: "App only",
  both: "RFID + App",
};

const CARD_STATUS_STYLES: Record<CardStatus, { bg: string; text: string }> = {
  active: { bg: "bg-success/10", text: "text-success" },
  inactive: { bg: "bg-muted", text: "text-muted-foreground" },
  stolen: { bg: "bg-error/10", text: "text-error" },
};

const CARD_STATUS_LABELS: Record<CardStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  stolen: "Stolen",
};

const FLAG_STYLES: Record<NoteFlag, { bg: string; text: string; label: string } | null> = {
  vip: { bg: "bg-info/10", text: "text-info", label: "VIP" },
  fraud_watch: { bg: "bg-error/10", text: "text-error", label: "Fraud watch" },
  none: null,
};

const ACTIVITY_KIND_ICON: Record<ActivityEvent["kind"], React.ReactNode> = {
  session: <Zap size={11} aria-hidden="true" />,
  topup: <Wallet size={11} aria-hidden="true" />,
  refund: <ReceiptText size={11} aria-hidden="true" />,
  card: <CreditCard size={11} aria-hidden="true" />,
  account: <User size={11} aria-hidden="true" />,
};

// ─── Tab IDs ──────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "cards", label: "Cards" },
  { id: "sessions", label: "Sessions" },
  { id: "payment-methods", label: "Payment methods" },
  { id: "notes", label: "Notes" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Shared primitives ─────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-border last:border-0 gap-4">
      <span className="font-body text-[11px] text-muted-foreground shrink-0 min-w-[120px]">
        {label}
      </span>
      <span
        className={cn(
          "text-right text-[12px] text-foreground",
          mono ? "font-mono" : "font-body",
        )}
      >
        {value}
      </span>
    </div>
  );
}

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
      className="fixed bottom-20 right-6 z-50 rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[12px] shadow-lg"
    >
      {message}
    </div>
  );
}

// ─── Tab sections ──────────────────────────────────────────────────────────────

function OverviewTab({ driver }: { driver: Driver }) {
  const accountAgeDays = Math.floor(
    (Date.now() - new Date(driver.registeredAt).getTime()) / 86400000,
  );
  const accountAgeYears = (accountAgeDays / 365).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      {/* Contact info card */}
      <section aria-labelledby="overview-contact-heading">
        <h3 id="overview-contact-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          Contact information
        </h3>
        <div className="rounded-card border border-border bg-card px-4 divide-y divide-border">
          <InfoRow label="Phone" value={driver.phone} mono />
          <InfoRow label="Email" value={driver.email} />
          <InfoRow label="Country code" value={driver.country} mono />
          <InfoRow label="App user ID" value={driver.appUserId ?? "N/A"} mono />
          <InfoRow label="Member since" value={driver.memberSince} />
          <InfoRow label="Account type" value={ACCOUNT_TYPE_LABELS[driver.accountType]} />
        </div>
      </section>

      {/* Stats card */}
      <section aria-labelledby="overview-stats-heading">
        <h3 id="overview-stats-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          Account stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Account age",
              value: `${accountAgeYears} yrs`,
              sub: `${accountAgeDays.toLocaleString("en-IN")} days`,
            },
            {
              label: "Lifetime sessions",
              value: driver.lifetimeSessions.toLocaleString("en-IN"),
              sub: "total",
            },
            {
              label: "Lifetime spend",
              value: `₹${driver.lifetimeSpendRupees.toLocaleString("en-IN")}`,
              sub: "cumulative",
            },
            {
              label: "Wallet balance",
              value: `₹${driver.walletBalanceRupees.toLocaleString("en-IN")}`,
              sub: "current",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-card border border-border bg-card p-3"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className="font-mono text-[18px] font-semibold text-foreground leading-none">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent activity timeline */}
      <section aria-labelledby="overview-activity-heading">
        <h3 id="overview-activity-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          Recent activity
          <span className="ml-1.5 font-mono text-[10px] text-muted-foreground font-normal">
            (last {driver.recentActivity.length} events)
          </span>
        </h3>
        {driver.recentActivity.length === 0 ? (
          <div className="rounded-card border border-border bg-card px-4 py-8 text-center font-body text-[12px] text-muted-foreground">
            No activity recorded yet.
          </div>
        ) : (
          <ol
            className="rounded-card border border-border bg-card divide-y divide-border"
            aria-label="Activity timeline"
          >
            {driver.recentActivity.map((ev, i) => (
              <li key={i} className="flex items-start gap-3 px-4 py-2.5">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    ev.kind === "session" && "bg-primary/10 text-primary",
                    ev.kind === "topup" && "bg-success/10 text-success",
                    ev.kind === "refund" && "bg-warning/10 text-warning",
                    ev.kind === "card" && "bg-info/10 text-info",
                    ev.kind === "account" && "bg-muted text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {ACTIVITY_KIND_ICON[ev.kind]}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 flex-wrap">
                    <span className="font-body text-[12px] font-medium text-foreground">
                      {ev.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                      {ev.at}
                    </span>
                  </div>
                  {ev.detail && (
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {ev.detail}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function CardsTab({
  driver,
  onAction,
}: {
  driver: Driver;
  onAction: (msg: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <h3 className="font-body text-[12px] font-semibold text-foreground">
          RFID / NFC cards
          <span className="ml-2 font-mono text-[10px] text-muted-foreground font-normal">
            {driver.cards.length} card{driver.cards.length !== 1 ? "s" : ""}
          </span>
        </h3>
        <button
          type="button"
          onClick={() => onAction("Add card — not wired in mock")}
          className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-3 py-1.5 font-body text-[12px] font-medium text-white hover:bg-primary/90 transition-colors duration-150 ease-out cursor-pointer"
        >
          <Plus size={12} aria-hidden="true" />
          Add card
        </button>
      </div>

      {driver.cards.length === 0 ? (
        <div className="rounded-card border border-border bg-card px-4 py-12 flex flex-col items-center gap-3 text-center">
          <CreditCard size={20} className="text-muted-foreground" aria-hidden="true" />
          <p className="font-body text-[13px] text-foreground">No RFID cards on this account.</p>
          <p className="font-body text-[11px] text-muted-foreground">
            This account uses app authentication only.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <caption className="sr-only">RFID cards for {driver.name}</caption>
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th scope="col" className="px-4 py-2 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                    UID
                  </th>
                  <th scope="col" className="px-4 py-2 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                    Label
                  </th>
                  <th scope="col" className="px-4 py-2 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                    Activated
                  </th>
                  <th scope="col" className="px-4 py-2 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                    Last used
                  </th>
                  <th scope="col" className="px-4 py-2 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                    Status
                  </th>
                  <th scope="col" className="w-10 px-4 py-2">
                    <span className="sr-only">Card actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {driver.cards.map((card: RfidCard) => {
                  const cs = CARD_STATUS_STYLES[card.status];
                  return (
                    <tr key={card.uid}>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] text-foreground">
                          {card.uid}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-body text-[12px] text-foreground">
                          {card.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {card.activatedAt}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {card.lastUsed}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-pill px-2 py-0.5 font-body text-[11px] font-medium",
                            cs.bg,
                            cs.text,
                          )}
                        >
                          {CARD_STATUS_LABELS[card.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex h-7 w-7 items-center justify-center rounded hover:bg-muted text-muted-foreground cursor-pointer transition-colors duration-150 ease-out"
                              aria-label={`Actions for card ${card.uid}`}
                            >
                              <MoreHorizontal size={14} aria-hidden="true" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onAction(`Rename card ${card.uid} — not wired in mock`)}
                            >
                              Rename
                            </DropdownMenuItem>
                            {card.status === "active" && (
                              <DropdownMenuItem
                                onClick={() => onAction(`Deactivate card ${card.uid} — not wired in mock`)}
                              >
                                Deactivate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-error focus:text-error"
                              onClick={() => onAction(`Report card ${card.uid} as stolen — not wired in mock`)}
                            >
                              Report stolen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function SessionsTab({ driver }: { driver: Driver }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-body text-[12px] font-semibold text-foreground">
        Charging sessions
      </h3>
      <div className="rounded-card border border-border bg-muted p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="font-body text-[13px] text-foreground">
            {driver.lifetimeSessions.toLocaleString("en-IN")} total sessions for this driver.
          </p>
          <p className="font-body text-[11px] text-muted-foreground mt-0.5">
            Sessions are managed in the Sessions view. Use the link below to see the full session history.
          </p>
        </div>
        <Link
          to={`/sessions?driver_id=${driver.id}`}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-2 font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-150 ease-out shrink-0"
        >
          <ExternalLink size={12} aria-hidden="true" />
          Open in Sessions
        </Link>
      </div>

      {/* Recent activity session events as preview */}
      <section aria-labelledby="sessions-tab-preview-heading">
        <h3 id="sessions-tab-preview-heading" className="font-body text-[11px] text-muted-foreground mb-2">
          Latest sessions (from activity timeline)
        </h3>
        {driver.recentActivity.filter((e) => e.kind === "session").length === 0 ? (
          <div className="rounded-card border border-border bg-card px-4 py-8 text-center font-body text-[12px] text-muted-foreground">
            No session records available.
          </div>
        ) : (
          <ol className="rounded-card border border-border bg-card divide-y divide-border" aria-label="Recent sessions preview">
            {driver.recentActivity
              .filter((e) => e.kind === "session")
              .map((ev, i) => (
                <li key={i} className="flex items-center justify-between px-4 py-2.5 gap-4">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true">
                      <Zap size={11} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground truncate">
                      {ev.detail}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                    {ev.at}
                  </span>
                </li>
              ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function PaymentMethodsTab({
  driver,
  onAction,
}: {
  driver: Driver;
  onAction: (msg: string) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Payment methods list */}
      <section aria-labelledby="payment-methods-heading">
        <h3 id="payment-methods-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          Payment methods on file
        </h3>
        {driver.paymentMethods.length === 0 ? (
          <div className="rounded-card border border-border bg-card px-4 py-8 text-center font-body text-[12px] text-muted-foreground">
            No payment methods on file.
          </div>
        ) : (
          <div className="rounded-card border border-border bg-card divide-y divide-border overflow-hidden">
            {driver.paymentMethods.map((pm: PaymentMethod, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded",
                    pm.type === "card" && "bg-info/10 text-info",
                    pm.type === "upi" && "bg-warning/10 text-warning",
                    pm.type === "wallet" && "bg-success/10 text-success",
                  )}
                  aria-hidden="true"
                >
                  {pm.type === "wallet" ? (
                    <Wallet size={13} aria-hidden="true" />
                  ) : (
                    <CreditCard size={13} aria-hidden="true" />
                  )}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[12px] text-foreground truncate">
                    {pm.display}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground mt-0.5 flex items-center gap-2">
                    {pm.provider && <span>{pm.provider}</span>}
                    {pm.expiry && <span>Exp {pm.expiry}</span>}
                    {pm.isDefault && (
                      <span className="rounded-pill bg-primary/10 px-1.5 py-0.5 text-primary text-[9px] font-mono">
                        default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Wallet balance */}
      <section aria-labelledby="wallet-heading">
        <h3 id="wallet-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          GridCharge wallet
        </h3>
        <div className="rounded-card border border-border bg-card px-4 py-3 flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-0.5">
              Current balance
            </div>
            <div className="font-mono text-[20px] font-semibold text-foreground">
              {`₹${driver.walletBalanceRupees.toLocaleString("en-IN")}`}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAction("Manual wallet credit — not wired in mock")}
            className="inline-flex items-center gap-1.5 rounded-btn border border-border px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
          >
            <Plus size={12} aria-hidden="true" />
            Add credit
          </button>
        </div>
      </section>
    </div>
  );
}

function NotesTab({
  driver,
  onAction,
}: {
  driver: Driver;
  onAction: (msg: string) => void;
}) {
  const [noteBody, setNoteBody] = React.useState("");

  const flaggedNotes = driver.notes.filter((n) => n.flag !== "none");
  const regularNotes = driver.notes.filter((n) => n.flag === "none");

  return (
    <div className="flex flex-col gap-6">
      {/* Internal flags */}
      {flaggedNotes.length > 0 && (
        <section aria-labelledby="flags-heading">
          <h3 id="flags-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
            Internal flags
          </h3>
          <div className="flex flex-wrap gap-2">
            {flaggedNotes.map((n) => {
              const fs = FLAG_STYLES[n.flag];
              if (!fs) return null;
              return (
                <span
                  key={n.id}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-body text-[12px] font-medium",
                    fs.bg,
                    fs.text,
                  )}
                >
                  <Flag size={11} aria-hidden="true" />
                  {fs.label}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Notes list */}
      <section aria-labelledby="notes-list-heading">
        <h3 id="notes-list-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          Support notes
        </h3>
        {driver.notes.length === 0 ? (
          <div className="rounded-card border border-border bg-card px-4 py-8 text-center">
            <FileText size={18} className="text-muted-foreground mx-auto mb-2" aria-hidden="true" />
            <p className="font-body text-[12px] text-muted-foreground">
              No notes yet. Add the first note below.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {[...flaggedNotes, ...regularNotes].map((note: SupportNote) => {
              const fs = FLAG_STYLES[note.flag];
              return (
                <div
                  key={note.id}
                  className="rounded-card border border-border bg-card px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[12px] font-medium text-foreground">
                        {note.author}
                      </span>
                      {fs && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-pill px-2 py-0.5 font-mono text-[9px] font-medium",
                            fs.bg,
                            fs.text,
                          )}
                        >
                          <Flag size={8} aria-hidden="true" />
                          {fs.label}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {note.createdAt}
                    </span>
                  </div>
                  <p className="font-body text-[12px] text-foreground leading-relaxed">
                    {note.body}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add note form */}
      <section aria-labelledby="add-note-heading">
        <h3 id="add-note-heading" className="font-body text-[12px] font-semibold text-foreground mb-3">
          Add note
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (noteBody.trim()) {
              onAction("Note added — not persisted in mock");
              setNoteBody("");
            }
          }}
          className="rounded-card border border-border bg-card p-4 flex flex-col gap-3"
        >
          <div>
            <label
              htmlFor="new-note-body"
              className="block font-body text-[11px] font-medium text-muted-foreground mb-1.5"
            >
              Note
              <span aria-hidden="true" className="text-error ml-0.5">*</span>
            </label>
            <textarea
              id="new-note-body"
              value={noteBody}
              onChange={(e) => setNoteBody(e.target.value)}
              required
              aria-required="true"
              placeholder="Add an internal note for the support team..."
              rows={3}
              className={cn(
                "w-full rounded-input border border-border bg-secondary px-3 py-2 font-body text-[12px] text-foreground placeholder:text-muted-foreground",
                "focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none",
                "resize-none transition-[box-shadow,border-color] duration-150 ease-out",
              )}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!noteBody.trim()}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-btn px-4 py-2 font-body text-[12px] font-medium transition-colors duration-150 ease-out",
                noteBody.trim()
                  ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-not-allowed",
              )}
            >
              Save note
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function DriverDetail() {
  const { driverId } = useParams<{ driverId: string }>();
  const navigate = useNavigate();
  const driver = driverId ? getDriver(driverId) : undefined;

  const [activeTab, setActiveTab] = React.useState<TabId>("overview");
  const [notice, setNotice] = React.useState<string | null>(null);

  const showNotice = React.useCallback((msg: string) => {
    setNotice(msg);
  }, []);

  const dismissNotice = React.useCallback(() => {
    setNotice(null);
  }, []);

  // Scroll active section into view when tab changes
  React.useEffect(() => {
    const el = document.getElementById(`tab-section-${activeTab}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeTab]);

  // 404 state
  if (!driver) {
    return (
      <section
        className="flex flex-col items-center justify-center gap-4 py-20"
        aria-labelledby="driver-not-found-heading"
      >
        <AlertTriangle size={28} className="text-warning" aria-hidden="true" />
        <h2
          id="driver-not-found-heading"
          className="font-body text-[16px] font-semibold text-foreground"
        >
          Driver not found
        </h2>
        <p className="font-body text-[12px] text-muted-foreground">
          No driver with ID{" "}
          <span className="font-mono">{driverId ?? "unknown"}</span> exists.
        </p>
        <button
          type="button"
          onClick={() => navigate("/drivers")}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-4 py-2 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          Back to drivers
        </button>
      </section>
    );
  }

  const statusStyle = STATUS_STYLES[driver.status];

  return (
    <div className="flex flex-col gap-6 pb-32">
      {/* ── Back link ──────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => navigate("/drivers")}
        className="inline-flex items-center gap-1.5 w-fit font-body text-[12px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-150 ease-out"
      >
        <ArrowLeft size={12} aria-hidden="true" />
        All drivers
      </button>

      {/* ── Profile header ─────────────────────────────────────────────────── */}
      <section aria-labelledby="driver-name-heading">
        <h2
          id="driver-name-heading"
          className="sr-only"
        >
          Driver profile: {driver.name}
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Avatar placeholder */}
          <div
            aria-hidden="true"
            className="h-14 w-14 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-body text-[18px] font-semibold"
          >
            {driver.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <span className="font-display text-[22px] font-semibold text-foreground leading-tight">
                {driver.name}
              </span>
              {/* Status badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-body text-[12px] font-medium",
                  statusStyle.bg,
                  statusStyle.text,
                )}
              >
                <span
                  className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusStyle.dot)}
                  aria-hidden="true"
                />
                {STATUS_LABELS[driver.status]}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
              <span>{driver.id}</span>
              <span aria-hidden="true">·</span>
              <span>{ACCOUNT_TYPE_LABELS[driver.accountType]}</span>
              <span aria-hidden="true">·</span>
              <span>Member since {driver.memberSince}</span>
              {driver.lastSessionStation && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Last session: {driver.lastSessionAt}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── In-page tabs ──────────────────────────────────────────────────── */}
      <nav
        aria-label="Driver profile sections"
        className="sticky top-0 z-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-background border-b border-border"
      >
        <div className="flex items-center gap-0 overflow-x-auto">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? "true" : undefined}
              className={cn(
                "shrink-0 px-4 py-2.5 font-body text-[13px] border-b-2 cursor-pointer transition-colors duration-150 ease-out",
                activeTab === id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              {label}
              {id === "notes" && driver.notes.length > 0 && (
                <span className="ml-1.5 font-mono text-[9px] text-muted-foreground">
                  {driver.notes.length}
                </span>
              )}
              {id === "cards" && driver.cards.length > 0 && (
                <span className="ml-1.5 font-mono text-[9px] text-muted-foreground">
                  {driver.cards.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Tab content sections ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-10">
        {/* Overview */}
        <section
          id="tab-section-overview"
          aria-labelledby="tab-btn-overview"
          className={cn(activeTab !== "overview" && "sr-only")}
        >
          <OverviewTab driver={driver} />
        </section>

        {/* Cards */}
        <section
          id="tab-section-cards"
          aria-labelledby="tab-btn-cards"
          className={cn(activeTab !== "cards" && "sr-only")}
        >
          <CardsTab driver={driver} onAction={showNotice} />
        </section>

        {/* Sessions */}
        <section
          id="tab-section-sessions"
          aria-labelledby="tab-btn-sessions"
          className={cn(activeTab !== "sessions" && "sr-only")}
        >
          <SessionsTab driver={driver} />
        </section>

        {/* Payment methods */}
        <section
          id="tab-section-payment-methods"
          aria-labelledby="tab-btn-payment-methods"
          className={cn(activeTab !== "payment-methods" && "sr-only")}
        >
          <PaymentMethodsTab driver={driver} onAction={showNotice} />
        </section>

        {/* Notes */}
        <section
          id="tab-section-notes"
          aria-labelledby="tab-btn-notes"
          className={cn(activeTab !== "notes" && "sr-only")}
        >
          <NotesTab driver={driver} onAction={showNotice} />
        </section>
      </div>

      {/* ── Sticky action bar ─────────────────────────────────────────────── */}
      <div
        className="fixed bottom-4 right-4 sm:right-6 z-20 flex items-center gap-2 flex-wrap justify-end"
        role="group"
        aria-label="Driver account actions"
      >
        {/* Open ticket */}
        <button
          type="button"
          onClick={() => showNotice("Open ticket — not wired in mock")}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-2 font-body text-[12px] text-foreground shadow-md hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
        >
          <Ticket size={12} aria-hidden="true" />
          Open ticket
        </button>

        {/* Comp next session */}
        <button
          type="button"
          onClick={() => showNotice("Comp next session — not wired in mock")}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-2 font-body text-[12px] text-foreground shadow-md hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
        >
          <Zap size={12} aria-hidden="true" />
          Comp next session
        </button>

        {/* Refund last session */}
        <button
          type="button"
          onClick={() => showNotice("Refund last session — not wired in mock")}
          className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-2 font-body text-[12px] text-foreground shadow-md hover:bg-muted cursor-pointer transition-colors duration-150 ease-out"
        >
          <ReceiptText size={12} aria-hidden="true" />
          Refund last session
        </button>

        {/* Block / Unblock account */}
        {driver.status === "active" || driver.status === "disputed" ? (
          <button
            type="button"
            onClick={() => showNotice("Block account — not wired in mock")}
            className="inline-flex items-center gap-1.5 rounded-btn border border-error/40 bg-error/10 px-3 py-2 font-body text-[12px] text-error shadow-md hover:bg-error/20 cursor-pointer transition-colors duration-150 ease-out"
          >
            <ShieldOff size={12} aria-hidden="true" />
            Block account
          </button>
        ) : (
          <button
            type="button"
            onClick={() => showNotice("Unblock account — not wired in mock")}
            className="inline-flex items-center gap-1.5 rounded-btn border border-success/40 bg-success/10 px-3 py-2 font-body text-[12px] text-success shadow-md hover:bg-success/20 cursor-pointer transition-colors duration-150 ease-out"
          >
            <ShieldOff size={12} aria-hidden="true" />
            Unblock account
          </button>
        )}
      </div>

      {/* ── Inline notice toast ────────────────────────────────────────────── */}
      {notice && (
        <InlineNotice message={notice} onDismiss={dismissNotice} />
      )}
    </div>
  );
}
