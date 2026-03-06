import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ShieldIcon from '@mui/icons-material/Shield'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useCheckout } from '../../../hooks/useCheckout.js'
import {
  registerAndCreateCheckoutSession,
  localeToRegion,
  DEFAULT_TERMS_VERSION,
} from '../../../services/checkoutService.js'

const ORANGE = 'rgb(242, 175, 16)'
const BORDER_DEFAULT = 'rgb(229, 231, 235)'
const STRIPE_PURPLE = 'rgb(99, 91, 255)'
const PAYPAL_BLUE = 'rgb(0, 112, 186)'
const PAGSEGURO_GREEN = 'rgb(0, 168, 104)'
const TEAL_LINK = 'rgb(98, 202, 202)'

const PAYMENT_OPTIONS = [
  { id: 'card', icon: 'card', bg: STRIPE_PURPLE, IconComponent: CreditCardIcon },
  { id: 'paypal', label: 'P', bg: PAYPAL_BLUE },
  { id: 'pagseguro', label: 'PS', bg: PAGSEGURO_GREEN },
]

function PaymentOptionButton({ option, selected, title, subtitle, onSelect }) {
  const isCard = option.id === 'card'
  return (
    <Button
      type="button"
      fullWidth
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
      aria-label={title}
      sx={{
        p: 2,
        border: '2px solid',
        borderColor: selected ? ORANGE : BORDER_DEFAULT,
        borderRadius: 2,
        boxShadow: selected ? 2 : 0,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        textTransform: 'none',
        justifyContent: 'flex-start',
        bgcolor: 'white',
        color: 'text.primary',
        '&:hover': {
          bgcolor: 'action.hover',
          boxShadow: 2,
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          bgcolor: option.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {isCard && option.IconComponent ? (
          <CreditCardIcon sx={{ fontSize: 28 }} />
        ) : (
          <Typography component="span" sx={{ fontWeight: 700, fontSize: '1.125rem' }}>
            {option.label}
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, textAlign: 'left' }}>
        <Typography component="div" sx={{ fontSize: '1rem', fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography component="div" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
          {subtitle}
        </Typography>
      </Box>
      {selected && (
        <CheckIcon sx={{ fontSize: 24, color: ORANGE, flexShrink: 0 }} aria-hidden />
      )}
    </Button>
  )
}

const appUrl = () => import.meta.env.VITE_APP_URL || window.location.origin

function RgisterForm() {
  const { t } = useTranslation()
  const { childCount, addBox, locale } = useCheckout()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (paymentMethod !== 'card') {
      setError(t('checkout.registerForm.onlyCardSupported') || 'Only card payment (Stripe) is available for now.')
      return
    }
    setLoading(true)
    try {
      const base = appUrl()
      const { url } = await registerAndCreateCheckoutSession({
        name: name.trim() || undefined,
        email: email.trim(),
        password,
        region: localeToRegion(locale),
        childCount,
        addBox,
        termsVersion: DEFAULT_TERMS_VERSION,
        successUrl: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${base}/checkout/register`,
      })
      if (url) window.location.href = url
    } catch (err) {
      setError(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  const paymentTitles = {
    card: t('checkout.registerForm.paymentCard'),
    paypal: t('checkout.registerForm.paymentPayPal'),
    pagseguro: t('checkout.registerForm.paymentPagSeguro'),
  }
  const paymentSubtitles = {
    card: t('checkout.registerForm.paymentCardDesc'),
    paypal: t('checkout.registerForm.paymentPayPalDesc'),
    pagseguro: t('checkout.registerForm.paymentPagSeguroDesc'),
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        p: 4,
        borderRadius: 2,
        maxWidth: 700,
        width: '100%',
      }}
    >
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Guardian details */}
      <Box sx={{ mb: 4 }}>
        <Typography
          component="h2"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 600,
            mb: 2,
            color: ORANGE,
          }}
        >
          {t('checkout.registerForm.guardianTitle')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography
              component="label"
              htmlFor="register-name"
              sx={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'text.secondary',
                mb: 1,
                fontWeight: 600,
              }}
            >
              {t('checkout.registerForm.nameLabel') || 'Name'}
            </Typography>
            <TextField
              id="register-name"
              type="text"
              placeholder={t('checkout.registerForm.namePlaceholder') || 'Your name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              autoComplete="name"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  '& fieldset': { borderColor: BORDER_DEFAULT },
                  '&.Mui-focused fieldset': { borderColor: ORANGE, borderWidth: '1px' },
                },
                '& .MuiOutlinedInput-input': { py: 1.5, px: 2, fontWeight: 600 },
              }}
            />
          </Box>
          <Box>
            <Typography
              component="label"
              htmlFor="register-email"
              sx={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'text.secondary',
                mb: 1,
                fontWeight: 600,
              }}
            >
              {t('checkout.registerForm.emailLabel')}
            </Typography>
            <TextField
              id="register-email"
              type="email"
              placeholder={t('checkout.registerForm.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: BORDER_DEFAULT,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: ORANGE,
                    borderWidth: '1px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.5,
                  px: 2,
                  fontWeight: 600,
                },
              }}
            />
          </Box>
          <Box>
            <Typography
              component="label"
              htmlFor="register-password"
              sx={{
                display: 'block',
                fontSize: '0.875rem',
                color: 'text.secondary',
                mb: 1,
                fontWeight: 600,
              }}
            >
              {t('checkout.registerForm.passwordLabel')}
            </Typography>
            <TextField
              id="register-password"
              type="password"
              placeholder={t('checkout.registerForm.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="new-password"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: BORDER_DEFAULT,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: ORANGE,
                    borderWidth: '1px',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  py: 1.5,
                  px: 2,
                  fontWeight: 600,
                },
              }}
            />
          </Box>
          <Typography component="p" sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600 }}>
            {t('checkout.registerForm.noSpam')}
          </Typography>
        </Box>
      </Box>

      {/* Payment method */}
      <Box sx={{ mb: 3 }}>
        <Typography
          component="h2"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 600,
            mb: 1,
            color: ORANGE,
          }}
        >
          {t('checkout.registerForm.paymentTitle')}
        </Typography>
        <Typography component="p" sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2, fontWeight: 600 }}>
          {t('checkout.registerForm.paymentSubtitle')}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {PAYMENT_OPTIONS.map((opt) => (
            <PaymentOptionButton
              key={opt.id}
              option={opt}
              selected={paymentMethod === opt.id}
              title={paymentTitles[opt.id]}
              subtitle={paymentSubtitles[opt.id]}
              onSelect={setPaymentMethod}
            />
          ))}
        </Box>
      </Box>

      {/* Terms */}
      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              icon={
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'grey.500',
                    boxSizing: 'border-box',
                    display: 'block',
                  }}
                />
              }
              checkedIcon={
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: TEAL_LINK,
                    bgcolor: TEAL_LINK,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <CheckIcon sx={{ fontSize: 16, color: 'white' }} />
                </Box>
              }
              sx={{
                padding: 0.5,
                '&.Mui-checked': {
                  color: TEAL_LINK,
                },
              }}
            />
          }
          label={
            <Typography component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
              {t('checkout.registerForm.termsAgreeBefore')}
              <Link
                to="/privacy-policy"
                style={{ color: TEAL_LINK, textDecoration: 'underline' }}
              >
                {t('checkout.registerForm.termsLinkText')}
              </Link>
              {t('checkout.registerForm.termsAgreeAfter')}
            </Typography>
          }
          sx={{
            alignItems: 'center',
            cursor: 'pointer',
            '& .MuiFormControlLabel-label': {
              marginLeft: '1rem',
            },
          }}
        />
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockIcon />}
        disabled={!termsAccepted || loading}
        sx={{
          mt: 4,
          py: 2,
          fontSize: '1.25rem',
          fontWeight: 600,
          borderRadius: 2,
          bgcolor: ORANGE,
          boxShadow: 2,
          '&:hover': {
            bgcolor: ORANGE,
            filter: 'brightness(1.05)',
            boxShadow: 3,
          },
        }}
      >
        {t('checkout.registerForm.submitButton')}
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        <ShieldIcon sx={{ fontSize: 20, color: 'text.secondary' }} aria-hidden />
        <Typography component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
          {t('checkout.registerForm.protectedBy')}
        </Typography>
      </Box>
    </Box>
  )
}

export default RgisterForm
