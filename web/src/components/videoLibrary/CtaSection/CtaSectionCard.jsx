import { Paper, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'
import CtaSectionDescription from './CtaSectionDescription.jsx'
import CtaSectionButton from './CtaSectionButton.jsx'

export default function CtaSectionCard() {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'common.white',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.06)',
        p: { xs: 4, md: 6 },
        border: '4px solid',
        borderColor: themeColors.orange,
        textAlign: 'center',
      }}
    >
      <Typography
        component="h2"
        id="video-library-cta-heading"
        sx={{
          fontSize: { xs: '1.875rem', md: '3rem' },
          lineHeight: 1.2,
          fontWeight: 700,
          color: themeColors.orange,
          mb: { xs: 3, md: 3 },
        }}
      >
        {t('videos.cta.title')}
      </Typography>
      <CtaSectionDescription />
      <CtaSectionButton />
    </Paper>
  )
}
