import { Paper, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ImplementationFooter() {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'common.white',
        borderRadius: 4,
        boxShadow: 6,
        p: 4,
        border: '4px solid',
        borderColor: 'primary.main',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          lineHeight: 1.6,
          fontWeight: 600,
          color: 'primary.main',
          textAlign: 'center',
          m: 0,
        }}
      >
        {t('schools.implementation.footer')}
      </Typography>
    </Paper>
  )
}
