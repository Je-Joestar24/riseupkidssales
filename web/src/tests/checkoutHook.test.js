import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BACKEND_PRICING } from './fixtures/backendPricing.js'

/**
 * useCheckout, called directly with the React hooks replaced by plain versions, so what the page does "when it
 * opens" (an effect) actually runs here: it must ask for the prices once, and hand the pages what they need.
 */
const state = { language: 'pt', childCount: 2, pricing: { status: 'idle', data: null, error: null } }
const dispatched = []
const dispatch = vi.fn((action) => {
  dispatched.push(action)
  return action
})

vi.mock('react', async (importOriginal) => ({
  ...(await importOriginal()),
  useEffect: (fn) => fn(), // run the "on open" effect straight away
  useCallback: (fn) => fn,
}))
vi.mock('react-redux', () => ({
  useDispatch: () => dispatch,
  useSelector: (selector) => selector({ language: { current: state.language }, checkout: { childCount: state.childCount, pricing: state.pricing } }),
}))

const { useCheckout } = await import('../hooks/useCheckout.js')

beforeEach(() => {
  dispatched.length = 0
  dispatch.mockClear()
  state.language = 'pt'
  state.childCount = 2
  state.pricing = { status: 'idle', data: null, error: null }
})

const isThunk = (action) => typeof action === 'function'

describe('opening a checkout page', () => {
  it('asks for the prices (once per opening)', () => {
    useCheckout()
    expect(dispatched.filter(isThunk)).toHaveLength(1)
  })

  it('"try again" asks for the prices again', () => {
    const hook = useCheckout()
    dispatched.length = 0
    hook.retryPricing()
    expect(dispatched.filter(isThunk)).toHaveLength(1)
  })
})

describe('what the pages are given', () => {
  it('before the prices arrive: not ready, no price, no total, one child at most', () => {
    const hook = useCheckout()
    expect(hook.pricingReady).toBe(false)
    expect(hook.pricingStatus).toBe('idle')
    expect(hook.planPricing).toEqual({ line1: '', line2: null, amount: 0, discountFormatted: null })
    expect(hook.totalPricing).toEqual({ line1: '', line2: null })
    expect(hook.maxChildren).toBe(1)
    expect(hook.minChildren).toBe(1)
  })

  it.each(['loading', 'error'])('while %s it is still not ready and shows no price', (status) => {
    state.pricing = { status, data: null, error: status === 'error' ? 'Could not load prices (500).' : null }
    const hook = useCheckout()
    expect(hook.pricingReady).toBe(false)
    expect(hook.planPricing.line1).toBe('')
    expect(hook.pricingError).toBe(status === 'error' ? 'Could not load prices (500).' : null)
  })

  it('once loaded: ready, the price for the language and number of children, the total is the plan price, the limit from the backend', () => {
    state.pricing = { status: 'ready', data: BACKEND_PRICING, error: null }
    const hook = useCheckout()

    expect(hook.pricingReady).toBe(true)
    expect(hook.planPricing).toMatchObject({ line1: 'R$1299', line2: null, amount: 1299, discountFormatted: 'Economize 7% (R$99)' })
    expect(hook.totalPricing).toEqual({ line1: 'R$1299', line2: null })
    expect(hook.maxChildren).toBe(4)
    expect(hook.childCount).toBe(2)
    expect(hook.locale).toBe('pt')
  })

  it('follows the language', () => {
    state.pricing = { status: 'ready', data: BACKEND_PRICING, error: null }
    state.language = 'en'
    expect(useCheckout().planPricing.line1).toBe('$190')
    state.language = 'es'
    state.childCount = 4
    expect(useCheckout().planPricing.line1).toBe('€310')
  })

  it('a count the backend does not sell is not ready (never a made-up price)', () => {
    state.pricing = { status: 'ready', data: BACKEND_PRICING, error: null }
    state.childCount = 7
    const hook = useCheckout()
    expect(hook.pricingReady).toBe(false)
    expect(hook.planPricing.line1).toBe('')
  })

  it('has no box and no box price any more', () => {
    state.pricing = { status: 'ready', data: BACKEND_PRICING, error: null }
    const hook = useCheckout()
    for (const key of Object.keys(hook)) expect(key).not.toMatch(/box/i)
  })

  it('the actions change the count', () => {
    const hook = useCheckout()
    dispatched.length = 0
    hook.setChildCount(3)
    hook.incrementChildren()
    hook.decrementChildren()
    expect(dispatched.map((action) => action.type)).toEqual(['checkout/setChildCount', 'checkout/incrementChildren', 'checkout/decrementChildren'])
    expect(dispatched[0].payload).toBe(3)
  })
})
