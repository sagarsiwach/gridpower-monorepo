import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Homepage (goes blank in the next slice — header only)
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
  route("preview/:slug", "routes/_preview/variant.tsx"),

  // Solution template (all mega-menu solution links point here for now)
  route("solutions/homes", "routes/solutions/homes.tsx"),

  // Legal pages
  route("privacy", "routes/legal/privacy.tsx"),
  route("terms", "routes/legal/terms.tsx"),
  route("cookies", "routes/legal/cookies.tsx"),

  // Catch-all — not-yet-built routes render header + a small title, never a 404
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
