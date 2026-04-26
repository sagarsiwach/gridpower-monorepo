/**
 * Settings mocks — team members, API keys, audit log.
 */

export type MemberRole = "admin" | "operator" | "analyst" | "read-only";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  lastActive: string;
  initials: string;
  status: "active" | "invited" | "inactive";
}

export interface ApiKey {
  id: string;
  name: string;
  scopes: string[];
  createdAt: string;
  lastUsed: string | null;
  maskedKey: string;
  status: "active" | "revoked";
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  status: "active" | "disabled" | "error";
  lastDelivery: string | null;
  failureCount: number;
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorEmail: string;
  action: string;
  resource: string;
  resourceId: string;
  ip: string;
  result: "success" | "failed";
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: "m_001", name: "Priya Sharma",        email: "priya.s@gridenergy.co.in",     role: "admin",    lastActive: "just now",    initials: "PS", status: "active"  },
  { id: "m_002", name: "Rahul Iyer",           email: "rahul.i@gridenergy.co.in",     role: "operator", lastActive: "2h ago",      initials: "RI", status: "active"  },
  { id: "m_003", name: "Anita Nair",           email: "anita.n@gridenergy.co.in",     role: "operator", lastActive: "1 day ago",   initials: "AN", status: "active"  },
  { id: "m_004", name: "Kavitha Reddy",        email: "kavitha.r@gridenergy.co.in",   role: "operator", lastActive: "4h ago",      initials: "KR", status: "active"  },
  { id: "m_005", name: "Dipak Sen",            email: "dipak.s@gridenergy.co.in",     role: "operator", lastActive: "3 days ago",  initials: "DS", status: "active"  },
  { id: "m_006", name: "Asha Menon",           email: "asha.m@gridenergy.co.in",      role: "operator", lastActive: "6h ago",      initials: "AM", status: "active"  },
  { id: "m_007", name: "Venkat Rao Galla",     email: "venkat.r@gridenergy.co.in",    role: "analyst",  lastActive: "yesterday",   initials: "VR", status: "active"  },
  { id: "m_008", name: "Suresh Kumar",         email: "suresh.k@gridenergy.co.in",    role: "operator", lastActive: "2 days ago",  initials: "SK", status: "active"  },
  { id: "m_009", name: "Rekha Shetty",         email: "rekha.s@gridenergy.co.in",     role: "analyst",  lastActive: "5 days ago",  initials: "RS", status: "active"  },
  { id: "m_010", name: "Ajay Singh",           email: "ajay.s@gridenergy.co.in",      role: "operator", lastActive: "1 day ago",   initials: "AS", status: "active"  },
  { id: "m_011", name: "Meena Joshi",          email: "meena.j@gridenergy.co.in",     role: "analyst",  lastActive: "3 days ago",  initials: "MJ", status: "active"  },
  { id: "m_012", name: "Tanmay Das",           email: "tanmay.d@gridenergy.co.in",    role: "read-only",lastActive: "never",       initials: "TD", status: "invited" },
];

export const API_KEYS: ApiKey[] = [
  { id: "ak_001", name: "Production SCADA",       scopes: ["telemetry:read","commands:write","alerts:read"],  createdAt: "Jan 14, 2025",  lastUsed: "just now",    maskedKey: "gep_live_••••••••••••••••••••••••••••••Ks7f", status: "active"  },
  { id: "ak_002", name: "Dashboard Integration",  scopes: ["telemetry:read","analytics:read"],                createdAt: "Feb 28, 2025",  lastUsed: "1 min ago",   maskedKey: "gep_live_••••••••••••••••••••••••••••••Lq2m", status: "active"  },
  { id: "ak_003", name: "DR Aggregator API",      scopes: ["dispatch:write","telemetry:read","dr:write"],     createdAt: "Mar 10, 2025",  lastUsed: "4h ago",      maskedKey: "gep_live_••••••••••••••••••••••••••••••Rn8p", status: "active"  },
  { id: "ak_004", name: "Analytics Export",       scopes: ["analytics:read","exports:write"],                 createdAt: "Mar 24, 2025",  lastUsed: "2 days ago",  maskedKey: "gep_live_••••••••••••••••••••••••••••••Xc4v", status: "active"  },
  { id: "ak_005", name: "Legacy Integration",     scopes: ["telemetry:read"],                                 createdAt: "Oct 12, 2024",  lastUsed: "22 days ago", maskedKey: "gep_live_••••••••••••••••••••••••••••••Bt1w", status: "active"  },
  { id: "ak_006", name: "Deprecated Test Key",    scopes: ["telemetry:read"],                                 createdAt: "Aug 01, 2024",  lastUsed: "45 days ago", maskedKey: "gep_live_••••••••••••••••••••••••••••••Jz9k", status: "revoked" },
];

