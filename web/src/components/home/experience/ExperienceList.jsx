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
        height: '100px',
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
          fontSize: '1.25rem',
          color: 'grey.700',
          lineHeight: 1.6,
          fontWeight: 600
        }}
      >
        {text}
      </Typography>
    </Box>
  )

  return (
    <Grid container spacing={4} sx={{ mt: 0, display: 'flex', justifyContent: 'space-between' }}>
      <Grid item xs={12} md={6} spacing={4} width={'48%'}>
        {column1.map(renderRow)}
      </Grid>
      <Grid item xs={12} md={6} spacing={4} width={'48%'}>
        {column2.map(renderRow)}
      </Grid>
    </Grid>
  )
}
