import { tokens } from "./_preview/_v3-tokens";

/*
  Homepage — intentionally blank for now. Only the global header (top bar +
  mega menu) shows. Real homepage sections get wired in a later slice.
*/
export default function HomeFoundation() {
  return <main style={{ minHeight: "78vh", background: tokens.pageBg }} />;
}
