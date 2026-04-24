import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Homepage (WEB.2)
  index("routes/_index.tsx"),

  // Design system (DS.5)
  route("design-system", "routes/design-system.tsx"),

  // Vertical landings (WEB.3)
  route("energy", "routes/energy._index.tsx"),
  route("charge", "routes/charge._index.tsx"),
  route("drive", "routes/drive._index.tsx"),

  // Solution pages (WEB.4)
  route("energy/solutions/home", "routes/energy.solutions.home.tsx"),
  route("energy/solutions/commercial", "routes/energy.solutions.commercial.tsx"),
  route("charge/solutions/home", "routes/charge.solutions.home.tsx"),
  route("charge/solutions/destination", "routes/charge.solutions.destination.tsx"),
  route("drive/solutions/vehicles", "routes/drive.solutions.vehicles.tsx"),

  // Product category + Platform (WEB.5)
  route("energy/products", "routes/energy.products.tsx"),
  route("charge/products", "routes/charge.products.tsx"),
  route("drive/products", "routes/drive.products.tsx"),
  route("platform", "routes/platform.tsx"),

  // Standard pages (WEB.6)
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("signup", "routes/signup.tsx"),
  route("blog", "routes/blog._index.tsx"),
] satisfies RouteConfig;
