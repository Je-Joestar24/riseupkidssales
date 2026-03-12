import { Box, Container } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import DevelopHeader from './DevelopHeader.jsx'
import DevelopCards from './DevelopCards.jsx'
import { themeColors } from '../../../config/themeColors.js'

export default function DevelopMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-labelledby="develop-heading"
      sx={{
        px: { xs: 3, sm: 4 },
        py: 10,
        bgcolor: themeColors.bgMethodology,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
          <DevelopHeader />
          <DevelopCards />
        </Box>
      </Container>
    </Box>
  )
}
