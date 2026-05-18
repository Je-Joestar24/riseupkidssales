import { Box, Container } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import EducationSpecialistsSayTitle from './EducationSpecialistsSayTitle.jsx'
import EducationSpecialistsSayCards from './EducationSpecialistsSayCards.jsx'

export default function EducationSpecialistsSayMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.educationSpecialists.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 14, md: 16 },
        bgcolor: themeColors.schoolIconWellMint,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1280,
          mx: 'auto',
        }}
      >
        <EducationSpecialistsSayTitle />
        <EducationSpecialistsSayCards />
      </Container>
    </Box>
  )
}
