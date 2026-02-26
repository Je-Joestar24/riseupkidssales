import { Box, Button, Container, Stack } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import CtaTitle from './CtaTitle.jsx'
import CtaDescription from './CtaDescription.jsx'

export default function CtaMain() {
  const { t } = useTranslation()

  const handleCtaClick = () => {
    const form = document.getElementById('founder-form')
    form?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box
      component="section"
      aria-labelledby="cta-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
        background: 'linear-gradient(to bottom right, #e98a68, #fde8de)',
      }}
    >
      <Container maxWidth="md">
        <Stack
          spacing={5}
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CtaTitle />
          <CtaDescription />
          <Button
            variant="contained"
            color="warning"
            onClick={handleCtaClick}
            sx={{
              alignSelf: 'center',
              px: 8,
              py: 4,
              fontSize: '1.875rem',
              borderRadius: 2,
              color: 'white',
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
            aria-label={t('cta.button')}
          >
            {t('cta.button')}
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
