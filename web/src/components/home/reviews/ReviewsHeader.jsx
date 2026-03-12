import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ReviewsHeader() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        component="h2"
        id="reviews-heading"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.secondary',
          mb: 3,
        }}
      >
        {t('reviews.title', 'What Families Say')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 600,
          fontSize: '1.5rem',
          color: 'text.secondary',
        }}
      >
        {t('reviews.subtitle', 'Verified testimonials from real families')}
      </Typography>
    </Box>
  )
}
