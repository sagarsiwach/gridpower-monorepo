/*
  SolutionTemplate — the reusable audience solution page baseline.

  Homes is the deep, hand-built reference assembly; the other four audiences
  (Offices & Industrial, Institutes, Enterprises, Hospitality) render through
  this template with swapped content. Same block vocabulary, swapped data —
  which is exactly the composable architecture the Homes spine calls for.

  All hard numbers belong in <Gated>; this template never prints raw figures.
*/

import type { Icon } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";
import {
  PageHero,
  Section,
  SectionHeading,
  CardGrid,
  FeatureCard,
  CTASection,
  Container,
  Kicker,
  Reveal,
} from "../marketing/Primitives";

export type SolutionData = {
  kicker: string;
  title: string;
  subtitle: string;
  productHint: string; // e.g. "Micro & Mega families"
  solutions: { icon: Icon; name: string; sub: string }[];
  problems: string[];
  outcomes: { icon: Icon; title: string; body: string }[];
};

export function SolutionTemplate({ data }: { data: SolutionData }) {
  return (
    <main>
      <PageHero
        kicker={data.kicker}
        title={data.title}
        subtitle={data.subtitle}
        primary={{ label: "Book a free site survey", to: "/contact" }}
        secondary={{ label: "How GridOS works", to: "/platform" }}
      />

      {/* Solutions grid — show the range immediately */}
      <Section>
        <SectionHeading
          kicker="Solutions"
          title="Which one fits your site."
          intro={`Storage sized to your load, powered by ${data.productHint} and run by GridOS. Final sizing is confirmed at survey.`}
        />
        <CardGrid cols={4}>
          {data.solutions.map((s) => (
            <FeatureCard key={s.name} icon={s.icon} title={s.name} body={s.sub} />
          ))}
        </CardGrid>
      </Section>

      {/* The problem it solves */}
      <Section alt>
        <Container>
          <div className="md:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "start" }}>
            <Reveal>
              <div>
                <Kicker>The problem it kills</Kicker>
                <h2 style={{ color: tokens.ink, fontSize: "clamp(26px,3vw,38px)", fontWeight: 600, letterSpacing: "-0.025em", marginTop: 14, lineHeight: 1.1, maxWidth: "16ch" }}>
                  You know the pain. Here's what storage removes.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ul style={{ display: "grid", gap: 14 }}>
                {data.problems.map((p) => (
                  <li key={p} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 12, padding: "14px 16px" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand, flexShrink: 0, marginTop: 7 }} />
                    <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Outcomes */}
      <Section>
        <SectionHeading kicker="Outcomes" title="What you actually get." />
        <CardGrid cols={3}>
          {data.outcomes.map((o) => (
            <FeatureCard key={o.title} icon={o.icon} title={o.title} body={o.body} />
          ))}
        </CardGrid>
      </Section>

      <CTASection
        title="See a system sized for your site."
        subtitle="Book a free survey — we'll assess your load and show the economics."
        secondary={{ label: "Explore the range", to: "/products" }}
      />
    </main>
  );
}
