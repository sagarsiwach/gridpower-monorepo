# DESIGN.md — GridPower

> Visual + interaction design system for the GridPower monorepo. Token source of truth: `packages/tokens/src/tokens.css`. This document is the *human-readable* spec; the CSS is canonical.

## Brand color

| Token | Hex | Usage |
|---|---|---|
| `--grid-red` | `#FA0016` | Brand. Primary action. Status: critical. Logo. **≤ 10 % of any composition.** |
| `--grid-red-hover` | `#E00014` | Hover state on red surfaces |
| `--grid-red-active` | `#C80012` | Pressed state |
| `--grid-red-light-bg` | `#FFF0F0` | Subtle background for red status pills (light mode only) |

GridRed is the only saturated hue in the system. It carries identity AND signals attention. Use it for: primary buttons, the brand mark, critical status indicators, and the live-revenue accent on the dashboard. Never for body text, never for chart strokes that span more than one series, never for decorative borders.

## Neutrals — Sand (light) and Dark scales

Both follow the Radix 12-step pattern. Step semantics:

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

**Never use `#000` or `#fff`.** Sand-1 is `#fdfdfc` (warm off-white). Dark-1 is `#111110` (warm near-black). Both tinted toward the brand hue.

Use **semantic aliases** in components, not raw scale values:
`--bg-page`, `--bg-subtle`, `--bg-element`, `--bg-hover`, `--bg-active`, `--border`, `--border-strong`, `--text-placeholder`, `--text-muted`, `--text-secondary`, `--text-body`, `--text-heading`. They auto-flip for dark mode via `[data-theme="dark"]`.

## Semantic colors

| Token | Hex | When |
|---|---|---|
| `--color-success` | `#30A46C` | Online stations, completed sessions, positive deltas |
| `--color-warning` | `#F5A623` | Warnings, maintenance scheduled, soft errors |
| `--color-error` | `#E5484D` | Hard errors, offline stations |
| `--color-info` | `#3B82F6` | Informational notices, links inside body copy |

**`--color-error` and `--grid-red` are not the same.** Brand red = identity + critical. Error red = "this thing failed". Side-by-side they read as siblings, not duplicates.

## Color strategy (per surface)

This codebase uses **Restrained** as the default for the consoles: tinted neutrals + GridRed at ≤ 10 % of any composition. That's the right register for an operator dashboard.

The marketing site (`apps/web`) uses **Committed** in places (homepage hero, vertical landings) — that's intentional and out of scope for the consoles.

## Typography

Three font families, self-hosted in `packages/tokens/fonts/`:

| Family | Variable | Use |
|---|---|---|
| Clash Grotesk | `--font-display`, `--font-heading` | Display (72 px) and h1–h3. Industrial, geometric, uniquely Indian via the typeface origin. |
| Inter | `--font-sans`, `--font-body` | h4 + all body text. Reliable, dense, screen-optimized. |
| Geist Mono | `--font-mono` | Labels (12 px uppercase tracking 0.08em), code, monospace data. |

### Type scale (desktop)

| Class | Size / lh | Weight | Use |
|---|---|---|---|
| `.gp-display` | 72 / 80 | 600 | Hero only. Not used in console. |
| `.gp-h1` | 56 / 64 | 600 | Page title on landing-style pages |
| `.gp-h2` | 40 / 48 | 600 | Section heading |
| `.gp-h3` | 24 / 32 | 600 | Card / panel heading |
| `.gp-h4` | 18 / 28 | 600 | Subsection heading |
| `.gp-body-lg` | 20 / 32 | 400 | Lead paragraph |
| `.gp-body` | 16 / 26 | 400 | Default body |
| `.gp-body-sm` | 14 / 22 | 400 | Compact lists, table cells |
| `.gp-label` | 12 / 16 mono uppercase 0.08em | 500 | Section labels, breadcrumbs, KPI captions |
| `.gp-code` | 14 / 22 mono | 400 | IDs, codes, raw values |

Mobile scale (≤ 768 px) reduces display + h1–h3 + body sizes; uses the `*-mobile-*` variables. **Cap body line length at 65–75 ch.**

## Spacing

8 px base scale: `--space-1`...`--space-40` (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120, 160).

Semantic shortcuts:
- `--card-pad`: 24 px (default), `--card-pad-lg`: 32 px (hero card)
- `--grid-gap`: 24 px (between cards in a row)
- `--stack-tight`: 8 px, `--stack-normal`: 16 px, `--stack-loose`: 24 px
- `--btn-pad-lg/md/sm`: 16/32, 12/24, 8/16
- `--input-pad`: 12/16

**Vary spacing for rhythm.** A page where every gap is 24 px reads as monotone. Mix: section gap 96 px, card gap 24 px, intra-card stack 16 px, label-to-value 4 px.

## Radii

