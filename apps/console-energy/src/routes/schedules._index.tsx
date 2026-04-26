/**
 * Schedules list — /schedules
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Download } from "lucide-react";
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gridpower/ui";
import { ALL_SCHEDULES, type ScheduleStatus } from "~/mocks/schedules";

function StatusPill({ status }: { status: ScheduleStatus }) {
  const map: Record<ScheduleStatus, { bg: string; text: string }> = {
    active:    { bg: "bg-success/10", text: "text-success" },
    paused:    { bg: "bg-warning/10", text: "text-warning" },
    completed: { bg: "bg-muted",      text: "text-muted-foreground" },
    draft:     { bg: "bg-info/10",    text: "text-info" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>
      {status}
    </span>
  );
}

export default function SchedulesIndex() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<"all" | ScheduleStatus>("all");
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    let list = ALL_SCHEDULES;
    if (filter !== "all") list = list.filter(s => s.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.siteName.toLowerCase().includes(q));
    }
    return list;
  }, [filter, search]);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="schedules-heading">
      <h2 id="schedules-heading" className="sr-only">Discharge Schedules</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter by status">
          {(["all","active","paused","completed","draft"] as const).map(key => (
            <button key={key} type="button" onClick={() => setFilter(key)} aria-pressed={filter === key}
              className={`inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border capitalize ${filter === key ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted"}`}>
              {key}
              <span className="font-mono text-[10px] text-muted-foreground">
                {key === "all" ? ALL_SCHEDULES.length : ALL_SCHEDULES.filter(s => s.status === key).length}
              </span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="sch-search" className="sr-only">Search schedules</label>
            <input id="sch-search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search schedules..."
              className="h-8 w-44 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out" />
          </div>
          <Button size="sm" className="gap-1.5 h-8 rounded-btn font-body text-[12px]" onClick={() => navigate("/schedules/new")}>
            <Plus size={13} aria-hidden="true" />New schedule
          </Button>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" aria-live="polite">{filtered.length} schedule{filtered.length !== 1 ? "s" : ""}</span>
          <button type="button" className="inline-flex items-center gap-1 rounded border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out">
            <Download size={11} aria-hidden="true" /> Export
          </button>
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-14 text-center font-body text-[14px] text-foreground">
            No schedules match. <button type="button" onClick={() => { setFilter("all"); setSearch(""); }} className="text-primary hover:underline">Clear filters</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  {["Name","Site","Type","Window","Target","Status","Next run","Executions"].map(h => (
                    <TableHead key={h} scope="col" className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">{h}</TableHead>
                  ))}
                  <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(sch => (
                  <TableRow key={sch.id} onClick={() => navigate(`/schedules/${sch.id}`)}
                    className="cursor-pointer border-border hover:bg-muted transition-colors duration-150 ease-out">
                    <TableCell>
                      <div className="font-body text-[13px] font-medium text-foreground">{sch.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{sch.id}</div>
                    </TableCell>
                    <TableCell className="font-body text-[12px] text-muted-foreground">{sch.siteName.replace(" BESS","")}</TableCell>
                    <TableCell className="font-body text-[12px] text-muted-foreground capitalize">{sch.type.replace("-"," ")}</TableCell>
                    <TableCell className="font-mono text-[11px] text-foreground">{sch.windowStart}–{sch.windowEnd}</TableCell>
                    <TableCell className="font-mono text-[12px] text-primary">{sch.targetMw} MW</TableCell>
                    <TableCell><StatusPill status={sch.status} /></TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{sch.nextRun}</TableCell>
                    <TableCell className="font-mono text-[12px] text-foreground">{sch.executionCount}</TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => navigate(`/schedules/${sch.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
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
