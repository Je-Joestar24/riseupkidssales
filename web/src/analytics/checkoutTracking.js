/**
 * Checkout funnel events for the Meta Pixel.
 *
 * The Purchase event fires on /checkout/success, but Stripe and PagSeguro send
 * the buyer off-site and back, which resets Redux. So at checkout time we stash
 * the cart value + currency in sessionStorage (same-origin, survives the
 * redirect) and read it back on the success page.
 */

import { trackMetaEvent } from './metaPixel.js'

const PURCHASE_INTENT_KEY = 'ruk_pixel_purchase_intent'

const CURRENCY_BY_LANGUAGE = { pt: 'BRL', en: 'USD', es: 'EUR' }

export function currencyForLanguage(language) {
  return CURRENCY_BY_LANGUAGE[language] || 'USD'
}

function toPositiveNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : undefined
}

export function stashPurchaseIntent({ value, currency, numItems } = {}) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(
      PURCHASE_INTENT_KEY,
      JSON.stringify({
        value: toPositiveNumber(value) ?? null,
        currency: currency || null,
        numItems: numItems || 1,
      }),
    )
  } catch {
    /* sessionStorage blocked — Purchase just falls back to currency-only */
  }
}

export function readPurchaseIntent() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(PURCHASE_INTENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearPurchaseIntent() {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(PURCHASE_INTENT_KEY)
  } catch {
    /* nothing to clear */
  }
}

export function trackInitiateCheckout({ value, currency, numItems } = {}) {
  stashPurchaseIntent({ value, currency, numItems })
  const params = { content_type: 'product' }
  const amount = toPositiveNumber(value)
  if (amount) params.value = amount
  if (currency) params.currency = currency
  if (numItems) params.num_items = numItems
  trackMetaEvent('InitiateCheckout', params)
}

export function trackPurchase({ value, currency, numItems } = {}) {
  const params = { currency: currency || 'USD', content_type: 'product' }
  const amount = toPositiveNumber(value)
  if (amount) params.value = amount
  if (numItems) params.num_items = numItems
  trackMetaEvent('Purchase', params)
}
