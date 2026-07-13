/*
  /solutions/homes/apartment — the deep apartment spoke.

  Reworked to the 12-band, 4-act arc from P-028 doc 08 §4.4. The stance is
  reversed from the old page: it no longer answers "does it fit your flat? yes"
  before earning it. Fit is a site question, answered by a survey, not promised
  in a headline. That honesty is the trust differentiator.

  Acts: (1) the story — hero + the 7pm scene; (2) the showcase — what it runs,
  the Nano in your flat, a day on GridOS; (3) the technical truth — the site-fit
  reality, the gated sizing; (4) economics + close — what decides cost (gated),
  three visits, the lead capture, final close.

  Hard rules held: every number routes through <Gated>; product class is Nano
  (GE 5x5S), never "Powerwall"/"Container"; no price, no payback, no warranty
  figure shown. Global header + footer come from root.tsx.

  Lead form (band 11) validates client-side and shows a confirmation. Persistence
  is SAG-3350 (Todo) — the form is real UI, it does not yet POST to a backend.
*/

import { useState, type ReactNode, type CSSProperties } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Lightbulb, WifiHigh, Television, Snowflake, Fan, Drop,
  Wall, SpeakerSimpleX, DeviceMobile, ShieldCheck, ArrowLeft, Check, Lightning, ArrowRight,
  Plugs, Gauge, MapPin, Wind, Buildings, Circuitry, Sun, Wrench, CurrencyInr,
  SunHorizon, CloudSun, MoonStars, PaperPlaneTilt, CheckCircle, Receipt,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { Wrap, Rise, Band, Eyebrow, H2, Lead, Btn, Media, FONT, MONO } from "../../components/solutions/light/atoms";
import { PowersGrid, FramedCTA } from "../../components/solutions/light/Blocks";
import { HowItWorks, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Apartment storage — GridEnergy" },
  { name: "description", content: "Backup for your flat, sized to your flat. A wall-mounted Nano keeps your essentials and one room AC through every cut, run from GridOS. Whether it fits is a site question we answer with a survey. Book one." },
];

