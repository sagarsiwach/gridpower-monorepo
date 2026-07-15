# SITEMAP.md — GridPower Marketing Sites

> Locked URL architecture for gridenergy.co.in and gridcharge.co.in.
> Companion to PRODUCT.md and DESIGN.md.
> Last updated: 2026-05-16

---

## Domain map

| Domain | Behavior |
|---|---|
| **gridenergy.co.in** | Standalone marketing site (energy vertical) |
| **gridcharge.co.in** | Standalone marketing site (charging vertical) |
| **gridpower.co.in** | 301 redirect → gridenergy.co.in via Cloudflare Page Rule (edge-level, no app) |
| **console.gridenergy.co.in** | Operator console for energy assets |
| **console.gridcharge.co.in** | Operator console for charging assets |
| **console.gridpower.co.in** | Unified / admin console (out of marketing-site scope) |
| **status.gridpower.co.in** | Status page (linked in marketing footer) |
| **hi.gridenergy.co.in / hi.gridcharge.co.in** | Hindi locale (future — deferred, English only for v1) |

---

## URL tree (per marketing site — both share this shape)

```
/                                Homepage
                                  (5 audience cards as hero entry)
                                  (problem · solutions · platform · economics · why-us · final CTA · footer)

/solutions/                      Solutions hub
                                  (5 audience cards link to landings)

  /homes/                        Audience landing
    /homes/[slug]                Solution detail

  /offices/
    /offices/[slug]

  /industrial/
    /industrial/[slug]

  /hospitality/
    /hospitality/[slug]

  /enterprises/
    /enterprises/[slug]

/platform                        Single page — Console + App showcase + APIs + Open standards
                                  (No separate /app route; the customer/driver app
                                   product showcase lives as a section inside /platform)

/* /economics is NOT a standalone route — economics math folds inline
   into each solution page (ROI teaser + cost stack + payback timeline) */

/resources/                      Resources hub (4 category cards)
  /resources/case-studies/
    /resources/case-studies/[slug]
  /resources/calculators/
    /resources/calculators/[slug]
  /resources/datasheets/
    /resources/datasheets/[slug]
  /resources/whitepapers/
    /resources/whitepapers/[slug]

/products/                       Products hub (category cards)
  /products/[category]/          Category list
    /products/[category]/[sku]   Product detail

/about                           Company + team + manufacturing + open philosophy
/careers                         Job listings + culture

/blog/                           Blog index
  /blog/[slug]                   Post template
                                  (Day-1 launch with 3 posts. Categories TBD —
                                   likely Energy / Charging / Platform / Deployments)

/partners                        Dealer locator + signup form + partner showcase
/support                         Warranty + manuals + contact engineering

/signup                          Single GridOS early access form
                                  (Driver waitlist lives on /app, newsletter
                                   is inline only, dealer signup on /partners)
/contact                         Lead form + offices

/privacy
/terms
/cookies
/compliance

/404                             Brand-rich custom page
/500                             Brand-rich custom page
```

---

## Solution leaves per site

### GridEnergy.co.in (revised 2026-05-16 per Figma)

| Group | Route | Slugs |
|---|---|---|
| /homes/ | /solutions/homes/ | apartment · small-home · large-home · solar-storage-combo |
| /offices/ (merged with industrial) | /solutions/offices/ | small-office · mid-office · large-campus · factory-backup |
| /institute/ (new — education vertical) | /solutions/institute/ | school · college · universite |
| /enterprises/ | /solutions/enterprises/ | data-centers · telecom-towers · hospitals · multi-site |
| /hospitality/ | /solutions/hospitality/ | hotels · resorts · restaurants · malls |

### GridCharge.co.in (17 leaves)

| Group | Slugs |
|---|---|
| /homes/ | home-wallbox · apartment-rwa · premium-home |
| /hospitality/ | hotels · malls · resorts · restaurants |
| /offices/ | workplace · office-park · employee-programs |
| /enterprises/ | fleet-saas · cpo · highway-networks · corporate-multisite |
| /industrial/ | fleet-depots · trucking · 3w-fleets |

---

## Product categories per site

### GridEnergy.co.in

