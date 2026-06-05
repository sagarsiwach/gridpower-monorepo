/*
  PageStub — temporary on-brand placeholder for routes that are registered but
  not yet fleshed out. Keeps the whole site clickable (breadth-first) without
  ever showing a blank page or a 404. Replaced by the real page per build task.
*/

import { PageHero, Section, CardGrid, FeatureCard, CTASection } from "./Primitives";

export function PageStub({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <main>
      <PageHero
        kicker={kicker ?? "In progress"}
        title={title}
        subtitle={
          subtitle ??
          "This page is being built. The structure and navigation are in place — full content lands shortly."
        }
        primary={{ label: "Book a free site survey", to: "/contact" }}
        secondary={{ label: "Back to home", to: "/" }}
      />
      <Section alt>
        <CardGrid cols={3}>
          <FeatureCard title="Hardware" body="Nano, Micro, Mega, Giga storage families — LFP, modular, India-built." to="/products" />
          <FeatureCard title="GridOS" body="The software layer: monitoring, scheduling, savings, alerts." to="/platform" />
          <FeatureCard title="Homes" body="Silent, lifetime storage that makes your solar worth it." to="/solutions/homes" />
        </CardGrid>
      </Section>
      <CTASection
        title="Storage and energy management, built for India."
        subtitle="Tell us your load and tariff — we'll size a stack and show the economics."
        secondary={{ label: "Explore products", to: "/products" }}
      />
    </main>
  );
}
