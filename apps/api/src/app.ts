import { Hono } from "hono";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { JobSchema } from "@grid-platform/jobs";
import { parseRuntimeVars } from "@grid-platform/env";
import { chargeOverview, energyOverview } from "./mock-data";
import type { PlatformEnv } from "./env";

export const app = new Hono<{ Bindings: PlatformEnv }>().basePath("/api/v1");

app.use("*", requestId());
app.use("*", async (c, next) => {
  const vars = parseRuntimeVars(c.env ?? {});
  const origins = vars.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());
  return cors({ origin: origins })(c, next);
});

app.get("/health", (c) =>
  c.json({
    service: "grid-platform-api",
    status: "ok",
    version: "0.1.0",
    environment: c.env?.ENVIRONMENT ?? "test",
  }),
);
app.get("/energy/overview", (c) => c.json(energyOverview));
app.get("/charge/overview", (c) => c.json(chargeOverview));
app.get("/contracts", (c) =>
  c.json({
    version: "v1",
    mode: "mock-first",
    domains: ["identity", "commercial", "energy", "charging", "billing", "platform"],
  }),
);

app.post("/jobs", async (c) => {
  const parsed = JobSchema.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "invalid_job", issues: parsed.error.issues }, 400);
  }
  await c.env.PLATFORM_JOBS.send(parsed.data, {
    contentType: "json",
  });
  return c.json({ accepted: true, type: parsed.data.type }, 202);
});

app.post("/commissioning/:siteId", async (c) => {
  const siteId = c.req.param("siteId");
  const instance = await c.env.COMMISSIONING.create({
    id: `commissioning-${siteId}-${crypto.randomUUID()}`,
    params: { siteId },
  });
  return c.json({ instanceId: instance.id, siteId, state: "queued" }, 202);
});
