import { redirect } from "react-router";

// /settings is a layout-only route: send the user to the first
// subsection so the panel is never empty.
export function loader() {
  throw redirect("/settings/organisation");
}

export default function SettingsIndex() {
  return null;
}
