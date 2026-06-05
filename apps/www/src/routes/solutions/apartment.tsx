import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Lightbulb,
  WifiHigh,
  Television,
  Snowflake,
  ArrowLeft,
  SpeakerSimpleX,
  Wall,
  ShieldCheck,
  DeviceMobile,
  type Icon,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import {
  Section,
  SectionHeading,
  CardGrid,
  FeatureCard,
  CTASection,
  Container,
  Kicker,
  Gated,
  Reveal,
  Button,
} from "../../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "Apartment storage — GridEnergy" },
  { name: "description", content: "Compact, silent home storage for flats and apartments — essential-load backup without a genset." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

const POWERS: { icon: Icon; label: string }[] = [
  { icon: Lightbulb, label: "Lights & fans" },
  { icon: WifiHigh, label: "Wi-Fi & devices" },
  { icon: Television, label: "TV" },
  { icon: Snowflake, label: "A room AC" },
];

const WHY: { icon: Icon; title: string; body: string }[] = [
  { icon: Wall, title: "Wall-mounted, compact", body: "Fits a utility wall or balcony nook — no plant room, no floor space sacrificed." },
  { icon: SpeakerSimpleX, title: "Silent, fume-free", body: "No genset on your balcony. Nothing for the neighbours or the RWA to object to." },
  { icon: ShieldCheck, title: "Safe LFP", body: "Sealed, stable LFP chemistry — the safe choice for a shared building." },
  { icon: DeviceMobile, title: "Run from your phone", body: "Check charge, get outage alerts, and see savings in the GridOS app." },
];

export default function ApartmentPage() {
  return (
    <main style={{ fontFamily: FONT, background: tokens.pageBg }}>
      {/* Hero: split image + copy */}
      <section style={{ background: tokens.pageBgDeep, borderBottom: `1px solid ${tokens.hairline}` }}>
        <Container>
          <div className="lg:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, alignItems: "center", paddingBlock: 72 }}>
            <Reveal>
              <div>
                <Link to="/solutions/homes" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: tokens.muted, fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 18 }}>
                  <ArrowLeft size={13} weight="bold" /> All home types
                </Link>
                <Kicker>Homes · Apartment</Kicker>
                <h1 style={{ fontFamily: '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif', color: tokens.ink, fontSize: "clamp(34px,5vw,56px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 16 }}>
                  Backup for your flat. Without the genset.
                </h1>
                <p style={{ color: tokens.muted, fontSize: 18, lineHeight: 1.55, marginTop: 18, maxWidth: 480 }}>
                  A compact GridEnergy Nano keeps your essentials running through a cut — silent, wall-mounted, and managed from your phone. Built for apartment living.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
                  <Button to="/contact" variant="primary" size="lg">Book a free site survey</Button>
                  <Button to="/products/nano" variant="secondary" size="lg" trailingArrow={false}>Explore Nano</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${tokens.hairline}`, aspectRatio: "4 / 3", boxShadow: "0 30px 60px -40px oklch(15.3% 0.006 107.1 / 0.5)" }}>
                <img src="/images/solutions/homes-apartment.png" alt="GridEnergy storage in an apartment" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What it powers */}
      <Section>
        <SectionHeading kicker="What it powers" title="Your essentials, through the cut." intro="Exactly what it runs and for how long depends on the size you pick and your load — confirmed at survey." />
        <div className="sm:grid-cols-4" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {POWERS.map((p) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.label}>
                <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 14, padding: "22px 16px", textAlign: "center" }}>
                  <Icon size={26} weight="duotone" color={tokens.ink} />
                  <p style={{ fontSize: 13, color: tokens.body, marginTop: 10, fontWeight: 500 }}>{p.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p style={{ marginTop: 18, fontSize: 13 }}>
          <Gated note="add apartment run-time example once sizing model is verified">
            Run-time example (e.g. "essentials for ~X hours") — TBD
          </Gated>
        </p>
      </Section>

      {/* Why it fits an apartment */}
      <Section alt>
        <SectionHeading kicker="Why it fits a flat" title="Designed for shared-wall living." />
        <CardGrid cols={2}>
          {WHY.map((w) => (
            <FeatureCard key={w.title} icon={w.icon} title={w.title} body={w.body} />
          ))}
        </CardGrid>
      </Section>

      {/* Recommended + gated specs */}
      <Section>
        <Container>
          <SectionHeading kicker="Recommended" title="GridEnergy Nano — compact configuration." intro="The right starting point for most apartments. We confirm the exact size for your home." />
          <Reveal>
            <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, overflow: "hidden", maxWidth: 640 }}>
              {[
                { label: "Recommended family", value: "GridEnergy Nano", gated: false },
                { label: "Usable capacity", note: "confirm apartment Nano usable kWh" },
                { label: "Backs up", value: "Essential-load circuit", gated: false },
                { label: "Mounting", value: "Wall-mounted", gated: false },
                { label: "Typical payback", note: "confirm payback for apartment profile" },
              ].map((r, i) => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "14px 20px", borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: tokens.ink }}>{r.label}</span>
                  <span style={{ fontSize: 13.5, color: tokens.body }}>
                    {r.gated === false ? r.value : <Gated note={r.note!}>—</Gated>}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="See a Nano sized for your apartment."
        subtitle="Book a free survey — we'll confirm capacity, runtime, and the economics for your flat."
        secondary={{ label: "Back to all homes", to: "/solutions/homes" }}
      />
    </main>
  );
}
