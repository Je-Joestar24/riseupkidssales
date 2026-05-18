import { Box, Container, Stack } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import HeroSectionTitle from './HeroSectionTitle.jsx'
import HeroSectionDescription from './HeroSectionDescription.jsx'

export default function HeroSectionMain() {
  return (
    <Box
      component="section"
      aria-labelledby="video-library-hero-heading"
      sx={{
        px: { xs: 3, md: 3 },
        py: { xs: 8, md: 12 },
        background: themeColors.schoolHeroGradient,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Stack spacing={0} alignItems="center">
          <HeroSectionTitle />
          <HeroSectionDescription />
        </Stack>
      </Container>
    </Box>
  )
}
