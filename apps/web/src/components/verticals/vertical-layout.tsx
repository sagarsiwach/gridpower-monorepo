/**
 * VerticalLayout: shared page template for /energy, /charge, /drive.
 *
 * Each vertical passes its own data object; this component handles
 * all section structure and DS component wiring.
 */
import { Link } from "react-router";
import {
  Button,
  SectionLabel,
  SectionDivider,
  SectionHeader,
  DotGrid,
  ProcessSteps,
  CTASection,
  type ProcessStep,
} from "@gridpower/ui";

// ─── Data shapes ─────────────────────────────────────────────────────────────

export interface NavLink {
  title: string;
  hook: string;
  href: string;
}

export interface SolutionItem {
  label: string;
  title: string;
  sub: string;
  href: string;
}

export interface ProductItem {
  name: string;
  spec: string;
  category: string;
}

export interface VerticalData {
  /** Sub-brand name, e.g. "GridEnergy" */
  brandName: string;
  /** Path to sub-brand logo SVG, e.g. "/logos/logo-gridenergy.svg" */
  logoSrc: string;
  /** Hero eyebrow label */
  heroLabel: string;
  /** Hero H1 */
  heroHeadline: string;
  /** Hero sub-copy */
  heroSub: string;
  /** Primary CTA label */
  heroCta1: string;
  /** Primary CTA route */
  heroCta1Href: string;
  /** Secondary CTA label */
  heroCta2: string;
  /** Secondary CTA route */
  heroCta2Href: string;
  /** Problem stat (big number / phrase) */
  problemStat: string;
  /** Problem sub-copy */
  problemSub: string;
  /** 4-item subsection nav */
  navLinks: [NavLink, NavLink, NavLink, NavLink];
  /** Solutions grid items */
  solutions: SolutionItem[];
  /** Featured products */
  products: ProductItem[];
  /** Products route */
  productsHref: string;
  /** Business model teaser stat */
  bmStat: string;
  /** Business model teaser sub-copy */
  bmSub: string;
  /** How-it-works steps */
  howItWorks: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
  /** CTA section headline */
  ctaHeadline: string;
}

// ─── Inner sections ───────────────────────────────────────────────────────────

