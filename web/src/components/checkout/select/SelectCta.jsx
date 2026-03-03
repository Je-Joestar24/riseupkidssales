import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useTranslation } from '../../../hooks/useTranslation.js'

function SelectCta() {
  const { t } = useTranslation()

  return (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      disableElevation
      startIcon={null}
      endIcon={<ArrowForwardIcon sx={{ fontSize: 28 }} />}
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
