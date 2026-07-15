/**
 * Settings index — /settings (redirects to organisation)
 */
import { redirect } from "react-router";

export function loader() {
  return redirect("/settings/organisation");
}

export default function SettingsIndex() {
  return null;
}
