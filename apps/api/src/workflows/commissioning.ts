import { WorkflowEntrypoint, type WorkflowEvent, type WorkflowStep } from "cloudflare:workers";
import { log } from "@grid-platform/observability";
import type { CommissioningParams, PlatformEnv } from "../env";

export class CommissioningWorkflow extends WorkflowEntrypoint<PlatformEnv, CommissioningParams> {
  override async run(event: WorkflowEvent<CommissioningParams>, step: WorkflowStep) {
    const site = await step.do("validate commissioning request", async () => ({
      siteId: event.payload.siteId,
      validatedAt: new Date().toISOString(),
    }));

    await step.do("record commissioning intent", async () => {
      log("info", "commissioning.intent.recorded", site);
      return { accepted: true };
    });

    return { siteId: site.siteId, state: "awaiting_telemetry" };
  }
}
