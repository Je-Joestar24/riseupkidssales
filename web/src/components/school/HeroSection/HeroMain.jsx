import { Box, Container, Stack } from '@mui/material'
import { NAV_APP_BAR_HEIGHT_PX } from '../../../config/constants.js'
import { themeColors } from '../../../config/themeColors.js'
import { useTranslation } from '../../../hooks/useTranslation.js'
import HeroTitle from './HeroTitle.jsx'
import HeroSubtitle from './HeroSubtitle.jsx'
import HeroCtaButton from './HeroCtaButton.jsx'

export default function HeroMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('schools.hero.sectionAria')}
      sx={{
        minHeight: `calc(100vh - ${NAV_APP_BAR_HEIGHT_PX}px)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 3, md: 4 },
        py: { xs: 4, md: 6 },
        background: themeColors.schoolHeroGradient,
      }}
    >
      <Container maxWidth="xl" sx={{ mx: 'auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Stack
          spacing={4}
          sx={{
            maxWidth: 1024,
            mx: 'auto',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <HeroTitle />
          <HeroSubtitle />
          <HeroCtaButton />
        </Stack>
      </Container>
    </Box>
  )
}
