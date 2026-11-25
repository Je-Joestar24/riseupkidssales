import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { createAppStore } from '../store/index.js'
import { BACKEND_PRICING } from './fixtures/backendPricing.js'
import SelectProduct from '../components/checkout/select/SelectProduct.jsx'
import SelectSummary from '../components/checkout/select/SelectSummary.jsx'
import SelectCta from '../components/checkout/select/SelectCta.jsx'
import SelectCard from '../components/checkout/select/SelectCard.jsx'
import RegisterSummary from '../components/checkout/register/RegisterSummary.jsx'
import RgisterForm from '../components/checkout/register/RgisterForm.jsx'

/**
 * The real checkout components, rendered on the server in each state of the prices: loaded, loading, failed.
 * The page itself holds no price: whatever it shows comes from the (here: fake) backend answer.
 */
const ready = (childCount) => ({ childCount, pricing: { status: 'ready', data: BACKEND_PRICING, error: null } })
const loading = { childCount: 1, pricing: { status: 'loading', data: null, error: null } }
const failed = { childCount: 1, pricing: { status: 'error', data: null, error: 'Could not load prices (500).' } }
const idle = { childCount: 1, pricing: { status: 'idle', data: null, error: null } }

function render(Component, { language = 'pt', checkout }) {
  const store = createAppStore({ language: { current: language }, checkout })
  // MUI prints a harmless warning for a few theme tokens when there is no theme around it
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    return renderToString(createElement(Provider, { store }, createElement(StaticRouter, { location: '/checkout' }, createElement(Component))))
  } finally {
    warn.mockRestore()
    error.mockRestore()
  }
}

/** Any amount written with a currency symbol: R$699, $120, €310 */
const PRICE_TEXT = /(R\$|\$|€)\s?\d/

/** The payment note each language shows under a price (it has no number in it) */
const PAYMENT_NOTE = { pt: 'ou opções flexíveis de pagamento', en: 'or flexible payment options', es: 'or pay in installments' }

describe('plan card', () => {
  it.each([
    ['pt', 1, 'R$699'],
    ['pt', 2, 'R$1299'],
    ['pt', 4, 'R$2199'],
    ['en', 1, '$120'],
    ['en', 4, '$310'],
    ['es', 3, '€250'],
  ])('%s, %i child(ren): shows %s from the backend answer', (language, kids, expected) => {
    const html = render(SelectProduct, { language, checkout: ready(kids) })
    expect(html).toContain(expected)
  })

  it('never shows the old prices (R$799, $799, €799)', () => {
    for (const [language, kids] of [['pt', 1], ['en', 1], ['es', 1], ['pt', 2], ['en', 4]]) {
      const html = render(SelectProduct, { language, checkout: ready(kids) })
      expect(html).not.toMatch(/R\$799|\$799|€799/)
    }
  })

  it('Brazil shows the saving worked out from the backend prices', () => {
    expect(render(SelectProduct, { language: 'pt', checkout: ready(2) })).toContain('Economize 7% (R$99)')
    expect(render(SelectProduct, { language: 'pt', checkout: ready(4) })).toContain('Economize 21% (R$597)')
    expect(render(SelectProduct, { language: 'pt', checkout: ready(1) })).not.toContain('Economize')
  })

  it('the Portuguese payment note has no price in it (it used to say "ou R$799 à vista")', () => {
    const html = render(SelectProduct, { language: 'pt', checkout: ready(3) })
    expect(html).toContain('ou opções flexíveis de pagamento disponíveis no checkout')
    expect(html).not.toContain('à vista')
  })

  it('while the prices load it says so and shows NO price at all', () => {
    for (const [language, text] of [['pt', 'Carregando os valores'], ['en', 'Loading prices'], ['es', 'Cargando precios']]) {
      const html = render(SelectProduct, { language, checkout: loading })
      expect(html).toContain(text)
      expect(html).not.toMatch(PRICE_TEXT)
      expect(html).not.toContain(PAYMENT_NOTE[language]) // no "or ... at checkout" note hanging next to no price
    }
  })

  it('before it has even asked it also shows no price', () => {
    const html = render(SelectProduct, { language: 'en', checkout: idle })
    expect(html).toContain('Loading prices')
    expect(html).not.toMatch(PRICE_TEXT)
  })

  it('when the prices could not be loaded it says so, offers "try again", and shows NO price', () => {
    for (const [language, error, retry] of [
      ['pt', 'Não foi possível carregar os valores', 'Tentar novamente'],
      ['en', 'We could not load the prices', 'Try again'],
      ['es', 'No pudimos cargar los precios', 'Intentar de nuevo'],
    ]) {
      const html = render(SelectProduct, { language, checkout: failed })
      expect(html).toContain(error)
      expect(html).toContain(retry)
      expect(html).not.toMatch(PRICE_TEXT)
      expect(html).not.toContain(PAYMENT_NOTE[language])
    }
  })
})

