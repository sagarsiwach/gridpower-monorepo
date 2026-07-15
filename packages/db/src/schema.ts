import {
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const assetKind = pgEnum("asset_kind", [
  "inverter",
  "battery",
  "meter",
  "gateway",
  "charger",
  "evse",
  "connector",
]);
export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
export const principals = pgTable(
  "principals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    kind: text("kind").notNull(),
    externalId: text("external_id").notNull(),
    displayName: text("display_name").notNull(),
  },
  (t) => [uniqueIndex("principals_kind_external_idx").on(t.kind, t.externalId)],
);
export const memberships = pgTable(
  "memberships",
  {
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id),
    principalId: uuid("principal_id")
      .notNull()
      .references(() => principals.id),
    role: text("role").notNull(),
  },
  (t) => [primaryKey({ columns: [t.orgId, t.principalId] })],
);
export const sites = pgTable(
  "sites",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id),
    name: text("name").notNull(),
    status: text("status").notNull().default("commissioning"),
    timezone: text("timezone").notNull().default("Asia/Kolkata"),
  },
  (t) => [index("sites_org_idx").on(t.orgId)],
);
export const assets = pgTable(
  "assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id),
    siteId: uuid("site_id")
      .notNull()
      .references(() => sites.id),
    parentId: uuid("parent_id"),
    kind: assetKind("kind").notNull(),
    name: text("name").notNull(),
    capabilities: jsonb("capabilities").$type<string[]>().notNull().default([]),
    externalIdentity: jsonb("external_identity"),
  },
  (t) => [index("assets_org_site_idx").on(t.orgId, t.siteId)],
);
export const rawEvents = pgTable(
  "raw_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull(),
    source: text("source").notNull(),
    sourceEventId: text("source_event_id").notNull(),
    schemaVersion: integer("schema_version").notNull(),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull(),
    ingestedAt: timestamp("ingested_at", { withTimezone: true }).defaultNow().notNull(),
    payload: jsonb("payload").notNull(),
  },
  (t) => [uniqueIndex("raw_events_idempotency_idx").on(t.source, t.sourceEventId)],
);
export const observations = pgTable(
  "observations",
  {
    orgId: uuid("org_id").notNull(),
    assetId: uuid("asset_id")
      .notNull()
      .references(() => assets.id),
    metric: text("metric").notNull(),
    value: numeric("value").notNull(),
    unit: text("unit").notNull(),
    quality: text("quality").notNull().default("good"),
    sourceAt: timestamp("source_at", { withTimezone: true }).notNull(),
    ingestedAt: timestamp("ingested_at", { withTimezone: true }).defaultNow().notNull(),
    rawEventId: uuid("raw_event_id").references(() => rawEvents.id),
  },
  (t) => [index("observations_asset_time_idx").on(t.assetId, t.sourceAt)],
);
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull(),
  customerName: text("customer_name").notNull(),
  leadType: text("lead_type").notNull(),
  stage: text("stage").notNull().default("new"),
  assumptions: jsonb("assumptions").notNull().default({}),
});
export const tariffs = pgTable(
  "tariffs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull(),
    version: integer("version").notNull(),
    rules: jsonb("rules").notNull(),
    effectiveAt: timestamp("effective_at", { withTimezone: true }).notNull(),
  },
  (t) => [uniqueIndex("tariffs_org_version_idx").on(t.orgId, t.version)],
);
export const chargingSessions = pgTable("charging_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull(),
  connectorId: uuid("connector_id").notNull(),
  tariffId: uuid("tariff_id")
    .notNull()
    .references(() => tariffs.id),
  status: text("status").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }),
  stoppedAt: timestamp("stopped_at", { withTimezone: true }),
});
export const ledgerEntries = pgTable(
  "ledger_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orgId: uuid("org_id").notNull(),
    sessionId: uuid("session_id").references(() => chargingSessions.id),
    account: text("account").notNull(),
    direction: text("direction").notNull(),
    amountPaise: integer("amount_paise").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("ledger_idempotency_idx").on(t.idempotencyKey)],
);
export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  orgId: uuid("org_id").notNull(),
  actorId: uuid("actor_id"),
  action: text("action").notNull(),
  reason: text("reason"),
  requestId: text("request_id").notNull(),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
  metadata: jsonb("metadata").notNull().default({}),
});
