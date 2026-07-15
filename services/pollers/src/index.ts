export type VendorObservation = {
  metric: string;
  value: number;
  unit: string;
  sourceAt: string;
  quality: "good" | "suspect";
};
export type VendorAdapter = { vendor: string; poll(plantId: string): Promise<VendorObservation[]> };
export class MockVendorAdapter implements VendorAdapter {
  vendor = "mock";
  async poll(_plantId: string) {
    return [
      {
        metric: "battery_soc",
        value: 78,
        unit: "percent",
        sourceAt: new Date().toISOString(),
        quality: "good" as const,
      },
    ];
  }
}
if (import.meta.main)
  console.log(JSON.stringify({ service: "vendor-pollers", mode: "mock", status: "ready" }));
