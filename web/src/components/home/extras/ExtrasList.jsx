import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const EXTRAS_KEYS = ['joy', 'learning', 'growth', 'play', 'wonder']

export default function ExtrasList() {
  const { t } = useTranslation()
  return (
    <Box
      component="section"
      aria-label={EXTRAS_KEYS.map((k) => t(`extras.${k}`)).join(', ')}
      sx={{
        backgroundColor: 'rgb(212, 230, 227)',
        py: 6,
        boxShadow: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(5, 1fr)' },
            gap: 3,
            alignItems: 'center',
          }}
        >
          {EXTRAS_KEYS.map((key) => (
            <Typography
              key={key}
              component="span"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.875rem', md: '2.25rem' },
                fontWeight: 700,
                color: 'rgba(107, 124, 147, 0.85)',
              }}
            >
              {t(`extras.${key}`)}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