const DOCK_LINKS: DockLink[] = [
  { id: "powers", label: "What it runs" },
  { id: "product", label: "The Nano" },
  { id: "fit", label: "The fit" },
  { id: "system", label: "Sizing" },
  { id: "survey", label: "Book a survey" },
];

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function SolutionsApartment() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        {/* ---- ACT 1 · THE STORY ---- */}
        <ApartmentHero />
        <SevenPMScene />

        {/* ---- ACT 2 · THE SHOWCASE ---- */}
        <PowersGrid
          label="What it runs"
          title="The circuits you actually miss in a cut."
          intro="The Nano carries your essential circuits and typically one room AC. The exact set, and how long it holds, is confirmed against your meter and load at the survey."
          items={[
            { icon: Lightbulb, label: "Lights" },
            { icon: Fan, label: "Fans" },
            { icon: WifiHigh, label: "Wi-Fi & router" },
            { icon: DeviceMobile, label: "Phones & laptops" },
            { icon: Television, label: "TV & entertainment" },
            { icon: Drop, label: "Water pump" },
            { icon: Snowflake, label: "One room AC" },
            { icon: ShieldCheck, label: "Door & alarm" },
          ]}
          note={<>If the society buys, the lift lobby and common lights can ride through cuts too. The exact set on your flat is confirmed at the survey.</>}
        />

        <ProductInFlat />
        <GridOSDay />

        {/* ---- ACT 3 · THE TECHNICAL TRUTH ---- */}
        <SiteFitReality />
        <SizingGated />

        <FaqResources
          eyebrow="Apartment questions"
          title="What flat owners ask first."
          lead="The objections specific to living in a society, answered honestly."
          faqs={[
            { q: "Will it actually run my AC?", a: "The Nano is sized to carry your essential circuits and typically one room AC. Whether that is your bedroom or living-room unit, and for how long, is confirmed against your meter and load at the survey before you commit." },
            { q: "Where does it physically go in a flat?", a: "It is wall-mounted and compact, designed for a utility wall, a service balcony, or a passage nook. No plant room, no sacrificed floor space, no balcony given up to a genset." },
            { q: "I rent. Is it worth it?", a: "The Nano is wall-mounted and removable, not a built-in like a fixed inverter bank. It can be uninstalled and remounted if you move. At the survey we cover what a clean removal looks like so it stays your asset, not the flat's." },
            { q: "I already have a DG / building backup. Why this?", a: "A society DG runs the common areas and a few points, on diesel, when it starts. The Nano backs up your flat's own circuits, silently, the instant the grid drops, with no fuel cost per hour. It can sit behind a building DG or replace a personal one." },
            { q: "Does my society need to approve it?", a: "It is silent and fume-free with no genset, so it raises none of the noise or exhaust objections a generator does. Most RWAs treat it like any sealed appliance. Where an NOC or intimation is asked for, we hand you the spec sheet and help with the paperwork at the survey." },
            { q: "What does the survey actually check?", a: "Six things: your phase, your sanctioned load, where the unit mounts, ventilation, society approval, and how your backup circuits separate from the rest. Six questions, one visit, all answered before you pay anything." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycle terms once sourced">Exact years and cycle terms confirmed before you sign.</Gated> },
          ]}
          resources={[
            { kind: "Checklist", title: "Is your flat ready for storage?", body: "The meter, wiring, and mount-point questions worth checking before you book a survey.", to: "/support" },
            { kind: "Guide", title: "Storage when you rent", body: "How a wall-mounted Nano stays your asset, and what a clean remount looks like if you move.", to: "/support" },
            { kind: "Explainer", title: "Nano vs a society DG", body: "Where building backup ends and your own silent, per-circuit backup begins.", to: "/support" },
          ]}
        />

        {/* ---- ACT 4 · ECONOMICS + CLOSE ---- */}
        <CostGated />

        <HowItWorks
          eyebrow="Three visits"
          title="From enquiry to your app, in three visits."
          media="Apartment survey + install visual"
          steps={[
            { t: "Free site survey", b: "We read your meter, map your essential circuits, and pick the mount point. We flag the society documents you will need before we quote." },
            { t: "Right-sized proposal", b: "One Nano sized to your circuits, the honest economics, and a fixed quote. No upsell to capacity a flat does not need." },
            { t: "Single-visit install & app", b: "Authorised install and commissioning, then GridOS set up on your phone the same day." },
          ]}
        />

        <SurveyForm />

        <FramedCTA
          title="Confirm the fit for your flat."
          sub="The survey is free, the sizing is honest, and we help with the society paperwork. No obligation to buy."
          primary={{ label: "Book a free site survey", to: "#survey" }}
          secondary={{ label: "Back to all home solutions", to: "/solutions/homes" }}
        />
      </main>

      <SolutionDock label="Apartment storage" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Book a survey", to: "#survey" }} />
    </div>
  );
}

/* ================================================================== */
/*  ACT 1 · Band 1 — Hero (stance reversal, tagged-card identity)      */
/* ================================================================== */

const HERO_POINTS = [
  "Wall-mounted, no plant room or floor space given up",
  "Silent sealed LFP, nothing the society can object to",
  "Essentials plus one room AC, sized at the survey, run from GridOS",
];

