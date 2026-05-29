import { useState } from "react";
import { Link } from "react-router-dom";

/*
  V2 menu bar — iteration 3.

  Changes from iter 2:
  - True-centered audience nav (grid layout — logo/nav/CTA each get their own column)
  - Content width capped at 1280px (var(--container-xl))
  - Softer everywhere: radii bumped up, hover backgrounds rounded-xl
  - Mega menu featured card has an actual image placeholder (post-tile feel)
  - All sharp edges bumped to at least 12-24px

  Spec locked: Inter 13px / 500 medium throughout. Pill CTAs.
*/

type SubSolution = { label: string; href: string; sub?: string };
type SecondaryLink = { label: string; href: string };
type Audience = {
  key: string;
  label: string;
  subSolutions: SubSolution[];
  secondary: SecondaryLink[];
  featured: { eyebrow: string; title: string; cta: string; tint: string };
};

const AUDIENCES: Audience[] = [
  {
    key: "homes",
    label: "Homes",
    subSolutions: [
      { label: "Apartment", href: "/solutions/homes/apartment", sub: "3–5 kWh shared backup" },
      { label: "Small home", href: "/solutions/homes/small-home", sub: "5–10 kWh, ROI in 4–5 years" },
      { label: "Large home", href: "/solutions/homes/large-home", sub: "15–21 kWh modular stack" },
      { label: "Solar + Storage combo", href: "/solutions/homes/solar-storage-combo", sub: "Bundle with rooftop solar" },
    ],
    secondary: [
      { label: "Home backup calculator", href: "/resources/calculators/home-backup" },
      { label: "Solar combo financing", href: "/resources/financing/residential" },
      { label: "Find an installer", href: "/partners?type=residential" },
      { label: "Homeowner case studies", href: "/resources/case-studies?audience=homes" },
    ],
    featured: {
      eyebrow: "FEATURED CASE",
      title: "How a Goa villa pays back in 38 months",
      cta: "Read the case →",
      tint: "linear-gradient(135deg, oklch(0.58 0.245 27) 0%, oklch(0.32 0.18 18) 100%)",
    },
  },
  {
    key: "offices",
    label: "Offices & Industrial",
    subSolutions: [
      { label: "Small office", href: "/solutions/offices/small-office", sub: "30 kWh ATLAS 01" },
      { label: "Mid office", href: "/solutions/offices/mid-office", sub: "100 kWh ATLAS 03" },
      { label: "Large campus", href: "/solutions/offices/large-campus", sub: "ATLAS 04 + container" },
      { label: "Factory backup", href: "/solutions/offices/factory-backup", sub: "Diesel-displacement industrial" },
    ],
    secondary: [
      { label: "Demand-charge audit", href: "/resources/calculators/demand-charge" },
      { label: "Site survey & sizing", href: "/contact?intent=site-survey" },
      { label: "Commercial financing", href: "/resources/financing/commercial" },
      { label: "Industrial case studies", href: "/resources/case-studies?audience=industrial" },
    ],
    featured: {
      eyebrow: "FEATURED CASE",
      title: "GIDC Verna factory — 40% demand-charge cut",
      cta: "Read the case →",
      tint: "linear-gradient(135deg, oklch(0.35 0.05 240) 0%, oklch(0.18 0.04 240) 100%)",
    },
  },
  {
    key: "institute",
    label: "Institute",
    subSolutions: [
      { label: "School", href: "/solutions/institute/school", sub: "Daytime solar + backup for labs" },
      { label: "College", href: "/solutions/institute/college", sub: "Hostel block backup + canteen load" },
      { label: "University", href: "/solutions/institute/universite", sub: "Multi-block campus portfolio" },
    ],
    secondary: [
      { label: "MNRE education subsidies", href: "/resources/financing/education" },
      { label: "Sustainability reporting", href: "/resources/whitepapers/education-sustainability" },
      { label: "Campus audit", href: "/contact?intent=campus-audit" },
      { label: "Education case studies", href: "/resources/case-studies?audience=institute" },
    ],
    featured: {
      eyebrow: "WHITEPAPER",
      title: "Net-zero in 5 years for a 1,500-student campus",
      cta: "Download →",
      tint: "linear-gradient(135deg, oklch(0.45 0.12 145) 0%, oklch(0.22 0.06 145) 100%)",
    },
  },
  {
    key: "enterprises",
    label: "Enterprises",
    subSolutions: [
      { label: "Data centers", href: "/solutions/enterprises/data-centers", sub: "Mission-critical UPS replacement" },
      { label: "Telecom towers", href: "/solutions/enterprises/telecom-towers", sub: "Diesel-free tower portfolios" },
      { label: "Hospitals", href: "/solutions/enterprises/hospitals", sub: "Tier-3 clinical backup" },
      { label: "Multi-site portfolio", href: "/solutions/enterprises/multi-site", sub: "Centralized SLA + reporting" },
    ],
    secondary: [
      { label: "Enterprise SLA terms", href: "/support/sla" },
      { label: "Compliance & certifications", href: "/about/compliance" },
      { label: "Portfolio onboarding brief", href: "/resources/whitepapers/enterprise-onboarding" },
      { label: "Enterprise case studies", href: "/resources/case-studies?audience=enterprises" },
    ],
    featured: {
      eyebrow: "FEATURED CASE",
      title: "Telecom operator: 480 towers, zero diesel",
      cta: "Read the case →",
      tint: "linear-gradient(135deg, oklch(0.25 0.02 270) 0%, oklch(0.15 0.005 270) 100%)",
    },
  },
  {
    key: "hospitality",
    label: "Hospitality",
    subSolutions: [
      { label: "Hotels", href: "/solutions/hospitality/hotels", sub: "Backup + guest amenity story" },
      { label: "Resorts", href: "/solutions/hospitality/resorts", sub: "Off-grid hybrid for remote properties" },
      { label: "Restaurants", href: "/solutions/hospitality/restaurants", sub: "Equipment backup + peak shave" },
      { label: "Malls", href: "/solutions/hospitality/malls", sub: "Common-area backup + tenant resilience" },
    ],
    secondary: [
      { label: "Hotel ROI calculator", href: "/resources/calculators/hotel-roi" },
      { label: "Off-grid resort sizing", href: "/contact?intent=resort-sizing" },
      { label: "Find a hospitality installer", href: "/partners?type=hospitality" },
      { label: "Hospitality case studies", href: "/resources/case-studies?audience=hospitality" },
    ],
    featured: {
      eyebrow: "FEATURED CASE",
      title: "Boutique hotel chain: ₹14L annual diesel saved",
      cta: "Read the case →",
      tint: "linear-gradient(135deg, oklch(0.55 0.12 65) 0%, oklch(0.28 0.07 45) 100%)",
    },
  },
];

