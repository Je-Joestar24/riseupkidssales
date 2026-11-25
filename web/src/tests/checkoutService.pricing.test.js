import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import {
  createCheckoutSession,
  createPagseguroCheckout,
  fetchCheckoutPricing,
  getPaypalTier,
  registerAndCreateCheckoutSession,
} from '../services/checkoutService.js'
import checkoutReducer, {
  decrementChildren,
  incrementChildren,
  loadPricing,
  setChildCount,
} from '../store/slices/checkoutSlice.js'
import { BACKEND_PRICING } from './fixtures/backendPricing.js'

/** A fake fetch: each call takes the next prepared answer. */
function mockFetch(...answers) {
  const calls = []
  const queue = [...answers]
  const fn = vi.fn(async (url, init) => {
    calls.push({ url, init, body: init?.body ? JSON.parse(init.body) : undefined })
    const next = queue.length > 1 ? queue.shift() : queue[0]
    if (next instanceof Error) throw next
    return {
      ok: next.ok !== false,
      status: next.status ?? 200,
      json: async () => {
        if (next.badJson) throw new Error('not json')
        return next.body
      },
    }
  })
  vi.stubGlobal('fetch', fn)
  return { fn, calls }
}

beforeEach(() => {
  vi.unstubAllGlobals()
  // The sale site's .env points at the real API; the tests always use the relative /api
  vi.stubEnv('VITE_API_URL', '')
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('fetchCheckoutPricing', () => {
  it('asks the backend for the prices and returns the checked answer', async () => {
    const { calls } = mockFetch({ body: BACKEND_PRICING })

    await expect(fetchCheckoutPricing()).resolves.toEqual(BACKEND_PRICING)

    expect(calls).toHaveLength(1)
    expect(calls[0].url).toBe('/api/checkout/pricing')
  })

  it('a server error is an error, not a price', async () => {
    mockFetch({ ok: false, status: 500, body: {} })
    await expect(fetchCheckoutPricing()).rejects.toThrow('Could not load prices (500).')
  })

  it('an answer that is not JSON is an error', async () => {
    mockFetch({ badJson: true })
    await expect(fetchCheckoutPricing()).rejects.toThrow(/Prices could not be read/)
  })

  it('a broken answer (wrong shape) is an error, never shown', async () => {
    mockFetch({ body: { minChildren: 1, maxChildren: 4, regions: {} } })
    await expect(fetchCheckoutPricing()).rejects.toThrow(/Prices could not be read/)
  })

  it('a network failure is an error', async () => {
    mockFetch(new Error('offline'))
    await expect(fetchCheckoutPricing()).rejects.toThrow('offline')
  })
})

describe('what is sent to the backend (no box, no client-side rounding)', () => {
  it('Stripe session: region, child count, and nothing about a box', async () => {
    const { calls } = mockFetch({ body: { url: 'https://stripe.test/pay', sessionId: 'cs_1' } })

    const result = await createCheckoutSession({ token: 't', region: 'br', childCount: 3, successUrl: 'https://s', cancelUrl: 'https://c', termsVersion: 'v1' })

    expect(result).toEqual({ url: 'https://stripe.test/pay', sessionId: 'cs_1' })
    expect(calls[0].url).toBe('/api/checkout/create-session')
    expect(calls[0].body).toEqual({ region: 'br', childCount: 3, successUrl: 'https://s', cancelUrl: 'https://c', termsVersion: 'v1' })
    expect(calls[0].init.headers.Authorization).toBe('Bearer t')
    expect(JSON.stringify(calls[0].body)).not.toMatch(/box/i)
  })

  it('the child count is sent as it is: the backend decides (a count above the limit is not quietly cut down here)', async () => {
    const { calls } = mockFetch({ body: { url: 'u', sessionId: 's' } })
    await createCheckoutSession({ token: 't', region: 'us', childCount: 7 })
    expect(calls[0].body.childCount).toBe(7)
  })

  it('a text count comes through as a number', async () => {
    const { calls } = mockFetch({ body: { url: 'u', sessionId: 's' } })
    await createCheckoutSession({ token: 't', region: 'us', childCount: '2' })
    expect(calls[0].body.childCount).toBe(2)
  })

  it('shows the backend message when it refuses (for example "1 to 4")', async () => {
    mockFetch({ ok: false, status: 400, body: { message: 'Child count must be a whole number from 1 to 4.' } })
    await expect(createCheckoutSession({ token: 't', region: 'br', childCount: 9 })).rejects.toThrow('Child count must be a whole number from 1 to 4.')
  })

  it('PagBank: child count, tax id and phone, and nothing about a box', async () => {
    const { calls } = mockFetch({ body: { payUrl: 'https://pay.test', checkoutId: 'CHEC_1', referenceId: 'r1' } })

    await createPagseguroCheckout({ token: 't', childCount: 2, taxId: '529.982.247-25', phone: { area: '11', number: '987654321' } })

    expect(calls[0].url).toBe('/api/pagseguro/create-checkout')
    expect(calls[0].body).toEqual({ childCount: 2, taxId: '529.982.247-25', phone: { area: '11', number: '987654321' } })
    expect(JSON.stringify(calls[0].body)).not.toMatch(/box/i)
  })

  it('sign up then Stripe session: the session request has no box', async () => {
    const { calls } = mockFetch(
      { body: { data: { token: 'jwt' } } },
      { body: { url: 'https://stripe.test/pay', sessionId: 'cs_2' } }
    )

    await registerAndCreateCheckoutSession({ name: 'A', email: 'a@b.c', password: 'secret1', region: 'eu', childCount: 4 })

    expect(calls).toHaveLength(2)
    expect(calls[0].url).toBe('/api/auth/register')
    expect(calls[1].url).toBe('/api/checkout/create-session')
    expect(calls[1].body).toEqual({ region: 'eu', childCount: 4 })
  })
})

describe('PayPal tier', () => {
  it.each([
    [[1, 'USD'], '1_child_USD'],
    [[4, 'brl', true], '4_children_yearly_BRL'],
    [[2, 'EUR', false], '2_children_EUR'],
    [[3], '3_children_USD'],
    [[0, 'USD'], '1_child_USD'],
    [[2.7, 'USD'], '2_children_USD'],
    ['x', '1_child_USD'],
  ])('%j -> %s', (args, expected) => {
    const params = Array.isArray(args) ? args : [args, 'USD']
    expect(getPaypalTier(...params)).toBe(expected)
  })

  it('does not cut a count down to a limit: a size that is not sold is refused by the backend, with its message', () => {
    expect(getPaypalTier(5, 'USD')).toBe('5_children_USD')
  })
})

describe('checkout state', () => {
  const makeStore = () => configureStore({ reducer: { checkout: checkoutReducer } })
  const state = (store) => store.getState().checkout

  it('starts with one child and no prices', () => {
    const store = makeStore()
    expect(state(store)).toEqual({ childCount: 1, pricing: { status: 'idle', data: null, error: null } })
  })

  describe('loading the prices', () => {
    it('loads them once and keeps them', async () => {
      const { fn } = mockFetch({ body: BACKEND_PRICING })
      const store = makeStore()

      const pending = store.dispatch(loadPricing())
      expect(state(store).pricing.status).toBe('loading')
      await pending

      expect(state(store).pricing).toEqual({ status: 'ready', data: BACKEND_PRICING, error: null })
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('asking again while loading does not ask the backend again', async () => {
      const { fn } = mockFetch({ body: BACKEND_PRICING })
      const store = makeStore()

      await Promise.all([store.dispatch(loadPricing()), store.dispatch(loadPricing()), store.dispatch(loadPricing())])

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('asking again once loaded does not ask the backend again either', async () => {
      const { fn } = mockFetch({ body: BACKEND_PRICING })
      const store = makeStore()
      await store.dispatch(loadPricing())
      await store.dispatch(loadPricing())
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('a failure is kept as an error with its reason, and no prices', async () => {
      mockFetch({ ok: false, status: 503, body: {} })
      const store = makeStore()

      await store.dispatch(loadPricing())

      expect(state(store).pricing).toEqual({ status: 'error', data: null, error: 'Could not load prices (503).' })
    })

    it('after a failure, asking again tries again, and success clears the error', async () => {
      const { fn } = mockFetch({ ok: false, status: 500, body: {} }, { body: BACKEND_PRICING })
      const store = makeStore()
      await store.dispatch(loadPricing())
      expect(state(store).pricing.status).toBe('error')

      await store.dispatch(loadPricing())

      expect(state(store).pricing).toEqual({ status: 'ready', data: BACKEND_PRICING, error: null })
      expect(fn).toHaveBeenCalledTimes(2)
    })

    it('a broken answer ends as an error, not as prices', async () => {
      mockFetch({ body: { minChildren: 1, maxChildren: 4, regions: {} } })
      const store = makeStore()
      await store.dispatch(loadPricing())
      expect(state(store).pricing.status).toBe('error')
      expect(state(store).pricing.data).toBeNull()
    })
  })

  describe('the number of children', () => {
    const readyStore = async () => {
      mockFetch({ body: BACKEND_PRICING })
      const store = makeStore()
      await store.dispatch(loadPricing())
      return store
    }

    it('can not go above the backend limit once the prices are loaded', async () => {
      const store = await readyStore()
      store.dispatch(setChildCount(9))
      expect(state(store).childCount).toBe(4)
      store.dispatch(setChildCount(4))
      store.dispatch(incrementChildren())
      expect(state(store).childCount).toBe(4)
    })

    it('can not go below one', async () => {
      const store = await readyStore()
      store.dispatch(setChildCount(0))
      expect(state(store).childCount).toBe(1)
      store.dispatch(setChildCount(-3))
      expect(state(store).childCount).toBe(1)
      store.dispatch(decrementChildren())
      expect(state(store).childCount).toBe(1)
    })

    it('goes up and down one at a time inside the limits', async () => {
      const store = await readyStore()
      store.dispatch(incrementChildren())
      store.dispatch(incrementChildren())
      expect(state(store).childCount).toBe(3)
      store.dispatch(decrementChildren())
      expect(state(store).childCount).toBe(2)
    })

    it.each([['2', 2], [2.9, 2], ['abc', 1], [null, 1], [undefined, 1], [NaN, 1]])('a count of %p becomes %i', async (input, expected) => {
      const store = await readyStore()
      store.dispatch(setChildCount(input))
      expect(state(store).childCount).toBe(expected)
    })

    it('can not be raised before the prices are loaded (the limit is not known yet)', () => {
      const store = makeStore()
      store.dispatch(incrementChildren())
      expect(state(store).childCount).toBe(1)
    })

    it('a shared link with 3 children keeps 3 while loading, then it is checked against the limit', async () => {
      mockFetch({ body: BACKEND_PRICING })
      const store = makeStore()
      store.dispatch(setChildCount(3))
      expect(state(store).childCount).toBe(3)
      await store.dispatch(loadPricing())
      expect(state(store).childCount).toBe(3)
    })

    it('a shared link with 10 children is brought down to the backend limit as soon as the prices arrive', async () => {
      mockFetch({ body: BACKEND_PRICING })
      const store = makeStore()
      store.dispatch(setChildCount(10))
      expect(state(store).childCount).toBe(10)
      await store.dispatch(loadPricing())
      expect(state(store).childCount).toBe(4)
    })

    it('follows a different limit from the backend', async () => {
      mockFetch({ body: { ...BACKEND_PRICING, maxChildren: 4 } })
      const store = makeStore()
      await store.dispatch(loadPricing())
      store.dispatch(setChildCount(99))
      expect(state(store).childCount).toBe(BACKEND_PRICING.maxChildren)
    })
  })
})
