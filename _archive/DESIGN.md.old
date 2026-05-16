# DESIGN.md, GridPower

> Visual + interaction design system for the GridPower monorepo. Token source of truth: `packages/tokens/src/tokens.css`. Tailwind binding: `packages/tokens/tailwind-preset.cjs`. This document is the human-readable spec; the CSS and the preset are canonical.

This revision reflects the state of the codebase after the FOUND.3 polish + harden sweep on `apps/console-charge`. Patterns documented here are present in code today and should be reused by `apps/console-energy` and the mobile apps as they catch up.

## 1. Brand color

| Token | Hex | Usage |
|---|---|---|
| `--grid-red` | `#FA0016` | Brand. Primary action. Status: critical. Logo. Cap at 10% of any composition. |
| `--grid-red-hover` | `#E00014` | Hover state on red surfaces |
| `--grid-red-active` | `#C80012` | Pressed state |
| `--grid-red-light-bg` | `#FFF0F0` | Subtle background for red status pills, light mode only |

GridRed is the only saturated hue in the system. It carries identity AND signals attention. Use for: primary buttons, the brand mark, critical status indicators, the live-revenue accent on the dashboard. Never for body text, never for chart strokes that span more than one series, never for decorative borders.

**Rule:** never use raw `text-grid-red` / `bg-grid-red` in app code. Use `text-primary` / `bg-primary` (which the tailwind preset binds back to `--grid-red`) so the semantic alias chain works. Direct brand class is reserved for the logo SVGs and the marketing surfaces in `apps/web`.

## 2. Neutrals: Sand (light) and Dark scales

Both follow the Radix 12-step pattern.

| Step | Role |
|---|---|
| 1 | Page background |
| 2 | Subtle / card background |
| 3 | UI element background, input background |
| 4 | Hovered element |
| 5 | Active / pressed element |
| 6 | Borders, grid lines, dividers |
| 7 | Stronger borders, focus rings |
| 8 | Placeholder text, disabled |
| 9 | Muted text, secondary labels |
| 10 | Secondary text |
| 11 | Body text |
| 12 | Headlines, high contrast |

Never use `#000` or `#fff`. Sand-1 is `#fdfdfc` (warm off-white). Dark-1 is `#111110` (warm near-black). Both tinted toward the brand hue.

**Components must use semantic aliases, NOT raw scale steps.** The auto-flip mechanism between light and dark only works through the semantic aliases. Reaching into `bg-sand-3` or `bg-dark-3` directly bypasses the flip and breaks the dark/light parity contract.

| Use | Tailwind class | CSS variable |
|---|---|---|
| Page background | `bg-background` | `--bg-page` |
| Card / panel surface | `bg-card` | `--bg-subtle` |
| Subtle muted block | `bg-muted` | `--bg-subtle` |
| UI element / input | `bg-secondary` | `--bg-element` |
| Hover surface | `bg-accent` | `--bg-hover` |
| Border | `border-border` | `--border` |
| Body / heading text | `text-foreground` | `--text-heading` |
| Muted text | `text-muted-foreground` | `--text-muted` |
| Brand surface | `bg-primary` / `text-primary` | `--grid-red` |

The console-charge migration is complete: raw `dark-N` / `sand-N` references are nearly eliminated from app code. The remaining occurrences are intentional (the brand mark, a couple of chart axis colors). Audit will flag any new ones.

## 3. Semantic colors

| Token | Hex | When |
|---|---|---|
| `--color-success` | `#30A46C` | Online stations, completed sessions, positive deltas |
| `--color-warning` | `#F5A623` | Warnings, maintenance scheduled, soft errors |
| `--color-error` | `#E5484D` | Hard errors, offline stations |
| `--color-info` | `#3B82F6` | Informational notices, links inside body copy |

`--color-error` and `--grid-red` are not the same. Brand red is identity + critical. Error red is "this thing failed". Side-by-side they read as siblings, not duplicates.

**Tint pattern** (now used everywhere in console-charge for status pills and inline blocks):

