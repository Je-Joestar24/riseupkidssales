import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function CtaDescription() {
  const { t } = useTranslation()

  return (
    <Typography
      component="p"
      sx={{
        fontSize: { xs: '1.5rem', md: '1.875rem' },
        lineHeight: 1.6,
        maxWidth: 672,
        mx: 'auto',
        textAlign:"center",
        color: 'black',
        opacity: .65,
        fontWeight: 600
      }}
    >
      {t('cta.description')}
    </Typography>
  )
}
