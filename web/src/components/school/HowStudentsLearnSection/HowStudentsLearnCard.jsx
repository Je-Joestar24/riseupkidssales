import { Box, Paper, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HowStudentsLearnCard({
  cardKey,
  borderColor,
  iconWellBg,
  titleColor,
  iconColor,
  Icon,
}) {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: (theme) =>
          theme.transitions.create('transform', {
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Box
        sx={{
          bgcolor: iconWellBg,
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          color: iconColor,
        }}
        aria-hidden
      >
        <Icon />
      </Box>
      <Typography
        component="h3"
        sx={{
          fontSize: '1.25rem',
          lineHeight: 1.35,
          fontWeight: 700,
          color: titleColor,
          mb: 2,
        }}
      >
        {t(`schools.howStudentsLearn.${cardKey}.title`)}
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
        {t(`schools.howStudentsLearn.${cardKey}.description`)}
      </Typography>
    </Paper>
  )
}
