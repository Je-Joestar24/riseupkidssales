import { Box, Grid } from '@mui/material'
import RgisterForm from './RgisterForm.jsx'
import RegisterSummary from './RegisterSummary.jsx'

/**
 * Two-column layout: main content (min 600px, max 700px) + order summary sidebar.
 * Mirrors SelectMain layout; form content will go in the left column.
 */
function RegisterMain() {
  return (
    <Grid
      container
      spacing={3}
      sx={{ maxWidth: 1120, mx: 'auto', width: '100%', alignItems: 'stretch' }}
    >
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          width: '100%',
          minWidth: { xs: 0, md: 600 },
          maxWidth: { xs: '100%', md: 700 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: { xs: 0, md: 600 },
            maxWidth: 700,
          }}
        >
          <RgisterForm />
        </Box>
      </Grid>
      <Grid item xs={12} md={4} sx={{ alignSelf: 'stretch' }}>
        <Box sx={{ maxWidth: 347, width: '100%', height: '100%', minHeight: 0 }}>
          <RegisterSummary />
        </Box>
      </Grid>
    </Grid>
  )
}

export default RegisterMain
