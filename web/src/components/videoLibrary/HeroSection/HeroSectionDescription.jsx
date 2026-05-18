import { Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeroSectionDescription() {
  const { t } = useTranslation()

  return (
    <Stack spacing={2} sx={{ maxWidth: 768, mx: 'auto', textAlign: 'center' }}>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          lineHeight: 1.5,
          fontWeight: 600,
          color: 'grey.700',
          mb: { xs: 1, md: 2 },
        }}
      >
        {t('videos.hero.subtitle')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          lineHeight: 1.6,
          fontWeight: 400,
          color: 'grey.600',
        }}
      >
        {t('videos.hero.description')}
      </Typography>
    </Stack>
  )
}
