import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { BrandMark } from "../_shared/BrandMark";
import { PRIMARY_LINKS, AUDIENCES } from "../_shared/content";
import { transitions } from "@/lib/motion";

/*
  Primary nav — Variant B: Stripe-style with light hover panel.
  Defining attributes:
  - Hover-on-any-link reveals a tinted (red-tinted) panel below
  - Panel has heading + 3 supporting child links per top item
  - Slight tracking-loose feel; the panel itself is the differentiator
  - Active link gets a subtle red-tinted background pill
*/

type PanelContent = {
  heading: string;
  blurb: string;
  links: { label: string; href: string; meta?: string }[];
  promo?: { title: string; sub: string; href: string };
};

const PANELS: Record<string, PanelContent> = {
  Solutions: {
    heading: "Solutions",
    blurb: "Pick the buyer, not the box.",
    links: AUDIENCES.slice(0, 5).map((a) => ({
      label: a.label,
      href: `/solutions/${a.key}`,
      meta: a.tagline,
    })),
    promo: {
      title: "Hospitality",
      sub: "Charging as destination revenue.",
      href: "/solutions/hospitality",
    },
  },
  Platform: {
    heading: "GridOS",
    blurb: "Hardware, edge, cloud, console, app. One graph.",
    links: [
      { label: "Console", href: "/platform#console", meta: "Operator surface" },
      { label: "App", href: "/app", meta: "Driver surface" },
      { label: "Open protocols", href: "/platform#open", meta: "OCPP, MQTT, MODBUS, OpenAPI" },
      { label: "Integrations", href: "/platform#integrations", meta: "Razorpay, FAME III, DR APIs" },
    ],
  },
  App: {
    heading: "Driver app",
    blurb: "Available on iOS and Android.",
    links: [
      { label: "Find a charger", href: "/app#find" },
      { label: "Pay with UPI", href: "/app#pay" },
      { label: "Trip planner", href: "/app#trip" },
    ],
  },
  Economics: {
    heading: "The CFO room",
    blurb: "Open math. ROI, TOU, IRR, payback.",
    links: [
      { label: "Payback model", href: "/economics#payback" },
      { label: "TOU savings", href: "/economics#tou" },
      { label: "Subsidy stack", href: "/economics#subsidies" },
    ],
  },
  Resources: {
    heading: "Resources",
    blurb: "Field notes from real deployments.",
    links: [
      { label: "Documentation", href: "/resources/docs" },
      { label: "Field notes", href: "/resources/field-notes" },
      { label: "Calculators", href: "/resources/calculators" },
    ],
  },
  Contact: {
    heading: "Talk to us",
    blurb: "Engineers, not gatekeepers.",
    links: [
      { label: "Request a quote", href: "/contact?type=quote" },
      { label: "Talk to sales", href: "/contact?type=sales" },
      { label: "Partner with GridPower", href: "/partners" },
    ],
  },
};

export function PrimaryStripeHoverPanel() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const panel = openKey ? PANELS[openKey] : null;

  return (
    <header
      className="relative bg-[var(--color-page-bg)]"
      onMouseLeave={() => setOpenKey(null)}
    >
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <BrandMark />

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_LINKS.map((link) => {
              const active = openKey === link.label;
              return (
                <li
                  key={link.href}
                  onMouseEnter={() => setOpenKey(link.label)}
                  onFocus={() => setOpenKey(link.label)}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors duration-[var(--duration-hover)] ${
                      active
                        ? "bg-[var(--color-gp-red-tinted)] text-[var(--color-gp-red)]"
                        : "text-[var(--color-text-body)] hover:bg-[var(--color-section-alt)] hover:text-[var(--color-text-heading)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/sign-in"
            className="hidden rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-section-alt)] hover:text-[var(--color-text-heading)] md:inline"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-[var(--radius-sm)] bg-[var(--color-gp-red)] px-4 py-2 text-sm font-medium text-[var(--color-neutral-50)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-gp-red-hover)]"
          >
            Get early access
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {panel ? (
          <motion.div
            {...transitions.navOpen}
            className="absolute inset-x-0 top-full z-40 border-b border-[var(--color-border)] bg-[var(--color-gp-red-tinted)]"
          >
            <div className="mx-auto grid max-w-[var(--container-2xl)] gap-10 px-6 py-8 md:grid-cols-[minmax(0,18rem)_1fr_minmax(0,16rem)]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
                  {panel.heading}
                </p>
                <p className="mt-2 max-w-[28ch] font-display text-xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                  {panel.blurb}
                </p>
              </div>

              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {panel.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="group block"
                    >
                      <span className="block text-sm font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] group-hover:text-[var(--color-gp-red)]">
                        {l.label}
                      </span>
                      {l.meta ? (
                        <span className="block text-xs text-[var(--color-text-muted)]">
                          {l.meta}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>

              {panel.promo ? (
                <Link
                  to={panel.promo.href}
                  className="hidden rounded-[var(--radius-md)] border border-[var(--color-gp-red)]/30 bg-[var(--color-neutral-50)] p-4 transition-colors duration-[var(--duration-hover)] hover:border-[var(--color-gp-red)] md:block"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
                    Flagship
                  </p>
                  <p className="mt-2 font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                    {panel.promo.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-text-body)]">
                    {panel.promo.sub}
                  </p>
                </Link>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
