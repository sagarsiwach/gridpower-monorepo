import type { MetaFunction } from "react-router";
import { SolutionLayout } from "../components/solutions/solution-layout";

export const meta: MetaFunction = () => [
  { title: "Destination & public charging — GridCharge | GridPower" },
  {
    name: "description",
    content:
      "Fast charging for hotels, malls, restaurants, resorts. Revenue-ready from day one. Launch Q2 2026.",
  },
];

export default function ChargeDestinationSolutionPage() {
  return (
    <SolutionLayout
      breadcrumb={[
        { label: "GridCharge", href: "/charge" },
        { label: "Solutions", href: "/charge" },
        { label: "Destination charging" },
      ]}
      heroLabel="GRIDCHARGE · DESTINATION"
      heroHeadline="Turn parking into revenue."
      heroTagline="Fast charging for hotels, malls, restaurants, resorts. Revenue-ready from day one."
      heroBgLabel="Hotel entrance + DC charger + signage"
      primaryCtaHref="/contact"
      primaryCtaLabel="Get a quote"
      secondaryCtaHref="/charge"
      secondaryCtaLabel="Explore GridCharge"
      pains={[
        {
          title: "Zero-revenue parking",
          sub: "Parking bays sit idle, generating no income while EV guests arrive.",
        },
        {
          title: "Guest expectations shifting",
          sub: "EV drivers actively choose destinations with reliable fast charging.",
        },
        {
          title: "Setup complexity",
          sub: "Grid connection costs, hardware choices, and operational complexity.",
        },
      ]}
      solutions={[
        {
          title: "DC 60kW Dual-Gun",
          sub: "Two vehicles charging simultaneously. 30–60 min full charge.",
        },
        {
          title: "Revenue dashboard",
          sub: "Real-time revenue, session logs, and automated billing via GridCharge Console.",
        },
        {
          title: "Turnkey deployment",
          sub: "GridPower handles civil, electrical, commissioning, and OCPP onboarding.",
        },
      ]}
      diagramLabel="3-phase LT grid → DC 60kW dual-gun charger → CCS2 + CHAdeMO vehicles → GridCharge Console revenue dashboard"
      benefits={[
        {
          label: "REVENUE",
          title: "Earn from every session",
          description:
            "Set your per-kWh rate. Payments via QR code, RFID, or the GridCharge App. Revenue deposited daily.",
        },
        {
          label: "THROUGHPUT",
          title: "Two vehicles at once",
          description:
            "DC 60kW dual-gun splits power intelligently between two bays. 80% charge in 30–45 minutes for most EVs.",
        },
        {
          label: "NETWORK",
          title: "Listed on GridCharge network",
          description:
            "Your location appears on the GridCharge app from day one. EV drivers route to your site automatically.",
        },
        {
          label: "OPERATIONS",
          title: "Remote monitoring, 24/7 support",
          description:
            "GridCharge Console gives you session logs, charger health, and revenue analytics from any browser.",
        },
        {
          label: "DEPLOYMENT",
          title: "Turnkey — we handle everything",
          description:
            "Civil works, LT connection upgrade, charger installation, OCPP commissioning. One vendor, one contract.",
        },
        {
          label: "COMPLIANCE",
          title: "CCS2 + CHAdeMO + GB/T",
          description:
            "All major connector standards in one unit. Compatible with every EV sold in India and imported vehicles.",
        },
      ]}
      specs={[
        { label: "Output power", value: "30 kW / 60 kW / 120 kW" },
        { label: "Simultaneous vehicles", value: "2 (dual-gun)" },
        { label: "Connectors", value: "CCS2, CHAdeMO, GB/T" },
        { label: "Protocol", value: "OCPP 2.0.1" },
        { label: "Payment", value: "App + RFID + QR code" },
        { label: "Protection", value: "IP54" },
        { label: "Grid connection", value: "3-phase LT, 415V" },
        { label: "Warranty", value: "3 years hardware + 24/7 support" },
      ]}
      steps={[
        {
          title: "Site planning",
          description: "Parking layout, power availability, and charger placement.",
        },
        {
          title: "Grid connection",
          description: "LT connection upgrade if needed. Civil and electrical works.",
        },
        {
          title: "Installation",
          description: "Charger mounting, cable management, signage.",
        },
        {
          title: "Go live + earn",
          description: "GridCharge network listing. Revenue flows from session one.",
        },
      ]}
      platformLabel="GridCharge Console · Revenue and sessions dashboard"
      platformFeatures={[
        "Real-time revenue tracking per charger and per site",
        "Session logs with vehicle ID, energy, duration, and billing",
        "Remote diagnostics and charger health monitoring",
        "Guest app integration — QR code, RFID, or direct payment",
      ]}
      platformCtaLabel="See the console"
      platformCtaHref="/platform"
      ctaHeadline="Turn your parking into a revenue stream."
    />
  );
}
