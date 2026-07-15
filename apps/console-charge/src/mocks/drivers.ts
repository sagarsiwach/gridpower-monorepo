/**
 * Driver mock data — used by CON.5 (Drivers).
 * ~60 records covering Indian drivers with realistic data distributions.
 *
 * PII NOTICE: phone and email are visible to all roles in this mock.
 * Real implementation must gate PII visibility by role (support/admin only).
 */

export type DriverStatus = "active" | "blocked" | "disputed";
export type AccountType = "rfid_only" | "app_only" | "both";
export type CardStatus = "active" | "inactive" | "stolen";
export type NoteFlag = "vip" | "fraud_watch" | "none";

export interface RfidCard {
  uid: string;
  label: string;
  activatedAt: string;
  lastUsed: string;
  status: CardStatus;
}

export interface PaymentMethod {
  type: "card" | "upi" | "wallet";
  /** Last 4 digits for card, handle for UPI, "GridCharge Wallet" for wallet */
  display: string;
  /** Card network or UPI provider */
  provider?: string;
  /** Expiry for card */
  expiry?: string;
  isDefault: boolean;
}

export interface ActivityEvent {
  at: string;
  label: string;
  detail?: string;
  kind: "session" | "topup" | "refund" | "card" | "account";
}

export interface SupportNote {
  id: string;
  author: string;
  createdAt: string;
  body: string;
  flag: NoteFlag;
}

