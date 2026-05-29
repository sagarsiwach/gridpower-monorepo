import { useState, useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bed,
  BookOpen,
  Books,
  Broadcast,
  Buildings,
  Briefcase,
  BuildingOffice,
  Factory,
  FirstAid,
  ForkKnife,
  GraduationCap,
  HardDrives,
  House,
  HouseLine,
  Lightning,
  Network,
  ShoppingBag,
  SignIn,
  Sun,
  TreePalm,
  type Icon,
} from "@phosphor-icons/react";

import { Logo } from "../../components/Logo";
import { tokens } from "./_v3-tokens";

/*
  v3-megamenu-impeccable — polished + animated iteration on v3-megamenu.
  Key changes vs v3-megamenu:
  - Utility bar removed; Sign In moved into main nav; secondary links folded into panel footer
  - Spotlight splits into two stacked sub-tiles: FEATURED top + PLATFORM/PRODUCTS bottom
  - Staggered entry animation when panel opens (30-40ms child cascade)
  - Directional audience cross-fade (left/right based on tab index delta)
  - Featured column: no side-stripe border (absolute ban); uses bg tint separation instead
  - All spotlight bullets rendered (not just bullets[0])
  - prefers-reduced-motion honored throughout
*/

/* ------------------------------------------------------------------ */
/*  Rect — rounded rectangle wrapper                                   */
/* ------------------------------------------------------------------ */

