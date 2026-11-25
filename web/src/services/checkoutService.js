/**
 * Checkout service: the backend API calls of the checkout (prices, sign-up, Stripe, PagBank, PayPal).
 *
 * There are NO prices and no child limit in this file: the prices and the limit come from the backend
 * (GET /api/checkout/pricing, the one price list). See services/pricing.js for reading and formatting them.
 * Use with useCheckout for a single source of truth across summary and plan card.
 */

import axios from 'axios'
import { withLanguage } from '../utils/salesLanguage.js'
import { normalizePricingResponse } from './pricing.js'

/** The smallest number of children (a family has at least one). The largest comes from the backend. */
export const MIN_CHILDREN = 1

/** API base: set VITE_API_URL in .env or use relative /api (Vite proxy). Export for auth/register. */
export function getApiBaseUrl() {
  const url = import.meta.env.VITE_API_URL
  if (url && typeof url === 'string') return url.replace(/\/$/, '')
  return '/api'
}

/**
 * Fetch the Family Plan prices from the backend (public): annual price per region and number of children, in cents,
 * plus the child limit. The answer is checked before it is used; a broken answer throws.
 * @returns {Promise<{ minChildren: number, maxChildren: number, regions: object }>}
 */
export async function fetchCheckoutPricing() {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/checkout/pricing`)
  if (!res.ok) throw new Error(`Could not load prices (${res.status}).`)
  const data = await res.json().catch(() => null)
  return normalizePricingResponse(data)
}

// ACTIVITY BOX ADD-ON: SWITCHED OFF (the client no longer sells it). The code is kept here, commented out,
// so it can be switched on again. See docs/ACTIVITY_BOX_DISABLED.md (in the main repository) for every place.
//
// The box prices and helpers as they were. They used the old price tables' helpers (clampCount, fmtBRL, getPlanPricing
// with its old arguments), so when switching the box on again adapt them to the prices from the backend (services/pricing.js).
// Box price per child: Brazil R$297, USA $99, Europe €99.
//
// const BOX_PRICE_PER_CHILD = {
//   pt: 297,
//   en: 99,
//   es: 99,
// }
//
// /**
//  * Box price per child (numeric) for a locale.
//  */
// export function getBoxPricePerChild(locale) {
//   return BOX_PRICE_PER_CHILD[locale] ?? BOX_PRICE_PER_CHILD.pt
// }
//
// /**
//  * Box price per child as display string (e.g. "R$297", "$99").
//  */
// export function getBoxPriceDisplay(locale) {
//   const n = getBoxPricePerChild(locale)
//   if (locale === 'pt') return `R$${n}`
//   if (locale === 'es') return `€${n}`
//   return `$${n}`
// }
//
// /**
//  * Box total display and amount when addBox is true.
//  * @param {string} locale
//  * @param {number} childCount
//  * @returns {{ display: string, amount: number }}
//  */
// export function getBoxTotal(locale, childCount) {
//   const count = clampCount(childCount)
//   const perChild = getBoxPricePerChild(locale)
//   const amount = perChild * count
//   if (locale === 'pt') {
//     const display = count === 1 ? fmtBRL(perChild) : `${count} caixas: ${fmtBRL(amount)}`
//     return { display, amount }
//   }
//   if (locale === 'es') {
//     const display = count === 1 ? `€${perChild}` : `€${amount.toLocaleString('de-DE')}`
//     return { display, amount }
//   }
//   const display = count === 1 ? `$${perChild}` : `$${amount.toLocaleString()}`
//   return { display, amount }
// }
//
// /**
//  * Total row pricing (plan + optional box).
//  * @param {string} locale
//  * @param {number} childCount
//  * @param {boolean} addBox
//  * @returns {{ line1: string, line2: string }}
//  */
// export function getTotalPricing(locale, childCount, addBox) {
//   const plan = getPlanPricing(locale, childCount)
//   if (!addBox) {
//     if (locale === 'pt') return { line1: plan.line1, line2: plan.line2 }
//     return { line1: plan.line1, line2: null }
//   }
//   const box = getBoxTotal(locale, childCount)
//   const totalAmount = plan.amount + box.amount
//   if (locale === 'pt') {
//     return {
//       line1: plan.line1,
//       line2: `ou ${fmtBRL(totalAmount)} à vista`,
//     }
//   }
//   if (locale === 'es') {
//     return {
//       line1: `€${totalAmount.toLocaleString('de-DE')}`,
//       line2: null,
//     }
//   }
//   return {
//     line1: `$${totalAmount.toLocaleString()}`,
//     line2: null,
//   }
// }

/**
 * Create Stripe Checkout Session via backend and return the redirect URL.
 * Requires authenticated parent (Bearer token).
 * @param {Object} opts
 * @param {string} opts.token - JWT (Bearer)
 * @param {string} opts.region - 'br' | 'us' | 'eu'
 * @param {number} opts.childCount - 1 to the backend limit (a bad count is refused by the backend with a message)
 * @param {string} [opts.successUrl]
 * @param {string} [opts.cancelUrl]
 * @param {string} [opts.termsVersion]
 * @returns {Promise<{ url: string, sessionId: string }>}
 */
// (activity box: add `addBox = false` to this list and `addBox: Boolean(addBox),` to the body below to send it again)
export async function createCheckoutSession({ token, region, childCount, successUrl, cancelUrl, termsVersion }) {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      region,
      childCount: Number(childCount),
      ...(successUrl ? { successUrl } : {}),
      ...(cancelUrl ? { cancelUrl } : {}),
      ...(termsVersion ? { termsVersion } : {}),
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data.message || data.error || `Request failed (${res.status})`
    throw new Error(msg)
  }
  if (!data.url) throw new Error('No checkout URL returned')
  return { url: data.url, sessionId: data.sessionId }
}

/** PagBank only accepts public HTTPS redirect URLs (not localhost). */
export function isPublicHttpsUrl(url) {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url.trim())
    if (parsed.protocol !== 'https:') return false
    const host = parsed.hostname.toLowerCase()
    if (host === 'localhost' || host === '127.0.0.1') return false
    return true
  } catch {
    return false
  }
}

/**
 * Redirect URLs for PagBank. Omits localhost so the API uses SALE_APP_BASE_URL on the server.
 */
export function getPagseguroRedirectUrls(appBaseUrl, language) {
  const base = (appBaseUrl || '').replace(/\/+$/, '')
  if (!isPublicHttpsUrl(`${base}/`)) {
    return {}
  }
  return {
    successUrl: withLanguage(`${base}/checkout/success?provider=pagseguro`, language),
    cancelUrl: withLanguage(`${base}/checkout/register`, language),
  }
}

/**
 * Create PagBank (PagSeguro) hosted checkout for Brazil.
 * Requires authenticated parent (Bearer token).
 *
 * @param {Object} opts
 * @param {string} opts.token - JWT (Bearer)
 * @param {number} opts.childCount - 1 to the backend limit (a bad count is refused by the backend with a message)
 * @param {string} opts.taxId - CPF (can be formatted; digits only are used)
 * @param {{ area: string, number: string }} opts.phone - BR mobile
 * @param {string} [opts.successUrl] - PagBank redirect after payment (HTTPS)
 * @param {string} [opts.cancelUrl] - PagBank return when user leaves without paying
 * @param {string} [opts.termsVersion]
 * @returns {Promise<{ checkoutId: string, payUrl: string, referenceId: string }>}
 */
export async function createPagseguroCheckout({
  token,
  childCount,
  // addBox = false,   // activity box: switched off
  taxId,
  phone,
  successUrl,
  cancelUrl,
  termsVersion,
}) {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/pagseguro/create-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      childCount: Number(childCount),
      // addBox: Boolean(addBox),   // activity box: switched off
      taxId,
      phone,
      ...(successUrl ? { successUrl } : {}),
      ...(cancelUrl ? { cancelUrl } : {}),
      ...(termsVersion ? { termsVersion } : {}),
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = data.message || data.error || `Request failed (${res.status})`
    throw new Error(msg)
  }
  if (!data.payUrl || !data.checkoutId) throw new Error('No PagBank checkout URL returned')
  return { checkoutId: data.checkoutId, payUrl: data.payUrl, referenceId: data.referenceId }
}

/**
 * Verify PagBank checkout after redirect and return user + token.
 * @param {string} checkoutId - CHEC_...
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function verifyPagseguroCheckout(checkoutId) {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/pagseguro/checkout/${encodeURIComponent(checkoutId)}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(data.message || data.error || 'Payment not completed yet.')
    err.pending = res.status === 400 || res.status === 402
    err.checkoutStatus = data.status
    throw err
  }
  return { user: data.user, token: data.token }
}

/** Locale (pt/en/es) to Stripe region (br/us/eu) */
export function localeToRegion(locale) {
  const map = { pt: 'br', en: 'us', es: 'eu' }
  return map[locale] || 'us'
}

/** Locale to PayPal/backend currency (BRL, USD, EUR) for tier strings */
export function localeToCurrency(locale) {
  const map = { pt: 'BRL', en: 'USD', es: 'EUR' }
  return map[locale] || 'USD'
}

/**
 * Register parent only; returns JWT for use with PayPal or other authenticated flows.
 * @param {Object} opts - name, email, password
 * @returns {Promise<{ token: string }>}
 */
export async function registerParent({ name, email, password }) {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name || email?.replace(/@.*/, '') || 'Guardian',
      email,
      password,
      role: 'parent',
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Registration failed')
  }
  const token = data.data?.token
  if (!token) throw new Error('No token after registration')
  return { token }
}

/**
 * Register parent then create Stripe session and return redirect URL.
 * Use when user submits the register form with card payment.
 * @param {Object} opts - name, email, password, region, childCount, successUrl?, cancelUrl?, termsVersion?
 * @returns {Promise<{ url: string, sessionId: string }>}
 */
export async function registerAndCreateCheckoutSession({
  name,
  email,
  password,
  region,
  childCount,
  // addBox = false,   // activity box: switched off
  successUrl,
  cancelUrl,
  termsVersion,
}) {
  const base = getApiBaseUrl()
  const registerRes = await fetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name || email?.replace(/@.*/, '') || 'Guardian',
      email,
      password,
      role: 'parent',
    }),
  })
  const registerData = await registerRes.json().catch(() => ({}))
  if (!registerRes.ok) {
    throw new Error(registerData.message || registerData.error || 'Registration failed')
  }
  const token = registerData.data?.token
  if (!token) throw new Error('No token after registration')
  return createCheckoutSession({
    token,
    region,
    childCount,
    // addBox,   // activity box: switched off
    successUrl,
    cancelUrl,
    termsVersion,
  })
}

/** Terms version accepted at checkout (must match backend legal/meta.json). */
export const DEFAULT_TERMS_VERSION = '2026-07-14'

/**
 * Verify Family Plan payment and get user + token (for success page).
 * Backend sets termsAcceptedIp from this request.
 * @param {string} sessionId - Stripe Checkout Session ID
 * @returns {Promise<{ user: object, token: string }>}
 */
export async function getCheckoutSessionDetails(sessionId) {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/checkout/session/${sessionId}`)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Invalid session')
  return { user: data.user, token: data.token }
}

