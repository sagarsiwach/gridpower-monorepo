import type { MetaFunction } from "react-router";
import {
  ChartLineUp,
  BatteryChargingVertical,
  Clock,
  Bell,
  CurrencyInr,
  PlugsConnected,
  DeviceMobile,
  ShieldCheck,
} from "@phosphor-icons/react";
import { tokens } from "../routes/_preview/_v3-tokens";
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
  Reveal,
} from "../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "GridOS — GridEnergy" },
  { name: "description", content: "GridOS is the software layer that runs your GridEnergy system: monitoring, scheduling, savings, and alerts." },
];

const CAPABILITIES = [
  { icon: ChartLineUp, title: "Live monitoring", body: "See generation, storage, and load in real time — per asset, on any device." },
  { icon: BatteryChargingVertical, title: "Backup reserve", body: "Set how much charge to hold back for outages. GridOS protects it automatically." },
  { icon: Clock, title: "Time-of-use scheduling", body: "Charge when power is cheap, discharge when it's dear. Tariff-aware, hands-off." },
  { icon: Bell, title: "Outage & fault alerts", body: "Know about a grid event or a fault before it becomes a problem." },
  { icon: CurrencyInr, title: "Savings reports", body: "What you saved, what you stored, what you exported — in plain numbers." },
  { icon: PlugsConnected, title: "Open integrations", body: "Open protocols and standards. Works with your solar and third-party gear." },
];

export default function PlatformPage() {
  return (
    <main>
      <PageHero
        kicker="Platform · GridOS"
        title="Your energy system, run by software."
        subtitle="GridOS turns a battery into a managed asset. Monitor live, schedule around your tariff, hold backup in reserve, and see exactly what you're saving — from one console."
        primary={{ label: "Book a free site survey", to: "/contact" }}
        secondary={{ label: "See the hardware", to: "/products" }}
      />

      {/* Hero media band */}
      <Section py={0}>
        <Reveal>
          <div style={{ marginTop: -8, marginBottom: 8 }}>
            <MediaSlot label="GridOS console — live dashboard" ratio="16 / 9" />
          </div>
        </Reveal>
      </Section>

      {/* Capabilities grid */}
      <Section>
        <SectionHeading
          kicker="What GridOS does"
          title="Everything your system does, in one place."
          intro="Not a settings panel — an operator console for your home or site, built to make storage pay."
        />
        <CardGrid cols={3}>
          {CAPABILITIES.map((c) => (
            <FeatureCard key={c.title} icon={c.icon} title={c.title} body={c.body} />
          ))}
        </CardGrid>
      </Section>

      {/* Stripe-style feature rows */}
      <Section alt>
        <div style={{ display: "flex", flexDirection: "column", gap: 88 }}>
          <FeatureRow
            kicker="Monitoring"
            title="See every watt, as it moves."
            body="Solar in, battery state, grid draw, and household load — live and historical. Drill into any asset. Spot waste, prove savings."
            bullets={["Real-time and historical views", "Per-asset breakdown", "Works on phone, tablet, and web"]}
            media={<MediaSlot label="Live energy flow" />}
          />
          <FeatureRow
            reverse
            kicker="Control"
            title="Set it once. It runs itself."
            body="Choose your backup reserve and let GridOS schedule charge and discharge around your tariff and your solar — automatically, every day."
            bullets={["Backup-reserve protection", "Tariff-aware scheduling", "Manual override any time"]}
            media={<MediaSlot label="Schedule & reserve" />}
          />
          <FeatureRow
            kicker="Peace of mind"
            title="Alerts that actually flag."
            body="Outage notices, fault detection, and service reminders push to your phone — so most issues are handled before you'd ever notice them."
            bullets={["Outage and grid-event alerts", "Fault detection and diagnostics", "Remote support for your installer"]}
            media={<MediaSlot label="Alerts & health" />}
          />
        </div>
      </Section>

      {/* Trust strip */}
      <Section>
        <Container>
          <div className="sm:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
            <Trust icon={DeviceMobile} title="On every device" body="One login across web and mobile." />
            <Trust icon={PlugsConnected} title="No lock-in" body="Open protocols and standards, your data." />
            <Trust icon={ShieldCheck} title="Built to last" body="Maintained and updated over the life of your system." />
          </div>
        </Container>
      </Section>

      <CTASection
        title="Storage is the hardware. GridOS is the reason it pays."
        subtitle="Book a survey and we'll show you the console with your own numbers."
        secondary={{ label: "Explore the range", to: "/products" }}
      />
    </main>
  );
}

function Trust({ icon: Icon, title, body }: { icon: typeof DeviceMobile; title: string; body: string }) {
  return (
    <Reveal>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 11, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
          <Icon size={20} weight="duotone" color={tokens.ink} />
        </span>
        <div>
          <p style={{ color: tokens.ink, fontSize: 16, fontWeight: 600 }}>{title}</p>
          <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.5, marginTop: 3 }}>{body}</p>
        </div>
      </div>
    </Reveal>
  );
}
