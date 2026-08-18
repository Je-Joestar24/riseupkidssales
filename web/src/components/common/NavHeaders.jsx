import { AppBar, Box, Container } from '@mui/material'
import {
  NAV_APP_BAR_COMPACT_HEIGHT_PX,
  NAV_APP_BAR_HEIGHT_PX,
  NAV_HEADER_TRANSITION_MS,
} from '../../config/constants.js'
import { useScrolledHeader } from '../../hooks/useScrolledHeader.js'
import NavLogo from './NavLogo.jsx'
import NavLanguages from './NavLanguages.jsx'
import NavAction from './NavAction.jsx'

const morph = `${NAV_HEADER_TRANSITION_MS}ms ease`

function NavHeaders() {
  const scrolled = useScrolledHeader()
  const headerHeight = scrolled ? NAV_APP_BAR_COMPACT_HEIGHT_PX : NAV_APP_BAR_HEIGHT_PX

  return (
    <>
      <Box
        aria-hidden
        sx={{
          height: NAV_APP_BAR_HEIGHT_PX,
          flexShrink: 0,
        }}
      />
      <AppBar
        component="header"
        position="fixed"
        elevation={3}
        sx={{
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: scrolled
            ? '0 3px 14px rgba(0, 0, 0, 0.08)'
            : '0 6px 18px rgba(15, 23, 42, 0.06)',
          zIndex: (theme) => theme.zIndex.appBar + 1,
          height: headerHeight,
          overflow: 'hidden',
          overflowAnchor: 'none',
          borderRadius: '0px',
          transition: `height ${morph}, box-shadow ${morph}, background-color ${morph}`,
        }}
        role="banner"
        aria-label="Rise Up Kids navigation"
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            height: '100%',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: scrolled ? '50%' : 20,
              right: 0,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              transform: scrolled ? 'translateY(-50%)' : 'none',
              transition: `top ${morph}, transform ${morph}`,
            }}
          >
            <NavLanguages />
            <NavAction compact={scrolled} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              left: scrolled ? 0 : '50%',
              top: scrolled ? '50%' : 'auto',
              bottom: scrolled ? 'auto' : 8,
              zIndex: 0,
              transform: scrolled ? 'translateY(-50%)' : 'translateX(-50%)',
              transition: `left ${morph}, top ${morph}, bottom ${morph}, transform ${morph}`,
            }}
          >
            <NavLogo compact={scrolled} />
          </Box>
        </Container>
      </AppBar>
    </>
  )
}

export default NavHeaders
