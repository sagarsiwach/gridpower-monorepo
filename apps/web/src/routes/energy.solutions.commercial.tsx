import type { MetaFunction } from "react-router";
import { SolutionLayout } from "../components/solutions/solution-layout";

export const meta: MetaFunction = () => [
  { title: "Commercial & industrial storage — GridEnergy | GridPower" },
  {
    name: "description",
    content:
      "Commercial and industrial energy storage from 30 to 500 kWh. Cut peak demand charges and replace diesel backup. Launch Q2 2026.",
  },
];

export default function EnergyCommercialSolutionPage() {
  return (
    <SolutionLayout
      breadcrumb={[
        { label: "GridEnergy", href: "/energy" },
        { label: "Solutions", href: "/energy" },
        { label: "Commercial & industrial storage" },
      ]}
      heroLabel="GRIDENERGY · COMMERCIAL"
      heroHeadline="Cut peak demand. Cut your bills."
      heroTagline="Commercial and industrial energy storage from 30 to 500 kWh."
      heroBgLabel="Office complex + rooftop solar + ATLAS ESS"
      primaryCtaHref="/contact"
      primaryCtaLabel="Get a quote"
      secondaryCtaHref="/energy"
      secondaryCtaLabel="Explore GridEnergy"
      pains={[
        {
          title: "Demand charges",
          sub: "Peak demand tariffs adding 30–50% to commercial electricity bills.",
        },
        {
          title: "Diesel backup cost",
          sub: "DG sets expensive to run, polluting, and unreliable for sensitive loads.",
        },
        {
          title: "No asset visibility",
          sub: "No real-time data on energy consumption or grid events.",
        },
      ]}
      solutions={[
        {
          title: "ATLAS ESS series",
          sub: "30–500 kWh on-site storage. Peak shaving and demand response.",
        },
        {
          title: "ROSA T2 3-phase inverter",
          sub: "Replace diesel backup with clean, instant battery power.",
        },
        {
          title: "GridPower Console",
          sub: "Live energy dashboard, demand alerts, and automated dispatch.",
        },
      ]}
      diagramLabel="Grid + solar → ATLAS ESS rack → ROSA T2 3-phase inverter → building load + demand response"
      benefits={[
        {
          label: "PEAK SHAVING",
          title: "Automated demand response",
          description:
            "GridPower Console dispatches stored energy automatically during peak tariff windows, cutting demand charges without manual intervention.",
        },
        {
          label: "BACKUP",
          title: "Replace your diesel genset",
          description:
            "ATLAS + ROSA T2 provides seamless islanding for critical loads. No fuel cost. No emissions. Instant switchover.",
        },
        {
          label: "SCALABILITY",
          title: "30 kWh to 500 kWh",
          description:
            "Modular ATLAS rack design. Start with what you need today and expand in-place as your load grows.",
        },
        {
          label: "VISIBILITY",
          title: "Multi-site energy dashboard",
          description:
            "GridPower Console aggregates all your sites in one view. Demand alerts, export reports, and BMS integration.",
        },
        {
          label: "COMPLIANCE",
          title: "BIS and IEC certified",
          description:
            "ATLAS units certified to BIS, IEC 62619, and UN38.3. Grid connection documentation provided.",
        },
        {
          label: "REPORTING",
          title: "Diesel displacement and emissions",
          description:
            "Track kWh displaced from DG sets. Automated sustainability reporting for ESG compliance.",
        },
      ]}
      specs={[
        { label: "Capacity range", value: "30 kWh – 500 kWh" },
        { label: "Chemistry", value: "LFP (LiFePO₄)" },
        { label: "Inverter power", value: "30 kW – 200 kW" },
        { label: "Connection", value: "3-phase, 415V AC" },
        { label: "Installation", value: "Indoor rack / outdoor IP54" },
        { label: "Communication", value: "Modbus TCP, CAN, REST API" },
        { label: "Certifications", value: "BIS, IEC 62619, UN38.3" },
        { label: "Warranty", value: "10 years capacity" },
      ]}
      steps={[
        {
          title: "Energy audit",
          description: "Load profile analysis, tariff review, and demand peak identification.",
        },
        {
          title: "System sizing",
          description: "ATLAS configuration matched to peak demand and storage economics.",
        },
        {
          title: "Civil & electrical",
          description: "Turnkey installation with certified contractors.",
        },
        {
          title: "Go live + optimise",
          description: "GridPower Console with automated demand response from day one.",
        },
      ]}
      platformLabel="GridPower Console · Energy management dashboard"
      platformFeatures={[
        "Automated peak shaving and demand response dispatch",
        "Multi-site energy visibility in one dashboard",
        "Diesel displacement tracking and emissions reporting",
        "Integration with building management systems (BMS)",
      ]}
      platformCtaLabel="See the console"
      platformCtaHref="/platform"
      ctaHeadline="Cut your demand charges with GridEnergy."
    />
  );
}
