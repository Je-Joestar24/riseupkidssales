import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ProfileTitle() {
  const { t } = useTranslation()
  return (
    <>
      <Typography
        component="h2"
        id="child-profile-heading"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 700,
          color: '#2F2F2F',
          mb: 1.5,
        }}
      >
        {t('privacySettings.profile.title')}
      </Typography>
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
        {t('privacySettings.profile.intro')}
      </Typography>
    </>
  )
}
