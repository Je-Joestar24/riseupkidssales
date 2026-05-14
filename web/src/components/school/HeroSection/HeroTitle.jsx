import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeroTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h1"
      sx={{
        fontSize: { xs: '3rem', md: '4.5rem' },
        lineHeight: 1.15,
        fontWeight: 700,
        color: 'primary.main',
        textAlign: 'center',
        maxWidth: '100%',
      }}
    >
      {t('schools.hero.title')}
    </Typography>
  )
}
