import { Stack, Typography } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeroSubtitle() {
  const { t } = useTranslation()

  return (
    <Stack
      spacing={2}
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.5rem', md: '1.875rem' },
          lineHeight: 1.5,
          fontWeight: 600,
          color: themeColors.schoolHeroLeadText,
          m: 0,
        }}
      >
        {t('schools.hero.lead')}
      </Typography>
      <Stack spacing={1} sx={{ pt: 1, width: '100%' }}>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: '1.125rem', md: '1.25rem' },
            lineHeight: 1.5,
            fontWeight: 600,
            color: 'grey.700',
            m: 0,
          }}
        >
          {t('schools.hero.body')}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.5,
            fontWeight: 600,
            color: 'grey.600',
            m: 0,
          }}
        >
          {t('schools.hero.ageLine')}
        </Typography>
      </Stack>
    </Stack>
  )
}
