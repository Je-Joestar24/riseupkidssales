import { Box } from '@mui/material'
import { useTranslation } from '../hooks/useTranslation.js'
import PageSeo from '../components/seo/PageSeo.jsx'
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
import SchoolCanExpectSection from '../components/school/SchoolCanExpect/SchoolCanExpectSection.jsx'
import EducationSpecialistsSaySection from '../components/school/EducationSpecialistsSay/EducationSpecialistsSaySection.jsx'
import GetStartedSection from '../components/school/GetStarted/GetStartedSection.jsx'
import QuestionsSection from '../components/school/Questions/QuestionsSection.jsx'
import ExperienceToSchoolSection from '../components/school/ExperienceToSchool/ExperienceToSchoolSection.jsx'
import '../assets/css/App.css'

export default function SchoolsPage() {
  const { t } = useTranslation()

  return (
    <>
      <PageSeo seoKey="schools" />
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
        <SchoolCanExpectSection />
        <EducationSpecialistsSaySection />
        <GetStartedSection />
        <QuestionsSection />
        <ExperienceToSchoolSection />
      </Box>
      <FooterMain />
    </>
  )
}
