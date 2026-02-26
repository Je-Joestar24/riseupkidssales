import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ExperienceHeader() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        textAlign: 'center',
        mb: 6,
      }}
    >
      <Typography
        id="experience-heading"
        component="h2"
        variant="h2"
        sx={{
          fontSize: { xs: '3.5rem', md: '4rem' },
          color: 'black',
          opacity: 0.7,
          fontWeight: 600
        }}
      >
        {t('experience.title')}
      </Typography>
      <Typography
        component="div"
        sx={{
          fontSize: { xs: '3.5rem', md: '4rem', lg: '4.5rem' },
          fontWeight: 600,
          color: 'warning.main',
        }}
      >
        {t('experience.titleHighlight')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: '1.5rem',
          color: 'black.700',
          mx: 'auto',
          fontWeight: 600
        }}
      >
        {t('experience.subtitle')}
      </Typography>
    </Box>
  )
}
