import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { resolveLanguageFromSearch, withLanguage } from '../utils/salesLanguage.js'
import { getPagseguroRedirectUrls } from '../services/checkoutService.js'

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '../../')
const read = (...parts) => readFileSync(join(webRoot, ...parts), 'utf8')

describe('withLanguage', () => {
  it('adds lang to a path, a path with parameters, and a full URL', () => {
    expect(withLanguage('/checkout', 'es')).toBe('/checkout?lang=es')
    expect(withLanguage('/checkout/register?children=2&box=1', 'en')).toBe(
      '/checkout/register?children=2&box=1&lang=en'
    )
    expect(withLanguage('https://riseup.kids/checkout/success?provider=paypal', 'pt')).toBe(
      'https://riseup.kids/checkout/success?provider=paypal&lang=pt'
    )
  })

  it('replaces an existing lang instead of adding a second one', () => {
    expect(withLanguage('/checkout?lang=en', 'es')).toBe('/checkout?lang=es')
    expect(withLanguage('/checkout?children=1&lang=en&box=1', 'pt')).toBe('/checkout?children=1&lang=pt&box=1')
    expect(withLanguage('/checkout?lang=en', 'es').match(/lang=/g)).toHaveLength(1)
  })

  it("never touches Stripe's {CHECKOUT_SESSION_ID} placeholder (it must not be percent-encoded)", () => {
    const url = withLanguage('https://riseup.kids/checkout/success?session_id={CHECKOUT_SESSION_ID}', 'es')

    expect(url).toBe('https://riseup.kids/checkout/success?session_id={CHECKOUT_SESSION_ID}&lang=es')
    expect(url).not.toContain('%7B')
  })

  it('keeps a #hash at the end', () => {
    expect(withLanguage('/parents#founder-waitlist', 'en')).toBe('/parents?lang=en#founder-waitlist')
    expect(withLanguage('/parents?x=1#top', 'es')).toBe('/parents?x=1&lang=es#top')
  })

  it('falls back to Portuguese for an unknown or missing language', () => {
    expect(withLanguage('/checkout', 'fr')).toBe('/checkout?lang=pt')
    expect(withLanguage('/checkout', undefined)).toBe('/checkout?lang=pt')
    expect(withLanguage('/checkout', '')).toBe('/checkout?lang=pt')
  })

  it('always gives back the same language the site reads from the address, for pt, en and es', () => {
    for (const lang of ['pt', 'en', 'es']) {
      const url = new URL(withLanguage('/checkout/register?children=2', lang), 'https://riseup.kids')

      expect(resolveLanguageFromSearch(url.search)).toBe(lang)
      expect(url.searchParams.get('children')).toBe('2')
    }
  })
})

describe('payment return links keep the language', () => {
  it.each(['pt', 'en', 'es'])('PagBank success and cancel links carry lang=%s', (lang) => {
    const { successUrl, cancelUrl } = getPagseguroRedirectUrls('https://riseup.kids/', lang)

    expect(successUrl).toBe(`https://riseup.kids/checkout/success?provider=pagseguro&lang=${lang}`)
    expect(cancelUrl).toBe(`https://riseup.kids/checkout/register?lang=${lang}`)
  })

  it('still omits the links on localhost so the server default applies', () => {
    expect(getPagseguroRedirectUrls('http://localhost:4175', 'es')).toEqual({})
    expect(getPagseguroRedirectUrls('', 'es')).toEqual({})
  })

  it('every checkout link in the flow goes through withLanguage', () => {
    const files = [
      ['src', 'components', 'checkout', 'select', 'SelectCta.jsx'],
      ['src', 'components', 'checkout', 'register', 'RgisterForm.jsx'],
      ['src', 'pages', 'CheckoutSuccess.jsx'],
      ['src', 'hooks', 'useCheckoutSuccessVerification.js'],
      ['src', 'services', 'checkoutService.js'],
    ]
    const offenders = []

    for (const parts of files) {
      read(...parts)
        .split('\n')
        .forEach((line, index) => {
          const code = line.trim()
          const isComment =
            code.startsWith('*') || code.startsWith('//') || code.startsWith('/*') || code.startsWith('import ')
          const isLink = /['"`][^'"`]*\/checkout\/(register|success)/.test(code)
          const sendsToBackend = /\$\{base\}\/checkout\/(config|create-session|session)/.test(code)
          if (!isComment && isLink && !sendsToBackend && !code.includes('withLanguage(')) {
            offenders.push(`${parts.join('/')}:${index + 1}  ${code}`)
          }
        })
    }

    expect(offenders).toEqual([])
  })

  it('the terms and privacy links from the registration form keep the language too', () => {
    const form = read('src', 'components', 'checkout', 'register', 'RgisterForm.jsx')

    expect(form).toContain("withLanguage('/terms', language)")
    expect(form).toContain("withLanguage('/privacy', language)")
    expect(form).not.toMatch(/href="\/(terms|privacy)"/)
  })
})

describe('the waitlist redirect keeps the language', () => {
  it('reads the language from the address and writes it into the waitlist link', () => {
    const source = read('src', 'components', 'common', 'PrelaunchCheckoutRedirect.jsx')

    expect(source).toContain('resolveLanguageFromSearch(search)')
    expect(source).toContain('withLanguage(`/parents#${FOUNDER_WAITLIST_SECTION_ID}`, language)')
  })

  it.each(['pt', 'en', 'es'])('the waitlist link for %s opens the parents page in that language', (lang) => {
    expect(withLanguage('/parents#founder-waitlist', lang)).toBe(`/parents?lang=${lang}#founder-waitlist`)
  })

  it('does not break rendering when the checkout is closed', async () => {
    vi.resetModules()
    vi.unstubAllEnvs()
    vi.stubEnv('VITE_SALES_PAGE_MODE', 'prelaunch')
    vi.stubEnv('VITE_CHECKOUT_PUBLIC', 'false')
    const { default: Redirect } = await import('../components/common/PrelaunchCheckoutRedirect.jsx')
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const html = renderToString(
      createElement(StaticRouter, { location: '/checkout?lang=es' }, createElement(Redirect, null, createElement('div', { id: 'page' })))
    )
    warn.mockRestore()
    vi.unstubAllEnvs()

    expect(html).not.toContain('id="page"')
  })
})
