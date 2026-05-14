import { Box } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import HeroTitle from './HeroTitle.jsx'
import HeroSubtitles from './HeroSubtitles.jsx'
import HeroMetas from './HeroMetas.jsx'

export default function HeroMain() {
  const { t } = useTranslation()

  return (
    <Box
      component="section"
      aria-label={t('rhome.hero.sectionAria')}
      sx={{
        px: { xs: 3, md: 4 },
        py: { xs: 10, md: 16 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1152,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          textAlign: 'center',
        }}
      >
        <HeroTitle />
        <HeroSubtitles />
        <HeroMetas />
      </Box>
    </Box>
  )
}
