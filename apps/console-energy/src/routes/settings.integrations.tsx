/**
 * Settings integrations — /settings/integrations
 * Energy-specific: SCADA, weather, SAP, CERC, billing.
 */
import * as React from "react";

const INTEGRATIONS = [
  { id: "scada",    name: "SCADA",            desc: "Industrial control system bridge for BMS telemetry",                 status: "connected",    lastSync: "Just now"     },
  { id: "weather",  name: "Weather API",       desc: "Solar irradiance and temperature forecasting for charge scheduling", status: "connected",    lastSync: "10 min ago"  },
  { id: "sap",      name: "SAP ERP",           desc: "Work order and asset management sync",                               status: "connected",    lastSync: "1h ago"      },
  { id: "cerc",     name: "CERC POSOCO",       desc: "Grid frequency and dispatch reporting to national load despatch",     status: "connected",    lastSync: "5 min ago"   },
  { id: "dr-agg",   name: "DR Aggregator",     desc: "Demand response aggregator API for program dispatch coordination",    status: "connected",    lastSync: "4h ago"      },
  { id: "billing",  name: "Billing System",    desc: "Customer invoice generation and payment tracking",                    status: "connected",    lastSync: "Daily 00:00" },
  { id: "slack",    name: "Slack",             desc: "Critical alert notifications to ops-alerts channel",                 status: "error",        lastSync: "2 days ago"  },
  { id: "ocpi",     name: "OCPI Roaming",      desc: "Open Charge Point Interface for cross-operator BESS sharing",        status: "not-connected",lastSync: "–"           },
  { id: "powerbi",  name: "Power BI",          desc: "Executive dashboards fed from GridEnergy analytics exports",         status: "not-connected",lastSync: "–"           },
] as const;

type IntegrationStatus = typeof INTEGRATIONS[number]["status"];

function StatusDot({ status }: { status: IntegrationStatus }) {
  const map: Record<IntegrationStatus, { dot: string; label: string }> = {
    connected:     { dot: "bg-success", label: "Connected"     },
    error:         { dot: "bg-error",   label: "Error"         },
    "not-connected":{ dot: "bg-muted",  label: "Not connected" },
  };
  const s = map[status];
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} aria-hidden="true" />{s.label}
    </span>
  );
}

export default function SettingsIntegrations() {
  const [notice, setNotice] = React.useState<string | null>(null);

  return (
    <section aria-labelledby="integrations-heading" className="flex flex-col gap-4 max-w-3xl">
      <h2 id="integrations-heading" className="font-body text-[14px] font-semibold text-foreground">Integrations</h2>
      {notice && (
        <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px]">{notice}</div>
      )}
      {/* Loading: skeleton grid. Empty: not applicable. Error: role="alert". */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INTEGRATIONS.map(int => (
          <div key={int.id} className="rounded-card border border-border bg-card p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-body text-[13px] font-semibold text-foreground">{int.name}</span>
              <StatusDot status={int.status} />
            </div>
            <p className="font-body text-[12px] text-muted-foreground leading-snug">{int.desc}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-[10px] text-muted-foreground">Last sync: {int.lastSync}</span>
              <button type="button" onClick={() => setNotice(`${int.name} configure dialog coming soon.`)}
                className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">
                {int.status === "not-connected" ? "Connect" : "Configure"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
