# Product

> Source of truth for what we are building, for whom, and why.
> Companion to DESIGN.md (how it looks) and SITEMAP.md (where things live).
> Last updated: 2026-05-16

## Register

brand

## Users

Two parallel marketing sites under one parent.

**gridenergy.co.in** sells residential and commercial battery storage. Primary buyers:

- **Homes.** Indian apartment owners and homeowners in tier-1 / tier-2 cities deciding between a diesel-gen UPS, a solar-only system, or a battery + solar combo. Budget-aware, payback-fixated, comparison-shopping against Luminous / Exide / Tata.
- **Offices and Industrial.** Facilities managers and small-factory owners replacing UPS or adding tariff-arbitrage storage. They have a power bill in hand and want to know months to payback before reading anything else.
- **Institute.** School / college / university administrators sourcing under PMS or other subsidy schemes. They route through a procurement officer; the page has to make the regulatory framing legible.
- **Enterprises.** Data center / telecom / hospital operators with multi-site rollouts. They evaluate the platform as much as the hardware. GridOS is the deciding factor.
- **Hospitality.** Hotels, resorts, malls, restaurants with bursty peak loads. Diesel-offset is the headline pitch.

**gridcharge.co.in** sells EV charging hardware and the same buyer ladder with vertical-specific phrasing. (Mirrors the GridEnergy structure; out of scope for this PRODUCT.md until GridEnergy template is locked.)

All buyers share three traits: budget-conscious, payback-first, skeptical of marketing. They've been burned by hardware vendors who disappear after install.

## Product Purpose

Make the strategic thesis legible in 30 seconds and convertible in 5 minutes:

> Storage is the gap solar opened. Charging is the gap EVs opened. Software is the moat that makes both into businesses.

In a market where every vendor sells a black box, **the vendor that sells transparency wins**. The hardware is the foot in the door. **GridOS** — the operator console — is the moat. Daily meter reads. Per-asset payback math. Fault flags that actually flag. No vendor lock-in: open standards (OCPP 2.0.1, Modbus TCP, MQTT v5), self-hostable console.

The site has one conversion goal: **get the visitor onto the early-access waitlist with their site load and tariff entered.** Within 48 hours they receive a sized stack, payback timeline, and a sample GridOS console for their site. Everything else on the site is in service of making that ask feel obvious.

Legal entity: **DeltaEV Mobility Private Limited**, Verna, Goa.

## Brand Personality

**Restrained. Operator. Honest.**

- **Restrained.** One saturated color (GridRed). Everything else is olive-tonal neutral. Type carries the page, not color. No gradients, no glassmorphism, no decorative shadow stacks. The site looks like it was made by people who know what they're doing, not people performing competence.
- **Operator.** Talks to people who run things. Numbers are first-class citizens. ROI math is shown inline, not buried in a PDF. Specs are tabular and dense. Every card answers more questions than "what is this." The reader is not a beginner.
- **Honest.** Surfaces real metrics (sites live, MWh delivered, average payback in months) up front. Names competitive positioning explicitly ("26mo payback vs 48mo industry average"). Doesn't hide the software cost behind "request a quote." Says "we bill against actual savings only" because that's the model.

Three-word identity: **Operator-grade. Type-led. Indian.**

## Anti-references

What this should explicitly NOT look like.

- **Linear / Stripe / Vercel "clean SaaS."** That entire register was rejected mid-session as inherited from the previous prototype and incorrect for this brand. Soft cool greys, abundant whitespace, and developer-product polish read as "yet another SaaS dashboard." We are not that.
- **Tesla minimalism alone.** Cold, photography-led, zero-density. Misses the Indian buyer who wants the math on the page.
- **Generic green-energy "renewable clean."** Forest greens, blue-greens, white backgrounds with leaf icons. Indistinguishable institutional aesthetic. The category-reflex check fails.
- **Indian competitor sales-led pages (Tata Power Solar, Luminous).** Utilitarian, ad-banner-heavy, no narrative, no operator confidence. We are reaching for the same buyer with a higher-craft pitch.
- **Hero-metric template SaaS clichés.** Big number / small label / supporting stats / gradient accent. We will use big numbers, but never in that template-trio arrangement. Numbers earn their place via the surrounding context.

## Design Principles

Five strategic principles that should resolve every "but should we…" debate.

1. **Density before whitespace.** Every card, every section, every list row answers more than one question. We borrowed this from Fold.money: small uppercase labels next to medium body next to bold numbers, packed tight inside generous outer padding. Hollow space is failure; relaxation lives between groups, not inside them.
2. **One chromatic voice.** GridRed is the only saturated color anywhere on the site. Everything else is olive-tonal neutral. The constraint is the brand. If a designer reaches for an "accent" hue, the answer is no.
3. **Type as the dominant medium.** Display headlines in Clash Grotesk. Everything else in Inter, optical-sized. Geist Mono for true monospace contexts only (specs, code, technical numbers). Hierarchy comes from scale and weight, never from color tricks or gradients.
4. **Hardware is the foothold. Software is the moat.** Product renders and GridOS console screenshots earn equal real estate. Every solution page mentions GridOS by name. Open standards (OCPP, Modbus, MQTT) are named in copy, not buried in a footnote.
5. **Indian market reality.** ROI is in months and rupees, not years and dollars. Tariff context matters. PMS / state subsidy framing belongs on institute and SMB pages. Hindi locale ships in phase 2 but the English copy already avoids idioms that won't translate.

## Accessibility & Inclusion

- **WCAG 2.2 AA** baseline. All text passes contrast on olive substrate. Active states never rely on color alone (use icon + position + label).
- **Mobile-first.** All audience landings and solution detail pages designed at 390 width before desktop. Tap targets minimum 44×44.
- **Reduced-motion.** Honor `prefers-reduced-motion: reduce` — disable the `layoutId` tab-slide and audience-content cross-fade. Static state should be fully usable.
- **Hindi locale.** Deferred to phase 2 (hi.gridenergy.co.in, hi.gridcharge.co.in subdomains). English copy is written to translate cleanly — no puns, no idioms, sentence structures that survive devanagari typography.
- **Indian browser reality.** Sites must work on Jio-grade 4G with reasonable LCP. Hero imagery loads progressively. No mandatory video on first paint.

## Strategic decisions locked in this prototype

These are decisions reached through debate that should not be re-litigated without explicit revisit:

- **Two standalone sites, not one.** gridenergy.co.in and gridcharge.co.in are independent. gridpower.co.in is a redirect-only router at the Cloudflare edge.
- **Audience-led, not product-led.** Five audience tabs in the nav (Homes, Offices & Industrial, Institute, Enterprises, Hospitality), each opening a mega panel. No "Products" parent navigation item. Products surface inside each audience.
- **No "Solutions" parent.** Each audience IS the nav item. No drop-down chevron implying nested navigation depth that doesn't exist.
- **Mega panel is rounded rectangles, not squircles.** Elements page and mobile menu can use squircles for sub-components. Marketing-page chrome is plain `border-radius`.
- **GridRed is the ONLY chromatic accent.** Mint / lime accent was rejected. Even success states use deeper olive, not green.
- **No "Talk to sales" CTA in the main nav.** Only "Get early access" (the conversion goal). Sales conversation is a downstream consequence of waitlist entry.
- **Imagery is product renders, not lifestyle.** Generated via prompt for 4 Homes tiles, will continue per audience.
- **Phosphor (regular + duotone) is the icon family.** No mixing.
