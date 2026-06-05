import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  BatteryChargingVertical,
  Lightning,
  ShieldCheck,
  SpeakerSimpleX,
  CurrencyInr,
  DeviceMobile,
  Leaf,
  Plugs,
  ArrowRight,
  House,
  type Icon,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import {
  Section,
  SectionHeading,
  FeatureRow,
  CardGrid,
  FeatureCard,
  CTASection,
  Container,
  Kicker,
  Gated,
  Reveal,
  MediaSlot,
} from "../../components/marketing/Primitives";
import HomesHero from "../../components/solutions/homes-v2/HomesHero";
import HomesConfigurator from "../../components/solutions/homes-v2/HomesConfigurator";
import StickyActionBar from "../../components/solutions/homes-v2/StickyActionBar";

export const meta: MetaFunction = () => [
  { title: "Home energy storage — GridEnergy" },
  { name: "description", content: "Silent, lifetime home storage that backs up your whole home, cuts your bill, and makes your solar worth it. Managed by GridOS." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

const HOME_TYPES = [
  { name: "Apartment / flat", sub: "Compact storage for essential-load backup.", image: "/images/solutions/homes-apartment.png", to: "/solutions/homes/apartment" },
  { name: "Small home", sub: "Whole-home essentials and a couple of ACs.", image: "/images/solutions/homes-small.png", to: "/contact" },
  { name: "Large home / villa", sub: "Whole-villa backup, often 3-phase.", image: "/images/solutions/homes-large.png", to: "/contact" },
  { name: "Solar + storage", sub: "Bank your solar, run on it after dark.", image: "/images/solutions/homes-solar.png", to: "/contact" },
];

const PROBLEMS = [
  "Power cuts that leave you in the dark and kill the ACs.",
  "An old inverter and lead-acid battery that dies every few years.",
  "A diesel genset that's loud, smelly, and expensive to run.",
  "Rising tariffs — and rooftop solar that exports cheap by day, then buys back dear at night.",
];

const OUTCOMES: { icon: Icon; title: string; body: string }[] = [
  { icon: BatteryChargingVertical, title: "Backup that runs your home", body: "Whole-home or essentials — including your ACs — with seamless switchover when the grid drops." },
  { icon: CurrencyInr, title: "Lower bills", body: "Store cheap or solar power and use it at peak-tariff hours." },
  { icon: SpeakerSimpleX, title: "Silence", body: "No genset, no fumes, no noise. It just works." },
  { icon: DeviceMobile, title: "Smart", body: "Monitor and control everything from your phone via GridOS." },
  { icon: ShieldCheck, title: "Safe", body: "LFP chemistry — the safer, longer-lived battery type." },
  { icon: Leaf, title: "Independence", body: "Less grid, less diesel, more control over your own power." },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: "How is this better than my inverter?", a: "It replaces both your inverter and its battery with one silent, sealed LFP system, adds seamless switchover, and is managed from your phone. It's designed to outlast the lead-acid batteries you replace every few years." },
  { q: "Will it run my AC?", a: "Depending on the size you choose and your load, yes — from essentials up to whole-home including ACs. We confirm exactly what your system runs, and for how long, at the site survey." },
  { q: "Do I need solar?", a: "No. It works as pure backup and bill-savings storage on its own. If you have solar it makes it far more valuable; if you don't, you can add it later through our partners." },
  { q: "What's the warranty?", a: <>Covered by a limited warranty on the system. <Gated note="add real warranty years + cycles">Exact years and cycle terms — TBD</Gated>. See the <Link to="/warranty" style={{ color: tokens.brand, fontWeight: 600 }}>warranty page</Link>.</> },
  { q: "How long does install take, and what does it cost?", a: <>A site survey comes first, then a professional install. <Gated note="add install timeline + pricing once defined">Timeline and pricing — TBD, confirmed in your proposal.</Gated></> },
  { q: "What about maintenance?", a: "The hardware is sealed and designed to be effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no battery top-ups." },
  { q: "What if a cut lasts longer than my battery?", a: "You set a backup reserve, and a solar-paired system recharges during the day to extend through long outages. We size your system around your typical and worst-case cuts." },
  { q: "What if you go out of business?", a: "GridOS is built on open standards and your data exports in standard formats — any competent installer can service the hardware. We've designed deliberately against lock-in." },
];

export default function SolutionsHomes() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, color: tokens.body }}>
      <StickyActionBar />
      <main>
        {/* 1 — Hero */}
        <HomesHero />

        {/* 2 — Solutions overview: home-type grid */}
        <Section id="range">
          <SectionHeading
            kicker="Which one is me?"
            title="Storage sized to your home."
            intro="Pick the home that looks like yours. Each is powered by the right GridEnergy product and the same GridOS software."
          />
          <div className="sm:grid-cols-2 lg:grid-cols-4" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
            {HOME_TYPES.map((h) => (
              <Reveal key={h.name}>
                <Link to={h.to} style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: tokens.pageBgDeep }}>
                      <img src={h.image} alt={h.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h3 style={{ color: tokens.ink, fontSize: 16, fontWeight: 600 }}>{h.name}</h3>
                        <ArrowRight size={14} weight="bold" color={tokens.brand} />
                      </div>
                      <p style={{ color: tokens.muted, fontSize: 13.5, lineHeight: 1.5, marginTop: 6 }}>{h.sub}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 3 — What it actually is */}
        <Section id="how" alt>
          <SectionHeading
            kicker="What it actually is"
            title="A battery, an inverter, solar-ready — run by software."
            intro="One sealed system replaces the box of parts in your utility room. Here's what's inside, in plain language."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
            <FeatureRow
              kicker="The battery"
              title="Stores power for when you need it."
              body="Safe, long-life LFP cells store cheap, off-peak, or solar power and release it during cuts and expensive hours."
              bullets={["LFP chemistry — safe and long-lived", "Modular — add capacity later", "Sealed and maintenance-free"]}
              media={<MediaSlot label="LFP battery module" />}
            />
            <FeatureRow
              reverse
              kicker="The inverter"
              title="Switches over before you notice."
              body="An integrated inverter delivers clean power and hands over from grid to battery seamlessly when the supply drops."
              bullets={["Seamless switchover on an outage", "Clean, stable output", "One unit — no separate inverter"]}
              media={<MediaSlot label="Integrated power unit" />}
            />
            <FeatureRow
              kicker="GridOS"
              title="The brain that makes it pay."
              body="GridOS decides when to charge, when to discharge, and how much to hold in reserve — and shows you everything from your phone."
              bullets={["Tariff-aware scheduling", "Backup reserve protection", "Live monitoring and alerts"]}
              cta={{ label: "How GridOS works", to: "/platform" }}
              media={<MediaSlot label="GridOS app" />}
            />
          </div>
        </Section>

        {/* 4 — The problem it kills (woven) */}
        <Section>
          <Container>
            <div className="md:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }}>
              <Reveal>
                <div>
                  <Kicker>The problem it kills</Kicker>
                  <h2 style={{ color: tokens.ink, fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 600, letterSpacing: "-0.03em", marginTop: 14, lineHeight: 1.08, maxWidth: "15ch" }}>
                    You already live the problem.
                  </h2>
                  <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 420 }}>
                    GridEnergy isn't "a battery." It's the silent, lifetime replacement for your inverter and genset — that finally makes your solar worth it.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <ul style={{ display: "grid", gap: 12 }}>
                  {PROBLEMS.map((p) => (
                    <li key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 12, padding: "15px 16px" }}>
                      <span style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* 5 — Outcomes bento */}
        <Section id="outcomes" alt>
          <SectionHeading kicker="Outcomes" title="What you actually get." align="left" />
          <div className="sm:grid-cols-2 lg:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
            {OUTCOMES.map((o) => {
              const Icon = o.icon;
              return (
                <Reveal key={o.title}>
                  <div style={{ height: "100%", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, padding: 24 }}>
                    <span style={{ width: 42, height: 42, borderRadius: 11, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
                      <Icon size={21} weight="duotone" color={tokens.ink} />
                    </span>
                    <h3 style={{ color: tokens.ink, fontSize: 17, fontWeight: 600, marginTop: 16, letterSpacing: "-0.01em" }}>{o.title}</h3>
                    <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 7 }}>{o.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* 6 — Product detail (Nano) */}
        <Section>
          <FeatureRow
            kicker="The product · Nano"
            title="Meet the home battery: GridEnergy Nano."
            body="Nano is our home storage family — silent, modular LFP storage with the inverter and GridOS built in. Start with essentials, grow to whole-home, add solar any time."
            bullets={["Wall- or floor-mounted, sealed unit", "Modular — add capacity as you need it", "Inverter + GridOS included"]}
            cta={{ label: "Explore Nano", to: "/products/nano" }}
            media={<MediaSlot label="GridEnergy Nano" />}
          />
        </Section>

        {/* 7 — GridOS */}
        <Section id="gridos" alt>
          <SectionHeading
            kicker="GridOS"
            title="The smart layer most installers don't give you."
            intro="A battery is hardware. GridOS is the software that turns it into savings — and keeps you in control."
          />
          <CardGrid cols={4}>
            <FeatureCard icon={Lightning} title="Live monitoring" body="State of charge, grid, and solar — in real time." />
            <FeatureCard icon={BatteryChargingVertical} title="Backup reserve" body="Hold charge back for outages, automatically." />
            <FeatureCard icon={CurrencyInr} title="Tariff scheduling" body="Charge cheap, discharge dear — hands-off." />
            <FeatureCard icon={DeviceMobile} title="Alerts & reports" body="Outage alerts and savings, on your phone." />
          </CardGrid>
          <div style={{ marginTop: 28 }}>
            <Link to="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: tokens.brand, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
              See everything GridOS does <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </Section>

        {/* 8 — Solar fit */}
        <Section>
          <FeatureRow
            reverse
            kicker="Solar fit"
            title="Already have solar? It just got worth it."
            body="Stop exporting your solar cheap by day and buying it back expensive at night. Store it, and run your home on it after sundown. No solar yet? We add it through trusted partners."
            bullets={["Works with your existing solar", "Solar + storage through partners", "We don't push panels you don't need"]}
            cta={{ label: "Find a solar partner", to: "/partners" }}
            media={<MediaSlot label="Solar + storage flow" />}
          />
        </Section>

        {/* 9 — The money (gated) */}
        <Section id="money" alt>
          <SectionHeading
            kicker="The economics"
            title="The honest numbers — once they're yours."
            intro="We won't quote you a generic payback. We size to your tariff and load and show real figures at survey. Subsidies, where you qualify, come on top."
          />
          <div className="sm:grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
            {[
              { label: "Typical payback", note: "compute payback model per home profile before publishing" },
              { label: "Lifetime savings", note: "compute lifetime savings model" },
              { label: "Subsidy support", note: "cite PM Surya Ghar / state scheme + eligibility once confirmed" },
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

        {/* 10 — Trust / proof */}
        <Section>
          <SectionHeading kicker="Trust & proof" title="Backed by warranty, certs, and real installs." />
          <CardGrid cols={3}>
            <FeatureCard icon={ShieldCheck} title="Warranty" body={<>Limited warranty on the system. <Gated note="add warranty years + cycles">terms TBD</Gated></>} to="/warranty" />
            <FeatureCard icon={Plugs} title="Certified & safe" body={<>Built to standards. <Gated note="add BIS/IEC certifications">certs TBD</Gated></>} />
            <FeatureCard icon={House} title="Real installs" body={<>Homes already running on GridEnergy. <Gated note="add install count + a case study">count + case study TBD</Gated></>} />
          </CardGrid>
        </Section>

        {/* 11 — Buying experience */}
        <Section id="buying" alt>
          <SectionHeading kicker="How buying works" title="From enquiry to your app, in five steps." />
          <div className="sm:grid-cols-5" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {[
              { t: "Enquire", b: "Tell us about your home and goals." },
              { t: "Free site survey", b: "We assess your load, roof, and backup needs." },
              { t: "Custom proposal", b: "A sized system, the economics, a clear quote." },
              { t: "Pro install", b: "Authorised install and commissioning." },
              { t: "App onboarding", b: "GridOS set up — you're in control." },
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

        {/* 12 — FAQ */}
        <Section id="faq">
          <SectionHeading kicker="Questions" title="The objections, answered honestly." maxWidth={640} />
          <div style={{ maxWidth: 820 }}>
            {FAQS.map((f) => (
              <Reveal key={f.q}>
                <details style={{ borderBottom: `1px solid ${tokens.hairline}` }}>
                  <summary style={{ cursor: "pointer", listStyle: "none", padding: "20px 0", fontSize: 16.5, fontWeight: 600, color: tokens.ink, display: "flex", justifyContent: "space-between", gap: 16 }}>
                    {f.q}
                    <span style={{ color: tokens.brand, flexShrink: 0 }}>+</span>
                  </summary>
                  <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.65, paddingBottom: 20, maxWidth: "62ch" }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* 13 — Convert: configurator */}
        <Section id="configurator" alt>
          <SectionHeading kicker="Find your system" title="Customize for your home." intro="Pick your home type to see the recommended system. Final numbers are confirmed at your free survey." />
          <HomesConfigurator />
        </Section>

        <CTASection
          title="Ready to never sit in the dark again?"
          subtitle="Book a free site survey — no obligation, no call to qualify."
          secondary={{ label: "Explore the range", to: "/products" }}
        />
      </main>
    </div>
  );
}
