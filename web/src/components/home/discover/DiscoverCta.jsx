import { Box, Button } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import useSalesCtaLink from '../../../hooks/useSalesCtaLink.js'

export default function DiscoverCta({ onClick, href, children }) {
  const { t } = useTranslation()
  const { isExternal, buttonLinkProps } = useSalesCtaLink(href)
  const label = children ?? t('discover.cta')
  const buttonSx = {
    bgcolor: '#f2af10',
    color: 'white',
    px: '40px',
    py: '24px',
    fontSize: '1.5rem',
    fontWeight: 700,
    borderRadius: '16px',
    textTransform: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    '&:hover': {
      bgcolor: '#f2af10',
      opacity: 0.9,
    },
  }

  if (onClick && !href && !isExternal) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Button type="button" onClick={onClick} sx={buttonSx} variant="contained" disableElevation>
          {label}
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Button
        {...buttonLinkProps}
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