function ApartmentHero() {
  return (
    <section style={{ background: tokens.pageBg, paddingTop: 72, paddingBottom: 88, borderBottom: `1px solid ${tokens.hairline}` }}>
      <Wrap>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 56, alignItems: "center" }}>
          <Rise>
            <div>
              <Link to="/solutions/homes" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: tokens.inkMuted, textDecoration: "none" }}>
                <ArrowLeft size={13} weight="bold" />All home solutions
              </Link>

              <div style={{ maxWidth: 480, borderRadius: 22, boxShadow: "0 2px 4px oklch(15.3% 0.006 107.1 / 0.05), 0 34px 80px -42px oklch(15.3% 0.006 107.1 / 0.5)" }}>
                <div style={{ background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: "22px 22px 0 0", padding: "12px 24px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.01em", color: tokens.inkMuted }}>
                    <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
                    Apartments & flats
                  </span>
                </div>

                <div style={{ background: tokens.card, borderLeft: `1px solid ${tokens.hairline}`, borderRight: `1px solid ${tokens.hairline}`, borderBottom: `1px solid ${tokens.hairline}`, borderRadius: "0 0 22px 22px", padding: "22px 24px 26px" }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>Apartment energy storage</span>
                  <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(28px,3.4vw,40px)", fontWeight: 600, letterSpacing: "-0.034em", lineHeight: 1.04, marginTop: 10, textWrap: "balance" }}>
                    Backup for your flat. Sized to your flat.
                  </h1>
                  <p style={{ color: tokens.body, fontSize: 15.5, lineHeight: 1.55, marginTop: 12, maxWidth: "46ch" }}>
                    A wall-mounted Nano keeps your essentials, and one room cool, running through every cut. Whether it fits your building is a site question, and we answer it with a survey, not a promise.
                  </p>

                  <div style={{ height: 1, background: tokens.hairline, margin: "18px 0" }} />

                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
                    {HERO_POINTS.map((p) => (
                      <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span aria-hidden style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 18, height: 18, borderRadius: 999, background: tokens.brandSoft, marginTop: 1 }}>
                          <Check size={11} weight="bold" color={tokens.brand} />
                        </span>
                        <span style={{ fontFamily: FONT, fontSize: 13.5, lineHeight: 1.4, color: tokens.body }}>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                    <HeroBtn to="#survey" primary>Book a free site survey</HeroBtn>
                    <HeroBtn to="#powers">See what it runs</HeroBtn>
                  </div>
                </div>
              </div>
            </div>
          </Rise>

          <Rise delay={0.1}>
            <div style={{ aspectRatio: "4 / 3.3", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 22, display: "grid", placeItems: "center", overflow: "hidden", boxShadow: "0 28px 64px -38px oklch(15.3% 0.006 107.1 / 0.4)" }}>
              <div style={{ textAlign: "center", padding: 20 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>Nano on a flat utility wall</span>
                <p style={{ fontFamily: MONO, fontSize: 9, color: tokens.brand, marginTop: 6, letterSpacing: "0.1em" }}>ASSET TBD</p>
              </div>
            </div>
          </Rise>
        </div>
      </Wrap>
    </section>
  );
}

function HeroBtn({ to, children, primary }: { to: string; children: ReactNode; primary?: boolean }) {
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 13.5, fontWeight: 600,
    letterSpacing: "-0.005em", borderRadius: 12, padding: "11px 18px", textDecoration: "none", cursor: "pointer",
    border: "1px solid transparent",
  };
  const style: CSSProperties = primary
    ? { ...base, background: tokens.brand, color: "#fff" }
    : { ...base, background: tokens.card, color: tokens.ink, borderColor: tokens.hairlineStrong };
  return (
    <a href={to} style={style}>
      {primary && <Lightning size={13} weight="fill" />}
      {children}
      <ArrowRight size={12} weight="bold" />
    </a>
  );
}

/* ================================================================== */
/*  ACT 1 · Band 2 — The 7pm scene (night band, no product named)      */
/* ================================================================== */

const SCENE_BEATS: { t: string; b: string }[] = [
  { t: "The cut lands.", b: "The inverter picks up two fans and the lights drop to half. The room goes quiet in the wrong way." },
  { t: "The call goes with it.", b: "The router blinks out. The work call you were on is gone, and so is the next twenty minutes finding signal on your phone." },
  { t: "Hour two, warm.", b: "The fridge has been off since the lights went. By the time power is back, what was cold is a question." },
];

function SevenPMScene() {
  return (
    <section style={{ background: tokens.ink, paddingBlock: 104 }}>
      <Wrap>
        <Rise>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
            <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
            7:42 PM, a Tuesday
          </span>
        </Rise>
        <Rise delay={0.05}>
          <h2 style={{ fontFamily: FONT, color: "#fff", fontSize: "clamp(28px,3.8vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, marginTop: 18, maxWidth: "20ch", textWrap: "balance" }}>
            You know this evening. The grid drops, and the flat starts losing things one at a time.
          </h2>
        </Rise>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 18, marginTop: 48 }}>
          {SCENE_BEATS.map((s, i) => (
            <Rise key={s.t} delay={0.08 + i * 0.06}>
              <div style={{ height: "100%", padding: "26px 24px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16 }}>
                <span aria-hidden style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: tokens.brand, letterSpacing: "0.1em" }}>{`0${i + 1}`}</span>
                <h3 style={{ fontFamily: FONT, color: "#fff", fontSize: 18, fontWeight: 600, marginTop: 12, letterSpacing: "-0.015em" }}>{s.t}</h3>
                <p style={{ color: "rgba(255,255,255,0.66)", fontSize: 14.5, lineHeight: 1.6, marginTop: 8 }}>{s.b}</p>
              </div>
            </Rise>
          ))}
        </div>

        <Rise delay={0.3}>
          <p style={{ fontFamily: FONT, color: "#fff", fontSize: "clamp(19px,2.2vw,24px)", fontWeight: 500, lineHeight: 1.4, marginTop: 44, maxWidth: "34ch", letterSpacing: "-0.01em", textWrap: "balance" }}>
            A flat does not need a generator. It needs a few circuits that never notice the cut.
          </p>
        </Rise>
      </Wrap>
    </section>
  );
}

/* ================================================================== */
/*  ACT 2 · Band 4 — The product, in your flat (Nano showcase)         */
/* ================================================================== */

const FIT_ITEMS: { icon: typeof Wall; title: string; body: string }[] = [
  { icon: Wall, title: "Mounts on a wall you already have", body: "A utility wall, a service balcony, or a passage nook takes it. No plant room, no floor space sacrificed, no balcony given up to a genset." },
  { icon: SpeakerSimpleX, title: "Silent and fume-free in a society", body: "Sealed LFP, no combustion, no exhaust. Nothing the neighbours hear and nothing the RWA can object to the way they would a diesel set." },
  { icon: DeviceMobile, title: "Run the whole thing from GridOS", body: "State of charge, the reserve held for the next cut, and outage alerts, live on your phone. The platform is live, not a roadmap promise." },
  { icon: ShieldCheck, title: "Removable, so it stays your asset", body: "Wall-mounted and uninstallable, not a built-in. If you rent or move, it comes with you. A clean remount is covered at the survey." },
];

function ProductInFlat() {
  return (
    <Band tone="deep" id="product">
      <div style={{ maxWidth: 720, marginBottom: 44 }}>
        <Rise><div style={{ marginBottom: 16 }}><Eyebrow>The product</Eyebrow></div></Rise>
        <Rise delay={0.04}><H2 max={640}>The Nano, on a wall you already have.</H2></Rise>
        <Rise delay={0.08}>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}>
            <Lead>One sealed unit, wired to your essential circuits. No reconstruction, no dedicated room, nothing diesel on the balcony.</Lead>
          </div>
        </Rise>
        <Rise delay={0.12}>
          <div style={{ marginTop: 22 }}>
            <Btn to="/products/nano" kind="secondary">See the Nano</Btn>
          </div>
        </Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: 18 }}>
        {FIT_ITEMS.map((o, i) => {
          const Ico = o.icon;
          return (
            <Rise key={o.title} delay={i * 0.03}>
              <div style={{ height: "100%", padding: 24, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16 }}>
                <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
                  <Ico size={22} weight="duotone" color={tokens.ink} />
                </span>
                <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 17, fontWeight: 600, marginTop: 16, letterSpacing: "-0.01em" }}>{o.title}</h3>
                <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 7 }}>{o.body}</p>
              </div>
            </Rise>
          );
        })}
      </div>
    </Band>
  );
}

