import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function EnglishExperienceSubtitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="p"
      sx={{
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.6,
        fontWeight: 600,
        color: 'grey.600',
        textAlign: 'center',
        mb: 6,
        maxWidth: 896,
        mx: 'auto',
        px: { xs: 0, sm: 1 },
      }}
    >
      {t('schools.experience.subtitle')}
    </Typography>
  )
}
