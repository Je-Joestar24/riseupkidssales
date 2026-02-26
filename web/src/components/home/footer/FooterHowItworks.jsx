import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function FooterHowItworks() {
  const { t } = useTranslation()

  const scrollToSection = (id) => () => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box>
      <Typography
        component="h4"
        sx={{
          fontSize: '1.5rem',
          mb: 2,
          color: 'secondary.main',
          fontWeight: 600
        }}
      >
        {t('footer.product')}
      </Typography>
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          m: 0,
          p: 0,
          '& > li': { mb: 1 },
        }}
      >
        <Box
          component="li"
          sx={{
            fontSize: '1.125rem',
            color: 'grey.700',
          }}
        >
          <Box
            component="button"
            type="button"
            onClick={scrollToSection('journey-heading')}
            sx={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
              '&:hover': { color: 'secondary.main' },
              transition: 'color 0.2s ease',
              fontWeight: 600
            }}
          >
            {t('footer.howItWorks')}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
