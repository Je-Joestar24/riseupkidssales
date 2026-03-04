import { Box } from '@mui/material'
import smallLogo from '../../assets/images/small-logo.png'
import { useTranslation } from '../../hooks/useTranslation.js'

/**
 * Checkout header with logo. Scrolls with the page (not fixed).
 */
function CheckoutHeader() {
  const { t } = useTranslation()
  return (
    <Box
      component="header"
      role="banner"
      aria-label={t('checkout.header.ariaLabel')}
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          height: 128,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={smallLogo}
          alt={t('checkout.header.logoAlt')}
          sx={{
            width: 'auto',
            height: 80,
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </Box>
    </Box>
  )
}

export default CheckoutHeader
