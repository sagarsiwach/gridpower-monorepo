/**
 * CON.FLEET-DETAIL: Fleet detail view
 * Route: /fleet/:fleetId
 *
 * In-page tabs: Overview / Vehicles / Drivers / Sessions / Billing / Contract
 * Tab state: URL search param ?tab=
 */

import * as React from "react";
import { useParams, Link, useSearchParams } from "react-router";
import { ArrowLeft, AlertCircle, MoreHorizontal } from "lucide-react";
import { VEHICLES, type Vehicle } from "~/mocks/fleet";

// ─── Mock fleet account data ──────────────────────────────────────────────────

type ContractType = "Monthly fixed" | "Pay-per-use" | "Annual pre-paid";
type FleetStatus = "active" | "suspended" | "trial";

interface FleetContact {
  name: string;
  title: string;
  email: string;
  phone: string;
}

interface FleetAccount {
  id: string;
  name: string;
  contractType: ContractType;
  status: FleetStatus;
  accountManager: FleetContact;
  contractTerms: string;
  renewalDate: string;
  creditLimit: string;
  creditBalance: string;
  monthlyStats: { sessions: number; spend: string; kwh: string };
  vehicleIds: string[];
  driverIds: string[];
}

const FLEET_ACCOUNTS: Record<string, FleetAccount> = {
  "fleet-001": {
    id: "fleet-001",
    name: "SwiftLogistics Pvt Ltd",
    contractType: "Annual pre-paid",
    status: "active",
    accountManager: {
      name: "Priya Menon",
      title: "Account Manager",
      email: "priya.menon@gridpower.in",
      phone: "+91 98201 44312",
    },
    contractTerms:
      "Annual pre-paid plan covering 50 vehicles, unlimited sessions at enrolled stations. Idle fees waived. Custom tariff: AC 22kW at ₹7.50/kWh, DC 60kW at ₹12.50/kWh. Monthly reporting included.",
    renewalDate: "31 March 2026",
    creditLimit: "₹5,00,000",
    creditBalance: "₹3,12,400",
    monthlyStats: { sessions: 842, spend: "₹1,87,600", kwh: "14,230 kWh" },
    vehicleIds: ["EV-001", "EV-002", "EV-003", "EV-004", "EV-005", "EV-006", "EV-007", "EV-008"],
    driverIds: ["DRV-01", "DRV-02", "DRV-03", "DRV-04"],
  },
  "fleet-002": {
    id: "fleet-002",
    name: "Zomato Fleet India",
    contractType: "Monthly fixed",
    status: "active",
    accountManager: {
      name: "Arjun Sharma",
      title: "Fleet Success Lead",
      email: "arjun.sharma@gridpower.in",
      phone: "+91 99874 56123",
    },
    contractTerms:
      "Monthly fixed plan, ₹42,000/month for up to 30 vehicles. Includes priority charger reservation at partner stations, dedicated 24x7 support channel, and monthly invoice with GST breakdown.",
    renewalDate: "30 June 2025",
    creditLimit: "₹2,00,000",
    creditBalance: "₹1,04,200",
    monthlyStats: { sessions: 1204, spend: "₹2,54,900", kwh: "19,870 kWh" },
    vehicleIds: ["EV-009", "EV-010", "EV-011", "EV-012", "EV-013", "EV-014", "EV-015"],
    driverIds: ["DRV-05", "DRV-06", "DRV-07"],
  },
  "fleet-003": {
    id: "fleet-003",
    name: "Bengaluru BMTC EV Pilot",
    contractType: "Pay-per-use",
    status: "trial",
    accountManager: {
      name: "Kavita Nair",
      title: "Government Accounts",
      email: "kavita.nair@gridpower.in",
      phone: "+91 97300 88201",
    },
    contractTerms:
      "6-month pilot under Government of Karnataka EV transition programme. Pay-per-use at regulated tariff of ₹6.50/kWh (AC) and ₹11.00/kWh (DC). Billing quarterly, 30-day payment terms.",
    renewalDate: "15 September 2025",
    creditLimit: "₹1,50,000",
    creditBalance: "₹98,000",
    monthlyStats: { sessions: 318, spend: "₹68,400", kwh: "5,210 kWh" },
    vehicleIds: ["EV-016", "EV-017", "EV-018", "EV-019", "EV-020"],
    driverIds: ["DRV-08", "DRV-09"],
  },
};

