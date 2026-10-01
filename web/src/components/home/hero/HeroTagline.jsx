import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const GRAY = 'rgb(75, 85, 99)'

export default function HeroTagline() {
  const { t } = useTranslation()
  return (
    <Typography
      component="p"
      sx={{
        fontSize: { xs: '1.25rem', md: '1.4rem' },
        color: GRAY,
        fontWeight: 700,
        lineHeight: 1.3,
      }}
    >
      {t('hero.tagline')}
    </Typography>
  )
}
