import { Routes, Route } from "react-router-dom";

import HomeFoundation from "./routes/HomeFoundation";

import SystemIndex from "./routes/_system/index";
import SystemTokens from "./routes/_system/tokens";
import SystemButtons from "./routes/_system/buttons";
import SystemForms from "./routes/_system/forms";
import SystemCards from "./routes/_system/cards";
import SystemMenus from "./routes/_system/menus";

/*
  App router.

  Owned by Agent A.

  Routes:
    /                  — foundation smoke test (kept from initial scaffold)
    /system            — index for the /system/* catalogue
    /system/tokens     — color, type, spacing, radii, motion
    /system/buttons    — variants, sizes, states, composition
    /system/forms      — inputs, labels, helpers, states
    /system/cards      — surfaces, slots, bento, hover, anti-patterns
    /system/menus      — placeholder owned by Agent B
*/
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
    </Routes>
  );
}
