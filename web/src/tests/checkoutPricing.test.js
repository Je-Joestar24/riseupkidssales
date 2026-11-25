import { describe, expect, it } from 'vitest'
import {
  findPlan,
  formatPrice,
  getMaxChildren,
  getPlanPricing,
  getSaving,
  localeToPricingRegion,
  normalizePricingResponse,
} from '../services/pricing.js'
import { BACKEND_PRICING } from './fixtures/backendPricing.js'

const clone = () => JSON.parse(JSON.stringify(BACKEND_PRICING))

describe('reading the backend answer', () => {
  it('accepts the real shape and hands it back unchanged', () => {
    expect(normalizePricingResponse(clone())).toEqual(BACKEND_PRICING)
  })

  it.each([
    ['no answer', null],
    ['not an object', 'prices'],
    ['an array', []],
    ['no limits', { regions: BACKEND_PRICING.regions }],
    ['a max below the min', { ...BACKEND_PRICING, minChildren: 3, maxChildren: 2 }],
    ['text limits', { ...BACKEND_PRICING, maxChildren: '4' }],
    ['a zero minimum', { ...BACKEND_PRICING, minChildren: 0 }],
    ['no regions', { minChildren: 1, maxChildren: 4 }],
  ])('refuses %s', (_name, data) => {
    expect(() => normalizePricingResponse(data)).toThrow(/Prices could not be read/)
  })

  it('refuses a missing region', () => {
    const data = clone()
    delete data.regions.eu
    expect(() => normalizePricingResponse(data)).toThrow(/missing eu/)
  })

  it('refuses the wrong currency for a region (a Brazilian page must never show dollars)', () => {
    const data = clone()
    data.regions.br.currency = 'USD'
    expect(() => normalizePricingResponse(data)).toThrow(/wrong currency for br/)
  })

  it('refuses a region with too few or too many plans', () => {
    const few = clone()
    few.regions.us.plans.pop()
    expect(() => normalizePricingResponse(few)).toThrow(/wrong number of plans for us/)
    const many = clone()
    many.regions.us.plans.push({ children: 5, annualCents: 1 })
    expect(() => normalizePricingResponse(many)).toThrow(/wrong number of plans for us/)
  })

  it('refuses plans that are out of order or skip a size', () => {
    const swapped = clone()
    swapped.regions.eu.plans.reverse()
    expect(() => normalizePricingResponse(swapped)).toThrow(/not in order/)
    const skipped = clone()
    skipped.regions.eu.plans[2].children = 4
    expect(() => normalizePricingResponse(skipped)).toThrow(/not in order/)
  })

  it.each([[0], [-100], [12.5], ['12000'], [null], [undefined], [NaN]])('refuses a price of %p', (cents) => {
    const data = clone()
    data.regions.br.plans[1].annualCents = cents
    expect(() => normalizePricingResponse(data)).toThrow(/bad price for br 2/)
  })

  it('refuses a plan entry that is not an object', () => {
    const data = clone()
    data.regions.br.plans[0] = null
    expect(() => normalizePricingResponse(data)).toThrow(/not in order/)
  })
})

describe('regions', () => {
  it.each([['pt', 'br'], ['en', 'us'], ['es', 'eu']])('%s page uses region %s', (locale, region) => {
    expect(localeToPricingRegion(locale)).toBe(region)
  })

  it('an unknown language falls back to Brazil, like the rest of the site', () => {
    expect(localeToPricingRegion('fr')).toBe('br')
    expect(localeToPricingRegion(undefined)).toBe('br')
  })
})

describe('formatting a price', () => {
  it.each([
    [69900, 'pt', 'R$699'],
    [129900, 'pt', 'R$1299'], // no thousands separator on the Brazilian page
    [219900, 'pt', 'R$2199'],
    [12000, 'en', '$120'],
    [31000, 'en', '$310'],
    [159800, 'en', '$1,598'],
    [12000, 'es', '€120'],
    [159800, 'es', '€1.598'],
    [12050, 'en', '$120.50'],
    [12005, 'pt', 'R$120,05'],
    [0, 'en', '$0'],
  ])('%i cents on the %s page is %s', (cents, locale, expected) => {
    expect(formatPrice(cents, locale)).toBe(expected)
  })

  it.each([[null], [undefined], [-1], [12.5], ['12000'], [NaN]])('shows nothing for %p instead of a made-up price', (cents) => {
    expect(formatPrice(cents, 'en')).toBe('')
  })

  it('an unknown language is formatted like English dollars (the checkout falls back to the Portuguese page before this)', () => {
    expect(formatPrice(12000, 'fr')).toBe('$120')
  })
})

