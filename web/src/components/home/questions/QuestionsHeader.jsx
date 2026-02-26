import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function QuestionsHeader() {
  const { t } = useTranslation()

  return (
    <Typography
      id="questions-heading"
      component="h2"
      variant="h2"
      sx={{
        textAlign: 'center',
        mb: 8,
        fontSize: { xs: '2.5rem', md: '3.75rem' },
        color: 'grey.700',
      }}
    >
      {t('questions.title')}
    </Typography>
  )
}
