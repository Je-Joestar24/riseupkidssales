import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'
import { useCheckout } from '../../hooks/useCheckout.js'

/**
 * Shown where a price would be while the prices (from the backend) are loading, or when they could not be loaded
 * (with a "try again"). A price is never guessed: until they arrive the pages show this and keep the buy buttons off.
 */
function PricingStatus() {
  const { t } = useTranslation()
  const { pricingStatus, retryPricing } = useCheckout()

  if (pricingStatus === 'error') {
    return (
      <Box role="alert" sx={{ fontSize: '1rem' }}>
        <Typography component="span" sx={{ fontSize: '0.875rem', color: 'error.main', fontWeight: 600, display: 'block', mb: 1 }}>
          {t('checkout.pricing.error')}
        </Typography>
        <Button size="small" variant="outlined" color="secondary" onClick={retryPricing} sx={{ textTransform: 'none' }}>
          {t('checkout.pricing.retry')}
        </Button>
      </Box>
    )
  }

  return (
    <Typography component="span" role="status" sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
      {t('checkout.pricing.loading')}
    </Typography>
  )
}

export default PricingStatus
