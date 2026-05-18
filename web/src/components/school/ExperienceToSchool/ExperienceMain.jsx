import { Box, Container } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import ExperienceTitle from './ExperienceTitle.jsx'
import ExperienceForm from './ExperienceForm.jsx'

export default function ExperienceMain() {
  return (
    <Box
      component="section"
      id="school-application"
      aria-labelledby="school-application-heading"
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: 'common.white',
        scrollMarginTop: { xs: 72, md: 88 },
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 768,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            bgcolor: 'common.white',
            borderRadius: 3,
            boxShadow: 6,
            p: { xs: 3, sm: 4, md: 6 },
            border: '4px solid',
            borderColor: themeColors.primary,
          }}
        >
          <ExperienceTitle />
          <ExperienceForm />
        </Box>
      </Container>
    </Box>
  )
}