describe('finding a plan', () => {
  it('finds the plan for a region and number of children', () => {
    expect(findPlan(BACKEND_PRICING, 'pt', 3)).toEqual({ children: 3, annualCents: 179900 })
    expect(findPlan(BACKEND_PRICING, 'es', 1)).toEqual({ children: 1, annualCents: 12000 })
  })

  it.each([[0], [5], [10], [2.5], ['2']])('there is no plan for %p children', (kids) => {
    expect(findPlan(BACKEND_PRICING, 'pt', kids)).toBeNull()
  })

  it('there is no plan before the prices are loaded', () => {
    expect(findPlan(null, 'pt', 1)).toBeNull()
    expect(findPlan(undefined, 'en', 2)).toBeNull()
    expect(findPlan({}, 'en', 2)).toBeNull()
  })

  it('the most children comes from the backend, with only one child allowed until it is loaded', () => {
    expect(getMaxChildren(BACKEND_PRICING)).toBe(4)
    expect(getMaxChildren({ ...BACKEND_PRICING, maxChildren: 6 })).toBe(6)
    expect(getMaxChildren(null)).toBe(1)
    expect(getMaxChildren(undefined, 2)).toBe(2)
    expect(getMaxChildren({ maxChildren: 'x' })).toBe(1)
  })
})

describe('the saving, worked out from the backend prices', () => {
  it.each([
    ['pt', 2, 9900, 7], // 2 x R$699 = R$1398 vs R$1299
    ['pt', 3, 29800, 14],
    ['pt', 4, 59700, 21],
    ['en', 2, 5000, 21], // 2 x $120 = $240 vs $190
    ['en', 3, 11000, 31],
    ['en', 4, 17000, 35],
  ])('%s, %i children saves %i cents (%i%%)', (locale, kids, savedCents, percent) => {
    expect(getSaving(BACKEND_PRICING, locale, kids)).toEqual({ savedCents, percent })
  })

  it('one child saves nothing, and a missing plan has no saving', () => {
    expect(getSaving(BACKEND_PRICING, 'pt', 1)).toBeNull()
    expect(getSaving(BACKEND_PRICING, 'pt', 5)).toBeNull()
    expect(getSaving(null, 'pt', 2)).toBeNull()
  })

  it('no saving when the bigger plan costs as much as buying one by one (or more)', () => {
    const flat = clone()
    flat.regions.br.plans[1].annualCents = 139800 // exactly 2 x 69900
    expect(getSaving(flat, 'pt', 2)).toBeNull()
    flat.regions.br.plans[1].annualCents = 150000
    expect(getSaving(flat, 'pt', 2)).toBeNull()
  })
})

describe('what the plan card and summary show', () => {
  it('Brazil, 1 child: R$699, no saving line', () => {
    expect(getPlanPricing(BACKEND_PRICING, 'pt', 1)).toEqual({ line1: 'R$699', line2: null, amount: 699, amountCents: 69900 })
  })

  it('Brazil, 2 to 4 children: the price and the saving worked out from the backend', () => {
    expect(getPlanPricing(BACKEND_PRICING, 'pt', 2)).toMatchObject({
      line1: 'R$1299', amount: 1299, discountPercent: 7, discountAmount: 99, discountFormatted: 'Economize 7% (R$99)',
    })
    expect(getPlanPricing(BACKEND_PRICING, 'pt', 4)).toMatchObject({ line1: 'R$2199', discountPercent: 21, discountAmount: 597, discountFormatted: 'Economize 21% (R$597)' })
  })

  it('USA and Europe show the price only (the saving line has always been Portuguese-only)', () => {
    expect(getPlanPricing(BACKEND_PRICING, 'en', 4)).toEqual({ line1: '$310', line2: null, amount: 310, amountCents: 31000 })
    expect(getPlanPricing(BACKEND_PRICING, 'es', 3)).toEqual({ line1: '€250', line2: null, amount: 250, amountCents: 25000 })
  })

  it('the second line is always empty: the page shows its own payment note, which has no number in it', () => {
    for (const locale of ['pt', 'en', 'es']) {
      for (const kids of [1, 2, 3, 4]) expect(getPlanPricing(BACKEND_PRICING, locale, kids).line2).toBeNull()
    }
  })

  it('is null while there are no prices, and for a size that is not sold', () => {
    expect(getPlanPricing(null, 'pt', 1)).toBeNull()
    expect(getPlanPricing(BACKEND_PRICING, 'pt', 5)).toBeNull()
    expect(getPlanPricing(BACKEND_PRICING, 'pt', 0)).toBeNull()
  })

  it('follows the backend: when the backend price changes, so does the page', () => {
    const changed = clone()
    changed.regions.us.plans[0].annualCents = 15000
    expect(getPlanPricing(changed, 'en', 1).line1).toBe('$150')
    expect(getPlanPricing(changed, 'en', 1).amount).toBe(150)
  })
})
