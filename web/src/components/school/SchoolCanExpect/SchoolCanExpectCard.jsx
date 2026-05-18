import { Paper, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function SchoolCanExpectCard({ cardKey, borderColor, titleColor }) {
  const { t } = useTranslation()

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'common.white',
        borderRadius: 6,
        boxShadow: 8,
        p: 4,
        border: '4px solid',
        borderColor,
        height: '100%',
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: { xs: '1.25rem', md: '1.5rem' },
          lineHeight: 1.35,
          fontWeight: 700,
          color: titleColor,
          mb: 2,
        }}
      >
        {t(`schools.canExpect.${cardKey}.title`)}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1rem', md: '1.125rem' },
          lineHeight: 1.65,
          fontWeight: 600,
          color: 'grey.700',
          m: 0,
        }}
      >
        {t(`schools.canExpect.${cardKey}.description`)}
      </Typography>
    </Paper>
  )
}
