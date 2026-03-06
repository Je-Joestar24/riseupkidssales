import { Box, Container } from '@mui/material'
import FamiliesHeader from './FamiliesHeader.jsx'
import FamiliesCards from './FamiliesCards.jsx'
import FamiliesCta from './FamiliesCta.jsx'

export default function FamiliesMain(props) {
  return (
    <Box
      component="section"
      aria-labelledby="families-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
        bgcolor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <FamiliesHeader />
        <FamiliesCards />
        <FamiliesCta onClick={props.onCtaClick} href={props.ctaHref ?? '/checkout'} />
      </Container>
    </Box>
  )
}
