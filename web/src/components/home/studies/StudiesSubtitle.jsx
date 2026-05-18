import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const subtitleSx = {
  fontSize: { xs: '1.5rem', md: '1.875rem' },
  lineHeight: 1.6,
  maxWidth: 768,
  mx: 'auto',
  fontWeight: 600,
  color: 'text.secondary',
}

export default function StudiesSubtitle() {
  const { t } = useTranslation()
  const subtitle = t('studies.subtitle')

  if (subtitle && subtitle !== 'studies.subtitle') {
    return (
      <Typography component="p" sx={subtitleSx}>
        {subtitle}
      </Typography>
    )
  }

  return (
    <Typography component="p" sx={subtitleSx}>
      <span>{t('studies.subtitlePart1')}</span>
      <Typography
        component="span"
        sx={{
          color: 'orange.main',
          fontWeight: 500,
          fontSize: { xs: '1.5rem', md: '1.875rem' },
        }}
      >
        {t('studies.subtitleHighlight')}
      </Typography>
      <span>{t('studies.subtitlePart2')}</span>
    </Typography>
  )
}
