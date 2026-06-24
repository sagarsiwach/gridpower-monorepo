import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Root index, redirects to /dashboard via routes/_index.tsx
  index("routes/_index.tsx"),

  // Public routes (NOT wrapped in shell)
  route("login", "routes/login.tsx"),

  // Protected routes, wrapped in ConsoleShell layout
  layout("routes/_shell.tsx", [
    route("dashboard", "routes/dashboard.tsx"),

    // Stations: list + detail
    route("stations", "routes/stations._index.tsx"),
    route("stations/:stationId", "routes/stations.$stationId.tsx"),

    // Sessions: cross-station session log + detail
    route("sessions", "routes/sessions._index.tsx"),
    route("sessions/:sessionId", "routes/sessions.$sessionId.tsx"),

    // Drivers: end-user accounts (RFID + app users)
    route("drivers", "routes/drivers._index.tsx"),
    route("drivers/:driverId", "routes/drivers.$driverId.tsx"),

    // Tariffs: rate plans
    route("tariffs", "routes/tariffs._index.tsx"),
    route("tariffs/new", "routes/tariffs.new.tsx"),
    route("tariffs/:tariffId", "routes/tariffs.$tariffId.tsx"),

    // Payments: layout with subsections
    route("payments", "routes/payments.tsx", [
      index("routes/payments._index.tsx"),
      route("transactions", "routes/payments.transactions.tsx"),
      route("transactions/:txId", "routes/payments.transactions.$txId.tsx"),
      route("payouts", "routes/payments.payouts.tsx"),
      route("refunds", "routes/payments.refunds.tsx"),
      route("invoices", "routes/payments.invoices.tsx"),
    ]),

    // Alerts: full alert center
    route("alerts", "routes/alerts._index.tsx"),
    route("alerts/:alertId", "routes/alerts.$alertId.tsx"),

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

    // Analytics + sub-pages
    route("analytics", "routes/analytics.tsx"),
    route("analytics/exports", "routes/analytics.exports.tsx"),
    route("analytics/reports", "routes/analytics.reports.tsx"),

    // Fleet list + detail
    route("fleet", "routes/fleet.tsx"),
    route("fleet/:fleetId", "routes/fleet.$fleetId.tsx"),

    // Settings: refactored into nested routes with layout
    route("settings", "routes/settings.tsx", [
      index("routes/settings._index.tsx"),
      route("organisation", "routes/settings.organisation.tsx"),
      route("members", "routes/settings.members.tsx"),
      route("billing", "routes/settings.billing.tsx"),
      route("api", "routes/settings.api.tsx"),
      route("notifications", "routes/settings.notifications.tsx"),
      route("audit", "routes/settings.audit.tsx"),
    ]),

    // Help
    route("help", "routes/help.tsx"),
  ]),

  // 404 catch-all, must be last
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
