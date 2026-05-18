import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from '../../../hooks/useTranslation.js'
import { themeColors } from '../../../config/themeColors.js'

const ORANGE_HOVER = '#d77a5a'

export default function CtaSectionButton() {
  const { t } = useTranslation()
  const label = t('videos.cta.button')
  const ariaLabel = label.replace(/\s*→\s*$/, '').trim()

  return (
    <Button
      component={Link}
      to="/parents"
      variant="contained"
      disableElevation
      aria-label={ariaLabel}
      sx={{
        bgcolor: themeColors.orange,
        color: 'common.white',
        px: { xs: 4, md: 6 },
        py: { xs: 2, md: 2.5 },
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.25,
        fontWeight: 700,
        borderRadius: '16px',
        textTransform: 'none',
        boxShadow: '0 20px 25px -5px rgba(233, 138, 104, 0.35), 0 8px 10px -6px rgba(233, 138, 104, 0.2)',
        transition: (theme) =>
          theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          bgcolor: ORANGE_HOVER,
          boxShadow: '0 25px 50px -12px rgba(233, 138, 104, 0.45)',
          transform: 'scale(1.05)',
        },
      }}
    >
      {label}
    </Button>
  )
}
