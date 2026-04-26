/**
 * Customer detail — /customers/:customerId
 */
import * as React from "react";
import { useParams } from "react-router";
import { ALL_CUSTOMERS } from "~/mocks/customers";
import { ALL_SITES } from "~/mocks/sites";

function MetaField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

export default function CustomerDetail() {
  const { customerId } = useParams<{ customerId: string }>();
  const cust = ALL_CUSTOMERS.find(c => c.id === customerId);

  if (!cust) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Customer "{customerId}" not found. <a href="/customers" className="text-primary hover:underline">Back to customers</a>
      </div>
    );
  }

  const custSites = ALL_SITES.filter(s => cust.siteIds.includes(s.id));
  const statusColor = cust.status === "active" ? "bg-success/10 text-success" : cust.status === "onboarding" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{cust.tradingName}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${statusColor}`}>{cust.status}</span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{cust.name} · {cust.segment.replace("-"," ")} · {cust.id}</p>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <MetaField label="GSTIN"         value={cust.gstin}                     />
        <MetaField label="Primary contact" value={cust.primaryContact}          />
        <MetaField label="Email"         value={cust.contactEmail}             />
        <MetaField label="Phone"         value={cust.contactPhone}             />
        <MetaField label="Contract start" value={cust.contractStart}           />
        <MetaField label="Contract end"  value={cust.contractEnd}              />
        <MetaField label="Contracted MWh" value={`${cust.contractedMwh} MWh`} />
        <MetaField label="Revenue YTD"   value={cust.revenueYtd > 0 ? `₹${(cust.revenueYtd / 100000).toFixed(1)}L` : "–"} />
        <MetaField label="Outstanding"   value={cust.outstandingBalance > 0 ? `₹${cust.outstandingBalance.toLocaleString("en-IN")}` : "Nil"} />
      </div>

      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[13px] font-semibold text-foreground mb-2">Billing address</h3>
        <p className="font-body text-[13px] text-muted-foreground">{cust.billingAddress}</p>
      </div>

      {custSites.length > 0 && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="font-body text-[13px] font-semibold text-foreground">Sites ({cust.sitesCount})</h3>
          </div>
          {custSites.map(site => (
            <div key={site.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
              <div>
                <div className="font-body text-[13px] font-medium text-foreground">{site.name}</div>
                <div className="font-mono text-[10px] text-muted-foreground">{site.capacityMwh} MWh · {site.city}, {site.state}</div>
              </div>
              <a href={`/sites/${site.id}`} className="font-body text-[11px] text-primary hover:underline">View site</a>
            </div>
          ))}
        </div>
      )}

      {cust.invoices.length > 0 && (
        <div className="rounded-card border border-border bg-card overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border">
            <h3 className="font-body text-[13px] font-semibold text-foreground">Recent invoices</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full" aria-label="Customer invoices">
              <caption className="sr-only">Recent billing invoices</caption>
              <thead>
                <tr className="border-b border-border bg-muted">
                  {["Invoice","Period","Amount","Status","Due date"].map(h => (
                    <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cust.invoices.map(inv => (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                    <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{inv.id}</td>
                    <td className="px-4 py-2.5 font-body text-[12px] text-foreground">{inv.period}</td>
                    <td className="px-4 py-2.5 font-mono text-[12px] font-medium text-foreground">₹{inv.amount.toLocaleString("en-IN")}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${inv.status === "paid" ? "bg-success/10 text-success" : inv.status === "overdue" ? "bg-error/10 text-error" : "bg-info/10 text-info"}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground">{inv.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
