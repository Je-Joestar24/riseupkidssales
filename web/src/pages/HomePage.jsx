import { Box } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import NavHeaders from '../components/common/NavHeaders.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import '../assets/css/App.css'

function HomePage() {
  const { t } = useTranslation()
  useDocumentTitle(t('hero.title'))

  return (
    <>
      <NavHeaders />
      <Box className="app" component="main" role="main" aria-label="Rise Up Kids sales site">
        <Box className="hero" component="section" aria-label="Rise Up Kids sales hero section">
          <HeroSection />
        </Box>
      </Box>
    </>
  )
}

export default HomePage

