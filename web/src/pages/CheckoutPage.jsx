import { useEffect } from 'react'
import { Box } from '@mui/material'
import CheckoutHeader from '../components/common/CheckoutHeader.jsx'
import SelectHeader from '../components/checkout/select/SelectHeader.jsx'
import SelectMain from '../components/checkout/select/SelectMain.jsx'
import SelectFooter from '../components/checkout/select/SelectFooter.jsx'
import { useCheckout } from '../hooks/useCheckout.js'
import { currencyForLanguage, stashPurchaseIntent } from '../analytics/checkoutTracking.js'

const CHECKOUT_PAGE_BG = 'rgb(252, 249, 243)'

function CheckoutPage() {
  const { locale, childCount, planPricing } = useCheckout()

  // Keep the Meta Pixel purchase-intent snapshot in step with the plan the
  // visitor is configuring; the Purchase event on /checkout/success reads it.
  useEffect(() => {
    stashPurchaseIntent({
      value: planPricing.amount,
      currency: currencyForLanguage(locale),
      numItems: childCount,
    })
  }, [locale, childCount, planPricing.amount])

  return (
    <Box
      component="main"
      role="main"
      aria-label="Checkout - Complete sua matrícula"
      sx={{
        minHeight: '100vh',
        bgcolor:  'white',
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
        <SelectHeader />
        <SelectMain />
      </Box>
    </Box>
  )
}

export default CheckoutPage
