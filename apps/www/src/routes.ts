import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Homepage
  index("routes/HomeFoundation.tsx"),

  // Design-system showcase
  route("system", "routes/_system/index.tsx"),
  route("system/tokens", "routes/_system/tokens.tsx"),
  route("system/buttons", "routes/_system/buttons.tsx"),
  route("system/forms", "routes/_system/forms.tsx"),
  route("system/cards", "routes/_system/cards.tsx"),
  route("system/menus", "routes/_system/menus.tsx"),

  // Internal previews (kept for reference during build-out)
  route("preview", "routes/_preview/index.tsx"),
  route("preview/full-nav", "routes/_preview/full-nav.tsx"),
  route("preview/v2-menu", "routes/_preview/v2-menu.tsx"),
  route("preview/v3-elements", "routes/_preview/v3-elements.tsx"),
  route("preview/v3-website", "routes/_preview/v3-website.tsx"),
  route("preview/v3-megamenu", "routes/_preview/v3-megamenu.tsx"),
  route("preview/v3-mobile", "routes/_preview/v3-mobile.tsx"),
  route("preview/v3-megamenu-impeccable", "routes/_preview/v3-megamenu-impeccable.tsx"),
  route("preview/v3-solutions-components", "routes/_preview/v3-solutions-components.tsx"),
  route("preview/v3-solutions-hero", "routes/_preview/v3-solutions-hero.tsx"),
  route("preview/section-kit", "routes/_preview/section-kit.tsx"),
  route("preview/solution-samples", "routes/_preview/solution-samples.tsx"),
  route("preview/modules", "routes/_preview/modules.tsx"),
  route("preview/stripe-evolve", "routes/_preview/stripe-evolve.tsx"),
  route("preview/solution-homes", "routes/_preview/solution-homes.tsx"),
  route("preview/all-blocks", "routes/_preview/all-blocks.tsx"),
  route("preview/review", "routes/_preview/review.tsx"),
  route("preview/hero-card-variations", "routes/_preview/hero-card-variations.tsx"),
  route("preview/solutions-section-variations", "routes/_preview/solutions-section-variations.tsx"),
  route("preview/:slug", "routes/_preview/variant.tsx"),

  // Solution pages (per audience)
  route("solutions", "routes/solutions/index.tsx"),

  // Solutions / Homes (hub + spokes)
  route("solutions/homes", "routes/solutions/homes.tsx"),
  route("solutions/homes/apartment", "routes/solutions/apartment.tsx"),
  route("solutions/homes/small-home", "routes/solutions/small-home.tsx"),
  route("solutions/homes/large-home", "routes/solutions/large-home.tsx"),
  route("solutions/homes/solar-storage", "routes/solutions/solar-storage.tsx"),

  // Solutions / Offices & Industrial (hub + spokes)
  route("solutions/offices-industrial", "routes/solutions/offices-industrial.tsx"),
  route("solutions/offices-industrial/small-office", "routes/solutions/small-office.tsx"),
  route("solutions/offices-industrial/mid-office", "routes/solutions/mid-office.tsx"),
  route("solutions/offices-industrial/large-campus", "routes/solutions/large-campus.tsx"),
  route("solutions/offices-industrial/factory", "routes/solutions/factory.tsx"),

  // Solutions / Educational Institutes (hub + spokes)
  route("solutions/institutes", "routes/solutions/institutes.tsx"),
  route("solutions/institutes/school", "routes/solutions/school.tsx"),
  route("solutions/institutes/college", "routes/solutions/college.tsx"),
  route("solutions/institutes/university", "routes/solutions/university.tsx"),
  route("solutions/institutes/hostels", "routes/solutions/hostels.tsx"),

  // Solutions / Enterprises (hub + spokes)
  route("solutions/enterprises", "routes/solutions/enterprises.tsx"),
  route("solutions/enterprises/data-center", "routes/solutions/data-center.tsx"),
  route("solutions/enterprises/telecom", "routes/solutions/telecom.tsx"),
  route("solutions/enterprises/hospital", "routes/solutions/hospital.tsx"),
  route("solutions/enterprises/multi-site", "routes/solutions/multi-site.tsx"),

  // Solutions / Hospitality (hub + spokes)
  route("solutions/hospitality", "routes/solutions/hospitality.tsx"),
  route("solutions/hospitality/hotel", "routes/solutions/hotel.tsx"),
  route("solutions/hospitality/resort", "routes/solutions/resort.tsx"),
  route("solutions/hospitality/restaurant", "routes/solutions/restaurant.tsx"),
  route("solutions/hospitality/mall", "routes/solutions/mall.tsx"),

  // Products
  route("products", "routes/products/index.tsx"),
  route("products/nano", "routes/products/nano.tsx"),
  route("products/micro", "routes/products/micro.tsx"),
  route("products/mega", "routes/products/mega.tsx"),
  route("products/giga", "routes/products/giga.tsx"),

  // Platform
  route("platform", "routes/platform.tsx"),

  // Configurator (conversion endpoint)
  route("configure", "routes/configure.tsx"),

  // Company
  route("about", "routes/about.tsx"),
  route("partners", "routes/partners.tsx"),
  route("support", "routes/support.tsx"),
  route("contact", "routes/contact.tsx"),
  route("sign-in", "routes/sign-in.tsx"),

  // Footer-linked secondary pages
  route("app", "routes/app.tsx"),
  route("economics", "routes/economics.tsx"),
  route("resources", "routes/resources.tsx"),
  route("careers", "routes/careers.tsx"),

  // Legal pages
  route("privacy", "routes/legal/privacy.tsx"),
  route("terms", "routes/legal/terms.tsx"),
  route("cookies", "routes/legal/cookies.tsx"),
  route("disclaimer", "routes/legal/disclaimer.tsx"),
  route("warranty", "routes/legal/warranty.tsx"),

  // Catch-all — not-yet-built routes render header + a small title, never a 404
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
