import { Box } from '@mui/material'
import { themeColors } from '../../../config/themeColors.js'
import HowStudentsLearnCard from './HowStudentsLearnCard.jsx'
import {
  LucideMessageCircleIcon,
  LucideTargetIcon,
  LucideTrendingUpIcon,
} from './HowStudentsLearnLucideIcons.jsx'

const CARD_CONFIG = [
  {
    cardKey: 'card1',
    borderColor: 'secondary.main',
    iconWellBg: themeColors.schoolIconWellMint,
    titleColor: 'secondary.main',
    iconColor: 'secondary.main',
    Icon: LucideTargetIcon,
  },
  {
    cardKey: 'card2',
    borderColor: 'accent.main',
    iconWellBg: themeColors.bgMethodology,
    titleColor: 'accent.main',
    iconColor: 'accent.main',
    Icon: LucideTrendingUpIcon,
  },
  {
    cardKey: 'card3',
    borderColor: 'primary.main',
    iconWellBg: themeColors.schoolIconWellMint,
    titleColor: 'primary.main',
    iconColor: 'primary.main',
    Icon: LucideMessageCircleIcon,
  },
]

export default function HowStudentsLearnCards() {
  return (
    <Box
      role="list"
      aria-labelledby="school-how-students-learn-heading"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 4,
        alignItems: 'stretch',
      }}
    >
      {CARD_CONFIG.map((config) => (
        <Box key={config.cardKey} role="listitem" sx={{ minWidth: 0 }}>
          <HowStudentsLearnCard {...config} />
        </Box>
      ))}
    </Box>
  )
}
