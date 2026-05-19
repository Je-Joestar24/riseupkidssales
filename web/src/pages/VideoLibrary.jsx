import { Box } from '@mui/material'
import { useTranslation } from '../hooks/useTranslation.js'
import PageSeo from '../components/seo/PageSeo.jsx'
import NavHeaders from '../components/common/NavHeaders.jsx'
import FooterMain from '../components/home/footer/FooterMain.jsx'
import HeroSectionMain from '../components/videoLibrary/HeroSection/HeroSectionMain.jsx'
import VideosSectionMain from '../components/videoLibrary/VideosSection/VideosSectionMain.jsx'
import CtaSectionMain from '../components/videoLibrary/CtaSection/CtaSectionMain.jsx'
import '../assets/css/App.css'

export default function VideoLibrary() {
  const { t } = useTranslation()

  return (
    <>
      <PageSeo seoKey="videos" />
      <NavHeaders />
      <Box
        className="app"
        component="main"
        role="main"
        aria-label={t('videos.mainAria')}
        sx={{ minHeight: '40vh' }}
      >
        <HeroSectionMain />
        <VideosSectionMain />
        <CtaSectionMain />
      </Box>
      <FooterMain />
    </>
  )
}
