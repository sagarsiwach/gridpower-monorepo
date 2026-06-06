# PROGRESS.md — GridEnergy Standalone Website

> Living build-status doc for **gridenergy.co.in**. Single place to see what is built,
> what is drafted, what is missing, and where everything lives.
> Companion to PRODUCT.md / DESIGN.md / SITEMAP.md (see "Source-of-truth" at the bottom).
>
> Last updated: **06 June 2026**
> Branch: `sagar/gridenergy-standalone-site`
> App: `apps/www` (React Router 7, Bun, Cloudflare static/SSG)

---

## 1. TL;DR — where we are

The site is in the **design-lock phase**. Roughly **26 of 48 routes have a first-draft page** (~54% by route count), but **zero are design-locked**, the backend is **0%**, and 4 audience pages are **superseded** (built before the hub/spoke model was locked). Realistic shippable completion is therefore **~35%**.

The leverage point right now is **template locks, not route count**: 19 of the 22 missing routes are clone-and-fill spokes. Two locks gate the whole back half of the site:

1. **Solution spoke template** (worked example: `/solutions/homes/apartment`) → unlocks all 19 audience spokes.
2. **Nano product-page template** (`/products/nano`) → unlocks micro / mega / giga.

Once those two are locked, the remaining 22 routes are assembly, not new design.

---

## 2. Stack & where things live

| Concern | Location |
|---|---|
| App root | `apps/www/` |
| Routes manifest | `apps/www/src/routes.ts` |
| Page routes | `apps/www/src/routes/**` |
| Internal previews / galleries | `apps/www/src/routes/_preview/**` |
| Design tokens (olive neutrals + GridRed) | `apps/www/src/routes/_preview/_v3-tokens.ts` |
| Canonical solution component kit | `apps/www/src/components/solutions/light/**` |
| Site chrome (header / footer / mobile nav) | `apps/www/src/components/site/**` |
| Design playground | route `/system` (`src/routes/_system/**`) |
| Dev server | `bun run dev --port 5180` → http://localhost:5180 |
| Typecheck | `bunx tsc --noEmit` (currently clean) |

**House style (non-negotiable):** visuals are inline `style={{ tokens.* }}`, **never** Tailwind utility classes. Tailwind is layout-only. Font stack is `Inter` (body) + `Geist Mono` (mono); display face is deliberately minimal. Motion via `motion/react`, icons via `@phosphor-icons/react`, easing `EASE` from `components/solutions/light/directions.ts`.

---

## 3. Information architecture (locked — Linear SAG-3344)

Hub-and-spoke, nested URLs:

```
/solutions                      thin index (audience carousel + grid)
  /solutions/<audience>         hub (markets the category, routes to spokes)
    /solutions/<audience>/<sub> spoke (dense, specific product page — the convincer)
```

Five audiences: **homes · offices-industrial · institutes · enterprises · hospitality**.
Every mega-menu tile becomes a dedicated spoke route (20 spokes total).

The `<Gated note="...">` component (`components/solutions/light/Modules.tsx`) wraps any number/spec that is not yet sourced, so unverified claims never ship as fact.

---

## 4. Route status

### Built — has a first-draft page (26)

| Group | Routes |
|---|---|
| Solutions | `/solutions` (index), `/solutions/homes` (hub), `/solutions/homes/apartment` (old spoke draft) |
| Solutions — superseded* | `/solutions/offices-industrial`, `/solutions/enterprises`, `/solutions/hospitality`, `/solutions/institutes` |
| Products | `/products`, `/products/nano` |
| Platform / Configurator | `/platform`, `/configure` |
| Company | `/about`, `/partners`, `/support`, `/contact`, `/sign-in` |
| Footer pages | `/app`, `/economics`, `/resources`, `/careers` |
| Legal (inherited, unreviewed) | `/privacy`, `/terms`, `/cookies`, `/disclaimer`, `/warranty` |
| Home | `/` (header/foundation only) |

\* **Superseded**: built as full standalone pages before the hub/spoke model was locked. They will be rebuilt as hubs + spokes from the locked template. Kept live for reference.

### Missing — no page yet (22)

