import { normalizeSalesPageLanguage } from '../constants/salesPageConfig.js'

export function resolveLanguageFromSearch(search) {
  const query = String(search || '')
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query)
  return normalizeSalesPageLanguage(params.get('lang'))
}

/**
 * Adds (or replaces) `lang` on a path or full URL, keeping everything else exactly as written —
 * other parameters, a #hash, and placeholders such as Stripe's {CHECKOUT_SESSION_ID}, which must
 * not be percent-encoded. The site treats a missing `lang` as Portuguese, so every internal link and
 * payment return link in the checkout carries it, or an English or Spanish visitor would be switched
 * to Portuguese part-way through.
 */
export function withLanguage(target, code) {
  const lang = normalizeSalesPageLanguage(code)
  const text = String(target ?? '')
  const hashAt = text.indexOf('#')
  const base = hashAt === -1 ? text : text.slice(0, hashAt)
  const hash = hashAt === -1 ? '' : text.slice(hashAt)

  const next = /[?&]lang=/.test(base)
    ? base.replace(/([?&]lang=)[^&]*/, `$1${lang}`)
    : `${base}${base.includes('?') ? '&' : '?'}lang=${lang}`
  return `${next}${hash}`
}

export function buildLanguageSearch(currentSearch, code) {
  const query = String(currentSearch || '')
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query)
  params.set('lang', normalizeSalesPageLanguage(code))
  const next = params.toString()
  return next ? `?${next}` : ''
}
