/**
 * CON.HELP: Help centre
 * Route: /help
 *
 * - Search bar
 * - FAQ category grid (6 categories, 15-20 questions using <details>/<summary>)
 * - Contact support footer card
 * - "Request a feature" link
 */

import * as React from "react";
import {
  BookOpen,
  Settings,
  CreditCard,
  Users,
  Code,
  Cpu,
  Search,
  Phone,
  Mail,
  ExternalLink,
  Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: FaqItem[];
}

// ─── Mock FAQ data ────────────────────────────────────────────────────────────

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    icon: <BookOpen size={16} aria-hidden="true" />,
    title: "Getting Started",
    items: [
      {
        q: "How do I add my first charging station?",
        a: "Navigate to Stations in the sidebar, then click Add station. Enter the OCPP endpoint URL, name, and connector types. The station will appear as Pending until it connects and sends a BootNotification.",
      },
      {
        q: "What OCPP version does GridCharge support?",
        a: "GridCharge supports OCPP 1.6J (JSON) and OCPP 2.0.1. Most hardware manufactured after 2020 ships with 1.6J. Contact support to enable 2.0.1 for compatible stations.",
      },
      {
        q: "How do I invite team members?",
        a: "Go to Settings then Members. Enter the email address and choose a role (Admin, Operator, or Read-only). An invitation email is sent immediately. Pending invites expire after 7 days.",
      },
      {
        q: "How long does onboarding take?",
        a: "Most operators are live within one business day. Station registration is instant once the charger connects. Tariff configuration and payment gateway setup each take under 15 minutes.",
      },
    ],
  },
  {
    id: "operations",
    icon: <Settings size={16} aria-hidden="true" />,
    title: "Operations",
    items: [
      {
        q: "Why is a station showing as Offline when it is physically powered on?",
        a: "Check that the OCPP WebSocket URL in the charger firmware matches the URL shown in the Stations detail panel. Also verify firewall rules allow outbound WSS on port 443. The station must send a heartbeat within 60 seconds of boot.",
      },
      {
        q: "Can I remotely stop a charging session?",
        a: "Yes. Open the station detail panel, go to the active session row, and click Stop session from the remote actions menu. The charger receives a RemoteStopTransaction command and unlocks the connector within a few seconds.",
      },
      {
        q: "How do I schedule a maintenance window?",
        a: "Open the station, click Set maintenance in the remote actions dropdown. Choose the start and end time. The station status will change to Maintenance and no new sessions can start. Existing sessions will complete before the window begins.",
      },
      {
        q: "What is the alert SLA for critical incidents?",
        a: "Critical alerts (offline station, connector error, payment failure) trigger a push notification within 30 seconds of detection. Email escalations follow at 5 minutes if unacknowledged. SLA breach alerts are raised at 15 minutes.",
      },
    ],
  },
  {
    id: "billing",
    icon: <CreditCard size={16} aria-hidden="true" />,
    title: "Billing and Tariffs",
    items: [
      {
        q: "How do I create a time-of-use tariff?",
        a: "Go to Tariffs and click New tariff. Select Time-of-use pricing. You can set peak, off-peak, and super off-peak rate bands by hour range and day of week. Each band supports a per-kWh rate plus optional per-minute idle fee.",
      },
      {
        q: "When are payouts processed?",
        a: "Payouts are processed on the 1st and 15th of each month for balances above INR 500. Funds are credited to the registered bank account within 2-3 business days. You can view payout history under Payments then Payouts.",
      },
      {
        q: "How is GST handled on session revenue?",
        a: "GridCharge automatically applies 18% GST on all session charges. Invoices include a GST breakdown. The GST Returns Helper under Analytics then Reports can pre-fill your GSTR-1 data for the selected period.",
      },
      {
        q: "Can I offer discounts to specific driver groups?",
        a: "Yes. Create a driver group under Drivers, assign drivers, and then create a discounted tariff. Assign the tariff to that group. Members of the group will see the discounted rate when they authenticate at any station running that tariff.",
      },
    ],
  },
  {
    id: "drivers-cards",
    icon: <Users size={16} aria-hidden="true" />,
    title: "Drivers and Cards",
    items: [
      {
        q: "How do I add an RFID card to a driver account?",
        a: "Open the driver record under Drivers, click Add RFID card, and enter the 4 to 8 byte hex UID printed on the card or scan it at an enrolled station. Cards are active immediately. You can also bulk-import cards via CSV.",
      },
      {
        q: "A driver says their card is not working. How do I diagnose?",
        a: "Check the driver record to confirm the card status is Active. Then check the station's local authorisation list under the Firmware tab (if OCPP 2.0.1). If the station is offline, it may be falling back to local auth. Try issuing a ClearCache command.",
      },
      {
        q: "Can drivers use the app without a physical card?",
        a: "Yes. Drivers can authenticate via QR code on the charger screen (App-link) or via the Tap-to-Charge NFC option on supported Android devices. These methods use the same driver ID as the RFID card.",
      },
    ],
  },
  {
    id: "api-integrations",
    icon: <Code size={16} aria-hidden="true" />,
    title: "API and Integrations",
    items: [
      {
        q: "Where do I find my API credentials?",
        a: "Go to Settings then API. Click Generate key. The secret is shown once; copy it immediately. Subsequent requests use Bearer token authentication. Rate limits are 1000 requests per minute per key for read endpoints and 120 per minute for write endpoints.",
      },
      {
        q: "Does GridCharge support OCPI for roaming?",
        a: "OCPI 2.2.1 is available as an add-on. Contact sales to enable it. Once active, you can configure OCPI connections with other CPOs under Settings then Integrations. OCPI token exchange and location sync are fully automated.",
      },
      {
        q: "How do I connect to Postiz for social publishing?",
        a: "The Postiz integration is in development. Once released it will appear under Settings then Integrations. You will be able to configure the Postiz workspace token and choose which report types trigger automatic posts.",
      },
    ],
  },
  {
    id: "hardware",
    icon: <Cpu size={16} aria-hidden="true" />,
    title: "Hardware",
    items: [
      {
        q: "Which charger models are certified for use with GridCharge?",
        a: "GridCharge is hardware-agnostic and works with any OCPP 1.6J or 2.0.1 compliant charger. Certified and pre-configured models include Exicom, Delta Electronics, ABB Terra, Greaves, and Ather-Grid AC chargers. Contact support for a full compatibility list.",
      },
      {
        q: "How do I push a firmware update to a station?",
        a: "Open the station and click the Firmware tab. Available updates appear in the Update available card. Click Push update to trigger an UpdateFirmware command. You can track the rollout progress in the firmware history table.",
      },
      {
        q: "What happens if a firmware update fails mid-transfer?",
        a: "The charger will roll back to its previous firmware automatically (if the OEM supports it). GridCharge marks the update as Failed in the rollout history. You can retry from the Firmware tab or raise a support ticket if the station becomes unresponsive.",
      },
    ],
  },
];

