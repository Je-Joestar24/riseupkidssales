import { Box, Typography } from '@mui/material'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

export default function GetStartedFooter() {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        bgcolor: themeColors.bgMethodology,
        borderRadius: 2,
        p: { xs: 3, md: 4 },
        textAlign: 'center',
      }}
    >
      <Typography
        component="p"
        sx={{
          fontSize: { xs: '1.125rem', md: '1.25rem' },
          color: 'grey.700',
          lineHeight: 1.7,
          fontWeight: 600,
          maxWidth: 896,
          mx: 'auto',
        }}
      >
        {t('schools.getStarted.footer')}
      </Typography>
    </Box>
  )
}
