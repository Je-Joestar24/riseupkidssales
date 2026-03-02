import { Box } from '@mui/material'
import DataProtectionTitle from './DataProtectionTitle.jsx'
import DataProtectionDescription from './DataProtectionDescription.jsx'

export default function DataProtectionMain() {
  return (
    <Box component="section" sx={{ mb: 6 }} aria-labelledby="data-protection-heading">
      <DataProtectionTitle />
      <DataProtectionDescription />
    </Box>
  )
}