// ─── Search helper ────────────────────────────────────────────────────────────

function matchesSearch(query: string, item: FaqItem): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
  );
}

// ─── FAQ item (accessible <details>/<summary>) ────────────────────────────────

function FaqDisclosure({ item }: { item: FaqItem }) {
  return (
    <details className="group border-t border-border first:border-0">
      <summary className="flex cursor-pointer items-start justify-between gap-3 py-3 font-body text-[13px] font-medium text-foreground hover:text-primary transition-colors duration-150 ease-out list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-card rounded-sm">
        <span>{item.q}</span>
        <span
          aria-hidden="true"
          className="mt-px shrink-0 font-mono text-[16px] leading-none text-muted-foreground group-open:rotate-45 transition-transform duration-150 ease-out"
        >
          +
        </span>
      </summary>
      <p className="pb-4 pt-0.5 font-body text-[13px] leading-relaxed text-muted-foreground">
        {item.a}
      </p>
    </details>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────

function CategoryCard({
  category,
  query,
}: {
  category: FaqCategory;
  query: string;
}) {
  const visible = category.items.filter((i) => matchesSearch(query, i));
  if (query && visible.length === 0) return null;

  return (
    <section
      aria-labelledby={`faq-cat-${category.id}`}
      className="rounded-card border border-border bg-card px-5 py-4 flex flex-col gap-1"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-muted-foreground">{category.icon}</span>
        <h3
          id={`faq-cat-${category.id}`}
          className="font-body text-[13px] font-semibold text-foreground"
        >
          {category.title}
        </h3>
      </div>
      {(query ? visible : category.items).map((item) => (
        <FaqDisclosure key={item.q} item={item} />
      ))}
    </section>
  );
}

// ─── Contact support card ─────────────────────────────────────────────────────

function ContactCard() {
  return (
    <section
      aria-labelledby="contact-support-heading"
      className="rounded-card border border-border bg-card px-6 py-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
        {/* Heading + SLA */}
        <div className="flex-1 min-w-0">
          <h2
            id="contact-support-heading"
            className="font-body text-[15px] font-semibold text-foreground mb-1"
          >
            Contact support
          </h2>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-success/10 px-2.5 py-1 mb-3">
            <Clock size={11} className="text-success" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-success">
              Response within 2 hours business
            </span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground leading-relaxed">
            Our support team is available Monday to Saturday, 9 am to 7 pm IST. For
            critical station outages, 24x7 on-call escalation is available on the
            phone line.
          </p>
        </div>

        {/* Contact channels */}
        <div className="flex flex-col gap-3 shrink-0">
          <a
            href="mailto:support@gridpower.in"
            className="inline-flex items-center gap-2 font-body text-[13px] text-foreground hover:text-primary transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Mail size={14} aria-hidden="true" className="text-muted-foreground" />
            support@gridpower.in
          </a>
          <a
            href="tel:+918001234567"
            className="inline-flex items-center gap-2 font-body text-[13px] text-foreground hover:text-primary transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Phone size={14} aria-hidden="true" className="text-muted-foreground" />
            +91 800 123 4567
          </a>
          <a
            href="https://gridpower.canny.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ExternalLink size={12} aria-hidden="true" />
            Request a feature
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Help page ────────────────────────────────────────────────────────────────

export default function Help() {
  const [query, setQuery] = React.useState("");

  const totalFaqs = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

  const visibleCount = React.useMemo(() => {
    if (!query) return totalFaqs;
    return FAQ_CATEGORIES.reduce(
      (n, c) => n + c.items.filter((i) => matchesSearch(query, i)).length,
      0
    );
  }, [query, totalFaqs]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="sr-only">Help centre</h2>

      {/* Search bar */}
      <section aria-labelledby="help-search-heading" className="flex flex-col gap-2">
        <span id="help-search-heading" className="sr-only">
          Search help articles
        </span>
        <div className="relative">
          <label htmlFor="help-search" className="sr-only">
            Search help articles
          </label>
          <Search
            size={15}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            id="help-search"
            type="search"
            placeholder="Search questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-input border border-border bg-secondary pl-10 pr-4 py-2.5 font-body text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-150 ease-out"
          />
        </div>
        {query && (
          <p
            role="status"
            aria-live="polite"
            className="font-mono text-[11px] text-muted-foreground"
          >
            {visibleCount === 0
              ? "No articles match your search."
              : `${visibleCount} article${visibleCount === 1 ? "" : "s"} found`}
          </p>
        )}
      </section>

      {/* FAQ category grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FAQ_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} query={query} />
        ))}
        {query && visibleCount === 0 && (
          <div
            role="status"
            className="col-span-full rounded-card border border-border bg-card px-6 py-12 flex flex-col items-center text-center gap-2"
          >
            <p className="font-body text-[14px] font-semibold text-foreground">
              No articles found for "{query}"
            </p>
            <p className="font-body text-[13px] text-muted-foreground">
              Try different keywords or contact support below.
            </p>
          </div>
        )}
      </div>

      {/* Contact support */}
      <ContactCard />
    </div>
  );
}
