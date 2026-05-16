# DESIGN.md — GridPower Marketing Sites

> Token system, design language, and stack decisions.
> Companion to PRODUCT.md. Read both before designing or building.
> Last updated: 2026-05-16

---

## Tech stack — locked

| Layer | Choice | Notes |
|---|---|---|
| Runtime & pkg mgr | **Bun** | Scoped to `apps/www/` only. Rest of monorepo stays pnpm. |
| Bundler | **Vite 8.0.10** | React TypeScript template |
| Framework | **React 19** + **React Router 7.9.4** declarative mode | SPA prototype, no SSR yet |
| Styling | **Tailwind v4.3** | CSS-first via `@theme`, no JS config, OKLCH-native, `@tailwindcss/vite` plugin |
| Components | **shadcn/ui** | Base primitives only, all visuals rebuilt to GridPower brand |
| Motion | **motion.dev** (`motion` package) | Successor to Framer Motion |
| Linter | **oxlint** | Pre-1.0 but production-usable |
| Formatter | **oxfmt** | Earliest stage, fallback to Prettier for edge cases |
| Type checker | TypeScript via Bun |  |
| Process orchestration (dev) | **mprocs** | Multi-process TUI |
| Secrets | **SOPS** + age key |  |
| Hosting (FE) | Cloudflare Pages | Static deploy |
| Backend (later, Phase 2) | **Payload CMS v3** | Defer — content lives in `.ts` files for prototype |

---

## Register

**BRAND.** All shared design laws from `~/.claude/skills/impeccable/SKILL.md` apply. Brand register specifics: design IS the product, storytelling is primary, conversion paths are the architecture, photography quality matters.

---

## Color system

### Strategy: Restrained baseline + Committed heroes

- **Restrained** (90% of surfaces): Neutral Sand-warm scale carries the page. GridRed used as <10% accent.
- **Committed** (max 1-2 sections per page): Full GridRed background on BM teaser, Final CTA, select audience hero moments.

Never Drenched (the surface IS the color) except hero landing variants we trial during iteration. Never Full Palette — GridPower has one brand color.

### Brand color — GridRed

```css
--gp-red: oklch(0.58 0.245 27);
```

True red, slightly cooler than the source HEX `#FA0016`. Reads industrial-confident, not consumer-cheerful. Reference family: Ferrari shield, Tesla taillight, Vercel triangle. Not: Pinterest, Netflix, Hindustan Times.

### Saturation policy

- Full brand chroma (0.245) only at lightness 0.58
- Tinted backgrounds (e.g., subtle red-50 surface): chroma drops to ~0.04
- Hover states: same chroma, lightness shifts by ±0.05
- Red as form-error: chroma drops to 0.15 to distinguish from brand emphasis
- Never full-chroma red on white text. Vibration is unprofessional.

### Neutral scale — Whisper warm

Hue locked to GridRed (27°). Chroma curves through mid-grays to avoid garish extremes. 11 steps, Tailwind v4-aligned.

```css
--neutral-50:  oklch(0.991 0.003 27);   /* Snow — page background */
--neutral-100: oklch(0.972 0.004 27);   /* Subtle surface */
--neutral-200: oklch(0.946 0.005 27);   /* Card alternate, section alternate */
--neutral-300: oklch(0.910 0.006 27);   /* Light border, divider */
--neutral-400: oklch(0.846 0.007 27);   /* Strong border */
--neutral-500: oklch(0.732 0.008 27);   /* Muted text, placeholder */
--neutral-600: oklch(0.595 0.008 27);   /* Body secondary */
--neutral-700: oklch(0.467 0.007 27);   /* Body primary */
--neutral-800: oklch(0.341 0.006 27);   /* Heading */
--neutral-900: oklch(0.224 0.005 27);   /* Display heading */
--neutral-950: oklch(0.151 0.004 27);   /* Deepest — used sparingly */
```

**Anti-reference:** Must not feel like Notion's beige warmth (too spoken). If anyone notices the tint, we went too far. Whisper warm = warmth felt, never seen.

### Semantic colors (minimal)

We resist semantic color proliferation. Total system: 15 tokens.

```css
--form-error:   oklch(0.52 0.15 25);   /* Darker, de-saturated red */
--form-success: oklch(0.65 0.13 145);  /* Muted forest — only for "submitted" */
/* No warning, no info. Use prose + bold text + neutral-900 callouts. */
```

### Surface assignments

| Surface | Token |
|---|---|
| Page background (default) | `--neutral-50` |
| Section alternate (rhythm) | `--neutral-100` |
| Card surface on neutral-50 page | `--neutral-100` |
| Card surface on neutral-100 section | `--neutral-50` |
| Border default | `--neutral-300` |
| Border strong | `--neutral-400` |
| Body text | `--neutral-700` |
| Heading text | `--neutral-900` |
| Muted text | `--neutral-500` |
| Committed-hero section bg | `--gp-red` |
| Inverted section bg (Platform showcase only) | `--neutral-900` |

