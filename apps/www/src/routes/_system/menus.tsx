import { MenuTypeSection, PageContext, VariantSlot } from "@/components/menus/_shared/ShowcaseFrame";

// Type 1 — Utility bar
import { UtilityMinimalMono } from "@/components/menus/utility/UtilityMinimalMono";
import { UtilityPillButtons } from "@/components/menus/utility/UtilityPillButtons";

// Type 2 — Primary nav
import { PrimaryLinearMinimal } from "@/components/menus/primary/PrimaryLinearMinimal";
import { PrimaryStripeHoverPanel } from "@/components/menus/primary/PrimaryStripeHoverPanel";
import { PrimaryAppleCentered } from "@/components/menus/primary/PrimaryAppleCentered";

// Type 3 — Mega-menu
import { MegaAudienceGrid } from "@/components/menus/mega/MegaAudienceGrid";
import { MegaTabbedRail } from "@/components/menus/mega/MegaTabbedRail";
import { MegaVisualPanel } from "@/components/menus/mega/MegaVisualPanel";

// Type 4 — Mobile drawer
import { DrawerSlideAccordion } from "@/components/menus/drawer/DrawerSlideAccordion";
import { DrawerFullscreenTabs } from "@/components/menus/drawer/DrawerFullscreenTabs";

// Type 5 — Footer
import { FooterFourCol } from "@/components/menus/footer/FooterFourCol";
import { FooterUltraRich } from "@/components/menus/footer/FooterUltraRich";

// Type 6 — Breadcrumbs
import { BreadcrumbsMinimal } from "@/components/menus/breadcrumbs/BreadcrumbsMinimal";
import { BreadcrumbsIconChevron } from "@/components/menus/breadcrumbs/BreadcrumbsIconChevron";

// Type 7 — In-page tabs
import { TabsUnderline } from "@/components/menus/tabs/TabsUnderline";
import { TabsPill } from "@/components/menus/tabs/TabsPill";

// Type 8 — Command palette
import { CommandPalette } from "@/components/menus/cmdk/CommandPalette";

/*
  /system/menus — long scrollable menu showcase.
  Eight menu types, each with 2-3 working variants.
  Sagar walks through, picks per type. Picks get extracted into
  production v1 nav in a follow-up.

  Production nav lives in src/components/nav/* — that is the
  current default and is rendered on real routes. Everything on
  this page is a variant CANDIDATE.
*/

const INDEX = [
  { num: "01", id: "utility", label: "Top utility bar", count: 2 },
  { num: "02", id: "primary", label: "Primary navigation", count: 3 },
  { num: "03", id: "mega", label: "Mega-menu (Solutions)", count: 3 },
  { num: "04", id: "drawer", label: "Mobile drawer", count: 2 },
  { num: "05", id: "footer", label: "Footer mega-nav", count: 2 },
  { num: "06", id: "breadcrumbs", label: "Breadcrumbs", count: 2 },
  { num: "07", id: "tabs", label: "In-page tabs", count: 2 },
  { num: "08", id: "cmdk", label: "Command palette", count: 1 },
];

