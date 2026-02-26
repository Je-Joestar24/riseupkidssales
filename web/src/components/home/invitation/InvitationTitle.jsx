import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function InvitationTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      id="invitation-heading"
      component="h2"
      variant="h2"
      sx={{
        fontSize: { xs: '2.5rem', md: '3.75rem' },
        mb: 5,
        color: 'secondary.main',
      }}
    >
      {t('invitation.title')}
    </Typography>
  )
}
