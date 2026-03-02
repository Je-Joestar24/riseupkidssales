import { Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function DataProtectionDescription() {
  const { t } = useTranslation()
  const sx = {
    fontSize: '0.9375rem', color: '#6B6B6B', lineHeight: 1.6,
    fontWeight: 600
  }
  return (
    <Stack spacing={1.5}>
      <Typography component="p" sx={sx}>
        {t('privacySettings.dataProtection.p1')}
      </Typography>
      <Typography component="p" sx={sx}>
        {t('privacySettings.dataProtection.p2')}
      </Typography>
    </Stack>
  )
}
