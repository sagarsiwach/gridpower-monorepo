import { Hono } from "hono";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { chargeOverview, energyOverview } from "./mock-data";

export const app = new Hono().basePath("/api/v1");
app.use("*", requestId(), cors({ origin: ["http://localhost:5174", "http://localhost:5175"] }));
app.get("/health", (c) => c.json({ service: "grid-platform-api", status: "ok", version: "0.1.0" }));
app.get("/energy/overview", (c) => c.json(energyOverview));
app.get("/charge/overview", (c) => c.json(chargeOverview));
app.get("/contracts", (c) =>
  c.json({
    version: "v1",
    mode: "mock-first",
    domains: ["identity", "commercial", "energy", "charging", "billing", "platform"],
  }),
);
