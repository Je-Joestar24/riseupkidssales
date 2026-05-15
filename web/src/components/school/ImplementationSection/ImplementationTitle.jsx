import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ImplementationTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h2"
      id="school-implementation-heading"
      sx={{
        fontSize: { xs: '2.25rem', md: '3rem' },
        lineHeight: 1.2,
        fontWeight: 700,
        color: 'orange.main',
        textAlign: 'center',
        mb: 6,
        maxWidth: '100%',
      }}
    >
      {t('schools.implementation.title')}
    </Typography>
  )
}
