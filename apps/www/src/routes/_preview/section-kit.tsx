/*
  /preview/section-kit — the living catalogue of the solution-page section kit.

  Internal design tool (not in public nav). Scroll the whole library, or jump via
  the index. Every block below renders with SAMPLE content for layout only — the
  numbers, logos, and quotes here are placeholders, never shippable copy.

  Assemble a real page by importing the same blocks from `components/solutions/kit`
  and feeding them real (or <Gated>) content.
*/

import type { MetaFunction } from "react-router";
import {
  House,
  Lightning,
  SunHorizon,
  BatteryCharging,
  DeviceMobile,
  ShieldCheck,
  Lightbulb,
  WifiHigh,
  Television,
  Snowflake,
  Plug,
  ChartLine,
  Bell,
  GridFour,
} from "@phosphor-icons/react";
import { tokens } from "./_v3-tokens";
import {
  HeroCinematic,
  HeroSplit,
  HeroCentered,
  LogoCloud,
  BentoGrid,
  InlineStatement,
  UseCaseSwitcher,
  WhatItPowers,
  SpecTable,
  StepFlow,
  StatStrip,
  QuoteBand,
  ComparisonTable,
  Faq,
  AppShowcase,
  FramedCTA,
  BigStatement,
  GalleryStrip,
  AltFeatures,
} from "../../components/solutions/kit";

export const meta: MetaFunction = () => [
  { title: "Section kit — GridEnergy (internal)" },
  { name: "robots", content: "noindex" },
];

const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

const HOME_IMG = "/images/solutions/homes-large.png";

type Entry = { id: string; name: string; ref: string; node: React.ReactNode };

const HEROES: Entry[] = [
  {
    id: "hero-cinematic",
    name: "HeroCinematic",
    ref: "Rivian · Tesla — full-viewport image stage, rotating imagery",
    node: (
      <HeroCinematic
        eyebrow="GridEnergy for Homes"
        title="The last inverter your home will ever need."
        subtitle="Silent, safe home storage that backs up your whole home and finally makes your solar worth it."
        chips={["Silent, no genset", "Runs your ACs", "Works with your solar", "Lifetime LFP"]}
        primary={{ label: "Book a free site survey", to: "/contact", icon: Lightning }}
        secondary={{ label: "Explore the range", to: "/products" }}
        images={[HOME_IMG, "/images/solutions/homes-small.png", "/images/solutions/homes-solar.png"]}
        scrollCueHref="#hero-split"
      />
    ),
  },
  {
    id: "hero-split",
    name: "HeroSplit",
    ref: "Stripe — copy left, product/UI media right, on the blueprint grid",
    node: (
      <HeroSplit
        eyebrow="GridOS Platform"
        title="One app for every watt in the building."
        subtitle="See production, storage, and load in real time. Set rules once and let GridOS run the building."
        primary={{ label: "Book a free site survey", to: "/contact" }}
        secondary={{ label: "Talk to the team", to: "/contact" }}
      />
    ),
  },
  {
    id: "hero-centered",
    name: "HeroCentered",
    ref: "Vercel · Linear — centered statement over the engineering grid",
    node: (
      <HeroCentered
        eyebrow="GridEnergy"
        title="Power you own. Bills you control."
        subtitle="Modular energy storage for homes and businesses, run by one platform."
        primary={{ label: "Find your system", to: "/contact" }}
        secondary={{ label: "How it works", to: "/platform" }}
      />
    ),
  },
];

