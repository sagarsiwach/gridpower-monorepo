/**
 * Dashboard mock fixtures: 30-day revenue series, 15 alerts, 15 stations.
 * Used by Dashboard route. Other agents can reference patterns here.
 */

// ─── Revenue series (30 days) ─────────────────────────────────────────────────

export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

export const REVENUE_SERIES: RevenueDataPoint[] = [
  { date: "Mar 26", revenue: 28400 },
  { date: "Mar 27", revenue: 31200 },
  { date: "Mar 28", revenue: 29600 },
  { date: "Mar 29", revenue: 33800 },
  { date: "Mar 30", revenue: 35200 },
  { date: "Mar 31", revenue: 38900 },
  { date: "Apr 1",  revenue: 31500 },
  { date: "Apr 2",  revenue: 36800 },
  { date: "Apr 3",  revenue: 34200 },
  { date: "Apr 4",  revenue: 39400 },
  { date: "Apr 5",  revenue: 41800 },
  { date: "Apr 6",  revenue: 44200 },
  { date: "Apr 7",  revenue: 46900 },
  { date: "Apr 8",  revenue: 38200 },
  { date: "Apr 9",  revenue: 35600 },
  { date: "Apr 10", revenue: 40100 },
  { date: "Apr 11", revenue: 38420 },
  { date: "Apr 12", revenue: 43600 },
  { date: "Apr 13", revenue: 47200 },
  { date: "Apr 14", revenue: 51800 },
  { date: "Apr 15", revenue: 49300 },
  { date: "Apr 16", revenue: 44700 },
  { date: "Apr 17", revenue: 42180 },
  { date: "Apr 18", revenue: 48600 },
  { date: "Apr 19", revenue: 53200 },
  { date: "Apr 20", revenue: 56800 },
  { date: "Apr 21", revenue: 51400 },
  { date: "Apr 22", revenue: 47900 },
  { date: "Apr 23", revenue: 44200 },
  { date: "Apr 24", revenue: 42180 },
];

// ─── Alerts (15 entries) ──────────────────────────────────────────────────────

export type AlertSeverity = "error" | "warning" | "info" | "success";

