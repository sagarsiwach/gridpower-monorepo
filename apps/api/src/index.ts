import type { PlatformJob } from "@grid-platform/jobs";
import { log } from "@grid-platform/observability";
import { app } from "./app";
import type { PlatformEnv } from "./env";

export { CommissioningWorkflow } from "./workflows/commissioning";

async function scheduled(_controller: ScheduledController, env: PlatformEnv) {
  await env.PLATFORM_JOBS.send({
    type: "vendor.poll",
    orgId: "scheduled",
    integrationId: "configured-integrations",
  });
  log("info", "scheduler.vendor_poll.enqueued", { environment: env.ENVIRONMENT });
}

async function queue(batch: MessageBatch<PlatformJob>, env: PlatformEnv) {
  for (const message of batch.messages) {
    try {
      log("info", "queue.job.received", {
        environment: env.ENVIRONMENT,
        messageId: message.id,
        type: message.body.type,
      });
      env.ANALYTICS.writeDataPoint({
        blobs: [message.body.type, env.ENVIRONMENT],
        doubles: [1],
        indexes: [message.body.orgId],
      });
      message.ack();
    } catch (error) {
      log("error", "queue.job.failed", {
        error: error instanceof Error ? error.message : String(error),
        messageId: message.id,
      });
      message.retry({ delaySeconds: 30 });
    }
  }
}

export default {
  fetch: app.fetch,
  queue,
  scheduled,
} satisfies ExportedHandler<PlatformEnv, PlatformJob>;
