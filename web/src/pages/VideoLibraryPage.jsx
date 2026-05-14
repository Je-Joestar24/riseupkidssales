import { Box, Typography } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import NavHeaders from '../components/common/NavHeaders.jsx'
import FooterMain from '../components/home/footer/FooterMain.jsx'
import '../assets/css/App.css'

export default function VideoLibraryPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('videos.pageTitle'))

  return (
    <>
      <NavHeaders />
      <Box
        className="app"
        component="main"
        role="main"
        aria-label={t('videos.mainAria')}
        sx={{ py: { xs: 6, md: 10 }, px: 2, textAlign: 'center', minHeight: '40vh' }}
      >
        <Typography component="h1" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', md: '2rem' }, color: 'warning.main' }}>
          {t('rhome.links.videos.title')}
        </Typography>
      </Box>
      <FooterMain />
    </>
  )
}
