import type { MetaFunction } from "react-router";
import {
  LegalLayout,
  LegalSection,
  LegalP,
  LegalList,
  PlaceholderTag,
  type TocItem,
} from "../../components/legal/LegalLayout";

export const meta: MetaFunction = () => [
  { title: "Cookie Policy — GridEnergy" },
  { name: "description", content: "How GridEnergy uses cookies and similar tracking technologies on its website." },
];

const TOC: TocItem[] = [
  { id: "what-are-cookies", label: "What are cookies" },
  { id: "cookies-we-use", label: "Cookies we use" },
  { id: "third-party-cookies", label: "Third-party cookies" },
  { id: "managing-cookies", label: "Managing cookies" },
  { id: "your-choices", label: "Your choices" },
  { id: "contact", label: "Contact" },
];

export default function CookiesPage() {
  return (
    <LegalLayout
      kicker="Legal · Cookies"
      title="Cookie Policy"
      subtitle="This policy explains what cookies are, what we set on the GridEnergy website, and how you can control them."
      toc={TOC}
    >
      <LegalSection id="what-are-cookies" number="01" title="What are cookies">
        <LegalP>
          Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to site owners.
          <PlaceholderTag />
        </LegalP>
        <LegalP>
          Similar technologies such as web beacons, pixel tags, and local storage may also be used in ways described in this policy.
        </LegalP>
      </LegalSection>

      <LegalSection id="cookies-we-use" number="02" title="Cookies we use">
        <LegalP>
          We use cookies in the following categories:
          <PlaceholderTag />
        </LegalP>
        <LegalList
          items={[
            "Strictly necessary cookies — required for the website to function. These cannot be disabled. Examples: session authentication, form security tokens. [Placeholder — list specific cookies with names once technical audit is complete.]",
            "Performance and analytics cookies — help us understand how visitors interact with the site by collecting anonymised usage data. [Placeholder — specify tool, e.g. Google Analytics, Plausible, or PostHog. Add consent requirement if applicable.]",
            "Functional cookies — remember your preferences such as language or region selection. [Placeholder — confirm if used.]",
            "Marketing and advertising cookies — used to track visitors across websites to display relevant advertising. [Placeholder — confirm if used and list ad network cookies. Consent required before setting under applicable law.]",
          ]}
        />
        <LegalP>
          [Placeholder — full cookie audit table (name, provider, purpose, expiry, type) to be added before publication. Contact your developer or use a cookie scanner to generate the table.]
        </LegalP>
      </LegalSection>

      <LegalSection id="third-party-cookies" number="03" title="Third-party cookies">
        <LegalP>
          Some cookies on our website are set by third-party services embedded in our pages. We do not control these cookies; they are governed by the privacy policies of the respective providers.
          <PlaceholderTag />
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — list embedded third-party services, e.g. YouTube, Intercom, HubSpot, Google Maps, once confirmed.]",
            "[Placeholder — specify any remarketing pixels, e.g. Google Ads, Meta Pixel, LinkedIn Insight Tag, once confirmed.]",
          ]}
        />
      </LegalSection>

      <LegalSection id="managing-cookies" number="04" title="Managing cookies">
        <LegalP>
          You can control and manage cookies in several ways:
          <PlaceholderTag />
        </LegalP>
        <LegalList
          items={[
            "Browser settings — most browsers allow you to view, delete, and block cookies. Refer to your browser documentation for instructions.",
            "Our consent banner — [Placeholder — if a cookie consent management platform (CMP) is implemented, describe how to change preferences here.]",
            "Opt-out tools — [Placeholder — link to relevant industry opt-out tools, e.g. NAI or YourAdChoices, if advertising cookies are used.]",
          ]}
        />
        <LegalP>
          Note that disabling certain cookies may affect the functionality of our website.
        </LegalP>
      </LegalSection>

      <LegalSection id="your-choices" number="05" title="Your choices">
        <LegalP>
          Depending on your location, you may have the right to consent to or withdraw consent from non-essential cookies. Where required by law, we will obtain your consent before setting non-essential cookies.
          <PlaceholderTag />
        </LegalP>
        <LegalP>
          [Placeholder — describe the consent banner / CMP implementation once decided. State which legal framework governs: GDPR, India DPDP Act 2023, or other. This section is entirely placeholder pending legal review.]
        </LegalP>
      </LegalSection>

      <LegalSection id="contact" number="06" title="Contact">
        <LegalP>
          If you have questions about our use of cookies, contact us at:
          <PlaceholderTag />
        </LegalP>
        <LegalList
          items={[
            "[Placeholder — company legal name]",
            "[Placeholder — registered address]",
            "[Placeholder — privacy/cookie contact email]",
          ]}
        />
        <LegalP>
          [Placeholder — effective date to be added before publication. This policy is in draft.]
        </LegalP>
      </LegalSection>
    </LegalLayout>
  );
}