// ——— PayPal one-time checkout (yearly plan) ———
// Backend: POST /paypal/create-order (body: { tier }) → { orderID }
//         POST /paypal/capture-order (body: { orderID }) → capture and activate subscription
// Tier format: "1_child_USD" | "2_children_BRL" | "4_children_EUR" (the backend builds the valid tiers from the one price list).

/** Build PayPal tier string from child count and currency. Matches the backend tier keys.
 * @param {number} childCount - 1 to the backend limit (an unsold size is refused by the backend)
 * @param {string} [currency='USD'] - USD, BRL, EUR
 * @param {boolean} [useYearly=false] - Use yearly tier (e.g. when Pay in 4 is not available in region). Same price, different tier key.
 * @returns {string} e.g. "1_child_USD" or "1_child_yearly_BRL"
 */
export function getPaypalTier(childCount, currency = 'USD', useYearly = false) {
  const n = Math.max(MIN_CHILDREN, Math.floor(Number(childCount)) || MIN_CHILDREN)
  const key = n === 1 ? '1_child' : `${n}_children`
  const tierKey = useYearly ? `${key}_yearly` : key
  const cur = (currency || 'USD').toUpperCase()
  return `${tierKey}_${cur}`
}

/**
 * Create a PayPal order for the given tier. Requires authenticated parent (Bearer token).
 * Use in PayPalButtons createOrder callback.
 * @param {Object} opts
 * @param {string} opts.token - JWT (Bearer)
 * @param {string} opts.tier - e.g. "1_child_USD", "2_children_BRL"
 * @returns {Promise<{ orderID: string }>}
 */
export async function createPaypalOrder({ token, tier }) {
  const base = getApiBaseUrl()
  const res = await axios.post(
    `${base}/paypal/create-order`,
    { tier: tier?.trim() },
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      timeout: 15000,
    }
  )
  const data = res.data
  if (!data?.orderID) throw new Error('No orderID returned from create-order')
  return { orderID: data.orderID }
}

/**
 * Capture a PayPal order and activate subscription. Requires authenticated parent (Bearer token).
 * Use in PayPalButtons onApprove callback.
 * @param {Object} opts
 * @param {string} opts.token - JWT (Bearer)
 * @param {string} opts.orderID - PayPal order ID from approval
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export async function capturePaypalOrder({ token, orderID }) {
  const base = getApiBaseUrl()
  const res = await axios.post(
    `${base}/paypal/capture-order`,
    { orderID: orderID?.trim() },
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      timeout: 15000,
    }
  )
  const data = res.data
  return { success: Boolean(data?.success), message: data?.message }
}
