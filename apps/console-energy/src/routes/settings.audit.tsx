/**
 * Settings audit log — /settings/audit
 */
import * as React from "react";
import { Search } from "lucide-react";
import { AUDIT_LOG } from "~/mocks/settings";

export default function SettingsAudit() {
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!search.trim()) return AUDIT_LOG;
    const q = search.trim().toLowerCase();
    return AUDIT_LOG.filter(e => e.actor.toLowerCase().includes(q) || e.action.toLowerCase().includes(q) || e.resource.toLowerCase().includes(q));
  }, [search]);

  return (
    <section aria-labelledby="audit-heading" className="flex flex-col gap-4 max-w-4xl">
      <div className="flex items-center justify-between gap-3">
        <h2 id="audit-heading" className="font-body text-[14px] font-semibold text-foreground">Audit log</h2>
        <div className="relative">
          <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="audit-search" className="sr-only">Search audit log</label>
          <input id="audit-search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
            className="h-8 w-44 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out" />
        </div>
      </div>
      {/* Loading: skeleton. Empty: "No audit entries match." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Security and activity audit log">
            <caption className="sr-only">Audit trail of user and system actions</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Time","Actor","Action","Resource","IP","Result"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(entry => (
                <tr key={entry.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{entry.timestamp}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-body text-[12px] text-foreground">{entry.actor}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{entry.actorEmail}</div>
                  </td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-foreground">{entry.action}</td>
                  <td className="px-4 py-2.5">
                    <div className="font-body text-[12px] text-muted-foreground">{entry.resource}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{entry.resourceId}</div>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{entry.ip}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${entry.result === "success" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                      {entry.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
