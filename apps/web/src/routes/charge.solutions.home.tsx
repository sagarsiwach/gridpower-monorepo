import type { MetaFunction } from "react-router";
import { SolutionLayout } from "../components/solutions/solution-layout";

export const meta: MetaFunction = () => [
  { title: "Home EV charging — GridCharge | GridPower" },
  {
    name: "description",
    content:
      "Smart home chargers from 7.4 kW to 22 kW. Works with any EV. Scheduled charging, solar integration, app control. Launch Q2 2026.",
  },
];

export default function ChargeHomeSolutionPage() {
  return (
    <SolutionLayout
      breadcrumb={[
        { label: "GridCharge", href: "/charge" },
        { label: "Solutions", href: "/charge" },
        { label: "Home EV charging" },
      ]}
      heroLabel="GRIDCHARGE · HOME"
      heroHeadline="Charge at home. Wake up full."
      heroTagline="Smart home chargers from 7.4 kW to 22 kW. Works with any EV."
      heroBgLabel="Home garage + wallbox + car + GridCharge App"
      primaryCtaHref="/contact"
      primaryCtaLabel="Get a quote"
      secondaryCtaHref="/charge"
      secondaryCtaLabel="Explore GridCharge"
      pains={[
        {
          title: "Unreliable public chargers",
          sub: "Public infrastructure sparse, often out of order. Range anxiety persists.",
        },
        {
          title: "High electricity cost",
          sub: "Unmanaged home charging hits peak tariff windows, inflating bills.",
        },
        {
          title: "Complex installation",
          sub: "Confusing permits, incompatible hardware, no after-sales support.",
        },
      ]}
      solutions={[
        {
          title: "Smart AC wallbox",
          sub: "7.4–22 kW. Scheduled charging, app control, solar integration.",
        },
        {
          title: "DLB load balancer",
          sub: "Dynamic load balancing — charges fast without tripping your breaker.",
        },
        {
          title: "GridCharge App",
          sub: "Schedule, monitor, and control every session from your phone.",
        },
      ]}
      diagramLabel="Solar panels + grid → DLB load balancer → Smart AC wallbox → EV battery"
      benefits={[
        {
          label: "CONVENIENCE",
          title: "Wake up to a full battery",
          description:
            "Set your departure time in the GridCharge App. The charger does the rest — every morning, automatically.",
        },
        {
          label: "SAVINGS",
          title: "Charge during off-peak tariffs",
          description:
            "Scheduled charging targets low-rate windows automatically. Typical savings of ₹1,500–₹3,000/month versus unmanaged charging.",
        },
        {
          label: "SOLAR",
          title: "Use your own solar first",
          description:
            "Solar surplus priority mode charges your EV before exporting to the grid. Works with any existing solar system.",
        },
        {
          label: "SAFETY",
          title: "DLB — no tripped breakers",
          description:
            "Dynamic load balancing monitors your home's total draw and reduces charger output if the panel is near capacity.",
        },
        {
          label: "COMPATIBILITY",
          title: "Works with any EV",
          description:
            "Type 2 connector (IEC 62196) with OCPP 2.0.1. Compatible with every EV sold in India including imported models.",
        },
        {
          label: "SUPPORT",
          title: "Certified installation, 3-year warranty",
          description:
            "Certified electricians, grid-compliant installation. 3-year hardware warranty with remote diagnostic support.",
        },
      ]}
      specs={[
        { label: "Power output", value: "7.4 kW / 11 kW / 22 kW" },
        { label: "Connector", value: "Type 2 (IEC 62196)" },
        { label: "Protocol", value: "OCPP 2.0.1" },
        { label: "Phase", value: "Single-phase / 3-phase" },
        { label: "Protection", value: "IP54, IK10" },
        { label: "Load balancing", value: "DLB Box (optional)" },
        { label: "Solar integration", value: "Yes — excess solar priority charging" },
        { label: "Warranty", value: "3 years hardware" },
      ]}
      steps={[
        {
          title: "Vehicle compatibility",
          description: "We confirm your EV connector type and charging rate.",
        },
        {
          title: "Home survey",
          description: "Electrical panel capacity, cable routing, and permit requirements.",
        },
        {
          title: "Installation",
          description: "Certified electrician. Typically 2–4 hours.",
        },
        {
          title: "App setup",
          description: "GridCharge App configured. Scheduled charging from day one.",
        },
      ]}
      platformLabel="GridCharge App · Home charger + session view"
      platformFeatures={[
        "Schedule charging for off-peak tariff windows",
        "Solar surplus charging — charge when your panels are generating",
        "Session history, cost tracking, and kWh consumed",
        "Share access with family members",
      ]}
      platformCtaLabel="Download GridCharge App"
      platformCtaHref="/platform"
      ctaHeadline="Wake up full every morning."
    />
  );
}