| Pattern | Use |
|---|---|
| `bg-success/10 text-success` | Light tint background, success label or icon |
| `bg-success/20` | Slightly deeper tint, looks correct in dark mode without an alias |
| `bg-warning/10 text-warning` | Soft warning block |
| `bg-error/10 text-error` | Soft error block (not a hard alert) |

The slash opacity syntax means the same class works in both themes without a hand-written dark variant. Prefer this over hand-built `bg-success-bg` (which exists only for the light theme).

## 4. Color strategy (per surface)

The consoles are **Restrained**: tinted neutrals + GridRed at 10% or less of any composition. That register fits an operator dashboard.

The marketing site (`apps/web`) is **Committed** in places (homepage hero, vertical landings). Intentional. Out of scope for this document.

## 5. Typography

Three font families, self-hosted in `packages/tokens/fonts/`.

| Family | Variable | Use |
|---|---|---|
| Clash Grotesk | `--font-display`, `--font-heading` | Display (72px) and h1 to h3. Industrial, geometric, distinct. |
| Inter | `--font-sans`, `--font-body` | h4 + all body text. Reliable, dense, screen-optimized. |
| Geist Mono | `--font-mono` | Labels (12px uppercase tracking 0.08em), code, monospace data. |

### Type scale (desktop)

| Class | Size / lh | Weight | Use |
|---|---|---|---|
| `.gp-display` | 72 / 80 | 600 | Hero only, not in console |
| `.gp-h1` | 56 / 64 | 600 | Page title on landing-style pages |
| `.gp-h2` | 40 / 48 | 600 | Section heading |
| `.gp-h3` | 24 / 32 | 600 | Card / panel heading |
| `.gp-h4` | 18 / 28 | 600 | Subsection heading |
| `.gp-body-lg` | 20 / 32 | 400 | Lead paragraph |
| `.gp-body` | 16 / 26 | 400 | Default body |
| `.gp-body-sm` | 14 / 22 | 400 | Compact lists, table cells |
| `.gp-label` | 12 / 16 mono uppercase 0.08em | 500 | Section labels, breadcrumbs, KPI captions |
| `.gp-code` | 14 / 22 mono | 400 | IDs, codes, raw values |

Mobile scale (max 768px) reduces display + h1 to h3 + body sizes via the `*-mobile-*` variables. Cap body line length at 65 to 75 ch.

### Heading hierarchy in code

The console-charge polish landed a real heading hierarchy. Every route follows it.

```tsx
// Topbar breadcrumb is the page <h1>
<ConsoleBreadcrumb title={activeNav.title} />  // renders <h1>

// Each route section uses <h2> with aria-labelledby on the wrapping <section>
<section aria-labelledby="kpi-overview-heading">
  <h2 id="kpi-overview-heading" className="font-mono text-label text-muted-foreground">
    KPI overview
  </h2>
  ...
</section>

// Sub-panels inside a section use <h3>
<h3 className="font-body text-h4 text-foreground">Top stations</h3>
```

Never skip a level. Never use a styled `<div>` where a heading element is correct.

## 6. Spacing

8px base scale: `--space-1` to `--space-40` (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160).

Semantic shortcuts:
- `--card-pad`: 24px (default), `--card-pad-lg`: 32px (hero card)
- `--grid-gap`: 24px (between cards in a row)
- `--stack-tight`: 8px, `--stack-normal`: 16px, `--stack-loose`: 24px
- `--btn-pad-lg/md/sm`: 16/32, 12/24, 8/16
- `--input-pad`: 12/16

**Vary spacing for rhythm.** A page where every gap is 24px reads as monotone. Mix: section gap 96px, card gap 24px, intra-card stack 16px, label-to-value 4px.

## 7. Radii

| Token | px | Use |
|---|---|---|
| `--radius-tooltip` | 6 | Tooltips |
| `--radius-btn` | 8 | Buttons |
| `--radius-input` | 8 | Inputs |
| `--radius-card` | 12 | Cards, panels |
| `--radius-modal` | 16 | Dialogs, sheets |
| `--radius-pill` | 999 | Status badges, pills |
| `--radius-img` | 8 | Images, thumbnails |