// ─── Mock session rows for a fleet ───────────────────────────────────────────

interface SessionRow {
  id: string;
  time: string;
  station: string;
  driver: string;
  kwh: string;
  amount: string;
  status: "completed" | "ongoing" | "stopped";
}

function buildSessionRows(fleetId: string): SessionRow[] {
  const drivers: Record<string, string[]> = {
    "fleet-001": ["Rajesh K.", "Mohan D.", "Sunita P.", "Anil B."],
    "fleet-002": ["Deepak S.", "Meena R.", "Vinod T."],
    "fleet-003": ["Girish N.", "Padma V."],
  };
  const dList = drivers[fleetId] ?? ["Driver A", "Driver B"];
  const statuses: SessionRow["status"][] = ["completed", "completed", "completed", "ongoing", "stopped"];
  return Array.from({ length: 10 }, (_, i) => ({
    id: `${fleetId}-S${String(i + 1).padStart(3, "0")}`,
    time: `${String(10 + i).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    station: `GridPower-${["Del", "Blr", "Mum", "Goa"][i % 4]}-${String((i % 3) + 1).padStart(2, "0")}`,
    driver: dList[i % dList.length]!,
    kwh: `${(12 + i * 3.2).toFixed(1)} kWh`,
    amount: `₹${(840 + i * 224).toLocaleString("en-IN")}`,
    status: statuses[i % statuses.length]!,
  }));
}

// ─── Mock invoice rows ────────────────────────────────────────────────────────

interface InvoiceRow {
  id: string;
  period: string;
  amount: string;
  status: "paid" | "due" | "overdue";
  dueDate: string;
}

const INVOICE_ROWS: InvoiceRow[] = [
  { id: "INV-2025-03", period: "March 2025", amount: "₹1,87,600", status: "paid", dueDate: "10 Apr 2025" },
  { id: "INV-2025-02", period: "February 2025", amount: "₹1,64,200", status: "paid", dueDate: "10 Mar 2025" },
  { id: "INV-2025-01", period: "January 2025", amount: "₹2,01,800", status: "paid", dueDate: "10 Feb 2025" },
  { id: "INV-2024-12", period: "December 2024", amount: "₹1,92,400", status: "paid", dueDate: "10 Jan 2025" },
];

// ─── Tab types ────────────────────────────────────────────────────────────────

type TabId = "overview" | "vehicles" | "drivers" | "sessions" | "billing" | "contract";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "vehicles", label: "Vehicles" },
  { id: "drivers", label: "Drivers" },
  { id: "sessions", label: "Sessions" },
  { id: "billing", label: "Billing" },
  { id: "contract", label: "Contract" },
];

// ─── Contract type badge ──────────────────────────────────────────────────────

function ContractBadge({ type }: { type: ContractType }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
      {type}
    </span>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: FleetStatus }) {
  const styles: Record<FleetStatus, { bg: string; text: string; dot: string; label: string }> = {
    active: { bg: "bg-success/10", text: "text-success", dot: "bg-success", label: "Active" },
    suspended: { bg: "bg-error/10", text: "text-error", dot: "bg-error", label: "Suspended" },
    trial: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning", label: "Trial" },
  };
  const s = styles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${s.bg} ${s.text}`}>
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ─── Invoice status pill ──────────────────────────────────────────────────────

function InvoiceStatusPill({ status }: { status: InvoiceRow["status"] }) {
  const styles = {
    paid: "bg-success/10 text-success",
    due: "bg-warning/10 text-warning",
    overdue: "bg-error/10 text-error",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${styles[status]}`}>
      {status === "paid" ? "Paid" : status === "due" ? "Due" : "Overdue"}
    </span>
  );
}

// ─── Session status pill ──────────────────────────────────────────────────────

function SessionStatusPill({ status }: { status: SessionRow["status"] }) {
  const styles = {
    completed: "bg-success/10 text-success",
    ongoing: "bg-info/10 text-info",
    stopped: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${styles[status]}`}>
      {status === "completed" ? "Completed" : status === "ongoing" ? "Ongoing" : "Stopped"}
    </span>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────

function OverviewTab({ fleet }: { fleet: FleetAccount }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Monthly summary */}
      <section aria-labelledby="monthly-summary-heading">
        <h3
          id="monthly-summary-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          This month
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Sessions", value: fleet.monthlyStats.sessions.toLocaleString("en-IN") },
            { label: "Spend", value: fleet.monthlyStats.spend },
            { label: "Energy", value: fleet.monthlyStats.kwh },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-card border border-border bg-card p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                {label}
              </div>
              <div className="font-mono text-[22px] font-semibold leading-none text-foreground">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Account manager */}
      <section aria-labelledby="account-manager-heading">
        <h3
          id="account-manager-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Account manager
        </h3>
        <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-2">
          <div>
            <div className="font-body text-[14px] font-semibold text-foreground">
              {fleet.accountManager.name}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">
              {fleet.accountManager.title}
            </div>
          </div>
          <a
            href={`mailto:${fleet.accountManager.email}`}
            className="font-body text-[13px] text-foreground hover:text-primary transition-colors duration-150 ease-out"
          >
            {fleet.accountManager.email}
          </a>
          <a
            href={`tel:${fleet.accountManager.phone.replace(/\s/g, "")}`}
            className="font-body text-[13px] text-foreground hover:text-primary transition-colors duration-150 ease-out"
          >
            {fleet.accountManager.phone}
          </a>
        </div>
      </section>

      {/* Contract terms summary */}
      <section aria-labelledby="contract-summary-heading">
        <h3
          id="contract-summary-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Contract terms
        </h3>
        <div className="rounded-card border border-border bg-card p-4 flex flex-col gap-3">
          <p className="font-body text-[13px] leading-relaxed text-muted-foreground">
            {fleet.contractTerms}
          </p>
          <div className="flex flex-wrap gap-4 border-t border-border pt-3">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-0.5">
                Renewal
              </div>
              <div className="font-mono text-[12px] text-foreground">{fleet.renewalDate}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-0.5">
                Credit limit
              </div>
              <div className="font-mono text-[12px] text-foreground">{fleet.creditLimit}</div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-0.5">
                Credit balance
              </div>
              <div className="font-mono text-[12px] text-success">{fleet.creditBalance}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Vehicles tab ─────────────────────────────────────────────────────────────

const VehicleStatusLabel: Record<string, { bg: string; text: string; label: string }> = {
  charging: { bg: "bg-primary/10", text: "text-primary", label: "Charging" },
  idle: { bg: "bg-muted", text: "text-muted-foreground", label: "Idle" },
  "in-route": { bg: "bg-info/10", text: "text-info", label: "In route" },
  "low-battery": { bg: "bg-error/10", text: "text-error", label: "Low battery" },
  maintenance: { bg: "bg-warning/10", text: "text-warning", label: "Maintenance" },
  full: { bg: "bg-success/10", text: "text-success", label: "Full" },
};

function VehiclesTab({ vehicles }: { vehicles: Vehicle[] }) {
  if (vehicles.length === 0) {
    return (
      <div className="rounded-card border border-border bg-card px-6 py-12 text-center">
        <p className="font-body text-[14px] font-semibold text-foreground mb-1">
          No vehicles enrolled
        </p>
        <p className="font-body text-[13px] text-muted-foreground">
          Vehicles assigned to this fleet will appear here.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="fleet-vehicles-tab-heading">
      <h3 id="fleet-vehicles-tab-heading" className="sr-only">Fleet vehicles</h3>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Fleet vehicles">
            <caption className="sr-only">Vehicles enrolled in this fleet</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Registration", "Make / Model", "Type", "Primary driver", "SoC", "Monthly cost", ""].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    aria-sort={undefined}
                    className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => {
                const s = VehicleStatusLabel[v.status] ?? { bg: "bg-muted", text: "text-muted-foreground", label: v.status };
                return (
                  <tr
                    key={v.id}
                    className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                  >
                    <td className="px-4 py-3 font-mono text-[11px] font-medium text-foreground">
                      {v.registration}
                    </td>
                    <td className="px-4 py-3 font-body text-[12px] text-muted-foreground">
                      {v.model}
                    </td>
                    <td className="px-4 py-3 font-body text-[12px] text-muted-foreground">
                      {v.type}
                    </td>
                    <td className="px-4 py-3 font-body text-[12px] text-muted-foreground">
                      {v.depot.replace(" Depot", " driver")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-1.5 w-12 rounded-full overflow-hidden bg-muted shrink-0`}
                          role="progressbar"
                          aria-valuenow={v.soc}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`SoC ${v.soc}%`}
                        >
                          <div
                            className={`h-full rounded-full ${v.soc < 20 ? "bg-error" : v.soc < 50 ? "bg-warning" : "bg-success"}`}
                            style={{ width: `${v.soc}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {v.soc}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-foreground">
                      {v.costPerKm}
                      <span className="text-muted-foreground">/km</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${s.bg} ${s.text}`}>
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Drivers tab ──────────────────────────────────────────────────────────────

function DriversTab({ fleet }: { fleet: FleetAccount }) {
  const drivers = fleet.driverIds.map((id, i) => ({
    id,
    name: ["Rajesh Kumar", "Sunita Patel", "Mohan Das", "Anil Bhat", "Deepak Singh", "Meena Rao", "Vinod Tiwari", "Girish Nair", "Padma Viswanathan"][i] ?? `Driver ${i + 1}`,
    cards: 1 + (i % 2),
    lastSession: `${i + 1} day${i === 0 ? "" : "s"} ago`,
    totalSessions: 42 + i * 17,
  }));

  return (
    <section aria-labelledby="fleet-drivers-tab-heading">
      <h3 id="fleet-drivers-tab-heading" className="sr-only">Fleet drivers</h3>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Fleet drivers">
            <caption className="sr-only">Drivers permitted under this fleet</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Driver ID", "Name", "RFID cards", "Last session", "Total sessions", ""].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                >
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">
                    {d.id}
                  </td>
                  <td className="px-4 py-3 font-body text-[13px] text-foreground font-medium">
                    {d.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-foreground">
                    {d.cards}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                    {d.lastSession}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-foreground">
                    {d.totalSessions}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/drivers/${d.id}`}
                      className="font-body text-[12px] text-primary hover:opacity-80 transition-opacity duration-150 ease-out"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Sessions tab ─────────────────────────────────────────────────────────────

function SessionsTab({ fleet }: { fleet: FleetAccount }) {
  const rows = buildSessionRows(fleet.id);

  return (
    <section aria-labelledby="fleet-sessions-tab-heading">
      <div className="flex items-center justify-between mb-3">
        <h3
          id="fleet-sessions-tab-heading"
          className="font-body text-[13px] font-semibold text-foreground"
        >
          Recent sessions
        </h3>
        <Link
          to={`/sessions?fleet_id=${fleet.id}`}
          className="font-mono text-[10px] uppercase tracking-[0.06em] text-primary hover:opacity-80 transition-opacity duration-150 ease-out"
        >
          View all sessions
        </Link>
      </div>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Recent fleet sessions">
            <caption className="sr-only">10 most recent charging sessions for this fleet</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Session", "Time", "Station", "Driver", "kWh", "Amount", "Status"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                >
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                    {row.time}
                  </td>
                  <td className="px-4 py-3 font-body text-[12px] text-foreground">
                    {row.station}
                  </td>
                  <td className="px-4 py-3 font-body text-[12px] text-muted-foreground">
                    {row.driver}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-foreground">
                    {row.kwh}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] font-semibold text-primary">
                    {row.amount}
                  </td>
                  <td className="px-4 py-3">
                    <SessionStatusPill status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Billing tab ──────────────────────────────────────────────────────────────

function BillingTab({ fleet }: { fleet: FleetAccount }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Credit summary */}
      <section aria-labelledby="billing-credit-heading">
        <h3
          id="billing-credit-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Credit account
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "Credit limit", value: fleet.creditLimit },
            { label: "Available balance", value: fleet.creditBalance, tone: "text-success" },
            { label: "Renewal", value: fleet.renewalDate },
          ].map(({ label, value, tone }) => (
            <div key={label} className="rounded-card border border-border bg-card p-4">
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
                {label}
              </div>
              <div className={`font-mono text-[18px] font-semibold leading-none ${tone ?? "text-foreground"}`}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Invoice table */}
      <section aria-labelledby="billing-invoices-heading">
        <h3
          id="billing-invoices-heading"
          className="font-body text-[13px] font-semibold text-foreground mb-3"
        >
          Invoices
        </h3>
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full" aria-label="Fleet invoices">
              <caption className="sr-only">Invoice history for this fleet</caption>
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["Invoice", "Period", "Amount", "Due date", "Status", ""].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {INVOICE_ROWS.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100 ease-out"
                  >
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">
                      {inv.id}
                    </td>
                    <td className="px-4 py-3 font-body text-[12px] text-foreground">
                      {inv.period}
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] font-semibold text-primary">
                      {inv.amount}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">
                      {inv.dueDate}
                    </td>
                    <td className="px-4 py-3">
                      <InvoiceStatusPill status={inv.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="font-body text-[12px] text-primary hover:opacity-80 transition-opacity duration-150 ease-out"
                        onClick={() => console.log("Download invoice", inv.id)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Contract tab ─────────────────────────────────────────────────────────────

function ContractTab({ fleet }: { fleet: FleetAccount }) {
  const amendments = [
    { date: "15 Jan 2025", description: "Added DC 120kW ports to tariff scope, no pricing change." },
    { date: "01 Oct 2024", description: "Vehicle limit increased from 30 to 50 as per addendum 3A." },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* PDF placeholder */}
      <section aria-labelledby="contract-doc-heading">
        <h3
          id="contract-doc-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Master service agreement
        </h3>
        <div className="rounded-card border border-border bg-card flex items-center justify-between px-5 py-4">
          <div>
            <div className="font-body text-[13px] font-semibold text-foreground mb-0.5">
              MSA-{fleet.id.toUpperCase()}.pdf
            </div>
            <div className="font-mono text-[10px] text-muted-foreground">
              Signed 1 April 2024 · 12 pages
            </div>
          </div>
          <button
            type="button"
            onClick={() => console.log("Download contract PDF", fleet.id)}
            className="flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted transition-colors duration-150 ease-out cursor-pointer"
          >
            Download PDF
          </button>
        </div>
      </section>

      {/* Renewal date */}
      <section aria-labelledby="contract-renewal-heading">
        <h3
          id="contract-renewal-heading"
          className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-3"
        >
          Renewal
        </h3>
        <div className="rounded-card border border-border bg-card px-5 py-4 flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground mb-1">
              Contract renewal date
            </div>
            <div className="font-mono text-[20px] font-semibold text-foreground">
              {fleet.renewalDate}
            </div>
          </div>
          <button
            type="button"
            onClick={() => console.log("Initiate renewal", fleet.id)}
            className="flex items-center gap-1.5 rounded-btn bg-primary px-3.5 py-2 font-body text-[12px] font-medium text-white hover:bg-primary/90 transition-colors duration-150 ease-out cursor-pointer"
          >
            Initiate renewal
          </button>
        </div>
      </section>

      {/* Amendments */}
      <section aria-labelledby="contract-amendments-heading">
        <h3
          id="contract-amendments-heading"
          className="font-body text-[13px] font-semibold text-foreground mb-3"
        >
          Amendments
        </h3>
        {amendments.length === 0 ? (
          <div className="rounded-card border border-border bg-card px-5 py-6 text-center">
            <p className="font-body text-[13px] text-muted-foreground">No amendments on record.</p>
          </div>
        ) : (
          <ul className="rounded-card border border-border bg-card divide-y divide-border overflow-hidden">
            {amendments.map((a) => (
              <li key={a.date} className="px-5 py-3.5 flex items-start gap-4">
                <span className="font-mono text-[10px] text-muted-foreground shrink-0 mt-0.5">
                  {a.date}
                </span>
                <span className="font-body text-[13px] text-foreground">
                  {a.description}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// ─── Fleet detail page ────────────────────────────────────────────────────────

export default function FleetDetail() {
  const { fleetId } = useParams<{ fleetId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get("tab") as TabId | null) ?? "overview";

  const fleet = fleetId ? FLEET_ACCOUNTS[fleetId] : undefined;

  const setTab = (tab: TabId) => {
    const next = new URLSearchParams(searchParams);
    next.set("tab", tab);
    setSearchParams(next, { replace: true });
  };

  if (!fleet) {
    return (
      <div className="flex flex-col gap-4">
        <Link
          to="/fleet"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Fleet
        </Link>
        <div
          role="alert"
          className="flex items-center justify-center gap-3 rounded-card border border-border bg-card p-12"
        >
          <AlertCircle size={18} className="text-error" aria-hidden="true" />
          <p className="font-body text-[13px] text-muted-foreground">
            Fleet{" "}
            <span className="font-mono text-foreground">{fleetId}</span> not found.
          </p>
        </div>
      </div>
    );
  }

  const fleetVehicles = VEHICLES.filter((v) =>
    fleet.vehicleIds.includes(v.id)
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          to="/fleet"
          className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Fleet
        </Link>
        <span aria-hidden="true" className="font-mono text-[10px] text-muted-foreground">/</span>
        <span className="font-mono text-[11px] text-foreground">{fleet.id}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <h2 className="font-body text-[20px] font-semibold text-foreground leading-tight">
            {fleet.name}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <ContractBadge type={fleet.contractType} />
            <StatusBadge status={fleet.status} />
            <span className="font-mono text-[10px] text-muted-foreground">
              {fleet.vehicleIds.length} vehicles · {fleet.driverIds.length} drivers
            </span>
          </div>
        </div>
        <button
          type="button"
          aria-label={`Fleet actions for ${fleet.name}`}
          className="self-start sm:self-auto flex items-center justify-center w-8 h-8 rounded-btn border border-border text-muted-foreground hover:bg-muted transition-colors duration-150 ease-out cursor-pointer"
          onClick={() => console.log("Fleet actions", fleet.id)}
        >
          <MoreHorizontal size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Fleet sections"
        className="flex items-center gap-0 border-b border-border"
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`fleet-tab-${tab.id}`}
              aria-selected={active}
              aria-controls={`fleet-tabpanel-${tab.id}`}
              onClick={() => setTab(tab.id)}
              className={`px-4 py-2.5 font-body text-[13px] border-b-2 transition-colors duration-150 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                active
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      {TABS.map((tab) => (
        <div
          key={tab.id}
          id={`fleet-tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`fleet-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {activeTab === tab.id && (
            <>
              {tab.id === "overview" && <OverviewTab fleet={fleet} />}
              {tab.id === "vehicles" && <VehiclesTab vehicles={fleetVehicles} />}
              {tab.id === "drivers" && <DriversTab fleet={fleet} />}
              {tab.id === "sessions" && <SessionsTab fleet={fleet} />}
              {tab.id === "billing" && <BillingTab fleet={fleet} />}
              {tab.id === "contract" && <ContractTab fleet={fleet} />}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
