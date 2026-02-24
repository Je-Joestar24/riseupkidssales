import { Typography } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'

export default function HeroSubtitle() {
  const { t } = useTranslation()
  return (
    <Typography
      component="p"
      sx={{
        fontSize: { xs: '1.125rem', md: '1.2rem' },
        color: 'black',
        lineHeight: 1.6,
        fontWeight: 600,
      }}
    >
      {t('hero.subtitle')}
    </Typography>
  )
}
