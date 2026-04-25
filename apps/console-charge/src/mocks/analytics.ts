/**
 * Analytics mock data — CON.4
 * Station IDs follow GPWR-{City}-{NN} convention.
 */

export type Period = "Today" | "7D" | "30D" | "90D";

// ─── KPI row ────────────────────────────────────────────────────────────────

export interface KpiSet {
  revenue: string;
  revenueTrend: string;
  revenueTrendDir: "up" | "down" | "neutral";
  energy: string;
  energyTrend: string;
  energyTrendDir: "up" | "down" | "neutral";
  sessions: string;
  sessionsTrend: string;
  sessionsTrendDir: "up" | "down" | "neutral";
  avgDuration: string;
  durationTrend: string;
  durationTrendDir: "up" | "down" | "neutral";
}

export const KPI_BY_PERIOD: Record<Period, KpiSet> = {
  Today: {
    revenue: "₹41.2k",
    revenueTrend: "+8% vs yesterday",
    revenueTrendDir: "up",
    energy: "1,340 kWh",
    energyTrend: "+5%",
    energyTrendDir: "up",
    sessions: "172",
    sessionsTrend: "+12%",
    sessionsTrendDir: "up",
    avgDuration: "46 min",
    durationTrend: "+2 min",
    durationTrendDir: "up",
  },
  "7D": {
    revenue: "₹2.94L",
    revenueTrend: "+14% vs prior 7D",
    revenueTrendDir: "up",
    energy: "9,420 kWh",
    energyTrend: "+11%",
    energyTrendDir: "up",
    sessions: "1,214",
    sessionsTrend: "+9%",
    sessionsTrendDir: "up",
    avgDuration: "48 min",
    durationTrend: "+3 min",
    durationTrendDir: "up",
  },
  "30D": {
    revenue: "₹12.4L",
    revenueTrend: "+14% vs prior 30D",
    revenueTrendDir: "up",
    energy: "39,800 kWh",
    energyTrend: "+11%",
    energyTrendDir: "up",
    sessions: "5,182",
    sessionsTrend: "+9%",
    sessionsTrendDir: "up",
    avgDuration: "51 min",
    durationTrend: "+4 min",
    durationTrendDir: "up",
  },
  "90D": {
    revenue: "₹36.8L",
    revenueTrend: "+18% vs prior 90D",
    revenueTrendDir: "up",
    energy: "118,400 kWh",
    energyTrend: "+15%",
    energyTrendDir: "up",
    sessions: "15,210",
    sessionsTrend: "+11%",
    sessionsTrendDir: "up",
    avgDuration: "49 min",
    durationTrend: "+2 min",
    durationTrendDir: "up",
  },
};

// ─── Revenue trend ───────────────────────────────────────────────────────────

export interface RevenueTrendPoint {
  label: string;
  revenue: number;
}

function makeRevenueSeries(period: Period): RevenueTrendPoint[] {
  if (period === "Today") {
    // Hourly — 24 data points
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return hours.map((h) => ({
      label: `${String(h).padStart(2, "0")}:00`,
      revenue:
        h < 6
          ? Math.round(800 + Math.random() * 400)
          : h < 10
            ? Math.round(2800 + Math.random() * 1200)
            : h < 14
              ? Math.round(4200 + Math.random() * 1000)
              : h < 18
                ? Math.round(5100 + Math.random() * 1400)
                : h < 22
                  ? Math.round(4800 + Math.random() * 1200)
                  : Math.round(2200 + Math.random() * 600),
    }));
  }

  if (period === "7D") {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const vals = [38200, 41600, 44800, 39400, 47200, 51800, 42180];
    return days.map((d, i) => ({ label: d, revenue: vals[i]! }));
  }

  if (period === "30D") {
    return Array.from({ length: 30 }, (_, i) => ({
      label: `${i + 1}`,
      revenue: Math.round(28000 + Math.sin(i / 4) * 8000 + i * 400 + Math.random() * 3000),
    }));
  }

  // 90D — weekly aggregates
  return Array.from({ length: 13 }, (_, i) => ({
    label: `W${i + 1}`,
    revenue: Math.round(220000 + i * 15000 + Math.random() * 40000),
  }));
}

