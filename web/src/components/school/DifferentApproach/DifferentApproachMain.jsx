import { Box, Container, Paper } from '@mui/material'
import { HOME_FOOTER_BG } from '../../../config/constants.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import DifferentApproachTitleBlock from './DifferentApproachTitleBlock.jsx'
import DifferentApproachBody from './DifferentApproachBody.jsx'

export default function DifferentApproachMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.differentApproach.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: HOME_FOOTER_BG,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1024,
          mx: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'common.white',
            borderRadius: 6,
            boxShadow: 8,
            p: { xs: 4, sm: 5, md: 6 },
            border: '4px solid',
            borderColor: 'orange.main',
          }}
        >
          <DifferentApproachTitleBlock />
          <DifferentApproachBody />
        </Paper>
      </Container>
    </Box>
  )
}
