/*
  /app — GridOS mobile app showcase.

  Control and monitor your energy storage from your phone.
  App-store-style page built from the canonical block vocabulary:
  olive + GridRed, Inter, inline tokens, Rise/Band/Wrap/Media/Gated.
  No fake download counts, no fake ratings, no fake store badges.
*/

import type { MetaFunction } from "react-router";
import {
  BatteryCharging,
  SolarPanel,
  Bell,
  CalendarBlank,
  ChartLine,
  ShieldCheck,
  DeviceMobile,
  WifiHigh,
  Check,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, Media, FONT, MONO } from "../components/solutions/light/atoms";
import { HowItWorks, FaqResources } from "../components/solutions/light/Modules";
import { TrustBar, OutcomeGrid, AppShowcase, FramedCTA } from "../components/solutions/light/Blocks";

export const meta: MetaFunction = () => [
  { title: "GridOS app — GridEnergy" },
  { name: "description", content: "Control and monitor your home energy storage from your phone. Live charge state, grid and solar, backup reserve, tariff scheduling, and alerts." },
];

const FEATURES: { icon: typeof BatteryCharging; title: string; body: string }[] = [
  {
    icon: BatteryCharging,
    title: "Live state of charge",
    body: "See exactly how much power your battery holds, what is coming in from solar, and what is going out to your home and grid, updated in real time.",
  },
  {
    icon: SolarPanel,
    title: "Solar and grid flow",
    body: "Watch your solar generation and grid import or export live, so you know when you are running on your own power and when the grid is contributing.",
  },
  {
    icon: ShieldCheck,
    title: "Backup reserve",
    body: "GridOS holds a reserve you set aside for outages and never discharges below it for bill savings. Your backup capacity is always protected.",
  },
  {
    icon: CalendarBlank,
    title: "Tariff scheduling",
    body: "Tell GridOS your tariff schedule and it charges from cheap off-peak power and discharges during expensive peak hours, automatically.",
  },
  {
    icon: Bell,
    title: "Outage and fault alerts",
    body: "Instant notifications when the grid goes down, when your system switches over, and when anything needs attention.",
  },
  {
    icon: ChartLine,
    title: "Savings history",
    body: "See what you have saved against a grid-only baseline over the past day, week, and month, so you know the system is earning its keep.",
  },
];

