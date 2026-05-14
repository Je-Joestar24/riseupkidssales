import Button from '@mui/material/Button'
import { useTranslation } from '../../../hooks/useTranslation.js'

export default function HeroCtaButton() {
  const { t } = useTranslation()
  const label = t('schools.hero.cta')
  const ariaLabel = label.replace(/\s*→\s*$/, '').trim()

  return (
    <Button
      component="a"
      href="#school-application"
      variant="contained"
      color="primary"
      disableElevation
      aria-label={ariaLabel}
      sx={{
        mt: 2,
        px: { xs: 4, md: 6 },
        py: { xs: 2.5, md: 3 },
        fontSize: { xs: '1.25rem', md: '1.5rem' },
        lineHeight: 1.25,
        fontWeight: 700,
        borderRadius: 3,
        textTransform: 'none',
        color: (theme) => theme.palette.primary.contrastText,
        boxShadow: 6,
        transition: (theme) =>
          theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          bgcolor: 'secondary.main',
          boxShadow: 10,
          color: (theme) => theme.palette.primary.contrastText,
          transform: 'scale(1.03)',
        },
      }}
    >
      {label}
    </Button>
  )
}
