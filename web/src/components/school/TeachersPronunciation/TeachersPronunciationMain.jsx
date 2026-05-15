import { Box, Container, Paper } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import TeachersPronunciationTitleBlock from './TeachersPronunciationTitleBlock.jsx'
import TeachersPronunciationBody from './TeachersPronunciationBody.jsx'

export default function TeachersPronunciationMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.teachersPronunciation.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: 'common.white',
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
            borderColor: 'accent.main',
          }}
        >
          <TeachersPronunciationTitleBlock />
          <TeachersPronunciationBody />
        </Paper>
      </Container>
    </Box>
  )
}
