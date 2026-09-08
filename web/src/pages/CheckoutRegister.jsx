import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'
import CheckoutHeader from '../components/common/CheckoutHeader.jsx'
import RegisterHeader from '../components/checkout/register/RegisterHead.jsx'
import RegisterMain from '../components/checkout/register/RegisterMain.jsx'
import { setChildCount, setAddBox } from '../store/slices/checkoutSlice.js'
import { MIN_CHILDREN, MAX_CHILDREN_UI, getPlanPricing } from '../services/checkoutService.js'
import {
  currencyForLanguage,
  stashPurchaseIntent,
  trackInitiateCheckout,
} from '../analytics/checkoutTracking.js'

/**
 * Hydrate checkout store from URL search params (e.g. ?children=2&box=1).
 * Keeps child count and box selection when reloading or opening a shared link.
 */
function useCheckoutParams() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const childrenParam = searchParams.get('children')
    if (childrenParam != null && childrenParam !== '') {
      const n = Number(childrenParam)
      if (Number.isFinite(n)) {
        const clamped = Math.min(MAX_CHILDREN_UI, Math.max(MIN_CHILDREN, Math.floor(n)))
        dispatch(setChildCount(clamped))
      }
    }
    const boxParam = searchParams.get('box')
    if (boxParam != null) {
      dispatch(setAddBox(boxParam === '1' || boxParam === 'true'))
    }
  }, [searchParams, dispatch])
}

/**
 * Meta Pixel: fire InitiateCheckout once when the buyer reaches the details step,
 * and refresh the purchase-intent snapshot the success page reads back.
 */
function useInitiateCheckoutTracking() {
  const language = useSelector((s) => s.language.current)
  const childCount = useSelector((s) => s.checkout.childCount)
  const fired = useRef(false)

  useEffect(() => {
    const pricing = getPlanPricing(language ?? 'pt', childCount)
    const payload = {
      value: pricing.amount,
      currency: currencyForLanguage(language),
      numItems: childCount,
    }
    if (!fired.current) {
      fired.current = true
      trackInitiateCheckout(payload)
    } else {
      stashPurchaseIntent(payload)
    }
  }, [language, childCount])
}

/**
 * Checkout register step: configure account. Same layout as CheckoutPage with stepper header.
 * Accepts optional query params: children (number), box (1|0) to restore plan selection.
 */
function CheckoutRegister() {
  useCheckoutParams()
  useInitiateCheckoutTracking()

  return (
    <Box
      component="main"
      role="main"
      aria-label="Checkout - Configure sua conta"
      sx={{
        minHeight: '100vh',
        bgcolor: 'white',
      }}
    >
      <CheckoutHeader />
      <Box
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          py: 4,
          px: 2,
        }}
      >
        <RegisterHeader />
        <RegisterMain />
      </Box>
    </Box>
  )
}

export default CheckoutRegister
