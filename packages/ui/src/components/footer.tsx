"use client";

import * as React from "react";
import { cn } from "../lib/utils";

// ─── Footer dark GridMark ──────────────────────────────────────────────────

function GridMarkDark({ size = 28 }: { size?: number }) {
  const s = Math.floor(size / 4);
  const g = Math.max(2, Math.floor(s * 0.35));
  // Light variant — primary + dark-12 background
  const cells = [
    "bg-primary", "bg-primary", "bg-primary",
    "bg-dark-6",  "bg-primary", "bg-dark-6",
    "bg-dark-6",  "bg-dark-6",  "bg-dark-6",
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(3,${s}px)`,
        gridTemplateRows: `repeat(3,${s}px)`,
        gap: `${g}px`,
        flexShrink: 0,
      }}
    >
      {cells.map((cls, i) => (
        <div key={i} className={cn("rounded-[1px]", cls)} />
      ))}
    </div>
  );
}

// ─── Footer data ──────────────────────────────────────────────────────────────

export interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

const DEFAULT_COLUMNS: FooterLinkColumn[] = [
  {
    title: "GridEnergy",
    links: [
      { label: "Home storage", href: "/energy/home-storage" },
      { label: "Commercial", href: "/energy/commercial" },
      { label: "Products", href: "/energy/products" },
      { label: "GridOS platform", href: "/platform" },
    ],
  },
  {
    title: "GridCharge",
    links: [
      { label: "Home charging", href: "/charge/home" },
      { label: "Destination", href: "/charge/destination" },
      { label: "Products", href: "/charge/products" },
      { label: "Console", href: "/platform/console" },
    ],
  },
  {
    title: "GridDrive",
    links: [
      { label: "2W platform", href: "/drive/vehicles" },
      { label: "3W platform", href: "/drive/vehicles" },
      { label: "4W platform", href: "/drive/vehicles" },
      { label: "Products", href: "/drive/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Platform", href: "/platform" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// ─── Footer props ─────────────────────────────────────────────────────────────

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterLinkColumn[];
  logoHref?: string;
  /** Newsletter input submission handler */
  onNewsletterSubmit?: (email: string) => void;
  showNewsletter?: boolean;
}

// ─── Footer component ─────────────────────────────────────────────────────────

export function Footer({
  columns = DEFAULT_COLUMNS,
  logoHref = "/",
  onNewsletterSubmit,
  showNewsletter = false,
  className,
  ...props
}: FooterProps) {
  const [email, setEmail] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNewsletterSubmit?.(email);
    setEmail("");
  }

  return (
    <footer
      className={cn(
        "bg-dark-1 border-t border-dark-6",
        "pt-16 pb-8",
        className
      )}
      {...props}
    >
      <div className="max-w-[1200px] mx-auto px-10">
        {/* Top grid: brand + 4 columns */}
        <div
          className="grid gap-10 mb-12"
          style={{ gridTemplateColumns: "2fr repeat(4, 1fr)" }}
        >
          {/* Brand column */}
          <div>
            <a
              href={logoHref}
              className="flex items-center gap-2.5 no-underline mb-5"
              aria-label="GridPower home"
            >
              <GridMarkDark size={28} />
              <span className="font-display font-semibold text-[15px] tracking-[-0.02em] text-dark-12">
                GRIDPOWER
              </span>
            </a>
            <p className="font-body text-[13px] text-dark-11 leading-[1.7] max-w-[220px] mb-5">
              India's open energy technology platform. Storage, charging, powertrain.
            </p>
            <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-dark-9 mb-2">
              DeltaEV Mobility Pvt Ltd
            </p>
            <p className="font-mono text-[10px] tracking-[0.04em] text-dark-9">
              Dharwad, Karnataka · GIDC Verna, Goa
            </p>

            {/* Newsletter stub */}
            {showNewsletter && (
              <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={cn(
                    "flex-1 bg-dark-3 border border-dark-6 rounded-input",
                    "px-3 py-2 text-[13px] font-body text-dark-12",
                    "placeholder:text-dark-8",
                    "focus:outline-none focus:ring-1 focus:ring-primary",
                    "transition-colors"
                  )}
                />
                <button
                  type="submit"
                  className="bg-primary text-white rounded-btn px-4 py-2 text-[13px] font-medium hover:bg-grid-red-hover transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-dark-10 mb-[18px] font-medium">
                {col.title}
              </p>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "block font-body text-[13px] text-dark-11 mb-[11px]",
                    "hover:text-dark-12 transition-colors no-underline",
                    "cursor-pointer"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-6 pt-6 flex items-center justify-between flex-wrap gap-3">
          <p className="font-body text-[12px] text-dark-9">
            © 2026 DeltaEV Mobility Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Contact"].map((label) => (
              <a
                key={label}
                href={`/${label.toLowerCase()}`}
                className="font-body text-[12px] text-dark-9 hover:text-dark-12 transition-colors no-underline cursor-pointer"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
