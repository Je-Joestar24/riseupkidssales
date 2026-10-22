/**
 * URLs to pre-render to static HTML at build time (full SSG for all public app routes).
 * Still Vite + React — not Next.js.
 */
export const PRERENDER_PATHS = [
  '/',
  '/parents',
  '/schools',
  '/videos',
  '/privacy',
  '/terms',
  '/privacy-settings',
  // Hidden freebie page: prerendered only as a neutral, non-gated shell (so the static host serves
  // /experiencia/index.html instead of falling back to the home page). See hiddenPageHead.js.
  '/experiencia',
  // Share-link pages (embedded Flodesk form + link-preview tags). See sharePages.js.
  '/free',
  '/gratis',
  '/checkout',
  '/checkout/register',
]
