import { Box } from '@mui/material'
import grantImage from '../../../assets/images/school/dr_grant_eckstein_phD.png'
import sarahImage from '../../../assets/images/school/sarah_schumutz.png'
import EducationSpecialistsSayCard from './EducationSpecialistsSayCard.jsx'

const CARD_CONFIG = [
  {
    personKey: 'grant',
    imageSrc: grantImage,
    borderColor: 'secondary.main',
    dividerColor: 'secondary.main',
  },
  {
    personKey: 'sarah',
    imageSrc: sarahImage,
    borderColor: 'orange.main',
    dividerColor: 'orange.main',
  },
]

export default function EducationSpecialistsSayCards() {
  return (
    <Box
      role="list"
      aria-labelledby="school-education-specialists-heading"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 4,
        maxWidth: 1024,
        mx: 'auto',
        alignItems: 'stretch',
      }}
    >
      {CARD_CONFIG.map((config) => (
        <Box key={config.personKey} role="listitem" sx={{ minWidth: 0 }}>
          <EducationSpecialistsSayCard {...config} />
        </Box>
      ))}
    </Box>
  )
}
