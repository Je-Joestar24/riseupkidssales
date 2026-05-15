import { Box, Container } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import RiseUpKidsApproachTitle from './RiseUpKidsApproachTitle.jsx'
import RiseUpKidsApproachTable from './RiseUpKidsApproachTable.jsx'

export default function RiseUpKidsApproachMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.comparison.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: 'common.white',
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
        }}
      >
        <RiseUpKidsApproachTitle />
        <RiseUpKidsApproachTable />
      </Container>
    </Box>
  )
}
