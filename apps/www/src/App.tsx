import { Routes, Route } from "react-router-dom";

import HomeFoundation from "./routes/HomeFoundation";

import SystemIndex from "./routes/_system/index";
import SystemTokens from "./routes/_system/tokens";
import SystemButtons from "./routes/_system/buttons";
import SystemForms from "./routes/_system/forms";
import SystemCards from "./routes/_system/cards";
import SystemMenus from "./routes/_system/menus";

import PreviewIndex from "./routes/_preview/index";
import FullNavPreview from "./routes/_preview/full-nav";
import VariantPreview from "./routes/_preview/variant";
import V2MenuRoute from "./routes/_preview/v2-menu";
import V3Elements from "./routes/_preview/v3-elements";
import V3Website from "./routes/_preview/v3-website";
import V3Megamenu from "./routes/_preview/v3-megamenu";
import V3Mobile from "./routes/_preview/v3-mobile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeFoundation />} />

      <Route path="/system" element={<SystemIndex />} />
      <Route path="/system/tokens" element={<SystemTokens />} />
      <Route path="/system/buttons" element={<SystemButtons />} />
      <Route path="/system/forms" element={<SystemForms />} />
      <Route path="/system/cards" element={<SystemCards />} />
      <Route path="/system/menus" element={<SystemMenus />} />

      <Route path="/preview" element={<PreviewIndex />} />
      <Route path="/preview/full-nav" element={<FullNavPreview />} />
      <Route path="/preview/v2-menu" element={<V2MenuRoute />} />
      <Route path="/preview/v3-elements" element={<V3Elements />} />
      <Route path="/preview/v3-website" element={<V3Website />} />
      <Route path="/preview/v3-megamenu" element={<V3Megamenu />} />
      <Route path="/preview/v3-mobile" element={<V3Mobile />} />
      <Route path="/preview/:slug" element={<VariantPreview />} />
    </Routes>
  );
}
