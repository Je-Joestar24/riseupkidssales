import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function InvitationFooter() {
  const { t } = useTranslation()

  return (
    <Typography
      component="p"
      sx={{
        textAlign: 'center',
        mt: 5,
        fontSize: '1.125rem',
        color: 'grey.600',
        fontWeight: 600,
      }}
    >
      {t('invitation.footer')}
    </Typography>
  )
}
