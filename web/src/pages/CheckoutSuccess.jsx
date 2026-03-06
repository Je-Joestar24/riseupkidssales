import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Box, Typography, CircularProgress } from '@mui/material'
import { useTranslation } from '../hooks/useTranslation.js'
import { getCheckoutSessionDetails } from '../services/checkoutService.js'
import SuccessHeader from '../components/checkout/success/SuccessHeader.jsx'
import SuccessCards from '../components/checkout/success/SuccessCards.jsx'
import SuccessLMSLink from '../components/checkout/success/SuccessLMSLink.jsx'
import CheckoutHeader from '../components/common/CheckoutHeader.jsx'

const BG_COLOR = '#FCF9F3'
const GUARANTEE_BG = '#F4EDD8'

/**
 * Format a date for the guarantee message (e.g. "March 20, 2026").
 */
function formatGuaranteeDeadline() {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'

  useEffect(() => {
    if (!sessionId || sessionId.trim() === '') {
      navigate('/checkout/register', { replace: true })
      return
    }

    let cancelled = false
    getCheckoutSessionDetails(sessionId)
      .then(() => {
        if (!cancelled) setStatus('success')
      })
      .catch(() => {
        if (!cancelled) navigate('/checkout/register', { replace: true })
      })

    return () => { cancelled = true }
  }, [sessionId, navigate])

  if (!sessionId || status === 'loading') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BG_COLOR,
          px: 2,
        }}
      >
        <CircularProgress size={48} aria-label={t('checkout.success.verifying')} />
        <Typography sx={{ mt: 2, color: 'text.secondary', fontWeight: 600 }}>
          {t('checkout.success.verifying')}
        </Typography>
      </Box>
    )
  }

  if (status !== 'success') {
    return null
  }

  const guaranteeDate = formatGuaranteeDeadline()
  const rawGuarantee = t('checkout.success.guaranteeStarted') || ''
  const guaranteeText = rawGuarantee.replace('{{date}}', guaranteeDate)
  const exclamation = guaranteeText.indexOf('!')
  const firstSentence = exclamation >= 0 ? guaranteeText.slice(0, exclamation + 1) : guaranteeText
  const rest = exclamation >= 0 ? guaranteeText.slice(exclamation + 1).trim() : ''

  return (
    <>
      <CheckoutHeader />
      <Box
        component="main"
        role="main"
        aria-label="Checkout success"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BG_COLOR,
        }}
      >
        <Box sx={{ textAlign: 'center', px: 2, pb: 4 }}>
          <SuccessHeader />
          <SuccessCards />
          <Box sx={{ mb: 4 }}>
            <SuccessLMSLink label={t('checkout.success.startLearningNow')} />
          </Box>
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: GUARANTEE_BG,
              borderRadius: 2,
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            <Typography component="p" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              <Box component="strong" sx={{ fontWeight: 700 }}>
                {firstSentence}
              </Box>
              {rest ? ` ${rest}` : ''}
            </Typography>
          </Box>
        </Box>
      </Box></>
  )
}