// Stable per period (seed with fixed values, not random on each call)
const _revCache: Partial<Record<Period, RevenueTrendPoint[]>> = {};
export function getRevenueSeries(period: Period): RevenueTrendPoint[] {
  if (!_revCache[period]) {
    _revCache[period] = makeRevenueSeries(period);
  }
  return _revCache[period]!;
}

// ─── Sessions heatmap (7×24) ─────────────────────────────────────────────────
// Fixed data — doesn't change with period picker (always shows typical week pattern)

import type { HeatmapValue } from "@gridpower/ui";

export const SESSIONS_HEATMAP_ROWS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const SESSIONS_HEATMAP_COLS = Array.from({ length: 24 }, (_, i) =>
  i % 4 === 0 ? `${i}h` : "",
);

function intensity(v: number): HeatmapValue {
  if (v < 0.1) return 0;
  if (v < 0.25) return 1;
  if (v < 0.45) return 2;
  if (v < 0.65) return 3;
  if (v < 0.85) return 4;
  return 5;
}

// Fixed seed pattern
const HEATMAP_PATTERN: HeatmapValue[][] = [
  // Mon–Fri: peak 8–20h, weekend higher evenings
  ...["Mon", "Tue", "Wed", "Thu", "Fri"].map((_, di) =>
    Array.from({ length: 24 }, (__, h): HeatmapValue => {
      const peak = h >= 8 && h <= 20;
      const raw = peak
        ? 0.3 + ((h - 8) / 12) * 0.5 + (di === 2 ? 0.1 : 0) // Wed slight boost
        : 0.05;
      return intensity(raw);
    }),
  ),
  // Sat
  Array.from({ length: 24 }, (_, h): HeatmapValue => {
    const raw = h >= 10 && h <= 22 ? 0.4 + ((h - 10) / 12) * 0.45 : 0.05;
    return intensity(raw);
  }),
  // Sun
  Array.from({ length: 24 }, (_, h): HeatmapValue => {
    const raw = h >= 10 && h <= 20 ? 0.35 + ((h - 10) / 10) * 0.35 : 0.05;
    return intensity(raw);
  }),
];

export { HEATMAP_PATTERN };

// ─── Energy mix (stable per period) ─────────────────────────────────────────

export interface EnergyMixItem {
  label: string;
  pct: number;
  kwh: string;
  color: string;
}

export const ENERGY_MIX_BY_PERIOD: Record<Period, EnergyMixItem[]> = {
  Today: [
    { label: "Solar", pct: 65, kwh: "871 kWh", color: "var(--color-warning)" },
    { label: "Grid", pct: 35, kwh: "469 kWh", color: "var(--color-info)" },
  ],
  "7D": [
    { label: "Solar", pct: 62, kwh: "5,840 kWh", color: "var(--color-warning)" },
    { label: "Grid", pct: 38, kwh: "3,580 kWh", color: "var(--color-info)" },
  ],
  "30D": [
    { label: "Solar", pct: 59, kwh: "23,482 kWh", color: "var(--color-warning)" },
    { label: "Grid", pct: 41, kwh: "16,318 kWh", color: "var(--color-info)" },
  ],
  "90D": [
    { label: "Solar", pct: 56, kwh: "66,304 kWh", color: "var(--color-warning)" },
    { label: "Grid", pct: 44, kwh: "52,096 kWh", color: "var(--color-info)" },
  ],
};

// ─── Top 10 stations ─────────────────────────────────────────────────────────

export interface TopStation {
  id: string;
  name: string;
  city: string;
  revenue: number; // base 30D
}

export const TOP_STATIONS_BASE: TopStation[] = [
  { id: "GPWR-Del-03", name: "Connaught Place — Fast Hub", city: "Delhi", revenue: 84200 },
  { id: "GPWR-Blr-01", name: "Indiranagar — Tower 1", city: "Bengaluru", revenue: 78400 },
  { id: "GPWR-Mum-01", name: "BKC — Hub North", city: "Mumbai", revenue: 72600 },
  { id: "GPWR-Hyd-01", name: "Hitech City — Gate A", city: "Hyderabad", revenue: 65800 },
  { id: "GPWR-Pune-01", name: "Hinjewadi — Phase 1", city: "Pune", revenue: 58200 },
  { id: "GPWR-Goa-01", name: "Panjim — City Center", city: "Goa", revenue: 51400 },
  { id: "GPWR-Del-01", name: "Dwarka — Sector 10", city: "Delhi", revenue: 44900 },
  { id: "GPWR-Blr-03", name: "Whitefield — EPIP Zone", city: "Bengaluru", revenue: 38100 },
  { id: "GPWR-Che-01", name: "Adyar — East Coast Rd", city: "Chennai", revenue: 33500 },
  { id: "GPWR-Mum-02", name: "Andheri — West Hub", city: "Mumbai", revenue: 27800 },
];

