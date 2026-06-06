/*
  /solutions/institutes — the Institutes category landing page (live, navbar target).

  Schools, colleges, coaching centres, and hostels. Built from the canonical block
  library (Blocks + Modules) in the locked restrained language (olive + GridRed,
  Inter), with the unified SolutionDock. Mirrors homes.tsx structure exactly.
  Numbers route through <Gated>. The global header + footer come from root.tsx.

  TODO: audience imagery — reusing homes-*.png hero assets until campus
  photography is shot. Replace the /images/solutions/homes-*.png paths below.
*/

import type { MetaFunction } from "react-router";
import {
  BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, DeviceMobile, ShieldCheck, Sun,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { FONT } from "../../components/solutions/light/atoms";
import {
  TrustBar, SystemRows, OutcomeGrid, Comparison, AppShowcase, FramedCTA,
} from "../../components/solutions/light/Blocks";
import { HeroCarousel, type HeroSlide } from "../../components/solutions/light/HeroCarousel";
import { HowItWorks, StatBand, CustomerSwitcher, FaqResources, Gated } from "../../components/solutions/light/Modules";
import { SolutionDock, type DockLink } from "../../components/solutions/light/SolutionDock";

export const meta: MetaFunction = () => [
  { title: "Energy storage for schools & colleges — GridEnergy" },
  { name: "description", content: "Silent backup for exams, labs, and servers, large daytime solar self-use for campus rooftops, and hostel comfort, all managed by GridOS." },
];

const HERO_SLIDES: HeroSlide[] = [
  // TODO: audience imagery — homes-small.png stands in for a school shot
  { image: "/images/solutions/homes-small.png", eyebrow: "Schools", kicker: "School energy storage", title: "Classes never stop for a cut.", sub: "Silent storage keeps classrooms, labs, and the server room running through every outage, with no genset fumes near students.",
    points: ["Backup for exams, labs, and servers", "Silent LFP, safe around students", "Run from your phone through GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  // TODO: audience imagery — homes-large.png stands in for a campus shot
  { image: "/images/solutions/homes-large.png", eyebrow: "Colleges & universities", kicker: "Campus solar plus storage", title: "Put your rooftops to work.", sub: "Campuses have roof area and daytime load, the ideal match for solar plus storage. Store daytime solar and run on it instead of exporting cheap.",
    points: ["Large daytime rooftop-solar self-use", "Backup for labs, servers, and exams", "Per-building view in GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  // TODO: audience imagery — homes-apartment.png stands in for a coaching-centre shot
  { image: "/images/solutions/homes-apartment.png", eyebrow: "Coaching centres", kicker: "Coaching-centre storage", title: "No cut interrupts a session.", sub: "Silent, seamless backup for classrooms, projectors, and online sessions, with peak-tariff savings the rest of the day.",
    points: ["Seamless backup mid-session", "Quiet and safe, no genset noise", "Peak-tariff savings via GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
  // TODO: audience imagery — homes-solar.png stands in for a hostel shot
  { image: "/images/solutions/homes-solar.png", eyebrow: "Hostels", kicker: "Hostel energy storage", title: "Comfort that holds overnight.", sub: "Backup for fans, lights, Wi-Fi, and water pumps across hostel blocks, silent through the night and safe around students.",
    points: ["Backup for fans, lights, and Wi-Fi", "Silent overnight, safe in residences", "Tariff-smart charging via GridOS"],
    primary: { label: "Book a site survey", to: "/contact" }, secondary: { label: "Explore the range", to: "/products" } },
];

const DOCK_LINKS: DockLink[] = [
  { id: "what", label: "System" },
  { id: "outcomes", label: "Outcomes" },
  { id: "compare", label: "Compare" },
  { id: "gridos", label: "GridOS" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionsInstitutes() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <HeroCarousel slides={HERO_SLIDES} />

        <TrustBar lead="Built on LFP chemistry and open standards" items={["Safer LFP cells", "Sealed, maintenance-free", "GridOS app control", "No vendor lock-in"]} />

        <SystemRows
          label="What it is"
          title="A battery, an inverter, solar-ready, run by software."
          intro="One sealed system replaces the genset and switchgear in your plant room."
          features={[
            { kicker: "The battery", title: "Stores power for when the campus needs it.", body: "Safe, long-life LFP cells store cheap, off-peak, or rooftop-solar power and release it during cuts and expensive peak hours.", bullets: ["LFP chemistry, safe around students", "Modular, add capacity per building", "Sealed and maintenance-free"], visual: "LFP battery module" },
            { kicker: "The inverter", title: "Switches over before a class notices.", body: "An integrated inverter delivers clean power and hands over from grid to battery seamlessly, so exams, labs, and servers never drop.", bullets: ["Seamless switchover on an outage", "Clean, stable output for lab kit and servers", "Micro and Mega units for any building"], visual: "Integrated power unit" },
            { kicker: "GridOS", title: "Every building, one screen.", body: "GridOS decides when to charge, when to discharge, and how much to hold in reserve, and shows every building from one dashboard.", bullets: ["Tariff-aware scheduling", "Backup reserve protection", "Per-building monitoring and alerts"], visual: "GridOS dashboard" },
          ]}
        />

        <OutcomeGrid
          label="Outcomes"
          title="What you actually get."
          intro="Not a spec sheet. The things that change about running a campus through a cut."
          items={[
            { icon: BatteryChargingVertical, title: "Backup for what can't pause", body: "Exams, labs, and servers stay on with seamless switchover when the grid drops." },
            { icon: Sun, title: "Daytime solar, used on site", body: "Campus roofs and daytime load make solar self-use ideal, store it and run on it." },
            { icon: CurrencyInr, title: "Lower running costs", body: "Store cheap or solar power and use it through expensive peak hours." },
            { icon: SpeakerSimpleX, title: "Silent and safe", body: "No genset noise or fumes near classrooms, labs, or hostels." },
            { icon: DeviceMobile, title: "Per-building view", body: "Monitor and control every building from one GridOS dashboard." },
            { icon: ShieldCheck, title: "Safe", body: "LFP chemistry, the safer, longer-lived battery type, with no fuel on site." },
          ]}
        />

        <Comparison
          title="Against the diesel genset you would otherwise run."
          intro="Same job, backing the campus through a cut. Two very different ways to live with it around students."
          usLabel="GridEnergy" themLabel="Diesel genset"
          rows={[
            { label: "Noise near students", us: "Silent", them: "Loud" },
            { label: "Fumes", us: "None", them: "Diesel exhaust" },
            { label: "Running cost", us: "Stored / solar power", them: "Diesel, every hour" },
            { label: "Switchover", us: "Seamless", them: "Manual / delayed" },
            { label: "Servicing", us: "Remote, maintenance-free", them: "Regular, hands-on" },
            { label: "Per-building view", us: "One dashboard", them: "None" },
          ]}
        />

        <HowItWorks eyebrow="How buying works" title="From enquiry to your app, in three steps." media="Buying flow visual"
          steps={[
            { t: "Free site survey", b: "We assess your campus load, roof area, and backup needs on site, no obligation." },
            { t: "Custom proposal", b: "A sized system per building, the real economics, and a clear quote built around your tariff." },
            { t: "Pro install & app", b: "Authorised install and commissioning, then GridOS set up across your campus." },
          ]}
        />

        <StatBand title="The honest numbers, once they are yours." lead="We size to your tariff, load, and roof area and show real figures at survey. Subsidies, where you qualify, come on top."
          stats={[
            { value: <Gated note="compute payback model per campus profile">—</Gated>, label: "Typical payback" },
            { value: <Gated note="compute lifetime savings model">—</Gated>, label: "Lifetime savings" },
            { value: <Gated note="cite applicable institutional / state scheme + eligibility">—</Gated>, label: "Subsidy support" },
          ]}
        />

        <CustomerSwitcher title="Sized for every kind of campus."
          cases={[
            { tab: "School", name: "School", visual: "Install photo TBD", blurb: "A school where classes, labs, and exams carry on through every cut.", products: ["Micro", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Critical-block backup" }, { value: <Gated note="bill saving">—</Gated>, label: "Monthly bill saving" }] },
            { tab: "College", name: "College", visual: "Install photo TBD", blurb: "A campus that runs on its own rooftop solar by day and stays backed up at night.", products: ["Mega", "GridOS"], stats: [{ value: <Gated note="solar self-use">—</Gated>, label: "Daytime solar self-use" }, { value: <Gated note="bill saving">—</Gated>, label: "Annual bill saving" }] },
            { tab: "Hostel", name: "Hostel", visual: "Install photo TBD", blurb: "A hostel block kept comfortable overnight, silent and safe around students.", products: ["Micro", "GridOS"], stats: [{ value: <Gated note="backup hours">—</Gated>, label: "Overnight comfort backup" }, { value: <Gated note="peak-tariff saving">—</Gated>, label: "Peak-tariff saving" }] },
          ]}
        />

        <AppShowcase label="GridOS" title="The smart layer most installers don't give you." intro="A battery is hardware. GridOS is the software that turns it into savings and keeps every building in view." visual="GridOS app"
          features={["Live state of charge, grid, and solar per building", "Backup reserve held automatically", "Tariff-aware charge and discharge", "Outage alerts and savings across the campus"]}
        />

        <FaqResources eyebrow="Questions" title="The objections, answered honestly." lead="Learn how campus storage works."
          faqs={[
            { q: "Is it safe around students?", a: "Yes. It is a silent, sealed LFP system with no fuel and no exhaust, so it can sit near classrooms, labs, or hostels without the noise or fumes of a genset." },
            { q: "Will it hold labs, servers, and exams?", a: "From critical blocks up to whole-building loads, depending on the size you choose between Micro and Mega. We confirm exactly what each system runs, and for how long, at the survey." },
            { q: "Do our rooftops make sense for solar?", a: "Usually yes. Campuses have roof area and daytime load, which is the ideal match for solar plus storage, so you self-use solar by day instead of exporting it cheap." },
            { q: "What is the warranty?", a: <Gated note="add real warranty years + cycles">Exact years and cycle terms: TBD</Gated> },
            { q: "What about maintenance?", a: "Sealed and effectively maintenance-free, with health monitored remotely through GridOS. No genset servicing, no fuel logistics." },
          ]}
          resources={[
            { kind: "Guide", title: "How campus storage actually works", body: "Backup, daytime solar self-use, and peak-tariff savings for institutes, in plain language.", to: "/support" },
            { kind: "Explainer", title: "Why campus roofs are ideal for solar", body: "Roof area plus daytime load is the best case for solar plus storage. Here is why.", to: "/support" },
            { kind: "Checklist", title: "What to ask before you buy backup", body: "The questions that separate real silent backup from a repackaged genset.", to: "/support" },
          ]}
        />

        <FramedCTA title="Ready to keep the campus running through every cut?" sub="Book a free site survey. No obligation, no call to qualify."
          primary={{ label: "Book a free site survey", to: "/contact" }} secondary={{ label: "Explore the range", to: "/products" }} />
      </main>

      <SolutionDock label="Campus storage" links={DOCK_LINKS}
        secondary={{ label: "Catalog", to: "/products" }} primary={{ label: "Get a quote", to: "/contact" }} />
    </div>
  );
}
