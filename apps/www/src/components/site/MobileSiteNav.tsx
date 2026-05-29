import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Bed,
  BookOpen,
  Books,
  Broadcast,
  Buildings,
  Briefcase,
  BuildingOffice,
  CaretRight,
  Factory,
  FirstAid,
  ForkKnife,
  GraduationCap,
  HardDrives,
  House,
  HouseLine,
  Lightning,
  List,
  Network,
  ShoppingBag,
  Sun,
  TreePalm,
  X,
  type Icon,
} from "@phosphor-icons/react";

import { Logo } from "../Logo";
import { tokens } from "../../routes/_preview/_v3-tokens";

/*
  MobileSiteNav — impeccable essence.
  Olive substrate, GridRed accents, rounded Rect tiles, dark spotlight
  treatment, staggered entry motion, real route links.

  Structure:
  - Top bar: logo + menu toggle
  - Slide-up drawer (full-screen): audience list → drilldown
  - Bottom tab bar: 5 fixed tabs
*/

/* ------------------------------------------------------------------ */
/*  Rect — rounded rectangle wrapper (matches GlobalHeader)            */
/* ------------------------------------------------------------------ */

function Rect({
  children,
  fill,
  stroke,
  strokeWidth = 1,
  cornerRadius = 16,
  className,
  style,
  onClick,
}: {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}) {
  return (
    <div
      className={className}
      onClick={onClick}
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
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const SOLUTION_HREF = "/solutions/homes";

type Audience = {
  key: string;
  label: string;
  kicker: string;
  blurb: string;
  solutions: { Icon: Icon; name: string; sub: string; image?: string }[];
  featured: { label: string; meta: string }[];
  spotlight: { kicker: string; title: string; bullet: string; cta: string };
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
      bullet: "7.4 kWh modular · wall-mounted · placeholder copy",
      cta: "Configure for your flat",
    },
  },
  {
    key: "offices",
    label: "Offices & Industrial",
    kicker: "02",
    blurb: "Mid-office UPS to factory backup at 1MW.",
    solutions: [
      { Icon: Briefcase, name: "Small office", sub: "30–80 kWh · UPS" },
      { Icon: BuildingOffice, name: "Mid-office UPS", sub: "100–250 kWh" },
      { Icon: Buildings, name: "Large campus", sub: "500 kWh+ · multi-feeder" },
      { Icon: Factory, name: "Factory backup", sub: "1MW+ · OCPP" },
    ],
    featured: [
      { label: "Factory case study", meta: "Placeholder · verify" },
      { label: "Office ROI calculator", meta: "Run your tariff" },
      { label: "FlexCube 500SL datasheet", meta: "Placeholder · verify" },
    ],
    spotlight: {
      kicker: "MOST DEPLOYED",
      title: "FlexCube 500SL",
      bullet: "500 kWh containerised · drop-in factory backup · placeholder",
      cta: "Schedule a site survey",
    },
  },
  {
    key: "institute",
    label: "Institute",
    kicker: "03",
    blurb: "Schools, colleges, university campuses.",
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
      bullet: "Subsidy support (verify) · free design audit · placeholder",
      cta: "Talk to education team",
    },
  },
  {
    key: "enterprises",
    label: "Enterprises",
    kicker: "04",
    blurb: "Data centers, telecom, hospitals, multi-site.",
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
      title: "GridOS Enterprise",
      bullet: "Roll up 30+ sites · self-host on your infra · placeholder",
      cta: "Book platform demo",
    },
  },
  {
    key: "hospitality",
    label: "Hospitality",
    kicker: "05",
    blurb: "Hotels, resorts, restaurants, malls.",
    solutions: [
      { Icon: Bed, name: "Hotels", sub: "200–800 kWh per property" },
      { Icon: TreePalm, name: "Resorts", sub: "Off-grid + diesel offset" },
      { Icon: ForkKnife, name: "Restaurants", sub: "60–150 kWh · QSR" },
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
      bullet: "Diesel offset 80%+ · tourism-board compliant · placeholder",
      cta: "Talk to hospitality team",
    },
  },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Platform", href: "/platform" },
  { label: "Resources", href: "/resources" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
];

