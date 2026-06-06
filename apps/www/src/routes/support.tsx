/*
  /support — Help centre. Getting started, GridOS monitoring, service and
  warranty, troubleshooting, how to reach support. Assembled in the locked
  V3 language (olive + GridRed, Inter, inline tokens.*) to match homes.tsx.
*/

import { useState } from "react";
import type { MetaFunction } from "react-router";
import {
  Rocket,
  DeviceMobile,
  ShieldCheck,
  Wrench,
  Headset,
  Book,
  ArrowRight,
  Check,
  Warning,
  Clock,
  EnvelopeSimple,
  ChatText,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { FONT, MONO } from "../components/solutions/light/atoms";
import {
  Band,
  Wrap,
  Rise,
  Eyebrow,
  H2,
  Lead,
  Btn,
} from "../components/solutions/light/atoms";
import { FaqResources, Gated } from "../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Support — GridEnergy" },
  {
    name: "description",
    content:
      "Help with your GridEnergy system: getting started, GridOS monitoring, warranty, troubleshooting, and how to reach the team.",
  },
];

const DOCK_LINKS: DockLink[] = [
  { id: "start", label: "Getting started" },
  { id: "gridos", label: "GridOS" },
  { id: "warranty", label: "Warranty" },
  { id: "troubleshoot", label: "Troubleshooting" },
  { id: "contact-support", label: "Reach us" },
  { id: "faq", label: "FAQ" },
];

/* ---- support channels (real values are gated) ---- */
const CHANNELS = [
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: <Gated note="confirm support inbox">support@gridenergy.co.in</Gated>,
    note: <Gated note="define response SLA">Response time TBD</Gated>,
  },
  {
    icon: ChatText,
    label: "WhatsApp",
    value: <Gated note="add real WhatsApp number">+91 XXXXX XXXXX</Gated>,
    note: <Gated note="confirm WhatsApp hours">Mon–Sat, hours TBD</Gated>,
  },
  {
    icon: Clock,
    label: "Support hours",
    value: <Gated note="confirm support hours">Mon–Sat, hours TBD</Gated>,
    note: "Existing customers: have your system ID ready",
  },
];

/* ---- troubleshooting items ---- */
const TROUBLESHOOT_ITEMS = [
  {
    title: "System not switching to battery during a cut",
    body: "Check the GridOS app for any active fault codes. Confirm the battery state of charge is above the reserve threshold. If the system shows healthy but did not switch, contact support with your system ID.",
  },
  {
    title: "GridOS app not connecting",
    body: "Ensure your phone is on a working data connection. Force-quit and reopen the app. If the system gateway LED shows solid, the system is online and the issue is app-side — try reinstalling.",
  },
  {
    title: "Higher bill than expected",
    body: "Open GridOS and review the charge schedule. Confirm tariff slots are set correctly for your utility. If the schedule looks right, check whether a recent utility tariff change has shifted your peak window.",
  },
  {
    title: "Unusual noise from the unit",
    body: "A faint cooling-fan hum during charging is normal. Clicking or buzzing that is new should be logged via GridOS diagnostics and reported to support. Do not open the enclosure.",
  },
  {
    title: "Battery not charging from solar",
    body: "Confirm the solar input is active in GridOS and that the inverter is online. Check that no isolator has tripped. If GridOS shows solar input at zero while the sun is up, contact your installer.",
  },
];

/* ---- getting-started steps ---- */
const SETUP_STEPS = [
  {
    n: "1",
    t: "Download the GridOS app",
    b: "Available on iOS and Android. You will receive an activation code with your install documentation.",
  },
  {
    n: "2",
    t: "Activate your system",
    b: "Enter the activation code in the app. GridOS will locate your gateway and confirm connectivity.",
  },
  {
    n: "3",
    t: "Set your backup reserve",
    b: "Decide what percentage of capacity to hold in reserve for outages. We recommend a starting point at survey.",
  },
  {
    n: "4",
    t: "Configure your tariff schedule",
    b: "Enter your utility peak and off-peak slots. GridOS uses these to decide when to charge, discharge, and hold.",
  },
  {
    n: "5",
    t: "Review your first week",
    b: "GridOS shows daily import, export, and self-use data. After a week you will see your savings baseline.",
  },
];

