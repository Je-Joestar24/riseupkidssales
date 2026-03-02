import { Box } from '@mui/material'
import ChildTitle from './ChildTitle.jsx'
import ChildDescription from './ChildDescription.jsx'

export default function ChildMain() {
  return (
    <Box component="section" sx={{ mb: 6 }} aria-labelledby="child-privacy-heading">
      <ChildTitle />
      <ChildDescription />
    </Box>
  )
}
