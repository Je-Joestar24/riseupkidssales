import { Typography } from '@mui/material'
import { useInvitationCopy } from '../../../hooks/useInvitationCopy.js'

export default function InvitationFooter() {
  const { footer } = useInvitationCopy()

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
      {footer}
    </Typography>
  )
}
