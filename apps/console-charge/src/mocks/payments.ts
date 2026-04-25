/**
 * Payments mock data — covers transactions, payouts, refunds, invoices.
 * Used by /payments and its subsections.
 *
 * Distribution:
 *  - 240 transactions across last 60 days (80% success / 5% failed / 3% pending / 12% refunded)
 *  - Gateway mix: 60% UPI / 25% Razorpay card / 10% wallet / 5% RFID postpaid
 *  - Amount: ₹50–₹2000, weighted toward ₹150–₹600
 *  - 25 payouts (weekly cadence)
 *  - 15 refunds (mix of pending / completed / failed)
 *  - 30 GST invoices spanning the last 3 months (B2B fleet + individual)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TxStatus = "success" | "failed" | "pending" | "refunded";
export type Gateway = "razorpay_upi" | "razorpay_card" | "wallet" | "rfid_postpaid";
export type Method =
  | "UPI"
  | "Card"
  | "Wallet"
  | "RFID"
  | "Net banking";

export interface Transaction {
  id: string;
  /** ISO timestamp */
  createdAt: string;
  sessionId: string;
  driverId: string;
  driverName: string;
  method: Method;
  /** Amount in paise (smallest unit) */
  amountPaise: number;
  gateway: Gateway;
  /** Gateway transaction reference */
  gatewayRef: string;
  status: TxStatus;
  stationId: string;
  stationName: string;
  /** Raw gateway payload (collapsible JSON viewer) */
  rawPayload: Record<string, unknown>;
  /** Status timeline events */
  timeline: TimelineEvent[];
  /** Operator notes */
  notes: TxNote[];
}

export interface TimelineEvent {
  status: "created" | "authorized" | "captured" | "settled" | "failed" | "refund_initiated" | "refunded";
  at: string;
  detail?: string;
}

export interface TxNote {
  id: string;
  author: string;
  at: string;
  text: string;
}

export type PayoutStatus = "settled" | "in_transit" | "failed";

export interface Payout {
  id: string;
  /** ISO date the payout was initiated */
  initiatedAt: string;
  /** Amount in paise */
  amountPaise: number;
  /** Last 4 of bank account */
  bankLast4: string;
  bankName: string;
  reference: string;
  status: PayoutStatus;
  /** Settlement timestamp (null if not settled) */
  settledAt: string | null;
  /** Transaction IDs included in this payout */
  txIds: string[];
}

export type RefundStatus = "pending" | "completed" | "failed";

export interface Refund {
  id: string;
  sessionId: string;
  txId: string;
  driverId: string;
  driverName: string;
  /** Original transaction amount in paise */
  originalPaise: number;
  /** Refund amount in paise */
  refundPaise: number;
  reason: string;
  status: RefundStatus;
  initiatedBy: string;
  initiatedAt: string;
  /** ISO timestamp of completion (null while pending/failed) */
  completedAt: string | null;
  /** Optional failure reason */
  failureReason?: string;
}

export type InvoiceStatus = "draft" | "issued" | "paid";
export type CustomerType = "fleet" | "individual";

export interface Invoice {
  id: string;
  number: string;
  /** ISO date */
  issuedAt: string;
  customerName: string;
  customerType: CustomerType;
  customerGstin?: string;
  /** Amounts in paise */
  subtotalPaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  totalPaise: number;
  status: InvoiceStatus;
  /** Mock PDF download URL */
  pdfUrl: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format amount in paise to Indian rupee with lakh/crore comma. */
export function formatINR(paise: number): string {
  const rupees = Math.round(paise / 100);
  return `₹${rupees.toLocaleString("en-IN")}`;
}

/** Format amount in paise to Indian rupee with two decimal places. */
export function formatINRDecimal(paise: number): string {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Format ISO date to short readable form. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Format ISO timestamp to short date + time. */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  })} ${d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
}

/** Mask a bank account, showing only last 4 digits. */
export function maskAccount(last4: string): string {
  return `XXXX XXXX ${last4}`;
}

// ─── Seeded RNG (deterministic mock generation) ───────────────────────────────

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(0x9c4d2);

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)] as T;
}

function pickWeighted<T>(items: readonly { value: T; weight: number }[]): T {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = rng() * total;
  for (const it of items) {
    r -= it.weight;
    if (r <= 0) return it.value;
  }
  return items[0]!.value;
}

function randomAmountPaise(): number {
  // Distribution weighted toward ₹150–₹600.
  const r = rng();
  let rupees: number;
  if (r < 0.6) {
    rupees = 150 + Math.floor(rng() * 451); // 150-600
  } else if (r < 0.85) {
    rupees = 50 + Math.floor(rng() * 100); // 50-150
  } else {
    rupees = 600 + Math.floor(rng() * 1401); // 600-2000
  }
  return rupees * 100;
}