export default function SupportPage() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        {/* Hero */}
        <section
          style={{
            background: tokens.pageBgDeep,
            borderBottom: `1px solid ${tokens.hairline}`,
            paddingTop: 80,
            paddingBottom: 72,
          }}
        >
          <Wrap>
            <Rise>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
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
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: tokens.brand,
                    }}
                  />
                  Support
                </span>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <h1
                style={{
                  fontFamily: FONT,
                  color: tokens.ink,
                  fontSize: "clamp(36px,5vw,58px)",
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.02,
                  maxWidth: "22ch",
                  textWrap: "balance",
                }}
              >
                We are here when you need us.
              </h1>
            </Rise>
            <Rise delay={0.08}>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 18,
                  lineHeight: 1.55,
                  marginTop: 20,
                  maxWidth: 520,
                }}
              >
                Most issues can be diagnosed remotely through GridOS. Find what you need below, or reach the team directly.
              </p>
            </Rise>
            <Rise delay={0.12}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
                <Btn to="/contact">Book a site survey</Btn>
                <Btn to="#contact-support" kind="secondary">
                  Contact support
                </Btn>
              </div>
            </Rise>
          </Wrap>
        </section>

        {/* Category card grid */}
        <Band id="start">
          <Rise>
            <div style={{ marginBottom: 48 }}>
              <Eyebrow>Help categories</Eyebrow>
              <div style={{ marginTop: 14 }}>
                <H2 max={600}>Where do you need help?</H2>
              </div>
            </div>
          </Rise>
          <SupportCategoryGrid />
        </Band>

        {/* Getting started */}
        <Band tone="deep">
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
                <Eyebrow>Getting started</Eyebrow>
                <div style={{ marginTop: 14 }}>
                  <H2 max={460}>Five steps from install to live.</H2>
                </div>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 16.5,
                    lineHeight: 1.6,
                    marginTop: 16,
                    maxWidth: 460,
                  }}
                >
                  Your installer commissions the system on site. These steps get GridOS running on your phone and savings running from day one.
                </p>
              </div>
            </Rise>
            <Rise delay={0.06}>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {SETUP_STEPS.map((s, i) => (
                  <div
                    key={s.t}
                    style={{
                      display: "flex",
                      gap: 18,
                      alignItems: "flex-start",
                      paddingBlock: 22,
                      borderBottom:
                        i < SETUP_STEPS.length - 1
                          ? `1px solid ${tokens.hairline}`
                          : undefined,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        width: 32,
                        height: 32,
                        borderRadius: 999,
                        background: tokens.ink,
                        color: "#fff",
                        fontFamily: FONT,
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {s.n}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: FONT,
                          fontSize: 16,
                          fontWeight: 600,
                          color: tokens.ink,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.t}
                      </p>
                      <p
                        style={{
                          color: tokens.muted,
                          fontSize: 14.5,
                          lineHeight: 1.55,
                          marginTop: 4,
                          maxWidth: 400,
                        }}
                      >
                        {s.b}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Rise>
          </div>
        </Band>

        {/* GridOS monitoring */}
        <Band id="gridos">
          <Rise>
            <div style={{ marginBottom: 48 }}>
              <Eyebrow>GridOS</Eyebrow>
              <div style={{ marginTop: 14 }}>
                <H2 max={600}>Monitoring via GridOS.</H2>
              </div>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  GridOS is live and active on all installed systems. It is your primary window into the health, performance, and schedule of your battery.
                </Lead>
              </div>
            </div>
          </Rise>
          <GridOSFeatures />
        </Band>

        {/* Service and warranty */}
        <Band tone="deep" id="warranty">
          <Rise>
            <div style={{ marginBottom: 48 }}>
              <Eyebrow>Service and warranty</Eyebrow>
              <div style={{ marginTop: 14 }}>
                <H2 max={560}>What is covered, and for how long.</H2>
              </div>
            </div>
          </Rise>
          <WarrantyBlock />
        </Band>

        {/* Troubleshooting */}
        <Band id="troubleshoot">
          <Rise>
            <div style={{ marginBottom: 48 }}>
              <Eyebrow>Troubleshooting</Eyebrow>
              <div style={{ marginTop: 14 }}>
                <H2 max={560}>Common issues, answered directly.</H2>
              </div>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  Most faults surface in GridOS before you notice them. For anything not resolved here, contact support with your system ID.
                </Lead>
              </div>
            </div>
          </Rise>
          <TroubleshootAccordion />
        </Band>

        {/* Reach support */}
        <Band tone="deep" id="contact-support">
          <Rise>
            <div style={{ marginBottom: 48 }}>
              <Eyebrow>Reach us</Eyebrow>
              <div style={{ marginTop: 14 }}>
                <H2 max={520}>Channels for getting help.</H2>
              </div>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  For all support requests, have your system ID ready. You will find it in the GridOS app under Settings.
                </Lead>
              </div>
            </div>
          </Rise>
          <ContactChannels />
        </Band>

        {/* FAQ + resources */}
        <FaqResources
          eyebrow="Questions"
          title="Things people ask before and after install."
          lead="Plain answers to the questions that come up most."
          faqs={[
            {
              q: "How do I find my system ID?",
              a: "Open the GridOS app, tap the menu in the top right, and select Settings. Your system ID is shown at the top of that screen.",
            },
            {
              q: "What does the warranty cover?",
              a: (
                <Gated note="add real warranty years, cycle count, and exclusion list">
                  Exact warranty terms, including duration and cycle count, are TBD. The warranty does not cover physical damage or improper installation.
                </Gated>
              ),
            },
            {
              q: "Can I get support for a system installed by a third party?",
              a: "We support all GridEnergy systems. For systems installed by authorised partners, the partner handles first-line service. Contact us if you are unsure.",
            },
            {
              q: "How long does a site visit take?",
              a: "Most diagnostic visits are resolved in two to three hours. Complex faults or replacement work may require a follow-up appointment.",
            },
            {
              q: "What if my system has a fault during a grid outage?",
              a: "GridOS logs fault events automatically, including during outages. Once connectivity is restored the event report is uploaded. Contact support with your system ID and the approximate time of the fault.",
            },
            {
              q: "Is there a support cost for warranty claims?",
              a: (
                <Gated note="define service visit cost policy">
                  Service visit cost policy during and after warranty: TBD.
                </Gated>
              ),
            },
          ]}
          resources={[
            {
              kind: "Guide",
              title: "How to read your GridOS dashboard",
              body: "State of charge, daily flows, and what each alert means in plain language.",
              to: "/support",
            },
            {
              kind: "Explainer",
              title: "How GridOS tariff scheduling works",
              body: "How to enter your utility tariff slots and what the system does with them overnight.",
              to: "/support",
            },
            {
              kind: "Checklist",
              title: "Before you call support",
              body: "Five things to check in the GridOS app that resolve most issues without a site visit.",
              to: "/support",
            },
          ]}
        />

        {/* CTA */}
        <section style={{ background: tokens.pageBg, paddingBlock: 96 }}>
          <Wrap>
            <Rise>
              <div
                style={{
                  background: tokens.ink,
                  borderRadius: 24,
                  padding: "64px 48px",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontFamily: FONT,
                    color: "#fff",
                    fontSize: "clamp(28px,4vw,44px)",
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.08,
                    maxWidth: "20ch",
                    marginInline: "auto",
                    textWrap: "balance",
                  }}
                >
                  Not yet a customer? Start with a free site survey.
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,.65)",
                    fontSize: 16.5,
                    lineHeight: 1.55,
                    marginTop: 16,
                    maxWidth: 480,
                    marginInline: "auto",
                  }}
                >
                  We assess your load, roof, and backup needs on site. No obligation, no sales call required to qualify.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    justifyContent: "center",
                    marginTop: 30,
                  }}
                >
                  <Btn to="/contact">Book a free site survey</Btn>
                  <Btn to="/products" kind="secondary" onDark>
                    Explore the range
                  </Btn>
                </div>
              </div>
            </Rise>
          </Wrap>
        </section>
      </main>

      <SolutionDock
        label="Support"
        links={DOCK_LINKS}
        secondary={{ label: "Contact", to: "/contact" }}
        primary={{ label: "Book survey", to: "/contact" }}
      />
    </div>
  );
}