function Rect({
  children,
  fill,
  stroke,
  strokeWidth = 1,
  cornerRadius = 16,
  className,
  style,
}: {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: fill,
        border: stroke ? `${strokeWidth}px solid ${stroke}` : undefined,
        borderRadius: cornerRadius,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type Audience = {
  key: string;
  label: string;
  kicker: string;
  blurb: string;
  solutions: {
    Icon: Icon;
    name: string;
    sub: string;
    href: string;
    image?: string;
  }[];
  featured: { label: string; meta: string; href: string }[];
  spotlight: {
    kicker: string;
    title: string;
    bullets: string[];
    cta: string;
    // Platform sub-tile
    platformKicker: string;
    platformTitle: string;
    platformSub: string;
    platformCta: string;
    platformHref: string;
  };
};

const AUDIENCES: Audience[] = [
  {
    key: "homes",
    label: "Homes",
    kicker: "01",
    blurb: "Apartment ESS to whole-home storage. Roof solar optional.",
    solutions: [
      { Icon: Buildings, name: "Apartment ESS", sub: "3–7 kWh · single phase", href: "#", image: "/images/solutions/homes-apartment.png" },
      { Icon: House, name: "Small home", sub: "7–15 kWh · single phase", href: "#", image: "/images/solutions/homes-small.png" },
      { Icon: HouseLine, name: "Large home", sub: "15–30 kWh · 3-phase", href: "#", image: "/images/solutions/homes-large.png" },
      { Icon: Sun, name: "Solar storage combo", sub: "Inverter + battery", href: "#", image: "/images/solutions/homes-solar.png" },
    ],
    featured: [
      { label: "Apartment RWA case study", meta: "Pune-02 · 26mo payback", href: "#" },
      { label: "Home ROI calculator", meta: "Run your numbers", href: "#" },
      { label: "Datasheet · Atlas-01", meta: "PDF · 1.2MB", href: "#" },
    ],
    spotlight: {
      kicker: "POPULAR",
      title: "Apartment ESS pack",
      bullets: ["7.4 kWh modular", "Bolts to wall in 2 hours", "Pays back at ₹6/unit"],
      cta: "Configure for your flat",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Home Console",
      platformSub: "Daily meter reads. Per-asset payback math. Open standards.",
      platformCta: "See GridOS",
      platformHref: "#",
    },
  },
  {
    key: "offices",
    label: "Offices & Industrial",
    kicker: "02",
    blurb: "Mid-office UPS to factory backup at 1MW.",
    solutions: [
      { Icon: Briefcase, name: "Small office", sub: "30–80 kWh · UPS", href: "#" },
      { Icon: BuildingOffice, name: "Mid-office UPS", sub: "100–250 kWh · arbitrage", href: "#" },
      { Icon: Buildings, name: "Large campus", sub: "500 kWh+ · multi-feeder", href: "#" },
      { Icon: Factory, name: "Factory backup", sub: "1MW+ · OCPP integrated", href: "#" },
    ],
    featured: [
      { label: "Pune-02 factory case", meta: "22mo payback · 500kW", href: "#" },
      { label: "Office ROI calculator", meta: "Run your tariff", href: "#" },
      { label: "FlexCube 500SL datasheet", meta: "PDF · 2.4MB", href: "#" },
    ],
    spotlight: {
      kicker: "MOST DEPLOYED",
      title: "FlexCube 500SL",
      bullets: ["500 kWh containerised", "Drop-in factory backup", "30 deployed in India"],
      cta: "Schedule a site survey",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Operator Console",
      platformSub: "Tariff-arbitrage scheduler. Fault flags. OCPP 2.0.1 native.",
      platformCta: "See GridOS",
      platformHref: "#",
    },
  },
  {
    key: "institute",
    label: "Institute",
    kicker: "03",
    blurb: "Schools, colleges, university campuses with bursty load patterns.",
    solutions: [
      { Icon: BookOpen, name: "School microgrid", sub: "Backup + roof solar", href: "#" },
      { Icon: Books, name: "College block", sub: "Per-building storage", href: "#" },
      { Icon: GraduationCap, name: "University campus", sub: "Multi-site rollup", href: "#" },
      { Icon: Buildings, name: "Hostels & PG", sub: "Shared-meter packs", href: "#" },
    ],
    featured: [
      { label: "IIT-Goa pilot", meta: "Multi-block · GridOS", href: "#" },
      { label: "Institute funding guide", meta: "PMS scheme · 60% subsidy", href: "#" },
      { label: "Maintenance contracts", meta: "Annual + 4-hour SLA", href: "#" },
    ],
    spotlight: {
      kicker: "PARTNER PROGRAM",
      title: "Education subsidy stack",
      bullets: ["Up to 60% PMS subsidy", "Free design audit", "5-year maintenance bundled"],
      cta: "Talk to education team",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Campus Dashboard",
      platformSub: "Per-building energy ledger. Subsidy tracking. Multi-site.",
      platformCta: "See GridOS",
      platformHref: "#",
    },
  },
  {
    key: "enterprises",
    label: "Enterprises",
    kicker: "04",
    blurb: "Data centers, telecom, hospitals — load-critical with multi-site rollup.",
    solutions: [
      { Icon: HardDrives, name: "Data centers", sub: "Rack UPS + grid storage", href: "#" },
      { Icon: Broadcast, name: "Telecom towers", sub: "Diesel replacement", href: "#" },
      { Icon: FirstAid, name: "Hospitals", sub: "Critical load + stability", href: "#" },
      { Icon: Network, name: "Multi-site", sub: "30+ assets · one console", href: "#" },
    ],
    featured: [
      { label: "Vodafone Idea tower rollout", meta: "180 sites · 12mo", href: "#" },
      { label: "Enterprise SLA tiers", meta: "4hr / 8hr / next-day", href: "#" },
      { label: "GridOS API docs", meta: "OCPP 2.0.1 · MQTT", href: "#" },
    ],
    spotlight: {
      kicker: "MULTI-SITE",
      title: "GridOS Enterprise console",
      bullets: ["Roll up 30+ sites", "Per-site cost ledger", "Self-host on your infra"],
      cta: "Book platform demo",
      platformKicker: "OPEN STANDARDS",
      platformTitle: "OCPP · Modbus · MQTT",
      platformSub: "No vendor lock-in. Self-hostable. Open protocol integrations.",
      platformCta: "Read API docs",
      platformHref: "#",
    },
  },
  {
    key: "hospitality",
    label: "Hospitality",
    kicker: "05",
    blurb: "Hotels, resorts, restaurants, malls — round-the-clock load with high peak surges.",
    solutions: [
      { Icon: Bed, name: "Hotels", sub: "200–800 kWh · property", href: "#" },
      { Icon: TreePalm, name: "Resorts", sub: "Off-grid + diesel offset", href: "#" },
      { Icon: ForkKnife, name: "Restaurants", sub: "60–150 kWh · QSR chains", href: "#" },
      { Icon: ShoppingBag, name: "Malls", sub: "1MW+ · HVAC peak shaving", href: "#" },
    ],
    featured: [
      { label: "Resort case · Goa", meta: "Diesel offset · 18mo payback", href: "#" },
      { label: "Mall HVAC playbook", meta: "Peak-hour arbitrage", href: "#" },
      { label: "Franchise rollout SLA", meta: "30+ outlet bundles", href: "#" },
    ],
    spotlight: {
      kicker: "OFF-GRID",
      title: "Resort + solar stack",
      bullets: ["Diesel offset 80%+", "Battery-only off-peak", "Tourism-board compliant"],
      cta: "Talk to hospitality team",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Property Console",
      platformSub: "Peak-load scheduler. Diesel-offset tracking. One dashboard.",
      platformCta: "See GridOS",
      platformHref: "#",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Root component                                                     */
/* ------------------------------------------------------------------ */

export default function V3MegamenuImpeccable() {
  const [open, setOpen] = useState<string | null>("homes");
  // Track previous tab index for directional animation
  const prevIndexRef = useRef<number>(0);
  const currentIndex = AUDIENCES.findIndex((a) => a.key === open);
  const shouldReduceMotion = useReducedMotion();

  const handleHover = (key: string) => {
    const nextIndex = AUDIENCES.findIndex((a) => a.key === key);
    prevIndexRef.current = currentIndex >= 0 ? currentIndex : nextIndex;
    setOpen(key);
  };

  return (
    <div
      className="v3imp-page"
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .v3imp-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3imp-page ::-moz-selection { background: ${tokens.brand}; color: #ffffff; }
        .v3imp-page :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-body);
          font-weight: 600;
          font-optical-sizing: auto;
        }
        .v3imp-page .v3-display {
          font-family: var(--font-display);
          font-weight: 600;
        }
        .v3imp-featured-row:hover {
          background: ${tokens.pageBgDeep};
        }
      `}</style>

      <PreviewHeader />

      <div style={{ position: "relative" }} onMouseLeave={() => setOpen(null)}>
        <MainNav
          active={open}
          onHover={handleHover}
          shouldReduceMotion={shouldReduceMotion ?? false}
        />

        <AnimatePresence>
          {open && (
            <motion.div
              key="mega-panel-shell"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0"
              style={{ top: "100%", zIndex: 40, paddingBottom: 24 }}
            >
              <MegaPanel
                audience={AUDIENCES.find((a) => a.key === open)!}
                currentIndex={currentIndex}
                prevIndex={prevIndexRef.current}
                shouldReduceMotion={shouldReduceMotion ?? false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Instructions />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview chrome                                                     */
/* ------------------------------------------------------------------ */

function PreviewHeader() {
  return (
    <header
      className="px-8 py-3 flex items-center gap-6"
      style={{ background: tokens.ink, color: "white" }}
    >
      <Link
        to="/preview"
        className="text-[11px] tracking-[0.12em] uppercase opacity-70 hover:opacity-100"
      >
        all previews
      </Link>
      <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.2)" }} />
      <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: tokens.brand, fontWeight: 700 }}>
        V3 · MEGA MENU IMPECCABLE
      </span>
      <span className="text-[13px] font-medium">Polished + animated iteration</span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-megamenu-impeccable
      </span>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Main nav                                                           */
/* ------------------------------------------------------------------ */

function MainNav({
  active,
  onHover,
  shouldReduceMotion,
}: {
  active: string | null;
  onHover: (key: string) => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <div
      style={{
        borderBottom: active ? "1px solid transparent" : `1px solid ${tokens.hairline}`,
        background: `color-mix(in oklch, ${tokens.pageBg} 95%, transparent)`,
        backdropFilter: "blur(8px)",
        position: "relative",
        zIndex: 30,
      }}
    >
      <div className="mx-auto max-w-[1280px] px-8 grid grid-cols-[1fr_auto_1fr] items-center py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 justify-self-start"
          aria-label="GridEnergy home"
        >
          <Logo variant="gridenergy" size={30} />
          <span
            className="text-[15px] font-semibold tracking-[-0.02em]"
            style={{ color: tokens.ink }}
          >
            GridEnergy
          </span>
        </Link>

        {/* Audience tabs */}
        <nav className="flex items-center gap-1 justify-self-center" aria-label="Audience navigation">
          {AUDIENCES.map((a) => {
            const isActive = active === a.key;
            return (
              <button
                key={a.key}
                type="button"
                onMouseEnter={() => onHover(a.key)}
                aria-expanded={isActive}
                aria-haspopup="true"
                className="relative px-4 py-2 text-[13px]"
                style={{
                  color: isActive ? tokens.ink : tokens.body,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: isActive ? 600 : 500,
                  transition: "color 0.15s ease",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tab-pill-imp"
                    className="absolute inset-0"
                    style={{
                      background: tokens.card,
                      border: `1px solid ${tokens.hairline}`,
                      borderRadius: 11,
                      zIndex: 0,
                    }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{a.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Sign in + CTA */}
        <div className="flex items-center gap-3 justify-self-end">
          <a
            href="#"
            className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
            style={{
              color: tokens.inkMuted,
              padding: "6px 12px 6px 10px",
              borderRadius: 999,
              border: `1px solid ${tokens.hairline}`,
              background: tokens.card,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = tokens.brand;
              (e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = tokens.inkMuted;
              (e.currentTarget as HTMLElement).style.borderColor = tokens.hairline;
            }}
          >
            <SignIn size={13} weight="bold" />
            Sign in
          </a>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 text-[12px] uppercase tracking-[0.08em] font-semibold transition-colors"
            style={{
              background: tokens.brand,
              color: "white",
              border: "none",
              borderRadius: 999,
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = tokens.brand)
            }
          >
            <Lightning size={13} weight="fill" color="white" />
            Get early access
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mega panel                                                         */
/* ------------------------------------------------------------------ */

function MegaPanel({
  audience,
  currentIndex,
  prevIndex,
  shouldReduceMotion,
}: {
  audience: Audience;
  currentIndex: number;
  prevIndex: number;
  shouldReduceMotion: boolean;
}) {
  const direction = currentIndex >= prevIndex ? 1 : -1;
  const xOffset = shouldReduceMotion ? 0 : direction * 12;

  // Stagger delays for child sections
  const staggerDelay = shouldReduceMotion ? 0 : 0.035;

  return (
    <div className="mx-auto max-w-[1280px] px-8">
      <div style={{ filter: "drop-shadow(0 24px 48px oklch(15.3% 0.006 107.1 / 0.18))" }}>
        <Rect
          fill={tokens.card}
          stroke={tokens.hairline}
          cornerRadius={20}
          style={{ overflow: "hidden" }}
        >
          {/* Audience content cross-fades with directional intent */}
          <AnimatePresence initial={false}>
            <motion.div
              key={audience.key}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: xOffset }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -xOffset }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header strip — stagger child 0 */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: staggerDelay * 0, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: `1px solid ${tokens.hairline}` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: tokens.brand, fontWeight: 700 }}
                  >
                    {audience.kicker} · {audience.label.toUpperCase()}
                  </span>
                  <span
                    style={{ width: 1, height: 11, background: tokens.hairlineStrong, display: "inline-block" }}
                  />
                  <span className="text-[12px]" style={{ color: tokens.body }}>
                    {audience.blurb}
                  </span>
                </div>
                <a
                  href="#"
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: tokens.ink }}
                >
                  All {audience.label} solutions
                  <ArrowRight size={12} weight="bold" />
                </a>
              </motion.div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-0 p-3">
                {/* Solutions — 2x2 image-tile grid — stagger child 1 */}
                <motion.div
                  className="col-span-7 pr-3"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: staggerDelay * 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    className="px-1 pb-2 text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: tokens.inkMuted, fontWeight: 700 }}
                  >
                    SOLUTIONS
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {audience.solutions.map((s) => (
                      <SolutionTile key={s.name} solution={s} />
                    ))}
                  </div>
                </motion.div>

                {/* Featured — stagger child 2 — tint-separated, no side-stripe */}
                <motion.div
                  className="col-span-3"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: staggerDelay * 2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: tokens.pageBgDeep,
                    borderRadius: 14,
                    padding: "10px 0",
                  }}
                >
                  <p
                    className="px-4 pb-2 text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: tokens.inkMuted, fontWeight: 700 }}
                  >
                    FEATURED
                  </p>
                  <ul className="flex flex-col">
                    {audience.featured.map((f) => (
                      <li key={f.label}>
                        <a
                          href={f.href}
                          className="v3imp-featured-row block px-4 py-2.5 transition-colors"
                          style={{ borderRadius: 10 }}
                        >
                          <p
                            className="text-[13px] font-semibold leading-tight"
                            style={{ color: tokens.ink }}
                          >
                            {f.label}
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
                            {f.meta}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Spotlight — two stacked sub-tiles — stagger child 3 */}
                <motion.div
                  className="col-span-2 pl-3 flex flex-col gap-2"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: staggerDelay * 3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Sub-tile 1: FEATURED / popular pick */}
                  <Rect
                    fill={tokens.ink}
                    cornerRadius={14}
                    style={{ flex: "1 1 0" }}
                  >
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: 999,
                            background: tokens.brand,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          className="text-[9px] uppercase tracking-[0.16em]"
                          style={{ color: tokens.brand, fontWeight: 700 }}
                        >
                          {audience.spotlight.kicker}
                        </span>
                      </div>
                      <p
                        className="text-[14px] font-semibold tracking-[-0.015em] leading-tight mb-2"
                        style={{ color: "#ffffff" }}
                      >
                        {audience.spotlight.title}
                      </p>
                      <ul className="flex flex-col gap-1 mb-3">
                        {audience.spotlight.bullets.map((b) => (
                          <li
                            key={b}
                            className="text-[11px] leading-snug flex items-start gap-1.5"
                            style={{ color: "rgba(255,255,255,0.78)" }}
                          >
                            <span
                              style={{
                                width: 3,
                                height: 3,
                                borderRadius: 999,
                                background: "rgba(255,255,255,0.4)",
                                flexShrink: 0,
                                marginTop: 5,
                              }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#"
                        className="flex items-center gap-1 mt-auto text-[10px] uppercase tracking-[0.12em] font-semibold transition-opacity hover:opacity-70"
                        style={{ color: tokens.brand }}
                      >
                        {audience.spotlight.cta}
                        <ArrowRight size={10} weight="bold" color={tokens.brand} />
                      </a>
                    </div>
                  </Rect>

                  {/* Sub-tile 2: PLATFORM + PRODUCTS (GridOS callout) */}
                  <Rect
                    fill={tokens.pageBgDeep}
                    stroke={tokens.hairline}
                    cornerRadius={14}
                    style={{ flex: "0 0 auto" }}
                  >
                    <div className="p-3.5 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[9px] uppercase tracking-[0.14em]"
                          style={{ color: tokens.inkMuted, fontWeight: 700 }}
                        >
                          {audience.spotlight.platformKicker}
                        </span>
                      </div>
                      <p
                        className="text-[12px] font-semibold leading-tight tracking-[-0.01em]"
                        style={{ color: tokens.ink }}
                      >
                        {audience.spotlight.platformTitle}
                      </p>
                      <p
                        className="text-[11px] leading-snug"
                        style={{ color: tokens.muted }}
                      >
                        {audience.spotlight.platformSub}
                      </p>
                      <a
                        href={audience.spotlight.platformHref}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] font-semibold transition-opacity hover:opacity-70"
                        style={{ color: tokens.inkMuted }}
                      >
                        {audience.spotlight.platformCta}
                        <ArrowRight size={10} weight="bold" />
                      </a>
                    </div>
                  </Rect>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer strip — audience-agnostic; secondary links folded here from old utility bar */}
          <div
            className="flex items-center justify-between px-3 py-2.5"
            style={{ borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              <FooterPill href="#" emphasis>
                Compare all 5 audiences
              </FooterPill>
              <FooterPill href="#">ROI calculator</FooterPill>
              <FooterPill href="#">Datasheets</FooterPill>
              <FooterPill href="#">About</FooterPill>
              <FooterPill href="#">Partners</FooterPill>
              <FooterPill href="#">Support</FooterPill>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] uppercase tracking-[0.12em]"
                style={{ color: tokens.muted, fontWeight: 600 }}
              >
                Also from GridPower
              </span>
              <a
                href="#"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold"
                style={{
                  color: tokens.ink,
                  background: tokens.card,
                  padding: "6px 10px 6px 8px",
                  borderRadius: 10,
                  border: `1px solid ${tokens.hairline}`,
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)
                }
              >
                <Logo variant="gridcharge" size={16} />
                GridCharge
                <ArrowRight size={12} weight="bold" />
              </a>
            </div>
          </div>
        </Rect>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FooterPill                                                         */
/* ------------------------------------------------------------------ */

function FooterPill({
  children,
  href,
  emphasis,
}: {
  children: ReactNode;
  href: string;
  emphasis?: boolean;
}) {
  return (
    <a
      href={href}
      className="text-[11px] uppercase tracking-[0.12em] font-semibold"
      style={{
        color: emphasis ? tokens.ink : tokens.body,
        background: tokens.card,
        padding: "6px 12px",
        borderRadius: 10,
        border: `1px solid ${tokens.hairline}`,
        transition: "border-color 0.15s ease",
        display: "inline-block",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)
      }
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  SolutionTile                                                       */
/* ------------------------------------------------------------------ */

function SolutionTile({ solution }: { solution: Audience["solutions"][number] }) {
  const { Icon, name, sub, href, image } = solution;
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="block overflow-hidden"
      style={{
        background: tokens.card,
        border: `1px solid ${hovered ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 12,
        boxShadow: hovered
          ? "0 12px 24px -16px oklch(15.3% 0.006 107.1 / 0.22)"
          : "0 0 0 0 transparent",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "border-color 0.2s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ background: tokens.pageBgDeep, aspectRatio: "16 / 9" }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full"
            style={{
              objectFit: "cover",
              display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            loading="lazy"
          />
        ) : (
          <div className="grid place-items-center" style={{ width: "100%", height: "100%" }}>
            <Icon
              size={56}
              weight="duotone"
              color={tokens.ink}
              style={{
                opacity: hovered ? 0.8 : 0.65,
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition:
                  "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease",
              }}
            />
          </div>
        )}
        {/* GridRed corner badge on hover */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 24,
            height: 24,
            display: "grid",
            placeItems: "center",
            background: tokens.brand,
            borderRadius: 999,
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translateY(0) scale(1)"
              : "translateY(-4px) scale(0.85)",
            transition:
              "opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <ArrowRight size={11} weight="bold" color="white" />
        </div>
      </div>
      {/* Text caption */}
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p
            className="text-[13px] font-semibold leading-tight"
            style={{ color: tokens.ink }}
          >
            {name}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
            {sub}
          </p>
        </div>
        <span
          style={{
            color: tokens.brand,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-4px)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            marginLeft: 6,
          }}
        >
          <ArrowRight size={13} weight="bold" />
        </span>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Instructions block                                                 */
/* ------------------------------------------------------------------ */

function Instructions() {
  return (
    <div className="mx-auto max-w-[1280px] px-8 pt-[460px] pb-32">
      <div className="flex items-center gap-2 mb-4">
        <span
          style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }}
        />
        <span
          className="text-[10px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          MEGA MENU · IMPECCABLE ITERATION
        </span>
      </div>
      <h1
        className="text-[40px] font-semibold tracking-[-0.025em] leading-[1.05] mb-4"
        style={{ color: tokens.ink }}
      >
        Polished mega panel — 5 fixes applied.
      </h1>
      <p
        className="text-[14px] leading-[1.6] max-w-[64ch]"
        style={{ color: tokens.body }}
      >
        Utility bar removed. Sign In moved to main nav. Spotlight splits into FEATURED + PLATFORM
        sub-tiles. Staggered entry animation (30-40ms child cascade). Directional audience
        cross-fade. Featured column tint-separated (no side-stripe border). All three spotlight
        bullets rendered. Reduced-motion honored.
      </p>

      <div
        className="mt-8 grid grid-cols-2 gap-3"
        style={{ maxWidth: 640 }}
      >
        {[
          ["Utility bar", "Removed. Secondary links (About, Partners, Support) folded into panel footer."],
          ["Spotlight", "Two stacked sub-tiles: FEATURED (popular pick + bullets) above, PLATFORM (GridOS callout) below."],
          ["Entry animation", "Staggered 35ms cascade: header 0ms, solutions 35ms, featured 70ms, spotlight 105ms."],
          ["Directional swap", "Audience cross-fade slides left or right based on tab index delta."],
          ["Side-stripe ban", "Featured column uses bg tint separation instead of border-left (absolute ban removed)."],
        ].map(([title, desc]) => (
          <div
            key={title}
            style={{
              background: tokens.pageBgDeep,
              borderRadius: 12,
              padding: "14px 16px",
              border: `1px solid ${tokens.hairline}`,
            }}
          >
            <p className="text-[12px] font-semibold mb-1" style={{ color: tokens.ink }}>
              {title}
            </p>
            <p className="text-[12px] leading-snug" style={{ color: tokens.muted }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
