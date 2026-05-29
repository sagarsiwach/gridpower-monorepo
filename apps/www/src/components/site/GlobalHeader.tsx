import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
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

import { Logo } from "../Logo";
import { tokens } from "../../routes/_preview/_v3-tokens";

/*
  GlobalHeader — the real GridEnergy site header (lives in root.tsx, wraps every
  marketing route). Hybrid of the two mega-menu prototypes:
    - mega PANEL = v3-megamenu-impeccable (staggered entry, directional cross-fade,
      FEATURED + PLATFORM spotlight, image-tile solutions grid, reduced-motion safe)
    - TOP BAR brought back (impeccable had removed it) — original utility strip,
      given more depth; Sign in lives here now, plus Contact
    - "Get early access" CTA uses radius corners (not the full-round pill) + sized up

  CONTENT FLAG: the AUDIENCES data below carries placeholder specs/numbers
  (payback months, kWh, deployment counts). These are NOT verified — they move to
  Sanity and must be fact-checked before any public launch. Do not treat as real.

  TEMP WIRING: every solution link points at the one built template, /solutions/homes,
  until the real per-audience solution routes exist.
*/

const SOLUTION_HREF = "/solutions/homes";

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
/*  Data — PLACEHOLDER content (see CONTENT FLAG above)                */
/* ------------------------------------------------------------------ */

type Audience = {
  key: string;
  label: string;
  kicker: string;
  blurb: string;
  solutions: { Icon: Icon; name: string; sub: string; image?: string }[];
  featured: { label: string; meta: string }[];
  spotlight: {
    kicker: string;
    title: string;
    bullets: string[];
    cta: string;
    platformKicker: string;
    platformTitle: string;
    platformSub: string;
    platformCta: string;
  };
};

