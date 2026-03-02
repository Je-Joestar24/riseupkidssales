import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeaderSubtitle() {
  const { t } = useTranslation()
  return (
    <>
      <Typography
        component="p"
        sx={{ fontSize: '1rem', color: '#6B6B6B', lineHeight: 1.5, mb: 0.5, fontWeight: 600 }}
      >
        {t('privacySettings.subtitle')}
      </Typography>
      <Typography
        component="p"
        sx={{ fontSize: '0.8125rem', color: '#9A9A9A', lineHeight: 1.5, fontWeight: 600 }}
      >
        {t('privacySettings.subtitleNote')}
      </Typography>
    </>
  )
}
