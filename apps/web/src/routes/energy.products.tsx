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
import { Package } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "GridEnergy products — Battery storage systems | GridPower" },
  {
    name: "description",
    content:
      "Batteries, inverters, and ESS from 5 kWh to 1 MWh. Full specs published — no NDA required.",
  },
  { property: "og:title", content: "GridEnergy products — Battery storage systems | GridPower" },
  {
    property: "og:description",
    content:
      "Batteries, inverters, and ESS from 5 kWh to 1 MWh. Full specs published — no NDA required.",
  },
  { property: "og:url", content: "/energy/products" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ── Product data (verbatim from ProductsPage.jsx) ──────────────────────────

const energyProducts = [
  {
    name: "COMO L1",
    spec: "5 kWh · Residential · Wall-mount · LFP",
    category: "Battery",
    specs: [
      { label: "Capacity", value: "5 kWh" },
      { label: "Chemistry", value: "LFP" },
      { label: "Mount", value: "Wall-mount" },
      { label: "Use case", value: "Residential" },
    ],
  },
  {
    name: "COMO L1 Plus",
    spec: "10 kWh · Residential · Modular · LFP",
    category: "Battery",
    specs: [
      { label: "Capacity", value: "10 kWh" },
      { label: "Chemistry", value: "LFP" },
      { label: "Mount", value: "Modular" },
      { label: "Use case", value: "Residential" },
    ],
  },
  {
    name: "LIVO Wall Battery",
    spec: "10 kWh · Slim profile · Indoor/outdoor",
    category: "Battery",
    specs: [
      { label: "Capacity", value: "10 kWh" },
      { label: "Profile", value: "Slim" },
      { label: "Install", value: "Indoor/outdoor" },
    ],
  },
  {
    name: "ROSA G1",
    spec: "3–6 kW · Hybrid inverter · Single-phase",
    category: "Inverter",
    specs: [
      { label: "Output", value: "3–6 kW" },
      { label: "Type", value: "Hybrid" },
      { label: "Phase", value: "Single-phase" },
    ],
  },
  {
    name: "ROSA T2",
    spec: "30–100 kW · 3-phase · Grid-tie + islanding",
    category: "Inverter",
    specs: [
      { label: "Output", value: "30–100 kW" },
      { label: "Phase", value: "3-phase" },
      { label: "Mode", value: "Grid-tie + islanding" },
    ],
  },
  {
    name: "ATLAS 01",
    spec: "30 kWh · Commercial · 3-phase · Indoor",
    category: "ESS",
    specs: [
      { label: "Capacity", value: "30 kWh" },
      { label: "Phase", value: "3-phase" },
      { label: "Install", value: "Indoor" },
    ],
  },
  {
    name: "ATLAS 03",
    spec: "100 kWh · Industrial · IP54 · Modular",
    category: "ESS",
    specs: [
      { label: "Capacity", value: "100 kWh" },
      { label: "IP rating", value: "IP54" },
      { label: "Config", value: "Modular" },
    ],
  },
  {
    name: "ATLAS 04",
    spec: "215 kWh · Liquid-cooled · High cycle",
    category: "ESS",
    specs: [
      { label: "Capacity", value: "215 kWh" },
      { label: "Cooling", value: "Liquid" },
      { label: "Cycles", value: "8,000" },
    ],
  },
  {
    name: "FlexCube 500SL",
    spec: "500 kWh · Containerized · Grid-scale",
    category: "Containerized",
    specs: [
      { label: "Capacity", value: "500 kWh" },
      { label: "Form factor", value: "Containerized" },
      { label: "Scale", value: "Grid-scale" },
    ],
  },
];

const CATEGORIES = ["All", "Battery", "Inverter", "ESS", "Containerized"] as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EnergyProductsPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? energyProducts
      : energyProducts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-1 pb-16 pt-20">
        <DotGrid color="var(--sand-5)" />
        <div className="relative mx-auto max-w-7xl px-10">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "GridEnergy", href: "/energy" },
              { label: "Products" },
            ]}
          />
          <SectionLabel>GRIDENERGY · PRODUCTS</SectionLabel>
          <h1 className="font-heading text-display font-semibold text-sand-12 tracking-tight leading-tight mb-4 max-w-2xl">
            Every scale. One ecosystem.
          </h1>
          <p className="font-body text-body-lg text-sand-11 max-w-xl leading-relaxed">
            Batteries, inverters, and ESS from 5 kWh to 1 MWh. Full specs
            published — no NDA required.
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
                "px-4 py-1.5 rounded-pill border font-body text-body-sm transition-colors duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
                  to={`/energy/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
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
              icon={<Package className="h-5 w-5" />}
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
        heading="Find the right GridEnergy product."
        description="Talk to our team about sizing, specs, and deployment."
        primaryCta={
          <Button asChild>
            <Link to="/contact">Talk to us</Link>
          </Button>
        }
        secondaryCta={
          <Button variant="ghost" asChild>
            <Link to="/energy/solutions/home">See solutions</Link>
          </Button>
        }
      />
    </div>
  );
}
