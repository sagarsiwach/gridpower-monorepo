import type { MetaFunction } from "react-router";
import { SolutionLayout } from "../components/solutions/solution-layout";

export const meta: MetaFunction = () => [
  { title: "Home battery storage — GridEnergy | GridPower" },
  {
    name: "description",
    content:
      "Residential solar storage from 5 to 21 kWh. Works with any solar setup, any inverter. Launch Q2 2026.",
  },
  { property: "og:title", content: "Home battery storage — GridEnergy | GridPower" },
  {
    property: "og:description",
    content:
      "Residential solar storage from 5 to 21 kWh. Works with any solar setup, any inverter. Launch Q2 2026.",
  },
  { property: "og:url", content: "/energy/solutions/home" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

export default function EnergyHomesSolutionPage() {
  return (
    <SolutionLayout
      breadcrumb={[
        { label: "GridEnergy", href: "/energy" },
        { label: "Solutions", href: "/energy" },
        { label: "Home battery storage" },
      ]}
      heroLabel="GRIDENERGY · RESIDENTIAL"
      heroHeadline="Store your sun. Power your home."
      heroTagline="Residential solar storage from 5 to 21 kWh. Works with any solar setup, any inverter."
      heroBgLabel="Indian home + rooftop solar + wall battery"
      primaryCtaHref="/contact"
      primaryCtaLabel="Get a quote"
      secondaryCtaHref="/energy"
      secondaryCtaLabel="Explore GridEnergy"
      pains={[
        {
          title: "Rising electricity bills",
          sub: "Peak-hour grid rates pushing household bills higher every year.",
        },
        {
          title: "Frequent power cuts",
          sub: "Unreliable grid disrupts work-from-home and essential appliances.",
        },
        {
          title: "Vendor lock-in",
          sub: "Proprietary systems that only work with specific solar brands.",
        },
      ]}
      solutions={[
        {
          title: "COMO L1 wall battery",
          sub: "5–10 kWh. Works with any solar setup. 10-year warranty.",
        },
        {
          title: "ROSA G1 hybrid inverter",
          sub: "Grid-tie + battery-backup. Single-phase, 3–6 kW.",
        },
        {
          title: "Open ecosystem",
          sub: "Connects to any brand of solar panels. No lock-in, ever.",
        },
      ]}
      diagramLabel="Rooftop solar → COMO L1 wall battery → ROSA G1 inverter → home load + grid tie"
      benefits={[
        {
          label: "STORAGE",
          title: "5–21 kWh modular capacity",
          description:
            "Stack COMO L1 units to match your consumption. Start with one, expand without replacing anything.",
        },
        {
          label: "CHEMISTRY",
          title: "LFP — safe, long-lasting",
          description:
            "LiFePO₄ chemistry with 6,000 cycles at 80% DoD. No thermal runaway risk. Safe indoors.",
        },
        {
          label: "COMPATIBILITY",
          title: "Any solar brand, any inverter",
          description:
            "Open Modbus TCP and REST API. Integrates with every major solar inverter on the market.",
        },
        {
          label: "MONITORING",
          title: "GridOS app from day one",
          description:
            "Real-time solar yield, battery state, and consumption on your phone. Remote firmware updates included.",
        },
        {
          label: "WARRANTY",
          title: "10 years capacity guarantee",
          description:
            "We back every COMO L1 with a 10-year capacity warranty and 5-year product warranty.",
        },
        {
          label: "INSTALLATION",
          title: "Certified installers, clean finish",
          description:
            "Grid-compliant installation by certified partners. Typically completed in one day.",
        },
      ]}
      specs={[
        { label: "Capacity range", value: "5 kWh – 21 kWh" },
        { label: "Chemistry", value: "LFP (LiFePO₄)" },
        { label: "Inverter power", value: "3 kW – 6 kW" },
        { label: "Cycles (80% DoD)", value: "6,000 cycles" },
        { label: "Installation", value: "Wall-mount, indoor/outdoor" },
        { label: "Warranty", value: "10 years capacity, 5 years product" },
        { label: "Monitoring", value: "GridOS app + web console" },
        { label: "Protocols", value: "Modbus TCP, REST API" },
      ]}
      steps={[
        {
          title: "Site survey",
          description: "We assess your rooftop, load profile, and grid connection.",
        },
        {
          title: "System design",
          description: "Right battery + inverter for your home and budget.",
        },
        {
          title: "Installation",
          description: "Certified installers. Grid-compliant, clean finish.",
        },
        {
          title: "Go live",
          description: "GridOS app from day one. Monitor every kWh on your phone.",
        },
      ]}
      platformLabel="GridOS Mobile App · Energy dashboard"
      platformFeatures={[
        "Real-time solar yield and consumption tracking",
        "Battery SoC, temperature, and health monitoring",
        "Time-of-use optimisation — auto-charge during low-rate windows",
        "Remote diagnostics and firmware updates",
      ]}
      platformCtaLabel="Download the app"
      platformCtaHref="/platform"
      ctaHeadline="Power your home with GridEnergy."
    />
  );
}
