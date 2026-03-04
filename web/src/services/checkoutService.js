/**
 * Checkout service: static pricing data and getters (locale-aware).
 * Use with useCheckout for a single source of truth across summary and plan card.
 */

export const MIN_CHILDREN = 1
export const MAX_CHILDREN = 10

// Brazil (pt): installment + cash in BRL
const PLAN_PRICES_BR = {
  1: { installment: '12x R$74,90', cash: 'R$799', amount: 799 },
  2: { installment: '12x R$149,80', cash: 'R$1.598', amount: 1598 },
  3: { installment: '12x R$187,30', cash: 'R$2.397', amount: 2397 },
  4: { installment: '12x de R$205,90', cash: 'R$2.199', amount: 2199 },
  5: { installment: '12x de R$257,40', cash: 'R$2.749', amount: 2749 },
  6: { installment: '12x de R$308,90', cash: 'R$3.299', amount: 3299 },
  7: { installment: '12x de R$360,40', cash: 'R$3.849', amount: 3849 },
  8: { installment: '12x de R$411,90', cash: 'R$4.399', amount: 4399 },
  9: { installment: '12x de R$463,40', cash: 'R$4.949', amount: 4949 },
  10: { installment: '12x de R$514,90', cash: 'R$5.499', amount: 5499 },
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

/**
 * Plan pricing for display (card + summary line).
 * @param {string} locale - 'pt' | 'en' | 'es'
 * @param {number} childCount
 * @returns {{ line1: string, line2: string, amount: number }}
 */
export function getPlanPricing(locale, childCount) {
  const count = clampCount(childCount)
  if (locale === 'pt') {
    const br = getByCount(PLAN_PRICES_BR, count)
    return { line1: br.installment, line2: br.cash, amount: br.amount }
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
    const fmt = (n) => `R$${n.toLocaleString('pt-BR')}`
    const display = count === 1 ? fmt(perChild) : `${count} caixas: ${fmt(amount)}`
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
    const fmt = (n) => `R$${n.toLocaleString('pt-BR')}`
    return {
      line1: plan.line1,
      line2: `ou ${fmt(totalAmount)} à vista`,
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
 * Sample "API" call: fetch checkout config (static for now).
 */
export async function fetchCheckoutConfig() {
  await new Promise((r) => setTimeout(r, 100))
  return {
    minChildren: MIN_CHILDREN,
    maxChildren: MAX_CHILDREN,
    supportedLocales: ['pt', 'en', 'es'],
  }
}
