/**
 * Customers list — /customers
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gridpower/ui";
import { ALL_CUSTOMERS, type CustomerStatus, type CustomerSegment } from "~/mocks/customers";

function StatusPill({ status }: { status: CustomerStatus }) {
  const map: Record<CustomerStatus, { bg: string; text: string }> = {
    active:     { bg: "bg-success/10", text: "text-success" },
    inactive:   { bg: "bg-muted",      text: "text-muted-foreground" },
    onboarding: { bg: "bg-info/10",    text: "text-info"    },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>
      {status}
    </span>
  );
}

export default function CustomersIndex() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [segFilter, setSegFilter] = React.useState<CustomerSegment | "all">("all");

  const segments = React.useMemo(() => {
    const s = new Set(ALL_CUSTOMERS.map(c => c.segment));
    return ["all", ...Array.from(s).sort()] as (CustomerSegment | "all")[];
  }, []);

  const filtered = React.useMemo(() => {
    let list = ALL_CUSTOMERS;
    if (segFilter !== "all") list = list.filter(c => c.segment === segFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.tradingName.toLowerCase().includes(q));
    }
    return list;
  }, [search, segFilter]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="customers-heading">
      <h2 id="customers-heading" className="sr-only">C&amp;I Customers</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {segments.map(seg => (
            <button key={seg} type="button" onClick={() => setSegFilter(seg)} aria-pressed={segFilter === seg}
              className={`inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border capitalize ${segFilter === seg ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted"}`}>
              {seg === "all" ? "All segments" : seg.replace("-"," ")}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <label htmlFor="cust-search" className="sr-only">Search customers</label>
          <input id="cust-search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..."
            className="h-8 w-48 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out" />
        </div>
      </div>

      <div className="rounded-card border border-border bg-card overflow-hidden">
        {/* Loading: skeleton. Empty: "No customer accounts yet." Error: role="alert". */}
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow>
                {["Customer","Segment","Sites","MWh contracted","Contract end","Revenue YTD","Status"].map(h => (
                  <TableHead key={h} scope="col" className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</TableHead>
                ))}
                <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(cust => (
                <TableRow key={cust.id} onClick={() => navigate(`/customers/${cust.id}`)}
                  className="cursor-pointer border-border hover:bg-muted transition-colors duration-150 ease-out">
                  <TableCell>
                    <div className="font-body text-[13px] font-medium text-foreground">{cust.tradingName}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{cust.id}</div>
                  </TableCell>
                  <TableCell className="font-body text-[12px] text-muted-foreground capitalize">{cust.segment.replace("-"," ")}</TableCell>
                  <TableCell className="font-mono text-[12px] text-foreground">{cust.sitesCount}</TableCell>
                  <TableCell className="font-mono text-[12px] text-foreground">{cust.contractedMwh} MWh</TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground">{cust.contractEnd}</TableCell>
                  <TableCell className="font-mono text-[12px] text-primary">
                    {cust.revenueYtd > 0 ? `₹${(cust.revenueYtd / 100000).toFixed(1)}L` : "–"}
                  </TableCell>
                  <TableCell><StatusPill status={cust.status} /></TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <button type="button" onClick={() => navigate(`/customers/${cust.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
