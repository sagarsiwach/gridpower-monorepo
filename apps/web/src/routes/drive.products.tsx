import * as React from "react";
import { Link } from "react-router";
import type { MetaFunction } from "react-router";
import {
  Button,
  Breadcrumb,
  DotGrid,
  SectionLabel,
  SectionDivider,
  ProductCard,
  EmptyState,
  CTASection,
} from "@gridpower/ui";
import { Cpu } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "GridDrive products — OEM powertrains | GridPower" },
  {
    name: "description",
    content:
      "Motors, controllers, and battery packs for 2W, 3W, and 4W OEM platforms. No NDA required.",
  },
  { property: "og:title", content: "GridDrive products — OEM powertrains | GridPower" },
  {
    property: "og:description",
    content:
      "Motors, controllers, and battery packs for 2W, 3W, and 4W OEM platforms. No NDA required.",
  },
  { property: "og:url", content: "/drive/products" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ── Product data (verbatim from ProductsPage.jsx) ──────────────────────────

const driveProducts = [
  {
    name: "Hub Motor 250W",
    spec: "250 W · 48V · 2W urban",
    category: "Motor",
    specs: [
      { label: "Power", value: "250 W" },
      { label: "Voltage", value: "48V" },
      { label: "Platform", value: "2W urban" },
    ],
  },
  {
    name: "Hub Motor 1.5kW",
    spec: "1,500 W · 72V · 2W performance",
    category: "Motor",
    specs: [
      { label: "Power", value: "1,500 W" },
      { label: "Voltage", value: "72V" },
      { label: "Platform", value: "2W performance" },
    ],
  },
  {
    name: "Mid-Drive 3kW",
    spec: "3 kW · 96V · 3W cargo",
    category: "Motor",
    specs: [
      { label: "Power", value: "3 kW" },
      { label: "Voltage", value: "96V" },
      { label: "Platform", value: "3W cargo" },
    ],
  },
  {
    name: "PMSM 60kW",
    spec: "60 kW · 400V · 4W passenger",
    category: "Motor",
    specs: [
      { label: "Power", value: "60 kW" },
      { label: "Voltage", value: "400V" },
      { label: "Platform", value: "4W passenger" },
    ],
  },
  {
    name: "Controller 2W",
    spec: "48V/72V · Regen braking · CANbus",
    category: "Controller",
    specs: [
      { label: "Voltage", value: "48V/72V" },
      { label: "Regen", value: "Yes" },
      { label: "Bus", value: "CANbus" },
    ],
  },
  {
    name: "Controller 3W",
    spec: "96V · High-torque · IP67",
    category: "Controller",
    specs: [
      { label: "Voltage", value: "96V" },
      { label: "Torque", value: "High-torque" },
      { label: "IP rating", value: "IP67" },
    ],
  },
  {
    name: "Inverter 4W",
    spec: "400V · 150 kW peak · SiC MOSFET",
    category: "Controller",
    specs: [
      { label: "Voltage", value: "400V" },
      { label: "Peak power", value: "150 kW" },
      { label: "Technology", value: "SiC MOSFET" },
    ],
  },
  {
    name: "Pack 2W",
    spec: "48V / 1.5–3.5 kWh · LFP · IP67",
    category: "Battery Pack",
    specs: [
      { label: "Voltage", value: "48V" },
      { label: "Capacity", value: "1.5–3.5 kWh" },
      { label: "IP rating", value: "IP67" },
    ],
  },
  {
    name: "Pack 3W",
    spec: "96V / 5–10 kWh · LFP · Air-cooled",
    category: "Battery Pack",
    specs: [
      { label: "Voltage", value: "96V" },
      { label: "Capacity", value: "5–10 kWh" },
      { label: "Cooling", value: "Air" },
    ],
  },
  {
    name: "Pack 4W",
    spec: "400V / 30–60 kWh · LFP · Liquid-cooled",
    category: "Battery Pack",
    specs: [
      { label: "Voltage", value: "400V" },
      { label: "Capacity", value: "30–60 kWh" },
      { label: "Cooling", value: "Liquid" },
    ],
  },
];

const CATEGORIES = ["All", "Motor", "Controller", "Battery Pack"] as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DriveProductsPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? driveProducts
      : driveProducts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-1 pb-16 pt-20">
        <DotGrid color="var(--sand-5)" />
        <div className="relative mx-auto max-w-7xl px-10">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "GridDrive", href: "/drive" },
              { label: "Products" },
            ]}
          />
          <SectionLabel>GRIDDRIVE · PRODUCTS</SectionLabel>
          <h1 className="font-display text-display font-semibold text-sand-12 tracking-tight leading-tight mb-4 max-w-2xl">
            Every drivetrain component. Open specs.
          </h1>
          <p className="font-body text-body-lg text-sand-11 max-w-xl leading-relaxed">
            Motors, controllers, and battery packs for 2W, 3W, and 4W OEM
            platforms. No NDA required.
          </p>
        </div>
      </section>

      {/* Filter + Product Grid */}
      <section className="bg-sand-1 pb-20">
        <SectionDivider />
        {/* Filter toolbar */}
        <div className="mx-auto max-w-7xl px-10 pt-8 pb-10 flex gap-2 flex-wrap items-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={[
                "px-4 py-1.5 rounded-full border font-body text-[13px] transition-colors duration-fast",
                activeCategory === cat
                  ? "border-sand-12 bg-sand-12 text-sand-1"
                  : "border-sand-6 bg-transparent text-sand-11 hover:bg-sand-3",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-7xl px-10">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <Link
                  key={product.name}
                  to={`/drive/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block no-underline"
                >
                  <ProductCard
                    title={product.name}
                    specs={product.specs}
                    ctaLabel="View specs"
                    onCtaClick={() => {}}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Cpu className="h-5 w-5" />}
              title="No products in this category yet"
              description="More products launching Q2 2026."
            />
          )}

          {/* Coming soon note */}
          <p className="mt-10 font-mono text-label text-sand-8 uppercase tracking-widest text-center">
            More products launching Q2 2026
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Build your EV powertrain with GridDrive."
        description="Talk to our OEM team about integration, spec customisation, and supply."
        primaryCta={
          <Button asChild>
            <Link to="/contact">Talk to us</Link>
          </Button>
        }
        secondaryCta={
          <Button variant="ghost" asChild>
            <Link to="/drive/solutions/vehicles">See solutions</Link>
          </Button>
        }
      />
    </div>
  );
}
