import type { MetaFunction } from "react-router";
import { VerticalLayout } from "~/components/verticals/vertical-layout";
import type { VerticalData } from "~/components/verticals/vertical-layout";

export const meta: MetaFunction = () => [
  { title: "GridDrive: Open EV powertrain platform for OEMs | GridPower" },
  {
    name: "description",
    content:
      "GridDrive delivers complete powertrain platforms for 2W, 3W, and 4W OEMs (motors, controllers, battery packs). Full specs, no NDA. Launching Q2 2026.",
  },
  { property: "og:title", content: "GridDrive: Open EV powertrain platform for OEMs | GridPower" },
  {
    property: "og:description",
    content:
      "GridDrive delivers complete powertrain platforms for 2W, 3W, and 4W OEMs (motors, controllers, battery packs). Full specs, no NDA. Launching Q2 2026.",
  },
  { property: "og:url", content: "/drive" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

const data: VerticalData = {
  brandName: "GridDrive",
  logoSrc: "/logos/logo-griddrive.svg",
  heroLabel: "POWERTRAIN · PLATFORM",
  heroHeadline: "Electrify any vehicle.",
  heroSub:
    "Complete powertrain platforms for 2W, 3W, and 4W OEMs. Motors, controllers, battery packs. Full specs published.",
  heroCta1: "Explore platforms",
  heroCta1Href: "/drive/solutions/vehicles",
  heroCta2: "View products",
  heroCta2Href: "/drive/products",
  problemStat: "India's EV",
  problemSub:
    "transition needs credible, open powertrain platform suppliers. GridDrive is it.",
  navLinks: [
    {
      title: "Solutions",
      hook: "2W, 3W, 4W vehicle-ready platform kits.",
      href: "/drive/solutions/vehicles",
    },
    {
      title: "Products",
      hook: "Motors, controllers, battery packs.",
      href: "/drive/products",
    },
    {
      title: "Platform",
      hook: "BMS software with open API.",
      href: "/platform",
    },
    {
      title: "Business model",
      hook: "Platform pricing vs. single-vendor.",
      href: "/contact",
    },
  ],
  solutions: [
    {
      label: "2-WHEELER",
      title: "2W powertrain",
      sub: "Hub motors, 48–72V packs, complete BMS kit.",
      href: "/drive/solutions/vehicles",
    },
    {
      label: "3-WHEELER",
      title: "3W powertrain",
      sub: "E-rickshaw and cargo drivetrain systems.",
      href: "/drive/solutions/vehicles",
    },
    {
      label: "4-WHEELER",
      title: "4W powertrain",
      sub: "Full passenger EV powertrain for OEMs.",
      href: "/drive/solutions/vehicles",
    },
  ],
  products: [
    {
      name: "Hub Motor 2W",
      spec: "250–1500W · 48V/72V · IP67",
      category: "MOTOR",
    },
    {
      name: "Mid-Drive 3W",
      spec: "3 kW · 96V · Cargo-rated",
      category: "MOTOR",
    },
    {
      name: "4W Battery Pack",
      spec: "400V · 30–60 kWh · Thermal managed",
      category: "BATTERY PACK",
    },
  ],
  productsHref: "/drive/products",
  bmStat: "Platform pricing",
  bmSub: "beats single-vendor sourcing. Full specs, no NDA, volume-friendly.",
  howItWorks: [
    {
      title: "Platform selection",
      description:
        "Choose the right voltage and power class for your vehicle.",
    },
    {
      title: "Engineering integration",
      description:
        "Our team provides integration documentation and support.",
    },
    {
      title: "Testing & validation",
      description: "On-site testing at Dharwad facility.",
    },
    {
      title: "Production supply",
      description: "Volume supply with BMS software pre-loaded.",
    },
  ],
  ctaHeadline: "Ready to electrify your vehicle?",
};

export default function DriveIndexPage() {
  return <VerticalLayout data={data} />;
}
