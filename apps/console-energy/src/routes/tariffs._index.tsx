/**
 * Tariffs list — /tariffs
 */
import * as React from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@gridpower/ui";
import { ALL_TARIFFS } from "~/mocks/tariffs";

export default function TariffsIndex() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col gap-4" aria-labelledby="tariffs-heading">
      <h2 id="tariffs-heading" className="sr-only">Tariff Plans</h2>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-body text-[16px] font-semibold text-foreground">Tariff plans</h3>
          <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{ALL_TARIFFS.filter(t => t.status === "active").length} active · {ALL_TARIFFS.length} total</p>
        </div>
        <Button size="sm" className="gap-1.5 h-8 rounded-btn font-body text-[12px]">
          <Plus size={13} aria-hidden="true" />New tariff
        </Button>
      </div>

      {/* Loading: skeleton rows. Empty: "Create your first tariff plan." Error: role="alert" + retry. */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {["Plan name","Region","Utility","Type","Rate summary","Sites","Period","Status"].map(h => (
                  <TableHead key={h} scope="col" className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</TableHead>
                ))}
                <TableHead scope="col"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ALL_TARIFFS.map(tar => (
                <TableRow key={tar.id} onClick={() => navigate(`/tariffs/${tar.id}`)}
                  className="cursor-pointer border-border hover:bg-muted transition-colors duration-150 ease-out">
                  <TableCell>
                    <div className="font-body text-[13px] font-medium text-foreground">{tar.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{tar.id}</div>
                  </TableCell>
                  <TableCell className="font-body text-[12px] text-muted-foreground">{tar.region}</TableCell>
                  <TableCell className="font-body text-[12px] text-muted-foreground">{tar.utility}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground capitalize">{tar.type}</span>
                  </TableCell>
                  <TableCell className="font-body text-[12px] text-muted-foreground">
                    {tar.slots.length > 0 ? `₹${tar.slots[0].ratePerKwh}/kWh peak` : "–"}
                  </TableCell>
                  <TableCell className="font-mono text-[12px] text-foreground">{tar.sitesAssigned}</TableCell>
                  <TableCell className="font-mono text-[11px] text-muted-foreground whitespace-nowrap">{tar.activePeriod}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${tar.status === "active" ? "bg-success/10 text-success" : tar.status === "expired" ? "bg-error/10 text-error" : "bg-info/10 text-info"}`}>
                      {tar.status}
                    </span>
                  </TableCell>
                  <TableCell onClick={e => e.stopPropagation()}>
                    <button type="button" onClick={() => navigate(`/tariffs/${tar.id}`)} className="font-body text-[11px] text-primary hover:underline cursor-pointer bg-transparent border-none p-0">View</button>
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
