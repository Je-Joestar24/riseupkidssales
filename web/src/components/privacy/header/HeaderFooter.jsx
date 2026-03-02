import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeaderFooter() {
  const { t } = useTranslation()
  return (
    <Typography
      component="p"
      sx={{
        fontSize: '0.8125rem',
        color: '#9A9A9A',
        lineHeight: 1.6,
        textAlign: 'center', fontWeight: 600
      }}
    >
      {t('privacySettings.footer.line1')}
      <br />
      {t('privacySettings.footer.line2')}
    </Typography>
  )
}
