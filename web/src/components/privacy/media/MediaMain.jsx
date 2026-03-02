import { Box } from '@mui/material'
import MediaTitle from './MediaTitle.jsx'
import MediaDescription from './MediaDescription.jsx'
import MediaCheckboxes from './MediaCheckboxes.jsx'

export default function MediaMain() {
  return (
    <Box component="section" sx={{ mb: 6 }} aria-labelledby="media-permissions-heading">
      <MediaTitle />
      <MediaDescription />
      <MediaCheckboxes />
    </Box>
  )
}
