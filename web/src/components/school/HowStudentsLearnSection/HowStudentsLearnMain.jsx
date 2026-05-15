import { Box, Container } from '@mui/material'
import { SCHOOLS_FOOTER_BG } from '../../../config/constants.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import HowStudentsLearnTitle from './HowStudentsLearnTitle.jsx'
import HowStudentsLearnCards from './HowStudentsLearnCards.jsx'

export default function HowStudentsLearnMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.howStudentsLearn.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: SCHOOLS_FOOTER_BG,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
        }}
      >
        <HowStudentsLearnTitle />
        <HowStudentsLearnCards />
      </Container>
    </Box>
  )
}
