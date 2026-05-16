# PRODUCT.md — GridPower Marketing Sites

> Source of truth for what we are building, for whom, and why.
> Last updated: 2026-05-16

---

## Register

**BRAND.** The marketing sites are the product. Design is the value, not the service. Polish, identity, storytelling, and conversion paths are the architecture.

For app/console UI rules, see the separate apps/console-charge and apps/console-energy `DESIGN.md` files. Those are PRODUCT register.

---

## What we are building

**Two standalone marketing sites for GridPower's two active verticals:**

| Site | Domain | Purpose |
|---|---|---|
| GridEnergy | `gridenergy.co.in` | Battery storage — residential to utility-scale |
| GridCharge | `gridcharge.co.in` | EV charging — home wallbox to highway ultra-fast |

**gridpower.co.in** — exists as a redirect-only router. Visitor lands → routes them to the right vertical. No content of its own.

**GridDrive** — third vertical, deferred 3 months. Not in this scope.

Legal entity: **DeltaEV Mobility Private Limited**, Verna, Goa.

---

## The strategic thesis

> Storage is the gap solar opened. Charging is the gap EVs opened. Software is the moat that makes both into businesses.

GridPower is built around one belief: **in a market where every vendor sells a black box, the vendor that sells transparency wins the long game.** The hardware is the foot in the door. The platform — GridOS — is the moat.

Both marketing sites exist to make this thesis legible in 30 seconds and convertible in 5 minutes.

---

## Who uses these sites

Five audience archetypes, identical names on both sites, different solutions inside each.

| Audience | GridEnergy buyer | GridCharge buyer |
|---|---|---|
| **Homes** | Homeowner wanting solar + battery, apartment dweller wanting shared backup | Homeowner with EV wanting wallbox, RWA wanting shared charging |
| **Offices** | SMB/mid-market wanting peak-shave + backup | Workplace charging for employees, office park multi-charger |
| **Industrial** | Factory owner wanting demand-charge management, container ESS for power parks | Fleet depot, trucking corridor, 3W fleet operator |
| **Hospitality** | Hotel/restaurant wanting backup + savings | **Flagship** — hotels, malls, resorts as destination charging revenue |
| **Enterprises** | Data center, telecom tower, hospital, multi-site portfolio owner | Fleet SaaS, CPO, highway network, corporate multi-site |

Nav order differs per site by revenue priority:
- GridEnergy: Homes · Offices · Industrial · Enterprises · Hospitality
- GridCharge: Homes · Hospitality · Offices · Enterprises · Industrial

---

## Conversion intents

Each visitor lands on a different page first and converts through a different CTA:

| Visitor | Lands on | Primary CTA |
|---|---|---|
| Homeowner | `/solutions/homes/*` | "Request a Quote" |
| Commercial buyer (office, hotel, mall, restaurant) | `/solutions/hospitality/*` or `/solutions/offices/*` | "Talk to Sales" |
| CFO / decision-maker | `/economics` | "See the complete financial model" |
| OEM / fleet / partner | `/solutions/enterprises/*` or `/platform` | "Get Early Access" / "Talk to Sales" |
| Driver looking for charging | gridcharge.co.in `/app` | Download iOS / Android |
| Existing customer | `/sign-in` | Direct to console |

No CTA points to a phantom route. Every promise leads somewhere real.

---

## Voice & tone

**Confident · Technical · India-grounded · Anti-AI-hype.**

We are positioning as **the Linear of energy infrastructure** — software-first, intelligence cooked in, demonstrated through behavior rather than slogans. Never say "AI-first" or "AI-powered." If we have to label it, we have already lost.

### Voice rules

- Plain English, India-comfortable. Never overly British or overly American.
- Technical precision in numbers: never "lots of kWh," always "215 kWh."
- Specifications belong in Geist Mono. Reading copy belongs in Inter.
- Every claim earns its place. No restated headings, no intros that repeat the title.
- **Hindi available as a separate locale later.** Body text is in English for v1.
- **No em dashes.** Use commas, colons, semicolons, periods, or parentheses.
- **No emojis** anywhere on the site. Including footer social icons — use SVGs.
- No exclamation marks. Confidence does not need them.

### Example contrasts

✗ "Revolutionize your energy future with AI-powered intelligence!"
✓ "Storage that pays itself back in 18 months. Visible from your phone."

✗ "Our cutting-edge technology empowers operators."
✓ "Operators run thirty sites from one console. Without leaving their seat."

---

## Anti-references — what we must NOT look like

The category-reflex traps. If we land in any of these, we are AI slop.

