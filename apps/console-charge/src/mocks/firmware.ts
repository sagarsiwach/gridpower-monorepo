/**
 * Firmware OTA mock fixtures
 *
 * Used by:
 *   firmware._index.tsx   — overview stats, active rollouts summary
 *   firmware.versions.tsx — version table
 *   firmware.rollouts.tsx — rollout table + segment tabs
 *   firmware.rollouts.$rolloutId.tsx — per-rollout target station list
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type FirmwareChannel = "stable" | "beta" | "canary" | "eol";

export type RolloutStatus = "active" | "paused" | "completed" | "failed";

export type StationUpdateStatus =
  | "pending"
  | "pushed"
  | "installed"
  | "failed"
  | "rolled-back";

export interface FirmwareVersion {
  id: string;
  /** Semver string — e.g. "2.4.1" */
  version: string;
  channel: FirmwareChannel;
  releasedAt: string; // ISO date string
  /** Number of stations currently running this version */
  stationCount: number;
  changelogUrl: string;
  changelogSummary: string;
  changelogFull: string;
  knownIssues: string[];
  supportedModels: string[];
}

export interface RolloutTarget {
  stationId: string;
  stationName: string;
  /** Vendor model name */
  model: string;
  currentVersion: string;
  targetVersion: string;
  status: StationUpdateStatus;
  lastAttemptAt: string | null;
}

export interface FailureLogEntry {
  stationId: string;
  stationName: string;
  errorCode: string;
  errorMessage: string;
  failedAt: string;
  retryCount: number;
  nextRetryAt: string | null;
}

export interface Rollout {
  id: string;
  name: string;
  version: string;
  targetCount: number;
  startedAt: string;
  completedAt: string | null;
  status: RolloutStatus;
  /** 0-100 */
  progressPct: number;
  /** Current batch size (stations updated per wave) */
  batchSize: number;
  /** Ramp percentage — how much of the fleet is exposed */
  rampPct: number;
  successCriteria: {
    minInstallRate: number;
    maxFailureRate: number;
    observationWindowHours: number;
  };
  currentMetrics: {
    installRate: number;
    failureRate: number;
    avgInstallDurationMin: number;
  };
  targets: RolloutTarget[];
  failureLog: FailureLogEntry[];
}

// ─── Firmware versions ────────────────────────────────────────────────────────

