/**
 * Sessions mock data for GridCharge Console.
 * ~80 sessions spanning last 14 days across GPWR-Blr-01/02, GPWR-Mum-01/02,
 * GPWR-Del-01/02/03 stations. GC-04XXX session IDs, Indian driver names, ₹ amounts.
 * Status mix: 70% completed, 15% in-progress, 10% cancelled, 5% errored.
 * Connector mix: DC-CCS2 60%, AC-Type2 30%, DC-CHAdeMO 5%, AC-GBT 5%.
 */

export type SessionStatus = "in-progress" | "completed" | "cancelled" | "errored";
export type PaymentStatus = "paid" | "pending" | "refunded";
export type ConnectorType = "DC-CCS2" | "DC-CHAdeMO" | "AC-Type2" | "AC-GBT";

export interface PowerDataPoint {
  /** Elapsed minutes since session start */
  t: number;
  /** Power in kW */
  kw: number;
}

export interface Session {
  id: string;
  stationId: string;
  stationName: string;
  port: number;
  connectorType: ConnectorType;
  driverName: string;
  driverPhone: string;
  driverRfid?: string;
  authMethod: "RFID" | "App";
  status: SessionStatus;
  paymentStatus: PaymentStatus;
  /** ISO timestamp plug-in */
  plugInAt: string;
  /** ISO timestamp auth */
  authAt: string;
  /** ISO timestamp charging start */
  chargingStartAt: string;
  /** ISO timestamp charging stop (null if in-progress) */
  chargingStopAt: string | null;
  /** ISO timestamp plug-out (null if in-progress/cancelled partway) */
  plugOutAt: string | null;
  /** Total duration in minutes */
  durationMinutes: number;
  /** Energy delivered kWh */
  energyKwh: number;
  /** Peak power kW */
  peakKw: number;
  /** Average power kW */
  avgKw: number;
  /** Idle time minutes (EV connected but not charging) */
  idleMinutes: number;
  /** Tariff name */
  tariff: string;
  /** Energy cost ₹ */
  energyCost: number;
  /** Idle fee ₹ */
  idleFee: number;
  /** GST 18% ₹ */
  tax: number;
  /** Total charged ₹ */
  total: number;
  /** Payment method */
  paymentMethod: "UPI" | "Razorpay" | "Wallet";
  /** Transaction reference */
  transactionId: string;
  /** Payout status to station operator */
  payoutStatus: "settled" | "pending" | "disputed";
  /** 30-point power profile */
  powerProfile: PowerDataPoint[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysAgo(days: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function addMinutes(iso: string, mins: number): string {
  return new Date(new Date(iso).getTime() + mins * 60_000).toISOString();
}

/** Generate a realistic kW power profile for a DC fast-charge session */
function dcProfile(peakKw: number, durationMins: number): PowerDataPoint[] {
  const pts: PowerDataPoint[] = [];
  const steps = 30;
  for (let i = 0; i < steps; i++) {
    const t = Math.round((i / (steps - 1)) * durationMins);
    const pct = i / (steps - 1);
    let kw: number;
    if (pct < 0.05) {
      // Ramp-up
      kw = peakKw * (pct / 0.05);
    } else if (pct < 0.5) {
      // Steady at peak with small noise
      kw = peakKw * (0.95 + Math.random() * 0.05);
    } else {
      // Tapering (CPCV transition)
      const taper = 1 - ((pct - 0.5) / 0.5) * 0.85;
      kw = peakKw * taper;
    }
    pts.push({ t, kw: Math.round(kw * 10) / 10 });
  }
  return pts;
}

/** Generate a realistic kW power profile for an AC session */
function acProfile(peakKw: number, durationMins: number): PowerDataPoint[] {
  const pts: PowerDataPoint[] = [];
  const steps = 30;
  for (let i = 0; i < steps; i++) {
    const t = Math.round((i / (steps - 1)) * durationMins);
    const pct = i / (steps - 1);
    let kw: number;
    if (pct < 0.08) {
      kw = peakKw * (pct / 0.08);
    } else if (pct < 0.75) {
      kw = peakKw * (0.97 + Math.random() * 0.03);
    } else {
      // Gentle taper near full SoC
      kw = peakKw * (1 - ((pct - 0.75) / 0.25) * 0.35);
    }
    pts.push({ t, kw: Math.round(kw * 10) / 10 });
  }
  return pts;
}

function rzpRef(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    "pay_" +
    Array.from({ length: 14 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  );
}

function upiRef(): string {
  const ts = Date.now().toString().slice(-10);
  return `UPI${ts}`;
}

function makeSession(
  seq: number,
  opts: {
    stationId: string;
    stationName: string;
    port: number;
    connectorType: ConnectorType;
    driverName: string;
    driverPhone: string;
    authMethod: "RFID" | "App";
    status: SessionStatus;
    paymentStatus: PaymentStatus;
    daysBack: number;
    startHour: number;
    startMinute?: number;
    durationMinutes: number;
    energyKwh: number;
    peakKw: number;
    idleMinutes?: number;
    tariff: string;
    ratePerKwh: number;
    paymentMethod: "UPI" | "Razorpay" | "Wallet";
    payoutStatus: "settled" | "pending" | "disputed";
  }
): Session {
  const plugIn = daysAgo(opts.daysBack, opts.startHour, opts.startMinute ?? 0);
  const auth = addMinutes(plugIn, 1);
  const chargingStart = addMinutes(plugIn, 2);
  const chargingStop =
    opts.status === "in-progress"
      ? null
      : addMinutes(chargingStart, opts.durationMinutes);
  const plugOut =
    opts.status === "in-progress" || opts.status === "cancelled"
      ? null
      : addMinutes(chargingStop!, opts.idleMinutes ?? 3);

  const energyCost = Math.round(opts.energyKwh * opts.ratePerKwh);
  const idleFee =
    (opts.idleMinutes ?? 0) > 10
      ? Math.round((opts.idleMinutes! - 10) * 2)
      : 0;
  const tax = Math.round((energyCost + idleFee) * 0.18);
  const total = energyCost + idleFee + tax;
  const avgKw = opts.durationMinutes > 0 ? opts.energyKwh / (opts.durationMinutes / 60) : 0;

  const isAc = opts.connectorType.startsWith("AC");
  const profile = isAc
    ? acProfile(opts.peakKw, opts.durationMinutes)
    : dcProfile(opts.peakKw, opts.durationMinutes);

  const txId =
    opts.paymentMethod === "UPI" ? upiRef() : rzpRef();

  return {
    id: `GC-04${String(seq).padStart(3, "0")}`,
    stationId: opts.stationId,
    stationName: opts.stationName,
    port: opts.port,
    connectorType: opts.connectorType,
    driverName: opts.driverName,
    driverPhone: opts.driverPhone,
    driverRfid:
      opts.authMethod === "RFID"
        ? `RFID-${opts.driverPhone.slice(-4)}-GP`
        : undefined,
    authMethod: opts.authMethod,
    status: opts.status,
    paymentStatus: opts.paymentStatus,
    plugInAt: plugIn,
    authAt: auth,
    chargingStartAt: chargingStart,
    chargingStopAt: chargingStop,
    plugOutAt: plugOut,
    durationMinutes: opts.durationMinutes,
    energyKwh: opts.energyKwh,
    peakKw: opts.peakKw,
    avgKw: Math.round(avgKw * 10) / 10,
    idleMinutes: opts.idleMinutes ?? 3,
    tariff: opts.tariff,
    energyCost,
    idleFee,
    tax,
    total,
    paymentMethod: opts.paymentMethod,
    transactionId: txId,
    payoutStatus: opts.payoutStatus,
    powerProfile: profile,
  };
}

// ─── Session definitions ──────────────────────────────────────────────────────

export const ALL_SESSIONS: Session[] = [
  // ── GPWR-Blr-01 (Koramangala Hub) ────────────────────────────────────────
  makeSession(1, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Vikram Rao", driverPhone: "+91 98400 11201",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 8, startMinute: 12,
    durationMinutes: 38, energyKwh: 22.4, peakKw: 60, idleMinutes: 6,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(2, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Deepa Iyer", driverPhone: "+91 98400 22302",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 10, startMinute: 5,
    durationMinutes: 52, energyKwh: 30.5, peakKw: 60, idleMinutes: 8,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(3, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 3,
    connectorType: "AC-Type2", driverName: "Naresh Babu", driverPhone: "+91 98400 33403",
    authMethod: "RFID", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 13, startMinute: 22,
    durationMinutes: 70, energyKwh: 9.2, peakKw: 22, idleMinutes: 0,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "pending",
  }),
  makeSession(4, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Arjun Menon", driverPhone: "+91 98400 44504",
    authMethod: "App", status: "cancelled", paymentStatus: "refunded",
    daysBack: 1, startHour: 7, startMinute: 45,
    durationMinutes: 5, energyKwh: 0.8, peakKw: 40, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(5, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Pooja Krishnan", driverPhone: "+91 98400 55605",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 9, startMinute: 33,
    durationMinutes: 44, energyKwh: 25.8, peakKw: 60, idleMinutes: 12,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(6, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 4,
    connectorType: "AC-Type2", driverName: "Sanjay Hegde", driverPhone: "+91 98400 66706",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 14, startMinute: 10,
    durationMinutes: 120, energyKwh: 15.6, peakKw: 22, idleMinutes: 5,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(7, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Preethi Nair", driverPhone: "+91 98400 77807",
    authMethod: "RFID", status: "errored", paymentStatus: "refunded",
    daysBack: 2, startHour: 11, startMinute: 18,
    durationMinutes: 8, energyKwh: 2.1, peakKw: 30, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "disputed",
  }),
  makeSession(8, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Rahul Sharma", driverPhone: "+91 98400 88908",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 2, startHour: 15, startMinute: 40,
    durationMinutes: 35, energyKwh: 20.5, peakKw: 60, idleMinutes: 7,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),

  // ── GPWR-Blr-02 (Whitefield Station) ─────────────────────────────────────
  makeSession(9, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 1,
    connectorType: "DC-CCS2", driverName: "Arun Krishnan", driverPhone: "+91 98401 11209",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 9, startMinute: 15,
    durationMinutes: 29, energyKwh: 17.3, peakKw: 60, idleMinutes: 4,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(10, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 3,
    connectorType: "DC-CCS2", driverName: "Bhavana Reddy", driverPhone: "+91 98401 22310",
    authMethod: "RFID", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 11, startMinute: 50,
    durationMinutes: 55, energyKwh: 23.6, peakKw: 60, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(11, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 5,
    connectorType: "AC-Type2", driverName: "Chetan Mishra", driverPhone: "+91 98401 33411",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 16, startMinute: 0,
    durationMinutes: 110, energyKwh: 12.8, peakKw: 22, idleMinutes: 9,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "pending",
  }),
  makeSession(12, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 1,
    connectorType: "DC-CCS2", driverName: "Divya Anand", driverPhone: "+91 98401 44512",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 8, startMinute: 30,
    durationMinutes: 41, energyKwh: 24.2, peakKw: 60, idleMinutes: 6,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(13, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 3,
    connectorType: "DC-CCS2", driverName: "Elan Chezhian", driverPhone: "+91 98401 55613",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 12, startMinute: 18,
    durationMinutes: 33, energyKwh: 19.8, peakKw: 60, idleMinutes: 5,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(14, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 5,
    connectorType: "AC-Type2", driverName: "Fatima Shaikh", driverPhone: "+91 98401 66714",
    authMethod: "RFID", status: "cancelled", paymentStatus: "refunded",
    daysBack: 2, startHour: 10, startMinute: 5,
    durationMinutes: 3, energyKwh: 0.4, peakKw: 10, idleMinutes: 0,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(15, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 4,
    connectorType: "DC-CHAdeMO", driverName: "Ganesh Pillai", driverPhone: "+91 98401 77815",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 3, startHour: 17, startMinute: 22,
    durationMinutes: 28, energyKwh: 15.9, peakKw: 50, idleMinutes: 8,
    tariff: "DC-CHAdeMO Standard", ratePerKwh: 17, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),

  // ── GPWR-Mum-01 (BKC Charging Hub) ───────────────────────────────────────
  makeSession(16, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Rohit Shah", driverPhone: "+91 98402 11216",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 7, startMinute: 48,
    durationMinutes: 48, energyKwh: 28.9, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(17, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Sonal Mehta", driverPhone: "+91 98402 22317",
    authMethod: "RFID", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 10, startMinute: 30,
    durationMinutes: 60, energyKwh: 25.1, peakKw: 60, idleMinutes: 0,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(18, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 4,
    connectorType: "DC-CCS2", driverName: "Tarun Joshi", driverPhone: "+91 98402 33418",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 14, startMinute: 15,
    durationMinutes: 36, energyKwh: 21.3, peakKw: 60, idleMinutes: 7,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(19, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 6,
    connectorType: "AC-Type2", driverName: "Uma Pillai", driverPhone: "+91 98402 44519",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 16, startMinute: 55,
    durationMinutes: 135, energyKwh: 14.8, peakKw: 22, idleMinutes: 10,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "pending",
  }),
  makeSession(20, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Vijay Kulkarni", driverPhone: "+91 98402 55620",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 9, startMinute: 0,
    durationMinutes: 42, energyKwh: 24.7, peakKw: 60, idleMinutes: 8,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(21, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Warda Khan", driverPhone: "+91 98402 66721",
    authMethod: "RFID", status: "errored", paymentStatus: "refunded",
    daysBack: 1, startHour: 11, startMinute: 42,
    durationMinutes: 6, energyKwh: 1.5, peakKw: 25, idleMinutes: 0,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "Razorpay", payoutStatus: "disputed",
  }),
  makeSession(22, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 3,
    connectorType: "DC-CCS2", driverName: "Xavier D'Souza", driverPhone: "+91 98402 77822",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 2, startHour: 8, startMinute: 25,
    durationMinutes: 55, energyKwh: 32.1, peakKw: 60, idleMinutes: 6,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(23, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 5,
    connectorType: "AC-GBT", driverName: "Yash Agrawal", driverPhone: "+91 98402 88923",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 2, startHour: 12, startMinute: 10,
    durationMinutes: 90, energyKwh: 10.8, peakKw: 22, idleMinutes: 15,
    tariff: "AC-GBT Standard", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(24, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Zara Hussain", driverPhone: "+91 98402 99024",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 3, startHour: 19, startMinute: 30,
    durationMinutes: 40, energyKwh: 23.5, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),

  // ── GPWR-Mum-02 (Andheri West) ────────────────────────────────────────────
  makeSession(25, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 1,
    connectorType: "DC-CCS2", driverName: "Anita Desai", driverPhone: "+91 98403 11225",
    authMethod: "RFID", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 12, startMinute: 5,
    durationMinutes: 45, energyKwh: 18.2, peakKw: 60, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(26, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 3,
    connectorType: "AC-Type2", driverName: "Balaji Subramanian", driverPhone: "+91 98403 22326",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 14, startMinute: 40,
    durationMinutes: 100, energyKwh: 11.5, peakKw: 22, idleMinutes: 8,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(27, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 1,
    connectorType: "DC-CCS2", driverName: "Chandra Bose", driverPhone: "+91 98403 33427",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 7, startMinute: 15,
    durationMinutes: 38, energyKwh: 21.8, peakKw: 60, idleMinutes: 5,
    tariff: "Peak DC-CCS2", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(28, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 3,
    connectorType: "AC-Type2", driverName: "Devika Menon", driverPhone: "+91 98403 44528",
    authMethod: "App", status: "cancelled", paymentStatus: "refunded",
    daysBack: 1, startHour: 15, startMinute: 30,
    durationMinutes: 4, energyKwh: 0.6, peakKw: 12, idleMinutes: 0,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "pending",
  }),
  makeSession(29, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 2,
    connectorType: "DC-CCS2", driverName: "Elias Thomas", driverPhone: "+91 98403 55629",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 2, startHour: 10, startMinute: 48,
    durationMinutes: 31, energyKwh: 18.4, peakKw: 60, idleMinutes: 4,
    tariff: "Peak DC-CCS2", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(30, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 4,
    connectorType: "AC-Type2", driverName: "Farida Qureshi", driverPhone: "+91 98403 66730",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 3, startHour: 9, startMinute: 20,
    durationMinutes: 115, energyKwh: 13.9, peakKw: 22, idleMinutes: 7,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "UPI", payoutStatus: "settled",
  }),

  // ── GPWR-Del-01 (Connaught Place) ─────────────────────────────────────────
  makeSession(31, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 1,
    connectorType: "DC-CCS2", driverName: "Naveen Gupta", driverPhone: "+91 98404 11231",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 8, startMinute: 0,
    durationMinutes: 50, energyKwh: 30.2, peakKw: 60, idleMinutes: 6,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(32, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 2,
    connectorType: "DC-CCS2", driverName: "Omkar Singh", driverPhone: "+91 98404 22332",
    authMethod: "RFID", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 11, startMinute: 15,
    durationMinutes: 65, energyKwh: 29.3, peakKw: 60, idleMinutes: 0,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(33, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 4,
    connectorType: "DC-CCS2", driverName: "Pooja Verma", driverPhone: "+91 98404 33433",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 15, startMinute: 42,
    durationMinutes: 37, energyKwh: 22.1, peakKw: 60, idleMinutes: 9,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(34, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 5,
    connectorType: "AC-Type2", driverName: "Qadir Ansari", driverPhone: "+91 98404 44534",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 9, startMinute: 30,
    durationMinutes: 130, energyKwh: 16.8, peakKw: 22, idleMinutes: 5,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(35, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 1,
    connectorType: "DC-CCS2", driverName: "Riya Kapoor", driverPhone: "+91 98404 55635",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 13, startMinute: 10,
    durationMinutes: 43, energyKwh: 25.7, peakKw: 60, idleMinutes: 7,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(36, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 3,
    connectorType: "DC-CCS2", driverName: "Suresh Tiwari", driverPhone: "+91 98404 66736",
    authMethod: "RFID", status: "errored", paymentStatus: "refunded",
    daysBack: 2, startHour: 10, startMinute: 55,
    durationMinutes: 9, energyKwh: 2.3, peakKw: 35, idleMinutes: 0,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "disputed",
  }),
  makeSession(37, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 2,
    connectorType: "DC-CCS2", driverName: "Tanvi Bhatt", driverPhone: "+91 98404 77837",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 2, startHour: 14, startMinute: 20,
    durationMinutes: 46, energyKwh: 27.3, peakKw: 60, idleMinutes: 6,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(38, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 5,
    connectorType: "AC-Type2", driverName: "Umesh Pandey", driverPhone: "+91 98404 88938",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 3, startHour: 11, startMinute: 0,
    durationMinutes: 125, energyKwh: 15.4, peakKw: 22, idleMinutes: 8,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "UPI", payoutStatus: "settled",
  }),

  // ── GPWR-Del-02 (Saket District) ──────────────────────────────────────────
  makeSession(39, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 1,
    connectorType: "DC-CCS2", driverName: "Varun Malhotra", driverPhone: "+91 98405 11239",
    authMethod: "App", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 13, startMinute: 35,
    durationMinutes: 40, energyKwh: 17.2, peakKw: 60, idleMinutes: 0,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(40, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 2,
    connectorType: "DC-CCS2", driverName: "Smita Rawat", driverPhone: "+91 98405 22340",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 9, startMinute: 10,
    durationMinutes: 53, energyKwh: 31.5, peakKw: 60, idleMinutes: 7,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(41, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 3,
    connectorType: "AC-Type2", driverName: "Tariq Siddiqui", driverPhone: "+91 98405 33441",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 10, startMinute: 22,
    durationMinutes: 105, energyKwh: 13.2, peakKw: 22, idleMinutes: 6,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(42, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 5,
    connectorType: "AC-Type2", driverName: "Uma Sharma", driverPhone: "+91 98405 44542",
    authMethod: "RFID", status: "cancelled", paymentStatus: "refunded",
    daysBack: 2, startHour: 8, startMinute: 45,
    durationMinutes: 2, energyKwh: 0.3, peakKw: 8, idleMinutes: 0,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(43, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 1,
    connectorType: "DC-CCS2", driverName: "Vishal Luthra", driverPhone: "+91 98405 55643",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 3, startHour: 16, startMinute: 5,
    durationMinutes: 39, energyKwh: 23.1, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(44, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 2,
    connectorType: "DC-CCS2", driverName: "Wini Rastogi", driverPhone: "+91 98405 66744",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 4, startHour: 11, startMinute: 30,
    durationMinutes: 44, energyKwh: 26.5, peakKw: 60, idleMinutes: 9,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "settled",
  }),

  // ── GPWR-Del-03 (Sector 62 Noida) ─────────────────────────────────────────
  makeSession(45, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 1,
    connectorType: "DC-CCS2", driverName: "Vivek Srivastava", driverPhone: "+91 98406 11245",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 0, startHour: 7, startMinute: 55,
    durationMinutes: 32, energyKwh: 19.1, peakKw: 60, idleMinutes: 4,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(46, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 3,
    connectorType: "DC-CCS2", driverName: "Abhinav Kapoor", driverPhone: "+91 98406 22346",
    authMethod: "App", status: "in-progress", paymentStatus: "pending",
    daysBack: 0, startHour: 10, startMinute: 45,
    durationMinutes: 50, energyKwh: 21.8, peakKw: 60, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(47, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 5,
    connectorType: "AC-Type2", driverName: "Bhumi Pednekar", driverPhone: "+91 98406 33447",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 9, startMinute: 18,
    durationMinutes: 118, energyKwh: 14.6, peakKw: 22, idleMinutes: 6,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(48, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 1,
    connectorType: "DC-CCS2", driverName: "Chirag Paswan", driverPhone: "+91 98406 44548",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 1, startHour: 14, startMinute: 0,
    durationMinutes: 41, energyKwh: 24.4, peakKw: 60, idleMinutes: 7,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(49, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 3,
    connectorType: "DC-CCS2", driverName: "Dolly Bindra", driverPhone: "+91 98406 55649",
    authMethod: "RFID", status: "errored", paymentStatus: "refunded",
    daysBack: 2, startHour: 12, startMinute: 22,
    durationMinutes: 7, energyKwh: 1.9, peakKw: 28, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "disputed",
  }),
  makeSession(50, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 5,
    connectorType: "AC-Type2", driverName: "Ekta Singh", driverPhone: "+91 98406 66750",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 3, startHour: 8, startMinute: 38,
    durationMinutes: 110, energyKwh: 13.5, peakKw: 22, idleMinutes: 8,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),

  // ── Older sessions (4-14 days back, filling to ~80) ──────────────────────
  makeSession(51, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Farhan Akhtar", driverPhone: "+91 98407 11251",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 4, startHour: 9, startMinute: 15,
    durationMinutes: 40, energyKwh: 23.6, peakKw: 60, idleMinutes: 5,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(52, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 1,
    connectorType: "DC-CCS2", driverName: "Geeta Kapoor", driverPhone: "+91 98407 22352",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 4, startHour: 11, startMinute: 0,
    durationMinutes: 35, energyKwh: 20.8, peakKw: 60, idleMinutes: 6,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(53, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 4,
    connectorType: "DC-CCS2", driverName: "Hema Malini", driverPhone: "+91 98407 33453",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 5, startHour: 8, startMinute: 40,
    durationMinutes: 45, energyKwh: 26.9, peakKw: 60, idleMinutes: 7,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(54, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 1,
    connectorType: "DC-CCS2", driverName: "Ishan Kishan", driverPhone: "+91 98407 44554",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 5, startHour: 14, startMinute: 20,
    durationMinutes: 38, energyKwh: 22.6, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(55, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 4,
    connectorType: "AC-Type2", driverName: "Jaya Bachchan", driverPhone: "+91 98407 55655",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 5, startHour: 16, startMinute: 30,
    durationMinutes: 120, energyKwh: 14.4, peakKw: 22, idleMinutes: 9,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(56, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 2,
    connectorType: "DC-CCS2", driverName: "Kartik Aaryan", driverPhone: "+91 98407 66756",
    authMethod: "RFID", status: "cancelled", paymentStatus: "refunded",
    daysBack: 6, startHour: 9, startMinute: 5,
    durationMinutes: 3, energyKwh: 0.5, peakKw: 15, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(57, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 1,
    connectorType: "DC-CCS2", driverName: "Lara Dutta", driverPhone: "+91 98407 77857",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 6, startHour: 10, startMinute: 15,
    durationMinutes: 42, energyKwh: 25.1, peakKw: 60, idleMinutes: 6,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(58, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 3,
    connectorType: "DC-CCS2", driverName: "Manish Malhotra", driverPhone: "+91 98407 88958",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 6, startHour: 13, startMinute: 40,
    durationMinutes: 36, energyKwh: 21.4, peakKw: 60, idleMinutes: 4,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(59, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 5,
    connectorType: "AC-Type2", driverName: "Nita Ambani", driverPhone: "+91 98408 11259",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 7, startHour: 8, startMinute: 20,
    durationMinutes: 130, energyKwh: 15.8, peakKw: 22, idleMinutes: 10,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(60, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 2,
    connectorType: "DC-CCS2", driverName: "Onir Chatterjee", driverPhone: "+91 98408 22360",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 7, startHour: 12, startMinute: 0,
    durationMinutes: 48, energyKwh: 28.7, peakKw: 60, idleMinutes: 8,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(61, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 4,
    connectorType: "DC-CCS2", driverName: "Prakash Raj", driverPhone: "+91 98408 33461",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 7, startHour: 15, startMinute: 50,
    durationMinutes: 39, energyKwh: 23.2, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(62, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Qamar Jahan", driverPhone: "+91 98408 44562",
    authMethod: "RFID", status: "errored", paymentStatus: "refunded",
    daysBack: 8, startHour: 10, startMinute: 30,
    durationMinutes: 10, energyKwh: 2.8, peakKw: 32, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "disputed",
  }),
  makeSession(63, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 1,
    connectorType: "DC-CCS2", driverName: "Rana Daggubati", driverPhone: "+91 98408 55663",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 8, startHour: 9, startMinute: 5,
    durationMinutes: 34, energyKwh: 20.1, peakKw: 60, idleMinutes: 6,
    tariff: "Peak DC-CCS2", ratePerKwh: 19, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(64, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 3,
    connectorType: "AC-Type2", driverName: "Sonakshi Sinha", driverPhone: "+91 98408 66764",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 8, startHour: 14, startMinute: 25,
    durationMinutes: 108, energyKwh: 13.0, peakKw: 22, idleMinutes: 7,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(65, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 1,
    connectorType: "DC-CCS2", driverName: "Taapsee Pannu", driverPhone: "+91 98408 77865",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 9, startHour: 8, startMinute: 48,
    durationMinutes: 43, energyKwh: 25.5, peakKw: 60, idleMinutes: 5,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(66, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 3,
    connectorType: "DC-CCS2", driverName: "Urmila Matondkar", driverPhone: "+91 98408 88966",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 9, startHour: 11, startMinute: 15,
    durationMinutes: 37, energyKwh: 22.0, peakKw: 60, idleMinutes: 6,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(67, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 6,
    connectorType: "AC-Type2", driverName: "Vidya Balan", driverPhone: "+91 98409 11267",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 9, startHour: 15, startMinute: 10,
    durationMinutes: 140, energyKwh: 16.8, peakKw: 22, idleMinutes: 11,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(68, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 2,
    connectorType: "DC-CCS2", driverName: "Wamiqa Gabbi", driverPhone: "+91 98409 22368",
    authMethod: "RFID", status: "cancelled", paymentStatus: "refunded",
    daysBack: 10, startHour: 7, startMinute: 30,
    durationMinutes: 4, energyKwh: 0.7, peakKw: 18, idleMinutes: 0,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "pending",
  }),
  makeSession(69, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 3,
    connectorType: "AC-Type2", driverName: "Xena Dhawan", driverPhone: "+91 98409 33469",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 10, startHour: 10, startMinute: 40,
    durationMinutes: 115, energyKwh: 13.8, peakKw: 22, idleMinutes: 7,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(70, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 3,
    connectorType: "AC-Type2", driverName: "Yami Gautam", driverPhone: "+91 98409 44570",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 10, startHour: 13, startMinute: 55,
    durationMinutes: 102, energyKwh: 12.2, peakKw: 22, idleMinutes: 6,
    tariff: "Standard AC", ratePerKwh: 15, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(71, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 2,
    connectorType: "DC-CCS2", driverName: "Zaheer Khan", driverPhone: "+91 98409 55671",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 11, startHour: 9, startMinute: 25,
    durationMinutes: 41, energyKwh: 24.6, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(72, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 5,
    connectorType: "AC-Type2", driverName: "Alia Bhatt", driverPhone: "+91 98409 66772",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 11, startHour: 12, startMinute: 30,
    durationMinutes: 125, energyKwh: 15.0, peakKw: 22, idleMinutes: 8,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(73, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 4,
    connectorType: "DC-CHAdeMO", driverName: "Baichung Bhutia", driverPhone: "+91 98409 77873",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 11, startHour: 16, startMinute: 10,
    durationMinutes: 27, energyKwh: 15.3, peakKw: 50, idleMinutes: 6,
    tariff: "DC-CHAdeMO Standard", ratePerKwh: 17, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(74, {
    stationId: "GPWR-Mum-01", stationName: "BKC Charging Hub", port: 1,
    connectorType: "DC-CCS2", driverName: "Cheteshwar Pujara", driverPhone: "+91 98409 88974",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 12, startHour: 8, startMinute: 5,
    durationMinutes: 47, energyKwh: 28.1, peakKw: 60, idleMinutes: 6,
    tariff: "Express DC", ratePerKwh: 20, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(75, {
    stationId: "GPWR-Del-01", stationName: "Connaught Place", port: 3,
    connectorType: "DC-CCS2", driverName: "Dhoni MS", driverPhone: "+91 98409 99075",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 12, startHour: 11, startMinute: 45,
    durationMinutes: 36, energyKwh: 21.5, peakKw: 60, idleMinutes: 5,
    tariff: "Express DC", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(76, {
    stationId: "GPWR-Blr-01", stationName: "Koramangala Hub", port: 4,
    connectorType: "AC-Type2", driverName: "Esha Gupta", driverPhone: "+91 98410 11276",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 12, startHour: 14, startMinute: 20,
    durationMinutes: 108, energyKwh: 13.2, peakKw: 22, idleMinutes: 9,
    tariff: "Standard AC", ratePerKwh: 14, paymentMethod: "Wallet", payoutStatus: "settled",
  }),
  makeSession(77, {
    stationId: "GPWR-Del-02", stationName: "Saket District", port: 5,
    connectorType: "AC-GBT", driverName: "Fan Wei", driverPhone: "+91 98410 22377",
    authMethod: "App", status: "completed", paymentStatus: "paid",
    daysBack: 13, startHour: 9, startMinute: 35,
    durationMinutes: 95, energyKwh: 11.4, peakKw: 22, idleMinutes: 14,
    tariff: "AC-GBT Standard", ratePerKwh: 14, paymentMethod: "UPI", payoutStatus: "settled",
  }),
  makeSession(78, {
    stationId: "GPWR-Mum-02", stationName: "Andheri West", port: 1,
    connectorType: "DC-CCS2", driverName: "Govinda Singh", driverPhone: "+91 98410 33478",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 13, startHour: 12, startMinute: 15,
    durationMinutes: 33, energyKwh: 19.6, peakKw: 60, idleMinutes: 5,
    tariff: "Peak DC-CCS2", ratePerKwh: 19, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
  makeSession(79, {
    stationId: "GPWR-Del-03", stationName: "Sector 62 Noida", port: 2,
    connectorType: "DC-CCS2", driverName: "Harsha Bhogle", driverPhone: "+91 98410 44579",
    authMethod: "App", status: "cancelled", paymentStatus: "refunded",
    daysBack: 13, startHour: 15, startMinute: 55,
    durationMinutes: 2, energyKwh: 0.3, peakKw: 10, idleMinutes: 0,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "UPI", payoutStatus: "pending",
  }),
  makeSession(80, {
    stationId: "GPWR-Blr-02", stationName: "Whitefield Station", port: 1,
    connectorType: "DC-CCS2", driverName: "Indrani Mukherjee", driverPhone: "+91 98410 55680",
    authMethod: "RFID", status: "completed", paymentStatus: "paid",
    daysBack: 14, startHour: 10, startMinute: 0,
    durationMinutes: 44, energyKwh: 26.2, peakKw: 60, idleMinutes: 7,
    tariff: "Peak DC-CCS2", ratePerKwh: 18, paymentMethod: "Razorpay", payoutStatus: "settled",
  }),
];

/** Lookup a session by ID. */
export function getSession(id: string): Session | undefined {
  return ALL_SESSIONS.find((s) => s.id === id);
}

/** Format a duration in minutes as "Xh Ym" */
export function formatDuration(mins: number): string {
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

/** Format an ISO timestamp to short date-time string */
export function formatTs(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/** Format a time only from ISO */
export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
