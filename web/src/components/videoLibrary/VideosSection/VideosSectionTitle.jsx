import { Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

export default function VideosSectionTitle() {
  const { t } = useTranslation()

  return (
    <Typography
      component="h2"
      id="video-library-videos-heading"
      sx={{
        fontSize: { xs: '1.875rem', md: '3rem' },
        lineHeight: 1.2,
        fontWeight: 700,
        color: themeColors.secondary,
        textAlign: 'center',
        mb: { xs: 4, md: 6 },
      }}
    >
      {t('videos.section.title')}
    </Typography>
  )
}
