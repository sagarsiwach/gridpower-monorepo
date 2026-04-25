/**
 * Settings → Notifications
 * Route: /settings/notifications
 *
 * Per-channel routing (email / Slack / PagerDuty / Telegram), per-event
 * subscription matrix, quiet hours, and an auto-save indicator.
 */

import * as React from "react";
import { Mail, Hash, Phone, Send, AlertTriangle, RefreshCw } from "lucide-react";
import { Switch, cn } from "@gridpower/ui";

// ─── Tokens ──────────────────────────────────────────────────────────────────

const META_TEXT_CLS = "font-mono text-[11px] text-muted-foreground";
const META_CAPS_CLS =
  "font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground";

// ─── Channels ────────────────────────────────────────────────────────────────

type ChannelId = "email" | "slack" | "pagerduty" | "telegram";

const CHANNELS: Array<{
  id: ChannelId;
  label: string;
  target: string;
  icon: typeof Mail;
}> = [
  {
    id: "email",
    label: "Email",
    target: "ops@gridpower.co.in",
    icon: Mail,
  },
  {
    id: "slack",
    label: "Slack",
    target: "#gridcharge-alerts",
    icon: Hash,
  },
  {
    id: "pagerduty",
    label: "PagerDuty",
    target: "service GP-OPS-01",
    icon: Phone,
  },
  {
    id: "telegram",
    label: "Telegram",
    target: "@gridcharge_alerts_bot",
    icon: Send,
  },
];

// ─── Events ──────────────────────────────────────────────────────────────────

