import { z } from "zod";
export const JobSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("vendor.poll"), orgId: z.string(), integrationId: z.string() }),
  z.object({
    type: z.literal("report.monthly"),
    orgId: z.string(),
    siteId: z.string(),
    month: z.string(),
  }),
  z.object({ type: z.literal("alert.dispatch"), orgId: z.string(), alertId: z.string() }),
]);
export type PlatformJob = z.infer<typeof JobSchema>;
