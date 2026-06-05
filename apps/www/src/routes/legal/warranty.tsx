import type { MetaFunction } from "react-router";
import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalList,
  type TocItem,
} from "../../components/legal/LegalLayout";

export const meta: MetaFunction = () => [
  { title: "Warranty — GridEnergy" },
  { name: "description", content: "Warranty coverage and terms for GridEnergy storage systems and GridOS." },
];

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "coverage", label: "What is covered" },
  { id: "period", label: "Warranty period" },
  { id: "exclusions", label: "Exclusions" },
  { id: "claims", label: "Making a claim" },
  { id: "software", label: "GridOS software" },
  { id: "solar", label: "Third-party solar and equipment" },
  { id: "contact", label: "Contact" },
];

export default function WarrantyPage() {
  return (
    <LegalLayout
      kicker="Legal · Warranty"
      title="Warranty"
      subtitle="This page summarises the warranty for GridEnergy storage systems. The binding warranty is the document supplied with your signed proposal and installation."
      toc={TOC}
    >
      <LegalSection id="overview" number="01" title="Overview">
        <LegalP>
          GridEnergy storage systems are covered by a limited warranty against defects in materials and workmanship under normal use, installed and commissioned by an authorised partner. The exact terms are set out in the warranty certificate issued with each installation.
        </LegalP>
        <LegalP>
          [Placeholder — this summary is indicative. The legally binding warranty terms, durations, and cycle/throughput figures are pending finalisation and must be confirmed before publication.]
        </LegalP>
      </LegalSection>

      <LegalSection id="coverage" number="02" title="What is covered">
        <LegalList
          items={[
            "Battery modules against manufacturing defect under normal operating conditions.",
            "Integrated power electronics (inverter/converter) against defect in materials and workmanship.",
            "Enclosure and core hardware as supplied by GridEnergy.",
            "[Placeholder — specify covered components, capacity-retention threshold, and any pass-through of cell-manufacturer warranty terms.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="period" number="03" title="Warranty period">
        <LegalP>
          The warranty period runs from the date of commissioning and varies by component and product family.
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — product warranty duration (years) per family: Nano / Micro / Mega / Giga.]",
            "[Placeholder — battery capacity-retention warranty: years and/or equivalent full cycles.]",
            "[Placeholder — power-electronics warranty duration.]",
            "Extended warranty and AMC options may be available. [Placeholder — confirm terms.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="exclusions" number="04" title="Exclusions">
        <LegalP>The warranty does not cover, among other things:</LegalP>
        <LegalList
          items={[
            "Damage from misuse, accident, unauthorised modification, or repair by non-authorised personnel.",
            "Installation not performed or approved by an authorised GridEnergy partner.",
            "Damage from abnormal grid conditions, force majeure, fire, flood, or pest ingress beyond rated protection.",
            "Operation outside the published environmental and electrical limits.",
            "[Placeholder — finalise the full exclusions list with legal review.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="claims" number="05" title="Making a claim">
        <LegalP>
          To raise a warranty claim, contact GridEnergy support or your installing partner with your system ID, installation date, and a description of the issue. Many issues can be diagnosed remotely through GridOS.
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — claim channel: support email / phone / portal.]",
            "[Placeholder — target response and resolution timelines / SLA, once defined.]",
            "Keep your warranty certificate and installation documents for reference.",
          ]}
        />
      </LegalSection>

      <LegalSection id="software" number="06" title="GridOS software">
        <LegalP>
          The GridOS platform is provided under its own software terms. Software is maintained and updated over the service period; the hardware warranty above does not extend warranty obligations to software features.
        </LegalP>
        <LegalP>
          [Placeholder — define GridOS service term, update commitment, and any availability target.]
        </LegalP>
      </LegalSection>

      <LegalSection id="solar" number="07" title="Third-party solar and equipment">
        <LegalP>
          Solar panels, third-party inverters, and other equipment not supplied by GridEnergy are covered by their respective manufacturers' warranties, not by this warranty. GridEnergy's responsibility is limited to the components it supplies.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" number="08" title="Contact">
        <LegalP>For warranty questions or claims, contact us at:</LegalP>
        <LegalList
          items={[
            "DeltaEV Mobility Private Limited [Placeholder — confirm legal name format]",
            "[Placeholder — support email, e.g. support@gridenergy.co.in]",
            "[Placeholder — support phone and hours]",
          ]}
        />
        <LegalP>
          [Placeholder — effective date and version to be added before publication. This warranty summary is in draft and not in force.]
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
