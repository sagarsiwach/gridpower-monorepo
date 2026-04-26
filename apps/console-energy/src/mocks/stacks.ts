/**
 * BESS stack inventory — 60 stacks across 24 sites.
 * Manufacturers: BYD, CATL, Samsung SDI, Tata Power, Amara Raja.
 */

export type StackStatus = "online" | "offline" | "fault" | "maintenance";

export interface BessStack {
  id: string;
  siteId: string;
  siteName: string;
  manufacturer: string;
  model: string;
  capacityKwh: number;
  powerKw: number;
  soh: number;       // State of health 88–99
  soc: number;       // State of charge 0–100
  cycles: number;    // 200–1500
  status: StackStatus;
  firmwareVersion: string;
  installedDate: string;
  lastMaintenance: string;
  cellChemistry: string;
}

type ManufacturerInfo = { name: string; model: string; chemistry: string };

const MANUFACTURERS: ManufacturerInfo[] = [
  { name: "BYD",         model: "BYD-MC-100",       chemistry: "LFP"  },
  { name: "CATL",        model: "CATL-EnerOne-100",  chemistry: "LFP"  },
  { name: "Samsung SDI", model: "SDI-E3-100",        chemistry: "NMC"  },
  { name: "Tata Power",  model: "TP-BESS-80",        chemistry: "LFP"  },
  { name: "Amara Raja",  model: "AR-TITAN-60",       chemistry: "VRLA" },
];

function seededRand(seed: number, min: number, max: number): number {
  const s = ((seed * 1103515245 + 12345) & 0x7fffffff) % (max - min + 1);
  return min + s;
}

// Site-to-stack-count mapping (total = 60)
const SITE_STACKS: [string, string, number][] = [
  ["site_001", "Pune Hinjewadi BESS",        5],
  ["site_002", "Bengaluru Whitefield BESS",  4],
  ["site_003", "Chennai Sriperumbudur BESS", 3],
  ["site_004", "Hyderabad Medchal BESS",     3],
  ["site_005", "Mumbai Bhiwandi BESS",       2],
  ["site_006", "Delhi Noida Sector 62 BESS", 2],
  ["site_007", "Ahmedabad Changodar BESS",   2],
  ["site_008", "Coimbatore Arasur BESS",     2],
  ["site_009", "Kolkata Salt Lake BESS",     2],
  ["site_010", "Jaipur Sitapura BESS",       1],
  ["site_011", "Nagpur Butibori BESS",       1],
  ["site_012", "Surat Sachin BESS",          1],
  ["site_013", "Lucknow Amausi BESS",        1],
  ["site_014", "Bhopal Mandideep BESS",      1],
  ["site_015", "Visakhapatnam Steel BESS",   3],
  ["site_016", "Kochi Smart City BESS",      2],
  ["site_017", "Gurgaon Manesar BESS",       2],
  ["site_018", "Indore Pithampur BESS",      1],
  ["site_019", "Vadodara Savli BESS",        2],
  ["site_020", "Mysuru Hebbal BESS",         1],
  ["site_021", "Patna Hajipur BESS",         1],
  ["site_022", "Guwahati Amingaon BESS",     1],
  ["site_023", "Ludhiana Focal Point BESS",  1],
  ["site_024", "Bhubaneswar Khordha BESS",   1],
];

const INSTALL_DATES = ["2023-06-10","2023-08-04","2023-09-18","2023-10-22","2023-11-30","2024-01-14","2024-02-28","2024-03-09","2024-04-17","2024-05-02","2024-06-25","2024-07-11","2024-08-20","2024-09-05","2024-10-14","2024-11-01","2024-12-08","2025-01-12"];
const FW_VERSIONS = ["2.4.1","2.4.0","2.3.8","2.3.6","2.3.4","2.2.9","2.2.7","2.1.4"];
const MAINT_DATES = ["2024-11-10","2024-12-04","2025-01-08","2025-02-14","2025-03-22","2025-04-01","2025-04-15","2025-04-20"];

let stackIndex = 0;
export const ALL_STACKS: BessStack[] = [];

for (const [siteId, siteName, count] of SITE_STACKS) {
  for (let s = 0; s < count; s++) {
    stackIndex++;
    const seed = stackIndex * 37 + 11;
    const mfr = MANUFACTURERS[seed % MANUFACTURERS.length]!;
    const soh = seededRand(seed, 88, 99);
    const soc = seededRand(seed * 2, 30, 95);
    const cycles = seededRand(seed * 3, 200, 1500);
    const statusRand = seed % 20;
    const status: StackStatus =
      statusRand === 0 ? "fault" :
      statusRand === 1 ? "maintenance" :
      statusRand === 2 ? "offline" :
      "online";

    ALL_STACKS.push({
      id: `stk_${String(stackIndex).padStart(3, "0")}`,
      siteId,
      siteName,
      manufacturer: mfr.name,
      model: mfr.model,
      capacityKwh: [60, 80, 100, 120][seed % 4]!,
      powerKw: [30, 40, 50, 60][seed % 4]!,
      soh,
      soc: status === "offline" ? 0 : soc,
      cycles,
      status,
      firmwareVersion: FW_VERSIONS[seed % FW_VERSIONS.length]!,
      installedDate: INSTALL_DATES[seed % INSTALL_DATES.length]!,
      lastMaintenance: MAINT_DATES[seed % MAINT_DATES.length]!,
      cellChemistry: mfr.chemistry,
    });
  }
}
