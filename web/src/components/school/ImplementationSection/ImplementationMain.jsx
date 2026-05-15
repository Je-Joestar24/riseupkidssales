import { Box, Container } from '@mui/material'
import { HOME_FOOTER_BG } from '../../../config/constants.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import ImplementationTitle from './ImplementationTitle.jsx'
import ImplementationList from './ImplementationList.jsx'
import ImplementationSubtitle from './ImplementationSubtitle.jsx'
import ImplementationFooter from './ImplementationFooter.jsx'

export default function ImplementationMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.implementation.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 12, md: 15 },
        bgcolor: HOME_FOOTER_BG,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1152,
          mx: 'auto',
        }}
      >
        <ImplementationTitle />
        <ImplementationList />
        <ImplementationSubtitle />
        <ImplementationFooter />
      </Container>
    </Box>
  )
}