/* ================================================================== */
/*  ACT 2 · Band 5 — A day on GridOS (static; scroll anim is design)   */
/* ================================================================== */

const DAY_BEATS: { icon: typeof SunHorizon; time: string; t: string; b: string }[] = [
  { icon: SunHorizon, time: "Overnight", t: "Charges when power is cheapest", b: "GridOS tops the battery up on the lowest-tariff hours, so what backs you up later cost the least to store." },
  { icon: CloudSun, time: "Afternoon", t: "The cut hits, you get a heads-up", b: "Your phone tells you the grid dropped and the flat switched over. The fridge never noticed. Neither did the router." },
  { icon: MoonStars, time: "Night", t: "Holds a reserve for later", b: "It keeps enough back for the cut that tends to come at night, instead of spending everything the moment the sun sets." },
];

function GridOSDay() {
  return (
    <Band id="day">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 56, alignItems: "center" }}>
        <Rise>
          <div>
            <div style={{ marginBottom: 16 }}><Eyebrow>A day with it</Eyebrow></div>
            <H2 max={460}>The battery has a brain. You watch it work.</H2>
            <p style={{ color: tokens.muted, fontSize: 16.5, lineHeight: 1.6, marginTop: 16, maxWidth: 460 }}>
              GridOS decides when to charge, when to hold back, and what to tell you. It is included on every Nano, not sold as a subscription.
            </p>

            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 20 }}>
              {DAY_BEATS.map((d) => {
                const Ico = d.icon;
                return (
                  <div key={d.time} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 12, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
                      <Ico size={21} weight="duotone" color={tokens.ink} />
                    </span>
                    <div>
                      <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.brand }}>{d.time}</span>
                      <p style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: tokens.ink, marginTop: 4, letterSpacing: "-0.01em" }}>{d.t}</p>
                      <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 5, maxWidth: 420 }}>{d.b}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Rise>

        <Rise delay={0.08}>
          <div>
            <Media caption="GridOS — one day on the phone" ratio="3 / 3.6" radius={20} depth />
            <p style={{ fontFamily: MONO, fontSize: 10, color: tokens.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 12, textAlign: "center" }}>
              Live build: phone pins, screen shifts with the time of day
            </p>
          </div>
        </Rise>
      </div>
    </Band>
  );
}