export default function SystemMenusPage() {
  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      {/* Page-level header — distinguishes the showcase from production routes */}
      <header className="border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]">
        <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
            Design system / Menus
          </p>
          <h1 className="mt-4 max-w-[24ch] font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-heading)]">
            Eight menu types, twenty variants.
          </h1>
          <p className="mt-6 max-w-[58ch] text-base leading-[1.625] text-[var(--color-text-body)]">
            Each section below is interactive. Hover a primary nav to open
            its mega-panel. Open the drawer on mobile. Press Cmd plus K
            anywhere on this page. Pick one variant per type; the picks
            extract into production v1 in a follow-up.
          </p>

          <nav aria-label="Menu index" className="mt-12">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Jump to
            </p>
            <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
              {INDEX.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    className="group flex items-baseline gap-3 transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                  >
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)] group-hover:text-[var(--color-gp-red)]">
                      {i.num}
                    </span>
                    <span className="text-sm text-[var(--color-text-body)] group-hover:text-[var(--color-text-heading)]">
                      {i.label}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                      {i.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Type 1 — Utility bar */}
        <MenuTypeSection
          number="01"
          id="utility"
          title="Top utility bar"
          description="Cross-cutting low-emphasis row. About, Partners, Support, Sign in. Sits above the main nav, hidden on mobile."
        >
          <VariantSlot
            letter="A"
            label="Minimal mono"
            rationale="Neutral-100 strip, mono tagline, Inter links. Cleanest reading line. The default-quiet option."
          >
            <UtilityMinimalMono />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="Pill buttons"
            rationale="System-status cue on the left (live dot + GridOS), pill-shaped links on the right. Frames the bar as state, not decoration."
          >
            <UtilityPillButtons />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 2 — Primary navigation */}
        <MenuTypeSection
          number="02"
          id="primary"
          title="Primary navigation"
          description="The main sticky nav. Brand logo left, links center, primary CTA right. Three approaches; each opens a different conversation about restraint."
        >
          <VariantSlot
            letter="A"
            label="Linear minimal"
            rationale="Wordmark + 6 links + neutral-dark CTA. Hover reveals a compact 5-col dropdown beneath the rule. Restraint cue: nothing pops."
          >
            <PrimaryLinearMinimal />
            <PageContext />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="Stripe with hover panel"
            rationale="Every primary item gets a tinted panel beneath it on hover. Heaviest in identity, most navigable. The CTA stays GridRed."
          >
            <PrimaryStripeHoverPanel />
            <PageContext />
          </VariantSlot>
          <VariantSlot
            letter="C"
            label="Apple centered"
            rationale="Centred link row, narrow tracking. Sign-in becomes an icon. No mega panel; links go straight to pages. The most product-page feel."
          >
            <PrimaryAppleCentered />
            <PageContext />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 3 — Mega menu */}
        <MenuTypeSection
          number="03"
          id="mega"
          title="Mega-menu (Solutions)"
          description="Triggers from the Solutions item. Three IA strategies. Each opens and closes with the locked 180ms ease-out-quart motion."
        >
          <VariantSlot
            letter="A"
            label="5-column audience grid"
            rationale="Every audience equal-weight, columns are buyer mental-models. Best when audiences <= 5 and solutions <= 4 per audience."
          >
            <MegaAudienceGrid />
            <PageContext />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="Tabbed left-rail"
            rationale="Audience selector on the left, solutions on the right. Scales past 4 solutions per audience. Less scannable in one read, more breathing room per leaf."
          >
            <MegaTabbedRail />
            <PageContext />
          </VariantSlot>
          <VariantSlot
            letter="C"
            label="Full-bleed visual panel"
            rationale="Imagery slot on the left becomes a brand moment, solutions on the right. Best when the homepage and mega need to feel cohesive. Imagery placeholder until photography ships."
          >
            <MegaVisualPanel />
            <PageContext />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 4 — Mobile drawer */}
        <MenuTypeSection
          number="04"
          id="drawer"
          title="Mobile drawer"
          description="Hamburger opens a sheet. The whole menu lives here on mobile, including utility links. Click the trigger to test."
        >
          <VariantSlot
            letter="A"
            label="Slide-right with accordions"
            rationale="Classic vertical stack. Solutions expands to a per-audience accordion. Deepest IA depth without a new screen. More taps to a leaf."
          >
            <DrawerSlideAccordion />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="Full-screen with tabs"
            rationale="Drawer becomes a screen. Tab strip switches sections. Solutions surfaces all audiences in one tap. Heavier ergonomics, faster path to leaf."
          >
            <DrawerFullscreenTabs />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 5 — Footer */}
        <MenuTypeSection
          number="05"
          id="footer"
          title="Footer mega-nav"
          description="Site-wide footer. Production v1 is in src/components/footer/Footer.tsx; these are alternatives to compare against, not replacements yet."
        >
          <VariantSlot
            letter="A"
            label="4-col standard"
            rationale="Brand block + 4 link columns + legal strip. No newsletter, no logos, no cross-link block. Lightest possible exit."
            surface="section"
          >
            <FooterFourCol />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="6-col ultra-rich"
            rationale="Brand + newsletter on the left, six condensed columns on the right (Solutions split per audience). Logo-wall row beneath. Best when the homepage avoids deep cross-linking."
            surface="section"
          >
            <FooterUltraRich />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 6 — Breadcrumbs */}
        <MenuTypeSection
          number="06"
          id="breadcrumbs"
          title="Breadcrumbs"
          description="Sits at the top of deep pages. Lives below the main nav, above the H1. Two approaches: quiet prose vs status-bar chrome."
        >
          <VariantSlot
            letter="A"
            label="Text-only minimal"
            rationale="Inter, text-xs, slashes. Final crumb in neutral-900, ancestors muted. Reads as prose, no chrome. Best for narrative pages."
          >
            <BreadcrumbsMinimal />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="Home icon + chevrons"
            rationale="Geist Mono labels, chevron separators, home glyph, hairline-rule surface. Reads as 'you are here' state, not sentence. Best for docs/resources."
          >
            <BreadcrumbsIconChevron />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 7 — In-page tabs */}
        <MenuTypeSection
          number="07"
          id="tabs"
          title="In-page tabs"
          description="Used inside long vertical landing pages (Overview, Spec, Economics, Install). Two styles for two roles."
        >
          <VariantSlot
            letter="A"
            label="Underline-active (Apple)"
            rationale="Hairline rule, type+underline only. Active underline animates left-right via transform. Quietest chrome. Reads as section markers."
          >
            <TabsUnderline />
          </VariantSlot>
          <VariantSlot
            letter="B"
            label="Pill-active (Linear)"
            rationale="Tinted container, popped active pill, item counts in mono. Reads as a control surface, not nav. Best for filters/views."
          >
            <TabsPill />
          </VariantSlot>
        </MenuTypeSection>

        {/* Type 8 — Cmd+K */}
        <MenuTypeSection
          number="08"
          id="cmdk"
          title="Command palette"
          description="Cmd+K (or Ctrl+K) anywhere on the site. Search and jump. Single variant; palette behaviour is a binary, not a style choice."
        >
          <VariantSlot
            letter="A"
            label="Working Cmd+K"
            rationale="Modal with type-to-filter, arrow-key navigation, kbd shortcut hints. No glass, no shadow; hairline border over neutral-900 backdrop at 30 percent."
          >
            <CommandPalette />
          </VariantSlot>
        </MenuTypeSection>
      </main>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-neutral-100)]">
        <div className="mx-auto flex max-w-[var(--container-2xl)] flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            /system/menus · SAG-2992 · {INDEX.reduce((n, i) => n + i.count, 0)} variants
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            Pick one variant per type. Picks extract to production nav in a follow-up.
          </p>
        </div>
      </footer>
    </div>
  );
}
