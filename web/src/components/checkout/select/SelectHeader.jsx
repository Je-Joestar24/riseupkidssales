import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

/**
 * Checkout page header: title and subtitle for the enrollment step.
 */
function SelectHeader() {
  const { t } = useTranslation()
  return (
    <Box
      component="header"
      sx={{
        textAlign: 'center',
        mb: 4,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{
          mb: 1,
          color: 'secondary.main',
          fontSize: { xs: '1.875rem', md: '2.25rem' },
          fontWeight: 700,
        }}
      >
        {t('checkout.select.title')}
      </Typography>
      <Typography
        component="p"
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        {t('checkout.select.subtitle')}
      </Typography>
    </Box>
  )
}

export default SelectHeader
