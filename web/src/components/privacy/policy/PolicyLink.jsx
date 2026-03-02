import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function PolicyLink() {
  const { t } = useTranslation()
  return (
    <Button
      component="a"
      href="/privacy-policy"
      endIcon={<ArrowForwardIcon sx={{ fontSize: 20 }} />}
      sx={{
        fontSize: '0.9375rem',
        fontWeight: 700,
        color: 'primary.main',
        p: 0,
        minWidth: 0,
        '&:hover': { opacity: 0.7, bgcolor: 'transparent' },
        transition: 'opacity 0.2s',
      }}
      aria-label={t('privacySettings.policy.viewPolicy')}
    >
      {t('privacySettings.policy.viewPolicy')}
    </Button>
  )
}
