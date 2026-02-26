import { Box } from '@mui/material'
import logo from '../../../assets/images/small-logo.png'

export default function FooterLogo() {
  return (
    <Box
      sx={{
        '& img': {
          maxWidth: 256,
          width: '100%',
          height: 'auto',
          display: 'block',
        },
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Rise Up Kids™"
      />
    </Box>
  )
}
