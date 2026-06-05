import type { MetaFunction } from "react-router";
import {
  Television,
  Fan,
  WifiHigh,
  Snowflake,
  Lightbulb,
  Cube,
  PlugsConnected,
  ShieldCheck,
  Lightning,
} from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";
import {
  PageHero,
  Section,
  SectionHeading,
  FeatureRow,
  CardGrid,
  FeatureCard,
  CTASection,
  MediaSlot,
  Container,
  Kicker,
  Gated,
  Reveal,
} from "../../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "GridEnergy Nano — Home storage" },
  { name: "description", content: "GridEnergy Nano: silent, modular LFP storage for Indian homes. Backup, savings, and GridOS standard." },
];

const POWERS = [
  { icon: Lightbulb, label: "Lights & fans" },
  { icon: WifiHigh, label: "Wi-Fi & devices" },
  { icon: Television, label: "TV & entertainment" },
  { icon: Snowflake, label: "Air conditioning" },
  { icon: Fan, label: "Whole-home essentials" },
];

const BOX = [
  { icon: Cube, title: "Nano battery module(s)", body: "LFP storage, wall- or floor-mounted. Add modules to scale capacity." },
  { icon: Lightning, title: "Integrated power unit", body: "Inverter and controller in one — seamless switchover on an outage." },
  { icon: PlugsConnected, title: "Solar-ready connections", body: "Pairs with your existing solar, or solar added through partners." },
  { icon: ShieldCheck, title: "GridOS, pre-configured", body: "Monitoring, scheduling, and alerts active from day one." },
];

const SPECS: { label: string; note: string }[] = [
  { label: "Usable capacity", note: "confirm Nano usable kWh per module + max stack" },
  { label: "Continuous output", note: "confirm rated kW" },
  { label: "Peak / surge output", note: "confirm surge kW for motor/AC startup" },
  { label: "Chemistry", note: "confirm cell spec" },
  { label: "Cycle life / warranty", note: "confirm cycles + warranty years" },
  { label: "Switchover time", note: "confirm transfer time" },
  { label: "Phases", note: "confirm single / 3-phase options" },
  { label: "Certifications", note: "confirm BIS/IEC certs" },
];

export default function NanoPage() {
  return (
    <main>
      <PageHero
        kicker="Products · Nano"
        title="The home battery that finally makes sense."
        subtitle="GridEnergy Nano is silent, safe LFP storage for Indian homes — backup that runs your essentials (and your AC), lower bills, and GridOS in your pocket. Modular, so it grows with you."
        primary={{ label: "Get a quote", to: "/contact" }}
        secondary={{ label: "Find my size", to: "/solutions/homes" }}
      />

      <Section py={0}>
        <Reveal>
          <div style={{ marginTop: -8 }}>
            <MediaSlot label="GridEnergy Nano — installed at home" ratio="16 / 9" />
          </div>
        </Reveal>
      </Section>

      {/* What it powers */}
      <Section>
        <SectionHeading
          kicker="What it powers"
          title="From your Wi-Fi to your AC."
          intro="Exactly what a Nano runs, and for how long, depends on its size and your load — we confirm it at survey. The shape of it:"
        />
        <div className="sm:grid-cols-5" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {POWERS.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.label}>
                <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
                  <Icon size={26} weight="duotone" color={tokens.ink} />
                  <p style={{ fontSize: 13, color: tokens.body, marginTop: 10, fontWeight: 500 }}>{p.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p style={{ marginTop: 20, fontSize: 13 }}>
          <Gated note="add real run-time examples once sizing model is set, e.g. 'fridge + fans + Wi-Fi for ~8 hrs'">
            Run-time examples (e.g. "essentials for ~8 hours") — TBD until sizing model is verified
          </Gated>
        </p>
      </Section>

      {/* What's in the box */}
      <Section alt>
        <SectionHeading kicker="What's in the system" title="A complete home energy system, not just a battery." />
        <CardGrid cols={2}>
          {BOX.map((b) => (
            <FeatureCard key={b.title} icon={b.icon} title={b.title} body={b.body} />
          ))}
        </CardGrid>
      </Section>

      {/* Modular */}
      <Section>
        <FeatureRow
          kicker="Modular"
          title="Start with what you need. Add as you grow."
          body="Begin with essential-load backup and expand capacity later — add modules, add solar, add loads. The same system scales with your home and your budget."
          bullets={["Add battery modules to grow capacity", "Pair or expand solar any time", "One GridOS account through every change"]}
          media={<MediaSlot label="Modular stack" />}
        />
      </Section>

      {/* Specs — gated */}
      <Section alt>
        <Container>
          <SectionHeading kicker="Specifications" title="The datasheet, once it's verified." intro="We won't print a spec we haven't confirmed. These populate from the verified Nano datasheet." />
          <Reveal>
            <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, overflow: "hidden" }}>
              {SPECS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 20px",
                    borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: tokens.ink }}>{s.label}</span>
                  <span style={{ fontSize: 13 }}>
                    <Gated note={s.note}>—</Gated>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="See a Nano sized for your home."
        subtitle="Book a free survey — we'll confirm capacity, runtime, and the economics for your load."
        primary={{ label: "Get a quote", to: "/contact" }}
        secondary={{ label: "Explore the range", to: "/products" }}
      />
    </main>
  );
}