describe('order summary (select page)', () => {
  it('shows the price on the plan line and again on the total line', () => {
    const html = render(SelectSummary, { language: 'pt', checkout: ready(2) })
    expect(html.match(/R\$1299/g)).toHaveLength(2)
  })

  it('the total is the plan price: nothing is added on top', () => {
    const html = render(SelectSummary, { language: 'en', checkout: ready(3) })
    // every amount on the page is the plan price: the plan line and the total, nothing else (no extra, no box)
    expect(html.match(/\$\d[\d,.]*/g)).toEqual(['$250', '$250'])
  })

  it('while loading it shows no price anywhere', () => {
    const html = render(SelectSummary, { language: 'es', checkout: loading })
    expect(html).toContain('Cargando precios')
    expect(html).not.toMatch(PRICE_TEXT)
    expect(html).not.toContain(PAYMENT_NOTE.es)
  })

  it('after a failure it shows no price anywhere', () => {
    expect(render(SelectSummary, { language: 'en', checkout: failed })).not.toMatch(PRICE_TEXT)
  })
})

describe('order summary (register page)', () => {
  it('shows the price from the backend on the plan line and the total', () => {
    const html = render(RegisterSummary, { language: 'es', checkout: ready(4) })
    expect(html.match(/€310/g)).toHaveLength(2)
  })

  it('while loading or after a failure it shows no price', () => {
    for (const state of [loading, failed, idle]) {
      expect(render(RegisterSummary, { language: 'pt', checkout: state })).not.toMatch(PRICE_TEXT)
    }
  })

  it('and it says what is happening: loading, or the error with "try again"', () => {
    expect(render(RegisterSummary, { language: 'pt', checkout: loading })).toContain('Carregando os valores')
    const failedHtml = render(RegisterSummary, { language: 'en', checkout: failed })
    expect(failedHtml).toContain('We could not load the prices')
    expect(failedHtml).toContain('Try again')
  })
})

describe('continue button', () => {
  const disabled = (html) => /<button[^>]*disabled/.test(html)

  it('is on once the prices are loaded', () => {
    expect(disabled(render(SelectCta, { checkout: ready(2) }))).toBe(false)
  })

  it('is off while the prices load, before they are asked for, and after a failure (nobody can buy a made-up price)', () => {
    for (const state of [loading, idle, failed]) {
      expect(disabled(render(SelectCta, { checkout: state }))).toBe(true)
    }
  })
})

describe('number of children', () => {
  const disabledButtons = (html) => (html.match(/<button[^>]*disabled/g) || []).length

  it('1 child: only "add" can be used', () => {
    expect(disabledButtons(render(SelectCard, { checkout: ready(1) }))).toBe(1)
  })

  it('2 or 3 children: both can be used', () => {
    expect(disabledButtons(render(SelectCard, { checkout: ready(2) }))).toBe(0)
    expect(disabledButtons(render(SelectCard, { checkout: ready(3) }))).toBe(0)
  })

  it('4 children (the backend limit): "add" is off, nothing above 4 can be chosen', () => {
    const html = render(SelectCard, { checkout: ready(4) })
    expect(disabledButtons(html)).toBe(1)
    expect(html).toMatch(/max="4"/)
  })

  it('the limit follows the backend: with a limit of 4 the field says max 4, never 3', () => {
    expect(render(SelectCard, { checkout: ready(2) })).toMatch(/max="4"/)
    expect(render(SelectCard, { checkout: ready(2) })).not.toMatch(/max="3"/)
  })

  it('while the prices load only one child is allowed (both buttons off)', () => {
    const html = render(SelectCard, { checkout: loading })
    expect(disabledButtons(html)).toBe(2)
    expect(html).toMatch(/max="1"/)
  })
})

describe('register form (where the payment starts)', () => {
  const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'components', 'checkout', 'register', 'RgisterForm.jsx'), 'utf8')

  it('renders in every state of the prices without crashing', () => {
    for (const state of [ready(2), loading, failed, idle]) {
      expect(render(RgisterForm, { language: 'pt', checkout: state }).length).toBeGreaterThan(100)
    }
  })

  it('refuses to submit without prices, BEFORE anything is created (no sign-up, no payment)', () => {
    const submit = source.indexOf('const handleSubmit')
    const guard = source.indexOf('if (!pricingReady)', submit)
    const firstCreate = Math.min(...['registerParent(', 'registerAndCreateCheckoutSession(', 'createPagseguroCheckout('].map((name) => source.indexOf(name, submit)).filter((i) => i > -1))

    expect(submit).toBeGreaterThan(-1)
    expect(guard).toBeGreaterThan(submit)
    expect(guard).toBeLessThan(firstCreate)
  })

  it('the pay button is off while there are no prices', () => {
    expect(source).toMatch(/disabled=\{[^}]*!pricingReady/)
  })

  it('sends no box choice to any provider', () => {
    expect(source).not.toMatch(/addBox/)
  })
})