### Rules

- Never `#fff` — always `--neutral-50`
- Never `#000` — always `--neutral-950`
- Never `--neutral-200` as card on `--neutral-100` (insufficient contrast)
- Always provide a half-step contrast between adjacent surfaces
- Max 1 full-GridRed section per page

---

## Typography

### Font families — locked

| Role | Family | Weight | Notes |
|---|---|---|---|
| Display / H1–H3 | **Clash Grotesk** | Semibold (600), Bold (700) | Fonts hosted via Fontshare. Fallback: Syne. |
| Body / H4 / UI | **Inter** | 400, 500, 600 | Variable font, optical sizing on |
| Mono / Labels / Specs | **Geist Mono** | 400, 500 | Vercel-style, dense and confident |

### Type scale — 1.333 ratio (Perfect Fourth)

```css
--text-xs:   0.75rem;   /* 12px — captions, footnotes */
--text-sm:   0.875rem;  /* 14px — secondary body, UI text */
--text-base: 1rem;      /* 16px — body */
--text-lg:   1.125rem;  /* 18px — emphasized body */
--text-xl:   1.333rem;  /* 21.3px — H4 */
--text-2xl:  1.777rem;  /* 28.4px — H3 */
--text-3xl:  2.369rem;  /* 37.9px — H2 */
--text-4xl:  3.157rem;  /* 50.5px — H1 small */
--text-5xl:  4.209rem;  /* 67.3px — H1 medium */
--text-6xl:  5.610rem;  /* 89.8px — Hero display */
--text-7xl:  7.478rem;  /* 119.6px — Mega hero, single per site */
```

### Line height

| Use | Value |
|---|---|
| Display headings | `1.05` (tight, confident) |
| Section headings (H2-H3) | `1.15` |
| Body text | `1.625` (readable, never tight) |
| UI labels, buttons | `1.2` |
| Mono spec tables | `1.4` |

### Letter spacing

| Use | Value |
|---|---|
| Display (H1-H2) | `-0.03em` (tighter, confident) |
| H3-H4 | `-0.02em` |
| Body | `0` |
| Mono labels (uppercase) | `0.08em` (Vercel-style spaced) |
| Buttons | `-0.01em` |

### Body line length

Cap at **65-75ch** for prose. Hard rule for `<p>` elements in solution page narrative sections. Enforced via max-width on text containers.

### Optical sizing

Inter and Geist Mono are variable fonts — enable `font-optical-sizing: auto` for all body text.

---

## Spacing

### Base unit: 4px

Tailwind v4 uses `--spacing` with `calc(var(--spacing) * N)` for arbitrary steps. We override with a deliberate scale that varies for rhythm.

```css
--space-0:    0;
--space-1:    0.25rem;  /* 4px */
--space-2:    0.5rem;   /* 8px */
--space-3:    0.75rem;  /* 12px */
--space-4:    1rem;     /* 16px */
--space-5:    1.25rem;  /* 20px */
--space-6:    1.5rem;   /* 24px */
--space-8:    2rem;     /* 32px */
--space-10:   2.5rem;   /* 40px */
--space-12:   3rem;     /* 48px */
--space-16:   4rem;     /* 64px */
--space-20:   5rem;     /* 80px */
--space-24:   6rem;     /* 96px */
--space-32:   8rem;     /* 128px */
--space-40:   10rem;    /* 160px */
--space-48:   12rem;    /* 192px */
--space-64:   16rem;    /* 256px */
```

### Section padding

**Vary for rhythm — never uniform.** Impeccable bans monotony.

| Section type | Vertical padding |
|---|---|
| Hero | `--space-32` to `--space-48` (massive) |
| Standard section | `--space-20` to `--space-24` |
| Compact section | `--space-12` to `--space-16` |
| Inline transitional | `--space-8` |

Within a page, alternate between `--space-20` and `--space-32` sections to create visible rhythm. Don't stack three same-padding sections in a row.

---

## Radii

```css
--radius-none:  0;
--radius-xs:    2px;     /* Inputs, chips */
--radius-sm:    4px;     /* Default buttons */
--radius-md:    6px;     /* Cards (subtle) */
--radius-lg:    8px;     /* Featured cards, modals */
--radius-xl:    12px;    /* Hero cards */
--radius-2xl:   16px;    /* Image masks */
--radius-full:  9999px;  /* Pills */
```

**Style direction:** Subtle, not pillowy. Sharper end of the spectrum. Never use `--radius-2xl` for buttons or inputs — it looks consumer-y.

Default values:
- Buttons: `--radius-sm`
- Inputs: `--radius-xs`
- Cards: `--radius-md`
- Pills / tags: `--radius-full`
- Hero imagery: `--radius-lg` or `--radius-xl`

