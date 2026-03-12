import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

const ArrowRightSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export default function EnglishFooterCta() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        mt: 8,
      }}
      aria-label={t('english.footerCta.ariaLabel', 'Year 1 and Year 2 progression')}
    >
      <Box
        component="span"
        sx={{
          bgcolor: themeColors.secondary,
          color: themeColors.textInverse,
          px: { xs: 4, md: 6 },
          py: { xs: 2, md: 3 },
          borderRadius: 2,
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.25rem', md: '1.875rem' },
        }}
      >
        {t('english.footerCta.year1', 'Year 1')}
      </Box>
      <Box
        sx={{
          color: themeColors.orange,
          '& svg': { width: 48, height: 48 },
          '@media (min-width:900px)': {
            '& svg': { width: 64, height: 64 },
          },
        }}
      >
        <ArrowRightSvg />
      </Box>
      <Box
        component="span"
        sx={{
          bgcolor: themeColors.accent,
          color: themeColors.textInverse,
          px: { xs: 4, md: 6 },
          py: { xs: 2, md: 3 },
          borderRadius: 2,
          fontFamily: 'Quicksand, sans-serif',
          fontWeight: 700,
          fontSize: { xs: '1.25rem', md: '1.875rem' },
        }}
      >
        {t('english.footerCta.year2', 'Year 2')}
      </Box>
    </Box>
  )
}
