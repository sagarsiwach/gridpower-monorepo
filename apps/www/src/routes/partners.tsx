import type { MetaFunction } from "react-router";
import { Wrench, SunHorizon, Storefront, Handshake, GraduationCap, Headset } from "@phosphor-icons/react";
import {
  PageHero,
  Section,
  SectionHeading,
  CardGrid,
  FeatureCard,
  FeatureRow,
  CTASection,
  Gated,
} from "../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "Partners — GridEnergy" },
  { name: "description", content: "Partner with GridEnergy — installers, solar EPCs, and channel partners." },
];

const PARTNER_TYPES = [
  { icon: Wrench, title: "Installation partners", body: "Certified electricians and EPC teams who survey, install, and commission GridEnergy systems." },
  { icon: SunHorizon, title: "Solar partners", body: "Solar EPCs and rooftop installers who pair storage with new or existing solar." },
  { icon: Storefront, title: "Channel & resellers", body: "Distributors and dealers who take GridEnergy into new regions and segments." },
];

const PARTNER_BENEFITS = [
  "Product and install training, with certification",
  "Co-branded proposals and the GridOS sizing tools",
  "Lead sharing in your service area",
  "Priority technical support and spares access",
];

export default function PartnersPage() {
  return (
    <main>
      <PageHero
        kicker="Partners"
        title="Build the energy transition with us."
        subtitle="GridEnergy works with installers, solar EPCs, and channel partners to bring storage and GridOS to homes and businesses across India."
        primary={{ label: "Become a partner", to: "/contact" }}
        secondary={{ label: "See the products", to: "/products" }}
      />

      <Section>
        <SectionHeading kicker="Who we partner with" title="Three ways to work together." />
        <CardGrid cols={3}>
          {PARTNER_TYPES.map((p) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      <Section alt>
        <FeatureRow
          kicker="What you get"
          title="Everything to sell, install, and support with confidence."
          body="Partners get the training, tools, and backing to deliver GridEnergy systems well — and the software that makes every install a managed, supportable asset."
          bullets={PARTNER_BENEFITS}
          cta={{ label: "Talk to the partnerships team", to: "/contact" }}
        />
      </Section>

      <Section>
        <SectionHeading kicker="How it works" title="From enquiry to first install." />
        <CardGrid cols={4}>
          <FeatureCard icon={Handshake} title="1 · Apply" body="Tell us about your business and service area." />
          <FeatureCard icon={GraduationCap} title="2 · Train" body="Product, install, and GridOS certification." />
          <FeatureCard icon={Wrench} title="3 · Deploy" body="Start surveying and installing in your area." />
          <FeatureCard icon={Headset} title="4 · Support" body="Ongoing tech support, spares, and leads." />
        </CardGrid>
        <p style={{ marginTop: 28, fontSize: 13 }}>
          <Gated note="confirm partner commercial terms, margins, territories before publishing">
            Commercial terms, margins, and territory rules — TBD
          </Gated>
        </p>
      </Section>

      <CTASection
        title="Ready to add storage to what you offer?"
        subtitle="Send a partner enquiry and we'll set up a conversation."
        primary={{ label: "Become a partner", to: "/contact" }}
        secondary={{ label: "Explore GridOS", to: "/platform" }}
      />
    </main>
  );
}
