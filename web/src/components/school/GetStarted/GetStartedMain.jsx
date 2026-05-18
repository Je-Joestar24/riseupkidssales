import { Box, Container } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import GetStartedTitle from './GetStartedTitle.jsx'
import GetStartedCards from './GetStartedCards.jsx'
import GetStartedFooter from './GetStartedFooter.jsx'

export default function GetStartedMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-labelledby="school-get-started-heading"
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: 'common.white',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
        }}
      >
        <GetStartedTitle />
        <GetStartedCards />
        <GetStartedFooter />
      </Container>
    </Box>
  )
}
