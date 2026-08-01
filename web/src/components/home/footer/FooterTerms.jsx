import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function FooterTerms() {
  const { t } = useTranslation()

  return (
    <Box>
      <Typography
        component="h4"
        sx={{
          fontSize: '1.5rem',
          mb: 2,
          color: 'secondary.main',
          fontWeight: 600
        }}
      >
        {t('footer.legal')}
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          '& > li': { mb: 1 },
        }}
      >
        <Box component="li">
          <Button
            component="a"
            href="/terms"
            sx={{
              display: 'inline-block',
              p: 0,
              minWidth: 0,
              fontSize: '1.125rem',
              color: 'grey.700',
              textTransform: 'none',
              '&:hover': {
                color: 'secondary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            {t('footer.termsOfUse')}
          </Button>
        </Box>
        <Box component="li">
          <Button
            component="a"
            href="/privacy"
            sx={{
              display: 'inline-block',
              p: 0,
              minWidth: 0,
              fontSize: '1.125rem',
              color: 'grey.700',
              textTransform: 'none',
              '&:hover': {
                color: 'secondary.main',
                backgroundColor: 'transparent',
              },
            }}
          >
            {t('footer.privacyPolicy')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
