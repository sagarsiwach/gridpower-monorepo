import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import * as React from "react";
import {
  Button,
  SectionLabel,
  SectionHeader,
  SectionDivider,
  SubsectionNav,
  ProcessSteps,
  CTASection,
  DotGrid,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "GridPower. India generates. GridPower stores, charges, and powers." },
  { name: "description", content: "GridPower builds India's open energy storage, EV charging, and powertrain platform. Launching Q2 2026." },
  { property: "og:title", content: "GridPower" },
  { property: "og:description", content: "India's open energy, EV charging, and powertrain platform. Launching Q2 2026." },
  { property: "og:url", content: "/" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ─── Section 1: Hero ──────────────────────────────────────────────────────────
//
// Editorial scale: display headline at clamp(72px, 9vw, 144px), tight 0.95
// line-height, negative tracking. Single deliberate line break. No colored
// "GridPower" mid-headline (the wordmark in nav already does that).
// One primary CTA. The second action is an outlined link, not a button, so
// it reads as supporting copy not a competing decision.

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-sand-12 min-h-screen flex items-center">
      <DotGrid color="rgba(58,57,55,0.7)" />
      <div className="relative max-w-screen-xl mx-auto px-10 w-full py-32">
        <SectionLabel variant="neutral">THE OPEN ENERGY PLATFORM</SectionLabel>
        <h1
          className="font-display font-semibold text-dark-12 mt-6 mb-8"
          style={{
            fontSize: "clamp(72px, 9vw, 144px)",
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
          }}
        >
          India generates.
          <br />
          GridPower stores, charges, and powers.
        </h1>
        <p className="font-body text-h4 leading-snug text-dark-11 max-w-2xl mb-12">
          Energy storage, EV charging, and powertrain. One open platform, zero lock-in.
        </p>
        <div className="flex gap-4 items-center flex-wrap">
          <Button asChild size="lg">
            <Link to="/energy">Explore GridEnergy</Link>
          </Button>
          <Link
            to="/platform"
            className="font-body text-body-lg font-medium text-dark-12 underline underline-offset-8 decoration-grid-red decoration-2 hover:decoration-4 transition-all duration-fast"
          >
            See the platform
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Numbers bar  -  real Q2 2026 ranges ─────────────────────────────
//
// Replaces the previously empty NumbersBar that read as a placeholder bug.
// Shipped as four typeset stats matching what /platform and /charge/products
// already publish. No NumbersBar component  -  typography handles it.

function HomeNumbersBar() {
  const stats = [
    { label: "STORAGE RANGE", value: "10–500 kWh" },
    { label: "CHARGER RANGE", value: "3.3–60 kW" },
    { label: "POWERTRAIN", value: "2W · 3W · 4W" },
    { label: "FIRST DEPLOYMENTS", value: "Q2 2026", accent: true },
  ];
  return (
    <section className="bg-sand-12 border-t border-dark-6">
      <div className="max-w-screen-xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-dark-6">
          {stats.map((s) => (
            <div key={s.label} className="py-10 md:px-8 first:md:pl-0 last:md:pr-0">
              <div className="font-mono text-label uppercase tracking-widest text-dark-9 mb-3">
                {s.label}
              </div>
              <div
                className={`font-display font-semibold leading-none ${
                  s.accent ? "text-grid-red" : "text-dark-12"
                }`}
                style={{ fontSize: "clamp(28px, 3.4vw, 48px)", letterSpacing: "-0.02em" }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Subsection Nav ────────────────────────────────────────────────

function HomeSectionNav() {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-screen-xl mx-auto px-10 py-4">
        <SubsectionNav
          items={[
            { id: "energy", label: "GridEnergy" },
            { id: "charge", label: "GridCharge" },
            { id: "drive", label: "GridDrive" },
            { id: "platform", label: "Platform" },
            { id: "solutions", label: "Solutions" },
            { id: "process", label: "How it works" },
          ]}
          onItemClick={(id) => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </section>
  );
}

// ─── Section 4: DRENCHED RED  -  Every layer of the energy stack ────────────────
//
// Drenched commitment moment #1. Full GridRed background, white display type.
// The 3-up VerticalCard is replaced with white-on-red typeset entries. Big
// numerical "01 / 02 / 03" anchors and pull-quote stats sell the
// platform-completeness story. Zero imagery.

const STACK_LAYERS = [
  {
    no: "01",
    brand: "GRIDENERGY",
    title: "Energy storage",
    body: "Wall batteries to grid-scale containers. Hybrid inverters, solar-integrated, OCPP-compatible.",
    stat: "10–500 kWh",
    href: "/energy",
  },
  {
    no: "02",
    brand: "GRIDCHARGE",
    title: "EV charging",
    body: "Home wallboxes to DC fast chargers. Revenue-ready, fleet-capable, OCPP 2.0.1 native.",
    stat: "3.3–60 kW",
    href: "/charge",
  },
  {
    no: "03",
    brand: "GRIDDRIVE",
    title: "Powertrain",
    body: "Motors, controllers, BMS for OEMs. Full specs published. No NDA. India-engineered.",
    stat: "2W · 3W · 4W",
    href: "/drive",
  },
];

function ThreeVerticals() {
  return (
    <section
      id="energy"
      className="relative overflow-hidden bg-grid-red py-32"
    >
      <DotGrid color="rgba(255,255,255,0.12)" />
      <div className="relative max-w-screen-xl mx-auto px-10">
        <div className="font-mono text-label uppercase tracking-widest text-white/70 mb-6">
          THREE VERTICALS · ONE PLATFORM
        </div>
        <h2
          className="font-display font-semibold text-white max-w-4xl mb-20"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            lineHeight: "0.98",
            letterSpacing: "-0.02em",
          }}
        >
          Every layer of the energy stack.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 rounded-card overflow-hidden">
          {STACK_LAYERS.map((layer) => (
            <Link
              key={layer.no}
              to={layer.href}
              className="bg-grid-red p-10 flex flex-col justify-between min-h-[360px] hover:bg-grid-red-hover transition-colors duration-fast group"
            >
              <div>
                <div
                  className="font-display font-semibold text-white/40 leading-none mb-8"
                  style={{ fontSize: "clamp(48px, 5vw, 72px)", letterSpacing: "-0.02em" }}
                >
                  {layer.no}
                </div>
                <div className="font-mono text-label uppercase tracking-widest text-white/80 mb-3">
                  {layer.brand}
                </div>
                <h3 className="font-display font-semibold text-white text-h2 leading-tight tracking-tight mb-4">
                  {layer.title}
                </h3>
                <p className="font-body text-body text-white/80 leading-relaxed max-w-sm">
                  {layer.body}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/20 flex items-baseline justify-between">
                <span
                  className="font-mono font-semibold text-white"
                  style={{ fontSize: "clamp(20px, 1.6vw, 28px)" }}
                >
                  {layer.stat}
                </span>
                <span className="font-body text-body-sm font-medium text-white group-hover:translate-x-1 transition-transform duration-fast">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Platform showcase  -  dark band, typography + code ──────────────
//
// The platform/architecture moment. Stays dark (sand-12), zero imagery, voice
// carried by an ASCII pipeline diagram and code snippet  -  same lane as
// /platform. The previous device-mock placeholder is gone.

function PlatformShowcase() {
  const features = [
    { title: "One API, every asset", sub: "Storage, chargers, and powertrain BMS on a single interface." },
    { title: "Open protocols", sub: "OCPP 2.0.1, Modbus TCP, REST, MQTT. No NDA required." },
    { title: "Live monitoring", sub: "24/7 visibility into every device, session, and kWh." },
    { title: "Revenue-ready", sub: "Session billing, fleet accounts, and operator dashboards built in." },
  ];

  const apiSnippet = `// One platform. Every asset.
import { GridOS } from "@gridpower/sdk";

const grid = new GridOS({ apiKey: process.env.GRID_KEY });

// Read across storage, chargers, and powertrain
const sites = await grid.sites.list();
for (const site of sites) {
  const live = await grid.telemetry.stream(site.id);
  // → kWh in, kWh out, charger sessions, BMS state
}`;

  return (
    <section
      id="platform"
      className="bg-sand-12 py-32 relative overflow-hidden"
    >
      <DotGrid color="rgba(58,57,55,0.65)" />
      <div className="relative max-w-screen-xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Left: copy */}
        <div>
          <SectionLabel variant="neutral">GRIDOS · THE PLATFORM</SectionLabel>
          <h2
            className="font-display font-semibold text-dark-12 mt-6 mb-8"
            style={{
              fontSize: "clamp(48px, 6vw, 88px)",
              lineHeight: "0.98",
              letterSpacing: "-0.02em",
            }}
          >
            One platform.
            <br />
            Every asset.
          </h2>
          <p className="font-body text-h4 text-dark-11 leading-snug mb-12 max-w-md">
            GridOS connects your storage, chargers, and powertrain BMS. One dashboard. Zero fragmentation.
          </p>
          <ul className="flex flex-col gap-7 mb-12">
            {features.map((f, i) => (
              <li key={i} className="flex gap-4">
                <div className="mt-2 w-1 h-1 rounded-full bg-grid-red shrink-0" />
                <div>
                  <div className="font-body text-body font-semibold text-dark-12 mb-1">{f.title}</div>
                  <div className="font-body text-body-sm text-dark-11 leading-relaxed">{f.sub}</div>
                </div>
              </li>
            ))}
          </ul>
          <Button asChild size="lg">
            <Link to="/signup">Get early access</Link>
          </Button>
        </div>

        {/* Right: ASCII pipeline + code, no images */}
        <div className="flex flex-col gap-6">
          {/* ASCII pipeline */}
          <div className="bg-dark-3 border border-dark-6 rounded-card p-8">
            <div className="font-mono text-label uppercase tracking-widest text-dark-9 mb-6">
              ARCHITECTURE
            </div>
            <div className="grid grid-cols-3 items-stretch gap-3">
              {[
                { label: "HARDWARE", body: "Batteries · Chargers · BMS" },
                { label: "GRIDOS", body: "Device · Data · Rules · API" },
                { label: "APPS", body: "Console · Mobile · Partner" },
              ].map((cell, i) => (
                <React.Fragment key={cell.label}>
                  <div className="bg-dark-2 border border-dark-6 rounded-card p-5 flex flex-col">
                    <div className="font-mono text-label uppercase tracking-widest text-grid-red mb-3">
                      {cell.label}
                    </div>
                    <div className="font-body text-body-sm text-dark-11 leading-snug">
                      {cell.body}
                    </div>
                  </div>
                  {i < 2 && (
                    <span className="hidden" aria-hidden="true">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4 font-mono text-body-sm text-dark-9 tracking-wide">
              hardware → gridos → apps
            </div>
          </div>

          {/* Code snippet */}
          <div className="bg-dark-2 border border-dark-6 rounded-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-dark-6">
              <span className="font-mono text-label uppercase tracking-widest text-dark-9">
                gridos.ts
              </span>
              <span className="font-mono text-label uppercase tracking-widest text-grid-red">
                LIVE
              </span>
            </div>
            <pre className="font-mono text-code text-dark-11 leading-relaxed p-6 overflow-x-auto">
{apiSnippet}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: GridEnergy highlight  -  typography bento, no images ────────────
//
// Asymmetric 2fr/1fr bento, but every cell now carries weight via type and
// color drench. The big residential cell becomes a typography-led sand-12
// card with an oversized stat instead of a lifestyle photo placeholder.

function GridEnergyHighlight() {
  return (
    <section className="bg-sand-1 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionLabel>GRIDENERGY</SectionLabel>
        <h2
          className="font-display font-semibold text-sand-12 mt-4 mb-12 max-w-2xl"
          style={{
            fontSize: "clamp(40px, 5vw, 72px)",
            lineHeight: "1.0",
            letterSpacing: "-0.02em",
          }}
        >
          Store your sun. Power your day.
        </h2>
        <div
          className="grid gap-px bg-sand-6 rounded-card overflow-hidden"
          style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", minHeight: "520px" }}
        >
          {/* Large cell  -  residential, typography-led */}
          <Link
            to="/energy/solutions/home"
            className="row-span-2 relative overflow-hidden bg-sand-12 p-12 flex flex-col justify-between group hover:bg-dark-2 transition-colors duration-fast"
            style={{ gridRow: "1 / span 2" }}
          >
            <DotGrid color="rgba(58,57,55,0.5)" />
            <div className="relative">
              <SectionLabel variant="neutral">RESIDENTIAL</SectionLabel>
              <h3 className="font-display font-semibold text-white leading-tight tracking-tight mt-4 mb-4 text-h2">
                Rooftop solar.
                <br />
                Wall battery.
              </h3>
              <p className="font-body text-body-lg text-dark-11 max-w-md leading-relaxed">
                Capture excess solar during the day. Power your home through outages and peak tariffs at night.
              </p>
            </div>
            <div className="relative flex items-baseline justify-between border-t border-dark-6 pt-8">
              <span
                className="font-display font-semibold text-grid-red leading-none"
                style={{ fontSize: "clamp(48px, 6vw, 96px)", letterSpacing: "-0.02em" }}
              >
                5–21 kWh
              </span>
              <span className="font-body text-body-sm text-white font-medium group-hover:translate-x-1 transition-transform duration-fast">
                Explore →
              </span>
            </div>
          </Link>

          {/* Small top  -  commercial */}
          <Link
            to="/energy/solutions/commercial"
            className="relative overflow-hidden bg-sand-2 p-8 flex flex-col justify-between group hover:bg-sand-3 transition-colors duration-fast"
          >
            <DotGrid color="var(--sand-4)" />
            <div className="relative">
              <SectionLabel>COMMERCIAL</SectionLabel>
              <h4 className="font-heading text-h4 text-foreground mt-3 mb-2">Office &amp; industrial</h4>
              <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                30–500 kWh systems. Cut peak demand, store solar, run backup loads.
              </p>
            </div>
            <span className="relative font-body text-body-sm text-grid-red font-medium mt-4">
              Explore →
            </span>
          </Link>

          {/* Small bottom  -  products */}
          <Link
            to="/energy/products"
            className="relative overflow-hidden bg-sand-3 p-8 flex flex-col justify-between group hover:bg-sand-4 transition-colors duration-fast"
          >
            <DotGrid color="var(--sand-5)" />
            <div className="relative">
              <div className="font-mono text-label text-grid-red uppercase tracking-widest mb-2">
                PRODUCTS
              </div>
              <h4 className="font-heading text-h4 text-sand-12 mb-2">ATLAS · COMO · ROSA</h4>
              <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                Full specs published. No NDA. Wall-mount to containerized.
              </p>
            </div>
            <span className="relative font-body text-body-sm text-grid-red font-medium mt-4">
              View products →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Solutions  -  asymmetric 1 hero + 5 thumb ───────────────────────
//
// Editorial pick from the spec: break the uniform 6-up grid by promoting the
// fleet/destination story to a hero card on the left, with five denser
// thumbnail cards on the right. Variety, not chaos  -  the rest of the page
// keeps clean grids.

const SOLUTION_HERO = {
  label: "FLEET CHARGING",
  title: "Move every vehicle, every day.",
  description:
    "Multi-gun DC charging for fleet operators. OCPP 2.0.1 native. Centralized billing, role-based access, real-time SoC across the depot.",
  meta: "60 kW DC · multi-gun · revenue-ready",
  href: "/charge",
};

const SOLUTION_THUMBS = [
  {
    label: "RESIDENTIAL STORAGE",
    title: "Home battery storage",
    description: "Wall batteries with solar integration.",
    href: "/energy/solutions/home",
  },
  {
    label: "COMMERCIAL STORAGE",
    title: "Office & industrial ESS",
    description: "30–500 kWh demand-shaving systems.",
    href: "/energy/solutions/commercial",
  },
  {
    label: "HOME CHARGING",
    title: "Smart home wallbox",
    description: "7.4–22 kW AC, solar-aware scheduling.",
    href: "/charge/solutions/home",
  },
  {
    label: "DESTINATION CHARGING",
    title: "Hotels & malls",
    description: "Revenue-ready hospitality charging.",
    href: "/charge/solutions/destination",
  },
  {
    label: "OEM POWERTRAIN",
    title: "2W / 3W / 4W platforms",
    description: "Motors, controllers, BMS for OEMs.",
    href: "/drive/solutions/vehicles",
  },
];

function SolutionsGrid() {
  return (
    <section id="solutions" className="bg-sand-2 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionHeader
          label="SOLUTIONS"
          heading="Find your application."
          lead="From home rooftops to highway corridors. GridPower has a solution for every energy and mobility need."
          className="mb-12"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-sand-6 rounded-card overflow-hidden">
          {/* Hero */}
          <Link
            to={SOLUTION_HERO.href}
            className="relative bg-sand-12 p-12 min-h-[420px] flex flex-col justify-between overflow-hidden group hover:bg-dark-2 transition-colors duration-fast"
          >
            <DotGrid color="rgba(58,57,55,0.45)" />
            <div className="relative">
              <div className="font-mono text-label uppercase tracking-widest text-grid-red mb-3">
                {SOLUTION_HERO.label}
              </div>
              <h3
                className="font-display font-semibold text-white leading-tight tracking-tight mb-6"
                style={{ fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.02em" }}
              >
                {SOLUTION_HERO.title}
              </h3>
              <p className="font-body text-body-lg text-dark-11 leading-relaxed max-w-md">
                {SOLUTION_HERO.description}
              </p>
            </div>
            <div className="relative pt-8 mt-8 border-t border-dark-6 flex items-baseline justify-between">
              <span className="font-mono text-body-sm uppercase tracking-widest text-dark-9">
                {SOLUTION_HERO.meta}
              </span>
              <span className="font-body text-body-sm text-white font-medium group-hover:translate-x-1 transition-transform duration-fast">
                Explore →
              </span>
            </div>
          </Link>

          {/* Thumbnails  -  2 col density inside the right half */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-sand-6">
            {SOLUTION_THUMBS.map((t) => (
              <Link
                key={t.href}
                to={t.href}
                className="bg-sand-1 p-7 flex flex-col justify-between min-h-[200px] hover:bg-sand-2 transition-colors duration-fast group"
              >
                <div>
                  <div className="font-mono text-label uppercase tracking-widest text-grid-red mb-2">
                    {t.label}
                  </div>
                  <div className="font-heading text-h4 text-sand-12 mb-1.5">{t.title}</div>
                  <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                    {t.description}
                  </p>
                </div>
                <span className="font-body text-body-sm text-grid-red font-medium mt-4 group-hover:translate-x-1 transition-transform duration-fast inline-block">
                  Explore →
                </span>
              </Link>
            ))}
            {/* Filler if odd  -  5 thumbs leaves one cell empty; fill with a
                quiet "all solutions" anchor to keep the grid clean */}
            <Link
              to="/charge"
              className="bg-sand-3 p-7 flex flex-col justify-between min-h-[200px] hover:bg-sand-4 transition-colors duration-fast group"
            >
              <div>
                <div className="font-mono text-label uppercase tracking-widest text-grid-red mb-2">
                  ALL APPLICATIONS
                </div>
                <div className="font-heading text-h4 text-sand-12 mb-1.5">
                  See the full map
                </div>
                <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                  Every application across energy, charging, and powertrain.
                </p>
              </div>
              <span className="font-body text-body-sm text-grid-red font-medium mt-4 group-hover:translate-x-1 transition-transform duration-fast inline-block">
                View all →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: DRENCHED RED  -  Charging infrastructure built for India ────────
//
// Drenched commitment moment #2. Single huge stat, full-width red band,
// minimal copy. Replaces the previous 6-cell bento that hid the headline
// stat behind a placeholder render. The stat IS the section.

function ChargingInfrastructure() {
  return (
    <section
      id="charge"
      className="relative overflow-hidden bg-grid-red py-32"
    >
      <DotGrid color="rgba(255,255,255,0.12)" />
      <div className="relative max-w-screen-xl mx-auto px-10">
        <div className="font-mono text-label uppercase tracking-widest text-white/70 mb-6">
          GRIDCHARGE · DC FAST CHARGING
        </div>
        <h2
          className="font-display font-semibold text-white mb-12 max-w-4xl"
          style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            lineHeight: "0.98",
            letterSpacing: "-0.02em",
          }}
        >
          Charging infrastructure built for India.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <div
              className="font-display font-semibold text-white leading-none mb-6"
              style={{ fontSize: "clamp(96px, 14vw, 224px)", letterSpacing: "-0.04em" }}
            >
              60 kW
            </div>
            <p className="font-body text-h4 text-white/85 leading-snug max-w-md">
              DC fast charging, ready Q2 2026. OCPP 2.0.1 native. Solar-integrated. Every session reported live to GridOS.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-white/15 rounded-card overflow-hidden">
            {[
              { label: "HOME", value: "7.4–22 kW", body: "AC wallbox" },
              { label: "DESTINATION", value: "22–60 kW", body: "Hotels · malls" },
              { label: "FLEET", value: "60 kW DC", body: "Multi-gun depots" },
              { label: "PROTOCOL", value: "OCPP 2.0.1", body: "Native, no bridge" },
            ].map((cell) => (
              <div key={cell.label} className="bg-grid-red p-7 flex flex-col gap-3">
                <div className="font-mono text-label uppercase tracking-widest text-white/70">
                  {cell.label}
                </div>
                <div
                  className="font-display font-semibold text-white leading-none"
                  style={{ fontSize: "clamp(24px, 2.4vw, 36px)", letterSpacing: "-0.02em" }}
                >
                  {cell.value}
                </div>
                <div className="font-body text-body-sm text-white/80 mt-auto">
                  {cell.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex gap-4 flex-wrap items-center">
          <Button asChild size="lg" variant="ghost" className="bg-white text-grid-red border-white hover:bg-sand-2">
            <Link to="/charge">Explore GridCharge</Link>
          </Button>
          <Link
            to="/charge/products"
            className="font-body text-body-lg font-medium text-white underline underline-offset-8 decoration-white/50 hover:decoration-white transition-all duration-fast"
          >
            View all chargers
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 9: Process steps (How it works) ─────────────────────────────────

function HowItWorks() {
  return (
    <section id="process" className="bg-sand-2 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionHeader
          label="HOW IT WORKS"
          heading="From brief to live in weeks."
          className="mb-12"
        />
        <ProcessSteps
          steps={[
            {
              number: "01",
              title: "Assess",
              description:
                "Site survey and energy load analysis. We map your consumption, solar potential, and charging needs.",
            },
            {
              number: "02",
              title: "Design",
              description:
                "Custom system design with full specs. No NDAs. All documentation is yours.",
            },
            {
              number: "03",
              title: "Install",
              description:
                "Certified installation in 1–3 days. Hardware commission and GridOS onboarding included.",
            },
            {
              number: "04",
              title: "Monitor",
              description:
                "24/7 visibility via GridOS. Live dashboards, proactive alerts, remote diagnostics.",
            },
          ]}
        />
      </div>
    </section>
  );
}

// ─── Section 10: Early partners  -  typeset quote, no avatar ────────────────────

function EarlyPartners() {
  return (
    <section className="bg-sand-1 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionHeader
          label="EARLY PARTNERS"
          heading="Partner announcements Q2 2026."
          lead="GridPower is in active conversations with industrial estates, hotel groups, and EV OEMs across India. Deployment partner announcements coming Q2 2026."
          className="mb-16"
        />
        <figure className="max-w-3xl mx-auto text-center">
          <blockquote
            className="font-display font-semibold text-sand-12 mb-8"
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              lineHeight: "1.15",
              letterSpacing: "-0.015em",
            }}
          >
            “The EV transition in India needs credible platform infrastructure. GridPower is building the plumbing that every OEM and operator will depend on.”
          </blockquote>
          <figcaption className="font-mono text-label uppercase tracking-widest text-sand-9">
            Industry Advisor · Placeholder attribution · Partner announcements Q2 2026
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ─── Section 11: Logo cloud ───────────────────────────────────────────────────

function PartnersLogoCloud() {
  return (
    <section className="bg-sand-2 py-16 relative overflow-hidden">
      <DotGrid />
      <div className="relative max-w-screen-xl mx-auto px-10">
        <SectionLabel>PARTNERS</SectionLabel>
        <p className="font-body text-body text-sand-11 mb-8 mt-2">
          Partner logos coming Q2 2026.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 rounded bg-sand-4 opacity-40"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 12: Final CTA ────────────────────────────────────────────────────

function HomeCTA() {
  return (
    <CTASection
      heading="Ready to power your future?"
      description="Energy storage, EV charging, and powertrain. One open platform, zero lock-in. Join the waitlist."
      primaryCta={
        <Button asChild size="lg">
          <Link to="/signup">Get early access</Link>
        </Button>
      }
      secondaryCta={
        <Button asChild variant="ghost" size="lg" className="border-dark-6 text-dark-11 hover:bg-dark-3">
          <Link to="/contact">Get in touch</Link>
        </Button>
      }
      variant="dark"
    />
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function IndexRoute() {
  return (
    <div className="bg-background text-foreground">
      <HomeHero />
      <HomeNumbersBar />
      <HomeSectionNav />
      <ThreeVerticals />
      <PlatformShowcase />
      <GridEnergyHighlight />
      <SolutionsGrid />
      <ChargingInfrastructure />
      <HowItWorks />
      <EarlyPartners />
      <PartnersLogoCloud />
      <HomeCTA />
    </div>
  );
}
