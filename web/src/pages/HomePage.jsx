import { Box } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import NavHeaders from '../components/common/NavHeaders.jsx'
import HeroSection from '../components/rhome/HeroSection/HeroSection.jsx'
import LinksSection from '../components/rhome/LinksSection/LinksSection.jsx'
import FooterMain from '../components/home/footer/FooterMain.jsx'
import '../assets/css/App.css'

function HomePage() {
  const { t } = useTranslation()
  useDocumentTitle(t('rhome.pageTitle'))

  return (
    <>
      <NavHeaders />
      <Box className="app" component="main" role="main" aria-label="Rise Up Kids home">
        <HeroSection />
        <LinksSection />
        <FooterMain />
      </Box>
    </>
  )
}

export default HomePage
