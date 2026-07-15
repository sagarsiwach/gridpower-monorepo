/*
  /economics — how storage pays back.

  Covers tariff arbitrage, solar self-use, backup value, and subsidies.
  HARD RULE: every financial figure (payback period, savings amount, subsidy
  percentage, tariff rate, kWh numbers) MUST go through <Gated>. The model
  is explained qualitatively; real numbers come at the site survey.
  No fabricated claims. This is strictly the most integrity-sensitive page.
*/

import type { MetaFunction } from "react-router";
import {
  CurrencyInr,
  SolarPanel,
  Shield,
  CalendarBlank,
  ArrowsCounterClockwise,
  ChartLineUp,
  Check,
  Info,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { Gated } from "../components/solutions/light/Blocks";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, FONT, MONO } from "../components/solutions/light/atoms";
import { FaqResources, HowItWorks } from "../components/solutions/light/Modules";
import { TrustBar, FramedCTA } from "../components/solutions/light/Blocks";

export const meta: MetaFunction = () => [
  { title: "Economics of home storage — GridEnergy" },
  { name: "description", content: "How home battery storage pays back through tariff arbitrage, solar self-use, backup value, and subsidies. Real numbers at the site survey." },
];

const MODELS: {
  icon: typeof CurrencyInr;
  title: string;
  tag: string;
  body: string;
  bullets: string[];
}[] = [
  {
    icon: CalendarBlank,
    title: "Tariff arbitrage",
    tag: "Off-peak charging",
    body: "Electricity tariffs vary across the day. Storage lets you charge from cheap, off-peak power and use that stored power during expensive peak hours, reducing what you pay per unit.",
    bullets: [
      "Charge at off-peak rates overnight or mid-day",
      "Discharge during morning and evening peaks",
      "GridOS handles the schedule automatically against your tariff",
    ],
  },
  {
    icon: SolarPanel,
    title: "Solar self-use",
    tag: "Solar + storage",
    body: "Without storage, solar power not used immediately is exported to the grid at a low rate, then bought back at a higher rate later. Storage captures that surplus and uses it in your home.",
    bullets: [
      "Store excess solar generation instead of exporting",
      "Use it after sundown when solar is not generating",
      "Reduces grid dependency during expensive peak hours",
    ],
  },
  {
    icon: Shield,
    title: "Backup value",
    tag: "Outage protection",
    body: "Diesel generators are the traditional answer to power cuts. Storage replaces that cost with a system that also saves money daily, rather than one that only runs during cuts and costs money every hour it runs.",
    bullets: [
      "No diesel cost during outages",
      "No noise, no fumes, no servicing",
      "The same hardware that saves money daily also backs you up",
    ],
  },
  {
    icon: ArrowsCounterClockwise,
    title: "Subsidy support",
    tag: "Government schemes",
    body: "Government schemes at both central and state levels may reduce your capital cost. Eligibility depends on your location, system type, and whether solar is included. We verify what applies to your situation.",
    bullets: [
      "Central schemes where applicable",
      "State-level support varies by location",
      "Eligibility confirmed at the site survey",
    ],
  },
];

