export { API_BASE_URL, BACKEND_BASE_URL } from '../constants/env'

// Marketing home: footer surface on `/` (client spec)
export const HOME_FOOTER_BG = 'rgb(253, 232, 222)'

/** Schools landing: footer surface on `/schools` */
export const SCHOOLS_FOOTER_BG = 'rgb(244, 237, 216)'

/** Must match expanded `NavHeaders` AppBar height (used for full-viewport hero sections). */
export const NAV_APP_BAR_HEIGHT_PX = 250
/** Compact sticky header height (about 60–65px). */
export const NAV_APP_BAR_COMPACT_HEIGHT_PX = 62
/** Shrink after any real scroll past the top; expand again when back near the top. */
export const NAV_HEADER_SCROLL_THRESHOLD_PX = 8
/** Header compact/expand morph duration. */
export const NAV_HEADER_TRANSITION_MS = 280

// App meta
export const APP_NAME = 'Rise Up Kids – Sales'
export const APP_VERSION = '1.0.0'

// Shared user roles (if needed later)
export const USER_ROLES = {
  ADMIN: 'admin',
  PARENT: 'parent',
  CHILD: 'child',
}

// Shared storage keys (tokens, preferences)
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
}

