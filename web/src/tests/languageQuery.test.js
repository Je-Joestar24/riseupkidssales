import { describe, expect, it } from 'vitest'
import { buildLanguageSearch, resolveLanguageFromSearch } from '../utils/salesLanguage.js'

describe('Sales language query', () => {
  it('treats a missing or invalid lang param as Portuguese', () => {
    expect(resolveLanguageFromSearch('')).toBe('pt')
    expect(resolveLanguageFromSearch('?foo=1')).toBe('pt')
    expect(resolveLanguageFromSearch('?lang=fr')).toBe('pt')
  })

  it('reads en, es, and pt from the query string', () => {
    expect(resolveLanguageFromSearch('?lang=en')).toBe('en')
    expect(resolveLanguageFromSearch('?lang=es')).toBe('es')
    expect(resolveLanguageFromSearch('?lang=pt')).toBe('pt')
  })

  it('always writes lang, including Portuguese, so PT applies without a reload', () => {
    expect(buildLanguageSearch('?lang=en', 'pt')).toBe('?lang=pt')
    expect(buildLanguageSearch('', 'pt')).toBe('?lang=pt')
    expect(buildLanguageSearch('?lang=pt', 'en')).toBe('?lang=en')
    expect(buildLanguageSearch('?utm=1', 'es')).toBe('?utm=1&lang=es')
  })
})