/* ================================================================== */
/*  ACT 3 · Band 6 — The site-fit reality (the trust differentiator)   */
/* ================================================================== */

const FIT_FACTORS: { icon: typeof Plugs; t: string; b: string }[] = [
  { icon: Plugs, t: "Phase", b: "Single phase or three. It sets which class fits and how your circuits split for backup." },
  { icon: Gauge, t: "Sanctioned load", b: "What your connection is rated for caps what we can back up without tripping the supply." },
  { icon: MapPin, t: "Mount location", b: "The utility wall, balcony, or nook the unit sits on, and the cable run to your panel." },
  { icon: Wind, t: "Ventilation", b: "Sealed and quiet, but it still needs air. We confirm the spot stays within temperature." },
  { icon: Buildings, t: "Society approval", b: "Most RWAs treat it like a sealed appliance. Where an NOC is asked for, we prep the paperwork." },
  { icon: Circuitry, t: "Panel separation", b: "Which circuits move to backup and which stay on the grid, wired so only the essentials draw on a cut." },
];

function SiteFitReality() {
  return (
    <Band tone="deep" id="fit">
      <div style={{ maxWidth: 720, marginBottom: 44 }}>
        <Rise><div style={{ marginBottom: 16 }}><Eyebrow>The fit</Eyebrow></div></Rise>
        <Rise delay={0.04}><H2 max={640}>Whether it fits is six questions, not a guess.</H2></Rise>
        <Rise delay={0.08}><div style={{ marginTop: 16 }}>
          <Lead>Apartment backup is a site problem, and we treat it like one. These are the things a survey checks before anyone quotes you a number.</Lead>
        </div></Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))", gap: 18 }}>
        {FIT_FACTORS.map((f, i) => {
          const Ico = f.icon;
          return (
            <Rise key={f.t} delay={i * 0.03}>
              <div style={{ height: "100%", padding: 24, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
                  <Ico size={22} weight="duotone" color={tokens.ink} />
                </span>
                <div>
                  <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 16.5, fontWeight: 600, letterSpacing: "-0.01em" }}>{f.t}</h3>
                  <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 6 }}>{f.b}</p>
                </div>
              </div>
            </Rise>
          );
        })}
      </div>

      <Rise delay={0.1}>
        <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span aria-hidden style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 999, background: tokens.brandSoft }}>
            <Check size={15} weight="bold" color={tokens.brand} />
          </span>
          <p style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: tokens.ink, letterSpacing: "-0.01em" }}>
            Six questions, one survey visit, all answered before you pay anything.
          </p>
        </div>
      </Rise>
    </Band>
  );
}

/* ================================================================== */
/*  ACT 3 · Band 7 — The likely system, gated                          */
/* ================================================================== */

function SizingGated() {
  return (
    <Band id="system">
      <div style={{ maxWidth: 720, marginBottom: 40 }}>
        <Rise><div style={{ marginBottom: 16 }}><Eyebrow>Likely sizing</Eyebrow></div></Rise>
        <Rise delay={0.04}><H2 max={620}>Most flats run on a Nano.</H2></Rise>
        <Rise delay={0.08}><div style={{ marginTop: 16 }}>
          <Lead>A typical flat sits on the smallest class. A large three-phase flat may step up to a Micro. The exact unit, and how long it holds your circuits, is set at the survey, not on this page.</Lead>
        </div></Rise>
      </div>

      <Rise>
        <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 18, overflow: "hidden", maxWidth: 920 }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${tokens.hairline}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.brand }}>Typical for an apartment</span>
            <span style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: tokens.ink }}>GridEnergy Nano</span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: tokens.muted }}>GE 5x5S</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))" }}>
            <SpecCell value="5 kW / 5 kWh" label="Class capacity, from the SKU name" />
            <SpecCell value="Essentials + 1 room AC" label="What it typically backs up" borderLeft />
            <SpecCell value={<Gated note="confirm usable kWh + real backup hours with Akash (kWh usable vs nominal)">Confirmed at survey</Gated>} label="Backup duration" borderTop />
            <SpecCell value={<Gated note="confirm single-visit / same-day install timeline">Confirmed at survey</Gated>} label="Install time" borderTop borderLeft />
          </div>
        </div>
      </Rise>
      <Rise delay={0.08}>
        <p style={{ color: tokens.muted, fontSize: 13.5, marginTop: 18, maxWidth: 620 }}>
          Capacity shown is the class figure read from the model name. Backup hours depend on which circuits you carry and your usage, so we hold them until the survey rather than print a number that will not hold.
        </p>
      </Rise>
    </Band>
  );
}

