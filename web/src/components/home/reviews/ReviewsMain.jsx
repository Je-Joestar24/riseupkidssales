import { Box, Container } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import ReviewsHeader from './ReviewsHeader.jsx'
import ReviewsCards from './ReviewsCards.jsx'

export default function ReviewsMain() {
  return (
    <Box
      component="section"
      aria-labelledby="reviews-heading"
      sx={{
        px: { xs: 3, sm: 4 },
        py: 10,
        bgcolor: themeColors.bgStudies,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          <ReviewsHeader />
          <ReviewsCards />
        </Box>
      </Container>
    </Box>
  )
}
