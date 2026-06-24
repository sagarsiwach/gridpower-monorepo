/*
  /careers — work at GridEnergy.

  What they are building, how they work, open areas (no fabricated
  headcount, no fake salaries, no invented perks, no fake role titles).
  Applications via /contact.
*/

import type { MetaFunction } from "react-router";
import {
  Wrench,
  Code,
  PencilSimple,
  MapPin,
  Buildings,
  Lightning,
  ArrowRight,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, FONT, MONO } from "../components/solutions/light/atoms";
import { TrustBar, FramedCTA } from "../components/solutions/light/Blocks";

export const meta: MetaFunction = () => [
  { title: "Careers — GridEnergy" },
  { name: "description", content: "Work at GridEnergy. We are building the software platform and field operations behind residential and commercial energy storage in India." },
];

const AREAS: {
  icon: typeof Wrench;
  title: string;
  body: string;
}[] = [
  {
    icon: Code,
    title: "Engineering",
    body: "Backend, frontend, firmware, and infrastructure. Building GridOS, the platform that makes hardware intelligent, and the tools that keep it running across thousands of installations.",
  },
  {
    icon: PencilSimple,
    title: "Design",
    body: "Product design, UX, and brand. The GridOS app, the installer console, and every surface a customer or partner touches. Clear thinking, honest communication, built to last.",
  },
  {
    icon: Wrench,
    title: "Field operations",
    body: "Installation, commissioning, and field support. The people who put the hardware in and the software live. Authorised, trained, and the front line of what the product actually delivers.",
  },
];

const PRINCIPLES: string[] = [
  "We say what the system actually does, not what sounds impressive in a brochure.",
  "Software is the moat, not hardware margin. We build to that conviction.",
  "Numbers that are not verified are not published. Real figures beat confident estimates.",
  "A simpler system that is fully understood is better than a complex one nobody can explain.",
  "We want the grid to matter less for every home we serve.",
];

