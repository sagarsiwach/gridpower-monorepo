/**
 * BESS Sites list — /sites
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Search, Plus, ArrowUpDown, ArrowUp, ArrowDown, Download, X } from "lucide-react";
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, cn } from "@gridpower/ui";
import { ALL_SITES, type BessSite, type SiteStatus } from "~/mocks/sites";

type FilterKey = "all" | SiteStatus;
type SortKey = "name" | "capacityMwh" | "soc" | "status" | "uptime";
type SortDir = "asc" | "desc";
const FILTER_KEYS: FilterKey[] = ["all", "online", "offline", "maintenance", "commissioning"];

function StatusPill({ status }: { status: SiteStatus }) {
  const map: Record<SiteStatus, { bg: string; text: string; label: string }> = {
    online:        { bg: "bg-success/10", text: "text-success", label: "Online"        },
    offline:       { bg: "bg-error/10",   text: "text-error",   label: "Offline"       },
    maintenance:   { bg: "bg-warning/10", text: "text-warning", label: "Maintenance"   },
    commissioning: { bg: "bg-info/10",    text: "text-info",    label: "Commissioning" },
  };
  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${s.bg} ${s.text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{s.label}
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

function getVal(s: BessSite, key: SortKey): string | number {
  if (key === "name")        return s.name;
  if (key === "capacityMwh") return s.capacityMwh;
  if (key === "soc")         return s.soc;
  if (key === "status")      return s.status;
  if (key === "uptime")      return s.uptime;
  return "";
}

export default function SitesIndex() {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState<FilterKey>("all");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState<{ key: SortKey; dir: SortDir }>({ key: "name", dir: "asc" });

  const counts = React.useMemo(() => ({
    all: ALL_SITES.length,
    online: ALL_SITES.filter(s => s.status === "online").length,
    offline: ALL_SITES.filter(s => s.status === "offline").length,
    maintenance: ALL_SITES.filter(s => s.status === "maintenance").length,
    commissioning: ALL_SITES.filter(s => s.status === "commissioning").length,
  }), []);

  const filtered = React.useMemo(() => {
    let list = ALL_SITES;
    if (filter !== "all") list = list.filter(s => s.status === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q));
    }
    return [...list].sort((a, b) => {
      const va = getVal(a, sort.key), vb = getVal(b, sort.key);
      const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filter, search, sort]);

  const handleSort = (key: SortKey) => setSort(prev => prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });

  return (
    <section className="flex flex-col gap-4" aria-labelledby="sites-heading">
      <h2 id="sites-heading" className="sr-only">BESS Sites</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap" role="group" aria-label="Filter by status">
          {FILTER_KEYS.map(key => (
            <button key={key} type="button" onClick={() => setFilter(key)} aria-pressed={filter === key}
              className={cn("inline-flex items-center gap-1.5 rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                filter === key ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted")}>
              <span className="capitalize">{key}</span>
              <span className={cn("font-mono text-[10px]", filter === key ? "text-primary" : "text-muted-foreground")}>{counts[key]}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={12} aria-hidden="true" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="sites-search" className="sr-only">Search sites</label>
            <input id="sites-search" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search sites..."
              className="h-8 w-48 rounded-pill pl-7 pr-3 font-body text-[12px] outline-none bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/20 transition-[box-shadow,border-color] duration-150 ease-out" />
          </div>
          <Button size="sm" className="gap-1.5 h-8 rounded-btn font-body text-[12px]"><Plus size={13} aria-hidden="true" />Add site</Button>
        </div>
      </div>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground" aria-live="polite">{filtered.length} site{filtered.length !== 1 ? "s" : ""}</span>
          <button type="button" className="inline-flex items-center gap-1 rounded border border-border bg-transparent px-2.5 py-1 font-body text-[11px] text-muted-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out">
            <Download size={11} aria-hidden="true" /> Export
          </button>
        </div>
        {/* Loading: aria-busy skeleton. Empty: prompt to add first site. Error: role="alert" + retry. */}
        {filtered.length === 0 ? (
          <div className="px-6 py-14 flex flex-col items-center text-center gap-3">
            <p className="font-body text-[14px] font-semibold text-foreground">
              {search || filter !== "all" ? "No sites match — try clearing filters." : "No sites yet. Add your first BESS site to start monitoring."}
            </p>
            {(search || filter !== "all") && (
              <button type="button" onClick={() => { setFilter("all"); setSearch(""); }}
                className="inline-flex items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 py-1.5 font-body text-[12px] text-foreground hover:bg-muted cursor-pointer transition-colors duration-150 ease-out">
                <X size={11} aria-hidden="true" />Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-[820px]">
              <TableHeader>
                <TableRow>
                  <SortHead label="Site"     col="name"        sort={sort} onSort={handleSort} />
                  <SortHead label="Capacity" col="capacityMwh" sort={sort} onSort={handleSort} />
                  <SortHead label="SoC"      col="soc"         sort={sort} onSort={handleSort} />
                  <SortHead label="Status"   col="status"      sort={sort} onSort={handleSort} />
                  <SortHead label="Uptime"   col="uptime"      sort={sort} onSort={handleSort} />
                  <TableHead scope="col" className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal">Last seen</TableHead>
                  <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(site => (
                  <TableRow key={site.id} onClick={() => navigate(`/sites/${site.id}`)}
                    className="cursor-pointer border-border hover:bg-muted transition-colors duration-150 ease-out">
                    <TableCell>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-body text-[13px] font-medium text-foreground">{site.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">{site.city}, {site.state}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-[12px] text-foreground">{site.capacityMwh} MWh</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-10 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={site.soc} aria-valuemin={0} aria-valuemax={100}>
                          <div className="h-full rounded-full bg-info" style={{ width: `${site.soc}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">{site.soc}%</span>
                      </div>
                    </TableCell>
                    <TableCell><StatusPill status={site.status} /></TableCell>
                    <TableCell className="font-mono text-[11px] text-foreground">{site.uptime > 0 ? `${site.uptime}%` : "–"}</TableCell>
                    <TableCell className="font-mono text-[11px] text-muted-foreground">{site.lastSeen}</TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      <button type="button" onClick={() => navigate(`/sites/${site.id}`)}
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
