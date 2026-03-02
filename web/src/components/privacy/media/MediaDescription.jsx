import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function MediaDescription() {
  const { t } = useTranslation()
  return (
    <Typography
      component="p"
      sx={{
        fontSize: '0.9375rem',
        color: '#6B6B6B',
        lineHeight: 1.6,
        mb: 2,
        fontWeight: 600
      }}
    >
      {t('privacySettings.media.intro')}
    </Typography>
  )
}
