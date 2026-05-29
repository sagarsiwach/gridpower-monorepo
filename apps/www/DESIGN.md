# Design

> Visual system, design language, stack decisions for GridEnergy / GridCharge marketing sites.
> Companion to PRODUCT.md (who/what/why) and SITEMAP.md (URL architecture).
> Last updated: 2026-05-16

## Register

brand

The marketing sites are the product. Design IS the value, not the service. Polish, identity, storytelling, and conversion paths are the architecture.

## Color

### Strategy

**Restrained baseline with one Committed accent.**

- **Restrained** (95% of surfaces): the Tailwind v4.3 `olive` scale carries the page end-to-end. Hue 106-107, low chroma (max 0.031 at olive-500). Reads as warm-tinted neutral, never green.
- **One Committed accent**: GridRed `oklch(0.58 0.245 27)`. Used on the conversion CTA, brand mark, fault states, brand kickers, and the active text-selection highlight. Caps under 10% of any surface.

If a designer reaches for a third hue, the answer is no.

### Tokens (Tailwind v4.3 olive)

| Role | Token | Value | Tailwind ref |
|---|---|---|---|
| Page substrate | `pageBg` | `oklch(98.8% 0.003 106.5)` | olive-50 |
| Recessed strip | `pageBgDeep` | `oklch(96.6% 0.005 106.5)` | olive-100 |
| Card | `card` | `#ffffff` | — |
| Soft card | `cardSoft` | olive-50 | olive-50 |
| Hairline | `hairline` | `oklch(93% 0.007 106.5)` | olive-200 |
| Hairline strong | `hairlineStrong` | `oklch(88% 0.011 106.6)` | olive-300 |
| Accent soft (success bg) | `accentSoft` | olive-100 | olive-100 |
| Accent fill (mid) | `accentFill` | olive-400 | olive-400 |
| Accent line (success stroke) | `accentLine` | `oklch(39.4% 0.023 107.4)` | olive-700 |
| Body text | `body` | `oklch(28.6% 0.016 107.4)` | olive-800 |
| Muted text | `muted` | `oklch(58% 0.031 107.3)` | olive-500 |
| Ink muted | `inkMuted` | `oklch(46.6% 0.025 107.3)` | olive-600 |
| Ink (primary CTA + body emphasis) | `ink` | `oklch(15.3% 0.006 107.1)` | olive-950 |
| Ink hover | `inkHover` | olive-900 | olive-900 |
| Brand (GridRed) | `brand` | `oklch(0.58 0.245 27)` | — |
| Brand hover | `brandHover` | `oklch(0.50 0.245 27)` | — |
| Brand soft (fault bg) | `brandSoft` | `oklch(0.95 0.040 27)` | — |
| Chip / pill bg | `chip` | olive-100 | olive-100 |

Source of truth: `src/routes/_preview/_v3-tokens.ts`. Edit there, not in components.

### Where chromatic accents land

- Get-early-access CTA (filled GridRed, white text)
- Sign-in pill (white bg, GridRed text and icon)
- Brand mark (logo always renders GridRed)
- Active text-selection highlight (`::selection` rule)
- Notification dots, fault status indicators
- Section kickers ("01 · HOMES", "ECONOMICS · ROI MATH")
- "POPULAR" / kicker labels on the spotlight tile

Never on body copy, never on links unless the link is a CTA, never on chart fills.

## Typography

### Faces

| Role | Family | Source | Weight in use |
|---|---|---|---|
| Display | Clash Grotesk | `public/fonts/ClashGrotesk-{Semibold,Bold}.woff2` | 600, 700 |
| Body / titles | Inter (variable) | `public/fonts/Inter-Variable.woff2` | 400, 500, 600 |
| Monospace | Geist Mono | `public/fonts/GeistMono-{Regular,Medium}.woff2` | 400, 500 |

### Rule

- **Clash Grotesk is display only.** Reserved for marquee headlines — currently the hero h1 on `/solutions/[audience]/` and the CTA banner h2. Apply via `className="v3-display"` (scoped CSS rule resolves to `var(--font-display)`).
- **Inter is the workhorse.** All other titles (h2, h3, card heads), body, UI chrome, microcopy. Variable font with `font-optical-sizing: auto` — renders as Inter Display at larger sizes automatically. Heading weight is 600.
- **Geist Mono is for true monospace context only.** Specs, technical IDs, code samples, dataset IDs. Not for nav, not for headlines, not for "developer-product" decoration.

### Scale

Type ramp uses 1.25 ratio. Reference sizes (Tailwind classes used in code):

