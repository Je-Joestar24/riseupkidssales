import { Box, Container, Paper } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import MeaningfulLearningTitleBlock from './MeaningfulLearningTitleBlock.jsx'
import MeaningfulLearningBody from './MeaningfulLearningBody.jsx'

export default function MeaningfulLearningMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.meaningfulLearning.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: themeColors.schoolIconWellMint,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1024,
          mx: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'common.white',
            borderRadius: 6,
            boxShadow: 8,
            p: { xs: 4, sm: 5, md: 6 },
            border: '4px solid',
            borderColor: 'secondary.main',
          }}
        >
          <MeaningfulLearningTitleBlock />
          <MeaningfulLearningBody />
        </Paper>
      </Container>
    </Box>
  )
}
