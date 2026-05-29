import type { MetaFunction } from "react-router";
import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalList,
  type TocItem,
} from "../../components/legal/LegalLayout";

export const meta: MetaFunction = () => [
  { title: "Privacy Policy — GridEnergy" },
  { name: "description", content: "How GridEnergy collects, uses, and protects your personal information." },
];

const TOC: TocItem[] = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use", label: "How we use information" },
  { id: "cookies", label: "Cookies" },
  { id: "sharing", label: "Sharing with third parties" },
  { id: "your-rights", label: "Your rights" },
  { id: "data-retention", label: "Data retention" },
  { id: "security", label: "Security" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      kicker="Legal · Privacy"
      title="Privacy Policy"
      subtitle="This policy describes how GridEnergy collects, uses, and protects your personal information when you use our website and services."
      toc={TOC}
    >
      <LegalSection id="information-we-collect" number="01" title="Information we collect">
        <LegalP>
          We collect information you provide directly to us when you use our services, request a quote, sign up for early access, or contact our team.
        </LegalP>
        <LegalList
          items={[
            "Contact details such as name, email address, phone number, and company name. [Placeholder — verify with legal.]",
            "Installation site details including address, electricity tariff data, and load requirements you submit in our configuration tools. [Placeholder.]",
            "Payment and billing information processed through our payment service provider. [Placeholder — specify provider.]",
            "Communications you send us including support requests and survey responses.",
          ]}
        />
        <LegalP>
          We also collect information automatically when you interact with our website, including IP address, browser type, pages visited, and referring URLs.
        </LegalP>
      </LegalSection>

      <LegalSection id="how-we-use" number="02" title="How we use information">
        <LegalP>
          We use the information we collect to provide, maintain, and improve our services. Specific uses include:
        </LegalP>
        <LegalList
          items={[
            "Processing your enquiries, configuration requests, and early-access applications.",
            "Communicating with you about your account, orders, and service updates.",
            "Sending you marketing communications about GridEnergy products and industry news, where you have opted in. [Placeholder — confirm opt-in mechanism.]",
            "Analysing usage patterns to improve our website and product offerings.",
            "Complying with legal obligations applicable in the jurisdictions where we operate. [Placeholder — list jurisdictions.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="cookies" number="03" title="Cookies">
        <LegalP>
          Our website uses cookies and similar tracking technologies. See our{" "}
          <a href="/cookies" style={{ color: "oklch(0.58 0.245 27)", textDecorationLine: "underline" }}>
            Cookie Policy
          </a>{" "}
          for full details on what we set and how to control them.
        </LegalP>
        <LegalList
          items={[
            "Essential cookies required for the website to function.",
            "Analytics cookies that help us understand how visitors use the site. [Placeholder — list specific tools.]",
            "Marketing cookies used for targeted advertising and remarketing. [Placeholder — confirm use.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="sharing" number="04" title="Sharing with third parties">
        <LegalP>
          We do not sell your personal data. We may share information with trusted service providers who assist us in operating our business.
        </LegalP>
        <LegalList
          items={[
            "Hosting and cloud infrastructure providers. [Placeholder — name providers.]",
            "Payment processors for billing and transaction handling. [Placeholder — name processors.]",
            "Analytics and product-improvement services. [Placeholder — list services.]",
            "Legal and regulatory authorities when required by applicable law. [Placeholder — specify jurisdictions.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="your-rights" number="05" title="Your rights">
        <LegalP>
          Depending on your location, you may have certain rights regarding your personal data. These rights may include:
        </LegalP>
        <LegalList
          items={[
            "The right to access personal data we hold about you.",
            "The right to correct inaccurate or incomplete data.",
            "The right to request deletion of your data, subject to certain legal exceptions.",
            "The right to object to or restrict certain types of processing.",
            "The right to data portability in certain circumstances.",
            "The right to withdraw consent at any time where processing is based on consent.",
          ]}
        />
        <LegalP>
          To exercise any of these rights, contact us using the details in Section 8 below. We will respond within the timeframe required by applicable law.
        </LegalP>
      </LegalSection>

      <LegalSection id="data-retention" number="06" title="Data retention">
        <LegalP>
          We retain personal data for as long as necessary to provide our services and comply with our legal obligations. The specific retention period depends on the type of data and the purpose for which it was collected.
        </LegalP>
        <LegalP>
          [Placeholder — insert specific retention schedule per data category pending legal review. Do not treat the above as a commitment.]
        </LegalP>
      </LegalSection>

      <LegalSection id="security" number="07" title="Security">
        <LegalP>
          We implement technical and organisational measures to protect your personal data against unauthorised access, loss, destruction, or alteration.
        </LegalP>
        <LegalP>
          [Placeholder — describe specific security measures after security audit. Do not list specific tools or certifications without verification.]
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" number="08" title="Contact us">
        <LegalP>
          If you have questions about this policy or want to exercise your rights, contact us at:
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — company legal name pending registration details]",
            "[Placeholder — registered address]",
            "[Placeholder — data protection contact email, e.g. privacy@gridenergy.in]",
            "[Placeholder — grievance officer details as required by applicable law]",
          ]}
        />
        <LegalP>
          [Placeholder — this policy was last updated on [DATE]. GridEnergy reserves the right to update this policy and will notify users via email or site notice.]
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
