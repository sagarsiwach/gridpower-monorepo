import { UtilityMinimalMono } from "../../components/menus/utility/UtilityMinimalMono";
import { UtilityPillButtons } from "../../components/menus/utility/UtilityPillButtons";
import { PrimaryLinearMinimal } from "../../components/menus/primary/PrimaryLinearMinimal";
import { PrimaryStripeHoverPanel } from "../../components/menus/primary/PrimaryStripeHoverPanel";
import { PrimaryAppleCentered } from "../../components/menus/primary/PrimaryAppleCentered";
import { MegaAudienceGrid } from "../../components/menus/mega/MegaAudienceGrid";
import { MegaTabbedRail } from "../../components/menus/mega/MegaTabbedRail";
import { MegaVisualPanel } from "../../components/menus/mega/MegaVisualPanel";
import { DrawerSlideAccordion } from "../../components/menus/drawer/DrawerSlideAccordion";
import { DrawerFullscreenTabs } from "../../components/menus/drawer/DrawerFullscreenTabs";
import { FooterFourCol } from "../../components/menus/footer/FooterFourCol";
import { FooterUltraRich } from "../../components/menus/footer/FooterUltraRich";
import { BreadcrumbsMinimal } from "../../components/menus/breadcrumbs/BreadcrumbsMinimal";
import { BreadcrumbsIconChevron } from "../../components/menus/breadcrumbs/BreadcrumbsIconChevron";
import { TabsUnderline } from "../../components/menus/tabs/TabsUnderline";
import { TabsPill } from "../../components/menus/tabs/TabsPill";
import { CommandPalette } from "../../components/menus/cmdk/CommandPalette";

export type Placement = "top" | "below-nav" | "stretch" | "center" | "bottom";

export type VariantEntry = {
  slug: string;
  title: string;
  category: string;
  description: string;
  Component: React.ComponentType;
  placement: Placement;
};

export const VARIANTS: VariantEntry[] = [
  {
    slug: "utility-minimal-mono",
    title: "Utility · Minimal Mono",
    category: "Top utility bar",
    description: "Quiet, monospaced links. Linear-style. Cross-cutting low-emphasis nav above the main bar.",
    Component: UtilityMinimalMono,
    placement: "top",
  },
  {
    slug: "utility-pill-buttons",
    title: "Utility · Pill Buttons",
    category: "Top utility bar",
    description: "Each item rendered as a subtle pill. Slightly louder than minimal-mono.",
    Component: UtilityPillButtons,
    placement: "top",
  },
  {
    slug: "primary-linear-minimal",
    title: "Primary · Linear Minimal",
    category: "Primary navigation",
    description: "Sparse, single-line nav. Logo + center links + CTA. The Linear/Vercel aesthetic.",
    Component: PrimaryLinearMinimal,
    placement: "top",
  },
  {
    slug: "primary-stripe-hover",
    title: "Primary · Stripe Hover Panel",
    category: "Primary navigation",
    description: "Standard sticky nav with a light hover panel beneath Solutions. Stripe.com aesthetic.",
    Component: PrimaryStripeHoverPanel,
    placement: "top",
  },
  {
    slug: "primary-apple-centered",
    title: "Primary · Apple Centered",
    category: "Primary navigation",
    description: "Centered tracking-loose typography. Apple product pages.",
    Component: PrimaryAppleCentered,
    placement: "top",
  },
  {
    slug: "mega-audience-grid",
    title: "Mega-menu · Audience Grid",
    category: "Mega menu",
    description: "Five audience columns side by side, each listing solutions. Cloudflare/Stripe approach.",
    Component: MegaAudienceGrid,
    placement: "below-nav",
  },
  {
    slug: "mega-tabbed-rail",
    title: "Mega-menu · Tabbed Rail",
    category: "Mega menu",
    description: "Left-rail of audience tabs, content panel on the right. Scales to many solutions per audience.",
    Component: MegaTabbedRail,
    placement: "below-nav",
  },
  {
    slug: "mega-visual-panel",
    title: "Mega-menu · Visual Panel",
    category: "Mega menu",
    description: "Audience list + a full-bleed visual block. Apple-style depth, identity-forward.",
    Component: MegaVisualPanel,
    placement: "below-nav",
  },
  {
    slug: "drawer-slide-accordion",
    title: "Drawer · Slide-Right Accordion",
    category: "Mobile drawer",
    description: "Slides in from right. Audience groups collapse/expand. Stripe mobile.",
    Component: DrawerSlideAccordion,
    placement: "stretch",
  },
  {
    slug: "drawer-fullscreen-tabs",
    title: "Drawer · Full-Screen Tabs",
    category: "Mobile drawer",
    description: "Takes over the viewport. Tabbed across the top. Aggressive mobile commitment.",
    Component: DrawerFullscreenTabs,
    placement: "stretch",
  },
  {
    slug: "footer-four-col",
    title: "Footer · 4-Column Standard",
    category: "Footer",
    description: "Brand + 4 nav columns + legal. Vercel-style.",
    Component: FooterFourCol,
    placement: "bottom",
  },
  {
    slug: "footer-ultra-rich",
    title: "Footer · 6-Column Ultra-Rich",
    category: "Footer",
    description: "Newsletter inline, 6 columns, social row, status badge, ↗ cross-link.",
    Component: FooterUltraRich,
    placement: "bottom",
  },
  {
    slug: "breadcrumbs-minimal",
    title: "Breadcrumbs · Minimal",
    category: "Breadcrumbs",
    description: "Text-only with thin separators. Quiet, doc-style.",
    Component: BreadcrumbsMinimal,
    placement: "center",
  },
  {
    slug: "breadcrumbs-icon-chevron",
    title: "Breadcrumbs · Icon + Chevron",
    category: "Breadcrumbs",
    description: "Home icon, chevron separators. App-style.",
    Component: BreadcrumbsIconChevron,
    placement: "center",
  },
  {
    slug: "tabs-underline",
    title: "Tabs · Underline",
    category: "In-page tabs",
    description: "Active indicator slides via layoutId. Apple/Stripe sub-navigation.",
    Component: TabsUnderline,
    placement: "center",
  },
  {
    slug: "tabs-pill",
    title: "Tabs · Pill",
    category: "In-page tabs",
    description: "Active state fills the tab. Linear-style segmented control.",
    Component: TabsPill,
    placement: "center",
  },
  {
    slug: "cmdk-command-palette",
    title: "Cmd-K · Command Palette",
    category: "Command palette",
    description: "Press Cmd-K. Search/jump anywhere in the app. Mandatory for dashboards.",
    Component: CommandPalette,
    placement: "center",
  },
];

export const VARIANTS_BY_SLUG: Record<string, VariantEntry> = Object.fromEntries(
  VARIANTS.map((v) => [v.slug, v]),
);
