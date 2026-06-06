/*
  /solutions/homes/apartment — home-type detail page (apartments & flats).

  A focused detail page beneath the Homes landing, in the restrained block
  language: compact storage for essential-load backup. Numbers route through
  <Gated>. Global header + footer come from root.tsx.
*/

import type { MetaFunction } from "react-router";
import {
  Lightbulb, WifiHigh, Television, Snowflake,
  Wall, SpeakerSimpleX, DeviceMobile, ShieldCheck,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { FONT } from "../../components/solutions/light/atoms";
import { SolutionHero, SpecStrip, PowersGrid, OutcomeGrid, FramedCTA } from "../../components/solutions/light/Blocks";
import { HowItWorks, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Apartment storage — GridEnergy" },
  { name: "description", content: "Compact, silent home storage for flats and apartments: essential-load backup without a genset, managed by GridOS." },
];

const DOCK_LINKS: DockLink[] = [
  { id: "spec", label: "System" },
  { id: "powers", label: "What it runs" },
  { id: "outcomes", label: "Why it fits" },
  { id: "how", label: "How to buy" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionsApartment() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <SolutionHero
          back={{ label: "All home solutions", to: "/solutions/homes" }}
          eyebrow="Apartments & flats"
          title="Compact, silent backup for your flat."
          sub="A wall-mounted system that keeps your essentials, and a room cool, running through every cut. No genset, no balcony noise, nothing for the RWA to object to."
          chips={["Wall-mounted", "Essential-load backup", "No genset"]}
          primary={{ label: "Book a free site survey", to: "/contact" }}
          secondary={{ label: "See all home solutions", to: "/solutions/homes" }}
          visual="Nano in a flat utility wall"
        />

        <SpecStrip
          label="The system"
          title="Sized for a flat, not a villa."
          product="GridEnergy Nano"
          specs={[
            { value: <Gated note="confirm apartment capacity band">—</Gated>, label: "Usable capacity" },
            { value: "Essential loads", label: "Backs up" },
            { value: "Wall-mounted", label: "Footprint" },
            { value: <Gated note="confirm install timeline">—</Gated>, label: "Install time" },
          ]}
        />

        <PowersGrid
          label="What it runs"
          title="The things you actually miss in a cut."
          intro="Sized to carry your essential circuits. We confirm exactly what yours runs, and for how long, at the survey."
          items={[
            { icon: Lightbulb, label: "Lights & fans" },
            { icon: WifiHigh, label: "Wi-Fi & devices" },
            { icon: Television, label: "TV & entertainment" },
            { icon: Snowflake, label: "One room AC" },
          ]}
          note={<>Want it to run more, a second AC, the kitchen? <Gated note="link to small-home tier">Size up to the Small home tier: TBD</Gated>.</>}
        />

        <OutcomeGrid
          label="Why it fits a flat"
          title="Built for apartment living."
          items={[
            { icon: Wall, title: "Wall-mounted, compact", body: "Fits a utility wall or balcony nook. No plant room, no floor space sacrificed." },
            { icon: SpeakerSimpleX, title: "Silent, fume-free", body: "No genset on your balcony. Nothing for the neighbours or the RWA to object to." },
            { icon: DeviceMobile, title: "Run from your phone", body: "State of charge, backup reserve, and alerts in the GridOS app." },
            { icon: ShieldCheck, title: "Safe, sealed LFP", body: "The safer, longer-lived battery chemistry, sealed and maintenance-free." },
          ]}
        />

        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess your flat's essential circuits and where the unit mounts." },
            { t: "Custom proposal", b: "A right-sized system, the real economics, and a clear quote." },
            { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up on your phone." },
          ]}
        />

        <FaqResources eyebrow="Questions" title="What flat owners ask first." lead="Storage for apartments, answered honestly."
          faqs={[
            { q: "Will it run my AC?", a: "It is sized to carry your essential circuits and typically one room AC, depending on the capacity you choose. We confirm exactly what yours runs, and for how long, at the survey." },
            { q: "Where does it go in a flat?", a: "It is wall-mounted and compact, designed to fit a utility wall or balcony nook without a plant room or sacrificed floor space." },
            { q: "Do I need my society's permission?", a: "It is silent and fume-free with no genset, so it raises none of the noise or exhaust objections a generator does. We can help with any documentation your RWA asks for." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
          ]}
          resources={[
            { kind: "Guide", title: "Backup for apartments, explained", body: "What essential-load backup actually covers in a flat, and how long it lasts.", to: "/support" },
            { kind: "Checklist", title: "Is your flat ready for storage?", body: "The wiring and meter questions to check before a survey.", to: "/support" },
            { kind: "Explainer", title: "Why silent matters in a society", body: "How sealed LFP storage sidesteps the noise and fumes a genset brings.", to: "/support" },
          ]}
        />

        <FramedCTA title="Right-size storage for your flat." sub="Book a free site survey. No obligation, no call to qualify."
          primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "See all home solutions", to: "/solutions/homes" }} />
      </main>

      <SolutionDock label="Apartment storage" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Get a quote", to: "/contact" }} />
    </div>
  );
}
