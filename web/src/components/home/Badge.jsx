import { Box, Typography } from '@mui/material'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { useTranslation } from '../../hooks/useTranslation.js'

const TEAL = '#62caca'

export default function Badge() {
  const { t } = useTranslation()
  return (
    <Box
      component="span"
      aria-label={t('hero.badge')}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.5,
        bgcolor: 'white',
        px: 3,
        py: 1.5,
        borderRadius: '9999px',
        border: '4px solid',
        borderColor: TEAL,
        marginTop: { xs: 3, md: 10 },
      }}
    >
      <WorkspacePremiumOutlinedIcon
        sx={{ fontSize: 28, color: TEAL }}
        aria-hidden
      />
      <Typography
        component="span"
        sx={{
          fontSize: { xs: '1rem', md: '1.125rem' },
          fontWeight: 700,
          color: TEAL,
        }}
      >
        {t('hero.badge')}
      </Typography>
    </Box>
  )
}
