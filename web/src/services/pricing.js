/**
 * Family Plan prices as the checkout pages use them.
 *
 * There are NO price numbers in this file or anywhere else on the page: everything comes from the backend
 * (GET /api/checkout/pricing, the one price list), so what is shown is what is charged. This file only
 *   - checks that the answer from the backend looks right (a broken answer must never become a wrong price),
 *   - formats cents for display, and
 *   - works out the saving between plans from those same numbers.
 *
 * Shape of the backend answer (annual prices, whole cents; monthly is never in it while the option is closed):
 *   { minChildren, maxChildren, regions: { br: { currency: 'BRL', plans: [{ children: 1, annualCents: ... }, ...] }, us: {...}, eu: {...} } }
 */

const LOCALE_REGION = { pt: 'br', en: 'us', es: 'eu' }
const REGIONS = ['br', 'us', 'eu']
const CURRENCIES = { br: 'BRL', us: 'USD', eu: 'EUR' }

/** Locale (pt/en/es) to the backend region (br/us/eu). */
export function localeToPricingRegion(locale) {
  return LOCALE_REGION[locale] || LOCALE_REGION.pt
}

const isWholeNumber = (value) => typeof value === 'number' && Number.isInteger(value)

/**
 * Validates the backend answer and returns it unchanged, or throws. A wrong or half-loaded answer is an error the
 * page shows ("could not load prices"), never a guess.
 * @throws {Error}
 */
export function normalizePricingResponse(data) {
  const fail = (why) => {
    throw new Error(`Prices could not be read (${why}).`)
  }
  if (!data || typeof data !== 'object') fail('no answer')
  const { minChildren, maxChildren, regions } = data
  if (!isWholeNumber(minChildren) || !isWholeNumber(maxChildren) || minChildren < 1 || maxChildren < minChildren) {
    fail('bad child limits')
  }
  if (!regions || typeof regions !== 'object') fail('no regions')

  for (const region of REGIONS) {
    const entry = regions[region]
    if (!entry || typeof entry !== 'object') fail(`missing ${region}`)
    if (entry.currency !== CURRENCIES[region]) fail(`wrong currency for ${region}`)
    if (!Array.isArray(entry.plans) || entry.plans.length !== maxChildren - minChildren + 1) fail(`wrong number of plans for ${region}`)
    entry.plans.forEach((plan, index) => {
      if (!plan || plan.children !== minChildren + index) fail(`plans for ${region} are not in order`)
      if (!isWholeNumber(plan.annualCents) || plan.annualCents < 1) fail(`bad price for ${region} ${plan.children}`)
    })
  }
  return data
}

/** The plan for this region and number of children, or null when there is none (not loaded, or not sold). */
export function findPlan(pricing, locale, childCount) {
  const entry = pricing?.regions?.[localeToPricingRegion(locale)]
  return entry?.plans?.find((plan) => plan.children === childCount) ?? null
}

/** Most children a family can sign up (from the backend), or the minimum while prices are not loaded. */
export function getMaxChildren(pricing, fallback = 1) {
  return pricing && isWholeNumber(pricing.maxChildren) ? pricing.maxChildren : fallback
}

function groupingFor(locale) {
  if (locale === 'pt') return { tag: 'pt-BR', symbol: 'R$', useGrouping: false } // R$1299, not R$1.299
  if (locale === 'es') return { tag: 'de-DE', symbol: '€', useGrouping: true } // €1.598
  return { tag: 'en-US', symbol: '$', useGrouping: true } // $1,598
}

/** 69900 -> "R$699" (pt), 12000 -> "$120" (en), 12000 -> "€120" (es). Shows cents only when there are any. */
export function formatPrice(cents, locale) {
  if (!isWholeNumber(cents) || cents < 0) return ''
  const { tag, symbol, useGrouping } = groupingFor(locale)
  const hasCents = cents % 100 !== 0
  const text = (cents / 100).toLocaleString(tag, {
    useGrouping,
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  })
  return `${symbol}${text}`
}

/**
 * What the families save by one plan compared with buying 1-child plans one by one, from the backend's own numbers.
 * Returns null for 1 child or when there is no saving.
 */
export function getSaving(pricing, locale, childCount) {
  if (childCount <= 1) return null
  const single = findPlan(pricing, locale, 1)
  const plan = findPlan(pricing, locale, childCount)
  if (!single || !plan) return null
  const separate = single.annualCents * childCount
  const savedCents = separate - plan.annualCents
  if (savedCents <= 0) return null
  return { savedCents, percent: Math.round((savedCents / separate) * 100) }
}

/**
 * Plan pricing for display, from the backend prices.
 * @returns {{ line1: string, line2: null, amount: number, amountCents: number, discountPercent?: number,
 *             discountAmount?: number, discountFormatted?: string } | null}  null while prices are not available
 *   line1 is the annual price; line2 is always null: the page shows its own payment note (a translation without numbers).
 *   `amount` is in whole currency units (699 = R$699) for the places that want a number (PayPal message, analytics).
 */
export function getPlanPricing(pricing, locale, childCount) {
  const plan = findPlan(pricing, locale, childCount)
  if (!plan) return null
  const out = {
    line1: formatPrice(plan.annualCents, locale),
    line2: null,
    amount: plan.annualCents / 100,
    amountCents: plan.annualCents,
  }
  // The saving line has always been shown on the Portuguese page only; it is now worked out from the backend prices
  if (locale === 'pt') {
    const saving = getSaving(pricing, locale, childCount)
    if (saving) {
      out.discountPercent = saving.percent
      out.discountAmount = saving.savedCents / 100
      out.discountFormatted = `Economize ${saving.percent}% (${formatPrice(saving.savedCents, 'pt')})`
    }
  }
  return out
}