const UTILITY = ["About", "Partners", "Platform", "Resources", "Support", "Contact", "Sign in"];

const MENU_TEXT = "text-[13px] font-medium tracking-normal";
const CONTAINER = "mx-auto w-full max-w-[1280px] px-8";

export default function V2MenuRoute() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      <PreviewHeader />

      {/* Top utility bar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-alt-bg)]">
        <div className={`${CONTAINER} h-10 flex items-center justify-between`}>
          <span className={`${MENU_TEXT} text-[var(--color-text-muted)]`}>
            The Open Energy Platform
          </span>
          <nav>
            <ul className="flex items-center gap-0.5">
              {UTILITY.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`${MENU_TEXT} px-3 py-1.5 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-card-on-section)] transition-colors duration-150`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main nav + mega-menu — single hover region */}
      <div className="sticky top-0 z-50" onMouseLeave={() => setActive(null)}>
        <header className="border-b border-[var(--color-border)] bg-[var(--color-page-bg)]/90 backdrop-blur">
          <div className={`${CONTAINER} h-16 grid grid-cols-[1fr_auto_1fr] items-center gap-6`}>
            {/* Logo (left column, left-aligned) */}
            <div className="justify-self-start">
              <Link to="/" className="flex items-center gap-2.5" aria-label="GridEnergy home">
                <span
                  aria-hidden="true"
                  className="h-8 w-8 rounded-2xl bg-[var(--color-gp-red)]"
                />
                <span className={`${MENU_TEXT} text-[var(--color-text-heading)]`}>
                  GridEnergy
                </span>
              </Link>
            </div>

            {/* Audience nav (center column — TRUE centered via grid justify-self) */}
            <nav className="justify-self-center">
              <ul className="flex items-center gap-0.5">
                {AUDIENCES.map((aud) => {
                  const isActive = active === aud.key;
                  return (
                    <li key={aud.key}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(aud.key)}
                        onFocus={() => setActive(aud.key)}
                        className={`${MENU_TEXT} flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors duration-150 ${
                          isActive
                            ? "text-[var(--color-text-heading)] bg-[var(--color-card-on-section)]"
                            : "text-[var(--color-text-body)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-card-on-section)]"
                        }`}
                      >
                        {aud.label}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          aria-hidden="true"
                          className={`transition-transform duration-150 ${isActive ? "rotate-180" : ""}`}
                        >
                          <path
                            d="M2.5 3.75L5 6.25L7.5 3.75"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA pills (right column, right-aligned) */}
            <div className="justify-self-end flex items-center gap-2">
              <button
                type="button"
                className={`${MENU_TEXT} px-3 py-2 rounded-full text-[var(--color-text-body)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-card-on-section)] transition-colors duration-150`}
              >
                Talk to sales
              </button>
              <button
                type="button"
                className={`${MENU_TEXT} px-4 py-2 rounded-full bg-[var(--color-gp-red)] text-[var(--color-neutral-50)] hover:bg-[var(--color-gp-red-hover)] transition-colors duration-150`}
              >
                Get early access
              </button>
            </div>
          </div>
        </header>

        {active && (
          <div className="pointer-events-none">
            <div className={`${CONTAINER} pt-3 pb-2 pointer-events-auto`}>
              <MegaPanel audience={AUDIENCES.find((a) => a.key === active)!} />
            </div>
          </div>
        )}
      </div>

      {/* Placeholder body — also capped at 1280 */}
      <main className={`${CONTAINER} py-32`}>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
          V2 · iteration 3 — true center, 1280, softer everywhere
        </p>
        <h1 className="mb-6 font-display text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--color-text-heading)] max-w-3xl">
          Hover any audience.
        </h1>
        <p className="max-w-2xl text-lg leading-[1.625] text-[var(--color-text-body)]">
          Audience nav is now true-centered using a 3-column grid (logo left, nav center, CTAs
          right). Content adapted to 1280px max-width. Radii rounded up everywhere — logo mark
          (16px), nav-item hover (12px), featured cards (24px). Mega-menu featured tile has a real
          image placeholder with audience-specific tint.
        </p>
      </main>
    </div>
  );
}