export default function Careers() {
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
            <div style={{ maxWidth: 720 }}>
              <Rise>
                <div style={{ marginBottom: 20 }}>
                  <Eyebrow>Careers</Eyebrow>
                </div>
              </Rise>
              <Rise delay={0.04}>
                <h1
                  style={{
                    fontFamily: FONT,
                    color: tokens.ink,
                    fontSize: "clamp(34px, 5vw, 56px)",
                    fontWeight: 600,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.03,
                    textWrap: "balance",
                    marginBottom: 20,
                  }}
                >
                  Build the energy system Indian homes will run on.
                </h1>
              </Rise>
              <Rise delay={0.08}>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 18,
                    lineHeight: 1.6,
                    maxWidth: 580,
                    marginBottom: 32,
                  }}
                >
                  We are building the software platform and field operations behind residential
                  and commercial energy storage. If you want your work to be something people
                  depend on daily, come build it with us.
                </p>
              </Rise>
              <Rise delay={0.12}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <Btn to="/contact" kind="primary">Apply via contact</Btn>
                  <Btn to="/solutions/homes" kind="secondary">See what we build</Btn>
                </div>
              </Rise>
            </div>
          </Wrap>
        </section>

        {/* trust bar */}
        <TrustBar
          lead="A company with a clear point of view"
          items={[
            "Software-first energy platform",
            "LFP hardware",
            "Open ecosystem",
            "GridOS",
          ]}
        />

        {/* what we are building */}
        <Band id="mission">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: 52,
              alignItems: "center",
            }}
          >
            <Rise>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow>What we are building</Eyebrow>
                </div>
                <H2 max={480}>
                  A platform that makes the grid optional, one home at a time.
                </H2>
                <div style={{ marginTop: 16 }}>
                  <Lead>
                    GridEnergy is building the residential and commercial energy storage platform
                    for India. Safe LFP hardware, open standards, and GridOS as the software layer
                    that turns a battery into a system that saves money and provides real backup.
                  </Lead>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Lead>
                    The market is large, the hardware is becoming a commodity, and software is
                    where the real value lives. We are building to that thesis from the start.
                  </Lead>
                </div>
              </div>
            </Rise>

            <Rise delay={0.08}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  {
                    icon: Lightning,
                    label: "GridOS",
                    desc: "The software platform that manages every system we install.",
                  },
                  {
                    icon: MapPin,
                    label: "Field operations",
                    desc: "Authorised installation and commissioning across India.",
                  },
                  {
                    icon: Buildings,
                    label: "Homes and businesses",
                    desc: "Residential and commercial storage, sized and built for the real load.",
                  },
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
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Rise>
          </div>
        </Band>

        {/* open areas */}
        <Band tone="deep" id="areas">
          <div style={{ maxWidth: 620, marginBottom: 48 }}>
            <Rise>
              <div style={{ marginBottom: 16 }}>
                <Eyebrow>Where we are hiring</Eyebrow>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <H2 max={520}>
                We are hiring across design, engineering, and field operations.
              </H2>
            </Rise>
            <Rise delay={0.08}>
              <div style={{ marginTop: 16 }}>
                <Lead>
                  We do not list specific roles here because we hire for fit and for the work
                  itself, not for a job description. Tell us what you do and what you want to
                  build.
                </Lead>
              </div>
            </Rise>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: 18,
            }}
          >
            {AREAS.map((area, i) => {
              const Ico = area.icon;
              return (
                <Rise key={area.title} delay={i * 0.05}>
                  <div
                    style={{
                      height: "100%",
                      padding: 26,
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      borderRadius: 16,
                    }}
                  >
                    <span
                      style={{
                        display: "grid",
                        placeItems: "center",
                        width: 46,
                        height: 46,
                        borderRadius: 13,
                        background: tokens.pageBgDeep,
                        border: `1px solid ${tokens.hairline}`,
                        marginBottom: 18,
                      }}
                    >
                      <Ico size={22} weight="duotone" color={tokens.ink} aria-hidden />
                    </span>
                    <h3
                      style={{
                        fontFamily: FONT,
                        fontSize: 18,
                        fontWeight: 600,
                        color: tokens.ink,
                        letterSpacing: "-0.015em",
                        marginBottom: 10,
                      }}
                    >
                      {area.title}
                    </h3>
                    <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.6 }}>
                      {area.body}
                    </p>
                  </div>
                </Rise>
              );
            })}
          </div>

          <Rise delay={0.18}>
            <div
              style={{
                marginTop: 32,
                padding: "20px 24px",
                background: tokens.pageBg,
                border: `1px solid ${tokens.hairline}`,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: tokens.inkMuted,
                    marginBottom: 4,
                  }}
                >
                  Apply
                </p>
                <p style={{ fontSize: 15, fontWeight: 600, color: tokens.ink }}>
                  Send us your work and a note on what you want to build.
                </p>
              </div>
              <Btn to="/contact" kind="primary">Apply via contact form</Btn>
            </div>
          </Rise>
        </Band>

        {/* principles */}
        <Band id="principles">
          <div style={{ maxWidth: 620, marginBottom: 48 }}>
            <Rise>
              <div style={{ marginBottom: 16 }}>
                <Eyebrow>How we work</Eyebrow>
              </div>
            </Rise>
            <Rise delay={0.04}>
              <H2 max={500}>The things we hold to, plainly said.</H2>
            </Rise>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PRINCIPLES.map((p, i) => (
              <Rise key={i} delay={i * 0.05}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    padding: "20px 0",
                    borderBottom: `1px solid ${tokens.hairline}`,
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: i === 0 ? tokens.ink : tokens.pageBgDeep,
                      border: `1px solid ${i === 0 ? "transparent" : tokens.hairline}`,
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 12,
                        fontWeight: 700,
                        color: i === 0 ? "#fff" : tokens.inkMuted,
                      }}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 16.5,
                      fontWeight: i === 0 ? 600 : 400,
                      color: tokens.body,
                      lineHeight: 1.55,
                      maxWidth: 680,
                    }}
                  >
                    {p}
                  </p>
                </div>
              </Rise>
            ))}
          </div>
        </Band>

        {/* location note */}
        <Band tone="deep" id="location">
          <Rise>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                maxWidth: 680,
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: tokens.card,
                  border: `1px solid ${tokens.hairline}`,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <MapPin size={22} weight="duotone" color={tokens.ink} aria-hidden />
              </span>
              <div>
                <h2
                  style={{
                    fontFamily: FONT,
                    fontSize: "clamp(20px, 2.6vw, 28px)",
                    fontWeight: 600,
                    color: tokens.ink,
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                  }}
                >
                  Where we operate
                </h2>
                <p style={{ color: tokens.muted, fontSize: 15.5, lineHeight: 1.6, maxWidth: 520 }}>
                  We work across India. Field operations roles are location-specific by nature.
                  Engineering and design roles may have flexibility. Tell us where you are when
                  you reach out and we will discuss what is possible.
                </p>
              </div>
            </div>
          </Rise>
        </Band>

        <FramedCTA
          title="Want to build energy infrastructure that matters?"
          sub="Send us your work and a note on what you want to build. No formal application process."
          primary={{ label: "Get in touch", to: "/contact" }}
          secondary={{ label: "What we build", to: "/solutions/homes" }}
        />
      </main>
    </div>
  );
}
