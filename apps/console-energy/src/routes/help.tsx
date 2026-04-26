/**
 * Help centre — /help
 */
import * as React from "react";
import { Battery, Calendar, BarChart3, AlertTriangle, Cpu, Code, Search, Phone, Mail, ExternalLink, Clock } from "lucide-react";

interface FaqItem { q: string; a: string; }
interface FaqCategory { id: string; icon: React.ReactNode; title: string; items: FaqItem[]; }

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "quickstart", icon: <Battery size={16} aria-hidden="true" />, title: "Getting Started",
    items: [
      { q: "How do I add a new BESS site?", a: "Navigate to Sites and click Add site. Enter the site name, location, capacity (MWh), and power rating (MW). Connect the site controller using the provided MQTT or Modbus endpoint. The site will appear as Commissioning until it sends its first telemetry heartbeat." },
      { q: "How do I create a discharge schedule?", a: "Go to Schedules and click New schedule. Select the site, choose the schedule type (peak discharge, arbitrage, DR dispatch, or frequency response), set the dispatch window and target MW, and choose days of the week. The schedule becomes active immediately and executes automatically." },
      { q: "How do I acknowledge an alert?", a: "Navigate to Alerts, find the alert, and click View to open the detail page. Click Acknowledge to clear the unread flag and record your name as the acknowledging operator. The alert remains in history for audit purposes." },
      { q: "How do I export energy data?", a: "Go to Analytics, then Exports. Click Schedule recurring export to set up automatic exports by email, or use an existing export row to run it immediately. Formats supported: CSV, Excel, JSON." },
    ],
  },
  {
    id: "operations", icon: <Calendar size={16} aria-hidden="true" />, title: "Operations",
    items: [
      { q: "Why is a site showing as Offline?", a: "Check that the site controller is powered and the network connection is active. Verify the MQTT broker or Modbus RTU address matches what is configured in the site detail. The site sends a heartbeat every 60 seconds — if no heartbeat is received for 5 minutes, the site transitions to Offline. A work order is created automatically." },
      { q: "How do I respond to a frequency response alarm?", a: "Frequency response events are automatic. When grid frequency drops below 49.85 Hz, enrolled BESS sites dispatch immediately without operator action. You can view active events on the Grid events page. The event resolves automatically when frequency returns to normal." },
      { q: "How do I enroll a site in a demand response program?", a: "Go to Demand Response, select Programs, and click on the program to view enrollment requirements. Contact the utility or aggregator with your site IDs and contracted MW capacity. Once enrolled, the program will appear in the site detail under the Schedules tab." },
      { q: "What is SoH and when should I replace a stack?", a: "State of Health (SoH) tracks capacity fade as a percentage of original rated capacity. A stack at 100% SoH is new; 80% SoH is the industry replacement threshold for most C&I applications. The Stacks list shows SoH for all stacks. Plan replacements when any stack falls below 85%." },
    ],
  },
  {
    id: "analytics", icon: <BarChart3 size={16} aria-hidden="true" />, title: "Analytics and Reports",
    items: [
      { q: "How is IRR calculated?", a: "Internal Rate of Return is calculated from the site's total capital expenditure, annual revenue (from all discharge modes), and operating costs per year. The calculation uses a 20-year asset life. You can view per-site IRR under Analytics then ROI." },
      { q: "What is round-trip efficiency?", a: "Round-trip efficiency (RTE) is the ratio of energy discharged to energy charged. For LFP chemistry BESS, typical RTE is 91-93%. It accounts for conversion losses in inverters, BMS overhead, and thermal management. The Energy analytics page shows monthly RTE trends." },
      { q: "How do I generate a CERC compliance report?", a: "Go to Analytics then Exports. Find the CERC POSOCO export and click Run now. The report generates in the Ministry of Power format and is emailed to the registered compliance address within 15 minutes." },
    ],
  },
  {
    id: "alerts", icon: <AlertTriangle size={16} aria-hidden="true" />, title: "Alerts",
    items: [
      { q: "What is the alert SLA for critical events?", a: "Critical alerts (site offline, cell temperature critical, under-frequency event) push a notification within 30 seconds of detection. Email escalation triggers at 5 minutes if unacknowledged. SMS escalation triggers at 15 minutes." },
      { q: "How do I configure alert thresholds?", a: "Alert thresholds are configured per site in the site detail view. Default thresholds: SoC low (30%), SoC high (95%), cell temperature critical (65°C), communication timeout (5 min), grid frequency low (49.85 Hz). Contact support to adjust firmware-level thresholds." },
    ],
  },
  {
    id: "firmware", icon: <Cpu size={16} aria-hidden="true" />, title: "Firmware",
    items: [
      { q: "How do I update stack firmware?", a: "Go to Firmware, then Rollouts, and click Start rollout. Select the target firmware version and choose the sites and stacks to include. The rollout executes one stack at a time to maintain site availability. You can pause and resume a rollout at any time." },
      { q: "What happens if a firmware update fails?", a: "If a stack fails to apply an update, it automatically rolls back to its previous firmware version. The rollout status shows the affected stack as Failed. You can retry the update from the Rollout detail page after investigating the failure." },
    ],
  },
  {
    id: "api", icon: <Code size={16} aria-hidden="true" />, title: "API and Integrations",
    items: [
      { q: "Where are my API credentials?", a: "Go to Settings then API. Click Generate key to create a new key. The secret is shown once — copy it immediately. Keys use Bearer token authentication. Rate limits: 1000 read requests per minute, 120 write requests per minute." },
      { q: "How do I set up webhook notifications?", a: "In Settings then API, scroll to the Webhooks section. Click Add webhook, enter your endpoint URL, and select the event types to receive. Webhooks deliver JSON payloads via HTTP POST. The system retries on failure with exponential backoff for up to 24 hours." },
    ],
  },
];