// ─── Driver / station seed pool ───────────────────────────────────────────────

const DRIVERS = [
  { id: "DRV-001", name: "Rohan Mehta" },
  { id: "DRV-002", name: "Priya Nair" },
  { id: "DRV-003", name: "Aarav Sharma" },
  { id: "DRV-004", name: "Ishita Reddy" },
  { id: "DRV-005", name: "Karan Singh" },
  { id: "DRV-006", name: "Meera Iyer" },
  { id: "DRV-007", name: "Vikram Bose" },
  { id: "DRV-008", name: "Anaya Pillai" },
  { id: "DRV-009", name: "Devansh Kapoor" },
  { id: "DRV-010", name: "Shreya Joshi" },
  { id: "DRV-011", name: "Aditya Verma" },
  { id: "DRV-012", name: "Tara D'Souza" },
  { id: "DRV-013", name: "Rahul Khanna" },
  { id: "DRV-014", name: "Nisha Patil" },
  { id: "DRV-015", name: "Kabir Roy" },
] as const;

const STATIONS = [
  { id: "GPWR-Goa-01", name: "GridPower Panaji Hub" },
  { id: "GPWR-Goa-02", name: "GridPower Margao East" },
  { id: "GPWR-Goa-03", name: "GridPower Vasco Plaza" },
  { id: "GPWR-Mum-01", name: "GridPower Bandra Linking" },
  { id: "GPWR-Mum-02", name: "GridPower Powai Lake" },
  { id: "GPWR-Pun-01", name: "GridPower Koregaon Park" },
  { id: "GPWR-Del-01", name: "GridPower Saket Mall" },
  { id: "GPWR-Blr-01", name: "GridPower Indiranagar" },
] as const;

const REFUND_REASONS = [
  "Charging session interrupted",
  "Duplicate charge",
  "Station fault during session",
  "Driver requested cancellation",
  "Energy delivered less than billed",
  "Gateway timeout, retry succeeded",
  "Token authorisation glitch",
] as const;

const FLEET_CUSTOMERS = [
  {
    name: "Ola Electric Fleet Pvt Ltd",
    gstin: "29AAACO1234M1Z9",
  },
  {
    name: "BluSmart Mobility",
    gstin: "29AABCB7654K1Z2",
  },
  {
    name: "Lithium Urban Technologies",
    gstin: "29AAACL3456N1Z3",
  },
  {
    name: "GreenCell Mobility",
    gstin: "27AABCG8765P1Z6",
  },
] as const;

// ─── Generate transactions ────────────────────────────────────────────────────

function generateTransactions(): Transaction[] {
  const COUNT = 240;
  const NOW = new Date("2026-04-25T10:00:00+05:30").getTime();
  const SIXTY_DAYS = 60 * 24 * 60 * 60 * 1000;
  const list: Transaction[] = [];

  for (let i = 0; i < COUNT; i++) {
    const status = pickWeighted<TxStatus>([
      { value: "success", weight: 80 },
      { value: "failed", weight: 5 },
      { value: "pending", weight: 3 },
      { value: "refunded", weight: 12 },
    ]);
    const gateway = pickWeighted<Gateway>([
      { value: "razorpay_upi", weight: 60 },
      { value: "razorpay_card", weight: 25 },
      { value: "wallet", weight: 10 },
      { value: "rfid_postpaid", weight: 5 },
    ]);
    const method: Method =
      gateway === "razorpay_upi"
        ? "UPI"
        : gateway === "razorpay_card"
          ? "Card"
          : gateway === "wallet"
            ? "Wallet"
            : "RFID";

    const driver = pick(DRIVERS);
    const station = pick(STATIONS);
    const amountPaise = randomAmountPaise();
    const createdAt = new Date(NOW - rng() * SIXTY_DAYS).toISOString();
    const id = `TX-${String(100000 + i).padStart(6, "0")}`;
    const sessionId = `SES-${String(200000 + i).padStart(6, "0")}`;

    const timeline: TimelineEvent[] = [
      { status: "created", at: createdAt, detail: "Payment request created" },
    ];
    const t0 = new Date(createdAt).getTime();

    if (status === "success" || status === "refunded") {
      timeline.push({
        status: "authorized",
        at: new Date(t0 + 2_000).toISOString(),
        detail: "Authorisation approved by issuer",
      });
      timeline.push({
        status: "captured",
        at: new Date(t0 + 4_000).toISOString(),
        detail: "Funds captured by gateway",
      });
      timeline.push({
        status: "settled",
        at: new Date(t0 + 36 * 60 * 60 * 1000).toISOString(),
        detail: "Settled into operator bank",
      });
    } else if (status === "failed") {
      timeline.push({
        status: "failed",
        at: new Date(t0 + 3_000).toISOString(),
        detail: "Issuer declined: insufficient funds",
      });
    } else {
      timeline.push({
        status: "authorized",
        at: new Date(t0 + 2_000).toISOString(),
        detail: "Awaiting capture confirmation",
      });
    }

    if (status === "refunded") {
      timeline.push({
        status: "refund_initiated",
        at: new Date(t0 + 24 * 60 * 60 * 1000).toISOString(),
        detail: "Refund initiated by operator",
      });
      timeline.push({
        status: "refunded",
        at: new Date(t0 + 72 * 60 * 60 * 1000).toISOString(),
        detail: "Refund credited to source",
      });
    }

    list.push({
      id,
      createdAt,
      sessionId,
      driverId: driver.id,
      driverName: driver.name,
      method,
      amountPaise,
      gateway,
      gatewayRef: `pay_${Math.floor(rng() * 1e15).toString(36)}`,
      status,
      stationId: station.id,
      stationName: station.name,
      rawPayload: {
        gateway,
        amount: amountPaise,
        currency: "INR",
        method,
        captured: status === "success" || status === "refunded",
        notes: {
          session_id: sessionId,
          driver_id: driver.id,
        },
        fee: Math.round(amountPaise * 0.02),
        tax: Math.round(amountPaise * 0.0036),
      },
      timeline,
      notes:
        status === "failed"
          ? [
              {
                id: `NOTE-${i}-1`,
                author: "Priya Nair",
                at: new Date(t0 + 60 * 60 * 1000).toISOString(),
                text: "Driver retried on UPI app, succeeded on second attempt.",
              },
            ]
          : [],
    });
  }

  // Sort newest first
  list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return list;
}

