import { describe, expect, it } from "vitest";
import { EnergyOverviewSchema } from "./index";

describe("energy overview contract", () => {
  it("requires mock provenance", () => {
    expect(() =>
      EnergyOverviewSchema.parse({ mode: "live", generatedAt: "now", sites: [], leads: [] }),
    ).toThrow("Invalid input");
  });
});
