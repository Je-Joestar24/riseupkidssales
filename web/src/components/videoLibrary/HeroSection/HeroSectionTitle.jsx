import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeroSectionTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h1"
      id="video-library-hero-heading"
      sx={{
        fontSize: { xs: '2.25rem', md: '3.75rem' },
        lineHeight: 1.25,
        fontWeight: 700,
        color: 'primary.main',
        textAlign: 'center',
        mb: { xs: 3, md: 3 },
      }}
    >
      {t('videos.hero.title')}
    </Typography>
  )
}
