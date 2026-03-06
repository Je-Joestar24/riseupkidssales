import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const CARD_STYLES = [
  { bg: '#D4E6E3', titleColor: '#62CACA' },
  { bg: '#FDE8DE', titleColor: '#E98A68' },
  { bg: '#F4EDD8', titleColor: '#F2AF10' },
]

export default function SuccessCards() {
  const { t } = useTranslation()

  const steps = [
    { titleKey: 'checkout.success.step1Title', descKey: 'checkout.success.step1Desc' },
    { titleKey: 'checkout.success.step2Title', descKey: 'checkout.success.step2Desc' },
    { titleKey: 'checkout.success.step3Title', descKey: 'checkout.success.step3Desc' },
  ]

  return (
    <Box sx={{ maxWidth: 672, mx: 'auto', mb: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          textAlign: 'left',
        }}
      >
        {steps.map((step, i) => (
          <Box
            key={step.titleKey}
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: CARD_STYLES[i].bg,
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                mb: 1,
                color: CARD_STYLES[i].titleColor,
              }}
            >
              {t(step.titleKey)}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {t(step.descKey)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
