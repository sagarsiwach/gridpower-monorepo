/**
 * Settings billing — /settings/billing
 */
export default function SettingsBilling() {
  return (
    <section aria-labelledby="billing-heading" className="flex flex-col gap-5 max-w-2xl">
      <h2 id="billing-heading" className="sr-only">Billing</h2>
      <div className="rounded-card border border-border bg-card p-5 flex flex-col gap-4">
        <h3 className="font-body text-[13px] font-semibold text-foreground">Current plan</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-body text-[15px] font-semibold text-foreground">GridEnergy Pro</div>
            <div className="font-mono text-[11px] text-muted-foreground">Up to 50 sites · Unlimited stacks · Full DR integration</div>
          </div>
          <span className="inline-flex rounded-full bg-success/10 text-success font-mono text-[10px] px-2.5 py-1">Active</span>
        </div>
        <div className="flex flex-col gap-1.5 border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] text-muted-foreground">Next invoice</span>
            <span className="font-mono text-[12px] text-foreground">May 1, 2025 · ₹2,40,000 + GST</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] text-muted-foreground">Payment method</span>
            <span className="font-mono text-[12px] text-foreground">NEFT · SBI ••••4812</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-[12px] text-muted-foreground">Billing cycle</span>
            <span className="font-mono text-[12px] text-foreground">Monthly · 1st of month</span>
          </div>
        </div>
      </div>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border">
          <h3 className="font-body text-[13px] font-semibold text-foreground">Billing history</h3>
        </div>
        {[
          { period: "Apr 2025", amount: "₹2,40,000", status: "pending",  date: "May 1, 2025"   },
          { period: "Mar 2025", amount: "₹2,40,000", status: "paid",     date: "Apr 1, 2025"   },
          { period: "Feb 2025", amount: "₹2,40,000", status: "paid",     date: "Mar 1, 2025"   },
          { period: "Jan 2025", amount: "₹2,40,000", status: "paid",     date: "Feb 1, 2025"   },
        ].map(inv => (
          <div key={inv.period} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
            <div>
              <div className="font-body text-[13px] text-foreground">{inv.period}</div>
              <div className="font-mono text-[10px] text-muted-foreground">Due {inv.date}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[12px] text-foreground">{inv.amount}</span>
              <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${inv.status === "paid" ? "bg-success/10 text-success" : "bg-info/10 text-info"}`}>{inv.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
