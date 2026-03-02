import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeaderTitle() {
  const { t } = useTranslation()
  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{
        fontSize: '2rem',
        fontWeight: 700,
        color: '#2F2F2F',
      }}
      id="privacy-settings-heading"
    >
      {t('privacySettings.pageTitle')}
    </Typography>
  )
}