const SECTIONS: Entry[] = [
  {
    id: "logo-cloud",
    name: "LogoCloud",
    ref: "Stripe · EcoFlow — trust strip",
    node: <LogoCloud label="Installed across Goa" items={["Verna", "Dona Paula", "Porvorim", "Caranzalem", "Assagao", "Miramar"]} />,
  },
  {
    id: "bento",
    name: "BentoGrid",
    ref: "Linear /features — mixed-size cards (span 2 = spotlight)",
    node: (
      <BentoGrid
        kicker="The system"
        title="Everything works as one."
        intro="Battery, solar, and grid managed by a single platform, not a drawer of disconnected boxes."
        items={[
          { span: 2, label: "Storage", title: "Whole-home backup that switches over before you notice", body: "LFP storage sized to your load, with seamless changeover when the grid drops." },
          { label: "Solar", title: "Make your panels finally pay off", body: "Store the midday surplus instead of exporting it for pennies." },
          { label: "GridOS", title: "Run it from your phone", body: "Live state, alerts, and savings in one app." },
        ]}
      />
    ),
  },
  {
    id: "inline-statement",
    name: "InlineStatement",
    ref: "Vercel — big sentence with embedded chips",
    node: (
      <InlineStatement
        parts={[
          "Back up your",
          { chip: "whole home", icon: House },
          "run it on",
          { chip: "your solar", icon: SunHorizon },
          "and control everything from",
          { chip: "one app", icon: DeviceMobile },
        ]}
      />
    ),
  },
  {
    id: "use-case",
    name: "UseCaseSwitcher",
    ref: "EcoFlow · Linear — chip-driven content swap (interactive)",
    node: (
      <UseCaseSwitcher
        kicker="By home type"
        title="Sized for how you actually live."
        cases={[
          { key: "flat", label: "Apartment", title: "Compact backup for a flat", body: "A wall-mounted Nano keeps your essentials running through a cut. Silent, with no genset on the balcony.", bullets: ["Wall-mounted, no plant room", "Silent and fume-free", "Runs from your phone"] },
          { key: "villa", label: "Large home", title: "Whole-home backup for a villa", body: "Cover every circuit, including the ACs, and stack capacity as your load grows.", bullets: ["Whole-home changeover", "Scales with your load", "Pairs with rooftop solar"] },
          { key: "solar", label: "Solar home", title: "Make your existing solar pay", body: "Store your daytime surplus instead of exporting it cheap, and draw it down after dark.", bullets: ["Self-consumption first", "Works with most inverters", "Outage-ready"] },
        ]}
      />
    ),
  },
  {
    id: "what-powers",
    name: "WhatItPowers",
    ref: "energy genre — appliance/outcome tiles",
    node: (
      <WhatItPowers
        title="Your essentials, through the cut."
        intro="Exactly what runs and for how long depends on the size you pick, confirmed at survey."
        items={[
          { icon: Lightbulb, label: "Lights & fans" },
          { icon: WifiHigh, label: "Wi-Fi" },
          { icon: Television, label: "TV" },
          { icon: Snowflake, label: "A room AC" },
          { icon: Plug, label: "Fridge" },
          { icon: DeviceMobile, label: "Devices" },
        ]}
        note='Run-time example (e.g. "essentials for ~X hours"): TBD'
      />
    ),
  },
  {
    id: "spec-table",
    name: "SpecTable",
    ref: "Apple · EcoFlow — labelled rows, gated-aware",
    node: (
      <SpecTable
        kicker="GridEnergy Nano"
        title="The spec, when it's confirmed."
        rows={[
          { label: "Chemistry", value: "LFP" },
          { label: "Mounting", value: "Wall-mounted" },
          { label: "Usable capacity", gatedNote: "confirm Nano usable kWh" },
          { label: "Continuous output", gatedNote: "confirm rated output" },
          { label: "Switchover time", gatedNote: "confirm changeover spec" },
          { label: "Warranty", gatedNote: "confirm years + cycles" },
        ]}
      />
    ),
  },
  {
    id: "step-flow",
    name: "StepFlow",
    ref: "ordered process — numbering is earned (a real sequence)",
    node: (
      <StepFlow
        title="From enquiry to energised."
        steps={[
          { title: "Site survey", body: "We assess your load, roof, and backup needs. Free, no obligation." },
          { title: "Proposal", body: "A sized system with the economics laid out clearly." },
          { title: "Install", body: "Authorised install and commissioning, usually in a day." },
          { title: "Onboarding", body: "GridOS app setup and a walkthrough of your new system." },
        ]}
      />
    ),
  },
  {
    id: "stat-strip",
    name: "StatStrip",
    ref: "restrained metric row (anti hero-metric) — gated until sourced",
    node: (
      <StatStrip
        stats={[
          { gatedNote: "confirm install count", label: "Homes and businesses energised across Goa" },
          { gatedNote: "compute typical payback", label: "Typical payback once the savings model is built" },
          { value: "LFP", label: "Safe, long-life chemistry in every unit" },
        ]}
      />
    ),
  },
  {
    id: "quote",
    name: "QuoteBand",
    ref: "Stripe (OpenAI card) — dark testimonial",
    node: (
      <QuoteBand
        quote="The power cuts used to mean the genset and the noise. Now nothing happens, the house just keeps running."
        author="Placeholder: real customer TBD"
        role="Homeowner, Goa"
        logo="GridEnergy"
      />
    ),
  },
  {
    id: "comparison",
    name: "ComparisonTable",
    ref: "positioning — us vs the alternative",
    node: (
      <ComparisonTable
        kicker="Why storage, not a genset"
        title="The honest comparison."
        columns={["GridEnergy", "Diesel genset"]}
        rows={[
          { label: "Silent operation", a: true, b: false },
          { label: "No fumes", a: true, b: false },
          { label: "Instant changeover", a: true, b: false },
          { label: "Cuts your bill", a: true, b: false },
          { label: "Pairs with solar", a: true, b: false },
          { label: "Fuel cost forever", a: "None", b: "Ongoing" },
        ]}
      />
    ),
  },
  {
    id: "faq",
    name: "Faq",
    ref: "accordion (interactive)",
    node: (
      <Faq
        items={[
          { q: "Will it run my air conditioners?", a: "Depends on the size you pick and how many at once. We confirm exactly what runs at the site survey." },
          { q: "Does it work with my existing solar?", a: "In most cases, yes, through partners. We check your inverter at survey." },
          { q: "How long does install take?", a: "Usually a day for a home, after the survey and proposal are signed off." },
          { q: "What's the warranty?", a: "Covered. Exact years and cycles confirmed on your proposal." },
        ]}
      />
    ),
  },
  {
    id: "app-showcase",
    name: "AppShowcase",
    ref: "EcoFlow · energy genre — phone + app features",
    node: (
      <AppShowcase
        title="Your whole system, in your pocket."
        body="GridOS shows live state, sends outage alerts, and tracks what you're saving, with no dashboards to learn."
        features={[
          { icon: ChartLine, label: "Live production, storage, and load" },
          { icon: Bell, label: "Outage and fault alerts" },
          { icon: BatteryCharging, label: "Charge and reserve control" },
          { icon: ShieldCheck, label: "Secure, role-based access" },
        ]}
      />
    ),
  },
  {
    id: "gallery",
    name: "GalleryStrip",
    ref: "automotive/energy — horizontal photo rail",
    node: (
      <GalleryStrip
        kicker="In the field"
        title="Installed and running."
        images={[
          { src: "/images/solutions/homes-large.png", caption: "Placeholder: real install photo TBD" },
          { src: "/images/solutions/homes-small.png", caption: "Placeholder: real install photo TBD" },
          { src: "/images/solutions/homes-solar.png", caption: "Placeholder: real install photo TBD" },
        ]}
      />
    ),
  },
  {
    id: "alt-features",
    name: "AltFeatures",
    ref: "Stripe — auto-alternating feature rows",
    node: (
      <AltFeatures
        kicker="What you get"
        title="Three things that change the day-to-day."
        rows={[
          { kicker: "Backup", title: "The lights just stay on", body: "Seamless changeover means a cut becomes a non-event. No flicker, no genset, no fuss.", bullets: ["Whole-home or essential-load", "Switches over in milliseconds"], cta: { label: "See home backup", to: "/solutions/homes" } },
          { kicker: "Savings", title: "Your bill goes down, on purpose", body: "Store cheap or solar energy and use it when power costs the most.", bullets: ["Self-consumption first", "Time-shift your load"] },
        ]}
      />
    ),
  },
  {
    id: "big-statement",
    name: "BigStatement",
    ref: "Linear — oversized closing line",
    node: <BigStatement line="Stop renting your power. Start owning it." primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />,
  },
  {
    id: "framed-cta",
    name: "FramedCTA",
    ref: "Vercel — blueprint-framed closing block",
    node: <FramedCTA title="See a system sized for your place." body="Book a free survey. We confirm the capacity, runtime, and economics for your site." primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Talk to the team", to: "/contact" }} />,
  },
];

