/*
  /resources — resource library.

  Guides, explainers, datasheets, checklists for home energy storage.
  Cards link to /support for now; datasheets gated until real PDFs exist.
  No fabricated download counts, dates, or author details.
*/

import { useState } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import {
  BookOpen,
  FileText,
  ListChecks,
  Lightbulb,
  ArrowRight,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { Gated } from "../components/solutions/light/Blocks";
import { Band, Wrap, Rise, Eyebrow, H2, Lead, Btn, FONT, MONO } from "../components/solutions/light/atoms";
import { FramedCTA } from "../components/solutions/light/Blocks";

export const meta: MetaFunction = () => [
  { title: "Resources — GridEnergy" },
  { name: "description", content: "Guides, explainers, datasheets, and checklists on home energy storage. Learn how it works, what to ask, and what matters before you buy." },
];

type Resource = {
  kind: "Guide" | "Explainer" | "Checklist" | "Datasheet";
  title: string;
  body: string;
  to: string;
  gated?: boolean;
  gateNote?: string;
};

const RESOURCES: Resource[] = [
  {
    kind: "Guide",
    title: "How home battery storage actually works",
    body: "Backup, bill savings, and solar: what a storage system does in plain language, without the jargon.",
    to: "/support",
  },
  {
    kind: "Explainer",
    title: "LFP vs lead-acid: why chemistry matters",
    body: "Why LFP is the safer, longer-lived battery type and what that means for your home over a decade of use.",
    to: "/support",
  },
  {
    kind: "Checklist",
    title: "What to ask before you buy storage",
    body: "The questions that separate a real backup system from a repackaged inverter. Bring this to any quote you get.",
    to: "/support",
  },
  {
    kind: "Guide",
    title: "Solar and storage: what changes when you combine them",
    body: "How adding storage transforms what your solar panels are worth and what to look for in a combined system.",
    to: "/support",
  },
  {
    kind: "Explainer",
    title: "Understanding your electricity tariff",
    body: "Time-of-use tariffs, peak and off-peak rates, and why the spread between them is what makes arbitrage work.",
    to: "/support",
  },
  {
    kind: "Checklist",
    title: "Preparing for a site survey",
    body: "What to have ready before the surveyor arrives: your recent bills, meter type, existing inverter details, and load priorities.",
    to: "/support",
  },
  {
    kind: "Guide",
    title: "Backup sizing: essentials vs whole-home",
    body: "How to decide between backing up only your essential loads and backing up your whole home, including ACs.",
    to: "/support",
  },
  {
    kind: "Explainer",
    title: "What GridOS does that a plain battery cannot",
    body: "The software layer that turns passive hardware into an active system that schedules, adapts, and reports.",
    to: "/support",
  },
  {
    kind: "Datasheet",
    title: "Nano datasheet",
    body: "Specifications, dimensions, chemistry, and performance parameters for the Nano home storage unit.",
    to: "/support",
    gated: true,
    gateNote: "Link to real Nano PDF datasheet before launch",
  },
  {
    kind: "Datasheet",
    title: "Micro datasheet",
    body: "Specifications, dimensions, chemistry, and performance parameters for the Micro home storage unit.",
    to: "/support",
    gated: true,
    gateNote: "Link to real Micro PDF datasheet before launch",
  },
  {
    kind: "Datasheet",
    title: "Mega datasheet",
    body: "Specifications, dimensions, chemistry, and performance parameters for the Mega home storage unit.",
    to: "/support",
    gated: true,
    gateNote: "Link to real Mega PDF datasheet before launch",
  },
  {
    kind: "Checklist",
    title: "Post-installation checklist",
    body: "What to confirm after your system is installed and before the commissioning engineer leaves your site.",
    to: "/support",
  },
];

const KIND_ICONS = {
  Guide: BookOpen,
  Explainer: Lightbulb,
  Checklist: ListChecks,
  Datasheet: FileText,
} as const;

const ALL_KINDS = ["All", "Guide", "Explainer", "Checklist", "Datasheet"] as const;
type KindFilter = (typeof ALL_KINDS)[number];

export default function Resources() {
  const [filter, setFilter] = useState<KindFilter>("All");

  const visible =
    filter === "All" ? RESOURCES : RESOURCES.filter((r) => r.kind === filter);

  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>

        {/* hero */}
        <section
          style={{
            background: tokens.pageBg,
            paddingTop: 88,
            paddingBottom: 72,
            borderBottom: `1px solid ${tokens.hairline}`,
          }}
        >
          <Wrap>
            <div style={{ maxWidth: 680 }}>
              <Rise>
                <div style={{ marginBottom: 20 }}>
                  <Eyebrow>Resources</Eyebrow>
                </div>
              </Rise>
              <Rise delay={0.04}>
                <h1
                  style={{
                    fontFamily: FONT,
                    color: tokens.ink,
                    fontSize: "clamp(34px, 5vw, 54px)",
                    fontWeight: 600,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.03,
                    textWrap: "balance",
                    marginBottom: 20,
                  }}
                >
                  Everything you need to make a confident decision.
                </h1>
              </Rise>
              <Rise delay={0.08}>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 18,
                    lineHeight: 1.6,
                    maxWidth: 560,
                    marginBottom: 32,
                  }}
                >
                  Guides, explainers, checklists, and datasheets on home energy storage. Plain
                  language, no hype.
                </p>
              </Rise>
              <Rise delay={0.12}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <Btn to="/contact" kind="primary">Talk to an expert</Btn>
                  <Btn to="/support" kind="secondary">Support centre</Btn>
                </div>
              </Rise>
            </div>
          </Wrap>
        </section>

        {/* filter + grid */}
        <Band id="library">
          {/* filter chips */}
          <Rise>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginBottom: 44,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: tokens.inkMuted,
                  marginRight: 4,
                }}
              >
                Filter
              </span>
              {ALL_KINDS.map((k) => {
                const on = filter === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setFilter(k)}
                    aria-pressed={on}
                    style={{
                      cursor: "pointer",
                      padding: "9px 18px",
                      borderRadius: 999,
                      fontFamily: FONT,
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: on ? tokens.ink : tokens.muted,
                      background: on ? tokens.card : "transparent",
                      border: `1px solid ${on ? tokens.hairlineStrong : tokens.hairline}`,
                      boxShadow: on
                        ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05)"
                        : "none",
                      transition: "all .15s ease",
                    }}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </Rise>

          {/* resource cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: 18,
            }}
          >
            {visible.map((r, i) => (
              <ResourceCard key={r.title} resource={r} delay={i * 0.03} />
            ))}
          </div>

          {visible.length === 0 && (
            <Rise>
              <div
                style={{
                  textAlign: "center",
                  padding: "64px 24px",
                  color: tokens.muted,
                  fontSize: 15,
                }}
              >
                <MagnifyingGlass size={32} weight="duotone" color={tokens.inkMuted} aria-hidden />
                <p style={{ marginTop: 12 }}>No resources in this category yet.</p>
              </div>
            </Rise>
          )}
        </Band>

        {/* still have questions */}
        <Band tone="deep" id="support">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              gap: 48,
              alignItems: "center",
            }}
          >
            <Rise>
              <div>
                <div style={{ marginBottom: 16 }}>
                  <Eyebrow>Still have questions?</Eyebrow>
                </div>
                <H2 max={440}>Our team is here.</H2>
                <div style={{ marginTop: 16 }}>
                  <Lead>
                    If a guide does not answer your question, speak to us directly. We are happy
                    to walk through the specifics before you book a survey.
                  </Lead>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
                  <Btn to="/contact" kind="primary">Get in touch</Btn>
                  <Btn to="/support" kind="secondary">Support centre</Btn>
                </div>
              </div>
            </Rise>

            <Rise delay={0.08}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  {
                    title: "Site survey",
                    body: "Free, no obligation, at your home. We assess load, tariff, roof, and backup needs.",
                    to: "/contact",
                  },
                  {
                    title: "Technical support",
                    body: "For existing customers with installation or GridOS questions.",
                    to: "/support",
                  },
                  {
                    title: "Installer enquiries",
                    body: "To become an authorised GridEnergy installer or discuss fleet access.",
                    to: "/contact",
                  },
                ].map((item) => (
                  <SupportTile key={item.title} {...item} />
                ))}
              </div>
            </Rise>
          </div>
        </Band>

        <FramedCTA
          title="Ready to talk to someone who knows storage?"
          sub="Book a free site survey. No obligation, no calls to qualify first."
          primary={{ label: "Book a free site survey", to: "/contact" }}
          secondary={{ label: "Browse solutions", to: "/solutions/homes" }}
        />
      </main>
    </div>
  );
}

