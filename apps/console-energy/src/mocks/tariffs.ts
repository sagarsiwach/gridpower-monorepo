/**
 * Tariff (time-of-use) plan mocks — 10 plans.
 */

export type RateType = "TOU" | "flat" | "dynamic";

export interface TouSlot {
  label: string;
  hours: string;
  days: string;
  ratePerKwh: number;   // ₹/kWh
}

export interface Tariff {
  id: string;
  name: string;
  region: string;
  utility: string;
  type: RateType;
  activePeriod: string;
  sitesAssigned: number;
  status: "active" | "draft" | "expired";
  slots: TouSlot[];
}

export const ALL_TARIFFS: Tariff[] = [
  {
    id: "tar_001",
    name: "Maharashtra Peak TOU 2024",
    region: "Maharashtra",
    utility: "MSEDCL",
    type: "TOU",
    activePeriod: "Apr 2024 – Mar 2025",
    sitesAssigned: 3,
    status: "active",
    slots: [
      { label: "Super-peak", hours: "18:00–22:00", days: "Mon–Fri", ratePerKwh: 9.80 },
      { label: "Peak",       hours: "07:00–18:00", days: "Mon–Fri", ratePerKwh: 7.40 },
      { label: "Off-peak",   hours: "22:00–07:00", days: "All",     ratePerKwh: 4.20 },
      { label: "Weekend",    hours: "All",          days: "Sat–Sun", ratePerKwh: 5.60 },
    ],
  },
  {
    id: "tar_002",
    name: "Karnataka Industrial TOU 2024",
    region: "Karnataka",
    utility: "BESCOM",
    type: "TOU",
    activePeriod: "Apr 2024 – Mar 2025",
    sitesAssigned: 2,
    status: "active",
    slots: [
      { label: "Super-peak", hours: "17:00–21:00", days: "Mon–Fri", ratePerKwh: 10.20 },
      { label: "Peak",       hours: "06:00–17:00", days: "Mon–Fri", ratePerKwh: 7.80 },
      { label: "Off-peak",   hours: "21:00–06:00", days: "All",     ratePerKwh: 4.50 },
    ],
  },
  {
    id: "tar_003",
    name: "Tamil Nadu Commercial TOU",
    region: "Tamil Nadu",
    utility: "TANGEDCO",
    type: "TOU",
    activePeriod: "Jan 2024 – Dec 2024",
    sitesAssigned: 2,
    status: "active",
    slots: [
      { label: "Peak",     hours: "06:00–22:00", days: "Mon–Sat", ratePerKwh: 8.60 },
      { label: "Off-peak", hours: "22:00–06:00", days: "All",     ratePerKwh: 3.80 },
      { label: "Sunday",   hours: "All",          days: "Sun",     ratePerKwh: 5.00 },
    ],
  },
  {
    id: "tar_004",
    name: "Telangana DR Premium",
    region: "Telangana",
    utility: "TSNPDCL",
    type: "dynamic",
    activePeriod: "Apr 2024 – Mar 2025",
    sitesAssigned: 1,
    status: "active",
    slots: [
      { label: "DR event",   hours: "Variable",    days: "Weekday", ratePerKwh: 14.00 },
      { label: "Peak",       hours: "17:00–22:00", days: "Mon–Fri", ratePerKwh: 9.40 },
      { label: "Off-peak",   hours: "22:00–06:00", days: "All",     ratePerKwh: 4.00 },
    ],
  },
  {
    id: "tar_005",
    name: "UP Industrial Flat Rate",
    region: "Uttar Pradesh",
    utility: "UPPCL",
    type: "flat",
    activePeriod: "Jan 2024 – Dec 2024",
    sitesAssigned: 2,
    status: "active",
    slots: [
      { label: "Flat",     hours: "All",          days: "All",     ratePerKwh: 7.20 },
    ],
  },
  {
    id: "tar_006",
    name: "Gujarat Commercial TOU 2024",
    region: "Gujarat",
    utility: "DGVCL",
    type: "TOU",
    activePeriod: "Apr 2024 – Mar 2025",
    sitesAssigned: 3,
    status: "active",
    slots: [
      { label: "Super-peak", hours: "19:00–23:00", days: "Mon–Fri", ratePerKwh: 9.60 },
      { label: "Peak",       hours: "07:00–19:00", days: "Mon–Fri", ratePerKwh: 7.20 },
      { label: "Off-peak",   hours: "23:00–07:00", days: "All",     ratePerKwh: 4.10 },
    ],
  },
  {
    id: "tar_007",
    name: "Andhra Pradesh Coastal TOU",
    region: "Andhra Pradesh",
    utility: "APEPDCL",
    type: "TOU",
    activePeriod: "Apr 2024 – Mar 2025",
    sitesAssigned: 1,
    status: "active",
    slots: [
      { label: "Peak",       hours: "06:00–22:00", days: "Mon–Sat", ratePerKwh: 8.20 },
      { label: "Off-peak",   hours: "22:00–06:00", days: "All",     ratePerKwh: 4.40 },
    ],
  },
  {
    id: "tar_008",
    name: "West Bengal HV Commercial",
    region: "West Bengal",
    utility: "WBSEDCL",
    type: "TOU",
    activePeriod: "Oct 2023 – Sep 2024",
    sitesAssigned: 1,
    status: "active",
    slots: [
      { label: "Peak",     hours: "07:00–23:00", days: "Mon–Sat", ratePerKwh: 7.80 },
      { label: "Off-peak", hours: "23:00–07:00", days: "All",     ratePerKwh: 3.90 },
    ],
  },
  {
    id: "tar_009",
    name: "Kerala KSEB Green TOU",
    region: "Kerala",
    utility: "KSEB",
    type: "TOU",
    activePeriod: "Jan 2024 – Dec 2024",
    sitesAssigned: 1,
    status: "active",
    slots: [
      { label: "Peak",       hours: "18:00–22:00", days: "Mon–Fri", ratePerKwh: 8.80 },
      { label: "Mid-peak",   hours: "07:00–18:00", days: "Mon–Sat", ratePerKwh: 6.40 },
      { label: "Off-peak",   hours: "22:00–07:00", days: "All",     ratePerKwh: 3.60 },
    ],
  },
  {
    id: "tar_010",
    name: "Haryana Pilot Dynamic Rate",
    region: "Haryana",
    utility: "DHBVN",
    type: "dynamic",
    activePeriod: "Oct 2023 – Sep 2024",
    sitesAssigned: 1,
    status: "expired",
    slots: [
      { label: "DR event",  hours: "Variable",    days: "Weekday", ratePerKwh: 13.00 },
      { label: "Peak",      hours: "17:00–21:00", days: "Mon–Fri", ratePerKwh: 8.80 },
      { label: "Off-peak",  hours: "21:00–06:00", days: "All",     ratePerKwh: 3.80 },
    ],
  },
];
