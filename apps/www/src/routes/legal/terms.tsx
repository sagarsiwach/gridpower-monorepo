import type { MetaFunction } from "react-router";
import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalList,
  type TocItem,
} from "../../components/legal/LegalLayout";

export const meta: MetaFunction = () => [
  { title: "Terms of Service — GridEnergy" },
  { name: "description", content: "Terms and conditions governing use of GridEnergy products and services." },
];

const TOC: TocItem[] = [
  { id: "acceptance", label: "Acceptance of terms" },
  { id: "services", label: "Description of services" },
  { id: "accounts", label: "Accounts and access" },
  { id: "payment", label: "Payment and billing" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "liability", label: "Limitation of liability" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing law" },
  { id: "contact", label: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      kicker="Legal · Terms"
      title="Terms of Service"
      subtitle="These terms govern your access to and use of GridEnergy products, software, and services. Please read them carefully."
      toc={TOC}
    >
      <LegalSection id="acceptance" number="01" title="Acceptance of terms">
        <LegalP>
          By accessing or using GridEnergy products, websites, or services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use our services.
        </LegalP>
        <LegalP>
          [Placeholder — specify entity name, registration number, and registered address once legal entity is confirmed. These terms are not finalised and are pending legal review.]
        </LegalP>
      </LegalSection>

      <LegalSection id="services" number="02" title="Description of services">
        <LegalP>
          GridEnergy provides energy storage systems, hardware, associated software (GridOS), and related professional services.
        </LegalP>
        <LegalList
          items={[
            "Hardware products including battery energy storage systems for residential and commercial use. [Placeholder — list specific product lines.]",
            "GridOS software platform for monitoring, control, and analytics. [Placeholder — define software scope.]",
            "Installation and commissioning services through authorised partners. [Placeholder — define partner network terms.]",
            "Maintenance, warranty, and SLA services as specified in individual service agreements.",
          ]}
        />
        <LegalP>
          [Placeholder — services available are subject to geographic availability. Do not represent availability in specific jurisdictions without verification.]
        </LegalP>
      </LegalSection>

      <LegalSection id="accounts" number="03" title="Accounts and access">
        <LegalP>
          Certain features of our services require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.
        </LegalP>
        <LegalList
          items={[
            "You must provide accurate and complete information when creating an account.",
            "You must notify us immediately of any unauthorised use of your account.",
            "We reserve the right to suspend or terminate accounts that violate these terms.",
            "[Placeholder — add specific account eligibility requirements e.g. minimum age, business verification.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="payment" number="04" title="Payment and billing">
        <LegalP>
          Pricing for our products and services is set out in the applicable order form or quotation. All prices are exclusive of applicable taxes unless stated otherwise.
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — payment terms: advance percentage, milestone-based billing, or subscription model pending product finalisation.]",
            "[Placeholder — refund and cancellation policy pending legal review.]",
            "[Placeholder — currency, GST applicability, and invoicing details pending CA review.]",
            "Late payments may attract interest at the rate permitted by applicable law. [Placeholder — verify rate.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="intellectual-property" number="05" title="Intellectual property">
        <LegalP>
          All intellectual property rights in the GridEnergy products, software, and content belong to GridEnergy or its licensors. Nothing in these terms grants you any ownership rights.
        </LegalP>
        <LegalList
          items={[
            "GridOS software is licensed, not sold, under the terms of the applicable software license agreement. [Placeholder.]",
            "You may not reverse-engineer, decompile, or disassemble our software except as permitted by law.",
            "GridEnergy trademarks, logos, and brand marks may not be used without prior written consent.",
            "[Placeholder — specify open-source components and their licenses if applicable.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="liability" number="06" title="Limitation of liability">
        <LegalP>
          To the maximum extent permitted by applicable law, GridEnergy shall not be liable for indirect, incidental, consequential, or punitive damages arising out of your use of our services.
        </LegalP>
        <LegalP>
          [Placeholder — liability cap, indemnification, and warranty disclaimer language pending legal drafting. This section is entirely placeholder and must not be relied upon.]
        </LegalP>
      </LegalSection>

      <LegalSection id="termination" number="07" title="Termination">
        <LegalP>
          Either party may terminate the service agreement in accordance with the terms set out in the applicable order form or service agreement.
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — notice period for termination pending legal input.]",
            "[Placeholder — data export and deletion policy upon termination.]",
            "We may suspend or terminate access to services immediately if you breach these terms.",
          ]}
        />
      </LegalSection>

      <LegalSection id="governing-law" number="08" title="Governing law">
        <LegalP>
          [Placeholder — governing jurisdiction, dispute resolution mechanism, and arbitration clause pending legal review. Do not assume Indian law applies without explicit legal confirmation.]
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" number="09" title="Contact">
        <LegalP>
          For questions about these terms, contact us at:
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — company legal name]",
            "[Placeholder — registered address]",
            "[Placeholder — legal contact email, e.g. legal@gridenergy.in]",
          ]}
        />
        <LegalP>
          [Placeholder — effective date and version number to be added before publication. These terms are in draft and not in force.]
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
