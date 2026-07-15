/* Types for the vendored + patched cobe build (cobe-gridred.js).
   The runtime is byte-identical to cobe@2.0.1 except the one GridRed continent
   line, so it takes the same options and returns the same handle. */
import type { COBEOptions, Globe } from "cobe";

declare const createGlobe: (canvas: HTMLCanvasElement, opts: COBEOptions) => Globe;
export default createGlobe;
