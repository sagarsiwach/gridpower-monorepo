import { z } from "zod";

export const HealthSchema = z.object({
  service: z.string(),
  status: z.literal("ok"),
  version: z.string(),
});
export const FreshnessSchema = z.enum(["live", "stale", "unconfirmed"]);
export const EnergySiteSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  status: z.enum(["healthy", "warning", "offline"]),
  freshness: FreshnessSchema,
  solarKw: z.number(),
  loadKw: z.number(),
  batterySoc: z.number(),
  gridKw: z.number(),
  openAlerts: z.number(),
});
export const LeadSchema = z.object({
  id: z.string(),
  customer: z.string(),
  siteType: z.string(),
  stage: z.string(),
  owner: z.string(),
  nextAction: z.string(),
});
export const ChargerSchema = z.object({
  id: z.string(),
  name: z.string(),
  city: z.string(),
  status: z.enum(["available", "charging", "faulted", "offline"]),
  connectors: z.number(),
  activeSessions: z.number(),
  freshness: FreshnessSchema,
});
export const EnergyOverviewSchema = z.object({
  mode: z.literal("mock"),
  generatedAt: z.string(),
  sites: z.array(EnergySiteSchema),
  leads: z.array(LeadSchema),
});
export const ChargeOverviewSchema = z.object({
  mode: z.literal("mock"),
  generatedAt: z.string(),
  chargers: z.array(ChargerSchema),
});
export type EnergyOverview = z.infer<typeof EnergyOverviewSchema>;
export type ChargeOverview = z.infer<typeof ChargeOverviewSchema>;
