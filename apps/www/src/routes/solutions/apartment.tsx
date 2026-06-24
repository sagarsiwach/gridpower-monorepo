/*
  /solutions/homes/apartment — apartment fit page (the detail beneath /solutions/homes).

  This is not the category sell. Someone landing here is already convinced home
  storage matters; they came to confirm one thing: does it fit MY flat? So the page
  is specific and converting — the Nano product, what an apartment install physically
  looks like, exactly what it powers, where it mounts, the apartment-only objections
  (renting, an existing DG, society NOC), and a hard "book a site survey" close.

  Hero uses the site's tagged-card identity (gray header + dense white body), keeping
  the breadcrumb back to Homes. Every number routes through <Gated>. Global header +
  footer come from root.tsx.
*/

import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Lightbulb, WifiHigh, Television, Snowflake, Fan, Drop,
  Wall, SpeakerSimpleX, DeviceMobile, ShieldCheck, ArrowLeft, Check, Lightning, ArrowRight,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { Wrap, Rise, FONT, MONO } from "../../components/solutions/light/atoms";
import { SpecStrip, PowersGrid, FramedCTA } from "../../components/solutions/light/Blocks";
import { HowItWorks, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Apartment storage — GridEnergy" },
  { name: "description", content: "Does home storage fit a flat? The Nano: wall-mounted, silent, essential-load backup with one room AC, managed by GridOS. Book a site survey." },
];

const DOCK_LINKS: DockLink[] = [
  { id: "spec", label: "The Nano" },
  { id: "powers", label: "What it runs" },
  { id: "fit", label: "The fit" },
  { id: "how", label: "Survey" },
  { id: "faq", label: "FAQ" },
];

const HERO_POINTS = [
  "One wall-mounted Nano, no plant room or floor space",
  "Silent sealed LFP, no genset and nothing the RWA can object to",
  "Essentials plus one room AC, sized at the survey, run from GridOS",
];

export default function SolutionsApartment() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <ApartmentHero />

        <SpecStrip
          label="The system"
          title="One sealed unit, sized for a flat."
          product="GridEnergy Nano"
          specs={[
            { value: <Gated note="confirm apartment capacity band (kWh)">—</Gated>, label: "Usable capacity" },
            { value: "Essentials + 1 room AC", label: "Backs up" },
            { value: "Wall-mounted", label: "Footprint" },
            { value: <Gated note="confirm same-day / single-visit install timeline">—</Gated>, label: "Install time" },
          ]}
        />

        <PowersGrid
          label="What it runs"
          title="The circuits you actually miss in a cut."
          intro="The Nano carries your essential circuits and typically one room AC. The exact set, and how long it lasts, is confirmed against your meter and load at the survey."
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
          note={<>Want a second AC, the kitchen, or the whole flat carried? <Gated note="link to small-home tier once route is live">A larger tier covers more: TBD</Gated>.</>}
        />

        {/* What an apartment install physically looks like — fit-specific, not brand sell */}
        <ApartmentFit />

        <HowItWorks eyebrow="The survey" title="From enquiry to your app, in three visits." media="Apartment survey + install visual"
          steps={[
            { t: "Free site survey", b: "We read your meter, map your essential circuits, and pick the mount point. We flag the society documents you will need before we quote." },
            { t: "Right-sized proposal", b: "One Nano sized to your circuits, the honest economics, and a fixed quote. No upsell to capacity a flat does not need." },
            { t: "Single-visit install & app", b: "Authorised install and commissioning, then GridOS set up on your phone the same day." },
          ]}
        />

        <FaqResources eyebrow="Apartment questions" title="What flat owners ask first." lead="The objections specific to living in a society, answered honestly."
          faqs={[
            { q: "Will it actually run my AC?", a: "The Nano is sized to carry your essential circuits and typically one room AC. Whether that is your bedroom or living-room unit, and for how long, is confirmed against your meter and load at the survey before you commit." },
            { q: "Where does it physically go in a flat?", a: "It is wall-mounted and compact, designed for a utility wall, a service balcony, or a passage nook. No plant room, no sacrificed floor space, no balcony footprint a genset would take." },
            { q: "I rent. Is it worth it?", a: "The Nano is wall-mounted and removable, not a built-in like a fixed inverter bank. It can be uninstalled and remounted if you move. At the survey we cover what a clean removal looks like so it stays your asset, not the flat's." },
            { q: "I already have a DG / building backup. Why this?", a: "A society DG runs the common areas and a few points, on diesel, when it starts. The Nano backs up your flat's own circuits, silently, the instant the grid drops, with no fuel cost per hour. It can sit behind a building DG or replace a personal one." },
            { q: "Does my society need to approve it?", a: "It is silent and fume-free with no genset, so it raises none of the noise or exhaust objections a generator does. Most RWAs treat it like any sealed appliance. Where an NOC or intimation is asked for, we hand you the spec sheet and help with the paperwork at the survey." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycle terms">Exact years and cycle terms: TBD</Gated> },
          ]}
          resources={[
            { kind: "Checklist", title: "Is your flat ready for storage?", body: "The meter, wiring, and mount-point questions worth checking before you book a survey.", to: "/support" },
            { kind: "Guide", title: "Storage when you rent", body: "How a wall-mounted Nano stays your asset, and what a clean remount looks like if you move.", to: "/support" },
            { kind: "Explainer", title: "Nano vs a society DG", body: "Where building backup ends and your own silent, per-circuit backup begins.", to: "/support" },
          ]}
        />

        <FramedCTA title="Confirm the fit for your flat." sub="Book a free site survey. We size to your circuits and flag any society paperwork before you commit."
          primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Back to all home solutions", to: "/solutions/homes" }} />
      </main>

      <SolutionDock label="Apartment storage" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Book a survey", to: "/contact" }} />
    </div>
  );
}

