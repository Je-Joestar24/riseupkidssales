import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function CtaSectionDescription() {
  const { t } = useTranslation()

  return (
    <Typography
      component="p"
      sx={{
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.65,
        fontWeight: 600,
        color: 'grey.700',
        mb: { xs: 4, md: 4 },
        maxWidth: 640,
        mx: 'auto',
      }}
    >
      {t('videos.cta.description')}
    </Typography>
  )
}
