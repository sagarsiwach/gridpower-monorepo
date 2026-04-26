/**
 * Firmware version and rollout mocks.
 * 15 firmware versions, 12 rollouts.
 */

export type FirmwareStatus = "stable" | "beta" | "deprecated" | "critical";
export type RolloutStatus = "active" | "paused" | "completed" | "failed" | "scheduled";

export interface FirmwareVersion {
  id: string;
  version: string;
  releaseDate: string;
  status: FirmwareStatus;
  compatibility: string[];  // Stack manufacturers
  changelogExcerpt: string;
  installCount: number;     // How many stacks currently running this
  minHardwareRev: string;
}

export interface RolloutSiteStatus {
  siteId: string;
  siteName: string;
  stacksTotal: number;
  stacksDone: number;
  status: "done" | "in-progress" | "pending" | "failed";
}

export interface FirmwareRollout {
  id: string;
  name: string;
  targetVersion: string;
  fromVersion: string;
  sitesCount: number;
  stacksTotal: number;
  stacksDone: number;
  status: RolloutStatus;
  startedAt: string;
  completedAt?: string;
  scheduledAt?: string;
  sites: RolloutSiteStatus[];
}

export const ALL_FIRMWARE_VERSIONS: FirmwareVersion[] = [
  { id: "fw_015", version: "2.4.1", releaseDate: "Apr 18, 2025", status: "stable",    compatibility: ["BYD","CATL","Samsung SDI","Tata Power"],   changelogExcerpt: "Improved frequency response time from 0.5s to 0.38s. Fixed edge case in reactive power controller causing rare over-voltage condition. Memory leak fix in BMS communication module.", installCount: 18 , minHardwareRev: "HW-2.1" },
  { id: "fw_014", version: "2.4.0", releaseDate: "Mar 28, 2025", status: "stable",    compatibility: ["BYD","CATL","Samsung SDI","Tata Power","Amara Raja"], changelogExcerpt: "Added spinning reserve dispatch capability. Enhanced thermal management algorithm for ambient temperatures above 40°C. API v2 telemetry endpoints.", installCount: 22, minHardwareRev: "HW-2.0" },
  { id: "fw_013", version: "2.3.8", releaseDate: "Feb 14, 2025", status: "stable",    compatibility: ["BYD","CATL","Samsung SDI","Tata Power"],   changelogExcerpt: "Patch: Fixed SoC estimation drift after >500 partial cycles. Improved cell balancing precision on LFP chemistry.", installCount: 12, minHardwareRev: "HW-2.0" },
  { id: "fw_012", version: "2.3.6", releaseDate: "Jan 22, 2025", status: "stable",    compatibility: ["BYD","CATL","Samsung SDI"],                  changelogExcerpt: "Reactive power control mode enhancements. SCADA Modbus polling optimisation.", installCount: 4,  minHardwareRev: "HW-2.0" },
  { id: "fw_011", version: "2.3.4", releaseDate: "Dec 11, 2024", status: "deprecated",compatibility: ["BYD","CATL","Samsung SDI"],                  changelogExcerpt: "Grid code compliance update for IEGC amendments. DR dispatch confirmation handshake added.", installCount: 2,  minHardwareRev: "HW-1.9" },
  { id: "fw_010", version: "2.2.9", releaseDate: "Nov 04, 2024", status: "deprecated",compatibility: ["BYD","CATL","Samsung SDI","Tata Power"],   changelogExcerpt: "Performance improvements for rapid charge-discharge cycling. Event logging format v2.", installCount: 1,  minHardwareRev: "HW-1.8" },
  { id: "fw_009", version: "2.2.7", releaseDate: "Oct 10, 2024", status: "deprecated",compatibility: ["BYD","CATL"],                                changelogExcerpt: "Hotfix: occasional unresponsive state on BMS module after 72h continuous operation.", installCount: 1,  minHardwareRev: "HW-1.8" },
  { id: "fw_008", version: "2.2.4", releaseDate: "Sep 02, 2024", status: "deprecated",compatibility: ["BYD","CATL","Samsung SDI"],                  changelogExcerpt: "OCPP-like diagnostic endpoint. Remote reset capability added.", installCount: 0,  minHardwareRev: "HW-1.8" },
  { id: "fw_007", version: "2.1.4", releaseDate: "Jul 18, 2024", status: "deprecated",compatibility: ["BYD","CATL"],                                changelogExcerpt: "Baseline frequency response. NMC chemistry initial support.", installCount: 0,  minHardwareRev: "HW-1.7" },
  { id: "fw_006", version: "2.1.1", releaseDate: "Jun 01, 2024", status: "deprecated",compatibility: ["BYD","CATL"],                                changelogExcerpt: "Grid synchronisation improvement for island-prone areas.", installCount: 0,  minHardwareRev: "HW-1.7" },
  { id: "fw_005", version: "2.0.8", releaseDate: "Apr 22, 2024", status: "deprecated",compatibility: ["BYD","CATL"],                                changelogExcerpt: "Initial VRLA support for Amara Raja stacks.", installCount: 0,  minHardwareRev: "HW-1.6" },
  { id: "fw_004", version: "2.0.4", releaseDate: "Mar 05, 2024", status: "deprecated",compatibility: ["BYD","CATL"],                                changelogExcerpt: "Stability improvements. Watchdog timer tuning.", installCount: 0,  minHardwareRev: "HW-1.6" },
  { id: "fw_003", version: "1.9.2", releaseDate: "Jan 10, 2024", status: "deprecated",compatibility: ["BYD"],                                       changelogExcerpt: "BYD MC-100 initial production release.", installCount: 0,  minHardwareRev: "HW-1.5" },
  { id: "fw_002", version: "1.8.6", releaseDate: "Oct 14, 2023", status: "deprecated",compatibility: ["BYD"],                                       changelogExcerpt: "Pre-production firmware for pilot sites.", installCount: 0,  minHardwareRev: "HW-1.4" },
  { id: "fw_001", version: "1.7.0", releaseDate: "Aug 01, 2023", status: "deprecated",compatibility: ["BYD"],                                       changelogExcerpt: "Engineering validation firmware. Not for production use.", installCount: 0,  minHardwareRev: "HW-1.3" },
];

