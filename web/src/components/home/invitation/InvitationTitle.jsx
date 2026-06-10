import { Typography } from '@mui/material'
import { useInvitationCopy } from '../../../hooks/useInvitationCopy.js'

export default function InvitationTitle() {
  const { title } = useInvitationCopy()

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
      {title}
    </Typography>
  )
}
