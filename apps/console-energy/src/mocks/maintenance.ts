/**
 * Work order mocks — 25 maintenance work orders.
 */

export type WoPriority = "critical" | "high" | "medium" | "low";
export type WoStatus = "open" | "in-progress" | "completed" | "cancelled";
export type WoType = "preventive" | "corrective" | "inspection" | "firmware" | "emergency";

export interface WoTimelineEvent {
  timestamp: string;
  actor: string;
  action: string;
}

export interface WorkOrder {
  id: string;
  siteId: string;
  siteName: string;
  stackId?: string;
  type: WoType;
  priority: WoPriority;
  status: WoStatus;
  title: string;
  description: string;
  assignee: string;
  assigneeEmail: string;
  openedAt: string;
  dueDate: string;
  completedAt?: string;
  estimatedHours: number;
  parts: string[];
  timeline: WoTimelineEvent[];
}

export const ALL_WORK_ORDERS: WorkOrder[] = [
  {
    id: "wo_001", siteId: "site_004", siteName: "Hyderabad Medchal BESS", stackId: "stk_010",
    type: "corrective", priority: "critical", status: "in-progress",
    title: "Cell temperature critical on STK-010 string 3",
    description: "String 3 cell temperature exceeded 65°C threshold. Stack output derated to 60%. Replace thermal management unit and inspect cells.",
    assignee: "Ramesh Kumar", assigneeEmail: "ramesh.k@gridenergy.co.in",
    openedAt: "Apr 27, 17:48", dueDate: "Apr 27, 23:59", estimatedHours: 4,
    parts: ["TMU-BYD-100-S3", "Thermal paste 500g", "Replacement NTC sensors x4"],
    timeline: [
      { timestamp: "Apr 27, 17:48", actor: "System", action: "WO created automatically from alert al_002" },
      { timestamp: "Apr 27, 17:52", actor: "Priya Sharma", action: "Assigned to Ramesh Kumar. Priority: Critical." },
      { timestamp: "Apr 27, 18:10", actor: "Ramesh Kumar", action: "On site. Confirmed cell temperature 68°C on string 3. Stack derated. Parts ordered." },
    ],
  },
  {
    id: "wo_002", siteId: "site_008", siteName: "Coimbatore Arasur BESS",
    type: "preventive", priority: "medium", status: "in-progress",
    title: "Scheduled quarterly maintenance — Q2 2025",
    description: "Full site inspection: BESS cabinet, cooling system, wiring, BMS calibration, fire suppression system check.",
    assignee: "Arjun Senthilkumar", assigneeEmail: "arjun.s@gridenergy.co.in",
    openedAt: "Apr 26, 09:00", dueDate: "Apr 29, 18:00", estimatedHours: 24,
    parts: ["HVAC filter set", "Coolant 10L", "Contact cleaner spray x6", "Safety relay replacement kit"],
    timeline: [
      { timestamp: "Apr 26, 09:00", actor: "Priya Sharma", action: "Maintenance window created. Site taken offline." },
      { timestamp: "Apr 26, 10:30", actor: "Arjun Senthilkumar", action: "Physical inspection started. Cabinet AC unit filter blocked — replaced." },
      { timestamp: "Apr 27, 14:00", actor: "Arjun Senthilkumar", action: "BMS calibration complete. Working on coolant top-up." },
    ],
  },
  {
    id: "wo_003", siteId: "site_001", siteName: "Pune Hinjewadi BESS", stackId: "stk_001",
    type: "firmware", priority: "low", status: "open",
    title: "Upgrade STK-001 and STK-002 to firmware v2.4.1",
    description: "Apply latest firmware v2.4.1 which includes frequency response improvements and minor bug fixes. Schedule during off-peak window.",
    assignee: "Rahul Iyer", assigneeEmail: "rahul.i@gridenergy.co.in",
    openedAt: "Apr 27, 09:00", dueDate: "Apr 30, 12:00", estimatedHours: 2,
    parts: [],
    timeline: [
      { timestamp: "Apr 27, 09:00", actor: "Rahul Iyer", action: "WO created. Firmware v2.4.1 downloaded and verified. Awaiting off-peak window." },
    ],
  },
  {
    id: "wo_004", siteId: "site_016", siteName: "Kochi Smart City BESS",
    type: "emergency", priority: "high", status: "completed",
    title: "Anti-islanding protective disconnect — reconnect inspection",
    description: "Grid reconnection check after automatic islanding-triggered disconnect on Apr 23. Inspect protection relays, re-synchronise BESS.",
    assignee: "Asha Menon", assigneeEmail: "asha.m@gridenergy.co.in",
    openedAt: "Apr 23, 13:30", dueDate: "Apr 23, 17:00", completedAt: "Apr 23, 15:30", estimatedHours: 3,
    parts: ["Protection relay test kit"],
    timeline: [
      { timestamp: "Apr 23, 13:30", actor: "System", action: "Emergency WO created. Anti-islanding disconnect logged." },
      { timestamp: "Apr 23, 13:45", actor: "Asha Menon", action: "On site. Grid isolation confirmed. Beginning relay inspection." },
      { timestamp: "Apr 23, 15:00", actor: "Asha Menon", action: "Relay test passed. Grid re-synchronisation initiated." },
      { timestamp: "Apr 23, 15:30", actor: "Asha Menon", action: "BESS back online. Anti-islanding protection reset and verified. WO closed." },
    ],
  },
  {
    id: "wo_005", siteId: "site_015", siteName: "Visakhapatnam Steel BESS",
    type: "inspection", priority: "medium", status: "open",
    title: "Monthly thermal inspection — Apr 2025",
    description: "Thermal camera scan of all battery stacks. Check coolant lines, cabinet door seals, and ventilation clearance.",
    assignee: "Venkat Rao Galla", assigneeEmail: "venkat.r@gridenergy.co.in",
    openedAt: "Apr 25, 10:00", dueDate: "Apr 30, 18:00", estimatedHours: 6,
    parts: ["Thermal camera batteries", "Seal inspection kit"],
    timeline: [
      { timestamp: "Apr 25, 10:00", actor: "Priya Sharma", action: "Monthly inspection WO created." },
    ],
  },
  {
    id: "wo_006", siteId: "site_002", siteName: "Bengaluru Whitefield BESS", stackId: "stk_005",
    type: "corrective", priority: "high", status: "completed",
    title: "String voltage imbalance on STK-005 — investigated",
    description: "String 2 showed 3.14V vs fleet average 3.28V. Inspection revealed loose terminal connector. Tightened and re-torqued to spec.",
    assignee: "Divya Krishnamurthy", assigneeEmail: "divya.k@gridenergy.co.in",
    openedAt: "Apr 26, 12:00", dueDate: "Apr 27, 12:00", completedAt: "Apr 27, 10:30", estimatedHours: 2,
    parts: ["Torque wrench adaptor"],
    timeline: [
      { timestamp: "Apr 26, 12:00", actor: "Priya Sharma", action: "WO created from alert al_015." },
      { timestamp: "Apr 27, 09:00", actor: "Divya Krishnamurthy", action: "Inspection started. Terminal connector on string 2 loose." },
      { timestamp: "Apr 27, 10:30", actor: "Divya Krishnamurthy", action: "Terminal re-torqued to 25 Nm. Voltage balanced. WO closed." },
    ],
  },
  {
    id: "wo_007", siteId: "site_013", siteName: "Lucknow Amausi BESS",
    type: "corrective", priority: "high", status: "open",
    title: "Site comms failure — restore SCADA link",
    description: "No heartbeat for 2h+ since 10:16. Last status: online. SIM card outage or router failure. UPCL network maintenance window may overlap.",
    assignee: "Ajay Singh", assigneeEmail: "ajay.s@gridenergy.co.in",
    openedAt: "Apr 27, 12:30", dueDate: "Apr 27, 18:00", estimatedHours: 3,
    parts: ["4G SIM card backup", "Router reset cable"],
    timeline: [
      { timestamp: "Apr 27, 12:30", actor: "System", action: "WO auto-created from alert al_004. Site offline > 2h." },
      { timestamp: "Apr 27, 13:00", actor: "Ajay Singh", action: "Remote reset attempted — no response. Dispatching on-site." },
    ],
  },
  {
    id: "wo_008", siteId: "site_003", siteName: "Chennai Sriperumbudur BESS",
    type: "firmware", priority: "medium", status: "open",
    title: "Firmware v2.4.1 rollout — STK-007 to STK-009",
    description: "Schedule firmware upgrade for 3 stacks running v2.3.8 before next DR event scheduled for Apr 28.",
    assignee: "Anita Nair", assigneeEmail: "anita.n@gridenergy.co.in",
    openedAt: "Apr 27, 08:20", dueDate: "Apr 28, 08:00", estimatedHours: 2,
    parts: [],
    timeline: [
      { timestamp: "Apr 27, 08:20", actor: "Rahul Iyer", action: "WO created. Firmware package downloaded to site controller." },
    ],
  },
  {
    id: "wo_009", siteId: "site_009", siteName: "Kolkata Salt Lake BESS",
    type: "corrective", priority: "medium", status: "open",
    title: "Communication latency investigation — 420ms avg",
    description: "Persistent high RTT on SCADA link. Could be ISP throttling or internal switch issue. Diagnose and resolve.",
    assignee: "Dipak Sen", assigneeEmail: "dipak.s@gridenergy.co.in",
    openedAt: "Apr 24, 22:30", dueDate: "Apr 28, 17:00", estimatedHours: 4,
    parts: ["Network cable tester"],
    timeline: [
      { timestamp: "Apr 24, 22:30", actor: "Dipak Sen", action: "WO created from alert al_021. Latency monitoring active." },
    ],
  },
  {
    id: "wo_010", siteId: "site_005", siteName: "Mumbai Bhiwandi BESS",
    type: "preventive", priority: "low", status: "completed",
    title: "Routine coolant level check and top-up",
    description: "Scheduled monthly coolant inspection. Top up if below minimum line. Check for leaks.",
    assignee: "Nikhil Mehta", assigneeEmail: "nikhil.m@gridenergy.co.in",
    openedAt: "Apr 20, 09:00", dueDate: "Apr 22, 17:00", completedAt: "Apr 21, 14:00", estimatedHours: 1,
    parts: ["Coolant BYD Type-A 2L"],
    timeline: [
      { timestamp: "Apr 20, 09:00", actor: "Priya Sharma", action: "WO created — monthly routine." },
      { timestamp: "Apr 21, 14:00", actor: "Nikhil Mehta", action: "Coolant level 85%. Topped to 100%. No leaks. WO closed." },
    ],
  },
  {
    id: "wo_011", siteId: "site_006", siteName: "Delhi Noida Sector 62 BESS",
    type: "inspection", priority: "medium", status: "open",
    title: "SoC threshold review — charging schedule optimisation",
    description: "Site SoC at 38% during peak hours. Review off-peak charging schedule and adjust to ensure adequate charge buffer.",
    assignee: "Sunita Puri", assigneeEmail: "sunita.p@gridenergy.co.in",
    openedAt: "Apr 27, 09:42", dueDate: "Apr 28, 12:00", estimatedHours: 1,
    parts: [],
    timeline: [
      { timestamp: "Apr 27, 09:42", actor: "System", action: "WO created from alert al_006 — SoC threshold breach." },
    ],
  },
  {
    id: "wo_012", siteId: "site_014", siteName: "Bhopal Mandideep BESS",
    type: "corrective", priority: "medium", status: "completed",
    title: "Capacitor bank failure — reactive compensation bypass",
    description: "Capacitor bank CB-1 failed. BESS providing reactive compensation in the interim. Capacitor bank replaced.",
    assignee: "Ramesh Gupta", assigneeEmail: "ramesh.g@gridenergy.co.in",
    openedAt: "Apr 18, 11:20", dueDate: "Apr 19, 17:00", completedAt: "Apr 19, 14:00", estimatedHours: 6,
    parts: ["Capacitor bank CB-1 replacement", "Contactor set 32A"],
    timeline: [
      { timestamp: "Apr 18, 11:20", actor: "Ramesh Gupta", action: "WO created. CB-1 found failed. BESS reactive mode activated." },
      { timestamp: "Apr 19, 10:00", actor: "Ramesh Gupta", action: "Replacement capacitor bank received and installed." },
      { timestamp: "Apr 19, 14:00", actor: "Ramesh Gupta", action: "CB-1 installed and tested. BESS reactive mode deactivated. WO closed." },
    ],
  },
  {
    id: "wo_013", siteId: "site_017", siteName: "Gurgaon Manesar BESS",
    type: "inspection", priority: "low", status: "open",
    title: "Post-event review — frequency dispatch Apr 22",
    description: "Review frequency event log from Apr 22 20:17. Verify response time, MW dispatched, and protection relay behaviour.",
    assignee: "Suresh Kumar", assigneeEmail: "suresh.k@gridenergy.co.in",
    openedAt: "Apr 22, 21:00", dueDate: "Apr 25, 17:00", estimatedHours: 2,
    parts: [],
    timeline: [
      { timestamp: "Apr 22, 21:00", actor: "Suresh Kumar", action: "Post-event WO created. Logs downloaded." },
    ],
  },
  {
    id: "wo_014", siteId: "site_012", siteName: "Surat Sachin BESS",
    type: "corrective", priority: "medium", status: "completed",
    title: "Reactive compensation mode after capacitor trip",
    description: "BESS providing reactive compensation after site capacitor bank tripped. Monitor until utility restores capacitor.",
    assignee: "Hiren Patel", assigneeEmail: "hiren.p@gridenergy.co.in",
    openedAt: "Apr 22, 16:10", dueDate: "Apr 22, 20:00", completedAt: "Apr 22, 19:30", estimatedHours: 3,
    parts: [],
    timeline: [
      { timestamp: "Apr 22, 16:10", actor: "System", action: "WO auto-created from grid event reactive support." },
      { timestamp: "Apr 22, 19:30", actor: "Hiren Patel", action: "Utility capacitor bank restored. PF normal. BESS reactive mode off. WO closed." },
    ],
  },
  {
    id: "wo_015", siteId: "site_022", siteName: "Guwahati Amingaon BESS",
    type: "inspection", priority: "high", status: "open",
    title: "Pre-commissioning final check — new site",
    description: "Final commissioning checklist: protection scheme test, BMS communication verify, first charge cycle, SCADA handshake.",
    assignee: "Rahul Iyer", assigneeEmail: "rahul.i@gridenergy.co.in",
    openedAt: "Apr 26, 09:00", dueDate: "Apr 30, 17:00", estimatedHours: 16,
    parts: ["Commissioning toolkit", "Test meters x2", "SCADA configuration laptop"],
    timeline: [
      { timestamp: "Apr 26, 09:00", actor: "Priya Sharma", action: "Commissioning WO created. Equipment delivered." },
    ],
  },
  {
    id: "wo_016", siteId: "site_010", siteName: "Jaipur Sitapura BESS",
    type: "preventive", priority: "low", status: "completed",
    title: "Annual protection relay calibration",
    description: "Scheduled annual test and calibration of all protection relays per IEC 60255.",
    assignee: "Mahendra Singh", assigneeEmail: "mahendra.s@gridenergy.co.in",
    openedAt: "Apr 15, 09:00", dueDate: "Apr 18, 18:00", completedAt: "Apr 17, 16:00", estimatedHours: 8,
    parts: ["Relay test injection kit"],
    timeline: [
      { timestamp: "Apr 15, 09:00", actor: "Priya Sharma", action: "Annual relay calibration WO." },
      { timestamp: "Apr 17, 16:00", actor: "Mahendra Singh", action: "All relays calibrated. Test report saved. WO closed." },
    ],
  },
  {
    id: "wo_017", siteId: "site_011", siteName: "Nagpur Butibori BESS",
    type: "preventive", priority: "low", status: "open",
    title: "Quarterly fire suppression system check",
    description: "Test FM-200 fire suppression system: panel, sensor calibration, cylinder pressure, discharge test with dummy load.",
    assignee: "Vinod Patil", assigneeEmail: "vinod.p@gridenergy.co.in",
    openedAt: "Apr 25, 10:00", dueDate: "Apr 29, 17:00", estimatedHours: 4,
    parts: ["FM-200 refill cylinder", "Calibration tool"],
    timeline: [],
  },
  {
    id: "wo_018", siteId: "site_019", siteName: "Vadodara Savli BESS",
    type: "inspection", priority: "low", status: "completed",
    title: "Monthly SoH assessment — Apr 2025",
    description: "Capacity fade analysis from cycle data. Compare estimated vs rated capacity. Flag any stacks below 90% SoH.",
    assignee: "Hiren Desai", assigneeEmail: "hiren.d@gridenergy.co.in",
    openedAt: "Apr 20, 09:00", dueDate: "Apr 25, 18:00", completedAt: "Apr 24, 11:00", estimatedHours: 3,
    parts: [],
    timeline: [
      { timestamp: "Apr 20, 09:00", actor: "Rahul Iyer", action: "Monthly SoH assessment WO created." },
      { timestamp: "Apr 24, 11:00", actor: "Hiren Desai", action: "Analysis complete. All stacks 92% SoH and above. No action required. WO closed." },
    ],
  },
  {
    id: "wo_019", siteId: "site_020", siteName: "Mysuru Hebbal BESS",
    type: "inspection", priority: "low", status: "completed",
    title: "Post-frequency event check — Apr 19",
    description: "Review event logs from 49.78 Hz dispatch on Apr 19 21:22. Verify response time, protection settings, and battery health.",
    assignee: "Rekha Shetty", assigneeEmail: "rekha.s@gridenergy.co.in",
    openedAt: "Apr 19, 22:00", dueDate: "Apr 21, 17:00", completedAt: "Apr 20, 14:00", estimatedHours: 2,
    parts: [],
    timeline: [
      { timestamp: "Apr 19, 22:00", actor: "Rekha Shetty", action: "Post-event WO created." },
      { timestamp: "Apr 20, 14:00", actor: "Rekha Shetty", action: "Log review complete. Response time 0.38 sec, within spec. WO closed." },
    ],
  },
  {
    id: "wo_020", siteId: "site_024", siteName: "Bhubaneswar Khordha BESS",
    type: "preventive", priority: "low", status: "open",
    title: "Scheduled 6-month wiring inspection",
    description: "Visual inspection of all DC and AC wiring, busbar connections, terminal tightness, and cable tray integrity.",
    assignee: "Ajay Singh", assigneeEmail: "ajay.s@gridenergy.co.in",
    openedAt: "Apr 24, 09:00", dueDate: "Apr 28, 18:00", estimatedHours: 6,
    parts: ["Thermal camera", "Torque wrench set"],
    timeline: [],
  },
  {
    id: "wo_021", siteId: "site_007", siteName: "Ahmedabad Changodar BESS",
    type: "corrective", priority: "high", status: "completed",
    title: "Voltage swell reactive absorption — cooldown check",
    description: "Post-swell reactive absorption session on Apr 25. Check stack temperatures and cooling system status.",
    assignee: "Bhavesh Shah", assigneeEmail: "bhavesh.s@gridenergy.co.in",
    openedAt: "Apr 25, 17:00", dueDate: "Apr 25, 20:00", completedAt: "Apr 25, 19:00", estimatedHours: 2,
    parts: [],
    timeline: [
      { timestamp: "Apr 25, 17:00", actor: "Bhavesh Shah", action: "Post-swell check initiated." },
      { timestamp: "Apr 25, 19:00", actor: "Bhavesh Shah", action: "All stack temps nominal. Cooling system working. WO closed." },
    ],
  },
  {
    id: "wo_022", siteId: "site_018", siteName: "Indore Pithampur BESS",
    type: "preventive", priority: "low", status: "open",
    title: "Renewable integration optimisation review",
    description: "Analyse charge-discharge patterns vs solar PV output from adjacent 2 MW rooftop. Recommend schedule adjustments for better arbitrage.",
    assignee: "Meena Joshi", assigneeEmail: "meena.j@gridenergy.co.in",
    openedAt: "Apr 26, 10:00", dueDate: "Apr 30, 17:00", estimatedHours: 4,
    parts: [],
    timeline: [],
  },
  {
    id: "wo_023", siteId: "site_023", siteName: "Ludhiana Focal Point BESS",
    type: "inspection", priority: "medium", status: "open",
    title: "Quarterly grounding and bonding inspection",
    description: "Measure earth resistance at all grounding points. Verify bonding continuity. Required for insurance renewal.",
    assignee: "Ajay Singh", assigneeEmail: "ajay.s@gridenergy.co.in",
    openedAt: "Apr 24, 10:00", dueDate: "Apr 30, 17:00", estimatedHours: 3,
    parts: ["Earth resistance tester"],
    timeline: [],
  },
  {
    id: "wo_024", siteId: "site_004", siteName: "Hyderabad Medchal BESS",
    type: "corrective", priority: "high", status: "open",
    title: "SCADA polling interval drift — reconfigure",
    description: "SCADA logs show 2-second polling drift at peak load. Likely NTP sync issue. Reconfigure NTP server on site controller.",
    assignee: "Kavitha Reddy", assigneeEmail: "kavitha.r@gridenergy.co.in",
    openedAt: "Apr 26, 15:00", dueDate: "Apr 28, 12:00", estimatedHours: 1,
    parts: [],
    timeline: [
      { timestamp: "Apr 26, 15:00", actor: "Kavitha Reddy", action: "Issue identified during frequency event review. WO created." },
    ],
  },
  {
    id: "wo_025", siteId: "site_021", siteName: "Patna Hajipur BESS",
    type: "preventive", priority: "low", status: "cancelled",
    title: "Coolant system flush — scheduled Apr 2025",
    description: "Annual coolant flush and replacement. Cancelled — rescheduled to Jun 2025 due to technician availability.",
    assignee: "Rahul Iyer", assigneeEmail: "rahul.i@gridenergy.co.in",
    openedAt: "Apr 10, 09:00", dueDate: "Apr 20, 17:00", estimatedHours: 4,
    parts: ["Coolant flush solution 5L", "Fresh coolant 10L"],
    timeline: [
      { timestamp: "Apr 10, 09:00", actor: "Priya Sharma", action: "WO created for annual flush." },
      { timestamp: "Apr 18, 11:00", actor: "Priya Sharma", action: "WO cancelled — rescheduled to June 2025." },
    ],
  },
];
