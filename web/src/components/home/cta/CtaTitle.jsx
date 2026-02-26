import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function CtaTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      id="cta-heading"
      component="h2"
      variant="h2"
      sx={{
        fontSize: { xs: '2.5rem', md: '3.75rem', lg: '4.375rem' },
        lineHeight: 1.2,
        color: 'black',
        opacity: .65,
        fontWeight: 600
      }}
    >
      {t('cta.title')}
    </Typography>
  )
}