export interface Driver {
  id: string;
  /** Full display name */
  name: string;
  phone: string;
  email: string;
  accountType: AccountType;
  status: DriverStatus;
  memberSince: string;
  /** ISO date */
  registeredAt: string;
  country: string;
  lifetimeSessions: number;
  lifetimeSpendRupees: number;
  lastSessionAt: string;
  /** null when no session data */
  lastSessionStation: string | null;
  cards: RfidCard[];
  paymentMethods: PaymentMethod[];
  recentActivity: ActivityEvent[];
  notes: SupportNote[];
  walletBalanceRupees: number;
  /** App user ID — only set when accountType includes app */
  appUserId?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isoDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function phone(digits: string) {
  return `+91 ${digits}`;
}

function makeCard(
  uid: string,
  label: string,
  activatedIso: string,
  lastUsedIso: string,
  status: CardStatus = "active",
): RfidCard {
  return { uid, label, activatedAt: fmtDate(activatedIso), lastUsed: fmtDate(lastUsedIso), status };
}

function makeNote(
  id: string,
  author: string,
  createdIso: string,
  body: string,
  flag: NoteFlag = "none",
): SupportNote {
  return { id, author, createdAt: fmtDate(createdIso), body, flag };
}

function visaCard(last4: string, expiry: string, isDefault = false): PaymentMethod {
  return { type: "card", display: `•••• •••• •••• ${last4}`, provider: "Visa", expiry, isDefault };
}

function upiHandle(handle: string, isDefault = false): PaymentMethod {
  return { type: "upi", display: handle, provider: "UPI", isDefault };
}

function walletEntry(balance: number): PaymentMethod {
  return {
    type: "wallet",
    display: `GridCharge Wallet — ₹${balance.toLocaleString("en-IN")}`,
    isDefault: false,
  };
}

function baseActivity(driverName: string, stationCity: string, nSessions: number): ActivityEvent[] {
  const events: ActivityEvent[] = [
    { at: "Today, 10:14", label: "Session completed", detail: `₹480 · 32.1 kWh · ${stationCity}`, kind: "session" },
    { at: "Yesterday, 18:42", label: "Session completed", detail: `₹220 · 14.8 kWh · ${stationCity}`, kind: "session" },
    { at: "3 days ago", label: "Session completed", detail: `₹610 · 41.0 kWh · ${stationCity}`, kind: "session" },
    { at: "Apr 18", label: "Wallet top-up", detail: "₹1,000 added via UPI", kind: "topup" },
    { at: "Apr 15", label: "Session completed", detail: `₹155 · 10.4 kWh · ${stationCity}`, kind: "session" },
    { at: "Apr 10", label: "Session completed", detail: `₹390 · 26.2 kWh · ${stationCity}`, kind: "session" },
    { at: "Apr 5", label: "Session completed", detail: `₹540 · 36.5 kWh · ${stationCity}`, kind: "session" },
    { at: "Mar 28", label: "Session completed", detail: `₹280 · 18.9 kWh · ${stationCity}`, kind: "session" },
    { at: "Mar 20", label: "Card activated", detail: "RFID card added to account", kind: "card" },
    { at: "Mar 10", label: "Account created", detail: `${driverName} registered`, kind: "account" },
  ];
  return events.slice(0, Math.min(nSessions + 2, 10));
}

// ─── Driver definitions ──────────────────────────────────────────────────────

export const ALL_DRIVERS: Driver[] = [
  // ── 1 — Rahul Sharma (both, active, VIP) ─────────────────────────────────
  {
    id: "DRV-001",
    name: "Rahul Sharma",
    phone: phone("98201 44321"),
    email: "rahul.sharma@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Feb 2024",
    registeredAt: isoDate(2024, 2, 14),
    country: "+91",
    lifetimeSessions: 142,
    lifetimeSpendRupees: 62480,
    lastSessionAt: "Today, 10:14",
    lastSessionStation: "Koramangala Hub",
    cards: [
      makeCard("A1B2C3D4", "Primary RFID", isoDate(2024, 2, 14), isoDate(2025, 4, 25)),
      makeCard("E5F6A7B8", "Car keyfob", isoDate(2024, 6, 3), isoDate(2025, 4, 20)),
    ],
    paymentMethods: [visaCard("4242", "12/27", true), upiHandle("rahul.s@okaxis"), walletEntry(850)],
    recentActivity: baseActivity("Rahul Sharma", "Bengaluru", 8),
    notes: [
      makeNote("N001", "Priya Menon", isoDate(2025, 1, 10), "High-value regular. Charges 4x per week. Flag for loyalty program.", "vip"),
    ],
    walletBalanceRupees: 850,
    appUserId: "APP-7841",
  },

  // ── 2 — Priya Nair (app only, active) ────────────────────────────────────
  {
    id: "DRV-002",
    name: "Priya Nair",
    phone: phone("91234 56789"),
    email: "priya.nair@outlook.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Jun 2024",
    registeredAt: isoDate(2024, 6, 5),
    country: "+91",
    lifetimeSessions: 68,
    lifetimeSpendRupees: 28350,
    lastSessionAt: "Yesterday, 18:42",
    lastSessionStation: "Panjim Hub",
    cards: [],
    paymentMethods: [upiHandle("priya@paytm", true), walletEntry(200)],
    recentActivity: baseActivity("Priya Nair", "Goa", 6),
    notes: [],
    walletBalanceRupees: 200,
    appUserId: "APP-3312",
  },

  // ── 3 — Mohammed Iqbal (rfid only, active) ────────────────────────────────
  {
    id: "DRV-003",
    name: "Mohammed Iqbal",
    phone: phone("99871 23456"),
    email: "m.iqbal@rediffmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Mar 2024",
    registeredAt: isoDate(2024, 3, 20),
    country: "+91",
    lifetimeSessions: 54,
    lifetimeSpendRupees: 21900,
    lastSessionAt: "Apr 23, 08:30",
    lastSessionStation: "BKC Charging Hub",
    cards: [
      makeCard("C9D0E1F2", "Main card", isoDate(2024, 3, 20), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("8888", "09/26", true)],
    recentActivity: baseActivity("Mohammed Iqbal", "Mumbai", 5),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 4 — Sunita Reddy (both, disputed) ────────────────────────────────────
  {
    id: "DRV-004",
    name: "Sunita Reddy",
    phone: phone("90001 23456"),
    email: "sunita.reddy@yahoo.com",
    accountType: "both",
    status: "disputed",
    memberSince: "Sep 2023",
    registeredAt: isoDate(2023, 9, 12),
    country: "+91",
    lifetimeSessions: 33,
    lifetimeSpendRupees: 14200,
    lastSessionAt: "Apr 10, 14:50",
    lastSessionStation: "HITEC City Hub",
    cards: [
      makeCard("F3A4B5C6", "Hyundai tag", isoDate(2023, 9, 12), isoDate(2025, 4, 10)),
    ],
    paymentMethods: [upiHandle("sunita@ybl", true)],
    recentActivity: [
      { at: "Apr 10, 14:50", label: "Session completed", detail: "₹320 · 21.5 kWh · Hyderabad", kind: "session" },
      { at: "Apr 8", label: "Dispute raised", detail: "Chargeback filed for ₹640 session", kind: "account" },
      { at: "Apr 7, 09:20", label: "Session completed", detail: "₹640 · 43.1 kWh · Hyderabad", kind: "session" },
      { at: "Mar 30", label: "Session completed", detail: "₹185 · 12.4 kWh · Hyderabad", kind: "session" },
    ],
    notes: [
      makeNote("N004", "Amit Sharma", isoDate(2025, 4, 9), "Chargeback raised for Apr 7 session. Awaiting bank resolution. Do not comp next session until resolved."),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-5512",
  },

  // ── 5 — Gurpreet Singh (both, active, VIP) ────────────────────────────────
  {
    id: "DRV-005",
    name: "Gurpreet Singh",
    phone: phone("98551 77890"),
    email: "gurpreet.singh@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Nov 2023",
    registeredAt: isoDate(2023, 11, 3),
    country: "+91",
    lifetimeSessions: 218,
    lifetimeSpendRupees: 85000,
    lastSessionAt: "Today, 09:40",
    lastSessionStation: "Connaught Place",
    cards: [
      makeCard("D7E8F9A0", "Primary", isoDate(2023, 11, 3), isoDate(2025, 4, 25)),
      makeCard("B1C2D3E4", "Backup", isoDate(2024, 3, 15), isoDate(2025, 3, 28)),
      makeCard("F5A6B7C8", "Wife's card", isoDate(2024, 7, 1), isoDate(2025, 4, 18)),
    ],
    paymentMethods: [visaCard("1234", "04/28", true), upiHandle("gurpreet@okicici"), walletEntry(2200)],
    recentActivity: baseActivity("Gurpreet Singh", "Delhi", 8),
    notes: [
      makeNote("N005a", "Priya Menon", isoDate(2024, 8, 20), "VIP customer. Fleet operator with 3 EVs. Consider enterprise pricing.", "vip"),
      makeNote("N005b", "Amit Sharma", isoDate(2025, 2, 5), "Requested invoice consolidation for all three cards. Forwarded to billing team."),
    ],
    walletBalanceRupees: 2200,
    appUserId: "APP-1104",
  },

  // ── 6 — Anita Desai (rfid only, active) ──────────────────────────────────
  {
    id: "DRV-006",
    name: "Anita Desai",
    phone: phone("97123 45678"),
    email: "anita.desai@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Jan 2025",
    registeredAt: isoDate(2025, 1, 8),
    country: "+91",
    lifetimeSessions: 18,
    lifetimeSpendRupees: 6800,
    lastSessionAt: "Apr 24, 17:00",
    lastSessionStation: "Hinjewadi IT Park",
    cards: [
      makeCard("A9B0C1D2", "Tata Nexon tag", isoDate(2025, 1, 8), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("5555", "11/27", true)],
    recentActivity: baseActivity("Anita Desai", "Pune", 4),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 7 — Vikram Pillai (app only, active) ─────────────────────────────────
  {
    id: "DRV-007",
    name: "Vikram Pillai",
    phone: phone("94421 98765"),
    email: "vikram.pillai@hotmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Apr 2024",
    registeredAt: isoDate(2024, 4, 18),
    country: "+91",
    lifetimeSessions: 45,
    lifetimeSpendRupees: 18200,
    lastSessionAt: "Apr 22, 11:30",
    lastSessionStation: "OMR IT Corridor",
    cards: [],
    paymentMethods: [upiHandle("vikram.p@paytm", true), walletEntry(500)],
    recentActivity: baseActivity("Vikram Pillai", "Chennai", 5),
    notes: [],
    walletBalanceRupees: 500,
    appUserId: "APP-2287",
  },

  // ── 8 — Zainab Shaikh (both, blocked) ────────────────────────────────────
  {
    id: "DRV-008",
    name: "Zainab Shaikh",
    phone: phone("98765 11223"),
    email: "zainab.shaikh@gmail.com",
    accountType: "both",
    status: "blocked",
    memberSince: "Jul 2023",
    registeredAt: isoDate(2023, 7, 22),
    country: "+91",
    lifetimeSessions: 12,
    lifetimeSpendRupees: 4900,
    lastSessionAt: "Feb 28, 20:00",
    lastSessionStation: "Andheri West",
    cards: [
      makeCard("E3F4A5B6", "Card 1", isoDate(2023, 7, 22), isoDate(2025, 2, 28), "inactive"),
    ],
    paymentMethods: [upiHandle("zainab@ybl")],
    recentActivity: [
      { at: "Feb 28, 20:00", label: "Session completed", detail: "₹200 · 13.4 kWh · Mumbai", kind: "session" },
      { at: "Mar 5", label: "Account blocked", detail: "Payment failure threshold exceeded", kind: "account" },
      { at: "Feb 20, 14:00", label: "Session completed", detail: "₹310 · 20.8 kWh · Mumbai", kind: "session" },
    ],
    notes: [
      makeNote("N008", "Amit Sharma", isoDate(2025, 3, 5), "Account blocked after 3 failed payment attempts. Requires manual review before unblocking.", "fraud_watch"),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-6631",
  },

  // ── 9 — Deepa Krishnamurthy (both, active) ────────────────────────────────
  {
    id: "DRV-009",
    name: "Deepa Krishnamurthy",
    phone: phone("99001 23456"),
    email: "deepa.k@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Aug 2024",
    registeredAt: isoDate(2024, 8, 1),
    country: "+91",
    lifetimeSessions: 72,
    lifetimeSpendRupees: 29600,
    lastSessionAt: "Today, 08:15",
    lastSessionStation: "Electronic City",
    cards: [
      makeCard("C7D8E9F0", "MG ZS tag", isoDate(2024, 8, 1), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [visaCard("9999", "06/29", true), upiHandle("deepa@okhdfc"), walletEntry(1100)],
    recentActivity: baseActivity("Deepa Krishnamurthy", "Bengaluru", 7),
    notes: [],
    walletBalanceRupees: 1100,
    appUserId: "APP-4453",
  },

  // ── 10 — Arjun Mehta (app only, active) ──────────────────────────────────
  {
    id: "DRV-010",
    name: "Arjun Mehta",
    phone: phone("98101 55678"),
    email: "arjun.mehta@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Dec 2024",
    registeredAt: isoDate(2024, 12, 3),
    country: "+91",
    lifetimeSessions: 11,
    lifetimeSpendRupees: 4200,
    lastSessionAt: "Apr 21, 16:30",
    lastSessionStation: "Whitefield Station",
    cards: [],
    paymentMethods: [upiHandle("arjun.m@gpay", true)],
    recentActivity: baseActivity("Arjun Mehta", "Bengaluru", 4),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-8823",
  },

  // ── 11 — Lakshmi Venkataraman (rfid only, active) ────────────────────────
  {
    id: "DRV-011",
    name: "Lakshmi Venkataraman",
    phone: phone("96321 44567"),
    email: "lakshmi.v@yahoo.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "May 2024",
    registeredAt: isoDate(2024, 5, 9),
    country: "+91",
    lifetimeSessions: 61,
    lifetimeSpendRupees: 25400,
    lastSessionAt: "Apr 24, 13:00",
    lastSessionStation: "HITEC City Hub",
    cards: [
      makeCard("B0C1D2E3", "Primary", isoDate(2024, 5, 9), isoDate(2025, 4, 24)),
      makeCard("F4A5B6C7", "Spare", isoDate(2024, 10, 15), isoDate(2025, 3, 12)),
    ],
    paymentMethods: [visaCard("3344", "02/28", true)],
    recentActivity: baseActivity("Lakshmi Venkataraman", "Hyderabad", 6),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 12 — Rohan Bose (both, active) ────────────────────────────────────────
  {
    id: "DRV-012",
    name: "Rohan Bose",
    phone: phone("97890 12345"),
    email: "rohan.bose@outlook.com",
    accountType: "both",
    status: "active",
    memberSince: "Mar 2025",
    registeredAt: isoDate(2025, 3, 2),
    country: "+91",
    lifetimeSessions: 9,
    lifetimeSpendRupees: 3200,
    lastSessionAt: "Apr 20, 12:45",
    lastSessionStation: "Saket District",
    cards: [
      makeCard("D8E9F0A1", "Nexon EV Max", isoDate(2025, 3, 2), isoDate(2025, 4, 20)),
    ],
    paymentMethods: [upiHandle("rohan.b@paytm", true), walletEntry(400)],
    recentActivity: baseActivity("Rohan Bose", "Delhi", 3),
    notes: [],
    walletBalanceRupees: 400,
    appUserId: "APP-9941",
  },

  // ── 13 — Fatima Shaikh (both, disputed) ──────────────────────────────────
  {
    id: "DRV-013",
    name: "Fatima Shaikh",
    phone: phone("91234 00987"),
    email: "fatima.shaikh@gmail.com",
    accountType: "both",
    status: "disputed",
    memberSince: "Oct 2023",
    registeredAt: isoDate(2023, 10, 18),
    country: "+91",
    lifetimeSessions: 44,
    lifetimeSpendRupees: 17500,
    lastSessionAt: "Apr 12, 10:00",
    lastSessionStation: "Calangute Station",
    cards: [
      makeCard("B2C3D4E5", "Main card", isoDate(2023, 10, 18), isoDate(2025, 4, 12)),
    ],
    paymentMethods: [visaCard("6677", "08/26", true), upiHandle("fatima@paytm")],
    recentActivity: [
      { at: "Apr 12, 10:00", label: "Session completed", detail: "₹410 · 27.5 kWh · Goa", kind: "session" },
      { at: "Apr 13", label: "Dispute raised", detail: "Session duration discrepancy reported", kind: "account" },
      { at: "Apr 5, 16:20", label: "Session completed", detail: "₹290 · 19.5 kWh · Goa", kind: "session" },
    ],
    notes: [
      makeNote("N013", "Priya Menon", isoDate(2025, 4, 14), "Reports 40-min session charged as 68 min. Reviewing OCPP logs. Station GPWR-Goa-02."),
    ],
    walletBalanceRupees: 150,
    appUserId: "APP-3308",
  },

  // ── 14 — Sanjay Gupta (rfid only, active) ────────────────────────────────
  {
    id: "DRV-014",
    name: "Sanjay Gupta",
    phone: phone("98765 43210"),
    email: "sanjay.gupta@rediffmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Jul 2024",
    registeredAt: isoDate(2024, 7, 14),
    country: "+91",
    lifetimeSessions: 38,
    lifetimeSpendRupees: 15200,
    lastSessionAt: "Apr 23, 14:00",
    lastSessionStation: "Connaught Place",
    cards: [
      makeCard("F6A7B8C9", "Primary", isoDate(2024, 7, 14), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("2211", "01/27", true)],
    recentActivity: baseActivity("Sanjay Gupta", "Delhi", 5),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 15 — Meera Iyer (both, active) ────────────────────────────────────────
  {
    id: "DRV-015",
    name: "Meera Iyer",
    phone: phone("98451 67890"),
    email: "meera.iyer@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Feb 2025",
    registeredAt: isoDate(2025, 2, 18),
    country: "+91",
    lifetimeSessions: 14,
    lifetimeSpendRupees: 5500,
    lastSessionAt: "Apr 24, 19:10",
    lastSessionStation: "OMR IT Corridor",
    cards: [
      makeCard("D0E1F2A3", "Ather tag", isoDate(2025, 2, 18), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("meera.iyer@okaxis", true), walletEntry(300)],
    recentActivity: baseActivity("Meera Iyer", "Chennai", 4),
    notes: [],
    walletBalanceRupees: 300,
    appUserId: "APP-7720",
  },

  // ── 16 — Naveen Chandra (app only, active) ────────────────────────────────
  {
    id: "DRV-016",
    name: "Naveen Chandra",
    phone: phone("99901 23456"),
    email: "naveen.chandra@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Sep 2024",
    registeredAt: isoDate(2024, 9, 25),
    country: "+91",
    lifetimeSessions: 29,
    lifetimeSpendRupees: 11600,
    lastSessionAt: "Apr 22, 09:20",
    lastSessionStation: "Hinjewadi IT Park",
    cards: [],
    paymentMethods: [upiHandle("naveen@ybl", true)],
    recentActivity: baseActivity("Naveen Chandra", "Pune", 5),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-6645",
  },

  // ── 17 — Kavita Pillai (both, active) ─────────────────────────────────────
  {
    id: "DRV-017",
    name: "Kavita Pillai",
    phone: phone("96001 78901"),
    email: "kavita.pillai@hotmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Jun 2023",
    registeredAt: isoDate(2023, 6, 10),
    country: "+91",
    lifetimeSessions: 156,
    lifetimeSpendRupees: 63200,
    lastSessionAt: "Today, 11:45",
    lastSessionStation: "Koramangala Hub",
    cards: [
      makeCard("B4C5D6E7", "Main card", isoDate(2023, 6, 10), isoDate(2025, 4, 25)),
      makeCard("F8A9B0C1", "Backup", isoDate(2024, 1, 20), isoDate(2025, 3, 30)),
    ],
    paymentMethods: [visaCard("7890", "07/28", true), upiHandle("kavita.p@gpay"), walletEntry(750)],
    recentActivity: baseActivity("Kavita Pillai", "Bengaluru", 8),
    notes: [
      makeNote("N017", "Priya Menon", isoDate(2024, 12, 15), "Long-standing customer. Eligible for loyalty tier 2.", "vip"),
    ],
    walletBalanceRupees: 750,
    appUserId: "APP-2211",
  },

  // ── 18 — Aditya Rao (rfid only, active) ──────────────────────────────────
  {
    id: "DRV-018",
    name: "Aditya Rao",
    phone: phone("94561 23456"),
    email: "aditya.rao@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Nov 2024",
    registeredAt: isoDate(2024, 11, 5),
    country: "+91",
    lifetimeSessions: 22,
    lifetimeSpendRupees: 8900,
    lastSessionAt: "Apr 23, 07:30",
    lastSessionStation: "HITEC City Hub",
    cards: [
      makeCard("D2E3F4A5", "Hyundai Ioniq5", isoDate(2024, 11, 5), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("3456", "10/27", true)],
    recentActivity: baseActivity("Aditya Rao", "Hyderabad", 4),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 19 — Preeti Chauhan (both, active) ────────────────────────────────────
  {
    id: "DRV-019",
    name: "Preeti Chauhan",
    phone: phone("98001 34567"),
    email: "preeti.chauhan@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Apr 2024",
    registeredAt: isoDate(2024, 4, 22),
    country: "+91",
    lifetimeSessions: 80,
    lifetimeSpendRupees: 33600,
    lastSessionAt: "Today, 07:50",
    lastSessionStation: "Saket District",
    cards: [
      makeCard("B6C7D8E9", "Tata EV", isoDate(2024, 4, 22), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [visaCard("1122", "03/29", true), upiHandle("preeti@okaxis"), walletEntry(620)],
    recentActivity: baseActivity("Preeti Chauhan", "Delhi", 7),
    notes: [],
    walletBalanceRupees: 620,
    appUserId: "APP-5504",
  },

  // ── 20 — Suresh Krishnan (app only, active) ───────────────────────────────
  {
    id: "DRV-020",
    name: "Suresh Krishnan",
    phone: phone("90001 87654"),
    email: "suresh.k@yahoo.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Jan 2025",
    registeredAt: isoDate(2025, 1, 15),
    country: "+91",
    lifetimeSessions: 8,
    lifetimeSpendRupees: 2900,
    lastSessionAt: "Apr 19, 15:20",
    lastSessionStation: "OMR IT Corridor",
    cards: [],
    paymentMethods: [upiHandle("suresh.k@paytm", true)],
    recentActivity: baseActivity("Suresh Krishnan", "Chennai", 3),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-1193",
  },

  // ── 21 — Pooja Sharma (both, active) ─────────────────────────────────────
  {
    id: "DRV-021",
    name: "Pooja Sharma",
    phone: phone("98211 11234"),
    email: "pooja.sharma@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Aug 2023",
    registeredAt: isoDate(2023, 8, 5),
    country: "+91",
    lifetimeSessions: 112,
    lifetimeSpendRupees: 46800,
    lastSessionAt: "Today, 08:55",
    lastSessionStation: "BKC Charging Hub",
    cards: [
      makeCard("F0A1B2C3", "Primary", isoDate(2023, 8, 5), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [visaCard("4444", "05/28", true), upiHandle("pooja.s@okhdfc"), walletEntry(1600)],
    recentActivity: baseActivity("Pooja Sharma", "Mumbai", 8),
    notes: [],
    walletBalanceRupees: 1600,
    appUserId: "APP-3348",
  },

  // ── 22 — Kabir Ansari (rfid only, active) ────────────────────────────────
  {
    id: "DRV-022",
    name: "Kabir Ansari",
    phone: phone("96700 34567"),
    email: "kabir.ansari@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Feb 2025",
    registeredAt: isoDate(2025, 2, 3),
    country: "+91",
    lifetimeSessions: 7,
    lifetimeSpendRupees: 2600,
    lastSessionAt: "Apr 22, 19:00",
    lastSessionStation: "Sector 62 Noida",
    cards: [
      makeCard("D4E5F6A7", "Kia EV6 tag", isoDate(2025, 2, 3), isoDate(2025, 4, 22)),
    ],
    paymentMethods: [visaCard("6688", "11/26", true)],
    recentActivity: baseActivity("Kabir Ansari", "Delhi NCR", 3),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 23 — Anjali Verma (both, active) ─────────────────────────────────────
  {
    id: "DRV-023",
    name: "Anjali Verma",
    phone: phone("99001 56789"),
    email: "anjali.verma@hotmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Oct 2024",
    registeredAt: isoDate(2024, 10, 12),
    country: "+91",
    lifetimeSessions: 35,
    lifetimeSpendRupees: 14200,
    lastSessionAt: "Apr 24, 14:30",
    lastSessionStation: "Panjim Hub",
    cards: [
      makeCard("B8C9D0E1", "MG Comet tag", isoDate(2024, 10, 12), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("anjali.v@paytm", true), walletEntry(250)],
    recentActivity: baseActivity("Anjali Verma", "Goa", 5),
    notes: [],
    walletBalanceRupees: 250,
    appUserId: "APP-7782",
  },

  // ── 24 — Rajiv Khanna (app only, disputed) ───────────────────────────────
  {
    id: "DRV-024",
    name: "Rajiv Khanna",
    phone: phone("93456 78901"),
    email: "rajiv.khanna@gmail.com",
    accountType: "app_only",
    status: "disputed",
    memberSince: "May 2024",
    registeredAt: isoDate(2024, 5, 30),
    country: "+91",
    lifetimeSessions: 27,
    lifetimeSpendRupees: 10800,
    lastSessionAt: "Apr 8, 11:30",
    lastSessionStation: "Whitefield Station",
    cards: [],
    paymentMethods: [upiHandle("rajiv.k@ybl", true)],
    recentActivity: [
      { at: "Apr 8, 11:30", label: "Session completed", detail: "₹550 · 37.0 kWh · Bengaluru", kind: "session" },
      { at: "Apr 9", label: "Dispute raised", detail: "Connector stuck, car underpowered", kind: "account" },
      { at: "Apr 2, 09:10", label: "Session completed", detail: "₹310 · 20.8 kWh · Bengaluru", kind: "session" },
    ],
    notes: [
      makeNote("N024", "Amit Sharma", isoDate(2025, 4, 10), "Connector fault on GPWR-Blr-02 port 3. Session energy delivery may be under-reported. Coordinated with field team."),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-4460",
  },

  // ── 25 — Ritu Nanda (both, active) ────────────────────────────────────────
  {
    id: "DRV-025",
    name: "Ritu Nanda",
    phone: phone("97001 23456"),
    email: "ritu.nanda@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Jul 2024",
    registeredAt: isoDate(2024, 7, 7),
    country: "+91",
    lifetimeSessions: 59,
    lifetimeSpendRupees: 24200,
    lastSessionAt: "Apr 24, 20:00",
    lastSessionStation: "Kothrud Depot",
    cards: [
      makeCard("F2A3B4C5", "Nexon EV", isoDate(2024, 7, 7), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("9988", "09/27", true), upiHandle("ritu.n@okaxis"), walletEntry(400)],
    recentActivity: baseActivity("Ritu Nanda", "Pune", 6),
    notes: [],
    walletBalanceRupees: 400,
    appUserId: "APP-8819",
  },

  // ── 26 — Akash Singhania (app only, active) ───────────────────────────────
  {
    id: "DRV-026",
    name: "Akash Singhania",
    phone: phone("90123 45678"),
    email: "akash.singhania@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Mar 2025",
    registeredAt: isoDate(2025, 3, 19),
    country: "+91",
    lifetimeSessions: 5,
    lifetimeSpendRupees: 1800,
    lastSessionAt: "Apr 21, 13:10",
    lastSessionStation: "Sector 62 Noida",
    cards: [],
    paymentMethods: [upiHandle("akash.s@gpay", true)],
    recentActivity: baseActivity("Akash Singhania", "Delhi NCR", 2),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-1238",
  },

  // ── 27 — Divya Menon (both, active) ──────────────────────────────────────
  {
    id: "DRV-027",
    name: "Divya Menon",
    phone: phone("98321 87654"),
    email: "divya.menon@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Nov 2023",
    registeredAt: isoDate(2023, 11, 25),
    country: "+91",
    lifetimeSessions: 92,
    lifetimeSpendRupees: 38100,
    lastSessionAt: "Today, 10:55",
    lastSessionStation: "Koramangala Hub",
    cards: [
      makeCard("D6E7F8A9", "Primary", isoDate(2023, 11, 25), isoDate(2025, 4, 25)),
      makeCard("B0C1D2E3", "Spare", isoDate(2024, 4, 10), isoDate(2025, 4, 10)),
    ],
    paymentMethods: [visaCard("5566", "12/28", true), upiHandle("divya.m@okhdfc"), walletEntry(900)],
    recentActivity: baseActivity("Divya Menon", "Bengaluru", 7),
    notes: [],
    walletBalanceRupees: 900,
    appUserId: "APP-5571",
  },

  // ── 28 — Harpreet Kaur (rfid only, active) ────────────────────────────────
  {
    id: "DRV-028",
    name: "Harpreet Kaur",
    phone: phone("95001 67890"),
    email: "harpreet.kaur@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Dec 2023",
    registeredAt: isoDate(2023, 12, 8),
    country: "+91",
    lifetimeSessions: 48,
    lifetimeSpendRupees: 19700,
    lastSessionAt: "Apr 23, 08:00",
    lastSessionStation: "Connaught Place",
    cards: [
      makeCard("F0A1B2C3", "Primary", isoDate(2023, 12, 8), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("7711", "04/28", true)],
    recentActivity: baseActivity("Harpreet Kaur", "Delhi", 5),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 29 — Tarun Joshi (app only, active) ──────────────────────────────────
  {
    id: "DRV-029",
    name: "Tarun Joshi",
    phone: phone("97456 12345"),
    email: "tarun.joshi@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Jun 2024",
    registeredAt: isoDate(2024, 6, 20),
    country: "+91",
    lifetimeSessions: 41,
    lifetimeSpendRupees: 16500,
    lastSessionAt: "Apr 24, 17:45",
    lastSessionStation: "BKC Charging Hub",
    cards: [],
    paymentMethods: [upiHandle("tarun.j@paytm", true), walletEntry(350)],
    recentActivity: baseActivity("Tarun Joshi", "Mumbai", 5),
    notes: [],
    walletBalanceRupees: 350,
    appUserId: "APP-3319",
  },

  // ── 30 — Nisha Kapoor (both, active) ─────────────────────────────────────
  {
    id: "DRV-030",
    name: "Nisha Kapoor",
    phone: phone("98781 23456"),
    email: "nisha.kapoor@hotmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Jan 2024",
    registeredAt: isoDate(2024, 1, 28),
    country: "+91",
    lifetimeSessions: 77,
    lifetimeSpendRupees: 32200,
    lastSessionAt: "Today, 09:30",
    lastSessionStation: "Andheri West",
    cards: [
      makeCard("D4E5F6A7", "Tata Nexon tag", isoDate(2024, 1, 28), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [visaCard("3399", "08/27", true), upiHandle("nisha.k@okicici"), walletEntry(680)],
    recentActivity: baseActivity("Nisha Kapoor", "Mumbai", 7),
    notes: [],
    walletBalanceRupees: 680,
    appUserId: "APP-7703",
  },

  // ── 31 — Vishal Tiwari (both, blocked) ───────────────────────────────────
  {
    id: "DRV-031",
    name: "Vishal Tiwari",
    phone: phone("99001 11234"),
    email: "vishal.tiwari@gmail.com",
    accountType: "both",
    status: "blocked",
    memberSince: "Apr 2023",
    registeredAt: isoDate(2023, 4, 14),
    country: "+91",
    lifetimeSessions: 6,
    lifetimeSpendRupees: 2100,
    lastSessionAt: "Jan 15, 09:00",
    lastSessionStation: "Sector 62 Noida",
    cards: [
      makeCard("B8C9D0E1", "Card", isoDate(2023, 4, 14), isoDate(2025, 1, 15), "stolen"),
    ],
    paymentMethods: [upiHandle("vishal.t@ybl")],
    recentActivity: [
      { at: "Jan 15, 09:00", label: "Session completed", detail: "₹380 · 25.5 kWh · Delhi NCR", kind: "session" },
      { at: "Jan 16", label: "Card reported stolen", detail: "RFID card UID B8C9D0E1 deactivated", kind: "card" },
      { at: "Jan 20", label: "Account blocked", detail: "Suspicious activity reported", kind: "account" },
    ],
    notes: [
      makeNote("N031", "Amit Sharma", isoDate(2025, 1, 20), "Card reported stolen by driver. Account blocked pending verification. Requires ID check before reactivation.", "fraud_watch"),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-2245",
  },

  // ── 32 — Sneha Patil (both, active) ──────────────────────────────────────
  {
    id: "DRV-032",
    name: "Sneha Patil",
    phone: phone("96234 56789"),
    email: "sneha.patil@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Sep 2024",
    registeredAt: isoDate(2024, 9, 3),
    country: "+91",
    lifetimeSessions: 30,
    lifetimeSpendRupees: 12300,
    lastSessionAt: "Apr 24, 16:00",
    lastSessionStation: "Hinjewadi IT Park",
    cards: [
      makeCard("F2A3B4C5", "BYD Atto 3", isoDate(2024, 9, 3), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("2255", "06/28", true), upiHandle("sneha.p@gpay"), walletEntry(450)],
    recentActivity: baseActivity("Sneha Patil", "Pune", 5),
    notes: [],
    walletBalanceRupees: 450,
    appUserId: "APP-8812",
  },

  // ── 33 — Ashish Malhotra (rfid only, active) ─────────────────────────────
  {
    id: "DRV-033",
    name: "Ashish Malhotra",
    phone: phone("98001 88765"),
    email: "ashish.malhotra@yahoo.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Oct 2023",
    registeredAt: isoDate(2023, 10, 30),
    country: "+91",
    lifetimeSessions: 66,
    lifetimeSpendRupees: 27100,
    lastSessionAt: "Apr 24, 08:45",
    lastSessionStation: "Saket District",
    cards: [
      makeCard("D6E7F8A9", "Primary", isoDate(2023, 10, 30), isoDate(2025, 4, 24)),
      makeCard("B0C1D2E3", "Backup", isoDate(2024, 5, 1), isoDate(2025, 2, 14)),
    ],
    paymentMethods: [visaCard("6644", "03/27", true)],
    recentActivity: baseActivity("Ashish Malhotra", "Delhi", 6),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 34 — Lata Krishnamurthy (app only, active) ────────────────────────────
  {
    id: "DRV-034",
    name: "Lata Krishnamurthy",
    phone: phone("97001 98765"),
    email: "lata.k@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Feb 2025",
    registeredAt: isoDate(2025, 2, 25),
    country: "+91",
    lifetimeSessions: 6,
    lifetimeSpendRupees: 2400,
    lastSessionAt: "Apr 23, 18:00",
    lastSessionStation: "HITEC City Hub",
    cards: [],
    paymentMethods: [upiHandle("lata.k@paytm", true)],
    recentActivity: baseActivity("Lata Krishnamurthy", "Hyderabad", 2),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-9958",
  },

  // ── 35 — Manish Agarwal (both, active) ────────────────────────────────────
  {
    id: "DRV-035",
    name: "Manish Agarwal",
    phone: phone("99501 34567"),
    email: "manish.agarwal@outlook.com",
    accountType: "both",
    status: "active",
    memberSince: "May 2023",
    registeredAt: isoDate(2023, 5, 15),
    country: "+91",
    lifetimeSessions: 188,
    lifetimeSpendRupees: 77400,
    lastSessionAt: "Today, 07:30",
    lastSessionStation: "BKC Charging Hub",
    cards: [
      makeCard("F4A5B6C7", "Main", isoDate(2023, 5, 15), isoDate(2025, 4, 25)),
      makeCard("D8E9F0A1", "Car fob", isoDate(2023, 9, 20), isoDate(2025, 4, 20)),
    ],
    paymentMethods: [visaCard("8877", "01/29", true), upiHandle("manish.a@okaxis"), walletEntry(3200)],
    recentActivity: baseActivity("Manish Agarwal", "Mumbai", 8),
    notes: [
      makeNote("N035", "Priya Menon", isoDate(2025, 1, 8), "Fleet manager for 4 company EVs. VIP tier. Negotiated enterprise rate at ₹13/kWh.", "vip"),
    ],
    walletBalanceRupees: 3200,
    appUserId: "APP-1001",
  },

  // ── 36 — Pritha Banerjee (both, active) ──────────────────────────────────
  {
    id: "DRV-036",
    name: "Pritha Banerjee",
    phone: phone("98671 45678"),
    email: "pritha.b@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Mar 2024",
    registeredAt: isoDate(2024, 3, 11),
    country: "+91",
    lifetimeSessions: 55,
    lifetimeSpendRupees: 22800,
    lastSessionAt: "Apr 24, 21:00",
    lastSessionStation: "Saket District",
    cards: [
      makeCard("B2C3D4E5", "Primary", isoDate(2024, 3, 11), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("pritha.b@okhdfc", true), walletEntry(560)],
    recentActivity: baseActivity("Pritha Banerjee", "Delhi", 6),
    notes: [],
    walletBalanceRupees: 560,
    appUserId: "APP-6678",
  },

  // ── 37 — Shyam Sunder (rfid only, active) ────────────────────────────────
  {
    id: "DRV-037",
    name: "Shyam Sunder",
    phone: phone("93001 56789"),
    email: "shyam.sunder@rediffmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Jan 2024",
    registeredAt: isoDate(2024, 1, 5),
    country: "+91",
    lifetimeSessions: 42,
    lifetimeSpendRupees: 17300,
    lastSessionAt: "Apr 23, 10:30",
    lastSessionStation: "Margao Depot",
    cards: [
      makeCard("F6A7B8C9", "Tata Tigor tag", isoDate(2024, 1, 5), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("1188", "07/26", true)],
    recentActivity: baseActivity("Shyam Sunder", "Goa", 5),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 38 — Kiran D'Souza (both, active) ─────────────────────────────────────
  {
    id: "DRV-038",
    name: "Kiran D'Souza",
    phone: phone("98121 67890"),
    email: "kiran.dsouza@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Aug 2024",
    registeredAt: isoDate(2024, 8, 17),
    country: "+91",
    lifetimeSessions: 26,
    lifetimeSpendRupees: 10500,
    lastSessionAt: "Apr 24, 15:30",
    lastSessionStation: "Calangute Station",
    cards: [
      makeCard("D0E1F2A3", "Volvo EX30", isoDate(2024, 8, 17), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("5544", "11/28", true), upiHandle("kiran.d@ybl"), walletEntry(200)],
    recentActivity: baseActivity("Kiran D'Souza", "Goa", 5),
    notes: [],
    walletBalanceRupees: 200,
    appUserId: "APP-4491",
  },

  // ── 39 — Arun Nambiar (app only, disputed) ────────────────────────────────
  {
    id: "DRV-039",
    name: "Arun Nambiar",
    phone: phone("91234 88765"),
    email: "arun.nambiar@gmail.com",
    accountType: "app_only",
    status: "disputed",
    memberSince: "Jul 2024",
    registeredAt: isoDate(2024, 7, 1),
    country: "+91",
    lifetimeSessions: 19,
    lifetimeSpendRupees: 7800,
    lastSessionAt: "Apr 16, 12:00",
    lastSessionStation: "Whitefield Station",
    cards: [],
    paymentMethods: [upiHandle("arun.n@gpay", true)],
    recentActivity: [
      { at: "Apr 16, 12:00", label: "Session completed", detail: "₹450 · 30.2 kWh · Bengaluru", kind: "session" },
      { at: "Apr 17", label: "Dispute raised", detail: "Double charge reported for Apr 16 session", kind: "account" },
      { at: "Apr 10, 08:30", label: "Session completed", detail: "₹290 · 19.4 kWh · Bengaluru", kind: "session" },
    ],
    notes: [
      makeNote("N039", "Priya Menon", isoDate(2025, 4, 18), "Two payment records for same session. Reviewing payment gateway logs."),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-7733",
  },

  // ── 40 — Bhavna Pandey (both, active) ─────────────────────────────────────
  {
    id: "DRV-040",
    name: "Bhavna Pandey",
    phone: phone("97891 23456"),
    email: "bhavna.pandey@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Oct 2024",
    registeredAt: isoDate(2024, 10, 28),
    country: "+91",
    lifetimeSessions: 18,
    lifetimeSpendRupees: 7100,
    lastSessionAt: "Apr 24, 12:15",
    lastSessionStation: "Kothrud Depot",
    cards: [
      makeCard("B4C5D6E7", "Nexon EV", isoDate(2024, 10, 28), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("bhavna.p@paytm", true), walletEntry(180)],
    recentActivity: baseActivity("Bhavna Pandey", "Pune", 4),
    notes: [],
    walletBalanceRupees: 180,
    appUserId: "APP-5536",
  },

  // ── 41 — Chetan Shah (rfid only, active) ─────────────────────────────────
  {
    id: "DRV-041",
    name: "Chetan Shah",
    phone: phone("98001 99876"),
    email: "chetan.shah@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Jun 2024",
    registeredAt: isoDate(2024, 6, 14),
    country: "+91",
    lifetimeSessions: 47,
    lifetimeSpendRupees: 19200,
    lastSessionAt: "Apr 23, 14:15",
    lastSessionStation: "BKC Charging Hub",
    cards: [
      makeCard("F8A9B0C1", "MG Astor EV", isoDate(2024, 6, 14), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("9966", "05/27", true)],
    recentActivity: baseActivity("Chetan Shah", "Mumbai", 5),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 42 — Deepika Singh (both, active) ─────────────────────────────────────
  {
    id: "DRV-042",
    name: "Deepika Singh",
    phone: phone("91001 23456"),
    email: "deepika.singh@yahoo.com",
    accountType: "both",
    status: "active",
    memberSince: "Dec 2024",
    registeredAt: isoDate(2024, 12, 20),
    country: "+91",
    lifetimeSessions: 10,
    lifetimeSpendRupees: 3900,
    lastSessionAt: "Apr 22, 20:30",
    lastSessionStation: "Connaught Place",
    cards: [
      makeCard("D2E3F4A5", "Tata Curvv tag", isoDate(2024, 12, 20), isoDate(2025, 4, 22)),
    ],
    paymentMethods: [visaCard("7755", "10/28", true), upiHandle("deepika.s@gpay"), walletEntry(100)],
    recentActivity: baseActivity("Deepika Singh", "Delhi", 3),
    notes: [],
    walletBalanceRupees: 100,
    appUserId: "APP-2267",
  },

  // ── 43 — Farhan Qureshi (app only, active) ────────────────────────────────
  {
    id: "DRV-043",
    name: "Farhan Qureshi",
    phone: phone("98451 11234"),
    email: "farhan.qureshi@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Mar 2025",
    registeredAt: isoDate(2025, 3, 5),
    country: "+91",
    lifetimeSessions: 4,
    lifetimeSpendRupees: 1500,
    lastSessionAt: "Apr 20, 10:30",
    lastSessionStation: "HITEC City Hub",
    cards: [],
    paymentMethods: [upiHandle("farhan.q@okaxis", true)],
    recentActivity: baseActivity("Farhan Qureshi", "Hyderabad", 2),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-3382",
  },

  // ── 44 — Geeta Rajput (both, active) ──────────────────────────────────────
  {
    id: "DRV-044",
    name: "Geeta Rajput",
    phone: phone("97321 45678"),
    email: "geeta.rajput@hotmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Apr 2024",
    registeredAt: isoDate(2024, 4, 5),
    country: "+91",
    lifetimeSessions: 63,
    lifetimeSpendRupees: 26200,
    lastSessionAt: "Today, 11:00",
    lastSessionStation: "Sector 62 Noida",
    cards: [
      makeCard("B6C7D8E9", "Primary", isoDate(2024, 4, 5), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [visaCard("3377", "02/28", true), upiHandle("geeta.r@paytm"), walletEntry(720)],
    recentActivity: baseActivity("Geeta Rajput", "Delhi NCR", 6),
    notes: [],
    walletBalanceRupees: 720,
    appUserId: "APP-6603",
  },

  // ── 45 — Hitesh Patel (rfid only, active) ─────────────────────────────────
  {
    id: "DRV-045",
    name: "Hitesh Patel",
    phone: phone("99001 78901"),
    email: "hitesh.patel@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Aug 2023",
    registeredAt: isoDate(2023, 8, 25),
    country: "+91",
    lifetimeSessions: 98,
    lifetimeSpendRupees: 40300,
    lastSessionAt: "Apr 24, 09:00",
    lastSessionStation: "Andheri West",
    cards: [
      makeCard("F0A1B2C3", "Main", isoDate(2023, 8, 25), isoDate(2025, 4, 24)),
      makeCard("D4E5F6A7", "Spare", isoDate(2024, 2, 10), isoDate(2025, 3, 18)),
    ],
    paymentMethods: [visaCard("4466", "06/27", true)],
    recentActivity: baseActivity("Hitesh Patel", "Mumbai", 7),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 46 — Ishita Bose (both, active) ──────────────────────────────────────
  {
    id: "DRV-046",
    name: "Ishita Bose",
    phone: phone("96001 90123"),
    email: "ishita.bose@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Jul 2024",
    registeredAt: isoDate(2024, 7, 25),
    country: "+91",
    lifetimeSessions: 34,
    lifetimeSpendRupees: 14000,
    lastSessionAt: "Apr 24, 18:30",
    lastSessionStation: "Saket District",
    cards: [
      makeCard("B8C9D0E1", "BYD Seal tag", isoDate(2024, 7, 25), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("ishita.b@okhdfc", true), walletEntry(320)],
    recentActivity: baseActivity("Ishita Bose", "Delhi", 5),
    notes: [],
    walletBalanceRupees: 320,
    appUserId: "APP-8847",
  },

  // ── 47 — Jayant Thakur (app only, active) ─────────────────────────────────
  {
    id: "DRV-047",
    name: "Jayant Thakur",
    phone: phone("98221 34567"),
    email: "jayant.thakur@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Nov 2024",
    registeredAt: isoDate(2024, 11, 18),
    country: "+91",
    lifetimeSessions: 13,
    lifetimeSpendRupees: 5200,
    lastSessionAt: "Apr 23, 16:45",
    lastSessionStation: "Hinjewadi IT Park",
    cards: [],
    paymentMethods: [upiHandle("jayant.t@ybl", true)],
    recentActivity: baseActivity("Jayant Thakur", "Pune", 3),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-1174",
  },

  // ── 48 — Kavya Murthy (both, active) ──────────────────────────────────────
  {
    id: "DRV-048",
    name: "Kavya Murthy",
    phone: phone("97001 45678"),
    email: "kavya.murthy@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Feb 2024",
    registeredAt: isoDate(2024, 2, 8),
    country: "+91",
    lifetimeSessions: 84,
    lifetimeSpendRupees: 34700,
    lastSessionAt: "Today, 12:30",
    lastSessionStation: "OMR IT Corridor",
    cards: [
      makeCard("F2A3B4C5", "Ola Electric", isoDate(2024, 2, 8), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [visaCard("8833", "08/28", true), upiHandle("kavya.m@gpay"), walletEntry(1400)],
    recentActivity: baseActivity("Kavya Murthy", "Chennai", 7),
    notes: [],
    walletBalanceRupees: 1400,
    appUserId: "APP-5543",
  },

  // ── 49 — Lokesh Jain (rfid only, active) ─────────────────────────────────
  {
    id: "DRV-049",
    name: "Lokesh Jain",
    phone: phone("99901 56789"),
    email: "lokesh.jain@rediffmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Sep 2023",
    registeredAt: isoDate(2023, 9, 7),
    country: "+91",
    lifetimeSessions: 75,
    lifetimeSpendRupees: 31100,
    lastSessionAt: "Apr 24, 07:45",
    lastSessionStation: "Koramangala Hub",
    cards: [
      makeCard("D6E7F8A9", "Primary", isoDate(2023, 9, 7), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("2244", "04/27", true)],
    recentActivity: baseActivity("Lokesh Jain", "Bengaluru", 6),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 50 — Maya Shetty (both, active) ──────────────────────────────────────
  {
    id: "DRV-050",
    name: "Maya Shetty",
    phone: phone("96451 78901"),
    email: "maya.shetty@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Jun 2024",
    registeredAt: isoDate(2024, 6, 30),
    country: "+91",
    lifetimeSessions: 52,
    lifetimeSpendRupees: 21400,
    lastSessionAt: "Today, 14:10",
    lastSessionStation: "Koramangala Hub",
    cards: [
      makeCard("B0C1D2E3", "Ather 450X", isoDate(2024, 6, 30), isoDate(2025, 4, 25)),
    ],
    paymentMethods: [upiHandle("maya.s@okicici", true), walletEntry(580)],
    recentActivity: baseActivity("Maya Shetty", "Bengaluru", 6),
    notes: [],
    walletBalanceRupees: 580,
    appUserId: "APP-3361",
  },

  // ── 51 — Nikhil Srivastava (app only, active) ────────────────────────────
  {
    id: "DRV-051",
    name: "Nikhil Srivastava",
    phone: phone("98001 23456"),
    email: "nikhil.s@gmail.com",
    accountType: "app_only",
    status: "active",
    memberSince: "Jan 2025",
    registeredAt: isoDate(2025, 1, 22),
    country: "+91",
    lifetimeSessions: 7,
    lifetimeSpendRupees: 2800,
    lastSessionAt: "Apr 21, 19:20",
    lastSessionStation: "Connaught Place",
    cards: [],
    paymentMethods: [upiHandle("nikhil.s@paytm", true)],
    recentActivity: baseActivity("Nikhil Srivastava", "Delhi", 3),
    notes: [],
    walletBalanceRupees: 0,
    appUserId: "APP-7761",
  },

  // ── 52 — Omkar Kulkarni (both, active) ───────────────────────────────────
  {
    id: "DRV-052",
    name: "Omkar Kulkarni",
    phone: phone("91234 11123"),
    email: "omkar.kulkarni@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "May 2024",
    registeredAt: isoDate(2024, 5, 18),
    country: "+91",
    lifetimeSessions: 46,
    lifetimeSpendRupees: 18900,
    lastSessionAt: "Apr 24, 10:30",
    lastSessionStation: "Kothrud Depot",
    cards: [
      makeCard("F4A5B6C7", "Primary", isoDate(2024, 5, 18), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("6699", "09/27", true), upiHandle("omkar.k@ybl"), walletEntry(430)],
    recentActivity: baseActivity("Omkar Kulkarni", "Pune", 5),
    notes: [],
    walletBalanceRupees: 430,
    appUserId: "APP-2254",
  },

  // ── 53 — Padmini Rajan (rfid only, active) ────────────────────────────────
  {
    id: "DRV-053",
    name: "Padmini Rajan",
    phone: phone("98451 23456"),
    email: "padmini.rajan@yahoo.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Nov 2023",
    registeredAt: isoDate(2023, 11, 12),
    country: "+91",
    lifetimeSessions: 57,
    lifetimeSpendRupees: 23500,
    lastSessionAt: "Apr 23, 09:45",
    lastSessionStation: "OMR IT Corridor",
    cards: [
      makeCard("D8E9F0A1", "Primary", isoDate(2023, 11, 12), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("5533", "03/28", true)],
    recentActivity: baseActivity("Padmini Rajan", "Chennai", 6),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 54 — Quincy Fernandes (both, active) ─────────────────────────────────
  {
    id: "DRV-054",
    name: "Quincy Fernandes",
    phone: phone("97891 34567"),
    email: "quincy.fernandes@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Aug 2024",
    registeredAt: isoDate(2024, 8, 12),
    country: "+91",
    lifetimeSessions: 28,
    lifetimeSpendRupees: 11500,
    lastSessionAt: "Apr 24, 17:00",
    lastSessionStation: "Panjim Hub",
    cards: [
      makeCard("B2C3D4E5", "Nexon EV", isoDate(2024, 8, 12), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("quincy.f@paytm", true), walletEntry(290)],
    recentActivity: baseActivity("Quincy Fernandes", "Goa", 5),
    notes: [],
    walletBalanceRupees: 290,
    appUserId: "APP-8876",
  },

  // ── 55 — Ravi Shankar (both, disputed) ───────────────────────────────────
  {
    id: "DRV-055",
    name: "Ravi Shankar",
    phone: phone("93001 12345"),
    email: "ravi.shankar@gmail.com",
    accountType: "both",
    status: "disputed",
    memberSince: "Apr 2024",
    registeredAt: isoDate(2024, 4, 1),
    country: "+91",
    lifetimeSessions: 31,
    lifetimeSpendRupees: 12600,
    lastSessionAt: "Apr 14, 09:30",
    lastSessionStation: "Electronic City",
    cards: [
      makeCard("F6A7B8C9", "Main", isoDate(2024, 4, 1), isoDate(2025, 4, 14)),
    ],
    paymentMethods: [visaCard("1177", "06/27", true), upiHandle("ravi.s@gpay")],
    recentActivity: [
      { at: "Apr 14, 09:30", label: "Session completed", detail: "₹480 · 32.3 kWh · Bengaluru", kind: "session" },
      { at: "Apr 15", label: "Dispute raised", detail: "Session stopped mid-charge without warning", kind: "account" },
      { at: "Apr 8, 14:20", label: "Session completed", detail: "₹320 · 21.5 kWh · Bengaluru", kind: "session" },
    ],
    notes: [
      makeNote("N055", "Amit Sharma", isoDate(2025, 4, 16), "OCPP session abort log reviewed. Connector type mismatch caused auto-stop. Refund of ₹240 approved."),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-4497",
  },

  // ── 56 — Saroj Tiwari (rfid only, active) ─────────────────────────────────
  {
    id: "DRV-056",
    name: "Saroj Tiwari",
    phone: phone("99321 23456"),
    email: "saroj.tiwari@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Feb 2024",
    registeredAt: isoDate(2024, 2, 20),
    country: "+91",
    lifetimeSessions: 36,
    lifetimeSpendRupees: 14700,
    lastSessionAt: "Apr 23, 11:00",
    lastSessionStation: "Connaught Place",
    cards: [
      makeCard("D0E1F2A3", "Hyundai Creta EV", isoDate(2024, 2, 20), isoDate(2025, 4, 23)),
    ],
    paymentMethods: [visaCard("3322", "01/28", true)],
    recentActivity: baseActivity("Saroj Tiwari", "Delhi", 5),
    notes: [],
    walletBalanceRupees: 0,
  },

  // ── 57 — Tanu Ahuja (both, active) ────────────────────────────────────────
  {
    id: "DRV-057",
    name: "Tanu Ahuja",
    phone: phone("98001 67890"),
    email: "tanu.ahuja@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Sep 2024",
    registeredAt: isoDate(2024, 9, 14),
    country: "+91",
    lifetimeSessions: 24,
    lifetimeSpendRupees: 9700,
    lastSessionAt: "Apr 24, 13:45",
    lastSessionStation: "Whitefield Station",
    cards: [
      makeCard("B4C5D6E7", "MG Windsor tag", isoDate(2024, 9, 14), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [upiHandle("tanu.a@okaxis", true), walletEntry(370)],
    recentActivity: baseActivity("Tanu Ahuja", "Bengaluru", 5),
    notes: [],
    walletBalanceRupees: 370,
    appUserId: "APP-6688",
  },

  // ── 58 — Uday Malviya (app only, blocked) ─────────────────────────────────
  {
    id: "DRV-058",
    name: "Uday Malviya",
    phone: phone("97001 11234"),
    email: "uday.malviya@gmail.com",
    accountType: "app_only",
    status: "blocked",
    memberSince: "Jun 2023",
    registeredAt: isoDate(2023, 6, 8),
    country: "+91",
    lifetimeSessions: 4,
    lifetimeSpendRupees: 1400,
    lastSessionAt: "Nov 10, 16:00",
    lastSessionStation: "Hinjewadi IT Park",
    cards: [],
    paymentMethods: [upiHandle("uday.m@ybl")],
    recentActivity: [
      { at: "Nov 10, 16:00", label: "Session completed", detail: "₹390 · 26.2 kWh · Pune", kind: "session" },
      { at: "Nov 12", label: "Account blocked", detail: "UPI payment failure 3 consecutive times", kind: "account" },
    ],
    notes: [
      makeNote("N058", "Priya Menon", isoDate(2024, 11, 12), "Blocked due to repeated UPI failures. VPA may be invalid. Customer has not responded to outreach.", "fraud_watch"),
    ],
    walletBalanceRupees: 0,
    appUserId: "APP-9918",
  },

  // ── 59 — Vimala Srinivasan (both, active) ─────────────────────────────────
  {
    id: "DRV-059",
    name: "Vimala Srinivasan",
    phone: phone("96001 34567"),
    email: "vimala.s@gmail.com",
    accountType: "both",
    status: "active",
    memberSince: "Mar 2024",
    registeredAt: isoDate(2024, 3, 28),
    country: "+91",
    lifetimeSessions: 67,
    lifetimeSpendRupees: 27600,
    lastSessionAt: "Today, 13:20",
    lastSessionStation: "HITEC City Hub",
    cards: [
      makeCard("F8A9B0C1", "Primary", isoDate(2024, 3, 28), isoDate(2025, 4, 25)),
      makeCard("D2E3F4A5", "Backup", isoDate(2024, 9, 5), isoDate(2025, 4, 15)),
    ],
    paymentMethods: [visaCard("7788", "12/27", true), upiHandle("vimala.s@okhdfc"), walletEntry(690)],
    recentActivity: baseActivity("Vimala Srinivasan", "Hyderabad", 7),
    notes: [],
    walletBalanceRupees: 690,
    appUserId: "APP-3375",
  },

  // ── 60 — Wasim Mirza (rfid only, active) ─────────────────────────────────
  {
    id: "DRV-060",
    name: "Wasim Mirza",
    phone: phone("98991 45678"),
    email: "wasim.mirza@gmail.com",
    accountType: "rfid_only",
    status: "active",
    memberSince: "Dec 2023",
    registeredAt: isoDate(2023, 12, 15),
    country: "+91",
    lifetimeSessions: 53,
    lifetimeSpendRupees: 21800,
    lastSessionAt: "Apr 24, 08:30",
    lastSessionStation: "BKC Charging Hub",
    cards: [
      makeCard("B6C7D8E9", "Primary", isoDate(2023, 12, 15), isoDate(2025, 4, 24)),
    ],
    paymentMethods: [visaCard("5577", "07/27", true)],
    recentActivity: baseActivity("Wasim Mirza", "Mumbai", 6),
    notes: [],
    walletBalanceRupees: 0,
  },
];

/** Lookup a driver by ID. O(n) fine for 60 records. */
export function getDriver(id: string): Driver | undefined {
  return ALL_DRIVERS.find((d) => d.id === id);
}
