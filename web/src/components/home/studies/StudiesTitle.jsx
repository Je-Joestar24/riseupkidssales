import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function StudiesTitle() {
  const { t } = useTranslation()
  return (
    <Typography
      id="studies-heading"
      component="h2"
      variant="h2"
      sx={{
        color: 'text.secondary',
        fontSize: { xs: '2.25rem', md: '3rem', lg: '3.75rem' },
        fontWeight: 600,
      }}
    >
      {t('studies.title')}
    </Typography>
  )
}