| Token | px | Use |
|---|---|---|
| `--radius-tooltip` | 6 | Tooltips |
| `--radius-btn` | 8 | Buttons |
| `--radius-input` | 8 | Inputs |
| `--radius-card` | 12 | Cards, panels |
| `--radius-modal` | 16 | Dialogs, sheets |
| `--radius-pill` | 999 | Status badges, pills |
| `--radius-img` | 8 | Images, thumbnails |

## Elevation

Four steps. Light mode uses subtle alpha shadows; dark mode uses borders + shadow blends.

| Token | Shadow | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Hover lift on flat surfaces |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Sheets, popovers |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.16)` | Modals |

## Motion

| Token | Curve / duration |
|---|---|
| `--transition-fast` | 150 ms ease-out |
| `--transition-normal` | 200 ms ease-out |
| `--transition-slow` | 300 ms ease-out |

**Never animate layout properties** (width, height, top, left, margin). Use `transform` and `opacity`.
**No bounce, no elastic.** Ease-out only — exponential curves preferred (`cubic-bezier(0.16, 1, 0.3, 1)` for "ease-out-quart" feel).
**Live data**: subtle `transform: translateY` + opacity pulse on number change. Static numbers don't move.

## Layout

- **Page**: 100 vw, no horizontal scroll. Content max-width varies by surface (1200 px for marketing, 1600 px for console with sidebar).
- **Sidebar**: fixed 220 px. Always visible at ≥ 1280 px, collapsible to 64 px icon-only at 768–1280 px, drawer-overlay below 768 px.
- **Topbar**: 56 px tall, sticky. Always shows breadcrumbs (left), search (center), theme + notifications + user (right).
- **Main content**: padding 32 px (desktop), 24 px (tablet), 16 px (mobile). Vertical stack with section gaps of 32–40 px.

**Don't wrap everything in a card.** The page background already gives structure. Cards are for grouped UI that needs visual separation; not "every block of text needs a box".

**Cards are never nested.** A card inside a card is a structural smell. Promote one of them to a section header.

## Components — what we use vs what we have

`packages/ui` exports a deep set of components. For the consoles, prefer in this order:

1. **Native HTML** (button, input, table) styled with tokens
2. **shadcn/ui primitives** wrapped in `@gridpower/ui` (Button, Input, Select, Switch, Checkbox, Radio, Dialog, Sheet, DropdownMenu, Tabs, Tooltip, Toast)
3. **Domain components** (StatCard, StatusBadge, ChartCard, EmptyState)
4. **Custom one-offs** (last resort, must justify)

If you find yourself reaching for a fourth-tier custom component, check that you're not duplicating something already in `packages/ui`.

## Dot-grid motif

The brand uses a 16 × 16 px dot grid as a soft background texture (`--grid-bg`). Apply sparingly:

- **Use on**: empty states, login screen, CTA cards, the brand mark
- **Don't use on**: dense data screens (tables, charts), main dashboard background

In dark mode the dot color shifts to `--dark-6` automatically.

## Theming

`data-theme="dark"` on `<html>` flips all semantic aliases. **Dark is the default for consoles** (operators in low-light environments, long-session use). Light mode is fully supported and must be tested on every surface.

Theme toggle is a top-right control on every authenticated page. The choice persists in `localStorage` under `gp-theme` and is applied via an inline script before hydration to prevent flash.

## Accessibility minimums

- Contrast ratio: body text ≥ 4.5:1, headings ≥ 3:1, large text ≥ 3:1, focus rings ≥ 3:1.
- Focus visible on every interactive element. Default ring: 2 px solid `--grid-red` with 2 px offset.
- All form fields have associated `<label>` (visible or `sr-only` if redundant).
- Tables have `<th scope>` and `<caption>` (visually hidden ok).
- Charts have an accessible alternative (data table or aria-label summary).
- Icons that carry meaning have `aria-label`. Decorative icons have `aria-hidden="true"`.

## Anti-pattern enforcement

The following will be rejected in code review or impeccable critique:

- Side-stripe borders > 1 px
- Gradient text via `background-clip: text`
- Glassmorphism / backdrop-blur as decoration
- Hero-metric template (big number, small label, supporting stats, gradient accent)
- Identical-card grids
- Modal as first instinct
- Em dashes in user-facing copy

## Token discipline

- Never inline a hex value in a component. Use a token.
- Never reach into a raw scale step (`--sand-7`) when a semantic alias exists (`--border-strong`).
- New tokens go in `packages/tokens/src/tokens.css` first. Components consume them.
- If you need a value that doesn't exist as a token, ask: should this be a token? If yes, add it. If no (truly one-off), inline with a comment.

## Update flow

This file is **drafted from existing context** and is the working baseline. To revise:

1. Edit `DESIGN.md`
2. If the change is also a token change, edit `packages/tokens/src/tokens.css`
3. Run `pnpm typecheck && pnpm build` to verify
4. Commit both files in one commit

`packages/tokens` is the source of truth for *values*. `DESIGN.md` is the source of truth for *intent*.