export const TRANSACTIONS: Transaction[] = generateTransactions();

// ─── Generate payouts ─────────────────────────────────────────────────────────

function generatePayouts(): Payout[] {
  const COUNT = 25;
  const NOW = new Date("2026-04-25T10:00:00+05:30").getTime();
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;
  const list: Payout[] = [];
  const successTx = TRANSACTIONS.filter((t) => t.status === "success");

  for (let i = 0; i < COUNT; i++) {
    const initiatedAt = new Date(NOW - i * ONE_WEEK).toISOString();
    const settled = i > 0; // most recent payout still in transit
    const status: PayoutStatus = settled
      ? "settled"
      : i === 0
        ? "in_transit"
        : "failed";

    // Pick ~ N consecutive transactions to bundle
    const start = i * 7;
    const slice = successTx.slice(start, start + 8 + Math.floor(rng() * 5));
    const sumPaise = slice.reduce((s, t) => s + t.amountPaise, 0);
    const txIds = slice.map((t) => t.id);

    list.push({
      id: `PYO-${String(5000 + i).padStart(5, "0")}`,
      initiatedAt,
      amountPaise: sumPaise,
      bankLast4: "8421",
      bankName: "HDFC Bank",
      reference: `RZP-PYT-${Math.floor(rng() * 1e10).toString(36).toUpperCase()}`,
      status,
      settledAt: settled
        ? new Date(new Date(initiatedAt).getTime() + 36 * 60 * 60 * 1000).toISOString()
        : null,
      txIds,
    });
  }
  return list;
}

export const PAYOUTS: Payout[] = generatePayouts();

// ─── Generate refunds ─────────────────────────────────────────────────────────

function generateRefunds(): Refund[] {
  const COUNT = 15;
  const refundedTx = TRANSACTIONS.filter((t) => t.status === "refunded");
  const list: Refund[] = [];

  for (let i = 0; i < COUNT; i++) {
    const tx = refundedTx[i % refundedTx.length]!;
    const status = pickWeighted<RefundStatus>([
      { value: "pending", weight: 35 },
      { value: "completed", weight: 50 },
      { value: "failed", weight: 15 },
    ]);
    const initiatedAt = new Date(
      new Date(tx.createdAt).getTime() + 6 * 60 * 60 * 1000,
    ).toISOString();
    const completedAt =
      status === "completed"
        ? new Date(new Date(initiatedAt).getTime() + 36 * 60 * 60 * 1000).toISOString()
        : null;

    list.push({
      id: `REF-${String(7000 + i).padStart(5, "0")}`,
      sessionId: tx.sessionId,
      txId: tx.id,
      driverId: tx.driverId,
      driverName: tx.driverName,
      originalPaise: tx.amountPaise,
      refundPaise: rng() < 0.3 ? Math.round(tx.amountPaise * 0.5) : tx.amountPaise,
      reason: pick(REFUND_REASONS),
      status,
      initiatedBy: rng() < 0.5 ? "Priya Nair (Ops)" : "Auto retry agent",
      initiatedAt,
      completedAt,
      failureReason:
        status === "failed"
          ? "Source bank rejected refund, contact issuer"
          : undefined,
    });
  }

  return list;
}