const AUDIENCES: Audience[] = [
  {
    key: "homes",
    label: "Homes",
    kicker: "01",
    blurb: "Apartment ESS to whole-home storage. Roof solar optional.",
    solutions: [
      { Icon: Buildings, name: "Apartment ESS", sub: "3–7 kWh · single phase", image: "/images/solutions/homes-apartment.png" },
      { Icon: House, name: "Small home", sub: "7–15 kWh · single phase", image: "/images/solutions/homes-small.png" },
      { Icon: HouseLine, name: "Large home", sub: "15–30 kWh · 3-phase", image: "/images/solutions/homes-large.png" },
      { Icon: Sun, name: "Solar storage combo", sub: "Inverter + battery", image: "/images/solutions/homes-solar.png" },
    ],
    featured: [
      { label: "Apartment RWA case study", meta: "Placeholder · verify" },
      { label: "Home ROI calculator", meta: "Run your numbers" },
      { label: "Datasheet · Atlas-01", meta: "Placeholder · verify" },
    ],
    spotlight: {
      kicker: "POPULAR",
      title: "Apartment ESS pack",
      bullets: ["7.4 kWh modular", "Wall-mounted", "Placeholder copy"],
      cta: "Configure for your flat",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Home Console",
      platformSub: "Daily meter reads. Per-asset payback math. Open standards.",
      platformCta: "See GridOS",
    },
  },
  {
    key: "offices",
    label: "Offices & Industrial",
    kicker: "02",
    blurb: "Mid-office UPS to factory backup.",
    solutions: [
      { Icon: Briefcase, name: "Small office", sub: "30–80 kWh · UPS" },
      { Icon: BuildingOffice, name: "Mid-office UPS", sub: "100–250 kWh · arbitrage" },
      { Icon: Buildings, name: "Large campus", sub: "500 kWh+ · multi-feeder" },
      { Icon: Factory, name: "Factory backup", sub: "1MW+ · OCPP integrated" },
    ],
    featured: [
      { label: "Factory case study", meta: "Placeholder · verify" },
      { label: "Office ROI calculator", meta: "Run your tariff" },
      { label: "FlexCube 500SL datasheet", meta: "Placeholder · verify" },
    ],
    spotlight: {
      kicker: "MOST DEPLOYED",
      title: "FlexCube 500SL",
      bullets: ["500 kWh containerised", "Drop-in factory backup", "Placeholder copy"],
      cta: "Schedule a site survey",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Operator Console",
      platformSub: "Tariff-arbitrage scheduler. Fault flags. OCPP 2.0.1 native.",
      platformCta: "See GridOS",
    },
  },
  {
    key: "institute",
    label: "Institute",
    kicker: "03",
    blurb: "Schools, colleges, university campuses with bursty load patterns.",
    solutions: [
      { Icon: BookOpen, name: "School microgrid", sub: "Backup + roof solar" },
      { Icon: Books, name: "College block", sub: "Per-building storage" },
      { Icon: GraduationCap, name: "University campus", sub: "Multi-site rollup" },
      { Icon: Buildings, name: "Hostels & PG", sub: "Shared-meter packs" },
    ],
    featured: [
      { label: "Campus pilot", meta: "Placeholder · verify" },
      { label: "Institute funding guide", meta: "Subsidy scheme · verify" },
      { label: "Maintenance contracts", meta: "Annual + SLA" },
    ],
    spotlight: {
      kicker: "PARTNER PROGRAM",
      title: "Education subsidy stack",
      bullets: ["Subsidy support (verify)", "Free design audit", "Maintenance bundled"],
      cta: "Talk to education team",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Campus Dashboard",
      platformSub: "Per-building energy ledger. Subsidy tracking. Multi-site.",
      platformCta: "See GridOS",
    },
  },
  {
    key: "enterprises",
    label: "Enterprises",
    kicker: "04",
    blurb: "Data centers, telecom, hospitals — load-critical with multi-site rollup.",
    solutions: [
      { Icon: HardDrives, name: "Data centers", sub: "Rack UPS + grid storage" },
      { Icon: Broadcast, name: "Telecom towers", sub: "Diesel replacement" },
      { Icon: FirstAid, name: "Hospitals", sub: "Critical load + stability" },
      { Icon: Network, name: "Multi-site", sub: "30+ assets · one console" },
    ],
    featured: [
      { label: "Tower rollout case", meta: "Placeholder · verify" },
      { label: "Enterprise SLA tiers", meta: "4hr / 8hr / next-day" },
      { label: "GridOS API docs", meta: "OCPP 2.0.1 · MQTT" },
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
    },
  },
  {
    key: "hospitality",
    label: "Hospitality",
    kicker: "05",
    blurb: "Hotels, resorts, restaurants, malls — round-the-clock load with high peak surges.",
    solutions: [
      { Icon: Bed, name: "Hotels", sub: "200–800 kWh · property" },
      { Icon: TreePalm, name: "Resorts", sub: "Off-grid + diesel offset" },
      { Icon: ForkKnife, name: "Restaurants", sub: "60–150 kWh · QSR chains" },
      { Icon: ShoppingBag, name: "Malls", sub: "1MW+ · HVAC peak shaving" },
    ],
    featured: [
      { label: "Resort case · Goa", meta: "Placeholder · verify" },
      { label: "Mall HVAC playbook", meta: "Peak-hour arbitrage" },
      { label: "Franchise rollout SLA", meta: "30+ outlet bundles" },
    ],
    spotlight: {
      kicker: "OFF-GRID",
      title: "Resort + solar stack",
      bullets: ["Diesel offset (verify)", "Battery-only off-peak", "Placeholder copy"],
      cta: "Talk to hospitality team",
      platformKicker: "PLATFORM",
      platformTitle: "GridOS Property Console",
      platformSub: "Peak-load scheduler. Diesel-offset tracking. One dashboard.",
      platformCta: "See GridOS",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  GlobalHeader root                                                  */
/* ------------------------------------------------------------------ */

export function GlobalHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const handleHover = (key: string) => setOpen(key);

  // Condense on scroll: the top utility bar collapses and a soft shadow lifts
  // the nav off the page — the standard polished sticky-header behavior.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: scrolled
          ? "0 1px 0 oklch(15.3% 0.006 107.1 / 0.05), 0 10px 30px -18px oklch(15.3% 0.006 107.1 / 0.3)"
          : "none",
        transition: "box-shadow 0.25s ease",
      }}
    >
      <style>{`
        .gh-featured-row:hover { background: ${tokens.pageBgDeep}; }
      `}</style>

      <TopBar collapsed={scrolled} />

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
                shouldReduceMotion={shouldReduceMotion ?? false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Tier 1 — Top bar (original utility strip, given depth)            */
/* ------------------------------------------------------------------ */

const UTILITY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Platform", href: "/platform" },
  { label: "Resources", href: "/resources" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

function TopBar({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      style={{
        background: tokens.pageBgDeep,
        borderBottom: collapsed ? "1px solid transparent" : `1px solid ${tokens.hairline}`,
        position: "relative",
        zIndex: 31,
        maxHeight: collapsed ? 0 : 48,
        opacity: collapsed ? 0 : 1,
        overflow: "hidden",
        pointerEvents: collapsed ? "none" : "auto",
        transition:
          "max-height 0.28s cubic-bezier(0.22,1,0.36,1), opacity 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div className="mx-auto max-w-[1280px] px-8 flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.accentLine }} />
          <span
            className="text-[11px] uppercase tracking-[0.14em]"
            style={{ color: tokens.inkMuted, fontWeight: 600 }}
          >
            All systems operational
          </span>
        </div>
        <nav className="flex items-center gap-1" aria-label="Utility">
          {UTILITY_LINKS.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-[12px] transition-colors"
              style={{ color: tokens.inkMuted, fontWeight: 500, padding: "5px 10px", borderRadius: 8 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = tokens.card;
                (e.currentTarget as HTMLElement).style.color = tokens.ink;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = tokens.inkMuted;
              }}
            >
              {l.label}
            </Link>
          ))}
          <span style={{ width: 6 }} />
          <Link
            to="/sign-in"
            className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors"
            style={{
              color: tokens.brand,
              background: tokens.card,
              padding: "5px 12px 5px 10px",
              borderRadius: 999,
              border: `1px solid ${tokens.hairline}`,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.brand)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
          >
            <SignIn size={13} weight="bold" color={tokens.brand} />
            Sign in
          </Link>
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tier 2 — Main nav (logo + audience tabs + radius CTA)             */
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
        <Link to="/" className="flex items-center gap-2.5 justify-self-start" aria-label="GridEnergy home">
          <Logo variant="gridenergy" size={30} />
          <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
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
                    layoutId="gh-active-tab-pill"
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

        {/* Right: CTA only (Sign in moved to top bar). Radius corners, sized up. */}
        <div className="flex items-center justify-self-end">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-3 text-[13px] uppercase tracking-[0.07em] font-semibold transition-colors"
            style={{
              background: tokens.brand,
              color: "white",
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
          >
            <Lightning size={14} weight="fill" color="white" />
            Get early access
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mega panel (impeccable)                                            */
/* ------------------------------------------------------------------ */

function MegaPanel({
  audience,
  shouldReduceMotion,
}: {
  audience: Audience;
  shouldReduceMotion: boolean;
}) {
  const staggerDelay = shouldReduceMotion ? 0 : 0.035;

  return (
    <div className="mx-auto max-w-[1280px] px-8">
      <div style={{ filter: "drop-shadow(0 24px 48px oklch(15.3% 0.006 107.1 / 0.18))" }}>
        <Rect fill={tokens.card} stroke={tokens.hairline} cornerRadius={20} style={{ overflow: "hidden" }}>
          <AnimatePresence initial={false}>
            {/* Smooth audience cross-fade: exit goes absolute so the outgoing
                panel overlays the incoming one instead of shoving layout. */}
            <motion.div
              key={audience.key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, position: "absolute", left: 0, right: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header strip */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: staggerDelay * 0, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: `1px solid ${tokens.hairline}` }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: tokens.brand, fontWeight: 700 }}>
                    {audience.kicker} · {audience.label.toUpperCase()}
                  </span>
                  <span style={{ width: 1, height: 11, background: tokens.hairlineStrong, display: "inline-block" }} />
                  <span className="text-[12px]" style={{ color: tokens.body }}>
                    {audience.blurb}
                  </span>
                </div>
                <Link
                  to={SOLUTION_HREF}
                  className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: tokens.ink }}
                >
                  All {audience.label} solutions
                  <ArrowRight size={12} weight="bold" />
                </Link>
              </motion.div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-0 p-3">
                {/* Solutions */}
                <motion.div
                  className="col-span-7 pr-3"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: staggerDelay * 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-1 pb-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
                    SOLUTIONS
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {audience.solutions.map((s) => (
                      <SolutionTile key={s.name} solution={s} />
                    ))}
                  </div>
                </motion.div>

                {/* Featured */}
                <motion.div
                  className="col-span-3"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: staggerDelay * 2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ background: tokens.pageBgDeep, borderRadius: 14, padding: "10px 0" }}
                >
                  <p className="px-4 pb-2 text-[10px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
                    FEATURED
                  </p>
                  <ul className="flex flex-col">
                    {audience.featured.map((f) => (
                      <li key={f.label}>
                        <Link to={SOLUTION_HREF} className="gh-featured-row block px-4 py-2.5 transition-colors" style={{ borderRadius: 10 }}>
                          <p className="text-[13px] font-semibold leading-tight" style={{ color: tokens.ink }}>
                            {f.label}
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
                            {f.meta}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Spotlight */}
                <motion.div
                  className="col-span-2 pl-3 flex flex-col gap-2"
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: staggerDelay * 3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Rect fill={tokens.ink} cornerRadius={14} style={{ flex: "1 1 0" }}>
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand, flexShrink: 0 }} />
                        <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
                          {audience.spotlight.kicker}
                        </span>
                      </div>
                      <p className="text-[14px] font-semibold tracking-[-0.015em] leading-tight mb-2" style={{ color: "#ffffff" }}>
                        {audience.spotlight.title}
                      </p>
                      <ul className="flex flex-col gap-1 mb-3">
                        {audience.spotlight.bullets.map((b) => (
                          <li key={b} className="text-[11px] leading-snug flex items-start gap-1.5" style={{ color: "rgba(255,255,255,0.78)" }}>
                            <span style={{ width: 3, height: 3, borderRadius: 999, background: "rgba(255,255,255,0.4)", flexShrink: 0, marginTop: 5 }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link to={SOLUTION_HREF} className="flex items-center gap-1 mt-auto text-[10px] uppercase tracking-[0.12em] font-semibold transition-opacity hover:opacity-70" style={{ color: tokens.brand }}>
                        {audience.spotlight.cta}
                        <ArrowRight size={10} weight="bold" color={tokens.brand} />
                      </Link>
                    </div>
                  </Rect>

                  <Rect fill={tokens.pageBgDeep} stroke={tokens.hairline} cornerRadius={14} style={{ flex: "0 0 auto" }}>
                    <div className="p-3.5 flex flex-col gap-2">
                      <span className="text-[9px] uppercase tracking-[0.14em]" style={{ color: tokens.inkMuted, fontWeight: 700 }}>
                        {audience.spotlight.platformKicker}
                      </span>
                      <p className="text-[12px] font-semibold leading-tight tracking-[-0.01em]" style={{ color: tokens.ink }}>
                        {audience.spotlight.platformTitle}
                      </p>
                      <p className="text-[11px] leading-snug" style={{ color: tokens.muted }}>
                        {audience.spotlight.platformSub}
                      </p>
                      <Link to={SOLUTION_HREF} className="flex items-center gap-1 text-[10px] uppercase tracking-[0.12em] font-semibold transition-opacity hover:opacity-70" style={{ color: tokens.inkMuted }}>
                        {audience.spotlight.platformCta}
                        <ArrowRight size={10} weight="bold" />
                      </Link>
                    </div>
                  </Rect>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer strip */}
          <div className="flex items-center justify-between px-3 py-2.5" style={{ borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}>
            <div className="flex items-center gap-1.5 flex-wrap">
              <FooterPill emphasis>Compare all 5 audiences</FooterPill>
              <FooterPill>ROI calculator</FooterPill>
              <FooterPill>Datasheets</FooterPill>
              <FooterPill>About</FooterPill>
              <FooterPill>Partners</FooterPill>
              <FooterPill>Support</FooterPill>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: tokens.muted, fontWeight: 600 }}>
                Also from GridPower
              </span>
              <Link
                to={SOLUTION_HREF}
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold"
                style={{ color: tokens.ink, background: tokens.card, padding: "6px 10px 6px 8px", borderRadius: 10, border: `1px solid ${tokens.hairline}`, transition: "border-color 0.15s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
              >
                <Logo variant="gridcharge" size={16} />
                GridCharge
                <ArrowRight size={12} weight="bold" />
              </Link>
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

function FooterPill({ children, emphasis }: { children: ReactNode; emphasis?: boolean }) {
  return (
    <Link
      to={SOLUTION_HREF}
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
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong)}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = tokens.hairline)}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  SolutionTile                                                       */
/* ------------------------------------------------------------------ */

function SolutionTile({ solution }: { solution: Audience["solutions"][number] }) {
  const { Icon, name, sub, image } = solution;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={SOLUTION_HREF}
      className="block overflow-hidden"
      style={{
        background: tokens.card,
        border: `1px solid ${hovered ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: 12,
        boxShadow: hovered ? "0 12px 24px -16px oklch(15.3% 0.006 107.1 / 0.22)" : "0 0 0 0 transparent",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "border-color 0.2s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ background: tokens.pageBgDeep, aspectRatio: "16 / 9" }}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full"
            style={{ objectFit: "cover", display: "block", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
            loading="lazy"
          />
        ) : (
          <div className="grid place-items-center" style={{ width: "100%", height: "100%" }}>
            <Icon size={56} weight="duotone" color={tokens.ink} style={{ opacity: hovered ? 0.8 : 0.65, transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease" }} />
          </div>
        )}
        <div
          style={{
            position: "absolute", top: 10, right: 10, width: 24, height: 24, display: "grid", placeItems: "center",
            background: tokens.brand, borderRadius: 999,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.85)",
            transition: "opacity 0.2s ease, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <ArrowRight size={11} weight="bold" color="white" />
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-tight" style={{ color: tokens.ink }}>{name}</p>
          <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>{sub}</p>
        </div>
        <span style={{ color: tokens.brand, opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(-4px)", transition: "opacity 0.2s ease, transform 0.2s ease", marginLeft: 6 }}>
          <ArrowRight size={13} weight="bold" />
        </span>
      </div>
    </Link>
  );
}
