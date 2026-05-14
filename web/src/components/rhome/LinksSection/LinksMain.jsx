import { Box, Container } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import LinksCards from './LinksCards.jsx'

export default function LinksMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('rhome.links.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 8, md: 8 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <LinksCards />
      </Container>
    </Box>
  )
}
