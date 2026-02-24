import { Box, Container, Grid, Stack } from '@mui/material'
import Badge from './Badge.jsx'
import HeroTitle from './HeroTitle.jsx'
import HeroSubtitle from './HeroSubtitle.jsx'
import HeroFeatures from './HeroFeatures.jsx'
import HeroCTA from './HeroCTA.jsx'
import HeroImage from './HeroImage.jsx'

export default function HeroSection() {
  return (
    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
      <Badge />
      <Grid
        container
        sx={{
          spacing: { xs: 4, lg: 6 },
          alignItems: 'center',
          py: { xs: 1, md: 2 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} md={6} sx={{ minWidth: 0, maxWidth: '570px' }}>
          <Stack spacing={4}>
            <HeroTitle />
            <HeroSubtitle />
            <Box sx={{ mt: { xs: 2, md: 3 } }}>
              <HeroFeatures />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <HeroCTA />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ minWidth: 0, maxWidth: '570px', marginBottom: 'auto' }}>
          <HeroImage />
        </Grid>
      </Grid>
    </Container>
  )
}
