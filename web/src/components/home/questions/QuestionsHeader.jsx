import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function QuestionsHeader() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        id="questions-heading"
        component="h2"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '2.5rem', md: '3.75rem' },
          color: 'grey.700',
        }}
      >
        {t('questions.title')}
      </Typography>
    </Box>
  )
}
