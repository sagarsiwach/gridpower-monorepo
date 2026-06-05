import type { MetaFunction } from "react-router";
import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalList,
  type TocItem,
} from "../../components/legal/LegalLayout";

export const meta: MetaFunction = () => [
  { title: "Disclaimer — GridEnergy" },
  { name: "description", content: "Product, calculation, and information disclaimer for GridEnergy." },
];

const TOC: TocItem[] = [
  { id: "general", label: "General information" },
  { id: "estimates", label: "Estimates and calculations" },
  { id: "savings", label: "Savings, payback and ROI" },
  { id: "subsidies", label: "Subsidies and incentives" },
  { id: "product", label: "Product specifications" },
  { id: "solar", label: "Solar and third-party equipment" },
  { id: "availability", label: "Availability and pricing" },
  { id: "liability", label: "No liability for reliance" },
  { id: "contact", label: "Contact" },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout
      kicker="Legal · Disclaimer"
      title="Disclaimer"
      subtitle="This disclaimer governs the information, estimates, and figures presented on this website. Read it alongside our Terms of Service and Privacy Policy."
      toc={TOC}
    >
      <LegalSection id="general" number="01" title="General information">
        <LegalP>
          The content on this website is provided for general information about GridEnergy products, the GridOS platform, and related services. It does not constitute a binding offer, a technical specification, or professional engineering, financial, or legal advice.
        </LegalP>
        <LegalP>
          GridEnergy is a brand of DeltaEV Mobility Private Limited. [Placeholder — confirm registered office, CIN, and GST details before publication.]
        </LegalP>
      </LegalSection>

      <LegalSection id="estimates" number="02" title="Estimates and calculations">
        <LegalP>
          Any sizing, capacity, runtime, or load figure shown on this site is an indicative estimate. Actual results depend on your site conditions, load profile, tariff, usage pattern, ambient temperature, and installation specifics, and will be confirmed only after a site survey and a formal proposal.
        </LegalP>
        <LegalList
          items={[
            "Figures shown in calculators or illustrations are examples, not guarantees.",
            "A binding system design and quotation is issued only after a site survey.",
            "[Placeholder — list the assumptions behind any default calculator inputs once finalised.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="savings" number="03" title="Savings, payback and ROI">
        <LegalP>
          Statements about bill savings, payback period, internal rate of return, or diesel offset are projections based on assumptions that may not match your situation. They are not promises of financial outcome.
        </LegalP>
        <LegalP>
          [Placeholder — no payback, ROI, or savings figure may be published until the underlying model is calculated and source-backed. This section must be reviewed before any number goes live.]
        </LegalP>
      </LegalSection>

      <LegalSection id="subsidies" number="04" title="Subsidies and incentives">
        <LegalP>
          References to government subsidies, schemes, or incentives (including rooftop solar programmes) are for general guidance only. Eligibility, amounts, and availability are set by the relevant authority and change over time.
        </LegalP>
        <LegalList
          items={[
            "We do not guarantee eligibility for, or disbursement of, any subsidy.",
            "Scheme names, amounts, and conditions must be verified with the issuing authority.",
            "[Placeholder — cite the specific scheme, authority, and effective date for every subsidy claim before publishing.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="product" number="05" title="Product specifications">
        <LegalP>
          Product names, capacities, and specifications for the Nano, Micro, Mega, and Giga families are subject to change as products are finalised. Capacity ranges shown are indicative.
        </LegalP>
        <LegalP>
          [Placeholder — exact electrical specifications, certifications, and datasheet values pending verification. Do not represent specific certified ratings until confirmed.]
        </LegalP>
      </LegalSection>

      <LegalSection id="solar" number="06" title="Solar and third-party equipment">
        <LegalP>
          GridEnergy storage systems are designed to work with existing solar and can be paired with solar through partners. Compatibility with any specific solar inverter, panel, or third-party device is confirmed on a case-by-case basis during the site survey.
        </LegalP>
        <LegalP>
          We do not represent that we manufacture or directly sell solar panels as a core product unless explicitly stated in a signed proposal.
        </LegalP>
      </LegalSection>

      <LegalSection id="availability" number="07" title="Availability and pricing">
        <LegalP>
          Product availability, lead times, service coverage, and pricing vary by location and over time and are confirmed only in a written quotation. Nothing on this site is a firm offer capable of acceptance.
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — define serviceable geographies before claiming availability.]",
            "Prices, where shown, exclude applicable taxes unless stated otherwise.",
          ]}
        />
      </LegalSection>

      <LegalSection id="liability" number="08" title="No liability for reliance">
        <LegalP>
          To the maximum extent permitted by law, GridEnergy and DeltaEV Mobility Private Limited accept no liability for any decision made, or action taken, in reliance on the indicative information on this website. Always confirm details in writing before committing.
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" number="09" title="Contact">
        <LegalP>For questions about this disclaimer, contact us at:</LegalP>
        <LegalList
          items={[
            "DeltaEV Mobility Private Limited [Placeholder — confirm legal name format]",
            "[Placeholder — registered address, Verna, Goa]",
            "[Placeholder — contact email, e.g. hello@gridenergy.co.in]",
          ]}
        />
        <LegalP>
          [Placeholder — effective date and version to be added before publication. This disclaimer is in draft and not in force.]
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
