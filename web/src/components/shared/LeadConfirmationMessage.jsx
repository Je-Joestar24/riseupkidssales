import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'

/**
 * Shown in place of a lead form once it's been submitted successfully. Flodesk sends a
 * double opt-in confirmation email — a submitted lead is NOT subscribed until that email's
 * confirmation link is clicked, so this tells the visitor exactly what to do next instead of
 * letting them think they're already on the list.
 */
export default function LeadConfirmationMessage() {
  const { t } = useTranslation()

  return (
    <Box role="status" sx={{ textAlign: 'center', py: { xs: 2, md: 3 } }}>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.375rem', md: '1.625rem' },
          fontWeight: 700,
          color: 'grey.900',
          mb: { xs: 1.5, md: 2 },
        }}
      >
        {t('leadConfirmation.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1rem', md: '1.125rem' },
          fontWeight: 600,
          color: 'grey.800',
          lineHeight: 1.7,
          mb: { xs: 1.5, md: 2 },
        }}
      >
        {t('leadConfirmation.message')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '0.9375rem', md: '1rem' },
          fontWeight: 500,
          color: 'grey.600',
          lineHeight: 1.7,
        }}
      >
        {t('leadConfirmation.spamNote')}
      </Typography>
    </Box>
  )
}
