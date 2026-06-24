/**
 * Alert mock fixtures for the GridCharge alert center.
 * ~50 records spanning the last 7 days.
 * Severity mix: 5% critical, 35% warning, 60% info
 * Status mix: 25% open, 30% ack'd, 35% resolved, 10% snoozed
 * Sources: 70% system, 20% integration, 10% manual
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type AlertSeverity = "critical" | "warning" | "info";
export type AlertStatus = "open" | "acked" | "resolved" | "snoozed";
export type AlertSource = "system" | "manual" | "integration";

export interface AlertComment {
  id: string;
  author: string;
  authorInitial: string;
  text: string;
  created_at: string; // ISO 8601
}

export interface AlertRecord {
  id: string;
  severity: AlertSeverity;
  source: AlertSource;
  station_id: string;
  station_name: string;
  port_id?: string;
  session_id?: string;
  message: string;
  /** Structured technical detail — raw OCPP payload, last heartbeat, etc. */
  technical_detail: Record<string, unknown>;
  created_at: string; // ISO 8601
  acked_by?: string;
  acked_at?: string;
  resolved_by?: string;
  resolved_at?: string;
  snoozed_until?: string;
  comments: AlertComment[];
}

// ─── Station name lookup (mirrors stations mock for cross-links) ───────────

const STATION_MAP: Record<string, string> = {
  "s1":  "GridPower-Del-03",
  "s2":  "GridPower-Blr-01",
  "s3":  "GridPower-Mum-02",
  "s4":  "GridPower-Hyd-01",
  "s5":  "GridPower-Pune-01",
  "s6":  "GridPower-Goa-01",
  "s7":  "GridPower-Del-01",
  "s8":  "GridPower-Blr-03",
  "s9":  "GridPower-Che-01",
  "s10": "GridPower-Mum-04",
  "s11": "GridPower-Hyd-04",
  "s12": "GridPower-Del-02",
  "s13": "GridPower-Pune-02",
  "s14": "GridPower-Mum-03",
  "s15": "GridPower-Goa-03",
};