Tailwind aliases: `rounded-btn`, `rounded-input`, `rounded-card`, `rounded-modal`, `rounded-pill`, `rounded-img`. Plus the shadcn aliases `rounded-lg` / `md` / `sm` map back into the same tokens.

## 8. Elevation

Four steps. Light mode uses subtle alpha shadows; dark mode uses borders + shadow blends.

| Token | Shadow | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Hover lift on flat surfaces, inline notices |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Sheets, popovers |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.16)` | Modals |

## 9. Motion

| Token | Curve / duration |
|---|---|
| `--transition-fast` | 150ms ease-out |
| `--transition-normal` | 200ms ease-out |
| `--transition-slow` | 300ms ease-out |

**Never animate layout properties** (width, height, top, left, margin). Use `transform` and `opacity`.
**No bounce, no elastic.** Ease-out only. Exponential curves preferred (`cubic-bezier(0.16, 1, 0.3, 1)`).
**Live data:** subtle `transform: translateY` + opacity pulse on number change. Static numbers do not move.

### Hover and focus patterns now in code

The sweep landed a consistent shape. Use these forms verbatim.

```tsx
// Standard button / control hover
className="transition-colors duration-150 ease-out hover:bg-accent"

// Theme toggle (animates color, background, ring at once)
className="transition-[color,background-color,box-shadow] duration-150 ease-out
           hover:bg-accent
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
           focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Icon nudge (rotation only, transform-safe)
style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(-30deg)' }}
className="transition-transform duration-200 ease-out"
```

Default duration is `duration-150` for color/state, `duration-200` for transform. Never animate `width` / `height` to "expand" a panel; toggle a `display`/`hidden` boundary or animate `transform: scale` and `opacity` on a fixed-size container.

## 10. Layout

### Console shell

- **Page:** 100vw, no horizontal scroll. Content max-width is per-surface (1200px for marketing, 1600px for console with sidebar).
- **Sidebar:** fixed 220px wide. Always visible at 1280px and up. Collapses to 64px icon-only between 768 and 1280px. Drawer overlay below 768px.
- **Topbar:** 56px tall, sticky. Always shows breadcrumbs (left), optional center slot, theme + notifications + user (right).
- **Main content:** padding 32px (desktop), 24px (tablet), 16px (mobile). Vertical stack with section gaps of 32 to 40px.

### Responsive breakpoints

Tailwind defaults. Use them, do not invent new ones.

| Breakpoint | Min width | What changes |
|---|---|---|
| (base) | 0 | Mobile, sidebar is drawer overlay, single column |
| `md:` | 768px | Sidebar collapses to icon rail, two-column where it makes sense |
| `lg:` | 1024px | KPI grids open up to 3 to 4 columns |
| `xl:` | 1280px | Sidebar fully expanded, dense desktop layout |
| `2xl:` | 1536px | Max content width applies, no further growth |

### Tables

Tables live inside `<div className="overflow-x-auto">` so the page does not scroll horizontally on narrow viewports. The table itself is `min-w-full`. Sticky header optional and only on long single-screen tables.

### Cards

Do not wrap everything in a card. The page background already gives structure. Cards are for grouped UI that needs visual separation, not "every block of text needs a box".

Cards are never nested. A card inside a card is a structural smell. Promote one of them to a section header.

## 11. Components, what we use vs what we have

`packages/ui` exports a deep set of components. Order of preference for new work:

1. **Native HTML** (`<button>`, `<input>`, `<table>`) styled with tokens
2. **shadcn primitives** wrapped in `@gridpower/ui` (Button, Input, Select, Switch, Checkbox, RadioGroup, Dialog, Sheet, DropdownMenu, Tabs, Tooltip, Toast)
3. **Domain components from `@gridpower/ui`** (StatCard, StatusBadge, ChartCard, EmptyState, Sidebar, Topbar, Pagination, Pill, Skeleton, DotGrid)
4. **Local one-offs** (last resort, must justify)

If you reach for a fourth-tier custom component, check first that you are not duplicating something already in `packages/ui`. Available today: `alert`, `badge`, `breadcrumb`, `button`, `card`, `charts`, `checkbox`, `data-table`, `dialog`, `dot-grid`, `dropdown-menu`, `empty-state`, `input`, `pagination`, `pill`, `radio-group`, `section-divider`, `section-header`, `section-label`, `select`, `sheet`, `sidebar`, `skeleton`, `stat-card`, `status-badge`, `switch`, `table`, `tabs`, `toast`, `toaster`, `tooltip`, `topbar`.

### Field component (settings pattern)

Settings forms use a local `Field` component (lives in `apps/console-charge/src/routes/settings.tsx`). Every input has a label paired by `htmlFor` / `id`. Required fields render a `*` flagged `aria-hidden`, plus `aria-required` on the input.

```tsx
function Field({ id, label, required, type = "text", defaultValue, className }) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        defaultValue={defaultValue}
        aria-required={required ? "true" : undefined}
      />
    </div>
  );
}
```

When this pattern stabilises across two consoles, promote it into `@gridpower/ui` as `<Field>`.

### Tables

Always real `<table><thead><tbody>`. `<th scope="col">` on every header cell. Sortable headers carry `aria-sort="ascending" | "descending" | "none"`. The table itself has an accessible name via `<caption className="sr-only">` or `aria-label`.

```tsx
<table className="min-w-full">
  <caption className="sr-only">Top stations by revenue, last 7 days</caption>
  <thead>
    <tr>
      <th scope="col">Station</th>
      <th scope="col" aria-sort="descending">
        <button onClick={...}>Revenue <ChevronDown aria-hidden /></button>
      </th>
    </tr>
  </thead>
  <tbody>...</tbody>
