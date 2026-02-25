import { Box, Container } from '@mui/material'
import JourneyHeader from './JourneyHeader.jsx'
import JourneyCards from './JourneyCards.jsx'

export default function JourneyMain() {
  return (
    <Box
      component="section"
      aria-labelledby="journey-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        <JourneyHeader />
        <JourneyCards />
      </Container>
    </Box>
  )
}