const SHORTCUTS = [
  { key: "Cmd K",     action: "Open command palette"   },
  { key: "?",         action: "Show shortcuts"          },
  { key: "G D",       action: "Go to Dashboard"         },
  { key: "G S",       action: "Go to Sites"             },
  { key: "G A",       action: "Go to Alerts"            },
  { key: "G E",       action: "Go to Energy flow"       },
  { key: "Esc",       action: "Close dialogs / panels"  },
  { key: "Cmd /",     action: "Focus search"            },
];

function FaqDisclosure({ item }: { item: FaqItem }) {
  return (
    <details className="group border-t border-border first:border-0">
      <summary className="flex cursor-pointer items-start justify-between gap-3 py-3 font-body text-[13px] font-medium text-foreground hover:text-primary transition-colors duration-150 ease-out list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-card rounded-sm">
        <span>{item.q}</span>
        <span aria-hidden="true" className="mt-px shrink-0 font-mono text-[16px] leading-none text-muted-foreground group-open:rotate-45 transition-transform duration-150 ease-out">+</span>
      </summary>
      <p className="pb-4 pt-0.5 font-body text-[13px] leading-relaxed text-muted-foreground">{item.a}</p>
    </details>
  );
}

function matchesSearch(q: string, item: FaqItem) {
  if (!q) return true;
  const ql = q.toLowerCase();
  return item.q.toLowerCase().includes(ql) || item.a.toLowerCase().includes(ql);
}

function CategoryCard({ category, query }: { category: FaqCategory; query: string }) {
  const visible = category.items.filter(i => matchesSearch(query, i));
  if (query && visible.length === 0) return null;
  return (
    <section aria-labelledby={`faq-cat-${category.id}`} className="rounded-card border border-border bg-card px-5 py-4 flex flex-col gap-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-muted-foreground">{category.icon}</span>
        <h3 id={`faq-cat-${category.id}`} className="font-body text-[13px] font-semibold text-foreground">{category.title}</h3>
      </div>
      {(query ? visible : category.items).map(item => <FaqDisclosure key={item.q} item={item} />)}
    </section>
  );
}

export default function Help() {
  const [query, setQuery] = React.useState("");
  const totalFaqs = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
  const visibleCount = React.useMemo(() => {
    if (!query) return totalFaqs;
    return FAQ_CATEGORIES.reduce((n, c) => n + c.items.filter(i => matchesSearch(query, i)).length, 0);
  }, [query, totalFaqs]);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="sr-only">Help centre</h2>

      <section aria-labelledby="help-search-heading" className="flex flex-col gap-2">
        <span id="help-search-heading" className="sr-only">Search help articles</span>
        <div className="relative">
          <label htmlFor="help-search" className="sr-only">Search help articles</label>
          <Search size={15} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input id="help-search" type="search" placeholder="Search questions..." value={query} onChange={e => setQuery(e.target.value)}
            className="w-full rounded-input border border-border bg-secondary pl-10 pr-4 py-2.5 font-body text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-150 ease-out" />
        </div>
        {query && (
          <p role="status" aria-live="polite" className="font-mono text-[11px] text-muted-foreground">
            {visibleCount === 0 ? "No articles match." : `${visibleCount} article${visibleCount === 1 ? "" : "s"} found`}
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FAQ_CATEGORIES.map(cat => <CategoryCard key={cat.id} category={cat} query={query} />)}
      </div>

      {/* Keyboard shortcuts */}
      <section aria-labelledby="shortcuts-heading" className="rounded-card border border-border bg-card p-5">
        <h3 id="shortcuts-heading" className="font-body text-[13px] font-semibold text-foreground mb-3">Keyboard shortcuts</h3>
        <table className="w-full" aria-label="Keyboard shortcuts">
          <caption className="sr-only">Keyboard shortcuts for GridEnergy Console</caption>
          <tbody>
            {SHORTCUTS.map(s => (
              <tr key={s.key} className="border-b border-border last:border-0">
                <td className="py-2 pr-4 w-32">
                  <kbd className="inline-flex items-center rounded-[4px] border border-border bg-muted px-2 py-0.5 font-mono text-[10px]">{s.key}</kbd>
                </td>
                <td className="py-2 font-body text-[12px] text-muted-foreground">{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="rounded-card border border-border bg-card px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
          <div className="flex-1 min-w-0">
            <h2 id="contact-heading" className="font-body text-[15px] font-semibold text-foreground mb-1">Contact support</h2>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-success/10 px-2.5 py-1 mb-3">
              <Clock size={11} className="text-success" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-success">Response within 2 hours (business)</span>
            </div>
            <p className="font-body text-[13px] text-muted-foreground leading-relaxed">Our support team is available Monday to Saturday, 9 am to 7 pm IST. For critical site outages, 24x7 on-call escalation is available on the phone line.</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <a href="mailto:support@gridenergy.co.in" className="inline-flex items-center gap-2 font-body text-[13px] text-foreground hover:text-primary transition-colors duration-150 ease-out">
              <Mail size={14} aria-hidden="true" className="text-muted-foreground" />support@gridenergy.co.in
            </a>
            <a href="tel:+918001234568" className="inline-flex items-center gap-2 font-body text-[13px] text-foreground hover:text-primary transition-colors duration-150 ease-out">
              <Phone size={14} aria-hidden="true" className="text-muted-foreground" />+91 800 123 4568
            </a>
            <a href="https://gridenergy.canny.io" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-body text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150 ease-out">
              <ExternalLink size={12} aria-hidden="true" />Request a feature
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