export const ALL_ROLLOUTS: FirmwareRollout[] = [
  {
    id: "ro_001", name: "v2.4.1 Fleet Rollout Phase 2", targetVersion: "2.4.1", fromVersion: "2.4.0 / 2.3.8",
    sitesCount: 5, stacksTotal: 18, stacksDone: 8, status: "active", startedAt: "Apr 25, 2025",
    sites: [
      { siteId: "site_001", siteName: "Pune Hinjewadi BESS",        stacksTotal: 5, stacksDone: 5, status: "done"        },
      { siteId: "site_002", siteName: "Bengaluru Whitefield BESS",   stacksTotal: 4, stacksDone: 3, status: "in-progress" },
      { siteId: "site_003", siteName: "Chennai Sriperumbudur BESS",  stacksTotal: 3, stacksDone: 0, status: "pending"     },
      { siteId: "site_009", siteName: "Kolkata Salt Lake BESS",      stacksTotal: 2, stacksDone: 0, status: "pending"     },
      { siteId: "site_015", siteName: "Visakhapatnam Steel BESS",    stacksTotal: 3, stacksDone: 0, status: "pending"     },
      { siteId: "site_016", siteName: "Kochi Smart City BESS",       stacksTotal: 2, stacksDone: 0, status: "pending"     },
    ],
  },
  {
    id: "ro_002", name: "v2.4.1 Fleet Rollout Phase 1", targetVersion: "2.4.1", fromVersion: "2.4.0",
    sitesCount: 3, stacksTotal: 10, stacksDone: 10, status: "completed", startedAt: "Apr 19, 2025", completedAt: "Apr 23, 2025",
    sites: [
      { siteId: "site_004", siteName: "Hyderabad Medchal BESS",      stacksTotal: 3, stacksDone: 3, status: "done" },
      { siteId: "site_006", siteName: "Delhi Noida Sector 62 BESS",  stacksTotal: 2, stacksDone: 2, status: "done" },
      { siteId: "site_017", siteName: "Gurgaon Manesar BESS",        stacksTotal: 2, stacksDone: 2, status: "done" },
      { siteId: "site_007", siteName: "Ahmedabad Changodar BESS",    stacksTotal: 2, stacksDone: 2, status: "done" },
      { siteId: "site_005", siteName: "Mumbai Bhiwandi BESS",        stacksTotal: 2, stacksDone: 2, status: "done" },
    ],
  },
  {
    id: "ro_003", name: "v2.4.0 Full Fleet", targetVersion: "2.4.0", fromVersion: "2.3.8 / 2.3.6",
    sitesCount: 12, stacksTotal: 46, stacksDone: 46, status: "completed", startedAt: "Apr 02, 2025", completedAt: "Apr 14, 2025",
    sites: [
      { siteId: "site_001", siteName: "Pune Hinjewadi BESS",         stacksTotal: 5, stacksDone: 5, status: "done" },
      { siteId: "site_002", siteName: "Bengaluru Whitefield BESS",   stacksTotal: 4, stacksDone: 4, status: "done" },
    ],
  },
  {
    id: "ro_004", name: "v2.3.8 Patch — SoC drift fix", targetVersion: "2.3.8", fromVersion: "2.3.6",
    sitesCount: 8, stacksTotal: 28, stacksDone: 28, status: "completed", startedAt: "Feb 20, 2025", completedAt: "Mar 01, 2025",
    sites: [
      { siteId: "site_001", siteName: "Pune Hinjewadi BESS",         stacksTotal: 5, stacksDone: 5, status: "done" },
      { siteId: "site_015", siteName: "Visakhapatnam Steel BESS",    stacksTotal: 3, stacksDone: 3, status: "done" },
    ],
  },
  {
    id: "ro_005", name: "v2.3.6 SCADA optimisation rollout", targetVersion: "2.3.6", fromVersion: "2.3.4",
    sitesCount: 6, stacksTotal: 18, stacksDone: 18, status: "completed", startedAt: "Jan 28, 2025", completedAt: "Feb 08, 2025",
    sites: [],
  },
  {
    id: "ro_006", name: "v2.3.4 Grid code compliance", targetVersion: "2.3.4", fromVersion: "2.2.9",
    sitesCount: 10, stacksTotal: 30, stacksDone: 30, status: "completed", startedAt: "Dec 18, 2024", completedAt: "Dec 31, 2024",
    sites: [],
  },
  {
    id: "ro_007", name: "v2.2.9 Performance — BYD sites", targetVersion: "2.2.9", fromVersion: "2.2.7",
    sitesCount: 4, stacksTotal: 14, stacksDone: 14, status: "completed", startedAt: "Nov 12, 2024", completedAt: "Nov 20, 2024",
    sites: [],
  },
  {
    id: "ro_008", name: "v2.4.1 Remaining sites (scheduled)", targetVersion: "2.4.1", fromVersion: "2.4.0",
    sitesCount: 8, stacksTotal: 14, stacksDone: 0, status: "scheduled", scheduledAt: "May 05, 2025",
    sites: [
      { siteId: "site_010", siteName: "Jaipur Sitapura BESS",        stacksTotal: 1, stacksDone: 0, status: "pending" },
      { siteId: "site_011", siteName: "Nagpur Butibori BESS",        stacksTotal: 1, stacksDone: 0, status: "pending" },
      { siteId: "site_012", siteName: "Surat Sachin BESS",           stacksTotal: 1, stacksDone: 0, status: "pending" },
      { siteId: "site_018", siteName: "Indore Pithampur BESS",       stacksTotal: 1, stacksDone: 0, status: "pending" },
      { siteId: "site_019", siteName: "Vadodara Savli BESS",         stacksTotal: 2, stacksDone: 0, status: "pending" },
      { siteId: "site_020", siteName: "Mysuru Hebbal BESS",          stacksTotal: 1, stacksDone: 0, status: "pending" },
      { siteId: "site_023", siteName: "Ludhiana Focal Point BESS",   stacksTotal: 1, stacksDone: 0, status: "pending" },
      { siteId: "site_024", siteName: "Bhubaneswar Khordha BESS",    stacksTotal: 1, stacksDone: 0, status: "pending" },
    ],
  },
  {
    id: "ro_009", name: "v2.2.7 Hotfix rollout", targetVersion: "2.2.7", fromVersion: "2.2.4",
    sitesCount: 3, stacksTotal: 8, stacksDone: 8, status: "completed", startedAt: "Oct 14, 2024", completedAt: "Oct 16, 2024",
    sites: [],
  },
  {
    id: "ro_010", name: "v2.2.4 Diagnostics", targetVersion: "2.2.4", fromVersion: "2.1.4",
    sitesCount: 5, stacksTotal: 12, stacksDone: 12, status: "completed", startedAt: "Sep 10, 2024", completedAt: "Sep 20, 2024",
    sites: [],
  },
  {
    id: "ro_011", name: "v2.1.4 NMC support", targetVersion: "2.1.4", fromVersion: "2.1.1",
    sitesCount: 2, stacksTotal: 6, stacksDone: 6, status: "completed", startedAt: "Jul 24, 2024", completedAt: "Jul 28, 2024",
    sites: [],
  },
  {
    id: "ro_012", name: "v2.0.8 VRLA support pilot", targetVersion: "2.0.8", fromVersion: "2.0.4",
    sitesCount: 1, stacksTotal: 2, stacksDone: 1, status: "failed", startedAt: "Apr 28, 2024",
    sites: [
      { siteId: "site_021", siteName: "Patna Hajipur BESS", stacksTotal: 2, stacksDone: 1, status: "failed" },
    ],
  },
];
