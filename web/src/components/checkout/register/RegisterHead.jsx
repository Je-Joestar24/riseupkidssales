import { Box, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'

const STEP_DONE_BG = 'rgb(133, 194, 185)'
const STEP_CURRENT_BG = 'rgb(242, 175, 16)'
const STEP_PENDING_BG = 'rgb(209, 213, 219)' // gray-300

/**
 * Register step header: 3-step stepper (plan → configure account → welcome) and title block.
 */
function RegisterHeader() {
  const { t } = useTranslation()
  return (
    <Box
      component="header"
      aria-label={t('checkout.register.title')}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 4,
      }}
    >
      {/* Stepper */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* Step 1 - Done */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: STEP_DONE_BG,
            }}
            aria-hidden
          >
            <CheckIcon sx={{ color: 'white', fontSize: 24 }} aria-hidden />
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: '0.875rem',
              color: 'text.secondary',
              display: { xs: 'none', sm: 'inline' },
              fontWeight: 600,
            }}
          >
            {t('checkout.register.step1')}
          </Typography>
        </Box>

        {/* Connector */}
        <Box
          sx={{
            width: 48,
            height: 2,
            bgcolor: STEP_PENDING_BG,
          }}
          aria-hidden
        />

        {/* Step 2 - Current */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: STEP_CURRENT_BG,
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 700,
            }}
            aria-hidden
          >
            2
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: '0.875rem',
              color: STEP_CURRENT_BG,
              display: { xs: 'none', sm: 'inline' },
              fontWeight: 600,
            }}
          >
            {t('checkout.register.step2')}
          </Typography>
        </Box>

        {/* Connector */}
        <Box
          sx={{
            width: 48,
            height: 2,
            bgcolor: STEP_PENDING_BG,
          }}
          aria-hidden
        />

        {/* Step 3 - Pending */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: STEP_PENDING_BG,
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 700,
            }}
            aria-hidden
          >
            3
          </Box>
          <Typography
            component="span"
            sx={{
              fontSize: '0.875rem',
              color: 'text.disabled',
              display: { xs: 'none', sm: 'inline' },
              fontWeight: 600,
            }}
          >
            {t('checkout.register.step3')}
          </Typography>
        </Box>
      </Box>

      {/* Title and subtitle */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 1,
            color: STEP_CURRENT_BG,
            fontSize: { xs: '1.875rem', md: '2.25rem' },
            fontWeight: 700,
          }}
        >
          {t('checkout.register.title')}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: '1rem',
            color: 'text.secondary',
            fontWeight: 600,
          }}
        >
          {t('checkout.register.subtitle')}
        </Typography>
      </Box>
    </Box>
  )
}

export default RegisterHeader
