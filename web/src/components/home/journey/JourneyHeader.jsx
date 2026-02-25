import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function JourneyHeader() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 8,
      }}
    >
      <Typography
        id="journey-heading"
        component="h2"
        variant="h2"
        sx={{
          fontSize: { xs: '2.5rem', md: '3.75rem' },
          mb: 3,
          color: 'grey.700',
        }}
      >
        {t('journey.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: '1.5rem',
          color: 'grey.700',
          maxWidth: 768,
          mx: 'auto',
        }}
      >
        {t('journey.subtitle')}
      </Typography>
    </Box>
  )
}
