import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { ArrowRight, House, BuildingOffice, Factory, Lightning } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";
import {
  PageHero,
  Section,
  SectionHeading,
  CTASection,
  Container,
  Kicker,
  Gated,
  Reveal,
} from "../../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "Products — GridEnergy" },
  { name: "description", content: "The GridEnergy range: Nano, Micro, Mega, and Giga storage families, from homes to utility scale." },
];

const FAMILIES = [
  {
    name: "Nano",
    icon: House,
    audience: "Homes & small sites",
    band: "5–15 kWh",
    blurb: "Whole-home backup and bill savings. The silent, lifetime replacement for your inverter and genset.",
    to: "/products/nano",
    live: true,
  },
  {
    name: "Micro",
    icon: BuildingOffice,
    audience: "Offices & small commercial",
    band: "15–50 kWh",
    blurb: "UPS, peak shaving, and tariff arbitrage for offices, shops, and small commercial loads.",
    to: "/products",
    live: false,
  },
  {
    name: "Mega",
    icon: Factory,
    audience: "Industrial & campuses",
    band: "100–300 kWh",
    blurb: "Drop-in backup and demand management for factories, campuses, and larger commercial sites.",
    to: "/products",
    live: false,
  },
  {
    name: "Giga",
    icon: Lightning,
    audience: "Utility & infrastructure",
    band: "250–1000 kWh",
    blurb: "Grid-scale storage for power parks, utilities, and large infrastructure.",
    to: "/products",
    live: false,
  },
];

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        kicker="Products"
        title="One platform. Every scale."
        subtitle="Four storage families on the same LFP platform and the same GridOS software — from a single home to utility infrastructure. Pick the size; the intelligence comes standard."
        primary={{ label: "Find my system", to: "/solutions/homes" }}
        secondary={{ label: "How GridOS works", to: "/platform" }}
      />

      <Section>
        <SectionHeading kicker="The range" title="Nano to Giga." intro="Same chemistry, same console, modular throughout. Capacity ranges below are indicative and confirmed per site." />
        <div className="lg:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
          {FAMILIES.map((f) => {
            const Icon = f.icon;
            const card = (
              <div
                style={{
                  height: "100%",
                  background: tokens.card,
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 20,
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ width: 46, height: 46, borderRadius: 12, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
                    <Icon size={24} weight="duotone" color={tokens.ink} />
                  </span>
                  {f.live ? (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.brand }}>
                      Available
                    </span>
                  ) : (
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>
                      Coming soon
                    </span>
                  )}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", color: tokens.ink }}>{f.name}</h3>
                    <span style={{ fontSize: 13, color: tokens.body }}>
                      <Gated note={`confirm ${f.name} public capacity range`}>{f.band}</Gated>
                    </span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.inkMuted, marginTop: 8 }}>
                    {f.audience}
                  </p>
                </div>
                <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.55 }}>{f.blurb}</p>
                {f.live && (
                  <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: tokens.brand, fontSize: 13, fontWeight: 600 }}>
                    Explore {f.name} <ArrowRight size={13} weight="bold" />
                  </span>
                )}
              </div>
            );
            return (
              <Reveal key={f.name}>
                {f.live ? (
                  <Link to={f.to} style={{ textDecoration: "none", display: "block", height: "100%" }}>{card}</Link>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section alt>
        <Container>
          <Reveal>
            <div style={{ maxWidth: 720 }}>
              <Kicker>What's shared across the range</Kicker>
              <h2 style={{ color: tokens.ink, fontSize: "clamp(26px,3vw,38px)", fontWeight: 600, letterSpacing: "-0.025em", marginTop: 14, lineHeight: 1.1 }}>
                LFP safety, modular capacity, and GridOS — standard on every size.
              </h2>
              <ul style={{ marginTop: 22, display: "grid", gap: 12 }}>
                {[
                  "LFP chemistry — safer, longer-lived, India-climate ready",
                  "Modular: start small, add capacity as you grow",
                  "GridOS software on every unit, from Nano to Giga",
                  "Works with your existing solar, or paired through partners",
                  "Open protocols — no vendor lock-in",
                ].map((b) => (
                  <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0, marginTop: 8 }} />
                    <span style={{ color: tokens.body, fontSize: 15.5, lineHeight: 1.5 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="Not sure which size fits?"
        subtitle="Start with your home or site — we'll recommend the right family and capacity."
        primary={{ label: "Find my system", to: "/solutions/homes" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </main>
  );
}
