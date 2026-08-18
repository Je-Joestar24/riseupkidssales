import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { NAV_HEADER_TRANSITION_MS } from '../../config/constants.js'
import logo from '../../assets/images/small-logo.png'

function NavLogo({ compact = false }) {
  return (
    <Box
      component="div"
      role="presentation"
      sx={{
        display: 'flex',
        justifyContent: compact ? 'flex-start' : 'center',
        py: compact ? 0 : 2,
        transition: `padding ${NAV_HEADER_TRANSITION_MS}ms ease`,
      }}
    >
      <Box
        component={Link}
        to="/"
        aria-label="Go to homepage"
        sx={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="Rise Up Kids™"
          sx={{
            height: compact ? 42 : 130,
            display: 'block',
            transition: `height ${NAV_HEADER_TRANSITION_MS}ms ease`,
          }}
        />
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: compact ? 4 : 12,
            right: compact ? 44 : 135,
            fontSize: compact ? 8 : 12,
            fontWeight: 700,
            color: 'accent.main',
            transition: (theme) =>
              theme.transitions.create(['top', 'right', 'font-size'], {
                duration: NAV_HEADER_TRANSITION_MS,
              }),
          }}
        >
          ™
        </Box>
      </Box>
    </Box>
  )
}

export default NavLogo
