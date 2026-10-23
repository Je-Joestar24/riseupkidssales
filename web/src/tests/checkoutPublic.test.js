import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

/**
 * The checkout routes are open even while the sales page is in prelaunch (the client wants the
 * checkout public now). The settings are read once at load time, so each case sets them first and
 * loads a fresh copy of the modules.
 */
async function load({ mode, checkoutPublic } = {}) {
  vi.unstubAllEnvs()
  vi.resetModules()
  if (mode !== undefined) vi.stubEnv('VITE_SALES_PAGE_MODE', mode)
  if (checkoutPublic !== undefined) vi.stubEnv('VITE_CHECKOUT_PUBLIC', checkoutPublic)

  const config = await import('../constants/salesPageConfig.js')
  const { default: PrelaunchCheckoutRedirect } = await import('../components/common/PrelaunchCheckoutRedirect.jsx')

  const renderCheckout = () =>
    renderToString(
      createElement(
        StaticRouter,
        { location: '/checkout' },
        createElement(PrelaunchCheckoutRedirect, null, createElement('div', { id: 'checkout-page' }, 'checkout'))
      )
    )

  return { config, renderCheckout }
}

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('checkout availability', () => {
  it('is public in prelaunch by default — no setting needed', async () => {
    const { config, renderCheckout } = await load({ mode: 'prelaunch' })

    expect(config.isPrelaunchSalesPage).toBe(true)
    expect(config.isCheckoutPublic).toBe(true)
    expect(renderCheckout()).toContain('id="checkout-page"')
  })

  it('is public when the setting is empty or anything other than "false"', async () => {
    for (const value of ['', 'true', 'TRUE', '1', 'yes']) {
      const { config, renderCheckout } = await load({ mode: 'prelaunch', checkoutPublic: value })

      expect(config.isCheckoutPublic, `value "${value}"`).toBe(true)
      expect(renderCheckout()).toContain('id="checkout-page"')
    }
  })

  it('can be switched back to the waitlist with VITE_CHECKOUT_PUBLIC=false', async () => {
    for (const value of ['false', 'FALSE', ' false ']) {
      const { config, renderCheckout } = await load({ mode: 'prelaunch', checkoutPublic: value })

      expect(config.isCheckoutPublic, `value "${value}"`).toBe(false)
      expect(renderCheckout()).not.toContain('checkout-page')
    }
  })

  it('is public in launch mode, and the switch cannot close it there', async () => {
    for (const checkoutPublic of [undefined, 'false']) {
      const { config, renderCheckout } = await load({ mode: 'launch', checkoutPublic })

      expect(config.isPrelaunchSalesPage).toBe(false)
      expect(config.isCheckoutPublic).toBe(true)
      expect(renderCheckout()).toContain('id="checkout-page"')
    }
  })

  it('leaves the rest of the prelaunch page alone: waitlist copy and hidden sections stay', async () => {
    const { config } = await load({ mode: 'prelaunch' })

    expect(config.isPrelaunchSalesPage).toBe(true)
    expect(config.salesPageSections).toEqual({ reviews: false, experience: false, questions: false })
  })

  it('an unrecognised page mode still behaves as prelaunch', async () => {
    const { config } = await load({ mode: 'something-else' })

    expect(config.SALES_PAGE_MODE).toBe('prelaunch')
    expect(config.isCheckoutPublic).toBe(true)
  })
})