export default function AppPage() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>

        {/* hero */}
        <section
          style={{
            background: tokens.pageBg,
            paddingTop: 88,
            paddingBottom: 80,
            borderBottom: `1px solid ${tokens.hairline}`,
          }}
        >
          <Wrap>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
                gap: 52,
                alignItems: "center",
              }}
            >
              <Rise>
                <div>
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
                      marginBottom: 20,
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
                    GridOS
                  </span>
                  <h1
                    style={{
                      fontFamily: FONT,
                      color: tokens.ink,
                      fontSize: "clamp(36px, 5vw, 58px)",
                      fontWeight: 600,
                      letterSpacing: "-0.035em",
                      lineHeight: 1.03,
                      textWrap: "balance",
                      marginBottom: 20,
                    }}
                  >
                    Your energy system,<br />in your pocket.
                  </h1>
                  <p
                    style={{
                      color: tokens.muted,
                      fontSize: 18,
                      lineHeight: 1.6,
                      maxWidth: 480,
                      marginBottom: 32,
                    }}
                  >
                    GridOS puts live charge state, solar and grid flow, backup reserve, tariff
                    scheduling, and alerts right in your hand. One app for the whole system.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                    <Btn to="/contact" kind="primary">Get started with GridOS</Btn>
                    <Btn to="/solutions/homes" kind="secondary">Explore solutions</Btn>
                  </div>
                  {/* availability note — no fake badges */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "9px 14px",
                      borderRadius: 10,
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                    }}
                  >
                    <DeviceMobile size={16} weight="duotone" color={tokens.inkMuted} aria-hidden />
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 11.5,
                        letterSpacing: "0.04em",
                        color: tokens.inkMuted,
                        fontWeight: 500,
                      }}
                    >
                      Coming to iOS and Android
                    </span>
                  </div>
                </div>
              </Rise>

              <Rise delay={0.1}>
                <Media
                  caption="GridOS app — live dashboard"
                  ratio="3 / 3.8"
                  radius={28}
                  depth
                />
              </Rise>
            </div>
          </Wrap>
        </section>

        {/* trust bar */}
        <TrustBar
          lead="Software that makes the hardware worth buying"
          items={[
            "Live monitoring",
            "Tariff-aware scheduling",
            "Backup reserve protection",
            "Outage alerts",
          ]}
        />

        {/* feature grid */}
        <Band id="features">
          <div style={{ maxWidth: 620, marginBottom: 52 }}>
            <Rise>
              <div style={{ marginBottom: 16 }}>
                <Eyebrow>What it does</Eyebrow>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <H2 max={540}>Everything your system is doing, live on your phone.</H2>
            </Rise>
            <Rise delay={0.08}>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  GridOS is the software layer that most installers leave out. It turns a battery
                  into a system that saves money, protects you through outages, and shows you
                  exactly what it is doing.
                </Lead>
              </div>
            </Rise>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 18,
            }}
          >
            {FEATURES.map((f, i) => {
              const Ico = f.icon;
              return (
                <Rise key={f.title} delay={i * 0.04}>
                  <div
                    style={{
                      height: "100%",
                      padding: 24,
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      borderRadius: 16,
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
                        marginBottom: 16,
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
                        letterSpacing: "-0.01em",
                        marginBottom: 8,
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        color: tokens.muted,
                        fontSize: 14,
                        lineHeight: 1.55,
                      }}
                    >
                      {f.body}
                    </p>
                  </div>
                </Rise>
              );
            })}
          </div>
        </Band>

        {/* installer / fleet section */}
        <Band tone="deep" id="installers">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
              gap: 52,
              alignItems: "center",
            }}
          >
            <Rise delay={0.06}>
              <Media caption="GridOS fleet dashboard" ratio="4 / 3.2" radius={20} depth />
            </Rise>
            <Rise>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow>For installers</Eyebrow>
                </div>
                <h2
                  style={{
                    fontFamily: FONT,
                    color: tokens.ink,
                    fontSize: "clamp(24px, 3vw, 34px)",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    marginBottom: 16,
                    textWrap: "balance",
                  }}
                >
                  Manage your whole fleet from one screen.
                </h2>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 16.5,
                    lineHeight: 1.6,
                    maxWidth: 460,
                    marginBottom: 24,
                  }}
                >
                  GridOS gives installers a single console to monitor every system they have
                  commissioned, see health and alerts, and resolve issues remotely without a site
                  visit.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {[
                    "Fleet overview with live status",
                    "Remote diagnostics and configuration",
                    "Customer system visibility shared via app",
                    "Alert routing to your team",
                  ].map((b) => (
                    <li
                      key={b}
                      style={{ display: "flex", gap: 11, alignItems: "flex-start" }}
                    >
                      <Check
                        size={16}
                        weight="bold"
                        color={tokens.brand}
                        style={{ flexShrink: 0, marginTop: 3 }}
                        aria-hidden
                      />
                      <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 28 }}>
                  <Btn to="/contact" kind="secondary">
                    Talk to us about installer access
                  </Btn>
                </div>
              </div>
            </Rise>
          </div>
        </Band>

        {/* remote monitoring always-on */}
        <Band id="connectivity">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
              gap: 52,
              alignItems: "center",
            }}
          >
            <Rise>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow>Always connected</Eyebrow>
                </div>
                <h2
                  style={{
                    fontFamily: FONT,
                    color: tokens.ink,
                    fontSize: "clamp(24px, 3vw, 34px)",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    marginBottom: 16,
                    textWrap: "balance",
                  }}
                >
                  Remote access without a home server.
                </h2>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 16.5,
                    lineHeight: 1.6,
                    maxWidth: 460,
                    marginBottom: 24,
                  }}
                >
                  GridOS connects your system to the cloud through the hardware gateway installed
                  with your battery. No home server, no port forwarding. Check in from anywhere.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                  {[
                    "Works over your home Wi-Fi or LTE",
                    "Data encrypted in transit",
                    "Push notifications for outages and faults",
                    "Check status from anywhere",
                  ].map((b) => (
                    <li
                      key={b}
                      style={{ display: "flex", gap: 11, alignItems: "flex-start" }}
                    >
                      <Check
                        size={16}
                        weight="bold"
                        color={tokens.brand}
                        style={{ flexShrink: 0, marginTop: 3 }}
                        aria-hidden
                      />
                      <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Rise>
            <Rise delay={0.08}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {[
                  { icon: WifiHigh, label: "Connected via home Wi-Fi", sub: "Secured, cloud-relayed" },
                  { icon: ShieldCheck, label: "Encrypted in transit", sub: "TLS on all GridOS communications" },
                  { icon: Bell, label: "Push notifications", sub: "Outages, faults, reserve alerts" },
                ].map((item) => {
                  const Ico = item.icon;
                  return (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        padding: "18px 20px",
                        background: tokens.card,
                        border: `1px solid ${tokens.hairline}`,
                        borderRadius: 14,
                      }}
                    >
                      <span
                        style={{
                          display: "grid",
                          placeItems: "center",
                          width: 42,
                          height: 42,
                          borderRadius: 11,
                          background: tokens.pageBgDeep,
                          border: `1px solid ${tokens.hairline}`,
                          flexShrink: 0,
                        }}
                      >
                        <Ico size={20} weight="duotone" color={tokens.ink} aria-hidden />
                      </span>
                      <div>
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: 15,
                            fontWeight: 600,
                            color: tokens.ink,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {item.label}
                        </p>
                        <p style={{ color: tokens.muted, fontSize: 13, marginTop: 2 }}>
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Rise>
          </div>
        </Band>

        {/* how it becomes yours */}
        <HowItWorks
          eyebrow="Getting access"
          title="GridOS comes with your system."
          tone="deep"
          steps={[
            {
              t: "System installed and commissioned",
              b: "Your authorised installer sets up your battery, inverter, and the GridOS gateway.",
            },
            {
              t: "Account created for you",
              b: "We create your GridOS account and walk you through the app at commissioning.",
            },
            {
              t: "Live from day one",
              b: "Open the app and see your system in real time. Tariff scheduling and alerts are ready to configure.",
            },
          ]}
          media="GridOS onboarding flow"
        />

        {/* FAQ */}
        <FaqResources
          eyebrow="Questions about GridOS"
          title="What people ask before going live."
          faqs={[
            {
              q: "Does GridOS work without an internet connection?",
              a: "Your battery and inverter continue to operate normally if the internet drops. GridOS will not show live data during the outage, but the hardware keeps running. Data syncs when connectivity returns.",
            },
            {
              q: "Can I share access with a family member?",
              a: "Multiple accounts per system are on the roadmap. For now, one account per system is created at install.",
            },
            {
              q: "Can my installer see my system data?",
              a: "Installers can request fleet-level visibility for remote support. You are notified and can revoke access.",
            },
            {
              q: "Is GridOS available now?",
              a: "GridOS is live and commissioned with every system installation. The standalone mobile app is coming to iOS and Android.",
            },
            {
              q: "What if I lose access to my account?",
              a: "Contact us and we will help you recover access. Your system keeps running independently of your account.",
            },
          ]}
        />

        <FramedCTA
          title="Ready to put your energy system in your pocket?"
          sub="Book a site survey and get GridOS with your installation."
          primary={{ label: "Book a free site survey", to: "/contact" }}
          secondary={{ label: "Explore home storage", to: "/solutions/homes" }}
        />
      </main>
    </div>
  );
}
