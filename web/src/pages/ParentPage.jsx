import { Box } from '@mui/material'
import { useTranslation } from '../hooks/useTranslation.js'
import PageSeo from '../components/seo/PageSeo.jsx'
import NavHeaders from '../components/common/NavHeaders.jsx'
import HeroSection from '../components/home/hero/HeroSection.jsx'
import ExtrasList from '../components/home/extras/ExtrasList.jsx'
import '../assets/css/App.css'
import DiscoverMain from '../components/home/discover/DiscoverMain.jsx'
import FamiliesMain from '../components/home/families/FamiliesMain.jsx'
import StudiesMain from '../components/home/studies/StudiesMain.jsx'
import MethodologyMain from '../components/home/methodology/MethodologyMain.jsx'
import JourneyMain from '../components/home/journey/JourneyMain.jsx'
import ExperienceMain from '../components/home/experience/ExperienceMain.jsx'
import DevelopMain from '../components/home/develop/DevelopMain.jsx'
import EnglishMain from '../components/home/english/EnglishMain.jsx'
import ReviewsMain from '../components/home/reviews/ReviewsMain.jsx'
import InvitationMain from '../components/home/invitation/InvitationMain.jsx'
import QuestionsMain from '../components/home/questions/QuestionsMain.jsx'
import CtaMain from '../components/home/cta/CtaMain.jsx'
import FooterMain from '../components/home/footer/FooterMain.jsx'
import EducationSpecialistsSayMain from '../components/school/EducationSpecialistsSay/EducationSpecialistsSayMain.jsx'
import { salesPageSections } from '../constants/salesPageConfig.js'

function ParentPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageSeo seoKey="parents" />
      <NavHeaders />
      <Box className="app" component="main" role="main" aria-label={t('parent.mainAria')}>
        <Box className="hero" component="section" aria-label="Rise Up Kids sales hero section">
          <HeroSection />
        </Box>
        <ExtrasList />
        <DiscoverMain />
        <StudiesMain />
        <MethodologyMain />
        <JourneyMain />
        <Box component="section" aria-label="Inside the Rise Up Kids experience">
          <DevelopMain />
        </Box>
        <FamiliesMain />
        {salesPageSections.reviews ? (
          <Box component="section" aria-label="What families say">
            <ReviewsMain />
          </Box>
        ) : null}
        {salesPageSections.experience ? (
          <Box component="section" aria-label="Experience Rise Up Kids">
            <ExperienceMain />
          </Box>
        ) : null}
        <InvitationMain />
        <Box component="section" aria-label="The English journey at Rise Up Kids">
          <EnglishMain />
        </Box>
        {salesPageSections.questions ? <QuestionsMain /> : null}
        <EducationSpecialistsSayMain/>
        <CtaMain />
        <FooterMain />
      </Box>
    </>
  )
}

export default ParentPage

