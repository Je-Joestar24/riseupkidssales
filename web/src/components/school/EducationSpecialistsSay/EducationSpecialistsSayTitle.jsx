import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import EducationSpecialistsSayAwardIcon from './EducationSpecialistsSayAwardIcon.jsx'

export default function EducationSpecialistsSayTitle() {
  const { t } = useTranslation()

  return (
    <Box sx={{ textAlign: 'center', mb: 7 }}>
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'secondary.main',
          color: 'common.white',
          px: 3,
          py: 1.5,
          borderRadius: 999,
          mb: 4,
        }}
      >
        <EducationSpecialistsSayAwardIcon />
        <Typography
          component="span"
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: 'inherit',
          }}
        >
          {t('schools.educationSpecialists.badge')}
        </Typography>
      </Box>
      <Typography
        component="h2"
        id="school-education-specialists-heading"
        sx={{
          fontSize: { xs: '2.25rem', md: '3rem' },
          lineHeight: 1.2,
          fontWeight: 700,
          color: 'grey.700',
          mb: 2.5,
          maxWidth: 896,
          mx: 'auto',
        }}
      >
        {t('schools.educationSpecialists.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          lineHeight: 1.65,
          fontWeight: 600,
          color: 'grey.700',
          maxWidth: 768,
          mx: 'auto',
        }}
      >
        {t('schools.educationSpecialists.subtitle')}
      </Typography>
    </Box>
  )
}
