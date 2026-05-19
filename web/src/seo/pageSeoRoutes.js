/** Marketing routes with full SEO specs (client pages 1–4). */
export const SEO_ROUTE_MAP = {
  '/': 'home',
  '/parents': 'parents',
  '/schools': 'schools',
  '/videos': 'videos',
}

export const MARKETING_SEO_PATHS = Object.keys(SEO_ROUTE_MAP)

export const SEO_LANGUAGES = ['pt', 'en', 'es']

export function getSeoKeyForPath(pathname) {
  return SEO_ROUTE_MAP[pathname] ?? null
}
