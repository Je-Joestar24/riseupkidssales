import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setChildCount,
  incrementChildren,
  decrementChildren,
  loadPricing,
} from '../store/slices/checkoutSlice.js'
import { MIN_CHILDREN } from '../services/checkoutService.js'
import { getPlanPricing, getMaxChildren } from '../services/pricing.js'

/**
 * Central checkout state and pricing. Use in SelectCard, SelectSummary, SelectProduct, RegisterSummary and the form
 * to keep prices in sync with child count and locale.
 *
 * The prices come from the backend (the one price list). Until they are loaded `pricingReady` is false and
 * `planPricing.line1` is empty: pages show "loading" (or the error with a retry) and keep the buy buttons off,
 * so nobody can be shown or charged a made-up price.
 */
export function useCheckout() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.current)
  const childCount = useSelector((state) => state.checkout.childCount)
  const pricing = useSelector((state) => state.checkout.pricing)
  // Activity box: switched off (see docs/ACTIVITY_BOX_DISABLED.md in the main repository). It used to read
  //   const addBox = useSelector((state) => state.checkout.addBox)
  // and return addBox, setAddBox, boxTotal, boxPricePerChild and boxPriceDisplay, and used getTotalPricing(locale, childCount, addBox).

  const locale = language ?? 'pt'

  // Ask for the prices once (asking again while loading or loaded does nothing)
  useEffect(() => {
    dispatch(loadPricing())
  }, [dispatch])

  const plan = pricing.status === 'ready' ? getPlanPricing(pricing.data, locale, childCount) : null
  const pricingReady = plan !== null

  const setChildCountAction = useCallback((value) => dispatch(setChildCount(value)), [dispatch])
  const increment = useCallback(() => dispatch(incrementChildren()), [dispatch])
  const decrement = useCallback(() => dispatch(decrementChildren()), [dispatch])
  const retryPricing = useCallback(() => dispatch(loadPricing()), [dispatch])

  return {
    // state
    childCount,
    locale,
    // actions
    setChildCount: setChildCountAction,
    incrementChildren: increment,
    decrementChildren: decrement,
    // prices from the backend
    pricingReady,
    pricingStatus: pricing.status,
    pricingError: pricing.error,
    retryPricing,
    planPricing: {
      line1: plan?.line1 ?? '',
      line2: plan?.line2 ?? null,
      amount: plan?.amount ?? 0,
      discountFormatted: plan?.discountFormatted ?? null,
    },
    // No box and nothing else is added: the total is the plan price
    totalPricing: {
      line1: plan?.line1 ?? '',
      line2: null,
    },
    // limits (the most children comes from the backend; until prices load only the minimum is allowed)
    minChildren: MIN_CHILDREN,
    maxChildren: getMaxChildren(pricing.data, MIN_CHILDREN),
  }
}

export default useCheckout
