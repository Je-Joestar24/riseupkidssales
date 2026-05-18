import { Box, Container } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import SchoolCanExpectTitle from './SchoolCanExpectTitle.jsx'
import SchoolCanExpectCards from './SchoolCanExpectCards.jsx'

export default function SchoolCanExpectMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.canExpect.sectionAria')}
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
        <SchoolCanExpectTitle />
        <SchoolCanExpectCards />
      </Container>
    </Box>
  )
}
