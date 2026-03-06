import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import successImage from '../../../assets/images/success.png'

const CORAL = '#E98A68'
const TEAL = '#62CACA'

export default function SuccessHeader() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', px: 2, py: 0, mt: -8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box
          component="img"
          src={successImage}
          alt={t('checkout.success.welcomeTitle')}
          sx={{ width: 384, height: 384, objectFit: 'contain', maxWidth: '100%' }}
        />
      </Box>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '3rem' },
          fontWeight: 700,
          mb: 2,
          color: CORAL,
        }}
      >
        {t('checkout.success.welcomeTitle')}
      </Typography>
      <Typography
        sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          mb: 2,
          color: TEAL,
        }}
      >
        {t('checkout.success.welcomeSubtitle')}
      </Typography>
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontWeight: 600,
          color: 'text.secondary',
          mb: 4,
        }}
      >
        {t('checkout.success.tagline')}
      </Typography>
    </Box>
  )
}
