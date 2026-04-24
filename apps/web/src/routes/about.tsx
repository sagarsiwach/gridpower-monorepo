import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  Button,
  SectionLabel,
  DotGrid,
  SectionDivider,
} from "@gridpower/ui";

export const meta: MetaFunction = () => [
  { title: "About GridPower — Building India's open energy platform" },
  {
    name: "description",
    content:
      "GridPower is the trading name for DeltaEV Mobility Private Limited — an Indian energy technology company designing, manufacturing, and deploying the three layers of the clean energy transition.",
  },
  { property: "og:title", content: "About GridPower — Building India's open energy platform" },
  {
    property: "og:description",
    content:
      "GridPower is the trading name for DeltaEV Mobility Private Limited — an Indian energy technology company designing, manufacturing, and deploying the three layers of the clean energy transition.",
  },
  { property: "og:url", content: "/about" },
  { property: "og:image", content: "/og-default.svg" },
  { name: "twitter:card", content: "summary_large_image" },
];

const timeline = [
  { year: "2015", event: "First EV powertrain research at DeltaEV" },
  { year: "2019", event: "Kabira Mobility partnership — first OEM deployment" },
  { year: "2022", event: "DeltaEV Mobility Private Limited incorporated" },
  { year: "2024", event: "GridPower platform concept initiated" },
  {
    year: "2026",
    event: "GridPower public launch · GridEnergy + GridCharge + GridDrive",
  },
];

const team = [
  {
    name: "Sagar Siwach",
    role: "Founder & CEO",
    note: "Energy + EV infrastructure",
  },
  { name: "Team Member", role: "CTO", note: "Platform & software" },
  {
    name: "Team Member",
    role: "Head of Hardware",
    note: "Battery + power electronics",
  },
  {
    name: "Team Member",
    role: "Head of Operations",
    note: "Manufacturing & deployment",
  },
  {
    name: "Team Member",
    role: "Head of Sales",
    note: "Enterprise & partnerships",
  },
  {
    name: "Team Member",
    role: "Lead Engineer",
    note: "GridCharge + GridDrive",
  },
];

const facts = [
  ["Dharwad, Karnataka", "Manufacturing"],
  ["GIDC Verna, Goa", "First deployments"],
  ["Open standards", "Zero lock-in"],
  ["Q2 2026", "Platform launch"],
] as const;

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-sand-1 px-6 pb-16 pt-20">
        <DotGrid className="absolute inset-0" color="var(--sand-5)" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-sand-9 mb-3">
            About / DeltaEV Mobility Pvt Ltd
          </p>
          <SectionLabel className="mb-4">ABOUT GRIDPOWER</SectionLabel>
          <h1 className="font-heading text-display tracking-tight text-sand-12 leading-[1.05] mb-6 max-w-3xl">
            Building India's open energy infrastructure.
          </h1>
          <p className="font-body text-body-lg text-sand-11 leading-relaxed max-w-2xl">
            GridPower is the trading name for DeltaEV Mobility Private Limited —
            an Indian energy technology company designing, manufacturing, and
            deploying the three layers of the clean energy transition.
          </p>
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────────── */}
      <section className="bg-sand-1 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionLabel className="mb-4">OUR STORY</SectionLabel>
            <p className="font-body text-body text-sand-11 leading-[1.8] mb-5">
              We started in EV powertrains — supplying motors, controllers, and
              battery packs to two-wheeler and three-wheeler OEMs across India.
              That work taught us something important: the hardware is the easy
              part.
            </p>
            <p className="font-body text-body text-sand-11 leading-[1.8] mb-5">
              The hard part is the software layer that connects everything —
              that monitors your storage, manages your chargers, and tells you
              what your fleet is doing at 2am. That layer didn't exist, so we
              built it.
            </p>
            <p className="font-body text-body text-sand-11 leading-[1.8]">
              GridPower is the result: a hardware + software platform for the
              full energy stack. Storage, charging, and powertrain — on a single
              open platform, with full specs published and zero lock-in.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-sand-6 rounded-card overflow-hidden self-start">
            {facts.map(([title, label]) => (
              <div key={title} className="bg-sand-2 px-5 py-6">
                <p className="font-heading text-body font-semibold text-sand-12 mb-1">
                  {title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-sand-9">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="bg-sand-2 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionLabel className="mb-4">THE TEAM</SectionLabel>
          <h2 className="font-heading text-h2 font-semibold text-sand-12 mb-10">
            People who've built EVs.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member) => (
              <div
                key={member.role}
                className="bg-sand-1 border border-sand-6 rounded-card p-6 flex gap-4 items-start"
              >
                <div className="w-11 h-11 rounded-full bg-sand-3 border border-sand-6 shrink-0 flex items-center justify-center">
                  <span className="font-heading text-body-sm font-semibold text-sand-9">
                    {member.name[0]}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-[15px] font-semibold text-sand-12 mb-1">
                    {member.name}
                  </p>
                  <p className="font-body text-body-sm font-medium text-grid-red mb-1">
                    {member.role}
                  </p>
                  <p className="font-body text-body-sm text-sand-9">{member.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.06em] text-sand-8">
            Team announcements Q2 2026
          </p>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="bg-sand-1 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionLabel className="mb-6">TIMELINE</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-sand-6 rounded-card overflow-hidden">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={
                  i === timeline.length - 1
                    ? "bg-sand-12 px-5 py-6"
                    : "bg-sand-1 px-5 py-6"
                }
              >
                <p
                  className={`font-heading text-body-lg font-semibold mb-2 ${
                    i === timeline.length - 1 ? "text-grid-red" : "text-sand-12"
                  }`}
                >
                  {item.year}
                </p>
                <p
                  className={`font-body text-body-sm leading-snug ${
                    i === timeline.length - 1 ? "text-dark-11" : "text-sand-11"
                  }`}
                >
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manufacturing callout ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-sand-12 py-16">
        <DotGrid
          className="absolute inset-0"
          color="rgba(58,57,55,0.55)"
         
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <SectionLabel variant="neutral" className="mb-4">
            MANUFACTURED IN INDIA
          </SectionLabel>
          <h2 className="font-heading text-h1 font-semibold text-dark-12 tracking-tight mb-4">
            Made in Dharwad, Karnataka.
          </h2>
          <p className="font-body text-body text-dark-11 leading-relaxed mb-8">
            All GridPower hardware is assembled at our facility in Dharwad,
            Karnataka. First commercial deployments at GIDC Verna, Goa.
          </p>
          <Button asChild variant="secondary">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>

      {/* ── Investors placeholder ─────────────────────────────── */}
      <section className="bg-sand-1 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <SectionLabel className="mb-4">BACKED BY</SectionLabel>
          <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-sand-8">
            Investor announcements Q2 2026
          </p>
        </div>
      </section>
    </div>
  );
}
