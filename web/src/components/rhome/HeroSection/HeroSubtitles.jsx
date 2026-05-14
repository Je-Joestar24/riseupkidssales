import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeroSubtitles() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: { xs: '100%', md: 768 },
        mx: 'auto',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          lineHeight: 1.6,
          fontWeight: 600,
          color: 'text.secondary',
        }}
      >
        {t('rhome.hero.subtitleGray')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1rem', md: '1.125rem' },
          lineHeight: 1.6,
          fontWeight: 700,
          color: 'secondary.main',
          maxWidth: 640,
        }}
      >
        {t('rhome.hero.subtitleTeal')}
      </Typography>
    </Box>
  )
}
