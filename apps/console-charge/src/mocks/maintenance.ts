/**
 * Maintenance mock data for GridCharge Console.
 * ~40 work orders across 6 statuses, realistic Indian technicians,
 * varied issue types and parts.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type WOStatus =
  | "open"
  | "assigned"
  | "in-progress"
  | "awaiting-parts"
  | "completed"
  | "cancelled";

export type WOPriority = "P1" | "P2" | "P3";

export type IssueType =
  | "hardware-failure"
  | "firmware-issue"
  | "vandalism"
  | "scheduled-service"
  | "other";

export interface PartUsed {
  name: string;
  qty: number;
  unitCost: number;
}

export interface WOTask {
  id: string;
  label: string;
  done: boolean;
}

export interface WorkOrder {
  id: string;
  /** e.g. WO-04001 */
  number: string;
  stationId: string;
  stationName: string;
  stationCity: string;
  portId?: string;
  portLabel?: string;
  status: WOStatus;
  priority: WOPriority;
  issueType: IssueType;
  issueSummary: string;
  issueDetail: string;
  assignedTech?: string;
  techPhone?: string;
  arrivedAt?: string;
  /** Related alert ID if launched from /alerts/:id */
  alertId?: string;
  createdAt: string;
  scheduledAt: string;
  completedAt?: string;
  /** Minutes on-site */
  timeSpentMinutes?: number;
  partsUsed: PartUsed[];
  labourCost: number;
  tasks: WOTask[];
  resolutionNotes?: string;
}

// ─── Technicians ──────────────────────────────────────────────────────────────

export interface Technician {
  id: string;
  name: string;
  phone: string;
  zone: string;
}

export const TECHNICIANS: Technician[] = [
  { id: "T01", name: "Rajan Pillai",    phone: "+91 98765 11001", zone: "Goa / South" },
  { id: "T02", name: "Arjun Deshmukh",  phone: "+91 98765 11002", zone: "Pune / Mumbai" },
  { id: "T03", name: "Meenakshi Iyer",  phone: "+91 98765 11003", zone: "Bangalore" },
  { id: "T04", name: "Suresh Nair",     phone: "+91 98765 11004", zone: "Delhi NCR" },
  { id: "T05", name: "Kavita Sharma",   phone: "+91 98765 11005", zone: "Hyderabad" },
  { id: "T06", name: "Deepak Bansal",   phone: "+91 98765 11006", zone: "Chennai" },
];

// ─── Task templates by issue type ─────────────────────────────────────────────

function hwFailureTasks(woId: string, done = 0): WOTask[] {
  const items = [
    "Inspect physical condition of the unit",
    "Check AC/DC cable continuity",
    "Test GFCI and protection relay",
    "Replace faulty AC contactor or inverter module",
    "Verify firmware version post repair",
    "Run a test charge session on all ports",
    "Update maintenance log in OCPP backend",
  ];
  return items.map((label, i) => ({ id: `${woId}-T${i + 1}`, label, done: i < done }));
}

function rfidTasks(woId: string, done = 0): WOTask[] {
  const items = [
    "Power-cycle RFID reader module",
    "Check USB/SPI connection on control board",
    "Test with a known-good RFID card",
    "Replace RFID reader if swap test fails",
    "Re-pair reader with OCPP backend",
    "Verify card-auth flow end-to-end",
  ];
  return items.map((label, i) => ({ id: `${woId}-T${i + 1}`, label, done: i < done }));
}

function screenTasks(woId: string, done = 0): WOTask[] {
  const items = [
    "Assess extent of physical screen damage",
    "Capture photos for insurance claim",
    "Disconnect display ribbon cable safely",
    "Install replacement LCD / touchscreen panel",
    "Test UI rendering at all brightness levels",
    "Verify touch calibration",
    "Log vandalism report with site manager",
  ];
  return items.map((label, i) => ({ id: `${woId}-T${i + 1}`, label, done: i < done }));
}

function scheduledTasks(woId: string, done = 0): WOTask[] {
  const items = [
    "Visual inspection: cables, connectors, housing",
    "Clean ventilation grilles and fan filters",
    "Check tightness of electrical terminals",
    "Test all ports with a 5-minute charge session",
    "Update firmware if newer version available",
    "Lubricate cable holsters and locking pins",
    "Record meter readings and report kWh totals",
    "Sign off maintenance log with site engineer",
  ];
  return items.map((label, i) => ({ id: `${woId}-T${i + 1}`, label, done: i < done }));
}

function paymentTasks(woId: string, done = 0): WOTask[] {
  const items = [
    "Test payment terminal with a reference card",
    "Check LAN / SIM connectivity for payment gateway",
    "Reboot payment controller module",
    "Replace payment terminal if reboot fails",
    "Verify end-to-end transaction flow",
    "Coordinate with payment gateway NOC if needed",
  ];
  return items.map((label, i) => ({ id: `${woId}-T${i + 1}`, label, done: i < done }));
}

function lockTasks(woId: string, done = 0): WOTask[] {
  const items = [
    "Test each port locking mechanism manually",
    "Inspect lock actuator and solenoid wiring",
    "Replace lock actuator on failing ports",
    "Test unlock via OCPP RemoteStartTransaction",
    "Verify lock state telemetry in backend",
  ];
  return items.map((label, i) => ({ id: `${woId}-T${i + 1}`, label, done: i < done }));
}

