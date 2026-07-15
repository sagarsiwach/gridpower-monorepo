/**
 * Dashboard mock fixtures for GridEnergy Console.
 * KPI stats, 24h energy-flow series, top sites, live grid-events feed.
 */

// ─── KPI Stats ────────────────────────────────────────────────────────────────

export const STATS = {
  storedMwh: "142.6 MWh",
  storedTrend: "+4.2 MWh vs yesterday",
  dischargeMw: "18.4 MW",
  dischargeTrend: "Current discharge rate",
  revenueToday: "₹9,84,200",
  revenueTrend: "+11% vs avg",
  sitesOnline: 21,
  sitesTotal: 24,
  sitesTrend: "87.5% availability",
};

// ─── 24h energy-flow series (hourly) ─────────────────────────────────────────

export interface EnergyDataPoint {
  hour: string;
  charged: number;   // MWh charged into BESS
  discharged: number; // MWh discharged from BESS
  soc: number;       // Fleet avg SoC%
}

export const ENERGY_SERIES_24H: EnergyDataPoint[] = [
  { hour: "00:00", charged: 12.4, discharged: 4.2, soc: 62 },
  { hour: "01:00", charged: 14.8, discharged: 2.1, soc: 68 },
  { hour: "02:00", charged: 16.2, discharged: 1.8, soc: 74 },
  { hour: "03:00", charged: 15.6, discharged: 1.4, soc: 79 },
  { hour: "04:00", charged: 14.1, discharged: 1.6, soc: 83 },
  { hour: "05:00", charged: 12.8, discharged: 2.4, soc: 86 },
  { hour: "06:00", charged: 8.4,  discharged: 5.8, soc: 84 },
  { hour: "07:00", charged: 4.2,  discharged: 14.6, soc: 78 },
  { hour: "08:00", charged: 2.8,  discharged: 22.4, soc: 68 },
  { hour: "09:00", charged: 3.4,  discharged: 24.8, soc: 58 },
  { hour: "10:00", charged: 4.2,  discharged: 21.6, soc: 51 },
  { hour: "11:00", charged: 5.6,  discharged: 18.4, soc: 47 },
  { hour: "12:00", charged: 18.4, discharged: 6.2,  soc: 53 },
  { hour: "13:00", charged: 24.6, discharged: 4.8,  soc: 63 },
  { hour: "14:00", charged: 22.8, discharged: 5.4,  soc: 72 },
  { hour: "15:00", charged: 20.4, discharged: 6.8,  soc: 78 },
  { hour: "16:00", charged: 14.2, discharged: 12.4, soc: 76 },
  { hour: "17:00", charged: 4.8,  discharged: 28.6, soc: 64 },
  { hour: "18:00", charged: 2.4,  discharged: 32.4, soc: 51 },
  { hour: "19:00", charged: 2.8,  discharged: 30.2, soc: 40 },
  { hour: "20:00", charged: 4.2,  discharged: 24.8, soc: 33 },
  { hour: "21:00", charged: 8.6,  discharged: 16.4, soc: 32 },
  { hour: "22:00", charged: 14.4, discharged: 8.2,  soc: 37 },
  { hour: "23:00", charged: 16.8, discharged: 4.4,  soc: 44 },
];

// ─── Top sites (8 rows) ───────────────────────────────────────────────────────

export interface TopSite {
  id: string;
  name: string;
  location: string;
  capacityMwh: number;
  soc: number;
  dischargeMw: number;
  revenueToday: number;
  status: "online" | "offline" | "maintenance";
}

export const TOP_SITES: TopSite[] = [
  { id: "site_001", name: "Pune Hinjewadi BESS",         location: "Pune, MH",       capacityMwh: 20.0, soc: 72, dischargeMw: 4.2, revenueToday: 184200, status: "online" },
  { id: "site_002", name: "Bengaluru Whitefield BESS",   location: "Bengaluru, KA",  capacityMwh: 16.0, soc: 61, dischargeMw: 3.6, revenueToday: 156800, status: "online" },
  { id: "site_003", name: "Chennai Sriperumbudur BESS",  location: "Chennai, TN",    capacityMwh: 12.0, soc: 58, dischargeMw: 2.8, revenueToday: 124400, status: "online" },
  { id: "site_004", name: "Hyderabad Medchal BESS",      location: "Hyderabad, TS",  capacityMwh: 10.0, soc: 45, dischargeMw: 2.4, revenueToday: 108600, status: "online" },
  { id: "site_005", name: "Mumbai Bhiwandi BESS",        location: "Mumbai, MH",     capacityMwh: 8.0,  soc: 83, dischargeMw: 0.0, revenueToday: 82400,  status: "online" },
  { id: "site_006", name: "Delhi Noida Sector 62 BESS",  location: "Noida, UP",      capacityMwh: 8.0,  soc: 38, dischargeMw: 1.8, revenueToday: 76200,  status: "online" },
  { id: "site_007", name: "Ahmedabad Changodar BESS",    location: "Ahmedabad, GJ",  capacityMwh: 6.0,  soc: 55, dischargeMw: 1.2, revenueToday: 62400,  status: "online" },
  { id: "site_008", name: "Coimbatore Arasur BESS",      location: "Coimbatore, TN", capacityMwh: 6.0,  soc: 0,  dischargeMw: 0.0, revenueToday: 0,      status: "maintenance" },
];

// ─── Live grid events feed (6 items) ─────────────────────────────────────────

export type GridEventSeverity = "critical" | "warning" | "info" | "resolved";

export interface LiveGridEvent {
  id: string;
  severity: GridEventSeverity;
  type: string;
  description: string;
  affectedSites: number;
  timeAgo: string;
  read: boolean;
}

export const LIVE_EVENTS: LiveGridEvent[] = [
  { id: "ge_001", severity: "critical", type: "Under-frequency",  description: "Grid frequency dropped to 49.72 Hz at Pune BESS — dispatch triggered", affectedSites: 2, timeAgo: "4 min",   read: false },
  { id: "ge_002", severity: "warning",  type: "Voltage sag",      description: "Voltage at 0.92 pu on Bengaluru feeder — BESS reactive support active",  affectedSites: 1, timeAgo: "18 min",  read: false },
  { id: "ge_003", severity: "info",     type: "DR dispatch",       description: "Demand response program DR-P2 dispatched 8.4 MW across 3 sites",         affectedSites: 3, timeAgo: "42 min",  read: true  },
  { id: "ge_004", severity: "resolved", type: "Over-frequency",    description: "Over-frequency event at Chennai resolved — grid back to 50.02 Hz",        affectedSites: 1, timeAgo: "1h 08m", read: true  },
  { id: "ge_005", severity: "info",     type: "Schedule executed", description: "Evening peak discharge schedule executed on time across 6 sites",          affectedSites: 6, timeAgo: "2h 14m", read: true  },
  { id: "ge_006", severity: "warning",  type: "SoC low",           description: "Delhi Noida BESS SoC below 40% threshold — recharge recommended",        affectedSites: 1, timeAgo: "3h 02m", read: true  },
];
