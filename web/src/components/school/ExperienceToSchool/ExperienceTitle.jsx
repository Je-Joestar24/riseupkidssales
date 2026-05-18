import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

export default function ExperienceTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h2"
      id="school-application-heading"
      sx={{
        fontSize: { xs: '2.25rem', md: '3rem' },
        lineHeight: 1.2,
        fontWeight: 700,
        color: themeColors.primary,
        textAlign: 'center',
        mb: { xs: 4, md: 6 },
      }}
    >
      {t('schools.applicationForm.title')}
    </Typography>
  )
}
