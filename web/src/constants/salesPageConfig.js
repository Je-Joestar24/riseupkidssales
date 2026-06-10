const raw = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '')
const rawUrl = (value) => (typeof value === 'string' ? value.trim() : '')

export const CHECKOUT_PATH = '/checkout'

/** Default Flodesk form (PT for now; per-language URLs can be set via env when ready). */
const DEFAULT_PRELAUNCH_WAITLIST_URL =
  'https://riseupkids.myflodesk.com/riseupkidsform?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnrhvDT9o1W5_UqSWPNNinwYsNuSwxWO-bq-YwTisIIBQd17DWAft4yf72rwc_aem_hohBTevKxeJDJzTa_6_zkg'

const globalWaitlistOverride = rawUrl(import.meta.env.VITE_PRELAUNCH_WAITLIST_URL)

const PRELAUNCH_WAITLIST_URL_BY_LANG = {
  pt:
    rawUrl(import.meta.env.VITE_PRELAUNCH_WAITLIST_URL_PT) ||
    globalWaitlistOverride ||
    DEFAULT_PRELAUNCH_WAITLIST_URL,
  es:
    rawUrl(import.meta.env.VITE_PRELAUNCH_WAITLIST_URL_ES) ||
    globalWaitlistOverride ||
    DEFAULT_PRELAUNCH_WAITLIST_URL,
  en:
    rawUrl(import.meta.env.VITE_PRELAUNCH_WAITLIST_URL_EN) ||
    globalWaitlistOverride ||
    DEFAULT_PRELAUNCH_WAITLIST_URL,
}

/** Resolve Flodesk waitlist URL for the active locale (prelaunch). */
export function getPrelaunchWaitlistUrl(language = 'pt') {
  const code = language === 'es' || language === 'en' ? language : 'pt'
  return PRELAUNCH_WAITLIST_URL_BY_LANG[code] || DEFAULT_PRELAUNCH_WAITLIST_URL
}

/** @deprecated Prefer getPrelaunchWaitlistUrl(language) — default PT/global URL. */
export const PRELAUNCH_WAITLIST_URL = getPrelaunchWaitlistUrl('pt')

export const FOUNDER_WAITLIST_SECTION_ID = 'founder-waitlist'

/**
 * Sales page release mode (build-time).
 * - prelaunch: waitlist copy, checkout → Flodesk, some sections off (default)
 * - launch: full sales page — set VITE_SALES_PAGE_MODE=launch when opening enrollment
 */
export const SALES_PAGE_MODE = raw(import.meta.env.VITE_SALES_PAGE_MODE) === 'launch' ? 'launch' : 'prelaunch'

export const isPrelaunchSalesPage = SALES_PAGE_MODE === 'prelaunch'

/** All supported sales page languages — always visible in the nav (PT, EN, ES). */
export const SALES_PAGE_LANGUAGES = ['pt', 'en', 'es']

export const normalizeSalesPageLanguage = (code) =>
  SALES_PAGE_LANGUAGES.includes(code) ? code : 'pt'

/** Parent sales page sections toggled by mode (replaces JSX comment blocks). */
export const salesPageSections = {
  reviews: !isPrelaunchSalesPage,
  experience: !isPrelaunchSalesPage,
  questions: !isPrelaunchSalesPage,
}
