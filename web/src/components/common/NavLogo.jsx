import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/small-logo.png'

function NavLogo() {
  return (
    <Box
      component="div"
      role="presentation"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        py: 2,
      }}
    >
      <Box
        component={Link}
        to="/"
        aria-label="Rise Up Kids home"
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
            height: 130,
            display: 'block',
          }}
        />
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: 12,
            right: 135,
            fontSize: 12,
            fontWeight: 700,
            color: 'accent.main',
          }}
        >
          ™
        </Box>
      </Box>
    </Box>
  )
}

export default NavLogo

