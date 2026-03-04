import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { useCheckout } from '../../../hooks/useCheckout.js'

/**
 * Builds /checkout/register URL with optional query params for child count and box.
 * Used so reload or shared link restores plan selection.
 */
function getRegisterSearch(childCount, addBox) {
  const params = new URLSearchParams()
  if (childCount != null && Number(childCount) >= 1) {
    params.set('children', String(childCount))
  }
  if (addBox) {
    params.set('box', '1')
  }
  const search = params.toString()
  return search ? `?${search}` : ''
}

function SelectCta() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { childCount, addBox } = useCheckout()

  const handleContinue = () => {
    const search = getRegisterSearch(childCount, addBox)
    navigate(`/checkout/register${search}`)
  }

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      disableElevation
      startIcon={null}
      endIcon={<ArrowForwardIcon sx={{ fontSize: 28 }} />}
      onClick={handleContinue}
      sx={{
        mt: 3,
        py: 2,
        px: 3,
        fontSize: '1.25rem',
        fontWeight: 700,
        borderRadius: 2,
        boxShadow: 3,
        textTransform: 'none',
        '&:hover': {
          boxShadow: 4,
          transform: 'scale(1.02)',
        },
        '&:active': {
          transform: 'scale(0.98)',
        },
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
      }}
      aria-label={t('checkout.select.continueToPayment')}
    >
      {t('checkout.select.continueToPayment')}
    </Button>
  )
}

export default SelectCta
