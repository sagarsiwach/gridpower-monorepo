/**
 * Tariff mock data for GridCharge Console.
 * 12 records: 6 active, 3 scheduled, 3 expired
 * Types: 4 per-kWh, 3 per-min, 5 hybrid (with time-of-use bands)
 * Rates: realistic Indian pricing (DC ₹15-25/kWh, AC ₹10-15/kWh, idle ₹2-5/min)
 */

export type TariffType = "per-kwh" | "per-min" | "hybrid";
export type TariffStatus = "active" | "scheduled" | "expired";

export interface TouBand {
  label: "peak" | "off-peak" | "super-off-peak";
  startHour: number; // 0-23
  endHour: number;   // 0-23 (exclusive)
  ratePerKwh: number;
}

export interface ConnectorOverride {
  enabled: boolean;
  acRatePerKwh?: number;
  dcRatePerKwh?: number;
}

export interface TariffPricing {
  /** ₹ per kWh base energy rate */
  energyRatePerKwh: number;
  /** Time-of-use bands (empty array = disabled) */
  touBands: TouBand[];
  /** ₹ per minute active charging rate (undefined = not applicable) */
  timeRatePerMin?: number;
  /** Minutes before idle fee kicks in */
  idleThresholdMinutes?: number;
  /** ₹ per minute idle fee after threshold */
  idleFeePerMin?: number;
  /** Flat ₹ per session connection fee */
  connectionFee?: number;
  /** % discount for app users (0-100) */
  memberDiscountPct?: number;
  /** Per-connector type overrides */
  connectorOverride: ConnectorOverride;
}

export type ApplyScope = "all" | "city" | "tag" | "specific";

export interface TariffApply {
  scope: ApplyScope;
  cities?: string[];
  tags?: string[];
  stationIds?: string[];
}

