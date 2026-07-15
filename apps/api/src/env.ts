import type { PlatformJob } from "@grid-platform/jobs";

export type CommissioningParams = { siteId: string };

export interface PlatformEnv {
  ALLOWED_ORIGINS: string;
  ANALYTICS: AnalyticsEngineDataset;
  CACHE: KVNamespace;
  COMMISSIONING: Workflow<CommissioningParams>;
  ENVIRONMENT: "development" | "staging" | "production";
  FILES: R2Bucket;
  HYPERDRIVE: Hyperdrive;
  LOG_LEVEL: "debug" | "info" | "warn" | "error";
  PLATFORM_JOBS: Queue<PlatformJob>;
}