export const FIRMWARE_VERSIONS: FirmwareVersion[] = [
  {
    id: "fv-2.5.0-rc1",
    version: "2.5.0-rc1",
    channel: "canary",
    releasedAt: "2025-04-18",
    stationCount: 3,
    changelogUrl: "https://docs.gridpower.io/firmware/2.5.0-rc1",
    changelogSummary:
      "Release candidate for 2.5.0. OCPP 2.0.1 bidirectional power flow, V2G pilot support.",
    changelogFull:
      "Introduces OCPP 2.0.1 support with bidirectional power flow primitives for V2G pilots. Adds configurable idle-fee grace period via remote config key. Fixes CCS2 contactor debounce regression introduced in 2.4.0. Improves modem reconnect behaviour on 4G signal drops. Reduces boot time by 12% via lazy peripheral init.",
    knownIssues: [
      "V2G discharge may stall on ABB Terra HP hardware revision B2 (workaround: reboot).",
      "Canary only — not recommended for production deployments.",
    ],
    supportedModels: ["Tritium PK350", "ABB Terra HP"],
  },
  {
    id: "fv-2.5.0-beta",
    version: "2.5.0-beta",
    channel: "beta",
    releasedAt: "2025-04-08",
    stationCount: 6,
    changelogUrl: "https://docs.gridpower.io/firmware/2.5.0-beta",
    changelogSummary:
      "Beta channel preview of 2.5.0. Extended telemetry, configurable load balancing.",
    changelogFull:
      "Adds per-connector power telemetry at 5-second granularity. Configurable load balancing policy (round-robin or priority). Preliminary OCPP 2.0.1 message handling (non-production). Improved TLS certificate rotation without session drop. Updated bootloader for Tritium PK350 Rev D.",
    knownIssues: [
      "Load balancing policy update requires a station reboot to take effect.",
      "OCPP 2.0.1 path is behind a feature flag — not yet active by default.",
    ],
    supportedModels: ["Tritium PK350", "Delta UFC", "ABB Terra HP"],
  },
  {
    id: "fv-2.4.1",
    version: "2.4.1",
    channel: "stable",
    releasedAt: "2025-03-21",
    stationCount: 50,
    changelogUrl: "https://docs.gridpower.io/firmware/2.4.1",
    changelogSummary:
      "Patch: RFID auth timeout fix, idle-fee calculation correction, heartbeat reliability.",
    changelogFull:
      "Fixes RFID NFC read timeout that caused spurious authorization failures on NXP-based readers in high-ambient-RF environments. Corrects idle-fee start timestamp — was anchored to session end instead of connector unplug. Tightens OCPP heartbeat scheduler to reduce drift under high CPU load. Adds structured log field for connector lock/unlock events.",
    knownIssues: [],
    supportedModels: [
      "Tritium PK350",
      "Delta UFC",
      "ABB Terra HP",
      "Tata Power EZ-100",
    ],
  },
  {
    id: "fv-2.4.0",
    version: "2.4.0",
    channel: "stable",
    releasedAt: "2025-02-10",
    stationCount: 40,
    changelogUrl: "https://docs.gridpower.io/firmware/2.4.0",
    changelogSummary:
      "Stable: dynamic load management, OTA delta updates, improved session recovery.",
    changelogFull:
      "Introduces dynamic load management with configurable max-grid-load threshold. OTA now supports delta patch packages (50-70% smaller downloads). Session recovery logic overhauled: sessions that survive a hard reboot are now correctly marked as interrupted rather than orphaned. Adds support for GB/T 20234.3 connector type on Tata Power EZ-100.",
    knownIssues: [
      "CCS2 contactor debounce timing too tight on high-impedance cables (fixed in 2.4.1).",
    ],
    supportedModels: [
      "Tritium PK350",
      "Delta UFC",
      "ABB Terra HP",
      "Tata Power EZ-100",
    ],
  },
  {
    id: "fv-2.3.0",
    version: "2.3.0",
    channel: "stable",
    releasedAt: "2024-11-04",
    stationCount: 25,
    changelogUrl: "https://docs.gridpower.io/firmware/2.3.0",
    changelogSummary:
      "Stable: tariff hot-reload, OCPI 2.2.1 roaming handshake, connector health metrics.",
    changelogFull:
      "Tariff rules can now be pushed over-the-air without a station reboot (hot-reload via OCPP DataTransfer). OCPI 2.2.1 roaming handshake improvements for partner CPO interoperability. Per-connector health metrics added to status notifications. RFID blocklist sync interval reduced from 24h to 1h. Removes legacy HTTP-only fallback (HTTPS enforced).",
    knownIssues: [],
    supportedModels: ["Tritium PK350", "Delta UFC", "ABB Terra HP"],
  },
  {
    id: "fv-2.2.0",
    version: "2.2.0",
    channel: "eol",
    releasedAt: "2024-07-15",
    stationCount: 15,
    changelogUrl: "https://docs.gridpower.io/firmware/2.2.0",
    changelogSummary:
      "EOL as of Jan 2025. No security patches will be issued. Upgrade to 2.4.1.",
    changelogFull:
      "Added OCPP 1.6J extended triggers. Improved modem watchdog. Fixed energy meter calibration drift on long sessions. Introduced structured event logging. This version reached end-of-life on 2025-01-15 and will not receive further security patches.",
    knownIssues: [
      "TLS 1.1 negotiation fallback is present (removed in 2.3.0). Security risk on public networks.",
      "End-of-life: no further patches will be issued.",
    ],
    supportedModels: ["Tritium PK350", "Delta UFC"],
  },
  {
    id: "fv-2.1.0",
    version: "2.1.0",
    channel: "eol",
    releasedAt: "2024-03-20",
    stationCount: 4,
    changelogUrl: "https://docs.gridpower.io/firmware/2.1.0",
    changelogSummary: "EOL. Critical security vulnerability (CVE-2024-18431). Upgrade immediately.",
    changelogFull:
      "Introduced USB diagnostic port. Fixed Type 2 connector lock race condition. Added energy meter tamper detection. This version contains a known OCPP authorization bypass vulnerability (CVE-2024-18431) patched in 2.2.0. All stations must be upgraded immediately.",
    knownIssues: [
      "CVE-2024-18431: OCPP authorization bypass. Patch available in 2.2.0+.",
      "End-of-life. No patches will be issued.",
    ],
    supportedModels: ["Tritium PK350"],
  },
  {
    id: "fv-2.0.0",
    version: "2.0.0",
    channel: "eol",
    releasedAt: "2023-11-01",
    stationCount: 2,
    changelogUrl: "https://docs.gridpower.io/firmware/2.0.0",
    changelogSummary:
      "EOL. Initial 2.x platform release. Multiple known vulnerabilities.",
    changelogFull:
      "Initial 2.x platform with OCPP 1.6 core profile, TLS 1.2, and basic energy metering. This version predates the unified bootloader and cannot receive delta OTA patches. End-of-life. Multiple resolved CVEs present.",
    knownIssues: [
      "Multiple resolved CVEs present in this build.",
      "Cannot receive delta OTA patches — requires full image flash.",
      "End-of-life.",
    ],
    supportedModels: ["Tritium PK350"],
  },
  {
    id: "fv-1.9.0",
    version: "1.9.0",
    channel: "eol",
    releasedAt: "2023-06-12",
    stationCount: 1,
    changelogUrl: "https://docs.gridpower.io/firmware/1.9.0",
    changelogSummary: "EOL legacy 1.x build. Unsupported hardware abstraction layer.",
    changelogFull:
      "Last 1.x release before the 2.0 platform rewrite. OCPP 1.5 only. No TLS. End-of-life.",
    knownIssues: [
      "No TLS support. All traffic unencrypted.",
      "End-of-life. Unsupported.",
    ],
    supportedModels: ["Tritium PK350"],
  },
  {
    id: "fv-1.8.0",
    version: "1.8.0",
    channel: "eol",
    releasedAt: "2023-01-05",
    stationCount: 0,
    changelogUrl: "https://docs.gridpower.io/firmware/1.8.0",
    changelogSummary: "EOL legacy build. No active stations.",
    changelogFull:
      "Initial production firmware for the first GridCharge pilot. OCPP 1.5 subset only. End-of-life.",
    knownIssues: ["No TLS. OCPP 1.5 subset only. End-of-life."],
    supportedModels: ["Tritium PK350"],
  },
];

