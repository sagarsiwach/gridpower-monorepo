import type { MetaFunction } from "react-router";
import { VerticalLayout } from "~/components/verticals/vertical-layout";
import type { VerticalData } from "~/components/verticals/vertical-layout";

export const meta: MetaFunction = () => [
  { title: "GridCharge — EV charging infrastructure for India | GridPower" },
  {
    name: "description",
    content:
      "GridCharge delivers home wallboxes to highway ultra-fast EV charging stations. Revenue-ready, solar-integrated, fleet-capable. Launching Q2 2026.",
  },
];

const data: VerticalData = {
  brandName: "GridCharge",
  logoSrc: "/logos/logo-gridcharge.svg",
  heroLabel: "EV CHARGING · OCPP NATIVE",
  heroHeadline: "Charging infrastructure that pays for itself.",
  heroSub:
    "From home wallboxes to highway ultra-fast stations. Revenue-ready, solar-integrated, fleet-capable.",
  heroCta1: "Explore solutions",
  heroCta1Href: "/charge/solutions/home",
  heroCta2: "View products",
  heroCta2Href: "/charge/products",
  problemStat: "2M+ EVs",
  problemSub: "on India's roads. Less than 12,000 public charging points.",
  navLinks: [
    {
      title: "Solutions",
      hook: "Home, destination, fleet, and enterprise charging.",
      href: "/charge/solutions/home",
    },
    {
      title: "Products",
      hook: "AC 3.3 kW to DC 240 kW. Full range.",
      href: "/charge/products",
    },
    {
      title: "Platform",
      hook: "GridCharge App + Console for operators.",
      href: "/platform",
    },
    {
      title: "Business model",
      hook: "Turn parking into recurring revenue.",
      href: "/contact",
    },
  ],
  solutions: [
    {
      label: "HOME",
      title: "Home charging",
      sub: "7.4–22 kW. Wake up full every morning.",
      href: "/charge/solutions/home",
    },
    {
      label: "DESTINATION",
      title: "Hotels & malls",
      sub: "Revenue-generating DC chargers for guests.",
      href: "/charge/solutions/destination",
    },
    {
      label: "OFFICE",
      title: "Workplace charging",
      sub: "Employee EV charging with access control.",
      href: "/charge/solutions/destination",
    },
    {
      label: "FLEET",
      title: "Fleet & logistics",
      sub: "Managed charging for commercial fleets.",
      href: "/charge/products",
    },
    {
      label: "ENTERPRISE",
      title: "Large-scale networks",
      sub: "Multi-site OCPP networks for operators.",
      href: "/charge/products",
    },
  ],
  products: [
    {
      name: "OCPP AC 22kW",
      spec: "22 kW · Type 2 · Smart load balancing",
      category: "AC CHARGER",
    },
    {
      name: "DC 60kW Dual-Gun",
      spec: "60 kW · CCS2 + CHAdeMO · 2 vehicles",
      category: "DC CHARGER",
    },
    {
      name: "DC 240kW Ultra-Fast",
      spec: "240 kW · CCS2 · Highway grade",
      category: "DC CHARGER",
    },
  ],
  productsHref: "/charge/products",
  bmStat: "18 months",
  bmSub: "to positive ROI on destination charging. 2 chargers, 8 sessions/day.",
  howItWorks: [
    {
      title: "Site survey",
      description: "Load assessment, power availability, and space planning.",
    },
    {
      title: "Hardware selection",
      description: "Right charger mix for your use case and user volume.",
    },
    {
      title: "Installation",
      description: "Grid connection, civil works, and commissioning.",
    },
    {
      title: "Go live + earn",
      description: "GridCharge App listing. Real-time revenue dashboard.",
    },
  ],
  ctaHeadline: "Ready to charge your network?",
};

export default function ChargeIndexPage() {
  return <VerticalLayout data={data} />;
}