function VerticalHero({
  logoSrc,
  brandName,
  label,
  headline,
  sub,
  cta1,
  cta1Href,
  cta2,
  cta2Href,
}: {
  logoSrc: string;
  brandName: string;
  label: string;
  headline: string;
  sub: string;
  cta1: string;
  cta1Href: string;
  cta2: string;
  cta2Href: string;
}) {
  return (
    <section className="relative overflow-hidden bg-sand-1 min-h-[80vh] flex items-center py-20">
      <DotGrid color="var(--sand-5)" />
      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <img
            src={logoSrc}
            alt={`${brandName} logo`}
            className="h-8 mb-8 object-contain object-left"
          />
          <SectionLabel>{label}</SectionLabel>
          <h1 className="font-heading text-display tracking-tight leading-tight text-sand-12 mb-6">
            {headline}
          </h1>
          <p className="font-body text-body-lg text-sand-11 leading-relaxed max-w-lg mb-10">
            {sub}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={cta1Href}>{cta1}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to={cta2Href}>{cta2}</Link>
            </Button>
          </div>
        </div>
        {/* Right: typography moment, drenched dark band with brand wordmark + spec stack */}
        <div className="relative overflow-hidden rounded-card bg-sand-12 aspect-[4/3] flex flex-col justify-between p-10">
          <DotGrid color="rgba(58,57,55,0.55)" />
          <div className="relative">
            <p className="font-mono text-label uppercase tracking-widest text-grid-red mb-2">
              {label}
            </p>
            <div className="font-display text-[clamp(40px,5vw,72px)] font-semibold leading-[0.95] text-dark-12 tracking-tight">
              {brandName}
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="font-mono text-label uppercase tracking-widest text-dark-9 mb-1">
                LAUNCH
              </p>
              <p className="font-heading text-body-lg font-semibold text-dark-12">
                Q2 2026
              </p>
            </div>
            <div>
              <p className="font-mono text-label uppercase tracking-widest text-dark-9 mb-1">
                MADE IN
              </p>
              <p className="font-heading text-body-lg font-semibold text-dark-12">
                Dharwad, IN
              </p>
            </div>
            <div>
              <p className="font-mono text-label uppercase tracking-widest text-dark-9 mb-1">
                SPECS
              </p>
              <p className="font-heading text-body-lg font-semibold text-dark-12">
                Open · No NDA
              </p>
            </div>
            <div>
              <p className="font-mono text-label uppercase tracking-widest text-dark-9 mb-1">
                PROTOCOL
              </p>
              <p className="font-heading text-body-lg font-semibold text-dark-12">
                REST · MQTT
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemStat({ stat, sub }: { stat: string; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-sand-12 py-20">
      <DotGrid color="rgba(58,57,55,0.6)" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="font-display text-[clamp(48px,7vw,96px)] font-semibold text-grid-red leading-none mb-5">
          {stat}
        </div>
        <p className="font-body text-body-lg text-dark-11 leading-relaxed max-w-xl mx-auto">
          {sub}
        </p>
      </div>
    </section>
  );
}

function QuickNavGrid({ items }: { items: [NavLink, NavLink, NavLink, NavLink] }) {
  return (
    <section className="bg-sand-1 py-20">
      <SectionDivider />
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand-6 rounded-card overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group bg-sand-1 p-7 flex flex-col hover:bg-sand-3 transition-colors duration-fast"
            >
              <div className="w-8 h-8 bg-sand-3 rounded-md mb-4 flex items-center justify-center group-hover:bg-sand-4 transition-colors duration-fast">
                <div className="w-3.5 h-3.5 bg-sand-7 rounded-sm" aria-hidden="true" />
              </div>
              <div className="font-heading text-h4 text-sand-12 mb-1.5">{item.title}</div>
              <div className="font-body text-body-sm text-sand-11 leading-relaxed mb-3 flex-1">
                {item.hook}
              </div>
              <div className="font-body text-body-sm text-grid-red font-medium">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsGrid({ items }: { items: SolutionItem[] }) {
  return (
    <section className="bg-sand-2 py-20">
      <SectionDivider />
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <SectionHeader
          label="SOLUTIONS"
          heading="Find your application."
          className="mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-sand-6 rounded-card overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group bg-sand-1 hover:bg-sand-2 transition-colors duration-fast flex flex-col min-h-[260px]"
            >
              {/* Image zone */}
              <div className="relative h-36 bg-sand-3 overflow-hidden flex items-center justify-center">
                <DotGrid color="var(--sand-5)" />
                <span className="relative font-mono text-label text-sand-8 uppercase tracking-widest z-10">
                  {item.label} · IMAGE
                </span>
              </div>
              {/* Copy zone */}
              <div className="p-6 flex flex-col flex-1">
                <SectionLabel className="mb-1">{item.label}</SectionLabel>
                <div className="font-heading text-h4 text-sand-12 mb-1.5">{item.title}</div>
                <div className="font-body text-body-sm text-sand-11 leading-relaxed mb-4 flex-1">
                  {item.sub}
                </div>
                <div className="font-body text-body-sm text-grid-red font-medium">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts({
  items,
  productsHref,
}: {
  items: ProductItem[];
  productsHref: string;
}) {
  return (
    <section className="bg-sand-1 py-20">
      <SectionDivider />
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader label="PRODUCTS" heading="The hardware." />
          <Link
            to={productsHref}
            className="font-body text-body-sm text-grid-red font-medium hover:underline hidden sm:block"
          >
            View all products →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((product) => (
            <div
              key={product.name}
              className="border border-border rounded-card overflow-hidden bg-sand-1"
            >
              {/* Drenched dark band with category + product wordmark */}
              <div className="relative overflow-hidden bg-sand-12 aspect-[16/9] flex flex-col justify-between p-6">
                <DotGrid color="rgba(58,57,55,0.55)" />
                <p className="relative font-mono text-label uppercase tracking-widest text-grid-red">
                  {product.category}
                </p>
                <p className="relative font-display text-h2 font-semibold leading-[0.95] text-dark-12 tracking-tight">
                  {product.name}
                </p>
              </div>
              <div className="p-5">
                <div className="font-mono text-label text-grid-red mb-1">{product.category}</div>
                <div className="font-heading text-h4 text-sand-12 mb-1">{product.name}</div>
                <div className="font-body text-body-sm text-sand-11">{product.spec}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <Link
            to={productsHref}
            className="font-body text-body-sm text-grid-red font-medium"
          >
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}

function BusinessModelTeaser({ stat, sub }: { stat: string; sub: string }) {
  return (
    <section className="relative overflow-hidden bg-grid-red py-16">
      <DotGrid color="rgba(255,255,255,0.15)" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <div className="font-display text-[clamp(40px,6vw,80px)] font-semibold text-white leading-none mb-4">
          {stat}
        </div>
        <p className="font-body text-body-lg text-white/85 mb-8">{sub}</p>
        <Button asChild variant="ghost" size="lg" className="bg-white text-grid-red border-white hover:bg-sand-2">
          <Link to="/contact">See the complete financial model</Link>
        </Button>
      </div>
    </section>
  );
}

function HowItWorksSection({
  steps,
}: {
  steps: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
}) {
  return (
    <section className="bg-sand-2 py-20">
      <SectionDivider />
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <SectionHeader
          label="HOW IT WORKS"
          heading="From inquiry to live."
          className="mb-10"
        />
        <ProcessSteps steps={steps} />
      </div>
    </section>
  );
}

// ─── Exported layout ─────────────────────────────────────────────────────────

export function VerticalLayout({ data }: { data: VerticalData }) {
  return (
    <div>
      <VerticalHero
        logoSrc={data.logoSrc}
        brandName={data.brandName}
        label={data.heroLabel}
        headline={data.heroHeadline}
        sub={data.heroSub}
        cta1={data.heroCta1}
        cta1Href={data.heroCta1Href}
        cta2={data.heroCta2}
        cta2Href={data.heroCta2Href}
      />
      <ProblemStat stat={data.problemStat} sub={data.problemSub} />
      <QuickNavGrid items={data.navLinks} />
      <SolutionsGrid items={data.solutions} />
      <FeaturedProducts items={data.products} productsHref={data.productsHref} />
      <BusinessModelTeaser stat={data.bmStat} sub={data.bmSub} />
      <HowItWorksSection steps={data.howItWorks} />
      <CTASection
        variant="dark"
        heading={data.ctaHeadline}
        description="Launching Q2 2026. Get in touch to register interest."
        primaryCta={
          <Button asChild size="lg" variant="ghost" className="bg-white text-grid-red border-white hover:bg-sand-2">
            <Link to="/contact">Get early access</Link>
          </Button>
        }
        secondaryCta={
          <Button asChild variant="ghost" size="lg" className="text-dark-11 hover:text-dark-12">
            <Link to="/energy">View all verticals</Link>
          </Button>
        }
      />
    </div>
  );
}
