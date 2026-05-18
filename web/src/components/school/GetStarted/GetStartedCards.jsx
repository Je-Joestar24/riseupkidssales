import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

function IconArrowRight({ color }) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      sx={{ width: 32, height: 32, color }}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Box>
  )
}

const STEP_CONFIG = [
  { key: 'step1', number: 1, color: themeColors.primary },
  { key: 'step2', number: 2, color: themeColors.accent },
  { key: 'step3', number: 3, color: themeColors.orange },
]

export default function GetStartedCards() {
  const { t } = useTranslation()

  return (
    <Box
      role="list"
      aria-label={t('schools.getStarted.sectionAria')}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: { xs: 3, md: 4 },
        mb: { xs: 4, md: 6 },
        alignItems: 'stretch',
      }}
    >
      {STEP_CONFIG.map(({ key, number, color }, index) => (
        <Box
          key={key}
          role="listitem"
          sx={{
            position: 'relative',
            display: 'flex',
            minWidth: 0,
          }}
        >
          <Card
            component="article"
            aria-labelledby={`school-get-started-${key}-title`}
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              boxShadow: 4,
              border: '4px solid',
              borderColor: color,
              bgcolor: 'common.white',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              width: '100%',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: color,
                color: 'common.white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: 3,
                fontSize: '3rem',
                fontWeight: 700,
                lineHeight: 1,
              }}
              aria-hidden
            >
              {number}
            </Box>
            <Typography
              id={`school-get-started-${key}-title`}
              component="h3"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 700,
                color,
                textAlign: 'center',
                mb: 2,
              }}
            >
              {t(`schools.getStarted.steps.${key}.title`)}
            </Typography>
            <Typography
              component="p"
              sx={{
                fontSize: { xs: '1.0625rem', md: '1.125rem' },
                color: 'grey.700',
                textAlign: 'center',
                lineHeight: 1.7,
                fontWeight: 600,
                mt: 'auto',
              }}
            >
              {t(`schools.getStarted.steps.${key}.description`)}
            </Typography>
          </Card>
          {index < STEP_CONFIG.length - 1 && (
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                position: 'absolute',
                top: '50%',
                right: -16,
                transform: 'translate(50%, -50%)',
                zIndex: 1,
              }}
              aria-hidden
            >
              <IconArrowRight color={color} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}
