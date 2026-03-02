import { Box } from '@mui/material'
import ProfileTitle from './ProfileTitle.jsx'
import DeleteChildProfileSample from './DeleteChildProfileSample.jsx'

export default function ProfileMain() {
  return (
    <Box component="section" sx={{ mb: 6 }} aria-labelledby="child-profile-heading">
      <ProfileTitle />
      <DeleteChildProfileSample />
    </Box>
  )
}
