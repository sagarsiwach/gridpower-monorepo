import { redirect } from "react-router";

// Root path: redirect to /dashboard. Shell wrapping happens via the
// _shell.tsx layout route which catches /dashboard.
export function loader() {
  throw redirect("/dashboard");
}

export default function Index() {
  return null;
}
