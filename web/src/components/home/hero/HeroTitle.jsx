import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'

const GRAY = 'rgb(75, 85, 99)'
const TEAL = '#62caca'

export default function HeroTitle() {
  const { t } = useTranslation()
  return (
    <Typography
      component="h1"
      variant="h1"
      sx={{
        fontSize: { xs: '2.5rem', md: '3rem', lg: '4.1rem' },
        lineHeight: 1.2,
        fontWeight: 600,
      }}
    >
      <Box component="span" sx={{ color: GRAY }}>
        {t('hero.titlePart1')}
      </Box>
      <Box component="span" sx={{ color: TEAL }}>
        {t('hero.titlePart2')}
      </Box>
    </Typography>
  )
}
