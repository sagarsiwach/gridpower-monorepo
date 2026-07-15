import { Hono } from "hono";
import { z } from "zod";
interface OcppEnv {
  CHARGER_SESSIONS: DurableObjectNamespace;
  ENVIRONMENT: "staging" | "production";
}

const command = z.object({
  chargerId: z.string().min(1),
  command: z.enum(["remote_start", "remote_stop", "reset", "unlock"]),
  reason: z.string().min(3),
});

export const app = new Hono<{ Bindings: OcppEnv }>();

app.get("/health", (c) =>
  c.json({
    service: "grid-ocpp-adapter",
    status: "ok",
    mode: "simulator",
    environment: c.env?.ENVIRONMENT ?? "test",
    supported: ["1.6J", "2.0.1"],
  }),
);

app.get("/ocpp/:chargerId", (c) => {
  if (c.req.header("Upgrade")?.toLowerCase() !== "websocket") {
    return c.json({ error: "websocket_upgrade_required" }, 426);
  }

  const chargerId = c.req.param("chargerId");
  const id = c.env.CHARGER_SESSIONS.idFromName(chargerId);
  return c.env.CHARGER_SESSIONS.get(id).fetch(c.req.raw);
});

app.post("/commands", async (c) => {
  const parsed = command.safeParse(await c.req.json());
  if (!parsed.success) {
    return c.json({ error: "invalid_command", details: parsed.error.issues }, 400);
  }

  return c.json(
    { commandId: crypto.randomUUID(), state: "pending", simulated: true, ...parsed.data },
    202,
  );
});
