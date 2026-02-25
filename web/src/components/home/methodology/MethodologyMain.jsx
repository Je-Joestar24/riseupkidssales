import { Box, Container } from '@mui/material'
import MethodologyTitle from './MethodologyTitle.jsx'
import MethodologyCards from './MethodologyCards.jsx'

export default function MethodologyMain() {
  return (
    <Box
      component="section"
      aria-labelledby="methodology-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
        bgcolor: 'custom.bgMethodology',
      }}
    >
      <Container maxWidth="xl">
        <MethodologyTitle />
        <MethodologyCards />
      </Container>
    </Box>
  )
}
