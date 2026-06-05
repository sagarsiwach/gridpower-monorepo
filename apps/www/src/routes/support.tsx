import type { MetaFunction } from "react-router";
import { Wrench, ShieldCheck, DeviceMobile, Receipt, PlugsConnected, Question } from "@phosphor-icons/react";
import { tokens } from "../routes/_preview/_v3-tokens";
import {
  PageHero,
  Section,
  SectionHeading,
  CardGrid,
  FeatureCard,
  Container,
  Kicker,
  Gated,
  Reveal,
  Button,
} from "../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "Support — GridEnergy" },
  { name: "description", content: "Get help with your GridEnergy system, GridOS app, warranty, and service." },
];

const CATEGORIES = [
  { icon: Wrench, title: "Installation & setup", body: "Site survey, install scheduling, and commissioning questions." },
  { icon: DeviceMobile, title: "GridOS app", body: "Login, monitoring, schedules, alerts, and account help." },
  { icon: ShieldCheck, title: "Warranty & claims", body: "Coverage, claims, and replacement for your system.", to: "/warranty" },
  { icon: PlugsConnected, title: "Solar & integration", body: "Pairing with existing solar and third-party equipment." },
  { icon: Receipt, title: "Billing & orders", body: "Quotes, invoices, and order status." },
  { icon: Question, title: "Something else", body: "Anything not covered above — we'll route it." },
];

export default function SupportPage() {
  return (
    <main>
      <PageHero
        kicker="Support"
        title="We're here when you need us."
        subtitle="Most issues can be diagnosed remotely through GridOS. Pick a category or reach out directly — we'll get you to the right person."
        primary={{ label: "Contact support", to: "/contact" }}
        secondary={{ label: "Read the warranty", to: "/warranty" }}
      />

      <Section>
        <SectionHeading kicker="How can we help?" title="Start with a category." />
        <CardGrid cols={3}>
          {CATEGORIES.map((c) => (
            <FeatureCard key={c.title} icon={c.icon} title={c.title} body={c.body} to={c.to ?? "/contact"} />
          ))}
        </CardGrid>
      </Section>

      <Section alt>
        <Container>
          <div className="md:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
            <Reveal>
              <div>
                <Kicker>Reach a human</Kicker>
                <h2 style={{ color: tokens.ink, fontSize: "clamp(26px,3vw,36px)", fontWeight: 600, letterSpacing: "-0.025em", marginTop: 14, lineHeight: 1.1 }}>
                  Existing customer? Have your system ID ready.
                </h2>
                <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 460 }}>
                  Share your system ID, install date, and what's happening. If it's a fault, GridOS often tells us before you do.
                </p>
                <div style={{ marginTop: 24 }}>
                  <Button to="/contact" variant="primary">Contact support</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <Row label="Support hours"><Gated note="confirm support hours">Mon–Sat, hours TBD</Gated></Row>
                <Row label="Support email"><Gated note="confirm support inbox">support@gridenergy.co.in</Gated></Row>
                <Row label="Phone / WhatsApp"><Gated note="add support number">+91 XXXXX XXXXX</Gated></Row>
                <Row label="Response target"><Gated note="define support SLA">SLA TBD</Gated></Row>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, borderBottom: `1px solid ${tokens.hairline}`, paddingBottom: 12 }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>{label}</span>
      <span style={{ fontSize: 13.5, color: tokens.body }}>{children}</span>
    </div>
  );
}
