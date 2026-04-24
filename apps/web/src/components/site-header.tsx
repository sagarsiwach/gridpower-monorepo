import { Navbar } from "@gridpower/ui";
import type { NavItem } from "@gridpower/ui";
import { Link } from "react-router";

// Nav items port from _prototype/website/Nav.jsx megaMenus + topLinks
const NAV_ITEMS: NavItem[] = [
  {
    label: "GridEnergy",
    key: "energy",
    href: "/energy",
    megaMenu: [
      {
        label: "SOLUTIONS",
        items: [
          {
            title: "Home storage",
            sub: "5–21 kWh residential",
            href: "/energy/home-storage",
          },
          {
            title: "Commercial storage",
            sub: "30–500 kWh for offices & industry",
            href: "/energy/commercial",
          },
        ],
      },
      {
        label: "PRODUCTS",
        items: [
          {
            title: "Batteries & inverters",
            sub: "COMO L1, ROSA G1, ATLAS series",
            href: "/energy/products",
          },
          {
            title: "ESS & containerized",
            sub: "FlexCube 500SL, grid-scale",
            href: "/energy/ess",
          },
        ],
      },
      {
        label: "PLATFORM",
        items: [
          {
            title: "GridEnergy Console",
            sub: "Monitor, optimize, earn",
            href: "/platform",
          },
          {
            title: "Open standards",
            sub: "Modbus, REST API, MQTT",
            href: "/platform/open",
          },
        ],
      },
    ],
  },
  {
    label: "GridCharge",
    key: "charge",
    href: "/charge",
    megaMenu: [
      {
        label: "SOLUTIONS",
        items: [
          {
            title: "Home charging",
            sub: "7.4–22 kW smart wallboxes",
            href: "/charge/home",
          },
          {
            title: "Destination charging",
            sub: "Hotels, malls, resorts",
            href: "/charge/destination",
          },
        ],
      },
      {
        label: "PRODUCTS",
        items: [
          {
            title: "AC chargers",
            sub: "3.3 kW to 22 kW",
            href: "/charge/ac",
          },
          {
            title: "DC fast chargers",
            sub: "20 kW to 240 kW ultra-fast",
            href: "/charge/dc",
          },
        ],
      },
      {
        label: "PLATFORM",
        items: [
          {
            title: "GridCharge App",
            sub: "Find, charge, pay — live",
            href: "/platform/app",
          },
          {
            title: "GridCharge Console",
            sub: "Fleet & network management",
            href: "/platform/console",
          },
        ],
      },
    ],
  },
  {
    label: "GridDrive",
    key: "drive",
    href: "/drive",
    megaMenu: [
      {
        label: "SOLUTIONS",
        items: [
          {
            title: "Vehicle platforms",
            sub: "2W, 3W, 4W OEM kits",
            href: "/drive/vehicles",
          },
        ],
      },
      {
        label: "PRODUCTS",
        items: [
          {
            title: "Motors & controllers",
            sub: "Hub motors, mid-drive, BMS",
            href: "/drive/products",
          },
          {
            title: "Battery packs",
            sub: "48V to 400V systems",
            href: "/drive/batteries",
          },
        ],
      },
      {
        label: "PLATFORM",
        items: [
          {
            title: "BMS software",
            sub: "Open API, full diagnostics",
            href: "/platform/bms",
          },
        ],
      },
    ],
  },
  {
    label: "Platform",
    key: "platform",
    href: "/platform",
  },
];

// SiteHeader wraps @gridpower/ui Navbar with GridPower-specific nav items.
// The Navbar component handles its own mobile hamburger + Sheet drawer internally.
// We pass items, logoHref, ctaLabel, and ctaHref.
export function SiteHeader() {
  return (
    <Navbar
      items={NAV_ITEMS}
      logoHref="/"
      ctaLabel="Get early access"
      ctaHref="/waitlist"
      sticky
    />
  );
}
