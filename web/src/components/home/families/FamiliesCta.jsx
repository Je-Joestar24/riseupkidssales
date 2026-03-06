import { Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation.js'

const CHECKOUT_PATH = '/checkout'

export default function FamiliesCta({ onClick, href }) {
  const { t } = useTranslation()
  const label = t('families.cta')
  const to = href ?? CHECKOUT_PATH
  const buttonSx = {
    bgcolor: '#f2af10',
    color: 'white',
    px: 6,
    py: 3,
    fontSize: '1.875rem',
    borderRadius: 3,
    fontWeight: 700,
    boxShadow: '0 10px 40px rgba(242,175,16,0.3)',
    '&:hover': {
      bgcolor: '#e09e0e',
      opacity: 0.9,
      boxShadow: '0 15px 50px rgba(242,175,16,0.4)',
    },
  }

  if (onClick && !href) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Button
          type="button"
          onClick={onClick}
          sx={buttonSx}
          variant="contained"
          disableElevation
          aria-label={label}
        >
          {label}
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Button
        component={Link}
        to={to}
        sx={buttonSx}
        variant="contained"
        disableElevation
        aria-label={label}
      >
        {label}
      </Button>
    </Box>
  )
}
