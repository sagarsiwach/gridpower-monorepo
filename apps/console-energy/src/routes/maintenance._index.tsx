/**
 * Maintenance work orders list — /maintenance
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Plus, Search } from "lucide-react";
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gridpower/ui";
import { ALL_WORK_ORDERS, type WoPriority, type WoStatus } from "~/mocks/maintenance";

function PriorityPill({ priority }: { priority: WoPriority }) {
  const map: Record<WoPriority, { bg: string; text: string }> = {
    critical: { bg: "bg-error/10",   text: "text-error"   },
    high:     { bg: "bg-warning/10", text: "text-warning" },
    medium:   { bg: "bg-muted",      text: "text-muted-foreground" },
    low:      { bg: "bg-muted",      text: "text-muted-foreground" },
  };
  const s = map[priority];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>{priority}</span>
  );
}

function StatusPill({ status }: { status: WoStatus }) {
  const map: Record<WoStatus, { bg: string; text: string }> = {
    open:        { bg: "bg-info/10",    text: "text-info"              },
    "in-progress":{ bg: "bg-primary/10", text: "text-primary"          },
    completed:   { bg: "bg-success/10", text: "text-success"           },
    cancelled:   { bg: "bg-muted",      text: "text-muted-foreground"  },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>
      {status.replace("-"," ")}
    </span>
  );
}

export default function MaintenanceIndex() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<WoStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = React.useState<WoPriority | "all">("all");
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    let list = ALL_WORK_ORDERS;
    if (statusFilter !== "all")   list = list.filter(w => w.status === statusFilter);
    if (priorityFilter !== "all") list = list.filter(w => w.priority === priorityFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(w => w.id.toLowerCase().includes(q) || w.title.toLowerCase().includes(q) || w.siteName.toLowerCase().includes(q));
    }
    return list;
  }, [statusFilter, priorityFilter, search]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="maintenance-heading">
      <h2 id="maintenance-heading" className="sr-only">Maintenance Work Orders</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(["all","open","in-progress","completed","cancelled"] as (WoStatus | "all")[]).map(k => (
            <button key={k} type="button" onClick={() => setStatusFilter(k)} aria-pressed={statusFilter === k}
              className={`inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border capitalize ${statusFilter === k ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted"}`}>
              {k === "in-progress" ? "In progress" : k === "all" ? "All" : k}
              <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">
                {k === "all" ? ALL_WORK_ORDERS.length : ALL_WORK_ORDERS.filter(w => w.status === k).length}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value as typeof priorityFilter)}
            className="h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground outline-none cursor-pointer">
            <option value="all">All priorities</option>
            {(["critical","high","medium","low"] as WoPriority[]).map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
          </select>
          <div className="relative">
            <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="wo-search" className="sr-only">Search work orders</label>
            <input id="wo-search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search WOs..."
              className="h-8 w-44 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out" />
          </div>
          <Button size="sm" className="gap-1.5 h-8 rounded-btn font-body text-[12px]" onClick={() => navigate("/maintenance/new")}>
            <Plus size={13} aria-hidden="true" />New WO
          </Button>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card overflow-hidden">
        {/* Loading: skeleton. Empty: "No work orders yet." Error: role="alert". */}
        {filtered.length === 0 ? (
          <div className="px-6 py-14 text-center font-body text-[14px] text-foreground">No work orders match. Clear filters to see all.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[860px]">
              <TableHeader>
                <TableRow>
                  {["WO#","Title","Site","Type","Priority","Status","Assignee","Opened","Due"].map(h => (
                    <TableHead key={h} scope="col" className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</TableHead>
                  ))}
                  <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(wo => (
                  <TableRow key={wo.id} onClick={() => navigate(`/maintenance/${wo.id}`)}
                    className="cursor-pointer border-border hover:bg-muted transition-colors duration-150 ease-out">
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{wo.id}</TableCell>
                    <TableCell className="font-body text-[12px] text-foreground max-w-[180px] truncate">{wo.title}</TableCell>
                    <TableCell className="font-body text-[12px] text-muted-foreground">{wo.siteName.replace(" BESS","")}</TableCell>
                    <TableCell className="font-body text-[12px] text-muted-foreground capitalize">{wo.type}</TableCell>
                    <TableCell><PriorityPill priority={wo.priority} /></TableCell>
                    <TableCell><StatusPill status={wo.status} /></TableCell>
                    <TableCell className="font-body text-[12px] text-muted-foreground">{wo.assignee}</TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{wo.openedAt}</TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{wo.dueDate}</TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => navigate(`/maintenance/${wo.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}