---

## Motion language

Two languages for two surfaces. **This site uses Expressive-Professional**, not Linear-Precise. Consoles use Linear-Precise.

### Expressive-Professional (marketing)

| Property | Value |
|---|---|
| Default ease | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) |
| Hover transitions | 200ms, ease-out |
| Page transitions | 400ms, ease-out-expo |
| Scroll-reveal entrance | 600ms, ease-out-expo, 100ms stagger |
| Hero text stagger | Word-by-word fade-up, 40ms stagger, 800ms total |
| Image reveal | clip-path mask reveal, 800ms, ease-out-quart |

### Bans

- **No bounce.** No spring-back. No elastic.
- **No scroll-jacking.** Visitor controls scroll speed always.
- **No parallax** that misaligns content from container.
- **Don't animate** `width`, `height`, `top`, `left`, `padding`, `margin`. Only `transform` and `opacity`.
- **No animated counters** on stats — use static prose or spec tables.
- **No floating decorative shapes**, no morphing blobs, no orbiting orbs.

### Where motion lives

- Hero text on first paint (word stagger fade-up)
- Section reveals on scroll-into-view (60-100px below viewport, fade-up)
- Card hovers (4-6px translateY, slight shadow growth, 200ms)
- CTA hover (1.02 scale on primary CTA only, 200ms)
- Nav mega-menu open/close (180ms opacity + 8px translateY)
- Image reveals on scroll (clip-path masks)

### Where motion does NOT live

- Body text (never)
- Footer (never)
- Forms (never animate input states beyond focus ring)
- Spec tables (never)
- Logos (never)

---

## Layout

### Container widths

```css
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1440px;  /* Default page max-width */
--container-3xl: 1600px;  /* Wide rare cases */
```

### Breakpoints (Tailwind v4 defaults, kept)

```css
--breakpoint-sm:   40rem;  /* 640px */
--breakpoint-md:   48rem;  /* 768px */
--breakpoint-lg:   64rem;  /* 1024px */
--breakpoint-xl:   80rem;  /* 1280px */
--breakpoint-2xl:  96rem;  /* 1536px */
```

### Grid

12-column at desktop. 4-column at mobile (375px → 768px). Gutter:
- Mobile: 16px
- Tablet: 24px
- Desktop: 32px

### Don't-wrap-everything rule

Not every section needs a container. Section backgrounds bleed edge-to-edge; content inside containers. Hero sections may go full-bleed with text inside an inner container.

---

## Theme

**Light primary only.** Dark interludes deferred to a later phase.

Implication: don't build `dark:` variants for v1. Build `data-theme="day"` and `data-theme="night"` infrastructure into the token CSS so day/night image swapping works (see Imagery below), but visual styling stays light.

---

## Imagery

### Day/night image pairs — the craft signal

Same hero shot, two times of day. Charging station at golden hour vs. night with EV charging glow. Same scene, swapped on theme toggle.

Implementation:

```html
<picture>
  <source srcset="/img/charger-night.webp" media="(prefers-color-scheme: dark)" />
  <img src="/img/charger-day.webp" alt="..." />
</picture>
```

Or via React with a theme context that swaps `src`. For v1 (light-primary only), serve day version everywhere. The pair infrastructure exists for when dark mode lands.

### Hero imagery strategy

| Audience | Imagery type |
|---|---|
| Homes | AI lifestyle (Indian context: home, garage, family) |
| Offices | AI lifestyle (office park, workplace) |
| Industrial | Product renders + factory contexts |
| Hospitality | AI lifestyle (hotels, malls, golden hour) |
| Enterprises | Product renders + technical diagrams |

### Image rules

- Never stock photos of generic businesspeople in suits
- Never decorative gradient meshes or blob backgrounds
- Never floating 3D product renders against gradient bg
- Always Indian context where lifestyle is shown (cars, signage, architecture)
- Aspect ratios: 16:9 hero, 4:3 supporting, 1:1 only for portrait grids

### Photography source plan

- Phase 1 (prototype): Placeholder unsplash + AI-generated lifestyle (clearly labeled as placeholder)
- Phase 2 (post-design lock): Commission paired day/night AI renders, 12+ scenes per site
- Phase 3 (real customers): Replace with real installation photography from pilot sites

---

## Component principles

### Buttons

- Primary (filled GridRed): max 1 per visible section
- Secondary (outlined neutral-700): standard CTAs
- Tertiary (text + arrow): inline learn-more
- No drop shadows on buttons. Subtle background-color hover only.

### Cards

**Bento with size variance.** Never grids of identical cards.