export default function Economics() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>

        {/* hero */}
        <section
          style={{
            background: tokens.pageBg,
            paddingTop: 88,
            paddingBottom: 76,
            borderBottom: `1px solid ${tokens.hairline}`,
          }}
        >
          <Wrap>
            <div style={{ maxWidth: 740 }}>
              <Rise>
                <div style={{ marginBottom: 20 }}>
                  <Eyebrow>Economics</Eyebrow>
                </div>
              </Rise>
              <Rise delay={0.04}>
                <h1
                  style={{
                    fontFamily: FONT,
                    color: tokens.ink,
                    fontSize: "clamp(36px, 5vw, 58px)",
                    fontWeight: 600,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.02,
                    textWrap: "balance",
                    marginBottom: 20,
                  }}
                >
                  Storage pays back. Here is how the model works.
                </h1>
              </Rise>
              <Rise delay={0.08}>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 18,
                    lineHeight: 1.6,
                    maxWidth: 600,
                    marginBottom: 32,
                  }}
                >
                  There are four ways a battery system earns back its cost: tariff arbitrage,
                  solar self-use, backup value, and subsidies. We explain each model here.
                  Real figures for your system come at the site survey.
                </p>
              </Rise>
              <Rise delay={0.12}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                  <Btn to="/contact" kind="primary">Get real numbers at a site survey</Btn>
                  <Btn to="/solutions/homes" kind="secondary">Explore home storage</Btn>
                </div>
              </Rise>
              <Rise delay={0.14}>
                <GatedNote />
              </Rise>
            </div>
          </Wrap>
        </section>

        {/* trust bar */}
        <TrustBar
          lead="Economics built on LFP longevity"
          items={[
            "Long-life LFP cells",
            "Tariff-aware GridOS",
            "Solar-ready",
            "Subsidy support",
          ]}
        />

        {/* four value models */}
        <Band id="models">
          <div style={{ maxWidth: 620, marginBottom: 52 }}>
            <Rise>
              <div style={{ marginBottom: 16 }}>
                <Eyebrow>Value models</Eyebrow>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <H2 max={560}>Four ways your system earns back its cost.</H2>
            </Rise>
            <Rise delay={0.08}>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  Each model applies differently depending on your tariff, solar setup, and
                  location. Most homes benefit from two or three simultaneously.
                </Lead>
              </div>
            </Rise>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {MODELS.map((m, i) => {
              const Ico = m.icon;
              const reverse = i % 2 === 1;
              return (
                <Rise key={m.title} delay={i * 0.05}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                      gap: 0,
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      borderRadius: 18,
                      overflow: "hidden",
                    }}
                  >
                    {/* tag band */}
                    <div
                      style={{
                        order: reverse ? 2 : 1,
                        background: tokens.pageBgDeep,
                        borderRight: reverse ? undefined : `1px solid ${tokens.hairline}`,
                        borderLeft: reverse ? `1px solid ${tokens.hairline}` : undefined,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 14,
                        padding: "40px 32px",
                        minHeight: 180,
                      }}
                    >
                      <span
                        style={{
                          display: "grid",
                          placeItems: "center",
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          background: tokens.card,
                          border: `1px solid ${tokens.hairline}`,
                        }}
                      >
                        <Ico size={26} weight="duotone" color={tokens.ink} aria-hidden />
                      </span>
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: 10.5,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: tokens.brand,
                          fontWeight: 500,
                        }}
                      >
                        {m.tag}
                      </span>
                    </div>
                    {/* copy */}
                    <div style={{ order: reverse ? 1 : 2, padding: "30px 30px 32px" }}>
                      <h3
                        style={{
                          fontFamily: FONT,
                          color: tokens.ink,
                          fontSize: "clamp(20px, 2.4vw, 26px)",
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                          marginBottom: 12,
                        }}
                      >
                        {m.title}
                      </h3>
                      <p
                        style={{
                          color: tokens.muted,
                          fontSize: 15.5,
                          lineHeight: 1.6,
                          marginBottom: 18,
                          maxWidth: 500,
                        }}
                      >
                        {m.body}
                      </p>
                      <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {m.bullets.map((b) => (
                          <li
                            key={b}
                            style={{ display: "flex", gap: 11, alignItems: "flex-start" }}
                          >
                            <Check
                              size={15}
                              weight="bold"
                              color={tokens.brand}
                              style={{ flexShrink: 0, marginTop: 3 }}
                              aria-hidden
                            />
                            <span
                              style={{ color: tokens.body, fontSize: 14.5, lineHeight: 1.5 }}
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Rise>
              );
            })}
          </div>
        </Band>

        {/* gated numbers — what you would see at survey */}
        <Band tone="deep" id="numbers">
          <div style={{ maxWidth: 620, marginBottom: 48 }}>
            <Rise>
              <div style={{ marginBottom: 16 }}>
                <Eyebrow>The numbers</Eyebrow>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <H2 max={560}>Real figures are built for your home, not copied from a brochure.</H2>
            </Rise>
            <Rise delay={0.08}>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  Every number that matters depends on your tariff, your load, your solar
                  generation, and your location. We size them at the site survey, not before it.
                </Lead>
              </div>
            </Rise>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
              gap: 0,
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {[
              {
                icon: ChartLineUp,
                label: "Typical payback period",
                note: "Computed per home profile — tariff, load, solar size, subsidy",
                sub: "Varies by tariff and load profile",
              },
              {
                icon: CurrencyInr,
                label: "Estimated annual saving",
                note: "Model against your tariff schedule and measured consumption",
                sub: "Depends on tariff spread and discharge strategy",
              },
              {
                icon: ArrowsCounterClockwise,
                label: "Subsidy support available",
                note: "Check PM Surya Ghar / state scheme eligibility at your location",
                sub: "Eligibility confirmed by location and system type",
              },
              {
                icon: Shield,
                label: "Backup hours per charge",
                note: "Sized to your essential or whole-home load at site survey",
                sub: "Depends on system size and your load",
              },
            ].map((stat, i, arr) => {
              const Ico = stat.icon;
              const isLast = i === arr.length - 1;
              return (
                <div
                  key={stat.label}
                  style={{
                    padding: "28px 28px",
                    borderBottom: i < 2 ? `1px solid ${tokens.hairline}` : undefined,
                    borderRight:
                      i % 2 === 0 && !isLast ? `1px solid ${tokens.hairline}` : undefined,
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: tokens.pageBgDeep,
                      border: `1px solid ${tokens.hairline}`,
                      marginBottom: 14,
                    }}
                  >
                    <Ico size={19} weight="duotone" color={tokens.inkMuted} aria-hidden />
                  </span>
                  <div
                    style={{
                      fontFamily: FONT,
                      fontSize: 28,
                      fontWeight: 700,
                      color: tokens.ink,
                      letterSpacing: "-0.02em",
                      marginBottom: 6,
                      display: "flex",
                    }}
                  >
                    <Gated note={stat.note}>&mdash;</Gated>
                  </div>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      fontWeight: 600,
                      color: tokens.ink,
                      marginBottom: 4,
                    }}
                  >
                    {stat.label}
                  </p>
                  <p style={{ color: tokens.muted, fontSize: 12.5, lineHeight: 1.45 }}>
                    {stat.sub}
                  </p>
                </div>
              );
            })}
          </div>

          <Rise delay={0.1}>
            <div
              style={{
                marginTop: 20,
                padding: "16px 20px",
                background: tokens.brandSoft,
                border: `1px solid oklch(0.88 0.030 27)`,
                borderRadius: 12,
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <Info size={16} weight="fill" color={tokens.brand} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden />
              <p style={{ fontSize: 13.5, color: tokens.body, lineHeight: 1.55 }}>
                All figures above are gated because they depend on your specific tariff, load
                profile, solar array size, and applicable subsidies. We will model them precisely
                at your site survey and present them in your proposal before you decide anything.
              </p>
            </div>
          </Rise>
        </Band>

        {/* what drives the numbers */}
        <Band id="drivers">
          <div style={{ maxWidth: 620, marginBottom: 48 }}>
            <Rise>
              <div style={{ marginBottom: 16 }}>
                <Eyebrow>What drives the economics</Eyebrow>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <H2 max={540}>The levers that make a system pay back faster.</H2>
            </Rise>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                title: "Tariff spread",
                body: "The bigger the gap between your off-peak and peak rates, the more arbitrage earns you. Time-of-use tariffs with wide spreads make storage most valuable.",
              },
              {
                title: "Solar array size",
                body: "More solar generation means more surplus to store and use after dark. Storage and solar together remove the export-cheap, import-dear problem completely.",
              },
              {
                title: "Daily load and pattern",
                body: "How much you use and when you use it determines how much you can shift to stored power. Peak-heavy households see the biggest bill impact.",
              },
              {
                title: "System size",
                body: "A larger battery stores more per cycle and covers more backup hours. The right size is the one that matches your load and the depth of the economic benefit.",
              },
              {
                title: "Cell longevity",
                body: "LFP cells hold more of their capacity over time than older chemistries. A longer-lived battery earns more cycles before it needs to be replaced.",
              },
              {
                title: "Subsidy eligibility",
                body: "Central and state schemes can reduce the capital cost, improving the payback period. We confirm what applies to your system and location at the survey.",
              },
            ].map((driver, i) => (
              <Rise key={driver.title} delay={i * 0.04}>
                <div
                  style={{
                    padding: "22px 22px",
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 14,
                    height: "100%",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      background: tokens.brand,
                      marginBottom: 14,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: FONT,
                      fontSize: 16,
                      fontWeight: 600,
                      color: tokens.ink,
                      letterSpacing: "-0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {driver.title}
                  </h3>
                  <p style={{ color: tokens.muted, fontSize: 13.5, lineHeight: 1.55 }}>
                    {driver.body}
                  </p>
                </div>
              </Rise>
            ))}
          </div>
        </Band>

        {/* how you get your numbers */}
        <HowItWorks
          eyebrow="How you get your numbers"
          title="We build the economics for your home before you decide."
          tone="deep"
          steps={[
            {
              t: "Free site survey",
              b: "We assess your load, tariff, solar setup, and roof at your place. No obligation.",
            },
            {
              t: "Custom economic model",
              b: "A real savings model based on your tariff schedule, measured load, and available subsidies.",
            },
            {
              t: "Clear proposal with real figures",
              b: "A sized system, real payback and savings projections, and a quote before you commit to anything.",
            },
          ]}
          media="Economics proposal visual"
        />

        {/* FAQ */}
        <FaqResources
          eyebrow="Economics questions"
          title="What people want to know before the numbers."
          faqs={[
            {
              q: "Why are the numbers gated?",
              a: "Because publishing industry averages here would mislead you. Payback and savings depend entirely on your tariff, load, and solar setup. A number that is right for one home is wrong for another. We model yours specifically at the survey.",
            },
            {
              q: "What tariff do I need to make arbitrage work?",
              a: "Any time-of-use or time-of-day tariff with a meaningful spread between off-peak and peak rates makes arbitrage worth running. We check your tariff at the survey and tell you plainly whether arbitrage adds significant value in your case.",
            },
            {
              q: "Do I need solar to benefit?",
              a: "No. Arbitrage alone can make storage pay back if your tariff spread is large enough. Solar significantly improves the economics when combined, but it is not required.",
            },
            {
              q: "What government subsidies are available?",
              a: "Central and state-level support schemes exist for solar and storage installations. Eligibility depends on your location, system configuration, and whether solar is included. We confirm what applies and how to access it at the site survey.",
            },
            {
              q: "How long does it actually take to pay back?",
              a: <Gated note="Compute payback model per home profile — tariff, load, solar, subsidy, system size">Exact payback figures are computed at the site survey for your specific setup. We do not publish averages here because they are not useful for your decision.</Gated>,
            },
          ]}
        />

        <FramedCTA
          title="Get the real economics for your home."
          sub="Free site survey. We model your tariff, load, and solar and present the figures before you decide anything."
          primary={{ label: "Book a free site survey", to: "/contact" }}
          secondary={{ label: "How home storage works", to: "/resources" }}
        />
      </main>
    </div>
  );
}

/* local note component */
function GatedNote() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "11px 14px",
        background: tokens.brandSoft,
        border: `1px dashed ${tokens.brand}`,
        borderRadius: 10,
        maxWidth: 520,
      }}
    >
      <Info size={14} weight="fill" color={tokens.brand} style={{ flexShrink: 0, marginTop: 1 }} aria-hidden />
      <p style={{ fontSize: 12.5, color: tokens.body, lineHeight: 1.55 }}>
        This page explains the model, not the numbers. Real figures for your system come at the
        site survey, where we have your tariff, load, and solar details.
      </p>
    </div>
  );
}
