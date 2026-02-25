import { AppBar, Box, Container, Toolbar } from '@mui/material'
import NavLogo from './NavLogo.jsx'
import NavLanguages from './NavLanguages.jsx'
import NavAction from './NavAction.jsx'

function NavHeaders() {
  return (
    <AppBar
      component="header"
      position="sticky"
      elevation={3}
      sx={{
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
        zIndex: (theme) => theme.zIndex.appBar + 1,
        height: '250px',
        borderRadius: '0px',
      }}
      role="banner"
      aria-label="Rise Up Kids navigation"
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            position: 'relative',
            minHeight: 72,
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              width: '100%',
              justifyContent: 'right',
            }}
          >
            <NavLanguages />
            <NavAction />
          </Box>
          <NavLogo />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavHeaders

