import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function InvitationFooter() {
  const { t } = useTranslation()

  return (
    <Typography
      component="p"
      sx={{
        textAlign: 'center',
        mt: { xs: 3, md: 4 },
        fontSize: { xs: '0.95rem', md: '1.05rem' },
        color: 'grey.800',
        fontWeight: 600,
      }}
    >
      {t('invitation.footer')}
    </Typography>
  )
}