export interface Alert {
  id: string;
  severity: AlertSeverity;
  station: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

export const ALERTS: Alert[] = [
  {
    id: "a1",
    severity: "error",
    station: "GridPower-Goa-03",
    message: "Station offline — no heartbeat for 12 minutes",
    timeAgo: "12 min",
    read: false,
  },
  {
    id: "a2",
    severity: "warning",
    station: "GridPower-Blr-01",
    message: "High temperature on port 2 — investigating",
    timeAgo: "34 min",
    read: false,
  },
  {
    id: "a3",
    severity: "info",
    station: "All stations",
    message: "Firmware update 2.4.1 available for 8 stations",
    timeAgo: "1h 12m",
    read: true,
  },
  {
    id: "a4",
    severity: "success",
    station: "GridPower-Pune-02",
    message: "Station came online after maintenance window",
    timeAgo: "2h 05m",
    read: true,
  },
  {
    id: "a5",
    severity: "warning",
    station: "GridPower-Hyd-04",
    message: "Revenue below daily average by 28%",
    timeAgo: "3h 20m",
    read: true,
  },
  {
    id: "a6",
    severity: "error",
    station: "GridPower-Del-02",
    message: "Payment gateway timeout — 3 sessions failed",
    timeAgo: "4h 01m",
    read: true,
  },
  {
    id: "a7",
    severity: "warning",
    station: "GridPower-Mum-03",
    message: "Port 1 utilisation at 98% — near capacity",
    timeAgo: "5h 15m",
    read: true,
  },
  {
    id: "a8",
    severity: "info",
    station: "GridPower-Che-01",
    message: "New station provisioned and ready",
    timeAgo: "6h 30m",
    read: true,
  },
  {
    id: "a9",
    severity: "success",
    station: "GridPower-Del-03",
    message: "Revenue target for today exceeded",
    timeAgo: "7h 45m",
    read: true,
  },
  {
    id: "a10",
    severity: "warning",
    station: "GridPower-Blr-03",
    message: "Scheduled maintenance in 2 hours",
    timeAgo: "8h 10m",
    read: true,
  },
  {
    id: "a11",
    severity: "error",
    station: "GridPower-Pune-01",
    message: "Connector latch failure on port 3",
    timeAgo: "9h 22m",
    read: true,
  },
  {
    id: "a12",
    severity: "info",
    station: "System",
    message: "Monthly billing cycle completed — invoices sent",
    timeAgo: "10h 00m",
    read: true,
  },
  {
    id: "a13",
    severity: "success",
    station: "GridPower-Goa-01",
    message: "Firmware update 2.4.0 applied successfully",
    timeAgo: "11h 45m",
    read: true,
  },
  {
    id: "a14",
    severity: "warning",
    station: "GridPower-Hyd-02",
    message: "Network latency spike — monitoring",
    timeAgo: "12h 30m",
    read: true,
  },
  {
    id: "a15",
    severity: "info",
    station: "GridPower-Mum-01",
    message: "Demand surge predicted 17:00–19:00 today",
    timeAgo: "13h 05m",
    read: true,
  },
];

// ─── Stations (15 entries for top-stations bar chart) ─────────────────────────

export interface Station {
  id: string;
  name: string;
  location: string;
  revenueToday: number;
  utilisation: number; // 0-100
  online: boolean;
}

export const STATIONS: Station[] = [
  { id: "s1",  name: "GridPower-Del-03",  location: "Delhi",     revenueToday: 8420, utilisation: 94, online: true },
  { id: "s2",  name: "GridPower-Blr-01",  location: "Bangalore", revenueToday: 7840, utilisation: 91, online: true },
  { id: "s3",  name: "GridPower-Mum-02",  location: "Mumbai",    revenueToday: 7200, utilisation: 88, online: true },
  { id: "s4",  name: "GridPower-Hyd-01",  location: "Hyderabad", revenueToday: 6380, utilisation: 82, online: true },
  { id: "s5",  name: "GridPower-Pune-01", location: "Pune",      revenueToday: 5684, utilisation: 76, online: true },
  { id: "s6",  name: "GridPower-Goa-01",  location: "Goa",       revenueToday: 4998, utilisation: 71, online: true },
  { id: "s7",  name: "GridPower-Del-01",  location: "Delhi",     revenueToday: 4312, utilisation: 65, online: true },
  { id: "s8",  name: "GridPower-Blr-03",  location: "Bangalore", revenueToday: 3724, utilisation: 58, online: true },
  { id: "s9",  name: "GridPower-Che-01",  location: "Chennai",   revenueToday: 3234, utilisation: 52, online: true },
  { id: "s10", name: "GridPower-Mum-04",  location: "Mumbai",    revenueToday: 2646, utilisation: 44, online: true },
  { id: "s11", name: "GridPower-Hyd-04",  location: "Hyderabad", revenueToday: 2156, utilisation: 38, online: true },
  { id: "s12", name: "GridPower-Del-02",  location: "Delhi",     revenueToday: 1862, utilisation: 32, online: false },
  { id: "s13", name: "GridPower-Pune-02", location: "Pune",      revenueToday: 1568, utilisation: 28, online: true },
  { id: "s14", name: "GridPower-Mum-03",  location: "Mumbai",    revenueToday: 1274, utilisation: 24, online: true },
  { id: "s15", name: "GridPower-Goa-03",  location: "Goa",       revenueToday: 0,    utilisation: 0,  online: false },
];

// ─── Recent charging sessions ─────────────────────────────────────────────────

export interface ChargingSession {
  id: string;
  time: string;
  sessionId: string;
  station: string;
  user: string;
  kwh: number;
  amount: number;
}

export const RECENT_SESSIONS: ChargingSession[] = [
  { id: "cs1",  time: "14:32", sessionId: "GC-04312", station: "GridPower-Blr-01",  user: "Rahul A.",   kwh: 14.2, amount: 426 },
  { id: "cs2",  time: "14:18", sessionId: "GC-04311", station: "GridPower-Del-03",  user: "Priya M.",   kwh: 8.6,  amount: 258 },
  { id: "cs3",  time: "14:05", sessionId: "GC-04310", station: "GridPower-Mum-02",  user: "Amit S.",    kwh: 22.0, amount: 660 },
  { id: "cs4",  time: "13:54", sessionId: "GC-04309", station: "GridPower-Pune-01", user: "Neha K.",    kwh: 6.1,  amount: 183 },
  { id: "cs5",  time: "13:40", sessionId: "GC-04308", station: "GridPower-Goa-01",  user: "Vikram R.",  kwh: 11.4, amount: 342 },
  { id: "cs6",  time: "13:28", sessionId: "GC-04307", station: "GridPower-Hyd-01",  user: "Divya S.",   kwh: 9.8,  amount: 294 },
  { id: "cs7",  time: "13:15", sessionId: "GC-04306", station: "GridPower-Blr-03",  user: "Arjun P.",   kwh: 18.3, amount: 549 },
  { id: "cs8",  time: "13:02", sessionId: "GC-04305", station: "GridPower-Del-01",  user: "Sunita R.",  kwh: 5.5,  amount: 165 },
  { id: "cs9",  time: "12:48", sessionId: "GC-04304", station: "GridPower-Che-01",  user: "Kiran B.",   kwh: 16.7, amount: 501 },
  { id: "cs10", time: "12:34", sessionId: "GC-04303", station: "GridPower-Mum-04",  user: "Meera T.",   kwh: 7.2,  amount: 216 },
  { id: "cs11", time: "12:20", sessionId: "GC-04302", station: "GridPower-Hyd-02",  user: "Rajesh N.",  kwh: 12.8, amount: 384 },
  { id: "cs12", time: "12:06", sessionId: "GC-04301", station: "GridPower-Blr-01",  user: "Anita V.",   kwh: 20.1, amount: 603 },
  { id: "cs13", time: "11:52", sessionId: "GC-04300", station: "GridPower-Del-03",  user: "Suresh K.",  kwh: 9.3,  amount: 279 },
  { id: "cs14", time: "11:38", sessionId: "GC-04299", station: "GridPower-Pune-01", user: "Pooja G.",   kwh: 4.8,  amount: 144 },
  { id: "cs15", time: "11:24", sessionId: "GC-04298", station: "GridPower-Mum-02",  user: "Deepak L.",  kwh: 25.6, amount: 768 },
];

// ─── Heatmap data (7 days × 24 hours, intensity 0-5) ─────────────────────────

import type { HeatmapValue } from "@gridpower/ui";

/** Generate a deterministic heatmap row for a given day. */
function makeHeatmapRow(dayIndex: number): HeatmapValue[] {
  const isWeekend = dayIndex >= 5;
  return Array.from({ length: 24 }, (_, hour) => {
    // Off-peak hours: 0–6, 22–23
    const isOffPeak = hour < 6 || hour >= 22;
    const isPeak = hour >= 8 && hour <= 20;

    let base: number;
    if (isOffPeak) {
      base = isWeekend ? 1 : 0;
    } else if (isPeak) {
      // Seed-based pseudo-random for determinism
      const seed = (dayIndex * 31 + hour * 7) % 17;
      base = isWeekend ? 3 + (seed % 3) : 2 + (seed % 4);
    } else {
      // Shoulder hours
      const seed = (dayIndex * 13 + hour * 5) % 11;
      base = 1 + (seed % 3);
    }

    return Math.min(5, Math.max(0, base)) as HeatmapValue;
  });
}

export const HEATMAP_DATA: HeatmapValue[][] = [
  makeHeatmapRow(0), // Mon
  makeHeatmapRow(1), // Tue
  makeHeatmapRow(2), // Wed
  makeHeatmapRow(3), // Thu
  makeHeatmapRow(4), // Fri
  makeHeatmapRow(5), // Sat
  makeHeatmapRow(6), // Sun
];

export const HEATMAP_ROW_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const HEATMAP_COL_LABELS = Array.from({ length: 24 }, (_, i) =>
  i % 3 === 0 ? `${i}h` : ""
);

// ─── Stat card summary values ─────────────────────────────────────────────────

export const STATS = {
  revenueToday: "₹42,180",
  revenueTrend: "+12% vs avg",
  stationsOnline: 124,
  stationsTotal: 127,
  stationsTrend: "97.6% uptime",
  sessionsToday: 214,
  sessionsTrend: "+18 vs yesterday",
  energyDelivered: "1,284 kWh",
  energyTrend: "+8% vs avg",
};
