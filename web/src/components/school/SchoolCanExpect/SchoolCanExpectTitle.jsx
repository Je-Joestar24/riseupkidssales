import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function SchoolCanExpectTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h2"
      id="school-can-expect-heading"
      sx={{
        fontSize: { xs: '2.25rem', md: '3rem' },
        lineHeight: 1.2,
        fontWeight: 700,
        color: 'primary.main',
        textAlign: 'center',
        mb: 8,
        maxWidth: '100%',
      }}
    >
      {t('schools.canExpect.title')}
    </Typography>
  )
}
