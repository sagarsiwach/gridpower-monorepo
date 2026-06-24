/*
  /platform — GridOS, the software layer that turns a battery into savings and control.

  Assembled from the canonical block library (Blocks + Modules) in the locked
  restrained language (olive + GridRed, Inter), with the unified SolutionDock.
  The global header + footer are provided by root.tsx. Numbers route through <Gated>.
  GridOS is presented as LIVE/active — present tense throughout.
*/

import React from "react";
import type { MetaFunction } from "react-router";
import {
  ChartLineUp,
  BatteryChargingVertical,
  Bell,
  CurrencyInr,
  PlugsConnected,
  DeviceMobile,
  ShieldCheck,
  Buildings,
  WifiHigh,
  Wrench,
  LockSimple,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { FONT } from "../components/solutions/light/atoms";
import {
  TrustBar,
  SystemRows,
  OutcomeGrid,
  AppShowcase,
  FramedCTA,
} from "../components/solutions/light/Blocks";
import {
  HowItWorks,
  FaqResources,
  Gated,
} from "../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "GridOS — the software layer — GridEnergy" },
  { name: "description", content: "GridOS turns your battery into a managed asset. Live monitoring, tariff-aware scheduling, automatic backup reserve, fleet view, and outage alerts — from one console on your phone." },
];

