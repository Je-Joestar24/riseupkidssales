import { Button } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import useSalesCtaLink from '../../../hooks/useSalesCtaLink.js'

const GOLD = '#f2af10'

export default function HeroCTA() {
  const { t } = useTranslation()
  const { buttonLinkProps } = useSalesCtaLink()

  return (
    <Button
      {...buttonLinkProps}
      variant="contained"
      size="large"
      disableElevation
      aria-label={t('hero.cta')}
      sx={{
        bgcolor: GOLD,
        color: 'white',
        px: 4,
        py: 2.5,
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        fontWeight: 700,
        borderRadius: 4,
        boxShadow: `0 10px 40px rgba(242, 175, 16, 0.3)`,
        '&:hover': {
          bgcolor: GOLD,
          opacity: 0.9,
          boxShadow: `0 15px 50px rgba(242, 175, 16, 0.4)`,
        },
        mb: 8
      }}
    >
      {t('hero.cta')}
    </Button>
  )
}