function SpecCell({ value, label, borderLeft, borderTop }: { value: ReactNode; label: string; borderLeft?: boolean; borderTop?: boolean }) {
  return (
    <div style={{ padding: "20px 24px", borderTop: borderTop ? `1px solid ${tokens.hairline}` : undefined, borderLeft: borderLeft ? `1px solid ${tokens.hairline}` : undefined }}>
      <div style={{ fontFamily: FONT, fontSize: 18, fontWeight: 600, color: tokens.ink, display: "flex" }}>{value}</div>
      <p style={{ color: tokens.muted, fontSize: 13, marginTop: 8, fontWeight: 500 }}>{label}</p>
    </div>
  );
}

/* ================================================================== */
/*  ACT 4 · Band 9 — What decides the cost (gated, no price)           */
/* ================================================================== */

const COST_FACTORS: { icon: typeof CurrencyInr; t: string; b: string }[] = [
  { icon: Gauge, t: "How much you back up", b: "A few essential circuits costs less to cover than essentials plus a second AC. Capacity follows your load, and price follows capacity." },
  { icon: Wrench, t: "How hard the install is", b: "A short cable run to a clean panel is one thing, a long run or a panel that needs rework is another. The survey sees which yours is." },
  { icon: Sun, t: "Subsidies you qualify for", b: "Where a solar-linked or state scheme applies, it comes off the top. We check eligibility at the survey, we do not assume it on a webpage." },
];

function CostGated() {
  return (
    <Band tone="deep" id="cost">
      <div style={{ maxWidth: 720, marginBottom: 44 }}>
        <Rise><div style={{ marginBottom: 16 }}><Eyebrow>What it costs</Eyebrow></div></Rise>
        <Rise delay={0.04}><H2 max={620}>We quote a fixed number, after we have seen your flat.</H2></Rise>
        <Rise delay={0.08}><div style={{ marginTop: 16 }}>
          <Lead>No price tag on this page, and no estimate over the phone. Cost for an apartment turns on three things, and all three are answered at the survey.</Lead>
        </div></Rise>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 18 }}>
        {COST_FACTORS.map((c, i) => {
          const Ico = c.icon;
          return (
            <Rise key={c.t} delay={i * 0.04}>
              <div style={{ height: "100%", padding: 24, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16 }}>
                <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
                  <Ico size={22} weight="duotone" color={tokens.ink} />
                </span>
                <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 17, fontWeight: 600, marginTop: 16, letterSpacing: "-0.01em" }}>{c.t}</h3>
                <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 7 }}>{c.b}</p>
              </div>
            </Rise>
          );
        })}
      </div>

      <Rise delay={0.12}>
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", maxWidth: 920, padding: "20px 24px", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16 }}>
          <Receipt size={24} weight="duotone" color={tokens.ink} style={{ flexShrink: 0 }} />
          <p style={{ fontFamily: FONT, fontSize: 15, color: tokens.body, lineHeight: 1.5, flex: 1, minWidth: 240 }}>
            Indicative pricing and payback math go here once real models exist.{" "}
            <Gated note="add price bands / payback only when sourced; never an estimate before the survey">Held until sourced.</Gated>
          </p>
        </div>
      </Rise>
    </Band>
  );
}

/* ================================================================== */
/*  ACT 4 · Band 11 — The capture (lead form)                          */
/*  Real client-side form. Persistence = SAG-3350 (Todo, not wired).   */
/* ================================================================== */

const BACKUP_OPTIONS = [
  "Lights, fans, router",
  "One AC",
  "Fridge",
  "Work-from-home setup",
  "Whole flat",
  "Society common areas",
];

type FormState = {
  name: string; phone: string; city: string; pincode: string; homeType: string;
  backup: string[]; tenure: string; frequency: string; phase: string; solar: string; noc: string; notes: string;
};

const EMPTY_FORM: FormState = {
  name: "", phone: "", city: "", pincode: "", homeType: "Apartment / flat",
  backup: [], tenure: "", frequency: "", phase: "", solar: "", noc: "", notes: "",
};

function SurveyForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggleBackup = (opt: string) =>
    setForm((f) => ({ ...f, backup: f.backup.includes(opt) ? f.backup.filter((b) => b !== opt) : [...f.backup, opt] }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, boolean> = {};
    if (!form.name.trim()) next.name = true;
    if (!form.phone.trim()) next.phone = true;
    if (!form.city.trim()) next.city = true;
    if (!form.pincode.trim()) next.pincode = true;
    if (form.backup.length === 0) next.backup = true;
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // SAG-3350: wire POST to lead backend here. For now we confirm locally.
      setSubmitted(true);
    }
  };

  return (
    <Band tone="deep" id="survey">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 56, alignItems: "start" }}>
        <Rise style={{ position: "sticky", top: 96 }}>
          <div>
            <div style={{ marginBottom: 16 }}><Eyebrow>Book a survey</Eyebrow></div>
            <H2 max={440}>Sixty seconds now. A sized answer for your flat after.</H2>
            <div style={{ marginTop: 16 }}>
              <Lead>Tell us the basics and what you want kept on. We read the rest off your meter at the visit. The survey is free and there is no obligation to buy.</Lead>
            </div>
            <ul style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 13, listStyle: "none", padding: 0, margin: 0 }}>
              {["We call you within 48 hours, not a sales loop", "We flag any society paperwork before we quote", "The quote is a fixed number, after the survey"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <Check size={16} weight="bold" color={tokens.brand} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>

        <Rise delay={0.06}>
          {submitted ? (
            <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 20, padding: "44px 36px", textAlign: "center" }}>
              <span style={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 999, background: tokens.brandSoft, marginInline: "auto" }}>
                <CheckCircle size={30} weight="fill" color={tokens.brand} />
              </span>
              <h3 style={{ fontFamily: FONT, fontSize: 22, fontWeight: 600, color: tokens.ink, marginTop: 20, letterSpacing: "-0.02em" }}>Survey requested. We will call you.</h3>
              <p style={{ color: tokens.muted, fontSize: 15.5, lineHeight: 1.6, marginTop: 12, maxWidth: "42ch", marginInline: "auto" }}>
                Thanks, {form.name.split(" ")[0] || "there"}. A GridEnergy engineer will reach you on {form.phone || "your number"} within 48 hours to fix a survey slot. No spam, no sales loop.
              </p>
              <button type="button" onClick={() => { setForm(EMPTY_FORM); setSubmitted(false); }}
                style={{ marginTop: 24, fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: tokens.ink, background: "transparent", border: `1px solid ${tokens.hairlineStrong}`, borderRadius: 12, padding: "10px 18px", cursor: "pointer" }}>
                Submit another flat
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 20, padding: "32px 30px" }}>
              {/* Required tier */}
              <FieldGrid>
                <Field label="Your name" required error={errors.name}>
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" style={inputStyle(errors.name)} />
                </Field>
                <Field label="Phone (WhatsApp)" required error={errors.phone}>
                  <input value={form.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" placeholder="10-digit mobile" style={inputStyle(errors.phone)} />
                </Field>
              </FieldGrid>
              <FieldGrid>
                <Field label="City" required error={errors.city}>
                  <input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="City" style={inputStyle(errors.city)} />
                </Field>
                <Field label="Pincode" required error={errors.pincode}>
                  <input value={form.pincode} onChange={(e) => set("pincode", e.target.value)} inputMode="numeric" placeholder="6-digit pincode" style={inputStyle(errors.pincode)} />
                </Field>
              </FieldGrid>
              <Field label="Home type">
                <select value={form.homeType} onChange={(e) => set("homeType", e.target.value)} style={inputStyle(false)}>
                  <option>Apartment / flat</option>
                  <option>Small home</option>
                  <option>Large home or villa</option>
                </select>
              </Field>

              <Field label="What do you want kept on in a cut?" required error={errors.backup}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8 }}>
                  {BACKUP_OPTIONS.map((opt) => {
                    const on = form.backup.includes(opt);
                    return (
                      <button key={opt} type="button" onClick={() => toggleBackup(opt)} aria-pressed={on}
                        style={{ display: "flex", alignItems: "center", gap: 9, textAlign: "left", cursor: "pointer", padding: "11px 13px", borderRadius: 11, fontFamily: FONT, fontSize: 13.5, fontWeight: 500, color: on ? tokens.ink : tokens.body, background: on ? tokens.brandSoft : tokens.pageBg, border: `1px solid ${on ? tokens.brand : tokens.hairline}`, transition: "all .14s ease" }}>
                        <span aria-hidden style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 17, height: 17, borderRadius: 5, background: on ? tokens.brand : "transparent", border: `1px solid ${on ? tokens.brand : tokens.hairlineStrong}` }}>
                          {on && <Check size={11} weight="bold" color="#fff" />}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Optional tier */}
              <div style={{ height: 1, background: tokens.hairline, margin: "26px 0 22px" }} />
              <p style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.inkMuted, marginBottom: 18 }}>Optional, each one sharpens the survey</p>

              <FieldGrid>
                <Field label="Own or rent"><Pills value={form.tenure} onPick={(v) => set("tenure", v)} options={["Own", "Rent"]} /></Field>
                <Field label="How often do cuts hit?"><Pills value={form.frequency} onPick={(v) => set("frequency", v)} options={["Daily", "Weekly", "Rare"]} /></Field>
              </FieldGrid>
              <FieldGrid>
                <Field label="Phase, if you know it"><Pills value={form.phase} onPick={(v) => set("phase", v)} options={["Single", "Three", "Not sure"]} /></Field>
                <Field label="Solar"><Pills value={form.solar} onPick={(v) => set("solar", v)} options={["Have it", "Planning", "No"]} /></Field>
              </FieldGrid>
              <Field label="Society NOC"><Pills value={form.noc} onPick={(v) => set("noc", v)} options={["Have one", "Not sure"]} /></Field>

              <Field label="Bill or meter photo">
                <label style={{ display: "inline-flex", alignItems: "center", gap: 9, cursor: "pointer", padding: "11px 16px", borderRadius: 11, fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: tokens.ink, background: tokens.pageBg, border: `1px dashed ${tokens.hairlineStrong}` }}>
                  <Receipt size={16} weight="duotone" color={tokens.inkMuted} />
                  Attach a photo
                  <input type="file" accept="image/*" style={{ display: "none" }} />
                </label>
              </Field>

              <Field label="Anything specific about your flat?">
                <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} placeholder="Mount spot, an appliance that must stay on, society rules, a deadline." style={{ ...inputStyle(false), resize: "vertical", lineHeight: 1.5 }} />
              </Field>

              {Object.keys(errors).length > 0 && (
                <p style={{ color: tokens.brand, fontFamily: FONT, fontSize: 13, fontWeight: 500, marginTop: 6, marginBottom: 14 }}>
                  Add your name, phone, city, pincode, and at least one thing to back up.
                </p>
              )}

              <button type="submit"
                style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, marginTop: 18, fontFamily: FONT, fontSize: 15, fontWeight: 600, color: "#fff", background: tokens.brand, border: "none", borderRadius: 13, padding: "15px 22px", cursor: "pointer" }}>
                <PaperPlaneTilt size={16} weight="fill" />
                Book my free survey
              </button>
              <p style={{ color: tokens.muted, fontSize: 12.5, lineHeight: 1.5, marginTop: 12, textAlign: "center" }}>
                We call you within 48 hours. No spam, no sales-call loop.
              </p>
            </form>
          )}
        </Rise>
      </div>
    </Band>
  );
}

