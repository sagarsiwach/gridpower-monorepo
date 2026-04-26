/**
 * DR programs list — /demand-response/programs
 */
import { useNavigate } from "react-router";
import { ALL_DR_PROGRAMS } from "~/mocks/demand-response";

export default function DemandResponsePrograms() {
  const navigate = useNavigate();
  return (
    <section aria-labelledby="dr-programs-heading" className="flex flex-col gap-4">
      <h2 id="dr-programs-heading" className="font-body text-[16px] font-semibold text-foreground">Programs</h2>
      {/* Loading: skeleton. Empty: "Enroll in a DR program." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full" aria-label="Demand response programs">
            <caption className="sr-only">DR programs this operator is enrolled in</caption>
            <thead>
              <tr className="border-b border-border bg-muted">
                {["Program","Utility","Type","Dispatch cap","Sites enrolled","Season","Status"].map(h => (
                  <th key={h} scope="col" className="px-4 py-2.5 text-left font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_DR_PROGRAMS.map(prg => (
                <tr key={prg.id} className="border-b border-border last:border-0 hover:bg-muted transition-colors duration-100">
                  <td className="px-4 py-2.5">
                    <div className="font-body text-[13px] font-medium text-foreground">{prg.name}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{prg.id}</div>
                  </td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground">{prg.utility}</td>
                  <td className="px-4 py-2.5 font-body text-[12px] text-muted-foreground capitalize">{prg.type.replace("-"," ")}</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-primary">{prg.dispatchCapMw} MW</td>
                  <td className="px-4 py-2.5 font-mono text-[12px] text-foreground">{prg.sitesEnrolled}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">{prg.seasonStart}–{prg.seasonEnd}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${prg.status === "active" ? "bg-success/10 text-success" : prg.status === "testing" ? "bg-info/10 text-info" : "bg-muted text-muted-foreground"}`}>
                      {prg.status}
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