// ─── Work orders ──────────────────────────────────────────────────────────────

export const ALL_WORK_ORDERS: WorkOrder[] = [
  // ── OPEN (10) ──────────────────────────────────────────────────────────────
  {
    id: "wo-04001",
    number: "WO-04001",
    stationId: "GPWR-Goa-03",
    stationName: "Margao Depot",
    stationCity: "Goa",
    portId: "GPWR-Goa-03-P2",
    portLabel: "Port 2 (AC 22kW)",
    status: "open",
    priority: "P1",
    issueType: "hardware-failure",
    issueSummary: "Station offline, AC inverter fault on all ports",
    issueDetail:
      "Station went offline at 02:14. OCPP heartbeat lost. On-site inspection needed to determine root cause. Possible AC inverter board failure. Alert GP-2241 attached.",
    alertId: "GP-2241",
    createdAt: "2026-04-24 06:30",
    scheduledAt: "2026-04-25 09:00",
    partsUsed: [],
    labourCost: 0,
    tasks: hwFailureTasks("wo-04001"),
  },
  {
    id: "wo-04002",
    number: "WO-04002",
    stationId: "GPWR-Blr-03",
    stationName: "Electronic City",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-03-P5",
    portLabel: "Port 5 (AC 22kW)",
    status: "open",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "Port 5 error state, tripped GFCI",
    issueDetail:
      "GFCI trip reported on Port 5. Two consecutive reboot attempts have not cleared the fault. Technician visit required to inspect the protection relay.",
    createdAt: "2026-04-24 10:15",
    scheduledAt: "2026-04-25 14:00",
    partsUsed: [],
    labourCost: 0,
    tasks: hwFailureTasks("wo-04002"),
  },
  {
    id: "wo-04003",
    number: "WO-04003",
    stationId: "GPWR-Mum-01",
    stationName: "BKC Charging Hub",
    stationCity: "Mumbai",
    status: "open",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Quarterly preventive maintenance visit",
    issueDetail:
      "Routine quarterly service due. Covers cleaning, terminal checks, firmware audit, and full port test across all 14 ports.",
    createdAt: "2026-04-22 08:00",
    scheduledAt: "2026-04-28 10:00",
    partsUsed: [],
    labourCost: 0,
    tasks: scheduledTasks("wo-04003"),
  },
  {
    id: "wo-04004",
    number: "WO-04004",
    stationId: "GPWR-Del-02",
    stationName: "Saket District",
    stationCity: "Delhi",
    portId: "GPWR-Del-02-P3",
    portLabel: "Port 3 (AC 22kW)",
    status: "open",
    priority: "P2",
    issueType: "other",
    issueSummary: "Screen cracked, touchscreen unresponsive",
    issueDetail:
      "HMI display cracked, likely impact damage. UI is inaccessible for self-service users. Replacement panel needed.",
    createdAt: "2026-04-23 17:42",
    scheduledAt: "2026-04-26 11:00",
    partsUsed: [],
    labourCost: 0,
    tasks: screenTasks("wo-04004"),
  },
  {
    id: "wo-04005",
    number: "WO-04005",
    stationId: "GPWR-Che-01",
    stationName: "OMR IT Corridor",
    stationCity: "Chennai",
    portId: "GPWR-Che-01-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "open",
    priority: "P3",
    issueType: "firmware-issue",
    issueSummary: "OCPP reconnect loop on Port 2 after firmware 3.1.4 update",
    issueDetail:
      "Port 2 has been stuck in a reconnect loop since the firmware 3.1.4 push on Apr 22. Rollback to 3.1.3 may be required.",
    createdAt: "2026-04-22 23:00",
    scheduledAt: "2026-04-25 16:00",
    partsUsed: [],
    labourCost: 0,
    tasks: rfidTasks("wo-04005"),
  },
  {
    id: "wo-04006",
    number: "WO-04006",
    stationId: "GPWR-Hyd-01",
    stationName: "HITEC City Hub",
    stationCity: "Hyderabad",
    status: "open",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Bi-annual deep clean and cable inspection",
    issueDetail:
      "Scheduled bi-annual deep clean. Station has been operating for 8 months without a full inspection. Fan filter replacement recommended.",
    createdAt: "2026-04-20 09:00",
    scheduledAt: "2026-04-30 09:00",
    partsUsed: [],
    labourCost: 0,
    tasks: scheduledTasks("wo-04006"),
  },
  {
    id: "wo-04007",
    number: "WO-04007",
    stationId: "GPWR-Pune-01",
    stationName: "Hinjewadi IT Park",
    stationCity: "Pune",
    portId: "GPWR-Pune-01-P4",
    portLabel: "Port 4 (AC 22kW)",
    status: "open",
    priority: "P3",
    issueType: "other",
    issueSummary: "Payment terminal intermittently rejecting valid cards",
    issueDetail:
      "3 driver complaints over 48 hours: payment terminal times out on valid cards. Gateway logs show no transaction attempt received, suggesting local hardware fault.",
    createdAt: "2026-04-23 12:00",
    scheduledAt: "2026-04-26 14:00",
    partsUsed: [],
    labourCost: 0,
    tasks: paymentTasks("wo-04007"),
  },
  {
    id: "wo-04008",
    number: "WO-04008",
    stationId: "GPWR-Goa-01",
    stationName: "Panjim Hub",
    stationCity: "Goa",
    portId: "GPWR-Goa-01-P6",
    portLabel: "Port 6 (AC 22kW)",
    status: "open",
    priority: "P3",
    issueType: "hardware-failure",
    issueSummary: "Port 6 offline, likely upstream breaker trip",
    issueDetail:
      "Port 6 reporting offline since last night. Other ports on the same station are healthy. Suspect single-port MCB has tripped.",
    createdAt: "2026-04-24 07:30",
    scheduledAt: "2026-04-25 10:00",
    partsUsed: [],
    labourCost: 0,
    tasks: hwFailureTasks("wo-04008"),
  },
  {
    id: "wo-04009",
    number: "WO-04009",
    stationId: "GPWR-Blr-02",
    stationName: "Whitefield Station",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-02-P6",
    portLabel: "Port 6 (AC 22kW)",
    status: "open",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "Port 6 stuck in error state, socket damaged",
    issueDetail:
      "Type 2 socket on Port 6 shows visible damage to locking pin. Connector refuses to release after session end. Replacement socket needed.",
    createdAt: "2026-04-23 15:20",
    scheduledAt: "2026-04-25 09:30",
    partsUsed: [],
    labourCost: 0,
    tasks: lockTasks("wo-04009"),
  },
  {
    id: "wo-04010",
    number: "WO-04010",
    stationId: "GPWR-Del-01",
    stationName: "Connaught Place",
    stationCity: "Delhi",
    status: "open",
    priority: "P3",
    issueType: "vandalism",
    issueSummary: "Graffiti on housing, front panel scratched",
    issueDetail:
      "Station housing has graffiti markings. Functional assessment shows all ports healthy but cosmetic damage is visible to users. Cleaning and panel replacement required.",
    createdAt: "2026-04-23 08:00",
    scheduledAt: "2026-04-27 10:00",
    partsUsed: [],
    labourCost: 0,
    tasks: screenTasks("wo-04010"),
  },

  // ── ASSIGNED (6) ───────────────────────────────────────────────────────────
  {
    id: "wo-04011",
    number: "WO-04011",
    stationId: "GPWR-Goa-02",
    stationName: "Calangute Station",
    stationCity: "Goa",
    portId: "GPWR-Goa-02-P1",
    portLabel: "Port 1 (DC 60kW)",
    status: "assigned",
    priority: "P1",
    issueType: "hardware-failure",
    issueSummary: "DC fast-charge port not delivering rated power",
    issueDetail:
      "Port 1 capping at 20kW instead of 60kW. Driver complaints received. IGBT module suspected. Rajan assigned for same-day visit.",
    alertId: "GP-2198",
    assignedTech: "Rajan Pillai",
    techPhone: "+91 98765 11001",
    createdAt: "2026-04-24 08:00",
    scheduledAt: "2026-04-25 08:30",
    partsUsed: [],
    labourCost: 0,
    tasks: hwFailureTasks("wo-04011"),
  },
  {
    id: "wo-04012",
    number: "WO-04012",
    stationId: "GPWR-Blr-01",
    stationName: "Koramangala Hub",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-01-P6",
    portLabel: "Port 6 (AC 22kW)",
    status: "assigned",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "RFID reader not responding on Port 6",
    issueDetail:
      "RFID taps on Port 6 are not being acknowledged. Other RFID readers on same station are healthy. Hardware fault suspected. Meenakshi assigned.",
    assignedTech: "Meenakshi Iyer",
    techPhone: "+91 98765 11003",
    createdAt: "2026-04-23 19:00",
    scheduledAt: "2026-04-25 11:00",
    partsUsed: [],
    labourCost: 0,
    tasks: rfidTasks("wo-04012"),
  },
  {
    id: "wo-04013",
    number: "WO-04013",
    stationId: "GPWR-Mum-02",
    stationName: "Andheri West",
    stationCity: "Mumbai",
    status: "assigned",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Monthly preventive inspection",
    issueDetail:
      "Scheduled monthly inspection. Arjun assigned. Check all connectors, clean filters, verify firmware.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    createdAt: "2026-04-21 09:00",
    scheduledAt: "2026-04-26 09:00",
    partsUsed: [],
    labourCost: 0,
    tasks: scheduledTasks("wo-04013"),
  },
  {
    id: "wo-04014",
    number: "WO-04014",
    stationId: "GPWR-Del-03",
    stationName: "Sector 62 Noida",
    stationCity: "Delhi NCR",
    portId: "GPWR-Del-03-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "assigned",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "Port 2 connector lock stuck in locked position",
    issueDetail:
      "Port 2 connector locking mechanism is jammed. Vehicle cannot be unplugged. Suresh dispatched urgently.",
    alertId: "GP-2215",
    assignedTech: "Suresh Nair",
    techPhone: "+91 98765 11004",
    createdAt: "2026-04-24 13:00",
    scheduledAt: "2026-04-25 07:00",
    partsUsed: [],
    labourCost: 0,
    tasks: lockTasks("wo-04014"),
  },
  {
    id: "wo-04015",
    number: "WO-04015",
    stationId: "GPWR-Hyd-01",
    stationName: "HITEC City Hub",
    stationCity: "Hyderabad",
    portId: "GPWR-Hyd-01-P3",
    portLabel: "Port 3 (AC 22kW)",
    status: "assigned",
    priority: "P3",
    issueType: "other",
    issueSummary: "Display brightness too low, unreadable in sunlight",
    issueDetail:
      "Multiple driver reports: HMI screen barely visible in direct afternoon sunlight. Brightness setting was locked by firmware. Kavita to investigate and adjust.",
    assignedTech: "Kavita Sharma",
    techPhone: "+91 98765 11005",
    createdAt: "2026-04-22 14:00",
    scheduledAt: "2026-04-26 10:00",
    partsUsed: [],
    labourCost: 0,
    tasks: screenTasks("wo-04015"),
  },
  {
    id: "wo-04016",
    number: "WO-04016",
    stationId: "GPWR-Che-01",
    stationName: "OMR IT Corridor",
    stationCity: "Chennai",
    status: "assigned",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Annual full-station service",
    issueDetail:
      "Annual full service due in April. Deepak assigned. All 8 ports to be tested, firmware audited, hardware checklist completed.",
    assignedTech: "Deepak Bansal",
    techPhone: "+91 98765 11006",
    createdAt: "2026-04-18 09:00",
    scheduledAt: "2026-04-29 09:00",
    partsUsed: [],
    labourCost: 0,
    tasks: scheduledTasks("wo-04016"),
  },

  // ── IN-PROGRESS (8) ────────────────────────────────────────────────────────
  {
    id: "wo-04017",
    number: "WO-04017",
    stationId: "GPWR-Blr-03",
    stationName: "Electronic City",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-03-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "in-progress",
    priority: "P1",
    issueType: "hardware-failure",
    issueSummary: "DC port 2 hard fault, AC contactor failed",
    issueDetail:
      "AC contactor on Port 2 failed closed. No charge output. Meenakshi on-site replacing contactor unit. ETA 2 hours.",
    alertId: "GP-2180",
    assignedTech: "Meenakshi Iyer",
    techPhone: "+91 98765 11003",
    arrivedAt: "2026-04-25 08:45",
    createdAt: "2026-04-24 22:00",
    scheduledAt: "2026-04-25 08:00",
    timeSpentMinutes: 90,
    partsUsed: [
      { name: "AC Contactor 40A", qty: 1, unitCost: 2200 },
    ],
    labourCost: 1200,
    tasks: hwFailureTasks("wo-04017", 3),
  },
  {
    id: "wo-04018",
    number: "WO-04018",
    stationId: "GPWR-Goa-01",
    stationName: "Panjim Hub",
    stationCity: "Goa",
    portId: "GPWR-Goa-01-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "in-progress",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "RFID reader stuck in perpetual scan mode",
    issueDetail:
      "RFID reader on Port 2 is stuck scanning and never acknowledges a card tap. Session cannot be initiated without the app. Rajan on-site.",
    assignedTech: "Rajan Pillai",
    techPhone: "+91 98765 11001",
    arrivedAt: "2026-04-25 09:10",
    createdAt: "2026-04-24 16:00",
    scheduledAt: "2026-04-25 09:00",
    timeSpentMinutes: 45,
    partsUsed: [],
    labourCost: 600,
    tasks: rfidTasks("wo-04018", 2),
  },
  {
    id: "wo-04019",
    number: "WO-04019",
    stationId: "GPWR-Pune-02",
    stationName: "Kothrud Depot",
    stationCity: "Pune",
    portId: "GPWR-Pune-02-P6",
    portLabel: "Port 6 (AC 22kW)",
    status: "in-progress",
    priority: "P3",
    issueType: "hardware-failure",
    issueSummary: "Port 6 offline, MCB needs replacement",
    issueDetail:
      "MCB for Port 6 is tripping repeatedly. Replacement MCB sourced. Arjun is replacing it now.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    arrivedAt: "2026-04-25 09:30",
    createdAt: "2026-04-24 12:00",
    scheduledAt: "2026-04-25 09:00",
    timeSpentMinutes: 30,
    partsUsed: [
      { name: "MCB 32A Single Pole", qty: 1, unitCost: 850 },
    ],
    labourCost: 400,
    tasks: hwFailureTasks("wo-04019", 2),
  },
  {
    id: "wo-04020",
    number: "WO-04020",
    stationId: "GPWR-Del-01",
    stationName: "Connaught Place",
    stationCity: "Delhi",
    status: "in-progress",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Q1 quarterly preventive maintenance",
    issueDetail:
      "Quarterly preventive maintenance underway. Suresh completing firmware audit and cable checks on all 16 ports.",
    assignedTech: "Suresh Nair",
    techPhone: "+91 98765 11004",
    arrivedAt: "2026-04-25 08:00",
    createdAt: "2026-04-20 09:00",
    scheduledAt: "2026-04-25 08:00",
    timeSpentMinutes: 120,
    partsUsed: [
      { name: "Fan filter (replacement)", qty: 4, unitCost: 220 },
    ],
    labourCost: 2400,
    tasks: scheduledTasks("wo-04020", 5),
  },
  {
    id: "wo-04021",
    number: "WO-04021",
    stationId: "GPWR-Mum-01",
    stationName: "BKC Charging Hub",
    stationCity: "Mumbai",
    portId: "GPWR-Mum-01-P3",
    portLabel: "Port 3 (DC 60kW)",
    status: "in-progress",
    priority: "P2",
    issueType: "other",
    issueSummary: "Payment terminal offline on Port 3",
    issueDetail:
      "Payment gateway unreachable from Port 3 terminal. LAN cable found unseated. Arjun re-seating and testing the terminal.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    arrivedAt: "2026-04-25 10:15",
    createdAt: "2026-04-24 18:00",
    scheduledAt: "2026-04-25 10:00",
    timeSpentMinutes: 25,
    partsUsed: [],
    labourCost: 400,
    tasks: paymentTasks("wo-04021", 2),
  },
  {
    id: "wo-04022",
    number: "WO-04022",
    stationId: "GPWR-Hyd-01",
    stationName: "HITEC City Hub",
    stationCity: "Hyderabad",
    portId: "GPWR-Hyd-01-P1",
    portLabel: "Port 1 (DC 60kW)",
    status: "in-progress",
    priority: "P2",
    issueType: "vandalism",
    issueSummary: "CCS2 nozzle holster broken off, cable exposed",
    issueDetail:
      "Holster bracket for CCS2 nozzle was forcibly broken. Cable is dangling and a safety hazard. Kavita on-site for holster replacement.",
    assignedTech: "Kavita Sharma",
    techPhone: "+91 98765 11005",
    arrivedAt: "2026-04-25 09:00",
    createdAt: "2026-04-24 20:00",
    scheduledAt: "2026-04-25 09:00",
    timeSpentMinutes: 60,
    partsUsed: [
      { name: "CCS2 Nozzle Holster", qty: 1, unitCost: 1800 },
    ],
    labourCost: 800,
    tasks: lockTasks("wo-04022", 3),
  },
  {
    id: "wo-04023",
    number: "WO-04023",
    stationId: "GPWR-Che-01",
    stationName: "OMR IT Corridor",
    stationCity: "Chennai",
    portId: "GPWR-Che-01-P1",
    portLabel: "Port 1 (DC 60kW)",
    status: "in-progress",
    priority: "P3",
    issueType: "firmware-issue",
    issueSummary: "Firmware rollback to 3.1.3 after failed 3.1.4 OTA",
    issueDetail:
      "OTA to firmware 3.1.4 failed, leaving Port 1 in partial update state. Deepak performing manual rollback via USB.",
    assignedTech: "Deepak Bansal",
    techPhone: "+91 98765 11006",
    arrivedAt: "2026-04-25 10:00",
    createdAt: "2026-04-24 23:00",
    scheduledAt: "2026-04-25 10:00",
    timeSpentMinutes: 40,
    partsUsed: [],
    labourCost: 600,
    tasks: rfidTasks("wo-04023", 3),
  },
  {
    id: "wo-04024",
    number: "WO-04024",
    stationId: "GPWR-Blr-02",
    stationName: "Whitefield Station",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-02-P5",
    portLabel: "Port 5 (AC 22kW)",
    status: "in-progress",
    priority: "P3",
    issueType: "hardware-failure",
    issueSummary: "Port 5 power board cooling fan seized",
    issueDetail:
      "Thermal warning triggered on Port 5. Cooling fan on the power board is seized. Meenakshi replacing the fan.",
    assignedTech: "Meenakshi Iyer",
    techPhone: "+91 98765 11003",
    arrivedAt: "2026-04-25 11:00",
    createdAt: "2026-04-24 14:00",
    scheduledAt: "2026-04-25 11:00",
    timeSpentMinutes: 50,
    partsUsed: [
      { name: "Brushless Cooling Fan 60mm", qty: 1, unitCost: 480 },
    ],
    labourCost: 600,
    tasks: hwFailureTasks("wo-04024", 2),
  },

  // ── AWAITING PARTS (4) ─────────────────────────────────────────────────────
  {
    id: "wo-04025",
    number: "WO-04025",
    stationId: "GPWR-Goa-03",
    stationName: "Margao Depot",
    stationCity: "Goa",
    portId: "GPWR-Goa-03-P1",
    portLabel: "Port 1 (AC 22kW)",
    status: "awaiting-parts",
    priority: "P1",
    issueType: "hardware-failure",
    issueSummary: "AC inverter board failure, replacement on order",
    issueDetail:
      "Root cause confirmed: AC inverter board failed. Replacement board ordered from supplier. ETA 2 business days. Station remains offline.",
    alertId: "GP-2241",
    assignedTech: "Rajan Pillai",
    techPhone: "+91 98765 11001",
    arrivedAt: "2026-04-23 10:00",
    createdAt: "2026-04-22 06:30",
    scheduledAt: "2026-04-23 09:00",
    timeSpentMinutes: 90,
    partsUsed: [],
    labourCost: 1200,
    tasks: hwFailureTasks("wo-04025", 3),
    resolutionNotes: "Awaiting AC inverter board from Exicom. Expected delivery Apr 28.",
  },
  {
    id: "wo-04026",
    number: "WO-04026",
    stationId: "GPWR-Blr-01",
    stationName: "Koramangala Hub",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-01-P1",
    portLabel: "Port 1 (DC 120kW)",
    status: "awaiting-parts",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "DC 120kW IGBT module failure",
    issueDetail:
      "IGBT module fault confirmed. Station is delivering partial power only. Module is in transit from Bengaluru warehouse.",
    assignedTech: "Meenakshi Iyer",
    techPhone: "+91 98765 11003",
    arrivedAt: "2026-04-22 09:00",
    createdAt: "2026-04-21 15:00",
    scheduledAt: "2026-04-22 09:00",
    timeSpentMinutes: 120,
    partsUsed: [],
    labourCost: 1600,
    tasks: hwFailureTasks("wo-04026", 2),
    resolutionNotes: "IGBT module part number EXC-IGBT-120K dispatched Apr 23, ETA Apr 26.",
  },
  {
    id: "wo-04027",
    number: "WO-04027",
    stationId: "GPWR-Del-02",
    stationName: "Saket District",
    stationCity: "Delhi",
    portId: "GPWR-Del-02-P1",
    portLabel: "Port 1 (DC 60kW)",
    status: "awaiting-parts",
    priority: "P2",
    issueType: "vandalism",
    issueSummary: "LCD touchscreen replacement, panel on order",
    issueDetail:
      "Replacement 7-inch LCD touchscreen panel ordered. Current display shattered from blunt impact. Expected delivery Apr 27.",
    assignedTech: "Suresh Nair",
    techPhone: "+91 98765 11004",
    arrivedAt: "2026-04-23 13:00",
    createdAt: "2026-04-22 09:00",
    scheduledAt: "2026-04-23 13:00",
    timeSpentMinutes: 45,
    partsUsed: [],
    labourCost: 600,
    tasks: screenTasks("wo-04027", 2),
    resolutionNotes: "7-inch TFT panel ordered from Delta Displays. ETA Apr 27.",
  },
  {
    id: "wo-04028",
    number: "WO-04028",
    stationId: "GPWR-Mum-02",
    stationName: "Andheri West",
    stationCity: "Mumbai",
    portId: "GPWR-Mum-02-P6",
    portLabel: "Port 6 (AC 22kW)",
    status: "awaiting-parts",
    priority: "P3",
    issueType: "hardware-failure",
    issueSummary: "RFID reader dead on arrival, replacement ordered",
    issueDetail:
      "RFID reader confirmed dead after swap test. Replacement reader ordered from Mifare supplier. ETA 3 days.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    arrivedAt: "2026-04-22 11:00",
    createdAt: "2026-04-21 10:00",
    scheduledAt: "2026-04-22 11:00",
    timeSpentMinutes: 60,
    partsUsed: [],
    labourCost: 800,
    tasks: rfidTasks("wo-04028", 3),
    resolutionNotes: "RFID reader (Mifare RC522) ordered. ETA Apr 28.",
  },

  // ── COMPLETED (10) ─────────────────────────────────────────────────────────
  {
    id: "wo-04029",
    number: "WO-04029",
    stationId: "GPWR-Goa-02",
    stationName: "Calangute Station",
    stationCity: "Goa",
    portId: "GPWR-Goa-02-P3",
    portLabel: "Port 3 (AC 22kW)",
    status: "completed",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "RFID reader replaced",
    issueDetail:
      "RFID reader on Port 3 was non-responsive. Reader replaced with a new Mifare module. Session initiation confirmed healthy.",
    assignedTech: "Rajan Pillai",
    techPhone: "+91 98765 11001",
    arrivedAt: "2026-04-20 10:00",
    completedAt: "2026-04-20 12:30",
    createdAt: "2026-04-19 14:00",
    scheduledAt: "2026-04-20 10:00",
    timeSpentMinutes: 150,
    partsUsed: [
      { name: "RFID Reader Mifare RC522", qty: 1, unitCost: 4500 },
    ],
    labourCost: 1200,
    tasks: rfidTasks("wo-04029", 6),
    resolutionNotes: "New RFID reader installed and tested. All 6 tasks completed. Station back online.",
  },
  {
    id: "wo-04030",
    number: "WO-04030",
    stationId: "GPWR-Blr-01",
    stationName: "Koramangala Hub",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-01-P5",
    portLabel: "Port 5 (AC 22kW)",
    status: "completed",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Monthly inspection completed",
    issueDetail:
      "Monthly inspection completed. All ports healthy. Fan filters cleaned. Firmware 3.1.4 applied successfully.",
    assignedTech: "Meenakshi Iyer",
    techPhone: "+91 98765 11003",
    arrivedAt: "2026-04-18 09:00",
    completedAt: "2026-04-18 13:00",
    createdAt: "2026-04-15 08:00",
    scheduledAt: "2026-04-18 09:00",
    timeSpentMinutes: 240,
    partsUsed: [
      { name: "Fan filter (replacement)", qty: 2, unitCost: 220 },
    ],
    labourCost: 2400,
    tasks: scheduledTasks("wo-04030", 8),
    resolutionNotes: "All 12 ports tested. Firmware updated to 3.1.4. Station uptime restored to 100%.",
  },
  {
    id: "wo-04031",
    number: "WO-04031",
    stationId: "GPWR-Pune-01",
    stationName: "Hinjewadi IT Park",
    stationCity: "Pune",
    portId: "GPWR-Pune-01-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "completed",
    priority: "P2",
    issueType: "hardware-failure",
    issueSummary: "AC contactor replaced on DC port 2",
    issueDetail:
      "AC contactor replaced. Port delivering full 60kW output post repair. All tasks signed off.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    arrivedAt: "2026-04-17 09:00",
    completedAt: "2026-04-17 12:00",
    createdAt: "2026-04-16 22:00",
    scheduledAt: "2026-04-17 09:00",
    timeSpentMinutes: 180,
    partsUsed: [
      { name: "AC Contactor 40A", qty: 1, unitCost: 2200 },
    ],
    labourCost: 1800,
    tasks: hwFailureTasks("wo-04031", 7),
    resolutionNotes: "Contactor replaced, full power output confirmed. Station health green.",
  },
  {
    id: "wo-04032",
    number: "WO-04032",
    stationId: "GPWR-Del-03",
    stationName: "Sector 62 Noida",
    stationCity: "Delhi NCR",
    portId: "GPWR-Del-03-P5",
    portLabel: "Port 5 (AC 22kW)",
    status: "completed",
    priority: "P3",
    issueType: "hardware-failure",
    issueSummary: "MCB replaced on Port 5",
    issueDetail:
      "MCB on Port 5 was tripping due to current imbalance. Replaced with a new 32A MCB. Port is stable.",
    assignedTech: "Suresh Nair",
    techPhone: "+91 98765 11004",
    arrivedAt: "2026-04-16 10:00",
    completedAt: "2026-04-16 11:30",
    createdAt: "2026-04-16 08:00",
    scheduledAt: "2026-04-16 10:00",
    timeSpentMinutes: 90,
    partsUsed: [
      { name: "MCB 32A Single Pole", qty: 1, unitCost: 850 },
    ],
    labourCost: 800,
    tasks: hwFailureTasks("wo-04032", 7),
    resolutionNotes: "New MCB installed, port stable for 24h post repair. No further trips.",
  },
  {
    id: "wo-04033",
    number: "WO-04033",
    stationId: "GPWR-Hyd-01",
    stationName: "HITEC City Hub",
    stationCity: "Hyderabad",
    portId: "GPWR-Hyd-01-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "completed",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Quarterly service completed",
    issueDetail:
      "All tasks completed. Ports cleaned, firmware checked, 5-minute charge test passed on all ports.",
    assignedTech: "Kavita Sharma",
    techPhone: "+91 98765 11005",
    arrivedAt: "2026-04-15 09:00",
    completedAt: "2026-04-15 13:30",
    createdAt: "2026-04-10 09:00",
    scheduledAt: "2026-04-15 09:00",
    timeSpentMinutes: 270,
    partsUsed: [
      { name: "Fan filter (replacement)", qty: 3, unitCost: 220 },
    ],
    labourCost: 2800,
    tasks: scheduledTasks("wo-04033", 8),
    resolutionNotes: "Quarterly service signed off. Station uptime remains at 97.1%.",
  },
  {
    id: "wo-04034",
    number: "WO-04034",
    stationId: "GPWR-Mum-01",
    stationName: "BKC Charging Hub",
    stationCity: "Mumbai",
    portId: "GPWR-Mum-01-P2",
    portLabel: "Port 2 (DC 60kW)",
    status: "completed",
    priority: "P2",
    issueType: "other",
    issueSummary: "Payment terminal replaced",
    issueDetail:
      "Payment terminal on Port 2 replaced with a new Castles S1 unit. End-to-end transaction verified.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    arrivedAt: "2026-04-14 11:00",
    completedAt: "2026-04-14 13:30",
    createdAt: "2026-04-13 15:00",
    scheduledAt: "2026-04-14 11:00",
    timeSpentMinutes: 150,
    partsUsed: [
      { name: "Payment Terminal Castles S1", qty: 1, unitCost: 8500 },
    ],
    labourCost: 1200,
    tasks: paymentTasks("wo-04034", 6),
    resolutionNotes: "New terminal active. Test transaction INR 10 confirmed received at gateway.",
  },
  {
    id: "wo-04035",
    number: "WO-04035",
    stationId: "GPWR-Che-01",
    stationName: "OMR IT Corridor",
    stationCity: "Chennai",
    portId: "GPWR-Che-01-P3",
    portLabel: "Port 3 (AC 22kW)",
    status: "completed",
    priority: "P3",
    issueType: "hardware-failure",
    issueSummary: "RFID reader replaced on Port 3",
    issueDetail:
      "RFID reader on Port 3 replaced. Card auth confirmed working. Job completed in under 2 hours.",
    assignedTech: "Deepak Bansal",
    techPhone: "+91 98765 11006",
    arrivedAt: "2026-04-12 10:00",
    completedAt: "2026-04-12 11:45",
    createdAt: "2026-04-11 19:00",
    scheduledAt: "2026-04-12 10:00",
    timeSpentMinutes: 105,
    partsUsed: [
      { name: "RFID Reader Mifare RC522", qty: 1, unitCost: 4500 },
    ],
    labourCost: 1000,
    tasks: rfidTasks("wo-04035", 6),
    resolutionNotes: "Reader replaced and re-paired with OCPP backend. Auth working correctly.",
  },
  {
    id: "wo-04036",
    number: "WO-04036",
    stationId: "GPWR-Goa-01",
    stationName: "Panjim Hub",
    stationCity: "Goa",
    status: "completed",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Annual station inspection completed",
    issueDetail:
      "Full annual inspection completed. All cables, connectors, firmware, and electrical terminals checked. No issues found.",
    assignedTech: "Rajan Pillai",
    techPhone: "+91 98765 11001",
    arrivedAt: "2026-04-10 09:00",
    completedAt: "2026-04-10 14:00",
    createdAt: "2026-04-05 09:00",
    scheduledAt: "2026-04-10 09:00",
    timeSpentMinutes: 300,
    partsUsed: [
      { name: "Fan filter (replacement)", qty: 2, unitCost: 220 },
      { name: "Cable holster lubricant", qty: 1, unitCost: 180 },
    ],
    labourCost: 3200,
    tasks: scheduledTasks("wo-04036", 8),
    resolutionNotes: "Annual inspection complete. All 8 ports healthy. Uptime maintained at 99.8%.",
  },
  {
    id: "wo-04037",
    number: "WO-04037",
    stationId: "GPWR-Blr-02",
    stationName: "Whitefield Station",
    stationCity: "Bangalore",
    portId: "GPWR-Blr-02-P3",
    portLabel: "Port 3 (DC 60kW)",
    status: "completed",
    priority: "P1",
    issueType: "hardware-failure",
    issueSummary: "DC port 3 inverter replaced, station back online",
    issueDetail:
      "DC inverter board on Port 3 failed. Full board replacement performed. Station restored to full capacity.",
    alertId: "GP-2101",
    assignedTech: "Meenakshi Iyer",
    techPhone: "+91 98765 11003",
    arrivedAt: "2026-04-08 07:00",
    completedAt: "2026-04-08 12:00",
    createdAt: "2026-04-07 22:00",
    scheduledAt: "2026-04-08 07:00",
    timeSpentMinutes: 300,
    partsUsed: [
      { name: "DC Inverter Board 60kW", qty: 1, unitCost: 18500 },
      { name: "AC Contactor 40A", qty: 1, unitCost: 2200 },
    ],
    labourCost: 3000,
    tasks: hwFailureTasks("wo-04037", 7),
    resolutionNotes: "Full board replacement completed. 60kW output confirmed. Station uptime 97.5%.",
  },
  {
    id: "wo-04038",
    number: "WO-04038",
    stationId: "GPWR-Del-01",
    stationName: "Connaught Place",
    stationCity: "Delhi",
    portId: "GPWR-Del-01-P4",
    portLabel: "Port 4 (DC 60kW)",
    status: "completed",
    priority: "P3",
    issueType: "other",
    issueSummary: "Port 4 lock actuator replaced",
    issueDetail:
      "Lock actuator on Port 4 failing intermittently. Replacement actuator installed. Locking mechanism confirmed operational.",
    assignedTech: "Suresh Nair",
    techPhone: "+91 98765 11004",
    arrivedAt: "2026-04-05 10:00",
    completedAt: "2026-04-05 12:00",
    createdAt: "2026-04-04 14:00",
    scheduledAt: "2026-04-05 10:00",
    timeSpentMinutes: 120,
    partsUsed: [
      { name: "Lock Actuator Solenoid", qty: 1, unitCost: 3200 },
    ],
    labourCost: 1000,
    tasks: lockTasks("wo-04038", 5),
    resolutionNotes: "Actuator replaced and tested with 10 lock/unlock cycles. No failure observed.",
  },

  // ── CANCELLED (2) ──────────────────────────────────────────────────────────
  {
    id: "wo-04039",
    number: "WO-04039",
    stationId: "GPWR-Pune-02",
    stationName: "Kothrud Depot",
    stationCity: "Pune",
    status: "cancelled",
    priority: "P3",
    issueType: "scheduled-service",
    issueSummary: "Scheduled service cancelled, site access denied",
    issueDetail:
      "Technician arrived on-site but building management denied access due to ongoing civil construction. Work order to be rescheduled.",
    assignedTech: "Arjun Deshmukh",
    techPhone: "+91 98765 11002",
    createdAt: "2026-04-10 08:00",
    scheduledAt: "2026-04-12 10:00",
    partsUsed: [],
    labourCost: 0,
    tasks: scheduledTasks("wo-04039"),
    resolutionNotes: "Cancelled: site access denied by building management. Reschedule pending.",
  },
  {
    id: "wo-04040",
    number: "WO-04040",
    stationId: "GPWR-Goa-02",
    stationName: "Calangute Station",
    stationCity: "Goa",
    portId: "GPWR-Goa-02-P5",
    portLabel: "Port 5 (AC 22kW)",
    status: "cancelled",
    priority: "P3",
    issueType: "firmware-issue",
    issueSummary: "Firmware investigation cancelled, issue resolved by OTA",
    issueDetail:
      "The firmware reconnect issue on Port 5 resolved itself after the 3.1.4-hotfix OTA pushed on Apr 19. Work order no longer required.",
    createdAt: "2026-04-18 09:00",
    scheduledAt: "2026-04-20 14:00",
    partsUsed: [],
    labourCost: 0,
    tasks: rfidTasks("wo-04040"),
    resolutionNotes: "Cancelled: issue resolved via OTA 3.1.4-hotfix on Apr 19.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getWorkOrder(id: string): WorkOrder | undefined {
  return ALL_WORK_ORDERS.find((w) => w.id === id);
}

export const STATUS_COUNTS: Record<WOStatus, number> = {
  open: ALL_WORK_ORDERS.filter((w) => w.status === "open").length,
  assigned: ALL_WORK_ORDERS.filter((w) => w.status === "assigned").length,
  "in-progress": ALL_WORK_ORDERS.filter((w) => w.status === "in-progress").length,
  "awaiting-parts": ALL_WORK_ORDERS.filter((w) => w.status === "awaiting-parts").length,
  completed: ALL_WORK_ORDERS.filter((w) => w.status === "completed").length,
  cancelled: ALL_WORK_ORDERS.filter((w) => w.status === "cancelled").length,
};
