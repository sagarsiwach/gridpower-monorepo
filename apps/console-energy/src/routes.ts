import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Root index, redirects to /dashboard via routes/_index.tsx
  index("routes/_index.tsx"),

  // Public routes (NOT wrapped in shell)
  route("login", "routes/login.tsx"),

  // Protected routes, wrapped in ConsoleShell layout
  layout("routes/_shell.tsx", [
    route("dashboard", "routes/dashboard.tsx"),

    // Sites: BESS site fleet (list + detail with in-page tabs)
    route("sites", "routes/sites._index.tsx"),
    route("sites/:siteId", "routes/sites.$siteId.tsx"),

    // Stacks: cross-site stack inventory + detail
    route("stacks", "routes/stacks._index.tsx"),
    route("stacks/:stackId", "routes/stacks.$stackId.tsx"),

    // Live portfolio energy flow
    route("energy-flow", "routes/energy-flow.tsx"),

    // Schedules: discharge schedules
    route("schedules", "routes/schedules._index.tsx"),
    route("schedules/new", "routes/schedules.new.tsx"),
    route("schedules/:scheduleId", "routes/schedules.$scheduleId.tsx"),

    // Tariffs: time-of-use rate plans
    route("tariffs", "routes/tariffs._index.tsx"),
    route("tariffs/:tariffId", "routes/tariffs.$tariffId.tsx"),

    // Demand response: layout with subsections
    route("demand-response", "routes/demand-response.tsx", [
      index("routes/demand-response._index.tsx"),
      route("programs", "routes/demand-response.programs.tsx"),
      route("events", "routes/demand-response.events.tsx"),
      route("events/:eventId", "routes/demand-response.events.$eventId.tsx"),
    ]),

    // Grid events: frequency / voltage events
    route("grid-events", "routes/grid-events._index.tsx"),
    route("grid-events/:eventId", "routes/grid-events.$eventId.tsx"),

    // Alerts
    route("alerts", "routes/alerts._index.tsx"),
    route("alerts/:alertId", "routes/alerts.$alertId.tsx"),

    // Analytics + sub-pages
    route("analytics", "routes/analytics.tsx"),
    route("analytics/roi", "routes/analytics.roi.tsx"),
    route("analytics/energy", "routes/analytics.energy.tsx"),
    route("analytics/exports", "routes/analytics.exports.tsx"),

    // Customers: C&I accounts
    route("customers", "routes/customers._index.tsx"),
    route("customers/:customerId", "routes/customers.$customerId.tsx"),

    // Maintenance: work orders
    route("maintenance", "routes/maintenance._index.tsx"),
    route("maintenance/new", "routes/maintenance.new.tsx"),
    route("maintenance/:workOrderId", "routes/maintenance.$workOrderId.tsx"),

    // Firmware: layout with subsections
    route("firmware", "routes/firmware.tsx", [
      index("routes/firmware._index.tsx"),
      route("versions", "routes/firmware.versions.tsx"),
      route("rollouts", "routes/firmware.rollouts.tsx"),
      route("rollouts/:rolloutId", "routes/firmware.rollouts.$rolloutId.tsx"),
    ]),

    // Settings: nested routes with layout
    route("settings", "routes/settings.tsx", [
      index("routes/settings._index.tsx"),
      route("organisation", "routes/settings.organisation.tsx"),
      route("members", "routes/settings.members.tsx"),
      route("billing", "routes/settings.billing.tsx"),
      route("api", "routes/settings.api.tsx"),
      route("integrations", "routes/settings.integrations.tsx"),
      route("notifications", "routes/settings.notifications.tsx"),
      route("audit", "routes/settings.audit.tsx"),
    ]),

    // Help
    route("help", "routes/help.tsx"),
  ]),

  // 404 catch-all, must be last
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