/* ---- card ---- */
function ResourceCard({ resource, delay }: { resource: Resource; delay: number }) {
  const [hover, setHover] = useState(false);
  const Ico = KIND_ICONS[resource.kind];
  return (
    <Rise delay={delay}>
      <a
        href={resource.to}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          textDecoration: "none",
          background: tokens.card,
          border: `1px solid ${hover ? tokens.hairlineStrong : tokens.hairline}`,
          borderRadius: 16,
          padding: 24,
          transition:
            "border-color .2s ease, transform .2s ease, box-shadow .25s ease",
          transform: hover ? "translateY(-2px)" : "none",
          boxShadow: hover
            ? "0 18px 40px -28px oklch(15.3% 0.006 107.1 / 0.3)"
            : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: 36,
              height: 36,
              borderRadius: 10,
              background: tokens.pageBgDeep,
              border: `1px solid ${tokens.hairline}`,
              flexShrink: 0,
            }}
          >
            <Ico size={17} weight="duotone" color={tokens.ink} aria-hidden />
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tokens.brand,
            }}
          >
            {resource.kind}
          </span>
        </div>

        <h3
          style={{
            fontFamily: FONT,
            fontSize: 16.5,
            fontWeight: 600,
            color: tokens.ink,
            letterSpacing: "-0.015em",
            lineHeight: 1.25,
            marginBottom: 8,
            flex: 1,
          }}
        >
          {resource.title}
        </h3>

        <p style={{ color: tokens.muted, fontSize: 13.5, lineHeight: 1.55, marginBottom: 16 }}>
          {resource.body}
        </p>

        {resource.gated ? (
          <Gated note={resource.gateNote}>
            <span style={{ fontSize: 12.5, color: tokens.body }}>PDF link TBD</span>
          </Gated>
        ) : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: tokens.brand,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Read more{" "}
            <ArrowRight
              size={12}
              weight="bold"
              aria-hidden
              style={{
                transform: hover ? "translateX(3px)" : "none",
                transition: "transform .16s ease",
              }}
            />
          </span>
        )}
      </a>
    </Rise>
  );
}

/* ---- support tile ---- */
function SupportTile({
  title,
  body,
  to,
}: {
  title: string;
  body: string;
  to: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "18px 20px",
        background: tokens.card,
        border: `1px solid ${hover ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 14,
        textDecoration: "none",
        transition: "border-color .2s ease",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 600,
            color: tokens.ink,
            letterSpacing: "-0.01em",
            marginBottom: 3,
          }}
        >
          {title}
        </p>
        <p style={{ color: tokens.muted, fontSize: 13, lineHeight: 1.45 }}>{body}</p>
      </div>
      <ArrowRight
        size={15}
        weight="bold"
        color={tokens.brand}
        aria-hidden
        style={{
          flexShrink: 0,
          transform: hover ? "translateX(3px)" : "none",
          transition: "transform .16s ease",
          opacity: hover ? 1 : 0.55,
        }}
      />
    </Link>
  );
}
