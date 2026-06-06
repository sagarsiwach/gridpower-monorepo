/*
  /about — GridEnergy company page.

  Who GridEnergy is: an energy-storage brand by DeltaEV Mobility Private Limited.
  Mission, what they make, why LFP + GridOS, the values they hold.

  Pattern: homes.tsx token / inline-style vocabulary. No Tailwind utilities for
  visuals. Numbers via <Gated>. "GridPower" must not appear.
*/

import type { MetaFunction } from "react-router";
import {
  Cube,
  Lightning,
  PlugsConnected,
  Stack,
  ShieldCheck,
  MapPin,
  SunHorizon,
  ChartLineUp,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { FONT, MONO, Band, Wrap, Rise, Eyebrow, H2, Lead, Btn } from "../components/solutions/light/atoms";
import {
  TrustBar,
  SystemRows,
  OutcomeGrid,
  FramedCTA,
} from "../components/solutions/light/Blocks";
import { StatBand, FaqResources, Gated } from "../components/solutions/light/Modules";

export const meta: MetaFunction = () => [
  { title: "About — GridEnergy" },
  {
    name: "description",
    content:
      "GridEnergy is an energy-storage brand by DeltaEV Mobility Private Limited. Silent, long-life LFP systems and the GridOS platform for Indian homes and businesses.",
  },
];

/* ── values / principles ── */
const PRINCIPLES = [
  {
    icon: Cube,
    title: "Storage first",
    body: "LFP battery systems built for Indian conditions — heat, dust, and an unstable grid. Silent, safe, and modular from the start.",
  },
  {
    icon: Lightning,
    title: "Software is the moat",
    body: "GridOS turns a battery into a managed asset: live monitoring, tariff-aware scheduling, savings reports, and fault alerts in one console.",
  },
  {
    icon: PlugsConnected,
    title: "Open, no lock-in",
    body: "Open protocols and published standards. Your system, your data — not a closed vendor garden that strands you at renewal.",
  },
  {
    icon: Stack,
    title: "One platform, every scale",
    body: "Nano to Giga: the same GridOS platform from a single home to a commercial block, so what you learn and build on carries up.",
  },
  {
    icon: ShieldCheck,
    title: "Honest economics",
    body: "We size to your actual load and tariff and show real payback numbers — no inflated claims, no hidden assumptions.",
  },
  {
    icon: MapPin,
    title: "Built for India",
    body: "Designed, deployed, and supported here, for the way Indian homes and businesses actually live with their power.",
  },
];

/* ── what we make ── */
const WHAT_WE_MAKE = [
  {
    kicker: "The battery",
    title: "LFP storage for every scale.",
    body: "Nano, Micro, Mega, and Giga — four families built on the same safe, long-life LFP chemistry. Modular so you can start small and add capacity as your load or budget grows.",
    bullets: [
      "LFP chemistry: safer, longer-lived than lead-acid",
      "Modular and scalable from 5 kWh upward",
      "Sealed and maintenance-free",
    ],
    visual: "GridEnergy battery family",
  },
  {
    kicker: "GridOS",
    title: "The software that makes it pay.",
    body: "A battery without software is just a box. GridOS decides when to charge, when to discharge, and how much to hold in reserve — and shows you everything from your phone, in real time.",
    bullets: [
      "Tariff-aware charge and discharge scheduling",
      "Backup reserve held automatically",
      "Live state of charge, fault alerts, and savings reports",
    ],
    visual: "GridOS app interface",
  },
  {
    kicker: "Install and commissioning",
    title: "Survey, install, and go live.",
    body: "Authorised partner networks handle site survey, professional install, and GridOS commissioning. Works with your existing solar, or paired through our solar partners.",
    bullets: [
      "Free site survey with real load and tariff analysis",
      "Authorised install, not a DIY grey-market product",
      "GridOS commissioned and live before the team leaves",
    ],
    visual: "Install commissioning",
  },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>

        {/* ── Hero ── */}
        <section
          id="about"
          style={{
            background: tokens.pageBg,
            paddingTop: 92,
            paddingBottom: 96,
            borderBottom: `1px solid ${tokens.hairline}`,
          }}
        >
          <Wrap>
            <Rise>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: tokens.card,
                  border: `1px solid ${tokens.hairline}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: tokens.body,
                  marginBottom: 24,
                }}
              >
                <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
                Company
              </span>
            </Rise>
            <Rise delay={0.04}>
              <h1
                style={{
                  fontFamily: FONT,
                  color: tokens.ink,
                  fontSize: "clamp(40px, 5.4vw, 64px)",
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.02,
                  maxWidth: "18ch",
                  textWrap: "balance",
                }}
              >
                The energy independence layer for India.
              </h1>
            </Rise>
            <Rise delay={0.08}>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 19,
                  lineHeight: 1.6,
                  marginTop: 22,
                  maxWidth: 560,
                }}
              >
                GridEnergy builds LFP storage systems and the GridOS software platform that runs them — so homes and businesses can store power, cut their bills, and stop depending on diesel and an unreliable grid.
              </p>
            </Rise>
            <Rise delay={0.12}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                <Btn to="/contact">Book a free site survey</Btn>
                <Btn to="/products" kind="secondary">Explore the range</Btn>
              </div>
            </Rise>
          </Wrap>
        </section>

        {/* ── Trust bar ── */}
        <TrustBar
          lead="Storage hardware and the GridOS platform, together"
          items={[
            "Safe LFP chemistry",
            "Sealed, maintenance-free",
            "GridOS app control",
            "No vendor lock-in",
            "Authorised install network",
          ]}
        />

        {/* ── Mission band ── */}
        <Band tone="base" py={88} id="mission">
          <Wrap>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                gap: 56,
                alignItems: "center",
              }}
            >
              <Rise>
                <div>
                  <Eyebrow>Mission</Eyebrow>
                  <h2
                    style={{
                      fontFamily: FONT,
                      color: tokens.ink,
                      fontSize: "clamp(28px, 3.6vw, 42px)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.06,
                      marginTop: 16,
                      maxWidth: 520,
                      textWrap: "balance",
                    }}
                  >
                    Silent storage that backs up power, cuts bills, and makes solar worth it.
                  </h2>
                </div>
              </Rise>
              <Rise delay={0.06}>
                <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                  <p style={{ color: tokens.muted, fontSize: 16.5, lineHeight: 1.65 }}>
                    India's grid is unreliable. Diesel gensets are loud, polluting, and expensive to run. Lead-acid inverters degrade in two years and tell you nothing. Solar is wasted — exported cheap by day, bought back dear at night.
                  </p>
                  <p style={{ color: tokens.muted, fontSize: 16.5, lineHeight: 1.65 }}>
                    GridEnergy exists to fix that. A long-life LFP battery, a modern inverter, and GridOS — the software layer that decides when to charge, when to discharge, and how to protect your backup — in one sealed system, run from your phone.
                  </p>
                </div>
              </Rise>
            </div>
          </Wrap>
        </Band>

        {/* ── What we make ── */}
        <SystemRows
          label="What we make"
          title="Hardware, software, and the install in between."
          intro="GridEnergy is a standalone energy storage and energy-management company. We make the battery systems, the platform that manages them, and we handle the survey, install, and commissioning."
          features={WHAT_WE_MAKE}
        />

        {/* ── Principles ── */}
        <OutcomeGrid
          label="How we think"
          title="Six things we hold to."
          items={PRINCIPLES}
        />

        {/* ── By the numbers — all gated ── */}
        <StatBand
          title="The proof, once it is earned."
          lead="We will not publish a number we cannot stand behind. These fill in as they are verified, not before."
          stats={[
            {
              value: <Gated note="add verified install count">—</Gated>,
              label: "Systems installed",
            },
            {
              value: <Gated note="add verified city list">—</Gated>,
              label: "Cities served",
            },
            {
              value: <Gated note="add total kWh deployed">—</Gated>,
              label: "Storage deployed",
            },
          ]}
        />

        {/* ── Why LFP + GridOS ── */}
        <Band tone="deep" py={96} id="why-lfp">
          <Wrap>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: 18,
              }}
            >
              {/* LFP chemistry card */}
              <Rise>
                <div
                  style={{
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 20,
                    padding: 32,
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: tokens.pageBgDeep,
                      border: `1px solid ${tokens.hairline}`,
                      marginBottom: 20,
                    }}
                  >
                    <ShieldCheck size={24} weight="duotone" color={tokens.ink} />
                  </span>
                  <h3
                    style={{
                      fontFamily: FONT,
                      color: tokens.ink,
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    Why LFP chemistry
                  </h3>
                  <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.65, marginTop: 12 }}>
                    Lithium Iron Phosphate does not overheat, does not catch fire at the temperatures inside an Indian utility room, and holds its capacity through far more charge cycles than lead-acid or older lithium variants. It costs more upfront; it costs far less over a decade.
                  </p>
                  <ul style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "Thermally stable — safe in hot, enclosed spaces",
                      "Long cycle life — thousands of full charge cycles",
                      "No memory degradation, no watering required",
                    ].map((b) => (
                      <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span
                          aria-hidden
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: tokens.brand,
                            flexShrink: 0,
                            marginTop: 8,
                          }}
                        />
                        <span style={{ color: tokens.body, fontSize: 14.5, lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>

              {/* GridOS card */}
              <Rise delay={0.05}>
                <div
                  style={{
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 20,
                    padding: 32,
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: tokens.pageBgDeep,
                      border: `1px solid ${tokens.hairline}`,
                      marginBottom: 20,
                    }}
                  >
                    <Lightning size={24} weight="duotone" color={tokens.ink} />
                  </span>
                  <h3
                    style={{
                      fontFamily: FONT,
                      color: tokens.ink,
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    Why GridOS
                  </h3>
                  <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.65, marginTop: 12 }}>
                    A battery that charges at noon and discharges at midnight by default wastes money. GridOS knows your tariff schedule, your solar curve, and your backup reserve requirement. It optimises automatically — and shows you every decision it makes.
                  </p>
                  <ul style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "Tariff-aware: charges cheap, discharges expensive",
                      "Backup reserve always protected, never drained",
                      "Live monitoring, fault alerts, and savings reports",
                    ].map((b) => (
                      <li key={b} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span
                          aria-hidden
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 999,
                            background: tokens.brand,
                            flexShrink: 0,
                            marginTop: 8,
                          }}
                        />
                        <span style={{ color: tokens.body, fontSize: 14.5, lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>

              {/* Standards card */}
              <Rise delay={0.10}>
                <div
                  style={{
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 20,
                    padding: 32,
                    height: "100%",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: tokens.pageBgDeep,
                      border: `1px solid ${tokens.hairline}`,
                      marginBottom: 20,
                    }}
                  >
                    <SunHorizon size={24} weight="duotone" color={tokens.ink} />
                  </span>
                  <h3
                    style={{
                      fontFamily: FONT,
                      color: tokens.ink,
                      fontSize: 20,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    Standards and certifications
                  </h3>
                  <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.65, marginTop: 12 }}>
                    Systems are designed to meet or exceed the applicable Indian and international standards for grid-tied and off-grid storage. Exact certification details are listed on the relevant product pages and confirmed at the survey.
                  </p>
                  <p style={{ marginTop: 14 }}>
                    <Gated note="list all certifications: BIS, IEC, relevant IS numbers before launch">
                      Certification list: TBD
                    </Gated>
                  </p>
                </div>
              </Rise>
            </div>
          </Wrap>
        </Band>

        {/* ── FAQ ── */}
        <FaqResources
          eyebrow="Questions"
          title="What GridEnergy is, and is not."
          lead="Honest answers to the questions that come up before people engage with us."
          faqs={[
            {
              q: "Is GridEnergy a manufacturer or a reseller?",
              a: (
                <Gated note="confirm exact manufacturing vs. integration vs. white-label position before publishing">
                  Manufacturing and supply chain position: TBD
                </Gated>
              ),
            },
            {
              q: "What is the legal entity behind GridEnergy?",
              a: "GridEnergy is a brand of DeltaEV Mobility Private Limited, based in Verna, Goa.",
            },
            {
              q: "Which product families does GridEnergy make?",
              a: "Four battery families: Nano for compact home applications, Micro for whole-home and small commercial, Mega for mid-scale commercial, and Giga for large commercial and industrial. All are managed by GridOS.",
            },
            {
              q: "Do I have to use GridOS, or can I use another app?",
              a: "GridOS is the native platform and is included with every system. Open-protocol integration with third-party energy management systems is available at the commercial and industrial tier — confirm at enquiry.",
            },
            {
              q: "Where does GridEnergy operate?",
              a: (
                <Gated note="add verified serviceable states and cities before publishing">
                  Serviceable locations: TBD
                </Gated>
              ),
            },
            {
              q: "What does the warranty cover?",
              a: (
                <Gated note="add real warranty years, cycle count, and exclusions before publishing">
                  Warranty terms: TBD
                </Gated>
              ),
            },
          ]}
        />

        {/* ── Entity footer band ── */}
        <Band tone="deep" py={72} id="entity">
          <Wrap>
            <Rise>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 24,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ maxWidth: 640 }}>
                  <Eyebrow>The company</Eyebrow>
                  <p
                    style={{
                      color: tokens.ink,
                      fontSize: 18,
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.45,
                      marginTop: 14,
                    }}
                  >
                    GridEnergy is a brand of{" "}
                    <strong>DeltaEV Mobility Private Limited</strong>, based in Verna, Goa.
                  </p>
                  <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>
                    <Gated note="add founding story, leadership, registration, and incorporation details if desired">
                      Company story, leadership, and registration details: TBD
                    </Gated>
                  </p>
                </div>
                <div style={{ flexShrink: 0 }}>
                  <Btn to="/contact">Talk to us</Btn>
                </div>
              </div>
            </Rise>
          </Wrap>
        </Band>

        {/* ── Closing CTA ── */}
        <FramedCTA
          title="Ready to see what a sized system looks like for you?"
          sub="Book a free site survey. We assess your load, your tariff, and your backup needs — no obligation."
          primary={{ label: "Book a free site survey", to: "/contact" }}
          secondary={{ label: "Explore the range", to: "/products" }}
        />
      </main>
    </div>
  );
}
