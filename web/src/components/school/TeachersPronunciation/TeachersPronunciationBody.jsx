import { Stack, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const paragraphSx = {
  fontSize: { xs: '1.125rem', md: '1.25rem' },
  lineHeight: 1.65,
  fontWeight: 600,
  color: 'grey.700',
  m: 0,
}

export default function TeachersPronunciationBody() {
  const { t } = useTranslation()

  return (
    <Stack spacing={3} sx={{ textAlign: 'left' }}>
      <Typography component="p" sx={paragraphSx}>
        {t('schools.teachersPronunciation.p1')}
      </Typography>
      <Typography component="p" sx={paragraphSx}>
        {t('schools.teachersPronunciation.p2')}
      </Typography>
    </Stack>
  )
}