| Reference | What it looks like | Why we reject it |
|---|---|---|
| Clean energy SaaS | Leaves, blue/green gradients, smiling families in suits | The "green energy" cliché. Visually indistinguishable from competitors. |
| EV brochure sites (Statiq, Tata Power EZ, ChargeZone, Bolt.Earth) | Product-shot grids, dated photography, gradient backgrounds, testimonial carousels | Indian incumbents we want to leapfrog visually, not match. |
| Tesla minimalism | All-white, ultra-sparse, hero photo + single sentence | Beautiful but starves the B2B detail content. Wrong for a CFO. |
| Salesforce / Oracle / SAP density | Cluttered, stacked icon cards, testimonial logos in scrolling strips | Looks dated, screams enterprise sales. |
| Generic Indian B2B | Gradient backgrounds, stock-photo lifestyle, "we are different" boilerplate | The default GridPower must not be the default. |
| Crypto / Web3 sites | Neon on black, glow effects, glassmorphism | Trying too hard. Different industry entirely. |

## Reference quality bar — where we DO want to look

| Reference | What we take |
|---|---|
| **Linear.app** | Interaction precision, type hierarchy, motion vocabulary, restraint |
| **Stripe.com** | Restrained color + committed moments, technical typography, scrolling reveals |
| **Vercel.com** | Neutral discipline, monospaced labels, structural minimalism |
| **Apple product pages** | Hero treatment, scroll storytelling, photography quality bar (for App page) |
| **Cloudflare.com** (newer pages) | Solid color blocks as identity, dense-but-organized layouts |

---

## Strategic principles

These guide every page-level decision. When in doubt, return here.

### 1. Solutions, not products

Buyers think in their problem ("I run a hotel"), not our taxonomy ("AC 22 kW charger"). The primary nav is audience-grouped solutions. Products are accessible — `/products`, footer, inline on solution pages — but never the first thing a visitor sees.

### 2. Software-first, demonstrated

The platform (GridOS) is the moat. Every site must communicate this not through copy, but through behavior — real console screenshots, app screen recordings, architecture diagrams that look engineered. Never "AI" as a label. Always shown, not told.

### 3. Open is the floor

Open protocols (OCPP, MQTT, MODBUS, OpenAPI) are not a premium tier. They are the default. The website states this plainly, prominently, on the Platform page. It is the single largest differentiator from Indian incumbents.

### 4. Economics belong in their own room

The CFO page (`/economics`) is dedicated, structured, and CTAs into it explicitly ("See the complete financial model"). Marketing pages reference ROI inline; deep math lives on the dedicated page. This respects the buyer's mental model.

### 5. India-grounded, never India-clichéd

Real Indian contexts: monsoon-tested enclosures, GIDC Verna pilot, Maharashtra TOU tariffs, FAME III subsidies, Razorpay/UPI payments. But no decorative "Make in India" iconography. The geography is in the substance, not the surface.

### 6. Craft signals over polish veneer

The day/night image pair (same scene, dawn vs. night, swapped on theme toggle) is the single largest craft signal we can ship. Subtle motion, considered typography, deliberate restraint. These say "humans made this" louder than any tagline.

### 7. Every word earns its place

No filler. No "Welcome to GridEnergy." No "Our innovative solutions empower." If a sentence can be deleted without losing meaning, delete it.

---

## Scope of the prototype phase

What this branch (`sagar/gridpower-www-prototype`) ships:

| Tier | Pages | Status |
|---|---|---|
| **Tier 1 — Polish lock** | Both homepages + 1 solution page (template lock) + Platform + App | Polished to design lock, used as the template for everything else |
| **Tier 2 — Bulk scaffold** | Remaining 33 solution pages (across both sites), `/economics`, `/resources`, `/about`, `/contact`, `/signup`, `/products`, `/partners`, `/support` | Structure complete, content placeholder, visually consistent |
| **Tier 3 — Deferred** | Blog, Drive vertical, Hindi locale, /sign-in flows | Out of scope for prototype |

Total surface: ~60 pages across both sites. Build cadence: 8-10 pages/month at production polish, but bulk scaffold can land 20+ pages in a weekend at template quality.

---

## What success looks like

The prototype is successful if:

1. A 30-second scroll of either homepage communicates the thesis (software-first + India-grounded + open energy platform) without copy that screams it
2. A buyer self-identifies in <2 clicks from landing → their solution page → ROI clarity
3. The visual identity is recognizable as "GridPower" within 3 seconds, distinct from every Indian energy/EV site that already exists
4. Sagar walks through the live prototype and can identify zero AI-slop moments
5. The token system + component primitives are stable enough that a Sonnet subagent can scaffold the remaining 30+ solution pages without judgment calls

Anything less and we iterate before locking.

---

## Open decisions deferred to live iteration

These are intentionally not pre-locked. We decide while looking at real pages.

- Hero approach per site (typographic / single-image / audience-card hybrid) — scaffold 3 variants, pick during review
- Solution page modular section catalog — define section blocks as we build the first solution page polish, then reuse
- Photography commission scope — confirm day/night pair sourcing strategy after seeing the placeholder pass
- Mega-menu visual density — hover behavior locked, but column count + featured-imagery slot decided on first build

Everything else is locked in this document or in DESIGN.md.