type TabKey = "home" | "solutions" | "platform" | "about" | "contact";

const BOTTOM_TABS: { key: TabKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "solutions", label: "Solutions", href: SOLUTION_HREF },
  { key: "platform", label: "Platform", href: "/platform" },
  { key: "about", label: "About", href: "/about" },
  { key: "contact", label: "Contact", href: "/contact" },
];

type View = "closed" | "root" | string;

/* ------------------------------------------------------------------ */
/*  Root export                                                         */
/* ------------------------------------------------------------------ */

export default function MobileSiteNav({ currentRoute = "home" }: { currentRoute?: string }) {
  const [view, setView] = useState<View>("closed");
  const audience = AUDIENCES.find((a) => a.key === view);
  const reduce = useReducedMotion();

  const drawerSlide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } };

  const audienceSlide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, x: 32 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 32 } };

  const transition = { duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div style={{ position: "relative" }}>
      <MobileNavBar onOpenMenu={() => setView("root")} />

      <AnimatePresence>
        {view === "root" && (
          <motion.div
            key="mobile-root"
            {...drawerSlide}
            transition={transition}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              display: "flex",
              flexDirection: "column",
              background: tokens.pageBg,
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <MobileRoot
              onPickAudience={(k) => setView(k)}
              onClose={() => setView("closed")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {audience && (
          <motion.div
            key={`mobile-audience-${audience.key}`}
            {...audienceSlide}
            transition={transition}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 70,
              display: "flex",
              flexDirection: "column",
              background: tokens.pageBg,
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <MobileAudience
              audience={audience}
              onBack={() => setView("root")}
              onClose={() => setView("closed")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <MobileBottomTabBar currentRoute={currentRoute} onOpenSolutions={() => setView("root")} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Top nav bar                                                         */
/* ------------------------------------------------------------------ */

function MobileNavBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3"
      style={{ borderBottom: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
    >
      <Link to="/" className="flex items-center gap-2" aria-label="GridEnergy home">
        <Logo variant="gridenergy" size={26} />
        <span className="text-[14px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
          GridEnergy
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenMenu}
          className="grid place-items-center"
          style={{
            width: 38,
            height: 38,
            background: tokens.chip,
            color: tokens.ink,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Open menu"
        >
          <List size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bottom tab bar                                                      */
/* ------------------------------------------------------------------ */

function MobileBottomTabBar({
  currentRoute,
  onOpenSolutions,
}: {
  currentRoute: string;
  onOpenSolutions: () => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around"
      style={{
        height: 64,
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {BOTTOM_TABS.map((tab) => {
        const isActive = currentRoute === tab.key;
        return tab.key === "solutions" ? (
          <button
            key={tab.key}
            type="button"
            onClick={onOpenSolutions}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
            }}
          >
            <span
              style={{
                width: 28,
                height: 3,
                borderRadius: 999,
                background: isActive ? tokens.brand : "transparent",
                marginBottom: 2,
              }}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: isActive ? tokens.brand : tokens.muted }}
            >
              {tab.label}
            </span>
          </button>
        ) : (
          <Link
            key={tab.key}
            to={tab.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "8px 0",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 28,
                height: 3,
                borderRadius: 999,
                background: isActive ? tokens.brand : "transparent",
                marginBottom: 2,
              }}
            />
            <span
              className="text-[11px] font-semibold"
              style={{ color: isActive ? tokens.brand : tokens.muted }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Root drawer — audience list                                         */
/* ------------------------------------------------------------------ */

function MobileRoot({
  onPickAudience,
  onClose,
}: {
  onPickAudience: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MobileDrawerHeader onClose={onClose} />
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 80px" }}>
        <p
          className="text-[10px] uppercase tracking-[0.16em] mb-3 mt-2"
          style={{ color: tokens.inkMuted, fontWeight: 700 }}
        >
          Solutions by audience
        </p>

        {/* Audience tiles — Rect treatment */}
        <ul className="flex flex-col gap-1.5">
          {AUDIENCES.map((a) => (
            <li key={a.key}>
              <Rect
                fill={tokens.card}
                stroke={tokens.hairline}
                cornerRadius={14}
                onClick={() => onPickAudience(a.key)}
                style={{ cursor: "pointer" }}
              >
                <button
                  type="button"
                  onClick={() => onPickAudience(a.key)}
                  className="flex items-center w-full text-left"
                  style={{
                    background: "none",
                    border: "none",
                    borderRadius: 14,
                    padding: "12px 14px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: tokens.brand, fontWeight: 700, width: 28, flexShrink: 0 }}
                  >
                    {a.kicker}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold leading-tight" style={{ color: tokens.ink }}>
                      {a.label}
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
                      {a.blurb}
                    </p>
                  </div>
                  <CaretRight size={14} weight="bold" color={tokens.inkMuted} />
                </button>
              </Rect>
            </li>
          ))}
        </ul>

        {/* Company links */}
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${tokens.hairline}` }}>
          <p
            className="text-[10px] uppercase tracking-[0.16em] mb-3"
            style={{ color: tokens.inkMuted, fontWeight: 700 }}
          >
            Company
          </p>
          <ul className="flex flex-col gap-0.5">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  onClick={undefined}
                  className="block py-2.5 px-1 text-[14px] font-medium"
                  style={{ color: tokens.body, textDecoration: "none" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${tokens.hairline}` }}>
          <div className="flex items-center gap-2">
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.accentLine }} />
            <span
              className="text-[11px] uppercase tracking-[0.14em]"
              style={{ color: tokens.inkMuted, fontWeight: 600 }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>

      <MobileCTAs />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drawer header                                                       */
/* ------------------------------------------------------------------ */

function MobileDrawerHeader({
  onClose,
  onBack,
  title,
}: {
  onClose: () => void;
  onBack?: () => void;
  title?: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-5 py-3"
      style={{
        borderBottom: `1px solid ${tokens.hairline}`,
        background: tokens.pageBgDeep,
      }}
    >
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="grid place-items-center"
            style={{
              width: 36,
              height: 36,
              background: tokens.chip,
              color: tokens.ink,
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Back"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2" aria-label="GridEnergy home">
            <Logo variant="gridenergy" size={26} />
            <span className="text-[14px] font-semibold tracking-[-0.02em]" style={{ color: tokens.ink }}>
              GridEnergy
            </span>
          </Link>
        )}
        {title && (
          <span className="text-[14px] font-semibold" style={{ color: tokens.ink }}>
            {title}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="grid place-items-center"
        style={{
          width: 38,
          height: 38,
          background: tokens.chip,
          color: tokens.ink,
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
        }}
        aria-label="Close menu"
      >
        <X size={18} weight="bold" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA strip                                                           */
/* ------------------------------------------------------------------ */

function MobileCTAs() {
  return (
    <div
      className="flex items-center gap-2 px-4 py-3"
      style={{ borderTop: `1px solid ${tokens.hairline}`, background: tokens.pageBgDeep }}
    >
      <Link
        to="/contact"
        className="flex-1 py-3 text-center text-[12px] uppercase tracking-[0.08em] font-semibold"
        style={{
          background: tokens.chip,
          color: tokens.ink,
          borderRadius: 12,
          border: `1px solid ${tokens.hairline}`,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Talk to sales
      </Link>
      <Link
        to="/early-access"
        className="flex-1 py-3 text-center text-[12px] uppercase tracking-[0.08em] font-semibold"
        style={{
          background: tokens.brand,
          color: "white",
          borderRadius: 12,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Lightning size={12} weight="fill" color="white" />
        Get early access
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Audience drilldown                                                  */
/* ------------------------------------------------------------------ */

function MobileAudience({
  audience,
  onBack,
  onClose,
}: {
  audience: Audience;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MobileDrawerHeader onBack={onBack} onClose={onClose} title={audience.label} />
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 80px" }}>
        {/* Audience header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
            <span
              className="text-[10px] uppercase tracking-[0.16em]"
              style={{ color: tokens.brand, fontWeight: 700 }}
            >
              {audience.kicker} · {audience.label.toUpperCase()}
            </span>
          </div>
          <p className="text-[13px] leading-[1.5]" style={{ color: tokens.body }}>
            {audience.blurb}
          </p>
        </div>

        {/* Solutions grid */}
        <p
          className="text-[10px] uppercase tracking-[0.14em] mb-2.5"
          style={{ color: tokens.inkMuted, fontWeight: 700 }}
        >
          Solutions
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {audience.solutions.map((s) => (
            <MobileTile key={s.name} solution={s} />
          ))}
        </div>

        {/* Featured */}
        <p
          className="text-[10px] uppercase tracking-[0.14em] mb-2.5"
          style={{ color: tokens.inkMuted, fontWeight: 700 }}
        >
          Featured
        </p>
        <Rect
          fill={tokens.card}
          stroke={tokens.hairline}
          cornerRadius={14}
          style={{ overflow: "hidden", marginBottom: 20 }}
        >
          <ul className="flex flex-col">
            {audience.featured.map((f, i) => (
              <li
                key={f.label}
                style={{ borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}` }}
              >
                <Link
                  to={SOLUTION_HREF}
                  className="block px-4 py-3"
                  style={{ textDecoration: "none" }}
                >
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
        </Rect>

        {/* Dark spotlight tile — mirrors MegaPanel's dark Rect */}
        <Rect fill={tokens.ink} cornerRadius={16}>
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-2.5">
              <span style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
              <span
                className="text-[9px] uppercase tracking-[0.16em]"
                style={{ color: tokens.brand, fontWeight: 700 }}
              >
                {audience.spotlight.kicker}
              </span>
            </div>
            <p
              className="text-[16px] font-semibold tracking-[-0.015em] leading-tight mb-2"
              style={{ color: "#ffffff" }}
            >
              {audience.spotlight.title}
            </p>
            <p
              className="text-[11.5px] leading-snug mb-3"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {audience.spotlight.bullet}
            </p>
            <Link
              to={SOLUTION_HREF}
              className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] font-semibold"
              style={{ color: tokens.brand, textDecoration: "none" }}
            >
              {audience.spotlight.cta}
              <ArrowRight size={11} weight="bold" color={tokens.brand} />
            </Link>
          </div>
        </Rect>
      </div>

      <MobileCTAs />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Solution tile                                                       */
/* ------------------------------------------------------------------ */

function MobileTile({ solution }: { solution: Audience["solutions"][number] }) {
  const { Icon, name, sub, image } = solution;
  return (
    <Link
      to={SOLUTION_HREF}
      className="block overflow-hidden"
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 12,
        textDecoration: "none",
      }}
    >
      <div
        className="overflow-hidden"
        style={{ background: tokens.pageBgDeep, aspectRatio: "16 / 10" }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full"
            style={{ objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        ) : (
          <div
            className="grid place-items-center"
            style={{ width: "100%", height: "100%" }}
          >
            <Icon
              size={44}
              weight="duotone"
              color={tokens.ink}
              style={{ opacity: 0.65 }}
            />
          </div>
        )}
      </div>
      <div className="px-2.5 py-2">
        <p className="text-[12px] font-semibold leading-tight" style={{ color: tokens.ink }}>
          {name}
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: tokens.muted }}>
          {sub}
        </p>
      </div>
    </Link>
  );
}
