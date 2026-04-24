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
import { Plug } from "lucide-react";

export const meta: MetaFunction = () => [
  { title: "GridCharge products — EV chargers | GridPower" },
  {
    name: "description",
    content:
      "AC wallboxes to ultra-fast DC highway chargers. OCPP 2.0.1 native. Full specs published.",
  },
  { property: "og:title", content: "GridCharge products — EV chargers | GridPower" },
  {
    property: "og:description",
    content:
      "AC wallboxes to ultra-fast DC highway chargers. OCPP 2.0.1 native. Full specs published.",
  },
  { property: "og:url", content: "/charge/products" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ── Product data (verbatim from ProductsPage.jsx) ──────────────────────────

const chargeProducts = [
  {
    name: "AC 3.3kW",
    spec: "3.3 kW · Type 2 · Single-phase",
    category: "AC Charger",
    specs: [
      { label: "Output", value: "3.3 kW" },
      { label: "Connector", value: "Type 2" },
      { label: "Phase", value: "Single-phase" },
    ],
  },
  {
    name: "AC 7.4kW Smart",
    spec: "7.4 kW · Type 2 · App control · OCPP",
    category: "AC Charger",
    specs: [
      { label: "Output", value: "7.4 kW" },
      { label: "Connector", value: "Type 2" },
      { label: "Protocol", value: "OCPP 2.0.1" },
    ],
  },
  {
    name: "AC 11kW",
    spec: "11 kW · 3-phase · Commercial",
    category: "AC Charger",
    specs: [
      { label: "Output", value: "11 kW" },
      { label: "Phase", value: "3-phase" },
      { label: "Use case", value: "Commercial" },
    ],
  },
  {
    name: "AC 22kW",
    spec: "22 kW · 3-phase · OCPP 2.0.1",
    category: "AC Charger",
    specs: [
      { label: "Output", value: "22 kW" },
      { label: "Phase", value: "3-phase" },
      { label: "Protocol", value: "OCPP 2.0.1" },
    ],
  },
  {
    name: "DC 20kW",
    spec: "20 kW · CCS2 · Compact",
    category: "DC Charger",
    specs: [
      { label: "Output", value: "20 kW" },
      { label: "Connector", value: "CCS2" },
      { label: "Form factor", value: "Compact" },
    ],
  },
  {
    name: "DC 30kW",
    spec: "30 kW · CCS2 + CHAdeMO",
    category: "DC Charger",
    specs: [
      { label: "Output", value: "30 kW" },
      { label: "Connector", value: "CCS2 + CHAdeMO" },
    ],
  },
  {
    name: "DC 60kW Dual-Gun",
    spec: "60 kW · 2 guns · CCS2 + CHAdeMO",
    category: "DC Charger",
    specs: [
      { label: "Output", value: "60 kW" },
      { label: "Guns", value: "2" },
      { label: "Connector", value: "CCS2 + CHAdeMO" },
    ],
  },
  {
    name: "DC 120kW",
    spec: "120 kW · CCS2 · High-power",
    category: "DC Charger",
    specs: [
      { label: "Output", value: "120 kW" },
      { label: "Connector", value: "CCS2" },
      { label: "Grade", value: "High-power" },
    ],
  },
  {
    name: "DC 240kW Ultra-Fast",
    spec: "240 kW · CCS2 · Highway grade",
    category: "DC Charger",
    specs: [
      { label: "Output", value: "240 kW" },
      { label: "Connector", value: "CCS2" },
      { label: "Grade", value: "Highway" },
    ],
  },
  {
    name: "DLB Box",
    spec: "Dynamic load balancing · Single + 3-phase",
    category: "Accessory",
    specs: [
      { label: "Function", value: "Dynamic load balancing" },
      { label: "Phase", value: "Single + 3-phase" },
    ],
  },
];

const CATEGORIES = ["All", "AC Charger", "DC Charger", "Accessory"] as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ChargeProductsPage() {
  const [activeCategory, setActiveCategory] = React.useState<string>("All");

  const filtered =
    activeCategory === "All"
      ? chargeProducts
      : chargeProducts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sand-1 pb-16 pt-20">
        <DotGrid color="var(--sand-5)" />
        <div className="relative mx-auto max-w-7xl px-10">
          <Breadcrumb
            className="mb-6"
            items={[
              { label: "GridCharge", href: "/charge" },
              { label: "Products" },
            ]}
          />
          <SectionLabel>GRIDCHARGE · PRODUCTS</SectionLabel>
          <h1 className="font-display text-display font-semibold text-sand-12 tracking-tight leading-tight mb-4 max-w-2xl">
            3.3 kW to 240 kW. Every use case.
          </h1>
          <p className="font-body text-body-lg text-sand-11 max-w-xl leading-relaxed">
            AC wallboxes to ultra-fast DC highway chargers. OCPP 2.0.1 native.
            Full specs published.
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
                  to={`/charge/products/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
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
              icon={<Plug className="h-5 w-5" />}
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
        heading="Find the right GridCharge product."
        description="Talk to our team about installation, power requirements, and OCPP integration."
        primaryCta={
          <Button asChild>
            <Link to="/contact">Talk to us</Link>
          </Button>
        }
        secondaryCta={
          <Button variant="ghost" asChild>
            <Link to="/charge/solutions/home">See solutions</Link>
          </Button>
        }
      />
    </div>
  );
}
