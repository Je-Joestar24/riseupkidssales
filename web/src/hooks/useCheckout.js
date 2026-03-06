import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setChildCount,
  setAddBox,
  incrementChildren,
  decrementChildren,
} from '../store/slices/checkoutSlice.js'
import {
  getPlanPricing,
  getTotalPricing,
  getBoxTotal,
  getBoxPricePerChild,
  getBoxPriceDisplay,
  MIN_CHILDREN,
  MAX_CHILDREN_UI,
} from '../services/checkoutService.js'

/**
 * Central checkout state and pricing. Use in SelectCard, SelectBox, SelectSummary, SelectProduct
 * to avoid prop drilling and keep prices in sync with child count and locale.
 */
export function useCheckout() {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.current)
  const childCount = useSelector((state) => state.checkout.childCount)
  const addBox = useSelector((state) => state.checkout.addBox)

  const locale = language ?? 'pt'

  const planPricing = getPlanPricing(locale, childCount)
  const totalPricing = getTotalPricing(locale, childCount, addBox)
  const boxTotal = addBox ? getBoxTotal(locale, childCount) : null
  const boxPricePerChild = getBoxPricePerChild(locale)

  const setChildCountAction = useCallback(
    (value) => dispatch(setChildCount(value)),
    [dispatch]
  )
  const setAddBoxAction = useCallback(
    (value) => dispatch(setAddBox(value)),
    [dispatch]
  )
  const increment = useCallback(() => dispatch(incrementChildren()), [dispatch])
  const decrement = useCallback(() => dispatch(decrementChildren()), [dispatch])

  return {
    // state
    childCount,
    addBox,
    locale,
    // actions
    setChildCount: setChildCountAction,
    setAddBox: setAddBoxAction,
    incrementChildren: increment,
    decrementChildren: decrement,
    // pricing (from service, depends on childCount + locale + addBox)
    planPricing: {
      line1: planPricing.line1,
      line2: planPricing.line2,
      amount: planPricing.amount,
      discountFormatted: planPricing.discountFormatted ?? null,
    },
    totalPricing: {
      line1: totalPricing.line1,
      line2: totalPricing.line2,
    },
    boxTotal: boxTotal
      ? { display: boxTotal.display, amount: boxTotal.amount }
      : null,
    boxPricePerChild,
    boxPriceDisplay: getBoxPriceDisplay(locale),
    // constants (UI cap at 3; backend supports up to 10)
    minChildren: MIN_CHILDREN,
    maxChildren: MAX_CHILDREN_UI,
  }
}

export default useCheckout
