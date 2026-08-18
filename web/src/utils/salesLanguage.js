import { normalizeSalesPageLanguage } from '../constants/salesPageConfig.js'

export function resolveLanguageFromSearch(search) {
  const query = String(search || '')
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query)
  return normalizeSalesPageLanguage(params.get('lang'))
}

export function buildLanguageSearch(currentSearch, code) {
  const query = String(currentSearch || '')
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query)
  params.set('lang', normalizeSalesPageLanguage(code))
  const next = params.toString()
  return next ? `?${next}` : ''
}
