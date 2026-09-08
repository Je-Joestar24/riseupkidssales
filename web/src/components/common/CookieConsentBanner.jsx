import { Box, Button, Paper, Slide, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation.js'
import { useCookieConsent } from '../../hooks/useCookieConsent.js'

/**
 * Bottom cookie-consent banner for the marketing site. Shown only until the
 * visitor accepts or declines; the choice gates the Meta Pixel.
 * Client-only (mounted in ClientRouter), themed with the site palette + Quicksand.
 */
export default function CookieConsentBanner() {
  const { t } = useTranslation()
  const { ready, decided, grant, deny } = useCookieConsent()

  if (!ready) return null

  return (
    <Slide direction="up" in={!decided} mountOnEnter unmountOnExit appear={false}>
      <Paper
        elevation={8}
        role="region"
        aria-label={t('cookieConsent.ariaLabel')}
        sx={{
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.snackbar,
          left: { xs: 8, sm: 16 },
          right: { xs: 8, sm: 16 },
          bottom: { xs: 8, sm: 16 },
          mx: 'auto',
          maxWidth: 720,
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'border.main',
          bgcolor: 'background.paper',
        }}
      >
        <Stack spacing={1.75}>
          <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
            {t('cookieConsent.message')}{' '}
            <Box
              component={RouterLink}
              to="/privacy"
              sx={{ color: 'primary.dark', fontWeight: 700, textDecoration: 'underline' }}
            >
              {t('cookieConsent.privacyLink')}
            </Box>
          </Typography>
          <Stack
            direction={{ xs: 'column-reverse', sm: 'row' }}
            spacing={1.25}
            sx={{ justifyContent: 'flex-end' }}
          >
            <Button
              onClick={deny}
              variant="text"
              color="inherit"
              sx={{ fontWeight: 600, color: 'text.secondary' }}
            >
              {t('cookieConsent.decline')}
            </Button>
            <Button
              onClick={grant}
              variant="contained"
              color="primary"
              disableElevation
              sx={{ fontWeight: 700, px: 3 }}
            >
              {t('cookieConsent.accept')}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Slide>
  )
}
