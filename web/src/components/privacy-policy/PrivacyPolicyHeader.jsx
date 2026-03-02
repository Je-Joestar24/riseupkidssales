import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'

const TEAL = '#62caca'

export default function PrivacyPolicyHeader() {
  const { t } = useTranslation()
  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: '3rem', md: '3.75rem' },
          fontWeight: 700,
          color: TEAL,
          mb: 3,
        }}
        id="privacy-policy-title"
      >
        {t('privacyPolicy.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: '1.25rem',
          color: 'text.secondary',
          fontWeight: 600,
        }}
      >
        {t('privacyPolicy.lastUpdated')}
      </Typography>
    </Box>
  )
}
