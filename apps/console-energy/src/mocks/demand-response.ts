/**
 * Demand response programs and events mocks.
 */

export type DRProgramStatus = "active" | "inactive" | "testing";
export type DREventStatus = "completed" | "active" | "upcoming" | "cancelled";
export type DRProgramType = "economic" | "emergency" | "frequency-regulation" | "spinning-reserve";

export interface DRProgram {
  id: string;
  name: string;
  utility: string;
  type: DRProgramType;
  dispatchCapMw: number;
  sitesEnrolled: number;
  status: DRProgramStatus;
  seasonStart: string;
  seasonEnd: string;
  revenueYtd: number;
}

export interface DREvent {
  id: string;
  programId: string;
  programName: string;
  startTime: string;
  endTime: string;
  durationMin: number;
  dispatchedMw: number;
  requestedMw: number;
  revenue: number;
  status: DREventStatus;
  sitesParticipating: number;
}

export const ALL_DR_PROGRAMS: DRProgram[] = [
  { id: "drp_001", name: "MSEDCL Peak Shaving",        utility: "MSEDCL",   type: "economic",             dispatchCapMw: 12.0, sitesEnrolled: 3, status: "active",   seasonStart: "Apr 2024", seasonEnd: "Mar 2025", revenueYtd: 1284000  },
  { id: "drp_002", name: "BESCOM Freq Regulation",     utility: "BESCOM",   type: "frequency-regulation", dispatchCapMw: 8.0,  sitesEnrolled: 2, status: "active",   seasonStart: "Jan 2024", seasonEnd: "Dec 2024", revenueYtd: 968400   },
  { id: "drp_003", name: "TANGEDCO Emergency Reserve", utility: "TANGEDCO", type: "emergency",            dispatchCapMw: 6.0,  sitesEnrolled: 2, status: "active",   seasonStart: "Apr 2024", seasonEnd: "Mar 2025", revenueYtd: 424800   },
  { id: "drp_004", name: "TSNPDCL Spinning Reserve",   utility: "TSNPDCL", type: "spinning-reserve",     dispatchCapMw: 4.0,  sitesEnrolled: 1, status: "active",   seasonStart: "Jan 2024", seasonEnd: "Dec 2024", revenueYtd: 612000   },
  { id: "drp_005", name: "APEPDCL Economic DR",        utility: "APEPDCL", type: "economic",             dispatchCapMw: 5.0,  sitesEnrolled: 1, status: "testing",  seasonStart: "Apr 2024", seasonEnd: "Mar 2025", revenueYtd: 124000   },
  { id: "drp_006", name: "DGVCL Gujarat Pilot",        utility: "DGVCL",   type: "economic",             dispatchCapMw: 6.0,  sitesEnrolled: 2, status: "inactive", seasonStart: "Oct 2023", seasonEnd: "Sep 2024", revenueYtd: 248000   },
];

export const ALL_DR_EVENTS: DREvent[] = [
  { id: "ev_001", programId: "drp_001", programName: "MSEDCL Peak Shaving",        startTime: "Apr 27, 18:00", endTime: "Apr 27, 21:00", durationMin: 180, dispatchedMw: 10.8, requestedMw: 12.0, revenue: 182400, status: "active",    sitesParticipating: 3 },
  { id: "ev_002", programId: "drp_002", programName: "BESCOM Freq Regulation",     startTime: "Apr 27, 14:22", endTime: "Apr 27, 14:47", durationMin: 25,  dispatchedMw: 7.6,  requestedMw: 8.0,  revenue: 38000,  status: "completed", sitesParticipating: 2 },
  { id: "ev_003", programId: "drp_001", programName: "MSEDCL Peak Shaving",        startTime: "Apr 26, 18:00", endTime: "Apr 26, 21:00", durationMin: 180, dispatchedMw: 11.2, requestedMw: 12.0, revenue: 178400, status: "completed", sitesParticipating: 3 },
  { id: "ev_004", programId: "drp_004", programName: "TSNPDCL Spinning Reserve",   startTime: "Apr 26, 09:14", endTime: "Apr 26, 09:44", durationMin: 30,  dispatchedMw: 3.8,  requestedMw: 4.0,  revenue: 46800,  status: "completed", sitesParticipating: 1 },
  { id: "ev_005", programId: "drp_003", programName: "TANGEDCO Emergency Reserve", startTime: "Apr 25, 17:30", endTime: "Apr 25, 20:30", durationMin: 180, dispatchedMw: 5.6,  requestedMw: 6.0,  revenue: 84000,  status: "completed", sitesParticipating: 2 },
  { id: "ev_006", programId: "drp_002", programName: "BESCOM Freq Regulation",     startTime: "Apr 25, 20:51", endTime: "Apr 25, 21:06", durationMin: 15,  dispatchedMw: 7.8,  requestedMw: 8.0,  revenue: 24000,  status: "completed", sitesParticipating: 2 },
  { id: "ev_007", programId: "drp_001", programName: "MSEDCL Peak Shaving",        startTime: "Apr 25, 18:00", endTime: "Apr 25, 21:00", durationMin: 180, dispatchedMw: 9.6,  requestedMw: 12.0, revenue: 152400, status: "completed", sitesParticipating: 2 },
  { id: "ev_008", programId: "drp_005", programName: "APEPDCL Economic DR",        startTime: "Apr 25, 16:00", endTime: "Apr 25, 18:00", durationMin: 120, dispatchedMw: 4.2,  requestedMw: 5.0,  revenue: 58000,  status: "completed", sitesParticipating: 1 },
  { id: "ev_009", programId: "drp_004", programName: "TSNPDCL Spinning Reserve",   startTime: "Apr 24, 11:33", endTime: "Apr 24, 12:03", durationMin: 30,  dispatchedMw: 4.0,  requestedMw: 4.0,  revenue: 49200,  status: "completed", sitesParticipating: 1 },
  { id: "ev_010", programId: "drp_003", programName: "TANGEDCO Emergency Reserve", startTime: "Apr 24, 18:00", endTime: "Apr 24, 21:00", durationMin: 180, dispatchedMw: 6.0,  requestedMw: 6.0,  revenue: 90000,  status: "completed", sitesParticipating: 2 },
  { id: "ev_011", programId: "drp_002", programName: "BESCOM Freq Regulation",     startTime: "Apr 28, 16:00", endTime: "Apr 28, 16:45", durationMin: 45,  dispatchedMw: 0,    requestedMw: 8.0,  revenue: 0,      status: "upcoming",  sitesParticipating: 2 },
  { id: "ev_012", programId: "drp_001", programName: "MSEDCL Peak Shaving",        startTime: "Apr 28, 18:00", endTime: "Apr 28, 21:00", durationMin: 180, dispatchedMw: 0,    requestedMw: 12.0, revenue: 0,      status: "upcoming",  sitesParticipating: 3 },
];

// Summary KPIs for the overview
export const DR_SUMMARY = {
  activeProgramsCount: ALL_DR_PROGRAMS.filter(p => p.status === "active").length,
  mwDispatchedMtd: 142.8,
  revenueMtd: 2482600,
  upcomingEventsCount: ALL_DR_EVENTS.filter(e => e.status === "upcoming").length,
};
