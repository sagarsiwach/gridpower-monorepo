import type { MetaFunction } from "react-router";
import { Lightning, Cube, Stack, ShieldCheck, MapPin, PlugsConnected } from "@phosphor-icons/react";
import { tokens } from "../routes/_preview/_v3-tokens";
import {
  PageHero,
  Section,
  SectionHeading,
  CardGrid,
  FeatureCard,
  CTASection,
  Container,
  Kicker,
  Gated,
  Reveal,
} from "../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "About — GridEnergy" },
  { name: "description", content: "GridEnergy builds energy storage and the GridOS software layer for Indian homes and businesses." },
];

const PRINCIPLES = [
  { icon: Cube, title: "Storage first", body: "LFP battery systems built for Indian conditions — heat, dust, and an unstable grid. Silent, safe, modular." },
  { icon: Lightning, title: "Software is the moat", body: "GridOS turns a battery into a managed asset: monitoring, scheduling, savings, and alerts in one console." },
  { icon: PlugsConnected, title: "Open, no lock-in", body: "Open protocols and standards. Your system, your data — not a closed vendor garden." },
  { icon: Stack, title: "One family, every scale", body: "Nano to Giga: the same platform from a single home to utility-scale, so what you learn carries up." },
  { icon: ShieldCheck, title: "Honest economics", body: "We size to your load and tariff and show the real numbers — no inflated payback math." },
  { icon: MapPin, title: "Built for India", body: "Designed, deployed, and supported here, for the way Indian homes and businesses actually use power." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        kicker="Company"
        title="The energy independence layer for India."
        subtitle="GridEnergy builds storage hardware and the GridOS software that runs it — so homes and businesses can store power, cut their bills, and stop depending on diesel and an unreliable grid."
        primary={{ label: "Book a free site survey", to: "/contact" }}
        secondary={{ label: "Explore the range", to: "/products" }}
      />

      {/* What we do */}
      <Section>
        <SectionHeading
          kicker="What we do"
          title="Hardware, software, and the install in between."
          intro="GridEnergy is a standalone energy storage and energy-management company. We make the battery systems, the platform that manages them, and we handle the survey, install, and commissioning."
        />
        <CardGrid cols={3}>
          <FeatureCard icon={Cube} title="Storage hardware" body="Nano, Micro, Mega, and Giga battery families. LFP chemistry, modular, scalable from a home to a power park." to="/products" />
          <FeatureCard icon={Lightning} title="GridOS platform" body="The software layer: live monitoring, backup control, time-of-use scheduling, fault alerts, and savings reports." to="/platform" />
          <FeatureCard icon={PlugsConnected} title="Install & solar fit" body="Site survey, professional install, commissioning. Works with your existing solar, or paired through partners." to="/partners" />
        </CardGrid>
      </Section>

      {/* Principles */}
      <Section alt>
        <SectionHeading kicker="How we think" title="Six things we hold to." align="left" />
        <CardGrid cols={3}>
          {PRINCIPLES.map((p) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* By the numbers — gated */}
      <Section>
        <SectionHeading kicker="By the numbers" title="The proof, once it's earned." intro="We won't publish a number we can't stand behind. These fill in as they're verified." />
        <div className="sm:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
          {[
            { label: "Systems installed", note: "add verified install count" },
            { label: "Cities served", note: "add serviceable city list" },
            { label: "Storage deployed", note: "add total kWh deployed" },
          ].map((s) => (
            <Reveal key={s.label}>
              <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: tokens.ink, letterSpacing: "-0.02em" }}>
                  <Gated note={s.note}>—</Gated>
                </div>
                <p style={{ color: tokens.muted, fontSize: 13, marginTop: 10, fontWeight: 500 }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Entity */}
      <Section alt py={64}>
        <Container>
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <Kicker>The company</Kicker>
                <p style={{ color: tokens.ink, fontSize: 18, fontWeight: 600, marginTop: 12, maxWidth: 620, lineHeight: 1.5 }}>
                  GridEnergy is a brand of <strong>DeltaEV Mobility Private Limited</strong>, based in Verna, Goa.
                </p>
                <p style={{ color: tokens.muted, fontSize: 14, marginTop: 8 }}>
                  <Gated note="add founding story / leadership / registration details if desired">
                    Company story, leadership, and registration details — TBD
                  </Gated>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="Want to see what a sized system looks like for you?"
        subtitle="Book a free survey — we'll assess your load and show the economics."
        secondary={{ label: "How GridOS works", to: "/platform" }}
      />
    </main>
  );
}
