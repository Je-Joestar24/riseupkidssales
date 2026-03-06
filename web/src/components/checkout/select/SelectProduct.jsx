import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useCheckout } from '../../../hooks/useCheckout.js'
import oneImage from '../../../assets/images/one.png'
import twoImage from '../../../assets/images/two.png'
import moreImage from '../../../assets/images/more.png'

const CARD_BORDER = 'rgb(133, 194, 185)'
const FOUNDER_BADGE_BG = 'rgb(242, 175, 16)'
const DARK_TEAL = 'rgb(44, 177, 166)'
const SPECIAL_VALUE_COLOR = 'rgb(212, 165, 116)'

const PLAN_IMAGES = { 1: oneImage, 2: twoImage }
function getPlanImage(count) {
  return PLAN_IMAGES[count] || moreImage
}

function getPlanTitle(count, t) {
  if (count === 1) return t('checkout.select.oneChild')
  if (count === 2) return t('checkout.select.twoChildren')
  return t('checkout.select.childrenCount').replace('{{count}}', count)
}

function SelectProduct() {
  const { t } = useTranslation()
  const { childCount, planPricing } = useCheckout()
  const imageSrc = getPlanImage(childCount)
  const title = getPlanTitle(childCount, t)
  const priceLine2 = planPricing.line2 ?? t('checkout.select.paymentNote')

  return (
    <Box
      sx={{
        bgcolor: 'white',
        boxShadow: 2,
        overflow: 'hidden',
        borderRadius: 2,
        border: '4px solid',
        borderColor: CARD_BORDER,
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        {/* Program title + description */}
        <Box sx={{ pt: 3, px: 3 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              mb: 0.5,
              color: 'rgb(47, 47, 47)',
            }}
          >
            {t('checkout.select.programTitle')}
          </Typography>
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            {t('checkout.select.programDescription')}
          </Typography>
        </Box>

        {/* Founder badge */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 2 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 1,
              bgcolor: FOUNDER_BADGE_BG,
              borderRadius: 9999,
            }}
          >
            <Typography component="span" sx={{ color: 'white', fontSize: '0.75rem', fontWeight: 600 }}>
              {t('checkout.select.founderBadge')}
            </Typography>
          </Box>
        </Box>

        {/* Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src={imageSrc}
            alt={title}
            sx={{
              maxWidth: '100%',
              width: 280,
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        {/* Content block (overlap) */}
        <Box sx={{ px: 3, pb: 3, mt: -4, position: 'relative', zIndex: 1 }}>
          <Typography
            component="h3"
            sx={{
              fontSize: '1.25rem',
              mb: 2,
              color: 'secondary.main',
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>

          <Box sx={{ mb: 1 }}>
            <Typography
              component="div"
              sx={{
                fontSize: '2.25rem',
                fontWeight: 600,
                color: DARK_TEAL,
              }}
            >
              {planPricing.line1}
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
              {priceLine2}
            </Typography>
          </Box>
          {planPricing.discountFormatted && (
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'secondary.main',
                }}
              >
                {planPricing.discountFormatted}
              </Typography>
            </Box>
          )}
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '0.75rem', color: SPECIAL_VALUE_COLOR, fontWeight: 600 }}>
              {t('checkout.select.specialValue')}
            </Typography>
          </Box>
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: DARK_TEAL }}>
              {t('checkout.select.curriculumSubtitle')}
            </Typography>
          </Box>

          {/* Materials section */}
          <Box
            sx={{
              mt: 2,
              pt: 3,
              borderTop: 1,
              borderColor: 'divider',
              textAlign: 'left',
              px: 1,
              pb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: '1.25rem',
                mb: 1,
                color: 'secondary.main',
                fontWeight: 700,
              }}
            >
              {t('checkout.select.materialsIncluded')}
            </Typography>
            <Typography sx={{ fontSize: '1rem', color: 'text.secondary', fontWeight: 600 }}>
              {t('checkout.select.materialsDescription')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SelectProduct
