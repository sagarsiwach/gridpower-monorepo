import { expect, it } from "vitest";
import { MockVendorAdapter } from "./index";
it("normalizes mock vendor data", async () =>
  expect(await new MockVendorAdapter().poll("plant")).toMatchObject([
    { metric: "battery_soc", unit: "percent" },
  ]));
