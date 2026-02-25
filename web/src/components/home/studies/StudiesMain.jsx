import { Box, Container } from '@mui/material'
import StudiesChip from './StudiesChip'
import StudiesTitle from './StudiesTitle'
import StudiesSubtitle from './StudiesSubtitle'

export default function StudiesMain() {
  return (
    <Box
      component="section"
      aria-labelledby="studies-heading"
      sx={{
        px: { xs: 2, sm: 3 },
        py: 10,
        bgcolor: 'custom.bgStudies',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 1024,
            mx: 'auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <StudiesChip />
          <StudiesTitle />
          <StudiesSubtitle />
        </Box>
      </Container>
    </Box>
  )
}