function Label({ entry }: { entry: Entry }) {
  return (
    <div id={entry.id} style={{ scrollMarginTop: 0, background: tokens.ink, borderTop: `1px solid ${tokens.hairlineStrong}`, padding: "14px 32px", position: "sticky", top: 0, zIndex: 30 }}>
      <div style={{ maxWidth: 1280, marginInline: "auto", display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
        <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{entry.name}</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>{entry.ref}</span>
      </div>
    </div>
  );
}

export default function SectionKit() {
  const all = [...HEROES, ...SECTIONS];
  return (
    <main style={{ fontFamily: FONT, background: tokens.pageBg }}>
      {/* Header + index */}
      <header style={{ background: tokens.ink, color: "#fff", padding: "56px 32px 40px" }}>
        <div style={{ maxWidth: 1280, marginInline: "auto" }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.brand }}>Internal · section kit</span>
          <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 14, maxWidth: 720 }}>
            Pick a hero, stack the sections, build a solution page.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 620 }}>
            {HEROES.length} hero variants and {SECTIONS.length} body blocks, all in the V3 design system. Import from{" "}
            <code style={{ fontFamily: MONO, fontSize: 14, color: "#fff" }}>components/solutions/kit</code>. Everything below is sample content for layout only; numbers, logos, and quotes are placeholders.
          </p>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
            {all.map((e) => (
              <a key={e.id} href={`#${e.id}`} style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.8)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "6px 12px" }}>
                {e.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {all.map((entry) => (
        <section key={entry.id}>
          <Label entry={entry} />
          {entry.node}
        </section>
      ))}

      <footer style={{ background: tokens.pageBgDeep, borderTop: `1px solid ${tokens.hairline}`, padding: "40px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: MONO, fontSize: 12, color: tokens.muted }}>
          {HEROES.length} heroes · {SECTIONS.length} sections · components/solutions/kit
        </p>
      </footer>
    </main>
  );
}
