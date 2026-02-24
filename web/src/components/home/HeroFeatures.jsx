import { Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'

const FEATURE_KEYS = [
  { key: 'immersiveEnglish', color: '#62caca' },
  { key: 'realTeachers', color: '#e98a68' },
  { key: 'naturalLearning', color: '#f2af10' },
]

export default function HeroFeatures() {
  const { t } = useTranslation()
  return (
    <Grid container spacing={2} role="list" aria-label="Rise Up Kids features">
      {FEATURE_KEYS.map(({ key, color }) => (
        <Grid item xs={12} sm={4} key={key} sx={{ display: 'flex', justifyContent: 'center', maxWidth: '170px' }}>
          <Paper
            component="article"
            role="listitem"
            aria-label={t(`hero.features.${key}.title`)}
            elevation={0}
            sx={{
              p: 2,
              textAlign: 'center',
              borderRadius: 2,
              border: '1px solid',
              borderColor: color,
              bgcolor: 'white',
              boxShadow: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem', lg: '1rem' },
                fontWeight: 600,
                color,
                mb: 0.5,
              }}
            >
              {t(`hero.features.${key}.title`)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              {t(`hero.features.${key}.description`)}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
