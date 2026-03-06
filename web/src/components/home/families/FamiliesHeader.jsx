import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function FamiliesHeader() {
  const { t } = useTranslation()
  return (
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        id="families-heading"
        component="h2"
        variant="h2"
        sx={{
          color: 'rgb(75, 85, 99)',
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '2.5rem', md: '3.75rem' },
        }}
      >
        {t('families.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: '1.5rem',
          color: 'text.secondary',
          fontWeight: 600,
          mb: 0,
        }}
      >
        {t('families.subtitle')}
      </Typography>
    </Box>
  )
}
