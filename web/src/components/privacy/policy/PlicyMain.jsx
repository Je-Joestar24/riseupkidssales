import { Box } from '@mui/material'
import PolicyTitle from './PolicyTitle.jsx'
import PolicyDescription from './PolicyDescription.jsx'
import PolicyLink from './PolicyLink.jsx'

export default function PlicyMain() {
  return (
    <Box component="section" sx={{ mb: 6 }} aria-labelledby="policy-consent-heading">
      <PolicyTitle />
      <PolicyDescription />
      <PolicyLink />
    </Box>
  )
}
