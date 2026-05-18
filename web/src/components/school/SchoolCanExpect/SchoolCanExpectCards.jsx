import { Box } from '@mui/material'
import SchoolCanExpectCard from './SchoolCanExpectCard.jsx'

const CARD_CONFIG = [
  { cardKey: 'card1', borderColor: 'primary.main', titleColor: 'primary.main' },
  { cardKey: 'card2', borderColor: 'secondary.main', titleColor: 'secondary.main' },
  { cardKey: 'card3', borderColor: 'accent.main', titleColor: 'accent.main' },
  { cardKey: 'card4', borderColor: 'orange.main', titleColor: 'orange.main' },
]

export default function SchoolCanExpectCards() {
  return (
    <Box
      role="list"
      aria-labelledby="school-can-expect-heading"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 4,
        alignItems: 'stretch',
      }}
    >
      {CARD_CONFIG.map((config) => (
        <Box key={config.cardKey} role="listitem" sx={{ minWidth: 0 }}>
          <SchoolCanExpectCard {...config} />
        </Box>
      ))}
    </Box>
  )
}