/* ---- form atoms ---- */
function FieldGrid({ children }: { children: ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: 16 }}>{children}</div>;
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: boolean; children: ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: error ? tokens.brand : tokens.body, marginBottom: 8 }}>
        {label}{required && <span aria-hidden style={{ color: tokens.brand }}>*</span>}
      </span>
      {children}
    </label>
  );
}

function inputStyle(error?: boolean): CSSProperties {
  return {
    width: "100%", fontFamily: FONT, fontSize: 14.5, color: tokens.ink, background: tokens.pageBg,
    border: `1px solid ${error ? tokens.brand : tokens.hairlineStrong}`, borderRadius: 11, padding: "12px 14px",
    outline: "none", boxSizing: "border-box",
  };
}

function Pills({ value, onPick, options }: { value: string; onPick: (v: string) => void; options: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((o) => {
        const on = value === o;
        return (
          <button key={o} type="button" onClick={() => onPick(on ? "" : o)} aria-pressed={on}
            style={{ cursor: "pointer", padding: "9px 14px", borderRadius: 999, fontFamily: FONT, fontSize: 13, fontWeight: 500, color: on ? "#fff" : tokens.body, background: on ? tokens.ink : tokens.pageBg, border: `1px solid ${on ? tokens.ink : tokens.hairlineStrong}`, transition: "all .14s ease" }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}
