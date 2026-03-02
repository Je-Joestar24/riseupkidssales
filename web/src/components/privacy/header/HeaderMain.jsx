import { Box } from '@mui/material'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import HeaderTitle from './HeaderTitle.jsx'
import HeaderSubtitle from './HeaderSubtitle.jsx'

export default function HeaderMain() {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box
          component="span"
          aria-hidden
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: '#F4EDD8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShieldOutlinedIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        </Box>
        <HeaderTitle />
      </Box>
      <Box sx={{ pl: '60px' }}>
        <HeaderSubtitle />
      </Box>
    </Box>
  )
}
