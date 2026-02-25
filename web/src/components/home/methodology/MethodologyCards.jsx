import { Box, Card, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: 56,
  height: 56,
  'aria-hidden': true,
}

function IconTarget(props) {
  return (
    <svg {...svgProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function IconCompass(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function IconLightbulb(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

const CARD_CONFIG = [
  {
    key: 'immersive',
    Icon: IconTarget,
    borderColor: '#62caca',
    iconBg: '#d4e6e3',
    iconColor: '#62caca',
  },
  {
    key: 'exploration',
    Icon: IconCompass,
    borderColor: '#f2af10',
    iconBg: '#f4edd4',
    iconColor: '#f2af10',
  },
  {
    key: 'integration',
    Icon: IconLightbulb,
    borderColor: '#e98a68',
    iconBg: '#fde8de',
    iconColor: '#e98a68',
  },
]

export default function MethodologyCards() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 5,
      }}
    >
      {CARD_CONFIG.map(({ key, Icon, borderColor, iconBg, iconColor }) => (
        <Card
          key={key}
          component="article"
          aria-labelledby={`methodology-card-${key}-title`}
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            border: '2px solid',
            borderColor,
            bgcolor: 'background.paper',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Box
            sx={{
              width: 112,
              height: 112,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              mx: 'auto',
              bgcolor: iconBg,
              color: iconColor,
            }}
          >
            <Icon />
          </Box>
          <Typography
            id={`methodology-card-${key}-title`}
            component="h3"
            variant="h3"
            sx={{
              fontSize: '1.875rem',
              fontWeight: 600,
              mb: 1,
              color: iconColor,
            }}
          >
            {t(`methodology.cards.${key}.title`)}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: '1.125rem',
              mb: 2,
              color: iconColor,
              fontWeight: 600
            }}
          >
            {t(`methodology.cards.${key}.tag`)}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              lineHeight: 1.7,
              fontWeight: 600
            }}
          >
            {t(`methodology.cards.${key}.description`)}
          </Typography>
        </Card>
      ))}
    </Box>
  )
}
