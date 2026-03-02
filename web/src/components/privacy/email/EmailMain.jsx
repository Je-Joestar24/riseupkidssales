import { Box } from '@mui/material'
import EmailHeader from './EmailHeader.jsx'
import EmailToogles from './EmailToogles.jsx'

export default function EmailMain() {
  return (
    <Box component="section" sx={{ mb: 6 }} aria-labelledby="email-updates-heading">
      <EmailHeader />
      <EmailToogles />
    </Box>
  )
}
