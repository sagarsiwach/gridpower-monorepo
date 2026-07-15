import { Hono } from "hono";
import { z } from "zod";
const app = new Hono();
const command = z.object({
  chargerId: z.string(),
  command: z.enum(["remote_start", "remote_stop", "reset", "unlock"]),
  reason: z.string().min(3),
});
app.get("/health", (c) =>
  c.json({
    service: "grid-ocpp-adapter",
    status: "ok",
    mode: "simulator",
    supported: ["1.6J", "2.0.1"],
  }),
);
app.post("/commands", async (c) => {
  const parsed = command.safeParse(await c.req.json());
  if (!parsed.success)
    return c.json({ error: "invalid_command", details: parsed.error.issues }, 400);
  return c.json(
    { commandId: crypto.randomUUID(), state: "pending", simulated: true, ...parsed.data },
    202,
  );
});
export default { port: Number(process.env.PORT ?? 14781), fetch: app.fetch };