| Role | Size | Weight | Tracking | Line-height | Family |
|---|---|---|---|---|---|
| Display h1 (hero) | 72px | 600 | -0.035em | 0.98 | Clash Grotesk |
| Display h2 (CTA banner) | 44px | 600 | -0.025em | 1.05 | Clash Grotesk |
| Section h2 | 36-40px | 600 | -0.025em | 1.05 | Inter |
| Card h3 | 18-26px | 600 | -0.02em | 1.1 | Inter |
| Number tile (rupees) | 36-64px | 700 | -0.02 to -0.035em | 1.0 | Inter |
| Body | 14-17px | 400 | 0 | 1.55-1.65 | Inter |
| Caption / micro | 11-13px | 500 | 0 | 1.5 | Inter |
| All-caps kicker | 10-11px | 600-700 | 0.12-0.18em | 1 | Inter |

### Number-weight contrast

Numbers carry their own weight contrast. Rupee glyph + last digits at lower weight than the main figure. Example: `<span:18px medium>₹</span><span:64px bold>4,210</span><span:26px medium>.80</span>`. Decimal points and decimals always lighter than the integer.

## Surfaces and corner treatment

| Surface | Treatment | Radius | Source |
|---|---|---|---|
| Mega menu panel | Rounded rectangle | 20 | inline |
| Audience tile inside mega panel | Rounded rectangle | 12 | inline |
| Footer pill (mega menu footer strip) | Rounded rectangle | 10 | inline |
| Active tab pill (mega menu nav) | Rounded rectangle | 11 | inline |
| Website hero card / stat strip / audience cards | Rounded rectangle | 22-28 | inline |
| Element studies (`v3-elements` cards) | Figma squircle | 28, smoothing 0.8 | `Squircle.tsx` + `figma-squircle` |
| Element studies modal | Figma squircle | 32, smoothing 0.8 | same |
| Element studies buttons | Figma squircle | 16, smoothing 0.7 | same |
| Mobile menu drawer + cards | Rounded rectangle | 10-16 | inline |
| Phone frame chrome | Rounded rectangle | 46-56 | inline |

**Rule:** Marketing-page chrome is plain `border-radius` rounded rectangles. Element studies and small atomic affordances inside the mega menu are squircled. Never mix on the same surface.

The `Squircle` wrapper lives at `src/components/Squircle.tsx` — uses `figma-squircle` to render an inline SVG path behind absolutely-positioned content. Pass `cornerRadius` and `cornerSmoothing` (0-1, 0.6-0.8 is the working range).

## Icons

**Phosphor** (`@phosphor-icons/react`) — only family used across all v3 routes.

- **`regular` weight** for nav, UI chrome, list rows, buttons. 1.5px stroke matches the olive-200 hairline.
- **`duotone` weight** for solution tile placeholders. Two-tone fill gives illustrative weight without leaving the icon family.
- **`bold` weight** for arrows in CTAs. Small (10-12px) and visible.
- **`fill` weight** on the Lightning glyph in the Get-early-access CTA (white, on red background).

Never mix Phosphor with another icon set. If a glyph is missing, search Phosphor's 7,000+ icon list before adding a custom SVG.

## Logos

Three brand marks at `public/logos/`:

| Variant | File | Use |
|---|---|---|
| GridEnergy | `gridenergy.svg` | gridenergy.co.in nav + footer |
| GridCharge | `gridcharge.svg` | gridcharge.co.in nav + footer; cross-vertical link |
| GridPower | `gridpower.svg` | parent brand (rarely surfaced) |

The `Logo` component at `src/components/Logo.tsx` renders the mark only (no white tile background). Pass `fill` to override brand-red (e.g., white on dark surfaces). Wordmark version `LogoWordmark` pairs mark + GridEnergy/GridCharge/GridPower wordmark in Inter 600.

## Motion

### Library

**motion v12** (`motion` package, ESM `motion/react`). Successor to Framer Motion.

### Easing

- Default: `[0.22, 1, 0.36, 1]` — ease-out cubic-bezier. Smooth, decelerating, no overshoot.
- Spring: `{ type: "spring", stiffness: 400, damping: 32 }` — used on `layoutId` shared-element transitions (mega nav active pill, segmented controls). Snappy without bouncing.
- Durations: 140-200ms for UI feedback, 200-300ms for panel open/close.

### Patterns committed

| Pattern | Used on | Spec |
|---|---|---|
| `AnimatePresence` mode="wait" cross-fade | Mega menu content swap on audience switch | opacity + y(6px), 160ms, ease-out cubic |
| `AnimatePresence` open/close | Mega panel outer shell | opacity + y(-8px), 200ms, ease-out cubic |
| `layoutId` shared element | Active tab pill in mega nav | spring stiffness 400, damping 32 |
| CSS transition | Button hover (bg color, border color) | 150ms, ease |

### Bans

- No animating CSS layout properties (no animating `padding`, `margin`, or `gap`).
- No bounce, no elastic curves. No `easeInOutBack`, no `spring` with high stiffness + low damping that overshoots.
- No motion as decoration. Motion exists to make state transitions legible, not to entertain.
- Respect `prefers-reduced-motion: reduce` — disable cross-fade and layoutId animations, fall back to instant swaps.

## Layout

### Containers

