import { describe, expect, it } from "vitest";
import { app } from "./app";
describe("platform api", () => {
  it("reports health", async () =>
    expect(await (await app.request("/api/v1/health")).json()).toMatchObject({ status: "ok" }));
  it("labels mock data", async () =>
    expect(await (await app.request("/api/v1/energy/overview")).json()).toMatchObject({
      mode: "mock",
    }));
});
