import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Button,
  SectionLabel,
  SectionHeader,
  SectionDivider,
  VerticalCard,
  SolutionCard,
  FeatureCard,
  TestimonialCard,
  SubsectionNav,
  NumbersBar,
  ProcessSteps,
  CTASection,
  LogoCloud,
  DotGrid,
  ImgPlaceholder,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "GridPower — India generates. GridPower stores, charges, and powers." },
  { name: "description", content: "GridPower builds India's open energy storage, EV charging, and drive platform. Launching Q2 2026." },
  { property: "og:title", content: "GridPower" },
  { property: "og:description", content: "India's open energy + EV charging + drive platform. Launching Q2 2026." },
  { property: "og:url", content: "/" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-sand-12 py-32 min-h-screen flex items-center">
      <DotGrid color="rgba(58,57,55,0.7)" />
      <div className="relative max-w-screen-xl mx-auto px-10 w-full">
        <SectionLabel variant="neutral">THE OPEN ENERGY PLATFORM</SectionLabel>
        <h1 className="font-heading text-h1 leading-tight tracking-[-0.025em] text-dark-12 max-w-3xl mb-7">
          India generates.<br />
          <span className="text-grid-red">GridPower</span> stores,<br />
          charges, and powers.
        </h1>
        <p className="font-body text-body-lg leading-relaxed text-dark-11 max-w-xl mb-12">
          Energy storage, EV charging, and powertrain — one open platform, zero lock-in.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button asChild size="lg">
            <Link to="/energy">Explore GridEnergy</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="border-dark-6 text-dark-11 hover:bg-dark-3">
            <Link to="/platform">View the platform →</Link>
          </Button>
        </div>

        {/* Stats bar */}
        <div className="mt-24">
          <NumbersBar
            stats={[
              { value: "Launch Q2 2026", label: "First deployments", accent: true },
              { value: "5 kWh – 1 MWh", label: "Storage range" },
              { value: "3.3 – 240 kW", label: "Charging range" },
              { value: "2W / 3W / 4W", label: "Powertrain platforms" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Subsection Nav ────────────────────────────────────────────────

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

// ─── Section 3: Three Verticals ───────────────────────────────────────────────

function ThreeVerticals() {
  const verticals = [
    {
      key: "energy",
      brand: "GRIDENERGY",
      title: "Energy storage",
      tagline: "Residential to grid-scale. 5 kWh to 1 MWh. Hybrid inverters, solar integration, open protocols.",
      stat: "5 kWh – 1 MWh",
      logo: <img src="/logos/logo-gridenergy.svg" alt="GridEnergy" className="h-8" />,
      href: "/energy",
    },
    {
      key: "charge",
      brand: "GRIDCHARGE",
      title: "EV charging",
      tagline: "From home wallboxes to 240 kW highway ultra-fast. Revenue-ready, solar-integrated, fleet-capable.",
      stat: "3.3 – 240 kW",
      logo: <img src="/logos/logo-gridcharge.svg" alt="GridCharge" className="h-8" />,
      href: "/charge",
    },
    {
      key: "drive",
      brand: "GRIDDRIVE",
      title: "Powertrain",
      tagline: "2W, 3W, 4W powertrain platforms for OEMs. Motors, controllers, battery packs — full specs published.",
      stat: "2W / 3W / 4W",
      logo: <img src="/logos/logo-griddrive.svg" alt="GridDrive" className="h-8" />,
      href: "/drive",
    },
  ];

  return (
    <section id="energy" className="bg-sand-2 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionHeader
          label="THREE VERTICALS · ONE PLATFORM"
          heading="Every layer of the energy stack."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand-6 rounded-card overflow-hidden">
          {verticals.map((v) => (
            <VerticalCard
              key={v.key}
              brand={v.brand}
              title={v.title}
              tagline={v.tagline}
              stat={v.stat}
              logo={v.logo}
              onCardClick={() => void 0}
              className="rounded-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: Platform / GridOS ────────────────────────────────────────────

function PlatformShowcase() {
  const features = [
    { title: "One API, every asset", sub: "Storage, chargers, and powertrain BMS on a single interface." },
    { title: "Open protocols", sub: "OCPP 2.0.1, Modbus TCP, REST, MQTT. No NDA required." },
    { title: "Live monitoring", sub: "24/7 visibility into every device, session, and kWh." },
    { title: "Revenue-ready", sub: "Session billing, fleet accounts, and operator dashboards built in." },
  ];

  return (
    <section id="platform" className="bg-sand-12 py-24 relative overflow-hidden">
      <DotGrid color="rgba(58,57,55,0.65)" />
      <div className="relative max-w-screen-xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left: copy */}
        <div>
          <SectionLabel variant="neutral">GRIDOS · THE PLATFORM</SectionLabel>
          <h2 className="font-heading text-h2 text-dark-12 leading-tight tracking-[-0.02em] mb-6">
            One platform.<br />Every asset.
          </h2>
          <p className="font-body text-body-lg text-dark-11 leading-relaxed mb-10">
            GridOS connects your storage, chargers, and powertrain BMS. One dashboard. Zero fragmentation.
          </p>
          <ul className="flex flex-col gap-6 mb-10">
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

        {/* Right: device mock */}
        <div className="relative h-96 flex items-center justify-center">
          {/* MacBook-like frame */}
          <div className="absolute inset-x-10 bottom-0 bg-dark-3 border border-dark-6 rounded-xl p-3 shadow-2xl">
            <div className="relative bg-dark-2 rounded-lg h-40 overflow-hidden flex items-center justify-center">
              <DotGrid color="var(--dark-5)" />
              <div className="relative font-mono text-label text-dark-9 uppercase text-center">
                GridPower Console<br />Dashboard view
              </div>
            </div>
            <div className="h-1.5 bg-dark-4 rounded-b mx-[-4px] mt-1" />
          </div>
          {/* Phone overlay */}
          <div className="absolute top-0 right-0 w-24 bg-dark-4 border border-dark-6 rounded-2xl p-1.5 shadow-2xl">
            <div className="bg-dark-2 rounded-xl h-44 flex items-center justify-center overflow-hidden">
              <div className="font-mono text-[9px] text-grid-red uppercase tracking-widest text-center">
                GridCharge<br />App
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Numbers bar ───────────────────────────────────────────────────

function HomeNumbersBar() {
  return (
    <section className="bg-background py-16 relative overflow-hidden">
      <DotGrid />
      <div className="relative max-w-screen-xl mx-auto px-10">
        <NumbersBar
          stats={[
            { value: "Launch Q2 2026", label: "First deployments", accent: true },
            { value: "5 kWh – 1 MWh", label: "Storage range" },
            { value: "3.3 – 240 kW", label: "Charging range" },
            { value: "2W / 3W / 4W", label: "Powertrain platforms" },
          ]}
        />
      </div>
    </section>
  );
}

// ─── Section 6: Layout A bento (GridEnergy highlight) ────────────────────────

function GridEnergyHighlight() {
  return (
    <section className="bg-sand-1 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionLabel>GRIDENERGY</SectionLabel>
        <div
          className="grid gap-px bg-sand-6 rounded-card overflow-hidden"
          style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", height: 460 }}
        >
          {/* Large cell — residential */}
          <Link
            to="/energy/solutions/home"
            className="row-span-2 relative overflow-hidden flex flex-col justify-end group"
            style={{ gridRow: "1 / span 2" }}
          >
            <ImgPlaceholder
              label="Home · Rooftop solar + wall battery"
              className="absolute inset-0 w-full h-full rounded-none border-0"
              style={{ aspectRatio: "unset" } as React.CSSProperties}
            />
            <div className="absolute inset-x-0 bottom-0 px-10 py-8 bg-gradient-to-t from-sand-12/85 to-transparent z-10">
              <SectionLabel variant="neutral">RESIDENTIAL</SectionLabel>
              <h3 className="font-heading text-h3 text-white leading-snug mb-2">
                Store your sun.<br />Power your home.
              </h3>
              <span className="font-body text-body-sm text-white/70">5 – 21 kWh · Explore →</span>
            </div>
          </Link>

          {/* Small top — commercial */}
          <Link
            to="/energy/solutions/commercial"
            className="relative overflow-hidden bg-sand-2 p-7 flex flex-col justify-between group hover:bg-sand-3 transition-colors"
          >
            <DotGrid color="var(--sand-4)" />
            <div className="relative">
              <SectionLabel>COMMERCIAL</SectionLabel>
              <h4 className="font-heading text-h4 text-foreground">Office &amp; industrial</h4>
              <p className="font-body text-body-sm text-sand-11 mt-1.5">30 – 500 kWh. Cut peak demand.</p>
            </div>
            <span className="relative font-body text-body-sm text-grid-red font-medium">Explore →</span>
          </Link>

          {/* Small bottom — products */}
          <Link
            to="/energy/products"
            className="relative overflow-hidden bg-sand-12 p-7 flex flex-col justify-between group hover:bg-sand-12/90 transition-colors"
          >
            <DotGrid color="rgba(58,57,55,0.5)" />
            <div className="relative">
              <div className="font-mono text-label text-grid-red uppercase mb-2">PRODUCTS</div>
              <h4 className="font-heading text-h4 text-dark-12">ATLAS · COMO · ROSA</h4>
              <p className="font-body text-body-sm text-dark-11 mt-1.5">Full specs published. No NDA.</p>
            </div>
            <span className="relative font-body text-body-sm text-grid-red font-medium">View products →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Solutions grid ────────────────────────────────────────────────

const SOLUTIONS = [
  {
    label: "RESIDENTIAL STORAGE",
    title: "Home battery storage",
    description: "Solar-integrated wall batteries for homes. Store excess solar, power through outages.",
    href: "/energy/solutions/home",
  },
  {
    label: "COMMERCIAL STORAGE",
    title: "Office & industrial ESS",
    description: "30 – 500 kWh systems. Demand charge reduction and peak shaving for businesses.",
    href: "/energy/solutions/commercial",
  },
  {
    label: "HOME CHARGING",
    title: "Smart home wallbox",
    description: "7.4 – 22 kW AC wallboxes with solar integration and smart scheduling.",
    href: "/charge/solutions/home",
  },
  {
    label: "DESTINATION CHARGING",
    title: "Hotels & malls",
    description: "Revenue-ready destination charging network for hospitality and retail.",
    href: "/charge/solutions/destination",
  },
  {
    label: "FLEET CHARGING",
    title: "Enterprise fleet",
    description: "Multi-gun DC charging for fleet operators. OCPP 2.0.1 native.",
    href: "/charge",
  },
  {
    label: "OEM POWERTRAIN",
    title: "2W / 3W / 4W platforms",
    description: "Complete EV powertrain solutions for manufacturers. Full specs, open API.",
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
          heading="Every application, covered."
          lead="From home rooftops to highway corridors — GridPower has a solution for every energy and mobility need."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((s) => (
            <SolutionCard
              key={s.href}
              label={s.label}
              title={s.title}
              description={s.description}
              onLinkClick={() => void 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: Layout C bento (GridCharge/GridDrive stat-focused) ────────────

function GridChargeDriveBento() {
  return (
    <section id="charge" className="bg-sand-1 py-24 relative">
      <SectionDivider />
      <div className="max-w-screen-xl mx-auto px-10 pt-20">
        <SectionLabel>GRIDCHARGE</SectionLabel>
        <div
          className="grid gap-px bg-sand-6 rounded-card overflow-hidden"
          style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr", height: 440 }}
        >
          {/* Top-left */}
          <Link
            to="/charge/solutions/home"
            className="relative bg-sand-2 p-6 overflow-hidden hover:bg-sand-3 transition-colors group"
            style={{ gridColumn: 1, gridRow: 1 }}
          >
            <DotGrid color="var(--sand-4)" />
            <div className="relative">
              <div className="font-mono text-label text-grid-red uppercase mb-2">HOME</div>
              <div className="font-heading text-h4 text-foreground mb-1">Smart wallbox</div>
              <div className="font-body text-body-sm text-sand-9">7.4–22 kW</div>
            </div>
          </Link>

          {/* Center large — DC fast */}
          <div
            className="relative bg-sand-12 p-8 overflow-hidden flex flex-col justify-between"
            style={{ gridColumn: 2, gridRow: "1 / span 2" }}
          >
            <DotGrid color="rgba(58,57,55,0.6)" />
            <div className="relative">
              <SectionLabel variant="neutral">DC FAST CHARGING</SectionLabel>
              <h3 className="font-heading text-h3 text-dark-12 leading-tight mb-3">
                Charging infrastructure that pays for itself.
              </h3>
              <p className="font-body text-body-sm text-dark-11 leading-relaxed">
                OCPP 2.0.1 native. Solar-integrated. Every session reported live.
              </p>
            </div>
            <div className="relative bg-dark-3 rounded-card p-5 text-center">
              <div className="font-mono text-label text-grid-red uppercase mb-1.5">DC CHARGER · PRODUCT RENDER</div>
              <div className="font-heading text-h3 text-dark-11">240 kW</div>
              <div className="font-mono text-label text-dark-9 mt-1">Ultra-Fast</div>
            </div>
          </div>

          {/* Top-right */}
          <Link
            to="/charge/solutions/destination"
            className="relative bg-sand-2 p-6 overflow-hidden hover:bg-sand-3 transition-colors group"
            style={{ gridColumn: 3, gridRow: 1 }}
          >
            <DotGrid color="var(--sand-4)" />
            <div className="relative">
              <div className="font-mono text-label text-grid-red uppercase mb-2">DESTINATION</div>
              <div className="font-heading text-h4 text-foreground mb-1">Hotels &amp; malls</div>
              <div className="font-body text-body-sm text-sand-9">Revenue ready</div>
            </div>
          </Link>

          {/* Bottom-left */}
          <Link
            to="/charge"
            className="relative bg-sand-2 p-6 overflow-hidden hover:bg-sand-3 transition-colors group"
            style={{ gridColumn: 1, gridRow: 2 }}
          >
            <DotGrid color="var(--sand-4)" />
            <div className="relative">
              <div className="font-mono text-label text-grid-red uppercase mb-2">FLEET</div>
              <div className="font-heading text-h4 text-foreground mb-1">Enterprise fleet</div>
              <div className="font-body text-body-sm text-sand-9">Multi-gun DC</div>
            </div>
          </Link>

          {/* Bottom-right */}
          <Link
            to="/charge/products"
            className="relative bg-sand-2 p-6 overflow-hidden hover:bg-sand-3 transition-colors group"
            style={{ gridColumn: 3, gridRow: 2 }}
          >
            <DotGrid color="var(--sand-4)" />
            <div className="relative">
              <div className="font-mono text-label text-grid-red uppercase mb-2">PRODUCTS</div>
              <div className="font-heading text-h4 text-foreground mb-1">Full range</div>
              <div className="font-body text-body-sm text-sand-9">3.3–240 kW</div>
            </div>
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
              description: "Site survey and energy load analysis. We map your consumption, solar potential, and charging needs.",
            },
            {
              number: "02",
              title: "Design",
              description: "Custom system design with full specs. No NDAs — all documentation is yours.",
            },
            {
              number: "03",
              title: "Install",
              description: "Certified installation in 1–3 days. Hardware commission and GridOS onboarding included.",
            },
            {
              number: "04",
              title: "Monitor",
              description: "24/7 visibility via GridOS. Live dashboards, proactive alerts, remote diagnostics.",
            },
          ]}
        />
      </div>
    </section>
  );
}

// ─── Section 10: Testimonials / early partners ────────────────────────────────

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
        {/* Placeholder testimonial */}
        <div className="max-w-2xl mx-auto">
          <TestimonialCard
            quote="The EV transition in India needs credible platform infrastructure. GridPower is building the plumbing that every OEM and operator will depend on."
            name="Industry Advisor"
            role="Placeholder attribution · Partner announcements Q2 2026"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Section 11: Logo cloud ───────────────────────────────────────────────────

function PartnersLogoCloud() {
  // Empty logos — partner announcements Q2 2026.
  // LogoCloud handles zero logos gracefully; placeholder divs shown instead.
  return (
    <section className="bg-sand-2 py-16 relative overflow-hidden">
      <DotGrid />
      <div className="relative max-w-screen-xl mx-auto px-10">
        <SectionLabel>PARTNERS</SectionLabel>
        <p className="font-body text-body text-sand-11 mb-8">
          Partner logos coming Q2 2026.
        </p>
        {/* 6 empty placeholder slots */}
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
      description="Energy storage, EV charging, and powertrain — one open platform, zero lock-in. Join the waitlist."
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
      {/* 1. Hero */}
      <HomeHero />
      {/* 2. Subsection nav */}
      <HomeSectionNav />
      {/* 3. Three verticals intro */}
      <ThreeVerticals />
      {/* 4. Platform section */}
      <PlatformShowcase />
      {/* 5. Numbers bar */}
      <HomeNumbersBar />
      {/* 6. Layout A bento (GridEnergy) */}
      <GridEnergyHighlight />
      {/* 7. Solutions grid */}
      <SolutionsGrid />
      {/* 8. Layout C bento (GridCharge stat-focused) */}
      <GridChargeDriveBento />
      {/* 9. Process steps */}
      <HowItWorks />
      {/* 10. Testimonials / early partners */}
      <EarlyPartners />
      {/* 11. Logo cloud */}
      <PartnersLogoCloud />
      {/* 12. CTA section */}
      <HomeCTA />
    </div>
  );
}
