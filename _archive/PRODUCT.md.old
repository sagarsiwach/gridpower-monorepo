# PRODUCT.md: GridPower

> Strategic context for design and engineering work on the GridPower monorepo.

## Register

**product**: operator dashboards and console UI. Design serves the product, not the brand. Speed, density, clarity, and trust are the priorities. Marketing surfaces (`apps/web`) live in the same repo but operate under a separate brand register and are not in scope for this document.

## What we are building

GridPower is India's open energy storage, EV charging, and powertrain platform. The monorepo currently ships:

- **GridCharge Console** (`apps/console-charge`): operator dashboard for the GridCharge EV charging network. Used by Charge Point Operators (CPOs) to monitor stations, sessions, drivers, tariffs, payments, and incidents across a fleet of public AC and DC chargers.
- **GridEnergy Console** (`apps/console-energy`, planned): operator dashboard for the GridEnergy battery storage network. Used by site operators and energy managers to monitor BESS sites, energy flow, demand response, and grid events.

Both consoles consume the shared `@gridpower/tokens` and `@gridpower/ui` packages. The marketing site (`apps/web`) lives under the same brand but a separate register.

## Users

Primary: **mid-career operations professionals** running EV charging or BESS infrastructure for an Indian operator. Likely titles: Network Operations Manager, Charging Operations Lead, Site Operations Engineer, Energy Asset Manager. Mostly desktop, ages 28–45, Tier-1 metro Indian English with mixed Hindi familiarity.

Secondary:
- **Field technicians** triaging incidents from a phone or tablet
- **Finance/Ops back-office** reconciling payments and exporting compliance reports
- **Customer support** looking up a driver's session to resolve a complaint
- **Executives** scanning the dashboard for daily KPIs

What they have in common: they need to know what is happening across hundreds of stations or dozens of sites *right now*, drill into specifics in two clicks, and trust the numbers without second-guessing.

## What good looks like

- The operator opens the dashboard at 9am and has a clear read on overnight incidents, revenue, and uptime within 5 seconds.
- Drilling from a KPI to the underlying detail (a station, a session, a driver, a payment) takes one click.
- Every screen is dense with information but never noisy. White space is functional, not decorative.
- The console feels closer to **Linear**, **Vercel**, **Stripe Dashboard**, and **Cloudflare Dashboard** than to a generic SaaS template.

## Voice and tone

- **Direct.** No marketing fluff. Action-oriented labels ("Acknowledge", "Refund", "Push firmware"), not "Click here to acknowledge".
- **Technical but not jargon-heavy.** Operators understand kWh, OCPP, RFID, peak/off-peak; write to that level. Avoid acronyms outside the domain (no "synergize").
- **No em dashes.** Use commas, colons, periods, parentheses.
- **Numbers are first-class.** Lead with the number, not the word. "₹42,180" before "Revenue today", not after.
- **Empty states say what to do next**, not "No data".

## Anti-references

What this product is **not**:

- Not a generic SaaS dashboard. No hero metrics with gradient accents and decorative icons. No "Welcome back, Sagar!" banners.
- Not a consumer app. No animated celebration toasts, confetti, or loading-state mascots.
- Not enterprise legacy. No collapsible nested tree menus, no tab-within-tab-within-tab, no read-only forms with 40 fields and no save button.
- Not over-designed. No glassmorphism, no gradient text, no decorative borders, no card-grid-of-identical-cards, no parallax scrolling.

## Strategic principles

1. **Information density over whitespace.** Operators are looking at this for 8 hours a day. Every pixel earns its place.
2. **One action per row.** Tables and lists have one primary action visible per row, secondary actions in a `…` menu. No 5-button toolbars.
3. **Status is colored, content is neutral.** GridRed is a brand asset *and* a status signal; reserve saturated red for things that demand attention. Body text is sand or dark scale, never accented.
4. **Live data feels live.** Numbers that change do so with subtle motion. Static numbers don't move. Don't fake aliveness.
5. **Dark mode is the default.** Operators sit in low-light NOCs and run dashboards on a 27-inch monitor in a quiet room. Light mode exists for daytime field use on laptops.
6. **Every page works without JavaScript.** SSR-first. The console must render readable HTML even if the JS bundle fails; operators in low-bandwidth tier-2 cities depend on this.

## Anti-patterns we explicitly reject

- Side-stripe borders on cards or alerts (use full borders or background tints).
- Gradient text (single solid color, weight contrast for emphasis).
- Glassmorphism or backdrop-blur as decoration (rare and purposeful only).
- Hero-metric template (big number + small label + supporting stats + gradient).
- Identical card grids (icon + heading + text repeated endlessly).
- Modal as first thought (exhaust inline / progressive alternatives).
- Decorative icons that don't carry information.

## Domain glossary

- **CPO**: Charge Point Operator. Owns and operates the chargers.
- **EVSE**: Electric Vehicle Supply Equipment. A single charger.
- **Connector**: A single port on a charger (CCS2, CHAdeMO, Type 2, GB/T).
- **Session**: One charging event from plug-in to plug-out.
- **OCPP**: Open Charge Point Protocol. The wire protocol between charger and backend.
- **OCPI**: Open Charge Point Interface. Roaming protocol between CPOs.
- **Tariff**: The pricing rule applied to a session (₹/kWh, ₹/min, idle fee).
- **RFID / NFC card**: Driver authentication mechanism at the charger.
- **BESS**: Battery Energy Storage System. A grid-connected battery installation.
- **DR**: Demand Response. Discharging stored energy during grid peak.
- **PV**: Photovoltaic (solar). Often paired with BESS.
- **kVA / kW / kWh**: Power vs energy. Get this right; operators will catch errors.

## Success criteria for design work

A pass succeeds when, for the surface in scope:

1. An operator can complete the primary task in this surface in **under 3 clicks** from any other screen.
2. The screen is readable at **125% zoom** on a 1440 × 900 laptop and at **default** on a 2560 × 1440 desktop.
3. **Dark and light parity**: both render with the same hierarchy and no broken contrast.
4. **No anti-patterns** from the list above.
5. **Empty, loading, and error states** are designed, not afterthoughts.
6. The Lighthouse score for the route is ≥ **90 / 90 / 95 / 100** (Perf / Access / BP / SEO).