export interface Tariff {
  id: string;
  name: string;
  description: string;
  type: TariffType;
  status: TariffStatus;
  effectiveFrom: string; // ISO date string
  expiresAt?: string;    // ISO date string, optional
  stationsApplied: number;
  activeDrivers: number;
  pricing: TariffPricing;
  apply: TariffApply;
  /** ISO timestamp, used for default sort (most-recently-modified first) */
  modifiedAt: string;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

export const ALL_TARIFFS: Tariff[] = [
  // ── Active: per-kWh ──────────────────────────────────────────────────────
  {
    id: "TAR-001",
    name: "Standard DC",
    description: "Default rate for all DC fast-chargers across the network.",
    type: "per-kwh",
    status: "active",
    effectiveFrom: "2025-01-01",
    stationsApplied: 42,
    activeDrivers: 318,
    pricing: {
      energyRatePerKwh: 22,
      touBands: [],
      idleThresholdMinutes: 15,
      idleFeePerMin: 3,
      connectionFee: 0,
      memberDiscountPct: 5,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "tag", tags: ["DC"] },
    modifiedAt: "2026-04-22T09:14:00Z",
  },
  {
    id: "TAR-002",
    name: "Standard AC",
    description: "Default rate for AC slow-chargers at parking and malls.",
    type: "per-kwh",
    status: "active",
    effectiveFrom: "2025-01-01",
    stationsApplied: 31,
    activeDrivers: 204,
    pricing: {
      energyRatePerKwh: 12,
      touBands: [],
      idleThresholdMinutes: 30,
      idleFeePerMin: 2,
      connectionFee: 0,
      memberDiscountPct: 0,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "tag", tags: ["AC"] },
    modifiedAt: "2026-04-20T14:30:00Z",
  },
  {
    id: "TAR-003",
    name: "Express Highway",
    description: "Premium rate for highway corridor DC chargers with guaranteed uptime.",
    type: "per-kwh",
    status: "active",
    effectiveFrom: "2025-06-01",
    stationsApplied: 8,
    activeDrivers: 95,
    pricing: {
      energyRatePerKwh: 25,
      touBands: [],
      idleThresholdMinutes: 10,
      idleFeePerMin: 5,
      connectionFee: 20,
      memberDiscountPct: 0,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "tag", tags: ["highway"] },
    modifiedAt: "2026-04-18T11:00:00Z",
  },
  {
    id: "TAR-004",
    name: "Fleet Bulk",
    description: "Negotiated rate for registered fleet operators. Applied to specific stations.",
    type: "per-kwh",
    status: "active",
    effectiveFrom: "2025-09-15",
    stationsApplied: 14,
    activeDrivers: 73,
    pricing: {
      energyRatePerKwh: 15,
      touBands: [],
      idleThresholdMinutes: 20,
      idleFeePerMin: 2,
      connectionFee: 0,
      memberDiscountPct: 10,
      connectorOverride: {
        enabled: true,
        acRatePerKwh: 10,
        dcRatePerKwh: 15,
      },
    },
    apply: { scope: "specific", stationIds: ["GPWR-MUM-01", "GPWR-MUM-04", "GPWR-PNE-02"] },
    modifiedAt: "2026-04-15T08:00:00Z",
  },

  // ── Active: per-min ───────────────────────────────────────────────────────
  {
    id: "TAR-005",
    name: "Quick Pit Stop",
    description: "Per-minute billing for drivers who need a quick top-up. Best for short sessions.",
    type: "per-min",
    status: "active",
    effectiveFrom: "2025-03-01",
    stationsApplied: 5,
    activeDrivers: 38,
    pricing: {
      energyRatePerKwh: 0,
      touBands: [],
      timeRatePerMin: 4.5,
      idleThresholdMinutes: 10,
      idleFeePerMin: 3,
      connectionFee: 0,
      memberDiscountPct: 0,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "specific", stationIds: ["GPWR-BLR-03", "GPWR-BLR-05"] },
    modifiedAt: "2026-04-10T16:45:00Z",
  },

  // ── Active: hybrid (per-kWh + per-min + time-of-use) ─────────────────────
  {
    id: "TAR-006",
    name: "Peak-Off-Peak Saver",
    description: "Hybrid tariff with time-of-use bands. Cheaper overnight charging.",
    type: "hybrid",
    status: "active",
    effectiveFrom: "2025-04-01",
    stationsApplied: 22,
    activeDrivers: 187,
    pricing: {
      energyRatePerKwh: 18,
      touBands: [
        { label: "peak", startHour: 9, endHour: 21, ratePerKwh: 22 },
        { label: "off-peak", startHour: 21, endHour: 24, ratePerKwh: 15 },
        { label: "super-off-peak", startHour: 0, endHour: 9, ratePerKwh: 11 },
      ],
      timeRatePerMin: 2,
      idleThresholdMinutes: 15,
      idleFeePerMin: 4,
      connectionFee: 10,
      memberDiscountPct: 8,
      connectorOverride: {
        enabled: true,
        acRatePerKwh: 11,
        dcRatePerKwh: 22,
      },
    },
    apply: { scope: "city", cities: ["Mumbai", "Bengaluru"] },
    modifiedAt: "2026-04-08T12:30:00Z",
  },

  // ── Scheduled ─────────────────────────────────────────────────────────────
  {
    id: "TAR-007",
    name: "Summer Surge 2026",
    description: "Increased rates during summer peak demand months (May to July).",
    type: "hybrid",
    status: "scheduled",
    effectiveFrom: "2026-05-01",
    expiresAt: "2026-07-31",
    stationsApplied: 50,
    activeDrivers: 0,
    pricing: {
      energyRatePerKwh: 24,
      touBands: [
        { label: "peak", startHour: 12, endHour: 20, ratePerKwh: 28 },
        { label: "off-peak", startHour: 20, endHour: 24, ratePerKwh: 18 },
        { label: "super-off-peak", startHour: 0, endHour: 12, ratePerKwh: 14 },
      ],
      timeRatePerMin: 3,
      idleThresholdMinutes: 12,
      idleFeePerMin: 4,
      connectionFee: 15,
      memberDiscountPct: 5,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "all" },
    modifiedAt: "2026-04-24T10:00:00Z",
  },
  {
    id: "TAR-008",
    name: "Member Discount Tier",
    description: "Exclusive lower rate for verified app members. Launches May 2026.",
    type: "hybrid",
    status: "scheduled",
    effectiveFrom: "2026-05-15",
    stationsApplied: 42,
    activeDrivers: 0,
    pricing: {
      energyRatePerKwh: 18,
      touBands: [
        { label: "peak", startHour: 9, endHour: 21, ratePerKwh: 20 },
        { label: "off-peak", startHour: 21, endHour: 24, ratePerKwh: 14 },
        { label: "super-off-peak", startHour: 0, endHour: 9, ratePerKwh: 10 },
      ],
      idleThresholdMinutes: 20,
      idleFeePerMin: 2,
      connectionFee: 0,
      memberDiscountPct: 15,
      connectorOverride: {
        enabled: true,
        acRatePerKwh: 10,
        dcRatePerKwh: 18,
      },
    },
    apply: { scope: "tag", tags: ["member-eligible"] },
    modifiedAt: "2026-04-23T17:15:00Z",
  },
  {
    id: "TAR-009",
    name: "Off-Peak Special",
    description: "Pilot tariff for overnight charging incentive at select metro stations.",
    type: "per-min",
    status: "scheduled",
    effectiveFrom: "2026-06-01",
    stationsApplied: 12,
    activeDrivers: 0,
    pricing: {
      energyRatePerKwh: 0,
      touBands: [],
      timeRatePerMin: 2,
      idleThresholdMinutes: 30,
      idleFeePerMin: 1.5,
      connectionFee: 5,
      memberDiscountPct: 0,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "city", cities: ["Delhi", "Hyderabad"] },
    modifiedAt: "2026-04-19T09:00:00Z",
  },

  // ── Expired ───────────────────────────────────────────────────────────────
  {
    id: "TAR-010",
    name: "Festive Season 2025",
    description: "Special discounted rate during Diwali and Dussehra 2025.",
    type: "hybrid",
    status: "expired",
    effectiveFrom: "2025-10-01",
    expiresAt: "2025-11-15",
    stationsApplied: 35,
    activeDrivers: 0,
    pricing: {
      energyRatePerKwh: 16,
      touBands: [
        { label: "peak", startHour: 18, endHour: 23, ratePerKwh: 18 },
        { label: "off-peak", startHour: 0, endHour: 18, ratePerKwh: 12 },
        { label: "super-off-peak", startHour: 23, endHour: 24, ratePerKwh: 8 },
      ],
      idleThresholdMinutes: 20,
      idleFeePerMin: 2,
      connectionFee: 0,
      memberDiscountPct: 12,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "all" },
    modifiedAt: "2025-11-15T23:59:00Z",
  },
  {
    id: "TAR-011",
    name: "Beta Per-Minute Trial",
    description: "Pilot per-minute billing model trialed at Bengaluru pilot stations.",
    type: "per-min",
    status: "expired",
    effectiveFrom: "2025-07-01",
    expiresAt: "2025-09-30",
    stationsApplied: 6,
    activeDrivers: 0,
    pricing: {
      energyRatePerKwh: 0,
      touBands: [],
      timeRatePerMin: 3.5,
      idleThresholdMinutes: 10,
      idleFeePerMin: 3,
      connectionFee: 0,
      memberDiscountPct: 0,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "city", cities: ["Bengaluru"] },
    modifiedAt: "2025-09-30T23:59:00Z",
  },
  {
    id: "TAR-012",
    name: "Launch Promo Jan 2025",
    description: "Introductory flat-rate tariff for the network launch in January 2025.",
    type: "per-kwh",
    status: "expired",
    effectiveFrom: "2025-01-01",
    expiresAt: "2025-03-31",
    stationsApplied: 18,
    activeDrivers: 0,
    pricing: {
      energyRatePerKwh: 10,
      touBands: [],
      idleThresholdMinutes: 30,
      idleFeePerMin: 1,
      connectionFee: 0,
      memberDiscountPct: 0,
      connectorOverride: { enabled: false },
    },
    apply: { scope: "all" },
    modifiedAt: "2025-03-31T23:59:00Z",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format a number as Indian currency string: ₹1,23,456 */
export function formatInr(amount: number): string {
  if (amount === 0) return "₹0";
  const s = Math.round(amount).toString();
  if (s.length <= 3) return `₹${s}`;
  // Indian grouping: last 3 digits, then groups of 2
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `₹${grouped},${last3}`;
}

/** Simulate a 30-min, 25 kWh session cost for the preview card */
export function previewSession(tariff: Tariff): {
  energyCost: number;
  timeCost: number;
  idleCost: number;
  connectionFee: number;
  discount: number;
  total: number;
  lines: { label: string; amount: number }[];
} {
  const SESSION_KWH = 25;
  const SESSION_MIN = 30;
  const p = tariff.pricing;

  // Energy cost: use peak band rate if TOU is active, else base rate
  let rateKwh = p.energyRatePerKwh;
  if (p.touBands.length > 0) {
    // Assume session falls in peak band for pessimistic preview
    const peakBand = p.touBands.find((b) => b.label === "peak");
    if (peakBand) rateKwh = peakBand.ratePerKwh;
  }
  const energyCost = tariff.type === "per-min" ? 0 : rateKwh * SESSION_KWH;

  // Time cost
  const timeCost =
    tariff.type === "per-min" || tariff.type === "hybrid"
      ? (p.timeRatePerMin ?? 0) * SESSION_MIN
      : 0;

  // Idle fee: assume 0 idle minutes for a clean session
  const idleCost = 0;

  // Connection fee
  const connectionFee = p.connectionFee ?? 0;

  // Subtotal before discount
  const subtotal = energyCost + timeCost + idleCost + connectionFee;

  // Member discount
  const discountPct = p.memberDiscountPct ?? 0;
  const discount = (subtotal * discountPct) / 100;

  const total = subtotal - discount;

  const lines: { label: string; amount: number }[] = [];
  if (energyCost > 0) lines.push({ label: `Energy (${SESSION_KWH} kWh x ₹${rateKwh})`, amount: energyCost });
  if (timeCost > 0) lines.push({ label: `Time (${SESSION_MIN} min x ₹${p.timeRatePerMin}/min)`, amount: timeCost });
  if (connectionFee > 0) lines.push({ label: "Connection fee", amount: connectionFee });
  if (discount > 0) lines.push({ label: `Member discount (${discountPct}%)`, amount: -discount });

  return { energyCost, timeCost, idleCost, connectionFee, discount, total, lines };
}
