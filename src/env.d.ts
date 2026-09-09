/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Preline ships no type declarations for its per-plugin subpaths. We import the
// subpath on purpose — `from "preline"` pulls the whole 382 KB library onto
// every page (see the comment in Header.astro) — so declare the one plugin we
// load rather than widening the import back to the barrel.
declare module "preline/dist/dropdown.mjs" {
  const HSDropdown: { autoInit: () => void };
  export default HSDropdown;
}
