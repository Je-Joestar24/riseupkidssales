import { Box, Typography } from '@mui/material'
import { useInvitationCopy } from '../../../hooks/useInvitationCopy.js'

export default function InvitationBadge() {
  const { badge } = useInvitationCopy()

  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'warning.main',
        px: 3,
        py: 1.5,
        borderRadius: '9999px',
        mb: 4,
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'white',
        }}
      >
        {badge}
      </Typography>
    </Box>
  )
}
