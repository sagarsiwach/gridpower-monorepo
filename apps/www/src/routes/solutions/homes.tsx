import { useEffect } from "react";
import { setMegamenuTheme, useMegamenuTheme } from "../_preview/_v3-tokens";
import SiteHeader from "../../components/site/SiteHeader";
import MobileSiteNav from "../../components/site/MobileSiteNav";
import HeroB from "../../components/solutions/hero/HeroB";
import OutcomeTiles from "../../components/solutions/homes/OutcomeTiles";
import Configurator from "../../components/solutions/homes/Configurator";
import RoiCalculator from "../../components/solutions/homes/RoiCalculator";
import CaseStudy from "../../components/solutions/homes/CaseStudy";
import Subsidies from "../../components/solutions/homes/Subsidies";
import GridOSCallout from "../../components/solutions/homes/GridOSCallout";
import Faq from "../../components/solutions/homes/Faq";
import FinalCta from "../../components/solutions/homes/FinalCta";

export default function SolutionsHomes() {
  const { theme, tokens } = useMegamenuTheme();

  useEffect(() => {
    setMegamenuTheme("dark");
  }, []);

  return (
    <div
      className="v3-page"
      data-theme={theme}
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <style>{`
        .v3-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page ::-moz-selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page :is(h1, h2, h3, h4, h5, h6) {
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
          font-weight: 600;
          font-optical-sizing: auto;
        }
      `}</style>

      <div className="hidden lg:block">
        <SiteHeader />
      </div>
      <div className="lg:hidden">
        <MobileSiteNav currentRoute="solutions" />
      </div>

      <main>
        <HeroB />
        <OutcomeTiles />
        <Configurator />

        <RoiCalculator />
        <CaseStudy />
        <Subsidies />
        <GridOSCallout />
        <Faq />
        <FinalCta />
      </main>
    </div>
  );
}