function sn(id: string): string {
  return STATION_MAP[id] ?? id;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns an ISO string N minutes before "now" (anchored to 2026-04-25T09:00:00Z). */
function minsAgo(minutes: number): string {
  const now = new Date("2026-04-25T09:00:00Z");
  return new Date(now.getTime() - minutes * 60_000).toISOString();
}

function hoursAgo(hours: number): string {
  return minsAgo(hours * 60);
}

function daysAgo(days: number): string {
  return minsAgo(days * 24 * 60);
}

// ─── Shared comment sets ──────────────────────────────────────────────────────

const noComments: AlertComment[] = [];

function mkComment(
  id: string,
  author: string,
  initial: string,
  text: string,
  offsetMins: number,
  baseTime: string,
): AlertComment {
  const base = new Date(baseTime);
  return {
    id,
    author,
    authorInitial: initial,
    text,
    created_at: new Date(base.getTime() + offsetMins * 60_000).toISOString(),
  };
}

// ─── Alert records (50 entries) ───────────────────────────────────────────────

export const ALL_ALERTS: AlertRecord[] = [
  // ── CRITICAL (3 records) ────────────────────────────────────────────────────

  {
    id: "alrt-001",
    severity: "critical",
    source: "system",
    station_id: "s15",
    station_name: sn("s15"),
    message: "Station offline — no heartbeat for 47 minutes",
    technical_detail: {
      ocpp_error_code: "GenericError",
      last_heartbeat_at: minsAgo(47),
      last_boot_notification_at: daysAgo(2),
      connection_state: "disconnected",
      ping_attempts: 3,
      firmware_version: "2.3.8",
    },
    created_at: minsAgo(47),
    comments: [
      mkComment("c-001-1", "Anita Verma", "A", "Dispatching field team to inspect site.", 5, minsAgo(47)),
    ],
    status: "open",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-002",
    severity: "critical",
    source: "system",
    station_id: "s12",
    station_name: sn("s12"),
    port_id: "p3",
    message: "Cell over-temp warning on stack 3 — charging halted",
    technical_detail: {
      ocpp_error_code: "HighTemperature",
      connector_id: 3,
      temperature_celsius: 78.4,
      threshold_celsius: 72.0,
      last_heartbeat_at: minsAgo(8),
      stack_id: "STK-03",
      action_taken: "ChargeHalted",
    },
    created_at: minsAgo(8),
    comments: noComments,
    status: "open",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-003",
    severity: "critical",
    source: "integration",
    station_id: "s5",
    station_name: sn("s5"),
    message: "OCPP comm error: code 1034 — persistent connection failure",
    technical_detail: {
      ocpp_error_code: "1034",
      description: "WebSocket connection failed to re-establish after 10 retries",
      retry_count: 10,
      last_successful_message_at: hoursAgo(3),
      firmware_version: "2.4.0",
      client_ip: "10.12.34.201",
    },
    created_at: hoursAgo(3),
    acked_by: "Rahul Sharma",
    acked_at: hoursAgo(2),
    comments: [
      mkComment("c-003-1", "Rahul Sharma", "R", "Acknowledged. Checking network logs with ISP.", 62, hoursAgo(3)),
      mkComment("c-003-2", "Rahul Sharma", "R", "ISP confirmed packet loss on that cell segment. Ticket raised.", 90, hoursAgo(3)),
    ],
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  // ── WARNING (18 records) ─────────────────────────────────────────────────────

  {
    id: "alrt-004",
    severity: "warning",
    source: "system",
    station_id: "s2",
    station_name: sn("s2"),
    port_id: "p2",
    message: "High temperature on port 2 — investigating",
    technical_detail: {
      ocpp_error_code: "HighTemperature",
      connector_id: 2,
      temperature_celsius: 68.1,
      threshold_celsius: 70.0,
      last_heartbeat_at: minsAgo(34),
    },
    created_at: minsAgo(34),
    comments: noComments,
    status: "open",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-005",
    severity: "warning",
    source: "system",
    station_id: "s11",
    station_name: sn("s11"),
    message: "Revenue below daily average by 28%",
    technical_detail: {
      daily_average_inr: 2156,
      today_revenue_inr: 1552,
      deviation_pct: -28,
      comparison_window_days: 7,
    },
    created_at: hoursAgo(3),
    acked_by: "Priya Menon",
    acked_at: hoursAgo(2),
    comments: [
      mkComment("c-005-1", "Priya Menon", "P", "Station is functional. Low traffic — will monitor through evening peak.", 65, hoursAgo(3)),
    ],
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-006",
    severity: "warning",
    source: "system",
    station_id: "s8",
    station_name: sn("s8"),
    port_id: "p1",
    message: "Port 1 stuck in 'preparing' state for 14 minutes",
    technical_detail: {
      ocpp_error_code: "InternalError",
      connector_id: 1,
      stuck_state: "Preparing",
      stuck_since: minsAgo(14),
      last_transaction_id: "T-40289",
    },
    created_at: minsAgo(14),
    comments: noComments,
    status: "open",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-007",
    severity: "warning",
    source: "system",
    station_id: "s14",
    station_name: sn("s14"),
    port_id: "p1",
    message: "Port 1 utilisation at 98% — near capacity",
    technical_detail: {
      connector_id: 1,
      utilisation_pct: 98,
      threshold_pct: 95,
      peak_window: "12:00-14:00",
    },
    created_at: hoursAgo(5),
    acked_by: "Suresh Krishnan",
    acked_at: hoursAgo(4),
    comments: noComments,
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-008",
    severity: "warning",
    source: "system",
    station_id: "s8",
    station_name: sn("s8"),
    message: "Scheduled maintenance in 2 hours",
    technical_detail: {
      maintenance_window_start: hoursAgo(-2),
      maintenance_window_end: hoursAgo(-4),
      maintenance_type: "Preventive",
      technician: "Field Team B",
    },
    created_at: hoursAgo(8),
    resolved_by: "System",
    resolved_at: hoursAgo(6),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-009",
    severity: "warning",
    source: "integration",
    station_id: "s4",
    station_name: sn("s4"),
    message: "Network latency spike — monitoring",
    technical_detail: {
      latency_ms: 1240,
      baseline_ms: 180,
      spike_factor: 6.9,
      measured_at: hoursAgo(12),
      network_provider: "Jio Fiber",
    },
    created_at: hoursAgo(12),
    resolved_by: "Rahul Sharma",
    resolved_at: hoursAgo(9),
    comments: [
      mkComment("c-009-1", "Rahul Sharma", "R", "Resolved. Latency returned to normal after ISP-side reset.", 180, hoursAgo(12)),
    ],
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-010",
    severity: "warning",
    source: "system",
    station_id: "s1",
    station_name: sn("s1"),
    message: "Payment gateway timeout on session GC-04012",
    technical_detail: {
      session_id: "GC-04012",
      gateway: "Razorpay",
      timeout_ms: 32000,
      threshold_ms: 10000,
      retry_count: 2,
      outcome: "SessionEnded_NoPayment",
    },
    created_at: daysAgo(1),
    acked_by: "Finance Ops",
    acked_at: daysAgo(1),
    comments: [
      mkComment("c-010-1", "Finance Ops", "F", "Logged with Razorpay support. Ticket #RZP-88234.", 30, daysAgo(1)),
    ],
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-011",
    severity: "warning",
    source: "system",
    station_id: "s7",
    station_name: sn("s7"),
    session_id: "GC-04018",
    message: "RFID card declined: insufficient balance — driver informed",
    technical_detail: {
      rfid_uid: "04:A2:3B:8F:12:AA",
      decline_reason: "InsufficientBalance",
      balance_inr: 12.4,
      required_inr: 50.0,
      session_id: "GC-04018",
    },
    created_at: daysAgo(1),
    resolved_by: "System",
    resolved_at: daysAgo(1),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-012",
    severity: "warning",
    source: "system",
    station_id: "s3",
    station_name: sn("s3"),
    port_id: "p3",
    message: "Connector latch failure on port 3",
    technical_detail: {
      ocpp_error_code: "ConnectorLockFailure",
      connector_id: 3,
      failure_count_24h: 4,
      last_occurrence_at: daysAgo(2),
      recommended_action: "Physical inspection required",
    },
    created_at: daysAgo(2),
    acked_by: "Anita Verma",
    acked_at: daysAgo(2),
    resolved_by: "Field Team A",
    resolved_at: daysAgo(1),
    comments: [
      mkComment("c-012-1", "Anita Verma", "A", "Assigned to field team for latch replacement.", 20, daysAgo(2)),
      mkComment("c-012-2", "Field Team A", "F", "Latch replaced and tested. Port 3 back in service.", 1440, daysAgo(2)),
    ],
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-013",
    severity: "warning",
    source: "system",
    station_id: "s6",
    station_name: sn("s6"),
    message: "Revenue below daily average by 15%",
    technical_detail: {
      daily_average_inr: 4998,
      today_revenue_inr: 4248,
      deviation_pct: -15,
      comparison_window_days: 7,
    },
    created_at: daysAgo(3),
    resolved_by: "System",
    resolved_at: daysAgo(2),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-014",
    severity: "warning",
    source: "system",
    station_id: "s10",
    station_name: sn("s10"),
    port_id: "p2",
    message: "Port 2 stuck in 'preparing' state for 22 minutes",
    technical_detail: {
      ocpp_error_code: "InternalError",
      connector_id: 2,
      stuck_state: "Preparing",
      stuck_since: daysAgo(3),
      last_transaction_id: "T-39100",
    },
    created_at: daysAgo(3),
    snoozed_until: new Date("2026-04-25T13:00:00Z").toISOString(),
    comments: noComments,
    status: "snoozed",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-015",
    severity: "warning",
    source: "integration",
    station_id: "s9",
    station_name: sn("s9"),
    session_id: "GC-03988",
    message: "Payment gateway timeout on session GC-03988",
    technical_detail: {
      session_id: "GC-03988",
      gateway: "PayU",
      timeout_ms: 28000,
      threshold_ms: 10000,
      retry_count: 3,
      outcome: "ManualReconciliationRequired",
    },
    created_at: daysAgo(4),
    resolved_by: "Finance Ops",
    resolved_at: daysAgo(4),
    comments: [
      mkComment("c-015-1", "Finance Ops", "F", "Reconciled manually. Driver credited ₹180.", 120, daysAgo(4)),
    ],
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-016",
    severity: "warning",
    source: "system",
    station_id: "s13",
    station_name: sn("s13"),
    message: "High temperature on port 1 — auto-derated to 60%",
    technical_detail: {
      ocpp_error_code: "HighTemperature",
      connector_id: 1,
      temperature_celsius: 71.8,
      threshold_celsius: 70.0,
      derate_pct: 60,
      ambient_temp_celsius: 42.5,
    },
    created_at: daysAgo(4),
    acked_by: "Suresh Krishnan",
    acked_at: daysAgo(4),
    resolved_by: "System",
    resolved_at: daysAgo(3),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-017",
    severity: "warning",
    source: "system",
    station_id: "s4",
    station_name: sn("s4"),
    message: "Network latency spike during peak hours",
    technical_detail: {
      latency_ms: 980,
      baseline_ms: 160,
      spike_factor: 6.1,
      measured_at: daysAgo(5),
    },
    created_at: daysAgo(5),
    snoozed_until: new Date("2026-04-26T08:00:00Z").toISOString(),
    comments: noComments,
    status: "snoozed",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-018",
    severity: "warning",
    source: "manual",
    station_id: "s2",
    station_name: sn("s2"),
    message: "Graffiti reported on station enclosure — cosmetic only",
    technical_detail: {
      reporter: "Field Team C",
      report_method: "Manual",
      severity_note: "Cosmetic only, no functional impact",
    },
    created_at: daysAgo(5),
    resolved_by: "Operations",
    resolved_at: daysAgo(4),
    comments: [
      mkComment("c-018-1", "Operations", "O", "Cleaning crew scheduled for tomorrow.", 30, daysAgo(5)),
    ],
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-019",
    severity: "warning",
    source: "system",
    station_id: "s1",
    station_name: sn("s1"),
    port_id: "p1",
    message: "Port 1 utilisation at 97% — near capacity",
    technical_detail: {
      connector_id: 1,
      utilisation_pct: 97,
      threshold_pct: 95,
      peak_window: "17:00-20:00",
    },
    created_at: daysAgo(6),
    resolved_by: "System",
    resolved_at: daysAgo(6),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-020",
    severity: "warning",
    source: "integration",
    station_id: "s7",
    station_name: sn("s7"),
    message: "Slack mention: station door ajar reported by driver",
    technical_detail: {
      slack_channel: "#field-reports",
      slack_message_ts: "1745541200.123456",
      reporter: "Vikram S.",
      notes: "Driver reported door not fully closed after session",
    },
    created_at: daysAgo(6),
    acked_by: "Anita Verma",
    acked_at: daysAgo(6),
    resolved_by: "Field Team B",
    resolved_at: daysAgo(5),
    comments: [
      mkComment("c-020-1", "Anita Verma", "A", "Sent field team to inspect and secure.", 45, daysAgo(6)),
    ],
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-021",
    severity: "warning",
    source: "system",
    station_id: "s14",
    station_name: sn("s14"),
    message: "Revenue below daily average by 22%",
    technical_detail: {
      daily_average_inr: 1274,
      today_revenue_inr: 993,
      deviation_pct: -22,
      comparison_window_days: 7,
    },
    created_at: daysAgo(7),
    resolved_by: "System",
    resolved_at: daysAgo(6),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  // ── INFO (29 records) ────────────────────────────────────────────────────────

  {
    id: "alrt-022",
    severity: "info",
    source: "system",
    station_id: "s1",
    station_name: sn("s1"),
    message: "Firmware update 2.4.1 available — 8 stations eligible",
    technical_detail: {
      firmware_version_available: "2.4.1",
      current_version: "2.4.0",
      eligible_station_count: 8,
      release_notes_url: "https://firmware.gridpower.in/2.4.1",
    },
    created_at: hoursAgo(1),
    comments: noComments,
    status: "open",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-023",
    severity: "info",
    source: "system",
    station_id: "s9",
    station_name: sn("s9"),
    message: "New station provisioned and ready for commissioning",
    technical_detail: {
      provisioning_id: "PROV-4421",
      provisioned_at: hoursAgo(6),
      model: "GridPower DC-120 Pro",
      assigned_network: "Che-South",
    },
    created_at: hoursAgo(6),
    acked_by: "Operations",
    acked_at: hoursAgo(5),
    comments: noComments,
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-024",
    severity: "info",
    source: "system",
    station_id: "s13",
    station_name: sn("s13"),
    message: "Station came online after maintenance window",
    technical_detail: {
      maintenance_completed_at: hoursAgo(2),
      downtime_minutes: 142,
      technician: "Field Team A",
      work_order_id: "WO-7712",
    },
    created_at: hoursAgo(2),
    comments: noComments,
    status: "open",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-025",
    severity: "info",
    source: "system",
    station_id: "s6",
    station_name: sn("s6"),
    message: "Firmware update 2.4.0 applied successfully",
    technical_detail: {
      firmware_version: "2.4.0",
      previous_version: "2.3.9",
      applied_at: hoursAgo(11),
      reboot_duration_seconds: 38,
    },
    created_at: hoursAgo(11),
    resolved_by: "System",
    resolved_at: hoursAgo(11),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-026",
    severity: "info",
    source: "system",
    station_id: "s1",
    station_name: sn("s1"),
    message: "Revenue target for today exceeded",
    technical_detail: {
      target_inr: 8000,
      achieved_inr: 8420,
      achieved_pct: 105.3,
      as_of: hoursAgo(7),
    },
    created_at: hoursAgo(7),
    resolved_by: "System",
    resolved_at: hoursAgo(7),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-027",
    severity: "info",
    source: "system",
    station_id: "s3",
    station_name: sn("s3"),
    message: "Demand surge predicted 17:00-19:00 — load balancing active",
    technical_detail: {
      predicted_sessions: 12,
      baseline_sessions: 4,
      load_balance_strategy: "RoundRobin",
      tariff_adjustment: "none",
    },
    created_at: hoursAgo(13),
    acked_by: "Priya Menon",
    acked_at: hoursAgo(12),
    comments: noComments,
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-028",
    severity: "info",
    source: "system",
    station_id: "s5",
    station_name: sn("s5"),
    message: "Monthly billing cycle completed — invoices sent",
    technical_detail: {
      billing_period: "April 2026",
      invoices_generated: 214,
      total_billed_inr: 184200,
      sent_at: daysAgo(1),
    },
    created_at: daysAgo(1),
    resolved_by: "System",
    resolved_at: daysAgo(1),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-029",
    severity: "info",
    source: "integration",
    station_id: "s2",
    station_name: sn("s2"),
    message: "Slack mention: driver praised fast charging speed",
    technical_detail: {
      slack_channel: "#driver-feedback",
      slack_message_ts: "1745541200.234567",
      sentiment: "positive",
    },
    created_at: daysAgo(1),
    resolved_by: "System",
    resolved_at: daysAgo(1),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-030",
    severity: "info",
    source: "system",
    station_id: "s4",
    station_name: sn("s4"),
    message: "Station came online after scheduled maintenance",
    technical_detail: {
      maintenance_completed_at: daysAgo(1),
      downtime_minutes: 90,
      technician: "Field Team C",
    },
    created_at: daysAgo(1),
    resolved_by: "System",
    resolved_at: daysAgo(1),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-031",
    severity: "info",
    source: "system",
    station_id: "s7",
    station_name: sn("s7"),
    message: "Firmware update 2.4.0 applied successfully",
    technical_detail: {
      firmware_version: "2.4.0",
      previous_version: "2.3.8",
      applied_at: daysAgo(1),
      reboot_duration_seconds: 41,
    },
    created_at: daysAgo(1),
    resolved_by: "System",
    resolved_at: daysAgo(1),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-032",
    severity: "info",
    source: "system",
    station_id: "s10",
    station_name: sn("s10"),
    message: "RFID card declined: card not provisioned in network",
    technical_detail: {
      rfid_uid: "07:BC:11:20:48:DE",
      decline_reason: "UnknownToken",
      network: "GridCharge-National",
    },
    created_at: daysAgo(2),
    resolved_by: "System",
    resolved_at: daysAgo(2),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-033",
    severity: "info",
    source: "system",
    station_id: "s8",
    station_name: sn("s8"),
    message: "Revenue target for today exceeded — 112% of goal",
    technical_detail: {
      target_inr: 3500,
      achieved_inr: 3724,
      achieved_pct: 112.1,
      as_of: daysAgo(2),
    },
    created_at: daysAgo(2),
    resolved_by: "System",
    resolved_at: daysAgo(2),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-034",
    severity: "info",
    source: "system",
    station_id: "s11",
    station_name: sn("s11"),
    message: "Firmware update 2.4.1 available for this station",
    technical_detail: {
      firmware_version_available: "2.4.1",
      current_version: "2.3.9",
      release_notes_url: "https://firmware.gridpower.in/2.4.1",
    },
    created_at: daysAgo(2),
    acked_by: "Suresh Krishnan",
    acked_at: daysAgo(2),
    comments: noComments,
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-035",
    severity: "info",
    source: "manual",
    station_id: "s6",
    station_name: sn("s6"),
    message: "Site owner requested cable management inspection",
    technical_detail: {
      reporter: "Site Owner — GCC Properties",
      contact: "manager@gccproperties.co.in",
      notes: "Cables visible at south panel. Cosmetic concern.",
    },
    created_at: daysAgo(2),
    snoozed_until: new Date("2026-04-28T09:00:00Z").toISOString(),
    comments: [
      mkComment("c-035-1", "Priya Menon", "P", "Snoozing until next scheduled visit (Tue).", 20, daysAgo(2)),
    ],
    status: "snoozed",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-036",
    severity: "info",
    source: "system",
    station_id: "s9",
    station_name: sn("s9"),
    message: "Station came online after power outage",
    technical_detail: {
      outage_duration_minutes: 28,
      restored_at: daysAgo(3),
      trigger: "UtilityPowerRestored",
    },
    created_at: daysAgo(3),
    resolved_by: "System",
    resolved_at: daysAgo(3),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-037",
    severity: "info",
    source: "system",
    station_id: "s13",
    station_name: sn("s13"),
    message: "Firmware update 2.4.0 applied successfully",
    technical_detail: {
      firmware_version: "2.4.0",
      previous_version: "2.3.8",
      applied_at: daysAgo(3),
      reboot_duration_seconds: 35,
    },
    created_at: daysAgo(3),
    resolved_by: "System",
    resolved_at: daysAgo(3),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-038",
    severity: "info",
    source: "integration",
    station_id: "s3",
    station_name: sn("s3"),
    message: "Integration test completed — Slack webhook verified",
    technical_detail: {
      webhook_url_masked: "https://hooks.slack.com/***",
      test_message_ts: "1745360000.445566",
      status: "Success",
    },
    created_at: daysAgo(3),
    resolved_by: "System",
    resolved_at: daysAgo(3),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-039",
    severity: "info",
    source: "system",
    station_id: "s1",
    station_name: sn("s1"),
    message: "Monthly billing cycle completed — invoices sent",
    technical_detail: {
      billing_period: "March 2026",
      invoices_generated: 198,
      total_billed_inr: 171400,
      sent_at: daysAgo(4),
    },
    created_at: daysAgo(4),
    resolved_by: "System",
    resolved_at: daysAgo(4),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-040",
    severity: "info",
    source: "system",
    station_id: "s12",
    station_name: sn("s12"),
    message: "Station came online after field repair",
    technical_detail: {
      downtime_minutes: 360,
      technician: "Field Team A",
      work_order_id: "WO-7698",
      repaired_component: "EVSE controller board",
    },
    created_at: daysAgo(4),
    resolved_by: "System",
    resolved_at: daysAgo(4),
    comments: [
      mkComment("c-040-1", "Field Team A", "F", "Controller board replaced. Station running stable at 48h mark.", 2880, daysAgo(4)),
    ],
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-041",
    severity: "info",
    source: "system",
    station_id: "s2",
    station_name: sn("s2"),
    message: "Demand surge predicted for tomorrow morning — load plan updated",
    technical_detail: {
      surge_window: "2026-04-26T07:00:00Z to 2026-04-26T10:00:00Z",
      predicted_sessions: 18,
      load_plan_version: "v3.2",
    },
    created_at: daysAgo(4),
    acked_by: "Priya Menon",
    acked_at: daysAgo(4),
    comments: noComments,
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-042",
    severity: "info",
    source: "system",
    station_id: "s5",
    station_name: sn("s5"),
    message: "Firmware update 2.3.9 applied successfully",
    technical_detail: {
      firmware_version: "2.3.9",
      previous_version: "2.3.8",
      applied_at: daysAgo(5),
      reboot_duration_seconds: 44,
    },
    created_at: daysAgo(5),
    resolved_by: "System",
    resolved_at: daysAgo(5),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-043",
    severity: "info",
    source: "integration",
    station_id: "s4",
    station_name: sn("s4"),
    message: "PagerDuty incident #PD-44012 auto-resolved",
    technical_detail: {
      pagerduty_incident_id: "PD-44012",
      resolved_by: "PagerDuty auto-resolve",
      auto_resolve_trigger: "Heartbeat received",
      resolution_latency_minutes: 18,
    },
    created_at: daysAgo(5),
    resolved_by: "System",
    resolved_at: daysAgo(5),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-044",
    severity: "info",
    source: "system",
    station_id: "s10",
    station_name: sn("s10"),
    message: "Station came online after scheduled maintenance",
    technical_detail: {
      downtime_minutes: 195,
      technician: "Field Team B",
      work_order_id: "WO-7654",
    },
    created_at: daysAgo(5),
    resolved_by: "System",
    resolved_at: daysAgo(5),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-045",
    severity: "info",
    source: "manual",
    station_id: "s6",
    station_name: sn("s6"),
    message: "Parking enforcement notice — 2 spots reserved for EV charging only",
    technical_detail: {
      reporter: "Site Owner",
      effective_date: "2026-04-20",
      notes: "Enforcement starts Mon 28 Apr. Signage ordered.",
    },
    created_at: daysAgo(5),
    acked_by: "Operations",
    acked_at: daysAgo(5),
    comments: noComments,
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-046",
    severity: "info",
    source: "system",
    station_id: "s15",
    station_name: sn("s15"),
    message: "Demand surge predicted for Goa Carnival weekend",
    technical_detail: {
      surge_window: "2026-04-27T00:00:00Z to 2026-04-28T23:59:59Z",
      predicted_load_increase_pct: 40,
      recommendation: "Pre-position mobile charger",
    },
    created_at: daysAgo(6),
    acked_by: "Anita Verma",
    acked_at: daysAgo(6),
    comments: [
      mkComment("c-046-1", "Anita Verma", "A", "Mobile charger booked. Will deploy Friday evening.", 45, daysAgo(6)),
    ],
    status: "acked",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-047",
    severity: "info",
    source: "system",
    station_id: "s11",
    station_name: sn("s11"),
    message: "Revenue target for today exceeded — 108% of goal",
    technical_detail: {
      target_inr: 2000,
      achieved_inr: 2156,
      achieved_pct: 107.8,
      as_of: daysAgo(6),
    },
    created_at: daysAgo(6),
    resolved_by: "System",
    resolved_at: daysAgo(6),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-048",
    severity: "info",
    source: "integration",
    station_id: "s8",
    station_name: sn("s8"),
    message: "Slack mention: driver reported charger works perfectly after update",
    technical_detail: {
      slack_channel: "#driver-feedback",
      slack_message_ts: "1744960000.556677",
      sentiment: "positive",
    },
    created_at: daysAgo(6),
    resolved_by: "System",
    resolved_at: daysAgo(6),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-049",
    severity: "info",
    source: "system",
    station_id: "s3",
    station_name: sn("s3"),
    message: "Firmware update 2.3.8 applied successfully to 4 stations",
    technical_detail: {
      firmware_version: "2.3.8",
      previous_version: "2.3.7",
      stations_updated: ["s3", "s10", "s11", "s14"],
      applied_at: daysAgo(7),
    },
    created_at: daysAgo(7),
    resolved_by: "System",
    resolved_at: daysAgo(7),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },

  {
    id: "alrt-050",
    severity: "info",
    source: "system",
    station_id: "s7",
    station_name: sn("s7"),
    message: "Weekly summary: 214 sessions, 1,284 kWh delivered, ₹42,180 revenue",
    technical_detail: {
      period: "Apr 18 to Apr 24",
      sessions: 214,
      energy_kwh: 1284,
      revenue_inr: 42180,
      uptime_pct: 97.6,
    },
    created_at: daysAgo(7),
    resolved_by: "System",
    resolved_at: daysAgo(7),
    comments: noComments,
    status: "resolved",
  } as AlertRecord & { status: AlertStatus },
];

// ─── Status field re-attached to type (we cast above for conciseness) ─────────

// Re-export as the final typed list
export type AlertWithStatus = AlertRecord & { status: AlertStatus };

export const ALERTS: AlertWithStatus[] = ALL_ALERTS as AlertWithStatus[];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

export function getAlert(id: string): AlertWithStatus | undefined {
  return ALERTS.find((a) => a.id === id);
}

/** Unique station names across the dataset for autocomplete. */
export const ALERT_STATIONS: string[] = [
  ...new Set(ALERTS.map((a) => a.station_name)),
].sort();
