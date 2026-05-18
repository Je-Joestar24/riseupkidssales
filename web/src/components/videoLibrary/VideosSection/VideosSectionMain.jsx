import { Box, Container } from '@mui/material'
import VideosSectionTitle from './VideosSectionTitle.jsx'
import VideosSectionCards from './VideosSectionCards.jsx'

export default function VideosSectionMain() {
  return (
    <Box
      component="section"
      aria-labelledby="video-library-videos-heading"
      sx={{
        px: { xs: 3, md: 3 },
        py: { xs: 8, md: 8 },
        bgcolor: 'common.white',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1280,
          mx: 'auto',
        }}
      >
        <VideosSectionTitle />
        <VideosSectionCards />
      </Container>
    </Box>
  )
}
