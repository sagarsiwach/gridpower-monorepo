import { describe, expect, it } from "vitest";
import { app } from "./app";

describe("OCPP edge adapter", () => {
  it("reports simulator status", async () => {
    const response = await app.request("/health");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ mode: "simulator", status: "ok" });
  });

  it("requires a websocket upgrade", async () => {
    const response = await app.request("/ocpp/mock-charger");
    expect(response.status).toBe(426);
  });
});
