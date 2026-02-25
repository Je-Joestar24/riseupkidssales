import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function MethodologyTitle() {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 8,
      }}
    >
      <Typography
        id="methodology-heading"
        component="h2"
        variant="h2"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '2.5rem', md: '3rem', lg: '3.75rem' },
          fontWeight: 600,
          mb: 3,
        }}
      >
        {t('methodology.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          color: 'text.secondary',
          maxWidth: 768,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        {t('methodology.subtitle')}
      </Typography>
    </Box>
  )
}
