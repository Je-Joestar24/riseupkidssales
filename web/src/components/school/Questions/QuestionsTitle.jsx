import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

export default function QuestionsTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h2"
      id="school-questions-heading"
      sx={{
        fontSize: { xs: '2.25rem', md: '3rem' },
        lineHeight: 1.2,
        fontWeight: 700,
        color: themeColors.secondary,
        textAlign: 'center',
        mb: { xs: 6, md: 8 },
      }}
    >
      {t('schools.faq.title')}
    </Typography>
  )
}
