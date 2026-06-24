/**
 * Analytics mocks — chart series, ROI breakdown, energy throughput.
 */

// ─── Monthly energy throughput (12 months) ────────────────────────────────────

export interface MonthlyEnergy {
  month: string;
  chargedMwh: number;
  dischargedMwh: number;
  rtePercent: number;  // Round-trip efficiency
}

export const MONTHLY_ENERGY: MonthlyEnergy[] = [
  { month: "May 2024",  chargedMwh: 1820, dischargedMwh: 1674, rtePercent: 91.9 },
  { month: "Jun 2024",  chargedMwh: 1940, dischargedMwh: 1788, rtePercent: 92.2 },
  { month: "Jul 2024",  chargedMwh: 2140, dischargedMwh: 1968, rtePercent: 91.9 },
  { month: "Aug 2024",  chargedMwh: 2280, dischargedMwh: 2100, rtePercent: 92.1 },
  { month: "Sep 2024",  chargedMwh: 2060, dischargedMwh: 1896, rtePercent: 92.0 },
  { month: "Oct 2024",  chargedMwh: 2420, dischargedMwh: 2234, rtePercent: 92.3 },
  { month: "Nov 2024",  chargedMwh: 2560, dischargedMwh: 2363, rtePercent: 92.3 },
  { month: "Dec 2024",  chargedMwh: 2380, dischargedMwh: 2194, rtePercent: 92.2 },
  { month: "Jan 2025",  chargedMwh: 2200, dischargedMwh: 2026, rtePercent: 92.1 },
  { month: "Feb 2025",  chargedMwh: 2080, dischargedMwh: 1910, rtePercent: 91.8 },
  { month: "Mar 2025",  chargedMwh: 2340, dischargedMwh: 2156, rtePercent: 92.1 },
  { month: "Apr 2025",  chargedMwh: 1862, dischargedMwh: 1716, rtePercent: 92.2 },
];

// ─── Revenue series (30 days) ─────────────────────────────────────────────────

export interface RevenueDataPoint {
  date: string;
  revenue: number;
}

export const REVENUE_30D: RevenueDataPoint[] = [
  { date: "Mar 28", revenue: 642000 },
  { date: "Mar 29", revenue: 718000 },
  { date: "Mar 30", revenue: 694000 },
  { date: "Mar 31", revenue: 812000 },
  { date: "Apr 1",  revenue: 724000 },
  { date: "Apr 2",  revenue: 688000 },
  { date: "Apr 3",  revenue: 652000 },
  { date: "Apr 4",  revenue: 802000 },
  { date: "Apr 5",  revenue: 868000 },
  { date: "Apr 6",  revenue: 844000 },
  { date: "Apr 7",  revenue: 756000 },
  { date: "Apr 8",  revenue: 720000 },
  { date: "Apr 9",  revenue: 688000 },
  { date: "Apr 10", revenue: 842000 },
  { date: "Apr 11", revenue: 896000 },
  { date: "Apr 12", revenue: 924000 },
  { date: "Apr 13", revenue: 868000 },
  { date: "Apr 14", revenue: 812000 },
  { date: "Apr 15", revenue: 776000 },
  { date: "Apr 16", revenue: 844000 },
  { date: "Apr 17", revenue: 912000 },
  { date: "Apr 18", revenue: 948000 },
  { date: "Apr 19", revenue: 884000 },
  { date: "Apr 20", revenue: 856000 },
  { date: "Apr 21", revenue: 820000 },
  { date: "Apr 22", revenue: 888000 },
  { date: "Apr 23", revenue: 924000 },
  { date: "Apr 24", revenue: 968000 },
  { date: "Apr 25", revenue: 912000 },
  { date: "Apr 26", revenue: 984200 },
];

// ─── ROI breakdown per site ───────────────────────────────────────────────────

export interface SiteRoi {
  siteId: string;
  siteName: string;
  capacityMwh: number;
  capexCr: number;        // ₹ crore
  revenueYtdCr: number;   // ₹ crore
  opexPerYearCr: number;  // ₹ crore
  paybackYears: number;
  irrPercent: number;
  commissionDate: string;
}

