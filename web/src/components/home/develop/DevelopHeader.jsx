import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function DevelopHeader() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        component="h2"
        id="develop-heading"
        variant="h2"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.secondary',
          mb: 3,
          maxWidth: 1000,
          mx: 'auto',
        }}
      >
        {t('develop.title', 'Inside the Rise Up Kids experience')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          color: 'text.secondary',
          maxWidth: 672,
          mx: 'auto',
        }}
      >
        {t('develop.subtitle', 'The child develops much more than a language.')}
      </Typography>
    </Box>
  )
}
