import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import oneImage from '../../../assets/images/one.png'
import twoImage from '../../../assets/images/two.png'
import moreImage from '../../../assets/images/more.png'

function getPlanImage(count) {
  if (count === 1) return oneImage
  if (count === 2) return twoImage
  return moreImage
}

function getPlanTitleKey(count) {
  if (count === 1) return 'checkout.select.oneChild'
  if (count === 2) return 'checkout.select.twoChildren'
  return 'checkout.select.moreChildren'
}

function SelectProduct({ childCount = 1 }) {
  const { t } = useTranslation()
  const imageSrc = getPlanImage(childCount)
  const titleKey = getPlanTitleKey(childCount)

  return (
    <Box
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 280,
          maxHeight: 360,
          p: 2,
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={t(titleKey)}
          sx={{
            maxWidth: '100%',
            width: 280,
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
      <Box sx={{ textAlign: 'center', px: 3, pb: 3, mt: -4, position: 'relative', zIndex: 1 }}>
        <Typography
          component="h3"
          sx={{
            fontSize: '1.25rem',
            mb: 2,
            color: 'secondary.main',
            fontWeight: 700,
          }}
        >
          {t(titleKey)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1, mb: 1 }}>
          <Typography component="span" sx={{ fontSize: '2.25rem', color: 'secondary.main', fontWeight: 700 }}>
            R$750
          </Typography>
          <Typography component="span" sx={{ fontSize: '1.125rem', color: 'text.secondary', fontWeight: 600 }}>
            {t('checkout.select.perYear')}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
            {t('checkout.select.equivalentPerMonth')}
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: 'text.disabled', fontWeight: 600 }}>
            {t('checkout.select.annualCharge')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Typography component="span" sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 600 }}>
            💳 {t('checkout.select.installmentAvailable')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default SelectProduct
