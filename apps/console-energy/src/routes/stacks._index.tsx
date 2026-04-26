/**
 * Stacks list — /stacks
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn } from "@gridpower/ui";
import { ALL_STACKS, type BessStack, type StackStatus } from "~/mocks/stacks";

type FilterStatus = "all" | StackStatus;
type SortKey = "id" | "manufacturer" | "capacityKwh" | "soh" | "soc" | "cycles" | "status";
type SortDir = "asc" | "desc";
const STATUS_FILTERS: FilterStatus[] = ["all", "online", "offline", "fault", "maintenance"];

function StatusPill({ status }: { status: StackStatus }) {
  const map: Record<StackStatus, { bg: string; text: string }> = {
    online:      { bg: "bg-success/10", text: "text-success" },
    offline:     { bg: "bg-error/10",   text: "text-error"   },
    fault:       { bg: "bg-error/10",   text: "text-error"   },
    maintenance: { bg: "bg-warning/10", text: "text-warning" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${s.bg} ${s.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{status}
    </span>
  );
}

function SortHead({ label, col, sort, onSort }: { label: string; col: SortKey; sort: { key: SortKey; dir: SortDir }; onSort: (k: SortKey) => void }) {
  const isActive = sort.key === col;
  return (
    <TableHead scope="col" className="cursor-pointer select-none" onClick={() => onSort(col)}>
      <button type="button" className="inline-flex items-center gap-1 bg-transparent text-inherit cursor-pointer" onClick={e => { e.stopPropagation(); onSort(col); }}>
        {label}
        {!isActive ? <ArrowUpDown size={10} className="text-muted-foreground" aria-hidden="true" /> :
         sort.dir === "asc" ? <ArrowUp size={10} className="text-primary" aria-hidden="true" /> :
                              <ArrowDown size={10} className="text-primary" aria-hidden="true" />}
      </button>
    </TableHead>
  );
}

function getVal(s: BessStack, key: SortKey): string | number {
  if (key === "id")           return s.id;
  if (key === "manufacturer") return s.manufacturer;
  if (key === "capacityKwh")  return s.capacityKwh;
  if (key === "soh")          return s.soh;
  if (key === "soc")          return s.soc;
  if (key === "cycles")       return s.cycles;
  if (key === "status")       return s.status;
  return "";
}

export default function StacksIndex() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = React.useState<FilterStatus>("all");
  const [filterSite, setFilterSite] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDir }>({ key: "id", dir: "asc" });

  const SITES = React.useMemo(() => {
    const names = new Set(ALL_STACKS.map(s => s.siteName));
    return ["all", ...Array.from(names).sort()];
  }, []);

  const statusCounts = React.useMemo(() => ({
    all: ALL_STACKS.length,
    online: ALL_STACKS.filter(s => s.status === "online").length,
    offline: ALL_STACKS.filter(s => s.status === "offline").length,
    fault: ALL_STACKS.filter(s => s.status === "fault").length,
    maintenance: ALL_STACKS.filter(s => s.status === "maintenance").length,
  }), []);

  const filtered = React.useMemo(() => {
    let list = ALL_STACKS;
    if (filterStatus !== "all")  list = list.filter(s => s.status === filterStatus);
    if (filterSite !== "all")    list = list.filter(s => s.siteName === filterSite);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(s => s.id.toLowerCase().includes(q) || s.manufacturer.toLowerCase().includes(q) || s.siteName.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => {
      const va = getVal(a, sort.key), vb = getVal(b, sort.key);
      const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filterStatus, filterSite, search, sort]);

  const handleSort = (key: SortKey) => setSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  return (
    <section className="flex flex-col gap-4" aria-labelledby="stacks-heading">
      <h2 id="stacks-heading" className="sr-only">Battery Stacks</h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map(key => (
            <button key={key} type="button" onClick={() => setFilterStatus(key)} aria-pressed={filterStatus === key}
              className={cn("inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                filterStatus === key ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted")}>
              <span className="capitalize">{key}</span>
              <span className={cn("font-mono text-[10px]", filterStatus === key ? "text-primary" : "text-muted-foreground")}>{statusCounts[key]}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <label htmlFor="site-filter" className="sr-only">Filter by site</label>
          <select id="site-filter" value={filterSite} onChange={e => setFilterSite(e.target.value)}
            className="h-8 rounded-btn border border-border bg-muted px-2 font-body text-[12px] text-foreground outline-none cursor-pointer">
            {SITES.slice(0, 10).map(s => <option key={s} value={s}>{s === "all" ? "All sites" : s.replace(" BESS", "")}</option>)}
          </select>
          <div className="relative">
            <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="stacks-search" className="sr-only">Search stacks</label>
            <input id="stacks-search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stacks..."
              className="h-8 w-44 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out" />
          </div>
        </div>
      </div>

      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" aria-live="polite">{filtered.length} stack{filtered.length !== 1 ? "s" : ""}</span>
          <button type="button" className="inline-flex items-center gap-1 rounded border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out">
            <Download size={11} aria-hidden="true" /> Export
          </button>
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-14 flex flex-col items-center text-center gap-3">
            <p className="font-body text-[14px] font-semibold text-foreground">No stacks match. Clear filters to see all stacks.</p>
            <button type="button" onClick={() => { setFilterStatus("all"); setFilterSite("all"); setSearch(""); }}
              className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out">
              <X size={11} aria-hidden="true" />Clear filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[920px]">
              <TableHeader>
                <TableRow>
                  <SortHead label="Stack ID"    col="id"           sort={sort} onSort={handleSort} />
                  <TableHead scope="col" className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">Site</TableHead>
                  <SortHead label="Manufacturer" col="manufacturer" sort={sort} onSort={handleSort} />
                  <SortHead label="Capacity"    col="capacityKwh"  sort={sort} onSort={handleSort} />
                  <SortHead label="SoH"         col="soh"          sort={sort} onSort={handleSort} />
                  <SortHead label="SoC"         col="soc"          sort={sort} onSort={handleSort} />
                  <SortHead label="Cycles"      col="cycles"       sort={sort} onSort={handleSort} />
                  <SortHead label="Status"      col="status"       sort={sort} onSort={handleSort} />
                  <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(stk => (
                  <TableRow key={stk.id} onClick={() => navigate(`/stacks/${stk.id}`)}
                    className="cursor-pointer border-border hover:bg-muted transition-colors duration-150 ease-out">
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{stk.id}</TableCell>
                    <TableCell>
                      <div className="font-body text-[12px] text-foreground">{stk.siteName.replace(" BESS","")}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{stk.siteId}</div>
                    </TableCell>
                    <TableCell className="font-body text-[12px] text-foreground">{stk.manufacturer}</TableCell>
                    <TableCell className="font-mono text-[12px] text-foreground">{stk.capacityKwh} kWh</TableCell>
                    <TableCell className="font-mono text-[12px] text-foreground">{stk.soh}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={stk.soc} aria-valuemin={0} aria-valuemax={100}>
                          <div className="h-full rounded-full bg-info" style={{ width: `${stk.soc}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">{stk.soc}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[12px] text-foreground">{stk.cycles}</TableCell>
                    <TableCell><StatusPill status={stk.status} /></TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => navigate(`/stacks/${stk.id}`)}
                        className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
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