/* ---- Dock ---- */
const DOCK_LINKS: DockLink[] = [
  { id: "what-gridos", label: "What it does" },
  { id: "outcomes", label: "Outcomes" },
  { id: "how", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

/* ---- Tagged identity card — platform-specific hero (no carousel needed) ---- */
function PlatformHero() {
  return (
    <section style={{
      background: tokens.ink,
      paddingTop: 96,
      paddingBottom: 108,
      borderBottom: `1px solid oklch(28.6% 0.016 107.4)`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* subtle radial wash behind the text */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 72% 54% at 62% 38%, oklch(0.58 0.245 27 / 0.08) 0%, transparent 72%)",
      }} />

      <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28, position: "relative" }}>
        {/* Identity tag */}
        <div style={{ marginBottom: 28, display: "inline-flex", alignItems: "center", gap: 9,
          padding: "8px 16px", borderRadius: 999,
          background: "oklch(22.8% 0.013 107.4)", border: "1px solid oklch(39.4% 0.023 107.4)",
          fontSize: 13, fontWeight: 600, color: "oklch(73.7% 0.021 106.9)", fontFamily: FONT }}>
          <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand, flexShrink: 0 }} />
          Platform
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 56, alignItems: "center" }}>
          <div>
            <h1 style={{
              fontFamily: FONT, color: "#fff",
              fontSize: "clamp(40px, 5.4vw, 64px)",
              fontWeight: 600, letterSpacing: "-0.038em", lineHeight: 1.0,
              textWrap: "balance", marginTop: 0,
            }}>
              GridOS.<br />Your system, run by software.
            </h1>
            <p style={{ color: "oklch(73.7% 0.021 106.9)", fontSize: 19, lineHeight: 1.58, marginTop: 22, maxWidth: 500 }}>
              A battery is hardware. GridOS is the software layer that decides when to charge, how much to hold in reserve, and what you are saving — and puts all of it in your pocket.
            </p>

            <div style={{ height: 1, background: "oklch(28.6% 0.016 107.4)", margin: "28px 0" }} />

            {/* three-chip capability summary */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                "Live monitoring on every device",
                "Tariff-aware scheduling",
                "Automatic backup reserve",
                "Outage alerts on your phone",
                "Multi-site fleet view",
                "Remote health and maintenance",
              ].map((c) => (
                <span key={c} style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  padding: "7px 13px", borderRadius: 999,
                  background: "oklch(22.8% 0.013 107.4)",
                  border: "1px solid oklch(39.4% 0.023 107.4)",
                  fontSize: 13, fontWeight: 500, color: "oklch(88% 0.011 106.6)", fontFamily: FONT,
                }}>
                  <span aria-hidden style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand, flexShrink: 0 }} />
                  {c}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
              <HeroBtn to="/contact" primary>Book a site survey</HeroBtn>
              <HeroBtn to="/products">See the hardware</HeroBtn>
            </div>
          </div>

          {/* right: console placeholder */}
          <div style={{
            aspectRatio: "4 / 3.2",
            background: "oklch(22.8% 0.013 107.4)",
            border: "1px solid oklch(39.4% 0.023 107.4)",
            borderRadius: 22,
            display: "grid", placeItems: "center",
            boxShadow: "0 32px 80px -40px oklch(0 0 0 / 0.7)",
          }}>
            <div style={{ textAlign: "center", padding: 24 }}>
              <p style={{ fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(46.6% 0.025 107.3)" }}>GridOS console</p>
              <p style={{ fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: 9, color: tokens.brand, marginTop: 8, letterSpacing: "0.1em" }}>ASSET TBD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Inline hero button ---- */
function HeroBtn({ to, children, primary }: { to: string; children: React.ReactNode; primary?: boolean }) {
  const [h, setH] = React.useState(false);
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    fontFamily: FONT, fontSize: 14, fontWeight: 600,
    borderRadius: 12, padding: "13px 22px", textDecoration: "none", cursor: "pointer",
    border: "1px solid transparent",
    transition: "background .16s ease, border-color .16s ease, transform .16s ease",
    transform: h ? "translateY(-1px)" : "none",
  };
  const variant: React.CSSProperties = primary
    ? { background: h ? tokens.brandHover : tokens.brand, color: "#fff" }
    : { background: "transparent", color: "oklch(88% 0.011 106.6)", borderColor: "oklch(39.4% 0.023 107.4)" };
  return (
    <a href={to} style={{ ...base, ...variant }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
    </a>
  );
}

/* ---- Page ---- */
export default function PlatformPage() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <PlatformHero />

        <TrustBar
          lead="The software most installers never give you"
          items={[
            "Live state of charge",
            "Tariff-aware scheduling",
            "Backup reserve protection",
            "Outage alerts",
            "Multi-site fleet view",
            "Remote diagnostics",
          ]}
        />

        {/* Core capabilities — three deep feature rows */}
        <SystemRows
          label="What GridOS does"
          title="Everything your system does, visible and in your control."
          intro="Not a settings panel. An operator console for your home or site, built to make storage pay from day one."
          features={[
            {
              kicker: "Live monitoring",
              title: "See every watt, as it moves.",
              body: "State of charge, grid draw, solar generation, and household load — live and historical, on any device. Drill into any asset. Spot waste. Prove savings.",
              bullets: [
                "Real-time energy flow across all sources",
                "Per-asset breakdown: battery, grid, solar, load",
                "Historical views to track trends and bill impacts",
                "Works on phone, tablet, and web console",
              ],
              visual: "GridOS live energy flow dashboard",
            },
            {
              kicker: "Tariff-aware scheduling",
              title: "Charge cheap. Discharge dear. Every day, without touching it.",
              body: "GridOS reads your tariff structure and schedules charge and discharge windows automatically. Store off-peak or solar power, release it at expensive hours. Set it once; it runs itself.",
              bullets: [
                "Automatic charge windows matched to your tariff",
                "Solar self-use prioritized before grid draw",
                "Manual override available at any time",
                "Schedule adjusts as tariff windows change",
              ],
              visual: "GridOS tariff schedule and window view",
            },
            {
              kicker: "Backup reserve protection",
              title: "Your reserve is always held. Automatically.",
              body: "Set the minimum charge you want kept back for outages. GridOS protects it regardless of the schedule. When the grid drops, your reserve is there and the switchover is instant.",
              bullets: [
                "Reserve level set once, protected automatically",
                "Instant switchover on grid outage",
                "Reserve indicator visible at all times",
                "Adjustable for seasonal or risk preferences",
              ],
              visual: "GridOS backup reserve protection indicator",
            },
          ]}
        />

        {/* Outcomes — what you actually get */}
        <OutcomeGrid
          label="Outcomes"
          title="What changes when your system has software."
          intro="Not a feature list. The real difference GridOS makes to living with your power."
          items={[
            {
              icon: ChartLineUp,
              title: "Know what your system is doing",
              body: "Live state of charge, grid draw, solar yield, and load — in one view, on your phone, right now.",
            },
            {
              icon: CurrencyInr,
              title: "Lower bills without thinking about it",
              body: "GridOS handles the scheduling. You benefit from the tariff gap without manually managing charge times.",
            },
            {
              icon: BatteryChargingVertical,
              title: "Backup that is always ready",
              body: "Your reserve is protected automatically. You never arrive home to a flat battery because the system miscalculated.",
            },
            {
              icon: Bell,
              title: "Alerts before you notice a problem",
              body: "Outage notices, fault detection, and service reminders go to your phone. Most issues are handled before they affect you.",
            },
            {
              icon: Buildings,
              title: "One view across multiple sites",
              body: "Run a fleet of systems — homes, commercial buildings, or distributed assets — from a single fleet dashboard.",
            },
            {
              icon: Wrench,
              title: "Remote health and maintenance",
              body: "GridOS surfaces diagnostics to your installer. Many faults are diagnosed and resolved remotely, without a site visit.",
            },
          ]}
        />

        {/* App showcase — the moat argument */}
        <AppShowcase
          label="GridOS"
          title="The smart layer most installers never give you."
          intro="Most installers fit a battery and hand you a spec sheet. GridOS is the software that turns the hardware into a managed asset — with visibility, control, and savings built in from the first day."
          visual="GridOS mobile app — energy dashboard"
          features={[
            "Live state of charge, grid, and solar on your phone",
            "Backup reserve held and protected automatically",
            "Tariff-aware charge and discharge, hands-off every day",
            "Outage alerts and savings reports pushed to your phone",
            "Multi-site fleet view for homes, commercial, or distributed assets",
            "Remote diagnostics — your installer sees faults without a site visit",
          ]}
        />

        {/* How it gets set up */}
        <HowItWorks
          eyebrow="Setup"
          title="GridOS is live from the day of install."
          media="GridOS onboarding flow"
          tone="deep"
          steps={[
            {
              t: "Configured at commissioning",
              b: "Your installer sets up GridOS during the install. Tariff windows, reserve levels, and notification preferences are configured before you touch the app.",
            },
            {
              t: "App on your phone",
              b: "You get the GridOS app — live dashboard, controls, and alerts — ready to use the moment the system goes live.",
            },
            {
              t: "Monitored and updated remotely",
              b: "GridOS receives software updates over the air. Your installer monitors system health remotely. You get the improvements without any action on your part.",
            },
          ]}
        />

        {/* What GridOS connects to */}
        <OutcomeGrid
          label="Compatible hardware"
          title="GridOS runs on every system in the range."
          intro="From the compact Nano for apartments to the Giga for large commercial sites, GridOS is the software layer across the full range."
          items={[
            {
              icon: DeviceMobile,
              title: "Nano and Micro",
              body: "Wall-mounted home systems. GridOS handles backup reserve, tariff scheduling, and monitoring from your phone.",
            },
            {
              icon: PlugsConnected,
              title: "Mega and Giga",
              body: "Rack and ground-mount systems for commercial and industrial sites. GridOS adds fleet view and remote diagnostics.",
            },
            {
              icon: WifiHigh,
              title: "Open integrations",
              body: "Open protocols and standards. GridOS connects to your existing solar inverter and metering setup without lock-in.",
            },
            {
              icon: LockSimple,
              title: "No vendor lock-in",
              body: "Your monitoring data stays yours. GridOS uses open standards so you are not dependent on a single platform.",
            },
            {
              icon: ShieldCheck,
              title: "Security and reliability",
              body: "Encrypted communication, secure authentication, and redundant monitoring so the console is always accurate.",
            },
            {
              icon: Buildings,
              title: "Fleet management",
              body: "Manage multiple sites from one account. Multi-site dashboard, aggregate reporting, and per-site drill-down.",
            },
          ]}
        />

        {/* FAQ */}
        <FaqResources
          eyebrow="Questions about GridOS"
          title="How it works, answered honestly."
          lead="Common questions from people who have never had software on their storage before."
          faqs={[
            {
              q: "Do I need GridOS to use the battery?",
              a: "The battery works without GridOS — it will charge and discharge in basic mode. GridOS is what makes it pay: without it you lose tariff-aware scheduling, backup-reserve protection, and all monitoring. Every system in the range ships with GridOS.",
            },
            {
              q: "Is there a subscription fee for GridOS?",
              a: <Gated note="confirm pricing model — included or subscription">Pricing details: TBD</Gated>,
            },
            {
              q: "What devices does the app run on?",
              a: "The GridOS app runs on iOS and Android. The web console works on any modern browser — phone, tablet, or desktop.",
            },
            {
              q: "Can my installer see my system remotely?",
              a: "Yes. GridOS gives your installer a service view of your system's health and diagnostics. Most faults can be diagnosed and resolved without a site visit.",
            },
            {
              q: "What happens if I lose internet connection?",
              a: "The battery continues to operate and follow its last schedule. Monitoring and remote control require connectivity; the system does not. When connection restores, GridOS syncs and resumes full visibility.",
            },
            {
              q: "Does GridOS work with my existing solar inverter?",
              a: "GridOS uses open protocols and is designed to work with standard solar inverter setups. Compatibility for your specific inverter is confirmed at the site survey.",
            },
            {
              q: "How is my data handled?",
              a: <Gated note="add data retention, storage location, and privacy policy reference">Data handling details: TBD</Gated>,
            },
          ]}
          resources={[
            {
              kind: "Explainer",
              title: "What tariff-aware scheduling actually means",
              body: "How GridOS reads your electricity tariff and moves charge and discharge to save you money automatically.",
              to: "/support",
            },
            {
              kind: "Guide",
              title: "Setting your backup reserve: how much to hold back",
              body: "The factors that affect how much charge to protect, and how GridOS enforces it.",
              to: "/support",
            },
            {
              kind: "Overview",
              title: "GridOS fleet view for installers and commercial sites",
              body: "How the multi-site dashboard works and what a fleet manager sees across a portfolio of systems.",
              to: "/support",
            },
          ]}
          tone="deep"
        />

        <FramedCTA
          title="Storage is the hardware. GridOS is the reason it pays."
          sub="Book a survey and we will show you the console with your own numbers."
          primary={{ label: "Book a free site survey", to: "/contact" }}
          secondary={{ label: "Explore the range", to: "/products" }}
        />
      </main>

      <SolutionDock
        label="GridOS"
        links={DOCK_LINKS}
        secondary={{ label: "Hardware range", to: "/products" }}
        primary={{ label: "Get a quote", to: "/contact" }}
      />
    </div>
  );
}
