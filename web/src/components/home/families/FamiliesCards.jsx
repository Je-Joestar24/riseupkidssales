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
  width: 40,
  height: 40,
  'aria-hidden': true,
}

function IconEye(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconMessageCircle(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
    </svg>
  )
}

function IconShield(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function IconUsersRound(props) {
  return (
    <svg {...svgProps} {...props}>
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  )
}

const CARD_CONFIG = [
  {
    key: 'priorityFollowUp',
    Icon: IconEye,
    borderColor: '#62caca',
    iconBg: '#d4e6e3',
    iconColor: '#62caca',
  },
  {
    key: 'frequentFeedback',
    Icon: IconMessageCircle,
    borderColor: '#f2af10',
    iconBg: '#f4edd4',
    iconColor: '#f2af10',
  },
  {
    key: 'founderValueGuaranteed',
    Icon: IconShield,
    borderColor: '#e98a68',
    iconBg: '#fde8de',
    iconColor: '#e98a68',
  },
  {
    key: 'reducedInitialClasses',
    Icon: IconUsersRound,
    borderColor: '#62caca',
    iconBg: '#d4e6e3',
    iconColor: '#62caca',
  },
]

export default function FamiliesCards() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 4,
      }}
    >
      {CARD_CONFIG.map(({ key, Icon, borderColor, iconBg, iconColor }) => (
        <Card
          key={key}
          component="article"
          aria-labelledby={`families-card-${key}-title`}
          sx={{
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            border: '4px solid',
            borderColor,
            bgcolor: 'background.paper',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
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
            id={`families-card-${key}-title`}
            component="h3"
            variant="h3"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 600,
              mb: 2,
              textAlign: 'center',
              color: iconColor,
            }}
          >
            {t(`families.cards.${key}.title`)}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: '1.125rem',
              color: 'text.secondary',
              lineHeight: 1.7,
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {t(`families.cards.${key}.description`)}
          </Typography>
        </Card>
      ))}
    </Box>
  )
}
