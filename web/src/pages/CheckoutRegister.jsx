import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import CheckoutHeader from '../components/common/CheckoutHeader.jsx'
import RegisterHeader from '../components/checkout/register/RegisterHead.jsx'
import RegisterMain from '../components/checkout/register/RegisterMain.jsx'
import { setChildCount } from '../store/slices/checkoutSlice.js'
import { useCheckout } from '../hooks/useCheckout.js'
import {
  currencyForLanguage,
  stashPurchaseIntent,
  trackInitiateCheckout,
} from '../analytics/checkoutTracking.js'

/**
 * Hydrate checkout store from URL search params (e.g. ?children=2).
 * Keeps the child count when reloading or opening a shared link. The most children allowed comes from the
 * backend prices; a count above it is brought inside the limit as soon as they are loaded.
 */
function useCheckoutParams() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()

  useEffect(() => {
    const childrenParam = searchParams.get('children')
    if (childrenParam != null && childrenParam !== '') {
      const n = Number(childrenParam)
      if (Number.isFinite(n)) {
        dispatch(setChildCount(Math.floor(n)))
      }
    }
    // Activity box: switched off. It used to read the `box` parameter:
    //   const boxParam = searchParams.get('box')
    //   if (boxParam != null) dispatch(setAddBox(boxParam === '1' || boxParam === 'true'))
  }, [searchParams, dispatch])
}

/**
 * Meta Pixel: fire InitiateCheckout once when the buyer reaches the details step,
 * and refresh the purchase-intent snapshot the success page reads back.
 */
function useInitiateCheckoutTracking() {
  const { locale, childCount, planPricing, pricingReady } = useCheckout()
  const fired = useRef(false)

  useEffect(() => {
    // The value reported is the real price from the backend, so wait until it is known
    if (!pricingReady) return
    const payload = {
      value: planPricing.amount,
      currency: currencyForLanguage(locale),
      numItems: childCount,
    }
    if (!fired.current) {
      fired.current = true
      trackInitiateCheckout(payload)
    } else {
      stashPurchaseIntent(payload)
    }
  }, [locale, childCount, planPricing.amount, pricingReady])
}

/**
 * Checkout register step: configure account. Same layout as CheckoutPage with stepper header.
 * Accepts an optional query param: children (number) to restore the plan selection.
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
