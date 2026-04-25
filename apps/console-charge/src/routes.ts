import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Root index → redirect to /dashboard via routes/_index.tsx
  index("routes/_index.tsx"),

  // Public routes (NOT wrapped in shell)
  route("login", "routes/login.tsx"),

  // Protected routes — wrapped in ConsoleShell layout
  layout("routes/_shell.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    // Stations: index list + detail by ID
    route("stations", "routes/stations._index.tsx"),
    route("stations/:stationId", "routes/stations.$stationId.tsx"),
    route("analytics", "routes/analytics.tsx"),
    route("fleet", "routes/fleet.tsx"),
    route("settings", "routes/settings.tsx"),
  ]),

  // 404 catch-all — must be last
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
