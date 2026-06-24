/*
  /products/nano — Nano product detail page.

  The residential battery system behind the Homes solutions. Dense product page:
  tagged-card hero identity, what it is, what it powers, form factor, LFP
  chemistry, GridOS, modular. Specs gated. No invented numbers.
*/

import type { MetaFunction } from "react-router";
import {
  House, Lightning, ShieldCheck, DeviceMobile, SolarPanel,
  Lightbulb, Fan, WifiHigh, Snowflake, Television, Plug,
  BatteryCharging, ArrowsClockwise,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { FONT, MONO } from "../../components/solutions/light/atoms";
import {
  TrustBar, SystemRows, OutcomeGrid, AppShowcase, FramedCTA,
  PowersGrid, SpecStrip,
} from "../../components/solutions/light/Blocks";
import {
  HowItWorks, FaqResources, Gated,
} from "../../components/solutions/light/Modules";
import {
  Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, Media,
} from "../../components/solutions/light/atoms";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";
import { Link } from "react-router";

export const meta: MetaFunction = () => [
  { title: "GridEnergy Nano — Home storage" },
  { name: "description", content: "GridEnergy Nano: silent LFP home storage for Indian homes. Backup, bill savings, and GridOS control. Modular and wall-mounted." },
];

const DOCK_LINKS: DockLink[] = [
  { id: "what", label: "System" },
  { id: "powers", label: "What it powers" },
  { id: "spec", label: "Specs" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

export default function NanoPage() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        {/* Hero — tagged-card identity */}
        <section style={{ background: tokens.pageBg, paddingTop: 80, paddingBottom: 88, borderBottom: `1px solid ${tokens.hairline}` }}>
          <Wrap>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 56, alignItems: "center" }}>
              <Rise>
                <div>
                  {/* back link */}
                  <Link
                    to="/products"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: tokens.inkMuted, textDecoration: "none" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                      <path d="M9.5 6.5H3.5M6.5 9.5l-3-3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    All products
                  </Link>

                  {/* eyebrow tag — the "tagged-card" hero identity */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 600, color: tokens.body, marginBottom: 24 }}>
                    <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
                    Residential
                  </span>

                  <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(38px,5.2vw,60px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, textWrap: "balance" }}>
                    Nano.
                  </h1>
                  <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.inkMuted, marginTop: 10 }}>Home energy storage</p>
                  <p style={{ color: tokens.muted, fontSize: 19, lineHeight: 1.55, marginTop: 20, maxWidth: 500 }}>
                    Silent, safe LFP storage for Indian homes. Backs up your essentials and your AC, cuts your bill, makes your solar worth it. Wall-mounted, managed from your phone.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
                    <Btn to="/contact">Book a site survey</Btn>
                    <Btn to="/solutions/homes" kind="secondary">See home solutions</Btn>
                  </div>

                  {/* quick chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 26 }}>
                    {["LFP chemistry", "Wall-mounted", "Modular", "GridOS included", "Solar-ready"].map((c) => (
                      <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 500, color: tokens.body }}>
                        <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />{c}
                      </span>
                    ))}
                  </div>
                </div>
              </Rise>

              {/* hero visual */}
              <Rise delay={0.1}>
                <Media caption="GridEnergy Nano — installed" ratio="4 / 4.2" radius={22} depth />
              </Rise>
            </div>
          </Wrap>
        </section>

        <TrustBar
          lead="What every Nano ships with"
          items={["LFP battery module", "Integrated inverter", "Solar-ready connections", "GridOS pre-configured"]}
        />

        {/* System deep-dive */}
        <SystemRows
          label="What it is"
          title="A complete home energy system in one sealed unit."
          intro="The Nano replaces the collection of inverter, battery bank, and genset with one silent, wall-mounted system."
          features={[
            {
              kicker: "The battery",
              title: "Safe LFP cells, built for Indian conditions.",
              body: "Lithium iron phosphate chemistry is intrinsically safer than lithium-ion: no thermal runaway, no fumes. LFP cells also outlast lead-acid by a wide margin and tolerate the temperature ranges found in Indian homes.",
              bullets: [
                "LFP chemistry, not conventional lithium-ion",
                "Sealed and maintenance-free",
                "Modular: start with base capacity, add modules later",
              ],
              visual: "Nano battery module",
            },
            {
              kicker: "The inverter",
              title: "Switches over before you notice.",
              body: "An integrated power unit handles grid-to-battery transfer seamlessly. When the grid drops, the Nano takes over. No manual intervention, no delay you would feel.",
              bullets: [
                "Seamless transfer the moment grid drops",
                "Clean, stable output for sensitive equipment",
                "Single unit: no separate inverter box",
              ],
              visual: "Integrated power unit",
            },
            {
              kicker: "Solar",
              title: "Solar-ready from the factory.",
              body: "The Nano ships with solar-ready connections. Pair it with your existing rooftop installation or add solar through our partners. GridOS manages the combined solar and storage behaviour.",
              bullets: [
                "Works with your existing solar installation",
                "Solar can be added later at any point",
                "GridOS optimises combined solar and storage",
              ],
              visual: "Solar + Nano pairing",
            },
          ]}
        />

        {/* What it powers */}
        <PowersGrid
          label="What it powers"
          title="From your Wi-Fi to your AC."
          intro="The Nano is sized at survey to your actual load. The shape of what it can run:"
          items={[
            { icon: Lightbulb, label: "Lights" },
            { icon: Fan, label: "Fans" },
            { icon: WifiHigh, label: "Wi-Fi and devices" },
            { icon: Snowflake, label: "Air conditioning" },
            { icon: Television, label: "TV and entertainment" },
            { icon: Plug, label: "Phone and laptop charging" },
            { icon: BatteryCharging, label: "Fridge and essentials" },
            { icon: ArrowsClockwise, label: "Whole-home loads" },
          ]}
          note={
            <Gated note="add real runtime examples once sizing model is verified (e.g. 'fridge + fans + Wi-Fi for approximately 8 hours')">
              Runtime examples (e.g. essentials for approximately 8 hours): confirmed at survey
            </Gated>
          }
        />

        {/* Spec strip — gated */}
        <SpecStrip
          label="Specifications"
          title="The datasheet, once it is verified."
          product="GridEnergy Nano"
          specs={[
            { label: "Usable capacity", value: <Gated note="confirm Nano usable kWh per module and max stack">—</Gated> },
            { label: "Continuous output", value: <Gated note="confirm rated kW">—</Gated> },
            { label: "Peak / surge output", value: <Gated note="confirm surge kW for motor and AC startup">—</Gated> },
            { label: "Transfer time", value: <Gated note="confirm grid-to-battery switchover time">—</Gated> },
            { label: "Chemistry", value: <Gated note="confirm cell spec and supplier">—</Gated> },
            { label: "Cycle life", value: <Gated note="confirm rated cycle count">—</Gated> },
            { label: "Warranty", value: <Gated note="confirm warranty years and cycle guarantee">—</Gated> },
            { label: "Form factor", value: "Wall-mounted" },
            { label: "Phase support", value: <Gated note="confirm single-phase and three-phase options">—</Gated> },
            { label: "Certifications", value: <Gated note="confirm BIS and IEC certifications">—</Gated> },
          ]}
        />

        {/* Modular */}
        <Band tone="deep" id="modular">
          <Wrap>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 56, alignItems: "center" }}>
              <Rise>
                <div>
                  <div style={{ marginBottom: 16 }}><Eyebrow>Modular</Eyebrow></div>
                  <H2 max={460}>Start with what you need. Add as you grow.</H2>
                  <div style={{ marginTop: 16 }}>
                    <Lead>Begin with essential-load backup and expand capacity later. Add modules, add solar, add loads. The system scales with your home and your budget.</Lead>
                  </div>
                  <ul style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 13, listStyle: "none", padding: 0 }}>
                    {[
                      "Add battery modules to grow capacity, no new inverter required",
                      "Pair or expand solar at any point in the system's life",
                      "One GridOS account through every change",
                    ].map((b) => (
                      <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                        <span aria-hidden style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 20, height: 20, borderRadius: 999, background: tokens.brandSoft, marginTop: 1 }}>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                            <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke={tokens.brand} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>
              <Rise delay={0.08}>
                <Media caption="Modular stack — add capacity" ratio="4 / 3.2" radius={20} depth />
              </Rise>
            </div>
          </Wrap>
        </Band>

        {/* Outcomes */}
        <OutcomeGrid
          label="Outcomes"
          title="What actually changes."
          intro="Not a spec sheet. The things that are different about living with a Nano."
          items={[
            { icon: Lightning, title: "Backup that includes your AC", body: "Whole-home or essentials-only, including air conditioning, with seamless handover when the grid drops." },
            { icon: ShieldCheck, title: "Silent and safe", body: "LFP chemistry, sealed, no genset fumes, no noise. No maintenance schedule." },
            { icon: DeviceMobile, title: "From your phone", body: "Live state of charge, scheduled charging, outage alerts, and savings. GridOS on every Nano." },
            { icon: SolarPanel, title: "Solar worth having", body: "Store your solar output and use it after dark. Stop exporting cheap and buying back dear." },
            { icon: ArrowsClockwise, title: "Modular growth", body: "Start with the capacity you need now. Add modules as your load or budget grows." },
            { icon: House, title: "Built for India", body: "Sized for Indian loads, tariffs, and climate. LFP cells that tolerate heat. GridOS that understands your tariff slab." },
          ]}
        />

        <HowItWorks
          eyebrow="How buying works"
          title="From enquiry to your app, in three steps."
          media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess your load, roof, and backup requirements at your home, no obligation." },
            { t: "Custom proposal", b: "A sized system, the real runtime and economics, and a clear quote built around your tariff." },
            { t: "Pro install and app", b: "Authorised installation and commissioning, then GridOS set up on your phone." },
          ]}
        />

        {/* GridOS */}
        <AppShowcase
          label="GridOS"
          title="The software that turns hardware into savings."
          intro="A battery is hardware. GridOS is the live platform that makes it pay. It comes standard with every Nano."
          visual="GridOS home app"
          features={[
            "Live state of charge, grid input, and solar output",
            "Tariff-aware scheduling: charge at cheap hours, hold reserve for cuts",
            "Backup reserve protected automatically, never drawn down inadvertently",
            "Outage notifications and health alerts to your phone",
            "Savings dashboard showing what the system has actually saved",
          ]}
        />

        <FaqResources
          eyebrow="Questions"
          title="The honest answers."
          lead="What people ask before they buy."
          faqs={[
            { q: "How is the Nano different from my existing inverter?", a: "It replaces both the inverter and its battery bank with one sealed LFP system. You get seamless transfer instead of a delayed switchover, a longer-lived and safer battery, no maintenance, and full control from your phone via GridOS. Lead-acid banks need replacement every three to five years; LFP cells last far longer." },
            { q: "Will it run my air conditioning?", a: "From essentials up to whole-home including ACs, depending on the size selected. We confirm exactly what your system runs, and for how long, at the site survey based on your actual load." },
            { q: "Do I need solar to use a Nano?", a: "No. The Nano works as pure backup and tariff-arbitrage storage on its own. If you have solar it makes the system significantly more valuable; if not, solar can be added later through our partners." },
            { q: "What is the warranty?", a: <Gated note="add verified warranty years and cycle guarantee for Nano">Warranty terms: TBD, confirmed at proposal stage</Gated> },
            { q: "What maintenance does it need?", a: "Effectively none. The system is sealed. GridOS monitors battery health remotely and flags any issues. No water top-ups, no genset servicing, no annual call-out." },
            { q: "Can I add more capacity later?", a: "Yes. The Nano is modular. You can add battery modules later without replacing the inverter or any of the control hardware." },
            { q: "What happens if the grid comes back mid-discharge?", a: "GridOS detects grid restoration and switches back automatically. It then resumes the scheduled charging programme based on your tariff, refilling the battery at the cheapest available hours." },
          ]}
          resources={[
            { kind: "Guide", title: "How home battery storage actually works", body: "Backup, bill savings, and solar: what a storage system does, in plain language.", to: "/support" },
            { kind: "Explainer", title: "LFP vs lead-acid: why chemistry matters", body: "Why LFP is the safer, longer-lived battery type, and what that means for your home.", to: "/support" },
            { kind: "Checklist", title: "What to ask before you buy storage", body: "The questions that separate a real backup system from a repackaged inverter.", to: "/support" },
          ]}
        />

        <FramedCTA
          title="See a Nano sized for your home."
          sub="Book a free site survey. We confirm capacity, runtime, and the real economics. No obligation."
          primary={{ label: "Book a site survey", to: "/contact" }}
          secondary={{ label: "Explore the range", to: "/products" }}
        />
      </main>

      <SolutionDock
        label="Nano"
        links={DOCK_LINKS}
        secondary={{ label: "All products", to: "/products" }}
        primary={{ label: "Get a quote", to: "/contact" }}
      />
    </div>
  );
}
