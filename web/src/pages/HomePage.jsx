import { Box } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import NavHeaders from '../components/common/NavHeaders.jsx'
import HeroSection from '../components/home/hero/HeroSection.jsx'
import ExtrasList from '../components/home/extras/ExtrasList.jsx'
import '../assets/css/App.css'
import DiscoverMain from '../components/home/discover/DiscoverMain.jsx'
import StudiesMain from '../components/home/studies/StudiesMain.jsx'
import MethodologyMain from '../components/home/methodology/MethodologyMain.jsx'
import JourneyMain from '../components/home/journey/JourneyMain.jsx'
import ExperienceMain from '../components/home/experience/ExperienceMain.jsx'
import InvitationMain from '../components/home/invitation/InvitationMain.jsx'
import QuestionsMain from '../components/home/questions/QuestionsMain.jsx'
import CtaMain from '../components/home/cta/CtaMain.jsx'
import FooterMain from '../components/home/footer/FooterMain.jsx'

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
        <ExtrasList />
        <DiscoverMain />
        <StudiesMain />
        <MethodologyMain />
        <JourneyMain />
        <Box component="section" aria-label="Experience Rise Up Kids">
          <ExperienceMain />
        </Box>
        <InvitationMain />
        <QuestionsMain />
        <CtaMain />
        <FooterMain />
      </Box>
    </>
  )
}

export default HomePage

