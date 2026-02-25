import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function StudiesChip() {
  const { t } = useTranslation()
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'orange.main',
        px: 3,
        py: 1.5,
        borderRadius: '9999px',
      }}
    >
      <Typography
        component="span"
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 700,
          color: 'primary.contrastText',
        }}
      >
        {t('studies.chip')}
      </Typography>
    </Box>
  )
}
