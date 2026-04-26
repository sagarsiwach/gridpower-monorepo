/**
 * BESS site fleet — 24 sites across India.
 */

export type SiteStatus = "online" | "offline" | "maintenance" | "commissioning";

export interface BessSite {
  id: string;
  name: string;
  city: string;
  state: string;
  capacityMwh: number;
  powerMw: number;
  soc: number;           // 0–100
  status: SiteStatus;
  lastSeen: string;
  commissionDate: string;
  dischargeMw: number;
  revenueToday: number;
  uptime: number;        // percent, e.g. 99.2
  customer: string;
  stackCount: number;
}

export const ALL_SITES: BessSite[] = [
  { id: "site_001", name: "Pune Hinjewadi BESS",          city: "Pune",          state: "MH", capacityMwh: 20.0, powerMw: 10.0, soc: 72, status: "online",        lastSeen: "just now",  commissionDate: "2023-08-14", dischargeMw: 4.2, revenueToday: 184200, uptime: 99.4, customer: "Tata Consultancy Services",  stackCount: 5  },
  { id: "site_002", name: "Bengaluru Whitefield BESS",    city: "Bengaluru",     state: "KA", capacityMwh: 16.0, powerMw: 8.0,  soc: 61, status: "online",        lastSeen: "1 min ago", commissionDate: "2023-06-20", dischargeMw: 3.6, revenueToday: 156800, uptime: 99.1, customer: "Infosys Limited",             stackCount: 4  },
  { id: "site_003", name: "Chennai Sriperumbudur BESS",   city: "Chennai",       state: "TN", capacityMwh: 12.0, powerMw: 6.0,  soc: 58, status: "online",        lastSeen: "2 min ago", commissionDate: "2023-11-03", dischargeMw: 2.8, revenueToday: 124400, uptime: 98.8, customer: "Hyundai Motor India",         stackCount: 3  },
  { id: "site_004", name: "Hyderabad Medchal BESS",       city: "Hyderabad",     state: "TS", capacityMwh: 10.0, powerMw: 5.0,  soc: 45, status: "online",        lastSeen: "1 min ago", commissionDate: "2024-01-17", dischargeMw: 2.4, revenueToday: 108600, uptime: 99.6, customer: "Hetero Drugs",               stackCount: 3  },
  { id: "site_005", name: "Mumbai Bhiwandi BESS",         city: "Mumbai",        state: "MH", capacityMwh: 8.0,  powerMw: 4.0,  soc: 83, status: "online",        lastSeen: "3 min ago", commissionDate: "2023-09-28", dischargeMw: 0.0, revenueToday: 82400,  uptime: 98.2, customer: "Reliance Industries",         stackCount: 2  },
  { id: "site_006", name: "Delhi Noida Sector 62 BESS",   city: "Noida",         state: "UP", capacityMwh: 8.0,  powerMw: 4.0,  soc: 38, status: "online",        lastSeen: "2 min ago", commissionDate: "2024-02-05", dischargeMw: 1.8, revenueToday: 76200,  uptime: 97.9, customer: "HCL Technologies",            stackCount: 2  },
  { id: "site_007", name: "Ahmedabad Changodar BESS",     city: "Ahmedabad",     state: "GJ", capacityMwh: 6.0,  powerMw: 3.0,  soc: 55, status: "online",        lastSeen: "4 min ago", commissionDate: "2024-03-12", dischargeMw: 1.2, revenueToday: 62400,  uptime: 99.0, customer: "Gujarat Heavy Chemicals",     stackCount: 2  },
  { id: "site_008", name: "Coimbatore Arasur BESS",       city: "Coimbatore",    state: "TN", capacityMwh: 6.0,  powerMw: 3.0,  soc: 0,  status: "maintenance",   lastSeen: "6h ago",    commissionDate: "2023-12-01", dischargeMw: 0.0, revenueToday: 0,      uptime: 94.2, customer: "Pricol Limited",              stackCount: 2  },
  { id: "site_009", name: "Kolkata Salt Lake BESS",       city: "Kolkata",       state: "WB", capacityMwh: 5.0,  powerMw: 2.5,  soc: 67, status: "online",        lastSeen: "1 min ago", commissionDate: "2024-04-08", dischargeMw: 1.0, revenueToday: 48600,  uptime: 98.7, customer: "ITC Limited",                stackCount: 2  },
  { id: "site_010", name: "Jaipur Sitapura BESS",         city: "Jaipur",        state: "RJ", capacityMwh: 4.0,  powerMw: 2.0,  soc: 78, status: "online",        lastSeen: "5 min ago", commissionDate: "2024-05-22", dischargeMw: 0.8, revenueToday: 42800,  uptime: 99.3, customer: "Rajasthan Electronics",      stackCount: 1  },
  { id: "site_011", name: "Nagpur Butibori BESS",         city: "Nagpur",        state: "MH", capacityMwh: 4.0,  powerMw: 2.0,  soc: 52, status: "online",        lastSeen: "2 min ago", commissionDate: "2024-06-14", dischargeMw: 0.6, revenueToday: 38400,  uptime: 98.4, customer: "MAHA-Genco",                 stackCount: 1  },
  { id: "site_012", name: "Surat Sachin BESS",            city: "Surat",         state: "GJ", capacityMwh: 4.0,  powerMw: 2.0,  soc: 44, status: "online",        lastSeen: "3 min ago", commissionDate: "2024-07-02", dischargeMw: 0.5, revenueToday: 34600,  uptime: 98.9, customer: "Reliance Retail",             stackCount: 1  },
  { id: "site_013", name: "Lucknow Amausi BESS",          city: "Lucknow",       state: "UP", capacityMwh: 3.0,  powerMw: 1.5,  soc: 0,  status: "offline",       lastSeen: "2h 14m ago",commissionDate: "2024-02-28", dischargeMw: 0.0, revenueToday: 0,      uptime: 88.6, customer: "UPCL",                       stackCount: 1  },
  { id: "site_014", name: "Bhopal Mandideep BESS",        city: "Bhopal",        state: "MP", capacityMwh: 3.0,  powerMw: 1.5,  soc: 91, status: "online",        lastSeen: "4 min ago", commissionDate: "2024-08-09", dischargeMw: 0.0, revenueToday: 28200,  uptime: 99.1, customer: "BHEL",                       stackCount: 1  },
  { id: "site_015", name: "Visakhapatnam Steel BESS",     city: "Visakhapatnam", state: "AP", capacityMwh: 10.0, powerMw: 5.0,  soc: 64, status: "online",        lastSeen: "1 min ago", commissionDate: "2023-10-15", dischargeMw: 2.0, revenueToday: 96400,  uptime: 98.6, customer: "RINL Steel Plant",            stackCount: 3  },
  { id: "site_016", name: "Kochi Smart City BESS",        city: "Kochi",         state: "KL", capacityMwh: 6.0,  powerMw: 3.0,  soc: 48, status: "online",        lastSeen: "6 min ago", commissionDate: "2024-01-30", dischargeMw: 1.0, revenueToday: 52800,  uptime: 97.8, customer: "Smart City Kochi Corp",      stackCount: 2  },
  { id: "site_017", name: "Gurgaon Manesar BESS",         city: "Gurgaon",       state: "HR", capacityMwh: 8.0,  powerMw: 4.0,  soc: 36, status: "online",        lastSeen: "2 min ago", commissionDate: "2023-12-18", dischargeMw: 1.6, revenueToday: 74200,  uptime: 98.1, customer: "Maruti Suzuki India",         stackCount: 2  },
  { id: "site_018", name: "Indore Pithampur BESS",        city: "Indore",        state: "MP", capacityMwh: 4.0,  powerMw: 2.0,  soc: 73, status: "online",        lastSeen: "7 min ago", commissionDate: "2024-09-04", dischargeMw: 0.4, revenueToday: 36400,  uptime: 98.8, customer: "Hindustan Unilever",          stackCount: 1  },
  { id: "site_019", name: "Vadodara Savli BESS",          city: "Vadodara",      state: "GJ", capacityMwh: 5.0,  powerMw: 2.5,  soc: 59, status: "online",        lastSeen: "3 min ago", commissionDate: "2024-07-19", dischargeMw: 0.8, revenueToday: 46200,  uptime: 99.2, customer: "ONGC Gujarat",               stackCount: 2  },
  { id: "site_020", name: "Mysuru Hebbal BESS",           city: "Mysuru",        state: "KA", capacityMwh: 3.0,  powerMw: 1.5,  soc: 84, status: "online",        lastSeen: "9 min ago", commissionDate: "2024-10-01", dischargeMw: 0.0, revenueToday: 24600,  uptime: 99.5, customer: "JSW Steel",                  stackCount: 1  },
  { id: "site_021", name: "Patna Hajipur BESS",           city: "Patna",         state: "BR", capacityMwh: 2.0,  powerMw: 1.0,  soc: 42, status: "online",        lastSeen: "12 min ago",commissionDate: "2024-11-08", dischargeMw: 0.3, revenueToday: 18400,  uptime: 97.4, customer: "Bihar State Power Corp",     stackCount: 1  },
  { id: "site_022", name: "Guwahati Amingaon BESS",       city: "Guwahati",      state: "AS", capacityMwh: 2.0,  powerMw: 1.0,  soc: 0,  status: "commissioning", lastSeen: "never",     commissionDate: "2025-01-15", dischargeMw: 0.0, revenueToday: 0,      uptime: 0.0,  customer: "Assam Power Distribution",  stackCount: 1  },
  { id: "site_023", name: "Ludhiana Focal Point BESS",    city: "Ludhiana",      state: "PB", capacityMwh: 3.0,  powerMw: 1.5,  soc: 66, status: "online",        lastSeen: "5 min ago", commissionDate: "2024-08-24", dischargeMw: 0.4, revenueToday: 28800,  uptime: 98.3, customer: "Hero MotoCorp",              stackCount: 1  },
  { id: "site_024", name: "Bhubaneswar Khordha BESS",     city: "Bhubaneswar",   state: "OD", capacityMwh: 4.0,  powerMw: 2.0,  soc: 55, status: "online",        lastSeen: "4 min ago", commissionDate: "2024-06-30", dischargeMw: 0.6, revenueToday: 34200,  uptime: 98.7, customer: "GRIDCO Odisha",              stackCount: 1  },
];
