import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Lightning,
  ArrowRight,
  House,
  BuildingOffice,
  GraduationCap,
  Network,
  Bed,
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

export const meta: MetaFunction = () => [
  { title: "GridEnergy — Energy storage & management for India" },
  { name: "description", content: "GridEnergy builds storage hardware and the GridOS software that runs it — for homes, businesses, and infrastructure across India." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const EASE = [0.22, 1, 0.36, 1] as const;

const AUDIENCES: { icon: Icon; name: string; sub: string; to: string }[] = [
  { icon: House, name: "Homes", sub: "Backup, savings, and silence for your home.", to: "/solutions/homes" },
  { icon: BuildingOffice, name: "Offices & Industrial", sub: "UPS, peak shaving, diesel offset.", to: "/solutions/offices-industrial" },
  { icon: GraduationCap, name: "Institutes", sub: "Reliable power for schools and campuses.", to: "/solutions/institutes" },
  { icon: Network, name: "Enterprises", sub: "Load-critical storage, multi-site.", to: "/solutions/enterprises" },
  { icon: Bed, name: "Hospitality", sub: "Round-the-clock backup for properties.", to: "/solutions/hospitality" },
];

const PROBLEMS = [
  { title: "The storage gap", body: "India generates and even over-builds power, but can't store it. Solar floods the day; the grid strains at night. Storage is the missing layer." },
  { title: "No real control", body: "Most buyers get a black-box battery and a phone number. No data, no scheduling, no proof it's working." },
  { title: "Vendor lock-in", body: "Closed systems trap you with one supplier. We build on open protocols so you're never hostage to us." },
];

export default function HomeFoundation() {
  const reduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const intro = (i: number) =>
    reduce
      ? { initial: false as const }
      : { initial: { opacity: 0, y: 16 }, animate: mounted ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.7, ease: EASE, delay: 0.12 + i * 0.08 } };

  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, color: tokens.body }}>
      {/* Hero — corporate, infra-first */}
      <section style={{ position: "relative", minHeight: "92vh", overflow: "hidden", background: tokens.ink }}>
        <div aria-hidden style={{ position: "absolute", inset: 0 }}>
          <img src="/images/solutions/homes-large.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 50%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.3) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, minHeight: "92vh", display: "flex", alignItems: "center" }}>
          <Container>
            <div style={{ maxWidth: 760 }}>
              <motion.div {...intro(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, boxShadow: `0 0 12px ${tokens.brand}` }} />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Energy storage & management
                </span>
              </motion.div>
              <motion.h1 {...intro(1)} style={{ color: "#fff", fontSize: "clamp(40px,6.5vw,78px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.98, maxWidth: "16ch", textWrap: "balance" }}>
                Store your power. Run it on software.
              </motion.h1>
              <motion.p {...intro(2)} style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(17px,2vw,21px)", lineHeight: 1.5, marginTop: 22, maxWidth: "46ch" }}>
                GridEnergy builds the storage hardware and the GridOS platform that runs it — for homes, businesses, and infrastructure across India. LFP, modular, open, India-built.
              </motion.p>
              <motion.div {...intro(3)} style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
                <Link to="/solutions/homes" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.brand, color: "#fff", fontSize: 15, fontWeight: 600, padding: "15px 28px", borderRadius: 14, textDecoration: "none" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}>
                  <Lightning size={16} weight="fill" /> Explore Homes
                </Link>
                <Link to="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 15, fontWeight: 600, padding: "15px 24px", borderRadius: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.28)" }}>
                  View GridOS <ArrowRight size={14} weight="bold" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </div>
      </section>

      {/* Problem */}
      <Section>
        <SectionHeading kicker="Why storage, why now" title="Power isn't the problem. Storing and controlling it is." intro="India's energy challenge has shifted from generation to storage, control, and independence. That's the layer GridEnergy builds." />
        <CardGrid cols={3}>
          {PROBLEMS.map((p) => (
            <FeatureCard key={p.title} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* Audiences */}
      <Section alt>
        <SectionHeading kicker="Who it's for" title="One platform, every kind of site." intro="From a single home to utility infrastructure — the same storage platform and the same GridOS software." />
        <div className="sm:grid-cols-2 lg:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
          {AUDIENCES.map((a) => (
            <FeatureCard key={a.name} icon={a.icon} title={a.name} body={a.sub} to={a.to} />
          ))}
        </div>
      </Section>

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
