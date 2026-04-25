/**
 * SolutionLayout: shared template for all 5 solution pages.
 *
 * Slot order:
 *  1. Hero (breadcrumb + headline + CTAs + full-bleed image)
 *  2. Problem / Solution grid
 *  3. Diagram / architecture image
 *  4. Benefits grid (FeatureCard × 3–6)
 *  5. Specs table
 *  6. Process steps ("How it works")
 *  7. Case study / partner placeholder
 *  8. Platform tie-in (optional)
 *  9. CTA
 *
 * Each route passes only the data; layout and polish live here.
 */

import * as React from "react";
import { Link } from "react-router";
import {
  Button,
  SectionLabel,
  SectionHeader,
  SectionDivider,
  FeatureCard,
  SpecTable,
  Breadcrumb,
  CTASection,
  DotGrid,
  ProcessSteps,
} from "@gridpower/ui";
import type { SpecRow, ProcessStep } from "@gridpower/ui";

// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface PainCard {
  title: string;
  sub: string;
}

export interface SolutionCard {
  title: string;
  sub: string;
}

export interface BenefitCard {
  title: string;
  description: string;
  label?: string;
}

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface SolutionLayoutProps {
  /** Breadcrumb items; last entry is the current page (no href). */
  breadcrumb: BreadcrumbEntry[];

  /** Hero section */
  heroLabel: string;
  heroHeadline: string;
  heroTagline: string;
  heroBgLabel: string;

  /** Primary CTA href (defaults to /contact) */
  primaryCtaHref?: string;
  primaryCtaLabel?: string;

  /** Secondary CTA href (e.g. /energy, /charge, /drive) */
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;

  /** Problem / Solution two-column grid */
  pains: PainCard[];
  solutions: SolutionCard[];

  /** Architecture / diagram placeholder */
  diagramLabel: string;

  /** Benefits grid (3–6 FeatureCards) */
  benefits: BenefitCard[];

  /** Key specs table rows */
  specs: SpecRow[];

  /** "How it works" steps */
  steps: ProcessStep[];

  /** Platform tie-in (optional) */
  platformLabel?: string;
  platformFeatures?: string[];
  platformCtaLabel?: string;
  platformCtaHref?: string;

  /** Bottom CTA headline */
  ctaHeadline: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SolutionLayout({
  breadcrumb,
  heroLabel,
  heroHeadline,
  heroTagline,
  heroBgLabel,
  primaryCtaHref = "/contact",
  primaryCtaLabel = "Get a quote",
  secondaryCtaHref,
  secondaryCtaLabel,
  pains,
  solutions,
  diagramLabel,
  benefits,
  specs,
  steps,
  platformLabel,
  platformFeatures,
  platformCtaLabel = "See the platform",
  platformCtaHref = "/platform",
  ctaHeadline,
}: SolutionLayoutProps) {
  return (
    <div className="bg-background text-foreground">
      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden bg-sand-12">
        {/* Grid motif */}
        <DotGrid color="rgba(58,57,55,0.5)" />

        {/* Full-bleed image placeholder */}
        <div className="absolute inset-0 bg-dark-2 flex items-center justify-center">
          <span className="font-mono text-[10px] text-dark-8 uppercase tracking-widest">
            {heroBgLabel} · FULL-BLEED IMAGE
          </span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Breadcrumb items={breadcrumb} />
          </div>

          <SectionLabel variant="neutral">{heroLabel}</SectionLabel>

          <h1 className="font-heading text-display font-semibold text-white tracking-tight leading-[1.05] mb-5 max-w-2xl">
            {heroHeadline}
          </h1>

          <p className="font-body text-body-lg text-white/75 max-w-lg leading-relaxed mb-8">
            {heroTagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={primaryCtaHref}>{primaryCtaLabel}</Link>
            </Button>
            {secondaryCtaHref && secondaryCtaLabel && (
              <Button asChild variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                <Link to={secondaryCtaHref}>{secondaryCtaLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM / SOLUTION ─────────────────────────────────────────────── */}
      <section className="bg-sand-1 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start">
            {/* Pains */}
            <div>
              <SectionLabel>THE CHALLENGE</SectionLabel>
              <div className="flex flex-col gap-4">
                {pains.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-card border border-border bg-sand-2 p-5"
                  >
                    <p className="font-heading text-[15px] font-semibold text-foreground mb-1.5">
                      {p.title}
                    </p>
                    <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                      {p.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center pt-10">
              <span className="font-mono text-body-lg text-grid-red">→</span>
            </div>

            {/* Solutions */}
            <div>
              <SectionLabel>THE SOLUTION</SectionLabel>
              <div className="flex flex-col gap-4">
                {solutions.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-card border border-border border-l-[3px] border-l-grid-red bg-sand-2 p-5"
                  >
                    <p className="font-heading text-[15px] font-semibold text-foreground mb-1.5">
                      {s.title}
                    </p>
                    <p className="font-body text-body-sm text-sand-11 leading-relaxed">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DIAGRAM / ARCHITECTURE ─────────────────────────────────────────── */}
      <section className="bg-sand-2 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionLabel>SYSTEM ARCHITECTURE</SectionLabel>
          <h2 className="font-heading text-h2 font-semibold text-sand-12 tracking-tight mb-10 max-w-3xl">
            {diagramLabel}
          </h2>
          {/* ASCII-style stage diagram derived from diagramLabel arrows */}
          <div className="flex flex-col gap-px overflow-hidden rounded-card border border-sand-6 md:flex-row">
            {diagramLabel.split(/\s*→\s*/).map((stage, i, arr) => (
              <div
                key={`${stage}-${i}`}
                className={[
                  "flex-1 p-6 flex flex-col justify-between min-h-[140px]",
                  i % 2 === 1 ? "bg-sand-12" : "bg-sand-1",
                ].join(" ")}
              >
                <div
                  className={[
                    "font-mono text-label uppercase tracking-widest mb-3",
                    i % 2 === 1 ? "text-grid-red" : "text-sand-9",
                  ].join(" ")}
                >
                  Stage {String(i + 1).padStart(2, "0")}
                  {i === arr.length - 1 ? " · OUT" : ""}
                </div>
                <p
                  className={[
                    "font-body text-body-sm leading-relaxed",
                    i % 2 === 1 ? "text-dark-11" : "text-sand-11",
                  ].join(" ")}
                >
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BENEFITS GRID ──────────────────────────────────────────────────── */}
      <section className="bg-sand-1 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionHeader
            label="WHY GRIDPOWER"
            heading="Built for the job."
            className="mb-10"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <FeatureCard
                key={i}
                label={b.label}
                title={b.title}
                description={b.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. KEY SPECS ──────────────────────────────────────────────────────── */}
      <section className="bg-sand-2 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionLabel>KEY SPECIFICATIONS</SectionLabel>
          <h2 className="font-heading text-h2 text-foreground mb-8">
            Full specs. No NDA.
          </h2>
          <div className="max-w-xl">
            <SpecTable rows={specs} />
          </div>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="bg-sand-1 py-20">
        <SectionDivider />
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <SectionHeader
            label="HOW IT WORKS"
            heading="From survey to live."
            className="mb-10"
          />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* ── 7. CASE STUDY / PARTNER PLACEHOLDER ───────────────────────────────── */}
      <section className="bg-sand-12 py-20 relative overflow-hidden">
        <DotGrid color="rgba(58,57,55,0.55)" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <SectionLabel variant="neutral">EARLY ADOPTERS</SectionLabel>
          <h2 className="font-heading text-h2 text-dark-12 mb-4">
            Early partner pilots Q2 2026.
          </h2>
          <p className="font-body text-body-lg text-dark-11 max-w-xl leading-relaxed mb-8">
            We are onboarding pilot partners ahead of general availability.
            Pilot customers get priority engineering support, fixed early-adopter
            pricing, and a direct line to the product team.
          </p>
          <Button asChild>
            <Link to="/contact">Become a pilot partner</Link>
          </Button>
        </div>
      </section>

      {/* ── 8. PLATFORM TIE-IN (optional) ─────────────────────────────────────── */}
      {platformLabel && platformFeatures && (
        <section className="bg-sand-12 py-20 relative overflow-hidden border-t border-dark-6">
          <DotGrid color="rgba(58,57,55,0.55)" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 grid grid-cols-1 gap-20 md:grid-cols-2 md:items-center">
            <div>
              <SectionLabel variant="neutral">THE PLATFORM</SectionLabel>
              <h2 className="font-heading text-h2 text-dark-12 tracking-tight leading-tight mb-8">
                Every asset. One dashboard.
              </h2>
              <ul className="flex flex-col gap-4 mb-10">
                {platformFeatures.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-grid-red" />
                    <span className="font-body text-body text-dark-11 leading-relaxed">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link to={platformCtaHref}>{platformCtaLabel}</Link>
              </Button>
            </div>
            {/* Live API preview: matches /platform code-sample voice */}
            <div className="bg-dark-2 border border-dark-6 rounded-card p-6 font-mono text-[12px] leading-relaxed text-dark-11">
              <div className="flex items-center justify-between border-b border-dark-6 pb-3 mb-4">
                <span className="text-grid-red uppercase tracking-widest text-label">
                  GET /v1/sites/{`{id}`}/overview
                </span>
                <span className="text-dark-9 uppercase tracking-widest text-label">
                  200 OK
                </span>
              </div>
              <pre className="text-dark-12 m-0 p-0 whitespace-pre-wrap">{`{
  "label": "${platformLabel}",
  "assets": ${platformFeatures.length},
  "uptime_pct": 99.97,
  "live": true
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* ── 9. BOTTOM CTA ─────────────────────────────────────────────────────── */}
      <CTASection
        heading={ctaHeadline}
        description="Talk to us about your project. We respond within one business day."
        primaryCta={
          <Button asChild size="lg">
            <Link to="/contact">Contact GridPower</Link>
          </Button>
        }
        secondaryCta={
          <Button asChild variant="ghost" size="lg" className="text-dark-12 border-dark-6 hover:bg-dark-3">
            <Link to="/contact?type=demo">Request a demo</Link>
          </Button>
        }
      />
    </div>
  );
}