/* ---- Category grid ---- */

const CATEGORIES = [
  {
    icon: Rocket,
    title: "Getting started",
    body: "App setup, activation codes, first-week configuration, and GridOS onboarding.",
    anchor: "#start",
  },
  {
    icon: DeviceMobile,
    title: "GridOS app",
    body: "Monitoring, tariff schedules, backup reserve, alerts, and account settings.",
    anchor: "#gridos",
  },
  {
    icon: ShieldCheck,
    title: "Service and warranty",
    body: "Coverage, claims, and what happens if something needs replacing.",
    anchor: "#warranty",
  },
  {
    icon: Wrench,
    title: "Troubleshooting",
    body: "Step-by-step fixes for the most common issues before calling the team.",
    anchor: "#troubleshoot",
  },
  {
    icon: Headset,
    title: "Reach support",
    body: "Email, WhatsApp, and hours. Have your system ID ready.",
    anchor: "#contact-support",
  },
  {
    icon: Book,
    title: "Guides and resources",
    body: "Explainers, checklists, and deeper reading on how the system works.",
    anchor: "#faq",
  },
];

function SupportCategoryGrid() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        gap: 16,
      }}
    >
      {CATEGORIES.map((c, i) => {
        const Ico = c.icon;
        const on = hover === c.title;
        return (
          <Rise key={c.title} delay={i * 0.04}>
            <a
              href={c.anchor}
              onMouseEnter={() => setHover(c.title)}
              onMouseLeave={() => setHover(null)}
              style={{
                display: "block",
                height: "100%",
                textDecoration: "none",
                background: tokens.card,
                border: `1px solid ${on ? tokens.hairlineStrong : tokens.hairline}`,
                borderRadius: 16,
                padding: 24,
                transform: on ? "translateY(-2px)" : "none",
                boxShadow: on ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.3)" : "none",
                transition: "all .2s ease",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: tokens.pageBgDeep,
                  border: `1px solid ${tokens.hairline}`,
                }}
              >
                <Ico size={22} weight="duotone" color={tokens.ink} />
              </span>
              <h3
                style={{
                  fontFamily: FONT,
                  color: tokens.ink,
                  fontSize: 17,
                  fontWeight: 600,
                  marginTop: 16,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 14,
                  lineHeight: 1.55,
                  marginTop: 7,
                }}
              >
                {c.body}
              </p>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 16,
                  color: tokens.brand,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Go there{" "}
                <ArrowRight
                  size={12}
                  weight="bold"
                  style={{
                    transform: on ? "translateX(3px)" : "none",
                    transition: "transform .16s ease",
                  }}
                />
              </span>
            </a>
          </Rise>
        );
      })}
    </div>
  );
}

