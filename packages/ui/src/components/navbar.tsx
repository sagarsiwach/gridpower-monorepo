"use client";

import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

// ─── GridMark logo ────────────────────────────────────────────────────────────

function GridMark({ size = 28 }: { size?: number }) {
  const s = Math.floor(size / 4);
  const g = Math.max(2, Math.floor(s * 0.35));
  const cells = [
    "bg-primary", "bg-primary", "bg-primary",
    "bg-sand-1",  "bg-primary", "bg-sand-1",
    "bg-sand-1",  "bg-sand-1",  "bg-sand-1",
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

// ─── Mega-menu data ───────────────────────────────────────────────────────────

export interface MegaMenuSection {
  label: string;
  items: { title: string; sub: string; href: string }[];
}

export interface NavItem {
  label: string;
  key: string;
  href: string;
  megaMenu?: MegaMenuSection[];
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    label: "GridEnergy",
    key: "energy",
    href: "/energy",
    megaMenu: [
      {
        label: "SOLUTIONS",
        items: [
          { title: "Home storage", sub: "5–21 kWh residential", href: "/energy/home-storage" },
          { title: "Commercial storage", sub: "30–500 kWh for offices & industry", href: "/energy/commercial" },
        ],
      },
      {
        label: "PRODUCTS",
        items: [
          { title: "Batteries & inverters", sub: "COMO L1, ROSA G1, ATLAS series", href: "/energy/products" },
          { title: "ESS & containerized", sub: "FlexCube 500SL, grid-scale", href: "/energy/ess" },
        ],
      },
      {
        label: "PLATFORM",
        items: [
          { title: "GridEnergy Console", sub: "Monitor, optimize, earn", href: "/platform" },
          { title: "Open standards", sub: "Modbus, REST API, MQTT", href: "/platform/open" },
        ],
      },
    ],
  },
  {
    label: "GridCharge",
    key: "charge",
    href: "/charge",
    megaMenu: [
      {
        label: "SOLUTIONS",
        items: [
          { title: "Home charging", sub: "7.4–22 kW smart wallboxes", href: "/charge/home" },
          { title: "Destination charging", sub: "Hotels, malls, resorts", href: "/charge/destination" },
        ],
      },
      {
        label: "PRODUCTS",
        items: [
          { title: "AC chargers", sub: "3.3 kW to 22 kW", href: "/charge/ac" },
          { title: "DC fast chargers", sub: "20 kW to 240 kW ultra-fast", href: "/charge/dc" },
        ],
      },
      {
        label: "PLATFORM",
        items: [
          { title: "GridCharge App", sub: "Find, charge, pay — live", href: "/platform/app" },
          { title: "GridCharge Console", sub: "Fleet & network management", href: "/platform/console" },
        ],
      },
    ],
  },
  {
    label: "GridDrive",
    key: "drive",
    href: "/drive",
    megaMenu: [
      {
        label: "SOLUTIONS",
        items: [
          { title: "Vehicle platforms", sub: "2W, 3W, 4W OEM kits", href: "/drive/vehicles" },
        ],
      },
      {
        label: "PRODUCTS",
        items: [
          { title: "Motors & controllers", sub: "Hub motors, mid-drive, BMS", href: "/drive/products" },
          { title: "Battery packs", sub: "48V to 400V systems", href: "/drive/batteries" },
        ],
      },
      {
        label: "PLATFORM",
        items: [
          { title: "BMS software", sub: "Open API, full diagnostics", href: "/platform/bms" },
        ],
      },
    ],
  },
  {
    label: "Platform",
    key: "platform",
    href: "/platform",
  },
];

// ─── Navbar variants ──────────────────────────────────────────────────────────

const navbarVariants = cva(
  [
    "w-full z-50",
    "bg-sand-1/95 backdrop-blur-md",
    "border-b border-sand-6",
    "transition-shadow duration-150",
  ],
  {
    variants: {
      sticky: {
        true: "sticky top-0",
        false: "relative",
      },
      scrolled: {
        true: "shadow-md",
        false: "shadow-none",
      },
    },
    defaultVariants: {
      sticky: true,
      scrolled: false,
    },
  }
);

// ─── Navbar props ─────────────────────────────────────────────────────────────

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  sticky?: boolean;
  logoHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
  items,
  ctaLabel,
  ctaHref,
  onCtaClick,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  onCtaClick?: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-sand-12/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      {/* Drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 bg-sand-1 border-l border-sand-6 shadow-xl",
          "flex flex-col transition-transform duration-200",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-sand-6">
          <span className="font-display font-semibold text-[13px] tracking-[-0.02em] text-sand-12">
            GRIDPOWER
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-btn text-sand-9 hover:bg-sand-3 transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {items.map((item) => (
            <div key={item.key}>
              <a
                href={item.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-btn text-[14px] font-medium text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-colors"
                onClick={onClose}
              >
                {item.label}
              </a>
              {item.megaMenu?.map((section) => (
                <div key={section.label} className="ml-3 mt-1 mb-2">
                  <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-sand-9 mb-1.5 px-3">
                    {section.label}
                  </p>
                  {section.items.map((mi) => (
                    <a
                      key={mi.title}
                      href={mi.href}
                      className="block px-3 py-2 rounded-btn text-[13px] text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-colors"
                      onClick={onClose}
                    >
                      {mi.title}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-sand-6 space-y-2">
          <a
            href="/about"
            className="block px-3 py-2.5 rounded-btn text-[14px] text-sand-11 hover:bg-sand-3 transition-colors"
          >
            About
          </a>
          <a
            href="/contact"
            className="block px-3 py-2.5 rounded-btn text-[14px] text-sand-11 hover:bg-sand-3 transition-colors"
          >
            Contact
          </a>
          <a
            href={ctaHref}
            onClick={onCtaClick}
            className="block w-full text-center bg-primary text-white rounded-btn px-5 py-2.5 text-[14px] font-medium hover:bg-grid-red-hover transition-colors"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar({
  items = DEFAULT_NAV_ITEMS,
  sticky = true,
  logoHref = "/",
  ctaLabel = "Get early access",
  ctaHref = "/signup",
  onCtaClick,
  className,
  ...props
}: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(navbarVariants({ sticky, scrolled }), className)}
        {...props}
      >
        <div className="mx-auto max-w-[1200px] px-10 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href={logoHref}
            className="flex items-center gap-2.5 no-underline"
            aria-label="GridPower home"
          >
            <GridMark size={28} />
            <span className="font-display font-semibold text-[15px] tracking-[-0.02em] text-sand-12">
              GRIDPOWER
            </span>
          </a>

          {/* Desktop nav */}
          <NavigationMenu.Root className="hidden md:flex items-center gap-0.5">
            <NavigationMenu.List className="flex items-center gap-0.5 list-none m-0 p-0">
              {items.map((item) => (
                <NavigationMenu.Item key={item.key}>
                  {item.megaMenu ? (
                    <>
                      <NavigationMenu.Trigger
                        className={cn(
                          "flex items-center gap-1 px-3.5 py-[7px] rounded-btn",
                          "font-body text-[14px] text-sand-11",
                          "hover:bg-sand-3 hover:text-sand-12",
                          "data-[state=open]:bg-sand-3",
                          "transition-colors cursor-pointer",
                          "select-none outline-none",
                          "group"
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          size={11}
                          className="opacity-50 transition-transform duration-150 group-data-[state=open]:rotate-180"
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content
                        className={cn(
                          "absolute top-full left-0 mt-1",
                          "bg-sand-1 border border-sand-6 rounded-card shadow-lg",
                          "p-6 min-w-[520px]",
                          "z-50"
                        )}
                        style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${item.megaMenu.length}, 1fr)`,
                          gap: "2rem",
                        }}
                      >
                        {item.megaMenu.map((section) => (
                          <div key={section.label}>
                            <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-sand-9 mb-3 font-medium">
                              {section.label}
                            </p>
                            {section.items.map((mi) => (
                              <NavigationMenu.Link
                                key={mi.title}
                                href={mi.href}
                                className={cn(
                                  "block px-3 py-2.5 rounded-btn mb-0.5 cursor-pointer no-underline",
                                  "hover:bg-sand-3 transition-colors"
                                )}
                              >
                                <p className="font-body text-[14px] font-medium text-sand-12 mb-0.5">
                                  {mi.title}
                                </p>
                                <p className="font-body text-[12px] text-sand-9">
                                  {mi.sub}
                                </p>
                              </NavigationMenu.Link>
                            ))}
                          </div>
                        ))}
                      </NavigationMenu.Content>
                    </>
                  ) : (
                    <NavigationMenu.Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3.5 py-[7px] rounded-btn",
                        "font-body text-[14px] text-sand-11",
                        "hover:bg-sand-3 hover:text-sand-12",
                        "transition-colors cursor-pointer no-underline",
                        "outline-none"
                      )}
                    >
                      {item.label}
                    </NavigationMenu.Link>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
            <NavigationMenu.Viewport
              className={cn(
                "relative mt-2 overflow-hidden",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90"
              )}
            />
          </NavigationMenu.Root>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/about"
              className="px-3.5 py-[7px] font-body text-[14px] text-sand-11 rounded-btn hover:bg-sand-3 hover:text-sand-12 transition-colors no-underline"
            >
              About
            </a>
            <a
              href="/contact"
              className="px-3.5 py-[7px] font-body text-[14px] text-sand-11 rounded-btn hover:bg-sand-3 hover:text-sand-12 transition-colors no-underline"
            >
              Contact
            </a>
            <a
              href={ctaHref}
              onClick={onCtaClick}
              className="bg-primary text-white rounded-btn px-5 py-2 text-[14px] font-medium hover:bg-grid-red-hover transition-colors no-underline"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-btn text-sand-9 hover:bg-sand-3 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={items}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        onCtaClick={onCtaClick}
      />
    </>
  );
}

export { GridMark };
export type { NavItem as NavbarItem };
