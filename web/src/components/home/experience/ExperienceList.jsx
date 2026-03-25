import { Box, Grid, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function ExperienceList() {
  const { t } = useTranslation()
  const items = t('experience.items')

  const list = Array.isArray(items) ? items : []
  const column1 = list.slice(0, 6)
  const column2 = list.slice(6, 12)

  const renderRow = (text, index) => (
    <Box
      key={index}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        py: 1,
        height: 'auto',
        minHeight: { xs: 0, sm: 72 },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: 'secondary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
        aria-hidden
      >
        <CheckIcon
          sx={{
            color: 'white',
            width: 28,
            height: 28,
            strokeWidth: 3,
          }}
        />
      </Box>
      <Typography
        component="span"
        sx={{
          fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
          color: 'grey.700',
          lineHeight: 1.6,
          fontWeight: 600,
          minWidth: 0,
        }}
      >
        {text}
      </Typography>
    </Box>
  )

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mt: 0, justifyContent: 'space-between' }}>
      <Grid item xs={12} md={6} sx={{ width: { xs: '100%', md: '48%' } }}>
        {column1.map(renderRow)}
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: { xs: '100%', md: '48%' } }}>
        {column2.map(renderRow)}
      </Grid>
    </Grid>
  )
}
