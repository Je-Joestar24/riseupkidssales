/**
 * Checkout service: static pricing data, getters (locale-aware), and backend API.
 * Use with useCheckout for a single source of truth across summary and plan card.
 * Backend supports 1–10 kids; UI is currently capped at MAX_CHILDREN_UI (3).
 */

export const MIN_CHILDREN = 1
/** Backend/config max; pricing data supports 1–10 */
export const MAX_CHILDREN = 10
/** UI limit only (stepper, config display). Backend unchanged for future 10-kid support. */
export const MAX_CHILDREN_UI = 3

/** API base: set VITE_API_URL in .env or use relative /api (Vite proxy). Export for auth/register. */
export function getApiBaseUrl() {
  const url = import.meta.env.VITE_API_URL
  if (url && typeof url === 'string') return url.replace(/\/$/, '')
  return '/api'
}

// Brazil (pt): installment + cash in BRL; discount for founder pricing (2–10 kids)
const PLAN_PRICES_BR = {
  1: { installment: '12x R$74,90', cash: 799, amount: 799, discountPercent: null, discountAmount: null },
  2: { installment: '12x R$122,90', cash: 1299, amount: 1299, discountPercent: 21, discountAmount: 299 },
  3: { installment: '12x R$169,90', cash: 1799, amount: 1799, discountPercent: 30, discountAmount: 598 },
  4: { installment: '12x R$205,90', cash: 2199, amount: 2199, discountPercent: 31, discountAmount: 997 },
  5: { installment: '12x R$219,92', cash: 2639, amount: 2639, discountPercent: 34, discountAmount: 1356 },
  6: { installment: '12x R$256,59', cash: 3079, amount: 3079, discountPercent: 36, discountAmount: 1715 },
  7: { installment: '12x R$293,25', cash: 3519, amount: 3519, discountPercent: 37, discountAmount: 2074 },
  8: { installment: '12x R$329,92', cash: 3959, amount: 3959, discountPercent: 38, discountAmount: 2433 },
  9: { installment: '12x R$366,59', cash: 4399, amount: 4399, discountPercent: 39, discountAmount: 2792 },
  10: { installment: '12x R$403,25', cash: 4839, amount: 4839, discountPercent: 39, discountAmount: 3151 },
}

// US (en): single price in USD
const PLAN_PRICES_USD = {
  1: { display: '$799', amount: 799 },
  2: { display: '$1,598', amount: 1598 },
  3: { display: '$2,397', amount: 2397 },
  4: { display: '$2,199', amount: 2199 },
  5: { display: '$2,749', amount: 2749 },
  6: { display: '$3,299', amount: 3299 },
  7: { display: '$3,849', amount: 3849 },
  8: { display: '$4,399', amount: 4399 },
  9: { display: '$4,949', amount: 4949 },
  10: { display: '$5,499', amount: 5499 },
}

// Europe (es): single price in EUR
const PLAN_PRICES_EUR = {
  1: { display: '€799', amount: 799 },
  2: { display: '€1.598', amount: 1598 },
  3: { display: '€2.397', amount: 2397 },
  4: { display: '€2.199', amount: 2199 },
  5: { display: '€2.749', amount: 2749 },
  6: { display: '€3.299', amount: 3299 },
  7: { display: '€3.849', amount: 3849 },
  8: { display: '€4.399', amount: 4399 },
  9: { display: '€4.949', amount: 4949 },
  10: { display: '€5.499', amount: 5499 },
}

const BOX_PRICE_PER_CHILD = {
  pt: 297,
  en: 99,
  es: 99,
}

function clampCount(count) {
  return Math.min(MAX_CHILDREN, Math.max(MIN_CHILDREN, count))
}

function getByCount(map, count) {
  return map[clampCount(count)] ?? map[10]
}

// No thousands separator: R$1299 not R$1.299
const fmtBRL = (n) => `R$${Number(n).toLocaleString('pt-BR', { useGrouping: false })}`

/**
 * Plan pricing for display (card + summary line).
 * @param {string} locale - 'pt' | 'en' | 'es'
 * @param {number} childCount
 * @returns {{ line1: string, line2: string, amount: number, discountPercent?: number, discountAmount?: number }}
 */
export function getPlanPricing(locale, childCount) {
  const count = clampCount(childCount)
  if (locale === 'pt') {
    const br = getByCount(PLAN_PRICES_BR, count)
    const line2 = `ou ${fmtBRL(br.cash)} à vista`
    const out = { line1: br.installment, line2, amount: br.amount }
    if (br.discountPercent != null && br.discountAmount != null) {
      out.discountPercent = br.discountPercent
      out.discountAmount = br.discountAmount
      out.discountFormatted = `Economize ${br.discountPercent}% (${fmtBRL(br.discountAmount)})`
    }
    return out
  }
  if (locale === 'es') {
    const eu = getByCount(PLAN_PRICES_EUR, count)
    return { line1: eu.display, line2: null, amount: eu.amount }
  }
  const us = getByCount(PLAN_PRICES_USD, count)
  return { line1: us.display, line2: null, amount: us.amount }
}

