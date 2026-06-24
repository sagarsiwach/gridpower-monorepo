/**
 * Tariff detail — /tariffs/:tariffId
 */
import * as React from "react";
import { useParams } from "react-router";
import { ALL_TARIFFS } from "~/mocks/tariffs";
import { ALL_SITES } from "~/mocks/sites";

function MetaField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export default function TariffDetail() {
  const { tariffId } = useParams<{ tariffId: string }>();
  const tar = ALL_TARIFFS.find(t => t.id === tariffId);

  if (!tar) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Tariff "{tariffId}" not found. <a href="/tariffs" className="text-primary hover:underline">Back to tariffs</a>
      </div>
    );
  }

  const assignedSites = ALL_SITES.slice(0, tar.sitesAssigned);

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{tar.name}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${tar.status === "active" ? "bg-success/10 text-success" : tar.status === "expired" ? "bg-error/10 text-error" : "bg-info/10 text-info"}`}>
              {tar.status}
            </span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{tar.utility} · {tar.region} · {tar.activePeriod}</p>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <MetaField label="Region"   value={tar.region}                  />
        <MetaField label="Utility"  value={tar.utility}                 />
        <MetaField label="Type"     value={tar.type}                    />
        <MetaField label="Period"   value={tar.activePeriod}            />
        <MetaField label="Sites assigned" value={tar.sitesAssigned}    />
        <MetaField label="Slot count"     value={tar.slots.length}      />
      </div>

      {/* TOU slot table */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="font-body text-[13px] font-semibold text-foreground">Time-of-use slots</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Tariff time-of-use slots">
            <caption className="sr-only">Rate bands for this tariff</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Band","Hours","Days","Rate (₹/kWh)"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tar.slots.map((slot, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-body text-[13px] font-medium text-foreground">{slot.label}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">{slot.hours}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted-foreground">{slot.days}</td>
                  <td className="px-4 py-2.5 font-mono text-[14px] font-semibold text-primary">₹{slot.ratePerKwh.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assigned sites */}
      {assignedSites.length > 0 && (
        <div className="rounded-card border border-border bg-card p-5">
          <h3 className="font-body text-[13px] font-semibold text-foreground mb-3">Assigned sites ({tar.sitesAssigned})</h3>
          <div className="flex flex-col gap-2">
            {assignedSites.map(site => (
              <div key={site.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="font-body text-[13px] text-foreground">{site.name}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{site.city}, {site.state}</div>
                </div>
                <a href={`/sites/${site.id}`} className="font-body text-[11px] text-primary hover:underline">View site</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
