import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function StudiesSubtitle() {
  const { t } = useTranslation()
  return (
    <Typography
      component="p"
      sx={{
        fontSize: { xs: '1.5rem', md: '1.875rem' },
        lineHeight: 1.6,
        maxWidth: 768,
        mx: 'auto',
        fontWeight: 600,
        color: 'text.secondary',
      }}
    >
      <span>{t('studies.subtitlePart1')}</span>
      <Typography
        component="span"
        sx={{ color: 'orange.main', fontWeight: 500,
            fontSize: { xs: '1.5rem', md: '1.875rem' }, }}
      >
        {t('studies.subtitleHighlight')}
      </Typography>
      <span>{t('studies.subtitlePart2')}</span>
    </Typography>
  )
}