const PERIOD_MULTIPLIER: Record<Period, number> = {
  Today: 0.033,
  "7D": 0.23,
  "30D": 1,
  "90D": 2.95,
};

export function getTopStations(period: Period): Array<TopStation & { revenueFormatted: string }> {
  const mult = PERIOD_MULTIPLIER[period];
  return TOP_STATIONS_BASE.map((s) => ({
    ...s,
    revenueFormatted: `₹${((s.revenue * mult) / 1000).toFixed(1)}k`,
  }));
}

// ─── Station performance table ───────────────────────────────────────────────

export interface StationPerformanceRow {
  id: string;
  name: string;
  sessions: number;
  avgDuration: string;
  revenue: string;
  kwh: string;
  utilization: number; // 0–100
  status: "online" | "degraded" | "offline";
}

type StationSeed = {
  id: string;
  name: string;
  utilization: number;
  status: "online" | "degraded" | "offline";
};

const STATION_SEEDS: StationSeed[] = [
  { id: "GPWR-Del-03", name: "Connaught Place — Fast Hub", utilization: 88, status: "online" },
  { id: "GPWR-Blr-01", name: "Indiranagar — Tower 1", utilization: 82, status: "online" },
  { id: "GPWR-Mum-01", name: "BKC — Hub North", utilization: 79, status: "online" },
  { id: "GPWR-Hyd-01", name: "Hitech City — Gate A", utilization: 74, status: "online" },
  { id: "GPWR-Pune-01", name: "Hinjewadi — Phase 1", utilization: 68, status: "online" },
  { id: "GPWR-Goa-01", name: "Panjim — City Center", utilization: 61, status: "degraded" },
  { id: "GPWR-Del-01", name: "Dwarka — Sector 10", utilization: 55, status: "online" },
  { id: "GPWR-Blr-03", name: "Whitefield — EPIP Zone", utilization: 48, status: "online" },
  { id: "GPWR-Che-01", name: "Adyar — East Coast Rd", utilization: 42, status: "online" },
  { id: "GPWR-Mum-02", name: "Andheri — West Hub", utilization: 35, status: "offline" },
];

export function getStationPerformance(period: Period): StationPerformanceRow[] {
  const mult = PERIOD_MULTIPLIER[period];
  return STATION_SEEDS.map((s) => {
    const baseRev = TOP_STATIONS_BASE.find((t) => t.id === s.id)?.revenue ?? 40000;
    const rev = Math.round(baseRev * mult);
    const kwh = Math.round(rev * 0.145);
    const sessions = Math.round((s.utilization * 1.8 + 20) * mult);
    return {
      ...s,
      sessions,
      avgDuration: `${44 + Math.floor(s.utilization / 10)} min`,
      revenue: `₹${rev.toLocaleString("en-IN")}`,
      kwh: `${kwh.toLocaleString("en-IN")} kWh`,
    };
  });
}

// ─── Customer insights ───────────────────────────────────────────────────────

export interface CustomerInsights {
  returningPct: string;
  newUsers: string;
  avgSessionsPerUser: string;
  peakHour: string;
  peakDays: string;
}

export const CUSTOMER_INSIGHTS_BY_PERIOD: Record<Period, CustomerInsights> = {
  Today: {
    returningPct: "71%",
    newUsers: "51",
    avgSessionsPerUser: "1.3",
    peakHour: "18:00",
    peakDays: "Weekday evenings",
  },
  "7D": {
    returningPct: "68%",
    newUsers: "388",
    avgSessionsPerUser: "3.1",
    peakHour: "18:00",
    peakDays: "Tue–Fri typical",
  },
  "30D": {
    returningPct: "68%",
    newUsers: "712",
    avgSessionsPerUser: "3.4",
    peakHour: "18:00",
    peakDays: "Tue–Fri typical",
  },
  "90D": {
    returningPct: "65%",
    newUsers: "1,840",
    avgSessionsPerUser: "3.8",
    peakHour: "18:00",
    peakDays: "Weekday evenings",
  },
};
