import { Box } from '@mui/material'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { useTranslation } from '../hooks/useTranslation.js'
import PrivacyPolicyMain from '../components/privacy-policy/PrivacyPolicyMain.jsx'
import NavHeaders from '../components/common/NavHeaders.jsx'

export default function PrivacyPolicyPage() {
    const { t } = useTranslation()
    useDocumentTitle(t('privacyPolicy.title'))

    return (
        <>
            <NavHeaders />
            <Box
                component="main"
                sx={{
                    px: { xs: 2, sm: 3 },
                    py: 10,
                }}
                aria-labelledby="privacy-policy-title"
            >
                <PrivacyPolicyMain />
            </Box>
        </>
    )
}
