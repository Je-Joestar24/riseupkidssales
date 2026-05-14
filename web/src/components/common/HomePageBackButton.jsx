import Button from '@mui/material/Button'
import { Link as RouterLink, useLocation } from 'react-router-dom'

/**
 * Fixed lower-left link to marketing home (`/`). Hidden on the home route.
 * Primary (teal) background, white label with leading arrow. No i18n.
 */
export default function HomePageBackButton() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return null
  }

  return (
    <Button
      component={RouterLink}
      to="/"
      variant="contained"
      color="secondary"
      disableElevation
      aria-label="Back to home"
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(2),
        left: (theme) => theme.spacing(2),
        zIndex: (theme) => theme.zIndex.snackbar,
        fontSize: (theme) => theme.typography.body2.fontSize,
        lineHeight: (theme) => theme.typography.body2.lineHeight,
        color: (theme) => theme.palette.common.white,
        boxShadow: 4,
        px: 3,
        py: 1.5,
        minWidth: 'auto',
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
        border: 'none',
        transition: (theme) =>
          theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          boxShadow: 6,
          color: (theme) => theme.palette.common.white,
        },
      }}
    >
      ← Homepage
    </Button>
  )
}
