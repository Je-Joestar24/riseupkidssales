import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  CONSENT_DENIED,
  CONSENT_GRANTED,
  normalizeConsent,
} from '../analytics/cookieConsent.js'
import { currencyForLanguage } from '../analytics/checkoutTracking.js'
import en from '../i18n/en.json'
import pt from '../i18n/pt.json'
import es from '../i18n/es.json'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '../../')

describe('Meta Pixel — consent gating', () => {
  it('keeps the Pixel out of the served HTML (loaded from JS only after consent)', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    expect(html).not.toMatch(/fbq\(/)
    expect(html).not.toContain('connect.facebook.net/en_US/fbevents.js')
  })

  it('allows the Pixel origins in the CSP meta tag', () => {
    const html = readFileSync(join(webRoot, 'index.html'), 'utf8')
    expect(html).toMatch(/script-src[^;]*https:\/\/connect\.facebook\.net/)
    expect(html).toMatch(/connect-src[^;]*https:\/\/connect\.facebook\.net/)
    expect(html).toMatch(/connect-src[^;]*https:\/\/www\.facebook\.com/)
  })

})

describe('cookie consent state', () => {
  it('defaults to denied when nothing is stored', () => {
    expect(normalizeConsent(undefined)).toBe(CONSENT_DENIED)
    expect(normalizeConsent(null)).toBe(CONSENT_DENIED)
    expect(normalizeConsent('')).toBe(CONSENT_DENIED)
    expect(normalizeConsent('yes')).toBe(CONSENT_DENIED)
  })

  it('recognises an explicit grant', () => {
    expect(normalizeConsent('granted')).toBe(CONSENT_GRANTED)
  })
})

describe('checkout tracking currency', () => {
  it('maps site language to the checkout currency', () => {
    expect(currencyForLanguage('pt')).toBe('BRL')
    expect(currencyForLanguage('en')).toBe('USD')
    expect(currencyForLanguage('es')).toBe('EUR')
    expect(currencyForLanguage('xx')).toBe('USD')
  })
})

describe('cookie consent copy', () => {
  for (const [name, dict] of [
    ['en', en],
    ['pt', pt],
    ['es', es],
  ]) {
    it(`is present in ${name}`, () => {
      expect(dict.cookieConsent?.message).toBeTruthy()
      expect(dict.cookieConsent?.privacyLink).toBeTruthy()
      expect(dict.cookieConsent?.accept).toBeTruthy()
      expect(dict.cookieConsent?.decline).toBeTruthy()
    })
  }
})
