import { Box, Typography } from '@mui/material'
import { useInvitationCopy } from '../../../hooks/useInvitationCopy.js'

export default function InvitationSubtitle() {
  const { isPrelaunch, subtitle, subtitle1, subtitle2 } = useInvitationCopy()

  return (
    <Box
      sx={{
        maxWidth: 896,
        mx: 'auto',
        '& > p + p': { mt: 2 },
      }}
    >
      {isPrelaunch ? (
        <Typography
          component="p"
          sx={{
            fontSize: '1.5rem',
            color: 'grey.700',
            lineHeight: 1.6,
            fontWeight: 600,
          }}
        >
          {subtitle}
        </Typography>
      ) : (
        <>
          <Typography
            component="p"
            sx={{
              fontSize: '1.5rem',
              color: 'grey.700',
              lineHeight: 1.6,
              fontWeight: 600,
            }}
          >
            {subtitle1}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: '1.5rem',
              color: 'grey.700',
              lineHeight: 1.6,
              fontWeight: 600,
            }}
          >
            {subtitle2}
          </Typography>
        </>
      )}
    </Box>
  )
}