const EVENT_GROUPS: Array<{
  group: string;
  events: Array<{
    id: string;
    label: string;
    sub?: string;
    defaults: Record<ChannelId, boolean>;
  }>;
}> = [
  {
    group: "Stations",
    events: [
      {
        id: "station.offline",
        label: "Station goes offline",
        sub: "Triggered after 90 seconds of no heartbeat.",
        defaults: { email: true, slack: true, pagerduty: true, telegram: false },
      },
      {
        id: "station.temp",
        label: "High temperature warning",
        defaults: { email: true, slack: true, pagerduty: false, telegram: false },
      },
      {
        id: "station.firmware",
        label: "Firmware update available",
        defaults: { email: true, slack: false, pagerduty: false, telegram: false },
      },
    ],
  },
  {
    group: "Sessions and revenue",
    events: [
      {
        id: "session.completed",
        label: "Session completed",
        sub: "High-value sessions only by default.",
        defaults: { email: false, slack: false, pagerduty: false, telegram: false },
      },
      {
        id: "revenue.milestone",
        label: "Revenue milestone reached",
        defaults: { email: true, slack: true, pagerduty: false, telegram: true },
      },
      {
        id: "digest.weekly",
        label: "Weekly digest",
        sub: "Every Monday 08:00 IST.",
        defaults: { email: true, slack: true, pagerduty: false, telegram: false },
      },
    ],
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

type AsyncState = "idle" | "loading" | "error";

export default function NotificationsSettings() {
  const [state, setState] = React.useState<AsyncState>("idle");
  const [criticalOnly, setCriticalOnly] = React.useState(false);
  const [quietStart, setQuietStart] = React.useState("22:00");
  const [quietEnd, setQuietEnd] = React.useState("06:00");

  const handleRetry = React.useCallback(() => {
    setState("loading");
    setTimeout(() => setState("idle"), 350);
  }, []);

  if (state === "loading") {
    return (
      <section
        aria-labelledby="notifications-heading"
        aria-busy="true"
        className="max-w-3xl"
      >
        <h2 id="notifications-heading" className="sr-only">
          Notifications
        </h2>
        <div role="status" className={META_TEXT_CLS}>
          Loading notification preferences.
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section aria-labelledby="notifications-heading" className="max-w-3xl">
        <h2 id="notifications-heading" className="sr-only">
          Notifications
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
            Could not load notification preferences.
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
    <section aria-labelledby="notifications-heading" className="max-w-3xl">
      <h2 id="notifications-heading" className="sr-only">
        Notifications
      </h2>

      {/* Channels card */}
      <div className="rounded-card border border-border bg-muted p-4 mb-5">
        <h3 className={`${META_CAPS_CLS} mb-3`}>Channels</h3>
        <ul role="list" className="flex flex-col gap-2">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <li
                key={c.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center w-7 h-7 rounded-btn bg-card border border-border text-muted-foreground"
                  >
                    <Icon size={13} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-body text-[12px] font-medium text-foreground">
                      {c.label}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground truncate">
                      {c.target}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-btn border border-border font-body text-[11px] text-muted-foreground hover:bg-card hover:text-foreground cursor-pointer"
                  onClick={() => console.log("Reconfigure channel:", c.id)}
                >
                  Configure
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Per-event matrix */}
      <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
        Event subscriptions
      </h3>
      <div
        className="rounded-card border border-border overflow-x-auto mb-5"
        role="region"
        aria-label="Per-event channel routing"
      >
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th
                scope="col"
                className={cn(META_CAPS_CLS, "text-left px-4 py-2 font-normal")}
              >
                Event
              </th>
              {CHANNELS.map((c) => (
                <th
                  key={c.id}
                  scope="col"
                  className={cn(
                    META_CAPS_CLS,
                    "text-left px-3 py-2 font-normal w-24",
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          {EVENT_GROUPS.map((grp) => (
            <tbody key={grp.group}>
              <tr>
                <th
                  scope="rowgroup"
                  colSpan={CHANNELS.length + 1}
                  className="bg-card text-left px-4 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground border-b border-border"
                >
                  {grp.group}
                </th>
              </tr>
              {grp.events.map((ev) => (
                <EventRow key={ev.id} event={ev} />
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Quiet hours + critical-only */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="rounded-card border border-border bg-muted p-4">
          <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
            Quiet hours
          </h3>
          <p className="font-body text-[11px] text-muted-foreground mb-3 leading-relaxed">
            Suppress non-critical notifications during this window. Critical
            station-offline and PagerDuty events still page through.
          </p>
          <div className="flex items-end gap-3">
            <div>
              <label
                htmlFor="quiet-start"
                className="block font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-1"
              >
                Start
              </label>
              <input
                id="quiet-start"
                type="time"
                value={quietStart}
                onChange={(e) => setQuietStart(e.target.value)}
                className="h-9 rounded-btn border border-border bg-background px-3 font-mono text-[12px] text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="quiet-end"
                className="block font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground mb-1"
              >
                End
              </label>
              <input
                id="quiet-end"
                type="time"
                value={quietEnd}
                onChange={(e) => setQuietEnd(e.target.value)}
                className="h-9 rounded-btn border border-border bg-background px-3 font-mono text-[12px] text-foreground"
              />
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border bg-muted p-4">
          <h3 className="font-body text-[12px] font-semibold text-foreground mb-3">
            Critical only mode
          </h3>
          <div className="flex items-start justify-between gap-3">
            <p className="font-body text-[11px] text-muted-foreground leading-relaxed">
              Suppress all non-critical alerts across every channel. Useful
              during planned maintenance windows.
            </p>
            <Switch
              id="critical-only"
              checked={criticalOnly}
              onCheckedChange={setCriticalOnly}
              aria-label="Critical only mode"
            />
          </div>
        </div>
      </div>

      {/* Auto-save indicator */}
      <div className="flex items-center gap-2" role="status">
        <div
          aria-hidden="true"
          className="w-1.5 h-1.5 rounded-full bg-success"
        />
        <span className="font-mono text-[11px] text-success">
          Preferences saved automatically
        </span>
      </div>
    </section>
  );
}

// ─── Per-event row ───────────────────────────────────────────────────────────

function EventRow({
  event,
}: {
  event: {
    id: string;
    label: string;
    sub?: string;
    defaults: Record<"email" | "slack" | "pagerduty" | "telegram", boolean>;
  };
}) {
  const [state, setState] = React.useState(event.defaults);
  return (
    <tr className="border-b border-border last:border-0">
      <th
        scope="row"
        className="text-left align-top px-4 py-3 font-normal w-1/2"
      >
        <div className="font-body text-[12px] font-medium text-foreground">
          {event.label}
        </div>
        {event.sub && (
          <div className="font-body text-[11px] text-muted-foreground mt-0.5">
            {event.sub}
          </div>
        )}
      </th>
      {(["email", "slack", "pagerduty", "telegram"] as const).map((ch) => {
        const id = `${event.id}-${ch}`;
        return (
          <td key={ch} className="px-3 py-3 align-top">
            <label htmlFor={id} className="sr-only">
              Send {event.label} to {ch}
            </label>
            <Switch
              id={id}
              checked={state[ch]}
              onCheckedChange={(v) =>
                setState((s) => ({ ...s, [ch]: v }))
              }
              aria-label={`Send ${event.label} to ${ch}`}
            />
          </td>
        );
      })}
    </tr>
  );
}
