import { Box, Container } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import QuestionsTitle from './QuestionsTitle.jsx'
import QuestionsCollapse from './QuestionsCollapse.jsx'

export default function QuestionsMain() {
  return (
    <Box
      component="section"
      aria-labelledby="school-questions-heading"
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: themeColors.schoolIconWellMint,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 896,
          mx: 'auto',
        }}
      >
        <QuestionsTitle />
        <QuestionsCollapse />
      </Container>
    </Box>
  )
}
