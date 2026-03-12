import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

const iconSvgs = {
  sparkles: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  ),
  heart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  rocket: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  userCheck: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
}

const cardData = [
  {
    id: 'curiosity',
    iconKey: 'sparkles',
    titleKey: 'develop.cards.curiosity.title',
    titleDefault: 'Active curiosity',
    descKey: 'develop.cards.curiosity.desc',
    descDefault: 'English awakens interest, exploration, and pleasure in discovering.',
    bgColor: themeColors.secondary,
    iconColor: themeColors.textInverse,
    titleColor: themeColors.textInverse,
    textColor: themeColors.textInverse,
    bordered: false,
  },
  {
    id: 'persistence',
    iconKey: 'heart',
    titleKey: 'develop.cards.persistence.title',
    titleDefault: 'Gentle persistence',
    descKey: 'develop.cards.persistence.desc',
    descDefault: 'The child continues practicing with confidence, even while still learning.',
    bgColor: themeColors.accent,
    iconColor: themeColors.textInverse,
    titleColor: themeColors.textInverse,
    textColor: themeColors.textInverse,
    bordered: false,
  },
  {
    id: 'growth',
    iconKey: 'rocket',
    titleKey: 'develop.cards.growth.title',
    titleDefault: 'Growth mindset',
    descKey: 'develop.cards.growth.desc',
    descDefault: 'The child feels safe to explore, make mistakes, and continue learning.',
    bgColor: themeColors.orange,
    iconColor: themeColors.textInverse,
    titleColor: themeColors.textInverse,
    textColor: themeColors.textInverse,
    bordered: false,
  },
  {
    id: 'autonomy',
    iconKey: 'userCheck',
    titleKey: 'develop.cards.autonomy.title',
    titleDefault: 'Developing autonomy',
    descKey: 'develop.cards.autonomy.desc',
    descDefault: 'The child participates, explores, and advances with increasing independence.',
    bgColor: themeColors.textInverse,
    iconColor: themeColors.secondary,
    titleColor: themeColors.secondary,
    textColor: themeColors.textSecondary,
    bordered: true,
    borderColor: themeColors.secondary,
  },
]

const quicksandWeight = { fontFamily: 'Quicksand, sans-serif', fontWeight: 600 }

export default function DevelopCards() {
  const { t } = useTranslation()

  return (
    <Box
      component="div"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
        maxWidth: 1024,
        mx: 'auto',
      }}
      role="list"
      aria-label="Develop experience pillars"
    >
      {cardData.map((card) => (
          <Box
            key={card.id}
            component="article"
            role="listitem"
            aria-labelledby={`develop-card-${card.id}-title`}
            sx={{
              p: 5,
              borderRadius: 3,
              boxShadow: 2,
              transition: 'box-shadow 0.2s ease',
              bgcolor: card.bgColor,
              border: card.bordered ? '4px solid' : 'none',
              borderColor: card.bordered ? card.borderColor : 'transparent',
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            <Box
              sx={{
                mb: 3,
                color: card.iconColor,
                '& svg': {
                  width: 64,
                  height: 64,
                  display: 'block',
                },
              }}
            >
              {iconSvgs[card.iconKey]}
            </Box>
            <Typography
              id={`develop-card-${card.id}-title`}
              component="h3"
              sx={{
                ...quicksandWeight,
                fontWeight: 700,
                fontSize: '1.875rem',
                color: card.titleColor,
                mb: 2,
              }}
            >
              {t(card.titleKey, card.titleDefault)}
            </Typography>
            <Typography
              component="p"
              sx={{
                ...quicksandWeight,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: card.textColor,
              }}
            >
              {t(card.descKey, card.descDefault)}
            </Typography>
          </Box>
        ))}
    </Box>
  )
}
