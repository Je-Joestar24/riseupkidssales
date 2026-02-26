import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function InvitationSubtitle() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        maxWidth: 896,
        mx: 'auto',
        '& > p + p': { mt: 2 },
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: '1.5rem',
          color: 'grey.700',
          lineHeight: 1.6,
          fontWeight: 600,
        }}
      >
        {t('invitation.subtitle1')}
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
        {t('invitation.subtitle2')}
      </Typography>
    </Box>
  )
}
