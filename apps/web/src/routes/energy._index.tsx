import type { MetaFunction } from "react-router";
import { VerticalLayout } from "~/components/verticals/vertical-layout";
import type { VerticalData } from "~/components/verticals/vertical-layout";

export const meta: MetaFunction = () => [
  { title: "GridEnergy: Battery storage for India | GridPower" },
  {
    name: "description",
    content:
      "GridEnergy delivers scalable battery energy storage systems for homes, commercial sites, and utility-scale projects across India. Launching Q2 2026.",
  },
  { property: "og:title", content: "GridEnergy: Battery storage for India | GridPower" },
  {
    property: "og:description",
    content:
      "GridEnergy delivers scalable battery energy storage systems for homes, commercial sites, and utility-scale projects across India. Launching Q2 2026.",
  },
  { property: "og:url", content: "/energy" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

const data: VerticalData = {
  brandName: "GridEnergy",
  logoSrc: "/logos/logo-gridenergy.svg",
  heroLabel: "ENERGY STORAGE · THE OPEN GRID",
  heroHeadline: "Energy that works for you, not against you.",
  heroSub:
    "Residential to grid-scale storage. 5 kWh to 1 MWh. Hybrid inverters, solar integration, open protocols.",
  heroCta1: "Explore solutions",
  heroCta1Href: "/energy/solutions/home",
  heroCta2: "View products",
  heroCta2Href: "/energy/products",
  problemStat: "180 GW",
  problemSub: "of solar capacity in India. Less than 2% stored intelligently.",
  navLinks: [
    {
      title: "Solutions",
      hook: "Home, commercial, and industrial storage applications.",
      href: "/energy/solutions/home",
    },
    {
      title: "Products",
      hook: "COMO, ATLAS, ROSA. Full specs published.",
      href: "/energy/products",
    },
    {
      title: "Platform",
      hook: "GridOS monitoring and energy management.",
      href: "/platform",
    },
    {
      title: "Business model",
      hook: "ROI calculators and financial models.",
      href: "/contact",
    },
  ],
  solutions: [
    {
      label: "HOME",
      title: "Home energy storage",
      sub: "5–21 kWh. Works with any rooftop solar.",
      href: "/energy/solutions/home",
    },
    {
      label: "COMMERCIAL",
      title: "Office & commercial",
      sub: "Cut demand charges. 30–150 kWh.",
      href: "/energy/solutions/commercial",
    },
    {
      label: "INDUSTRIAL",
      title: "Industrial ESS",
      sub: "ATLAS series. 100–500 kWh on-site.",
      href: "/energy/solutions/commercial",
    },
    {
      label: "POWER PARK",
      title: "Grid-scale storage",
      sub: "FlexCube 500SL. Up to 1 MWh per unit.",
      href: "/energy/products",
    },
    {
      label: "SOLAR + STORAGE",
      title: "Integrated solar kits",
      sub: "Complete solar + storage packages.",
      href: "/energy/solutions/home",
    },
  ],
  products: [
    {
      name: "COMO L1",
      spec: "5–10 kWh · Residential · Wall-mount",
      category: "BATTERY",
    },
    {
      name: "ATLAS 01",
      spec: "30 kWh · Commercial · 3-phase",
      category: "ESS",
    },
    {
      name: "FlexCube 500SL",
      spec: "500 kWh · Grid-scale · Containerized",
      category: "CONTAINERIZED",
    },
  ],
  productsHref: "/energy/products",
  bmStat: "80%",
  bmSub: "bill reduction possible with solar + GridEnergy storage.",
  howItWorks: [
    {
      title: "Site assessment",
      description:
        "We evaluate your load profile, solar potential, and grid connection.",
    },
    {
      title: "Hardware selection",
      description:
        "Right battery + inverter combination for your application and budget.",
    },
    {
      title: "Installation",
      description: "Certified installers. Grid-compliant commissioning.",
    },
    {
      title: "Go live + monitor",
      description:
        "GridOS dashboard from day one. Remote diagnostics, live kWh tracking.",
    },
  ],
  ctaHeadline: "Ready to store your energy?",
};

export default function EnergyIndexPage() {
  return <VerticalLayout data={data} />;
}