- Featured card: 2x size, photo or stat highlight
- Supporting cards: 1x size
- 1 large + 4 small is a strong default pattern
- Cards on neutral-50 page use neutral-100 background; on neutral-100 section use neutral-50
- Hairline border (`--neutral-300`), `--radius-md`
- No nested cards. Ever.

### Forms

- Inputs: `--radius-xs`, 1px border `--neutral-300`, focus ring `--gp-red` at 50% opacity
- Labels above inputs, never inside (no float labels)
- Error state: `--form-error` text + border
- Submit button: primary GridRed, never gray-out, disabled state uses 0.4 opacity

### Section archetypes

Locked types we compose from:

1. **Hero** — full-bleed, large type, optional image, dual CTA, optional stat strip
2. **Problem narrative** — single column, large prose, supporting stat
3. **Three-column** — feature triad, equal weight
4. **Bento** — varied card sizes, featured + supporting
5. **Spec table** — Geist Mono, hairline rows, comparison-friendly
6. **Showcase strip** — device frames (iPhone, MacBook) with screenshots
7. **Quote / testimonial** — single large pull quote, attribution below
8. **Stat strip** — 3-4 stats in Geist Mono, no decoration
9. **Committed CTA** — full GridRed background, max 1 per page
10. **Footer** — multi-column, newsletter signup, social, legal

Each solution page composes from this catalog. The catalog is the modular system.

---

## Absolute bans (from impeccable + GridPower-specific)

- ❌ Side-stripe borders (>1px colored left/right on cards or alerts)
- ❌ Gradient text (`background-clip: text` with gradient)
- ❌ Glassmorphism as decoration (blur + transparency cards)
- ❌ Hero-metric template (big number + tiny label + supporting stats with gradient accent)
- ❌ Identical card grids
- ❌ Modal as first thought (exhaust inline alternatives first)
- ❌ Drop shadows on cards (use borders instead)
- ❌ Hero carousels
- ❌ Smiling-people-in-suits stock photos
- ❌ Gradient mesh backgrounds, blob shapes
- ❌ Rotating client logo strips
- ❌ Dark-mode marketing heroes outside controlled sections (none for v1 — light only)
- ❌ Sub-brand color accents
- ❌ Em dashes
- ❌ Emojis
- ❌ "AI-first" / "AI-powered" copy
- ❌ Exclamation marks

---

## File structure (target)

```
apps/www/
├── PRODUCT.md                  (this product doc)
├── DESIGN.md                   (this design doc)
├── package.json                (bun-managed)
├── bun.lock
├── vite.config.ts              (with @tailwindcss/vite plugin)
├── tsconfig.json
├── index.html
├── public/
│   ├── fonts/                  (Clash Grotesk + Inter + Geist Mono local hosting)
│   ├── logos/                  (gridpower, gridenergy, gridcharge — full + square + PDF + PNG)
│   └── img/
│       ├── hero/               (day/night pairs per site)
│       └── product/            (renders)
├── src/
│   ├── main.tsx
│   ├── App.tsx                 (router setup)
│   ├── styles/
│   │   ├── globals.css         (@import "tailwindcss" + @theme block with all tokens)
│   │   └── reset.css
│   ├── routes/
│   │   ├── _energy/            (gridenergy.co.in routes — /energy/*)
│   │   │   ├── index.tsx       (homepage)
│   │   │   ├── solutions/
│   │   │   │   ├── homes/
│   │   │   │   ├── offices/
│   │   │   │   ├── industrial/
│   │   │   │   ├── hospitality/
│   │   │   │   └── enterprises/
│   │   │   ├── platform.tsx
│   │   │   ├── app.tsx
│   │   │   ├── economics.tsx
│   │   │   ├── resources.tsx
│   │   │   ├── products.tsx
│   │   │   ├── partners.tsx
│   │   │   ├── support.tsx
│   │   │   ├── about.tsx
│   │   │   ├── contact.tsx
│   │   │   └── signup.tsx
│   │   └── _charge/            (gridcharge.co.in routes — /charge/*)
│   │       └── (same structure)
│   ├── components/
│   │   ├── ui/                 (shadcn/ui primitives, customized)
│   │   ├── sections/           (Hero, Bento, SpecTable, StatStrip, CommittedCTA, etc.)
│   │   ├── nav/                (TopUtilityBar, MainNav with mega-menu)
│   │   └── footer/
│   ├── content/                (TypeScript files with content data per page)
│   │   ├── energy/
│   │   └── charge/
│   └── lib/                    (utilities, theme provider, motion primitives)
└── README.md
```

---

## Open decisions deferred to live iteration

These get locked while looking at the real prototype.

- Hero approach (3 variants to scaffold and compare)
- Solution page section composition per audience type
- Exact spacing rhythm pattern per page (which sections use which padding step)
- Hero motion choreography (word stagger timing, image reveal timing)
- Photography sourcing scope and budget

Everything else in this document is locked. Do not redecide without explicit revisit.