export const WEBHOOKS: Webhook[] = [
  { id: "wh_001", url: "https://alerts.gridenergy.co.in/webhooks/dispatch",    events: ["grid.event.critical","dr.dispatch.started","alert.critical"],  status: "active",   lastDelivery: "18:04 today",  failureCount: 0 },
  { id: "wh_002", url: "https://sap.internal.gridenergy.co.in/energy/webhook", events: ["billing.cycle.complete","invoice.generated"],                   status: "active",   lastDelivery: "Apr 25",       failureCount: 0 },
  { id: "wh_003", url: "https://slack.com/api/external-webhook/XYZ",           events: ["alert.critical","alert.high","site.offline"],                   status: "error",    lastDelivery: "2 days ago",   failureCount: 4 },
  { id: "wh_004", url: "https://analytics.partner.co.in/hooks/energy",         events: ["schedule.executed","dr.event.completed"],                       status: "disabled", lastDelivery: "8 days ago",   failureCount: 0 },
];

export const AUDIT_LOG: AuditEntry[] = [
  { id: "aud_001", timestamp: "Apr 27, 18:14", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Acknowledged alert",          resource: "Alert",    resourceId: "al_005", ip: "10.0.1.42",   result: "success" },
  { id: "aud_002", timestamp: "Apr 27, 17:52", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Assigned work order",          resource: "WorkOrder", resourceId: "wo_001", ip: "10.0.1.42",   result: "success" },
  { id: "aud_003", timestamp: "Apr 27, 15:00", actor: "Rahul Iyer",      actorEmail: "rahul.i@gridenergy.co.in",   action: "Paused schedule",              resource: "Schedule", resourceId: "sch_005", ip: "10.0.2.18",  result: "success" },
  { id: "aud_004", timestamp: "Apr 27, 14:30", actor: "Anita Nair",      actorEmail: "anita.n@gridenergy.co.in",   action: "Created work order",           resource: "WorkOrder", resourceId: "wo_008", ip: "10.0.2.34",  result: "success" },
  { id: "aud_005", timestamp: "Apr 27, 12:00", actor: "Kavitha Reddy",   actorEmail: "kavitha.r@gridenergy.co.in", action: "Updated site config",          resource: "Site",     resourceId: "site_004", ip: "10.0.3.12", result: "success" },
  { id: "aud_006", timestamp: "Apr 27, 11:30", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Added team member",            resource: "Member",   resourceId: "m_012", ip: "10.0.1.42",    result: "success" },
  { id: "aud_007", timestamp: "Apr 27, 10:44", actor: "Rahul Iyer",      actorEmail: "rahul.i@gridenergy.co.in",   action: "Generated API key",            resource: "APIKey",   resourceId: "ak_004", ip: "10.0.2.18",  result: "success" },
  { id: "aud_008", timestamp: "Apr 27, 09:00", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Logged in",                    resource: "Auth",     resourceId: "session_priya", ip: "10.0.1.42", result: "success" },
  { id: "aud_009", timestamp: "Apr 26, 21:10", actor: "Anita Nair",      actorEmail: "anita.n@gridenergy.co.in",   action: "Acknowledged alert",           resource: "Alert",    resourceId: "al_010", ip: "10.0.2.34",  result: "success" },
  { id: "aud_010", timestamp: "Apr 26, 20:00", actor: "Kavitha Reddy",   actorEmail: "kavitha.r@gridenergy.co.in", action: "Dispatched DR event",          resource: "DREvent",  resourceId: "ev_003", ip: "10.0.3.12",  result: "success" },
  { id: "aud_011", timestamp: "Apr 26, 17:30", actor: "Rahul Iyer",      actorEmail: "rahul.i@gridenergy.co.in",   action: "Started firmware rollout",     resource: "Rollout",  resourceId: "ro_001", ip: "10.0.2.18",  result: "success" },
  { id: "aud_012", timestamp: "Apr 26, 16:00", actor: "Dipak Sen",       actorEmail: "dipak.s@gridenergy.co.in",   action: "Logged in",                    resource: "Auth",     resourceId: "session_dipak", ip: "10.0.4.22", result: "success" },
  { id: "aud_013", timestamp: "Apr 26, 14:22", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Updated tariff assignment",    resource: "Tariff",   resourceId: "tar_001", ip: "10.0.1.42", result: "success" },
  { id: "aud_014", timestamp: "Apr 26, 11:00", actor: "Venkat Rao Galla",actorEmail: "venkat.r@gridenergy.co.in",  action: "Exported analytics report",    resource: "Export",   resourceId: "exp_014", ip: "192.168.1.5",result: "success" },
  { id: "aud_015", timestamp: "Apr 25, 22:00", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Acknowledged alert",           resource: "Alert",    resourceId: "al_016", ip: "10.0.1.42",  result: "success" },
  { id: "aud_016", timestamp: "Apr 25, 20:00", actor: "Rahul Iyer",      actorEmail: "rahul.i@gridenergy.co.in",   action: "Applied firmware update",      resource: "Stack",    resourceId: "stk_001", ip: "10.0.2.18", result: "success" },
  { id: "aud_017", timestamp: "Apr 25, 18:00", actor: "Anita Nair",      actorEmail: "anita.n@gridenergy.co.in",   action: "Created DR event",             resource: "DREvent",  resourceId: "ev_003", ip: "10.0.2.34",  result: "success" },
  { id: "aud_018", timestamp: "Apr 24, 17:00", actor: "Unknown",         actorEmail: "unknown@ext.com",            action: "Failed login attempt",         resource: "Auth",     resourceId: "session_na", ip: "203.122.45.100", result: "failed" },
  { id: "aud_019", timestamp: "Apr 24, 11:00", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Scheduled DR event",           resource: "DREvent",  resourceId: "ev_012", ip: "10.0.1.42",  result: "success" },
  { id: "aud_020", timestamp: "Apr 24, 09:30", actor: "Rahul Iyer",      actorEmail: "rahul.i@gridenergy.co.in",   action: "Updated schedule",             resource: "Schedule", resourceId: "sch_001", ip: "10.0.2.18", result: "success" },
  { id: "aud_021", timestamp: "Apr 23, 16:00", actor: "Asha Menon",      actorEmail: "asha.m@gridenergy.co.in",    action: "Closed work order",            resource: "WorkOrder", resourceId: "wo_004", ip: "192.168.2.8",result: "success" },
  { id: "aud_022", timestamp: "Apr 23, 14:00", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Added customer site mapping",  resource: "Customer", resourceId: "cust_020", ip: "10.0.1.42", result: "success" },
  { id: "aud_023", timestamp: "Apr 22, 21:00", actor: "Suresh Kumar",    actorEmail: "suresh.k@gridenergy.co.in",  action: "Acknowledged alert",           resource: "Alert",    resourceId: "al_027", ip: "10.0.5.6",   result: "success" },
  { id: "aud_024", timestamp: "Apr 22, 09:30", actor: "Rahul Iyer",      actorEmail: "rahul.i@gridenergy.co.in",   action: "Acknowledged firmware release", resource: "Firmware", resourceId: "fw_015", ip: "10.0.2.18", result: "success" },
  { id: "aud_025", timestamp: "Apr 21, 20:10", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Acknowledged alert",           resource: "Alert",    resourceId: "al_030", ip: "10.0.1.42",  result: "success" },
  { id: "aud_026", timestamp: "Apr 21, 10:05", actor: "Venkat Rao Galla",actorEmail: "venkat.r@gridenergy.co.in",  action: "Logged milestone note",        resource: "Schedule", resourceId: "sch_013", ip: "192.168.1.5",result: "success" },
  { id: "aud_027", timestamp: "Apr 20, 15:00", actor: "Dipak Sen",       actorEmail: "dipak.s@gridenergy.co.in",   action: "Updated stack maintenance log", resource: "Stack",   resourceId: "stk_012", ip: "10.0.4.22", result: "success" },
  { id: "aud_028", timestamp: "Apr 20, 09:15", actor: "Priya Sharma",    actorEmail: "priya.s@gridenergy.co.in",   action: "Renewed customer contract",    resource: "Customer", resourceId: "cust_001", ip: "10.0.1.42", result: "success" },
  { id: "aud_029", timestamp: "Apr 19, 18:00", actor: "Meena Joshi",     actorEmail: "meena.j@gridenergy.co.in",   action: "Logged in",                    resource: "Auth",     resourceId: "session_meena", ip: "192.168.3.14", result: "success" },
  { id: "aud_030", timestamp: "Apr 19, 10:00", actor: "Unknown",         actorEmail: "unknown@ext.com",            action: "API key invalid — rejected",   resource: "Auth",     resourceId: "api_na", ip: "45.76.142.88", result: "failed" },
];
