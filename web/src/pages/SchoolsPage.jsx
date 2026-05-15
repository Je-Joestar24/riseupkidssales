import { Box } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import NavHeaders from '../components/common/NavHeaders.jsx'
import FooterMain from '../components/home/footer/FooterMain.jsx'
import HeroSection from '../components/school/HeroSection/HeroSection.jsx'
import EnglishExperienceSection from '../components/school/EnglishExperienceSection/EnglishExperienceSection.jsx'
import DifferentApproachSection from '../components/school/DifferentApproach/DifferentApproachSection.jsx'
import RiseUpKidsApproachSection from '../components/school/RiseUpKidsApproach/RiseUpKidsApproachSection.jsx'
import HowStudentsLearnSection from '../components/school/HowStudentsLearnSection/HowStudentsLearnSection.jsx'
import MeaningfulLearningSection from '../components/school/MeaningfulLearning/MeaningfulLearningSection.jsx'
import TeachersPronunciationSection from '../components/school/TeachersPronunciation/TeachersPronunciationSection.jsx'
import ImplementationSection from '../components/school/ImplementationSection/ImplementationSection.jsx'
import '../assets/css/App.css'

export default function SchoolsPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('schools.pageTitle'))

  return (
    <>
      <NavHeaders />
      <Box
        className="app"
        component="main"
        role="main"
        aria-label={t('schools.mainAria')}
        sx={{ minHeight: '40vh' }}
      >
        <HeroSection />
        <EnglishExperienceSection />
        <DifferentApproachSection />
        <RiseUpKidsApproachSection />
        <HowStudentsLearnSection />
        <MeaningfulLearningSection />
        <TeachersPronunciationSection />
        <ImplementationSection />
        <Box
          id="school-application"
          tabIndex={-1}
          sx={{ scrollMarginTop: { xs: 72, md: 88 } }}
          aria-label={t('schools.applicationSectionAria')}
        />
      </Box>
      <FooterMain />
    </>
  )
}