| Width | Use |
|---|---|
| `max-w-[1280px]` | Marketing page max-width. All sections honor this. |
| `max-w-[1200px]` | Element studies and mobile preview pages (slightly tighter). |
| `max-w-[480px]` | Modal sheet. |
| 390px | Mobile phone frame interior. |

Outer page padding `px-8` desktop, `px-5` mobile (in the phone frame). Section padding `py-16` desktop default, can compress to `py-10` for tightly-stacked sections.

### Grid

Hero: 12-col, 7/5 split (content / visual) on desktop. Audience grid: 5 equal columns at desktop. Feature row: 5/7 (text / visual) reversing on alternate rows is fine.

### Spacing rhythm

Vary it. Tight inside groups (gap-1 to gap-3), generous between groups (gap-6 to gap-12). Never apply the same `gap` everywhere — that's monotony.

### Sticky chrome

Main nav is sticky with `position: sticky; top: 0; z-index: 30`. Utility bar (top strip) is above the main nav but not sticky — it scrolls away.

Two-strip header with intentional tonal difference: utility bar `olive-100` (recessed), main nav `olive-50` substrate (active).

## Tech stack — locked

| Layer | Choice | Notes |
|---|---|---|
| Runtime + pkg mgr | **Bun** | Scoped to `apps/www/` only. Rest of monorepo stays pnpm. |
| Bundler | **Vite 8** | React TypeScript template, OXC plugin for fast transforms |
| Framework | **React 19** | with React Router 7.9.4 declarative mode (BrowserRouter) |
| Styling | **Tailwind v4.3** | CSS-first via `@theme`, OKLCH-native, `@tailwindcss/vite` plugin, no JS config |
| Components base | **shadcn/ui base-nova** | All visuals rebuilt to v3 register; the `Squircle` wrapper sits alongside, not inside, shadcn |
| Icons | **@phosphor-icons/react** | regular + duotone + bold + fill weights |
| Squircle paths | **figma-squircle** | Inline SVG path rendered behind content via Squircle.tsx |
| Motion | **motion v12** | ESM `motion/react`, used on mega menu only currently |
| Linter | **oxlint** | jsx-a11y/heading-has-content warn, react-perf rules relaxed for shadcn |
| Type checker | TypeScript via Bun | strict |
| Process orchestration (dev) | **mprocs** | Multi-process TUI |
| Hosting (FE) | Cloudflare Pages | static deploy |
| Backend (later, phase 2) | **Payload CMS v3** | deferred — content lives in `.ts` files for prototype |

## Routes inventory (v3 prototype)

| Route | Purpose | State |
|---|---|---|
| `/preview/v3-elements` | Element studies (buttons, inputs, cards, modal, row actions) | Locked at commit `6f72180`, squircled |
| `/preview/v3-website` | Marketing blocks (nav, hero, stat strip, audience grid, feature row, CTA banner, footer) | Rounded rectangles, real GridEnergy logo |
| `/preview/v3-megamenu` | Audience-led mega panel with motion | Real Homes imagery wired, layoutId tab pill, content cross-fade |
| `/preview/v3-mobile` | Interactive mobile menu in phone frame | Three states: closed → root drawer → drilled audience |

Legacy v1/v2 routes (`/preview/full-nav`, `/preview/v2-menu`, `/preview/:slug`) untouched but slated for removal once v3 is locked.

## Implementation patterns

### Pull from `_v3-tokens.ts`

All v3 routes import `tokens` from `./_v3-tokens.ts`. Never inline a color hex or oklch literal in a component — extend the tokens file first, then reference.

### Inline styles for v3 prototype

The v3 prototype intentionally uses inline `style={{}}` rather than Tailwind classes for tokenized properties. Reason: token swaps are immediate; we're still iterating the language. After lock-in, the design system can promote tokens into CSS custom properties.

### Squircle vs Rect

Use `<Squircle>` only inside element studies (`v3-elements.tsx`). Marketing surfaces use plain `<div style={{ borderRadius }}>` or the local `Rect` shim (drop-in replacement of Squircle's prop signature for diff-friendly swaps).

### Image tiles

Solution tiles split image-area (top, 16:9, olive-100 bg, large duotone Phosphor icon fallback) and text-area (bottom, white bg, name + sub). When real images land in `public/images/solutions/`, swap the icon for `<img className="w-full h-full" style={{ objectFit: "cover" }} loading="lazy">` and the layout holds.

## What is explicitly out of scope (for this design pass)

- Dark mode. The site is light-only. Olive-50 substrate, never a `prefers-color-scheme: dark` variant.
- Theming per audience. All five audience landings inherit the same palette and treatment. Differentiation is content, not chrome.
- Animation choreography. No scroll-triggered narrative animations on the marketing pages. Motion is for UI state transitions only.
- Storybook. The `/preview/v3-*` routes serve as the design playground. Storybook adds infrastructure without commensurate value at this stage.
