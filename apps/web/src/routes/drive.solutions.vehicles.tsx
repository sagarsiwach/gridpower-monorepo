import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Button,
  SectionLabel,
  SectionHeader,
  SectionDivider,
  FeatureCard,
  SpecTable,
  Breadcrumb,
  CTASection,
  DotGrid,
  ImgPlaceholder,
  ProcessSteps,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "OEM powertrain integration — GridDrive | GridPower" },
  {
    name: "description",
    content:
      "Complete powertrain platforms for OEMs. 2W, 3W, 4W. Full specs published. Launch Q2 2026.",
  },
  { property: "og:title", content: "OEM powertrain integration — GridDrive | GridPower" },
  {
    property: "og:description",
    content:
      "Complete powertrain platforms for OEMs. 2W, 3W, 4W. Full specs published. Launch Q2 2026.",
  },
  { property: "og:url", content: "/drive/solutions/vehicles" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

// ─── Per-vehicle-class data ───────────────────────────────────────────────────

const platforms = {
  "2W": {
    headline: "2-Wheeler platform",
    sub: "Hub motors, 48–72V battery systems, and complete BMS for urban EVs and delivery bikes.",
    pains: [
      {
        title: "Component fragmentation",
        sub: "Sourcing motor, controller, BMS, and pack from different vendors.",
      },
      {
        title: "Spec opacity",
        sub: "Vendors unwilling to share full technical specs for integration.",
      },
    ],
    solutions: [
      {
        title: "Complete 2W platform",
        sub: "Motor + controller + BMS + pack as integrated system.",
      },
      {
        title: "Open specs, no NDA",
        sub: "Full technical documentation published. Call when you need support.",
      },
    ],
    diagramLabel: "Hub motor (BLDC) → motor controller → BMS → 48V/72V LFP pack → vehicle load",
    specs: [
      { label: "Motor type", value: "Hub motor (BLDC)" },
      { label: "Power range", value: "250 W – 1,500 W" },
      { label: "Voltage", value: "48V / 72V" },
      { label: "Pack capacity", value: "1.5 kWh – 3.5 kWh" },
      { label: "IP rating", value: "IP67 (motor + pack)" },
      { label: "Regen braking", value: "Yes" },
    ],
    benefits: [
      {
        label: "INTEGRATION",
        title: "Motor + controller + BMS in one platform",
        description:
          "One SKU, one supplier, one integration. No mis-matched specs across vendors.",
      },
      {
        label: "DOCUMENTATION",
        title: "Full specs, no NDA required",
        description:
          "CAD models, BMS API, CAN protocol, wiring diagrams — all delivered before contract signing.",
      },
      {
        label: "RELIABILITY",
        title: "IP67 motor and pack",
        description:
          "Rated for monsoon conditions and dust-heavy delivery environments.",
      },
    ],
  },
  "3W": {
    headline: "3-Wheeler platform",
    sub: "Mid-drive systems and rugged battery packs for e-rickshaws and cargo three-wheelers.",
    pains: [
      {
        title: "E-rickshaw quality gap",
        sub: "Market flooded with unreliable drivetrains. High field failure rates.",
      },
      {
        title: "Cargo load requirements",
        sub: "Standard packs not rated for continuous high-load cargo duty cycles.",
      },
    ],
    solutions: [
      {
        title: "Cargo-rated mid-drive",
        sub: "3 kW continuous, 6 kW peak. Designed for heavy-load cycles.",
      },
      {
        title: "Ruggedised pack",
        sub: "96V system with active thermal management for Indian conditions.",
      },
    ],
    diagramLabel: "Mid-drive BLDC motor → controller → BMS → 96V LFP pack with active cooling → 3W drivetrain",
    specs: [
      { label: "Motor type", value: "Mid-drive (BLDC)" },
      { label: "Continuous power", value: "3 kW" },
      { label: "Peak power", value: "6 kW" },
      { label: "Voltage", value: "96V" },
      { label: "Pack capacity", value: "5–10 kWh" },
      { label: "Thermal management", value: "Active air cooling" },
    ],
    benefits: [
      {
        label: "DURABILITY",
        title: "Rated for cargo duty cycles",
        description:
          "3 kW continuous, 6 kW peak — designed for fully loaded cargo three-wheelers on Indian roads.",
      },
      {
        label: "THERMAL",
        title: "Active cooling for Indian summers",
        description:
          "Active air-cooled pack keeps cells within thermal limits in 45°C ambient. No capacity derating.",
      },
      {
        label: "SERVICEABILITY",
        title: "Modular cell design",
        description:
          "Individual cell replacement in the field. Reduces total lifecycle cost for high-utilisation fleets.",
      },
    ],
  },
  "4W": {
    headline: "4-Wheeler platform",
    sub: "Full passenger EV powertrain for OEMs. 400V architecture, thermal management, BMS software.",
    pains: [
      {
        title: "Platform sourcing risk",
        sub: "Dependence on single imported platform creates supply chain risk.",
      },
      {
        title: "BMS opacity",
        sub: "Black-box BMS prevents OEM optimisation and serviceability.",
      },
    ],
    solutions: [
      {
        title: "400V complete platform",
        sub: "Motor + inverter + BMS + pack in vehicle-ready configuration.",
      },
      {
        title: "Open BMS software",
        sub: "Full API access. OEM can tune, monitor, and extend.",
      },
    ],
    diagramLabel: "PMSM motor → 400V inverter → open-API BMS → LFP pack (30–60 kWh) → AC 11kW + DC 50kW charging",
    specs: [
      { label: "Architecture", value: "400V DC" },
      { label: "Motor type", value: "PMSM (permanent magnet)" },
      { label: "Power range", value: "60 kW – 150 kW" },
      { label: "Pack capacity", value: "30 kWh – 60 kWh" },
      { label: "Charging", value: "AC 11 kW + DC 50 kW" },
      { label: "BMS communication", value: "CAN, REST API" },
    ],
    benefits: [
      {
        label: "ARCHITECTURE",
        title: "400V platform, production-grade",
        description:
          "Motor + inverter + thermal management + BMS delivered as a tested, vehicle-ready assembly.",
      },
      {
        label: "OPEN BMS",
        title: "Full API access for OEMs",
        description:
          "CAN and REST API for BMS state, cell-level telemetry, thermal data, and charging control. No black box.",
      },
      {
        label: "SOURCING",
        title: "Reduce single-vendor dependency",
        description:
          "GridDrive is a domestic alternative to fully imported platforms. Dual-source your supply chain.",
      },
    ],
  },
};

type PlatformKey = keyof typeof platforms;

// ─── Page component ───────────────────────────────────────────────────────────

export default function DriveVehiclesSolutionPage() {
  return (
    <div className="bg-background text-foreground">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-sand-12">
        <DotGrid color="rgba(58,57,55,0.5)" />
        <div className="absolute inset-0 bg-dark-2 flex items-center justify-center">
          <span className="font-mono text-[10px] text-dark-8 uppercase tracking-widest">
            EV vehicle render · 2W / 3W / 4W · FULL-BLEED IMAGE
          </span>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "GridDrive", href: "/drive" },
                { label: "Solutions", href: "/drive" },
                { label: "OEM powertrain integration" },
              ]}
            />
          </div>

          <SectionLabel variant="neutral">GRIDDRIVE · PLATFORMS</SectionLabel>

          <h1 className="font-heading text-display font-semibold text-white tracking-tight leading-[1.05] mb-5 max-w-2xl">
            Electrify any vehicle.
          </h1>

          <p className="font-body text-body-lg text-white/75 max-w-lg leading-relaxed mb-8">
            Complete powertrain platforms for OEMs. 2W, 3W, 4W. Full specs published.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/contact">Get a quote</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
              <Link to="/drive">Explore GridDrive</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TABBED PLATFORM SECTIONS ─────────────────────────────────────────── */}
      <Tabs defaultValue="2W">
        {/* Sticky tab bar */}
        <div className="sticky top-14 z-40 bg-sand-1 border-b border-border">
          <div className="mx-auto max-w-7xl px-6">
            <TabsList>
              {(["2W", "3W", "4W"] as PlatformKey[]).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {key} Platform
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {(["2W", "3W", "4W"] as PlatformKey[]).map((key) => {
          const p = platforms[key];
          return (
            <TabsContent key={key} value={key}>
              {/* Sub-headline */}
              <section className="bg-sand-1 py-16 border-b border-border">
                <div className="mx-auto max-w-7xl px-6">
                  <SectionLabel>{`GRIDDRIVE · ${key}`}</SectionLabel>
                  <h2 className="font-heading text-h1 text-foreground tracking-tight mb-4">
                    {p.headline}
                  </h2>
                  <p className="font-body text-body-lg text-sand-11 max-w-2xl leading-relaxed">
                    {p.sub}
                  </p>
                </div>
              </section>

              {/* Problem / Solution */}
              <section className="bg-sand-1 py-20">
                <SectionDivider />
                <div className="mx-auto max-w-7xl px-6 pt-16">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start">
                    <div>
                      <SectionLabel>THE CHALLENGE</SectionLabel>
                      <div className="flex flex-col gap-4">
                        {p.pains.map((pain, i) => (
                          <div key={i} className="rounded-card border border-border bg-sand-2 p-5">
                            <p className="font-heading text-[15px] font-semibold text-foreground mb-1.5">
                              {pain.title}
                            </p>
                            <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                              {pain.sub}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center pt-10">
                      <span className="font-mono text-body-lg text-grid-red">→</span>
                    </div>
                    <div>
                      <SectionLabel>THE SOLUTION</SectionLabel>
                      <div className="flex flex-col gap-4">
                        {p.solutions.map((sol, i) => (
                          <div key={i} className="rounded-card border border-border border-l-[3px] border-l-grid-red bg-sand-2 p-5">
                            <p className="font-heading text-[15px] font-semibold text-foreground mb-1.5">
                              {sol.title}
                            </p>
                            <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                              {sol.sub}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Architecture diagram */}
              <section className="bg-sand-2 py-20">
                <SectionDivider />
                <div className="mx-auto max-w-7xl px-6 pt-16">
                  <SectionLabel>SYSTEM ARCHITECTURE</SectionLabel>
                  <ImgPlaceholder
                    label={p.diagramLabel}
                    aspect="16/9"
                    className="w-full"
                  />
                </div>
              </section>

              {/* Benefits */}
              <section className="bg-sand-1 py-20">
                <SectionDivider />
                <div className="mx-auto max-w-7xl px-6 pt-16">
                  <SectionHeader
                    label="WHY GRIDDRIVE"
                    heading="Built for OEM integration."
                    className="mb-10"
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {p.benefits.map((b, i) => (
                      <FeatureCard
                        key={i}
                        label={b.label}
                        title={b.title}
                        description={b.description}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* Specs */}
              <section className="bg-sand-2 py-20">
                <SectionDivider />
                <div className="mx-auto max-w-7xl px-6 pt-16">
                  <SectionLabel>KEY SPECIFICATIONS</SectionLabel>
                  <h2 className="font-heading text-h2 text-foreground mb-8">
                    Full specs. No NDA.
                  </h2>
                  <div className="max-w-xl">
                    <SpecTable rows={p.specs} />
                  </div>
                </div>
              </section>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* ── HOW IT WORKS (shared across platforms) ────────────────────────────── */}
      <section className="bg-sand-1 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionHeader
            label="HOW IT WORKS"
            heading="From selection to production supply."
            className="mb-10"
          />
          <ProcessSteps
            steps={[
              {
                title: "Platform selection",
                description: "Choose voltage class and power rating for your vehicle category.",
              },
              {
                title: "Engineering support",
                description: "Integration docs, CAD models, and BMS API delivered upfront.",
              },
              {
                title: "Test & validate",
                description: "On-site testing at Dharwad with GridPower engineers.",
              },
              {
                title: "Production supply",
                description: "Volume pricing, lead time SLAs, and field support included.",
              },
            ]}
          />
        </div>
      </section>

      {/* ── EARLY PARTNER PILOTS ───────────────────────────────────────────────── */}
      <section className="bg-sand-12 py-20 relative overflow-hidden">
        <DotGrid color="rgba(58,57,55,0.55)" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <SectionLabel variant="neutral">EARLY ADOPTERS</SectionLabel>
          <h2 className="font-heading text-h2 text-dark-12 mb-4">
            Early partner pilots Q2 2026.
          </h2>
          <p className="font-body text-body-lg text-dark-11 max-w-xl leading-relaxed mb-8">
            We are onboarding OEM pilot partners ahead of general availability.
            Pilot OEMs get priority engineering support, fixed early-adopter
            pricing, and a direct line to the product team.
          </p>
          <Button asChild>
            <Link to="/contact">Become a pilot OEM partner</Link>
          </Button>
        </div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────────────────── */}
      <CTASection
        heading="Ready to electrify your vehicle line?"
        description="Talk to us about your OEM project. We respond within one business day."
        primaryCta={
          <Button asChild size="lg">
            <Link to="/contact">Contact GridPower</Link>
          </Button>
        }
        secondaryCta={
          <Button asChild variant="ghost" size="lg" className="text-dark-12 border-dark-6 hover:bg-dark-3">
            <Link to="/contact?type=demo">Request a demo</Link>
          </Button>
        }
      />
    </div>
  );
}
