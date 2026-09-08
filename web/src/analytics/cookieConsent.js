/**
 * Cookie-consent state for the marketing site.
 *
 * One binary choice — "granted" or "denied" — kept in localStorage. It controls
 * whether the Meta (Facebook) Pixel, the only non-essential tag on the site, is
 * allowed to load. No stored value means the visitor has not chosen yet: treated
 * as "denied" until they act on the banner, so nothing tracks by default.
 */

export const CONSENT_STORAGE_KEY = 'ruk_cookie_consent'
export const CONSENT_GRANTED = 'granted'
export const CONSENT_DENIED = 'denied'
/** Fired on `window` when the choice changes in this tab. */
export const CONSENT_EVENT = 'ruk:cookie-consent-change'

/** Coerce any stored/raw value to a known state. Unknown or missing -> denied. */
export function normalizeConsent(raw) {
  return raw === CONSENT_GRANTED ? CONSENT_GRANTED : CONSENT_DENIED
}

function readRaw() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY)
  } catch {
    return null
  }
}

/** Whether the visitor has made an explicit choice (banner should stay hidden). */
export function hasStoredConsent() {
  const raw = readRaw()
  return raw === CONSENT_GRANTED || raw === CONSENT_DENIED
}

export function getConsent() {
  return normalizeConsent(readRaw())
}

export function setConsent(value) {
  const next = normalizeConsent(value)
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, next)
    } catch {
      /* storage blocked — keep going, choice just won't persist */
    }
    try {
      window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }))
    } catch {
      /* CustomEvent unsupported — nothing to notify */
    }
  }
  return next
}

/** Subscribe to consent changes (this tab via CONSENT_EVENT, other tabs via storage). */
export function subscribeConsent(callback) {
  if (typeof window === 'undefined') return () => {}
  const onEvent = (event) => callback(event?.detail ?? getConsent())
  const onStorage = (event) => {
    if (event.key === CONSENT_STORAGE_KEY) callback(getConsent())
  }
  window.addEventListener(CONSENT_EVENT, onEvent)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CONSENT_EVENT, onEvent)
    window.removeEventListener('storage', onStorage)
  }
}
