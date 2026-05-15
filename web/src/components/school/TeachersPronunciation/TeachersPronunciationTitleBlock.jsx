import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import TeachersPronunciationUsersIcon from './TeachersPronunciationUsersIcon.jsx'

export default function TeachersPronunciationTitleBlock() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        justifyContent: { xs: 'center', sm: 'flex-start' },
      }}
    >
      <Box
        sx={{
          bgcolor: 'accent.main',
          borderRadius: '50%',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'common.white',
        }}
        aria-hidden
      >
        <TeachersPronunciationUsersIcon />
      </Box>
      <Typography
        component="h2"
        id="school-teachers-pronunciation-heading"
        sx={{
          fontSize: { xs: '2.25rem', md: '3rem' },
          lineHeight: 1.2,
          fontWeight: 700,
          color: 'accent.main',
          textAlign: { xs: 'center', sm: 'left' },
          flex: { sm: '1 1 auto' },
          minWidth: 0,
        }}
      >
        {t('schools.teachersPronunciation.title')}
      </Typography>
    </Box>
  )
}