export const SITE_ROI: SiteRoi[] = [
  { siteId: "site_001", siteName: "Pune Hinjewadi BESS",          capacityMwh: 20.0, capexCr: 12.4, revenueYtdCr: 3.82, opexPerYearCr: 0.48, paybackYears: 4.2, irrPercent: 18.4, commissionDate: "2023-08-14" },
  { siteId: "site_002", siteName: "Bengaluru Whitefield BESS",    capacityMwh: 16.0, capexCr: 9.8,  revenueYtdCr: 3.12, opexPerYearCr: 0.38, paybackYears: 4.4, irrPercent: 17.8, commissionDate: "2023-06-20" },
  { siteId: "site_003", siteName: "Chennai Sriperumbudur BESS",   capacityMwh: 12.0, capexCr: 7.4,  revenueYtdCr: 2.42, opexPerYearCr: 0.28, paybackYears: 4.1, irrPercent: 19.2, commissionDate: "2023-11-03" },
  { siteId: "site_004", siteName: "Hyderabad Medchal BESS",       capacityMwh: 10.0, capexCr: 6.2,  revenueYtdCr: 2.18, opexPerYearCr: 0.24, paybackYears: 3.8, irrPercent: 20.6, commissionDate: "2024-01-17" },
  { siteId: "site_005", siteName: "Mumbai Bhiwandi BESS",         capacityMwh: 8.0,  capexCr: 5.0,  revenueYtdCr: 1.64, opexPerYearCr: 0.20, paybackYears: 4.3, irrPercent: 18.1, commissionDate: "2023-09-28" },
  { siteId: "site_015", siteName: "Visakhapatnam Steel BESS",     capacityMwh: 10.0, capexCr: 6.2,  revenueYtdCr: 1.96, opexPerYearCr: 0.24, paybackYears: 4.6, irrPercent: 16.8, commissionDate: "2023-10-15" },
  { siteId: "site_017", siteName: "Gurgaon Manesar BESS",         capacityMwh: 8.0,  capexCr: 5.0,  revenueYtdCr: 1.42, opexPerYearCr: 0.20, paybackYears: 4.9, irrPercent: 15.4, commissionDate: "2023-12-18" },
];

// ─── Cumulative cashflow (months from commissioning) ─────────────────────────

export interface CashflowPoint {
  month: number;   // months from commissioning
  cumulative: number;  // ₹ crore
}

export const CUMULATIVE_CASHFLOW: CashflowPoint[] = Array.from({ length: 60 }, (_, i) => ({
  month: i + 1,
  cumulative: +((-12.4 + (i + 1) * 0.31).toFixed(2)),
}));

// ─── Capacity utilisation heatmap (site × month) ─────────────────────────────

export const UTILISATION_ROW_LABELS = ["Pune HJW", "BLR WF", "CHE SPB", "HYD MDC", "MUM BHW", "DEL NOI", "AMD CHG", "VIZ STL"];
export const UTILISATION_COL_LABELS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

// 0-5 scale heatmap
export const UTILISATION_DATA: number[][] = [
  [3,4,4,5,4,5,5,5,4,4,5,4],
  [3,3,4,4,4,4,5,5,4,4,4,4],
  [2,3,3,4,3,4,4,4,3,3,4,3],
  [3,3,4,4,4,4,4,4,4,3,4,4],
  [2,2,3,3,3,3,4,3,3,3,3,3],
  [2,2,3,3,2,3,3,3,3,2,3,3],
  [2,2,3,3,3,3,3,3,2,2,3,2],
  [3,3,4,4,3,4,4,4,3,3,4,4],
];

// ─── Analytics overview KPIs ──────────────────────────────────────────────────

export const ANALYTICS_KPI = {
  totalMwhThisYear: 23618,
  revenueThisYear: 98420000,
  avgRtePercent: 92.1,
  drEventCount: 142,
  avgPaybackYears: 4.3,
  fleetIrrPercent: 18.1,
};
