import { Box, Divider } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import HeaderMain from '../components/privacy/header/HeaderMain.jsx'
import HeaderFooter from '../components/privacy/header/HeaderFooter.jsx'
import ChildMain from '../components/privacy/child/ChildMain.jsx'
import MediaMain from '../components/privacy/media/MediaMain.jsx'
import EmailMain from '../components/privacy/email/EmailMain.jsx'
import ProfileMain from '../components/privacy/profile/ProfileMain.jsx'
import DataProtectionMain from '../components/privacy/dataprotection/DataProtectionMain.jsx'
import PlicyMain from '../components/privacy/policy/PlicyMain.jsx'
import NavHeaders from '../components/common/NavHeaders.jsx'

const CARD_BORDER = '#E8E3DC'

export default function PrivacySettingsPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('privacySettings.pageTitle'))

  return (<>
    <NavHeaders />
    <Box
      component="main"
      sx={{
        maxWidth: 1280,
        mx: 'auto',
        px: { xs: 2, sm: 5 },
        py: 6,
        display: 'flex',
        justifyContent: 'center',
      }}
      aria-labelledby="privacy-settings-heading"
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 720,
          bgcolor: 'background.paper',
          borderRadius: '20px',
          p: 4,
          border: `1px solid ${CARD_BORDER}`,
        }}
      >
        <HeaderMain />
        <Divider sx={{ borderColor: CARD_BORDER, mb: 6 }} />
        <ChildMain />
        <MediaMain />
        <EmailMain />
        <ProfileMain />
        <DataProtectionMain />
        <PlicyMain />
        <Divider sx={{ borderColor: CARD_BORDER, pt: 3, mb: 2 }} />
        <HeaderFooter />
      </Box>
    </Box>
  </>
  )
}