function MegaPanel({ audience }: { audience: Audience }) {
  return (
    <div
      className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-card-on-page)] shadow-[0_32px_64px_-24px_rgba(20,15,15,0.18)]"
    >
      <div className="px-10 py-10 grid grid-cols-12 gap-10">
        {/* Primary: sub-solutions */}
        <div className="col-span-6">
          <p className="mb-5 font-mono uppercase tracking-[0.08em] text-[var(--color-gp-red)] text-[11px]">
            Solutions for {audience.label.toLowerCase()}
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {audience.subSolutions.map((sub) => (
              <li key={sub.href}>
                <a
                  href={sub.href}
                  className="block rounded-2xl px-3 py-2.5 -mx-3 hover:bg-[var(--color-alt-bg)] transition-colors duration-150"
                >
                  <span className={`${MENU_TEXT} block text-[var(--color-text-heading)]`}>
                    {sub.label}
                  </span>
                  {sub.sub && (
                    <span className="block text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">
                      {sub.sub}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Secondary: related actions */}
        <div className="col-span-3">
          <p className="mb-5 font-mono uppercase tracking-[0.08em] text-[var(--color-text-muted)] text-[11px]">
            Get specific
          </p>
          <ul className="space-y-1">
            {audience.secondary.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${MENU_TEXT} block rounded-xl px-3 py-2 -mx-3 text-[var(--color-text-body)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-alt-bg)] transition-colors duration-150`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured tile with image placeholder */}
        <div className="col-span-3">
          <a
            href="#"
            className="group block rounded-3xl overflow-hidden bg-[var(--color-neutral-900)] text-[var(--color-neutral-50)] hover:scale-[1.01] transition-transform duration-200"
          >
            {/* Image placeholder — audience-tinted gradient */}
            <div
              className="aspect-[4/3] relative"
              style={{ backgroundImage: audience.featured.tint }}
            >
              <span
                aria-hidden="true"
                className="absolute top-4 left-4 h-7 w-7 rounded-xl bg-[var(--color-neutral-50)]/12 backdrop-blur"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[oklch(0_0_0_/_0.4)] to-transparent"
              />
            </div>
            {/* Caption */}
            <div className="p-5">
              <p className="font-mono uppercase tracking-[0.08em] text-[11px] text-[var(--color-gp-red-tinted)] mb-2">
                {audience.featured.eyebrow}
              </p>
              <p className="font-display text-base leading-[1.3] mb-4">
                {audience.featured.title}
              </p>
              <p className={`${MENU_TEXT} text-[var(--color-neutral-300)] group-hover:text-[var(--color-neutral-50)] transition-colors`}>
                {audience.featured.cta}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function PreviewHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-neutral-900)] text-[var(--color-neutral-50)] px-8 py-3 flex items-center gap-6">
      <Link
        to="/preview"
        className="font-mono text-xs tracking-[0.08em] uppercase text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-50)] transition-colors"
      >
        ← all variants
      </Link>
      <div className="h-4 w-px bg-[var(--color-neutral-700)]" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red-muted)]">
        V2 · ITERATION 3
      </span>
      <span className="font-medium text-sm">True center · 1280 · rounded · featured image tile</span>
      <span className="font-mono text-xs text-[var(--color-neutral-500)]">/preview/v2-menu</span>
    </header>
  );
}
