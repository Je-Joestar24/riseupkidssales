import { Box, Container } from '@mui/material'
import QuestionsHeader from './QuestionsHeader.jsx'
import QuestionsCards from './QuestionsCards.jsx'

export default function QuestionsMain() {
  return (
    <Box
      component="section"
      aria-labelledby="questions-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
      }}
    >
      <Container maxWidth="md">
        <QuestionsHeader />
        <QuestionsCards />
      </Container>
    </Box>
  )
}
