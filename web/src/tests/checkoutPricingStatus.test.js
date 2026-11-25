import { beforeEach, describe, expect, it, vi } from 'vitest'

/**
 * PricingStatus (the "loading prices / could not load, try again" piece), called directly with its two hooks
 * replaced so its button can be looked at and pressed.
 */
const retryPricing = vi.fn()
const hook = { pricingStatus: 'error', retryPricing }

vi.mock('../hooks/useCheckout.js', () => ({ useCheckout: () => hook }))
vi.mock('../hooks/useTranslation.js', () => ({
  useTranslation: () => ({
    t: (key) => ({ 'checkout.pricing.loading': 'LOADING', 'checkout.pricing.error': 'ERROR', 'checkout.pricing.retry': 'RETRY' })[key] ?? key,
  }),
}))

const { default: PricingStatus } = await import('../components/checkout/PricingStatus.jsx')

/** Every element in a React element tree, depth first. */
function* elements(node) {
  if (!node || typeof node !== 'object') return
  yield node
  const children = node.props?.children
  for (const child of Array.isArray(children) ? children : [children]) yield* elements(child)
}
const textOf = (node) => [...elements(node)].map((el) => (typeof el.props?.children === 'string' ? el.props.children : '')).join(' ')

beforeEach(() => {
  retryPricing.mockClear()
  hook.pricingStatus = 'error'
})

describe('when the prices could not be loaded', () => {
  it('shows the error and a "try again" button', () => {
    const tree = PricingStatus()
    expect(textOf(tree)).toContain('ERROR')
    expect(textOf(tree)).toContain('RETRY')
    expect(tree.props.role).toBe('alert')
  })

  it('the button asks for the prices again when pressed', () => {
    const button = [...elements(PricingStatus())].find((el) => typeof el.props?.onClick === 'function')

    expect(button).toBeDefined()
    expect(button.props.onClick).toBe(retryPricing)
    button.props.onClick()
    expect(retryPricing).toHaveBeenCalledTimes(1)
  })
})

describe('while the prices load', () => {
  it.each(['loading', 'idle'])('says so (%s), with no button', (status) => {
    hook.pricingStatus = status
    const tree = PricingStatus()

    expect(textOf(tree)).toContain('LOADING')
    expect(textOf(tree)).not.toContain('RETRY')
    expect(tree.props.role).toBe('status')
    expect([...elements(tree)].some((el) => typeof el.props?.onClick === 'function')).toBe(false)
  })
})
