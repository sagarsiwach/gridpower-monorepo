import { Footer } from "@gridpower/ui";
import type { FooterLinkColumn } from "@gridpower/ui";

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

// SiteFooter wraps @gridpower/ui Footer with GridPower marketing link tree.
// Newsletter input is a stub — no submission handler wired.
export function SiteFooter() {
  return (
    <Footer
      columns={FOOTER_COLUMNS}
      logoHref="/"
      showNewsletter={false}
    />
  );
}