// ─── Derived distribution (used by overview chart + quick stats) ──────────────

export interface VersionDistributionBar {
  version: string;
  channel: FirmwareChannel;
  stationCount: number;
}

export const VERSION_DISTRIBUTION: VersionDistributionBar[] =
  FIRMWARE_VERSIONS.filter((v) => v.stationCount > 0).map((v) => ({
    version: v.version,
    channel: v.channel,
    stationCount: v.stationCount,
  }));

export const TOTAL_STATIONS = FIRMWARE_VERSIONS.reduce(
  (sum, v) => sum + v.stationCount,
  0,
);

export const EOL_STATION_COUNT = FIRMWARE_VERSIONS.filter(
  (v) => v.channel === "eol",
).reduce((sum, v) => sum + v.stationCount, 0);

export const LATEST_STABLE_VERSION = "2.4.1";
export const LATEST_STABLE_COUNT = FIRMWARE_VERSIONS.find(
  (v) => v.version === LATEST_STABLE_VERSION,
)!.stationCount;

export const BETA_STATION_COUNT = FIRMWARE_VERSIONS.filter(
  (v) => v.channel === "beta",
).reduce((sum, v) => sum + v.stationCount, 0);

// ─── Rollout targets (shared pool, referenced by rollouts below) ──────────────

const VENDOR_MODELS: string[] = [
  "Tritium PK350",
  "Delta UFC",
  "ABB Terra HP",
  "Tata Power EZ-100",
];
const TARGET_CITIES: string[] = [
  "Mumbai",
  "Pune",
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Hyderabad",
];

