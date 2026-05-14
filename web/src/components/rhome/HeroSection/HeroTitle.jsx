import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

/**
 * Main hero headline (single accent block; font weight 600–700 per design rules).
 */
export default function HeroTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h1"
      sx={{
        fontSize: { xs: '3rem', md: '4.5rem', lg: '6rem' },
        lineHeight: 1.1,
        fontWeight: 700,
        color: 'secondary.main',
        textAlign: 'center',
        maxWidth: '100%',
      }}
    >
      {t('rhome.hero.title')}
    </Typography>
  )
}