export const REFUNDS: Refund[] = generateRefunds();

// ─── Generate invoices ────────────────────────────────────────────────────────

function generateInvoices(): Invoice[] {
  const COUNT = 30;
  const NOW = new Date("2026-04-25T10:00:00+05:30").getTime();
  const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;
  const list: Invoice[] = [];

  for (let i = 0; i < COUNT; i++) {
    const issuedAt = new Date(NOW - rng() * NINETY_DAYS).toISOString();
    const isFleet = rng() < 0.55;
    const fleet = pick(FLEET_CUSTOMERS);
    const driver = pick(DRIVERS);
    const subtotalPaise = isFleet
      ? Math.round((20000 + rng() * 180000) * 100)
      : Math.round((300 + rng() * 1700) * 100);
    // Intra-state: CGST 9% + SGST 9%; Inter-state: IGST 18%. Mock 70/30 split.
    const interState = rng() < 0.3;
    const taxPaise = Math.round(subtotalPaise * 0.18);
    const cgstPaise = interState ? 0 : Math.round(taxPaise / 2);
    const sgstPaise = interState ? 0 : taxPaise - cgstPaise;
    const igstPaise = interState ? taxPaise : 0;
    const totalPaise = subtotalPaise + cgstPaise + sgstPaise + igstPaise;
    const status = pickWeighted<InvoiceStatus>([
      { value: "paid", weight: 65 },
      { value: "issued", weight: 25 },
      { value: "draft", weight: 10 },
    ]);

    const number = `INV-${new Date(issuedAt).getFullYear()}-${String(i + 100).padStart(4, "0")}`;

    list.push({
      id: `INVID-${i}`,
      number,
      issuedAt,
      customerName: isFleet ? fleet.name : driver.name,
      customerType: isFleet ? "fleet" : "individual",
      customerGstin: isFleet ? fleet.gstin : undefined,
      subtotalPaise,
      cgstPaise,
      sgstPaise,
      igstPaise,
      totalPaise,
      status,
      pdfUrl: `#mock-pdf-${number}`,
    });
  }

  list.sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
  return list;
}

export const INVOICES: Invoice[] = generateInvoices();

// ─── Derived aggregates for the overview page ────────────────────────────────

/** Sum of successful + refunded transactions in the current month (paise). */
export function monthRevenuePaise(): number {
  const now = new Date("2026-04-25T10:00:00+05:30");
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  return TRANSACTIONS.filter(
    (t) =>
      (t.status === "success" || t.status === "refunded") &&
      new Date(t.createdAt).getTime() >= monthStart,
  ).reduce((s, t) => s + t.amountPaise, 0);
}

export function pendingRefunds(): { count: number; totalPaise: number } {
  const pending = REFUNDS.filter((r) => r.status === "pending");
  return {
    count: pending.length,
    totalPaise: pending.reduce((s, r) => s + r.refundPaise, 0),
  };
}

export function nextPayout(): { date: string; amountPaise: number } {
  const inTransit = PAYOUTS.find((p) => p.status === "in_transit");
  if (inTransit) {
    return {
      date: new Date(
        new Date(inTransit.initiatedAt).getTime() + 36 * 60 * 60 * 1000,
      ).toISOString(),
      amountPaise: inTransit.amountPaise,
    };
  }
  // Fallback: project next week
  return {
    date: new Date("2026-05-02T10:00:00+05:30").toISOString(),
    amountPaise: 0,
  };
}

export function failedToday(): number {
  const todayStart = new Date("2026-04-25T00:00:00+05:30").getTime();
  return TRANSACTIONS.filter(
    (t) => t.status === "failed" && new Date(t.createdAt).getTime() >= todayStart,
  ).length;
}

/** Last 30 days revenue series for the overview line chart. */
export function revenueSeries30d(): { date: string; revenue: number }[] {
  const NOW = new Date("2026-04-25T10:00:00+05:30");
  const buckets: { date: string; revenue: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - i);
    const dayStart = d.getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const total = TRANSACTIONS.filter((t) => {
      const ts = new Date(t.createdAt).getTime();
      return (
        (t.status === "success" || t.status === "refunded") &&
        ts >= dayStart &&
        ts < dayEnd
      );
    }).reduce((s, t) => s + t.amountPaise, 0);
    buckets.push({
      date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      revenue: Math.round(total / 100),
    });
  }
  return buckets;
}

/** Find a transaction by ID, returns null if not found. */
export function findTransaction(id: string): Transaction | null {
  return TRANSACTIONS.find((t) => t.id === id) ?? null;
}
