import { Box, Container, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ExtrasList() {
  const { t } = useTranslation()
  const labels = t('extras.labels')
  const items = Array.isArray(labels) ? labels : []

  return (
    <Box
      component="section"
      aria-label={items.join(', ')}
      sx={{
        backgroundColor: 'rgb(212, 230, 227)',
        py: { xs: 3, sm: 4, md: 6 },
        boxShadow: 3,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' },
            gap: { xs: 1.25, sm: 2, md: 3 },
            alignItems: 'center',
          }}
        >
          {items.map((label) => (
            <Typography
              key={label}
              component="span"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.35rem', sm: '1.6rem', md: '2.25rem' },
                fontWeight: 700,
                color: 'rgba(107, 124, 147, 0.85)',
              }}
            >
              {label}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