/* ---- GridOS feature tiles ---- */

const GRIDOS_FEATURES = [
  {
    label: "Live state of charge",
    body: "See battery level, grid draw, solar input, and home load in real time.",
  },
  {
    label: "Backup reserve",
    body: "Set a minimum charge to hold for outages. GridOS never discharges below it.",
  },
  {
    label: "Tariff scheduling",
    body: "Enter your peak and off-peak tariff slots. GridOS shifts charge and discharge automatically.",
  },
  {
    label: "Outage alerts",
    body: "Push notification the moment the grid drops, and again when it returns.",
  },
  {
    label: "Remote diagnostics",
    body: "Fault events are logged and uploaded automatically. The team can review without a site visit.",
  },
  {
    label: "Savings summary",
    body: "Daily, weekly, and monthly import reduction and self-use figures.",
  },
];

function GridOSFeatures() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
        gap: 16,
      }}
    >
      {GRIDOS_FEATURES.map((f, i) => (
        <Rise key={f.label} delay={i * 0.04}>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              padding: 22,
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 14,
            }}
          >
            <span
              style={{
                flexShrink: 0,
                marginTop: 2,
                display: "grid",
                placeItems: "center",
                width: 28,
                height: 28,
                borderRadius: 8,
                background: tokens.brandSoft,
              }}
            >
              <Check size={14} weight="bold" color={tokens.brand} />
            </span>
            <div>
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 15.5,
                  fontWeight: 600,
                  color: tokens.ink,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.label}
              </p>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 14,
                  lineHeight: 1.55,
                  marginTop: 5,
                }}
              >
                {f.body}
              </p>
            </div>
          </div>
        </Rise>
      ))}
    </div>
  );
}