| Group | Routes |
|---|---|
| Homes spokes (3) | `homes/small-home`, `homes/large-home`, `homes/solar-storage` |
| Offices & Industrial spokes (4) | `offices-industrial/{small-office, mid-office, large-campus, factory}` |
| Institutes spokes (4) | `institutes/{school, college, university, hostels}` |
| Enterprises spokes (4) | `enterprises/{data-center, telecom, hospital, multi-site}` |
| Hospitality spokes (4) | `hospitality/{hotel, resort, restaurant, mall}` |
| Products (3) | `products/{micro, mega, giga}` |

19 spokes + 3 product pages, all template clones.

### Review hub

`/preview/review` consolidates every route (template, superseded drafts, layout/card variants, block reference, secondary first-drafts) into one internal index for the design-lock walk-through. Soft-archive only — nothing deleted.

---

## 5. Component inventory

**Canonical kit — `components/solutions/light/`** (this is what new pages build against):
`HeroCarousel.tsx` (tagged-card hero identity), `Blocks.tsx`, `Modules.tsx`, `SolutionDock.tsx`, `atoms.tsx`, `directions.ts`, `SamplePage.tsx`, `HomesHeroPanel.tsx`.

**Site chrome — `components/site/`:**
`GlobalHeader.tsx` (audience mega menu — **contains fabricated specs and wrong product names that must be replaced when wiring**), `SiteFooter.tsx`, `MobileSiteNav.tsx`, `SiteHeader.tsx`.

**Legacy / superseded component sets** (kept, not the target for new work): `components/solutions/homes/`, `components/solutions/homes-v2/`, `components/solutions/hero/`, `components/solutions/kit/`, and the loose `components/solutions/*.tsx` (AudienceHero, SolutionTemplate, ROICalculator, etc.). Treat these as reference, not canon.

---

## 6. Hard constraints (must hold on the public site)

- **No fabricated specs / numbers / warranties / payback / prices / contact details.** Gate via `<Gated>` until sourced. The `/configure` flow outputs a product **class** (Nano/Micro/Mega/Giga) + a free-site-survey booking, never a fabricated price or payback.
- **GridPower is absent** from public copy and nav. Footer legal entity is **DeltaEV Mobility Private Limited**, Verna, Goa.
- **Product names are Nano / Micro / Mega / Giga only.** Never "Container". Old SKU names (`atlas-01`, `flexcube-500sl`, `rosa-g1`, etc. in stale docs) are dead.
- **GridOS** is presented as active/live.
- **No em dashes** (and no `--`) in copy.
- **Visuals = inline token styles**, not Tailwind utilities. Palette is olive + GridRed only.

---

## 7. Backend status — 0%

No persistence wired. `/contact`, `/sign-in`, and `/configure` validate client-side and show honest pending states; **no leads are stored**. Lead-dashboard integration is tracked at Linear **SAG-3350**.

---

## 8. Stale docs warning

The root `README.md` and parts of `apps/www/SITEMAP.md` predate this build and are **out of date**:

- They describe a **Turborepo + pnpm** monorepo with `apps/web`; the real app is **`apps/www`** on **Bun**.
- They reference **Clash Grotesk** (dropped) and dead SKU names (`atlas-01`, `flexcube-500sl`).
- The locked IA is the hub/spoke model in **Linear SAG-3344**, not the older tree in SITEMAP.md.

Trust this file + the Linear master (SAG-3336) for current state. SITEMAP.md is being kept only for its still-valid domain map and cross-site behavior notes.

---

## 9. Next steps (in order)

1. **Lock the spoke template** on `/solutions/homes/apartment` (Linear SAG-3390 / SAG-3389).
2. **Lock the nano product template** on `/products/nano`.
3. Fan out sub-agents to clone-and-fill the 19 spokes + 3 product pages.
4. Rebuild the 4 superseded audience pages as hubs from the locked template.
5. Wire `GlobalHeader.tsx` mega menu to real routes; strip fabricated specs / fix product names.
6. Backend: contact + sign-in + configure submission (SAG-3350).
7. Homepage proper (SAG-3346). Deploy (SAG-3352).

---

## 10. Source-of-truth chain

1. **PRODUCT.md** — register, audience, voice, strategic principles.
2. **DESIGN.md** — token system, type scale, motion language.
3. **SITEMAP.md** — URL architecture (note: partially stale, see §8).
4. **PROGRESS.md** (this file) — live build status.
5. **Linear** — master **SAG-3336**; IA lock **SAG-3344**; build anchors **SAG-3389** (Solutions hub+spoke) / **SAG-3390** (Homes vertical). Linear is the cross-session brain; this file mirrors it.