</table>
```

### Status indicators

Color is never the only signal. A status pill is always color + text label, or color + icon with `aria-label`. A green dot alone is not acceptable.

```tsx
<span className="inline-flex items-center gap-1.5 rounded-pill bg-success/10 px-2 py-0.5 text-success">
  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
  Online
</span>
```

## 12. Dot-grid motif

The brand uses a 16x16px dot grid as a soft background texture (`--grid-bg`). Apply sparingly:

- **Use on:** empty states, login screen, CTA cards, the brand mark
- **Don't use on:** dense data screens (tables, charts), main dashboard background

In dark mode the dot color shifts to `--dark-6` automatically through `--grid-dot-color`.

## 13. Theming

`data-theme="dark"` on `<html>` flips all semantic aliases. **Dark is the default for both consoles.** Operators sit in low-light NOCs and run dashboards on a 27-inch monitor for hours. Light mode is fully supported and must be tested on every surface.

Theme toggle is a top-right control on every authenticated page. The choice persists in `localStorage` under `gp-theme` and is applied via an inline script before hydration to prevent a flash. The toggle button is rendered as a real `<button>` with `aria-label` that names the destination state ("Switch to light mode" when currently dark).

## 14. Accessibility minimums

Baseline contracts. These are now enforced in console-charge code.

| Requirement | How it appears in code |
|---|---|
| Body text contrast 4.5:1, headings 3:1, focus rings 3:1 | Token-driven, verified per theme |
| Visible focus on every interactive element | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| Form fields have associated labels | `<label htmlFor>` paired with `<input id>` (visible or `sr-only`) |
| Tables have `<th scope>` and accessible name | `scope="col"` plus `<caption className="sr-only">` |
| Sortable column headers expose state | `aria-sort="ascending" \| "descending" \| "none"` |
| Charts have an alt representation | `role="img"` on the chart, `aria-label` summarising the data, plus a hidden `<table>` as deep alternative |
| Errors are announced | `role="alert"` on hard error blocks |
| Toasts and inline notices are announced politely | `role="status"` + `aria-live="polite"` |
| Toggle buttons expose state | `aria-pressed={active}` |
| Loading buttons block interaction visibly | `aria-busy="true"` + `disabled` |
| Pagination current page is exposed | `aria-current="page"` on the active link |
| Icon-only buttons | `aria-label` mandatory; decorative icons get `aria-hidden="true"` |

## 15. Anti-pattern enforcement

The following will be rejected in code review or impeccable critique:

- Side-stripe accent borders on cards or alerts (eliminated in the sweep, do not bring back). Use full borders or background tints.
- Gradient text via `background-clip: text`.
- Glassmorphism / backdrop-blur as decoration.
- Hero-metric template (big number, small label, supporting stats, gradient accent).
- Identical card grids (icon + heading + text repeated endlessly).
- Modal as the first instinct. Exhaust inline / progressive alternatives.
- Em dashes in user-facing copy. Use commas, colons, periods, parentheses.
- **Color as the sole signal.** Status indicators must include text or icon as well.
- **`alert()` for UX.** Replaced everywhere with the `InlineNotice` toast pattern (`role="status"`, `aria-live="polite"`, auto-dismiss).
- **Raw hex** anywhere in app code. The only exception is brand SVG markup (logo files).
- **Raw `text-grid-red` / `bg-grid-red`** in app code. Use `text-primary` / `bg-primary`.
- **Raw scale steps** (`bg-sand-3`, `border-dark-6`) when a semantic alias exists.

## 16. Token discipline

- Never inline a hex value in a component. Use a token.
- Never reach into a raw scale step (`--sand-7`) when a semantic alias exists (`--border-strong`).
- Always prefer semantic tokens over raw scale steps. Raw scale references in app code are flagged in audit.
- New tokens go in `packages/tokens/src/tokens.css` first, then mapped into `packages/tokens/tailwind-preset.cjs`. Components consume them.
- If you need a value that does not exist as a token, ask: should this be a token? If yes, add it. If truly one-off, inline with a comment naming why.

## 17. Patterns proven by the FOUND.3 sweep

Canonical patterns now in `apps/console-charge` that other apps (`apps/console-energy`, the mobile apps) should reuse on contact.

### Section pattern with labelled heading

```tsx
<section aria-labelledby="top-stations-heading" className="space-y-3">
  <h2
    id="top-stations-heading"
    className="font-mono text-label text-muted-foreground"
  >
    Top stations
  </h2>
  <div className="rounded-card border border-border bg-card p-card">
    ...
  </div>