function makeTargets(
  ids: string[],
  targetVersion: string,
  currentVersions: string[],
  statuses: StationUpdateStatus[],
): RolloutTarget[] {
  return ids.map((id, i) => {
    const model = VENDOR_MODELS[i % VENDOR_MODELS.length] ?? "Tritium PK350";
    const city = TARGET_CITIES[i % TARGET_CITIES.length] ?? "Mumbai";
    const currentVersion =
      currentVersions[i % currentVersions.length] ?? "2.4.0";
    const status: StationUpdateStatus =
      (statuses[i % statuses.length] as StationUpdateStatus | undefined) ??
      "pending";
    const lastAttemptAt =
      status !== "pending"
        ? `2025-04-2${(i % 5) + 1}T${String(8 + (i % 12)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}:00Z`
        : null;
    return {
      stationId: id,
      stationName: `GridCharge-${id.toUpperCase()} ${city}`,
      model,
      currentVersion,
      targetVersion,
      status,
      lastAttemptAt,
    };
  });
}

// ─── Rollouts ─────────────────────────────────────────────────────────────────

export const ROLLOUTS: Rollout[] = [
  // ── Active 1: 2.4.1 rollout, 40% done ──────────────────────────────────────
  {
    id: "ro-2025-04-alpha",
    name: "2.4.1 Staged Rollout - Wave 1",
    version: "2.4.1",
    targetCount: 25,
    startedAt: "2025-04-22T09:00:00Z",
    completedAt: null,
    status: "active",
    progressPct: 40,
    batchSize: 5,
    rampPct: 20,
    successCriteria: {
      minInstallRate: 95,
      maxFailureRate: 5,
      observationWindowHours: 2,
    },
    currentMetrics: {
      installRate: 100,
      failureRate: 0,
      avgInstallDurationMin: 4.2,
    },
    targets: makeTargets(
      [
        "S001", "S002", "S003", "S004", "S005",
        "S006", "S007", "S008", "S009", "S010",
        "S011", "S012", "S013", "S014", "S015",
        "S016", "S017", "S018", "S019", "S020",
        "S021", "S022", "S023", "S024", "S025",
      ],
      "2.4.1",
      ["2.4.0", "2.3.0", "2.4.0"],
      ["installed", "installed", "installed", "installed", "installed",
       "installed", "installed", "installed", "installed", "installed",
       "pushed", "pending", "pending", "pending", "pending",
       "pending", "pending", "pending", "pending", "pending",
       "pending", "pending", "pending", "pending", "pending"],
    ),
    failureLog: [],
  },

  // ── Active 2: beta 2.5.0-beta, 18% ─────────────────────────────────────────
  {
    id: "ro-2025-04-beta",
    name: "2.5.0-beta Canary Group",
    version: "2.5.0-beta",
    targetCount: 6,
    startedAt: "2025-04-20T14:30:00Z",
    completedAt: null,
    status: "active",
    progressPct: 33,
    batchSize: 2,
    rampPct: 10,
    successCriteria: {
      minInstallRate: 90,
      maxFailureRate: 10,
      observationWindowHours: 6,
    },
    currentMetrics: {
      installRate: 100,
      failureRate: 0,
      avgInstallDurationMin: 5.8,
    },
    targets: makeTargets(
      ["B001", "B002", "B003", "B004", "B005", "B006"],
      "2.5.0-beta",
      ["2.4.1", "2.4.0"],
      ["installed", "installed", "pushed", "pending", "pending", "pending"],
    ),
    failureLog: [],
  },

  // ── Paused: 2.4.0 rollout ───────────────────────────────────────────────────
  {
    id: "ro-2025-03-pause",
    name: "2.4.0 Fleet Upgrade - Paused",
    version: "2.4.0",
    targetCount: 30,
    startedAt: "2025-03-15T08:00:00Z",
    completedAt: null,
    status: "paused",
    progressPct: 67,
    batchSize: 10,
    rampPct: 33,
    successCriteria: {
      minInstallRate: 95,
      maxFailureRate: 5,
      observationWindowHours: 2,
    },
    currentMetrics: {
      installRate: 97.5,
      failureRate: 2.5,
      avgInstallDurationMin: 3.9,
    },
    targets: makeTargets(
      Array.from({ length: 30 }, (_, i) => `P${String(i + 1).padStart(3, "0")}`),
      "2.4.0",
      ["2.3.0", "2.2.0"],
      [
        "installed", "installed", "installed", "installed", "installed",
        "installed", "installed", "installed", "installed", "installed",
        "installed", "installed", "installed", "installed", "installed",
        "installed", "installed", "installed", "installed", "installed",
        "failed", "pending", "pending", "pending", "pending",
        "pending", "pending", "pending", "pending", "pending",
      ],
    ),
    failureLog: [
      {
        stationId: "P021",
        stationName: "GridCharge-P021 Bengaluru",
        errorCode: "OTA_CHECKSUM_FAIL",
        errorMessage:
          "SHA-256 checksum mismatch after download. Image may be corrupted in transit.",
        failedAt: "2025-03-18T11:42:00Z",
        retryCount: 2,
        nextRetryAt: null,
      },
    ],
  },

  // ── Completed 1: 2.3.0 rollout ──────────────────────────────────────────────
  {
    id: "ro-2024-11-complete",
    name: "2.3.0 Full Fleet Rollout",
    version: "2.3.0",
    targetCount: 28,
    startedAt: "2024-11-08T06:00:00Z",
    completedAt: "2024-11-10T14:22:00Z",
    status: "completed",
    progressPct: 100,
    batchSize: 10,
    rampPct: 100,
    successCriteria: {
      minInstallRate: 95,
      maxFailureRate: 5,
      observationWindowHours: 2,
    },
    currentMetrics: {
      installRate: 98.2,
      failureRate: 1.8,
      avgInstallDurationMin: 3.6,
    },
    targets: makeTargets(
      Array.from({ length: 28 }, (_, i) => `C1${String(i + 1).padStart(3, "0")}`),
      "2.3.0",
      ["2.2.0"],
      ["installed"],
    ),
    failureLog: [],
  },

  // ── Completed 2: 2.2.0 rollout ──────────────────────────────────────────────
  {
    id: "ro-2024-07-complete",
    name: "2.2.0 Staged Deployment",
    version: "2.2.0",
    targetCount: 20,
    startedAt: "2024-07-18T07:00:00Z",
    completedAt: "2024-07-20T09:15:00Z",
    status: "completed",
    progressPct: 100,
    batchSize: 5,
    rampPct: 100,
    successCriteria: {
      minInstallRate: 95,
      maxFailureRate: 5,
      observationWindowHours: 2,
    },
    currentMetrics: {
      installRate: 95,
      failureRate: 5,
      avgInstallDurationMin: 4.8,
    },
    targets: makeTargets(
      Array.from({ length: 20 }, (_, i) => `C2${String(i + 1).padStart(3, "0")}`),
      "2.2.0",
      ["2.1.0"],
      ["installed"],
    ),
    failureLog: [],
  },

  // ── Failed: 2.5.0-rc1 ───────────────────────────────────────────────────────
  {
    id: "ro-2025-04-fail",
    name: "2.5.0-rc1 Canary Trial",
    version: "2.5.0-rc1",
    targetCount: 5,
    startedAt: "2025-04-19T10:00:00Z",
    completedAt: "2025-04-19T16:45:00Z",
    status: "failed",
    progressPct: 60,
    batchSize: 2,
    rampPct: 10,
    successCriteria: {
      minInstallRate: 90,
      maxFailureRate: 10,
      observationWindowHours: 4,
    },
    currentMetrics: {
      installRate: 60,
      failureRate: 40,
      avgInstallDurationMin: 6.1,
    },
    targets: makeTargets(
      ["RC001", "RC002", "RC003", "RC004", "RC005"],
      "2.5.0-rc1",
      ["2.4.1"],
      [
        "installed",
        "installed",
        "installed",
        "failed",
        "rolled-back",
      ],
    ),
    failureLog: [
      {
        stationId: "RC004",
        stationName: "GridCharge-RC004 Mumbai",
        errorCode: "OTA_BOOT_FAIL",
        errorMessage:
          "Station failed to boot into new firmware. Watchdog triggered rollback after 3 consecutive boot failures.",
        failedAt: "2025-04-19T14:10:00Z",
        retryCount: 3,
        nextRetryAt: null,
      },
      {
        stationId: "RC005",
        stationName: "GridCharge-RC005 Delhi",
        errorCode: "OTA_BOOT_FAIL",
        errorMessage:
          "Station failed to boot into new firmware. Watchdog triggered rollback after 3 consecutive boot failures.",
        failedAt: "2025-04-19T15:22:00Z",
        retryCount: 3,
        nextRetryAt: null,
      },
    ],
  },
];