/**
 * Box price per child (numeric) for a locale.
 */
export function getBoxPricePerChild(locale) {
  return BOX_PRICE_PER_CHILD[locale] ?? BOX_PRICE_PER_CHILD.pt
}

/**
 * Box price per child as display string (e.g. "R$297", "$99").
 */
export function getBoxPriceDisplay(locale) {
  const n = getBoxPricePerChild(locale)
  if (locale === 'pt') return `R$${n}`
  if (locale === 'es') return `€${n}`
  return `$${n}`
}

/**
 * Box total display and amount when addBox is true.
 * @param {string} locale
 * @param {number} childCount
 * @returns {{ display: string, amount: number }}
 */
export function getBoxTotal(locale, childCount) {
  const count = clampCount(childCount)
  const perChild = getBoxPricePerChild(locale)
  const amount = perChild * count
  if (locale === 'pt') {
    const display = count === 1 ? fmtBRL(perChild) : `${count} caixas: ${fmtBRL(amount)}`
    return { display, amount }
  }
  if (locale === 'es') {
    const display = count === 1 ? `€${perChild}` : `€${amount.toLocaleString('de-DE')}`
    return { display, amount }
  }
  const display = count === 1 ? `$${perChild}` : `$${amount.toLocaleString()}`
  return { display, amount }
}

/**
 * Total row pricing (plan + optional box).
 * @param {string} locale
 * @param {number} childCount
 * @param {boolean} addBox
 * @returns {{ line1: string, line2: string }}
 */
export function getTotalPricing(locale, childCount, addBox) {
  const plan = getPlanPricing(locale, childCount)
  if (!addBox) {
    if (locale === 'pt') return { line1: plan.line1, line2: plan.line2 }
    return { line1: plan.line1, line2: null }
  }
  const box = getBoxTotal(locale, childCount)
  const totalAmount = plan.amount + box.amount
  if (locale === 'pt') {
    return {
      line1: plan.line1,
      line2: `ou ${fmtBRL(totalAmount)} à vista`,
    }
  }
  if (locale === 'es') {
    return {
      line1: `€${totalAmount.toLocaleString('de-DE')}`,
      line2: null,
    }
  }
  return {
    line1: `$${totalAmount.toLocaleString()}`,
    line2: null,
  }
}

/**
 * Fetch checkout config from backend. UI cap (maxChildren) is clamped to MAX_CHILDREN_UI.
 * @returns {Promise<{ minChildren: number, maxChildren: number, supportedLocales: string[] }>}
 */
export async function fetchCheckoutConfig() {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/checkout/config`)
  if (!res.ok) {
    const fallback = {
      minChildren: MIN_CHILDREN,
      maxChildren: MAX_CHILDREN_UI,
      supportedLocales: ['pt', 'en', 'es'],
    }
    return fallback
  }
  const data = await res.json()
  return {
    minChildren: data.minChildren ?? MIN_CHILDREN,
    maxChildren: Math.min(MAX_CHILDREN_UI, Number(data.maxChildren) || MAX_CHILDREN_UI),
    supportedLocales: Array.isArray(data.supportedLocales) ? data.supportedLocales : ['pt', 'en', 'es'],
  }
}

/**
 * Create Stripe Checkout Session via backend and return the redirect URL.
 * Requires authenticated parent (Bearer token).
 * @param {Object} opts
 * @param {string} opts.token - JWT (Bearer)
 * @param {string} opts.region - 'br' | 'us' | 'eu'
 * @param {number} opts.childCount - 1–10
 * @param {boolean} [opts.addBox=false]
 * @param {string} [opts.successUrl]
 * @param {string} [opts.cancelUrl]
 * @param {string} [opts.termsVersion]
 * @returns {Promise<{ url: string, sessionId: string }>}
 */
export async function createCheckoutSession({ token, region, childCount, addBox = false, successUrl, cancelUrl, termsVersion }) {
  const base = getApiBaseUrl()
  const res = await fetch(`${base}/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      region,
      childCount: Math.min(MAX_CHILDREN, Math.max(MIN_CHILDREN, Number(childCount) || 1)),
      addBox: Boolean(addBox),
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

/** Locale (pt/en/es) to Stripe region (br/us/eu) */
export function localeToRegion(locale) {
  const map = { pt: 'br', en: 'us', es: 'eu' }
  return map[locale] || 'us'
}

/**
 * Register parent then create Stripe session and return redirect URL.
 * Use when user submits the register form with card payment.
 * @param {Object} opts - name, email, password, region, childCount, addBox, successUrl?, cancelUrl?, termsVersion?
 * @returns {Promise<{ url: string, sessionId: string }>}
 */
export async function registerAndCreateCheckoutSession({
  name,
  email,
  password,
  region,
  childCount,
  addBox = false,
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
    addBox,
    successUrl,
    cancelUrl,
    termsVersion,
  })
}

/** Terms version accepted at checkout (must match backend). */
export const DEFAULT_TERMS_VERSION = 'terms_v1_2026-02-10'

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