</section>
```

Every route is built from `<section>` blocks. No floating `<div>` "panels" without a heading.

### Field component for inputs

```tsx
<Field id="company-name"  label="Company name" required defaultValue="GridPower" />
<Field id="company-pan"   label="PAN"                  defaultValue="AABCD1234E" />
```

Required + optional rendering, label/id pairing, `aria-required` are all encapsulated. Settings forms in `apps/console-charge/src/routes/settings.tsx` are the reference.

### Loading / empty / error tri-state on every list panel

Every list, table, chart, KPI block must render three explicit states in addition to the populated state.

| State | Cue |
|---|---|
| Loading | Skeleton block matching the populated layout, `aria-busy="true"` on the wrapper |
| Empty | `<EmptyState>` from `@gridpower/ui` with a next-action affordance, never just "No data" |
| Error | `role="alert"` block with the human-readable message and a retry control |

The analytics route (`apps/console-charge/src/routes/analytics.tsx`) demonstrates each of the three.

### InlineNotice toast

Replaces `alert()`. Auto-dismisses, accessible, non-destructive.

```tsx
function InlineNotice({ message, onDismiss }) {
  React.useEffect(() => {
    const t = setTimeout(onDismiss, 3500);
    return () => clearTimeout(t);
  }, [onDismiss]);
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-label shadow-sm"
    >
      {message}
    </div>
  );
}
```

When this stabilises across two consoles, promote into `@gridpower/ui` as `<InlineNotice>` (the `Toast` / `Toaster` primitives already exist; this is the "ambient feedback" sibling pattern).

## 18. Update flow

This file is the working baseline. To revise:

1. Edit `DESIGN.md`.
2. If the change is also a token change, edit `packages/tokens/src/tokens.css` and reflect it in `packages/tokens/tailwind-preset.cjs`.
3. Run `pnpm typecheck && pnpm build` to verify nothing references a token you renamed.
4. Commit all changed files in one commit.

`packages/tokens` is the source of truth for *values*. The Tailwind preset is the source of truth for *class bindings*. `DESIGN.md` is the source of truth for *intent*.
