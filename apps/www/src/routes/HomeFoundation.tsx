import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  Lightning,
  ArrowRight,
  Cube,
  PlugsConnected,
  ShieldCheck,
  CurrencyInr,
  type Icon,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import {
  Section,
  SectionHeading,
  CardGrid,
  FeatureCard,
  FeatureRow,
  CTASection,
  Container,
  Kicker,
  Gated,
  Reveal,
  MediaSlot,
} from "../components/marketing/Primitives";
import { CobeGlobe } from "../components/marketing/CobeGlobe";
import { StoryFlow } from "../components/marketing/StoryFlow";
import { PlatformAudiences } from "../components/marketing/PlatformAudiences";

export const meta: MetaFunction = () => [
  { title: "GridEnergy — Energy storage & management for India" },
  { name: "description", content: "GridEnergy builds storage hardware and the GridOS software that runs it — for homes, businesses, and infrastructure across India." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomeFoundation() {
  const reduce = useReducedMotion() ?? false;

  // Transform-only entrance: content is never hidden by opacity, so it stays
  // visible even if the animation frame loop is throttled (background tab).
  const intro = (i: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { y: 14 }, animate: { y: 0 }, transition: { duration: 0.6, ease: EASE, delay: 0.08 + i * 0.07 } };

  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, color: tokens.body }}>
      {/* Hero — copy on top, one gigantic interactive globe rising from the
          bottom (lower ~40% clipped by the fold). Distinct olive-wash bg so
          it reads as its own section. */}
      <section style={{ position: "relative", height: "100svh", minHeight: 640, overflow: "hidden", background: `linear-gradient(180deg, ${tokens.pageBgDeep} 0%, ${tokens.pageBg} 58%)`, borderBottom: `1px solid ${tokens.hairline}` }}>
        {/* Soft brand glow behind the globe's upper dome. */}
        <div aria-hidden style={{ position: "absolute", bottom: "-6%", left: "50%", width: "78vw", height: "78vw", maxWidth: 900, maxHeight: 900, transform: "translateX(-50%)", background: `radial-gradient(circle at center, ${tokens.brand}12 0%, transparent 60%)`, pointerEvents: "none" }} />

        {/* Giant globe — bottom-anchored and pushed down 40% of its own height,
            so exactly 60% shows and 40% is clipped, independent of its size or
            the viewport. Width drives the size; the 60/40 stays fixed. */}
        <div
          className="ge-hero-globe"
          aria-hidden
          style={{ position: "absolute", left: "50%", bottom: 0, transform: "translate(-50%, 53%)", width: "clamp(1000px, 104vw, 1500px)", aspectRatio: "1", zIndex: 1 }}
        >
          <CobeGlobe />
        </div>

        {/* Copy — stacked at the top, above the globe. */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 820, margin: "0 auto", padding: "clamp(28px, 4.5vh, 56px) 24px 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <motion.h1 {...intro(0)} style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(32px,4.6vw,54px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, maxWidth: "17ch", textWrap: "balance" }}>
            Power, stored and controlled.
          </motion.h1>

          <motion.p {...intro(1)} style={{ color: tokens.body, fontSize: "clamp(15px,1.7vw,18px)", lineHeight: 1.5, marginTop: 14, maxWidth: "62ch" }}>
            Storage hardware and the GridOS platform that runs it — built for India.
          </motion.p>

          <motion.div {...intro(2)} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 20 }}>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.brand, color: "#fff", fontSize: 15, fontWeight: 600, padding: "15px 28px", borderRadius: 14, textDecoration: "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}>
              <Lightning size={16} weight="fill" /> Get a quote
            </Link>
            <Link to="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.card, color: tokens.ink, fontSize: 15, fontWeight: 600, padding: "15px 24px", borderRadius: 14, textDecoration: "none", border: `1px solid ${tokens.hairlineStrong}` }}>
              View GridOS <ArrowRight size={14} weight="bold" />
            </Link>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .ge-hero-globe { width: 140vw !important; }
          }
        `}</style>
      </section>

      {/* Problem — scroll-scrubbed wire story (StoryFlow engine + harness) */}
      <StoryFlow />

      {/* Audiences — six segments, each with its four solution spokes */}
      <PlatformAudiences />

      {/* Products */}
      <Section>
        <SectionHeading kicker="The range" title="Nano to Giga." intro="Four storage families on one platform — homes, commercial, industrial, and utility scale." />
        <CardGrid cols={4}>
          <FeatureCard icon={Cube} title="Nano" body="Homes & small sites." to="/products/nano" />
          <FeatureCard icon={Cube} title="Micro" body="Offices & small commercial." to="/products" />
          <FeatureCard icon={Cube} title="Mega" body="Industrial & campuses." to="/products" />
          <FeatureCard icon={Cube} title="Giga" body="Utility & infrastructure." to="/products" />
        </CardGrid>
      </Section>

      {/* GridOS */}
      <Section alt>
        <FeatureRow
          kicker="Platform · GridOS"
          title="The software that makes storage pay."
          body="GridOS turns every GridEnergy system into a managed asset — live monitoring, tariff-aware scheduling, backup reserve, alerts, and savings reports. On every product, from Nano to Giga."
          bullets={["Real-time monitoring on any device", "Tariff-aware charge/discharge", "Open protocols — no lock-in"]}
          cta={{ label: "Explore GridOS", to: "/platform" }}
          media={<MediaSlot label="GridOS dashboard" />}
        />
      </Section>

      {/* Economics — gated */}
      <Section>
        <SectionHeading kicker="The economics" title="Storage that pays for itself." intro="We size to your tariff and load and show real numbers — never generic ones. Figures populate as the models are verified." />
        <div className="sm:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          {[
            { label: "Typical payback", note: "publish only after payback model is calculated + sourced" },
            { label: "Demand-charge reduction", note: "verify commercial peak-shaving savings" },
            { label: "Diesel offset", note: "verify diesel-replacement economics" },
          ].map((m) => (
            <Reveal key={m.label}>
              <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: tokens.ink }}><Gated note={m.note}>—</Gated></div>
                <p style={{ color: tokens.muted, fontSize: 13.5, marginTop: 12, fontWeight: 500 }}>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Install / survey flow */}
      <Section alt>
        <SectionHeading kicker="How it works" title="From enquiry to commissioned, with GridOS from day one." />
        <div className="sm:grid-cols-4" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          {[
            { t: "Free site survey", b: "We assess your load, tariff, and backup needs." },
            { t: "Custom proposal", b: "A sized system and the real economics." },
            { t: "Pro install", b: "Authorised install and commissioning." },
            { t: "GridOS onboarding", b: "Monitor and control from day one." },
          ].map((s, i) => (
            <Reveal key={s.t}>
              <div style={{ height: "100%", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 14, padding: 20 }}>
                <span style={{ width: 28, height: 28, borderRadius: 999, background: tokens.ink, color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
                <p style={{ color: tokens.ink, fontSize: 15, fontWeight: 600, marginTop: 14 }}>{s.t}</p>
                <p style={{ color: tokens.muted, fontSize: 13, lineHeight: 1.5, marginTop: 5 }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Partner solar + trust strip */}
      <Section>
        <Container>
          <div className="sm:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
            <Trust icon={PlugsConnected} title="Works with your solar" body="Pair storage with existing solar, or add solar through partners." />
            <Trust icon={ShieldCheck} title="LFP & open" body="Safe LFP chemistry, open protocols, no vendor lock-in." />
            <Trust icon={CurrencyInr} title="Honest economics" body="Real numbers sized to your site — never generic payback math." />
          </div>
        </Container>
      </Section>

      <CTASection
        title="See what storage does for your site."
        subtitle="Book a free survey — homes, business, or infrastructure."
        secondary={{ label: "Explore the range", to: "/products" }}
      />
    </div>
  );
}

function Trust({ icon: Icon, title, body }: { icon: Icon; title: string; body: string }) {
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
