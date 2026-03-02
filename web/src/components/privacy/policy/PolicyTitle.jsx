import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function PolicyTitle() {
  const { t } = useTranslation()
  return (
    <Typography
      component="h2"
      id="policy-consent-heading"
      sx={{
        fontSize: '1.125rem',
        fontWeight: 700,
        color: '#2F2F2F',
        mb: 1.5,
      }}
    >
      {t('privacySettings.policy.title')}
    </Typography>
  )
}
