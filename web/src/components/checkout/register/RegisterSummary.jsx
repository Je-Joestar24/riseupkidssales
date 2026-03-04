import { Box, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import CheckIcon from '@mui/icons-material/Check'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useCheckout } from '../../../hooks/useCheckout.js'

const TEAL_PRIMARY = 'rgb(44, 177, 166)'
const TEAL_LIGHT = 'rgb(98, 202, 202)'
const GUARANTEE_BG = 'rgb(244, 237, 216)'
const ACCENT_ORANGE = 'rgb(242, 175, 16)'

function getChildrenEnrolledLabel(childCount, t) {
  if (childCount === 1) return t('checkout.registerSummary.oneChildEnrolled')
  if (childCount === 2) return t('checkout.registerSummary.twoChildrenEnrolled')
  return t('checkout.registerSummary.childrenEnrolled').replace('{{count}}', childCount)
}

/**
 * Register-step summary: enrollment title, plan/total from store, secure payment, guarantee, included list.
 * Sticky like SelectSummary; uses useCheckout for childCount and pricing.
 */
function RegisterSummary() {
  const { t } = useTranslation()
  const { childCount, planPricing, totalPricing } = useCheckout()
  const includedItems = t('checkout.registerSummary.includedItems')
  const items = Array.isArray(includedItems) ? includedItems : []

  return (
    <Box
      component="aside"
      aria-label={t('checkout.registerSummary.title')}
      sx={{
        bgcolor: 'white',
        boxShadow: 3,
        p: 3,
        borderRadius: 2,
        position: 'sticky',
        top: 32,
        maxWidth: 347,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: '1rem',
          fontWeight: 600,
          mb: 0.5,
          color: TEAL_PRIMARY,
        }}
      >
        {t('checkout.registerSummary.title')}
      </Typography>
      <Typography
        component="p"
        sx={{
          fontSize: '0.75rem',
          color: 'text.secondary',
          mb: 2,
          fontWeight: 600,
        }}
      >
        {t('checkout.registerSummary.subtitle')}
      </Typography>

      <Box sx={{ mb: 2, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography component="span" sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
            {getChildrenEnrolledLabel(childCount, t)}
          </Typography>
          <Typography component="span" sx={{ fontSize: '1.125rem', fontWeight: 600, color: TEAL_LIGHT }}>
            {planPricing.line1}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          pb: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography component="span" sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'text.primary' }}>
          {t('checkout.registerSummary.total')}
        </Typography>
        <Typography component="span" sx={{ fontSize: '1.5rem', fontWeight: 600, color: TEAL_PRIMARY }}>
          {totalPricing.line1}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <LockIcon sx={{ fontSize: 16, color: 'text.secondary' }} aria-hidden />
          <Typography component="span" sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600 }}>
            {t('checkout.registerSummary.securePayment')}
          </Typography>
        </Box>
        <Typography component="p" sx={{ fontSize: '0.75rem', color: 'text.secondary', ml: 3, fontWeight: 600 }}>
          {t('checkout.registerSummary.sslNote')}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography component="p" sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5, fontWeight: 600 }}>
          {t('checkout.registerSummary.accessNote')}
        </Typography>
        <Typography component="p" sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600 }}>
          {t('checkout.registerSummary.renewalNote')}
        </Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          mb: 2,
          bgcolor: GUARANTEE_BG,
          borderRadius: 2,
        }}
      >
        <Typography
          component="h4"
          sx={{ fontSize: '1rem', mb: 1, color: ACCENT_ORANGE, fontWeight: 700 }}
        >
          {t('checkout.registerSummary.guaranteeTitle')}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>
          {t('checkout.registerSummary.guaranteeP1')}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>
          {t('checkout.registerSummary.guaranteeP2')}
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
          {t('checkout.registerSummary.guaranteeP3')}
        </Typography>
      </Box>

      <Box>
        <Typography
          component="h4"
          sx={{ fontSize: '1rem', mb: 1.5, color: TEAL_LIGHT, fontWeight: 700 }}
        >
          {t('checkout.registerSummary.includedTitle')}
        </Typography>
        <Box component="ul" sx={{ m: 0, pl: 0, listStyle: 'none', '& > li': { display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 } }}>
          {items.map((item, index) => (
            <Box component="li" key={index}>
              <CheckIcon sx={{ fontSize: 16, color: TEAL_LIGHT, flexShrink: 0, mt: 0.25 }} aria-hidden />
              <Typography component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default RegisterSummary