/* ---- Hero: tagged-card identity (gray header + dense white body), breadcrumb to Homes ---- */
function ApartmentHero() {
  return (
    <section style={{ background: tokens.pageBg, paddingTop: 72, paddingBottom: 88, borderBottom: `1px solid ${tokens.hairline}` }}>
      <Wrap>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 56, alignItems: "center" }}>
          {/* left: breadcrumb + the tagged identity card */}
          <Rise>
            <div>
              <Link to="/solutions/homes" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: tokens.inkMuted, textDecoration: "none" }}>
                <ArrowLeft size={13} weight="bold" />All home solutions
              </Link>

              <div style={{ maxWidth: 480, borderRadius: 22, boxShadow: "0 2px 4px oklch(15.3% 0.006 107.1 / 0.05), 0 34px 80px -42px oklch(15.3% 0.006 107.1 / 0.5)" }}>
                {/* gray header — the audience tag */}
                <div style={{ background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: "22px 22px 0 0", padding: "12px 24px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.01em", color: tokens.inkMuted }}>
                    <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
                    Apartments & flats
                  </span>
                </div>

                {/* white body — dense */}
                <div style={{ background: tokens.card, borderLeft: `1px solid ${tokens.hairline}`, borderRight: `1px solid ${tokens.hairline}`, borderBottom: `1px solid ${tokens.hairline}`, borderRadius: "0 0 22px 22px", padding: "22px 24px 26px" }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>Apartment energy storage</span>
                  <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(28px,3.4vw,40px)", fontWeight: 600, letterSpacing: "-0.034em", lineHeight: 1.04, marginTop: 10, textWrap: "balance" }}>
                    Does it fit your flat? Yes.
                  </h1>
                  <p style={{ color: tokens.body, fontSize: 15.5, lineHeight: 1.55, marginTop: 12, maxWidth: "44ch" }}>
                    One wall-mounted Nano keeps your essentials, and a room cool, running through every cut. Silent, sealed, sized to your circuits at the survey.
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
                    <HeroBtn to="/contact" primary>Book a free site survey</HeroBtn>
                    <HeroBtn to="/products">See the Nano</HeroBtn>
                  </div>
                </div>
              </div>
            </div>
          </Rise>

          {/* right: install visual placeholder, matching site Media treatment */}
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

function HeroBtn({ to, children, primary }: { to: string; children: React.ReactNode; primary?: boolean }) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 13.5, fontWeight: 600,
    letterSpacing: "-0.005em", borderRadius: 12, padding: "11px 18px", textDecoration: "none", cursor: "pointer",
    border: "1px solid transparent",
  };
  const style: React.CSSProperties = primary
    ? { ...base, background: tokens.brand, color: "#fff" }
    : { ...base, background: tokens.card, color: tokens.ink, borderColor: tokens.hairlineStrong };
  return (
    <Link to={to} style={style}>
      {primary && <Lightning size={13} weight="fill" />}
      {children}
      <ArrowRight size={12} weight="bold" />
    </Link>
  );
}

/* ---- The fit: what an apartment install physically looks like (apartment-only block) ---- */
const FIT_ITEMS = [
  { icon: Wall, title: "Mounts on a wall you already have", body: "A utility wall, a service balcony, or a passage nook takes it. No plant room, no floor space sacrificed, no balcony given up to a genset." },
  { icon: SpeakerSimpleX, title: "Silent and fume-free in a society", body: "Sealed LFP, no combustion, no exhaust. Nothing the neighbours hear and nothing the RWA can object to the way they would a diesel set." },
  { icon: DeviceMobile, title: "Run the whole thing from GridOS", body: "State of charge, backup reserve held for the next cut, and outage alerts, live on your phone. The platform is live, not a roadmap promise." },
  { icon: ShieldCheck, title: "Removable, so it stays your asset", body: "Wall-mounted and uninstallable, not a built-in. If you rent or move, it comes with you. A clean remount is covered at the survey." },
];

function ApartmentFit() {
  return (
    <section id="fit" style={{ background: tokens.pageBgDeep, paddingBlock: 100, borderTop: `1px solid ${tokens.hairline}`, borderBottom: `1px solid ${tokens.hairline}` }}>
      <Wrap>
        <div style={{ maxWidth: 720, marginBottom: 48 }}>
          <Rise><div style={{ marginBottom: 16 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>
              <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />The fit
            </span>
          </div></Rise>
          <Rise delay={0.04}>
            <h2 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(28px,3.6vw,42px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, textWrap: "balance", maxWidth: 620 }}>
              What an apartment install actually looks like.
            </h2>
          </Rise>
          <Rise delay={0.08}><div style={{ marginTop: 16 }}>
            <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, maxWidth: 620 }}>
              No reconstruction, no dedicated room, no diesel on the balcony. One sealed unit on a wall, wired to your essential circuits.
            </p>
          </div></Rise>
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
      </Wrap>
    </section>
  );
}
