/**
 * Settings → API keys
 * Route: /settings/api
 *
 * API keys (rotation, scope per key) and webhook endpoints (event
 * subscriptions plus signing secrets).
 */

import * as React from "react";
import {
  Plus,
  Eye,
  EyeOff,
  KeyRound,
  Webhook,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { EmptyState, cn } from "@gridpower/ui";

// ─── Tokens ──────────────────────────────────────────────────────────────────

const META_TEXT_CLS = "font-mono text-[11px] text-muted-foreground";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";
const TABLE_HEADER_BAR_CLS = "px-4 py-2 bg-muted border-b border-border";

// ─── API key mocks ───────────────────────────────────────────────────────────

const API_KEYS = [
  {
    name: "Production key",
    created: "Jan 12, 2026",
    lastUsed: "Today",
    scopes: "read, write",
    masked: "gp_live_••••••••••••••••••••••••3f8a",
  },
  {
    name: "Staging key",
    created: "Feb 3, 2026",
    lastUsed: "Yesterday",
    scopes: "read",
    masked: "gp_test_••••••••••••••••••••••••9c2d",
  },
  {
    name: "Analytics only",
    created: "Mar 18, 2026",
    lastUsed: "Apr 20",
    scopes: "read",
    masked: "gp_live_••••••••••••••••••••••••1b4e",
  },
];

// ─── Webhook mocks ───────────────────────────────────────────────────────────

const WEBHOOKS = [
  {
    url: "https://ops.gridpower.co.in/webhooks/sessions",
    events: ["session.start", "session.end"],
    secret: "whsec_••••••••••••••••3f8a",
    status: "active" as const,
    lastDelivery: "2 min ago",
  },
  {
    url: "https://ops.gridpower.co.in/webhooks/alerts",
    events: ["alert.raised", "alert.ack"],
    secret: "whsec_••••••••••••••••9c2d",
    status: "active" as const,
    lastDelivery: "12 min ago",
  },
  {
    url: "https://staging.ops.gridpower.co.in/webhooks/billing",
    events: ["invoice.paid"],
    secret: "whsec_••••••••••••••••1b4e",
    status: "failing" as const,
    lastDelivery: "Failed 3h ago",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

type AsyncState = "idle" | "loading" | "error";

export default function ApiSettings() {
  const [state, setState] = React.useState<AsyncState>("idle");
  const [revealedIdx, setRevealedIdx] = React.useState<number | null>(null);
  const keys = API_KEYS;

  const handleRetry = React.useCallback(() => {
    setState("loading");
    setTimeout(() => setState("idle"), 350);
  }, []);

  if (state === "loading") {
    return (
      <section
        aria-labelledby="api-heading"
        aria-busy="true"
        className="max-w-2xl"
      >
        <h2 id="api-heading" className="sr-only">
          API keys
        </h2>
        <div role="status" className={META_TEXT_CLS}>
          Loading API configuration.
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section aria-labelledby="api-heading" className="max-w-2xl">
        <h2 id="api-heading" className="sr-only">
          API keys
        </h2>
        <div
          role="alert"
          className="flex items-center gap-3 rounded-card border border-error bg-error/10 px-4 py-2.5"
        >
          <AlertTriangle
            size={14}
            aria-hidden="true"
            className="text-error shrink-0"
          />
          <span className="font-body text-[12px] text-foreground">
            Could not load API configuration.
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="ml-auto inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[11px] text-foreground hover:bg-muted cursor-pointer"
          >
            <RefreshCw size={11} aria-hidden="true" />
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="api-heading" className="max-w-2xl">
      <h2 id="api-heading" className="sr-only">
        API keys and webhooks
      </h2>

      {/* Info + create key */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-5">
        <div className="flex-1 rounded-card border border-border bg-muted px-4 py-3 font-body text-[12px] text-muted-foreground leading-relaxed">
          For open ecosystem integration. Full API docs at{" "}
          <a
            href="https://docs.gridpower.co.in/api"
            className="text-primary hover:underline"
          >
            docs.gridpower.co.in/api
          </a>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-btn bg-primary text-white font-body text-[12px] font-medium hover:bg-primary/90 transition-colors cursor-pointer shrink-0"
          onClick={() => console.log("Create API key (stub)")}
        >
          <Plus size={12} aria-hidden="true" />
          Create key
        </button>
      </div>

      {/* Keys table */}
      <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
        Active API keys
      </h3>
      {keys.length === 0 ? (
        <div className="rounded-card border border-border mb-6">
          <EmptyState
            icon={<KeyRound size={20} aria-hidden="true" />}
            title="No API keys generated yet"
            description="Create a key to authenticate requests against the GridCharge API."
          />
        </div>
      ) : (
        <div
          role="table"
          aria-label="API keys"
          className="rounded-card border border-border overflow-x-auto mb-6"
        >
          <div
            role="row"
            className={`grid grid-cols-[1fr_100px_100px_100px_140px] min-w-[680px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Key", "Created", "Last used", "Scopes", "Actions"].map((h) => (
              <span
                key={h}
                role="columnheader"
                aria-sort="none"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
          </div>
          {keys.map((k, i) => {
            const isRevealed = revealedIdx === i;
            return (
              <div
                key={k.name}
                role="row"
                className="grid grid-cols-[1fr_100px_100px_100px_140px] min-w-[680px] px-4 py-3.5 border-b border-border last:border-0 items-center"
              >
                <div role="cell">
                  <div className="font-body text-[13px] font-medium text-foreground mb-0.5">
                    {k.name}
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground">
                    {isRevealed ? k.masked.replace(/•/g, "x") : k.masked}
                  </div>
                </div>
                <span role="cell" className={META_TEXT_CLS}>
                  {k.created}
                </span>
                <span role="cell" className={META_TEXT_CLS}>
                  {k.lastUsed}
                </span>
                <span
                  role="cell"
                  className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] bg-muted text-muted-foreground w-fit"
                >
                  {k.scopes}
                </span>
                <div role="cell" className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={
                      isRevealed
                        ? `Hide ${k.name} value`
                        : `Reveal ${k.name} value`
                    }
                    aria-pressed={isRevealed}
                    className="flex items-center justify-center w-7 h-7 rounded-btn border border-border hover:bg-muted text-muted-foreground transition-colors cursor-pointer"
                    onClick={() => setRevealedIdx(isRevealed ? null : i)}
                  >
                    {isRevealed ? (
                      <EyeOff size={12} aria-hidden="true" />
                    ) : (
                      <Eye size={12} aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label={`Rotate ${k.name}`}
                    className="px-2.5 py-1.5 rounded-btn border border-border font-body text-[11px] text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => console.log("Rotate key (stub):", k.name)}
                  >
                    Rotate
                  </button>
                  <button
                    type="button"
                    aria-label={`Revoke ${k.name}`}
                    className="px-2.5 py-1.5 rounded-btn border border-error/50 font-body text-[11px] text-error hover:bg-error/10 transition-colors cursor-pointer"
                    onClick={() => console.log("Revoke key (stub):", k.name)}
                  >
                    Revoke
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Webhooks */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-body text-[12px] font-semibold text-foreground">
          Webhook endpoints
        </h3>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-border font-body text-[11px] text-foreground hover:bg-muted transition-colors cursor-pointer"
          onClick={() => console.log("Add webhook (stub)")}
        >
          <Plus size={12} aria-hidden="true" />
          Add endpoint
        </button>
      </div>

      {WEBHOOKS.length === 0 ? (
        <div className="rounded-card border border-border">
          <EmptyState
            icon={<Webhook size={20} aria-hidden="true" />}
            title="No webhooks configured"
            description="Subscribe an endpoint to receive signed events for sessions, alerts and billing."
          />
        </div>
      ) : (
        <div
          role="table"
          aria-label="Webhook endpoints"
          className="rounded-card border border-border overflow-x-auto"
        >
          <div
            role="row"
            className={`grid grid-cols-[1fr_180px_120px_120px] min-w-[680px] ${TABLE_HEADER_BAR_CLS}`}
          >
            {["Endpoint", "Events", "Status", "Last delivery"].map((h) => (
              <span
                key={h}
                role="columnheader"
                aria-sort="none"
                className={META_CAPS_CLS}
              >
                {h}
              </span>
            ))}
          </div>
          {WEBHOOKS.map((w, i) => (
            <div
              key={i}
              role="row"
              className="grid grid-cols-[1fr_180px_120px_120px] min-w-[680px] px-4 py-3 border-b border-border last:border-0 items-center"
            >
              <div role="cell" className="min-w-0">
                <div className="font-body text-[12px] font-medium text-foreground truncate">
                  {w.url}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground mt-0.5">
                  {w.secret}
                </div>
              </div>
              <div role="cell" className="flex flex-wrap gap-1">
                {w.events.map((ev) => (
                  <span
                    key={ev}
                    className="inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[10px] bg-muted text-muted-foreground"
                  >
                    {ev}
                  </span>
                ))}
              </div>
              <span
                role="cell"
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full font-body text-[11px] font-medium w-fit",
                  w.status === "active"
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error",
                )}
              >
                {w.status === "active" ? "Active" : "Failing"}
              </span>
              <span
                role="cell"
                className={cn(
                  META_TEXT_CLS,
                  w.status === "failing" && "text-error",
                )}
              >
                {w.lastDelivery}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
