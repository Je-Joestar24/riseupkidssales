/**
 * Free Smoothie Experience page (/experiencia) — small pure helpers. Nothing here touches the
 * browser directly: storage is passed in, so all of it can be tested without a DOM.
 *
 * What the device remembers is a signed token from the server (never the email, and never anything
 * placed in the page link). The token is per page language, because the server only honors it for
 * the language it was issued for.
 */

const TOKEN_KEY_PREFIX = 'ruk_experience_token_'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** The freebie exists in Portuguese and Spanish only; anything else is the Portuguese page. */
export function experienceLanguage(language) {
  return String(language || '').trim().toLowerCase() === 'es' ? 'es' : 'pt'
}

export function tokenStorageKey(language) {
  return `${TOKEN_KEY_PREFIX}${experienceLanguage(language)}`
}

export function isPlausibleEmail(email) {
  return typeof email === 'string' && EMAIL_PATTERN.test(email.trim())
}

const BUNNY_EMBED_HOSTS = ['player.mediadelivery.net', 'iframe.mediadelivery.net']

/**
 * The server only ever returns Bunny player links, but the page checks again before framing
 * anything: only https links on Bunny's own embed hosts are ever put in an iframe.
 */
export function isBunnyEmbedUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && BUNNY_EMBED_HOSTS.includes(url.hostname)
  } catch {
    return false
  }
}

/**
 * Player settings from the client's design: no autoplay, preload the video, scale to its frame.
 * Added here rather than stored in the link, so the server only has to hold the plain embed URL.
 */
export function withPlayerParams(url) {
  return `${url}${url.includes('?') ? '&' : '?'}autoplay=false&preload=true&responsive=true`
}

/** Storage can be unavailable or throw (private mode, blocked cookies) — never let that break the page. */
export function readStoredToken(storage, language) {
  try {
    return storage?.getItem(tokenStorageKey(language)) || null
  } catch {
    return null
  }
}

export function storeToken(storage, language, token) {
  try {
    storage.setItem(tokenStorageKey(language), token)
    return true
  } catch {
    return false
  }
}

export function clearStoredToken(storage, language) {
  try {
    storage?.removeItem(tokenStorageKey(language))
  } catch {
    // nothing to clear if storage is unavailable
  }
}

/**
 * Sign-up (Flodesk form) link for the page language. Spanish falls back to the Portuguese form
 * until a Spanish form exists. Empty when neither is configured, so the button can be hidden
 * rather than shown pointing nowhere.
 */
export function pickSignupUrl(language, { pt = '', es = '' } = {}) {
  const preferred = experienceLanguage(language) === 'es' ? es : pt
  return preferred || pt || es || ''
}

export const DEFAULT_JOIN_PATH = '/parents'

/**
 * Where the "Participe da Rise Up Kids" button goes: the parents page (not the bare home page), in
 * the language of the Experience page (Portuguese is set explicitly, so a remembered language on
 * the visitor's device can't open it in another one). A custom link from the settings is used as given; the
 * default is a relative link so it works on any host.
 */
export function pickJoinUrl(language, configured = '') {
  const custom = typeof configured === 'string' ? configured.trim() : ''
  if (custom) return custom
  return `${DEFAULT_JOIN_PATH}?lang=${experienceLanguage(language)}`
}

/** HTTP status and server `code` of a failed request, if it was an HTTP error at all. */
function describeError(error) {
  return { status: error?.response?.status ?? null, code: error?.response?.data?.code ?? null }
}

/**
 * On page load: if this device already passed the check, ask the server to re-open the page.
 * Resolves to `{ status: 'unlocked', videos }` or `{ status: 'locked' }` — never throws.
 * A rejected token is cleared; a network failure leaves it in place so the next visit can retry.
 */
export async function restoreAccess({ storage, language, restore }) {
  const token = readStoredToken(storage, language)
  if (!token) return { status: 'locked' }

  try {
    const result = await restore(token, language)
    const videos = result?.data?.videos
    if (result?.success && Array.isArray(videos)) {
      return { status: 'unlocked', videos }
    }
    clearStoredToken(storage, language)
    return { status: 'locked' }
  } catch (error) {
    if (describeError(error).status === 403) clearStoredToken(storage, language)
    return { status: 'locked' }
  }
}

/**
 * The email form. Resolves to one of:
 *   { status: 'unlocked', videos }                 — confirmed subscriber; token is stored
 *   { status: 'locked', error: 'invalidEmail' }    — not an email (nothing is sent)
 *   { status: 'locked', error: 'notRegistered' }   — not a confirmed subscriber -> show sign-up
 *   { status: 'locked', error: 'verification' }    — the bot check was rejected
 *   { status: 'locked', error: 'unavailable' }     — could not check; try again
 */
export async function submitEmail({ email, storage, language, verify }) {
  if (!isPlausibleEmail(email)) {
    return { status: 'locked', error: 'invalidEmail' }
  }

  try {
    const result = await verify(email.trim(), language)
    const token = result?.data?.token
    const videos = result?.data?.videos
    if (result?.success && token && Array.isArray(videos)) {
      storeToken(storage, language, token)
      return { status: 'unlocked', videos }
    }
    return { status: 'locked', error: 'unavailable' }
  } catch (error) {
    const { status, code } = describeError(error)
    if (status === 403 && code === 'EXPERIENCE_ACCESS_DENIED') {
      return { status: 'locked', error: 'notRegistered' }
    }
    if (status === 400) return { status: 'locked', error: 'verification' }
    return { status: 'locked', error: 'unavailable' }
  }
}
