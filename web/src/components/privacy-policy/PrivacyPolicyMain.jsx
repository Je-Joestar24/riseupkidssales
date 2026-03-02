import { Box, Button } from '@mui/material'
import { useTranslation } from '../../hooks/useTranslation.js'
import { useNavigate } from 'react-router-dom'
import PrivacyPolicyHeader from './PrivacyPolicyHeader.jsx'
import PrivacyPolicyCards from './PrivacyPolicyCards.jsx'

const TEAL = '#62caca'

export default function PrivacyPolicyMain() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box sx={{ maxWidth: 896, mx: 'auto' }}>
      <PrivacyPolicyHeader />
      <PrivacyPolicyCards />
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          aria-label={t('privacyPolicy.backToHome')}
          sx={{
            bgcolor: TEAL,
            color: 'white',
            px: 6,
            py: 3,
            fontSize: '1.5rem',
            fontWeight: 700,
            borderRadius: '16px',
            '&:hover': { bgcolor: TEAL, opacity: 0.9 },
          }}
        >
          {t('privacyPolicy.backToHome')}
        </Button>
      </Box>
    </Box>
  )
}
