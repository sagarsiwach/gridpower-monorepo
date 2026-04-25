import { Link } from "react-router";

interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

// Footer columns ported from _prototype/website/Footer.jsx
const FOOTER_COLUMNS: FooterLinkColumn[] = [
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

// Mirror of @gridpower/ui Footer layout; the brand column's newsletter input
// was a stub with no submission handler, so it is replaced with a Link to
// /signup which already hosts the real waitlist form.
function GridMarkDark({ size = 28 }: { size?: number }) {
  const s = Math.floor(size / 4);
  const g = Math.max(2, Math.floor(s * 0.35));
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
        <div key={i} className={`rounded-[1px] ${cls}`} />
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-dark-1 border-t border-dark-6 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-10">
        {/* Top grid: brand + 4 columns */}
        <div
          className="grid gap-10 mb-12"
          style={{ gridTemplateColumns: "2fr repeat(4, 1fr)" }}
        >
          {/* Brand column */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline mb-5"
              aria-label="GridPower home"
            >
              <GridMarkDark size={28} />
              <span className="font-display font-semibold text-[15px] tracking-[-0.02em] text-dark-12">
                GRIDPOWER
              </span>
            </Link>
            <p className="font-body text-body-sm text-dark-11 leading-[1.7] max-w-[220px] mb-5">
              India's open energy technology platform. Storage, charging, powertrain.
            </p>
            <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-dark-9 mb-2">
              DeltaEV Mobility Pvt Ltd
            </p>
            <p className="font-mono text-[10px] tracking-[0.04em] text-dark-9">
              Dharwad, Karnataka · GIDC Verna, Goa
            </p>

            {/* Waitlist CTA. Replaces the old newsletter input stub.
                The real form lives at /signup, so this routes there. */}
            <div className="mt-6">
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-dark-10 mb-2 font-medium">
                Stay in the loop
              </p>
              <p className="font-body text-body-sm text-dark-11 mb-3">
                Get launch updates.
              </p>
              <Link
                to="/signup"
                className="inline-flex items-center bg-primary text-primary-foreground rounded-btn px-4 py-2 font-body text-body-sm font-medium hover:bg-grid-red-hover transition-colors no-underline"
              >
                Join the waitlist →
              </Link>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-dark-10 mb-[18px] font-medium">
                {col.title}
              </p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block font-body text-body-sm text-dark-11 mb-[11px] hover:text-dark-12 transition-colors no-underline"
                >
                  {link.label}
                </Link>
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
              <Link
                key={label}
                to={`/${label.toLowerCase()}`}
                className="font-body text-[12px] text-dark-9 hover:text-dark-12 transition-colors no-underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
