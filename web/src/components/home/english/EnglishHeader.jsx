import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function EnglishHeader() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        component="h2"
        id="english-heading"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.secondary',
          mb: 3,
        }}
      >
        {t('english.title', 'The English journey at Rise Up Kids')}
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
        {t('english.subtitle', 'How children really learn')}
      </Typography>
    </Box>
  )
}
