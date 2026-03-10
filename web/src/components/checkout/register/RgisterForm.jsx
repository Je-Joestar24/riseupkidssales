import { useState, useEffect, useRef } from 'react'
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
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Collapse,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ShieldIcon from '@mui/icons-material/Shield'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useCheckout } from '../../../hooks/useCheckout.js'
import {
  registerAndCreateCheckoutSession,
  registerParent,
  localeToRegion,
  localeToCurrency,
  getPaypalTier,
  DEFAULT_TERMS_VERSION,
} from '../../../services/checkoutService.js'
import { PayPalScriptProvider, PayPalMessages, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import PayPalCheckout from '../PayPalCheckout.jsx'

const ORANGE = 'rgb(242, 175, 16)'
const BORDER_DEFAULT = 'rgb(229, 231, 235)'
const STRIPE_PURPLE = 'rgb(99, 91, 255)'
const PAYPAL_BLUE = 'rgb(0, 112, 186)'
const PAGSEGURO_GREEN = 'rgb(0, 168, 104)'
const TEAL_LINK = 'rgb(98, 202, 202)'

const PAYPAL_CLIENT_ID =
  import.meta.env?.VITE_PAYPAL_CLIENT_ID ||
  import.meta.env?.REACT_APP_PAYPAL_CLIENT_ID ||
  ''

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

/**
 * PayPal does NOT provide an API to pre-check Pay in 4 eligibility.
 * Eligibility is determined dynamically by PayPal (region, amount, etc.).
 * We use the Pay Later message component as a detection mechanism: if the SDK
 * renders the message into our container, Pay in 4 is available; if the container
 * stays empty after the script loads, we assume Pay in 4 is not available in
 * the user's region and disable the "Pagar em 4x" option.
 */
const PAY_LATER_CHECK_DELAY_MS = 2500

function PayLaterEligibilityCheck({ onResult }) {
  const [{ isResolved }] = usePayPalScriptReducer()
  const reported = useRef(false)

  useEffect(() => {
    if (!isResolved || reported.current) return
    const timer = setTimeout(() => {
      if (reported.current) return
      const el = document.getElementById('paypal-paylater-message')
      const hasContent =
        el &&
        (el.childNodes.length > 0 ||
          (el.textContent || '').trim() !== '')
      reported.current = true
      onResult(!!hasContent)
    }, PAY_LATER_CHECK_DELAY_MS)
    return () => clearTimeout(timer)
  }, [isResolved, onResult])

  return null
}

function RgisterForm() {
  const { t } = useTranslation()
  const { childCount, addBox, locale, planPricing } = useCheckout()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [paypalPlanType, setPaypalPlanType] = useState('yearly')
  const [payLaterAvailable, setPayLaterAvailable] = useState(null)
  const [paypalToken, setPaypalToken] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (paymentMethod === 'pagseguro') {
      setError(t('checkout.registerForm.pagseguroComingSoon') || 'PagSeguro coming soon.')
      return
    }
    if (paymentMethod === 'paypal') {
      setLoading(true)
      try {
        const { token } = await registerParent({
          name: name.trim() || undefined,
          email: email.trim(),
          password,
        })
        setPaypalToken(token)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
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

  const paypalTier = getPaypalTier(
    childCount,
    localeToCurrency(locale),
    paypalPlanType === 'yearly'
  )
  // Backend tier: Pay in 4 → 1_child, 2_children, 3_children; Yearly → 1_child_yearly, etc. (per currency)
  const showPayPalCheckout = paymentMethod === 'paypal' && paypalToken
  const successUrl = `${appUrl()}/checkout/success`
  const paypalSuccessUrl = `${appUrl()}/checkout/success?provider=paypal`
  const goToPayPalSuccess = () => {
    try {
      sessionStorage.setItem('checkout_provider', 'paypal')
    } catch (_) {}
    window.location.replace(paypalSuccessUrl)
  }

  const isPayIn4Disabled = payLaterAvailable === false

  useEffect(() => {
    if (paymentMethod !== 'paypal') {
      setPayLaterAvailable(null)
    }
  }, [paymentMethod])

  useEffect(() => {
    if (isPayIn4Disabled && paypalPlanType === 'pay_in_4') {
      setPaypalPlanType('yearly')
    }
  }, [isPayIn4Disabled])

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
              onSelect={(id) => {
                setPaymentMethod(id)
                if (id !== 'paypal') setPaypalToken(null)
              }}
            />
          ))}
        </Box>

        {/* PayPal plan type: Pay in 4 vs Yearly – appears when PayPal is selected.
            Wrapped in PayPalScriptProvider so we can render the Pay Later message container
            and detect eligibility (no API exists; we use message render as detection). */}
        <Collapse
          in={paymentMethod === 'paypal'}
          timeout={200}
          unmountOnExit
          sx={{ width: '100%' }}
        >
          {paymentMethod === 'paypal' && PAYPAL_CLIENT_ID ? (
            <PayPalScriptProvider
              options={{
                clientId: PAYPAL_CLIENT_ID,
                currency: localeToCurrency(locale),
                intent: 'capture',
                components: 'buttons,messages',
              }}
            >
              {/* Pay Later message container above payment options.
                  PayPal does NOT provide an API to pre-check Pay in 4 eligibility; we use
                  whether this container gets content as the detection mechanism. */}
              <Box
                id="paypal-paylater-message"
                data-pp-message
                data-pp-style-layout="text"
                data-pp-style-logo-type="inline"
                data-pp-amount={String(planPricing?.amount ?? 0)}
                sx={{ minHeight: 24, mb: 1 }}
              >
                {['USD', 'EUR', 'GBP'].includes(localeToCurrency(locale)) && (
                  <PayPalMessages
                    amount={String(planPricing?.amount ?? 0)}
                    currency={localeToCurrency(locale)}
                    style={{ layout: 'text' }}
                  />
                )}
              </Box>
              <PayLaterEligibilityCheck onResult={setPayLaterAvailable} />
              <FormControl
                component="fieldset"
                sx={{
                  mt: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: PAYPAL_BLUE,
                  borderRadius: 2,
                  bgcolor: 'rgba(0, 112, 186, 0.04)',
                  width: '100%',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease',
                  '&:focus-within': {
                    borderColor: PAYPAL_BLUE,
                    bgcolor: 'rgba(0, 112, 186, 0.06)',
                  },
                }}
                aria-label={t('checkout.registerForm.paypalPlanLabel')}
              >
                <FormLabel
                  component="legend"
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    mb: 1,
                  }}
                >
                  {t('checkout.registerForm.paypalPlanLabel')}
                </FormLabel>
                <RadioGroup
                  row
                  value={paypalPlanType}
                  onChange={(e) => setPaypalPlanType(e.target.value)}
                  aria-label="PayPal plan type"
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel
                    value="pay_in_4"
                    disabled={isPayIn4Disabled}
                    control={
                      <Radio
                        sx={{
                          color: 'grey.600',
                          '&.Mui-checked': { color: PAYPAL_BLUE },
                          '&.Mui-disabled': { color: 'grey.400' },
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600 }}>
                        {t('checkout.registerForm.paypalPlanOptionPayIn4')}
                      </Typography>
                    }
                    sx={{ m: 0, opacity: isPayIn4Disabled ? 0.7 : 1 }}
                  />
                  <FormControlLabel
                    value="yearly"
                    control={
                      <Radio
                        sx={{
                          color: 'grey.600',
                          '&.Mui-checked': { color: PAYPAL_BLUE },
                        }}
                        size="small"
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600 }}>
                        {t('checkout.registerForm.paypalPlanOptionYearly')}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                </RadioGroup>
                {isPayIn4Disabled && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: 'text.secondary', fontWeight: 600 }}
                    role="status"
                  >
                    {t('checkout.registerForm.payLaterNotAvailableInCountry')}
                  </Typography>
                )}
              </FormControl>
              {showPayPalCheckout && (
                <Box sx={{ mb: 3, pt: 2, borderTop: '1px solid', borderColor: BORDER_DEFAULT, mt: 2 }}>
                  <Typography component="p" sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2, fontWeight: 600 }}>
                    {t('checkout.registerForm.completeWithPayPal')}
                  </Typography>
                  <PayPalCheckout
                    tier={paypalTier}
                    amount={planPricing.amount}
                    currency={localeToCurrency(locale)}
                    token={paypalToken}
                    showPayLaterMessage={paypalPlanType === 'pay_in_4'}
                    skipScriptProvider
                    onSuccess={() => goToPayPalSuccess()}
                    onError={(err) => setError(err?.message || err?.response?.data?.message || 'PayPal error')}
                  />
                </Box>
              )}
            </PayPalScriptProvider>
          ) : paymentMethod === 'paypal' ? (
            <>
              <FormControl
                component="fieldset"
                sx={{
                  mt: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: PAYPAL_BLUE,
                  borderRadius: 2,
                  bgcolor: 'rgba(0, 112, 186, 0.04)',
                  width: '100%',
                }}
                aria-label={t('checkout.registerForm.paypalPlanLabel')}
              >
                <FormLabel component="legend" sx={{ fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                  {t('checkout.registerForm.paypalPlanLabel')}
                </FormLabel>
                <RadioGroup row value={paypalPlanType} onChange={(e) => setPaypalPlanType(e.target.value)} aria-label="PayPal plan type" sx={{ gap: 2 }}>
                  <FormControlLabel value="pay_in_4" control={<Radio sx={{ color: 'grey.600', '&.Mui-checked': { color: PAYPAL_BLUE } }} size="small" />} label={<Typography sx={{ fontSize: '0.9375rem', fontWeight: 600 }}>{t('checkout.registerForm.paypalPlanOptionPayIn4')}</Typography>} sx={{ m: 0 }} />
                  <FormControlLabel value="yearly" control={<Radio sx={{ color: 'grey.600', '&.Mui-checked': { color: PAYPAL_BLUE } }} size="small" />} label={<Typography sx={{ fontSize: '0.9375rem', fontWeight: 600 }}>{t('checkout.registerForm.paypalPlanOptionYearly')}</Typography>} sx={{ m: 0 }} />
                </RadioGroup>
              </FormControl>
              {showPayPalCheckout && (
                <Box sx={{ mb: 3, pt: 2, borderTop: '1px solid', borderColor: BORDER_DEFAULT, mt: 2 }}>
                  <Typography component="p" sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 2, fontWeight: 600 }}>
                    {t('checkout.registerForm.completeWithPayPal')}
                  </Typography>
                  <PayPalCheckout
                    tier={paypalTier}
                    amount={planPricing.amount}
                    currency={localeToCurrency(locale)}
                    token={paypalToken}
                    showPayLaterMessage={paypalPlanType === 'pay_in_4'}
                    onSuccess={() => goToPayPalSuccess()}
                    onError={(err) => setError(err?.message || err?.response?.data?.message || 'PayPal error')}
                  />
                </Box>
              )}
            </>
          ) : null}
        </Collapse>
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

      {/* Submit: for card go to Stripe; for PayPal first submit registers then shows PayPal buttons above */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LockIcon />}
        disabled={!termsAccepted || loading || showPayPalCheckout}
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
        {paymentMethod === 'paypal' && !paypalToken
          ? (t('checkout.registerForm.continueToPayPal') || 'Continuar para PayPal')
          : paymentMethod === 'paypal' && paypalToken
            ? (t('checkout.registerForm.completePaymentAbove') || 'Conclua o pagamento acima')
            : t('checkout.registerForm.submitButton')}
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
          {paymentMethod === 'paypal' ? t('checkout.registerForm.protectedByPayPal') : t('checkout.registerForm.protectedBy')}
        </Typography>
      </Box>
    </Box>
  )
}

export default RgisterForm
