import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HowStudentsLearnTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h2"
      id="school-how-students-learn-heading"
      sx={{
        fontSize: { xs: '2.25rem', md: '3rem' },
        lineHeight: 1.2,
        fontWeight: 700,
        color: 'secondary.main',
        textAlign: 'center',
        mb: 8,
        maxWidth: '100%',
      }}
    >
      {t('schools.howStudentsLearn.title')}
    </Typography>
  )
}