| Category | SKUs |
|---|---|
| /products/batteries/ | como-l1 · livo |
| /products/inverters/ | rosa-g1 · rosa-t2 |
| /products/ess/ | atlas-01 · atlas-03 · atlas-04 |
| /products/container/ | flexcube-500sl |

### GridCharge.co.in

| Category | SKUs |
|---|---|
| /products/ac/ | ac-3-3 · ac-7-4 · ac-11 · ac-22 |
| /products/dc/ | dc-20 · dc-30 · dc-60-dual · dc-120 · dc-240-ultra |
| /products/dlb/ | dlb-box |
| /products/accessories/ | mounting-kits · cable-management · solar-input-modules |

---

## Navigation reference

### Two-bar nav (both sites) — locked 2026-05-16

**TopUtilityBar** (small, hidden on mobile)
- About · Partners · **Platform** · **Resources** · Support · **Contact** · **Sign in**

The Sign in link is an external redirect:
- On gridenergy.co.in → `https://console.gridenergy.co.in/sign-in`
- On gridcharge.co.in → `https://console.gridcharge.co.in/sign-in`

**MainNav** (sticky) — 5 audience groups, each opens its own mega-menu
- gridenergy.co.in: Homes · Offices & Industrial · Institute · Enterprises · Hospitality
- gridcharge.co.in: Homes · Hospitality · Offices · Enterprises · Industrial
- Right side: "Talk to sales" (ghost) + "Get early access" (red pill CTA)

There is no longer a "Solutions ▾" parent item. Each audience IS the nav item.

### Footer

| Column | Links |
|---|---|
| Solutions | 5 audience-group links |
| Platform | GridOS · App · Economics · Products · Resources |
| Company | About · Partners · Support · Contact · Careers · Blog |
| Legal | Privacy · Terms · Cookies · Compliance · Status |
| Bottom strip | "Also from GridPower: ↗ GridCharge" (or GridEnergy from the other site) · DeltaEV legal entity line |

---

## Route counts

| Site | Fixed routes | Templated leaves | Total |
|---|---|---|---|
| gridenergy.co.in | ~25 | 18 solutions + 8 products + N resources + 3 blog posts | ~60 at launch |
| gridcharge.co.in | ~25 | 17 solutions + 12 products + N resources + 3 blog posts | ~60 at launch |
| Combined | ~50 fixed | ~70 templated | **~120 at launch** |

---

## Cross-site behavior

| Surface | Behavior |
|---|---|
| Footer "Also from GridPower ↗" | Cross-link from energy to charge and vice versa |
| About page | Brief mention of sister vertical with link |
| `/platform` page | Mentions both verticals share GridOS |
| All other pages | Stay focused on the active vertical |

---

## Technical SEO + supporting infrastructure

| Item | Spec |
|---|---|
| `robots.txt` | Allow all, points at `/sitemap.xml` |
| `sitemap.xml` | Auto-generated at build time per site, lists every public route |
| Favicon | Square brand mark — PNG + SVG variants per site |
| OG defaults | Per-page OG image; fallback = brand hero per site |
| Cookie banner | India DPDPA + EU GDPR compliant. Library: react-cookie-consent or Cookiebot |
| Hreflang | NOT applied for v1 (English only). When Hindi locale ships, apply `hreflang="hi"` for hi.* subdomain pages |
| Canonical URLs | Per-page canonical, no cross-site canonicalization (each site is its own SEO entity) |
| Schema.org markup | Organization on /about; Product on product detail pages; Article on blog posts; FAQPage where applicable |

---

## Deferred / out of scope

These are intentionally not in v1 launch:

- Hindi locale (hi.* subdomains) — deferred
- GridDrive vertical — deferred 3 months
- /investors — add when fundraising activates
- /press — add when press releases exist
- Storybook for components — replaced by `/system` design playground inside the prototype
- Pre-rendered static export — Vite SPA for v1, port to Next.js SSG when content matures (Phase 2)

---

## Source-of-truth chain

1. **PRODUCT.md** — register, audience, voice, anti-references, strategic principles
2. **DESIGN.md** — full token system, type scale, motion language, file structure
3. **SITEMAP.md** (this file) — locked URL architecture, route inventory, cross-site behavior

Read all three before designing or building. Do not redecide what these documents lock without explicit revisit.
