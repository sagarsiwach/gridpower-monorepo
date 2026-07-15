/*
  /partners — GridEnergy authorised installer and channel partner programme.

  Who should apply, what partners get (training, GridOS access, leads, support
  tiers), the onboarding steps, and a clear apply CTA -> /contact.

  Pattern: homes.tsx token / inline-style vocabulary. No Tailwind utilities for
  visuals. Numbers via <Gated>. "GridPower" must not appear.
*/

import type { MetaFunction } from "react-router";
import {
  Wrench,
  SunHorizon,
  Storefront,
  Handshake,
  GraduationCap,
  Headset,
  Lightning,
  ChartLineUp,
  DeviceMobile,
  Toolbox,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { FONT, MONO, Band, Wrap, Rise, Eyebrow, H2, Lead, Btn } from "../components/solutions/light/atoms";
import {
  TrustBar,
  OutcomeGrid,
  FramedCTA,
} from "../components/solutions/light/Blocks";
import { HowItWorks, FaqResources, Gated } from "../components/solutions/light/Modules";

export const meta: MetaFunction = () => [
  { title: "Partners — GridEnergy" },
  {
    name: "description",
    content:
      "Become an authorised GridEnergy installer or channel partner. Training, GridOS access, lead sharing, and ongoing support.",
  },
];

/* ── partner types ── */
const PARTNER_TYPES = [
  {
    icon: Wrench,
    title: "Installation partners",
    body: "Certified electricians and EPC teams who survey, install, and commission GridEnergy systems at residential and commercial sites.",
  },
  {
    icon: SunHorizon,
    title: "Solar EPCs",
    body: "Rooftop solar contractors and EPCs who pair storage with new or existing solar systems through the authorised partner programme.",
  },
  {
    icon: Storefront,
    title: "Channel partners",
    body: "Distributors and dealer networks who take GridEnergy into new regions, new segments, or established dealer relationships.",
  },
];

/* ── what partners get ── */
const PARTNER_BENEFITS = [
  {
    icon: GraduationCap,
    title: "Product and install training",
    body: "Structured product certification for your team covering LFP chemistry, system sizing, install standards, and GridOS commissioning.",
  },
  {
    icon: DeviceMobile,
    title: "GridOS partner access",
    body: "Partner-tier GridOS console for fleet visibility across all your installed sites — live status, alerts, and customer health at a glance.",
  },
  {
    icon: ChartLineUp,
    title: "Lead sharing in your area",
    body: "Qualified inbound enquiries routed to authorised partners based on location and capacity. Leads come warm, pre-qualified against your service area.",
  },
  {
    icon: Headset,
    title: "Priority technical support",
    body: "Dedicated partner support line, priority spares access, and remote diagnostics assistance when a site needs attention.",
  },
  {
    icon: Toolbox,
    title: "Co-branded sales tools",
    body: "Co-branded proposals, sizing calculators, and product collateral so your team can present a professional GridEnergy quote at any site visit.",
  },
  {
    icon: Handshake,
    title: "Partner-tier commercial terms",
    body: "Margins, territory rules, and volume tiers confirmed at onboarding.",
  },
];

export default function PartnersPage() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>

        {/* ── Hero ── */}
        <section
          id="partners"
          style={{
            background: tokens.pageBg,
            paddingTop: 92,
            paddingBottom: 96,
            borderBottom: `1px solid ${tokens.hairline}`,
          }}
        >
          <Wrap>
            {/* identity tag */}
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
                Partner programme
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
                Build the energy transition with us.
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
                GridEnergy works with installers, solar EPCs, and channel partners to bring storage and GridOS to homes and businesses across India. Authorised partners get the training, tools, and backing to deliver every system well.
              </p>
            </Rise>
            <Rise delay={0.12}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                <Btn to="/contact">Apply to become a partner</Btn>
                <Btn to="/products" kind="secondary">See the products</Btn>
              </div>
            </Rise>

            {/* trust chips */}
            <Rise delay={0.16}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 28 }}>
                {[
                  "Product certification",
                  "GridOS partner console",
                  "Lead sharing",
                  "Priority support",
                  "Co-branded proposals",
                ].map((c) => (
                  <span
                    key={c}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "7px 13px",
                      borderRadius: 999,
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      fontSize: 13,
                      fontWeight: 500,
                      color: tokens.body,
                    }}
                  >
                    <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
                    {c}
                  </span>
                ))}
              </div>
            </Rise>
          </Wrap>
        </section>

        {/* ── Trust bar ── */}
        <TrustBar
          lead="Authorised partner benefits"
          items={[
            "Product certification",
            "GridOS partner access",
            "Qualified lead sharing",
            "Priority technical support",
            "Spares access",
          ]}
        />

        {/* ── Who we partner with ── */}
        <Band tone="base" py={96} id="who">
          <Wrap>
            <div style={{ maxWidth: 720, marginBottom: 48 }}>
              <Rise>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow>Who we partner with</Eyebrow>
                </div>
              </Rise>
              <Rise delay={0.04}>
                <H2 max={600}>Three ways to work with GridEnergy.</H2>
              </Rise>
              <Rise delay={0.08}>
                <div style={{ marginTop: 16 }}>
                  <Lead>
                    Whether you install, design solar systems, or distribute into new regions, there is a partner route that fits what you already do.
                  </Lead>
                </div>
              </Rise>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: 18,
              }}
            >
              {PARTNER_TYPES.map((p, i) => {
                const Ico = p.icon;
                return (
                  <Rise key={p.title} delay={i * 0.04}>
                    <div
                      style={{
                        background: tokens.card,
                        border: `1px solid ${tokens.hairline}`,
                        borderRadius: 18,
                        padding: 28,
                        height: "100%",
                      }}
                    >
                      <span
                        style={{
                          display: "grid",
                          placeItems: "center",
                          width: 44,
                          height: 44,
                          borderRadius: 13,
                          background: tokens.pageBgDeep,
                          border: `1px solid ${tokens.hairline}`,
                          marginBottom: 18,
                        }}
                      >
                        <Ico size={22} weight="duotone" color={tokens.ink} />
                      </span>
                      <h3
                        style={{
                          fontFamily: FONT,
                          color: tokens.ink,
                          fontSize: 18,
                          fontWeight: 600,
                          letterSpacing: "-0.015em",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.title}
                      </h3>
                      <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.6, marginTop: 10 }}>
                        {p.body}
                      </p>
                    </div>
                  </Rise>
                );
              })}
            </div>
          </Wrap>
        </Band>

        {/* ── What partners get ── */}
        <OutcomeGrid
          label="What you get"
          title="Everything to sell, install, and support with confidence."
          intro="Partners get the training, tools, and backing to deliver GridEnergy systems well — and the software that makes every install a managed, supportable asset."
          items={PARTNER_BENEFITS}
        />

        {/* ── GridOS partner console callout ── */}
        <Band tone="deep" py={88} id="gridos">
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
                  <Eyebrow>GridOS for partners</Eyebrow>
                  <h2
                    style={{
                      fontFamily: FONT,
                      color: tokens.ink,
                      fontSize: "clamp(26px, 3.4vw, 38px)",
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.06,
                      marginTop: 16,
                      maxWidth: 460,
                      textWrap: "balance",
                    }}
                  >
                    See every site you have installed, in one console.
                  </h2>
                  <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.65, marginTop: 16, maxWidth: 460 }}>
                    The GridOS partner tier gives your team fleet-level visibility: live state of charge, fault alerts, and customer health across all your commissioned sites — without needing the customer to call you first.
                  </p>
                  <ul style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 11 }}>
                    {[
                      "Fleet-level status: all sites at a glance",
                      "Fault alerts before customers notice",
                      "Remote diagnostics to qualify site visits",
                      "Commissioning flow built into the app",
                    ].map((b) => (
                      <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
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
                        <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>
              <Rise delay={0.08}>
                <div
                  style={{
                    aspectRatio: "3 / 3.6",
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 20,
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 28px 64px -38px oklch(15.3% 0.006 107.1 / 0.4)",
                  }}
                >
                  <div style={{ textAlign: "center", padding: 20 }}>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: tokens.muted,
                      }}
                    >
                      GridOS partner console
                    </span>
                    <p
                      style={{
                        fontFamily: MONO,
                        fontSize: 9,
                        color: tokens.brand,
                        marginTop: 6,
                        letterSpacing: "0.1em",
                      }}
                    >
                      ASSET TBD
                    </p>
                  </div>
                </div>
              </Rise>
            </div>
          </Wrap>
        </Band>

        {/* ── How to join: the 4 steps ── */}
        <HowItWorks
          eyebrow="How it works"
          title="From enquiry to your first install, in four steps."
          media="Partner onboarding flow"
          steps={[
            {
              t: "Apply",
              b: "Tell us about your business, your team, and your service area. We review and respond within a few working days.",
            },
            {
              t: "Certify",
              b: "Product, install, and GridOS certification for your team. Structured, practical, and completed before your first site.",
            },
            {
              t: "Survey and deploy",
              b: "Start surveying and installing in your area with the support of GridEnergy technical resources and co-branded tools.",
            },
            {
              t: "Grow with support",
              b: "Ongoing tech support, priority spares access, lead sharing, and regular partner communications as your portfolio grows.",
            },
          ]}
        />

        {/* ── Who should apply ── */}
        <Band tone="deep" py={80} id="eligibility">
          <Wrap>
            <div style={{ maxWidth: 720, marginBottom: 44 }}>
              <Rise>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow>Who should apply</Eyebrow>
                </div>
              </Rise>
              <Rise delay={0.04}>
                <H2 max={580}>If you install, sell, or distribute energy systems, this programme is for you.</H2>
              </Rise>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: 18,
              }}
            >
              {[
                {
                  title: "Electrical contractors",
                  body: "Licensed electricians and MEP contractors who handle residential or commercial electrical work and want to add storage to their offering.",
                },
                {
                  title: "Solar EPCs",
                  body: "Rooftop solar design and installation firms who want to pair storage with new systems or retrofit storage to existing solar customers.",
                },
                {
                  title: "Energy auditors and consultants",
                  body: "Consultants who advise commercial and industrial clients on energy costs and want a hardware-plus-platform solution to recommend.",
                },
                {
                  title: "Electrical distributors",
                  body: "Regional distributors with existing dealer networks who want to add a differentiated energy storage product to their portfolio.",
                },
              ].map((item, i) => (
                <Rise key={item.title} delay={i * 0.04}>
                  <div
                    style={{
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      borderRadius: 16,
                      padding: 24,
                      height: "100%",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: FONT,
                        color: tokens.ink,
                        fontSize: 16.5,
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.6, marginTop: 9 }}>
                      {item.body}
                    </p>
                  </div>
                </Rise>
              ))}
            </div>
          </Wrap>
        </Band>

        {/* ── FAQ ── */}
        <FaqResources
          eyebrow="Questions"
          title="What the programme involves, answered honestly."
          lead="Things potential partners ask before they apply."
          faqs={[
            {
              q: "Is there a fee to join the partner programme?",
              a: (
                <Gated note="confirm partner onboarding fee / no-fee model before publishing">
                  Partner programme fee structure: TBD
                </Gated>
              ),
            },
            {
              q: "Is the service area exclusive?",
              a: (
                <Gated note="confirm exclusivity model: exclusive by default, or tiered by volume, before publishing">
                  Territory exclusivity terms: TBD
                </Gated>
              ),
            },
            {
              q: "What does certification involve?",
              a: "Certification covers product knowledge (LFP chemistry, GridEnergy families), system sizing, install standards and safety, and GridOS commissioning. It is practical and completed before your first live site.",
            },
            {
              q: "How are leads shared?",
              a: "Inbound enquiries are routed to authorised partners based on service area and capacity. We do not share leads with non-certified partners.",
            },
            {
              q: "Can I install other brands alongside GridEnergy?",
              a: "Yes. Authorised partner status does not require exclusivity on your side. You may continue to install or distribute other products.",
            },
            {
              q: "What happens after I install a system?",
              a: "The system registers to your partner GridOS console. Ongoing monitoring, fault detection, and customer health are visible to you. GridEnergy provides backend support for any issues you cannot resolve remotely.",
            },
          ]}
        />

        {/* ── Apply CTA ── */}
        <FramedCTA
          title="Ready to add storage to what you offer?"
          sub="Send a partner enquiry. We will review your application and get back to you within a few working days."
          primary={{ label: "Apply to become a partner", to: "/contact" }}
          secondary={{ label: "Explore GridOS", to: "/platform" }}
        />
      </main>
    </div>
  );
}