/* ---- Warranty block ---- */

function WarrantyBlock() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
        gap: 20,
      }}
    >
      {/* Coverage card */}
      <Rise>
        <div
          style={{
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 18,
            padding: "28px 28px 32px",
            height: "100%",
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: tokens.brand,
            }}
          >
            Warranty
          </span>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 600,
              color: tokens.ink,
              letterSpacing: "-0.02em",
              marginTop: 12,
            }}
          >
            Product warranty
          </h3>
          <p
            style={{
              color: tokens.muted,
              fontSize: 15,
              lineHeight: 1.6,
              marginTop: 12,
            }}
          >
            <Gated note="add real warranty years + cycle count">
              Warranty duration and cycle terms: TBD. Covers manufacturing defects and capacity loss below threshold.
            </Gated>
          </p>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column" as const,
              gap: 10,
            }}
          >
            {[
              "LFP cells and battery modules",
              "Integrated inverter and gateway",
              "Capacity retention above stated threshold",
            ].map((item) => (
              <div
                key={item}
                style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
              >
                <Check
                  size={15}
                  weight="bold"
                  color={tokens.brand}
                  style={{ flexShrink: 0, marginTop: 3 }}
                />
                <span
                  style={{
                    color: tokens.body,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Rise>

      {/* Service and exclusions card */}
      <Rise delay={0.06}>
        <div
          style={{
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 18,
            padding: "28px 28px 32px",
            height: "100%",
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: tokens.brand,
            }}
          >
            Service
          </span>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 600,
              color: tokens.ink,
              letterSpacing: "-0.02em",
              marginTop: 12,
            }}
          >
            How service works
          </h3>
          <p
            style={{
              color: tokens.muted,
              fontSize: 15,
              lineHeight: 1.6,
              marginTop: 12,
            }}
          >
            All service requests start with remote diagnosis via GridOS. Most faults are resolved without a site visit. When a visit is needed, an authorised technician is dispatched.
          </p>
          <div
            style={{
              marginTop: 20,
              padding: "14px 16px",
              background: tokens.pageBgDeep,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <Warning
                size={16}
                weight="duotone"
                color={tokens.inkMuted}
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <p
                style={{
                  color: tokens.body,
                  fontSize: 13.5,
                  lineHeight: 1.5,
                }}
              >
                Warranty does not cover physical damage, improper installation, or modifications by unauthorised parties.
              </p>
            </div>
          </div>
        </div>
      </Rise>

      {/* How to make a claim */}
      <Rise delay={0.1}>
        <div
          style={{
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 18,
            padding: "28px 28px 32px",
            height: "100%",
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              color: tokens.brand,
            }}
          >
            Claims
          </span>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 600,
              color: tokens.ink,
              letterSpacing: "-0.02em",
              marginTop: 12,
            }}
          >
            Making a warranty claim
          </h3>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "column" as const,
              gap: 18,
            }}
          >
            {[
              {
                n: "1",
                t: "Document the issue",
                b: "Note the fault code or behaviour and the date it started.",
              },
              {
                n: "2",
                t: "Contact support",
                b: "Share your system ID, install date, and what GridOS is showing.",
              },
              {
                n: "3",
                t: "Remote triage",
                b: "The team reviews your GridOS data and confirms eligibility.",
              },
            ].map((step) => (
              <div
                key={step.t}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    background: tokens.ink,
                    color: "#fff",
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {step.n}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 15,
                      fontWeight: 600,
                      color: tokens.ink,
                    }}
                  >
                    {step.t}
                  </p>
                  <p
                    style={{
                      color: tokens.muted,
                      fontSize: 13.5,
                      lineHeight: 1.5,
                      marginTop: 3,
                    }}
                  >
                    {step.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Rise>
    </div>
  );
}

/* ---- Troubleshoot accordion ---- */

function TroubleshootAccordion() {
  const [open, setOpen] = useState<number>(0);
  return (
    <div
      style={{
        maxWidth: 820,
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      {TROUBLESHOOT_ITEMS.map((item, i) => (
        <TroubleshootRow
          key={item.title}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
          isFirst={i === 0}
        />
      ))}
    </div>
  );
}

function TroubleshootRow({
  item,
  isOpen,
  onToggle,
  isFirst,
}: {
  item: { title: string; body: string };
  isOpen: boolean;
  onToggle: () => void;
  isFirst: boolean;
}) {
  return (
    <div
      style={{
        borderTop: isFirst ? undefined : `1px solid ${tokens.hairline}`,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "20px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left" as const,
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 600,
          color: tokens.ink,
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Warning
            size={16}
            weight="duotone"
            color={isOpen ? tokens.brand : tokens.muted}
            style={{ flexShrink: 0, transition: "color .2s ease" }}
          />
          {item.title}
        </span>
        <span
          style={{
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            width: 26,
            height: 26,
            borderRadius: 999,
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairline}`,
          }}
        >
          <span
            style={{
              display: "block",
              width: 10,
              height: 2,
              background: tokens.brand,
              position: "relative",
            }}
          >
            {!isOpen && (
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: tokens.brand,
                  transform: "rotate(90deg)",
                }}
              />
            )}
          </span>
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: "0 24px 22px 52px",
          }}
        >
          <p
            style={{
              color: tokens.muted,
              fontSize: 15,
              lineHeight: 1.65,
              maxWidth: "62ch",
            }}
          >
            {item.body}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---- Contact channels ---- */

function ContactChannels() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        gap: 16,
        maxWidth: 900,
      }}
    >
      {CHANNELS.map((c, i) => {
        const Ico = c.icon;
        return (
          <Rise key={c.label} delay={i * 0.04}>
            <div
              style={{
                background: tokens.card,
                border: `1px solid ${tokens.hairline}`,
                borderRadius: 16,
                padding: "24px 24px 26px",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: tokens.pageBgDeep,
                  border: `1px solid ${tokens.hairline}`,
                }}
              >
                <Ico size={20} weight="duotone" color={tokens.ink} />
              </span>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: tokens.inkMuted,
                  marginTop: 16,
                }}
              >
                {c.label}
              </p>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 600,
                  color: tokens.ink,
                  marginTop: 6,
                  letterSpacing: "-0.01em",
                }}
              >
                {c.value}
              </div>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 13.5,
                  marginTop: 6,
                  lineHeight: 1.5,
                }}
              >
                {c.note}
              </p>
            </div>
          </Rise>
        );
      })}
    </div>
  );
}
