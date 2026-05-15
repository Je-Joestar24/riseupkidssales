import IconButton from '@mui/material/IconButton'
import { Link as RouterLink, useLocation } from 'react-router-dom'

function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

/**
 * Fixed lower-right icon link to marketing home (`/`). Hidden on the home route.
 */
export default function HomePageBackButton() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return null
  }

  return (
    <IconButton
      component={RouterLink}
      to="/"
      aria-label="Go to homepage"
      sx={{
        position: 'fixed',
        bottom: (theme) => theme.spacing(3),
        right: (theme) => theme.spacing(3),
        zIndex: (theme) => theme.zIndex.snackbar,
        bgcolor: 'secondary.main',
        color: 'common.white',
        p: 2,
        boxShadow: 8,
        borderRadius: '50%',
        transition: (theme) =>
          theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
            duration: theme.transitions.duration.short,
          }),
        '&:hover': {
          bgcolor: '#4db8b8',
          color: 'common.white',
          boxShadow: 10,
          transform: 'scale(1.1)',
        },
      }}
    >
      <HomeIcon />
    </IconButton>
  )
}
