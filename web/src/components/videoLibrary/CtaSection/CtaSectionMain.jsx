import { Box, Container } from '@mui/material'
import { HOME_FOOTER_BG } from '../../../config/constants.js'
import CtaSectionCard from './CtaSectionCard.jsx'

export default function CtaSectionMain() {
  return (
    <Box
      component="section"
      aria-labelledby="video-library-cta-heading"
      sx={{
        px: { xs: 3, md: 3 },
        py: { xs: 8, md: 10 },
        bgcolor: HOME_FOOTER_BG,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 896,
          mx: 'auto',
        }}
      >
        <CtaSectionCard />
      </Container>
    </Box>
  )
}
