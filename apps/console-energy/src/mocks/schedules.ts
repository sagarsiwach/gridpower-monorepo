/**
 * Discharge schedule mocks — 20 schedules.
 */

export type ScheduleType = "peak-discharge" | "arbitrage" | "dr-dispatch" | "frequency-response";
export type ScheduleStatus = "active" | "paused" | "completed" | "draft";
export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export interface Schedule {
  id: string;
  name: string;
  siteId: string;
  siteName: string;
  type: ScheduleType;
  windowStart: string;
  windowEnd: string;
  targetMw: number;
  daysOfWeek: DayOfWeek[];
  status: ScheduleStatus;
  nextRun: string;
  lastRun: string | null;
  executionCount: number;
}

export const ALL_SCHEDULES: Schedule[] = [
  { id: "sch_001", name: "Pune Peak Evening",          siteId: "site_001", siteName: "Pune Hinjewadi BESS",          type: "peak-discharge",      windowStart: "17:00", windowEnd: "21:00", targetMw: 6.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Today 17:00",     lastRun: "Yesterday 17:00", executionCount: 142 },
  { id: "sch_002", name: "Bengaluru Arbitrage Morning", siteId: "site_002", siteName: "Bengaluru Whitefield BESS",    type: "arbitrage",           windowStart: "07:00", windowEnd: "10:00", targetMw: 4.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat"],  status: "active",    nextRun: "Tomorrow 07:00",  lastRun: "Today 07:00",     executionCount: 88  },
  { id: "sch_003", name: "Chennai DR Dispatch",         siteId: "site_003", siteName: "Chennai Sriperumbudur BESS",   type: "dr-dispatch",         windowStart: "18:00", windowEnd: "22:00", targetMw: 3.5, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Today 18:00",     lastRun: "Yesterday 18:00", executionCount: 67  },
  { id: "sch_004", name: "Hyderabad Freq Response",     siteId: "site_004", siteName: "Hyderabad Medchal BESS",       type: "frequency-response",  windowStart: "00:00", windowEnd: "23:59", targetMw: 2.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], status: "active", nextRun: "Continuous",      lastRun: "5 min ago",       executionCount: 1040 },
  { id: "sch_005", name: "Mumbai Off-peak Charge",      siteId: "site_005", siteName: "Mumbai Bhiwandi BESS",         type: "arbitrage",           windowStart: "01:00", windowEnd: "05:00", targetMw: -4.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], status: "paused", nextRun: "Paused",          lastRun: "3 days ago",      executionCount: 32  },
  { id: "sch_006", name: "Noida Peak Lunch",            siteId: "site_006", siteName: "Delhi Noida Sector 62 BESS",   type: "peak-discharge",      windowStart: "12:00", windowEnd: "14:30", targetMw: 2.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Tomorrow 12:00",  lastRun: "Today 12:00",     executionCount: 54  },
  { id: "sch_007", name: "Ahmedabad Evening Peak",      siteId: "site_007", siteName: "Ahmedabad Changodar BESS",     type: "peak-discharge",      windowStart: "19:00", windowEnd: "22:30", targetMw: 1.8, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat"],  status: "active",    nextRun: "Today 19:00",     lastRun: "Yesterday 19:00", executionCount: 76  },
  { id: "sch_008", name: "Coimbatore Maintenance Hold", siteId: "site_008", siteName: "Coimbatore Arasur BESS",       type: "peak-discharge",      windowStart: "17:00", windowEnd: "20:00", targetMw: 1.5, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "paused",    nextRun: "Paused",          lastRun: "6 days ago",      executionCount: 28  },
  { id: "sch_009", name: "Kolkata DR Afternoon",        siteId: "site_009", siteName: "Kolkata Salt Lake BESS",       type: "dr-dispatch",         windowStart: "14:00", windowEnd: "18:00", targetMw: 1.5, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Tomorrow 14:00",  lastRun: "Today 14:00",     executionCount: 41  },
  { id: "sch_010", name: "Jaipur Peak Evening",         siteId: "site_010", siteName: "Jaipur Sitapura BESS",         type: "peak-discharge",      windowStart: "18:30", windowEnd: "22:00", targetMw: 1.2, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat"],  status: "active",    nextRun: "Today 18:30",     lastRun: "Yesterday 18:30", executionCount: 38  },
  { id: "sch_011", name: "Nagpur Arbitrage Night",      siteId: "site_011", siteName: "Nagpur Butibori BESS",         type: "arbitrage",           windowStart: "22:00", windowEnd: "02:00", targetMw: 0.8, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], status: "active",  nextRun: "Tonight 22:00",   lastRun: "Yesterday 22:00", executionCount: 62  },
  { id: "sch_012", name: "Surat Evening Dispatch",      siteId: "site_012", siteName: "Surat Sachin BESS",            type: "peak-discharge",      windowStart: "17:30", windowEnd: "21:30", targetMw: 1.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Today 17:30",     lastRun: "Yesterday 17:30", executionCount: 44  },
  { id: "sch_013", name: "Vizag Steel Freq Response",   siteId: "site_015", siteName: "Visakhapatnam Steel BESS",     type: "frequency-response",  windowStart: "00:00", windowEnd: "23:59", targetMw: 3.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], status: "active", nextRun: "Continuous",      lastRun: "11 min ago",      executionCount: 820 },
  { id: "sch_014", name: "Kochi Smart City Evening",    siteId: "site_016", siteName: "Kochi Smart City BESS",        type: "peak-discharge",      windowStart: "18:00", windowEnd: "22:00", targetMw: 1.8, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat"],  status: "active",    nextRun: "Today 18:00",     lastRun: "Yesterday 18:00", executionCount: 56  },
  { id: "sch_015", name: "Manesar Maruti Peak",         siteId: "site_017", siteName: "Gurgaon Manesar BESS",         type: "peak-discharge",      windowStart: "08:00", windowEnd: "10:00", targetMw: 2.4, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Tomorrow 08:00",  lastRun: "Today 08:00",     executionCount: 92  },
  { id: "sch_016", name: "Indore HUL Night Arb",        siteId: "site_018", siteName: "Indore Pithampur BESS",        type: "arbitrage",           windowStart: "23:00", windowEnd: "05:00", targetMw: 0.6, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], status: "draft",  nextRun: "Not scheduled",   lastRun: null,              executionCount: 0   },
  { id: "sch_017", name: "Vadodara ONGC Evening",       siteId: "site_019", siteName: "Vadodara Savli BESS",          type: "peak-discharge",      windowStart: "17:00", windowEnd: "21:00", targetMw: 1.4, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "active",    nextRun: "Today 17:00",     lastRun: "Yesterday 17:00", executionCount: 48  },
  { id: "sch_018", name: "Mysuru JSW Night",            siteId: "site_020", siteName: "Mysuru Hebbal BESS",           type: "arbitrage",           windowStart: "21:00", windowEnd: "04:00", targetMw: 0.8, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], status: "active",  nextRun: "Tonight 21:00",   lastRun: "Yesterday 21:00", executionCount: 26  },
  { id: "sch_019", name: "Ludhiana Hero Peak",          siteId: "site_023", siteName: "Ludhiana Focal Point BESS",    type: "peak-discharge",      windowStart: "16:00", windowEnd: "20:00", targetMw: 0.8, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri","Sat"],  status: "active",    nextRun: "Today 16:00",     lastRun: "Yesterday 16:00", executionCount: 34  },
  { id: "sch_020", name: "Bhubaneswar GRIDCO DR",       siteId: "site_024", siteName: "Bhubaneswar Khordha BESS",     type: "dr-dispatch",         windowStart: "18:00", windowEnd: "22:00", targetMw: 1.0, daysOfWeek: ["Mon","Tue","Wed","Thu","Fri"],       status: "completed", nextRun: "Expired",         lastRun: "3 days ago",      executionCount: 18  },
];
